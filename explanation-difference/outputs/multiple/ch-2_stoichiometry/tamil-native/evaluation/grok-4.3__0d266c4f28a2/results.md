# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and accurately explains stoichiometric ratios, balancing equations, mole ratios, limiting reagents, and their applications.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 38,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 38,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Chemical reactions and the necessity of balancing equations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the subject, defines a chemical reaction, grounds it in the law of conservation of mass, and explains why balancing chemical equations is required to determine stoichiometric ratios.

Accuracy: **accurate**. The description of chemical reactions, the conservation of atoms according to the law of conservation of mass, and the need for balanced equations is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம் மாணவரே! நீங்கள் வேதி வினைக் கூறுகளின் விகிதம் (stoichiometric ratio) பற்றி கேட்டீர்கள். இதை ஒரு நல்ல ஆசிரியர் மாதிரி, எளிய உதாரணங்களுடன் படிப்படியாக விளக்குகிறேன். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### வேதி வினை என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | வேதி வினை என்பது, இரண்டு அல்லது அதற்கு மேற்பட்ட பொருட்கள் ஒன்றுடன் ஒன்று வினைபுரிந்து, புதிய பொருட்களை உருவாக்கும் செயல். இதில் **அணுக்கள் எண்ணிக்கை மாறாது** (நிறை பாதுகாப்பு விதி). அதாவது, வினைக்கு முன் இருந்த அணுக்கள் எண்ணிக்கை, வினைக்குப் பின் இருக்கும் அணுக்கள் எண்ணிக்கைக்கு சமம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | இதைச் சரியாகக் காட்ட, வேதி சமன்பாட்டை **சமநிலைப்படுத்த** வேண்டும். சமநிலைப்படுத்திய சமன்பாட்டிலிருந்துதான் கூறுகளின் விகிதம் தெரியும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Water formation stoichiometry and coefficients (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates stoichiometric coefficients and ratios between reactants and products using the reaction forming water.

Accuracy: **accurate**. The equation 2H2 + O2 -> 2H2O is properly balanced, and the derived molecular and coefficient ratios (2:1, 2:2, 1:2) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### எளிய உதாரணம்: நீர் உருவாக்கம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | ஹைட்ரஜன் வாயு + ஆக்ஸிஜன் வாயு → நீர் | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p7 | சமன்பாட்டை சமநிலைப்படுத்திய பிறகு: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | **2H₂ + O₂ → 2H₂O** | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p9 | இங்கு: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | - **2** மூலக்கூறு ஹைட்ரஜன் (H₂) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | - **1** மூலக்கூறு ஆக்ஸிஜன் (O₂) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 | - இவை வினைபுரிந்து **2** மூலக்கூறு நீர் (H₂O) உருவாகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p13 | இதிலிருந்து நாம் பெறும் விகிதம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | - ஹைட்ரஜன் : ஆக்ஸிஜன் = **2 : 1** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | - ஹைட்ரஜன் : நீர் = **2 : 2** (அல்லது 1 : 1) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | - ஆக்ஸிஜன் : நீர் = **1 : 2** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | இந்த எண்கள் (2, 1, 2) **குணகங்கள்** (coefficients) என்று அழைக்கப்படும். இவைதான் விகிதத்தைக் காட்டுகின்றன. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Mole ratios in chemical reactions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the coefficients directly represent macroscopic mole ratios based on Avogadro's number.

Accuracy: **accurate**. Avogadro's constant and the concept that stoichiometric coefficients translate directly to mole ratios are accurately presented.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### மோல் விகிதம் என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | வேதியியலில் நாம் பொருட்களை **மோல்** என்ற அலகில் அளக்கிறோம் (1 மோல் = 6.022 × 10²³ துகள்கள்). மேலே உள்ள எண்கள் மோல் விகிதத்தையும் காட்டுகின்றன: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | - 2 மோல் H₂ + 1 மோல் O₂ → 2 மோல் H₂O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p21 | அதாவது, **2 மோல் ஹைட்ரஜன்**க்கு **1 மோல் ஆக்ஸிஜன்** தேவை. இந்த விகிதத்தை மாற்றினால் வினை சரியாக நடக்காது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Combustion of methane stoichiometry (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a second worked illustrative example demonstrating balancing and ratio determination for methane combustion.

Accuracy: **accurate**. The equation CH4 + 2O2 -> CO2 + 2H2O is properly balanced, and the extracted stoichiometric ratios are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ### இன்னொரு உதாரணம்: மீத்தேன் எரிதல் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | CH₄ + O₂ → CO₂ + H₂O   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | சமநிலைப்படுத்திய பிறகு:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p25 | **CH₄ + 2O₂ → CO₂ + 2H₂O** | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | விகிதம்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p27 | - CH₄ : O₂ = **1 : 2** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | - CH₄ : CO₂ = **1 : 1** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | - O₂ : H₂O = **2 : 2** (அல்லது 1 : 1) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Importance and applications of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why stoichiometric ratios are essential, detailing mass calculations, the limiting reagent concept, and industrial applications.

Accuracy: **accurate**. The applications of stoichiometry in mass-to-mass calculations, identifying limiting reagents, and optimizing industrial chemical processes are accurately described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ### இந்த விகிதம் ஏன் முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | 1. **தேவையான அளவு கணக்கிட**: எத்தனை கிராம் ஹைட்ரஜன் எடுத்தால் எத்தனை கிராம் நீர் வரும் என்பதை அறியலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p32 | 2. **வரம்பு உற்பத்திப் பொருள் (Limiting reagent)**: எந்தப் பொருள் முதலில் தீர்ந்துவிடுமோ அது வினையை நிறுத்திவிடும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p33 | 3. **தொழிலில் பயன்**: உரம், மருந்து, எரிபொருள் தயாரிப்பில் சரியான விகிதம் தெரிந்தால் வீணாகாது. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Summary recap and concluding remarks (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps the primary rules of stoichiometry (balancing first, coefficients as ratios, mole/particle basis rather than direct mass ratios) and provides teacherly closing remarks.

Accuracy: **accurate**. The recap correctly summarizes the core rules of stoichiometry, including the critical distinction that stoichiometric coefficients represent mole or particle counts rather than direct mass ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ### சுருக்கமாக நினைவில் கொள்ள வேண்டியவை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | - எப்போதும் சமன்பாட்டை முதலில் சமநிலைப்படுத்து. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p36 | - குணகங்களே விகிதத்தைக் காட்டும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p37 | - விகிதம் மோல் அல்லது துகள்களின் எண்ணிக்கையில் இருக்கும் (நிறையில் அல்ல). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p38 | இப்போது உனக்கு புரிந்ததா? இன்னும் எந்த உதாரணத்தை விரிவாக விளக்க வேண்டும்? அல்லது ஒரு கணக்கு (எ.கா. 5 மோல் H₂ இருந்தால் எத்தனை மோல் நீர் வரும்?) கேட்க வேண்டுமா? சொல்லு, உனக்கு ஏற்றவாறு விளக்குகிறேன்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

