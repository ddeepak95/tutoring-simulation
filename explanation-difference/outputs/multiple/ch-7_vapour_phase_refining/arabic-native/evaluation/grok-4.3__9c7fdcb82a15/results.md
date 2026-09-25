# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The response confuses 'vapour phase refining' (a metallurgical refining technique involving conversion of crude metal into a volatile compound followed by thermal decomposition, such as the Mond and Van Arkel processes) with ordinary physical distillation (التقطير) of liquids and solutions, explaining distillation apparatus, boiling points, and laboratory distillation types instead.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 21,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "CAVEAT": 1
  },
  "nested_passages": 21,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 7,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of distillation (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the process presented in the text as distillation based on differences in boiling points.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | التنقية بالطور البخاري (أو التقطير) هي طريقة لفصل وتنقية المواد بناءً على اختلاف درجات غليانها. تُستخدم كثيراً في الكيمياء العضوية والمعمل المدرسي لتنقية السوائل. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Basic principle of distillation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how differential vaporization and subsequent condensation separate components of a mixture.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | ### الفكرة الأساسية ببساطة: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | كل مادة لها درجة غليان معينة. عند تسخين الخليط، تتحول المادة ذات درجة الغليان المنخفضة إلى بخار أولاً، بينما تبقى المواد ذات درجات الغليان العالية سائلة أو صلبة. ثم يُبرد البخار فيعود إلى سائل نقي. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | هذه الطريقة تعمل في **الطور البخاري**، أي أن عملية الفصل تحدث أثناء تحول المادة إلى بخار ثم تكثفه مرة أخرى. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Steps of the distillation process (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the sequential steps of heating, vapor transfer, condensation, and collection in a distillation setup.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### خطوات العملية (بالترتيب): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | 1. **التسخين**: نضع الخليط في دورق التقطير ونسخنه. المادة ذات درجة الغليان الأقل تتبخر أولاً. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 | 2. **انتقال البخار**: يصعد البخار في أنبوب التبريد (المكثف). | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | 3. **التكثيف**: يمر البخار في أنبوب بارد (يجري حوله ماء بارد)، فيتحول البخار إلى قطرات سائلة نقية. | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | 4. **الجمع**: يُجمع السائل النقي في دورق آخر (يُسمى المستقبل). | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Separation of salt water by distillation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p11", "quote": "تنقية الماء المالح"}]}

Annotation rationale: Gives a concrete everyday example of distilling salt water to recover pure water.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ### مثال بسيط جداً: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | - تنقية الماء المالح:   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p12 |   الماء يغلي عند 100°م، والملح يبقى في الدورق لأن درجة غليانه عالية جداً. البخار الذي يخرج يكون ماء نقياً، وعند تكثيفه نحصل على ماء مقطر خالٍ من الملح. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Simple distillation (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines simple distillation and its condition (boiling point difference > 25°C).

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ### أنواع التقطير التي قد تدرسها: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - **التقطير البسيط**: لفصل سائلين تختلف درجة غليانها كثيراً (فرق أكبر من 25°م). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Fractional distillation (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines fractional distillation using a fractionating column for close-boiling liquids.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | - **التقطير التجزيئي** (باستخدام عمود تجزئة): لفصل سائلين قريبي درجة الغليان (مثل الإيثانول والماء). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Steam distillation (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines steam distillation for heat-sensitive materials such as essential oils.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | - **التقطير بالبخار**: يُستخدم للمواد الحساسة للحرارة العالية (مثل استخلاص الزيوت العطرية من النباتات). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Practical notes and limitations of distillation (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists limitations (thermal decomposition) and practical lab tips (boiling chips, thermometer placement), followed by an interactive closing question.

Accuracy: **not_assessed_due_to_topic_mismatch**. Topic is completely off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### ملاحظات مهمة لك كطالب ثانوي: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | - لا تنجح هذه الطريقة إذا كانت المواد تتحلل عند درجة الغليان. | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p19 | - في المعمل، نستخدم حجر الغليان (حصى صغيرة) حتى لا يحدث غليان مفاجئ. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p20 | - درجة حرارة البخار (وليس السائل) هي التي نراقبها لمعرفة المادة التي تتقطر. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | هل تريد أن أشرح لك الفرق بين التقطير البسيط والتجزيئي بمثال عملي، أم تريد رسم توضيحي لجهاز التقطير؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

