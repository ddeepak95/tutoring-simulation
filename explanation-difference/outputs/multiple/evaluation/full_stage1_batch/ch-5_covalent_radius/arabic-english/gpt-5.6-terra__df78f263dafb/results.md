# Stage 1: Arabic / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Definition, measurement, worked example, periodic trends, and bond-order dependence of covalent radius",
  "topic_match": "on_topic",
  "reason": "The text directly explains the concept of covalent radius in chemistry, its definition and formula, provides a numerical example with chlorine, explains the reason for its use, describes periodic trends, and addresses the effect of bond multiplicity.",
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
| u2 | EXAMPLE | Worked calculation of chlorine covalent radius in Cl2 | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Reason for using covalent radius to estimate atomic size | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Periodic trends of covalent radius across periods and groups | {"depth": "explanation"} | accurate |
| u5 | CAVEAT | Qualification regarding the effect of bond order on covalent radius | {"subtype": "qualification"} | accurate |
| u6 | STUDY_SUPPORT | Summary recap of the definition of covalent radius | {"subtype": "recap"} | accurate |

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
    "reason": "The definition and formula accurately describe covalent radius for homonuclear bonded atoms.",
    "errors": []
  }
}
```

```text
**نصف القطر التساهمي** هو مقياس تقريبي لحجم الذرة عندما ترتبط بذرة أخرى بروابط تساهمية.

### التعريف
عندما ترتبط ذرتان متماثلتان برابطة تساهمية، نقيس المسافة بين مركزي نواتيهما، ثم نقسمها على 2.

\[
\text{نصف القطر التساهمي} = \frac{\text{المسافة بين نواتي ذرتين متماثلتين مرتبطتين}}{2}
\]
```


## u2: Worked calculation of chlorine covalent radius in Cl2

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
    "reason": "The bond length of Cl2 is correctly stated as 198 pm, yielding a single-bond covalent radius of 99 pm, and the definition of a picometer is correct.",
    "errors": []
  }
}
```

```text
### مثال
في جزيء الكلور \(Cl_2\)، ترتبط ذرتا كلور برابطة تساهمية.  
إذا كانت المسافة بين نواتيهما تساوي \(198\) بيكومتر \((pm)\)، فإن:

\[
\text{نصف القطر التساهمي للكلور} = \frac{198}{2} = 99 \, pm
\]

> البيكومتر وحدة صغيرة جدًا:  
> \[
> 1\, pm = 10^{-12}\, m
> \]
```


## u3: Reason for using covalent radius to estimate atomic size

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
    "reason": "Correctly states that atoms lack a sharp boundary due to electron cloud density distribution, necessitating operational definitions like covalent radius.",
    "errors": []
  }
}
```

```text
### لماذا نستخدمه؟
لا يوجد للذرة “حافة” واضحة مثل الكرة الصلبة، لذلك لا يمكن قياس حجمها مباشرة. نصف القطر التساهمي يعطينا طريقة عملية لتقدير حجم الذرات داخل الجزيئات.
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
    "reason": "The periodic trends across a period (decrease due to increasing effective nuclear charge) and down a group (increase due to addition of electron shells) are accurately explained.",
    "errors": []
  }
}
```

```text
### كيف يتغير في الجدول الدوري؟

- **عبر الدورة من اليسار إلى اليمين:** يقل نصف القطر التساهمي غالبًا.  
  لأن عدد البروتونات في النواة يزداد، فتزداد قوة جذب النواة للإلكترونات، فتقترب الإلكترونات من النواة.

- **نزولًا في المجموعة من الأعلى إلى الأسفل:** يزداد نصف القطر التساهمي.  
  لأن الذرات تحتوي على مستويات طاقة أكثر، فتكون إلكترونات التكافؤ أبعد عن النواة.
```


## u5: Qualification regarding the effect of bond order on covalent radius

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
    "reason": "Correctly notes that covalent radius depends on bond order, decreasing from single to double to triple bonds.",
    "errors": []
  }
}
```

```text
### ملاحظة مهمة
قد يختلف نصف القطر التساهمي قليلًا حسب نوع الرابطة:
- الرابطة الأحادية أطول،
- الرابطة الثنائية أقصر،
- الرابطة الثلاثية أقصر أكثر.

لذلك تكون الذرات المرتبطة بروابط متعددة أقرب إلى بعضها من الذرات المرتبطة برابطة أحادية.
```


## u6: Summary recap of the definition of covalent radius

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
    "reason": "Succinct and correct summary recapitulation.",
    "errors": []
  }
}
```

```text
**باختصار:**  
نصف القطر التساهمي = نصف المسافة بين نواتي ذرتين متماثلتين مرتبطتين تساهميًا.
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review
