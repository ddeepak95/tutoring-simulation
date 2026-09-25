# Stage 1: Arabic / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, comparative carbon example, properties, and archaeological dating application of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation directly covers the requested topic of isotopes, defining them in terms of protons and neutrons, illustrating them with carbon isotopes, discussing their chemical/physical properties, and providing a real-world use case.",
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
| u1 | CONCEPT | Definition of isotopes and effect of neutron count on mass | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparative example of carbon isotopes | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u3 | CONCEPT | Chemical and physical properties and stability of isotopes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Application of carbon-14 in radiocarbon dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u5 | STUDY_SUPPORT | Recap summary of isotope definition | {"subtype": "recap"} | accurate |

## u1: Definition of isotopes and effect of neutron count on mass

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
    "reason": "Correctly defines isotopes as atoms of the same element with identical proton numbers but differing numbers of neutrons, explaining why they remain the same element but differ in mass.",
    "errors": []
  }
}
```

```text
**النظائر** هي ذرات للعنصر نفسه لها:

- **نفس عدد البروتونات** في النواة  
- لكن **عددًا مختلفًا من النيوترونات**

وبما أن عدد البروتونات هو الذي يحدد نوع العنصر، فإن النظائر تبقى للعنصر نفسه، لكن تختلف في **الكتلة الذرية**.
```


## u2: Comparative example of carbon isotopes

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately lists the subatomic composition and mass numbers of carbon-12, carbon-13, and carbon-14, along with the mass number formula.",
    "errors": []
  }
}
```

```text
### مثال: نظائر الكربون
كل ذرات الكربون تحتوي على **6 بروتونات**، لذلك كلها كربون. لكن قد يختلف عدد النيوترونات:

| النظير | عدد البروتونات | عدد النيوترونات | العدد الكتلي |
|---|---:|---:|---:|
| كربون-12 | 6 | 6 | 12 |
| كربون-13 | 6 | 7 | 13 |
| كربون-14 | 6 | 8 | 14 |

العدد الكتلي = عدد البروتونات + عدد النيوترونات.
```


## u3: Chemical and physical properties and stability of isotopes

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
    "reason": "Correctly explains why chemical properties are largely identical (same electron/proton count) and physical properties can differ slightly (due to mass differences), as well as distinguishing stable from radioactive isotopes.",
    "errors": []
  }
}
```

```text
### هل تختلف خواص النظائر؟
- **كيميائيًا:** تكون متشابهة جدًا؛ لأنها تملك العدد نفسه من البروتونات والإلكترونات غالبًا.
- **فيزيائيًا:** قد تختلف قليلًا بسبب اختلاف كتلتها.
- بعض النظائر تكون **مستقرة**، وبعضها **مشعّة**، أي تطلق إشعاعًا مع الزمن.
```


## u4: Application of carbon-14 in radiocarbon dating

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
    "reason": "Accurately identifies radiocarbon dating of archaeological artifacts and biological remains as a real-world application of carbon-14.",
    "errors": []
  }
}
```

```text
### مثال على الاستخدام
يُستخدم **الكربون-14** لمعرفة عمر الآثار القديمة وبقايا الكائنات الحية، وتسمى هذه الطريقة **التأريخ بالكربون المشع**.
```


## u5: Recap summary of isotope definition

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
    "reason": "Accurately summarizes the core definition of isotopes.",
    "errors": []
  }
}
```

```text
**باختصار:**  
النظائر = ذرات العنصر نفسه، لها العدد نفسه من البروتونات، وتختلف في عدد النيوترونات.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "u2 could potentially be viewed as 'worked' treatment rather than 'illustrative' because the formula 'العدد الكتلي = عدد البروتونات + عدد النيوترونات' is explicitly stated alongside the table values.",
    "proposed_resolution": "Assigned 'illustrative' because the table serves as a comparative reference example displaying isotopic properties rather than stepping through a problem or calculation to derive an unknown."
  }
]
```

## Unassigned text for coverage review
