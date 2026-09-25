# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt requested an explanation of vapour phase refining (ஆவி நிலைமை தூய்மையாக்கல்), a metallurgical refining technique such as the Mond process or the Van Arkel method. The response instead completely discusses general distillation of liquids (காய்ச்சி வடித்தல் / Distillation), including boiling point separation, salt water distillation, and condenser apparatus.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 25,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 25,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 8,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and basis of distillation (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines distillation as a method of separating and purifying liquids from a mixture based on boiling point differences.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining distillation rather than metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **ஆவி நிலை மூலம் தூய்மையாக்கல்** (Distillation) என்பது ஒரு கலவையில் உள்ள திரவங்களைப் பிரித்து, தூய்மையான திரவத்தைப் பெறும் முறையாகும். இது திரவங்களின் **கொதிநிலைகளில் உள்ள வேறுபாட்டை** அடிப்படையாகக் கொண்டது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Basic phase-change mechanism of distillation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the cycle of heating a liquid into vapour and then cooling the vapour back into a purer liquid.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining distillation rather than metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ### அடிப்படை கருத்து | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | ஒரு திரவத்தை சூடாக்கும்போது அது ஆவியாக மாறும். அந்த ஆவியை குளிர்வித்தால், அது மீண்டும் திரவமாக மாறும். இவ்வாறு கிடைக்கும் திரவம் பல நேரங்களில் ஆரம்பக் கலவையை விட அதிகத் தூய்மையுடையதாக இருக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Separation of pure water from salt water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a step-by-step worked illustration of purifying salt water to obtain distilled water.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining distillation rather than metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### உதாரணம்: உப்புநீரில் இருந்து தூய நீர் பெறுதல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | உப்புநீரில் நீரும் உப்பும் கலந்துள்ளன. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p6 | 1. உப்புநீரை ஒரு பாத்திரத்தில் சூடாக்குகிறோம். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p7 | 2. நீர் சுமார் **100°C**-ல் கொதித்து ஆவியாக மாறுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p8 | 3. உப்பு ஆவியாகாது; அது பாத்திரத்திலேயே மீதமாக இருக்கும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | 4. உருவான நீராவியை ஒரு குளிர்ந்த குழாய் வழியாக செலுத்துகிறோம். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | 5. நீராவி குளிர்ந்து மீண்டும் நீராக மாறுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | 6. இவ்வாறு சேகரிக்கப்படும் நீர் **காய்ச்சி வடிகட்டிய நீர்** அல்லது **distilled water** எனப்படும். | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Components of a distillation apparatus (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists and defines the functional components involved in a distillation setup.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining distillation rather than metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### முக்கிய பகுதிகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | - **கொதிக்க வைக்கும் பாத்திரம்** – கலவையைச் சூடாக்கும் இடம்   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | - **ஆவி செல்லும் குழாய்** – உருவான ஆவியை எடுத்துச் செல்லும் பாதை   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - **குளிர்விப்பான் (condenser)** – ஆவியை குளிர்வித்து திரவமாக மாற்றும் கருவி   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 | - **சேகரிப்பு பாத்திரம்** – தூய்மையான திரவம் சேரும் இடம்   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Producing drinking water from seawater (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p18", "quote": "கடல் நீரில் இருந்து குடிநீர் தயாரிக்க"}]}

Annotation rationale: Gives desalination of seawater into drinking water as a real-world application of distillation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining distillation rather than metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### எப்போது பயன்படுத்தப்படுகிறது? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | - கடல் நீரில் இருந்து குடிநீர் தயாரிக்க | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Purifying water for laboratory use (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Mentions obtaining pure water for scientific laboratories as an application of distillation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining distillation rather than metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | - ஆய்வகங்களில் தூய நீர் பெற | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Fractional separation of petroleum (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Cites the separation of crude petroleum into multiple fractions as an industrial application of distillation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining distillation rather than metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | - பெட்ரோலியத்தைப் பல பகுதிகளாகப் பிரிக்க | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Manufacturing perfumes and pharmaceuticals (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Notes the preparation of perfumes and specific pharmaceutical products using distillation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining distillation rather than metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | - வாசனைத் திரவியங்கள் மற்றும் சில மருந்துப் பொருட்கள் தயாரிக்க | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Distillation summary and key takeaway (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes what is left behind during distillation and provides a quick sequential flowchart of the process.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic, explaining distillation rather than metallurgical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ### நினைவில் கொள்ள வேண்டியது | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | ஆவி நிலை மூலம் தூய்மையாக்கல் என்பது **ஆவியாகும் பொருளைத் தனியாகப் பெறும் முறை**. ஆவியாகாத அழுக்குகள், உப்பு, மணல் போன்றவை பின்னால் மீதமாகும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p24 | **சுருக்கமாக:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | சூடாக்குதல் → ஆவியாகுதல் → குளிர்வித்தல் → தூய திரவம் பெறுதல். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

