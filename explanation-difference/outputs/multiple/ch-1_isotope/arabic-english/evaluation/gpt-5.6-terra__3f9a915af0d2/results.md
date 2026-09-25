# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and accurately explains isotopes in Arabic, covering the definition, an illustrative example with carbon isotopes, physical and chemical properties, a real-world application (radiocarbon dating), and a brief recap.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 20,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 20,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: تعريف النظائر وسبب اختلاف كتلتها الذرية (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what isotopes are (same atomic number / protons, differing numbers of neutrons) and why they belong to the same element while differing in mass.

Accuracy: **accurate**. The definition is standard and scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **النظائر** هي ذرات للعنصر نفسه لها: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | - **نفس عدد البروتونات** في النواة   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p3 | - لكن **عددًا مختلفًا من النيوترونات** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | وبما أن عدد البروتونات هو الذي يحدد نوع العنصر، فإن النظائر تبقى للعنصر نفسه، لكن تختلف في **الكتلة الذرية**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: نظائر الكربون ومقارنة أعداد البروتونات والنيوترونات والكتلة (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates isotopes using naturally occurring carbon isotopes (Carbon-12, Carbon-13, and Carbon-14) with a comparative table.

Accuracy: **accurate**. The numbers of protons, neutrons, and mass numbers for carbon isotopes 12, 13, and 14 are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### مثال: نظائر الكربون | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | كل ذرات الكربون تحتوي على **6 بروتونات**، لذلك كلها كربون. لكن قد يختلف عدد النيوترونات: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | &#124; النظير &#124; عدد البروتونات &#124; عدد النيوترونات &#124; العدد الكتلي &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p8 | &#124;---&#124;---:&#124;---:&#124;---:&#124; | EXAMPLE | {} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p9 | &#124; كربون-12 &#124; 6 &#124; 6 &#124; 12 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p10 | &#124; كربون-13 &#124; 6 &#124; 7 &#124; 13 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p11 | &#124; كربون-14 &#124; 6 &#124; 8 &#124; 14 &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p12 | العدد الكتلي = عدد البروتونات + عدد النيوترونات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u3: مقارنة الخواص الكيميائية والفيزيائية والاستقرار الإشعاعي للنظائر (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share very similar chemical properties (same electron structure) but differ slightly in physical properties (different masses), and mentions radioactive vs stable isotopes.

Accuracy: **accurate**. The explanation of chemical similarity, physical differences, and radioactive stability is factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ### هل تختلف خواص النظائر؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - **كيميائيًا:** تكون متشابهة جدًا؛ لأنها تملك العدد نفسه من البروتونات والإلكترونات غالبًا. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p15 | - **فيزيائيًا:** قد تختلف قليلًا بسبب اختلاف كتلتها. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p16 | - بعض النظائر تكون **مستقرة**، وبعضها **مشعّة**، أي تطلق إشعاعًا مع الزمن. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u4: استخدام الكربون-14 في التأريخ بالكربون المشع (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a real-world example of isotope usage: dating ancient artifacts using carbon-14.

Accuracy: **accurate**. Radiocarbon dating is an accurate real-world application of Carbon-14.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### مثال على الاستخدام | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | يُستخدم **الكربون-14** لمعرفة عمر الآثار القديمة وبقايا الكائنات الحية، وتسمى هذه الطريقة **التأريخ بالكربون المشع**. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: ملخص ختامي لمفهوم النظائر (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concludes with a one-sentence recap summarizing the core definition of isotopes.

Accuracy: **accurate**. The summary accurately captures the fundamental definition of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | **باختصار:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | النظائر = ذرات العنصر نفسه، لها العدد نفسه من البروتونات، وتختلف في عدد النيوترونات. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

