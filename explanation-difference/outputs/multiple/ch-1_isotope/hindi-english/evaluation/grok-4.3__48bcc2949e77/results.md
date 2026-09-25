# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains isotopes in Hindi, covering the definition, relationships between atomic and mass numbers, examples (hydrogen and carbon), chemical and physical properties, and notation.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 25,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2
  },
  "nested_passages": 25,
  "unique_subtopics": 4,
  "contextualization": {
    "everyday": 1,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: समस्थानिक की परिभाषा और परमाणु संरचना (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "कल्पना करो कि एक तत्व के परमाणु एक परिवार के सदस्य हैं। परिवार के सभी सदस्यों में कुछ चीजें एक जैसी होती हैं और कुछ अलग।"}]}

Annotation rationale: Defines isotopes and explains how the number of protons remains identical while neutron count differs, leading to identical atomic numbers but different mass numbers.

Accuracy: **accurate**. The definition of isotopes and the breakdown of atomic number versus mass number are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | समस्थानिक क्या हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम रसायन विज्ञान का एक आसान लेकिन महत्वपूर्ण टॉपिक समझेंगे — **समस्थानिक** (Isotopes)। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | कल्पना करो कि एक तत्व के परमाणु एक परिवार के सदस्य हैं। परिवार के सभी सदस्यों में कुछ चीजें एक जैसी होती हैं और कुछ अलग। ठीक उसी तरह: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | **समस्थानिक** एक ही तत्व के वे परमाणु होते हैं जिनमें **प्रोटॉन की संख्या समान** होती है, लेकिन **न्यूट्रॉन की संख्या भिन्न** होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | ### सरल परिभाषा: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | - परमाणु क्रमांक (Atomic number) = प्रोटॉन की संख्या → **एक समान** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | - द्रव्यमान संख्या (Mass number) = प्रोटॉन + न्यूट्रॉन → **भिन्न** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: हाइड्रोजन के समस्थानिक (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using the three isotopes of hydrogen: protium, deuterium, and tritium.

Accuracy: **accurate**. The proton counts, neutron counts, mass numbers, and symbols for protium, deuterium, and tritium are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### उदाहरण से समझो (बहुत आसान): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | **1. हाइड्रोजन के तीन समस्थानिक:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | &#124; समस्थानिक     &#124; प्रोटॉन &#124; न्यूट्रॉन &#124; द्रव्यमान संख्या &#124; नाम          &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p11 | &#124;----------------&#124;---------&#124;----------&#124;------------------&#124;--------------&#124; | EXAMPLE | {} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p12 | &#124; प्रोटियम      &#124; 1       &#124; 0        &#124; 1                &#124; ¹H           &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p13 | &#124; ड्यूटीरियम    &#124; 1       &#124; 1        &#124; 2                &#124; ²H (D)       &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124; ट्रिटियम      &#124; 1       &#124; 2        &#124; 3                &#124; ³H (T)       &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | सभी हाइड्रोजन हैं क्योंकि प्रोटॉन 1 है, लेकिन न्यूट्रॉन अलग होने से उनका वजन अलग है। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: कार्बन के समस्थानिक (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using Carbon-12 and Carbon-14, comparing their proton and neutron numbers.

Accuracy: **accurate**. The composition of Carbon-12 (6 protons, 6 neutrons) and Carbon-14 (6 protons, 8 neutrons) is correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | **2. कार्बन के समस्थानिक:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | - ¹²C → 6 प्रोटॉन + 6 न्यूट्रॉन | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | - ¹⁴C → 6 प्रोटॉन + 8 न्यूट्रॉन | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | दोनों कार्बन हैं, लेकिन ¹⁴C थोड़ा भारी है। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: समस्थानिकों के रासायनिक और भौतिक गुण (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemical properties of isotopes remain almost identical while physical properties differ.

Accuracy: **accurate**. Chemical properties depend on electron configuration (identical in neutral isotopes), and physical properties depend on mass, making the statements factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### समस्थानिकों के गुण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | - **रासायनिक गुण** लगभग एक जैसे होते हैं (क्योंकि इलेक्ट्रॉन की संख्या समान होती है)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p22 | - **भौतिक गुण** (जैसे घनत्व, गलनांक) थोड़े अलग हो सकते हैं क्योंकि द्रव्यमान अलग होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: समस्थानिकों का संकेतन (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains standard IUPAC notation convention for representing isotopes by placing the mass number as a superscript on the upper-left side.

Accuracy: **accurate**. The convention of writing the mass number as an upper-left superscript is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ### याद रखने वाली बात: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | समस्थानिकों को लिखते समय हम द्रव्यमान संख्या ऊपर बाईं तरफ लिखते हैं, जैसे ¹²C और ¹⁴C। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | अगर कोई सवाल हो (जैसे समस्थानिकों के उपयोग या अंतर) तो पूछो! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

