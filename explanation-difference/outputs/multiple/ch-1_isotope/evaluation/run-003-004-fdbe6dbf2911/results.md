# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Tamil**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains isotopes in Tamil, covering their definition, key characteristics, examples (hydrogen and carbon), applications, and a summary/etymology.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 40,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 40,
  "unique_subtopics": 5,
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

## u1: Definition of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines isotopes as atoms of the same element having the same atomic number/protons but different mass numbers/neutrons.

Accuracy: **accurate**. The definition correctly specifies identical atomic/proton numbers and differing mass/neutron numbers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # ஐசோடோப்புகள் (Isotopes) - விளக்கம் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## ஐசோடோப்பு என்றால் என்ன? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | ஒரு தனிமத்தின் **அணுக்கரு எண் (Atomic Number)** ஒன்றாக இருந்தும், **நிறை எண் (Mass Number)** வேறுபட்டு இருக்கும் அணுக்களை **ஐசோடோப்புகள்** என்று அழைக்கிறோம். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ### எளிமையான வரையறை: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | &gt; ஒரே தனிமத்தின் அணுக்கள், அவற்றின் **புரோட்டான்கள் எண்ணிக்கை சமமாக** இருந்தாலும், **நியூட்ரான்கள் எண்ணிக்கை வேறுபட்டு** இருந்தால் அவை ஐசோடோப்புகள் எனப்படும். | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Key properties and differences among isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the physical and chemical properties of isotopes in a tabular comparison, explaining that chemical properties remain identical while physical properties vary slightly due to mass.

Accuracy: **accurate**. All property comparisons (proton count, neutron count, mass number, identical chemical behavior, and differing physical behavior due to mass) are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## முக்கிய கருத்துக்கள் | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | &#124; அம்சம் &#124; விளக்கம் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124;--------&#124;----------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p10 | &#124; புரோட்டான் எண்ணிக்கை &#124; **சமம்** (Atomic Number மாறாது) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; நியூட்ரான் எண்ணிக்கை &#124; **வேறுபடும்** &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | &#124; நிறை எண் (Mass Number) &#124; **வேறுபடும்** &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p13 | &#124; வேதியியல் பண்புகள் &#124; **ஒரே மாதிரி** இருக்கும் &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p14 | &#124; இயற்பியல் பண்புகள் &#124; சிறிது **வேறுபடும்** (எடை காரணமாக) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Isotopes of hydrogen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents Protium, Deuterium, and Tritium as concrete illustrations of isotopes with subatomic particle breakdowns.

Accuracy: **accurate**. The proton and neutron counts for Protium (1p, 0n), Deuterium (1p, 1n), and Tritium (1p, 2n) are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## உதாரணம் 1: ஹைட்ரஜன் (Hydrogen) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | ஹைட்ரஜனுக்கு 3 ஐசோடோப்புகள் உள்ளன: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | 1. **புரோட்டியம் (Protium)** - ¹H | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 |    - 1 புரோட்டான், 0 நியூட்ரான் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | 2. **டியூட்டீரியம் (Deuterium)** - ²H | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 |    - 1 புரோட்டான், 1 நியூட்ரான் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 | 3. **ட்ரிட்டியம் (Tritium)** - ³H | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 |    - 1 புரோட்டான், 2 நியூட்ரான் | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | **கவனிக்க:** மூன்றிலும் புரோட்டான் எண்ணிக்கை = 1 (ஹைட்ரஜன் என்பதால்), ஆனால் நியூட்ரான் எண்ணிக்கை மாறுபடுகிறது. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Isotopes of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates carbon isotopes (Carbon-12, Carbon-13, Carbon-14) with their proton and neutron counts, noting the radioactivity of Carbon-14.

Accuracy: **accurate**. The composition and mass numbers of Carbon-12, 13, and 14, as well as the radioactive nature and archaeological dating use of Carbon-14, are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ## உதாரணம் 2: கார்பன் (Carbon) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | - **கார்பன்-12 (¹²C):** 6 புரோட்டான் + 6 நியூட்ரான் = 12 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | - **கார்பன்-13 (¹³C):** 6 புரோட்டான் + 7 நியூட்ரான் = 13 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | - **கார்பன்-14 (¹⁴C):** 6 புரோட்டான் + 8 நியூட்ரான் = 14 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p30 | இதில் கார்பன்-14 **கதிரியக்கத் தன்மை** உடையது - இது தொல்பொருள் ஆய்வில் காலம் கணிக்க பயன்படுகிறது (Carbon Dating). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Applications and importance of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists major real-world applications of specific isotopes in nuclear power, medicine, archaeology, and scientific research.

Accuracy: **accurate**. The applications cited (Uranium-235 in nuclear power, Cobalt-60 in cancer radiotherapy, Carbon dating, and radioisotopes as tracers) are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## ஏன் இது முக்கியம்? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | ✅ **அணு ஆற்றல்** உற்பத்தியில் (யுரேனியம்-235 ஐசோடோப்பு பயன்படுகிறது) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p34 | ✅ **மருத்துவத்தில்** - கோபால்ட்-60 புற்றுநோய் சிகிச்சையில் பயன்படுகிறது | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p35 | ✅ **தொல்பொருள் ஆய்வில்** - கார்பன் டேட்டிங் மூலம் பொருட்களின் வயதை கண்டறிதல் | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p36 | ✅ **விஞ்ஞான ஆராய்ச்சியில்** - கதிரியக்க ஐசோடோப்புகளை டிரேசராக பயன்படுத்துதல் | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Summary and etymology of isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick summary slogan and the Greek etymological origin of the term isotope (iso = same, topos = place) to reinforce learning.

Accuracy: **accurate**. The core recap statement and the Greek etymology (iso = same, topos = place, occupying the same place in the periodic table) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## சுருக்கமான நினைவூட்டல்: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | **&quot;ஒரே தனிமம், வேறு எடை&quot;** - இதுவே ஐசோடோப்பின் அடிப்படை! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p40 | நினைவில் கொள்ளுங்கள்: **Iso = ஒரே, Topos = இடம்** (கிரேக்க மொழியில்) - அதாவது இதே தனிம அட்டவணையில் **ஒரே இடத்தில்** இருக்கும் அணுக்கள் என்று பொருள். | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

