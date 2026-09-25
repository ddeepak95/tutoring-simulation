# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation covers the concept of isotopes comprehensively in Tamil, including fundamental atomic structure, the formal definition of isotopes, an illustrative analogy, textbook examples (hydrogen and carbon), physical and chemical properties, practical applications, and a summary.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 47,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "ANALOGY": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 47,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 6,
    "everyday": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Fundamental atomic structure and definitions of atomic and mass numbers (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the three subatomic particles (protons, electrons, neutrons) and defines atomic number (Z) and mass number (A) as prerequisite concepts for understanding isotopes.

Accuracy: **accurate**. Accurately lists the three subatomic particles with their charges and defines atomic number as the number of protons and mass number as the sum of protons and neutrons.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | வணக்கம்! வேதியியலில் (Chemistry) மிக முக்கியமான, அதே சமயம் மிகவும் சுவாரசியமான ஒரு தலைப்புதான் **&quot;ஐசோடோப்புகள்&quot; (Isotopes)**. இதை மிக எளிமையாகப் புரிந்து கொள்ளலாம். | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | முதலில் ஒரு அணுவின் (Atom) அமைப்பை லேசாக நினைவுபடுத்திக் கொள்வோம்.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | ஒரு அணுவின் உள்ளே மூன்று துகள்கள் இருக்கும்: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | 1. **புரோட்டான் ($p$):** நேர் மின்சுமை (+) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | 2. **எலக்ட்ரான் ($e$):** எதிர் மின்சுமை (-) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | 3. **நியூட்ரான் ($n$):** மின்சுமை அற்றது (0) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | இங்கே, **அணு எண் (Atomic Number - $Z$)** என்பது புரோட்டான்களின் எண்ணிக்கை (இதுதான் அந்த தனிமத்தின் அடையாளம்/Identity). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | **நிறை எண் (Mass Number - $A$)** என்பது புரோட்டான் மற்றும் நியூட்ரான்களின் மொத்த எண்ணிக்கை ($p + n$). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Definition of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes formally as atoms of the same element with identical atomic numbers but different mass numbers, explaining that they have equal protons but different numbers of neutrons.

Accuracy: **accurate**. The definition and breakdown into identical proton counts and differing neutron counts are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### ஐசோடோப்புகள் என்றால் என்ன? (Definition) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | &gt; **&quot;ஒரே அணு எண்ணையும், வெவ்வேறு நிறை எண்களையும் கொண்ட ஒரே தனிமத்தின் வெவ்வேறு அணுக்களே ஐசோடோப்புகள் எனப்படும்.&quot;** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | இன்னும் சுலபமாகச் சொன்னால்:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | * இவற்றில் **புரோட்டான்களின் எண்ணிக்கை சமமாக இருக்கும்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p14 | * ஆனால், **நியூட்ரான்களின் எண்ணிக்கை மட்டும் மாறுபடும்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u3: Twins analogy for isotopes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p16", "quote": "ஒரே மாதிரியான உருவம் கொண்ட இரட்டைப் பிறவிகளை (Twins) நினைத்துக் கொள்ளுங்கள். இருவரும் ஒரே ஆள்தான் (ஒரே புரோட்டான்). ஆனால், ஒருவரின் பாக்கெட்டில் இரண்டு கற்கள் கூடுதலாக இருக்கிறது என்று வைத்துக்கொள்வோம், அதனால் அவரது எடை மட்டும் சற்று கூடுதலாக இருக்கும் (அதிக நியூட்ரான்). இதுதான் ஐசோடோப்!"}]}

Annotation rationale: Compares isotopes to identical twins where one twin carries stones in their pocket, illustrating identical identity but differing mass.

Accuracy: **accurate**. The analogy clearly and accurately captures the concept that the elemental identity (person/proton) remains the same while extra neutral weight (stones in pocket/neutrons) accounts for the mass difference.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | #### ஒரு எளிய உதாரணம் (Analogy): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | ஒரே மாதிரியான உருவம் கொண்ட இரட்டைப் பிறவிகளை (Twins) நினைத்துக் கொள்ளுங்கள். இருவரும் ஒரே ஆள்தான் (ஒரே புரோட்டான்). ஆனால், ஒருவரின் பாக்கெட்டில் இரண்டு கற்கள் கூடுதலாக இருக்கிறது என்று வைத்துக்கொள்வோம், அதனால் அவரது எடை மட்டும் சற்று கூடுதலாக இருக்கும் (அதிக நியூட்ரான்). இதுதான் ஐசோடோப்! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p17 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Hydrogen isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents protium, deuterium, and tritium as real-world examples of hydrogen isotopes.

Accuracy: **accurate**. Correctly states the proton and neutron counts for protium (1p, 0n), deuterium (1p, 1n), and tritium (1p, 2n) as well as deuterium's use in heavy water and tritium's radioactivity.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### பாடப்புத்தக உதாரணங்கள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | #### 1. ஹைட்ரஜனின் ஐசோடோப்புகள் (மிக முக்கியமானது): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | இயற்கையில் ஹைட்ரஜன் மூன்று வடிவங்களில் கிடைக்கிறது: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | * **புரோட்டியம் ($^1H_1$):** 1 புரோட்டான், **0 நியூட்ரான்** (நாம் சாதாரணமாகப் பார்க்கும் ஹைட்ரஜன்). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 | * **டியூட்ரியம் ($^2H_1$):** 1 புரோட்டான், **1 நியூட்ரான்** (இதை &#x27;கன ஹைட்ரஜன்&#x27; என்பர். இது கனநீர் தயாரிக்கப் பயன்படும்). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 | * **ட்ரிட்டியம் ($^3H_1$):** 1 புரோட்டான், **2 நியூட்ரான்** (இது ஒரு கதிரியக்கத் தனிமம்). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | *(கவனித்தீர்களா? மூன்றிலுமே கீழே உள்ள அணு எண் &#x27;1&#x27; தான், ஆனால் மேலே உள்ள நிறை எண் 1, 2, 3 என மாறுகிறது).* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Carbon isotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p26", "quote": "நமது உடலில், மரங்களில் இருப்பது"}]}

Annotation rationale: Presents carbon-12 and carbon-14 as illustrative examples of carbon isotopes.

Accuracy: **accurate**. Accurately details carbon-12 (6p, 6n) and carbon-14 (6p, 8n) and notes that carbon-14 is radioactive.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | #### 2. கார்பன் ஐசோடோப்புகள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | * **கார்பன்-12 ($^{12}C_6$):** 6 புரோட்டான், 6 நியூட்ரான் (நமது உடலில், மரங்களில் இருப்பது). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | * **கார்பன்-14 ($^{14}C_6$):** 6 புரோட்டான், 8 நியூட்ரான் (கதிரியக்கம் கொண்டது). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have similar chemical properties (same electron configuration) but differing physical properties (different mass).

Accuracy: **accurate**. The explanation linking chemical behavior to electron count and physical variations (boiling/melting points, density) to atomic mass is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### ஐசோடோப்புகளின் முக்கிய பண்புகள்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | 1. **வேதிப்பண்புகள் (Chemical Properties):**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 |    ஐசோடோப்புகளின் எலக்ட்ரான் எண்ணிக்கை சமமாக இருப்பதால், அவற்றின் **வேதி வினைகள் ஒரே மாதிரியாகவே இருக்கும்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p32 | 2. **இயற்பியல் பண்புகள் (Physical Properties):**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 |    நிறை (Mass) மாறுபடுவதால் கொதிநிலை, உருகுநிலை, அடர்த்தி போன்ற **இயற்பியல் பண்புகள் சற்று மாறுபடும்**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Applications of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists standard practical and medical applications of specific radioisotopes (C-14, I-131, Co-60, U-235).

Accuracy: **accurate**. All listed isotope applications (Carbon-14 for dating fossils, Iodine-131 for thyroid treatment, Cobalt-60 for cancer radiotherapy, and Uranium-235 for nuclear power) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | ### ஐசோடோப்புகள் எதற்குப் பயன்படுகின்றன? (Applications) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | தேர்வில் அடிக்கடி கேட்கப்படும் பகுதி இது: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p37 | * **கார்பன் வயது கணிப்பு (Carbon Dating):** கார்பன்-14 ஐப் பயன்படுத்தி பல ஆயிரம் ஆண்டுகள் பழமையான மரங்கள், புதைபடிமங்களின் (fossils) வயதைக் கணக்கிடலாம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 | * **மருத்துவம் (Medicine):**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p39 |   * **அயோடின்-131 ($^{131}I$):** தைராய்டு நோயைக் குணப்படுத்தப் பயன்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 |   * **கோபால்ட்-60 ($^{60}Co$):** புற்றுநோய் (Cancer) சிகிச்சையில் கதிர்வீச்சுக்கு பயன்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p41 | * **ஆற்றல் (Nuclear Energy):** **யுரேனியம்-235 ($^{235}U$)** அணு உலைகளில் மின்சாரம் தயாரிக்கப் பயன்படுகிறது. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p42 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Summary recap of isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key defining rules of isotopes in bullet form for easy memorization and review, accompanied by a polite closing invitation for questions.

Accuracy: **accurate**. The recap accurately synthesizes the core definition: same protons/atomic number, differing neutrons/mass number.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | ### சுருக்கமாக நினைவில் வைக்க (Summary): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | * **ஐசோடோப் = ஒரே புரோட்டான் + வேறுபட்ட நியூட்ரான்.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p45 | * அணு எண் (கீழே இருப்பது) = சமம். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p46 | * நிறை எண் (மேலே இருப்பது) = வேறுபடும். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p47 | இதில் ஏதேனும் சந்தேகம் இருந்தால் தாராளமாகக் கேட்கலாம்! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

