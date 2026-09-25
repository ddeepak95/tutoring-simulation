# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation covers the definition, principles, step-by-step mechanism, industrial examples (Mond process and van Arkel process), and limitations of vapour phase refining in Tamil.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 19,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "CAVEAT": 1
  },
  "nested_passages": 19,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "contains_error": 2,
    "accurate": 3
  },
  "proposed_error_records": 2,
  "proposed_error_severity": {
    "minor": 1,
    "major": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Principle and definition of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces vapour phase refining and explains the underlying chemical principle of forming a volatile compound and subsequently decomposing it.

Accuracy: **contains_error**. In Tamil technical terminology, 'vapour phase refining' is 'ஆவிக் கட்ட முறை' or 'ஆவிக் கட்ட சுத்திகரிப்பு'. Using 'நீராவி' (which specifically means steam / water vapour) is an inaccurate translation that can lead students to confuse vapour with steam.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம் மாணவரே!   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | நீராவி கட்ட சுத்திகரிப்பு (Vapour Phase Refining) என்பது உலோகங்களை மிக உயர் தூய்மையுடன் பெறப் பயன்படும் ஒரு முக்கியமான முறை. இதை எளிதாகப் புரிந்துகொள்ள இப்படி நினைத்துக்கொள்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | சில உலோகங்கள் (நிக்கல், டைட்டானியம், ஜிர்கோனியம் போன்றவை) ஒரு சிறப்பு வாயுவுடன் வினைபுரிந்து எளிதில் ஆவியாகும் சேர்மத்தை உருவாக்கும். அந்த ஆவியை அசுத்தங்களிலிருந்து பிரித்து, பின்னர் அதை மீண்டும் சிதைத்தால் தூய உலோகம் கிடைக்கும். இதுதான் இந்த முறையின் அடிப்படை. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p2): The term 'நீராவி கட்ட சுத்திகரிப்பு' mistranslates 'vapour' as 'நீராவி' (steam / water vapour) rather than 'ஆவி' (vapour).

Correction: It should be termed 'ஆவிக் கட்ட சுத்திகரிப்பு' (Vapour Phase Refining) to avoid confusion with steam.

## u2: General procedure of vapour phase refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the three generic steps of the refining procedure: forming the volatile compound, separating it from impurities, and thermal decomposition.

Accuracy: **accurate**. The procedural steps correctly describe the formation of the volatile compound leaving behind non-volatile impurities, followed by thermal decomposition to yield the pure metal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### எளிய படிகள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | 1. **ஆவியாகும் சேர்மம் உருவாக்குதல்**:   | PROCEDURE | {} | [&#x27;list&#x27;] |
| p6 |    அசுத்த உலோகத்தை ஒரு வாயுவுடன் (எ.கா. கார்பன் மோனாக்சைடு அல்லது அயோடின்) சேர்த்து சூடாக்கினால், உலோகம் ஆவியாகும் சேர்மமாக மாறுகிறது. அசுத்தங்கள் இந்த வினையில் பங்கேற்காததால் அவை பின்தங்கிவிடும். | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p7 | 2. **பிரித்தெடுத்தல்**:   | PROCEDURE | {} | [&#x27;list&#x27;] |
| p8 |    உருவான ஆவியை (volatile compound) அசுத்தங்களிலிருந்து தனியாக சேகரிக்கிறோம். | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p9 | 3. **சிதைத்தல்**:   | PROCEDURE | {} | [&#x27;list&#x27;] |
| p10 |    இந்த ஆவியை அதிக வெப்பநிலையில் (சில நேரங்களில் அதே வாயுவை மீட்டெடுக்கும் வகையில்) சூடாக்கினால், அது சிதைந்து தூய உலோகம் + வாயு எனப் பிரிகிறது. தூய உலோகம் படிவதால் அதை எளிதில் பெறலாம். | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u3: Mond process for refining nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of vapour phase refining with the industrial Mond process for nickel purification.

Accuracy: **contains_error**. The decomposition temperature of nickel tetracarbonyl is around 450–470 K (approx. 180–200 °C), not 450–500 °C. The unit of temperature (Kelvin vs Celsius) was mixed up.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### இரண்டு முக்கிய உதாரணங்கள் (உயர்நிலைப் பள்ளி அளவில்): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | - **மாண்ட் செயல்முறை (Mond’s process)** – நிக்கலை சுத்தப்படுத்த:   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p13 |   Ni + 4CO → Ni(CO)₄ (ஆவி)   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p14 |   பின்னர் 450–500°C-ல் Ni(CO)₄ → Ni (தூய) + 4CO | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

Error (major; p14): The passage incorrectly states that Ni(CO)4 decomposes at '450–500°C'. The decomposition temperature is 450–470 K (which corresponds to approximately 180–200 °C).

Correction: Change '450–500°C' to '450–470 K' (or approximately '180–200°C').

## u4: Van Arkel process for refining titanium and zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the van Arkel process for titanium and zirconium using iodine.

Accuracy: **accurate**. The reaction of titanium with iodine forming volatile TiI4 and its decomposition on a heated tungsten filament to yield pure Ti is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | - **வான் ஆர்கெல் செயல்முறை (van Arkel process)** – டைட்டானியம்/ஜிர்கோனியம்:   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 |   Ti + 2I₂ → TiI₄ (ஆவி)   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 |   பின்னர் சூடான டங்ஸ்டன் இழையில் TiI₄ → Ti (தூய) + 2I₂ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u5: Purity benefits and limitations of vapour phase refining (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the high purity achieved (up to 99.9%) and states the main limitation: it is not universally applicable to all metals, only those that form volatile and easily decomposable compounds.

Accuracy: **accurate**. Accurately highlights the limitations and prerequisites of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | இந்த முறையின் சிறப்பு என்னவென்றால், இதில் உலோகம் 99.9% வரை தூய்மையாகக் கிடைக்கும். ஆனால் எல்லா உலோகங்களுக்கும் இது சாத்தியமில்லை – ஆவியாகும் சேர்மம் உருவாக்கும் உலோகங்களுக்கு மட்டுமே இது பயன்படும். | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;prose&#x27;] |
| p19 | ஏதாவது சந்தேகம் இருந்தால் கேள்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

