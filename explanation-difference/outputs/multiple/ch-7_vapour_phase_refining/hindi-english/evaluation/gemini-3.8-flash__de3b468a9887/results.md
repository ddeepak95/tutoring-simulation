# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response thoroughly explains vapour phase refining, covering its definition, underlying principles, the two key industrial examples (Mond process and Van Arkel method), and an explanatory analogy.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "ANALOGY": 1
  },
  "nested_passages": 34,
  "unique_subtopics": 5,
  "contextualization": {
    "localized": 2,
    "none": 2,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p2", "quote": "बोर्ड परीक्षा (Class 12th Chemistry) के नजरिए से यह टॉपिक बहुत महत्वपूर्ण है।"}]}

Annotation rationale: Introduces and defines vapour phase refining by breaking down the term and explaining the basic mechanism of converting impure metal into vapour and back to solid pure metal.

Accuracy: **accurate**. The definition accurately captures the core concept of converting an impure metal to a volatile compound and regenerating pure metal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम धातु निष्कर्षण (Metallurgy) का एक बहुत ही महत्वपूर्ण और आसान टॉपिक समझेंगे, जिसका नाम है — **वाष्प प्रावस्था शोधन (Vapour Phase Refining)**। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | बोर्ड परीक्षा (Class 12th Chemistry) के नजरिए से यह टॉपिक बहुत महत्वपूर्ण है। चलो, इसे बिल्कुल आसान भाषा में समझते हैं। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### **वाष्प प्रावस्था शोधन क्या है? (What is it?)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | नाम से ही समझिए: **&quot;वाष्प&quot; (Vapour) + &quot;शोधन&quot; (Refining/Purification)**।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | यानी यह अशुद्ध धातु (Impure Metal) को शुद्ध करने का एक ऐसा तरीका है, जिसमें हम धातु को पहले **गैस (वाष्प)** में बदलते हैं और फिर उसे वापस **ठोस शुद्ध धातु** में बदल लेते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Principle and requirements of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the two-step general principle (formation of a volatile compound and subsequent thermal decomposition) and the two requisite conditions for this technique.

Accuracy: **accurate**. Both conditions and the two-step principle are accurately stated in line with standard inorganic chemistry principles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p8 | ### **इसका मूल सिद्धांत (Basic Principle):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | इसे आप 2 आसान स्टेप्स का जादू समझ सकते हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | 1. **स्टेप 1 (गैस बनाना):** अशुद्ध धातु को किसी ऐसे पदार्थ (Reagent) के साथ गर्म किया जाता है, जिससे वह धातु एक **वाष्पशील यौगिक (Volatile Compound)** यानी गैस जैसी अवस्था में बदल जाए। धातु तो गैस बन जाती है, लेकिन उसकी **अशुद्धियाँ (Impurities) नीचे ही छूट जाती हैं** क्योंकि वे गैस नहीं बनतीं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | 2. **स्टेप 2 (धातु वापस पाना):** अब उस गैस (वाष्पशील यौगिक) को अलग ले जाकर और अधिक तापमान पर गर्म किया जाता है, जिससे वह टूट (Decompose) जाती है और हमें **100% शुद्ध धातु (Pure Metal)** मिल जाती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | ### **इस विधि के लिए 2 ज़रूरी शर्तें:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | 1. धातु किसी अभिकर्मक (Reagent) के साथ मिलकर आसानी से **वाष्पशील (उड़ने वाला) यौगिक** बना ले। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | 2. वह यौगिक आसानी से गर्म करने पर **टूट भी जाए**, ताकि धातु वापस मिल सके। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Mond process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "localized", "evidence": [{"passage_id": "p17", "quote": "बोर्ड परीक्षा में सीधे इनके नाम से प्रश्न आता है:"}]}

Annotation rationale: Presents Mond's process as a concrete real-world industrial illustration of vapour phase refining for nickel.

Accuracy: **accurate**. The reaction equations and temperature ranges (330–350 K for carbonyl formation, 450–470 K for decomposition) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p16 | ### **इसके दो सबसे प्रसिद्ध उदाहरण (Examples):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | बोर्ड परीक्षा में सीधे इनके नाम से प्रश्न आता है: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p18 | #### **1. मोंड प्रक्रम (Mond&#x27;s Process) — निकेल (Ni) के शोधन के लिए** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | * **स्टेप 1:** अशुद्ध निकेल को कार्बन मोनोऑक्साइड ($CO$) के साथ लगभग $330 - 350 \text{ K}$ पर गर्म करते हैं। इससे निकेल टेट्राकार्बोनिल नाम की गैस बनती है। अशुद्धियां पीछे रह जाती हैं। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 |   $$\text{Ni (अशुद्ध)} + 4\text{CO} \xrightarrow{330-350 \text{ K}} \text{Ni(CO)}_4 \text{ (वाष्प)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | * **स्टेप 2:** अब इस गैस को और तेज़ तापमान ($450 - 470 \text{ K}$) पर गर्म करते हैं, जिससे यह टूट जाती है और शुद्ध निकेल प्राप्त होता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 |   $$\text{Ni(CO)}_4 \xrightarrow{450-470 \text{ K}} \text{Ni (शुद्ध)} + 4\text{CO}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u4: Van Arkel method for zirconium and titanium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the Van Arkel method as a concrete real-world industrial illustration of vapour phase refining for zirconium/titanium.

Accuracy: **accurate**. The chemical reactions, temperatures (~870 K and ~2075 K on a tungsten filament), and application to ultra-pure Zr/Ti are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p24 | #### **2. वैन-आरकेल विधि (Van Arkel Method) — ज़िरकोनियम (Zr) और टाइटेनियम (Ti) के लिए** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | इस विधि का उपयोग धातु से ऑक्सीजन और नाइट्रोजन जैसी अशुद्धियों को पूरी तरह हटाने के लिए किया जाता है ताकि **अति-शुद्ध (Ultra-pure)** धातु मिले। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p26 | * **स्टेप 1:** अशुद्ध ज़िरकोनियम या टाइटेनियम को आयोडीन ($I_2$) के साथ निर्वात (vacuum) में गर्म करते हैं, जिससे वाष्पशील आयोडाइड बनता है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 |   $$\text{Zr (अशुद्ध)} + 2\text{I}_2 \xrightarrow{870 \text{ K}} \text{ZrI}_4 \text{ (वाष्प)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | * **स्टेप 2:** इस वाष्प को एक बहुत गर्म **टंगस्टन फिलामेंट** (लगभग $2075 \text{ K}$) के ऊपर से गुज़ारा जाता है। गर्मी के कारण यह टूट जाता है और शुद्ध धातु फिलामेंट पर जमा हो जाती है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 |   $$\text{ZrI}_4 \xrightarrow{2075 \text{ K (टंगस्टन तार)}} \text{Zr (शुद्ध)} + 2\text{I}_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u5: Muddy sponge analogy for vapour phase refining (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p32", "quote": "मान लीजिए आपके पास मिट्टी से सना हुआ एक स्पंज है।"}]}

Annotation rationale: Uses an intuitive cross-domain analogy of a muddy sponge evaporating and recondensing without the mud to clarify the concept.

Accuracy: **accurate**. The analogy appropriately maps onto the principle of selective volatilization leaving impurities behind.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p31 | ### **याद रखने के लिए एक सरल उदाहरण (Real-life Analogy):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | मान लीजिए आपके पास मिट्टी से सना हुआ एक स्पंज है। अगर आपके पास कोई ऐसा जादू हो कि सिर्फ स्पंज भाप बनकर उड़ जाए और हवा में जाकर ठंडा होकर वापस शुद्ध स्पंज बन जाए, तो मिट्टी तो ज़मीन पर ही छूट जाएगी ना?  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p33 | बस, यही काम **वाष्प प्रावस्था शोधन** में रसायन विज्ञान (Chemistry) के ज़रिए किया जाता है! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p34 | क्या आपको यह प्रक्रिया और दोनों विधियाँ (Mond &amp; Van Arkel) समझ आ गईं? अगर कोई डाउट हो तो बेझिझक पूछिए! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

