# Stage 1: Arabic / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Definition, measurement basis, periodic trends, calculation example, and distinctions of covalent radius",
  "topic_match": "on_topic",
  "reason": "The text directly and thoroughly explains the covalent radius, its definition, why and how it is determined, its periodic trends, and provides a numerical example.",
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
| u1 | CONCEPT | Definition and formula of covalent radius | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Rationale for using internuclear distance to estimate atomic radius | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Periodic trends of covalent radius | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Calculating covalent radius for H2 molecule | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | CAVEAT | Distinguishing covalent radius from ionic and metallic radii | {"subtype": "misconception"} | accurate |

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
    "reason": "Correctly defines the covalent radius for homonuclear diatomic molecules as half of the internuclear distance between two covalently bonded atoms, accompanied by the corresponding formula and schematic diagram.",
    "errors": []
  }
}
```

```text
تخيل معي ذرتين من نفس العنصر (مثل ذرتي كلور) ترتبطان معًا برابطة تساهمية لتكوين جزيء Cl₂.

**نصف القطر التساهمي** هو: نصف المسافة بين نواتي الذرتين المرتبطتين برابطة تساهمية واحدة.

---

## 📏 بشكل مبسط

```
الذرة 1 ●----●---- الذرة 2
        |←   →|
      نصف القطر التساهمي
        
    ●←――――――――→●
      المسافة الكلية بين النواتين
```

**القانون:**
$$\text{نصف القطر التساهمي} = \frac{\text{المسافة بين نواتي الذرتين المترابطتين}}{2}$$
```


## u2: Rationale for using internuclear distance to estimate atomic radius

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
    "reason": "Accurately explains that atoms lack sharp physical boundaries due to the electron cloud nature, necessitating the measurement of internuclear distances (e.g., via X-ray diffraction) to deduce atomic dimensions.",
    "errors": []
  }
}
```

```text
## 🤔 لماذا نحتاج هذا المفهوم؟

- لا يمكننا "قياس" حجم الذرة مباشرة لأنها صغيرة جدًا ولا حدود واضحة لها (السحابة الإلكترونية).
- لكن يمكننا قياس **المسافة بين نواتين** بدقة باستخدام تقنيات مثل حيود الأشعة السينية.
- لذلك، نستخدم هذه المسافة لتقدير "نصف قطر" الذرة.
```


## u3: Periodic trends of covalent radius

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
    "reason": "Accurately summarizes and explains periodic trends: covalent radius increases down a group due to the addition of electron shells, and decreases across a period due to increased effective nuclear charge.",
    "errors": []
  }
}
```

```text
| الاتجاه | التغير | السبب |
|---------|--------|-------|
| ⬇️ من أعلى لأسفل (نفس المجموعة) | **يزداد** | زيادة عدد مستويات الطاقة (الأغلفة) |
| ➡️ من اليسار لليمين (نفس الدورة) | **يقل** | زيادة الشحنة النووية تجذب الإلكترونات أكثر نحو النواة |
```


## u4: Calculating covalent radius for H2 molecule

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
    "reason": "The bond length (internuclear distance) of H2 is indeed approximately 74 pm, giving a covalent radius of approximately 37 pm.",
    "errors": []
  }
}
```

```text
في جزيء الهيدروجين H₂:
- المسافة بين نواتي ذرتي الهيدروجين = 74 بيكومتر تقريبًا
- إذن نصف القطر التساهمي للهيدروجين ≈ 37 بيكومتر
```


## u5: Distinguishing covalent radius from ionic and metallic radii

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
    "reason": "Correctly prevents the common confusion between covalent radius and other types of atomic radii (ionic and metallic radii), which depend on different bonding environments.",
    "errors": []
  }
}
```

```text
نصف القطر التساهمي **يختلف** عن:
- **نصف القطر الأيوني** (لأيونات مشحونة)
- **نصف القطر الفلزي** (للذرات في الشبكة الفلزية)

كل نوع له طريقة قياس مختلفة حسب نوع الرابطة!
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
# نصف القطر التساهمي (Covalent Radius)

## 🔍 الفكرة الأساسية


```

```text


---


```

```text


---

## 📊 كيف يتغير عبر الجدول الدوري؟


```

```text


---

## 💡 مثال توضيحي


```

```text


---

## ⚠️ ملاحظة مهمة

```

```text


---

هل تريد مني أن أوضح لك كيفية استخدام هذا المفهوم في حل مسائل أو مقارنة أحجام ذرات معينة؟ 😊
```
