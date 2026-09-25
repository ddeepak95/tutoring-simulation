# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains vapour phase refining, including its core principle, two essential conditions, general procedural steps, two primary industrial examples (Mond process and Van Arkel process), an illustrative analogy, and a summary recap.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 62,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 62,
  "unique_subtopics": 5,
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

## u1: Principle and requirements of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines vapour phase refining and explains the fundamental chemical principle alongside the two essential criteria required for the process.

Accuracy: **accurate**. The basic principle and the two standard conditions (forming a volatile compound and thermal decomposition of the compound to yield pure metal) are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **वाष्प प्रावस्था परिष्करण (Vapour Phase Refining)** धातुओं को अत्यधिक शुद्ध करने की एक विधि है। इसका उपयोग उन धातुओं के लिए किया जाता है जो किसी उपयुक्त अभिकर्मक के साथ मिलकर **वाष्पशील (volatile) यौगिक** बना सकती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## मूल सिद्धांत | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | इस विधि में अशुद्ध धातु को पहले एक ऐसे यौगिक में बदला जाता है जो आसानी से गैस/वाष्प बन जाए। फिर उस वाष्पशील यौगिक को अलग स्थान पर गर्म करके तोड़ा जाता है, जिससे **शुद्ध धातु** प्राप्त हो जाती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | इसे इस प्रकार समझ सकते हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p5 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p6 | \text{अशुद्ध धातु} \rightarrow \text{वाष्पशील यौगिक} \rightarrow \text{शुद्ध धातु} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p7 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p8 | ### इस विधि के लिए दो आवश्यक शर्तें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | 1. धातु का बना यौगिक **वाष्पशील** होना चाहिए। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | 2. उस यौगिक को आसानी से गर्म करके पुनः धातु में बदला जा सके। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Sequential steps of vapour phase refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the reusable three-step action sequence for conducting vapour phase refining.

Accuracy: **accurate**. The three procedural stages (reaction with reagent, separation of volatile compound from non-volatile impurities, and thermal decomposition) accurately describe the standard process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## प्रक्रिया के चरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | 1. **अशुद्ध धातु को अभिकर्मक से मिलाते हैं**   | PROCEDURE | {} | [&#x27;list&#x27;] |
| p14 |    इससे धातु का वाष्पशील यौगिक बनता है। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | 2. **वाष्पशील यौगिक को अलग कर लेते हैं**   | PROCEDURE | {} | [&#x27;list&#x27;] |
| p16 |    अशुद्धियाँ सामान्यतः वाष्प नहीं बनतीं, इसलिए पीछे रह जाती हैं। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | 3. **वाष्प को गर्म सतह पर अपघटित करते हैं**   | PROCEDURE | {} | [&#x27;list&#x27;] |
| p18 |    वाष्पशील यौगिक टूट जाता है और शुद्ध धातु जमा हो जाती है। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Mond process for nickel purification (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the Mond process as a concrete real-world industrial application of vapour phase refining for nickel, detailing reaction conditions and chemical equations.

Accuracy: **accurate**. The reaction temperatures (330–350 K for Ni(CO)4 formation and 450–470 K for decomposition) and balanced equations are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | # 1. मोंड प्रक्रिया (Mond Process): निकेल का शोधन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p21 | निकेल को शुद्ध करने के लिए मोंड प्रक्रिया प्रयोग की जाती है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | ### चरण 1: निकेल कार्बोनिल बनाना | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | अशुद्ध निकेल को लगभग **330–350 K** ताप पर कार्बन मोनोऑक्साइड (CO) गैस के साथ अभिक्रिया कराते हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p24 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p25 | \text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p27 | यहाँ निकल टेट्राकार्बोनिल \(\text{Ni(CO)}_4\) बनता है, जो एक **वाष्पशील पदार्थ** है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | ### चरण 2: कार्बोनिल का अपघटन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | निकेल कार्बोनिल के वाष्प को लगभग **450–470 K** तक गर्म किया जाता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p31 | \text{Ni(CO)}_4 \rightarrow \text{Ni} + 4\text{CO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p33 | इससे अत्यंत शुद्ध निकेल प्राप्त होता है और CO गैस फिर से निकल जाती है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | **मुख्य बात:** अशुद्धियाँ निकेल कार्बोनिल नहीं बनातीं, इसलिए वे अलग रह जाती हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Van Arkel process for titanium and zirconium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the Van Arkel method as a concrete application of vapour phase refining for Ti and Zr using iodine and thermal decomposition on a tungsten filament.

Accuracy: **accurate**. The reaction of titanium with iodine to form volatile TiI4 and its decomposition on a hot tungsten filament to produce pure Ti is chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | # 2. वान आर्केल प्रक्रिया (Van Arkel Process): टाइटेनियम और जिरकोनियम का शोधन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | यह प्रक्रिया टाइटेनियम (Ti) और जिरकोनियम (Zr) जैसी धातुओं को बहुत शुद्ध करने के लिए उपयोग की जाती है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | ### उदाहरण: टाइटेनियम | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | अशुद्ध टाइटेनियम को आयोडीन के साथ गर्म करते हैं: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p41 | \text{Ti} + 2\text{I}_2 \rightarrow \text{TiI}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p43 | टाइटेनियम टेट्राआयोडाइड \(\text{TiI}_4\) वाष्पशील होता है। इसके वाष्प को गर्म टंग्स्टन तंतु (tungsten filament) पर प्रवाहित किया जाता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p44 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p45 | \text{TiI}_4 \rightarrow \text{Ti} + 2\text{I}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p47 | इस प्रकार शुद्ध टाइटेनियम गर्म तंतु पर जम जाता है और आयोडीन पुनः प्राप्त हो जाती है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Analogy of separating a volatile substance from sand (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p50", "quote": "मान लीजिए रेत में कुछ ऐसी चीज़ मिली है जो गर्म करने पर भाप बन जाती है, लेकिन रेत नहीं बनती।"}]}

Annotation rationale: Uses a cross-domain comparison with a mixture containing sand to intuitively explain how selective vaporization separates a target substance from non-volatile impurities.

Accuracy: **accurate**. The analogy accurately conveys the concept of selective vaporization followed by condensation/decomposition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | ## सरल उदाहरण से समझिए | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | मान लीजिए रेत में कुछ ऐसी चीज़ मिली है जो गर्म करने पर भाप बन जाती है, लेकिन रेत नहीं बनती।   | ANALOGY | {} | [&#x27;prose&#x27;] |
| p51 | यदि हम उस मिश्रण को गर्म करें, तो केवल आवश्यक पदार्थ भाप बनकर अलग हो जाएगा। बाद में उस भाप को ठंडा या विघटित करके शुद्ध पदार्थ पा सकते हैं। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p52 | वाष्प प्रावस्था परिष्करण भी इसी विचार पर काम करता है, लेकिन इसमें रासायनिक अभिक्रियाओं का उपयोग किया जाता है। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p53 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Summary table of vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise tabular review summarizing principle, objective, examples, and advantages of vapour phase refining.

Accuracy: **accurate**. The recap table summarizes the core facts accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p54 | ## संक्षेप में | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | &#124; बिंदु &#124; वाष्प प्रावस्था परिष्करण &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p56 | &#124;---&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p57 | &#124; सिद्धांत &#124; धातु का वाष्पशील यौगिक बनाकर उसे पुनः विघटित करना &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p58 | &#124; उद्देश्य &#124; अत्यंत शुद्ध धातु प्राप्त करना &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p59 | &#124; उदाहरण &#124; निकेल का मोंड प्रक्रम, टाइटेनियम/जिरकोनियम का वान आर्केल प्रक्रम &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p60 | &#124; लाभ &#124; बहुत उच्च शुद्धता वाली धातु मिलती है &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |

## u7: Mnemonic memory trick for vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a simple mnemonic slogan to help students remember the core stages of the method.

Accuracy: **accurate**. The mnemonic accurately captures the sequence: forming the volatile compound, decomposing it, and obtaining the pure metal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p61 | **याद रखने की ट्रिक:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p62 | **“वाष्पशील यौगिक बनाओ, उसे तोड़ो, शुद्ध धातु पाओ।”** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

