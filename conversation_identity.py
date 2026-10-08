"""Portable, stable identities shared by transcript generators and translations."""
import hashlib
import json
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def original_uid(path):
    path = Path(path).resolve()
    try:
        name = path.relative_to(ROOT).as_posix()
    except ValueError:
        name = path.as_posix()
    return str(uuid.uuid5(uuid.NAMESPACE_URL, "tutoring-check:conversation:" + name))


def translation_uid(source_uid, variant, conversation):
    payload = {key: conversation.get(key) for key in
               ("metadata", "messages", "learning_topic", "topic_id", "learner_context", "tutor_context")}
    content = hashlib.sha256(json.dumps(payload, ensure_ascii=False, sort_keys=True).encode()).hexdigest()
    return str(uuid.uuid5(uuid.NAMESPACE_URL, f"tutoring-check:translation:{source_uid}:{variant}:{content}"))
