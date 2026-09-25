# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains the requested concept of isotopes in Tamil, covering definition, subatomic composition, notation, examples, properties, and applications.

## Counts

```json
{
  "total_content_units": 12,
  "substantive_content_units": 12,
  "total_passages": 65,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 65,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 12
  },
  "proposed_substantive_verdicts": {
    "accurate": 12
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the definition of isotopes as atoms of the same element differing in their neutron count.

Accuracy: **accurate**. The definition accurately states that isotopes are atoms of the same element that differ in neutron count.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **ஐசோடோப்புகள் (Isotopes)** என்பது ஒரே தனிமத்தைச் சேர்ந்த, ஆனால் **நியூட்ரான்களின் எண்ணிக்கையில் வேறுபடும் அணுக்கள்** ஆகும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Basic Atomic Structure and Atomic Number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the three main subatomic particles (proton, neutron, electron), their locations and charges, and establishes atomic number Z based on proton count.

Accuracy: **accurate**. The subatomic particle descriptions, locations, charges, and the definition of atomic number Z are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ### அணுவின் அடிப்படை அமைப்பு | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | ஒரு அணுவில் மூன்று முக்கிய துகள்கள் உள்ளன: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | - **புரோட்டான் (Proton)** – நேர்ம மின்சுமை; அணுக்கருவில் இருக்கும்   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - **நியூட்ரான் (Neutron)** – மின்சுமை இல்லாதது; அணுக்கருவில் இருக்கும்   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - **எலக்ட்ரான் (Electron)** – எதிர்ம மின்சுமை; அணுக்கருவைச் சுற்றி இருக்கும்   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | ஒரு தனிமம் எது என்பதை அதன் **புரோட்டான் எண்ணிக்கை** தீர்மானிக்கிறது. இதுவே அதன் **அணு எண் (Atomic Number, Z)**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p8 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Isotopes and Mass Number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that isotopes share proton and electron counts but have differing neutron counts, resulting in different mass numbers, and provides the formula for mass number.

Accuracy: **accurate**. The explanation of isotopic composition (same protons and electrons, different neutrons) and the relationship to mass number (A = protons + neutrons) is entirely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ## ஐசோடோப்புகளின் முக்கிய கருத்து | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | ஒரே தனிமத்தின் அனைத்து ஐசோடோப்புகளிலும்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | ✅ புரோட்டான்களின் எண்ணிக்கை ஒரே மாதிரியாக இருக்கும்.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | ✅ எலக்ட்ரான்களின் எண்ணிக்கையும் (நடுநிலை அணுவில்) ஒரே மாதிரியாக இருக்கும்.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | ❌ ஆனால் நியூட்ரான்களின் எண்ணிக்கை வேறுபடும்.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | இதனால் அவற்றின் **நிறை எண் (Mass Number)** மாறும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p15 | ### நிறை எண்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p17 | \text{நிறை எண்} = \text{புரோட்டான்கள் எண்ணிக்கை} + \text{நியூட்ரான்கள் எண்ணிக்கை} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p18 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Example: Carbon Isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a structured comparison of Carbon-12, Carbon-13, and Carbon-14, demonstrating how proton counts remain identical while neutron counts and mass numbers vary.

Accuracy: **accurate**. The table and explanation correctly give Carbon's atomic number as 6, with Carbon-12 having 6 neutrons, Carbon-13 having 7 neutrons, and Carbon-14 having 8 neutrons.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ## உதாரணம்: கார்பன் ஐசோடோப்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | கார்பன் (Carbon) அணு எண் **6**. அதனால் எல்லா கார்பன் அணுக்களிலும் 6 புரோட்டான்கள் இருக்கும். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | &#124; ஐசோடோப்பு &#124; புரோட்டான்கள் &#124; நியூட்ரான்கள் &#124; நிறை எண் &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p23 | &#124;---&#124;---:&#124;---:&#124;---:&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p24 | &#124; கார்பன்-12 (¹²C) &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p25 | &#124; கார்பன்-13 (¹³C) &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p26 | &#124; கார்பன்-14 (¹⁴C) &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p27 | இவை மூன்றும் கார்பன் தான்; ஏனெனில் மூன்றிலும் 6 புரோட்டான்கள் உள்ளன. ஆனால் நியூட்ரான்கள் வேறுபடுவதால் இவை ஐசோடோப்புகள் எனப்படுகின்றன. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Isotope Notation and Calculating Neutrons (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how isotopes are represented in standard nuclide notation using Carbon-12 as an example, identifying superscript as mass number, subscript as atomic number, and detailing how to calculate neutron count.

Accuracy: **accurate**. The notation format, identification of mass number and atomic number, and subtraction formula (12 - 6 = 6) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ## குறியீட்டு முறை | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | ஒரு ஐசோடோப்பை இவ்வாறு எழுதலாம்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p31 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p32 | {}^{12}_{6}\text{C} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p33 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p34 | இதில்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p35 | - மேலே உள்ள **12** = நிறை எண்   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p36 | - கீழே உள்ள **6** = அணு எண்   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p37 | - C = கார்பன் தனிமம்   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 | நியூட்ரான்களின் எண்ணிக்கை: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p39 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p40 | 12 - 6 = 6 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p41 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p42 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Chemical and Physical Properties of Isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Contrasts chemical properties (which are identical due to equal electron configurations) with physical properties (which vary slightly due to mass differences).

Accuracy: **accurate**. Correctly notes that chemical properties are similar because of identical electron and proton numbers, whereas physical properties like density and melting point differ due to mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | ## ஐசோடோப்புகளின் பண்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | ### வேதியியல் பண்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | ஐசோடோப்புகளின் வேதியியல் பண்புகள் பெரும்பாலும் ஒரே மாதிரியாக இருக்கும். காரணம், அவற்றின் புரோட்டான் மற்றும் எலக்ட்ரான் எண்ணிக்கை ஒரே மாதிரி. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p46 | ### இயற்பியல் பண்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | நிறை மாறுபடுவதால் சில இயற்பியல் பண்புகள் மாறலாம். உதாரணம்: அடர்த்தி, உருகுநிலை போன்றவை சிறிது மாறலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p48 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Classification: Stable and Radioactive Isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Differentiates stable isotopes from radioactive isotopes and gives appropriate elemental examples for both categories.

Accuracy: **accurate**. The distinction between stable and radioactive isotopes and the respective examples (C-12/C-13 vs C-14/U-235) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | ## நிலையான மற்றும் கதிரியக்க ஐசோடோப்புகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | 1. **நிலையான ஐசோடோப்புகள் (Stable isotopes)**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p51 |    இவை கதிர்வீச்சை வெளியிடாது.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p52 |    உதாரணம்: கார்பன்-12, கார்பன்-13. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p53 | 2. **கதிரியக்க ஐசோடோப்புகள் (Radioactive isotopes)**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p54 |    இவை நிலையற்றவை; கதிர்வீச்சை வெளியிடும்.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p55 |    உதாரணம்: கார்பன்-14, யுரேனியம்-235. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p56 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Application Example: Carbon-14 in Radiocarbon Dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Carbon-14 as an example used for dating ancient bones and wooden artifacts under the applications section.

Accuracy: **accurate**. The use of Carbon-14 in radiocarbon dating of ancient organic materials is factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p57 | ## பயன்பாடுகள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p58 | - **கார்பன்-14**: பழமையான எலும்புகள், மரப்பொருட்கள் போன்றவற்றின் வயதை கண்டறிய பயன்படுகிறது.   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Application Example: Iodine-131 in Thyroid Treatment (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Iodine-131 as an illustrative application in the treatment of thyroid disorders.

Accuracy: **accurate**. Iodine-131 is correctly identified as being used in the treatment of thyroid conditions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p59 | - **அயோடின்-131**: தைராய்டு நோய்களின் சிகிச்சையில் பயன்படுகிறது.   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Application Example: Cobalt-60 in Cancer Therapy (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Cobalt-60 as an illustrative real-world application in radiation therapy for cancer.

Accuracy: **accurate**. Cobalt-60 is accurately stated to be used in cancer radiotherapy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p60 | - **கோபால்ட்-60**: புற்றுநோய் சிகிச்சையில் பயன்படுகிறது.   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u11: Application Example: Uranium-235 in Nuclear Energy (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Uranium-235 as an illustrative real-world application for power generation in nuclear power plants.

Accuracy: **accurate**. Uranium-235 is correctly stated as a fuel for energy generation in nuclear power stations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p61 | - **யுரேனியம்-235**: அணு மின்நிலையங்களில் ஆற்றல் உற்பத்திக்கு பயன்படுகிறது. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p62 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u12: Summary of Isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps the core definition and key takeaway of isotopes concisely.

Accuracy: **accurate**. The recap accurately synthesizes the defining characteristics of isotopes: same atomic number, different mass numbers; equal proton counts, different neutron counts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p63 | ### சுருக்கமாக | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p64 | **ஒரே அணு எண், வேறு நிறை எண் கொண்ட ஒரே தனிமத்தின் அணுக்கள் ஐசோடோப்புகள் ஆகும்.**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p65 | அதாவது: **புரோட்டான்கள் ஒரே எண்ணிக்கை; நியூட்ரான்கள் வேறு எண்ணிக்கை.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

