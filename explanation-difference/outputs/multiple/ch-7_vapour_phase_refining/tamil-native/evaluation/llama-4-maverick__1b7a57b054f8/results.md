# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The requested topic is 'vapour phase refining' in Chemistry, which is a metallurgical purification technique in which an impure metal is converted into a volatile compound and then decomposed to yield pure metal (such as the Mond process for nickel or the Van Arkel process for titanium and zirconium). The response instead describes the physical phase changes of water and the simple distillation of salt water, which is completely off-topic.

## Counts

```json
{
  "total_content_units": 2,
  "substantive_content_units": 2,
  "total_passages": 3,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 1
  },
  "nested_passages": 3,
  "unique_subtopics": 2,
  "contextualization": {
    "none": 2
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 2
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of vapour phase refining as water evaporation and condensation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: The unit introduces the response and presents an erroneous conceptual definition claiming that heating liquid water to vapour and condensing it back to liquid is vapour phase refining.

Accuracy: **not_assessed_due_to_topic_mismatch**. The content is not assessed for accuracy because the response is off-topic, explaining water evaporation and condensation instead of metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | கொடுக்கப்பட்டுள்ள வினாவிற்கு விடை அளிக்கும் வகையில் விளக்கம் அளிக்கப்படுகிறது. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p2 | நீர்ம நிலையில் இருக்கும் நீர், வெப்பப்படுத்தும் போது ஆவி நிலையை அடைகிறது. இந்த ஆவி நிலையில் உள்ள நீரானது மீண்டும் நீர்ம நிலைக்கு மாறும் நிகழ்வு தான் ஆவி நிலைமை தூய்மையாக்கல் ஆகும்.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Distillation of salt water as an illustrative example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: The unit provides an illustrative example using salt water to demonstrate separating water from salt by heating and cooling.

Accuracy: **not_assessed_due_to_topic_mismatch**. The content is not assessed for accuracy because the response is off-topic, illustrating simple distillation of salt water rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | உதாரணமாக, உப்பு நீரை எடுத்துக்கொள்வோம். உப்புநீரில் உப்பு மற்றும் நீர் ஆகிய இரண்டும் உள்ளன. இந்த உப்பு நீரை வெப்பப்படுத்தும் போது நீரானது ஆவியாகி விடும். ஆனால், உப்பு ஆவியாகாது. ஆவியாகி வெளியேறும் நீராவியை ஒரு குளிர்விக்கும் அமைப்பில் செலுத்தி குளிர்விக்கும் போது, மீண்டும் நீர்ம நிலைக்கு மாறுகிறது. இந்த நீரானது உப்பு இல்லாத தூய நீராகும். இவ்வாறு பிரித்தெடுக்கப்படும் நீரானது தூய்மையான நீர் ஆகும். இந்த முறையில் நடைபெறும் தூய்மையாக்கல் ஆவி நிலைமை தூய்மையாக்கல் எனப்படுகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |

