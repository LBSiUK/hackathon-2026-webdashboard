Local proxy server (optional)

This project serves static files from the project root. To support embedding external sites and fetching RSS feeds without CORS/frame restrictions, a small Flask proxy is provided.

Files added:
- proxy.py - Flask app exposing `/rss_cached?url=...` and `/proxy?url=...` with a 10-minute in-memory cache
- requirements.txt - Python dependencies

Install and run:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python proxy.py
```

This starts the proxy on `http://localhost:5000`.

Usage from the site (running static server on port 8000):
- RSS tiles will try to fetch feeds directly, then fall back to `/rss_cached?url=...` (same origin) to avoid CORS.
- To embed a page that sets `X-Frame-Options`, point an iframe to `/proxy?url=https://example.com/...` which returns the page with CORS headers and allows framing.

FastAPI backend
----------------
I added a FastAPI app at `server.py` which provides:
- `/rss` — cached BBC RSS feed (10m TTL). Supports `?force=true` to refresh.
- `/rss/last_updated` — timestamp of last fetch.
- `/weather` — cached Open-Meteo JSON wrapped as XML (30m TTL). Supports `?lat` and `?lon` and `?force=true`.
- `/weather/last_updated` — timestamp of last weather fetch.

To run the FastAPI server locally:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-fastapi.txt
uvicorn server:app --host 0.0.0.0 --port 5020 --reload
```

Google Calendar
---------------
I included placeholder endpoints for Google Calendar. Enabling full calendar integration requires OAuth setup and secure token storage; we can implement that next if you want.

Security note: This proxy is intended for local development only. Do not expose it publicly without hardening and access controls.
