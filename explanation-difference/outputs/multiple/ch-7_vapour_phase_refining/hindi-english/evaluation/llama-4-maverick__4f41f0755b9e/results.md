# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains vapour phase refining in Hindi, including its general concept, purported steps, specific industrial methods (Mond process and Van Arkel process), and its significance.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 10,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 2
  },
  "nested_passages": 10,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "contains_error": 2,
    "accurate": 3
  },
  "proposed_error_records": 2,
  "proposed_error_severity": {
    "major": 2
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: वाष्प प्रावस्था परिष्करण की परिभाषा और सिद्धांत (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and explains the principle of vapour phase refining.

Accuracy: **contains_error**. Passage p2 confuses vapour phase refining with simple distillation by stating that the metal is converted into its vapour and then condensed based on boiling point differences.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | वाष्प प्रावस्था परिष्करण (Vapour Phase Refining) एक ऐसी प्रक्रिया है जिसमें धातुओं को शुद्ध करने के लिए उनके वाष्प का उपयोग किया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | इस प्रक्रिया में, धातु को पहले वाष्प में बदला जाता है, और फिर इस वाष्प को ठंडा करके शुद्ध धातु प्राप्त की जाती है। यह प्रक्रिया उन धातुओं के लिए उपयुक्त है जो आसानी से वाष्प में बदल जाती हैं और जिनके अशुद्धियों के वाष्पीकरण बिंदु अलग होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

Error (major; p2): The text describes vapour phase refining as a physical evaporation and condensation process based on differences in boiling points. In metallurgy, vapour phase refining requires reacting the metal with a suitable reagent to form a volatile chemical compound, which is subsequently decomposed at higher temperatures to give pure metal. Simply vaporizing and condensing the metal is distillation (आसवन).

Correction: वाष्प प्रावस्था परिष्करण में धातु को सीधे वाष्पीकृत करके संघनित नहीं किया जाता; बल्कि धातु को किसी अभिकर्मक के साथ क्रिया कराकर एक वाष्पशील यौगिक में बदला जाता है, जिसे बाद में उच्च ताप पर अपघटित करके शुद्ध धातु प्राप्त की जाती है।

## u2: वाष्प प्रावस्था परिष्करण के चरण (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a sequence of steps describing how the process is carried out.

Accuracy: **contains_error**. The procedural steps provided (evaporation, separation of vapour, and condensation) describe physical distillation rather than the two fundamental steps of chemical vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | वाष्प प्रावस्था परिष्करण की प्रक्रिया निम्नलिखित है: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;, &#x27;heading&#x27;] |
| p4 | 1. **वाष्पीकरण**: धातु को गर्म करके वाष्प में बदला जाता है। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p5 | 2. **वाष्प का पृथक्करण**: वाष्प को अशुद्धियों से अलग किया जाता है, जो या तो वाष्प में नहीं बदलती हैं या अलग वाष्पीकरण बिंदु पर वाष्प में बदलती हैं। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p6 | 3. **वाष्प का संघनन**: शुद्ध धातु के वाष्प को ठंडा करके तरल या ठोस में बदला जाता है, जिससे शुद्ध धातु प्राप्त होती है। | PROCEDURE | {} | [&#x27;list&#x27;] |

Error (major; p4, p5, p6): The listed steps (vaporization, separation of vapours, and condensation into liquid/solid) depict distillation. Vapour phase refining involves: (1) conversion of the impure metal into a volatile compound using a specific reagent, and (2) thermal decomposition of that volatile compound to recover the pure metal.

Correction: वाष्प प्रावस्था परिष्करण के वास्तविक चरण हैं: (1) अशुद्ध धातु की उपयुक्त अभिकर्मक से क्रिया कराकर वाष्पशील यौगिक बनाना, और (2) उस वाष्पशील यौगिक को उच्च ताप पर अपघटित करके शुद्ध धातु प्राप्त करना।

## u3: मोंड प्रक्रम द्वारा निकेल का शोधन (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Mond process for purifying nickel.

Accuracy: **accurate**. The description of the Mond process (reacting nickel with carbon monoxide to form volatile nickel carbonyl and heating it to obtain pure nickel) is factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | वाष्प प्रावस्था परिष्करण के उदाहरणों में शामिल हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;, &#x27;heading&#x27;] |
| p8 | * **मोंड प्रक्रिया**: निकेल को शुद्ध करने के लिए उपयोग की जाने वाली एक प्रक्रिया, जिसमें निकेल को कार्बन मोनोऑक्साइड के साथ मिलाकर निकेल कार्बोनिल बनाया जाता है, जो एक वाष्प है। इस वाष्प को गर्म करके शुद्ध निकेल प्राप्त किया जाता है। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: वान आर्केल प्रक्रम द्वारा ज़िरकोनियम और टाइटेनियम का शोधन (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel process for purifying zirconium and titanium.

Accuracy: **accurate**. The description of the Van Arkel method (forming a volatile iodide with iodine and decomposing it to yield pure metal) is factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | * **वान आर्केल प्रक्रिया**: ज़िरकोनियम और टाइटेनियम जैसी धातुओं को शुद्ध करने के लिए उपयोग की जाने वाली एक प्रक्रिया, जिसमें धातु को आयोडीन के साथ मिलाकर एक वाष्प बनाया जाता है, जिसे बाद में शुद्ध धातु में बदला जाता है। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: वाष्प प्रावस्था परिष्करण का औद्योगिक महत्व (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the practical significance of vapour phase refining in yielding high-purity metals.

Accuracy: **accurate**. Accurately highlights that vapour phase refining is used to obtain metals with very high purity for industrial applications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | वाष्प प्रावस्था परिष्करण एक महत्वपूर्ण प्रक्रिया है जो उच्च शुद्धता वाली धातुओं को प्राप्त करने में मदद करती है, जो विभिन्न औद्योगिक अनुप्रयोगों में उपयोग की जाती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

