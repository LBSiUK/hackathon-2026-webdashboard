from fastapi import FastAPI, HTTPException, Query
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

from dotenv import load_dotenv

load_dotenv()

from datetime import datetime, timedelta, timezone

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build

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

cache = {}

CALENDAR_TOKEN_FILE = os.environ.get('CALENDAR_TOKEN_FILE', 'calendar_tokens.json')
AUTH_STATE_FILE = os.environ.get('AUTH_STATE_FILE', 'auth_states.json')
CALENDAR_CACHE_KEY = 'calendar_events'
CALENDAR_REMINDERS_CACHE_KEY = 'calendar_reminders'
CALENDAR_CACHE_TTL = 300
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']


def _load_auth_states() -> dict:
    if not os.path.exists(AUTH_STATE_FILE):
        return {}
    try:
        with open(AUTH_STATE_FILE, 'r') as f:
            return json.load(f)
    except Exception:
        return {}


def _save_auth_states(states: dict):
    try:
        with open(AUTH_STATE_FILE, 'w') as f:
            json.dump(states, f)
    except Exception:
        pass

# Never print the client secret itself: logs get shared and pasted around.
if os.environ.get('GOOGLE_CLIENT_ID') and os.environ.get('GOOGLE_CLIENT_SECRET'):
    print('Google sign-in: configured')
else:
    print('Google sign-in: not configured (set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)')


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
            try:
                creds.refresh(Request())
                save_calendar_credentials(creds)
            except Exception:
                return None
        if not creds.valid:
            return None
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
    states = _load_auth_states()
    # Expire any states older than 10 minutes
    now = time.time()
    states = {k: v for k, v in states.items() if now - v < 600}
    states[state] = now
    _save_auth_states(states)
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
    states = _load_auth_states()
    if not code or not state or state not in states:
        raise HTTPException(status_code=400, detail='Invalid callback — please try signing in again')
    del states[state]
    _save_auth_states(states)
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


app.mount("/", StaticFiles(directory=os.path.dirname(os.path.abspath(__file__)), html=True), name="static")
