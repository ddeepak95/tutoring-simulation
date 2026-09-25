# Stage 1: Arabic / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Covalent radius: measurement challenge, definition, formula, periodic trends, and conceptual analogy",
  "topic_match": "on_topic",
  "reason": "The text explains the difficulty of measuring isolated atomic radii, defines covalent radius with its formula and an illustrative molecule, describes periodic trends down groups and across periods, and provides an analogy.",
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
| u1 | CONCEPT | Physical impossibility of measuring isolated atomic radius due to the diffuse electron cloud | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Definition, operational determination, and mathematical formula of covalent radius | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Periodic trends of covalent radius across groups and periods with physical explanations | {"depth": "explanation"} | accurate |
| u4 | ANALOGY | Analogy of compressed sponge balls to illustrate covalent bond overlap and covalent radius | {} | accurate |

## u1: Physical impossibility of measuring isolated atomic radius due to the diffuse electron cloud

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "لو كانت الذرة كرة زجاجية صلبة، لكان قياس نصف قطرها بالمسطرة سهلاً جداً!"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly explains that isolated atoms cannot have a sharply defined radius because of the probabilistic, fuzzy boundary of the electron cloud.",
    "errors": []
  }
}
```

```text
لو كانت الذرة كرة زجاجية صلبة، لكان قياس نصف قطرها بالمسطرة سهلاً جداً! لكن الذرة في الحقيقة عبارة عن نواة موجبة تدور حولها "سحابة" من الإلكترونات ليس لها حدود واضحة وثابتة (مثل سحابة الضباب). لذلك، من المستحيل قياس نصف قطر ذرة وحيدة بدقة.
```


## u2: Definition, operational determination, and mathematical formula of covalent radius

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
    "reason": "Accurately defines covalent radius as half the internuclear distance between two identical atoms joined by a single covalent bond, accompanied by the standard formula r = d/2.",
    "errors": []
  }
}
```

```text
بما أننا لا نستطيع قياس ذرة بمفردها، قرر العلماء قياسها عندما ترتبط بذرة أخرى تشبهها تماماً برابطة تساهمية (أي عندما تتشاركان الإلكترونات وتندمجان قليلاً وكأنهما تتصافحان).

**التعريف العلمي البسيط:**
> **نصف القطر التساهمي:** هو **نصف المسافة** بين نواتي ذرتين متماثلتين مرتبطتين برابطة تساهمية أحادية.

**تخيلها معي:**
1. تخيل ذرتين من الكلور ($Cl_2$) ارتبطتا معاً.
2. نقيس المسافة من مركز النواة الأولى إلى مركز النواة الثانية بأجهزة خاصة (ولنقل إنها مسافة كاملة تُسمى $d$).
3. نقسم هذه المسافة على **2**.
4. الناتج هو: **نصف القطر التساهمي** لذرة الكلور!

القانون: 
$$r = \frac{d}{2}$$
*(حيث $r$ هو نصف القطر التساهمي، و $d$ هي المسافة بين النواتين).*
```


## u3: Periodic trends of covalent radius across groups and periods with physical explanations

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "تخيل أنك ترتدي طبقة إضافية من الملابس الشتوية في كل خطوة"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly describes and explains periodic trends: covalent radius increases down a group due to the addition of principal energy levels and decreases across a period due to increasing effective nuclear charge.",
    "errors": []
  }
}
```

```text
هناك قاعدتان ذهبيتان يجب أن تتذكرهما دائماً:

#### 1. عند النزول في المجموعة (من الأعلى إلى الأسفل) ⬇️:
* **ماذا يحدث؟** **يزداد** نصف القطر التساهمي (تكبر الذرة).
* **السبب:** لأننا كلما نزلنا لأسفل، نضيف **مستويات طاقة رئيسية جديدة** للإلكترونات، فتبتعد الإلكترونات الخارجية عن النواة وتكبر الذرة (تخيل أنك ترتدي طبقة إضافية من الملابس الشتوية في كل خطوة).

#### 2. عند التحرك في الدورة (من اليسار إلى اليمين) ➡️:
* **ماذا يحدث؟** **يقل** نصف القطر التساهمي (تصغر الذرة).
* **السبب (سؤال علل مشهور):** لأننا نضيف بروتونات موجبة داخل النواة، مما يزيد من "قوة جذب النواة" للإلكترونات الخارجية (شحنة النواة الفعالة تزداد)، فتشد النواة الإلكترونات نحوها بقوة أكبر، وتنكمش الذرة قليلاً!
```


## u4: Analogy of compressed sponge balls to illustrate covalent bond overlap and covalent radius

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "تخيل كرتين من الإسفنج ضغطتهما على بعضهما حتى تداخلا قليلاً."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy accurately maps the overlapping regions of bonded atoms and taking half of the internuclear distance between their centers.",
    "errors": []
  }
}
```

```text
تخيل كرتين من الإسفنج ضغطتهما على بعضهما حتى تداخلا قليلاً. المسافة من مركز الكرة الأولى إلى مركز الثانية مقسومة على اثنين هي بالضبط فكرة نصف القطر التساهمي!
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "The chlorine (Cl2) thought experiment could alternatively be separated as an illustrative EXAMPLE unit. However, it provides no experimental or numerical data and serves directly to explain the variables in the formula r = d/2 within the same teaching sequence.",
    "proposed_resolution": "Retained the Cl2 thought experiment as supporting illustrative material within u2 to keep the definition, operational concept, and formula unified."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "The group trend and period trend could be treated as two separate CONCEPT units because they rely on different explanatory mechanisms (adding principal shells vs. increasing effective nuclear charge).",
    "proposed_resolution": "Grouped together in u3 because they are explicitly presented as paired complementary rules under a single heading addressing periodic variation of covalent radius."
  }
]
```

## Unassigned text for coverage review

```text
أهلاً بك يا بطل الكيمياء! يسعدني جداً أن أشرح لك هذا المفهوم بطريقة سهلة وممتعة. 

لكي نفهم **نصف القطر التساهمي (Covalent Radius)**، دعنا نبدأ بلغز صغير:

### المشكلة: كيف نقيس حجم الذرة؟

```

```text


---

### الحل: فكرة "المصافحة" (نصف القطر التساهمي)

```

```text


---

### كيف يتغير نصف القطر التساهمي في الجدول الدوري؟ (مهم جداً للاختبارات!)


```

```text


---

### تشبيه سريع لتتذكره دائماً:

```

```text


هل الفكرة واضحة بالنسبة لك الآن، أم تحب أن نطبق عليها بمثال بأرقام؟
```
