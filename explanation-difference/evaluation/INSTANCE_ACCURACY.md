# Nested content units (v0.10)

Current runner: evaluate_v3.py. System prompt: evaluation_v3_prompt.md. Output schema: content_units.schema.json. Historical output folders keep their original schemas.

Inputs include subject, English topic name, response language and original prompt. The runner segments the original response into nonempty source lines and supplies IDs; the model groups and labels these passages. Exact source text and Python string offsets (start inclusive, end exclusive) are attached locally after validation. Whitespace-only gaps are retained in source.md but are not separate annotated passages.

Output evaluation contains topic_relevance, subtopics and content_units. Every unit embeds its passages, with no separate passage inventory or reverse unit links. Every source passage must occur exactly once across nested passages. Source order is retained inside units; noncontiguous passages may belong to the same unit. Unit order follows first source occurrence.

Units contain id, kind, label, attributes, subtopic_ids, rationale, review_flags, contextualization, passages and accuracy. CONCEPT has depth; EXAMPLE has context/treatment; STUDY_SUPPORT and CAVEAT have subtype. ORGANIZATION is only a passage category with structural/social subtype. Nested passages preserve their local category, applicable attributes, formats and review flags. EXAMPLE passage attributes are empty; example context/treatment belong to the unit.

Contextualization is none/everyday/localized with exact quotes and local passage IDs. Error records contain local passage IDs, description, correction and minor/major severity. Topic relevance links content-unit IDs. Accuracy remains a model proposal without external references. Off-topic explanations skip accuracy via the mismatch verdict.

All organizational passages stay nested. Attach openings to the first relevant unit, headings/transitions to the unit they introduce, and closings to the last relevant unit. Shared headings appear once. ORGANIZATION is a passage category only; there is no separate container or INTRODUCTION unit. Organizational text does not affect unit accuracy or create extra units. A wholly organizational response is retained as one OTHER unit with no_substantive_content flagged, excluded from substantive counts. Error totals count records per unit without global deduplication.


Run the default original Tamil redox response from the repository root:

```powershell
explanation-difference/.venv/Scripts/python.exe explanation-difference/evaluation/evaluate_v3.py --subject Chemistry --response-language Tamil
```

Use --source and --output for another response or output directory. Changed inputs require a new directory. Results include grouped Markdown, evaluation.json with exact embedded text, source.md, schema.json, prompt.md, manifest.json and API request/response logs.
