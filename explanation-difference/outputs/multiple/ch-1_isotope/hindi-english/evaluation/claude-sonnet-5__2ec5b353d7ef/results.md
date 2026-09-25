# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses isotopes in Hindi, defining them, providing an everyday sibling analogy, explaining the mass number formula, detailing hydrogen and carbon isotopes as examples, explaining their chemical and physical properties, and giving a mnemonic based on the Hindi term.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5,
    "everyday": 1,
    "localized": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what isotopes are in terms of having the same atomic number but different mass numbers.

Accuracy: **accurate**. Correctly states the standard definition of isotopes having the same atomic number and different mass numbers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # समस्थानिक (Isotope) - सरल भाषा में समझाएं | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## परिभाषा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **समस्थानिक** (Isotope) वे तत्व होते हैं जिनका **परमाणु क्रमांक (Atomic Number) समान** होता है, लेकिन उनका **द्रव्यमान संख्या (Mass Number) अलग-अलग** होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Family sibling analogy for isotopes (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "सोचिए कि एक ही परिवार के भाई-बहन हैं:"}, {"passage_id": "p6", "quote": "- उनके **माता-पिता एक ही हैं** (यानी पहचान एक जैसी)"}, {"passage_id": "p7", "quote": "- लेकिन उनका **वजन अलग-अलग** हो सकता है"}]}

Annotation rationale: Uses the analogy of siblings sharing parents (same identity/protons) but having different body weights (different neutrons) to make the concept accessible.

Accuracy: **accurate**. The analogy accurately corresponds to the subatomic distinction between protons and neutrons.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## आसान भाषा में समझें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | सोचिए कि एक ही परिवार के भाई-बहन हैं: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | - उनके **माता-पिता एक ही हैं** (यानी पहचान एक जैसी) | ANALOGY | {} | [&#x27;list&#x27;] |
| p7 | - लेकिन उनका **वजन अलग-अलग** हो सकता है | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | ठीक इसी तरह, समस्थानिकों में: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | - **प्रोटॉन (Protons) की संख्या समान** होती है | ANALOGY | {} | [&#x27;list&#x27;] |
| p10 | - लेकिन **न्यूट्रॉन (Neutrons) की संख्या अलग-अलग** होती है | ANALOGY | {} | [&#x27;list&#x27;] |

## u3: Mass number formula and variation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula for mass number and explains how varying the neutron count causes the mass number to differ while protons remain unchanged.

Accuracy: **accurate**. The formula A = Protons + Neutrons and the reasoning for mass number change are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ## सूत्र याद रखें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | $$\text{द्रव्यमान संख्या (A)} = \text{प्रोटॉन} + \text{न्यूट्रॉन}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p13 | चूंकि प्रोटॉन की संख्या (परमाणु क्रमांक) समान रहती है, इसलिए न्यूट्रॉन की संख्या बदलने से द्रव्यमान संख्या बदल जाती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Hydrogen isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents protium, deuterium, and tritium in a structured table detailing protons, neutrons, and mass numbers.

Accuracy: **accurate**. The subatomic particle counts and mass numbers for protium, deuterium, and tritium are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## उदाहरण: हाइड्रोजन के समस्थानिक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | &#124; नाम &#124; प्रोटॉन &#124; न्यूट्रॉन &#124; द्रव्यमान संख्या &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p16 | &#124;------&#124;---------&#124;-----------&#124;-------------------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | &#124; प्रोटियम (¹H) &#124; 1 &#124; 0 &#124; 1 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p18 | &#124; ड्यूटीरियम (²H) &#124; 1 &#124; 1 &#124; 2 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p19 | &#124; ट्राइटियम (³H) &#124; 1 &#124; 2 &#124; 3 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p20 | देखिए! तीनों में **प्रोटॉन = 1** है, लेकिन **न्यूट्रॉन अलग-अलग** हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Carbon isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates carbon-12 and carbon-14 with their respective proton and neutron counts.

Accuracy: **accurate**. The proton and neutron numbers for carbon-12 (6p, 6n) and carbon-14 (6p, 8n) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ## एक और उदाहरण: कार्बन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | - कार्बन-12 (¹²C): 6 प्रोटॉन + 6 न्यूट्रॉन | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 | - कार्बन-14 (¹⁴C): 6 प्रोटॉन + 8 न्यूट्रॉन | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have identical chemical properties (same electron structure) but different physical properties and share the same spot in the periodic table.

Accuracy: **accurate**. The explanations regarding chemical properties, physical properties, and periodic table positioning are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ## मुख्य बिंदु (याद रखने के लिए) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | ✅ समस्थानिकों के **रासायनिक गुण (Chemical Properties) समान** होते हैं (क्योंकि इलेक्ट्रॉन संख्या समान होती है) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p26 | ✅ लेकिन उनके **भौतिक गुण (Physical Properties) अलग** हो सकते हैं (जैसे घनत्व, क्वथनांक) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 | ✅ आवर्त सारणी (Periodic Table) में समस्थानिक **एक ही स्थान** पर रखे जाते हैं | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u7: Mnemonic trick using Hindi word breakdown (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p29", "quote": "**\"समस्थानिक\"** शब्द को तोड़ें:"}, {"passage_id": "p30", "quote": "- **सम** = समान (Same)"}, {"passage_id": "p31", "quote": "- **स्थानिक** = स्थान (Place/Position)"}]}

Annotation rationale: Provides a mnemonic strategy by breaking down the Hindi term 'समस्थानिक' into 'सम' (same) and 'स्थानिक' (place) to remember that they occupy the same position in the periodic table.

Accuracy: **accurate**. The morphological breakdown of the Sanskrit/Hindi term 'समस्थानिक' accurately mirrors the Greek etymology of isotope (isos + topos, meaning same place) and correctly reflects its periodic table placement.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ## याद रखने की ट्रिक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | **&quot;समस्थानिक&quot;** शब्द को तोड़ें: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p30 | - **सम** = समान (Same) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p31 | - **स्थानिक** = स्थान (Place/Position) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p32 | यानी &quot;एक ही स्थान पर रहने वाले&quot; - आवर्त सारणी में एक ही जगह! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p33 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p34 | क्या आप चाहेंगे कि मैं **समभारिक (Isobars)** या **समन्यूट्रॉनिक (Isotones)** के बारे में भी समझाऊं, ताकि आप इनके बीच का अंतर स्पष्ट रूप से समझ सकें? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

