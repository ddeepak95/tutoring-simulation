# Stage 1: Arabic / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Definition, multiple-bond qualification, and applications of covalent radius",
  "topic_match": "on_topic",
  "reason": "The text directly defines covalent radius, notes the distinction for multiple bonds, and describes its utility in finding atomic size and bond length.",
  "content_unit_ids": [
    "u1"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and applications of covalent radius | {"depth": "statement"} | accurate |

## u1: Definition and applications of covalent radius

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
    "reason": "The definition matches the standard chemical definition (half the internuclear distance between two identical atoms joined by a single covalent bond), and its application to calculating bond length and atomic size is correct.",
    "errors": []
  }
}
```

```text
نصف القطر التساهمي هو نصف المسافة بين نواتي ذرتين متماثلتين متحدتين برابطة تساهمية أحادية. في حالة وجود رابطة تساهمية متعددة (مزدوجة أو ثلاثية) بين الذرات، فإن نصف القطر التساهمي يقاس بطرق أخرى أكثر تعقيدًا. نصف القطر التساهمي يستخدم في تحديد الحجم الذري في الجزيئات التساهمية، وفي تحديد طول الرابطة التساهمية بين الذرات.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Whether the sentence regarding multiple bonds should be split into an independent CAVEAT unit and the sentence regarding applications into a separate CONCEPT unit.",
    "proposed_resolution": "Kept as a single CONCEPT unit because both the note on multiple bonds and the note on applications are presented briefly without independent development, functioning as supporting context for the main definition."
  }
]
```

## Unassigned text for coverage review

```text
بالتأكيد. يسعدني أن أشرح لك نصف القطر التساهمي.


```
