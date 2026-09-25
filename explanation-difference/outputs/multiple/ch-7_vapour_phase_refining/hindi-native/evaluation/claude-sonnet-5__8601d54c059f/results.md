# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains vapour phase refining in Hindi, including its underlying chemical principles, illustrative analogy, key industrial examples (Mond process and van Arkel method), advantages, and summary requirements.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
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

## u1: Principle of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the topic and explains the fundamental chemical principle where impure metal is converted into a volatile compound that separates from impurities and subsequently decomposes to yield pure metal.

Accuracy: **accurate**. The explanation correctly defines the core principles of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # वाष्प प्रावस्था परिष्करण (Vapor Phase Refining) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## परिचय | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | नमस्ते! आज हम धातुओं को शुद्ध करने की एक रोचक विधि के बारे में सीखेंगे, जिसे **वाष्प प्रावस्था परिष्करण** कहते हैं। यह विधि रसायन विज्ञान के &quot;तत्वों के निष्कर्षण&quot; अध्याय का महत्वपूर्ण भाग है। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | ## मूल सिद्धांत | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | इस विधि में अशुद्ध धातु को एक ऐसे **वाष्पशील यौगिक (volatile compound)** में बदला जाता है, जो: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | 1. आसानी से **वाष्प (गैस)** में बदल जाए | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | 2. उसमें कोई अशुद्धि न हो | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | 3. बाद में आसानी से विघटित होकर **शुद्ध धातु** दे सके | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u2: Analogy of separating sugar from soil via dissolution (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "सोचिए आपके पास मिट्टी मिली हुई चीनी है। अगर आप चीनी को पानी में घोलकर फिल्टर करें, तो मिट्टी अलग हो जाएगी और शुद्ध चीनी का घोल मिलेगा।"}]}

Annotation rationale: Draws an everyday analogy between dissolving sugar to separate it from soil and transforming metal into a gaseous compound to leave impurities behind.

Accuracy: **accurate**. The comparison serves as an effective intuitive analogy for selective phase transformation.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### सरल भाषा में समझें: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | सोचिए आपके पास मिट्टी मिली हुई चीनी है। अगर आप चीनी को पानी में घोलकर फिल्टर करें, तो मिट्टी अलग हो जाएगी और शुद्ध चीनी का घोल मिलेगा। ठीक इसी तरह, यहाँ धातु को &quot;गैस&quot; के रूप में बदलकर अशुद्धियों से अलग किया जाता है। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Mond process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the industrial Mond process for nickel purification step-by-step with balanced chemical reactions and specific temperature ranges.

Accuracy: **accurate**. The reactions, temperatures (330 K for tetracarbonylnickel formation, 450-470 K for decomposition), and stoichiometry accurately describe the Mond process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ## दो प्रमुख उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | ### 1️⃣ मंड प्रक्रम (Mond Process) - निकल की शुद्धि के लिए | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | **चरण 1:** अशुद्ध निकल को कार्बन मोनोऑक्साइड (CO) गैस के साथ गर्म करते हैं (लगभग 330K पर) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | $$Ni + 4CO \xrightarrow{330K} Ni(CO)_4 \text{ (वाष्पशील यौगिक)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | **चरण 2:** यह गैसीय यौगिक अधिक तापमान (450-470K) पर पुनः विघटित होता है | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | $$Ni(CO)_4 \xrightarrow{450-470K} Ni \text{ (शुद्ध)} + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 | **परिणाम:** शुद्ध निकल धातु प्राप्त होती है और CO गैस दोबारा उपयोग की जा सकती है! | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: van Arkel method for titanium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the van Arkel method for titanium and zirconium refining using iodine and thermal decomposition over a hot tungsten filament.

Accuracy: **accurate**. The reactions and conditions (iodine conversion to volatile TiI4 and high-temperature tungsten filament deposition at ~1400°C) are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### 2️⃣ वान आर्केल विधि (van Arkel Method) - टाइटेनियम/ज़िरकोनियम के लिए | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | **चरण 1:** अशुद्ध धातु को आयोडीन के साथ गर्म करते हैं | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | $$Ti + 2I_2 \xrightarrow{गर्म} TiI_4 \text{ (वाष्पशील)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | **चरण 2:** इस गैस को बहुत गर्म टंगस्टन तार (लगभग 1400°C) के पास ले जाते हैं | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | $$TiI_4 \xrightarrow{1400°C} Ti \text{ (शुद्ध, तार पर जमा)} + 2I_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u5: Advantages of vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the primary advantages of vapour phase refining including ultra-high purity, separation from non-volatile impurities, and recyclability of reagent gases.

Accuracy: **accurate**. The stated benefits of vapour phase refining are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ## इस विधि के फायदे | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | ✅ बहुत **उच्च शुद्धता** (99.9% या इससे अधिक) की धातु मिलती है | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | ✅ अशुद्धियाँ वाष्पशील यौगिक नहीं बनातीं, इसलिए पीछे रह जाती हैं | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 | ✅ प्रयुक्त गैस (CO या आयोडीन) को **पुनः उपयोग** किया जा सकता है | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Summary trick and prerequisites for vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick memory aid summarizing the two crucial prerequisite conditions for vapour phase refining, along with concluding remarks.

Accuracy: **accurate**. The two fundamental requirements for vapour phase refining (easy formation of volatile compound and facile thermal decomposition) are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | ## याद रखने की तरकीब 🎯 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | **&quot;धातु → वाष्प यौगिक → वापस शुद्ध धातु&quot;** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p30 | यह प्रक्रिया **दो शर्तों** पर आधारित है: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p31 | - यौगिक कम तापमान पर आसानी से बने | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p32 | - वही यौगिक अधिक तापमान पर आसानी से टूटकर शुद्ध धातु दे | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p33 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p34 | क्या आप चाहेंगे कि मैं इससे संबंधित कुछ **प्रश्न** या **आरेख** के बारे में भी समझाऊं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

