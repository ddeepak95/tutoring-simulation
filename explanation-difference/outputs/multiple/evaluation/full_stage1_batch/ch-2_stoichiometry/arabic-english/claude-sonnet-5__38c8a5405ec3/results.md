# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "stoichiometry in chemical reactions, including mole ratios, conversions, and problem-solving steps",
  "topic_match": "on_topic",
  "reason": "The text explains the fundamental principles of stoichiometry, provides an everyday analogy, presents procedural frameworks for solving problems, and works through mole-to-mole and mass-to-mass calculation examples.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and scope of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | ANALOGY | Sandwich recipe analogy for mole ratios | {} | accurate |
| u3 | PROCEDURE | Initial procedural steps for stoichiometric setup and mole ratios | {} | accurate |
| u4 | EXAMPLE | Worked example calculating moles of ammonia from hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | PROCEDURE | Roadmap workflow for mass-to-mass stoichiometry calculations | {} | accurate |
| u6 | EXAMPLE | Worked mass-to-mass example calculating grams of oxygen needed to react with hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | STUDY_SUPPORT | Study advice and problem-solving tips for stoichiometry | {"subtype": "study_strategy"} | accurate |
| u8 | STUDY_SUPPORT | Recap summary of core stoichiometry message | {"subtype": "recap"} | accurate |

## u1: Definition and scope of stoichiometry

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
    "reason": "Correctly defines stoichiometry as the study and calculation of quantitative relationships among reactants and products in chemical reactions.",
    "errors": []
  }
}
```

```text
الستوكيومتري هو فرع من الكيمياء يهتم بدراسة **العلاقات الكمية** بين المواد المتفاعلة والنواتج في التفاعل الكيميائي. ببساطة، هو حساب "كم" من كل مادة نحتاج أو ننتج في التفاعل الكيميائي.
```


## u2: Sandwich recipe analogy for mole ratios

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "تخيل وصفة طبخ 🍳\n- لعمل ساندويتش واحد تحتاج: خبزتين + قطعة جبن واحدة\n- إذا أردت عمل 5 ساندويتشات، ستحتاج: 10 خبزات + 5 قطع جبن"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The mapping between fixed ingredient proportions in making sandwiches and stoichiometric coefficients in a chemical equation is logically coherent and appropriate.",
    "errors": []
  }
}
```

```text
تخيل وصفة طبخ 🍳
- لعمل ساندويتش واحد تحتاج: خبزتين + قطعة جبن واحدة
- إذا أردت عمل 5 ساندويتشات، ستحتاج: 10 خبزات + 5 قطع جبن

بنفس الطريقة، المعادلة الكيميائية الموزونة تخبرنا بالنسب بين المواد!
```


## u3: Initial procedural steps for stoichiometric setup and mole ratios

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The procedural sequence correctly instructs balancing the equation, interpreting coefficients as relative molar amounts, and constructing the stoichiometric mole ratio.",
    "errors": []
  }
}
```

```text
### 1️⃣ وزن المعادلة الكيميائية
يجب أن تكون المعادلة **موزونة** (عدد الذرات متساوٍ في الطرفين)

**مثال:**
$$N_2 + 3H_2 \rightarrow 2NH_3$$

### 2️⃣ فهم المعاملات (الأرقام أمام المواد)
هذه الأرقام تمثل **عدد المولات**

من المعادلة أعلاه:
- 1 مول نيتروجين + 3 مول هيدروجين → 2 مول أمونيا

### 3️⃣ استخدام النسب المولية (Mole Ratio)
هذه هي أداتنا الأساسية في الحل!

$$\text{النسبة المولية} = \frac{\text{معامل المادة المطلوبة}}{\text{معامل المادة المعطاة}}$$
```


## u4: Worked example calculating moles of ammonia from hydrogen

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
    "reason": "The calculation 6 mol H2 * (2 mol NH3 / 3 mol H2) = 4 mol NH3 is mathematically and chemically correct.",
    "errors": []
  }
}
```

```text
**السؤال:** كم مول من الأمونيا (NH₃) ينتج عند تفاعل 6 مول من الهيدروجين (H₂)؟

**المعادلة:** $N_2 + 3H_2 \rightarrow 2NH_3$

**الحل:**

**الخطوة 1:** حدد المعطى والمطلوب
- المعطى: 6 مول H₂
- المطلوب: مول NH₃

**الخطوة 2:** استخدم النسبة المولية من المعادلة
$$6 \text{ mol } H_2 \times \frac{2 \text{ mol } NH_3}{3 \text{ mol } H_2} = 4 \text{ mol } NH_3$$

**الإجابة:** ينتج 4 مول من الأمونيا ✅
```


## u5: Roadmap workflow for mass-to-mass stoichiometry calculations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The general pathway accurately describes converting mass to moles via molar mass, moles to moles via mole ratio, and moles to mass via molar mass.",
    "errors": []
  }
}
```

```text
```
كتلة المادة المعطاة (جرام)
         ↓ (القسمة على الكتلة المولية)
عدد المولات المعطاة
         ↓ (استخدام النسبة المولية من المعادلة الموزونة)
عدد المولات المطلوبة
         ↓ (الضرب في الكتلة المولية)
كتلة المادة المطلوبة (جرام)
```
```


## u6: Worked mass-to-mass example calculating grams of oxygen needed to react with hydrogen

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
    "reason": "All calculations are correct: 4 g H2 / 2 g/mol = 2 mol H2; 2 mol H2 * (1/2) = 1 mol O2; 1 mol O2 * 32 g/mol = 32 g O2.",
    "errors": []
  }
}
```

```text
**السؤال:** كم جرام من الأكسجين (O₂) نحتاج لحرق 4 جرام من الهيدروجين (H₂)؟

**المعادلة:** $2H_2 + O_2 \rightarrow 2H_2O$

**الحل:**

| الخطوة | العملية | الناتج |
|--------|---------|--------|
| 1. حساب مولات H₂ | 4g ÷ 2 g/mol | 2 mol H₂ |
| 2. استخدام النسبة المولية | 2 mol H₂ × (1 mol O₂/2 mol H₂) | 1 mol O₂ |
| 3. تحويل إلى جرام | 1 mol × 32 g/mol | **32 جرام O₂** |
```


## u7: Study advice and problem-solving tips for stoichiometry

```json
{
  "attributes": {
    "subtype": "study_strategy"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The tips give sound, accurate advice on avoiding common calculation errors and following proper stoichiometric principles.",
    "errors": []
  }
}
```

```text
1. **دائماً** تأكد من وزن المعادلة أولاً قبل البدء بالحل
2. النسبة المولية تُؤخذ من **معاملات المعادلة الموزونة** فقط
3. لا يمكن مقارنة الكتل مباشرة بين مادتين مختلفتين - يجب المرور بالمولات أولاً
4. تذكر: المعامل في المعادلة = عدد المولات وليس الجرامات
```


## u8: Recap summary of core stoichiometry message

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
    "reason": "The summary accurately distills the fundamental idea of stoichiometry.",
    "errors": []
  }
}
```

```text
> الستوكيومتري هو ببساطة استخدام **النسب** الموجودة في المعادلة الموزونة لحساب كمية مادة معينة (متفاعل أو ناتج) بناءً على كمية معروفة لمادة أخرى في نفس التفاعل.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Unit u3 is structured as three numbered steps under 'الخطوات الأساسية' (Basic steps), teaching both the concept of mole ratios/coefficients and the initial method for setting up a problem.",
    "proposed_resolution": "Classified as PROCEDURE because it is explicitly framed as the sequence of steps to solve stoichiometric problems, although it also serves an explanatory CONCEPT role for mole ratios."
  },
  {
    "unit_ids": [
      "u7"
    ],
    "issue": "Unit u7 consists of student tips ('نصائح مهمة للطالب'). Bullets 3 and 4 directly address common student misconceptions (such as comparing masses directly or confusing coefficients with grams), which could be categorized as CAVEAT (misconception).",
    "proposed_resolution": "Classified as STUDY_SUPPORT with subtype study_strategy because the overall section is explicitly framed as advice and practical study tips for high school students."
  }
]
```

## Unassigned text for coverage review

```text
# الستوكيومتري (حساب المتفاعلات والنواتج)

## تعريف الستوكيومتري


```

```text


## الفكرة الأساسية


```

```text


## الخطوات الأساسية لحل مسائل الستوكيومتري


```

```text


## مثال تطبيقي كامل


```

```text


## المسار الكامل لحل أي مسألة ستوكيومترية


```

```text


## مثال شامل (بالكتلة)


```

```text


## نصائح مهمة للطالب 💡


```

```text


## المفهوم الأساسي (Take-home message)


```

```text


هل تريد مني حل بعض الأمثلة الإضافية معك للتدريب؟ 📝
```
