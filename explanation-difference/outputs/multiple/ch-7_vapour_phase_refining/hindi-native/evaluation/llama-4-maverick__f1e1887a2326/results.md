# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses vapour phase refining in Hindi as requested for a high school level, discussing its definition, process steps, examples (zinc and nickel), benefits, and summary.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 16,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 16,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "contains_error": 5,
    "accurate": 1
  },
  "proposed_error_records": 5,
  "proposed_error_severity": {
    "minor": 3,
    "major": 2
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: वाष्प प्रावस्था परिष्करण की परिभाषा (Definition of Vapour Phase Refining) (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines vapour phase refining and mentions the types of metals it is applied to.

Accuracy: **contains_error**. The passage incorrectly states that the process is suitable for metals that are directly volatile ('जो वाष्पशील होती हैं'). Direct vaporization of a volatile metal followed by condensation is distillation (आसवन), not vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | वाष्प प्रावस्था परिष्करण एक ऐसी प्रक्रिया है जिसमें धातुओं को शुद्ध करने के लिए वाष्प अवस्था में परिवर्तित किया जाता है और फिर उन्हें शुद्ध रूप में प्राप्त किया जाता है। यह प्रक्रिया विशेष रूप से उन धातुओं के लिए उपयुक्त है जो वाष्पशील होती हैं या जिनके यौगिक वाष्पशील होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p1): The passage claims vapour phase refining is suitable for metals that are themselves volatile. In metallurgy, purifying volatile metals directly is termed distillation (आसवन). Vapour phase refining specifically applies to metals that react with a reagent to form volatile compounds which are subsequently decomposed.

Correction: वाष्प प्रावस्था परिष्करण केवल उन धातुओं के लिए उपयुक्त है जो किसी अभिकर्मक के साथ एक वाष्पशील यौगिक बनाती हैं, जिसे आसानी से विघटित कर शुद्ध धातु प्राप्त की जा सकती है। स्वयं वाष्पशील धातुओं का शुद्धिकरण आसवन (distillation) कहलाता है।

## u2: वाष्प प्रावस्था परिष्करण के चरण (Steps of Vapour Phase Refining) (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the purported step-by-step mechanism and stages involved in vapour phase refining.

Accuracy: **contains_error**. The unit describes simple physical distillation (heating the metal to vaporize it directly and condensing it on a cold surface) instead of vapour phase refining. Vapour phase refining requires converting the metal into a volatile chemical compound with a reagent and then thermally decomposing that compound to recover the pure metal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | **वाष्प प्रावस्था परिष्करण की प्रक्रिया** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | वाष्प प्रावस्था परिष्करण की प्रक्रिया में निम्नलिखित चरण शामिल हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | 1. **धातु का वाष्पीकरण**: धातु को गर्म करके वाष्प अवस्था में परिवर्तित किया जाता है। यह प्रक्रिया आमतौर पर निर्वात या अक्रिय गैस वातावरण में की जाती है ताकि धातु का ऑक्सीकरण न हो। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p5 | 2. **वाष्प का संघनन**: धातु के वाष्प को ठंडे सतह पर संघनित किया जाता है, जिससे शुद्ध धातु प्राप्त होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | 3. **अशुद्धियों का पृथक्करण**: अशुद्धियाँ जो वाष्पशील नहीं होती हैं या जिनका वाष्प दबाव धातु से कम होता है, वे पीछे रह जाती हैं और शुद्ध धातु से अलग हो जाती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

Error (major; p4, p5, p6): The steps described (vaporization of the metal itself, followed by condensation on a cold surface leaving non-volatile impurities behind) represent simple distillation rather than vapour phase refining. Vapour phase refining fundamentally relies on chemical conversion to a volatile intermediate and subsequent thermal decomposition.

Correction: वाष्प प्रावस्था परिष्करण के मुख्य चरण हैं: (1) धातु को उपयुक्त अभिकर्मक के साथ गर्म करके एक वाष्पशील यौगिक में बदलना, और (2) उस वाष्पशील यौगिक को उच्च ताप पर विघटित करके शुद्ध धातु प्राप्त करना।

## u3: जिंक के परिष्करण का उदाहरण (Example of Zinc Refining) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents zinc refining based on vapor pressure as an illustrative example of vapour phase refining.

Accuracy: **contains_error**. Zinc refining due to low boiling point / high vapor pressure is carried out by distillation (आसवन), not by vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **वाष्प प्रावस्था परिष्करण के उदाहरण** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | वाष्प प्रावस्था परिष्करण के कुछ उदाहरण हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | * **जिंक का परिष्करण**: जिंक को वाष्प प्रावस्था परिष्करण द्वारा शुद्ध किया जा सकता है क्योंकि इसका वाष्प दबाव अधिक होता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

Error (major; p9): Zinc is classified under distillation (आसवन) in metallurgy because of its relatively low boiling point. It is not an example of vapour phase refining.

Correction: जिंक का परिष्करण आसवन (distillation) विधि द्वारा किया जाता है। वाष्प प्रावस्था परिष्करण के प्रमुख उदाहरण मोंड प्रक्रिया (निकेल के लिए) और वैन आर्केल विधि (जिरकोनियम/टाइटेनियम के लिए) हैं।

## u4: निकेल के परिष्करण का उदाहरण (मोंड प्रक्रिया) (Example of Nickel Refining via Mond Process) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the Mond process for refining nickel as a real-world application of vapour phase refining.

Accuracy: **accurate**. The passage correctly describes the Mond process, where nickel reacts with carbon monoxide to form volatile nickel carbonyl, which is then heated to decompose into pure nickel.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | * **निकेल का परिष्करण**: निकेल को मोंड प्रक्रिया द्वारा शुद्ध किया जा सकता है, जिसमें निकेल को कार्बन मोनोऑक्साइड के साथ गर्म करके निकेल कार्बोनिल बनाया जाता है, जो वाष्पशील होता है। इसे फिर गर्म करके शुद्ध निकेल प्राप्त किया जाता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: वाष्प प्रावस्था परिष्करण के लाभ (Advantages of Vapour Phase Refining) (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines advantages attributed to vapour phase refining, including high purity and energy consumption claims.

Accuracy: **contains_error**. The claim that vapour phase refining consumes low energy because metal does not need to be melted is incorrect; these processes often involve high temperatures for reaction and decomposition, and low energy consumption is not a defining advantage.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | **वाष्प प्रावस्था परिष्करण के लाभ** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | वाष्प प्रावस्था परिष्करण के कुछ लाभ हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | * **उच्च शुद्धता**: वाष्प प्रावस्था परिष्करण द्वारा बहुत उच्च शुद्धता वाली धातुएँ प्राप्त की जा सकती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | * **कम ऊर्जा की खपत**: यह प्रक्रिया कम ऊर्जा की खपत करती है क्योंकि धातु को पिघलाने की आवश्यकता नहीं होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

Error (minor; p14): Vapour phase refining is not characterized by low energy consumption; thermal decomposition often requires significant heat input (e.g., Van Arkel process requires heating a tungsten filament above 1800°C), and avoiding melting is not a factual advantage of this process.

Correction: वाष्प प्रावस्था परिष्करण मुख्य रूप से अति-उच्च शुद्धता (ultra-high purity) प्राप्त करने के लिए उपयोग किया जाता है, न कि कम ऊर्जा की खपत के लिए।

## u6: वाष्प प्रावस्था परिष्करण का निष्कर्ष (Conclusion and Recap) (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the main points and takeaways regarding vapour phase refining.

Accuracy: **contains_error**. The summary repeats the earlier inaccuracies regarding applicability to volatile metals and low energy consumption.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | **निष्कर्ष** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | वाष्प प्रावस्था परिष्करण एक महत्वपूर्ण प्रक्रिया है जिसका उपयोग धातुओं को शुद्ध करने के लिए किया जाता है। यह प्रक्रिया विशेष रूप से उन धातुओं के लिए उपयुक्त है जो वाष्पशील होती हैं या जिनके यौगिक वाष्पशील होते हैं। वाष्प प्रावस्था परिष्करण द्वारा उच्च शुद्धता वाली धातुएँ प्राप्त की जा सकती हैं और यह प्रक्रिया कम ऊर्जा की खपत करती है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p16): The recap reiterates that vapour phase refining is suitable for metals that are directly volatile and that it consumes low energy.

Correction: वाष्प प्रावस्था परिष्करण उन धातुओं के लिए उपयुक्त है जिनके यौगिक वाष्पशील और आसानी से अपघटनीय होते हैं, तथा इसका मुख्य लाभ उच्च शुद्धता प्राप्त करना है।

