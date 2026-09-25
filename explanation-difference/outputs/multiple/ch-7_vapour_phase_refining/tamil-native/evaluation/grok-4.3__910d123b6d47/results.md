# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and accurately explains vapour phase refining, including its principle, the Mond process for nickel, the Van Arkel process for titanium/zirconium, and the conditions required for this refining method.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 36,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 36,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and underlying principle of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the definition and mechanism of vapour phase refining: converting an impure metal into a volatile compound and subsequently decomposing it at higher temperatures to yield pure metal while leaving impurities behind.

Accuracy: **accurate**. The explanation correctly defines vapour phase refining and its two core principles (formation of a volatile compound and thermal decomposition to regenerate the pure metal).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **ஆவி நிலைமை தூய்மையாக்கல் (Vapour Phase Refining)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | மாணவரே, வணக்கம்! இன்று நாம் உயர்நிலைப் பள்ளி வேதியியலில் முக்கியமான ஒரு தூய்மைப்படுத்தும் முறையைப் பற்றி எளிய முறையில் பார்ப்போம். இது **ஆவி நிலைமை தூய்மையாக்கல்** அல்லது **வாயு நிலை சுத்திகரிப்பு** என்று அழைக்கப்படுகிறது. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### எளிய விளக்கம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | சில உலோகங்களை நேரடியாக உருக்கி அல்லது மின்னாற்றல் மூலம் தூய்மைப்படுத்த முடியாது. அப்போது அந்த உலோகம் **ஆவியாகும் (volatile) சேர்மங்களை** உருவாக்கி, அதை ஆவியாக்கி எடுத்து, பின்னர் மீண்டும் சிதைத்து தூய உலோகத்தைப் பெறும் முறைதான் **ஆவி நிலைமை தூய்மையாக்கல்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | **முக்கிய கொள்கை:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | உலோகம் + சில வேதிப்பொருட்கள் → ஆவியாகும் சேர்மம் (volatile compound)   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p7 | → இந்த ஆவியைச் சேகரித்து, அதிக வெப்பநிலையில் சிதைத்தால் தூய உலோகம் கிடைக்கும்.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | அசுத்தங்கள் இந்த வினையில் பங்கேற்காது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Mond process for the refining of nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the industrial Mond process for nickel, including chemical equations and temperature conditions.

Accuracy: **accurate**. The chemical reactions, intermediate nickel tetracarbonyl formation, decomposition conditions, and recycling of CO are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### 1. மாண்ட் முறை (Mond’s Process) – நிக்கல் (Ni) தூய்மைப்படுத்தல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | - நிக்கல் தாதுவில் இருக்கும் அசுத்தங்களை நீக்க இந்த முறை பயன்படுத்தப்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | - படிகள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 |   1. நிக்கல் உலோகத்தை 50–60°C வெப்பநிலையில் **கார்பன் மோனாக்சைடு (CO)** வாயுவுடன் வினைபுரிய வைக்கிறோம். | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 |      - Ni + 4CO → Ni(CO)₄ (நிக்கல் டெட்ராகார்பனைல்)   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p14 |        இது ஆவியாகும் தன்மை கொண்டது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 |   2. இந்த Ni(CO)₄ ஆவியை 150–200°C வரை சூடாக்குகிறோம். | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 |      - Ni(CO)₄ → Ni (தூய நிக்கல்) + 4CO   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p17 |        CO மீண்டும் பயன்படுத்தப்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 | - **சிறப்பு:** அசுத்தங்கள் எதுவும் Ni(CO)₄ உருவாக்காது. எனவே தூய நிக்கல் (99.9% வரை) கிடைக்கிறது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Van Arkel method for refining titanium and zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel process for ultra-pure titanium or zirconium, outlining iodide formation and decomposition over a heated tungsten filament.

Accuracy: **accurate**. The reaction equations, formation of volatile TiI4, its decomposition on a tungsten filament at high temperature (~1400°C), and regeneration of iodine are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### 2. வான் ஆர்க்கல் முறை (Van Arkel Process) – டைட்டானியம் (Ti) அல்லது சிர்கோனியம் (Zr) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | - உயர் தூய்மை தேவைப்படும் உலோகங்களுக்கு இது பயன்படுகிறது (எ.கா. விண்வெளி, அணு உலைகள்). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | - படிகள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 |   1. உலோகத்தை **அயோடினுடன்** சூடாக்கி ஆவியாகும் அயோடைடு உருவாக்குகிறோம். | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 |      - Ti + 2I₂ → TiI₄ (டைட்டானியம் டெட்ரா அயோடைடு – ஆவியாகும்) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p24 |   2. இந்த TiI₄ ஆவியை 1400°C வரை சூடாக்கிய ஒரு சூடான டங்ஸ்டன் இழையின் மீது செலுத்துகிறோம். | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 |      - TiI₄ → Ti (தூய உலோகம்) + 2I₂   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p26 |        அயோடின் மீண்டும் உருவாகி மறுபடியும் பயன்படுத்தப்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Prerequisites and reasons for using vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why vapour phase refining is chosen over conventional methods, emphasizing requirements such as ultra-high purity and the ability of the metal to form a volatile compound.

Accuracy: **accurate**. The stated criteria (need for ultra-high purity, failure of ordinary refining techniques, and volatility of the metal compound) are valid requirements.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ### ஏன் இந்த முறை பயன்படுகிறது? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | - உயர் தூய்மை (99.9%+) தேவைப்படும் உலோகங்களுக்கு. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 | - சாதாரண முறைகளில் அசுத்தங்கள் நீங்காதபோது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 | - உலோகம் ஆவியாகும் சேர்மம் உருவாக்கும் தன்மை கொண்டிருக்க வேண்டும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Summary recap and concluding remarks (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides bulleted summary takeaways to remember, followed by standard concluding and encouraging teacher remarks.

Accuracy: **accurate**. The summary accurately highlights key points of the vapour phase refining process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | **நினைவில் கொள்ள வேண்டியவை:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | - இது **இயற்பியல் + வேதியியல்** இரண்டும் கலந்த முறை. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 | - ஆவி நிலைக்கு மாற்றி, பின்னர் மீண்டும் திட நிலைக்கு கொண்டு வருகிறோம். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 | - உதாரண உலோகங்கள்: Ni, Ti, Zr, Be. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p35 | இப்போது உங்களுக்கு இந்த முறை புரிந்திருக்கும் என்று நம்புகிறேன். ஏதாவது சந்தேகம் இருந்தால் — “மாண்ட் முறையில் வெப்பநிலை என்ன?” அல்லது “வான் ஆர்க்கல் முறையின் வினைச் சமன்பாடு?” — என்று கேளுங்கள். நான் மேலும் எளிதாக விளக்குகிறேன்!  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p36 | நல்ல படிப்பு! 📚 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

