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

ITEMS = [
    ("Concepts", "concepts_and_subtopics_covered", "Concepts", "#658151", "#eaf2df"),
    ("Examples", "examples", "Examples", "#ac8040", "#fcf0d7"),
    ("Analogies", "analogies", "Analogies", "#8772af", "#f0eafa"),
    ("Representations", "representations", "Representations", "#4f89a3", "#e4f1f8"),
    ("Cultural References", "cultural_references", "Cultural references", "#ba7180", "#fbe7ed"),
    ("Questions", "questions", "Questions", "#548d7d", "#e0f2ed"),
]
LABELS = {
    "topic": "Concept or subtopic", "example": "Specific example", "comparison": "Comparison",
    "representation": "Representation", "reference": "Cultural reference", "question": "Exact question wording",
    "concept_illustrated": "Concept illustrated", "concept_explained": "Concept explained",
    "concept_checked": "Concept checked", "detail_level": "Detail level",
    "question_type": "Question classification", "representation_type": "Representation type",
}


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
    for name, key, short_label, color, highlight in ITEMS:
        row = rows[name]
        attributes = feature_schema[key]["items"]["properties"]
        fields = []
        for attribute, definition in attributes.items():
            if attribute == "turn_locations":
                continue
            field = {"key": attribute, "label": LABELS[attribute]}
            if "enum" in definition:
                field["options"] = definition["enum"]
            fields.append(field)
        rubric.append({
            "name": name, "key": key, "short_label": short_label, "color": color, "highlight": highlight,
            "description": row[1], "entry_attributes": row[3], "guidance": row[4], "fields": fields,
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
        "rubric_source": "conversation-evaluation/human-annotation/coding-guidebook.md",
        "rubric_sha256": hashlib.sha256(GUIDE.read_bytes() + SCHEMA.read_bytes()).hexdigest(),
        "rubric": rubric, "samples": samples,
    }


if __name__ == "__main__":
    data = build()
    (UI / "data.js").write_text("window.ANNOTATION_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"Updated six rubric features and {len(data['samples'])} example conversations.")
