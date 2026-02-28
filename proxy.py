from flask import Flask, request, Response, abort
import requests
import time
from urllib.parse import urlparse

app = Flask(__name__)

# Simple in-memory cache: {url: (timestamp, content, headers)}
cache = {}
CACHE_TTL = 600  # seconds (10 minutes)

def fetch_url(url):
    try:
        r = requests.get(url, timeout=10)
        return r
    except Exception as e:
        return None

@app.route('/rss_cached')
def rss_cached():
    url = request.args.get('url')
    if not url:
        abort(400, 'url required')

    # Basic validation
    parsed = urlparse(url)
    if parsed.scheme not in ('http', 'https'):
        abort(400, 'invalid url')

    now = time.time()
    entry = cache.get(url)
    if entry and now - entry[0] < CACHE_TTL:
        content, headers = entry[1], entry[2]
    else:
        r = fetch_url(url)
        if not r or r.status_code >= 400:
            abort(502, 'upstream fetch failed')
        content = r.content
        headers = {'Content-Type': r.headers.get('Content-Type', 'text/xml; charset=utf-8')}
        cache[url] = (now, content, headers)

    # Return with CORS allowed
    resp = Response(content, headers)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/proxy')
def proxy_page():
    url = request.args.get('url')
    if not url:
        abort(400, 'url required')
    parsed = urlparse(url)
    if parsed.scheme not in ('http', 'https'):
        abort(400, 'invalid url')

    r = fetch_url(url)
    if not r or r.status_code >= 400:
        abort(502, 'upstream fetch failed')

    content = r.content
    # Remove X-Frame-Options header to allow framing
    resp = Response(content, mimetype=r.headers.get('Content-Type', 'text/html'))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    # Do not forward security headers that prevent framing
    return resp

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
