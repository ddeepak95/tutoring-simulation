# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and accurate high school level explanation of stoichiometry in Hindi, covering its definition, balanced equations, the mole concept, worked mass-mass calculation examples, key takeaways, and practice exercises.

## Counts

```json
{
  "total_content_units": 9,
  "substantive_content_units": 9,
  "total_passages": 49,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 49,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 9
  },
  "proposed_substantive_verdicts": {
    "accurate": 9
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Introduction and definition of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry and explains its purpose in calculating quantities of reactants and products using balanced chemical equations.

Accuracy: **accurate**. The definition of stoichiometry and its basis on balanced equations and conservation of mass are correctly explained.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज मैं आपको **रससमीकरणमिति** (Stoichiometry) को बहुत आसान भाषा में समझाता हूँ। यह हाई स्कूल के रसायन विज्ञान का एक महत्वपूर्ण और रोचक टॉपिक है। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### रससमीकरणमिति क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | रससमीकरणमिति रसायन विज्ञान की वह विधि है, जिसमें हम **रासायनिक अभिक्रिया** में शामिल पदार्थों की मात्रा (द्रव्यमान, मोल या आयतन) की गणना करते हैं।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | सरल शब्दों में: जब दो या अधिक पदार्थ मिलकर नया पदार्थ बनाते हैं, तो हम जानना चाहते हैं कि **कितना अभिकारक** लगेगा और **कितना उत्पाद** बनेगा। यह सब **संतुलित रासायनिक समीकरण** की मदद से किया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Importance of balanced chemical equations (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why balancing equations is necessary for stoichiometric calculations based on the law of conservation of mass.

Accuracy: **accurate**. Correctly links balanced equations to the law of conservation of mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### संतुलित रासायनिक समीकरण क्यों जरूरी है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | रासायनिक समीकरण तभी सही गणना करने में मदद करता है, जब वह **संतुलित** हो। संतुलित समीकरण में दोनों तरफ परमाणुओं की संख्या समान होती है (द्रव्यमान संरक्षण का नियम)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Illustrative example of a balanced equation and mole relationships (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates unbalanced vs. balanced equations using the synthesis of water and demonstrates how coefficients translate to mole ratios.

Accuracy: **accurate**. The reaction 2H2 + O2 -> 2H2O and its mole interpretation are chemically and quantitatively accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **उदाहरण:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | - असंतुलित: H₂ + O₂ → H₂O | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p9 | - संतुलित: **2H₂ + O₂ → 2H₂O** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p10 | इस संतुलित समीकरण से हमें पता चलता है कि: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | - 2 मोल हाइड्रोजन गैस + 1 मोल ऑक्सीजन गैस → 2 मोल पानी | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |

## u4: The mole concept and molar mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the definition of a mole, Avogadro's number, and the relationship between a mole of a substance and its molar mass.

Accuracy: **accurate**. Avogadro's number and molar mass definitions are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### मोल (Mole) की अवधारणा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | रससमीकरणमिति में सबसे महत्वपूर्ण चीज **मोल** है।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | - 1 मोल = 6.022 × 10²³ कण (परमाणु, अणु या आयन) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - 1 मोल किसी भी पदार्थ का द्रव्यमान उसके **मोलर द्रव्यमान** (आणविक द्रव्यमान) के बराबर होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Illustrative example of water molar mass and particle count (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the mole concept specifically for water (H2O), showing its molar mass and particle count per mole.

Accuracy: **accurate**. Molar mass of water (18 g/mol) and the number of molecules in 1 mole are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | - H₂O का मोलर द्रव्यमान = 18 g/mol | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p18 | - 1 मोल पानी = 18 ग्राम पानी = 6.022 × 10²³ अणु | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |

## u6: Worked calculation: mass of water produced from hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a full step-by-step worked example calculating the mass of water formed from 4 grams of hydrogen gas.

Accuracy: **accurate**. All calculations (moles of H2 = 2 mol, moles of H2O = 2 mol, mass of H2O = 36 g) and steps are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### रससमीकरणमिति की गणना कैसे करें? (सरल उदाहरण) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | **प्रश्न:** 4 ग्राम हाइड्रोजन गैस (H₂) पूरी तरह से ऑक्सीजन के साथ जलने पर कितने ग्राम पानी बनेगा? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | **हल:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | 1. **संतुलित समीकरण लिखें:** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p23 |    2H₂ + O₂ → 2H₂O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | 2. **मोल अनुपात ज्ञात करें:** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p25 |    2 मोल H₂ → 2 मोल H₂O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 |    यानी 1 मोल H₂ → 1 मोल H₂O | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p27 | 3. **H₂ का मोलर द्रव्यमान = 2 g/mol** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p28 |    अतः 4 ग्राम H₂ = 4 ÷ 2 = **2 मोल** H₂ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p29 | 4. **उत्पाद की गणना:** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p30 |    2 मोल H₂ से 2 मोल H₂O बनेगा | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 |    2 मोल H₂O = 2 × 18 = **36 ग्राम** पानी | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p32 | **उत्तर:** 36 ग्राम पानी बनेगा। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u7: Worked calculation: thermal decomposition of calcium carbonate (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: A second worked mass-mass calculation showing the formation of calcium oxide from the decomposition of calcium carbonate.

Accuracy: **accurate**. Molar masses (CaCO3 = 100 g/mol, CaO = 56 g/mol) and final mass calculation (5.6 g CaO) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ### एक और उदाहरण (द्रव्यमान से द्रव्यमान) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | **प्रश्न:** 10 ग्राम कैल्शियम कार्बोनेट (CaCO₃) गर्म करने पर कितना कैल्शियम ऑक्साइड (CaO) बनेगा? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | **समीकरण:** CaCO₃ → CaO + CO₂ (संतुलित) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p36 | - CaCO₃ का मोलर द्रव्यमान = 100 g/mol | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p37 | - CaO का मोलर द्रव्यमान = 56 g/mol | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p38 | **हल:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p39 | - 100 g CaCO₃ → 56 g CaO | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |
| p40 | - 10 g CaCO₃ → (56 × 10) / 100 = **5.6 g** CaO | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;equation&#x27;] |

## u8: Key points and strategies for stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes four essential rules/tips for solving stoichiometry problems, including limiting reagents.

Accuracy: **accurate**. All tips, including the reminder regarding limiting reagents, are conceptually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | ### महत्वपूर्ण बातें याद रखें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | 1. हमेशा पहले समीकरण को **संतुलित** करें। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p43 | 2. मोल अनुपात (stoichiometric ratio) का इस्तेमाल करें। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p44 | 3. इकाइयाँ (gram, mole, litre) सही रखें। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p45 | 4. अगर कोई अभिकारक कम मात्रा में हो (limiting reagent), तो वही उत्पाद की मात्रा तय करता है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

## u9: Practice questions (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides practice questions for the student to test their understanding, accompanied by a polite closing remark.

Accuracy: **accurate**. The practice questions are standard, solvable, and appropriately formulated for high school stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | ### अभ्यास के लिए प्रश्न | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | 1. 8 ग्राम O₂ से कितने ग्राम पानी बनेगा (H₂ + O₂ → H₂O)? | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;list&#x27;] |
| p48 | 2. 5.6 लीटर CO₂ (STP पर) में कितने मोल CO₂ हैं? | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;list&#x27;] |
| p49 | अगर आपको कोई भी हिस्सा और विस्तार से समझना हो, या कोई गणना का उदाहरण चाहिए, तो बता दो! मैं और सरल उदाहरणों से समझा दूंगा। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

