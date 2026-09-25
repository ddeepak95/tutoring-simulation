# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt asks for an explanation of vapour phase refining (ஆவி நிலைமை தூய்மையாக்கல்), which in chemistry/metallurgy specifically refers to the chemical method of refining metals by converting them into volatile compounds and thermally decomposing them (e.g., the Mond process for nickel and the Van Arkel process for titanium/zirconium). The response instead explains distillation, fractional distillation, and sublimation based on boiling point differences, citing examples such as crude oil refining and seawater desalination. Because the entire response addresses a completely different physical separation process, it is off-topic.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 29,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "PROCEDURE": 1,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 29,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 9,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and scientific principle of phase-separation by boiling point (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the opening title, basic concept definition, and the underlying scientific principles regarding boiling point differences, evaporation, and condensation.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, discussing distillation rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # ஆவி நிலை தூய்மையாக்கல் (Vapor Phase Refining/Distillation) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## அடிப்படை கருத்து | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | ஆவி நிலை தூய்மையாக்கல் என்பது **கலவைகளை அவற்றின் கொதிநிலை வேறுபாட்டைப் பயன்படுத்தி** பிரிக்கும் ஒரு முறையாகும். இது **திடப்பொருட்களை சுத்திகரிக்கவும், திரவக் கலவைகளைப் பிரிக்கவும்** பயன்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | ## அறிவியல் அடிப்படை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | - ஒவ்வொரு பொருளுக்கும் **தனிப்பட்ட கொதிநிலை (Boiling Point)** உண்டு | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - வெப்பநிலையை உயர்த்தும்போது, குறைந்த கொதிநிலை கொண்ட பொருள் முதலில் **ஆவியாகி** பிரிகிறது | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p7 | - இந்த ஆவியை குளிர்வித்து மீண்டும் **திரவமாக்கும்போது (Condensation)** தூய்மையான பொருள் கிடைக்கிறது | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u2: Sublimation as a separation technique (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces sublimation as a type of purification, defining direct solid-to-gas transition and listing substances purified by it.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, discussing sublimation rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## முக்கிய வகைகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | ### 1. **வடிகட்டல் ஆவியாக்கல் (Sublimation)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | - திடப்பொருள் நேரடியாக ஆவியாகி, மீண்டும் திடமாகும் முறை | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | - உதாரணம்: **அயோடின் (Iodine), கற்பூரம் (Camphor), நாப்தலீன்** ஆகியவற்றை தூய்மைப்படுத்த பயன்படுகிறது | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Fractional distillation as a separation technique (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines fractional distillation based on boiling point differences and mentions crude oil fractionation as an illustrative example.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, discussing fractional distillation rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### 2. **வடிகட்டி வாறுவேற்றம் (Fractional Distillation)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | - பல பொருட்களின் கலவையிலிருந்து, கொதிநிலை வேறுபாட்டின் அடிப்படையில் தனித்தனியாக பிரித்தெடுக்கும் முறை | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | - உதாரணம்: **கச்சா எண்ணெயிலிருந்து (Crude Oil) பெட்ரோல், மண்ணெண்ணெய், டீசல்** போன்றவற்றைப் பிரித்தெடுத்தல் | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Steps in thermal distillation (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Enumerates the reusable procedural stages: heating, evaporation, cooling, and condensation.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, describing distillation steps rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## படிநிலைகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | 1. **வெப்பமாக்கல்** - கலவையை சூடாக்குதல் | PROCEDURE | {} | [&#x27;list&#x27;] |
| p17 | 2. **ஆவியாக்கம்** - குறைந்த கொதிநிலை கொண்ட பொருள் ஆவியாதல் | PROCEDURE | {} | [&#x27;list&#x27;] |
| p18 | 3. **குளிர்வித்தல்** - ஆவியை குளிர்ந்த பரப்பில் சேகரித்தல் | PROCEDURE | {} | [&#x27;list&#x27;] |
| p19 | 4. **மீள்திரவமாக்கல் (Condensation)** - ஆவி மீண்டும் திரவமாக மாறுதல் | PROCEDURE | {} | [&#x27;list&#x27;] |

## u5: Example of desalination for drinking water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p20", "quote": "அன்றாட வாழ்வில் பயன்பாடுகள்"}, {"passage_id": "p23", "quote": "குடிநீர் சுத்திகரிப்பு"}]}

Annotation rationale: Presents drinking water purification via seawater desalination as a real-world application, attaching the section heading and table header.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, discussing water desalination rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## அன்றாட வாழ்வில் பயன்பாடுகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | &#124; பயன்பாடு &#124; உதாரணம் &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p22 | &#124;---------&#124;---------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p23 | &#124; குடிநீர் சுத்திகரிப்பு &#124; கடல்நீரிலிருந்து உப்பு நீக்கல் &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u6: Example of alcohol extraction in brewing (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates distillation via the isolation of alcohol in liquor production.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, discussing alcohol distillation rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | &#124; மது தயாரிப்பு &#124; ஆல்கஹால் பிரித்தெடுத்தல் &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u7: Example of oil refining for petroleum products (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Cites petroleum manufacturing in oil refineries as an illustrative industrial application.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, discussing oil refining rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | &#124; எண்ணெய் சுத்திகரிப்பு &#124; பெட்ரோலியப் பொருட்கள் தயாரிப்பு &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u8: Example of metal refining by distillation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Mentions metallurgical refining of volatile metals such as zinc via distillation.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, discussing distillation refining rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | &#124; உலோகவியல் &#124; சில உலோகங்களை (துத்தநாகம் போன்றவை) சுத்திகரித்தல் &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u9: Importance of purification methods in industry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why obtaining pure products through these separation methods is critical in pharmacy, chemical research, and manufacturing.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, discussing distillation rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ## முக்கியத்துவம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | இந்த முறை **மாசற்ற, தூய்மையான பொருட்களைப் பெற** பயன்படுவதால், மருந்துத் தொழில், வேதியியல் ஆய்வுகள், மற்றும் தொழிற்சாலைகளில் மிக முக்கியமான பங்கு வகிக்கிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u10: Recap of the separation process (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a brief summary of the process described as heat-evaporate-condense.

Accuracy: **not_assessed_due_to_topic_mismatch**. This unit is not assessed for accuracy because the response is off-topic, summarizing distillation rather than vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | **சுருக்கமாக:** ஆவி நிலை தூய்மையாக்கல் என்பது &quot;சூடாக்கி-ஆவியாக்கி-குளிர்வித்து&quot; கலவைகளைப் பிரிக்கும் எளிய ஆனால் சக்திவாய்ந்த அறிவியல் முறையாகும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

