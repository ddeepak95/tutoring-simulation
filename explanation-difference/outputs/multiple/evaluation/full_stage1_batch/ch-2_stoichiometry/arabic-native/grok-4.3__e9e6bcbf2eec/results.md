# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, formulas, calculation procedure, worked example, and limiting reactant",
  "topic_match": "on_topic",
  "reason": "The explanation directly teaches stoichiometry, including the mole, molar mass, conversion formulas, a step-by-step stoichiometric calculation procedure with a worked example, limiting reactants, and study advice.",
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
| u1 | CONCEPT | Definition of the mole and Avogadro's number | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Definition and calculation of molar mass | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Formulas linking mass, moles, and number of particles | {"depth": "explanation"} | accurate |
| u4 | PROCEDURE | General procedure for stoichiometric calculations | {} | accurate |
| u5 | EXAMPLE | Worked stoichiometry problem: water produced from hydrogen combustion | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | CONCEPT | Definition of limiting reactant | {"depth": "statement"} | accurate |
| u7 | EXAMPLE | Worked example determining the limiting reactant | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | STUDY_SUPPORT | Study advice for solving stoichiometry problems | {"subtype": "study_strategy"} | accurate |

## u1: Definition of the mole and Avogadro's number

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
        "quote": "تمامًا مثل \"الدزينة\" التي تعني 12 قطعة"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definition of the mole as the unit of amount of substance and the value of Avogadro's number are factually correct.",
    "errors": []
  }
}
```

```text
### 1. ما هو المول؟ (الوحدة الأساسية)
المول هو **وحدة قياس كمية المادة**، تمامًا مثل "الدزينة" التي تعني 12 قطعة.  
المول الواحد يحتوي على **6.02 × 10²³** جسيم (ذرة أو جزيء أو أيون).  
هذا العدد يُسمى **عدد أفوغادرو**.

**مثال بسيط:**
- 1 مول من ذرات الكربون = 6.02 × 10²³ ذرة كربون.
- 1 مول من جزيئات الماء = 6.02 × 10²³ جزيء ماء.
```


## u2: Definition and calculation of molar mass

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
    "reason": "The definition of molar mass, its units, calculation method, and sample values are all accurate.",
    "errors": []
  }
}
```

```text
### 2. الكتلة المولية (M)
هي كتلة **مول واحد** من المادة، ووحدتها **جم/مول**.

**كيف تحسبها؟**
اجمع الكتل الذرية لكل العناصر في الصيغة الكيميائية (من الجدول الدوري).

**أمثلة:**
- **H₂O**: (2 × 1) + 16 = **18 جم/مول**
- **CO₂**: 12 + (2 × 16) = **44 جم/مول**
- **NaCl**: 23 + 35.5 = **58.5 جم/مول**
```


## u3: Formulas linking mass, moles, and number of particles

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
    "reason": "The mathematical relations between mass, molar mass, number of moles, and particle count are correctly presented.",
    "errors": []
  }
}
```

```text
### 3. العلاقات المهمة بين الكتلة والمول والعدد

| الكمية المطلوبة       | القانون                          | الرموز                     |
|-----------------------|----------------------------------|----------------------------|
| عدد المولات           | n = m ÷ M                       | n = مول، m = كتلة (جم)، M = كتلة مولية |
| الكتلة                | m = n × M                       | -                          |
| عدد الجسيمات         | عدد الجسيمات = n × 6.02×10²³   | -                          |
```


## u4: General procedure for stoichiometric calculations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The four-step algorithm outlines the standard, correct general procedure for stoichiometry problems.",
    "errors": []
  }
}
```

```text
### 4. الحسابات في المعادلات الكيميائية (الستويوكيمياء)

الخطوات الأساسية دائمًا:

1. **وزن المعادلة** (تأكد أنها موزونة).
2. **حوّل الكتل المعطاة إلى مولات**.
3. **استخدم النسب المولية** من المعادلة الموزونة.
4. **حوّل المولات الناتجة إلى كتلة** (إذا طُلب).
```


## u5: Worked stoichiometry problem: water produced from hydrogen combustion

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
    "reason": "The molar masses, mole conversions, stoichiometric ratios, and final mass calculation are fully correct.",
    "errors": []
  }
}
```

```text
#### مثال محلول خطوة بخطوة:

**السؤال:**  
ما كتلة الماء الناتجة عند احتراق 8 جم من الهيدروجين حسب المعادلة التالية؟  
**2H₂ + O₂ → 2H₂O**

**الحل:**

**الخطوة 1:** المعادلة موزونة بالفعل.

**الخطوة 2:** نحسب مولات الهيدروجين المعطى.  
الكتلة المولية لـ H₂ = 2 جم/مول  
n(H₂) = 8 ÷ 2 = **4 مول**

**الخطوة 3:** نستخدم النسبة المولية من المعادلة.  
من المعادلة: 2 مول H₂ → 2 مول H₂O  
إذن: 4 مول H₂ → **4 مول H₂O** (النسبة 1:1)

**الخطوة 4:** نحسب كتلة الماء.  
الكتلة المولية لـ H₂O = 18 جم/مول  
m(H₂O) = 4 × 18 = **72 جم**

**الإجابة:** 72 جرام من الماء.
```


## u6: Definition of limiting reactant

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The qualitative definition of a limiting reactant is correct.",
    "errors": []
  }
}
```

```text
### 5. المتفاعل المحدد (Limiting Reactant)

أحيانًا يكون أحد المتفاعلين أقل من اللازم، فيحدد كمية الناتج.
```


## u7: Worked example determining the limiting reactant

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
    "reason": "The mole comparison and reasoning to identify hydrogen as the limiting reactant are correct.",
    "errors": []
  }
}
```

```text
**مثال سريع:**  
لو كان لديك 4 مول H₂ و 3 مول O₂، أي مادة هي المحددة؟

من المعادلة:  
2H₂ + O₂ → 2H₂O  
- H₂ تحتاج 2 مول لكل 1 مول O₂ → 4 مول H₂ تحتاج 2 مول O₂ فقط.  
- O₂ الموجود 3 مول > 2 مول المطلوبة.  
**إذن الهيدروجين هو المتفاعل المحدد.**
```


## u8: Study advice for solving stoichiometry problems

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
    "reason": "The tips are scientifically sound and standard pedagogical strategies for stoichiometry.",
    "errors": []
  }
}
```

```text
### نصائح مهمة للطالب:

- **لا تنسَ وزن المعادلة** أولًا دائمًا.
- حوّل كل شيء إلى **مولات** قبل المقارنة.
- اكتب وحدات القياس مع كل رقم (جم، مول، جم/مول).
- في مسائل الغازات، استخدم قانون الغاز المثالي إذا أُعطيت الحجم والضغط ودرجة الحرارة.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "The comparison of a mole to a dozen ('تمامًا مثل \"الدزينة\" التي تعني 12 قطعة') could be considered an independent ANALOGY unit rather than being integrated into the CONCEPT unit.",
    "proposed_resolution": "Kept inside u1 because it is a brief passing comparison illustrating counting units rather than an independently developed cross-domain mapping."
  },
  {
    "unit_ids": [
      "u6",
      "u7"
    ],
    "issue": "The brief statement of the limiting reactant definition and the subsequent worked example could be kept together as a single unit.",
    "proposed_resolution": "Separated into a CONCEPT unit (u6) and an EXAMPLE unit (u7) because each performs a distinct teaching function: u6 introduces the general concept/definition, while u7 provides a fully worked quantitative problem to identify the limiting reactant."
  }
]
```

## Unassigned text for coverage review

```text
**شرح الحسابات الكيميائية (الستويوكيمياء) للمرحلة الثانوية**

سأشرح لك الموضوع بطريقة مبسطة ومنظمة خطوة بخطوة، كأننا ندرس معًا.


```

```text


هل تريد أن أشرح لك الآن موضوعًا معينًا بالتفصيل أكثر؟ مثل:
- المتفاعل المحدد بأمثلة أكثر
- حساب النسبة المئوية للناتج
- حسابات المحاليل والتركيز (المولارية)

قل لي أي جزء تريد نركز عليه.
```
