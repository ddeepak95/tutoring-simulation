# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and comprehensively explains the concept of isotopes, including definition, underlying atomic concepts, concrete examples, properties, and applications.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 37,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 37,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 10
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Introductory definition of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the introductory definition of isotopes as atoms of the same element with different numbers of neutrons.

Accuracy: **accurate**. The definition accurately states that isotopes are atoms of the same element that have different numbers of neutrons.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | समस्थानिक (Isotopes) ऐसे परमाणु होते हैं जो **एक ही तत्व** के होते हैं, लेकिन उनके **न्यूट्रॉनों की संख्या अलग-अलग** होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Subatomic particles and atomic number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents foundational atomic structure concepts: the three subatomic particles and the definition of atomic number.

Accuracy: **accurate**. Accurately identifies protons as positively charged, neutrons as uncharged, electrons as negatively charged, and atomic number as defined by proton count.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ### पहले परमाणु को समझें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | परमाणु में मुख्यतः तीन कण होते हैं: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | - **प्रोटॉन**: धनावेशित कण   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - **न्यूट्रॉन**: आवेशहीन कण   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - **इलेक्ट्रॉन**: ऋणावेशित कण   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | किसी तत्व की पहचान उसके **प्रोटॉनों की संख्या** से होती है। इसे **परमाणु क्रमांक (Atomic Number)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Formal definition of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Formally summarizes the criteria for isotopes based on proton and neutron counts.

Accuracy: **accurate**. The criteria (equal number of protons, different number of neutrons) correctly define isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ### समस्थानिक की परिभाषा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | जब दो या अधिक परमाणुओं में: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | - प्रोटॉनों की संख्या **समान** हो, | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | - लेकिन न्यूट्रॉनों की संख्या **भिन्न** हो, | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | तो वे उस तत्व के **समस्थानिक** कहलाते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Carbon isotopes comparison (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through carbon isotopes (C-12, C-13, C-14) using a table to show proton, neutron, and mass numbers, explaining why they are isotopes.

Accuracy: **accurate**. All subatomic counts (protons and neutrons) and mass numbers for carbon-12, carbon-13, and carbon-14 are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## उदाहरण: कार्बन के समस्थानिक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | कार्बन का परमाणु क्रमांक 6 है, अर्थात हर कार्बन परमाणु में 6 प्रोटॉन होते हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | &#124; समस्थानिक &#124; प्रोटॉन &#124; न्यूट्रॉन &#124; द्रव्यमान संख्या &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p17 | &#124;---&#124;---:&#124;---:&#124;---:&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p18 | &#124; कार्बन-12 &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p19 | &#124; कार्बन-13 &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p20 | &#124; कार्बन-14 &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p21 | इन तीनों में प्रोटॉन 6 हैं, इसलिए ये सभी कार्बन हैं। पर न्यूट्रॉन अलग होने के कारण इनका द्रव्यमान अलग है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes have similar chemical properties (electron and proton configuration) while their physical properties (mass, density, radioactivity) can differ.

Accuracy: **accurate**. The explanation correctly identifies that identical electronic configuration leads to nearly identical chemical behavior, whereas differing masses cause differing physical and nuclear properties.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## समस्थानिकों के गुण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | 1. **रासायनिक गुण लगभग समान होते हैं**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p25 |    क्योंकि रासायनिक व्यवहार मुख्यतः इलेक्ट्रॉनों और प्रोटॉनों की संख्या पर निर्भर करता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p26 | 2. **भौतिक गुण अलग हो सकते हैं**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 |    जैसे द्रव्यमान, घनत्व और रेडियोधर्मिता। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p28 | 3. कुछ समस्थानिक **स्थिर** होते हैं, जबकि कुछ **रेडियोधर्मी** होते हैं।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 |    उदाहरण: कार्बन-14 रेडियोधर्मी है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Application of carbon-14 in radiocarbon dating (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of carbon-14 in dating ancient biological and archaeological artifacts.

Accuracy: **accurate**. Carbon-14 is accurately described as being used for radiocarbon dating of organic archaeological artifacts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## उपयोग | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | - **कार्बन-14**: पुरानी हड्डियों, लकड़ी और पुरातात्त्विक वस्तुओं की आयु ज्ञात करने में। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Application of cobalt-60 in cancer treatment (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of cobalt-60 radiation therapy in treating cancer.

Accuracy: **accurate**. Cobalt-60 is widely used in radiation therapy for cancer treatment.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | - **कोबाल्ट-60**: कैंसर के उपचार में। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Application of iodine-131 in thyroid treatment (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the medical application of iodine-131 in diagnosing and treating thyroid disorders.

Accuracy: **accurate**. Iodine-131 is accurately identified as an isotope used in thyroid diagnostic imaging and radiotherapy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | - **आयोडीन-131**: थायरॉयड रोगों की जाँच और उपचार में। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Application of uranium-235 in nuclear reactors (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the use of uranium-235 as fuel in nuclear reactors and power generation.

Accuracy: **accurate**. Uranium-235 is the standard fissile isotope used as nuclear fuel in power reactors.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | - **यूरेनियम-235**: परमाणु ऊर्जा और परमाणु रिएक्टरों में। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Mnemonic rhyme for isotopes (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a rhyming mnemonic in Hindi to help students remember the core definition of isotopes.

Accuracy: **accurate**. The mnemonic accurately captures the definition: same element, same protons, different neutrons.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ### याद रखने की आसान ट्रिक | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | **“एक ही तत्व, प्रोटॉन समान; न्यूट्रॉन अलग, समस्थानिक नाम।”** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

