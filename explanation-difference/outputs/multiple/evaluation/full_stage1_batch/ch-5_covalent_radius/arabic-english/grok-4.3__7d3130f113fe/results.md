# Stage 1: Arabic / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Definition, calculation example, application to bond length, and periodic trends of covalent radius",
  "topic_match": "on_topic",
  "reason": "The text directly and accurately explains covalent radius, gives a calculation example using Cl₂, explains its use in estimating bond lengths, and outlines periodic trends.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of covalent radius | {"depth": "statement"} | accurate |
| u2 | EXAMPLE | Worked example calculating the covalent radius of chlorine | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Estimation of heteronuclear bond length using covalent radii | {"depth": "statement"} | accurate |
| u4 | CONCEPT | Periodic trends of covalent radius across periods and groups | {"depth": "explanation"} | accurate |

## u1: Definition of covalent radius

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
    "reason": "Correctly defines covalent radius as half the distance between the nuclei of two identical atoms joined by a single covalent bond.",
    "errors": []
  }
}
```

```text
نصف القطر التساهمي هو مقياس لحجم الذرة عندما تكون مرتبطة بذرة أخرى برابطة تساهمية. يُعرَّف بأنه نصف المسافة بين نواتي ذرتين متماثلتين مرتبطتين برابطة تساهمية واحدة.
```


## u2: Worked example calculating the covalent radius of chlorine

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
    "reason": "Accurately applies the definition: half of the internuclear distance in Cl₂ (198 pm) gives 99 pm for chlorine's covalent radius.",
    "errors": []
  }
}
```

```text
مثال: في جزيء الكلور Cl₂ تكون المسافة بين النواتين 198 بيكومتر، فيكون نصف القطر التساهمي للكلور 99 بيكومتر.
```


## u3: Estimation of heteronuclear bond length using covalent radii

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
    "reason": "Correctly states the common application that bond length between two different atoms can be estimated by adding their covalent radii.",
    "errors": []
  }
}
```

```text
يُستخدم لتقدير طول الرابطة بين ذرتين مختلفتين بجمع نصفي قطرهما التساهميين.
```


## u4: Periodic trends of covalent radius across periods and groups

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
    "reason": "Accurately describes the periodic trends and provides the correct physical explanations: effective nuclear charge across periods and additional energy levels down groups.",
    "errors": []
  }
}
```

```text
يقل نصف القطر التساهمي عبر الدورة في الجدول الدوري بسبب زيادة الشحنة النووية الفعالة، ويزداد نزولاً في المجموعة بسبب إضافة مستويات طاقة.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2",
      "u3"
    ],
    "issue": "Whether the sentence explaining the use of covalent radii to estimate bond length between different atoms ('يُستخدم لتقدير طول الرابطة...') should be grouped with the chlorine example in u2 or split into its own concept unit.",
    "proposed_resolution": "Split into a separate CONCEPT unit (u3) because the Cl₂ example illustrates the calculation of a homonuclear covalent radius, whereas this sentence introduces a distinct general conceptual application regarding heteronuclear bond lengths."
  }
]
```

## Unassigned text for coverage review

```text
  

\confidence{80}
```
