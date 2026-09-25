# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains the concept of covalent radius in Hindi, including its definition, formula, an everyday analogy, an example calculation with Cl2, periodic trends, and a summary.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 33,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 33,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 5,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Why atomic radius cannot be measured directly for an isolated atom (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why an isolated atom's radius cannot be measured directly due to the lack of a sharp boundary in the electron cloud, necessitating measurement in a bonded state.

Accuracy: **accurate**. The explanation accurately identifies the wave nature / probability cloud of electrons preventing sharp atomic boundaries.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | नमस्ते! आज हम केमिस्ट्री का एक बहुत ही महत्वपूर्ण और आसान टॉपिक समझेंगे – **Covalent Radius (सहसंयोजक त्रिज्या)**। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | इसे समझने से पहले एक छोटा सा सवाल: *क्या हम किसी एक अकेले एटम (परमाणु) की त्रिज्या को स्केल रखकर नाप सकते हैं?*  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | जवाब है—**नहीं!** क्योंकि एटम बहुत छोटा होता है और उसके चारों तरफ जो इलेक्ट्रॉन का बादल (electron cloud) होता है, उसकी कोई पक्की सीमा (sharp boundary) नहीं होती। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | इसलिए, हम एटम का साइज तब नापते हैं जब वह किसी दूसरे एटम के साथ जुड़ा (bonded) होता है। आइए इसे आसान भाषा में समझते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Definition and mathematical formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half of the internuclear distance between two identical bonded non-metal atoms and provides the corresponding formula.

Accuracy: **accurate**. The standard homonuclear single-bond definition and formula r_cov = d/2 are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### **Covalent Radius की परिभाषा (Definition):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | जब दो एक जैसे (identical) नॉन-मेटल एटम्स आपस में **Single Covalent Bond (एकल सहसंयोजक बंध)** द्वारा जुड़े होते हैं, तो **दोनों एटम्स के नाभिकों (nuclei) के बीच की दूरी के आधे (half) भाग को Covalent Radius कहते हैं।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p8 | &gt; **आसान फॉर्मूला:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | &gt; **$r_{\text{cov}} = \frac{d}{2}$** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p10 | &gt; *(यहाँ $d$ = दोनों नाभिकों के बीच की दूरी, जिसे हम Bond Length भी कहते हैं)* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Overlapping clay balls analogy for covalent radius (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p13", "quote": "गीली मिट्टी की गेंदें (balls)"}]}

Annotation rationale: Uses the everyday analogy of slightly compressed clay balls overlapping to explain measuring half of the center-to-center distance.

Accuracy: **accurate**. The analogy correctly mirrors the concept of overlapping atomic orbitals in a covalent bond and taking half of the internuclear distance.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### **एक आसान उदाहरण (Real-life Analogy):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | मान लीजिए आपके पास दो एक जैसी गीली मिट्टी की गेंदें (balls) हैं। जब आप उन्हें आपस में थोड़ा दबाकर जोड़ते हैं, तो वे एक-दूसरे में थोड़ी धंस जाती हैं (ओवरलैप हो जाती हैं)।  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p14 | अब, दोनों गेंदों के सेंटर (केंद्र) के बीच की दूरी नापिए। उस दूरी को जब आप **2 से भाग (divide)** करेंगे, तो आपको एक गेंद की &#x27;रेडियस&#x27; मिल जाएगी। यही काम हम Covalent Radius में करते हैं! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Chlorine molecule covalent radius calculation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked example calculating the covalent radius of chlorine using its measured internuclear bond length of 198 pm.

Accuracy: **accurate**. The Cl-Cl bond length of 198 pm and the calculated covalent radius of 99 pm are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### **केमिस्ट्री का उदाहरण: क्लोरीन अणु ($Cl_2$)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | 1. क्लोरीन गैस में दो क्लोरीन के एटम आपस में सिंगल कोवेलेंट बॉन्ड से जुड़े होते हैं। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p18 | 2. लैब में एक्स-रे (X-ray) तकनीकों से नापने पर पता चला कि दोनों क्लोरीन के नाभिकों (nuclei) के बीच की दूरी **$198 \text{ pm}$** (पिकोमीटर) है। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | 3. तो क्लोरीन की Covalent Radius क्या होगी? | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 |    $$\text{Radius} = \frac{198}{2} = 99 \text{ pm}$$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Periodic trends of covalent radius across periods and groups (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how covalent radius changes across a period (decreases due to increasing effective nuclear charge) and down a group (increases due to addition of shells).

Accuracy: **accurate**. The periodic trends and their underlying physical explanations (nuclear charge vs. addition of new electron shells) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | ### **Periodic Table (आवर्त सारणी) में यह कैसे बदलती है? (Exam Point of View):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | बोर्ड एग्जाम में यह बहुत पूछा जाता है, इसलिए इसे ध्यान से याद रखें: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |
| p24 | 1. **पीरियड में (Left to Right जाने पर):** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 |    * Covalent Radius **घटती है (Decreases)**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p26 |    * **कारण:** जैसे-जैसे हम बाएं से दाएं जाते हैं, नाभिक में प्रोटॉन की संख्या (Nuclear Charge) बढ़ती है, जिससे वह इलेक्ट्रॉनों को अपनी ओर ज्यादा ताकत से खींचता है और एटम का साइज छोटा हो जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 | 2. **ग्रुप में (Top to Bottom नीचे जाने पर):** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 |    * Covalent Radius **बढ़ती है (Increases)**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 |    * **कारण:** जैसे-जैसे हम नीचे जाते हैं, नए-नए शेल्स (Shells/कक्षाएं) जुड़ते जाते हैं, जिससे नाभिक और सबसे बाहरी इलेक्ट्रॉन के बीच की दूरी बढ़ जाती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: One-line summary of covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise one-line summary of the core concept followed by a conversational wrap-up.

Accuracy: **accurate**. The summary correctly distills the definition of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | **एक लाइन में सारांश (Summary):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p32 | &quot;कोवेलेंट बॉन्ड से जुड़े दो समान एटम्स के न्यूक्लियस की बीच की दूरी का आधा = **Covalent Radius**।&quot; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p33 | क्या आपको यह कॉन्सेप्ट समझ आया, या आप इससे जुड़ा कोई सवाल पूछना चाहते हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

