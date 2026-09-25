# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Arabic**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

off_topic: The prompt requested an explanation of 'vapour phase refining' (التنقية بالطور البخاري), which is a metallurgical refining technique for metals (such as the Mond process or the Van Arkel process). The response conflates the term with fractional distillation (التقطير التجزيئي) and explains the physical separation of liquid mixtures and petroleum refining instead.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 38,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 38,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "not_assessed_due_to_topic_mismatch": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Basic idea and definition of fractional distillation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the definition and the fundamental purpose of fractional distillation for separating liquids with different boiling points.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # التقطير التجزيئي (التنقية بالطور البخاري) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## الفكرة الأساسية | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | تخيل أن لديك خليطًا من سائلين مختلفين (مثل النفط الخام الذي يحتوي على عشرات المركبات)، وتريد فصلهما عن بعضهما. **التقطير التجزيئي** هو الطريقة التي نستخدمها لفصل السوائل المختلطة معًا بناءً على اختلاف **درجات غليانها**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Scientific principle of volatility and boiling points (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the scientific mechanism behind fractional distillation involving boiling point and volatility differences.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ## المبدأ العلمي | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | كل سائل له درجة غليان مختلفة: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | - السائل الأكثر **تطايرًا** (درجة غليانه منخفضة) يتحول إلى بخار بسهولة أكبر | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | - السائل الأقل تطايرًا (درجة غليانه مرتفعة) يحتاج حرارة أكبر ليتبخر | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p8 | عندما نُسخّن خليطًا من السوائل، فإن المكون الأكثر تطايرًا يتبخر أولًا، فنستطيع فصله عن الباقي. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Process steps of fractional distillation (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the sequence of physical steps: heating, passage through fractionating column, condensation, and repetition.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ## كيف تتم العملية؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | ### 1. التسخين | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | نضع الخليط في دورق ونسخنه تدريجيًا. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p12 | ### 2. عمود التجزئة (أهم جزء!) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | هذا هو &quot;سر&quot; التقطير التجزيئي. العمود يحتوي على سطح كبير (حلقات زجاجية أو صفائح) يسبب: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | - تكرار عمليات **التبخر والتكاثف** آلاف المرات داخل العمود | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | - كلما صعد البخار للأعلى، يبرد قليلًا فيتكاثف الجزء الأقل تطايرًا ويعود للأسفل | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p16 | - فقط البخار &quot;النقي&quot; من المكون الأكثر تطايرًا يصل للقمة | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p17 | ### 3. التكثيف | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | البخار الذي وصل للأعلى (وهو الآن نقي تقريبًا) يمر عبر مُبرّد فيتكاثف إلى سائل نقي، ونجمعه في وعاء منفصل. | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p19 | ### 4. التكرار | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | بعد انتهاء المكون الأول، ترتفع درجة الحرارة تدريجيًا ليتبخر المكون التالي، وهكذا. | PROCEDURE | {} | [&#x27;prose&#x27;] |

## u4: Application to petroleum refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents crude oil refining as an illustrative real-world example of fractional distillation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | ## مثال تطبيقي: تكرير النفط | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | النفط الخام خليط معقد من الهيدروكربونات، ويُفصل بالتقطير التجزيئي إلى: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | &#124; المنتج &#124; درجة الغليان &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p24 | &#124;--------&#124;---------------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p25 | &#124; غاز البترول &#124; منخفضة جدًا &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p26 | &#124; البنزين &#124; منخفضة &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p27 | &#124; الكيروسين &#124; متوسطة &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p28 | &#124; الديزل &#124; مرتفعة &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p29 | &#124; زيوت التشحيم &#124; مرتفعة جدًا &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |

## u5: Comparison between simple and fractional distillation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Compares simple distillation and fractional distillation across column presence, boiling point differences, and separation precision.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ## الفرق عن التقطير البسيط | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | &#124; التقطير البسيط &#124; التقطير التجزيئي &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p32 | &#124;-----------------&#124;---------------------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p33 | &#124; لا يحتوي عمود تجزئة &#124; يحتوي عمود تجزئة &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p34 | &#124; يفصل سوائل بفارق كبير في درجة الغليان &#124; يفصل سوائل متقاربة في درجة الغليان &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p35 | &#124; فصل أقل دقة &#124; فصل أدق وأنقى &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |

## u6: Summary of fractional distillation and closing question (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick summary formula of fractional distillation, followed by an organizational closing offer for further explanation.

Accuracy: **not_assessed_due_to_topic_mismatch**. The unit was not assessed because the response is off-topic.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | ## خلاصة بسيطة | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | &gt; التقطير التجزيئي = تسخين + عمود تجزئة (يكرر التبخير والتكثيف) + تجميع كل مكون على حدة حسب درجة غليانه | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p38 | هل تريد مني شرح أي جزء بتفصيل أكبر، أو إعطاء أمثلة إضافية؟ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

