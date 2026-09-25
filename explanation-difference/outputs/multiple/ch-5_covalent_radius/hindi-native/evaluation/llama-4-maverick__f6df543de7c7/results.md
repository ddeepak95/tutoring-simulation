# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the concept, characteristics, periodic trends, and importance of covalent radius in Hindi as requested.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 15,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 15,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "contains_error": 1,
    "accurate": 3
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "major": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and provides the fundamental definition of covalent radius.

Accuracy: **contains_error**. The definition states that covalent radius is the distance from the nucleus to the outermost electron in a bonded atom. In chemistry, covalent radius is defined as one-half of the distance between the nuclei of two identical covalently bonded atoms (half the internuclear distance), rather than the distance to an outermost electron.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **सहसंयोजक त्रिज्या: एक विस्तृत व्याख्या** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्कार! आज हम सहसंयोजक त्रिज्या के बारे में विस्तार से चर्चा करेंगे। यह एक महत्वपूर्ण अवधारणा है जो रसायन विज्ञान में परमाणुओं के बीच बंधन बनाने की प्रक्रिया को समझने में मदद करती है। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | **सहसंयोजक त्रिज्या क्या है?** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | सहसंयोजक त्रिज्या एक परमाणु के नाभिक से उसके सबसे बाहरी इलेक्ट्रॉन तक की दूरी का माप है, जब वह परमाणु किसी अन्य परमाणु के साथ सहसंयोजक बंधन में जुड़ा होता है। यह त्रिज्या परमाणु के आकार को दर्शाती है जब वह अन्य परमाणुओं के साथ बंधन बनाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

Error (major; p4): Covalent radius is incorrectly defined as the distance from the nucleus to the outermost electron when bonded ('नाभिक से उसके सबसे बाहरी इलेक्ट्रॉन तक की दूरी का माप'). Electrons in a covalent bond are shared in molecular orbitals and cannot be localized to a definite outermost boundary; rather, covalent radius is experimentally defined as half the internuclear distance between two identical bonded atoms.

Correction: सहसंयोजक त्रिज्या को एकल सहसंयोजक बंध द्वारा जुड़े दो समान परमाणुओं के नाभिकों के बीच की दूरी (अंतर-नाभिकीय दूरी) के आधे के रूप में परिभाषित किया जाता है।

## u2: Characteristics and periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines key properties of covalent radius including its relation to bond length and its trends across periods and down groups.

Accuracy: **accurate**. The statements accurately describe the relationship between covalent radii and bond length, as well as the standard periodic trends (decreasing across a period and increasing down a group).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | **सहसंयोजक त्रिज्या की विशेषताएं** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | 1. **परमाणु आकार**: सहसंयोजक त्रिज्या परमाणु के आकार को दर्शाती है जब वह अन्य परमाणुओं के साथ बंधन बनाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | 2. **बंध लंबाई**: दो परमाणुओं के बीच सहसंयोजक बंधन की लंबाई उनके सहसंयोजक त्रिज्याओं के योग के बराबर होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | 3. **आवर्त सारणी में परिवर्तन**: आवर्त सारणी में बाएं से दाएं जाने पर सहसंयोजक त्रिज्या घटती है, जबकि ऊपर से नीचे जाने पर बढ़ती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Significance and utility of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents applications of covalent radius in predicting bond length, molecular geometry, and chemical properties.

Accuracy: **accurate**. The listed applications of covalent radius are standard and scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **सहसंयोजक त्रिज्या का महत्व** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | 1. **बंध लंबाई की भविष्यवाणी**: सहसंयोजक त्रिज्या का उपयोग करके हम दो परमाणुओं के बीच बंध लंबाई की भविष्यवाणी कर सकते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | 2. **अणु की ज्यामिति**: सहसंयोजक त्रिज्या अणु की ज्यामिति को समझने में मदद करती है, जैसे कि बंध कोण और अणु का आकार। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | 3. **रासायनिक गुणों की व्याख्या**: सहसंयोजक त्रिज्या का उपयोग करके हम रासायनिक गुणों की व्याख्या कर सकते हैं, जैसे कि अभिक्रियाशीलता और स्थिरता। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Recap and closing remarks (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key points covered in the lesson and provides closing social remarks.

Accuracy: **accurate**. The summary accurately reiterates the points presented without introducing new errors.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | **निष्कर्ष** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | सहसंयोजक त्रिज्या एक महत्वपूर्ण अवधारणा है जो रसायन विज्ञान में परमाणुओं के बीच बंधन बनाने की प्रक्रिया को समझने में मदद करती है। इसका उपयोग करके हम बंध लंबाई की भविष्यवाणी कर सकते हैं, अणु की ज्यामिति को समझ सकते हैं, और रासायनिक गुणों की व्याख्या कर सकते हैं। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p15 | उम्मीद है, आपको सहसंयोजक त्रिज्या के बारे में यह व्याख्या समझने में मदद मिली होगी। यदि आपके पास कोई प्रश्न है, तो कृपया पूछने में संकोच न करें। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

