# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text accurately and comprehensively explains the mole concept in chemistry, covering introductory analogies, formal definitions, molar mass, formulas, worked examples, summary points, and practice problems.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 54,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 4,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 54,
  "unique_subtopics": 8,
  "contextualization": {
    "everyday": 2,
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Dozen analogy for the mole concept (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "जब हम बाजार से अंडे खरीदते हैं, तो हम 12 अंडों को **1 डजन** कहते हैं।"}]}

Annotation rationale: Uses the familiar daily-life counting unit of a dozen (for eggs and books) as an analogy to explain why chemists need a large counting unit like the mole for extremely small particles.

Accuracy: **accurate**. The analogy accurately describes counting units in daily life and correctly establishes the rationale for defining the mole in chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **मोल संकल्पना (Mole Concept) – आसान भाषा में समझो** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम हाई स्कूल के सबसे महत्वपूर्ण टॉपिक **मोल संकल्पना** को बहुत आसान तरीके से समझेंगे। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### 1. मोल क्या है? (सरल उदाहरण से समझो) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | जब हम बाजार से अंडे खरीदते हैं, तो हम 12 अंडों को **1 डजन** कहते हैं।   | ANALOGY | {} | [&#x27;prose&#x27;] |
| p5 | इसी तरह जब हम 12 किताबें एक साथ रखते हैं, तो उसे **1 दर्जन** कहते हैं। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | रोजमर्रा की जिंदगी में हम छोटी-छोटी चीजों को गिनने के लिए कुछ इकाइयाँ इस्तेमाल करते हैं।   | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | लेकिन केमिस्ट्री में परमाणु और अणु इतने छोटे होते हैं कि हम उन्हें आम तौर पर गिन नहीं सकते। इसलिए वैज्ञानिकों ने एक नई इकाई बनाई जिसे **मोल** कहते हैं। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition of mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines one mole quantitatively as 6.022 × 10²³ particles and identifies this value as Avogadro's number (Nₐ) with its unit.

Accuracy: **accurate**. The definition of 1 mole, the numerical value of Avogadro's constant, and its unit (mol⁻¹) are completely standard and factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | **परिभाषा:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | **1 मोल** = किसी भी पदार्थ के **6.022 × 10²³** कण (परमाणु, अणु या आयन)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | इस संख्या को **अवोगैड्रो संख्या** (Avogadro’s Number) कहते हैं और इसे **Nₐ** से दिखाया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | Nₐ = 6.022 × 10²³ mol⁻¹ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u3: Necessity of the mole concept (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p13", "quote": "एक गिलास पानी में लगभग 10²⁴ पानी के अणु होते हैं।"}]}

Annotation rationale: Explains why moles are necessary by illustrating that ordinary amounts of matter (like a glass of water) contain an enormous number of molecules (~10²⁴) that are impossible to count individually.

Accuracy: **accurate**. The estimated order of magnitude of molecules in a glass of water (~250 g / 18 g/mol ≈ 13.9 mol ≈ 8.4 × 10²⁴ molecules ≈ 10²⁴) and the reasoning for using moles are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### 2. मोल क्यों जरूरी है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | एक गिलास पानी में लगभग 10²⁴ पानी के अणु होते हैं।   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | इतनी बड़ी संख्या को गिनना नामुमकिन है। इसलिए हम **मोल** का इस्तेमाल करते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Molar mass and the mole-mass relationship (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the relationship between one mole of various substances and their mass in grams, defining molar mass and its unit (g/mol).

Accuracy: **accurate**. All stated molar masses (C-12: 12 g, H₂: 2 g, H₂O: 18 g, NaCl: 58.5 g) and the definition and unit of molar mass are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### 3. मोल और द्रव्यमान का संबंध | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - 1 मोल **कार्बन-12** के परमाणुओं का द्रव्यमान = **12 ग्राम** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 | - 1 मोल **H₂** (हाइड्रोजन गैस) का द्रव्यमान = **2 ग्राम** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | - 1 मोल **H₂O** (पानी) का द्रव्यमान = **18 ग्राम** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | - 1 मोल **NaCl** (नमक) का द्रव्यमान = **58.5 ग्राम** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 | इस द्रव्यमान को **मोलर द्रव्यमान** (Molar Mass) कहते हैं।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | मोलर द्रव्यमान की इकाई **ग्राम प्रति मोल** (g/mol) होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: Formulas for calculating number of moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents standard algebraic formulas for finding the number of moles from mass (n = m/M) and from particle count (n = N/Nₐ).

Accuracy: **accurate**. Both mole calculation formulas (n = m/M and n = N/Nₐ) are stated correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ### 4. महत्वपूर्ण सूत्र (Formula) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | **सूत्र 1:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | मोलों की संख्या (n) = द्रव्यमान (m) ÷ मोलर द्रव्यमान (M)   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p25 | **n = m / M** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p26 | **सूत्र 2:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | मोलों की संख्या (n) = कणों की कुल संख्या (N) ÷ अवोगैड्रो संख्या (Nₐ)   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p28 | **n = N / Nₐ** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u6: Worked example 1: Calculating moles from mass of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates step-by-step calculation of moles in 36 g of water using molar mass (18 g/mol).

Accuracy: **accurate**. The substitution and calculation (36 / 18 = 2 moles) are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### 5. उदाहरण (Step-by-step) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | **उदाहरण 1:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | प्रश्न: 36 ग्राम पानी में कितने मोल हैं? (H₂O का मोलर द्रव्यमान = 18 g/mol) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | हल:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | n = m / M   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | n = 36 / 18   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | **n = 2 मोल** | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u7: Worked example 2: Molecules in one mole of oxygen gas (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows that 1 mole of diatomic oxygen gas corresponds directly to 6.022 × 10²³ O₂ molecules.

Accuracy: **accurate**. The conclusion that 1 mole of O₂ contains 6.022 × 10²³ molecules is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | **उदाहरण 2:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | प्रश्न: 1 मोल ऑक्सीजन गैस (O₂) में कितने अणु होते हैं? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | उत्तर:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | 1 मोल = 6.022 × 10²³ अणु   | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p40 | **अर्थात् 6.022 × 10²³ O₂ के अणु** | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u8: Worked example 3: Calculating mass from moles of sodium chloride (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates calculating the mass of 2 moles of NaCl by rearranging the formula to m = n × M.

Accuracy: **accurate**. The calculation m = 2 × 58.5 = 117 g is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | **उदाहरण 3:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | प्रश्न: 2 मोल NaCl में कितने ग्राम हैं? (NaCl का मोलर द्रव्यमान = 58.5 g/mol) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | हल:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | m = n × M   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p45 | m = 2 × 58.5   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | **m = 117 ग्राम** | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u9: Key points recap (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes essential points of the mole concept, including molar particle count, molar volume of gas at STP, and the carbon-12 standard.

Accuracy: **accurate**. All recap statements—including the standard 22.4 L molar volume of gas at STP and the C-12 standard—are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ### 6. याद रखने वाली बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | - 1 मोल = 6.022 × 10²³ कण | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p49 | - 1 मोल किसी भी गैस का आयतन STP पर = **22.4 लीटर** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p50 | - कार्बन-12 के 1 मोल का द्रव्यमान = 12 ग्राम (यह मानक है) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

## u10: Practice questions on mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides high school practice problems for student self-testing, along with closing teacher guidance.

Accuracy: **accurate**. The practice questions provide correct givens (e.g. CO₂ molar mass = 44 g/mol) and are well-formulated and solvable.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | अब तुम खुद से ये सवाल हल करके देखो: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p52 | 1. 88 ग्राम CO₂ में कितने मोल हैं? (CO₂ का मोलर मास = 44 g/mol) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;list&#x27;] |
| p53 | 2. 3 मोल H₂O में कितने अणु हैं? | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;list&#x27;] |
| p54 | कोई भी सवाल हो तो पूछो, मैं और उदाहरण देकर समझा दूंगा! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

