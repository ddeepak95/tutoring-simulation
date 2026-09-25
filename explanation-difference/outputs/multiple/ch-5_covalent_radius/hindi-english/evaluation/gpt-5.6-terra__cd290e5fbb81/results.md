# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius in Hindi, covering its definition, formula, a worked example with chlorine, periodic trends, and boundaries of application.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 27,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 1,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 27,
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

## u1: Definition and mathematical formula for covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the concept of covalent radius as half the distance between the nuclei of two identical covalently bonded atoms, along with its formula.

Accuracy: **accurate**. The definition and formula correctly state that homonuclear covalent radius is half of the internuclear distance between two covalently bonded identical atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **सहसंयोजक त्रिज्या (Covalent Radius)** किसी परमाणु के आकार को बताने का एक तरीका है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | जब **दो समान परमाणु** आपस में **सहसंयोजक बंध (covalent bond)** बनाते हैं, तो उनके नाभिकों के बीच की दूरी मापी जाती है। इस दूरी का **आधा भाग** एक परमाणु की सहसंयोजक त्रिज्या कहलाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### सूत्र   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | यदि दो समान परमाणुओं के नाभिकों के बीच की दूरी = \(d\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | तो, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;equation&#x27;] |
| p7 | \text{सहसंयोजक त्रिज्या} = \frac{d}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p8 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;equation&#x27;] |

## u2: Worked calculation of covalent radius in Cl2 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked numeric calculation using the chlorine molecule (Cl2) with an internuclear distance of 198 pm to find a covalent radius of 99 pm, including unit clarification.

Accuracy: **accurate**. The bond length of Cl2 (198 pm) and calculated radius (99 pm) are standard and accurate, as is the definition of 1 pm = 10^-12 m.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### उदाहरण   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | क्लोरीन के अणु \(Cl_2\) में दो क्लोरीन परमाणु जुड़े होते हैं।   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 | यदि दोनों नाभिकों के बीच की दूरी \(198\ pm\) हो, तो: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;equation&#x27;] |
| p13 | \text{Cl की सहसंयोजक त्रिज्या} = \frac{198}{2} = 99\ pm | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p14 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;equation&#x27;] |
| p15 | यहाँ **pm (पिकोमीटर)** बहुत छोटी लंबाई की इकाई है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p16 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;equation&#x27;] |
| p17 | 1\; pm = 10^{-12}\; m | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p18 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;, &#x27;equation&#x27;] |

## u3: Periodic trends in covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the variations of covalent radius across periods and down groups in the periodic table along with physical causes (effective nuclear charge and addition of shells).

Accuracy: **accurate**. Accurately states that atomic/covalent radius decreases across a period due to increasing nuclear pull and increases down a group due to the addition of electron shells.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### आवर्त सारणी में परिवर्तन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | 1. **एक आवर्त में बाएँ से दाएँ जाने पर** सहसंयोजक त्रिज्या सामान्यतः **कम होती है**।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 |    कारण: नाभिक का धनात्मक आवेश बढ़ता है और इलेक्ट्रॉन नाभिक की ओर अधिक खिंचते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | 2. **एक समूह में ऊपर से नीचे जाने पर** सहसंयोजक त्रिज्या **बढ़ती है**।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 |    कारण: नीचे जाने पर नए इलेक्ट्रॉन कोश (shells) जुड़ते जाते हैं, इसलिए परमाणु बड़ा हो जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Scope of applicability of covalent radius (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Notes the limitation of covalent radius, clarifying that it is primarily useful for non-metals or elements that form covalent bonds.

Accuracy: **accurate**. Accurately points out that covalent radius is specifically applicable to elements forming covalent bonds (primarily non-metals).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### ध्यान रखने योग्य बात   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | सहसंयोजक त्रिज्या मुख्य रूप से उन तत्वों के लिए उपयोगी होती है जो सहसंयोजक बंध बनाते हैं, जैसे—H, C, N, O, Cl आदि। | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;prose&#x27;] |

## u5: Summary of covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps the core definition of covalent radius in simplified terms.

Accuracy: **accurate**. The recap accurately synthesizes the definition in plain terms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | **सरल शब्दों में:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | सहसंयोजक त्रिज्या परमाणु के “आकार” का अनुमान है, जो दो जुड़े हुए समान परमाणुओं के बीच की दूरी के आधे के बराबर होती है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

