# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains vapour phase refining in Tamil, including its introduction, two-step principle, essential conditions, two main examples (Mond process and Van Arkel process), and a concluding summary.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 32,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "CAVEAT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 32,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "contains_error": 2,
    "accurate": 4
  },
  "proposed_error_records": 2,
  "proposed_error_severity": {
    "minor": 2
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Introduction and Definition of Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines vapour phase refining by describing the general transformation of an impure metal into a volatile compound followed by decomposition.

Accuracy: **contains_error**. The text states that the metal is reacted with an inorganic gas or compound ('ஒரு கனிம வாயுவுடன் (compound)'), but the reagent does not need to be a compound or a gas; in the Van Arkel process, the reagent is elemental iodine (I₂).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # ஆவி நிலை சுத்திகரிப்பு (Vapour Phase Refining) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## அறிமுகம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | உலோகங்களை தூய்மையாக்கும் (சுத்திகரிப்பு) பல முறைகளில் ஆவி நிலை சுத்திகரிப்பும் ஒன்று. இந்த முறையில், **தூய்மையற்ற உலோகத்தை ஒரு கனிம வாயுவுடன் (compound) சேர்த்து, எளிதில் ஆவியாகக்கூடிய ஒரு சேர்மமாக மாற்றி**, பின்னர் அந்த ஆவியை சிதைத்து தூய உலோகத்தைப் பெறுவார்கள். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p3): The passage asserts that the impure metal is reacted with a 'கனிம வாயுவுடன் (compound)' (inorganic gas/compound), but the reagent can be an elemental halogen like iodine vapour (I₂), not necessarily a compound.

Correction: தூய்மையற்ற உலோகத்தை ஒரு தகுந்த வினைக்காரணியுடன் (reagent) சேர்த்து எளிதில் ஆவியாகக்கூடிய சேர்மமாக மாற்ற வேண்டும் (The metal is reacted with a suitable reagent, which may be an element such as iodine or a compound such as carbon monoxide).

## u2: Two-Step Principle of Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the foundational two-stage sequence of vapour phase refining: formation of a volatile compound and its subsequent thermal decomposition.

Accuracy: **accurate**. The two-stage principle of forming a volatile compound and thermally decomposing it to yield pure metal is correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## அடிப்படைக் கொள்கை (Principle) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | இந்த முறை இரண்டு படிநிலைகளில் நடைபெறும்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | 1. **படி 1:** தூய்மையற்ற உலோகம் + ஒரு வாயு (reagent) → **ஆவியாகும் சேர்மம் (Volatile compound)** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p7 | 2. **படி 2:** இந்த ஆவியாகும் சேர்மத்தை **சிதைவடையச் செய்து (decomposition)** தூய உலோகத்தைப் பிரித்தெடுத்தல். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Prerequisites and Essential Conditions for Vapour Phase Refining (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the necessary conditions that must be fulfilled for vapour phase refining to be feasible.

Accuracy: **contains_error**. The third condition incorrectly states that impurities should not react with 'this compound' ('இந்த சேர்மத்துடன்'), rather than stating that impurities should not react with the reagent.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | **முக்கிய நிபந்தனை:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | - உருவாகும் சேர்மம் **எளிதாக ஆவியாக வேண்டும்** | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p10 | - அது **எளிதில் சிதைவடையக்கூடியதாக** இருக்க வேண்டும் | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p11 | - தூய்மையின்மைகள் (impurities) இந்த சேர்மத்துடன் வினைபுரியக் கூடாது | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |

Error (minor; p11): The text states 'தூய்மையின்மைகள் (impurities) இந்த சேர்மத்துடன் வினைபுரியக் கூடாது' (impurities should not react with this compound). The actual qualification is that impurities must not react with the added reagent to form volatile species, so they remain unaffected and separate.

Correction: தூய்மையின்மைகள் வினைக்காரணியுடன் (reagent) வினைபுரியக் கூடாது (Impurities should not react with the reagent).

## u4: Mond's Process for Refining Nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a real-world industrial illustration of vapour phase refining via Mond's process for nickel, detailing the reaction steps, temperatures, and chemical equations.

Accuracy: **accurate**. The reaction temperatures (330-350 K for formation of nickel tetracarbonyl and 450-470 K for decomposition), stoichiometry, and recycling of CO are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## எடுத்துக்காட்டுகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | ### 1. மாண்ட் முறை (Mond&#x27;s Process) - நிக்கல் சுத்திகரிப்பு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | **படி 1:** தூய்மையற்ற நிக்கலை 330-350 K வெப்பநிலையில் கார்பன் மோனாக்சைடு (CO) வாயுவுடன் சூடாக்கும்போது, ஆவியாகும் **நிக்கல் டெட்ராகார்பொனைல்** உருவாகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 | $$Ni + 4CO \xrightarrow{330-350K} Ni(CO)_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | **படி 2:** இந்த ஆவியை 450-470 K என்ற அதிக வெப்பநிலைக்கு கொண்டு சென்றால், அது சிதைந்து தூய நிக்கலைக் கொடுக்கும். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | $$Ni(CO)_4 \xrightarrow{450-470K} Ni + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | இங்கு CO வாயு மீண்டும் மீண்டும் பயன்படுத்தப்படுகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Van Arkel Method for Refining Zirconium and Titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the Van Arkel method used to remove oxygen and nitrogen impurities from zirconium and titanium, including the reaction with iodine and decomposition on a tungsten filament.

Accuracy: **accurate**. The description of the Van Arkel process for Zr/Ti, specific removal of oxygen and nitrogen impurities, formation of ZrI₄ at 870 K, and decomposition on an 1800 K tungsten filament are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### 2. வான் ஆர்க்கல் முறை (Van Arkel Method) - Zr/Ti சுத்திகரிப்பு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | இது **ஜிர்கோனியம் (Zr)** மற்றும் **டைட்டானியம் (Ti)** போன்ற உலோகங்களில் இருந்து **நைட்ரஜன் மற்றும் ஆக்ஸிஜன்** போன்ற தூய்மையின்மைகளை நீக்க பயன்படுகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | **படி 1:** தூய்மையற்ற உலோகத்தை அயோடினுடன் (I₂) சேர்த்து சூடாக்கும்போது ஆவியாகும் சேர்மம் உருவாகும். | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | $$Zr + 2I_2 \xrightarrow{870K} ZrI_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | **படி 2:** இந்த ஆவியை மிக அதிக வெப்பநிலை கொண்ட (1800 K) டங்ஸ்டன் இழையின் (tungsten filament) மேல் பாய்ச்சும்போது, அது சிதைந்து தூய ஜிர்கோனியம் இழையின் மேல் படிகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p24 | $$ZrI_4 \xrightarrow{1800K} Zr + 2I_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u6: Summary Table and Applications (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap table summarizing the method, reactions, and resulting ultra-high purity (>99.9%) and applications in electronics and aerospace technology.

Accuracy: **accurate**. The summary accurately consolidates the core concepts and highlights the high purity output and technological applications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ## சுருக்கம் (Summary) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | &#124; அம்சம் &#124; விளக்கம் &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p27 | &#124;---&#124;---&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;, &#x27;separator&#x27;] |
| p28 | &#124; முறை &#124; தூய்மையற்ற உலோகத்தை ஆவியாகும் சேர்மமாக்கி பின் சிதைத்தல் &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p29 | &#124; உதாரணம் 1 &#124; Ni + CO → Ni(CO)₄ → Ni (மாண்ட் முறை) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p30 | &#124; உதாரணம் 2 &#124; Zr + I₂ → ZrI₄ → Zr (வான் ஆர்க்கல் முறை) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p31 | &#124; பயன் &#124; உயர் தூய்மை (high purity) கொண்ட உலோகங்களைப் பெற &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p32 | இந்த முறை மூலம் **99.9% தூய்மை** கொண்ட உலோகங்களைப் பெறலாம், இது மின்னணுவியல் (electronics) மற்றும் விண்வெளி தொழில்நுட்பம் போன்ற துறைகளில் மிகவும் முக்கியமானது. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

