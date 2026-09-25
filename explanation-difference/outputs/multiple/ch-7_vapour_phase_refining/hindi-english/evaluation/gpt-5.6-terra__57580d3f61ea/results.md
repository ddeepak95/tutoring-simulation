# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly addresses vapour phase refining in Hindi, explaining the core principle, general reaction schema, and standard industrial examples (Mond process and Van Arkel process).

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 52,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 52,
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

## u1: Principles and mechanism of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the definition, underlying principles, and general two-step reaction pathway of vapour phase refining.

Accuracy: **accurate**. The definition, essential criteria, and generalised reaction scheme for vapour phase refining are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **वाष्प अवस्था परिशोधन (Vapour Phase Refining)** धातुओं को शुद्ध करने की एक विधि है। इसमें अशुद्ध धातु को पहले किसी गैस/रसायन के साथ अभिक्रिया कराकर उसका **वाष्पशील यौगिक** बनाया जाता है। फिर उस यौगिक को गर्म करके तोड़ दिया जाता है, जिससे **शुद्ध धातु** प्राप्त होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## सिद्धान्त | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | यह विधि दो बातों पर आधारित है: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | 1. अशुद्ध धातु किसी उपयुक्त पदार्थ के साथ मिलकर **वाष्पशील यौगिक** बनाए। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | 2. वह वाष्पशील यौगिक गरम करने पर आसानी से **विघटित** होकर शुद्ध धातु दे दे। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | अशुद्धियाँ सामान्यतः वाष्पशील यौगिक नहीं बनातीं, इसलिए वे पीछे रह जाती हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | ### सामान्य प्रक्रिया | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p9 | \text{अशुद्ध धातु} + \text{अभिकर्मक} \rightarrow \text{वाष्पशील यौगिक} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p11 | फिर, | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p13 | \text{वाष्पशील यौगिक} \xrightarrow{\text{गरम करने पर}} \text{शुद्ध धातु} + \text{अन्य पदार्थ} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p14 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p15 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Mond process for refining nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of vapour phase refining via the Mond process for nickel, specifying temperature ranges, equations, and toxicity safety notes.

Accuracy: **accurate**. The reaction equations, temperature intervals (330–350 K for formation and 450–470 K for decomposition), and safety warning for nickel tetracarbonyl are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | ## 1. मोंड प्रक्रिया (Mond Process): निकेल का शोधन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | इस विधि से **निकेल (Ni)** को शुद्ध किया जाता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | ### चरण 1: निकेल कार्बोनिल बनाना | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | अशुद्ध निकेल को लगभग **330–350 K** तापमान पर कार्बन मोनोऑक्साइड गैस (CO) के साथ मिलाया जाता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | \text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | यह **निकेल टेट्राकार्बोनिल** \(\text{Ni(CO)}_4\) एक वाष्पशील यौगिक है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p24 | ### चरण 2: गर्म करके विघटन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | निकेल कार्बोनिल के वाष्प को लगभग **450–470 K** तक गर्म किया जाता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | \text{Ni(CO)}_4 \rightarrow \text{Ni} + 4\text{CO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | इससे शुद्ध निकेल प्राप्त हो जाता है और CO गैस को फिर से उपयोग किया जा सकता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | **ध्यान दें:** निकेल कार्बोनिल बहुत विषैला (toxic) होता है, इसलिए यह प्रक्रिया सावधानी से उद्योगों में की जाती है। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Van Arkel process for refining titanium and zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel process applied to titanium and zirconium, detailing the formation and decomposition of titanium tetraiodide on a tungsten filament.

Accuracy: **accurate**. The reaction mechanism, chemical equations, and role of the hot tungsten filament in the Van Arkel method are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ## 2. वैन आर्केल प्रक्रिया (Van Arkel Process): टाइटेनियम और जिरकोनियम का शोधन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | इस विधि से **टाइटेनियम (Ti)** और **जिरकोनियम (Zr)** जैसी धातुओं को अत्यधिक शुद्ध किया जाता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | ### उदाहरण: टाइटेनियम का शोधन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | अशुद्ध टाइटेनियम को आयोडीन के साथ गर्म किया जाता है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | \text{Ti} + 2\text{I}_2 \rightarrow \text{TiI}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p39 | यह टाइटेनियम टेट्राआयोडाइड \(\text{TiI}_4\) वाष्पशील होता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | फिर इसके वाष्प को बहुत गर्म टंग्स्टन तार पर प्रवाहित किया जाता है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p41 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | \text{TiI}_4 \rightarrow \text{Ti} + 2\text{I}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | शुद्ध टाइटेनियम टंग्स्टन तार पर जम जाता है और आयोडीन फिर से प्रयोग की जा सकती है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p45 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Summary and one-line definition of vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick bulleted summary and a concise one-line definition of vapour phase refining for revision.

Accuracy: **accurate**. The recap points and closing definition accurately summarize the topic without error.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | ## याद रखने योग्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | - वाष्प अवस्था परिशोधन में धातु का **वाष्पशील यौगिक** बनाया जाता है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p48 | - फिर उस यौगिक को गर्म करके **शुद्ध धातु** प्राप्त की जाती है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p49 | - **मोंड प्रक्रिया** → निकेल के लिए   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p50 | - **वैन आर्केल प्रक्रिया** → टाइटेनियम और जिरकोनियम के लिए   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p51 | ### एक पंक्ति में परिभाषा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p52 | **वह परिशोधन विधि जिसमें धातु को वाष्पशील यौगिक में बदलकर, फिर उसे विघटित करके शुद्ध धातु प्राप्त की जाती है, वाष्प अवस्था परिशोधन कहलाती है।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

