# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly explains stoichiometry in Hindi, covering its definition, importance, fundamental principles, calculation steps, and an illustrative example.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 20,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 20,
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

## u1: Definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces stoichiometry by stating its etymological meaning and its definition as the study of quantitative relationships in chemical reactions.

Accuracy: **accurate**. The definition correctly describes stoichiometry as the quantitative study of reactants and products in chemical reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **स्टोइकियोमेट्री: रासायनिक अभिक्रियाओं में मात्रा का अध्ययन** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम स्टोइकियोमेट्री के बारे में पढ़ने जा रहे हैं, जो रसायन विज्ञान की एक महत्वपूर्ण शाखा है। स्टोइकियोमेट्री का अर्थ है &quot;मात्रा का मापन&quot; या &quot;मात्रा का अध्ययन&quot;। यह रासायनिक अभिक्रियाओं में भाग लेने वाले पदार्थों की मात्रा के बीच संबंधों का अध्ययन करता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Importance and applications of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why stoichiometry is important and outlines fields where it is applied.

Accuracy: **accurate**. Accurately highlights the practical importance of stoichiometry in chemical industry, pharmaceuticals, and environmental science.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | **स्टोइकियोमेट्री का महत्व** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | स्टोइकियोमेट्री रसायन विज्ञान में बहुत महत्वपूर्ण है क्योंकि यह हमें रासायनिक अभिक्रियाओं में पदार्थों की मात्रा को समझने में मदद करता है। इसका उपयोग विभिन्न क्षेत्रों में किया जाता है, जैसे कि रासायनिक उद्योग, दवा निर्माण, और पर्यावरण विज्ञान। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Basic principles underlying stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents and explains the law of conservation of mass and the law of definite proportions as fundamental principles behind stoichiometry.

Accuracy: **accurate**. Correctly states and explains the Law of Conservation of Mass and the Law of Definite Proportions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | **स्टोइकियोमेट्री के मूल सिद्धांत** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | स्टोइकियोमेट्री के मूल सिद्धांत निम्नलिखित हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p7 | 1. **द्रव्यमान संरक्षण का नियम**: यह नियम कहता है कि रासायनिक अभिक्रिया में द्रव्यमान का न तो निर्माण होता है और न ही विनाश। इसका अर्थ है कि अभिक्रिया में भाग लेने वाले पदार्थों का कुल द्रव्यमान अभिक्रिया के बाद भी समान रहता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | 2. **निश्चित अनुपात का नियम**: यह नियम कहता है कि एक रासायनिक यौगिक में तत्वों का अनुपात हमेशा निश्चित होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: General procedure for stoichiometric calculations (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the standard step-by-step method used to perform stoichiometric calculations.

Accuracy: **accurate**. The steps (balancing the equation, determining molar mass, calculating moles, and using mole ratios) accurately represent standard stoichiometric methodology.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **स्टोइकियोमेट्री की गणना** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | स्टोइकियोमेट्री की गणना करने के लिए, हमें निम्नलिखित चरणों का पालन करना होता है: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | 1. **संतुलित रासायनिक समीकरण लिखें**: सबसे पहले, हमें रासायनिक अभिक्रिया का संतुलित समीकरण लिखना होता है। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | 2. **मोलर द्रव्यमान की गणना करें**: इसके बाद, हमें अभिक्रिया में भाग लेने वाले पदार्थों के मोलर द्रव्यमान की गणना करनी होती है। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | 3. **मोल की गणना करें**: फिर, हमें अभिक्रिया में भाग लेने वाले पदार्थों के मोल की गणना करनी होती है। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | 4. **स्टोइकियोमेट्री की गणना करें**: अंत में, हम स्टोइकियोमेट्री की गणना कर सकते हैं और अभिक्रिया में भाग लेने वाले पदार्थों की मात्रा के बीच संबंधों को समझ सकते हैं। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Molar relationship in water formation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates mole ratios using the balanced reaction of hydrogen and oxygen forming water.

Accuracy: **accurate**. The stoichiometric coefficients and molar relationships for 2H2 + O2 -> 2H2O are stated correctly.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | **उदाहरण** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | एक उदाहरण के रूप में, आइए हम निम्नलिखित रासायनिक अभिक्रिया पर विचार करें: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | 2H2 + O2 → 2H2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | इस अभिक्रिया में, 2 मोल हाइड्रोजन गैस 1 मोल ऑक्सीजन गैस के साथ अभिक्रिया करके 2 मोल जल बनाते हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Conclusion and recap of stoichiometry (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a closing summary recapping the core meaning and procedural elements of stoichiometry.

Accuracy: **accurate**. Accurately summarizes the key takeaways of the explanation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | **निष्कर्ष** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | स्टोइकियोमेट्री रसायन विज्ञान की एक महत्वपूर्ण शाखा है जो रासायनिक अभिक्रियाओं में पदार्थों की मात्रा के बीच संबंधों का अध्ययन करती है। इसका उपयोग विभिन्न क्षेत्रों में किया जाता है, और इसकी गणना करने के लिए हमें संतुलित रासायनिक समीकरण, मोलर द्रव्यमान, और मोल की गणना करनी होती है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

