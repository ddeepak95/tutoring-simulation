"""Assign unique source IDs to saved originals/translations without changing turns."""
import argparse
import hashlib
import json
import uuid
from pathlib import Path
from conversation_identity import ROOT, original_uid, translation_uid


def digest(value):
    return hashlib.sha256(json.dumps(value, ensure_ascii=False, sort_keys=True).encode()).hexdigest()


def migrate(apply=False):
    records, seen = [], set()
    outputs = ROOT / "simulated-conversation-openrouter/outputs"
    for source in sorted(outputs.glob("*/*/conversation.json")):
        original = json.loads(source.read_text(encoding="utf-8-sig"))
        uid = original.get("conversation_id")
        try:
            uuid.UUID(str(uid))
            if uid in seen:
                uid = original_uid(source)
        except ValueError:
            uid = original_uid(source)
        paths = [source] + sorted(source.parent.glob("conversation.*english*.json"))
        for path in paths:
            data = original if path == source else json.loads(path.read_text(encoding="utf-8-sig"))
            before_messages = json.dumps(data.get("messages"), ensure_ascii=False, sort_keys=True)
            previous = data.get("conversation_id", data.get("configuration", {}).get("id"))
            new_id = uid if path == source else translation_uid(uid, path.name, data)
            if new_id in seen:
                raise ValueError(f"Duplicate generated ID: {path}")
            seen.add(new_id)
            old_payload_valid = (data.get("translation", {}).get("payload_hash") ==
                                 digest({k: v for k, v in data.items() if k != "translation"}))
            if previous != new_id:
                data.setdefault("legacy_conversation_id", previous)
                data["conversation_id"] = new_id
            if path != source:
                data["source_conversation_id"] = uid
                if old_payload_valid:
                    data["translation"]["payload_hash"] = digest({k: v for k, v in data.items() if k != "translation"})
            if before_messages != json.dumps(data.get("messages"), ensure_ascii=False, sort_keys=True):
                raise ValueError("ID migration changed conversation turns")
            md = path.with_suffix(".md")
            if apply:
                if md.exists():
                    text = md.read_text(encoding="utf-8")
                    old_markdown_valid = data.get("translation", {}).get("markdown_hash") == digest(text)
                    lines = text.splitlines(keepends=True)
                    if lines and lines[0].startswith("# English translation: "):
                        lines[0] = f"# English translation: {new_id}\n"
                    existing_id = next((i for i, line in enumerate(lines) if line.startswith("Conversation ID: ")), None)
                    if existing_id is not None:
                        lines[existing_id] = f"Conversation ID: {new_id}\n"
                    else:
                        lines.insert(1 if lines else 0, f"\nConversation ID: {new_id}\n")
                    updated = "".join(lines)
                    if old_markdown_valid:
                        data["translation"]["markdown_hash"] = digest(updated)
                    md.write_text(updated, encoding="utf-8")
                path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            records.append(dict(path=path.relative_to(ROOT).as_posix(), conversation_id=new_id,
                                previous_conversation_id=data.get("legacy_conversation_id", previous), source_conversation_id=None if path == source else uid))
    if apply:
        (ROOT / "data/conversation-identities.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return records


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    records = migrate(args.apply)
    print(json.dumps(dict(conversations=len(records), unique_ids=len({r["conversation_id"] for r in records}), applied=args.apply)))
