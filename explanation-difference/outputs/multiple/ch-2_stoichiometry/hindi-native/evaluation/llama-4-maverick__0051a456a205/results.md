# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response covers the definition, foundational concepts, governing laws, applications, and a worked calculation example of stoichiometry in Hindi as requested.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 32,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 32,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces stoichiometry, its etymological/literal meaning in Hindi, and its role in measuring quantities and ratios of reacting substances.

Accuracy: **accurate**. The definition correctly describes stoichiometry as the branch of chemistry dealing with measuring quantities and proportions of reactants and products.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **रससमीकरणमिति: एक परिचय** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम रससमीकरणमिति के बारे में बात करने जा रहे हैं, जो रसायन विज्ञान की एक महत्वपूर्ण शाखा है। रससमीकरणमिति का अर्थ है &quot;मापने की कला&quot;। यह रसायनिक प्रतिक्रियाओं में भाग लेने वाले पदार्थों की मात्रा को मापने और उनके अनुपात को निर्धारित करने से संबंधित है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Key Stoichiometric Concepts (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines foundational concepts needed for stoichiometric calculations: chemical equations, moles, and molar mass.

Accuracy: **accurate**. Definitions for chemical equations, mole (including Avogadro's number), and molar mass are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | **रससमीकरणमिति के मूल तत्व** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | रससमीकरणमिति को समझने के लिए, हमें कुछ मूल तत्वों को जानना होगा: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | 1. **रासायनिक समीकरण**: एक रासायनिक समीकरण एक रासायनिक प्रतिक्रिया को दर्शाता है, जिसमें अभिकारकों और उत्पादों के बीच संबंध दिखाया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | 2. **मोल**: मोल एक इकाई है जो किसी पदार्थ की मात्रा को दर्शाती है। एक मोल में 6.022 x 10^23 कण (परमाणु या अणु) होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | 3. **मोलर द्रव्यमान**: मोलर द्रव्यमान किसी पदार्थ के एक मोल का द्रव्यमान होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Principles of Stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes the chemical laws underlying stoichiometry: the law of conservation of mass and the law of definite proportions.

Accuracy: **accurate**. The descriptions of the law of conservation of mass and the law of definite proportions are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | **रससमीकरणमिति के सिद्धांत** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | रससमीकरणमिति के कुछ महत्वपूर्ण सिद्धांत हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | 1. **द्रव्यमान संरक्षण का नियम**: इस नियम के अनुसार, किसी रासायनिक प्रतिक्रिया में, अभिकारकों का कुल द्रव्यमान उत्पादों के कुल द्रव्यमान के बराबर होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | 2. **निश्चित अनुपात का नियम**: इस नियम के अनुसार, किसी रासायनिक यौगिक में, तत्वों का अनुपात हमेशा निश्चित होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Applications of Stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists standard practical uses of stoichiometry in predicting reaction outcomes and computing substance amounts.

Accuracy: **accurate**. Correctly states the primary functions of stoichiometric analysis in chemical reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | **रससमीकरणमिति के अनुप्रयोग** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | रससमीकरणमिति के कई अनुप्रयोग हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | 1. **रासायनिक प्रतिक्रियाओं की भविष्यवाणी**: रससमीकरणमिति का उपयोग करके, हम रासायनिक प्रतिक्रियाओं के परिणाम की भविष्यवाणी कर सकते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | 2. **पदार्थों की मात्रा की गणना**: रससमीकरणमिति का उपयोग करके, हम किसी रासायनिक प्रतिक्रिया में भाग लेने वाले पदार्थों की मात्रा की गणना कर सकते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Worked Stoichiometric Problem: Water Synthesis (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked calculation determining the mass of water formed from given masses of hydrogen and oxygen gases.

Accuracy: **accurate**. All steps, conversions (mass to moles, stoichiometric mole ratios, moles to mass), and numerical calculations are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | **उदाहरण** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | मान लें कि हमें निम्नलिखित रासायनिक प्रतिक्रिया दी गई है: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | 2H2 + O2 → 2H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | इस प्रतिक्रिया में, हमें 4 ग्राम हाइड्रोजन गैस (H2) और 32 ग्राम ऑक्सीजन गैस (O2) दी गई है। हमें यह जानना है कि कितना पानी (H2O) बनेगा। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | **समाधान** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | 1. सबसे पहले, हमें H2 और O2 के मोल की गणना करनी होगी। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | H2 के मोल = द्रव्यमान / मोलर द्रव्यमान = 4 ग्राम / 2 ग्राम/मोल = 2 मोल | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p23 | O2 के मोल = द्रव्यमान / मोलर द्रव्यमान = 32 ग्राम / 32 ग्राम/मोल = 1 मोल | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p24 | 2. अब, हमें रासायनिक समीकरण का उपयोग करके H2O के मोल की गणना करनी होगी। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 | 2H2 + O2 → 2H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | 2 मोल H2 1 मोल O2 के साथ प्रतिक्रिया करके 2 मोल H2O बनाते हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | इसलिए, H2O के मोल = 2 मोल | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | 3. अंत में, हमें H2O के द्रव्यमान की गणना करनी होगी। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 | H2O का द्रव्यमान = मोल x मोलर द्रव्यमान = 2 मोल x 18 ग्राम/मोल = 36 ग्राम | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p30 | इस प्रकार, हमें पता चलता है कि 36 ग्राम पानी बनेगा। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Concluding Summary (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key takeaways and definition of stoichiometry at the end of the lesson.

Accuracy: **accurate**. Accurately summarizes the core scope and purpose of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | **निष्कर्ष** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | रससमीकरणमिति रसायन विज्ञान की एक महत्वपूर्ण शाखा है जो रासायनिक प्रतिक्रियाओं में भाग लेने वाले पदार्थों की मात्रा को मापने और उनके अनुपात को निर्धारित करने से संबंधित है। इसके अनुप्रयोग रासायनिक प्रतिक्रियाओं की भविष्यवाणी और पदार्थों की मात्रा की गणना में होते हैं। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

