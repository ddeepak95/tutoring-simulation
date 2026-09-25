# Stage 1: Arabic / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, structure, examples, and properties of isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation directly defines isotopes, describes their subatomic structure (protons and neutrons), provides examples (hydrogen and carbon), discusses their chemical and physical properties, and clarifies a common point of confusion.",
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
| u1 | CONCEPT | Definition and subatomic explanation of isotopes | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Isotopes of hydrogen table | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u3 | EXAMPLE | Isotopes of carbon and their applications | {"context": "real_world", "treatment": "illustrative"} | contains_error |
| u4 | CONCEPT | General chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u5 | CAVEAT | Clarifying that sharing neutron count does not make atoms isotopes | {"subtype": "misconception"} | accurate |

## u1: Definition and subatomic explanation of isotopes

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
    "reason": "The definition and description of isotopes, subatomic particles, and their relationship to atomic number and mass number are factually accurate.",
    "errors": []
  }
}
```

```text
**النظائر** هي ذرات تنتمي إلى نفس العنصر الكيميائي، ولها نفس **العدد الذري** (عدد البروتونات)، لكنها تختلف في **العدد الكتلي** (بسبب اختلاف عدد النيوترونات في النواة).

---

## الشرح المبسط

تخيل أن الذرة تتكون من:
- **بروتونات** (شحنة موجبة) — تحدد هوية العنصر
- **نيوترونات** (متعادلة الشحنة) — تضيف كتلة للذرة
- **إلكترونات** (شحنة سالبة) — تدور حول النواة

النظائر تشترك في **نفس عدد البروتونات** (لذلك تبقى نفس العنصر)، لكنها تختلف في **عدد النيوترونات**.
```


## u2: Isotopes of hydrogen table

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
    "reason": "The composition of protium, deuterium, and tritium is correctly presented.",
    "errors": []
  }
}
```

```text
| النظير | البروتونات | النيوترونات | العدد الكتلي |
|--------|:---:|:---:|:---:|
| **الهيدروجين العادي (Protium)** | 1 | 0 | 1 |
| **الديوتيريوم (Deuterium)** | 1 | 1 | 2 |
| **التريتيوم (Tritium)** | 1 | 2 | 3 |

جميعها هيدروجين (لأن عدد البروتونات = 1)، لكنها تختلف في الكتلة.
```


## u3: Isotopes of carbon and their applications

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
    "verdict": "contains_error",
    "reason": "The isotopic symbols use non-standard notation by placing the atomic number (6) as a superscript on the left and the mass number as a superscript on the right, rather than placing the atomic number as a subscript and the mass number as a superscript on the left.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "(⁶C¹²)"
          },
          {
            "excerpt_index": 0,
            "quote": "(⁶C¹³)"
          },
          {
            "excerpt_index": 0,
            "quote": "(⁶C¹⁴)"
          }
        ],
        "description": "In standard nuclide notation, the atomic number is written as a subscript on the left and the mass number is written as a superscript on the left (e.g., ¹²₆C or C-12), rather than placing the atomic number as a left superscript and the mass number as a right superscript.",
        "correction": "Use standard nuclide notation: ¹²₆C, ¹³₆C, and ¹⁴₆C (or simply Carbon-12, Carbon-13, Carbon-14 / ¹²C, ¹³C, ¹⁴C).",
        "severity": "minor"
      }
    ]
  }
}
```

```text
- **الكربون-12** (⁶C¹²): 6 بروتونات + 6 نيوترونات — **الأكثر شيوعًا واستقرارًا**
- **الكربون-13** (⁶C¹³): 6 بروتونات + 7 نيوترونات — مستقر أيضًا
- **الكربون-14** (⁶C¹⁴): 6 بروتونات + 8 نيوترونات — **مشع** ويُستخدم في تحديد عمر الأحافير (التأريخ الكربوني)
```


## u4: General chemical and physical properties of isotopes

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
    "reason": "The statements correctly explain why isotopes share chemical properties, differ in physical properties, can be radioactive, and how relative atomic mass is calculated.",
    "errors": []
  }
}
```

```text
1. النظائر لها **نفس الخواص الكيميائية** تقريبًا (لأن التفاعلات الكيميائية تعتمد على الإلكترونات)
2. النظائر تختلف في **الخواص الفيزيائية** مثل الكتلة والكثافة
3. بعض النظائر **مستقرة** وبعضها **مشع (غير مستقر)** ويتحلل مع الزمن
4. الكتلة الذرية المذكورة في الجدول الدوري هي **متوسط** كتل النظائر المختلفة للعنصر حسب نسبة وجودها في الطبيعة
```


## u5: Clarifying that sharing neutron count does not make atoms isotopes

```json
{
  "attributes": {
    "subtype": "misconception"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The unit correctly addresses the misconception regarding atoms with identical neutron numbers but differing proton numbers (which are isotones, not isotopes).",
    "errors": []
  }
}
```

```text
إذا كان لديك ذرتان لهما نفس عدد النيوترونات لكن عدد بروتونات مختلف، هل تُعتبران نظائر لبعضهما؟

**الإجابة:** لا! فالنظائر تُعرَّف بناءً على **تشابه عدد البروتونات**، وليس النيوترونات.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "The unit is formatted as a question and immediate answer ('سؤال للتفكير / الإجابة'). It could be classified as STUDY_SUPPORT (practice_question) or CAVEAT (misconception).",
    "proposed_resolution": "Classified as CAVEAT (misconception) because the answer is immediately provided to dispel a common student confusion between sharing protons versus sharing neutrons, rather than leaving a task for the student to practice."
  }
]
```

## Unassigned text for coverage review

```text
# النظائر (Isotopes)

## التعريف

```

```text


---

## مثال توضيحي: نظائر الهيدروجين 🔬


```

```text


---

## مثال آخر: نظائر الكربون


```

```text


---

## نقاط مهمة يجب تذكرها ✅


```

```text


---

## سؤال للتفكير 🤔

```
