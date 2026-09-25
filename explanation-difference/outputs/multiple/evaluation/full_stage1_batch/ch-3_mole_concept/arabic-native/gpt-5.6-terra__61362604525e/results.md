# Stage 1: Arabic / mole concept

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "mole concept",
  "observed_topic": "The mole concept, Avogadro's number, molar mass, and formulas for calculating moles and number of particles",
  "topic_match": "on_topic",
  "reason": "The explanation directly covers the definition of the mole, Avogadro's constant, molar mass, and the standard calculations relating moles, mass, and number of particles.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9",
    "u10"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of the mole and Avogadro's number | {"depth": "explanation"} | accurate |
| u2 | ANALOGY | Analogy comparing the mole to a dozen | {} | accurate |
| u3 | CONCEPT | Concept of molar mass and its relation to atomic and molecular mass | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Molar mass and atom count of carbon | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | EXAMPLE | Calculation of the molar mass of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | CONCEPT | Formula relating moles, mass, and molar mass | {"depth": "statement"} | accurate |
| u7 | EXAMPLE | Worked problem calculating moles of water from mass | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | CONCEPT | Formula relating number of particles to number of moles | {"depth": "statement"} | accurate |
| u9 | EXAMPLE | Worked problem calculating number of water molecules in two moles | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u10 | STUDY_SUPPORT | Summary recap of the mole concept and key formulas | {"subtype": "recap"} | accurate |

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
        "quote": "- **الدزينة** لعدّ 12 قطعة."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definition of the mole as the unit of amount of substance and the statement of Avogadro's number are scientifically correct.",
    "errors": []
  }
}
```

```text
المول هو **وحدة لقياس كمية المادة** في الكيمياء، تمامًا كما نستخدم:

- **الدزينة** لعدّ 12 قطعة.
- **الكيلوغرام** لقياس الكتلة.
- **المتر** لقياس الطول.

لكن لأن الذرات والجزيئات صغيرة جدًا، لا يمكننا عدّها واحدةً واحدة. لذلك يستخدم الكيميائيون وحدة كبيرة جدًا اسمها **المول**.

## تعريف المول

**المول الواحد يحتوي على عدد ثابت من الجسيمات يساوي:**

\[
6.022 \times 10^{23}
\]

ويسمى هذا العدد **عدد أفوجادرو**.

إذن:

- 1 مول من ذرات الحديد = \(6.022 \times 10^{23}\) ذرة حديد.
- 1 مول من جزيئات الماء = \(6.022 \times 10^{23}\) جزيء ماء.
- 1 مول من أيونات الصوديوم = \(6.022 \times 10^{23}\) أيون صوديوم.
```


## u2: Analogy comparing the mole to a dozen

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "1 \\text{ دزينة} = 12 \\text{ قطعة}"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy correctly maps counting individual items by the dozen to counting microscopic particles by the mole.",
    "errors": []
  }
}
```

```text
## تشبيه بسيط

كما أن:

\[
1 \text{ دزينة} = 12 \text{ قطعة}
\]

فإن:

\[
1 \text{ مول} = 6.022 \times 10^{23} \text{ جسيمًا}
\]

الفرق فقط أن المول عدد ضخم جدًا؛ لأن الجسيمات الكيميائية صغيرة للغاية.
```


## u3: Concept of molar mass and its relation to atomic and molecular mass

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
    "reason": "Molar mass is correctly defined as the mass of one mole in g/mol, numerically equivalent to the atomic/molecular mass.",
    "errors": []
  }
}
```

```text
## ما العلاقة بين المول والكتلة؟

لكل مادة **كتلة مولية**، وهي كتلة مول واحد منها، وتقاس بوحدة:

\[
\text{غرام/مول} \; (g/mol)
\]

وتكون الكتلة المولية مساوية تقريبًا للكتلة الذرية أو الجزيئية الموجودة في الجدول الدوري، لكن بوحدة غرام/مول.
```


## u4: Molar mass and atom count of carbon

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
    "reason": "The values and deductions for carbon's atomic mass, molar mass, and particle count are correct.",
    "errors": []
  }
}
```

```text
### مثال 1: الكربون

الكتلة الذرية للكربون تساوي تقريبًا 12.

إذن:

\[
1 \text{ مول من ذرات الكربون} = 12 \text{ غرامًا}
\]

وهذه الـ12 غرامًا تحتوي على:

\[
6.022 \times 10^{23}
\]

ذرة كربون.
```


## u5: Calculation of the molar mass of water

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
    "reason": "The molar mass calculation for water (H2O) using atomic masses of H (1) and O (16) is correct.",
    "errors": []
  }
}
```

```text
### مثال 2: الماء \(H_2O\)

يتكون الماء من:

- ذرتين هيدروجين: \(2 \times 1 = 2\)
- ذرة أكسجين: \(16\)

إذن الكتلة المولية للماء:

\[
2 + 16 = 18 \text{ g/mol}
\]

أي أن:

\[
1 \text{ مول من الماء} = 18 \text{ غرامًا}
\]

ويحتوي على:

\[
6.022 \times 10^{23}
\]

جزيء ماء.
```


## u6: Formula relating moles, mass, and molar mass

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
    "reason": "The equation n = m/M and its variable definitions are correct.",
    "errors": []
  }
}
```

```text
## أهم القوانين

### 1. حساب عدد المولات من الكتلة

\[
\text{عدد المولات} = \frac{\text{الكتلة بالجرام}}{\text{الكتلة المولية}}
\]

ويرمز لها غالبًا:

\[
n = \frac{m}{M}
\]

حيث:

- \(n\): عدد المولات
- \(m\): الكتلة بالجرام
- \(M\): الكتلة المولية بالجرام/مول
```


## u7: Worked problem calculating moles of water from mass

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
    "reason": "The calculation n = 36 / 18 = 2 mol is correct.",
    "errors": []
  }
}
```

```text
### مثال

ما عدد مولات الماء في 36 غرامًا من الماء؟

الكتلة المولية للماء = 18 g/mol

\[
n = \frac{36}{18} = 2 \text{ mol}
\]

إذن 36 غرامًا من الماء تساوي **2 مول**.
```


## u8: Formula relating number of particles to number of moles

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
    "reason": "The formula multiplying moles by Avogadro's number to find particle count is correct.",
    "errors": []
  }
}
```

```text
### 2. حساب عدد الجسيمات من عدد المولات

\[
\text{عدد الجسيمات} = \text{عدد المولات} \times 6.022 \times 10^{23}
\]
```


## u9: Worked problem calculating number of water molecules in two moles

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
    "reason": "The multiplication 2 * 6.022e23 = 1.2044e24 molecules is mathematically and conceptually correct.",
    "errors": []
  }
}
```

```text
مثال: كم جزيئًا في 2 مول من الماء؟

\[
2 \times 6.022 \times 10^{23}
= 1.2044 \times 10^{24}
\]

أي يوجد تقريبًا:

\[
1.204 \times 10^{24}
\]

جزيء ماء.
```


## u10: Summary recap of the mole concept and key formulas

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "فكّر في المول على أنه “دزينة ضخمة جدًا”"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The summary accurately consolidates the definitions, equations, and analogies presented in the lesson.",
    "errors": []
  }
}
```

```text
## خلاصة سريعة

- **المول** طريقة لعدّ الذرات أو الجزيئات أو الأيونات.
- **1 مول** يحتوي على \(6.022 \times 10^{23}\) جسيمًا.
- كتلة 1 مول من المادة تسمى **الكتلة المولية**.
- للتحويل من الكتلة إلى مولات نستخدم:

\[
n = \frac{m}{M}
\]

فكّر في المول على أنه “دزينة ضخمة جدًا” يستخدمها الكيميائيون لأن المواد تتكون من أعداد هائلة من الذرات والجزيئات.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u6",
      "u8"
    ],
    "issue": "Whether presenting formulas for calculation (n = m/M and N = n * N_A) should be classified as CONCEPT or PROCEDURE.",
    "proposed_resolution": "Classified as CONCEPT with depth 'statement' because each presents an algebraic relationship and symbol definitions rather than a multi-step algorithmic procedure. A competing reading would classify them as PROCEDURE since they serve as general methods for stoichiometric calculations."
  },
  {
    "unit_ids": [
      "u8",
      "u9"
    ],
    "issue": "Whether the particle calculation formula and its subsequent example should be merged into one EXAMPLE unit or kept as two separate units.",
    "proposed_resolution": "Separated into a CONCEPT unit (the general formula under the heading 'أهم القوانين') and an EXAMPLE unit (the specific calculation for 2 moles of water) to maintain parallel structure with u6 and u7."
  }
]
```

## Unassigned text for coverage review

```text


---


```

```text


---


```

```text


---


```

```text


---


```
