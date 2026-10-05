"""Offline tests for server.py. None of these talk to Google or the news sites."""
import base64
import hashlib
import os
import sys
from urllib.parse import parse_qs, urlparse

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import server  # noqa: E402


@pytest.fixture
def client(tmp_path, monkeypatch):
    monkeypatch.setattr(server, 'AUTH_STATE_FILE', str(tmp_path / 'auth_states.json'))
    monkeypatch.setattr(server, 'CALENDAR_TOKEN_FILE', str(tmp_path / 'calendar_tokens.json'))
    monkeypatch.delenv('DEMO_MODE', raising=False)
    server.cache.clear()
    return TestClient(server.app)


def test_rss_rejects_feeds_outside_the_allow_list(client):
    r = client.get('/rss', params={'url': 'https://example.com/feed.xml'})
    assert r.status_code == 400


def test_calendar_needs_sign_in(client):
    assert client.get('/calendar/events').status_code == 401
    assert client.get('/auth/status').json()['signed_in'] is False


def test_google_sign_in_not_configured(client, monkeypatch):
    monkeypatch.delenv('GOOGLE_CLIENT_ID', raising=False)
    monkeypatch.delenv('GOOGLE_CLIENT_SECRET', raising=False)
    assert client.get('/auth/google', follow_redirects=False).status_code == 501


def test_callback_sends_the_pkce_verifier_that_matches_the_challenge(client, monkeypatch):
    """The callback must exchange the code with the same code_verifier whose
    challenge went to Google, or Google rejects it ("Missing code verifier")."""
    monkeypatch.setenv('GOOGLE_CLIENT_ID', 'test-client-id')
    monkeypatch.setenv('GOOGLE_CLIENT_SECRET', 'test-client-secret')

    r = client.get('/auth/google', follow_redirects=False)
    assert r.status_code == 307
    query = parse_qs(urlparse(r.headers['location']).query)
    challenge = query['code_challenge'][0]
    state = query['state'][0]

    seen = {}

    def fake_fetch_token(self, **kwargs):
        seen['verifier'] = self.code_verifier
        return {}

    monkeypatch.setattr(server.Flow, 'fetch_token', fake_fetch_token)
    monkeypatch.setattr(server.Flow, 'credentials', property(lambda self: object()))
    monkeypatch.setattr(server, 'save_calendar_credentials', lambda creds: None)

    r = client.get('/auth/callback', params={'code': 'abc', 'state': state}, follow_redirects=False)
    assert r.status_code == 307
    assert r.headers['location'].endswith('/settings.html?signed_in=1')

    digest = hashlib.sha256(seen['verifier'].encode()).digest()
    assert base64.urlsafe_b64encode(digest).decode().rstrip('=') == challenge


def test_callback_rejects_unknown_state(client, monkeypatch):
    monkeypatch.setenv('GOOGLE_CLIENT_ID', 'test-client-id')
    monkeypatch.setenv('GOOGLE_CLIENT_SECRET', 'test-client-secret')
    r = client.get('/auth/callback', params={'code': 'abc', 'state': 'nope'})
    assert r.status_code == 400


def test_demo_mode_serves_sample_calendar_and_tasks(client, monkeypatch):
    monkeypatch.setenv('DEMO_MODE', '1')
    for path in ('/calendar/events', '/calendar/reminders'):
        r = client.get(path)
        assert r.status_code == 200
        assert '<events demo="true">' in r.text
        assert r.text.count('<event>') == 4
    assert client.get('/auth/status').json() == {'signed_in': False, 'demo': True}
