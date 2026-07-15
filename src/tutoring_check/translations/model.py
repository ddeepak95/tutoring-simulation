"""Talking to the model: the call, its retries, and cleanup of what comes back.
"""
from __future__ import annotations

import time

MAX_RETRIES = 4


class ParseError(ValueError):
    """The model's response could not be parsed. """


def call_model(prompt: str, model: str, response_format: dict | None = None) -> str:
    from litellm import completion

    kwargs = {"response_format": response_format} if response_format else {}
    response = completion(model=model, messages=[{"role": "user", "content": prompt}], **kwargs)
    return response.choices[0].message.content


def strip_fences(raw: str) -> str:
    """Drop a markdown code fence the model may have wrapped its answer in."""
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.strip("`")
        cleaned = cleaned.split("\n", 1)[1] if "\n" in cleaned else cleaned
        cleaned = cleaned.strip()
    return cleaned


def attempt(fn, what: str):
    """Run `fn` with exponential-backoff retries, re-raising a labeled error on exhaustion.
    A ParseError is not retried: the prompt would be identical, so it fails on the first occurrence.
    """
    last_err = None
    for retry in range(MAX_RETRIES):
        try:
            return fn()
        except ParseError as e:
            raise RuntimeError(f"unparseable response ({what}): {e}") from e
        except Exception as e:
            last_err = e
            time.sleep(2 ** retry)
    raise RuntimeError(f"failed after {MAX_RETRIES} attempts ({what}): {last_err}")