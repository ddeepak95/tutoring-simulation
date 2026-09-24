# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt asked to explain isotopes ('ஓரிடத்தான்' in Tamil chemistry terminology), but the response interpreted the term literally as 'endemic species' in ecology and biology, discussing flora and fauna restricted to specific geographical regions.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 11,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1,
    "CAVEAT": 1
  },
  "nested_passages": 11,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 4,
    "localized": 3
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of endemic species (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines the term 'ஓரிடத்தான்' as endemic species, describing organisms naturally restricted to a single geographical area.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is off-topic relative to the requested chemistry topic 'isotope'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **ஓரிடத்தான்** என்பது ஆங்கிலத்தில் **Endemic species** என்று அழைக்கப்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ஒரு குறிப்பிட்ட **பகுதியில் மட்டுமே இயற்கையாக வாழும்** தாவரம் அல்லது விலங்கு ஓரிடத்தான் எனப்படும். அது உலகின் வேறு இடங்களில் இயற்கையாகக் காணப்படாது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Nilgiri tahr as an endemic species (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p4", "quote": "இந்தியாவின் மேற்குத் தொடர்ச்சி மலையில் மட்டுமே இயற்கையாக வாழ்கிறது."}]}

Annotation rationale: Presents the Nilgiri tahr of the Western Ghats as an example of an endemic animal.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is off-topic relative to the requested chemistry topic 'isotope'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | ### எளிய உதாரணம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | - **நீலகிரி வரையாடு** – இந்தியாவின் மேற்குத் தொடர்ச்சி மலையில் மட்டுமே இயற்கையாக வாழ்கிறது.   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Lion-tailed macaque as an endemic species (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p5", "quote": "மேற்குத் தொடர்ச்சி மலைக் காடுகளில் மட்டுமே காணப்படுகிறது."}]}

Annotation rationale: Presents the lion-tailed macaque as a distinct example of an endemic species in the Western Ghats.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is off-topic relative to the requested chemistry topic 'isotope'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | - **சிங்கவால் குரங்கு** – மேற்குத் தொடர்ச்சி மலைக் காடுகளில் மட்டுமே காணப்படுகிறது.   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Neelakurinji as an endemic plant (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p6", "quote": "மேற்குத் தொடர்ச்சி மலைப் பகுதிகளுடன் தொடர்புடைய ஒரு சிறப்பான தாவரம்."}]}

Annotation rationale: Presents Neelakurinji as an example of an endemic plant associated with the Western Ghats.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is off-topic relative to the requested chemistry topic 'isotope'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | - **நீலகுறிஞ்சி மலர்** – மேற்குத் தொடர்ச்சி மலைப் பகுதிகளுடன் தொடர்புடைய ஒரு சிறப்பான தாவரம். | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Vulnerability and importance of endemic species (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why endemic species are vulnerable to extinction and why habitat conservation is necessary.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is off-topic relative to the requested chemistry topic 'isotope'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### ஏன் இவை முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | ஓரிடத்தான் உயிரினங்கள் ஒரு சிறிய பகுதிக்கே கட்டுப்பட்டிருப்பதால், அந்தப் பகுதியின் காடுகள் அழிந்தால் அல்லது காலநிலை மாறினால் அவை எளிதில் அழிவின் விளிம்புக்குச் செல்லலாம். எனவே அவற்றின் வாழிடங்களைப் பாதுகாப்பது மிகவும் அவசியம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Recap summary of endemic species (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick one-line recap formula for remembering what an endemic species is.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is off-topic relative to the requested chemistry topic 'isotope'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### நினைவில் கொள்ளுங்கள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | &gt; **“ஒரே இடத்தில் மட்டுமே இயற்கையாக வாழும் உயிரினம் = ஓரிடத்தான்.”** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

## u7: Distinguishing endemic species from rare species (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies the common misconception equating endemic species with rare species.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is off-topic relative to the requested chemistry topic 'isotope'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | இது **அரிய உயிரினம்** என்பதற்குச் சமமான சொல் அல்ல. ஒரு உயிரினம் அரியதாக இருக்கலாம்; ஆனால் பல இடங்களில் வாழலாம். ஓரிடத்தான் உயிரினம் மட்டும் ஒரு குறிப்பிட்ட இடத்திலேயே வாழும். | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |

