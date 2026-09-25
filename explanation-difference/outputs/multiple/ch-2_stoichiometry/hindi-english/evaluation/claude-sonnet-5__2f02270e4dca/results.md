# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly covers stoichiometry, including its definition, underlying principle of conservation of mass, steps for calculation, worked examples, related concepts (limiting reagent, percent yield), and real-world applications.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 51,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 2,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 51,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 7,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as the branch of chemistry dealing with quantitative relationships between reactants and products.

Accuracy: **accurate**. The definition accurately states that stoichiometry relates quantities of reactants and products in chemical reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # स्टोइकियोमेट्री (Stoichiometry) क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम रसायन विज्ञान के एक बहुत महत्वपूर्ण विषय **स्टोइकियोमेट्री** को सरल भाषा में समझेंगे। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## परिभाषा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | **स्टोइकियोमेट्री** रसायन विज्ञान की वह शाखा है जिसमें हम रासायनिक अभिक्रियाओं (chemical reactions) में **अभिकारकों (reactants)** और **उत्पादों (products)** की **मात्रा** के बीच संबंध का अध्ययन करते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | सरल शब्दों में - यह हमें बताता है कि: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | - कितने ग्राम/मोल अभिकारक चाहिए | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | - कितने ग्राम/मोल उत्पाद बनेगा | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Foundation on the Law of Conservation of Mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that stoichiometry is based on the Law of Conservation of Mass, where total mass before reaction equals total mass after reaction.

Accuracy: **accurate**. The description accurately presents the Law of Conservation of Mass as the fundamental premise of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## मूल सिद्धांत | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | स्टोइकियोमेट्री **द्रव्यमान संरक्षण के नियम (Law of Conservation of Mass)** पर आधारित है: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | &gt; &quot;पदार्थ न तो बनाया जा सकता है, न ही नष्ट किया जा सकता है&quot; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | इसका मतलब - अभिक्रिया से पहले जितना द्रव्यमान था, अभिक्रिया के बाद भी उतना ही रहेगा। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Molar relationship in water formation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how balanced equation coefficients relate molar quantities using the reaction of hydrogen and oxygen to form water.

Accuracy: **accurate**. The equation 2H2 + O2 -> 2H2O and its mole interpretation (2 mol H2 + 1 mol O2 -> 2 mol H2O) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## उदाहरण से समझें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | आइए हाइड्रोजन और ऑक्सीजन से पानी बनने की अभिक्रिया देखें: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | इस समीकरण से पता चलता है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | - **2 मोल** हाइड्रोजन गैस + **1 मोल** ऑक्सीजन गैस → **2 मोल** पानी | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Steps to solve stoichiometric problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a four-step general methodology to carry out stoichiometric calculations.

Accuracy: **accurate**. The procedural steps (balance equation, convert mass to moles, use stoichiometric ratio, convert back to target quantity) and the formula for moles are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## स्टोइकियोमेट्री के चरण (Steps) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | ### 1️⃣ संतुलित समीकरण लिखें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | सबसे पहले रासायनिक समीकरण को संतुलित करें | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p20 | ### 2️⃣ मोल में बदलें (Convert to Moles) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | $$\text{मोल} = \frac{\text{दिया गया द्रव्यमान (g)}}{\text{मोलर द्रव्यमान (g/mol)}}$$ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p22 | ### 3️⃣ मोल अनुपात का प्रयोग करें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | संतुलित समीकरण के गुणांक (coefficients) का उपयोग करके अनुपात निकालें | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p24 | ### 4️⃣ वापस द्रव्यमान/आयतन में बदलें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | जरूरत के अनुसार अंतिम उत्तर निकालें | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u5: Worked mass calculation for water formation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a fully worked example calculating the mass of water formed from 4 g of hydrogen gas.

Accuracy: **accurate**. Calculations are mathematically and chemically accurate: 4 g H2 / (2 g/mol) = 2 mol H2; 2 mol H2 produces 2 mol H2O; 2 mol * 18 g/mol = 36 g H2O.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ## व्यावहारिक उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | **प्रश्न:** 4 ग्राम हाइड्रोजन गैस से कितने ग्राम पानी बनेगा? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | **हल:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p29 | समीकरण: $2H_2 + O_2 \rightarrow 2H_2O$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | **चरण 1:** H₂ के मोल निकालें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p31 | $$\text{मोल} = \frac{4g}{2 g/mol} = 2 \text{ मोल}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | **चरण 2:** मोल अनुपात लगाएं | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p33 | समीकरण से: 2 मोल H₂ → 2 मोल H₂O | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | तो: 2 मोल H₂ → 2 मोल H₂O | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | **चरण 3:** पानी का द्रव्यमान निकालें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p36 | $$\text{द्रव्यमान} = 2 \text{ मोल} \times 18 g/mol = 36 \text{ ग्राम}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | **उत्तर:** 36 ग्राम पानी बनेगा ✅ | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Key stoichiometric concepts (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines limiting reagent, excess reagent, and percent yield in a summary table.

Accuracy: **accurate**. The definitions for limiting reagent, excess reagent, and percent yield formula are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## महत्वपूर्ण अवधारणाएं | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | &#124; अवधारणा &#124; विवरण &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p40 | &#124;---------&#124;--------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p41 | &#124; **सीमित अभिकारक (Limiting Reagent)** &#124; जो अभिकारक पहले खत्म हो जाए &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p42 | &#124; **आधिक्य अभिकारक (Excess Reagent)** &#124; जो अभिकारक बच जाए &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p43 | &#124; **प्रतिशत उपज (% Yield)** &#124; वास्तविक उपज ÷ सैद्धांतिक उपज × 100 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |

## u7: Importance and applications of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p48", "quote": "✅ खाना बनाने की तरह - सही अनुपात से ही अच्छा परिणाम मिलता है!"}]}

Annotation rationale: Lists the industrial, pharmaceutical, and practical reasons why stoichiometry is essential.

Accuracy: **accurate**. The listed practical applications and cooking comparison accurately illustrate the necessity of stoichiometric proportions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ## क्यों जरूरी है स्टोइकियोमेट्री? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | ✅ उद्योगों में सही मात्रा में कच्चा माल इस्तेमाल करने के लिए | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p46 | ✅ दवाइयां बनाने में सटीक मात्रा जानने के लिए | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p47 | ✅ प्रदूषण नियंत्रण में | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p48 | ✅ खाना बनाने की तरह - सही अनुपात से ही अच्छा परिणाम मिलता है! | ANALOGY | {} | [&#x27;list&#x27;] |

## u8: Memory tip for stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a strategy and mental model to remember stoichiometry by likening it to chemical mathematics and ratios.

Accuracy: **accurate**. Likening stoichiometry to mathematical ratio and proportion applied to atoms and molecules is an accurate and helpful heuristic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p50 | **याद रखने की तरकीब:** स्टोइकियोमेट्री को &quot;रासायनिक गणित&quot; (Chemical Mathematics) समझें - जैसे गणित में अनुपात-समानुपात होता है, वैसे ही यहां भी अणुओं/परमाणुओं का अनुपात काम आता है! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |
| p51 | क्या आप चाहेंगे कि मैं कोई और उदाहरण या सीमित अभिकारक (Limiting Reagent) के बारे में विस्तार से समझाऊं? 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

