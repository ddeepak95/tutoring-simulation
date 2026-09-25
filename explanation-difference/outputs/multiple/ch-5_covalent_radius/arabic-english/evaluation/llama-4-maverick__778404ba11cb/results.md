# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and comprehensively explains covalent radius in Arabic, including its definition, an example calculation, factors affecting it, and its applications.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 13,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1
  },
  "nested_passages": 13,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "contains_error": 1,
    "accurate": 3
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and basic concept of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius and explains how it relates to the internuclear distance (bond length) between bonded atoms, preceded by a polite social introduction.

Accuracy: **contains_error**. Passage p2 inaccurately phrases the concept as 'half the radius between the nuclei' (نصف القطر بين نواتي) rather than half the distance, and both p2 and p3 omit that this definition strictly applies to two identical (homonuclear) bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | بالطبع، يسعدني أن أشرح لك مفهوم نصف القطر التساهمي. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | نصف القطر التساهمي هو نصف القطر بين نواتي ذرتين مرتبطتين برابطة تساهمية. وهو مقياس لحجم الذرة عند ارتباطها بذرة أخرى. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | عندما ترتبط ذرتان برابطة تساهمية، فإن المسافة بين نواتيهما تسمى طول الرابطة. نصف القطر التساهمي هو نصف هذه المسافة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p2, p3): Passage p2 incorrectly describes covalent radius as 'half the radius between the nuclei of two atoms' (نصف القطر بين نواتي ذرتين), and the definition fails to specify that the two bonded atoms must be identical (homonuclear) for the covalent radius of the element to equal half of the bond length.

Correction: The covalent radius is half the internuclear distance between two identical atoms joined by a covalent bond (نصف المسافة بين نواتي ذرتين متماثلتين مرتبطتين برابطة تساهمية).

## u2: Example: Calculating the covalent radius of hydrogen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked calculation using the real experimental bond length of the H2 molecule (74 pm) to deduce the covalent radius of hydrogen (37 pm).

Accuracy: **accurate**. The bond length of H2 (74 pm) and the resulting covalent radius of hydrogen (37 pm) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | على سبيل المثال، إذا كان طول الرابطة بين ذرتي هيدروجين في جزيء الهيدروجين (H2) هو 74 بيكومتر، فإن نصف القطر التساهمي لذرة الهيدروجين هو 37 بيكومتر. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Periodic and bonding factors influencing covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the number of electron shells, nuclear charge, and bond multiplicity affect covalent radius.

Accuracy: **accurate**. The listed trends (increasing with electron shells, decreasing with effective nuclear charge, and varying with bond order) are scientifically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | نصف القطر التساهمي يختلف من عنصر إلى آخر، ويتأثر بعدة عوامل، مثل: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | 1. **عدد الطبقات الإلكترونية**: كلما زاد عدد الطبقات الإلكترونية، زاد نصف القطر التساهمي. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | 2. **الشحنة النووية**: كلما زادت الشحنة النووية، قل نصف القطر التساهمي. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | 3. **نوع الرابطة**: نصف القطر التساهمي يختلف حسب نوع الرابطة (أحادية، ثنائية، ثلاثية). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Applications and significance of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines practical applications of covalent radii in chemistry (estimating molecular size, bond length, and crystal packing), followed by a social closing remark.

Accuracy: **accurate**. The listed applications of covalent radius are accurate and standard in general chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | نصف القطر التساهمي مهم في فهم العديد من الخصائص الكيميائية والفيزيائية للعناصر والمركبات، مثل: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | 1. **حجم الجزيئات**: يمكن استخدام نصف القطر التساهمي لتقدير حجم الجزيئات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | 2. **طول الرابطة**: يمكن استخدام نصف القطر التساهمي لتقدير طول الرابطة بين ذرتين. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 | 3. **التركيب البلوري**: يمكن استخدام نصف القطر التساهمي لفهم التركيب البلوري للمواد. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | أتمنى أن يكون الشرح واضحًا ومفيدًا. هل لديك أي أسئلة أخرى؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

