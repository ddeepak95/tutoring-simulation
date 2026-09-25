# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and comprehensively explains the mole concept, Avogadro's number, molar mass, and its application in stoichiometry for high school chemistry.

## Counts

```json
{
  "total_content_units": 11,
  "substantive_content_units": 11,
  "total_passages": 36,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 4,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 36,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 1,
    "none": 10
  },
  "proposed_substantive_verdicts": {
    "accurate": 11
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy of counting by the dozen to introduce the mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p3", "quote": "सोचो, जब हम अंडे गिनते हैं तो कहते हैं — “एक **दर्जन** अंडे”।  "}, {"passage_id": "p4", "quote": "एक दर्जन = **12** अंडे।"}]}

Annotation rationale: Uses the familiar daily-life concept of counting eggs in dozens (1 dozen = 12) as an analogy to help students understand counting units.

Accuracy: **accurate**. The analogy accurately describes the concept of a dozen as 12 items.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज मैं तुम्हें बहुत आसान और रोचक तरीके से **मोल संकल्पना** समझाता हूँ। यह हाई स्कूल के केमिस्ट्री का सबसे महत्वपूर्ण और बुनियादी टॉपिक है। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### मोल क्या है? (सरल उदाहरण से समझो) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | सोचो, जब हम अंडे गिनते हैं तो कहते हैं — “एक **दर्जन** अंडे”।   | ANALOGY | {} | [&#x27;prose&#x27;] |
| p4 | एक दर्जन = **12** अंडे। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines a mole as 6.022 × 10²³ particles, defines Avogadro's number, and explains why such a large number is required due to the small size of subatomic particles.

Accuracy: **accurate**. The definition of mole, the value of Avogadro's constant, and the rationale for its magnitude are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | इसी तरह, जब वैज्ञानिक बहुत छोटे-छोटे कणों (परमाणु, अणु या आयन) को गिनना चाहते हैं, तो वे **मोल** नाम की इकाई का इस्तेमाल करते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | **1 मोल = 6.022 × 10²³ कण** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | इस संख्या को **अवोगाद्रो संख्या** (Avogadro’s number) कहते हैं।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | यह इतनी बड़ी संख्या इसलिए है क्योंकि परमाणु और अणु इतने छोटे होते हैं कि हम उन्हें आम तौर पर गिन नहीं सकते। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Relationship between atomic mass, grams, and one mole (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how atomic mass expressed in atomic mass units (u) relates to the mass in grams containing one mole (6.022 × 10²³) of atoms.

Accuracy: **accurate**. Accurately connects atomic mass in u to the mass in grams for 1 mole of atoms containing Avogadro's number of particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### मोल और द्रव्यमान का संबंध (सबसे महत्वपूर्ण बात) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | प्रत्येक तत्व का एक निश्चित **परमाणु द्रव्यमान** (Atomic mass) होता है, जिसे हम आवर्त सारणी में u (atomic mass unit) में देखते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | - अगर हम उस तत्व का **परमाणु द्रव्यमान** जितने ग्राम ले लें, तो उसमें ठीक **6.022 × 10²³** परमाणु होंगे। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | - इस मात्रा को **1 मोल** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Carbon mole-mass and particle count example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the relationship between atomic mass (12 u), mass of 1 mole (12 g), and number of carbon atoms (6.022 × 10²³).

Accuracy: **accurate**. Carbon-12 atomic mass is 12 u, corresponding to 12 g and 6.022 × 10²³ atoms in 1 mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | **उदाहरण:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | &#124; पदार्थ       &#124; परमाणु/अणु द्रव्यमान &#124; 1 मोल का द्रव्यमान &#124; 1 मोल में कणों की संख्या     &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p15 | &#124;-------------&#124;---------------------&#124;---------------------&#124;-----------------------------&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p16 | &#124; कार्बन (C)   &#124; 12 u                &#124; 12 ग्राम            &#124; 6.022 × 10²³ परमाणु         &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u5: Oxygen gas mole-mass and particle count example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the relationship for molecular oxygen (O₂): molecular mass 32 u, mass of 1 mole 32 g, and particle count 6.022 × 10²³ molecules.

Accuracy: **accurate**. The molecular mass and mole-mass correspondence for diatomic oxygen (O₂) is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | &#124; ऑक्सीजन (O₂) &#124; 32 u                &#124; 32 ग्राम            &#124; 6.022 × 10²³ अणु             &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u6: Water mole-mass and particle count example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the relationship for water (H₂O): molecular mass 18 u, mass of 1 mole 18 g, and particle count 6.022 × 10²³ molecules.

Accuracy: **accurate**. The molecular mass of H₂O (18 u) and mass of 1 mole (18 g) with 6.022 × 10²³ molecules is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | &#124; पानी (H₂O)   &#124; 18 u                &#124; 18 ग्राम            &#124; 6.022 × 10²³ अणु             &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u7: Sodium mole-mass and particle count example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the relationship for sodium (Na): atomic mass 23 u, mass of 1 mole 23 g, and particle count 6.022 × 10²³ atoms.

Accuracy: **accurate**. The atomic mass of Na (23 u) and mass of 1 mole (23 g) containing 6.022 × 10²³ atoms is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | &#124; सोडियम (Na)  &#124; 23 u                &#124; 23 ग्राम            &#124; 6.022 × 10²³ परमाणु         &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u8: Molar mass definition, units, and values (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass in grams of 1 mole of any substance, provides its SI unit (g/mol), and gives specific molar mass values for carbon and water.

Accuracy: **accurate**. The definition, unit (g/mol), and stated molar masses (carbon = 12 g/mol, water = 18 g/mol) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | ### मोलर द्रव्यमान क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | किसी भी पदार्थ के **1 मोल** का द्रव्यमान (ग्राम में) उसे **मोलर द्रव्यमान** कहते हैं।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | इसकी इकाई **ग्राम प्रति मोल** (g/mol) होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p23 | - कार्बन का मोलर द्रव्यमान = 12 g/mol   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 | - पानी का मोलर द्रव्यमान = 18 g/mol | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u9: Practical need for the mole concept in chemical reactions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why moles are necessary: individual atoms/molecules cannot be counted directly during reactions, so moles bridge microscopic counts to measurable quantities.

Accuracy: **accurate**. Accurately explains the practical purpose of using the mole concept in chemical stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ### मोल क्यों जरूरी है? (व्यावहारिक उपयोग) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | रासायनिक अभिक्रियाओं में हम परमाणुओं या अणुओं को सीधे नहीं गिन सकते। इसलिए हम **मोल** का इस्तेमाल करते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u10: Stoichiometric reaction example: H₂ + Cl₂ → 2HCl (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the reaction of 1 mole of hydrogen gas (2 g) with 1 mole of chlorine gas (71 g) to produce 2 moles of HCl (73 g), illustrating reaction stoichiometry.

Accuracy: **accurate**. The reaction stoichiometry and mass conservation (2 g H₂ + 71 g Cl₂ = 73 g HCl) are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | **उदाहरण:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | H₂ + Cl₂ → 2HCl | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | इस अभिक्रिया में: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | - 1 मोल हाइड्रोजन गैस (2 ग्राम) + 1 मोल क्लोरीन गैस (71 ग्राम) → 2 मोल HCl (73 ग्राम) बनाता है। | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | इस तरह हम आसानी से बता सकते हैं कि कितना पदार्थ कितने पदार्थ से क्रिया करेगा और कितना उत्पाद बनेगा। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u11: Recap of key points and offer for further study (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes key takeaways regarding Avogadro's number, molar mass, and connecting particle counts, mass, and gas volume, followed by teacher closing remarks.

Accuracy: **accurate**. The summary accurately restates the core principles of the mole concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ### याद रखने वाली मुख्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | 1. **1 मोल** = 6.022 × 10²³ कण (अवोगाद्रो संख्या) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 | 2. किसी पदार्थ का **मोलर द्रव्यमान** = उसके अणुभार के बराबर ग्राम में | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p35 | 3. मोल का इस्तेमाल करके हम परमाणुओं/अणुओं की संख्या, द्रव्यमान और आयतन (गैसों के लिए) के बीच संबंध स्थापित करते हैं। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p36 | अगर तुम्हें अब कोई खास हिस्सा और विस्तार से समझना हो — जैसे मोल से द्रव्यमान निकालना, मोल से कणों की संख्या निकालना, या गैसों का मोलर आयतन — तो बता देना। मैं और उदाहरणों के साथ समझा दूंगा! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

