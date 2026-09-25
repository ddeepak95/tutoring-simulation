# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a clear and accurate explanation of isotopes for a high school chemistry context, including definition, an illustrative example with carbon, properties, and practical applications.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 10,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1
  },
  "nested_passages": 10,
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

## u1: Definition and nuclear composition of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what isotopes are by defining their atomic number (protons) and mass number (protons plus neutrons), showing why they belong to the same element while having different masses.

Accuracy: **accurate**. The definition correctly specifies identical atomic numbers and different neutron counts/mass numbers.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | مرحباً! سأشرح لك مفهوم النظائر (Isotopes) في الكيمياء باللغة العربية. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | النظائر هي ذرات من نفس العنصر الكيميائي، ولكنها تختلف في عدد النيوترونات في نواتها. هذا يعني أن لها نفس العدد الذري (عدد البروتونات في النواة) ولكنها تختلف في العدد الكتلي (مجموع عدد البروتونات والنيوترونات في النواة). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Carbon isotopes comparison (carbon-12, 13, and 14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through the proton and neutron counts of carbon-12, carbon-13, and carbon-14 step-by-step, showing how the mass numbers are derived.

Accuracy: **accurate**. The numbers of protons, neutrons, and resulting mass numbers for C-12, C-13, and C-14 are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | لنفهم هذا بشكل أفضل، دعونا ننظر إلى مثال. الكربون هو عنصر كيميائي له العدد الذري 6، وهذا يعني أن كل ذرة كربون تحتوي على 6 بروتونات في نواتها. هناك ثلاثة نظائر رئيسية للكربون: كربون-12، كربون-13، وكربون-14. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p4 | - كربون-12 يحتوي على 6 بروتونات و6 نيوترونات، مما يجعل العدد الكتلي له 12. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p5 | - كربون-13 يحتوي على 6 بروتونات و7 نيوترونات، مما يجعل العدد الكتلي له 13. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | - كربون-14 يحتوي على 6 بروتونات و8 نيوترونات، مما يجعل العدد الكتلي له 14. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | جميع هذه النظائر هي كربون لأنها تحتوي على 6 بروتونات، ولكنها تختلف في عدد النيوترونات، وبالتالي في العدد الكتلي. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Chemical vs. physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes share nearly identical chemical properties (governed by electron configuration) while differing in physical properties and reaction rates (kinetic isotope effect).

Accuracy: **accurate**. The scientific rationale connecting chemical behavior to electrons and physical differences/kinetic rates to mass differences is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | النظائر لها نفس الخواص الكيميائية تقريبًا لأن الخواص الكيميائية تعتمد بشكل رئيسي على عدد الإلكترونات، والذي يحدده العدد الذري. ومع ذلك، تختلف النظائر في بعض الخواص الفيزيائية مثل الكتلة الذرية، وسرعة التفاعل في بعض التفاعلات الكيميائية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Practical applications of isotopes (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists major practical applications of isotopes including radiocarbon dating and nuclear medicine.

Accuracy: **accurate**. The cited applications (carbon dating and nuclear medicine) are standard, correct uses of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | تستخدم النظائر في العديد من التطبيقات، مثل التأريخ بالكربون المشع (كربون-14) لتحديد عمر المواد العضوية القديمة، وفي الطب النووي لتشخيص وعلاج الأمراض. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | أتمنى أن يكون الشرح واضحًا ومفيدًا! هل لديك أسئلة أخرى حول النظائر؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

