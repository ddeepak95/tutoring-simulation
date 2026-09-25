# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains vapour phase refining in Hindi, including its definition, conditions, general mechanism, and specific industrial examples (Mond process and Van Arkel method).

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 38,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 38,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 6,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and Meaning of Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the topic, breaks down the literal meaning of each word ('वाष्प', 'प्रावस्था', 'परिष्करण'), and provides the core definition of the refining technique.

Accuracy: **accurate**. The explanation and definition accurately describe vapour phase refining as converting a metal into a volatile compound to separate it from impurities and subsequently recovering pure metal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम रसायन विज्ञान (Chemistry) के धातु कर्म (Metallurgy) अध्याय का एक बहुत ही महत्वपूर्ण और दिलचस्प टॉपिक समझेंगे—**वाष्प प्रावस्था परिष्करण (Vapor Phase Refining)**। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | नाम थोड़ा भारी लग सकता है, लेकिन इसका सिद्धांत बहुत ही आसान और जादुई है। आइए इसे बिल्कुल सरल भाषा में समझते हैं। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### नाम का मतलब क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | * **वाष्प (Vapor):** भाप या गैस। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | * **प्रावस्था (Phase):** अवस्था (State)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | * **परिष्करण (Refining):** शुद्धिकरण (Purification)। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | सीधे शब्दों में कहें तो: **&quot;धातु को गैस (वाष्प) में बदलकर अशुद्धियों से अलग करना और फिर से शुद्ध धातु प्राप्त करना।&quot;** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Gold and Dust Analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p11", "quote": "मान लीजिए आपके पास सोने का एक टुकड़ा है जिसमें धूल-मिट्टी चिपकी है। अगर आपके पास कोई ऐसा जादू हो जिससे केवल 'सोना' उड़कर गैस बन जाए और धूल वहीं छूट जाए, फिर आप उस गैस को ठंडा करके वापस ठोस सोना बना लें—तो आपको बिल्कुल शुद्ध सोना मिल जाएगा ना?"}]}

Annotation rationale: Uses an intuitive everyday scenario involving gold and dust to explain how selectively vaporizing a metal leaves impurities behind.

Accuracy: **accurate**. The analogy accurately illustrates the underlying physical-chemical separation principle of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p10 | ### इसे एक उदाहरण से समझें (एक जादुई तरकीब): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | मान लीजिए आपके पास सोने का एक टुकड़ा है जिसमें धूल-मिट्टी चिपकी है। अगर आपके पास कोई ऐसा जादू हो जिससे केवल &#x27;सोना&#x27; उड़कर गैस बन जाए और धूल वहीं छूट जाए, फिर आप उस गैस को ठंडा करके वापस ठोस सोना बना लें—तो आपको बिल्कुल शुद्ध सोना मिल जाएगा ना?  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p12 | वाष्प प्रावस्था परिष्करण में हम वैज्ञानिक तरीके से यही करते हैं! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Prerequisites for Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the two necessary conditions that must be fulfilled for vapour phase refining to be applicable.

Accuracy: **accurate**. The stated conditions (forming a volatile compound with an available reagent and the volatile compound being easily decomposable) are the standard prerequisites for vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p14 | ### इसके लिए 2 अनिवार्य शर्तें (Two Golden Rules): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | बोर्ड परीक्षा में यह अक्सर पूछा जाता है। इस विधि के लिए दो शर्तें पूरी होनी चाहिए: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | 1. **वाष्पशील यौगिक बनना:** अशुद्ध धातु किसी उपयुक्त रसायन (Reagent) के साथ मिलकर आसानी से भाप बनने वाला (Volatile) यौगिक बनाए। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | 2. **आसानी से टूटना:** वह बना हुआ यौगिक ऐसा होना चाहिए, जिसे थोड़ा और गर्म करने पर वह आसानी से टूट जाए और हमें शुद्ध धातु वापस मिल जाए। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: General Two-Step Mechanism (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lays out the reusable two-step procedure: formation of the volatile compound leaving impurities behind, followed by thermal decomposition to yield pure metal.

Accuracy: **accurate**. Accurately details the two standard operational stages of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p19 | ### यह प्रक्रिया कैसे काम करती है? (2 आसान चरण) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | * **चरण 1:** अशुद्ध धातु को किसी गैस या रसायन के साथ कम तापमान पर गर्म किया जाता है। धातु उस रसायन से क्रिया करके **वाष्प (गैस)** बन जाती है, जबकि अशुद्धियाँ (Impurities) ठोस अवस्था में नीचे ही छूट जाती हैं। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | * **चरण 2:** अब इस गैस को अलग ले जाकर बहुत अधिक तापमान पर गर्म किया जाता है, जिससे यह टूट (Decompose) जाती है और हमें **100% शुद्ध धातु** प्राप्त हो जाती है। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Mond Process for Nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked example of Mond's process for nickel refining, with chemical equations and temperatures for both formation and decomposition.

Accuracy: **accurate**. The reaction equations and temperatures (330–350 K for formation of Ni(CO)4 and 450–470 K for its decomposition) are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p23 | ### इसके 2 सबसे महत्वपूर्ण उदाहरण (परीक्षा के लिए अति-महत्वपूर्ण): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | #### 1. मॉन्ड प्रक्रम (Mond&#x27;s Process) - निकेल (Ni) के शुद्धिकरण के लिए | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | * **पहला कदम:** अशुद्ध निकेल को कार्बन मोनोऑक्साइड ($\text{CO}$) के साथ 330–350 K पर गर्म करते हैं। इससे निकेल टेट्राकार्बोनिल की वाष्प बन जाती है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p26 |   $$\text{Ni (अशुद्ध)} + 4\text{CO} \xrightarrow{330-350\text{ K}} \text{Ni(CO)}_4 \text{ (वाष्प)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | * **दूसरा कदम:** इस वाष्प को 450–470 K पर और तेज गर्म करते हैं, जिससे यह टूट जाता है और शुद्ध निकेल अलग हो जाता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 |   $$\text{Ni(CO)}_4 \xrightarrow{450-470\text{ K}} \text{Ni (शुद्ध)} + 4\text{CO}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u6: Van Arkel Method for Zirconium and Titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked example of the Van Arkel method for Zr/Ti refining with application context, reaction steps, equations, and specific conditions (tungsten filament at ~2075 K).

Accuracy: **accurate**. The reaction equations and temperatures (~870 K for iodination and ~2075 K on a tungsten filament for decomposition) are accurate according to standard metallurgy textbooks.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | #### 2. वैन-आरकेल विधि (Van Arkel Method) - ज़िरकोनियम (Zr) या टाइटेनियम (Ti) के लिए | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | इसका उपयोग स्पेसक्राफ्ट और हवाई जहाजों में लगने वाली बहुत शुद्ध धातुओं के लिए होता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | * **पहला कदम:** अशुद्ध ज़िरकोनियम को आयोडीन ($\text{I}_2$) के साथ गर्म करते हैं, जिससे वाष्पशील $\text{ZrI}_4$ बनता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 |   $$\text{Zr (अशुद्ध)} + 2\text{I}_2 \xrightarrow{870\text{ K}} \text{ZrI}_4 \text{ (वाष्प)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | * **दूसरा कदम:** इस वाष्प को एक बहुत गर्म **टंगस्टन फिलामेंट (लगभग 2075 K)** पर गुजारा जाता है, जिससे शुद्ध धातु फिलामेंट पर जम जाती है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 |   $$\text{ZrI}_4 \xrightarrow{2075\text{ K (टंगस्टन)}} \text{Zr (शुद्ध)} + 2\text{I}_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u7: Summary of Vapour Phase Refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick schematic summary / recap of the entire process followed by a friendly closing remark.

Accuracy: **accurate**. The summary diagrammatic flow accurately reflects the core chemical mechanism.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p36 | ### संक्षेप में (Quick Revision): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | अशुद्ध धातु + अभिकर्मक $\rightarrow$ **वाष्प (अशुद्धियां बाहर)** $\rightarrow$ उच्च ताप $\rightarrow$ **अति-शुद्ध धातु**। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p38 | उम्मीद है आपको यह प्रक्रिया अच्छे से समझ आ गई होगी! यदि इसमें कोई समीकरण या चरण दोबारा समझना हो, तो बेझिझक पूछिए। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

