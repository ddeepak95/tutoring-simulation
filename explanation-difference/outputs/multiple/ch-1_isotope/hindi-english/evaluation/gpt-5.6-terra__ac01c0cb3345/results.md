# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses the requested topic of isotopes, covering their definition, subatomic basis, examples, key properties, and practical applications.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 30,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 30,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and nuclear cause of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes and explains why they exist in terms of equal proton numbers and differing neutron numbers.

Accuracy: **accurate**. The definition of isotopes and the explanation relating atomic number, mass number, protons, and neutrons are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **समस्थानिक (Isotopes)** वे परमाणु होते हैं जो **एक ही तत्व** के होते हैं, इसलिए उनका **परमाणु क्रमांक (Atomic Number)** समान होता है, लेकिन उनके **द्रव्यमान संख्या (Mass Number)** अलग-अलग होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### ऐसा क्यों होता है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | किसी परमाणु में: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | - **प्रोटॉन** की संख्या = परमाणु क्रमांक   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - **प्रोटॉन + न्यूट्रॉन** की संख्या = द्रव्यमान संख्या   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | समस्थानिकों में प्रोटॉन की संख्या समान रहती है, लेकिन **न्यूट्रॉन की संख्या अलग** होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Carbon isotopes illustrative example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Uses carbon-12, carbon-13, and carbon-14 in a comparative table to illustrate how isotopes have identical proton numbers but different neutron numbers.

Accuracy: **accurate**. The proton, neutron, and mass numbers given for carbon-12, carbon-13, and carbon-14 are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### उदाहरण: कार्बन के समस्थानिक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | कार्बन का परमाणु क्रमांक **6** है। अर्थात कार्बन के हर परमाणु में 6 प्रोटॉन होंगे। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p10 | &#124; समस्थानिक &#124; प्रोटॉन &#124; न्यूट्रॉन &#124; द्रव्यमान संख्या &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p11 | &#124;---&#124;---:&#124;---:&#124;---:&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p12 | &#124; कार्बन-12 (¹²C) &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p13 | &#124; कार्बन-13 (¹³C) &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p14 | &#124; कार्बन-14 (¹⁴C) &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p15 | तीनों कार्बन हैं क्योंकि तीनों में 6 प्रोटॉन हैं। पर न्यूट्रॉन अलग होने के कारण उनका द्रव्यमान अलग है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Key properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes key properties of isotopes, explaining that chemical properties remain nearly identical due to identical electron arrangements while physical properties and nuclear stability differ.

Accuracy: **accurate**. All listed properties, including identical chemical behavior due to electron configuration and differing physical/radioactive properties, are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### मुख्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | 1. समस्थानिकों का **परमाणु क्रमांक समान** होता है।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | 2. उनका **द्रव्यमान संख्या अलग** होता है।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 | 3. उनके **रासायनिक गुण लगभग समान** होते हैं, क्योंकि इलेक्ट्रॉनों की व्यवस्था समान होती है।   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p21 | 4. उनके कुछ **भौतिक गुण अलग** हो सकते हैं, जैसे द्रव्यमान और स्थिरता।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 | 5. कुछ समस्थानिक **रेडियोधर्मी** होते हैं, जैसे कार्बन-14। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Application of carbon-14 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the specific application of carbon-14 in dating ancient objects and fossils.

Accuracy: **accurate**. Carbon-14 is accurately identified as the isotope used in radiocarbon dating of fossils and historical artifacts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### उपयोग | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | - **कार्बन-14:** पुरानी वस्तुओं, जीवाश्मों आदि की आयु जानने में   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Application of iodine-131 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the medical application of iodine-131 in treating thyroid disorders.

Accuracy: **accurate**. Iodine-131 is accurately cited as being used in the clinical management and treatment of thyroid diseases.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | - **आयोडीन-131:** थायरॉइड रोगों के उपचार में   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Application of cobalt-60 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the application of cobalt-60 in cancer radiation therapy and medical instrument sterilization.

Accuracy: **accurate**. Cobalt-60 is correctly identified for radiotherapy in cancer treatment and for irradiation sterilization of medical instruments.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | - **कोबाल्ट-60:** कैंसर उपचार और चिकित्सा उपकरणों को कीटाणुरहित करने में   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Application of uranium-235 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the industrial use of uranium-235 in nuclear power plants.

Accuracy: **accurate**. Uranium-235 is accurately identified as a fissile fuel used in nuclear power generation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | - **यूरेनियम-235:** परमाणु ऊर्जा उत्पादन में   | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Mnemonic for remembering isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a rhyming mnemonic couplet to help students remember the defining characteristics of isotopes.

Accuracy: **accurate**. The mnemonic accurately states that isotopes have the same protons and different neutrons within the same element.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | **याद रखने की ट्रिक:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | &gt; “एक ही तत्व, प्रोटॉन समान; न्यूट्रॉन अलग, समस्थानिक पहचान।” | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

