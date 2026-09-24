# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The requested topic was 'isotope' in Chemistry (commonly translated in Tamil scientific contexts as ஓரிடத்தான்). The response completely misinterprets the term as an ecological concept for endemic organisms restricted to a single geographical habitat, providing biological examples such as the Nilgiri Tahr and Lion-tailed Macaque.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 20,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 20,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 3,
    "everyday": 1,
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

Annotation rationale: Introduces and defines the concept of an organism that naturally exists only in one specific geographical area.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is entirely off-topic from the requested chemistry topic of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | சரி, உயர்நிலைப் பள்ளி மாணவரே! நான் உனக்கு **ஓரிடத்தான்** என்ற சொல்லை மிக எளிமையாகவும், சுவாரஸியமாகவும் விளக்குகிறேன். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### ஓரிடத்தான் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **ஓரிடத்தான்** என்றால், **ஒரு குறிப்பிட்ட இடத்தில் மட்டும்** வாழும் உயிரினம். அதாவது, அந்த உயிரினம் உலகின் வேறு எந்த இடத்திலும் இயற்கையாகக் கிடைக்காது. அது ஒரே ஒரு பகுதிக்கு மட்டும் உரியது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Analogy of village confinement to endemic habitat (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "நீ ஒரு கிராமத்தில் பிறந்து, வாழ்நாள் முழுவதும் அந்தக் கிராமத்தைவிட்டு வெளியே போகாமல் இருந்தால், நீ அந்தக் கிராமத்துக்கு **ஓரிடத்தான்** மனிதன் என்று சொல்லலாம்."}]}

Annotation rationale: Compares a person who never leaves their native village to an organism restricted to a single island or mountain range.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is entirely off-topic from the requested chemistry topic of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | எளிய உதாரணத்துடன் புரிய வைக்கிறேன்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | - நீ ஒரு கிராமத்தில் பிறந்து, வாழ்நாள் முழுவதும் அந்தக் கிராமத்தைவிட்டு வெளியே போகாமல் இருந்தால், நீ அந்தக் கிராமத்துக்கு **ஓரிடத்தான்** மனிதன் என்று சொல்லலாம். | ANALOGY | {} | [&#x27;list&#x27;] |
| p6 | - அதேபோல், ஒரு தாவரம் அல்லது விலங்கு **ஒரே ஒரு மலைப்பகுதி அல்லது தீவில் மட்டும்** வாழ்ந்தால், அதை **ஓரிடத்தான் உயிரினம்** என்று அழைக்கிறோம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u3: Nilgiri Tahr as an endemic animal (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p9", "quote": "தமிழ்நாட்டின் மேற்குத் தொடர்ச்சி மலைகளில் (குறிப்பாக நீலகிரி, அனைமலை) மட்டுமே வாழும் விலங்கு."}]}

Annotation rationale: Provides the Nilgiri Tahr of the Western Ghats as a concrete real-world example of an endemic species.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is entirely off-topic from the requested chemistry topic of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### உண்மையான உதாரணங்கள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | 1. **நீலகிரி வரையாடு** (Nilgiri Tahr)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 |    தமிழ்நாட்டின் மேற்குத் தொடர்ச்சி மலைகளில் (குறிப்பாக நீலகிரி, அனைமலை) மட்டுமே வாழும் விலங்கு. உலகில் வேறு எங்கும் இயற்கையாகக் கிடைக்காது. இது நமது **ஓரிடத்தான்** விலங்கு. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Lion-tailed Macaque as an endemic animal (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p11", "quote": "மேற்குத் தொடர்ச்சி மலைகளில் மட்டும் வாழும் குரங்கு."}]}

Annotation rationale: Presents the Lion-tailed Macaque of the Western Ghats as another concrete example.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is entirely off-topic from the requested chemistry topic of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | 2. **சிங்கவால் குரங்கு** (Lion-tailed Macaque)   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 |    மேற்குத் தொடர்ச்சி மலைகளில் மட்டும் வாழும் குரங்கு. இதையும் வேறு எங்கும் பார்க்க முடியாது. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Nilgiri birds and rare plants (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p12", "quote": "3. **நீலகிரி புள்** போன்ற சில பறவைகள் மற்றும் பல அரிய தாவரங்கள்."}]}

Annotation rationale: Mentions Nilgiri birds and rare flora as additional endemic examples.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is entirely off-topic from the requested chemistry topic of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | 3. **நீலகிரி புள்** போன்ற சில பறவைகள் மற்றும் பல அரிய தாவரங்கள். | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Vulnerability of endemic species and necessity of conservation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why localized species are highly susceptible to extinction from environmental changes and why protected reserves are established.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is entirely off-topic from the requested chemistry topic of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ### ஏன் இவை முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - இந்த உயிரினங்கள் **மிகவும் பாதிக்கப்படக்கூடியவை**. ஏனென்றால் அவை ஒரே இடத்தில் மட்டும் இருப்பதால், அந்த இடத்தில் ஏதேனும் மாற்றம் (காடழிப்பு, காலநிலை மாற்றம்) ஏற்பட்டால், அந்த உயிரினம் முழுவதுமாக அழிந்துவிடும் வாய்ப்பு அதிகம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p15 | - இதனால்தான் அரசு இந்த இடங்களை **வனவிலங்கு சரணாலயம்** அல்லது **பாதுகாக்கப்பட்ட பகுதி** என்று அறிவிக்கிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u7: Summary takeaways on endemic species (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap summarizing the main points to remember, along with a closing inquiry.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is entirely off-topic from the requested chemistry topic of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### சுருக்கமாக நினைவில் கொள்ள: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | - **ஓரிடத்தான்** = ஒரே ஒரு இடத்துக்கு மட்டும் உரியது   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p18 | - இவை உலகின் **சொந்தச் சொத்து** போன்றவை   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p19 | - இவற்றைப் பாதுகாப்பது நம் பொறுப்பு | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p20 | உனக்கு இப்போது புரிந்ததா? இன்னும் ஏதாவது உதாரணம் வேண்டுமா அல்லது இது எப்படி அழிந்து போகிறது என்பதைப் பற்றி விளக்கட்டுமா? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

