# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and accurately explains stoichiometry in Hindi for a high school student, covering its definition, underlying principle of conservation of mass, illustrative equation breakdown, step-by-step procedure, a worked problem, real-world relevance, and key tips.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 39,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 39,
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

## u1: Definition and scope of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the topic, greets the student, and explains what stoichiometry is and what it determines regarding reactants and products.

Accuracy: **accurate**. The definition of stoichiometry and its purpose in chemical equations are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # रससमीकरणमिति (Stoichiometry) - एक सरल परिचय | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम रसायन विज्ञान के एक महत्वपूर्ण विषय **रससमीकरणमिति** को समझेंगे। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## रससमीकरणमिति क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | **रससमीकरणमिति** (Stoichiometry) रसायन विज्ञान की वह शाखा है जिसमें हम **रासायनिक समीकरणों में अभिकारकों (reactants) और उत्पादों (products) की मात्रा** का गणितीय अध्ययन करते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | सरल शब्दों में - यह हमें बताता है कि: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | - कितने अणु/मोल अभिकारक चाहिए | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | - कितने उत्पाद बनेंगे | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | - क्या कुछ पदार्थ अधिक या कम बचेगा | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Law of conservation of mass as the foundation of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that stoichiometry is based on the law of conservation of mass and states the law.

Accuracy: **accurate**. Stoichiometry is fundamentally rooted in the law of conservation of mass, which is correctly formulated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ## मूल आधार | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | रससमीकरणमिति **द्रव्यमान संरक्षण के नियम** पर आधारित है: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | &gt; &quot;पदार्थ न तो बनाया जा सकता है और न ही नष्ट किया जा सकता है, केवल रूप बदलता है&quot; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Mole and mass relationship example using water synthesis (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates molar and mass relationships in the balanced chemical equation for water synthesis.

Accuracy: **accurate**. The equation 2H2 + O2 -> 2H2O correctly corresponds to 2 moles H2 + 1 mole O2 -> 2 moles H2O, which equals 4 g H2 + 32 g O2 -> 36 g H2O.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## एक उदाहरण से समझें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | **हाइड्रोजन और ऑक्सीजन से पानी बनने की अभिक्रिया:** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | इस समीकरण से पता चलता है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | - **2 मोल** हाइड्रोजन + **1 मोल** ऑक्सीजन → **2 मोल** पानी | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | - यानी **4 ग्राम** H₂ + **32 ग्राम** O₂ → **36 ग्राम** H₂O | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Steps to solve stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the standard sequential procedure for solving general stoichiometry problems.

Accuracy: **accurate**. The four outlined steps (balance equation, convert to moles, apply mole ratio, convert to desired quantity) are the standard, correct procedure.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ## रससमीकरणमिति के मुख्य चरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | 1. **संतुलित समीकरण लिखें** - सबसे पहले समीकरण को संतुलित करें | PROCEDURE | {} | [&#x27;list&#x27;] |
| p20 | 2. **मोल में बदलें** - दिए गए द्रव्यमान को मोल में बदलें (मोल = द्रव्यमान/मोलर द्रव्यमान) | PROCEDURE | {} | [&#x27;list&#x27;] |
| p21 | 3. **मोल अनुपात लगाएं** - संतुलित समीकरण के गुणांकों का उपयोग करें | PROCEDURE | {} | [&#x27;list&#x27;] |
| p22 | 4. **उत्तर निकालें** - आवश्यक मात्रा (ग्राम, मोल या आयतन) में बदलें | PROCEDURE | {} | [&#x27;list&#x27;] |

## u5: Worked stoichiometry problem calculating mass of water from hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a complete worked example calculating the grams of water produced from 4 grams of hydrogen.

Accuracy: **accurate**. The step-by-step arithmetic and chemical logic are completely correct (4 g / 2 g/mol = 2 mol H2; 2 mol H2 produces 2 mol H2O; 2 mol * 18 g/mol = 36 g H2O).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## व्यावहारिक उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | **प्रश्न:** 4 ग्राम हाइड्रोजन से कितना पानी बनेगा? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | **हल:** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | - H₂ का मोलर द्रव्यमान = 2 g/mol | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | - मोल H₂ = 4/2 = 2 मोल | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | - समीकरण के अनुसार: 2 मोल H₂ → 2 मोल H₂O | EXAMPLE | {} | [&#x27;list&#x27;] |
| p29 | - अतः 2 मोल पानी बनेगा = 2 × 18 = **36 ग्राम पानी** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Practical applications and importance of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists reasons why stoichiometry is important in industry, pharmaceuticals, and laboratory work.

Accuracy: **accurate**. The stated applications accurately represent why stoichiometry is essential in chemical and pharmaceutical industries and laboratory settings.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ## क्यों जरूरी है यह विषय? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | - **उद्योगों में** - सही मात्रा में कच्चा माल उपयोग करने के लिए | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 | - **दवा निर्माण** में सटीक मात्रा जानने के लिए | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p33 | - **प्रयोगशाला** में रासायनिक प्रयोग करने के लिए | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u7: Key tips and closing encouragement for students (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides high-yield tips to avoid common student pitfalls when working stoichiometry problems, accompanied by a polite closing prompt.

Accuracy: **accurate**. The reminders to balance equations, use the mole concept properly, and track units are standard sound study strategies.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ## याद रखने योग्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | ✅ हमेशा समीकरण संतुलित करें | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p36 | ✅ मोल अवधारणा का सही प्रयोग करें | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p37 | ✅ इकाइयों (units) का ध्यान रखें | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p39 | क्या आप चाहेंगे कि मैं इस पर कुछ अभ्यास प्रश्न भी दूं ताकि आप और अच्छे से समझ सकें? 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

