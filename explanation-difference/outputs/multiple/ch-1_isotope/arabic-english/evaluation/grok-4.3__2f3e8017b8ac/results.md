# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and accurately explains the concept of isotopes in Arabic, detailing their atomic structure, providing concrete examples of carbon isotopes, and summarizing their properties.

## Counts

```json
{
  "total_content_units": 3,
  "substantive_content_units": 3,
  "total_passages": 15,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 1
  },
  "nested_passages": 15,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 3
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and atomic composition of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the definition of isotopes and explains how the subatomic composition (protons, neutrons, atomic number, and mass) relates to what makes an atom an isotope.

Accuracy: **accurate**. The definition and atomic details correctly explain that isotopes of an element share the same number of protons (atomic number) but differ in neutron count and atomic mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | النظائر (Isotopes) هي ذرات لنفس العنصر الكيميائي، لكنها تختلف في عدد النيوترونات داخل النواة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### شرح بسيط: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | تتكون الذرة من نواة (فيها بروتونات + نيوترونات) وإلكترونات تدور حولها.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | - **عدد البروتونات** يُسمى **العدد الذري**، وهو ثابت لكل عنصر ويحدد نوعه.   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - أما **النظائر** فتكون لها نفس عدد البروتونات (يعني نفس العنصر)، لكن **عدد النيوترونات** مختلف. لذلك تختلف كتلتها. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u2: Carbon isotopes comparison (Carbon-12 and Carbon-14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a real-world illustrative example comparing carbon-12 and carbon-14, their proton and neutron counts, and stability.

Accuracy: **accurate**. Carbon-12 (6 protons, 6 neutrons; stable) and Carbon-14 (6 protons, 8 neutrons; radioactive and used in radiocarbon dating) are accurately described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### مثال واضح: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | عنصر **الكربون** له نظائر كثيرة، منها: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | - **كربون-12**: 6 بروتونات + 6 نيوترونات (الأكثر شيوعاً واستقراراً). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - **كربون-14**: 6 بروتونات + 8 نيوترونات (مشع ويُستخدم في تحديد عمر الآثار والعظام القديمة). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | كلا النوعين ينتميان لعنصر الكربون (لأن عدد البروتونات = 6)، لكنهما يختلفان في الكتلة والاستقرار. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the similarities in chemical properties due to identical electron configurations and differences in physical properties such as mass and nuclear stability.

Accuracy: **accurate**. The explanation correctly states that isotopes share nearly identical chemical properties because they have the same number of electrons, but differ in physical properties such as mass and nuclear stability.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### خصائص النظائر: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | - خصائصها الكيميائية متشابهة جداً (لأن عدد الإلكترونات متساوٍ). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p13 | - خصائصها الفيزيائية تختلف (مثل الكتلة والنشاط الإشعاعي). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | - بعض النظائر مستقرة (مثل كربون-12)، وبعضها مشع (مثل كربون-14 أو اليورانيوم-235). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | هل تريد مثالاً آخر أو شرحاً عن استخدامات النظائر في الحياة اليومية؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

