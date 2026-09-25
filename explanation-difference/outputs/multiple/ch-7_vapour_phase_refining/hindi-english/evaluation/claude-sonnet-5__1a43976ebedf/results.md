# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and thoroughly explains vapour phase refining in Hindi as requested, detailing its core principles and standard industrial methods (Mond process and Van Arkel method).

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 36,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "ANALOGY": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 36,
  "unique_subtopics": 4,
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

## u1: Definition, basic principle, and essential requirements of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how vapour phase refining works step-by-step (reaction with reagent to form a volatile compound, separation from impurities, and thermal decomposition to regenerate pure metal) along with necessary criteria.

Accuracy: **accurate**. The explanation correctly defines vapour phase refining, its steps, and the two prerequisite conditions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # वाष्प प्रावस्था परिष्करण (Vapour Phase Refining) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज हम धातुओं को शुद्ध करने की एक बहुत ही रोचक विधि पढ़ेंगे - **वाष्प प्रावस्था परिष्करण**। यह धातुकर्म (Metallurgy) की अंतिम प्रक्रिया है, जिसमें अशुद्ध धातु को अत्यधिक शुद्ध (99.99% तक) बनाया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## मूल सिद्धांत | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | इस विधि में एक सरल विचार काम करता है: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | 1. अशुद्ध धातु को किसी **अभिकर्मक (reagent)** के साथ अभिक्रिया कराई जाती है | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p6 | 2. इससे धातु एक **वाष्पशील यौगिक (volatile compound)** में बदल जाती है (यानी वह आसानी से भाप/गैस बन जाता है) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p7 | 3. यह वाष्पशील यौगिक अशुद्धियों से अलग हो जाता है (क्योंकि अशुद्धियाँ वाष्पित नहीं होतीं) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p8 | 4. फिर इस वाष्प को **गर्म करके अपघटित (decompose)** किया जाता है, जिससे शुद्ध धातु वापस मिल जाती है | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p9 | **आवश्यक शर्त:** धातु आसानी से एक वाष्पशील यौगिक बनाए, और वह यौगिक फिर आसानी से टूटकर शुद्ध धातु दे सके। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Water distillation analogy for vapour phase refining (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "जैसे गंदे पानी को भाप बनाकर, फिर ठंडा करके शुद्ध पानी (distilled water) प्राप्त करते हैं"}]}

Annotation rationale: Draws an explanatory comparison between distilling impure water into steam to obtain pure water and volatilizing metals to purify them.

Accuracy: **accurate**. The analogy accurately illustrates phase change for separation and purification.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | सोचिए इसे ऐसे — जैसे गंदे पानी को भाप बनाकर, फिर ठंडा करके शुद्ध पानी (distilled water) प्राप्त करते हैं, वैसे ही यहाँ धातु को &quot;वाष्प&quot; के रूप में शुद्ध किया जाता है। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Mond process for the refining of nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the two-step chemical process for refining nickel using carbon monoxide with specific reaction temperatures and chemical equations.

Accuracy: **accurate**. The equations and temperatures (330 K for formation of Ni(CO)4 and 450–470 K for its decomposition) are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p12 | ## उदाहरण 1: मंड प्रक्रम (Mond Process) — निकैल का शुद्धिकरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | **चरण 1:** अशुद्ध निकैल को CO गैस के साथ लगभग **330 K** पर गर्म करते हैं: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | $$Ni + 4CO \xrightarrow{330\,K} Ni(CO)_4 \text{ (वाष्पशील)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | निकैल टेट्राकार्बोनिल एक वाष्पशील यौगिक है, जबकि अशुद्धियाँ ठोस रूप में पीछे रह जाती हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | **चरण 2:** इस वाष्प को अलग करके उच्च ताप (**450–470 K**) पर गर्म करते हैं, जिससे यह अपघटित होकर शुद्ध निकैल देता है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | $$Ni(CO)_4 \xrightarrow{450-470\,K} Ni \text{ (शुद्ध)} + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | (ध्यान दें कि CO गैस दोबारा पहले चरण में इस्तेमाल हो सकती है) | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Van Arkel method for the refining of zirconium and titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the two-step chemical process of the Van Arkel method using iodine to purify zirconium on an electrically heated tungsten filament.

Accuracy: **accurate**. The reactions, temperature for decomposition (~1800 K on a tungsten filament), and application to Zr and Ti are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p20 | ## उदाहरण 2: वान आर्केल विधि (Van Arkel Method) — Zr, Ti का शुद्धिकरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | यह विधि उन धातुओं के लिए प्रयुक्त होती है जिनमें ऑक्सीजन, नाइट्रोजन जैसी अशुद्धियाँ होती हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | **चरण 1:** अशुद्ध ज़र्कोनियम को आयोडीन के साथ गर्म करते हैं: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | $$Zr + 2I_2 \xrightarrow{\Delta} ZrI_4 \text{ (वाष्पशील)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | **चरण 2:** इस ZrI₄ वाष्प को एक बहुत गर्म टंगस्टन तार (लगभग **1800 K**) के पास प्रवाहित करते हैं, जहाँ यह अपघटित हो जाता है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | $$ZrI_4 \xrightarrow{1800\,K} Zr \text{ (शुद्ध, तार पर जमा)} + 2I_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | शुद्ध ज़र्कोनियम टंगस्टन तार पर जमा हो जाता है और आयोडीन दोबारा उपयोग के लिए मुक्त हो जाती है। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Summary table of vapour phase refining methods (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a recap table comparing the core principle, Mond process, Van Arkel method, and key advantages.

Accuracy: **accurate**. The recap accurately synthesizes the key concepts and specific reagents/metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p28 | ## संक्षेप में याद रखने योग्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | &#124; बिंदु &#124; विवरण &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p30 | &#124;---&#124;---&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p31 | &#124; सिद्धांत &#124; अशुद्ध धातु → वाष्पशील यौगिक → अपघटन → शुद्ध धातु &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p32 | &#124; मंड प्रक्रम &#124; निकैल के लिए, अभिकर्मक = CO &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p33 | &#124; वान आर्केल विधि &#124; Zr, Ti के लिए, अभिकर्मक = आयोडीन &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p34 | &#124; लाभ &#124; बहुत उच्च शुद्धता (99.99%) प्राप्त होती है &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |

## u6: Mnemonic trick for remembering reagents and metals (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a rhyming mnemonic phrase in Hindi to help students remember which reagent pairs with which metal and method, followed by a conversational closing query.

Accuracy: **accurate**. The mnemonic phrase correctly pairs Mond process with CO and nickel, and Van Arkel method with iodine and zirconium.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | **याद रखने की तरकीब:** &quot;मंड में मिले CO निकैल को, वान आर्केल में मिले आयोडीन ज़र्कोनियम को&quot; 😊 | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p36 | क्या आप चाहेंगे कि मैं इसका कोई डायग्राम बनाकर समझाऊं या कोई प्रश्न पूछें इस टॉपिक पर? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

