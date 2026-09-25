# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response is dedicated to explaining covalent radius for a secondary school student, including its qualitative definition, operational calculation, a worked example, the rationale for its use, periodic trends, variation with bond multiplicity, and a summary recap.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 30,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 1,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 30,
  "unique_subtopics": 7,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Qualitative definition of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States what covalent radius represents conceptually as an approximate measure of atomic size in a covalent bond.

Accuracy: **accurate**. The statement accurately conveys that covalent radius is an approximate measure of atomic size when bonded covalently.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | نصف القطر التساهمي هو **مقياس تقريبي لحجم الذرة عندما ترتبط بذرة أخرى برابطة تساهمية**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Operational definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the operational definition of covalent radius as half the internuclear distance (bond length) between two identical bonded atoms and provides the corresponding formula.

Accuracy: **accurate**. The operational definition and formula for determining the covalent radius from the bond length of a homonuclear diatomic molecule are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ### كيف نعرّفه؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | عندما ترتبط ذرتان متماثلتان برابطة تساهمية، مثل ذرتي الكلور في جزيء: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p5 | Cl - Cl | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p6 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p7 | فإن المسافة بين نواتي الذرتين تُسمّى **طول الرابطة**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p8 | نصف القطر التساهمي لكل ذرة يساوي تقريبًا نصف طول هذه الرابطة: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p9 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p10 | \text{نصف القطر التساهمي} = \frac{\text{طول الرابطة بين نواتي ذرتين متماثلتين}}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p11 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |

## u3: Worked example calculating the covalent radius of chlorine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked calculation determining the covalent radius of chlorine (99 pm) given the Cl-Cl internuclear bond distance of 198 pm.

Accuracy: **accurate**. The bond length of 198 pm for Cl2 and the resulting covalent radius of 99 pm are factually and mathematically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | مثال: إذا كانت المسافة بين نواتي ذرتي الكلور \(198\) بيكومتر، فإن: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p14 | \text{نصف القطر التساهمي للكلور} = \frac{198}{2} = 99 \text{ بيكومتر} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p15 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u4: Definition of the picometer (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies the length unit used in measuring atomic radii, defining the picometer as 10^-12 meters.

Accuracy: **accurate**. The definition of the picometer as 10^-12 meters is factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | &gt; البيكومتر وحدة صغيرة جدًا:   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | &gt; \(1\) بيكومتر = \(10^{-12}\) متر. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: Physical rationale for using covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius is necessary: atoms do not have rigid spherical boundaries because of fuzzy electron clouds, making indirect measurement via bond length practical.

Accuracy: **accurate**. The explanation that atoms lack well-defined sharp boundaries due to the nature of electron clouds is scientifically sound and standard in secondary school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### لماذا نستخدمه؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | لا تملك الذرة حدودًا خارجية حادة مثل الكرة؛ لأن إلكتروناتها تتحرك في سحابة إلكترونية. لذلك لا يمكن قياس “حجم الذرة” مباشرة بسهولة.   | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | نصف القطر التساهمي يعطينا طريقة عملية لتقدير حجمها من خلال المسافات في الروابط الكيميائية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u6: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the trends across periods (decreasing due to increasing nuclear charge) and down groups (increasing due to additional principal energy levels).

Accuracy: **accurate**. The periodic trends across periods and down groups and their respective physical explanations (nuclear pull and addition of energy levels) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ### كيف يتغير في الجدول الدوري؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | - **عبر الدورة من اليسار إلى اليمين:** يقل نصف القطر التساهمي غالبًا؛ لأن عدد البروتونات يزداد، فتزداد قوة جذب النواة للإلكترونات. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p23 | - **نزولًا في المجموعة من أعلى إلى أسفل:** يزداد نصف القطر التساهمي؛ لأن الذرات تكتسب مستويات طاقة إلكترونية إضافية، فتكون أكبر حجمًا. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u7: Variation of covalent radius with bond order (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Qualifies the measurement of covalent radius by noting that it is not fixed for an element, but varies with bond multiplicity (single > double > triple).

Accuracy: **accurate**. Bond lengths decrease as bond multiplicity increases (single > double > triple), leading to a corresponding decrease in the calculated covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### ملاحظة مهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | نصف القطر التساهمي قد يختلف قليلًا حسب نوع الرابطة: | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p26 | - الرابطة الأحادية أطول عادةً. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p27 | - الرابطة الثنائية أقصر. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p28 | - الرابطة الثلاثية أقصر أكثر. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p29 | لذلك يكون الحجم المحسوب للذرة في الرابطة الثلاثية أقل قليلًا من حجمها في الرابطة الأحادية. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |

## u8: Summary recap of covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential definition and utility of covalent radius concisely at the conclusion of the response.

Accuracy: **accurate**. The summary accurately restates the core definition and primary application of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | **باختصار:** نصف القطر التساهمي هو نصف المسافة بين نواتي ذرتين متماثلتين مرتبطتين تساهميًا، ويُستخدم لتقدير حجم الذرة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

