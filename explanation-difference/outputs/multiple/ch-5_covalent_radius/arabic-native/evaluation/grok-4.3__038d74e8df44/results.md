# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains the covalent radius, its definition, calculation with an example, significance, dependence on bond order, and periodic trends for a secondary school chemistry level.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 21,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "CAVEAT": 1
  },
  "nested_passages": 21,
  "unique_subtopics": 5,
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

## u1: Definition and basic mechanism of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the distance between the nuclei of two bonded identical atoms sharing electrons.

Accuracy: **accurate**. The definition of the covalent radius as half the internuclear distance between two covalently bonded identical atoms is scientifically standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | نصف القطر التساهمي هو طريقة لقياس **حجم الذرة** عندما تكون مرتبطة بذرة أخرى برابطة تساهمية. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### شرح بسيط ومباشر: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | تخيل ذرتين من نفس العنصر (مثل ذرتي كلور في جزيء Cl₂).   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | كل ذرة لها نواة في الوسط وسحابة إلكترونات تحيط بها. عندما ترتبط الذرتان برابطة تساهمية، تشتركان في زوج من الإلكترونات، فتقتربان من بعضهما حتى تلامس سحابتا الإلكترونات. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | المسافة بين نواتي الذرتين تُسمى **طول الرابطة**.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | ونصف القطر التساهمي هو **نصف** هذه المسافة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Chlorine molecule covalent radius calculation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked calculation of the covalent radius of chlorine using the known bond length in Cl2 (198 pm).

Accuracy: **accurate**. The internuclear distance in Cl2 is accurately stated as approximately 198 pm, giving a covalent radius of 99 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **مثال عملي:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | - في جزيء الكلور (Cl₂)، طول الرابطة بين الذرتين = 198 بيكومتر (pm). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | - إذن نصف القطر التساهمي لذرة الكلور = 198 ÷ 2 = **99 بيكومتر**. | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Reason for using covalent radius and its practical uses (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius is necessary due to fuzzy electron clouds and outlines its practical applications.

Accuracy: **accurate**. Correctly notes that atoms lack sharp boundaries and explains the utility of covalent radii in predicting bond lengths and comparing sizes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### لماذا نستخدم هذا المقياس؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | لأن الذرة ليس لها حدود واضحة مثل الكرة الصلبة. لذلك نعتمد على الرابطة التساهمية لنحدد حجمها بشكل عملي. هذا المقياس مفيد جدًا عندما نريد: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p12 | - معرفة أحجام الذرات في الجزيئات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p13 | - توقع طول الروابط في المركبات. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 | - فهم الاتجاهات في الجدول الدوري. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Bond order qualification for covalent radius (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies that covalent radius is conventionally measured in single bonds and notes that multiple bonds result in shorter distances.

Accuracy: **accurate**. Standard covalent radii refer to single bonds, and multiple bonds produce shorter internuclear separations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### ملاحظات مهمة للمرحلة الثانوية: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - نصف القطر التساهمي يُقاس عادة في الروابط الأحادية (رابطة واحدة). | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | - إذا كانت الرابطة مزدوجة أو ثلاثية، يصبح طول الرابطة أقصر، فيبدو نصف القطر أصغر. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the periodic trends across periods and down groups, including the underlying reasons (effective nuclear charge and additional principal energy levels).

Accuracy: **accurate**. Both periodic trends and their underlying physical causes (nuclear charge across a period, addition of shells down a group) are described accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | - في الجدول الدوري:   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p19 |   - **عبر الدورة** (من اليسار إلى اليمين): نصف القطر التساهمي **يقل** بسبب زيادة شحنة النواة التي تجذب الإلكترونات بقوة أكبر.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 |   - **أسفل المجموعة**: نصف القطر التساهمي **يزداد** بسبب إضافة مستويات طاقة جديدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | هل تريد أن أشرح لك كيف يختلف نصف القطر التساهمي عن نصف القطر الأيوني أو نصف القطر الفان در فالس بطريقة مبسطة أيضًا؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

