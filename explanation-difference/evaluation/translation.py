"""Reusable faithful translation into English for multilingual evaluations."""
from pathlib import Path

PROMPT = Path(__file__).with_name('translation_prompt.md').read_text(encoding='utf-8')


def needs_translation(text, source_language=None):
    # Unknown languages must reach the translator: script detection misses French
    # and other languages written in Latin script. Mixed text also needs review.
    english = str(source_language or '').strip().lower() in {'english', 'en'}
    return not (english and text.isascii())


def payload(text, source_language=None, subject=None):
    result = {'explanation': text}
    if source_language:
        result['source_language'] = source_language
    if subject:
        result['subject'] = subject
    return result


def validate(text):
    # Native-script mnemonics and names may legitimately remain. This checks only
    # structure; completeness and translation fidelity require semantic review.
    if not isinstance(text, str) or not text.strip():
        raise ValueError('Empty translation')
    return text
