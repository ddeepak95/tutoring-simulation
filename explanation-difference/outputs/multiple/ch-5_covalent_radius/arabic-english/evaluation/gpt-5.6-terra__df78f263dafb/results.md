# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly explains covalent radius in Arabic, covering its definition and formula, an illustrative worked example (Cl2), the rationale behind measuring atomic size this way, periodic table trends, the effect of bond multiplicity, and a closing summary.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 31,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 31,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines covalent radius as half the distance between the nuclei of two identical covalently bonded atoms, including the mathematical formula.

Accuracy: **accurate**. The definition and formula correctly represent the homonuclear diatomic definition of covalent radius commonly taught in high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **نصف القطر التساهمي** هو مقياس تقريبي لحجم الذرة عندما ترتبط بذرة أخرى بروابط تساهمية. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### التعريف | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | عندما ترتبط ذرتان متماثلتان برابطة تساهمية، نقيس المسافة بين مركزي نواتيهما، ثم نقسمها على 2. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | \text{نصف القطر التساهمي} = \frac{\text{المسافة بين نواتي ذرتين متماثلتين مرتبطتين}}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p6 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Calculating the covalent radius of chlorine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a concrete worked calculation of chlorine's covalent radius using the Cl2 internuclear distance (198 pm) and provides the conversion factor for picometers.

Accuracy: **accurate**. The internuclear distance of 198 pm for Cl2, the resulting covalent radius of 99 pm, and the definition of a picometer (10^-12 m) are all factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### مثال | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | في جزيء الكلور \(Cl_2\)، ترتبط ذرتا كلور برابطة تساهمية.   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | إذا كانت المسافة بين نواتيهما تساوي \(198\) بيكومتر \((pm)\)، فإن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p10 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p11 | \text{نصف القطر التساهمي للكلور} = \frac{198}{2} = 99 \, pm | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p13 | &gt; البيكومتر وحدة صغيرة جدًا:   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | &gt; \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | &gt; 1\, pm = 10^{-12}\, m | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p16 | &gt; \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Rationale for using covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius is necessary, pointing out that atoms lack sharp outer boundaries and that this method offers a practical measure of atomic size in molecules.

Accuracy: **accurate**. Accurately clarifies that electron probability clouds have no definite outer edges, necessitating operational definitions like covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### لماذا نستخدمه؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | لا يوجد للذرة “حافة” واضحة مثل الكرة الصلبة، لذلك لا يمكن قياس حجمها مباشرة. نصف القطر التساهمي يعطينا طريقة عملية لتقدير حجم الذرات داخل الجزيئات. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how covalent radius varies across periods and down groups in the periodic table, providing the underlying atomic structure causes.

Accuracy: **accurate**. The trends (decrease across a period due to increasing effective nuclear charge, increase down a group due to additional principal energy shells) and their explanations are scientifically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### كيف يتغير في الجدول الدوري؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | - **عبر الدورة من اليسار إلى اليمين:** يقل نصف القطر التساهمي غالبًا.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p21 |   لأن عدد البروتونات في النواة يزداد، فتزداد قوة جذب النواة للإلكترونات، فتقترب الإلكترونات من النواة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | - **نزولًا في المجموعة من الأعلى إلى الأسفل:** يزداد نصف القطر التساهمي.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p23 |   لأن الذرات تحتوي على مستويات طاقة أكثر، فتكون إلكترونات التكافؤ أبعد عن النواة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Variation with bond multiplicity (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Qualifies that covalent radii depend on bond order, noting that single bonds are longer while double and triple bonds are progressively shorter.

Accuracy: **accurate**. Accurately states the inverse relationship between bond multiplicity and covalent bond length/radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### ملاحظة مهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | قد يختلف نصف القطر التساهمي قليلًا حسب نوع الرابطة: | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p26 | - الرابطة الأحادية أطول، | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p27 | - الرابطة الثنائية أقصر، | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p28 | - الرابطة الثلاثية أقصر أكثر. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p29 | لذلك تكون الذرات المرتبطة بروابط متعددة أقرب إلى بعضها من الذرات المرتبطة برابطة أحادية. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |

## u6: Brief summary (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concludes the lesson with a concise summary sentence restating the core definition.

Accuracy: **accurate**. The recap correctly summarizes the definition of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | **باختصار:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p31 | نصف القطر التساهمي = نصف المسافة بين نواتي ذرتين متماثلتين مرتبطتين تساهميًا. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

