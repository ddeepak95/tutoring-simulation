# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses the requested topic of isotopes in Hindi, covering definition, atomic/nuclear composition, a carbon isotope example, properties, and practical applications.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 20,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 20,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines isotopes as atoms of the same element having the same atomic number (protons) but different atomic masses (neutrons).

Accuracy: **accurate**. Correctly defines isotopes in terms of identical atomic number (protons) and different mass numbers (neutrons).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **आइसोटोप क्या है?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम आइसोटोप के बारे में पढ़ने जा रहे हैं। आइसोटोप एक महत्वपूर्ण अवधारणा है जो रसायन विज्ञान और भौतिकी में प्रयोग की जाती है। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | **आइसोटोप की परिभाषा** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | आइसोटोप एक ही तत्व के परमाणु होते हैं जिनकी परमाणु संख्या समान होती है, लेकिन उनके परमाणु द्रव्यमान में अंतर होता है। इसका मतलब है कि आइसोटोप में प्रोटॉन की संख्या समान होती है, लेकिन न्यूट्रॉन की संख्या में अंतर होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Carbon isotopes example (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using carbon-12, carbon-13, and carbon-14, enumerating their proton and neutron counts.

Accuracy: **accurate**. Accurately specifies that carbon has atomic number 6, and that C-12 has 6 neutrons, C-13 has 7 neutrons, and C-14 has 8 neutrons.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | **आइसोटोप को समझने के लिए एक उदाहरण** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | कार्बन एक तत्व है जिसका परमाणु संख्या 6 है। इसका मतलब है कि कार्बन के सभी परमाणुओं में 6 प्रोटॉन होते हैं। कार्बन के तीन आइसोटोप हैं: कार्बन-12, कार्बन-13, और कार्बन-14। इन तीनों आइसोटोप में 6 प्रोटॉन होते हैं, लेकिन न्यूट्रॉन की संख्या में अंतर होता है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | * कार्बन-12 में 6 प्रोटॉन और 6 न्यूट्रॉन होते हैं। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p8 | * कार्बन-13 में 6 प्रोटॉन और 7 न्यूट्रॉन होते हैं। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | * कार्बन-14 में 6 प्रोटॉन और 8 न्यूट्रॉन होते हैं। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share similar chemical properties (same atomic number / electron configuration) and differ in physical properties (different masses).

Accuracy: **accurate**. The explanation accurately distinguishes chemical properties from physical properties for isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | **आइसोटोप के गुण** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | आइसोटोप के कुछ महत्वपूर्ण गुण हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p12 | * आइसोटोप के रासायनिक गुण लगभग समान होते हैं क्योंकि उनकी परमाणु संख्या समान होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p13 | * आइसोटोप के भौतिक गुण, जैसे कि घनत्व और गलनांक, थोड़े अलग हो सकते हैं क्योंकि उनके परमाणु द्रव्यमान में अंतर होता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u4: Applications of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists general domains where isotopes are applied, including medicine, scientific research, and industry.

Accuracy: **accurate**. Radioisotopes and stable isotopes are indeed widely utilized in cancer treatment/medicine, research, and industrial process control.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | **आइसोटोप के उपयोग** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | आइसोटोप के कई उपयोग हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | * रेडियोधर्मी आइसोटोप का उपयोग चिकित्सा में कैंसर के इलाज के लिए किया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 | * आइसोटोप का उपयोग वैज्ञानिक अनुसंधान में तत्वों के गुणों को समझने के लिए किया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | * आइसोटोप का उपयोग उद्योग में विभिन्न प्रक्रियाओं को समझने और नियंत्रित करने के लिए किया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Recap and conclusion (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a brief final summary of the core definition and relevance of isotopes alongside closing remarks.

Accuracy: **accurate**. The concluding recap accurately summarizes the main concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | **निष्कर्ष** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | आइसोटोप एक ही तत्व के परमाणु होते हैं जिनकी परमाणु संख्या समान होती है, लेकिन उनके परमाणु द्रव्यमान में अंतर होता है। आइसोटोप के गुण और उपयोग विभिन्न क्षेत्रों में महत्वपूर्ण हैं। मुझे उम्मीद है कि आपको आइसोटोप के बारे में समझने में मदद मिली होगी। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

