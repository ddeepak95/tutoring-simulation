# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry (definition, foundational concepts including mole, molar mass, and mole ratio, general problem-solving procedure, worked example, and study advice)",
  "topic_match": "on_topic",
  "reason": "The explanation directly addresses stoichiometry by explaining the core definitions, presenting a general multi-step method, and demonstrating the process with a worked reaction problem.",
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
| u1 | CONCEPT | Definition and basis of stoichiometry | {"depth": "statement"} | accurate |
| u2 | CONCEPT | Definition of the mole and Avogadro's number | {"depth": "statement"} | accurate |
| u3 | CONCEPT | Definition and determination of molar mass | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Definition of mole ratio | {"depth": "statement"} | accurate |
| u5 | PROCEDURE | General step-by-step method for stoichiometric calculations | {} | accurate |
| u6 | EXAMPLE | Worked example calculating mass of CO2 produced from methane combustion | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | STUDY_SUPPORT | Summary of fundamental concepts and advice on solving calculations | {"subtype": "study_strategy"} | accurate |

## u1: Definition and basis of stoichiometry

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
    "reason": "The text accurately defines stoichiometry and identifies its reliance on the law of conservation of mass and molar relations.",
    "errors": []
  }
}
```

```text
الحسابات الكيميائية هي جزء أساسي من الكيمياء، وتستخدم لتحديد كميات المواد المتفاعلة والمنتجات في التفاعلات الكيميائية. تعتمد هذه الحسابات على قوانين ومفاهيم كيميائية أساسية، مثل قانون حفظ الكتلة والعلاقات المولية.
```


## u2: Definition of the mole and Avogadro's number

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
    "reason": "The mole is accurately defined as the unit of amount of substance containing Avogadro's number of entities.",
    "errors": []
  }
}
```

```text
**المول**: هو وحدة قياس كمية المادة، ويمثل كمية المادة التي تحتوي على عدد أفوجادرو (6.022 × 10^23) من الجسيمات (ذرات، جزيئات، أيونات).
```


## u3: Definition and determination of molar mass

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
    "reason": "The definition of molar mass, its units (g/mol), and how to calculate it from atomic masses are scientifically accurate.",
    "errors": []
  }
}
```

```text
**الكتلة المولية**: هي كتلة مول واحد من المادة، وتقاس بوحدة الغرام/مول. يمكن حسابها بجمع الكتل الذرية لجميع الذرات في الجزيء.
```


## u4: Definition of mole ratio

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
    "reason": "The definition correctly specifies the mole ratio as derived from the stoichiometric coefficients of a balanced chemical equation.",
    "errors": []
  }
}
```

```text
**النسبة المولية**: هي النسبة بين عدد مولات المواد المتفاعلة والمنتجات في معادلة كيميائية متوازنة.
```


## u5: General step-by-step method for stoichiometric calculations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The six steps describe a logically sound and standard method for approaching and solving stoichiometric problems.",
    "errors": []
  }
}
```

```text
1. **كتابة المعادلة الكيميائية**: أولاً، يجب كتابة المعادلة الكيميائية للتفاعل. يجب أن تكون المعادلة متوازنة، أي أن عدد ذرات كل عنصر يجب أن يكون متساويًا على جانبي المعادلة.
2. **تحديد المعلومات المعطاة**: حدد الكميات المعطاة في المسألة، مثل كتلة أو عدد مولات المواد المتفاعلة أو المنتجات.
3. **تحويل الوحدات**: إذا لزم الأمر، قم بتحويل الوحدات إلى المول أو الغرام باستخدام الكتلة المولية.
4. **استخدام النسب المولية**: استخدم المعادلة الكيميائية المتوازنة لتحديد النسب المولية بين المواد المتفاعلة والمنتجات.
5. **الحساب**: قم بإجراء الحسابات اللازمة باستخدام النسب المولية والكميات المعطاة.
6. **التحقق من الإجابة**: تأكد من أن الإجابة منطقية ووحداتها مناسبة.
```


## u6: Worked example calculating mass of CO2 produced from methane combustion

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
    "reason": "The reaction balancing, mole ratio, molar mass calculation, and final product mass computation are all factually and mathematically correct.",
    "errors": []
  }
}
```

```text
لنفترض أننا نريد حساب كتلة ثاني أكسيد الكربون (CO2) الناتجة عن احتراق 2 مول من الميثان (CH4) وفقًا للتفاعل:
\[ \text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O} \]

1. **المعادلة متوازنة**: المعادلة أعلاه متوازنة.
2. **المعلومات المعطاة**: 2 مول من CH4.
3. **النسبة المولية**: من المعادلة، نرى أن 1 مول من CH4 ينتج 1 مول من CO2. لذا، 2 مول من CH4 ستنتج 2 مول من CO2.
4. **الكتلة المولية ل CO2**: الكتلة المولية ل CO2 = 12 (لـ C) + 2*16 (لـ O2) = 44 غرام/مول.
5. **الحساب**: كتلة CO2 = 2 مول * 44 غرام/مول = 88 غرام.
```


## u7: Summary of fundamental concepts and advice on solving calculations

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
    "reason": "The concluding advice provides sound, accurate strategies for approaching stoichiometric problems (ensuring balanced equations and proper units).",
    "errors": []
  }
}
```

```text
الحسابات الكيميائية تعتمد على فهم المفاهيم الأساسية مثل المول والكتلة المولية والنسب المولية. من خلال اتباع الخطوات المنهجية والمنطقية، يمكن حل المسائل الكيميائية بسهولة ودقة. تذكر دائمًا أن تكتب المعادلات الكيميائية بشكل متوازن وتستخدم الوحدات الصحيحة في حساباتك.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2",
      "u3",
      "u4"
    ],
    "issue": "The list of three definitions under 'المفاهيم الأساسية' could be interpreted as a single consolidated CONCEPT unit introducing the foundational terms of stoichiometry, or as three separate CONCEPT units.",
    "proposed_resolution": "Separated into u2, u3, and u4 because each term (mole, molar mass, mole ratio) has a distinct definition and teaching role within stoichiometry."
  },
  {
    "unit_ids": [
      "u7"
    ],
    "issue": "The conclusion combines a brief summary of earlier points with strategic advice on solving chemical calculations, making either 'recap' or 'study_strategy' plausible subtypes.",
    "proposed_resolution": "Assigned 'study_strategy' because the actionable takeaway for the learner is to remember balancing equations and tracking units during calculations."
  }
]
```

## Unassigned text for coverage review

```text
بالطبع، يسعدني أن أشرح الحسابات الكيميائية بطريقة مبسطة ومفهومة لطالب في المرحلة الثانوية.

### مقدمة

```

```text


### المفاهيم الأساسية
1. 
```

```text

2. 
```

```text

3. 
```

```text


### خطوات إجراء الحسابات الكيميائية

```

```text


### مثال عملي

```

```text


### الخاتمة

```
