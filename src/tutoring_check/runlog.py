from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def serialize_response(response: Any) -> Any:
    if hasattr(response, "model_dump"):
        return response.model_dump(mode="json")
    return json.loads(json.dumps(response, default=str))


class JsonlLogger:
    def __init__(self, out_dir: Path):
        self.out_dir = out_dir
        self.transcript_path = out_dir / "transcript.jsonl"
        self.api_path = out_dir / "api_responses.jsonl"
        self.request_path = out_dir / "api_requests.jsonl"
        self.out_dir.mkdir(parents=True, exist_ok=True)

    def _append(self, path: Path, record: dict) -> None:
        with path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")

    def log_transcript(self, record: dict) -> None:
        self._append(self.transcript_path, record)

    def log_api_response(self, record: dict) -> None:
        self._append(self.api_path, record)

    def log_api_request(self, record: dict) -> None:
        self._append(self.request_path, record)
