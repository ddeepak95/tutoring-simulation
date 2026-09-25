# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly explains covalent radius in Hindi at a high school level, covering its definition, calculation method, illustrative worked examples (H2 and Cl2), homonuclear single-bond condition, and periodic trends across periods and down groups.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 19,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 19,
  "unique_subtopics": 5,
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

## u1: Definition and calculation of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what covalent radius is and how it is determined from the internuclear distance between covalently bonded atoms.

Accuracy: **accurate**. Accurately defines covalent radius as half the internuclear distance between two identical bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम हाई स्कूल के स्तर पर **सहसंयोजक त्रिज्या** (Covalent Radius) को आसान भाषा में समझते हैं। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### सहसंयोजक त्रिज्या क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | जब दो परमाणु आपस में **सहसंयोजक बंध** (covalent bond) बनाते हैं, तो उस बंध में दोनों परमाणुओं के नाभिक (nucleus) के बीच की दूरी को मापा जाता है। इस दूरी का आधा भाग एक परमाणु की **सहसंयोजक त्रिज्या** कहलाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | सरल शब्दों में:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | दो एक जैसे परमाणु मिलकर एक अणु बनाते हैं। उनके बीच का बंध जितना लंबा होता है, उस लंबाई को 2 से भाग देने पर जो संख्या आती है, वही उस परमाणु की सहसंयोजक त्रिज्या होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Calculation of hydrogen covalent radius (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked numerical calculation showing how the covalent radius of hydrogen is computed from the H-H bond length.

Accuracy: **accurate**. Correctly states the experimental H-H bond length of 74 pm and calculates the covalent radius of hydrogen as 37 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### उदाहरण से समझें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | - हाइड्रोजन के दो परमाणु मिलकर H₂ अणु बनाते हैं।   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 |   H–H बंध की लंबाई = 74 pm (पिकोमीटर)   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 |   इसलिए हाइड्रोजन की सहसंयोजक त्रिज्या = 74 ÷ 2 = **37 pm** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Calculation of chlorine covalent radius (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked numerical calculation showing how the covalent radius of chlorine is computed from the Cl-Cl bond length.

Accuracy: **accurate**. Correctly states the experimental Cl-Cl bond length of 198 pm and calculates the covalent radius of chlorine as 99 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | - क्लोरीन के दो परमाणु Cl₂ अणु बनाते हैं।   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 |   Cl–Cl बंध की लंबाई = 198 pm   | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 |   इसलिए क्लोरीन की सहसंयोजक त्रिज्या = 198 ÷ 2 = **99 pm** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Condition for calculating homonuclear single-bond covalent radius (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the scope limitation where the direct half-bond-length calculation is valid, specifying homonuclear single bonds.

Accuracy: **accurate**. Within the scoped introductory high school framework where covalent radius is introduced as half the internuclear distance, the condition that atoms must be of the same element and connected by a single bond is an acceptable scoping simplification.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ### महत्वपूर्ण बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - सहसंयोजक त्रिज्या केवल तभी मापी जाती है जब दोनों परमाणु **एक ही तत्व** के हों और उनके बीच **एकल बंध** (single bond) हो। | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the variation of covalent radius across periods and down groups in the periodic table along with underlying physical reasons.

Accuracy: **accurate**. Accurately describes that covalent radius decreases across a period due to increasing effective nuclear attraction and increases down a group due to the addition of electron shells.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | - periodic table में बाएँ से दाएँ जाने पर (एक ही आवर्त में) सहसंयोजक त्रिज्या **घटती** जाती है, क्योंकि नाभिक में प्रोटॉनों की संख्या बढ़ने से इलेक्ट्रॉन अधिक आकर्षित होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | - ऊपर से नीचे जाने पर (एक ही वर्ग में) सहसंयोजक त्रिज्या **बढ़ती** जाती है, क्योंकि नए कोश (shell) जुड़ते जाते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Key takeaway on covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential formula/definition for the student to remember, accompanied by an interactive closing remark.

Accuracy: **accurate**. Accurately summarizes that the covalent radius corresponds to half the bond length for identical bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### याद रखने वाली बात | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | सहसंयोजक त्रिज्या हमेशा **आधा बंध लंबाई** होती है, जब दोनों परमाणु समान हों। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p19 | अब तुम बता, क्या यह समझ आ गया? या कोई उदाहरण और चाहिए (जैसे कार्बन या ऑक्सीजन का)? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

