# Stage 1: Arabic / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, atomic structure, calculation of neutrons, types, applications, and chemical vs physical properties of isotopes",
  "topic_match": "on_topic",
  "reason": "The response directly and comprehensively explains isotopes, covering their definition, subatomic structure, carbon examples, neutron calculation, stability classification, practical applications, and properties.",
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
| u1 | CONCEPT | Definition of isotopes and subatomic basis of isotope formation | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparison of carbon isotopes (carbon-12, carbon-13, and carbon-14) | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u3 | EXAMPLE | Calculating the number of neutrons in a sodium-23 isotope | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | CONCEPT | Classification of isotopes into stable and radioactive | {"depth": "statement"} | accurate |
| u5 | EXAMPLE | Real-world applications of selected isotopes | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | CONCEPT | Explanation of identical chemical properties and differing physical properties in isotopes | {"depth": "explanation"} | accurate |

## u1: Definition of isotopes and subatomic basis of isotope formation

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
    "reason": "The definition and structural explanation of isotopes (same proton count, differing neutron count and mass number) are scientifically accurate.",
    "errors": []
  }
}
```

```text
## 🔹 التعريف

**النظائر** هي ذرات لنفس العنصر الكيميائي، لها **نفس العدد الذري** (نفس عدد البروتونات)، لكنها تختلف في **العدد الكتلي** (عدد النيوترونات مختلف).

بمعنى آخر:
> نفس العنصر... لكن "وزن" مختلف قليلاً!

---

## 🔹 لماذا يحدث هذا؟

تذكّر أن الذرة تتكون من:
- **بروتونات** (+) في النواة → تحدد **هوية العنصر**
- **نيوترونات** (بدون شحنة) في النواة → تحدد **الكتلة**
- **إلكترونات** (-) حول النواة

العنصر يُعرَّف بعدد بروتوناته فقط، فمثلاً أي ذرة بها 6 بروتونات هي "كربون" بالضرورة، لكن عدد النيوترونات فيها قد يتغير!
```


## u2: Comparison of carbon isotopes (carbon-12, carbon-13, and carbon-14)

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
    "reason": "The subatomic numbers (protons, neutrons, mass numbers) for Carbon-12, Carbon-13, and Carbon-14 are correct.",
    "errors": []
  }
}
```

```text
## 🔹 مثال توضيحي: الكربون

| النظير | عدد البروتونات | عدد النيوترونات | العدد الكتلي |
|--------|----------------|------------------|--------------|
| كربون-12 (¹²C) | 6 | 6 | 12 |
| كربون-13 (¹³C) | 6 | 7 | 13 |
| كربون-14 (¹⁴C) | 6 | 8 | 14 |

**لاحظ:** عدد البروتونات ثابت (6) في الثلاثة، لكن النيوترونات تختلف.
```


## u3: Calculating the number of neutrons in a sodium-23 isotope

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
    "reason": "The neutron calculation formula and the worked arithmetic for Na-23 (23 - 11 = 12) are correct.",
    "errors": []
  }
}
```

```text
## 🔹 كيف تحسب عدد النيوترونات؟

$$
\text{عدد النيوترونات} = \text{العدد الكتلي} - \text{العدد الذري}
$$

مثال: نظير الصوديوم Na-23 
- العدد الذري (Z) = 11
- العدد الكتلي (A) = 23
- عدد النيوترونات = 23 - 11 = **12**
```


## u4: Classification of isotopes into stable and radioactive

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
    "reason": "The distinction between stable and radioisotopes, along with the cited examples, is factually accurate.",
    "errors": []
  }
}
```

```text
## 🔹 أنواع النظائر

1. **نظائر مستقرة** 🟢: لا تتفكك، تبقى كما هي (مثل ¹²C, ¹³C)
2. **نظائر مشعة (غير مستقرة)** ☢️: تتفكك مع الزمن وتصدر إشعاعات (مثل ¹⁴C, اليورانيوم-235)
```


## u5: Real-world applications of selected isotopes

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
    "reason": "The listed practical uses for Carbon-14, Iodine-131, Cobalt-60, and Uranium-235 are all standard and accurate.",
    "errors": []
  }
}
```

```text
## 🔹 استخدامات النظائر في الحياة

| النظير | الاستخدام |
|--------|-----------|
| كربون-14 | تحديد عمر الآثار والمستحاثات |
| يود-131 | تشخيص وعلاج أمراض الغدة الدرقية |
| كوبالت-60 | علاج السرطان بالإشعاع |
| يورانيوم-235 | توليد الطاقة النووية |
```


## u6: Explanation of identical chemical properties and differing physical properties in isotopes

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
    "reason": "It correctly explains that identical electron configuration yields identical chemical properties, while mass differences lead to slight differences in physical properties.",
    "errors": []
  }
}
```

```text
## 💡 نقطة مهمة للتذكر

بما أن النظائر لها نفس عدد الإلكترونات (لأنها نفس العنصر)، فهي تتشابه في **خواصها الكيميائية**، لكنها تختلف قليلاً في **خواصها الفيزيائية** (مثل الكتلة والكثافة).
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Unit u3 contains a general subtraction formula followed by a specific numerical calculation. This could be split into a PROCEDURE (formula for calculating neutrons) and an EXAMPLE (sodium-23).",
    "proposed_resolution": "Kept intact as a single worked EXAMPLE unit because the formula directly sets up and frames the worked sodium problem within a single brief teaching episode."
  },
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "Unit u5 is a Markdown table listing four separate isotope applications (C-14, I-131, Co-60, U-235). Individual applications could be treated as separate EXAMPLE units, but doing so would fragment the Markdown table structure.",
    "proposed_resolution": "Kept the table intact as a single illustrative EXAMPLE unit in accordance with guidelines on avoiding table fragmentation."
  },
  {
    "unit_ids": [
      "u6"
    ],
    "issue": "Unit u6 is introduced with the heading 'نقطة مهمة للتذكر' (Important point to remember), which could suggest a STUDY_SUPPORT (recap) unit.",
    "proposed_resolution": "Classified as CONCEPT because the relationship between electron count and chemical vs. physical properties is substantive new explanatory content introduced for the first time rather than a review of previously stated points."
  }
]
```

## Unassigned text for coverage review

```text
# شرح مفهوم النظائر (Isotopes) 🧪

أهلاً بك! سأشرح لك هذا المفهوم المهم في الكيمياء بطريقة مبسطة.


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---

هل تريد مني أن أوضح لك كيفية حساب **الكتلة الذرية النسبية** من نسب وفرة النظائر؟ 😊
```
