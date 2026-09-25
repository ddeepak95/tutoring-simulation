# Stage 1: Arabic / vapour phase refining

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "vapour phase refining",
  "observed_topic": "distillation / fractional distillation",
  "topic_match": "off_topic",
  "reason": "The explanation defines and describes thermal distillation (separation of components based on boiling points through heating, vaporization, and condensation, citing petroleum refining, beverage alcohol distillation, and water purification) instead of vapour phase refining in metallurgy (which involves converting an impure metal into a volatile compound and subsequently decomposing it to yield pure metal, such as the Mond process or Van Arkel process).",
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
| u1 | CONCEPT | Definition and operating principle of distillation based on boiling point differences | {"depth": "explanation"} | not_assessed_due_to_topic_mismatch |
| u2 | PROCEDURE | Step-by-step sequence of distillation: heating, vaporization, condensation, and collection | {} | not_assessed_due_to_topic_mismatch |
| u3 | EXAMPLE | Application of distillation in petroleum refining | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u4 | EXAMPLE | Application of distillation in alcoholic beverage production | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u5 | EXAMPLE | Application of distillation in water purification | {"context": "real_world", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |

## u1: Definition and operating principle of distillation based on boiling point differences

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
    "reason": "Accuracy is not assessed because the response is off-topic.",
    "errors": []
  }
}
```

```text
التنقية بالطور البخاري هي تقنية تستخدم لفصل المواد بناءً على درجة غليانها. تعتمد هذه الطريقة على مبدأ أن كل مادة لها درجة غليان مختلفة. عندما تسخن خليطًا من مواد مختلفة، فإن المادة التي درجة غليانها أقل ستبدأ في الغليان أولاً وتتحول إلى بخار.
```


## u2: Step-by-step sequence of distillation: heating, vaporization, condensation, and collection

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "Accuracy is not assessed because the response is off-topic.",
    "errors": []
  }
}
```

```text
لنفهم العملية بشكل أفضل، دعنا نتابع الخطوات الأساسية للتنقية بالطور البخاري:

1. **التسخين**: يتم تسخين الخليط حتى يصل إلى درجة حرارة تجعل أحد مكوناته يغلي ويتحول إلى بخار.

2. **التبخير**: المادة التي غليانها أقل تتحول إلى بخار وتفصل عن باقي الخليط.

3. **التكثيف**: يتم تبريد البخار الناتج عن طريق تمريره عبر أنبوب مكثف، حيث يبرد ويتكثف مرة أخرى إلى سائل.

4. **التجميع**: السائل المتكثف يتم جمعه في وعاء منفصل. هذا السائل المتجمع هو المادة التي تم تنقيتها.
```


## u3: Application of distillation in petroleum refining

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
    "reason": "Accuracy is not assessed because the response is off-topic.",
    "errors": []
  }
}
```

```text
**تقطير النفط**: حيث يتم فصل مشتقات النفط المختلفة بناءً على درجات غليانها.
```


## u4: Application of distillation in alcoholic beverage production

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
    "reason": "Accuracy is not assessed because the response is off-topic.",
    "errors": []
  }
}
```

```text
**صناعة المشروبات الكحولية**: حيث يتم استخدام التقطير لفصل الكحول عن الماء ومركبات أخرى.
```


## u5: Application of distillation in water purification

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
    "reason": "Accuracy is not assessed because the response is off-topic.",
    "errors": []
  }
}
```

```text
**تنقية المياه**: يمكن استخدام تقنيات مشابهة لإزالة الشوائب من الماء.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "u2 presents the four steps of the distillation cycle. It could be viewed as a CONCEPT explaining the physical mechanism of distillation stages or a PROCEDURE detailing the reusable method for separation.",
    "proposed_resolution": "Classified as PROCEDURE because it is explicitly introduced as sequential operational steps ('الخطوات الأساسية للتنقية بالطور البخاري: 1. التسخين... 2. التبخير... 3. التكثيف... 4. التجميع')."
  },
  {
    "unit_ids": [
      "u1",
      "u2",
      "u3",
      "u4",
      "u5"
    ],
    "issue": "Whether the response should be classified as off_topic or on_topic with major factual errors, since it addresses the user's prompt by title ('التنقية بالطور البخاري') but conflates it entirely with simple/fractional distillation.",
    "proposed_resolution": "Classified as off_topic with major_task_failure true, because vapour phase refining in chemistry is a distinct metallurgical chemical process (formation and thermal decomposition of volatile metal compounds), whereas the source solely and systematically teaches physical distillation based on boiling point differences."
  }
]
```

## Unassigned text for coverage review

```text
بالطبع، يسعدني أن أشرح لك التنقية بالطور البخاري بطريقة مبسطة.


```

```text


التنقية بالطور البخاري تُستخدم على نطاق واسع في العديد من التطبيقات، مثل:

- 
```

```text

- 
```

```text

- 
```

```text


هذه التقنية تعتبر فعالة جدًا لتنقية المواد وتستخدم في العديد من الصناعات المختلفة. أتمنى أن يكون الشرح واضحًا ومفيدًا لك. هل لديك أي أسئلة إضافية حول هذا الموضوع؟
```
