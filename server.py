from fastapi import FastAPI, HTTPException, Query, Body, APIRouter
from fastapi.responses import Response, PlainTextResponse, JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import httpx
import asyncio
import time
import json
from typing import Optional
from urllib.parse import urlencode
import xml.etree.ElementTree as ET
import os
import hashlib
import secrets
import logging

from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

load_dotenv()

from datetime import datetime, timedelta, timezone

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
import base64
from email.mime.text import MIMEText

app = FastAPI(title="Dashboard Backend")

ALLOWED_RSS_URLS = {
    'https://www.gbnews.com/feeds/news.rss',
    'https://feeds.bbci.co.uk/news/rss.xml?edition=uk',
    'https://feeds.skynews.com/feeds/rss/uk.xml',
    'https://www.telegraph.co.uk/rss.xml',
    'http://www.independent.co.uk/rss',
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

spotify_router = APIRouter()
cache = {}

CALENDAR_TOKEN_FILE = os.environ.get('CALENDAR_TOKEN_FILE', 'calendar_tokens.json')
CALENDAR_CACHE_KEY = 'calendar_events'
CALENDAR_REMINDERS_CACHE_KEY = 'calendar_reminders'
CALENDAR_CACHE_TTL = 300
SCOPES = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
]
_auth_states = {}

_client_id = os.environ.get('GOOGLE_CLIENT_ID')
_client_secret = os.environ.get('GOOGLE_CLIENT_SECRET')
print('GOOGLE_CLIENT_ID:', _client_id)
print('GOOGLE_CLIENT_SECRET:', _client_secret)


async def fetch_text(url: str, timeout=10.0):
    async with httpx.AsyncClient(timeout=timeout) as client:
        r = await client.get(url)
        r.raise_for_status()
        return r.text

def to_xml_string(elem: ET.Element) -> bytes:
    return ET.tostring(elem, encoding='utf-8')


def get_base_url():
    return os.environ.get('BASE_URL', 'http://localhost:5020').rstrip('/')


def load_calendar_credentials():
    if not os.path.exists(CALENDAR_TOKEN_FILE):
        return None
    try:
        with open(CALENDAR_TOKEN_FILE, 'r') as f:
            data = json.load(f)
        creds = Credentials.from_authorized_user_info(data, SCOPES)
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
        return creds
    except Exception:
        return None


def save_calendar_credentials(creds):
    with open(CALENDAR_TOKEN_FILE, 'w') as f:
        json.dump({
            'token': creds.token,
            'refresh_token': creds.refresh_token,
            'token_uri': creds.token_uri,
            'client_id': creds.client_id,
            'client_secret': creds.client_secret,
            'scopes': creds.scopes,
        }, f, indent=2)


@app.get('/rss')
async def get_rss(url: Optional[str] = Query(None), force: Optional[bool] = Query(False)):
    rss_url = url or os.environ.get('BBC_RSS_URL', 'https://feeds.bbci.co.uk/news/rss.xml?edition=uk')
    if rss_url not in ALLOWED_RSS_URLS:
        raise HTTPException(status_code=400, detail='RSS source not allowed')
    key = 'rss_' + hashlib.md5(rss_url.encode()).hexdigest()[:8]
    ttl = 600
    now = time.time()
    entry = cache.get(key)
    if force or not entry or now - entry['ts'] > ttl:
        try:
            text = await fetch_text(rss_url)
        except Exception as e:
            if entry:
                return Response(content=entry['data'], media_type='application/rss+xml')
            raise HTTPException(status_code=502, detail=str(e))
        cache[key] = {'ts': now, 'data': text.encode('utf-8'), 'meta': {'source': rss_url}}
    data = cache[key]['data']
    return Response(content=data, media_type='application/rss+xml')


@app.get('/rss/last_updated')
def rss_last_updated(url: Optional[str] = Query(None)):
    rss_url = url or 'https://feeds.bbci.co.uk/news/rss.xml?edition=uk'
    key = 'rss_' + hashlib.md5(rss_url.encode()).hexdigest()[:8]
    entry = cache.get(key)
    if not entry:
        return PlainTextResponse('never')
    return PlainTextResponse(time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(entry['ts'])))


@app.get('/weather')
async def get_weather(lat: float = Query(50.8225), lon: float = Query(-0.1372), force: Optional[bool] = Query(False)):
    key = f'weather_{lat}_{lon}'
    ttl = 1800
    now = time.time()
    entry = cache.get(key)
    if force or not entry or now - entry['ts'] > ttl:
        params = {
            'latitude': lat,
            'longitude': lon,
            'hourly': 'temperature_2m,precipitation,weathercode',
            'daily': 'temperature_2m_min,temperature_2m_max,weathercode',
            'forecast_days': 14,
            'timezone': os.environ.get('TZ', 'Europe/London'),
        }
        url = 'https://api.open-meteo.com/v1/forecast?' + urlencode(params)
        try:
            text = await fetch_text(url)
            data = json.loads(text)
        except Exception as e:
            if entry:
                return JSONResponse(content=entry['data'])
            raise HTTPException(status_code=502, detail=str(e))
        cache[key] = {'ts': now, 'data': data, 'meta': {'source': url}}
    return JSONResponse(content=cache[key]['data'])


@app.get('/weather/last_updated')
def weather_last_updated(lat: float = Query(50.8225), lon: float = Query(-0.1372)):
    key = f'weather_{lat}_{lon}'
    entry = cache.get(key)
    if not entry:
        return PlainTextResponse('never')
    return PlainTextResponse(time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(entry['ts'])))


@app.get('/auth/google')
async def auth_google():
    client_id = os.environ.get('GOOGLE_CLIENT_ID')
    client_secret = os.environ.get('GOOGLE_CLIENT_SECRET')
    if not client_id or not client_secret:
        raise HTTPException(status_code=501, detail='Google OAuth not configured')
    state = secrets.token_urlsafe(32)
    _auth_states[state] = time.time()
    base = get_base_url()
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": client_id,
                "client_secret": client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [f"{base}/auth/callback"],
            }
        },
        scopes=SCOPES,
        redirect_uri=f"{base}/auth/callback",
    )
    auth_url, _ = flow.authorization_url(access_type='offline', prompt='consent', state=state)
    return RedirectResponse(url=auth_url)


@app.get('/auth/callback')
async def auth_callback(
    code: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    error: Optional[str] = Query(None),
):
    if error:
        return RedirectResponse(url=f"{get_base_url()}/settings.html?error=" + (error or 'unknown'))
    if not code or not state or state not in _auth_states:
        raise HTTPException(status_code=400, detail='Invalid callback')
    del _auth_states[state]
    client_id = os.environ.get('GOOGLE_CLIENT_ID')
    client_secret = os.environ.get('GOOGLE_CLIENT_SECRET')
    if not client_id or not client_secret:
        raise HTTPException(status_code=501, detail='Google OAuth not configured')
    base = get_base_url()
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": client_id,
                "client_secret": client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [f"{base}/auth/callback"],
            }
        },
        scopes=SCOPES,
        redirect_uri=f"{base}/auth/callback",
    )
    flow.fetch_token(code=code)
    creds = flow.credentials
    save_calendar_credentials(creds)
    if CALENDAR_CACHE_KEY in cache:
        del cache[CALENDAR_CACHE_KEY]
    return RedirectResponse(url=f"{base}/settings.html?signed_in=1")


@app.get('/auth/status')
def auth_status():
    creds = load_calendar_credentials()
    if not creds:
        return JSONResponse(content={"signed_in": False})
    return JSONResponse(content={"signed_in": True})


@app.post('/auth/logout')
def auth_logout():
    if os.path.exists(CALENDAR_TOKEN_FILE):
        try:
            os.remove(CALENDAR_TOKEN_FILE)
        except Exception:
            pass
    if CALENDAR_CACHE_KEY in cache:
        del cache[CALENDAR_CACHE_KEY]
    if CALENDAR_REMINDERS_CACHE_KEY in cache:
        del cache[CALENDAR_REMINDERS_CACHE_KEY]
    return PlainTextResponse('ok')


# --- Spotify ---
SPOTIFY_TOKEN_FILE = os.environ.get('SPOTIFY_TOKEN_FILE', 'spotify_tokens.json')
SPOTIFY_SCOPES = 'streaming user-read-playback-state user-read-currently-playing user-modify-playback-state user-read-recently-played'
_spotify_states = {}
SPOTIFY_NOW_PLAYING_CACHE_KEY = 'spotify_now_playing'
SPOTIFY_CACHE_TTL = 60


def get_spotify_redirect_uri():
    return f"{get_base_url()}/auth/spotify/callback"


@spotify_router.get('/auth/spotify/redirect-uri')
def spotify_redirect_uri():
    """Return the redirect URI to add in your Spotify app settings."""
    return JSONResponse(content={"redirect_uri": get_spotify_redirect_uri()})


def load_spotify_tokens():
    if not os.path.exists(SPOTIFY_TOKEN_FILE):
        return None
    try:
        with open(SPOTIFY_TOKEN_FILE, 'r') as f:
            data = json.load(f)
        return data
    except Exception:
        return None


def save_spotify_tokens(data):
    with open(SPOTIFY_TOKEN_FILE, 'w') as f:
        json.dump(data, f, indent=2)


@spotify_router.get('/auth/spotify')
async def auth_spotify():
    client_id = os.environ.get('SPOTIFY_CLIENT_ID')
    if not client_id:
        raise HTTPException(status_code=501, detail='Spotify not configured. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env')
    state = secrets.token_urlsafe(32)
    _spotify_states[state] = time.time()
    params = {
        'client_id': client_id,
        'response_type': 'code',
        'redirect_uri': get_spotify_redirect_uri(),
        'scope': SPOTIFY_SCOPES,
        'state': state,
    }
    url = 'https://accounts.spotify.com/authorize?' + urlencode(params)
    return RedirectResponse(url=url)


@spotify_router.get('/auth/spotify/callback')
async def auth_spotify_callback(
    code: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    error: Optional[str] = Query(None),
):
    base = get_base_url()
    if error:
        return RedirectResponse(url=f"{base}/?spotify_error=" + (error or 'unknown'))
    if not code or not state or state not in _spotify_states:
        raise HTTPException(status_code=400, detail='Invalid Spotify callback')
    del _spotify_states[state]
    client_id = os.environ.get('SPOTIFY_CLIENT_ID')
    client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')
    if not client_id or not client_secret:
        raise HTTPException(status_code=501, detail='Spotify not configured')
    async with httpx.AsyncClient() as client:
        r = await client.post(
            'https://accounts.spotify.com/api/token',
            data={
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': get_spotify_redirect_uri(),
            },
            auth=(client_id, client_secret),
            headers={'Content-Type': 'application/x-www-form-urlencoded'},
        )
    if r.status_code != 200:
        log.warning('Spotify token exchange failed: %s %s', r.status_code, r.text)
        return RedirectResponse(url=f"{base}/?spotify_error=token_failed")
    data = r.json()
    expires_at = time.time() + data.get('expires_in', 3600) - 60
    save_spotify_tokens({
        'access_token': data['access_token'],
        'refresh_token': data.get('refresh_token'),
        'expires_at': expires_at,
    })
    if SPOTIFY_NOW_PLAYING_CACHE_KEY in cache:
        del cache[SPOTIFY_NOW_PLAYING_CACHE_KEY]
    return RedirectResponse(url=f"{base}/?spotify_connected=1")


def _spotify_refresh_token():
    tokens = load_spotify_tokens()
    if not tokens or not tokens.get('refresh_token'):
        return None
    client_id = os.environ.get('SPOTIFY_CLIENT_ID')
    client_secret = os.environ.get('SPOTIFY_CLIENT_SECRET')
    if not client_id or not client_secret:
        return None
    with httpx.Client() as client:
        r = client.post(
            'https://accounts.spotify.com/api/token',
            data={
                'grant_type': 'refresh_token',
                'refresh_token': tokens['refresh_token'],
            },
            auth=(client_id, client_secret),
            headers={'Content-Type': 'application/x-www-form-urlencoded'},
        )
    if r.status_code != 200:
        return None
    data = r.json()
    expires_at = time.time() + data.get('expires_in', 3600) - 60
    new_tokens = {
        'access_token': data['access_token'],
        'refresh_token': tokens.get('refresh_token') or data.get('refresh_token'),
        'expires_at': expires_at,
    }
    save_spotify_tokens(new_tokens)
    return new_tokens['access_token']


def _spotify_access_token():
    tokens = load_spotify_tokens()
    if not tokens:
        return None
    if time.time() >= tokens.get('expires_at', 0):
        return _spotify_refresh_token()
    return tokens.get('access_token')


@spotify_router.get('/spotify/now-playing')
async def spotify_now_playing(force: Optional[bool] = Query(False)):
    token = _spotify_access_token()
    if not token:
        raise HTTPException(status_code=401, detail='Connect Spotify first')
    key = SPOTIFY_NOW_PLAYING_CACHE_KEY
    if not force and key in cache and time.time() - cache[key]['ts'] < SPOTIFY_CACHE_TTL:
        return JSONResponse(content=cache[key]['data'])
    async with httpx.AsyncClient() as client:
        r = await client.get(
            'https://api.spotify.com/v1/me/player/currently-playing',
            headers={'Authorization': f'Bearer {token}'},
        )
    if r.status_code == 204 or r.status_code == 200 and not r.content:
        out = {'playing': False, 'message': 'Nothing playing'}
        cache[key] = {'ts': time.time(), 'data': out}
        return JSONResponse(content=out)
    if r.status_code != 200:
        if r.status_code == 401:
            _spotify_refresh_token()
        raise HTTPException(status_code=r.status_code, detail=r.text[:200])
    data = r.json()
    item = data.get('item') or {}
    artists = [a.get('name', '') for a in item.get('artists', [])]
    progress_ms = data.get('progress_ms')
    duration_ms = item.get('duration_ms')
    if progress_ms is None:
        progress_ms = 0
    if duration_ms is None:
        duration_ms = 0
    out = {
        'playing': True,
        'name': item.get('name', 'Unknown'),
        'artists': artists,
        'artist_str': ', '.join(artists) if artists else 'Unknown',
        'album': (item.get('album') or {}).get('name', ''),
        'url': item.get('external_urls', {}).get('spotify', ''),
        'image_url': (item.get('album') or {}).get('images', [{}])[0].get('url') if item.get('album') else None,
        'progress_ms': progress_ms,
        'duration_ms': duration_ms,
    }
    cache[key] = {'ts': time.time(), 'data': out}
    return JSONResponse(content=out)


@spotify_router.get('/spotify/status')
def spotify_status():
    return JSONResponse(content={"connected": load_spotify_tokens() is not None})


@spotify_router.get('/spotify/token')
def spotify_token():
    """Return access token for Web Playback SDK (same-origin only)."""
    token = _spotify_access_token()
    if not token:
        raise HTTPException(status_code=401, detail='Connect Spotify first')
    return JSONResponse(content={"access_token": token})


@spotify_router.get('/spotify/devices')
async def spotify_devices():
    """Return list of user's available Spotify devices. If /player/devices is empty, fall back to current player device."""
    token = _spotify_access_token()
    if not token:
        raise HTTPException(status_code=401, detail='Connect Spotify first')
    headers = {'Authorization': f'Bearer {token}'}
    devices = []
    async with httpx.AsyncClient() as client:
        r = await client.get('https://api.spotify.com/v1/me/player/devices', headers=headers)
        if r.status_code == 401:
            _spotify_refresh_token()
            raise HTTPException(status_code=401, detail='Reconnect Spotify')
        if r.status_code == 200:
            try:
                data = r.json()
                raw = data.get('devices') if isinstance(data.get('devices'), list) else []
                devices = [
                    {'id': d.get('id', ''), 'name': d.get('name', 'Unknown'), 'type': d.get('type', ''), 'is_active': d.get('is_active', False)}
                    for d in raw if d.get('id')
                ]
            except Exception:
                pass
        if not devices:
            r2 = await client.get('https://api.spotify.com/v1/me/player', headers=headers)
            if r2.status_code == 200:
                try:
                    player_data = r2.json()
                    dev = player_data.get('device')
                    if dev and dev.get('id'):
                        devices = [{
                            'id': dev.get('id', ''),
                            'name': dev.get('name', 'Unknown'),
                            'type': dev.get('type', ''),
                            'is_active': True,
                        }]
                except Exception:
                    pass
    return JSONResponse(content={'devices': devices})


@spotify_router.post('/spotify/transfer')
async def spotify_transfer(body: dict = Body(...)):
    """Transfer playback to a device. Body: { device_id: "..." }."""
    token = _spotify_access_token()
    if not token:
        raise HTTPException(status_code=401, detail='Connect Spotify first')
    device_id = (body.get('device_id') or '').strip()
    if not device_id:
        raise HTTPException(status_code=400, detail='device_id required')
    async with httpx.AsyncClient() as client:
        r = await client.put(
            'https://api.spotify.com/v1/me/player',
            headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
            json={'device_ids': [device_id], 'play': True},
        )
    if r.status_code not in (200, 204):
        if r.status_code == 401:
            _spotify_refresh_token()
        raise HTTPException(status_code=r.status_code, detail=r.text[:200])
    return JSONResponse(content={'ok': True})


@spotify_router.post('/spotify/play')
async def spotify_play():
    """Start or resume playback on user's active device."""
    token = _spotify_access_token()
    if not token:
        raise HTTPException(status_code=401, detail='Connect Spotify first')
    async with httpx.AsyncClient() as client:
        r = await client.put(
            'https://api.spotify.com/v1/me/player/play',
            headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
            json={},
        )
    if r.status_code not in (200, 204):
        if r.status_code == 401:
            _spotify_refresh_token()
        raise HTTPException(status_code=r.status_code, detail=r.text[:200])
    return JSONResponse(content={'ok': True})


@spotify_router.put('/spotify/pause')
@spotify_router.post('/spotify/pause')
async def spotify_pause():
    """Pause playback on user's active device."""
    token = _spotify_access_token()
    if not token:
        raise HTTPException(status_code=401, detail='Connect Spotify first')
    async with httpx.AsyncClient() as client:
        r = await client.put(
            'https://api.spotify.com/v1/me/player/pause',
            headers={'Authorization': f'Bearer {token}'},
        )
    if r.status_code not in (200, 204):
        if r.status_code == 401:
            _spotify_refresh_token()
        raise HTTPException(status_code=r.status_code, detail=r.text[:200])
    return JSONResponse(content={'ok': True})


@spotify_router.post('/spotify/next')
async def spotify_next():
    """Skip to next track."""
    token = _spotify_access_token()
    if not token:
        raise HTTPException(status_code=401, detail='Connect Spotify first')
    async with httpx.AsyncClient() as client:
        r = await client.post(
            'https://api.spotify.com/v1/me/player/next',
            headers={'Authorization': f'Bearer {token}'},
        )
    if r.status_code not in (200, 204):
        if r.status_code == 401:
            _spotify_refresh_token()
        raise HTTPException(status_code=r.status_code, detail=r.text[:200])
    return JSONResponse(content={'ok': True})


@spotify_router.post('/spotify/previous')
async def spotify_previous():
    """Go to previous track."""
    token = _spotify_access_token()
    if not token:
        raise HTTPException(status_code=401, detail='Connect Spotify first')
    async with httpx.AsyncClient() as client:
        r = await client.post(
            'https://api.spotify.com/v1/me/player/previous',
            headers={'Authorization': f'Bearer {token}'},
        )
    if r.status_code not in (200, 204):
        if r.status_code == 401:
            _spotify_refresh_token()
        raise HTTPException(status_code=r.status_code, detail=r.text[:200])
    return JSONResponse(content={'ok': True})


@spotify_router.post('/spotify/volume')
async def spotify_volume(body: dict = Body(...)):
    """Set volume 0-100. Body: { volume_percent: 0-100 }."""
    token = _spotify_access_token()
    if not token:
        raise HTTPException(status_code=401, detail='Connect Spotify first')
    vol = body.get('volume_percent')
    if vol is None:
        raise HTTPException(status_code=400, detail='volume_percent required')
    vol = max(0, min(100, int(vol)))
    async with httpx.AsyncClient() as client:
        r = await client.put(
            f'https://api.spotify.com/v1/me/player/volume?volume_percent={vol}',
            headers={'Authorization': f'Bearer {token}'},
        )
    if r.status_code not in (200, 204):
        if r.status_code == 401:
            _spotify_refresh_token()
        raise HTTPException(status_code=r.status_code, detail=r.text[:200])
    return JSONResponse(content={'ok': True})


@app.get('/calendar/events')
async def calendar_events(force: Optional[bool] = Query(False)):
    creds = load_calendar_credentials()
    if not creds:
        raise HTTPException(status_code=401, detail='Sign in with Google to see calendar')
    now = time.time()
    entry = None if force else cache.get(CALENDAR_CACHE_KEY)
    if not entry or now - entry['ts'] > CALENDAR_CACHE_TTL:
        try:
            service = build('calendar', 'v3', credentials=creds)
            utc_now = datetime.now(timezone.utc)
            start = utc_now.replace(hour=0, minute=0, second=0, microsecond=0)
            end = start + timedelta(days=1)
            events_result = service.events().list(
                calendarId='primary',
                timeMin=start.isoformat().replace('+00:00', 'Z'),
                timeMax=end.isoformat().replace('+00:00', 'Z'),
                singleEvents=True,
                orderBy='startTime',
            ).execute()
            items = events_result.get('items', [])
        except Exception as e:
            if entry:
                return Response(content=entry['data'], media_type='application/xml')
            raise HTTPException(status_code=502, detail=str(e))
        root = ET.Element('events')
        for ev in items:
            node = ET.SubElement(root, 'event')
            title = ev.get('summary') or '(No title)'
            ET.SubElement(node, 'title').text = title
            start_info = ev.get('start') or {}
            end_info = ev.get('end') or {}
            start_str = start_info.get('dateTime') or start_info.get('date') or ''
            end_str = end_info.get('dateTime') or end_info.get('date') or ''
            ET.SubElement(node, 'start').text = start_str
            ET.SubElement(node, 'end').text = end_str
            link = ev.get('htmlLink') or ''
            ET.SubElement(node, 'link').text = link
        xml_bytes = to_xml_string(root)
        cache[CALENDAR_CACHE_KEY] = {'ts': now, 'data': xml_bytes}
        return Response(content=xml_bytes, media_type='application/xml')
    return Response(content=cache[CALENDAR_CACHE_KEY]['data'], media_type='application/xml')


@app.get('/calendar/last_updated')
def calendar_last_updated():
    entry = cache.get(CALENDAR_CACHE_KEY)
    if not entry:
        return PlainTextResponse('never')
    return PlainTextResponse(time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(entry['ts'])))


@app.post('/calendar/refresh')
async def calendar_refresh():
    if CALENDAR_CACHE_KEY in cache:
        del cache[CALENDAR_CACHE_KEY]
    return PlainTextResponse('ok')


CALENDAR_EVENT_TIMEZONE = os.environ.get('CALENDAR_TIMEZONE', 'Europe/London')


def _calendar_create_event_impl(body: dict):
    """Shared impl for creating a calendar event."""
    creds = load_calendar_credentials()
    if not creds:
        raise HTTPException(status_code=401, detail='Sign in with Google in Settings to add events')
    summary = (body.get('summary') or '').strip()
    if not summary:
        raise HTTPException(status_code=400, detail='summary is required')
    start_str = (body.get('start') or '').strip()
    end_str = (body.get('end') or '').strip()
    if not start_str or not end_str:
        raise HTTPException(status_code=400, detail='start and end (ISO 8601) are required')
    description = (body.get('description') or '').strip() or None
    try:
        service = build('calendar', 'v3', credentials=creds)
        event_body = {
            'summary': summary,
            'start': {'dateTime': start_str, 'timeZone': CALENDAR_EVENT_TIMEZONE},
            'end': {'dateTime': end_str, 'timeZone': CALENDAR_EVENT_TIMEZONE},
        }
        if description:
            event_body['description'] = description
        service.events().insert(calendarId='primary', body=event_body).execute()
        if CALENDAR_CACHE_KEY in cache:
            del cache[CALENDAR_CACHE_KEY]
        return JSONResponse(content={'ok': True, 'message': 'Event created'})
    except Exception as e:
        log.exception('Calendar event create failed')
        raise HTTPException(status_code=502, detail=str(e))


@app.options('/calendar/event')
@app.options('/calendar/event/')
def calendar_event_options():
    return Response(status_code=200)


@app.post('/calendar/event')
@app.post('/calendar/event/')  # accept both so redirect_slashes never turns POST into GET
def calendar_create_event(body: dict = Body(...)):
    """Create a calendar event. Body: { summary, start, end, description? }. start/end in ISO 8601."""
    return _calendar_create_event_impl(body)


def _get_reminders_calendar_id(service):
    try:
        page = service.calendarList().list(maxResults=250).execute()
        for item in page.get('items', []):
            if item.get('summary', '').strip().lower() == 'reminders':
                return item.get('id')
    except Exception:
        pass
    return None


@app.get('/calendar/reminders')
async def calendar_reminders(force: Optional[bool] = Query(False)):
    creds = load_calendar_credentials()
    if not creds:
        raise HTTPException(status_code=401, detail='Sign in with Google to see reminders')
    now = time.time()
    entry = None if force else cache.get(CALENDAR_REMINDERS_CACHE_KEY)
    if not entry or now - entry['ts'] > CALENDAR_CACHE_TTL:
        try:
            service = build('calendar', 'v3', credentials=creds)
            reminders_cal_id = _get_reminders_calendar_id(service)
            if not reminders_cal_id:
                root = ET.Element('events')
                xml_bytes = to_xml_string(root)
                cache[CALENDAR_REMINDERS_CACHE_KEY] = {'ts': now, 'data': xml_bytes}
                return Response(content=xml_bytes, media_type='application/xml')
            utc_now = datetime.now(timezone.utc)
            start = utc_now.replace(hour=0, minute=0, second=0, microsecond=0)
            end = start + timedelta(days=1)
            events_result = service.events().list(
                calendarId=reminders_cal_id,
                timeMin=start.isoformat().replace('+00:00', 'Z'),
                timeMax=end.isoformat().replace('+00:00', 'Z'),
                singleEvents=True,
                orderBy='startTime',
            ).execute()
            items = events_result.get('items', [])
        except Exception as e:
            if entry:
                return Response(content=entry['data'], media_type='application/xml')
            raise HTTPException(status_code=502, detail=str(e))
        root = ET.Element('events')
        for ev in items:
            node = ET.SubElement(root, 'event')
            title = ev.get('summary') or '(No title)'
            ET.SubElement(node, 'title').text = title
            start_info = ev.get('start') or {}
            end_info = ev.get('end') or {}
            start_str = start_info.get('dateTime') or start_info.get('date') or ''
            end_str = end_info.get('dateTime') or end_info.get('date') or ''
            ET.SubElement(node, 'start').text = start_str
            ET.SubElement(node, 'end').text = end_str
            link = ev.get('htmlLink') or ''
            ET.SubElement(node, 'link').text = link
        xml_bytes = to_xml_string(root)
        cache[CALENDAR_REMINDERS_CACHE_KEY] = {'ts': now, 'data': xml_bytes}
        return Response(content=xml_bytes, media_type='application/xml')
    return Response(content=cache[CALENDAR_REMINDERS_CACHE_KEY]['data'], media_type='application/xml')


@app.post('/calendar/reminders/refresh')
async def calendar_reminders_refresh():
    if CALENDAR_REMINDERS_CACHE_KEY in cache:
        del cache[CALENDAR_REMINDERS_CACHE_KEY]
    return PlainTextResponse('ok')


# --- Gmail ---
gmail_router = APIRouter()
GMAIL_CACHE_KEY = 'gmail_recent'
GMAIL_CACHE_TTL = 120


def _get_gmail_service():
    creds = load_calendar_credentials()
    if not creds:
        raise HTTPException(status_code=401, detail='Sign in with Google first (Settings)')
    return build('gmail', 'v1', credentials=creds)


def _parse_email_headers(headers_list):
    out = {}
    for h in headers_list:
        name = h.get('name', '').lower()
        if name in ('from', 'to', 'subject', 'date'):
            out[name] = h.get('value', '')
    return out


def _get_body_text(payload):
    """Extract plain-text body from Gmail message payload (handles multipart)."""
    if payload.get('mimeType', '').startswith('text/plain'):
        data = payload.get('body', {}).get('data')
        if data:
            return base64.urlsafe_b64decode(data).decode('utf-8', errors='replace')
    for part in payload.get('parts', []):
        result = _get_body_text(part)
        if result:
            return result
    return ''


@gmail_router.get('/gmail/recent')
async def gmail_recent(count: int = Query(3)):
    """Fetch the last N emails (default 3) from the user's inbox."""
    count = min(count, 10)
    try:
        service = _get_gmail_service()
        result = service.users().messages().list(
            userId='me', maxResults=count, labelIds=['INBOX']
        ).execute()
        msg_ids = result.get('messages', [])
        emails = []
        for msg_ref in msg_ids:
            msg = service.users().messages().get(
                userId='me', id=msg_ref['id'], format='full'
            ).execute()
            headers = _parse_email_headers(msg.get('payload', {}).get('headers', []))
            body = _get_body_text(msg.get('payload', {}))
            snippet = msg.get('snippet', '')
            emails.append({
                'id': msg_ref['id'],
                'threadId': msg.get('threadId', ''),
                'from': headers.get('from', ''),
                'to': headers.get('to', ''),
                'subject': headers.get('subject', '(No subject)'),
                'date': headers.get('date', ''),
                'snippet': snippet,
                'body': body[:3000],
            })
        return JSONResponse(content={'emails': emails})
    except HTTPException:
        raise
    except Exception as e:
        log.exception('Gmail fetch failed')
        raise HTTPException(status_code=502, detail=str(e))


@gmail_router.get('/gmail/status')
def gmail_status():
    creds = load_calendar_credentials()
    return JSONResponse(content={'connected': creds is not None})


@gmail_router.post('/gmail/send')
async def gmail_send(body: dict = Body(...)):
    """Send an email. Body: { to, subject, body, in_reply_to? }"""
    to = (body.get('to') or '').strip()
    subject = (body.get('subject') or '').strip()
    body_text = (body.get('body') or '').strip()
    if not to or not subject or not body_text:
        raise HTTPException(status_code=400, detail='to, subject, and body are required')
    try:
        service = _get_gmail_service()
        message = MIMEText(body_text)
        message['to'] = to
        message['subject'] = subject
        in_reply_to = body.get('in_reply_to')
        if in_reply_to:
            message['In-Reply-To'] = in_reply_to
            message['References'] = in_reply_to
        raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
        sent = service.users().messages().send(
            userId='me', body={'raw': raw}
        ).execute()
        return JSONResponse(content={'ok': True, 'messageId': sent.get('id', '')})
    except HTTPException:
        raise
    except Exception as e:
        log.exception('Gmail send failed')
        raise HTTPException(status_code=502, detail=str(e))


# --- Chat (DigitalOcean Gradient) ---
@app.post("/chat")
def chat_completions(body: dict = Body(...)):
    """Accept { \"messages\": [ { \"role\": \"user\"|\"assistant\", \"content\": \"...\" } ] }. Returns LLM reply."""
    messages = body.get("messages") or []
    if not isinstance(messages, list) or len(messages) == 0:
        raise HTTPException(status_code=400, detail="messages array required and must not be empty")
    # Ensure each message has role and content (strings)
    cleaned = []
    for m in messages:
        if not isinstance(m, dict):
            continue
        role = m.get("role") or "user"
        content = m.get("content")
        cleaned.append({"role": str(role).strip().lower(), "content": str(content or "").strip() or " "})
    if not cleaned:
        raise HTTPException(status_code=400, detail="At least one message required")
    model_access_key = os.environ.get("MODEL_ACCESS_KEY") or os.environ.get("GRADIENT_MODEL_ACCESS_KEY")
    if not model_access_key:
        raise HTTPException(status_code=503, detail="Set MODEL_ACCESS_KEY in .env")
    try:
        from gradient import Gradient
        inference_client = Gradient(model_access_key=model_access_key)
        model = os.environ.get("CHAT_MODEL", "deepseek-r1-distill-llama-70b")
        max_tokens = int(os.environ.get("CHAT_MAX_TOKENS", "512"))
        inference_response = inference_client.chat.completions.create(
            messages=cleaned,
            model=model,
            max_tokens=max_tokens,
        )
        content = inference_response.choices[0].message.content or ""
        return JSONResponse(content={"content": content})
    except Exception as e:
        log.exception("Gradient chat request failed")
        raise HTTPException(status_code=502, detail=str(e))


# Include API routers before StaticFiles so they are never shadowed
app.include_router(spotify_router)
app.include_router(gmail_router)
app.mount("/", StaticFiles(directory=os.path.dirname(os.path.abspath(__file__)), html=True), name="static")
