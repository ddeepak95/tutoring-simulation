# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and accurately explains the principles, procedural steps, prominent industrial examples (Mond process and van Arkel process), and importance of vapour phase refining in Hindi.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 31,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 31,
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

## u1: Concept and definition of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines the core principle of vapour phase refining, explaining how crude metal is transformed into a volatile compound and decomposed.

Accuracy: **accurate**. The definition correctly outlines converting the impure metal into a volatile compound and subsequently decomposing it into pure metal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **वाष्प प्रावस्था शोधन (Vapour Phase Refining)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम **वाष्प प्रावस्था शोधन** को आसान भाषा में समझेंगे। यह धातुओं को शुद्ध करने की एक महत्वपूर्ण विधि है, जो खासकर उन धातुओं के लिए इस्तेमाल होती है जिनका यौगिक आसानी से वाष्प (गैस) बन जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### सरल परिभाषा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | वाष्प प्रावस्था शोधन में अशुद्ध धातु को पहले एक **वाष्पशील यौगिक** (volatile compound) में बदल दिया जाता है। फिर इस यौगिक को गर्म करके तोड़ा जाता है, जिससे शुद्ध धातु अलग हो जाती है और अशुद्धियाँ पीछे रह जाती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: General step-by-step mechanism of vapour phase refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Breaks down the purification into three sequential procedural steps: volatile compound formation, vapor separation, and thermal decomposition.

Accuracy: **accurate**. The procedural steps accurately reflect how volatile compounds are formed, separated from non-volatile impurities, and thermally decomposed.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### प्रक्रिया कैसे काम करती है? (Step-by-step) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | 1. **अशुद्ध धातु को वाष्पशील यौगिक में बदलना**   | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 |    अशुद्ध धातु को किसी रसायन (जैसे CO या आयोडीन) के साथ गर्म किया जाता है। इससे धातु का एक ऐसा यौगिक बनता है जो आसानी से वाष्प बन जाता है। अशुद्धियाँ इस यौगिक में नहीं घुलतीं या वाष्प नहीं बनातीं। | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p8 | 2. **वाष्प को अलग करना**   | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 |    यह वाष्पशील यौगिक वाष्प के रूप में ऊपर उठ जाता है और एक अलग जगह पर ले जाया जाता है। | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p10 | 3. **यौगिक को विघटित करके शुद्ध धातु प्राप्त करना**   | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 |    इस वाष्प को उच्च तापमान पर गर्म किया जाता है। यौगिक टूट जाता है और शुद्ध धातु जमा हो जाती है। गैसें (जैसे CO या आयोडीन) वापस निकल जाती हैं और दोबारा इस्तेमाल की जा सकती हैं। | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u3: Mond process for nickel purification (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the Mond process as a specific real-world application, detailing the conditions and chemical equations for refining nickel.

Accuracy: **accurate**. The reaction temperatures (50–60°C for nickel tetracarbonyl formation, 150–180°C for decomposition) and stoichiometric chemical equations are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### महत्वपूर्ण उदाहरण (High School के लिए) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | **1. मॉन्ड प्रक्रम (Mond’s Process) – निकेल (Ni) के शोधन के लिए** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | - अशुद्ध निकेल को 50–60°C पर कार्बन मोनोऑक्साइड (CO) गैस के साथ गर्म किया जाता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | - प्रतिक्रिया:   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 |   **Ni + 4CO → Ni(CO)₄** (निकल टेट्राकार्बोनिल – वाष्पशील) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p17 | - फिर Ni(CO)₄ को 150–180°C पर गर्म किया जाता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 | - **Ni(CO)₄ → Ni (शुद्ध) + 4CO** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |

## u4: van Arkel process for titanium and zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the van Arkel process using iodine to purify titanium via titanium tetraiodide decomposition.

Accuracy: **accurate**. The reaction equations and approximate decomposition temperature for titanium refining using the van Arkel method are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | **2. वैन आर्केल प्रक्रम (van Arkel Process) – टाइटेनियम (Ti) या जिरकोनियम (Zr) के लिए** | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | - अशुद्ध Ti को आयोडीन (I₂) के साथ गर्म किया जाता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | - **Ti + 2I₂ → TiI₄** (टाइटेनियम टेट्राआयोडाइड – वाष्पशील) | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p22 | - TiI₄ को 1400°C पर गर्म करने पर: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 |   **TiI₄ → Ti (शुद्ध) + 2I₂** | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |

## u5: Utility and advantages of vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the key benefits of the process, including ultra-high purity and suitability for specific metals.

Accuracy: **accurate**. The statements accurately depict the high-purity yield and separation basis of this refining method.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### क्यों उपयोगी है यह विधि? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | - बहुत उच्च शुद्धता (99.9% तक) मिलती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p26 | - अशुद्धियाँ वाष्प नहीं बनातीं, इसलिए अलग हो जाती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 | - मुख्य रूप से Ni, Ti, Zr जैसी धातुओं के लिए इस्तेमाल होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Recap of essential conditions (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap of the two mandatory requirements for vapour phase refining to work, followed by a friendly closing offer.

Accuracy: **accurate**. The two summarized conditions (formation of a volatile compound and temperature-dependent formation/decomposition) are precisely the requirements stated in standard metallurgy textbooks.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ### याद रखने वाली बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | - यह विधि केवल उन्हीं धातुओं के लिए काम करती है जिनका यौगिक आसानी से वाष्प बनता हो। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 | - प्रक्रिया में तापमान बहुत महत्वपूर्ण है – एक तापमान पर यौगिक बनता है, दूसरे पर टूटता है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | अगर आपको कोई उदाहरण और विस्तार से समझना हो, या डायग्राम के साथ, या कोई प्रश्न हो (जैसे Mond process का पूरा समीकरण), तो बताओ! 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

