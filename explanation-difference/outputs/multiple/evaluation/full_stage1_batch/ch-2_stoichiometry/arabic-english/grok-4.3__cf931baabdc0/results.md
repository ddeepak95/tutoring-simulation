# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "stoichiometry",
  "topic_match": "on_topic",
  "reason": "The explanation directly defines stoichiometry, outlines its foundational principles (conservation of mass, mole, molar mass), explains mole ratios, provides a step-by-step worked mass calculation, and explains limiting reactants.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of stoichiometry | {"depth": "statement"} | accurate |
| u2 | ANALOGY | Cooking recipe analogy for stoichiometry | {} | accurate |
| u3 | CONCEPT | Foundational concepts: conservation of mass, mole, and molar mass | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Deriving and interpreting mole ratios from balanced equations | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Worked mass-to-mass stoichiometry calculation for water synthesis | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | CONCEPT | Limiting reactant concept and illustrative determination | {"depth": "explanation"} | contains_error |
| u7 | STUDY_SUPPORT | Study tips and problem-solving strategy for stoichiometry | {"subtype": "study_strategy"} | accurate |

## u1: Definition of stoichiometry

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
    "reason": "Correctly defines stoichiometry as the branch of chemistry dealing with quantitative relationships between reactants and products.",
    "errors": []
  }
}
```

```text
الستوكيومترية (أو علم القياس الكيميائي) هي فرع من الكيمياء يهتم بدراسة **الكميات** الدقيقة للمواد المتفاعلة والمواد الناتجة في التفاعلات الكيميائية.
```


## u2: Cooking recipe analogy for stoichiometry

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "تخيل أن التفاعل الكيميائي مثل وصفة طبخ: تحتاج كميات محددة من كل مكون حتى ينجح الطبق"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy accurately maps the concept of fixed stoichiometric proportions and excess ingredients in cooking to reactants in chemical reactions.",
    "errors": []
  }
}
```

```text
تخيل أن التفاعل الكيميائي مثل وصفة طبخ: تحتاج كميات محددة من كل مكون حتى ينجح الطبق، وإلا ستحصل على نتيجة مختلفة أو ستتبقى مواد زائدة.
```


## u3: Foundational concepts: conservation of mass, mole, and molar mass

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
    "reason": "The law of conservation of mass, the mole definition, Avogadro's number, and molar mass definitions and values are factually accurate.",
    "errors": []
  }
}
```

```text
### 1. الأساس الذي تعتمد عليه الستوكيومترية
- **قانون حفظ الكتلة**: الكتلة لا تفنى ولا تُستحدث من العدم، بل تتحول فقط. لذلك يجب أن تكون المعادلة الكيميائية **موزونة** (متوازنة) قبل أي حساب.
- **المول (Mole)**: وحدة قياس كمية المادة. المول الواحد يحتوي على 6.02 × 10²³ جسيم (ذرة أو جزيء). يُستخدم المول لأن الذرات صغيرة جداً ولا يمكن عدّها مباشرة.
- **الكتلة المولية**: كتلة مول واحد من المادة (تقاس بوحدة جرام/مول). مثلاً: الكتلة المولية للماء (H₂O) = 18 جم/مول.
```


## u4: Deriving and interpreting mole ratios from balanced equations

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
    "reason": "The stoichiometric coefficients and derived mole ratios for the formation of water are correct.",
    "errors": []
  }
}
```

```text
### 2. المعادلة الموزونة ونسب المولات
ابدأ دائماً بوزن المعادلة. من المعادلة الموزونة تستخرج **نسب المولات** (Mole Ratios) التي تعمل مثل "خريطة" للحسابات.

مثال بسيط:
\[
2H_2 + O_2 \rightarrow 2H_2O
\]

- نسب المولات:
  - H₂ : O₂ = 2 : 1
  - H₂ : H₂O = 2 : 2 (أي 1 : 1)
  - O₂ : H₂O = 1 : 2

هذه النسب تخبرك: "لكل 2 مول هيدروجين تحتاج 1 مول أكسجين لإنتاج 2 مول ماء".
```


## u5: Worked mass-to-mass stoichiometry calculation for water synthesis

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
    "reason": "All calculation steps (mass to moles of H2, mole ratio to H2O, and moles to mass of H2O) are correct.",
    "errors": []
  }
}
```

```text
### 3. كيف تحسب الكميات؟ (مثال عملي)
**السؤال**: إذا تفاعل 8 جرام من الهيدروجين (H₂) مع كمية كافية من الأكسجين، فكم جراماً من الماء ينتج؟

**الحل خطوة بخطوة**:

1. حوّل الكتلة إلى مولات:
   - الكتلة المولية لـ H₂ = 2 جم/مول
   - عدد المولات = الكتلة ÷ الكتلة المولية = 8 ÷ 2 = **4 مول** من H₂

2. استخدم نسبة المولات من المعادلة:
   - من المعادلة: 2 مول H₂ → 2 مول H₂O
   - إذن 4 مول H₂ → **4 مول** H₂O

3. حوّل المولات إلى كتلة:
   - الكتلة المولية لـ H₂O = 18 جم/مول
   - الكتلة = عدد المولات × الكتلة المولية = 4 × 18 = **72 جرام**

النتيجة: ينتج 72 جرام ماء.
```


## u6: Limiting reactant concept and illustrative determination

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
    "verdict": "contains_error",
    "reason": "The unit contains a minor phrasing error in the parenthetical contrast: it states that 6 moles of water would form 'as if O2 were sufficient', whereas O2 is already in excess and 6 moles would form only if H2 were sufficient to react with all 3 moles of O2.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "وليس 6 مول كما لو كان O₂ كافياً"
          }
        ],
        "description": "O2 is the excess reactant, not the limiting one; producing 6 moles of water from 3 moles of O2 would require H2 to be sufficient (6 moles of H2), so attributing the theoretical 6 moles to 'as if O2 were sufficient' reverses the reactant that is deficient.",
        "correction": "وليس 6 مول كما لو كان H₂ كافياً للتفاعل مع كل الأكسجين (أو: لو تفاعل كل الأكسجين المتوفر)",
        "severity": "minor"
      }
    ]
  }
}
```

```text
### 4. المتفاعل المحدد (Limiting Reactant)
أحياناً تكون الكميات غير متناسبة مع النسب. في هذه الحالة، المادة التي تنفد أولاً هي التي "تحدد" كمية المنتج.

مثال سريع:
- لديك 4 مول H₂ و 3 مول O₂.
- حسب المعادلة تحتاج 2 H₂ : 1 O₂.
- 4 مول H₂ تحتاج فقط 2 مول O₂، لكن لديك 3 مول O₂ (زائد).
- إذن H₂ هو المتفاعل المحدد، وسينتج 4 مول ماء فقط (وليس 6 مول كما لو كان O₂ كافياً).
```


## u7: Study tips and problem-solving strategy for stoichiometry

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
    "reason": "Provides sound and standard pedagogical guidelines for solving stoichiometry problems.",
    "errors": []
  }
}
```

```text
### نصائح سريعة للطلاب
- وزن المعادلة أولاً دائماً.
- حوّل دائماً إلى مولات قبل استخدام النسب.
- استخدم الآلة الحاسبة لحساب الكتل المولية بدقة.
- تدرب على أمثلة من كتابك المدرسي (مثل احتراق الميثان أو تفاعل الصوديوم مع الكلور).
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u6"
    ],
    "issue": "Section 4 introduces the concept of limiting reactant and immediately attaches a brief worked calculation demonstrating how to find the limiting reactant. It could be split into a CONCEPT unit for the definition and an EXAMPLE unit for the specific calculation.",
    "proposed_resolution": "Kept together as a single CONCEPT unit because the example is brief and serves directly to explain and demonstrate the newly introduced limiting reactant concept."
  }
]
```

## Unassigned text for coverage review

```text


سأشرحها لك خطوة بخطوة بطريقة مبسطة تناسب المرحلة الثانوية.


```

```text


هل تريد أن أشرح مثالاً آخر (مثل حساب المتفاعل المحدد بالتفصيل) أو أعطيك تمريناً بسيطاً تحله؟
```
