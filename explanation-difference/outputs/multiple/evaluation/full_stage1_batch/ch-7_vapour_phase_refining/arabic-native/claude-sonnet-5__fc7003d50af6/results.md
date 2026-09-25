# Stage 1: Arabic / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "fractional distillation of liquid mixtures and crude oil",
  "topic_match": "off_topic",
  "reason": "The response explains fractional distillation (التقطير التجزيئي) and the separation of crude oil fractions, erroneously equating it with vapour phase refining. Vapour phase refining in metallurgy is a specific purification method where an impure metal is converted into a volatile compound and subsequently decomposed to yield pure metal (e.g., the Mond process for nickel and the Van Arkel process for zirconium/titanium).",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ],
  "major_task_failure": true
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and scientific principle of fractional distillation | {"depth": "explanation"} | not_assessed_due_to_topic_mismatch |
| u2 | PROCEDURE | General procedure and stages of fractional distillation | {} | not_assessed_due_to_topic_mismatch |
| u3 | EXAMPLE | Industrial fractional distillation of crude oil into petroleum fractions | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u4 | CONCEPT | Comparison between simple distillation and fractional distillation | {"depth": "explanation"} | not_assessed_due_to_topic_mismatch |
| u5 | STUDY_SUPPORT | Summary recap formula for fractional distillation | {"subtype": "recap"} | not_assessed_due_to_topic_mismatch |

## u1: Definition and scientific principle of fractional distillation

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; accuracy is not assessed per guidelines.",
    "errors": []
  }
}
```

```text
تخيل أن لديك خليطًا من سائلين مختلفين (مثل النفط الخام الذي يحتوي على عشرات المركبات)، وتريد فصلهما عن بعضهما. **التقطير التجزيئي** هو الطريقة التي نستخدمها لفصل السوائل المختلطة معًا بناءً على اختلاف **درجات غليانها**.

## المبدأ العلمي

كل سائل له درجة غليان مختلفة:
- السائل الأكثر **تطايرًا** (درجة غليانه منخفضة) يتحول إلى بخار بسهولة أكبر
- السائل الأقل تطايرًا (درجة غليانه مرتفعة) يحتاج حرارة أكبر ليتبخر

عندما نُسخّن خليطًا من السوائل، فإن المكون الأكثر تطايرًا يتبخر أولًا، فنستطيع فصله عن الباقي.
```


## u2: General procedure and stages of fractional distillation

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; accuracy is not assessed per guidelines.",
    "errors": []
  }
}
```

```text
### 1. التسخين
نضع الخليط في دورق ونسخنه تدريجيًا.

### 2. عمود التجزئة (أهم جزء!)
هذا هو "سر" التقطير التجزيئي. العمود يحتوي على سطح كبير (حلقات زجاجية أو صفائح) يسبب:
- تكرار عمليات **التبخر والتكاثف** آلاف المرات داخل العمود
- كلما صعد البخار للأعلى، يبرد قليلًا فيتكاثف الجزء الأقل تطايرًا ويعود للأسفل
- فقط البخار "النقي" من المكون الأكثر تطايرًا يصل للقمة

### 3. التكثيف
البخار الذي وصل للأعلى (وهو الآن نقي تقريبًا) يمر عبر مُبرّد فيتكاثف إلى سائل نقي، ونجمعه في وعاء منفصل.

### 4. التكرار
بعد انتهاء المكون الأول، ترتفع درجة الحرارة تدريجيًا ليتبخر المكون التالي، وهكذا.
```


## u3: Industrial fractional distillation of crude oil into petroleum fractions

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; accuracy is not assessed per guidelines.",
    "errors": []
  }
}
```

```text
## مثال تطبيقي: تكرير النفط

النفط الخام خليط معقد من الهيدروكربونات، ويُفصل بالتقطير التجزيئي إلى:

| المنتج | درجة الغليان |
|--------|---------------|
| غاز البترول | منخفضة جدًا |
| البنزين | منخفضة |
| الكيروسين | متوسطة |
| الديزل | مرتفعة |
| زيوت التشحيم | مرتفعة جدًا |
```


## u4: Comparison between simple distillation and fractional distillation

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; accuracy is not assessed per guidelines.",
    "errors": []
  }
}
```

```text
| التقطير البسيط | التقطير التجزيئي |
|-----------------|---------------------|
| لا يحتوي عمود تجزئة | يحتوي عمود تجزئة |
| يفصل سوائل بفارق كبير في درجة الغليان | يفصل سوائل متقاربة في درجة الغليان |
| فصل أقل دقة | فصل أدق وأنقى |
```


## u5: Summary recap formula for fractional distillation

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The response is off-topic; accuracy is not assessed per guidelines.",
    "errors": []
  }
}
```

```text
> التقطير التجزيئي = تسخين + عمود تجزئة (يكرر التبخير والتكثيف) + تجميع كل مكون على حدة حسب درجة غليانه
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "Unit u4 compares simple distillation and fractional distillation, which could be viewed as a CAVEAT (qualification of when fractional distillation is needed instead of simple distillation) or a comparative CONCEPT.",
    "proposed_resolution": "Classified as CONCEPT because the table systematically defines and explains the structural and functional contrasts between the two distillation techniques rather than merely presenting a warning or exception."
  }
]
```

## Unassigned text for coverage review

```text
# التقطير التجزيئي (التنقية بالطور البخاري)

## الفكرة الأساسية


```

```text


## كيف تتم العملية؟


```

```text


## الفرق عن التقطير البسيط


```

```text


## خلاصة بسيطة


```

```text


هل تريد مني شرح أي جزء بتفصيل أكبر، أو إعطاء أمثلة إضافية؟
```
