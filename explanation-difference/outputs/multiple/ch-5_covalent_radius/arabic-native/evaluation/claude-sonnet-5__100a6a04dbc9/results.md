# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and comprehensively explains covalent radius in Arabic, covering its definition, calculation formula, rationale, periodic table trends, an illustrative example, and distinctions from other types of atomic radii.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 39,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "CAVEAT": 1
  },
  "nested_passages": 39,
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

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces and defines the covalent radius with a visual text diagram and the mathematical relationship dividing internuclear distance by two.

Accuracy: **accurate**. The definition and formula correctly state that the covalent radius is half the internuclear distance between two identical bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # نصف القطر التساهمي (Covalent Radius) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## 🔍 الفكرة الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | تخيل معي ذرتين من نفس العنصر (مثل ذرتي كلور) ترتبطان معًا برابطة تساهمية لتكوين جزيء Cl₂. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | **نصف القطر التساهمي** هو: نصف المسافة بين نواتي الذرتين المرتبطتين برابطة تساهمية واحدة. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p6 | ## 📏 بشكل مبسط | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | ``` | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p8 | الذرة 1 ●----●---- الذرة 2 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p9 |         &#124;←   →&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p10 |       نصف القطر التساهمي | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p11 |     ●←――――――――→● | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p12 |       المسافة الكلية بين النواتين | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p13 | ``` | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;diagram&#x27;] |
| p14 | **القانون:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p15 | $$\text{نصف القطر التساهمي} = \frac{\text{المسافة بين نواتي الذرتين المترابطتين}}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u2: Rationale for using covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why direct measurement of atomic size is unfeasible due to diffuse electron clouds and how X-ray diffraction of internuclear distances solves this.

Accuracy: **accurate**. The explanation correctly points out the absence of a sharp boundary in the electron cloud and the use of internuclear distance measurements like X-ray diffraction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p17 | ## 🤔 لماذا نحتاج هذا المفهوم؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | - لا يمكننا &quot;قياس&quot; حجم الذرة مباشرة لأنها صغيرة جدًا ولا حدود واضحة لها (السحابة الإلكترونية). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | - لكن يمكننا قياس **المسافة بين نواتين** بدقة باستخدام تقنيات مثل حيود الأشعة السينية. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | - لذلك، نستخدم هذه المسافة لتقدير &quot;نصف قطر&quot; الذرة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how covalent radius changes down groups and across periods in the periodic table along with underlying physical causes.

Accuracy: **accurate**. Correctly describes the periodic trends: increasing down a group due to the addition of principal energy shells, and decreasing across a period due to increasing effective nuclear charge.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p22 | ## 📊 كيف يتغير عبر الجدول الدوري؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | &#124; الاتجاه &#124; التغير &#124; السبب &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p24 | &#124;---------&#124;--------&#124;-------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p25 | &#124; ⬇️ من أعلى لأسفل (نفس المجموعة) &#124; **يزداد** &#124; زيادة عدد مستويات الطاقة (الأغلفة) &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p26 | &#124; ➡️ من اليسار لليمين (نفس الدورة) &#124; **يقل** &#124; زيادة الشحنة النووية تجذب الإلكترونات أكثر نحو النواة &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |

## u4: Calculation of covalent radius for hydrogen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked numerical application calculating the covalent radius of hydrogen from its measured internuclear bond length.

Accuracy: **accurate**. The internuclear bond distance in H2 is approximately 74 pm, giving a covalent radius of approximately 37 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p28 | ## 💡 مثال توضيحي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | في جزيء الهيدروجين H₂: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | - المسافة بين نواتي ذرتي الهيدروجين = 74 بيكومتر تقريبًا | EXAMPLE | {} | [&#x27;list&#x27;] |
| p31 | - إذن نصف القطر التساهمي للهيدروجين ≈ 37 بيكومتر | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Distinction from ionic and metallic radii (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies the scope and distinctions of covalent radius compared to ionic and metallic radii.

Accuracy: **accurate**. Accurately qualifies that covalent radius is specific to covalently bonded atoms and distinct from ionic and metallic radii.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p33 | ## ⚠️ ملاحظة مهمة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | نصف القطر التساهمي **يختلف** عن: | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p35 | - **نصف القطر الأيوني** (لأيونات مشحونة) | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p36 | - **نصف القطر الفلزي** (للذرات في الشبكة الفلزية) | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p37 | كل نوع له طريقة قياس مختلفة حسب نوع الرابطة! | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p38 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p39 | هل تريد مني أن أوضح لك كيفية استخدام هذا المفهوم في حل مسائل أو مقارنة أحجام ذرات معينة؟ 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

