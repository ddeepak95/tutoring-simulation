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

ITEM_NAMES = {'diagrams_and_illustrations': 'Diagrams & Illustrations', 'flow_diagrams': 'Flow Diagrams', 'graphs': 'Graphs', 'static_images': 'Static Images', 'interactive_animated_media': 'Interactive & Animated Media', 'headings': 'Headings', 'lists': 'Lists / Bullet Points', 'tables': 'Tables', 'callouts': 'Callouts', 'equations': 'Mathematical Notation', 'definitions': 'Definitions', 'step_by_step_walkthroughs': 'Step-by-Step Walkthroughs', 'examples': 'Examples', 'real_world_connections': 'Real-World Connections / Applications', 'analogies': 'Analogies', 'misconceptions_pitfalls': 'Misconceptions', 'memory_aids': 'Memory Aids', 'summaries_key_takeaways': 'Summaries / Key Takeaways', 'social_cues': 'Social Cues', 'questions': 'Questions', 'comprehension_checks': 'Comprehension Checks', 'hints_scaffolding': 'Hints / Scaffolding', 'next_step_suggestions': 'Next Step Suggestions', 'bot_errors_hallucinations': 'Bot Errors / Hallucinations'}
MARKER_FREE_KEYS = ['definitions', 'step_by_step_walkthroughs', 'examples', 'real_world_connections', 'analogies', 'misconceptions_pitfalls', 'memory_aids', 'summaries_key_takeaways', 'social_cues', 'questions', 'comprehension_checks', 'hints_scaffolding', 'next_step_suggestions', 'bot_errors_hallucinations']
COLORS = {'Visuals & Rich Media': ('#36759c', '#e7f2fa'), 'Formatting & Notation': ('#765b96', '#f0eaf7'), 'Explanatory & Pedagogical Devices': ('#397b71', '#e2f3ee'), 'Conversational & Tutoring Moves': ('#976320', '#fff2db'), 'Quality & Error Tracking': ('#a23c49', '#fbe9ec')}


ITEM_COLORS = {'diagrams_and_illustrations': ('#921c1c', '#ebd6d6'), 'flow_diagrams': ('#1c923e', '#d6ebdc'), 'graphs': ('#611c92', '#e3d6eb'), 'static_images': ('#92831c', '#ebe9d6'), 'interactive_animated_media': ('#1c7e92', '#d6e8eb'), 'headings': ('#6b7280', '#e5e7eb'), 'lists': ('#39921c', '#dbebd6'), 'tables': ('#211c92', '#d7d6eb'), 'callouts': ('#92431c', '#ebddd6'), 'equations': ('#1c9266', '#d6ebe3'), 'definitions': ('#881c92', '#ead6eb'), 'step_by_step_walkthroughs': ('#79921c', '#e7ebd6'), 'examples': ('#1c5792', '#d6e1eb'), 'real_world_connections': ('#921c34', '#ebd6da'), 'analogies': ('#1c9226', '#d6ebd8'), 'misconceptions_pitfalls': ('#481c92', '#ded6eb'), 'memory_aids': ('#926b1c', '#ebe4d6'), 'summaries_key_takeaways': ('#1c928d', '#d6ebea'), 'social_cues': ('#921c74', '#ebd6e6'), 'questions': ('#51921c', '#e0ebd6'), 'comprehension_checks': ('#1c2f92', '#d6daeb'), 'hints_scaffolding': ('#922b1c', '#ebd9d6'), 'next_step_suggestions': ('#1c924d', '#d6ebdf'), 'bot_errors_hallucinations': ('#701c92', '#e5d6eb')}

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
        color, highlight = ITEM_COLORS.get(key, COLORS[category])
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
        "marker_free_label_keys": MARKER_FREE_KEYS,
        "rubric_source": "conversation-evaluation/human-annotation/coding-guidebook.md",
        "rubric_sha256": hashlib.sha256(GUIDE.read_bytes() + SCHEMA.read_bytes()).hexdigest(),
        "rubric": rubric, "samples": samples,
    }


if __name__ == "__main__":
    data = build()
    (UI / "data.js").write_text("window.ANNOTATION_DATA = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"Updated {len(data['rubric'])} item labels and {len(data['samples'])} example conversations.")
