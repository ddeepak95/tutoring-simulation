# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Definition of stoichiometry, conservation of atoms, and balancing chemical equations with worked examples",
  "topic_match": "on_topic",
  "reason": "The response defines stoichiometry and focuses on chemical equation balancing, which is the foundational basis for stoichiometric relationships and calculations.",
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
| u1 | CONCEPT | Definition of stoichiometry and conservation of atoms in balanced chemical equations | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Illustrative example of balancing the formation of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | contains_error |
| u3 | PROCEDURE | General systematic procedure for balancing chemical equations | {} | accurate |
| u4 | EXAMPLE | Step-by-step balancing of methane combustion | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | EXAMPLE | Step-by-step balancing of propane combustion | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |

## u1: Definition of stoichiometry and conservation of atoms in balanced chemical equations

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
    "reason": "The definition of stoichiometry and the conceptual explanation of balanced chemical equations based on atom conservation are scientifically sound.",
    "errors": []
  }
}
```

```text
القياس المتكافئ أو حساب العناصر المتفاعلة أو الموزونة أو المتكافئة (بالإنجليزية: Stoichiometry)‏ هو فرع من فروع الكيمياء والهندسة الكيميائية الذي يتعامل مع كميات المواد التي تتفاعل أو تنتج في التفاعل الكيميائي.

يمكن صياغة معادلة التفاعل الكيميائي كتفاعل بين الجزيئات ، ولكن في نفس الوقت يظل عدد الذرات كما هو ، ولهذا يكون عدد الذرات قبل التفاعل مساويا لعدد الذرات بعد التفاعل.

وبناء على ذلك فأن مفهوم المعادلة المتزنة تعني أن عدد الذرات من كل عنصر على طرفي المعادلة متساوي. ولذلك يجب وزن المعادلة الكيميائية ، بمعنى أن نحدد معادلة التفاعل طبقا للكميات المولية الداخلة في التفاعل والكميات المولية الناتجة منه.
```


## u2: Illustrative example of balancing the formation of water

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
    "verdict": "contains_error",
    "reason": "The unit reverses the status of hydrogen and oxygen in the unbalanced equation H2 + O2 = H2O.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "عدد ذرات الأكسجين على طرفي المعادلة متساوي ، ولكن عدد ذرات الهيدروجين مختلف."
          }
        ],
        "description": "In the unbalanced equation H2 + O2 = H2O, the number of hydrogen atoms is already equal on both sides (2 on each side), whereas the number of oxygen atoms is different (2 on the reactant side and 1 on the product side). The explanation mistakenly asserts the reverse.",
        "correction": "عدد ذرات الهيدروجين على طرفي المعادلة متساوٍ (ذرتان في كل طرف)، ولكن عدد ذرات الأكسجين مختلف (ذرتان في المتفاعلات وذرة واحدة في النواتج).",
        "severity": "major"
      }
    ]
  }
}
```

```text
مثال توضيحي:

2 H2 + O2 = 2 H2O

معادلة غير موزونة :  H2 + O2 = H2O

عدد ذرات الأكسجين على طرفي المعادلة متساوي ، ولكن عدد ذرات الهيدروجين مختلف.

لوزن المعادلة يجب اختيار معاملات مناسبة للمواد الداخلة والناتجة من التفاعل (كما هو موضح في المعادلة الموزونة الأولى).

عندئذ يصبح عدد ذرات الهيدروجين 4 في طرفي المعادلة ، وعدد ذرات الأكسجين 2 ، أي أن المعادلة موزونة.
```


## u3: General systematic procedure for balancing chemical equations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The listed sequence of steps accurately describes the standard inspection method for balancing chemical equations.",
    "errors": []
  }
}
```

```text
يمكن وزن معادلة كيميائية بطرق مختلفة ولكن اتباع الطريقة المنظمة يسهل عملية الوزن.

خطوات وزن المعادلة الكيميائية :

1- نكتب المعادلة الكيميائية بدون معاملات بمعنى أننا نكتب الصيغ الكيميائية الصحيحة للمواد المتفاعلة والناتجة من التفاعل.

2- نعد ذرات كل عنصر في المواد المتفاعلة والناتجة.

3- نبدأ بوزن العناصر ، واختيار الطريقة المناسبة لوزن المعادلة.

4- التأكد من أن المعادلة موزونة ، وذلك بأن يكون عدد الذرات متساوي في طرفي المعادلة.
```


## u4: Step-by-step balancing of methane combustion

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
    "reason": "The atom counting, stoichiometric coefficients, and intermediate steps for balancing methane combustion are mathematically and chemically correct.",
    "errors": []
  }
}
```

```text
مثال 1 : وزن معادلة احتراق غاز الميثان.

المعادلة غير الموزونة :  CH4 + O2 → CO2 + H2O

1- تعد ذرات كل عنصر : الطرف الأيسر : الطرف الأيمن :

C = 1 C = 1
H = 4 H = 2
O = 2 O = 3

2- نبدأ بالعناصر ، فنلاحظ أن ذرات الكربون متساوية على طرفي المعادلة.

3- نبدأ بوزن الهيدروجين ، بضرب (2) في H2O ، تصبح المعادلة :

CH4 + O2 → CO2 + 2H2O

الطرف الأيسر : الطرف الأيمن :

C = 1 C = 1
H = 4 H = 4
O = 2 O = 4

4- نزن ذرات الأكسجين ، وذلك بإضافة (2) إلى O2 ، فتصبح المعادلة :

CH4 + 2O2 → CO2 + 2H2O

الطرف الأيسر : الطرف الأيمن :

C = 1 C = 1
H = 4 H = 4
O = 4 O = 4

5- التأكد من أن المعادلة موزونة ، عدد الذرات في طرفي المعادلة متساوي.
```


## u5: Step-by-step balancing of propane combustion

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
    "reason": "All calculations and coefficient assignments for balancing propane combustion are fully correct.",
    "errors": []
  }
}
```

```text
مثال 2 : وزن معادلة احتراق البروبان.

المعادلة غير الموزونة :  C3H8 + O2 → CO2 + H2O

1- تعد ذرات كل عنصر : الطرف الأيسر : الطرف الأيمن :

C = 3 C = 1
H = 8 H = 2
O = 2 O = 3

2- نبدأ بالعنصر الأول (C) ، ونزن طرفي المعادلة بضرب (3) في CO2 ، فتصبح المعادلة :

C3H8 + O2 → 3CO2 + H2O

الطرف الأيسر : الطرف الأيمن :

C = 3 C = 3
H = 8 H = 2
O = 2 O = 7

3- نزن ذرات الهيدروجين بضرب (4) في H2O ، فتصبح المعادلة :

C3H8 + O2 → 3CO2 + 4H2O

الطرف الأيسر : الطرف الأيمن :

C = 3 C = 3
H = 8 H = 8
O = 2 O = 10

4- نزن ذرات الأكسجين ، علماً بأن ذرات الأكسجين (O2) جزيء ، بضرب (5) في O2 ، فتصبح المعادلة :

C3H8 + 5O2 → 3CO2 + 4H2O

الطرف الأيسر : الطرف الأيمن :

C = 3 C = 3
H = 8 H = 8
O = 10 O = 10

5- التأكد من أن المعادلة موزونة ، عدد الذرات في طرفي المعادلة متساوي.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "The first paragraph provides the formal definition of stoichiometry, while the following two paragraphs explain why chemical equations must be balanced according to the law of conservation of mass/atoms. These could be split into two separate CONCEPT units.",
    "proposed_resolution": "They are kept together in u1 because the text directly links the definition of stoichiometry (dealing with reaction quantities) to the necessity of balanced equations representing molar amounts and conserved atoms."
  }
]
```

## Unassigned text for coverage review

```text


أتمنى أن أكون قد ساعدتك في فهم القياس المتكافئ بشكل جيد. هل لديك أي أسئلة أخرى؟
```
