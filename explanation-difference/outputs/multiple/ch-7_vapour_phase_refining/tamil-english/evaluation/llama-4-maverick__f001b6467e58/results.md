# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the principle of vapour phase refining and covers the two major industrial examples: the Mond process for nickel and the Van Arkel process for zirconium and titanium.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 10,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 10,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 4
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Principle and mechanism of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the fundamental principle of vapour phase refining, where an impure metal is converted into a volatile compound leaving behind impurities, followed by thermal decomposition to yield pure metal.

Accuracy: **accurate**. The explanation correctly outlines the two essential requirements and steps of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | விடை  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## Step 1: வாயு நிலை தூய்மைப்படுத்தல் முறையை விளக்குதல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | வாயு நிலை தூய்மைப்படுத்தல் முறையில், உலோகம் ஒரு வாயுவுடன் வினைபுரிந்து ஒரு ஆவியாகும் சேர்மத்தை உருவாக்குகிறது. பின்னர் இந்த ஆவியாகும் சேர்மம் சிதைவடைந்து தூய்மையான உலோகத்தைத் தருகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ## Step 2: வாயு நிலை தூய்மைப்படுத்தலுக்கான எடுத்துக்காட்டுகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | இந்த முறையில் தூய்மைப்படுத்தப்பட வேண்டிய உலோகம் ஒரு குறிப்பிட்ட வாயுவுடன் சேர்த்து சூடாக்கப்படுகிறது. இதன் விளைவாக உருவாகும் உலோகச் சேர்மம் ஆவியாகி, அசுத்தங்கள் பின்னணியில் நிற்கின்றன. பின்னர், இந்த ஆவியாகும் உலோகச் சேர்மம் சிதைவடைந்து, தூய உலோகத்தை விளைவிக்கிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Mond process for refining nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Mond process where nickel reacts with carbon monoxide at 330-350 K to form volatile nickel tetracarbonyl, which decomposes at 450-470 K to give pure nickel.

Accuracy: **accurate**. The temperatures (330-350 K and 450-470 K), reactants (nickel and carbon monoxide), intermediate (nickel tetracarbonyl), and final product are factually accurate for Mond's process, despite a slight transliteration quirk in the name (மாண்ட்ரேன் instead of மாண்ட்).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## Step 3: மாண்ட்ரேன் செயல்முறை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | நிக்கலைத் தூய்மைப்படுத்த மாண்ட்ரேன் செயல்முறை பயன்படுத்தப்படுகிறது. இந்த முறையில், நிக்கல் உலோகம் கார்பன்மோனாக்சைடு வாயுவுடன் 330-350K வெப்பநிலையில் சேர்த்து சூடாக்கப்படுகிறது. இதன் விளைவாக நிக்கல் டெட்ரா கார்பனைல் உருவாகிறது. பின்னர், இந்த நிக்கல் டெட்ரா கார்பனைல் 450-470K வெப்பநிலைக்குச் சூடாக்கப்படும்போது சிதைவடைந்து தூய நிக்கல் உலோகத்தைத் தருகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Van Arkel process for refining zirconium or titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel process, where zirconium or titanium reacts with iodine to form a volatile iodide that decomposes into pure metal.

Accuracy: **accurate**. The description accurately reflects the Van Arkel method used for purifying zirconium and titanium using iodine.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## Step 4: வான் ஆர்கெல் செயல்முறை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | வான் ஆர்கெல் செயல்முறையானது ஸிர்கோனியம் அல்லது டைட்டானியம் போன்ற உலோகங்களைத் தூய்மைப்படுத்தப் பயன்படுகிறது. இந்த முறையில், உலோகம் அயோடினுடன் சேர்த்து சூடாக்கப்பட்டு ஆவியாகும் உலோக அயோடைடு உருவாக்கப்படுகிறது. பின்னர், இந்த உலோக அயோடைடு சிதைவடைந்து தூய உலோகத்தைத் தருகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Summary of vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap summarizing the definition of vapour phase refining and recalling the two main examples.

Accuracy: **accurate**. The summary correctly restates the core definition and mentions the two standard processes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | The final answer is: வாயு நிலை தூய்மைப்படுத்தல் என்பது உலோகங்களைத் தூய்மைப்படுத்தும் ஒரு முறையாகும், இதில் உலோகம் ஒரு வாயுவுடன் வினைபுரிந்து ஆவியாகும் சேர்மத்தை உருவாக்குகிறது. பின்னர் இந்தச் சேர்மம் சிதைவடைந்து தூய உலோகத்தைத் தருகிறது. மாண்ட்ரேன் செயல்முறை மற்றும் வான் ஆர்கெல் செயல்முறை ஆகியவை இதற்கு எடுத்துக்காட்டுகள். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

