# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses vapour phase refining in high school chemistry, explaining its general principle, the Mond process for refining nickel, and the Van Arkel process for refining titanium/zirconium.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 22,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 22,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 4
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Principle and requirements of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the fundamental underlying principle of vapour phase refining: converting a metal into a volatile compound while leaving behind impurities, and subsequently decomposing it to recover pure metal.

Accuracy: **accurate**. Correctly describes the basic requirements and mechanism of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **वाष्प प्रावस्था परिष्करण (Vapor Phase Refining)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | नमस्ते! आज मैं आपको बहुत सरल भाषा में समझाता हूँ कि वाष्प प्रावस्था परिष्करण क्या है और यह कैसे काम करता है। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### यह विधि क्यों इस्तेमाल की जाती है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | कुछ धातुएँ ऐसी होती हैं जो आसानी से **वाष्पशील (volatile)** यौगिक बना लेती हैं। इस विधि में धातु को ऐसे यौगिक में बदला जाता है जो गैस बनकर उड़ जाता है। अशुद्धियाँ इस यौगिक में नहीं बनतीं, इसलिए वे पीछे रह जाती हैं। बाद में इस गैस को गर्म करके शुद्ध धातु अलग कर ली जाती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Mond process for nickel purification (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a detailed worked industrial example of vapour phase refining using the Mond process for nickel, specifying operating temperatures, intermediate formation, and thermal decomposition.

Accuracy: **accurate**. The reaction conditions, intermediate nickel tetracarbonyl Ni(CO)4, and decomposition step to pure Ni are factually accurate and match standard high school chemistry curricula.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### सबसे आसान उदाहरण: निकेल का शुद्धिकरण (मॉन्ड प्रक्रम) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | **चरण 1:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | अशुद्ध निकेल को कार्बन मोनोऑक्साइड (CO) गैस के साथ **50–60°C** पर गर्म किया जाता है।   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | निकेल CO के साथ मिलकर **निकेल टेट्राकार्बोनिल** [Ni(CO)₄] नामक यौगिक बनाता है।   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | यह यौगिक बहुत आसानी से वाष्प (गैस) बन जाता है और उड़ जाता है।   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p10 | अशुद्धियाँ (जैसे ताँबा, लोहा आदि) इस यौगिक में नहीं बनतीं, इसलिए वे पीछे रह जाती हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 | **चरण 2:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | इस Ni(CO)₄ की वाष्प को **150–180°C** तक गर्म किया जाता है।   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | यह यौगिक टूट जाता है:   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | **Ni(CO)₄ → Ni (शुद्ध) + 4CO**   | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | शुद्ध निकेल धातु एक ठोस के रूप में जमा हो जाती है, जबकि CO गैस फिर से निकल जाती है जिसे दोबारा इस्तेमाल किया जा सकता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Van Arkel method for titanium and zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a brief illustrative example of the Van Arkel process applied to titanium and zirconium.

Accuracy: **accurate**. Accurately summarizes the Van Arkel method involving iodide formation (TiI4) and subsequent thermal decomposition to obtain ultra-pure titanium/zirconium.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ### एक और उदाहरण (संक्षेप में) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | टाइटेनियम और जिरकोनियम को शुद्ध करने के लिए **वैन आर्केल प्रक्रम** इस्तेमाल होता है। इसमें धातु को आयोडीन के साथ गर्म करके **TiI₄** (टाइटेनियम टेट्राआयोडाइड) बनाया जाता है, जो वाष्पशील होता है। फिर इसे बहुत अधिक तापमान पर गर्म करके शुद्ध टाइटेनियम अलग कर लिया जाता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Summary of key takeaways (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps the primary characteristics, limitations, and advantages of vapour phase refining in bullet points for easy student revision.

Accuracy: **accurate**. All summary points regarding high purity, recyclability of gases, and suitability for volatile compound-forming metals are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### मुख्य बातें याद रखने योग्य | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | - यह विधि केवल उन धातुओं के लिए उपयुक्त है जो वाष्पशील यौगिक बनाती हैं। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p20 | - इससे बहुत उच्च शुद्धता (99.9% से भी ज्यादा) वाली धातु मिलती है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p21 | - कार्बन मोनोऑक्साइड जैसी गैस को पुनः चक्रित (recycle) किया जा सकता है, इसलिए यह काफी किफायती भी है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p22 | अगर आपको कोई हिस्सा और विस्तार से समझना हो, या कोई डायग्राम/उदाहरण और चाहिए, तो बताओ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

