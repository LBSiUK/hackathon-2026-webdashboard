from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import Response, PlainTextResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import asyncio
import time
import json
from typing import Optional
from urllib.parse import urlencode
import xml.etree.ElementTree as ET
import os

app = FastAPI(title="Dashboard Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Simple in-memory cache entries: {key: {'ts': float, 'data': bytes, 'meta': {...}}}
cache = {}

async def fetch_text(url: str, timeout=10.0):
    async with httpx.AsyncClient(timeout=timeout) as client:
        r = await client.get(url)
        r.raise_for_status()
        return r.text

def to_xml_string(elem: ET.Element) -> bytes:
    return ET.tostring(elem, encoding='utf-8')

@app.get('/rss')
async def get_rss(force: Optional[bool] = Query(False)):
    """Return cached BBC RSS (10m TTL). Query param force=true to refresh."""
    url = os.environ.get('BBC_RSS_URL', 'https://feeds.bbci.co.uk/news/rss.xml?edition=uk')
    key = 'rss_bbc'
    ttl = 600
    now = time.time()
    entry = cache.get(key)
    if force or not entry or now - entry['ts'] > ttl:
        try:
            text = await fetch_text(url)
        except Exception as e:
            if entry:
                # return stale
                data = entry['data']
                meta = entry.get('meta', {})
                meta['stale'] = 'true'
                return Response(content=data, media_type='application/rss+xml')
            raise HTTPException(status_code=502, detail=str(e))
        cache[key] = {'ts': now, 'data': text.encode('utf-8'), 'meta': {'source': url}}
    data = cache[key]['data']
    return Response(content=data, media_type='application/rss+xml')

@app.get('/rss/last_updated')
def rss_last_updated():
    entry = cache.get('rss_bbc')
    if not entry:
        return PlainTextResponse('never')
    return PlainTextResponse(time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(entry['ts'])))

@app.get('/weather')
async def get_weather(lat: float = Query(50.8225), lon: float = Query(-0.1372), force: Optional[bool] = Query(False)):
    """Return cached Open-Meteo hourly + daily forecast (30m TTL) as JSON."""
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

# --- Google Calendar integration skeleton ---
# The following endpoints expect server-side Google OAuth2 credentials and token management.
# For brevity this code uses placeholders; you must configure OAuth credentials and implement secure
# storage of refresh tokens. The endpoints below return 501 if not configured.

@app.get('/calendar/events')
async def calendar_events():
    # In production: use stored credentials to call Google Calendar API, cache results for 5 minutes
    enabled = os.environ.get('ENABLE_GOOGLE_CALENDAR', '0') == '1'
    if not enabled:
        raise HTTPException(status_code=501, detail='Google Calendar not configured')
    # Placeholder response
    root = ET.Element('events')
    # TODO: implement actual Google Calendar fetch and convert to XML
    return Response(content=to_xml_string(root), media_type='application/xml')

@app.get('/calendar/last_updated')
def calendar_last_updated():
    # return cached timestamp if implemented
    return PlainTextResponse('not_configured')

@app.post('/calendar/refresh')
async def calendar_refresh():
    return PlainTextResponse('not_configured')
