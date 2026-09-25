# Stage 1: Arabic / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Covalent radius definition, calculation example, physical rationale, periodic trends, and bond multiplicity variation",
  "topic_match": "on_topic",
  "reason": "The explanation directly addresses covalent radius, explaining its definition, giving a calculation example for chlorine, justifying why it is used, describing periodic trends, and noting the effect of bond order.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and formula of covalent radius | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Calculation of chlorine covalent radius from Cl-Cl bond length | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Physical rationale for using covalent radius | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Periodic trends of covalent radius | {"depth": "explanation"} | accurate |
| u5 | CAVEAT | Variation of covalent radius by bond multiplicity | {"subtype": "qualification"} | accurate |
| u6 | STUDY_SUPPORT | Summary recap of covalent radius | {"subtype": "recap"} | accurate |

## u1: Definition and formula of covalent radius

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
    "reason": "The definition and formula correctly describe covalent radius as half the internuclear distance between two identical covalently bonded atoms.",
    "errors": []
  }
}
```

```text
نصف القطر التساهمي هو **مقياس تقريبي لحجم الذرة عندما ترتبط بذرة أخرى برابطة تساهمية**.

### كيف نعرّفه؟
عندما ترتبط ذرتان متماثلتان برابطة تساهمية، مثل ذرتي الكلور في جزيء:

\[
Cl - Cl
\]

فإن المسافة بين نواتي الذرتين تُسمّى **طول الرابطة**.

نصف القطر التساهمي لكل ذرة يساوي تقريبًا نصف طول هذه الرابطة:

\[
\text{نصف القطر التساهمي} = \frac{\text{طول الرابطة بين نواتي ذرتين متماثلتين}}{2}
\]
```


## u2: Calculation of chlorine covalent radius from Cl-Cl bond length

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
    "reason": "The internuclear distance of 198 pm for Cl2, the division by 2 yielding 99 pm, and the definition of a picometer as 10^-12 m are all factually correct.",
    "errors": []
  }
}
```

```text
مثال: إذا كانت المسافة بين نواتي ذرتي الكلور \(198\) بيكومتر، فإن:

\[
\text{نصف القطر التساهمي للكلور} = \frac{198}{2} = 99 \text{ بيكومتر}
\]

> البيكومتر وحدة صغيرة جدًا:  
> \(1\) بيكومتر = \(10^{-12}\) متر.
```


## u3: Physical rationale for using covalent radius

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
    "reason": "The explanation correctly states that atoms lack sharp physical boundaries due to electron cloud probability distributions, necessitating indirect measurement via bond lengths.",
    "errors": []
  }
}
```

```text
### لماذا نستخدمه؟
لا تملك الذرة حدودًا خارجية حادة مثل الكرة؛ لأن إلكتروناتها تتحرك في سحابة إلكترونية. لذلك لا يمكن قياس “حجم الذرة” مباشرة بسهولة.  
نصف القطر التساهمي يعطينا طريقة عملية لتقدير حجمها من خلال المسافات في الروابط الكيميائية.
```


## u4: Periodic trends of covalent radius

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
    "reason": "The trends and their mechanistic justifications (increasing effective nuclear charge across a period, increasing principal energy levels down a group) are correct.",
    "errors": []
  }
}
```

```text
### كيف يتغير في الجدول الدوري؟
- **عبر الدورة من اليسار إلى اليمين:** يقل نصف القطر التساهمي غالبًا؛ لأن عدد البروتونات يزداد، فتزداد قوة جذب النواة للإلكترونات.
- **نزولًا في المجموعة من أعلى إلى أسفل:** يزداد نصف القطر التساهمي؛ لأن الذرات تكتسب مستويات طاقة إلكترونية إضافية، فتكون أكبر حجمًا.
```


## u5: Variation of covalent radius by bond multiplicity

```json
{
  "attributes": {
    "subtype": "qualification"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Covalent bond length decreases as bond order increases (single > double > triple), which properly qualifies that covalent radius depends on bond multiplicity.",
    "errors": []
  }
}
```

```text
### ملاحظة مهمة
نصف القطر التساهمي قد يختلف قليلًا حسب نوع الرابطة:
- الرابطة الأحادية أطول عادةً.
- الرابطة الثنائية أقصر.
- الرابطة الثلاثية أقصر أكثر.

لذلك يكون الحجم المحسوب للذرة في الرابطة الثلاثية أقل قليلًا من حجمها في الرابطة الأحادية.
```


## u6: Summary recap of covalent radius

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
    "reason": "The concluding summary concisely and correctly restates the main concept.",
    "errors": []
  }
}
```

```text
**باختصار:** نصف القطر التساهمي هو نصف المسافة بين نواتي ذرتين متماثلتين مرتبطتين تساهميًا، ويُستخدم لتقدير حجم الذرة.
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review
