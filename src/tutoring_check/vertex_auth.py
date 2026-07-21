"""Mint Google ADC access tokens for Vertex models LiteLLM reaches over its OpenAI-compatible
route (xAI/Grok), where the bearer token travels as `api_key`.

Models LiteLLM routes natively (`vertex_ai/...`) never need this — it handles their auth itself.
A models.json entry opts in by setting `"api_key": "@adc-token"` in its `litellm_params`; the
sentinel is swapped for a live token at the moment of the call, so the token stays out of the
logged request payload.
"""
from __future__ import annotations

import threading

ADC_TOKEN_SENTINEL = "@adc-token"

_SCOPES = ["https://www.googleapis.com/auth/cloud-platform"]
_lock = threading.Lock()
_credentials = None


def adc_token() -> str:
    """A valid ADC access token, refreshed in place once the current one expires.

    Credentials are cached across calls; a long sweep outliving the ~1h token lifetime
    refreshes rather than failing partway through.
    """
    global _credentials
    import google.auth
    from google.auth.transport.requests import Request

    with _lock:
        if _credentials is None:
            _credentials, _ = google.auth.default(scopes=_SCOPES)
        if not _credentials.valid:
            _credentials.refresh(Request())
        return _credentials.token


def with_adc_token(kwargs: dict) -> dict:
    """Return `kwargs` with the `@adc-token` sentinel replaced by a live token.

    Call this on the request dict *after* logging it, never before: the logged payload should
    keep the sentinel so `api_requests.jsonl` stays free of credentials.
    """
    if kwargs.get("api_key") != ADC_TOKEN_SENTINEL:
        return kwargs
    return {**kwargs, "api_key": adc_token()}
