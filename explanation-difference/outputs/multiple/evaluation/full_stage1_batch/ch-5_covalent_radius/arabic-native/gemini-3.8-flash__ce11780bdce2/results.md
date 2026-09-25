# Stage 1: Arabic / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Covalent radius: definition, physical rationale, calculation for chlorine, and periodic trends across periods and down groups",
  "topic_match": "on_topic",
  "reason": "The explanation directly teaches the definition, rationale, calculation, and periodic trends of covalent radius.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Physical rationale, definition, and geometric model of covalent radius | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Worked calculation of the covalent radius of chlorine from internuclear distance | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Trend and mechanism of covalent radius variation across a period | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Trend and mechanism of covalent radius variation down a group | {"depth": "explanation"} | accurate |
| u5 | STUDY_SUPPORT | Summary recap of covalent radius definition and periodic trends | {"subtype": "recap"} | accurate |

## u1: Physical rationale, definition, and geometric model of covalent radius

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "تخيل أنك تريد قياس حجم \"سحابة\" في السماء، هل لها حواف واضحة وثابتة؟ بالطبع لا!"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The electron-cloud rationale, definition of covalent radius, geometric touching-spheres model, and formula are factually correct.",
    "errors": []
  }
}
```

```text
### البداية: لماذا لا نستطيع قياس حجم الذرة بمسطرة عادية؟
تخيل أنك تريد قياس حجم "سحابة" في السماء، هل لها حواف واضحة وثابتة؟ بالطبع لا! 
كذلك الذرة؛ تدور الإلكترونات حول النواة في شكل **"سحابة إلكترونية"** ضبابية ليس لها حدود واضحة ومحددة.

إذن، كيف قاس العلماء حجمها؟ 
قالوا: **"دعونا نقيس المسافة بين ذرتين متطابقتين ممسكتين ببعضهما (مرتبطتين برابطة تساهمية)، ثم نقسم المسافة على 2!"**

---

### ما هو نصف القطر التساهمي؟ (التعريف البسيط)
**نصف القطر التساهمي (Covalent Radius):** 
هو **نصف المسافة** بين نواتي ذرتين متماثلتين مرتبطتين معاً برابطة تساهمية.

* **تخيلها هندسياً:**
لو أحضرت كرتين متماثلتين تماماً، وألصقتهما ببعضهما، ثم قست المسافة من "مركز الكُرة الأولى" إلى "مركز الكُرة الثانية"، وقسمت الناتج على 2.. فالرقم الناتج هو نصف قطر الكُرة الواحدة. هذا بالضبط ما نفعله مع الذرات!

> **القانون ببساطة:**
> $$\text{نصف القطر التساهمي} = \frac{\text{المسافة بين النواتين (طول الرابطة)}}{2}$$
```


## u2: Worked calculation of the covalent radius of chlorine from internuclear distance

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The internuclear distance for Cl2 (198 pm) and the resulting calculation yielding 99 pm are factually accurate.",
    "errors": []
  }
}
```

```text
### مثال عملي وسريع:
جزيء الكلور ($Cl_2$) يتكون من ذرتي كلور مرتبطتين برابطة تساهمية:
* وجد العلماء أن المسافة بين نواتي الذرتين = **$198$ بيكومتر** (البيكومتر وحدة صغيرة جداً لقياس الذرات).
* إذن، نصف القطر التساهمي لذرة الكلور = $\frac{198}{2} =$ **$99$ بيكومتر**.
```


## u3: Trend and mechanism of covalent radius variation across a period

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
    "verdict": "accurate",
    "reason": "The decrease in covalent radius across a period from left to right and its mechanism (increasing effective nuclear charge) are factually accurate.",
    "errors": []
  }
}
```

```text
#### 1. في الدورة الواحدة (أفقياً: من اليسار إلى اليمين ⬅️ ➡️)
* **ماذا يحدث؟** **يَقِلُّ** نصف القطر التساهمي (يصغر حجم الذرة).
* **السبب العلمي:** كلما اتجهنا لليمين، يزيد عدد البروتونات الموجبة في النواة مع بقاء الإلكترونات في نفس مستوى الطاقة، مما يزيد من قوة جذب النواة للإلكترونات (زيادة الشحنة النووية الفعّالة)، فتنكمش الذرة ويقل نصف قطرها.
```


## u4: Trend and mechanism of covalent radius variation down a group

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "مثل إضافة طبقات جديدة للبصلة"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The increase in covalent radius down a group from top to bottom and its mechanism (addition of principal energy levels and shielding) are factually accurate.",
    "errors": []
  }
}
```

```text
#### 2. في المجموعة الواحدة (رأسياً: من الأعلى إلى الأسفل ⬆️ ⬇️)
* **ماذا يحدث؟** **يَزْدَادُ** نصف القطر التساهمي (يكبر حجم الذرة).
* **السبب العلمي:** كلما نزلنا لأسفل، نضيف مستوى طاقة رئيسي كامل وجديد (مثل إضافة طبقات جديدة للبصلة)، كما أن الإلكترونات الداخلية تحجب جذب النواة للإلكترونات الخارجية، فتبتعد الإلكترونات وتتسع الذرة.
```


## u5: Summary recap of covalent radius definition and periodic trends

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
    "verdict": "accurate",
    "reason": "The recap accurately synthesizes the main definition and periodic trends.",
    "errors": []
  }
}
```

```text
### خلاصة في سطرين لتحفظها بسهولة:
* **نصف القطر التساهمي:** نصف المسافة بين نواتين متماثلتين مرتبطتين تساهمياً، ونقيس به حجم الذرة.
* **في الجدول الدوري:** **يصغر** كلما مشينا يميناً، و**يكبر** كلما نزلنا لأسفل.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Whether the introductory explanation about why isolated atomic radii cannot be directly measured due to fuzzy electron clouds should be separated from the definition, geometric model, and formula of covalent radius.",
    "proposed_resolution": "Kept together as one CONCEPT unit because the electron cloud explanation directly motivates and justifies why covalent radius is defined via bonded internuclear distance, adhering to the principle of keeping a definition and its direct justification together."
  },
  {
    "unit_ids": [
      "u3",
      "u4"
    ],
    "issue": "Whether the period trend and the group trend should be combined into a single CONCEPT unit on periodic table variation under the overarching section heading, or split into two separate units.",
    "proposed_resolution": "Split into two distinct units because each explains a different direction and is governed by a distinct physical mechanism (effective nuclear charge vs. addition of energy levels and electron shielding). The overarching section header remains unassigned."
  }
]
```

## Unassigned text for coverage review

```text
أهلاً بك يا بطل! يسعدني جداً أن أشرح لك هذا المفهوم. اعتبرني معلمك الخاص اليوم، وسنبسط الأمر معاً خطوة بخطوة.

---


```

```text


---


```

```text


---

### أهم جزء في اختبارات الثانوية: كيف يتغير في الجدول الدوري؟

هذا السؤال يتكرر دائماً: **ماذا يحدث لنصف القطر في الجدول الدوري؟**


```

```text


---


```

```text


هل الشرح واضح لك، أم تحب أن نطبق بمثال آخر من الجدول الدوري؟
```
