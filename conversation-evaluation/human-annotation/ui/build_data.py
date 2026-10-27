"""Refresh the UI's local rubric snapshot and three conversation examples."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

UI = Path(__file__).resolve().parent
ROOT = UI.parents[2]
GUIDE = UI.parent / "coding-guidebook.md"
SCHEMA = ROOT / "conversation-evaluation/schemas/evaluator-v3.schema.json"
TRANSCRIPTS = ROOT / "comparative-evaluation/outputs/chat-transcripts"

ITEM_NAMES = {"diagrams_and_illustrations": "Diagram & Illustrations", "flow_diagrams": "Flow Diagram", "memory_aids": "Memory Aids"}
COLORS = {"Multimedia": ("#36759c", "#e7f2fa"), "Textual Representations": ("#765b96", "#f0eaf7"), "Content": ("#397b71", "#e2f3ee")}


def build() -> dict:
    guide = GUIDE.read_text(encoding="utf-8")
    rows = {}
    for line in guide.splitlines():
        if line.startswith("| "):
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            if len(cells) == 5:
                rows[cells[0]] = cells
    schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
    feature_schema = schema["properties"]["instructional_features"]["properties"]
    rubric = []
    for key, definition in feature_schema.items():
        name = ITEM_NAMES.get(key, key.replace("_", " ").title())
        row = rows[name]
        category = definition["items"]["properties"]["category"]["const"]
        color, highlight = COLORS[category]
        rubric.append({
            "key": key, "name": name, "short_label": name, "category": category,
            "color": color, "highlight": highlight, "description": row[1],
            "entry_attributes": row[3], "guidance": row[4],
            "fields": [{"key": "count", "label": "Occurrences", "numeric": True}],
        })
    samples = []
    for name in ("english-original", "tamil-original", "tamil-english-reviewed"):
        source = TRANSCRIPTS / f"{name}.json"
        if source.exists():
            record = json.loads(source.read_text(encoding="utf-8"))
            samples.append({
                "conversation_id": record["conversation_id"], "learning_topic": record["learning_topic"],
                "label": record["condition"], "messages": record["messages"],
            })
    return {
        "annotation_metadata": {"html_capture": "html-conversation/2: HTML is authoritative. Source-assigned section IDs are shared with translations; labels require no transcript spans.", "llm_evidence": "Optional single-line model justification, separate from source evidence; at most 1000 characters."},
        "section_state_semantics": "Captured interaction states belong to their original containing section; count component items once across supporting views.",
        "label_schema_version": "section-items/1",
        "rubric_source": "conversation-evaluation/human-annotation/coding-guidebook.md",
        "rubric_sha256": hashlib.sha256(GUIDE.read_bytes() + SCHEMA.read_bytes()).hexdigest(),
        "rubric": rubric, "samples": samples,
    }


if __name__ == "__main__":
    data = build()
    (UI / "data.js").write_text("window.ANNOTATION_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"Updated 15 item labels and {len(data['samples'])} example conversations.")
