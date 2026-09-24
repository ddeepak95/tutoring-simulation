# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains vapour phase refining in Tamil, covering the underlying principles, necessary conditions, and the two classic industrial examples (Mond process for Ni and Van Arkel process for Ti/Zr).

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 44,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 44,
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

## u1: Definition and fundamental principle of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what vapour phase refining is, the two mandatory criteria for the metal/reagent, and outlines the general reaction sequence.

Accuracy: **accurate**. The definition, two fundamental conditions (forming volatile compound, easy thermal decomposition), and general schematic are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **வாயு நிலை சுத்திகரிப்பு (Vapour Phase Refining)** என்பது உலோகங்களை மிகவும் தூய்மையான நிலையில் பெறப் பயன்படுத்தப்படும் ஒரு சுத்திகரிப்பு முறையாகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | இதில், தூய்மையற்ற உலோகத்தை முதலில் ஒரு **எளிதில் ஆவியாகும் சேர்மமாக** மாற்றுகிறோம். பின்னர் அந்தச் சேர்மத்தை சூடுபடுத்தி அல்லது வேறு முறையில் சிதைத்து, மீண்டும் **தூய உலோகத்தை** பெறுகிறோம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## அடிப்படை கோட்பாடு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | இந்த முறையில் பயன்படுத்தப்படும் உலோகச் சேர்மம் இரண்டு பண்புகளைக் கொண்டிருக்க வேண்டும்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | 1. அது **எளிதில் ஆவியாக வேண்டும்** (volatile). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | 2. அதனை மீண்டும் சூடுபடுத்தும்போது, அது **சிதைந்து தூய உலோகத்தைத் தர வேண்டும்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | சுருக்கமாக: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | **தூய்மையற்ற உலோகம் → ஆவியாகும் சேர்மம் → சேர்மம் சிதைதல் → தூய உலோகம்** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Mond process for refining nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked real-world industrial illustration of vapour phase refining for nickel using carbon monoxide, detailing the steps, specific temperatures (330-350 K and 450-470 K), and chemical equations.

Accuracy: **accurate**. The reaction temperatures (330-350 K for Ni(CO)4 formation and 450-470 K for decomposition) and balanced chemical equations are correct for the Mond process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## உதாரணம் 1: நிக்கல் சுத்திகரிப்பு – மான்ட் முறை (Mond Process) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | நிக்கல் (Ni) சுத்திகரிக்க இந்த முறை பயன்படுகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | ### படி 1: நிக்கலை கார்பன் மோனாக்சைடுடன் சேர்த்தல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | தூய்மையற்ற நிக்கலை சுமார் **330–350 K** வெப்பநிலையில் கார்பன் மோனாக்சைடு வாயுவுடன் வினைபுரியச் செய்கிறார்கள். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p15 | \text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p17 | இதில் உருவாகும் **நிக்கல் டெட்ராகார்போனில்**, \(\text{Ni(CO)}_4\), ஒரு ஆவியாகும் சேர்மம். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | அசுத்திகள் பெரும்பாலும் ஆவியாகாது; எனவே அவை பின்னால் விடப்படுகின்றன. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | ### படி 2: சேர்மத்தைச் சிதைத்தல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | அந்த நிக்கல் கார்போனில் வாயுவை சுமார் **450–470 K** வெப்பநிலையில் சூடுபடுத்துகிறார்கள். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p22 | \text{Ni(CO)}_4 \rightarrow \text{Ni} + 4\text{CO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p24 | இதனால் மிகத் தூய்மையான நிக்கல் கிடைக்கிறது. கார்பன் மோனாக்சைடு மீண்டும் பயன்படுத்தப்படலாம். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Van Arkel method for refining titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked real-world industrial illustration of the Van Arkel iodide process for refining titanium and zirconium, detailing formation of TiI4 and decomposition on a hot tungsten filament.

Accuracy: **accurate**. The Van Arkel iodide method description, reactions (Ti + 2I2 -> TiI4 and decomposition on a tungsten filament), and application to Ti and Zr are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ## உதாரணம் 2: டைட்டானியம் மற்றும் சிர்கோனியம் – வான் ஆர்கெல் முறை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | டைட்டானியம் (Ti) மற்றும் சிர்கோனியம் (Zr) போன்ற உலோகங்களைச் சுத்திகரிக்க **அயோடைடு முறை** பயன்படுத்தப்படுகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | டைட்டானியம் அயோடினுடன் வினைபுரிந்து ஆவியாகும் டைட்டானியம் அயோடைடை உருவாக்குகிறது: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p30 | \text{Ti} + 2\text{I}_2 \rightarrow \text{TiI}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p32 | பின்னர் \(\text{TiI}_4\) ஐ அதிக வெப்பமுள்ள டங்ஸ்டன் கம்பியின் மீது செலுத்தும்போது அது சிதைகிறது: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p34 | \text{TiI}_4 \rightarrow \text{Ti} + 2\text{I}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p36 | இதனால் தூய டைட்டானியம் கம்பியின் மேல் படிகமாகப் படிகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Key features and limitations of vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents key characteristics and operational limitations of vapour phase refining (e.g. extreme purity achievable, limited applicability).

Accuracy: **accurate**. The listed points accurately represent the high purity outcome and the specific applicability limitations of the technique.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## முக்கிய அம்சங்கள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | - மிக அதிக தூய்மையுள்ள உலோகங்களைப் பெற முடியும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | - எல்லா உலோகங்களுக்கும் இந்த முறையைப் பயன்படுத்த முடியாது. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;] |
| p41 | - ஆவியாகக்கூடிய சேர்மங்களை உருவாக்கும் உலோகங்களுக்கு மட்டுமே இது ஏற்றது. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;] |
| p42 | - நிக்கல், டைட்டானியம், சிர்கோனியம் போன்ற உலோகங்கள் இம்முறையில் சுத்திகரிக்கப்படுகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: One-line summary of vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Offers a concise, one-sentence recap of the entire vapour phase refining process.

Accuracy: **accurate**. The summary accurately captures the two-step core of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | ## ஒரு வரியில் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | **உலோகத்தை முதலில் ஆவியாகும் சேர்மமாக மாற்றி, பின்னர் அந்தச் சேர்மத்தைச் சிதைத்து தூய உலோகத்தைப் பெறுவது வாயு நிலை சுத்திகரிப்பு ஆகும்.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

