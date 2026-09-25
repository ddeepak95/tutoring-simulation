# Stage 1: Arabic / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, atomic structure, examples, and properties of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation defines isotopes based on atomic structure (protons and neutrons), provides carbon isotopes as a comparative example, and explains their physical and chemical properties.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and nuclear composition of isotopes | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparison of carbon-12 and carbon-14 isotopes | {"context": "real_world", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |

## u1: Definition and nuclear composition of isotopes

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
    "reason": "Correctly defines isotopes as atoms of the same element having the same number of protons but differing numbers of neutrons, leading to different atomic masses.",
    "errors": []
  }
}
```

```text
النظائر (Isotopes) هي ذرات لنفس العنصر الكيميائي، لكنها تختلف في عدد النيوترونات داخل النواة.

### شرح بسيط:
تتكون الذرة من نواة (فيها بروتونات + نيوترونات) وإلكترونات تدور حولها.  
- **عدد البروتونات** يُسمى **العدد الذري**، وهو ثابت لكل عنصر ويحدد نوعه.  
- أما **النظائر** فتكون لها نفس عدد البروتونات (يعني نفس العنصر)، لكن **عدد النيوترونات** مختلف. لذلك تختلف كتلتها.
```


## u2: Comparison of carbon-12 and carbon-14 isotopes

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The subatomic counts for carbon-12 and carbon-14 and the real-world application of carbon-14 dating are scientifically accurate.",
    "errors": []
  }
}
```

```text
عنصر **الكربون** له نظائر كثيرة، منها:
- **كربون-12**: 6 بروتونات + 6 نيوترونات (الأكثر شيوعاً واستقراراً).
- **كربون-14**: 6 بروتونات + 8 نيوترونات (مشع ويُستخدم في تحديد عمر الآثار والعظام القديمة).

كلا النوعين ينتميان لعنصر الكربون (لأن عدد البروتونات = 6)، لكنهما يختلفان في الكتلة والاستقرار.
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
    "reason": "Correctly explains why isotopes exhibit nearly identical chemical behavior (same electron configuration) while differing in physical properties and nuclear stability.",
    "errors": []
  }
}
```

```text
### خصائص النظائر:
- خصائصها الكيميائية متشابهة جداً (لأن عدد الإلكترونات متساوٍ).
- خصائصها الفيزيائية تختلف (مثل الكتلة والنشاط الإشعاعي).
- بعض النظائر مستقرة (مثل كربون-12)، وبعضها مشع (مثل كربون-14 أو اليورانيوم-235).
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text


### مثال واضح:

```

```text


هل تريد مثالاً آخر أو شرحاً عن استخدامات النظائر في الحياة اليومية؟
```
