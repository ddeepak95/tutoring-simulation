# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and thoroughly covers the concept of covalent radius, including the rationale behind measuring atomic radius via covalent bonding, its formal definition and formula, a worked example with chlorine, periodic trends, and a summary.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 2,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Foundational rationale for determining atomic radius via covalent bonding (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "تخيل أنك تريد قياس حجم \"سحابة\" في السماء، هل لها حواف واضحة وثابتة؟ بالطبع لا! "}]}

Annotation rationale: Explains why atomic boundaries cannot be measured directly due to fuzzy electron clouds and how covalent bonding between identical atoms provides a measurable distance.

Accuracy: **accurate**. The explanation correctly describes the indefinite boundaries of the electron cloud and how measuring the distance between bonded nuclei circumvents this challenge.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | أهلاً بك يا بطل! يسعدني جداً أن أشرح لك هذا المفهوم. اعتبرني معلمك الخاص اليوم، وسنبسط الأمر معاً خطوة بخطوة. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p3 | ### البداية: لماذا لا نستطيع قياس حجم الذرة بمسطرة عادية؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | تخيل أنك تريد قياس حجم &quot;سحابة&quot; في السماء، هل لها حواف واضحة وثابتة؟ بالطبع لا!  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p5 | كذلك الذرة؛ تدور الإلكترونات حول النواة في شكل **&quot;سحابة إلكترونية&quot;** ضبابية ليس لها حدود واضحة ومحددة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | إذن، كيف قاس العلماء حجمها؟  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p7 | قالوا: **&quot;دعونا نقيس المسافة بين ذرتين متطابقتين ممسكتين ببعضهما (مرتبطتين برابطة تساهمية)، ثم نقسم المسافة على 2!&quot;** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Definition, geometric model, and formula of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formal definition of covalent radius as half the distance between the nuclei of two identical covalently bonded atoms, supported by a geometric sphere model and formula.

Accuracy: **accurate**. The definition, geometric representation, and formula for covalent radius are standard and scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p9 | ### ما هو نصف القطر التساهمي؟ (التعريف البسيط) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | **نصف القطر التساهمي (Covalent Radius):**  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | هو **نصف المسافة** بين نواتي ذرتين متماثلتين مرتبطتين معاً برابطة تساهمية. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | * **تخيلها هندسياً:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p13 | لو أحضرت كرتين متماثلتين تماماً، وألصقتهما ببعضهما، ثم قست المسافة من &quot;مركز الكُرة الأولى&quot; إلى &quot;مركز الكُرة الثانية&quot;، وقسمت الناتج على 2.. فالرقم الناتج هو نصف قطر الكُرة الواحدة. هذا بالضبط ما نفعله مع الذرات! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p14 | &gt; **القانون ببساطة:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p15 | &gt; $$\text{نصف القطر التساهمي} = \frac{\text{المسافة بين النواتين (طول الرابطة)}}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Calculation of chlorine's covalent radius (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked calculation finding the covalent radius of chlorine from the experimental internuclear distance in a Cl2 molecule.

Accuracy: **accurate**. The internuclear distance in Cl2 is accurately stated as 198 pm, yielding a correct covalent radius of 99 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### مثال عملي وسريع: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | جزيء الكلور ($Cl_2$) يتكون من ذرتي كلور مرتبطتين برابطة تساهمية: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | * وجد العلماء أن المسافة بين نواتي الذرتين = **$198$ بيكومتر** (البيكومتر وحدة صغيرة جداً لقياس الذرات). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p20 | * إذن، نصف القطر التساهمي لذرة الكلور = $\frac{198}{2} =$ **$99$ بيكومتر**. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Periodic trend across a period (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that covalent radius decreases across a period from left to right due to increased nuclear charge and effective nuclear pull on the same principal energy level.

Accuracy: **accurate**. Accurately describes both the direction of the trend across periods and the scientific explanation regarding effective nuclear charge.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p22 | ### أهم جزء في اختبارات الثانوية: كيف يتغير في الجدول الدوري؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | هذا السؤال يتكرر دائماً: **ماذا يحدث لنصف القطر في الجدول الدوري؟** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p24 | #### 1. في الدورة الواحدة (أفقياً: من اليسار إلى اليمين ⬅️ ➡️) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | * **ماذا يحدث؟** **يَقِلُّ** نصف القطر التساهمي (يصغر حجم الذرة). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | * **السبب العلمي:** كلما اتجهنا لليمين، يزيد عدد البروتونات الموجبة في النواة مع بقاء الإلكترونات في نفس مستوى الطاقة، مما يزيد من قوة جذب النواة للإلكترونات (زيادة الشحنة النووية الفعّالة)، فتنكمش الذرة ويقل نصف قطرها. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Periodic trend down a group (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p29", "quote": "(مثل إضافة طبقات جديدة للبصلة)"}]}

Annotation rationale: Explains that covalent radius increases down a group due to the addition of principal energy levels and inner electron shielding.

Accuracy: **accurate**. The trend down a group and its explanation based on added electron shells and shielding effect are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | #### 2. في المجموعة الواحدة (رأسياً: من الأعلى إلى الأسفل ⬆️ ⬇️) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | * **ماذا يحدث؟** **يَزْدَادُ** نصف القطر التساهمي (يكبر حجم الذرة). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 | * **السبب العلمي:** كلما نزلنا لأسفل، نضيف مستوى طاقة رئيسي كامل وجديد (مثل إضافة طبقات جديدة للبصلة)، كما أن الإلكترونات الداخلية تحجب جذب النواة للإلكترونات الخارجية، فتبتعد الإلكترونات وتتسع الذرة. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Two-line summary of definition and periodic trends (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise concluding summary designed for easy memorization, along with closing polite teacher remarks.

Accuracy: **accurate**. The recap accurately synthesizes the definition and the trends across periods and groups.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ### خلاصة في سطرين لتحفظها بسهولة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | * **نصف القطر التساهمي:** نصف المسافة بين نواتين متماثلتين مرتبطتين تساهمياً، ونقيس به حجم الذرة. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p33 | * **في الجدول الدوري:** **يصغر** كلما مشينا يميناً، و**يكبر** كلما نزلنا لأسفل. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p34 | هل الشرح واضح لك، أم تحب أن نطبق بمثال آخر من الجدول الدوري؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

