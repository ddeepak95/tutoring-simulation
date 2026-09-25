# Stage 1: Arabic / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, properties, carbon examples, and applications of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation defines isotopes in terms of atomic and mass numbers, illustrates them using carbon isotopes, discusses their chemical and physical properties, and lists common applications.",
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
| u1 | CONCEPT | Definition of isotopes and atomic/mass numbers | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparison of carbon-12, carbon-13, and carbon-14 | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Radiocarbon dating application | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u5 | EXAMPLE | Nuclear medicine application | {"context": "real_world", "treatment": "illustrative"} | accurate |

## u1: Definition of isotopes and atomic/mass numbers

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
    "reason": "The definition correctly distinguishes atomic number (protons) and mass number (protons plus neutrons) across isotopes of the same element.",
    "errors": []
  }
}
```

```text
النظائر هي ذرات من نفس العنصر الكيميائي، ولكنها تختلف في عدد النيوترونات في نواتها. هذا يعني أن لها نفس العدد الذري (عدد البروتونات في النواة) ولكنها تختلف في العدد الكتلي (مجموع عدد البروتونات والنيوترونات في النواة).
```


## u2: Comparison of carbon-12, carbon-13, and carbon-14

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
    "reason": "The subatomic particle counts and mass numbers for carbon-12, 13, and 14 are accurate and correctly reasoned.",
    "errors": []
  }
}
```

```text
لنفهم هذا بشكل أفضل، دعونا ننظر إلى مثال. الكربون هو عنصر كيميائي له العدد الذري 6، وهذا يعني أن كل ذرة كربون تحتوي على 6 بروتونات في نواتها. هناك ثلاثة نظائر رئيسية للكربون: كربون-12، كربون-13، وكربون-14.

- كربون-12 يحتوي على 6 بروتونات و6 نيوترونات، مما يجعل العدد الكتلي له 12.
- كربون-13 يحتوي على 6 بروتونات و7 نيوترونات، مما يجعل العدد الكتلي له 13.
- كربون-14 يحتوي على 6 بروتونات و8 نيوترونات، مما يجعل العدد الكتلي له 14.

جميع هذه النظائر هي كربون لأنها تحتوي على 6 بروتونات، ولكنها تختلف في عدد النيوترونات، وبالتالي في العدد الكتلي.
```


## u3: Chemical and physical properties of isotopes

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
    "reason": "Correctly explains why chemical properties are nearly identical (governed by valence electron configuration determined by atomic number) while physical properties and reaction rates (kinetic isotope effect) can differ.",
    "errors": []
  }
}
```

```text
النظائر لها نفس الخواص الكيميائية تقريبًا لأن الخواص الكيميائية تعتمد بشكل رئيسي على عدد الإلكترونات، والذي يحدده العدد الذري. ومع ذلك، تختلف النظائر في بعض الخواص الفيزيائية مثل الكتلة الذرية، وسرعة التفاعل في بعض التفاعلات الكيميائية.
```


## u4: Radiocarbon dating application

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
    "verdict": "accurate",
    "reason": "Accurately identifies radiocarbon dating of organic matter as an application of carbon-14.",
    "errors": []
  }
}
```

```text
التأريخ بالكربون المشع (كربون-14) لتحديد عمر المواد العضوية القديمة
```


## u5: Nuclear medicine application

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
    "verdict": "accurate",
    "reason": "Accurately identifies nuclear medicine (diagnosis and therapy) as an application of radioisotopes.",
    "errors": []
  }
}
```

```text
الطب النووي لتشخيص وعلاج الأمراض
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u4",
      "u5"
    ],
    "issue": "The two applications (radiocarbon dating and nuclear medicine) are presented within a single sentence joined by a conjunction.",
    "proposed_resolution": "Separated them into distinct EXAMPLE units (u4 and u5) in accordance with the guideline that independent isotope applications presented together should each form their own unit."
  }
]
```

## Unassigned text for coverage review

```text
مرحباً! سأشرح لك مفهوم النظائر (Isotopes) في الكيمياء باللغة العربية.


```

```text


تستخدم النظائر في العديد من التطبيقات، مثل 
```

```text
، وفي 
```

```text
.

أتمنى أن يكون الشرح واضحًا ومفيدًا! هل لديك أسئلة أخرى حول النظائر؟
```
