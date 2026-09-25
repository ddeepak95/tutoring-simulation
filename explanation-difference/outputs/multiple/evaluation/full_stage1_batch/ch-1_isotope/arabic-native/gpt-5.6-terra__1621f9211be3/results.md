# Stage 1: Arabic / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Arabic grammar and morphology of the word 'نظائر'",
  "topic_match": "off_topic",
  "reason": "The prompt was intended to explain the chemistry topic 'isotope' (translated as 'نظائر' in Arabic), but the response interprets the request strictly as an Arabic linguistics question, explaining the morphological type (broken plural), diptote rules (mamnu' min al-sarf), and grammatical parsing (i'rab) of the word without mentioning any chemistry concept.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ],
  "major_task_failure": true
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Morphological classification and lexical definition of the word نظير and its plural نظائر | {"depth": "statement"} | not_assessed_due_to_topic_mismatch |
| u2 | EXAMPLE | Illustrative sentences demonstrating the lexical use of نظير and نظائر in classroom contexts | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | not_assessed_due_to_topic_mismatch |
| u3 | CONCEPT | Morphological weight (صيغة منتهى الجموع) and diptote (ممنوع من الصرف) inflection rules for نظائر | {"depth": "explanation"} | not_assessed_due_to_topic_mismatch |
| u4 | EXAMPLE | Worked parsing examples illustrating syntactic cases and exceptions for نظائر | {"context": "abstract_or_hypothetical", "treatment": "worked"} | not_assessed_due_to_topic_mismatch |
| u5 | STUDY_SUPPORT | Summary recap of the morphological and grammatical status of نظائر | {"subtype": "recap"} | not_assessed_due_to_topic_mismatch |

## u1: Morphological classification and lexical definition of the word نظير and its plural نظائر

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
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The unit is part of an off-topic response; factual accuracy is not assessed.",
    "errors": []
  }
}
```

```text
كلمة **نظائر** هي **جمع تكسير**، ومفردها: **نظير**.

- **نظير**: الشيء المماثل أو المشابه لشيء آخر.
- **نظائر**: الأشياء المماثلة أو المتشابهة.
```


## u2: Illustrative sentences demonstrating the lexical use of نظير and نظائر in classroom contexts

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "في الصف طلابٌ **نظائرُ** في التفوق."
      }
    ]
  },
  "accuracy": {
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The unit is part of an off-topic response; factual accuracy is not assessed.",
    "errors": []
  }
}
```

```text
### مثال
- هذا الطالب **نظيرٌ** لزميله في الاجتهاد.  
- في الصف طلابٌ **نظائرُ** في التفوق.
```


## u3: Morphological weight (صيغة منتهى الجموع) and diptote (ممنوع من الصرف) inflection rules for نظائر

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
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The unit is part of an off-topic response; factual accuracy is not assessed.",
    "errors": []
  }
}
```

```text
### نوع الجمع
كلمة **نظائر** على وزن **فَعائل**، وهي من **صيغة منتهى الجموع**؛ لذلك فهي غالبًا **ممنوعة من الصرف**.

أي أنها:
- لا تُنوَّن.
- تُجرّ بالفتحة بدل الكسرة إذا لم تكن مضافة أو معرفة بـ(ال).
```


## u4: Worked parsing examples illustrating syntactic cases and exceptions for نظائر

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
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The unit is part of an off-topic response; factual accuracy is not assessed.",
    "errors": []
  }
}
```

```text
### أمثلة إعرابية
1. **جاءت نظائرُها.**  
   - نظائرُ: فاعل مرفوع بالضمة.

2. **رأيتُ نظائرَها.**  
   - نظائرَ: مفعول به منصوب بالفتحة.

3. **بحثتُ عن نظائرَ لها.**  
   - نظائرَ: اسم مجرور بـ«عن» وعلامة جره الفتحة؛ لأنه ممنوع من الصرف.

لكن إذا دخلت عليها **الـ** أو أُضيفت، تُجر بالكسرة:
- بحثتُ في **النظائرِ**.  
- بحثتُ عن **نظائرِ الكلماتِ**.  
```


## u5: Summary recap of the morphological and grammatical status of نظائر

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
    "verdict": "not_assessed_due_to_topic_mismatch",
    "reason": "The unit is part of an off-topic response; factual accuracy is not assessed.",
    "errors": []
  }
}
```

```text
إذن: **نظير ← نظائر**، وهو جمع تكسير ممنوع من الصرف.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "Contextualization value: whether illustrative sentences set in a school/classroom context ('في الصف طلاب...') count as 'everyday' context or merely constructed 'none' grammar textbook sentences.",
    "proposed_resolution": "Classified as 'everyday' because the example explicitly anchors the usage in a familiar school environment rather than purely abstract linguistic placeholders."
  },
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "Unit boundary and kind: the concluding lines of u4 ('لكن إذا دخلت عليها الـ أو أُضيفت...') state an exception/qualification rule with supporting examples, which could be separated into a distinct CAVEAT unit.",
    "proposed_resolution": "Kept together within u4 because the entire section is presented under the heading 'أمثلة إعرابية' (Parsing Examples) to demonstrate the complete paradigm of syntactic cases and conditions."
  }
]
```

## Unassigned text for coverage review
