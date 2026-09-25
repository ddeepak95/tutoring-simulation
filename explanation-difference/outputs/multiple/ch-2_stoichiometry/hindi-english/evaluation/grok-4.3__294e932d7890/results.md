# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains stoichiometry, including its definition, the mole concept, mole ratios, balanced equations, and worked examples of stoichiometric calculations.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 45,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 45,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition, etymology, and foundational law of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the subject and explains what stoichiometry is, its Greek etymological roots, and its core principle based on the law of conservation of mass.

Accuracy: **accurate**. Correctly defines stoichiometry, its etymology, and its basis in the law of conservation of mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम स्टोइकियोमेट्री (Stoichiometry) को आसान भाषा में समझेंगे। मैं आपको हाई स्कूल के स्तर पर पढ़ा रहा हूँ, जैसे कक्षा 11 की केमिस्ट्री में पढ़ाया जाता है। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### स्टोइकियोमेट्री क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | स्टोइकियोमेट्री रसायन विज्ञान की वह शाखा है जिसमें हम **रासायनिक अभिक्रियाओं** में अभिकारकों (reactants) और उत्पादों (products) की मात्राओं की गणना करते हैं।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | यह ग्रीक शब्दों से बना है — “स्टोइकियोन” (तत्व) + “मेट्रॉन” (माप) = तत्वों का माप। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | मुख्य आधार: **द्रव्यमान संरक्षण का नियम** (Law of Conservation of Mass) — किसी भी रासायनिक अभिक्रिया में कुल द्रव्यमान न तो कम होता है और न ही बढ़ता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Water formation reaction illustrating balancing and mole ratio (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Uses the reaction between hydrogen and oxygen to produce water to illustrate balancing equations and determining the stoichiometric mole ratio.

Accuracy: **accurate**. The chemical equation balancing and molecular/molar interpretation are entirely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### उदाहरण से समझें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | सबसे आसान उदाहरण लेते हैं — हाइड्रोजन गैस और ऑक्सीजन गैस से पानी बनना: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | **असंतुलित समीकरण:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | H₂ + O₂ → H₂O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 | **संतुलित समीकरण:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | **2H₂ + O₂ → 2H₂O** | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | इसका मतलब क्या है?   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | - 2 अणु हाइड्रोजन + 1 अणु ऑक्सीजन → 2 अणु पानी   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p14 | - या मोल में: **2 मोल H₂ + 1 मोल O₂ → 2 मोल H₂O** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | यहाँ **मोल अनुपात** (mole ratio) 2 : 1 : 2 है। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Definition of the mole and Avogadro's number (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a mole is and introduces Avogadro's constant.

Accuracy: **accurate**. Correctly states the value of Avogadro's number and the definition of a mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### मोल क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | मोल एक इकाई है। 1 मोल = 6.022 × 10²³ कण (अणु, परमाणु आदि)।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | इसे अवोगाद्रो संख्या कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Worked calculation for hydrogen mass required to produce water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Carries out a multi-step calculation from given mass of water to moles, applies the stoichiometric ratio, and finds the required mass of hydrogen.

Accuracy: **accurate**. All calculations (molar mass of H2O = 18 g/mol, 36 g = 2 mol, requiring 2 mol H2 = 4 g) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | - H₂O का मोलर द्रव्यमान = 18 g/mol   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 | - अगर 36 ग्राम पानी बनाना है, तो कितने मोल?   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 |   → 36 ÷ 18 = **2 मोल** पानी | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | अब सवाल: 2 मोल पानी बनाने के लिए कितनी हाइड्रोजन गैस चाहिए?   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p24 | समीकरण से: 2 मोल H₂O बनाने के लिए 2 मोल H₂ चाहिए।   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | H₂ का मोलर द्रव्यमान = 2 g/mol → 2 मोल = **4 ग्राम** H₂ | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Common calculations and topics within stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the main types of calculations and subtopics encountered in stoichiometry, such as balancing, mole ratios, conversions, limiting reagents, and percentage yield.

Accuracy: **accurate**. Accurately categorizes the major stoichiometric calculations taught at this level.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ### स्टोइकियोमेट्री में क्या-क्या गणनाएँ की जाती हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | 1. **समीकरण को संतुलित करना** (सबसे पहला और जरूरी कदम) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p28 | 2. **मोल अनुपात** से गणना करना | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 | 3. **द्रव्यमान से मोल** और **मोल से द्रव्यमान** में बदलना | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 | 4. **सीमित अभिकारक** (Limiting Reagent) — कौन सा पदार्थ पहले खत्म हो जाएगा | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | 5. **प्रतिक्रिया की उपज** (Percentage yield) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Worked calculation of sodium chloride production from sodium (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked problem determining the mass of NaCl produced from 46 g of Na.

Accuracy: **accurate**. The stoichiometric conversions and calculations (46 g Na = 2 mol, yielding 2 mol NaCl = 117 g) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ### एक और सरल उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | प्रतिक्रिया:   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | 2Na + Cl₂ → 2NaCl | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | सवाल: 46 ग्राम सोडियम से कितना NaCl बनेगा?   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | - Na का परमाणु द्रव्यमान = 23 → 46 g = 2 मोल Na   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p37 | - 2 मोल Na से 2 मोल NaCl बनेगा   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p38 | - NaCl का मोलर द्रव्यमान = 58.5 g/mol   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p39 | - 2 मोल NaCl = 117 ग्राम | EXAMPLE | {} | [&#x27;list&#x27;] |

## u7: Key takeaways and summary for stoichiometric problem solving (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential principles to remember when solving stoichiometry problems, followed by concluding remarks.

Accuracy: **accurate**. The summary points are accurate rules of thumb for solving stoichiometric problems.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p40 | ### याद रखने वाली बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | - हमेशा पहले समीकरण को संतुलित करो। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p42 | - मोल अनुपात से ही सारी गणनाएँ होती हैं। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p43 | - इकाइयाँ (gram, mole, litre) बदलते समय सही सूत्र इस्तेमाल करो। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p44 | अगर तुम्हें कोई खास उदाहरण या सीमित अभिकारक (limiting reagent) वाला सवाल समझना हो, तो बताओ — मैं और विस्तार से उदाहरण देकर समझा दूंगा। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p45 | कुछ समझ आया? या कोई डाउट है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

