# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response explains chemical stoichiometry in Tamil, covering its definition, balanced equations, mole concept, mole ratios, worked numerical examples, real-world applications, and problem-solving steps.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 44,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 44,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and fundamentals of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the quantitative relationship between reactants and products in a chemical reaction and lists its two fundamental bases.

Accuracy: **accurate**. The definition and prerequisite principles (balancing chemical equations and using the mole unit) are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ஸ்டோய்கியோமெட்ரி என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ஸ்டோய்கியோமெட்ரி என்பது வேதியியலின் ஒரு முக்கியப் பகுதி. இது **வேதிவினைகளில் வினைபொருள்கள் (reactants) மற்றும் விளைபொருள்கள் (products)** இடையே உள்ள அளவு உறவுகளைப் பற்றி கூறுகிறது. எளிய வார்த்தைகளில் சொன்னால், ஒரு வேதிவினையில் எத்தனை கிராம் பொருள் தேவைப்படுகிறது, எத்தனை கிராம் உற்பத்தியாகும் என்பதை கணக்கிடும் முறைதான் ஸ்டோய்கியோமெட்ரி. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | இதற்கு அடிப்படை இரண்டு விஷயங்கள்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | 1. வேதிவினை சமன்பாட்டை **சரியாக சமநிலைப்படுத்துதல்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | 2. **மோல்** என்ற அலகைப் பயன்படுத்தி கணக்கிடுதல். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Water formation reaction and mole ratio (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how balanced reaction coefficients translate to molecular and molar ratios using the synthesis of water.

Accuracy: **accurate**. The equation 2H2 + O2 -> 2H2O and its interpretation in terms of molecules, moles, and the 2:1:2 ratio are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### எடுத்துக்காட்டுடன் புரிந்துகொள்வோம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | நீர் உருவாகும் எளிய வினையைப் பார்ப்போம்: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | **சமநிலைப்படுத்தப்பட்ட சமன்பாடு:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | 2H₂ + O₂ → 2H₂O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 | இதன் பொருள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | - 2 மூலக்கூறுகள் ஹைட்ரஜன் (H₂) + 1 மூலக்கூறு ஆக்ஸிஜன் (O₂) வினைபுரிந்தால் 2 மூலக்கூறுகள் நீர் (H₂O) உருவாகும். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 | - **மோல் அளவில்** இதை எழுதினால்:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p13 |   **2 மோல் H₂ + 1 மோல் O₂ → 2 மோல் H₂O** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p14 | இங்கு **2:1:2** என்ற மோல் விகிதம் (mole ratio) முக்கியம். இந்த விகிதத்தைப் பயன்படுத்தித்தான் நாம் கணக்கீடு செய்கிறோம். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: The mole and molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the definition of a mole with Avogadro's number and lists the molar masses of hydrogen, oxygen, and water.

Accuracy: **accurate**. Avogadro's number and the rounded molar masses (H2 = 2 g/mol, O2 = 32 g/mol, H2O = 18 g/mol) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### மோல் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - 1 மோல் = 6.022 × 10²³ துகள்கள் (அணுக்கள் அல்லது மூலக்கூறுகள்). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 | - ஒவ்வொரு பொருளுக்கும் **மோலார் நிறை** (molar mass) இருக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 |   - H₂ = 2 g/mol | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 |   - O₂ = 32 g/mol | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 |   - H₂O = 18 g/mol | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u4: Worked calculation: Water produced from 4 g of hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a complete step-by-step stoichiometric problem calculating the mass of water produced from 4 g of H2.

Accuracy: **accurate**. The conversion from 4 g H2 to 2 moles, stoichiometry yielding 2 moles H2O, and 2 moles H2O yielding 36 g are calculated correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### எளிய கணக்கீடு (உதாரணம்) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | **கேள்வி:** 4 கிராம் ஹைட்ரஜன் (H₂) எத்தனை கிராம் நீரை உருவாக்கும்? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | **தீர்வு (படிப்படியாக):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p24 | 1. முதலில் 4 கிராம் H₂ எத்தனை மோல் எனக் கணக்கிடு:   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 |    மோல் = நிறை / மோலார் நிறை = 4 / 2 = **2 மோல் H₂** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | 2. சமன்பாட்டின்படி: 2 மோல் H₂ → 2 மோல் H₂O   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 |    அதாவது 1 மோல் H₂ → 1 மோல் H₂O | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | 3. 2 மோல் H₂O உருவாகும். அதன் நிறை:   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 |    2 மோல் × 18 g/mol = **36 கிராம் நீர்** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | **முடிவு:** 4 கிராம் ஹைட்ரஜன் 36 கிராம் நீரை உருவாக்கும். | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Worked calculation: Oxygen required for 4 g of hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a secondary worked calculation determining the grams of oxygen required to react with 4 g of hydrogen.

Accuracy: **accurate**. Correctly shows that 2 moles of H2 (4 g) react with 1 mole of O2 (32 g).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ### மற்றொரு உதாரணம் (O₂ எவ்வளவு தேவை?) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | 4 கிராம் H₂ உடன் எத்தனை கிராம் O₂ தேவைப்படும்? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 | - 2 மோல் H₂ உடன் 1 மோல் O₂ தேவை. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p34 | - 1 மோல் O₂ = 32 கிராம். | EXAMPLE | {} | [&#x27;list&#x27;] |
| p35 | எனவே 4 கிராம் H₂ உடன் **32 கிராம் O₂** தேவை. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Practical importance and applications of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why stoichiometry is important in industry, limiting reactant calculations, and fields such as medicine and agriculture.

Accuracy: **accurate**. The listed applications (manufacturing yields, limiting reagent identification, pharmaceuticals/fertilizers) accurately reflect stoichiometric uses.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ### ஸ்டோய்கியோமெட்ரியின் முக்கியத்துவம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | - தொழிற்சாலைகளில் எத்தனை மூலப்பொருள் எடுத்து எத்தனை பொருள் தயாரிக்கலாம் எனத் தெரியும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 | - வினை முடிவடையாமல் போகாமல் இருக்க (limiting reagent) கணக்கிட உதவும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p39 | - மருந்து, உரம், உணவு உற்பத்தி போன்ற இடங்களில் பயன்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u7: Key takeaways and steps for stoichiometric calculations (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential procedural takeaways for solving stoichiometric problems and concludes with an offer for further practice.

Accuracy: **accurate**. The summary correctly emphasizes balancing equations first, using the mole ratio coefficients, and navigating mass to moles to mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | **நினைவில் கொள்ள வேண்டியவை:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | - சமன்பாட்டை எப்போதும் முதலில் சமநிலைப்படுத்து. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p42 | - மோல் விகிதத்தைப் பயன்படுத்து (எண்கள் மட்டுமே முக்கியம், அலகுகள் அல்ல). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p43 | - நிறை → மோல் → மோல் விகிதம் → மீண்டும் நிறை என்ற வரிசையில் கணக்கிடு. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p44 | இப்போது உனக்கு ஏதாவது சந்தேகம் இருந்தால் அல்லது ஒரு கணக்கீட்டைச் செய்யச் சொன்னால் சொல்லு. நாம் இன்னும் சில உதாரணங்களுடன் பயிற்சி செய்வோம்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

