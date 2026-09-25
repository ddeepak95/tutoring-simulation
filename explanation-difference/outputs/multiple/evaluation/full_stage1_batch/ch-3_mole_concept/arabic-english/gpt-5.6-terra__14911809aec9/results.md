# Stage 1: Arabic / mole concept

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "mole concept",
  "observed_topic": "mole concept, Avogadro's number, molar mass, conversions, and molar volume of gases",
  "topic_match": "on_topic",
  "reason": "The text explains the mole concept, Avogadro's number, molar mass calculations, conversions between mass, moles, and number of particles, as well as molar gas volume at STP.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9",
    "u10",
    "u11",
    "u12",
    "u13",
    "u14",
    "u15",
    "u16",
    "u17"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of the mole and Avogadro's number | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Types of representative particles measured by the mole | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u3 | CONCEPT | Why chemists need the mole | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Definition of molar mass | {"depth": "statement"} | accurate |
| u5 | EXAMPLE | Molar mass of oxygen element as atoms versus diatomic molecules | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | PROCEDURE | Calculating molar mass of compounds from chemical formulas | {} | accurate |
| u7 | EXAMPLE | Calculating the molar mass of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | EXAMPLE | Calculating the molar mass of carbon dioxide | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u9 | CONCEPT | Relationship and formula connecting mass, molar mass, and moles | {"depth": "statement"} | accurate |
| u10 | EXAMPLE | Worked example calculating moles from given mass of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u11 | EXAMPLE | Worked example calculating mass from moles of carbon dioxide | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u12 | CONCEPT | Formula relating number of particles and moles | {"depth": "statement"} | accurate |
| u13 | EXAMPLE | Worked example calculating number of molecules from moles of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u14 | EXAMPLE | Worked example calculating moles from number of iron atoms | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u15 | STUDY_SUPPORT | Conversion roadmap linking mass, moles, and particle count | {"subtype": "study_strategy"} | accurate |
| u16 | CONCEPT | Molar gas volume at STP and condition qualification | {"depth": "explanation"} | accurate |
| u17 | STUDY_SUPPORT | Summary recap and mnemonic comparison to a dozen | {"subtype": "recap"} | accurate |

## u1: Definition of the mole and Avogadro's number

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
        "quote": "“دزينة” = 12 قطعة"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly defines the mole as the unit for amount of substance and specifies Avogadro's number (6.022 × 10^23 particles).",
    "errors": []
  }
}
```

```text
المول هو **وحدة قياس كمية المادة** في الكيمياء، مثلما نستخدم:

- “دزينة” = 12 قطعة  
- “كيلومتر” = 1000 متر  
- **مول** = عدد هائل جدًا من الجسيمات

لكن بدل أن يحتوي المول على 12 جسيمًا، فإنه يحتوي على:

\[
6.022 \times 10^{23}
\]

جسيمًا، ويسمى هذا العدد **عدد أفوجادرو**.
```


## u2: Types of representative particles measured by the mole

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
    "reason": "Accurately illustrates representative particles (atoms, molecules, ions) for one mole of different chemical species.",
    "errors": []
  }
}
```

```text
يعتمد ذلك على المادة:

- مول من ذرات الحديد Fe يحتوي على \(6.022 \times 10^{23}\) ذرة حديد.
- مول من جزيئات الماء \(H_2O\) يحتوي على \(6.022 \times 10^{23}\) جزيء ماء.
- مول من أيونات الصوديوم \(Na^+\) يحتوي على \(6.022 \times 10^{23}\) أيون صوديوم.

إذن:

\[
1 \text{ mol} = 6.022 \times 10^{23} \text{ جسيمًا}
\]
```


## u3: Why chemists need the mole

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
    "reason": "Accurately justifies the practical necessity of the mole as a macroscopic bridge for submicroscopic particle counts.",
    "errors": []
  }
}
```

```text
الذرات والجزيئات صغيرة جدًا ولا يمكن عدّها واحدة واحدة. لذلك يستخدم الكيميائيون المول لربط:

1. عدد الجسيمات  
2. كتلة المادة بالجرام  
3. حجم الغاز أحيانًا
```


## u4: Definition of molar mass

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
    "reason": "Correctly defines molar mass as the mass of one mole in g/mol, obtained via atomic masses from the periodic table.",
    "errors": []
  }
}
```

```text
**الكتلة المولية** هي كتلة مول واحد من المادة، ووحدتها:

\[
\text{g/mol}
\]

نجدها من الكتلة الذرية في الجدول الدوري.
```


## u5: Molar mass of oxygen element as atoms versus diatomic molecules

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
    "reason": "Correctly determines the molar mass of O atoms (16 g/mol) and O2 molecules (32 g/mol).",
    "errors": []
  }
}
```

```text
الكتلة الذرية للأكسجين \(O\) تقريبًا:

\[
16 \text{ g/mol}
\]

أي أن:

\[
1 \text{ mol من ذرات الأكسجين} = 16 \text{ g}
\]

لكن غاز الأكسجين يوجد غالبًا على شكل \(O_2\)، لذلك:

\[
\text{الكتلة المولية لـ } O_2 = 2 \times 16 = 32 \text{ g/mol}
\]

أي:

\[
1 \text{ mol من } O_2 = 32 \text{ g}
\]
```


## u6: Calculating molar mass of compounds from chemical formulas

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correct general method for finding compound molar mass by summing the constituent atomic masses.",
    "errors": []
  }
}
```

```text
نجمع كتل الذرات الموجودة في الصيغة الكيميائية.
```


## u7: Calculating the molar mass of water

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
    "reason": "Calculations and numerical values are correct (18 g/mol).",
    "errors": []
  }
}
```

```text
- الهيدروجين \(H = 1\)
- الأكسجين \(O = 16\)

\[
M(H_2O) = 2(1) + 16 = 18 \text{ g/mol}
\]

إذن:

\[
1 \text{ mol من الماء} = 18 \text{ g}
\]
```


## u8: Calculating the molar mass of carbon dioxide

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
    "reason": "Calculations and numerical values are correct (44 g/mol).",
    "errors": []
  }
}
```

```text
- الكربون \(C = 12\)
- الأكسجين \(O = 16\)

\[
M(CO_2) = 12 + 2(16) = 44 \text{ g/mol}
\]

إذن:

\[
1 \text{ mol من } CO_2 = 44 \text{ g}
\]
```


## u9: Relationship and formula connecting mass, molar mass, and moles

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
    "reason": "Standard formula relating mass and moles is accurately stated and variables correctly defined.",
    "errors": []
  }
}
```

```text
القانون الأساسي:

\[
\text{عدد المولات} = \frac{\text{الكتلة بالجرام}}{\text{الكتلة المولية}}
\]

أو بالرموز:

\[
n = \frac{m}{M}
\]

حيث:

- \(n\): عدد المولات  
- \(m\): الكتلة بالجرام  
- \(M\): الكتلة المولية بوحدة g/mol
```


## u10: Worked example calculating moles from given mass of water

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
    "reason": "Correct calculation: 36 g / 18 g/mol = 2 mol.",
    "errors": []
  }
}
```

```text
نعرف أن:

\[
M(H_2O) = 18 \text{ g/mol}
\]

إذن:

\[
n = \frac{36}{18} = 2 \text{ mol}
\]

إذًا 36 g من الماء تساوي **2 مول**.
```


## u11: Worked example calculating mass from moles of carbon dioxide

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
    "reason": "Correct calculation: 3 mol × 44 g/mol = 132 g.",
    "errors": []
  }
}
```

```text
نعرف أن:

\[
M(CO_2) = 44 \text{ g/mol}
\]

القانون:

\[
m = n \times M
\]

\[
m = 3 \times 44 = 132 \text{ g}
\]

إذن كتلة 3 mol من \(CO_2\) هي:

\[
132 \text{ g}
\]
```


## u12: Formula relating number of particles and moles

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
    "reason": "The equation linking particle count and moles using Avogadro's number is accurately stated.",
    "errors": []
  }
}
```

```text
نستخدم عدد أفوجادرو:

\[
N_A = 6.022 \times 10^{23}
\]

القانون:

\[
\text{عدد الجسيمات} = \text{عدد المولات} \times 6.022 \times 10^{23}
\]
```


## u13: Worked example calculating number of molecules from moles of water

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
    "reason": "Calculation is accurate: 2 × 6.022 × 10^23 = 1.2044 × 10^24 molecules.",
    "errors": []
  }
}
```

```text
\[
\text{عدد الجزيئات} = 2 \times 6.022 \times 10^{23}
\]

\[
= 1.2044 \times 10^{24}
\]

إذن يوجد تقريبًا:

\[
1.204 \times 10^{24}
\]

جزيء ماء.
```


## u14: Worked example calculating moles from number of iron atoms

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
    "reason": "Calculation is accurate: 3.011 × 10^23 / 6.022 × 10^23 = 0.5 mol.",
    "errors": []
  }
}
```

```text
\[
n = \frac{\text{عدد الذرات}}{6.022 \times 10^{23}}
\]

\[
n = \frac{3.011 \times 10^{23}}{6.022 \times 10^{23}} = 0.5 \text{ mol}
\]

إذن الكمية تساوي:

\[
0.5 \text{ mol}
\]
```


## u15: Conversion roadmap linking mass, moles, and particle count

```json
{
  "attributes": {
    "subtype": "study_strategy"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "All conversion directions and operations between mass, moles, and particles are factually correct.",
    "errors": []
  }
}
```

```text
يمكنك التفكير في المول كحلقة وصل:

\[
\text{الكتلة بالجرام} \longleftrightarrow \text{المولات} \longleftrightarrow \text{عدد الجسيمات}
\]

### من الجرام إلى المول:

\[
\text{اقسم على الكتلة المولية}
\]

### من المول إلى الجرام:

\[
\text{اضرب في الكتلة المولية}
\]

### من المول إلى عدد الجسيمات:

\[
\text{اضرب في } 6.022 \times 10^{23}
\]

### من عدد الجسيمات إلى المول:

\[
\text{اقسم على } 6.022 \times 10^{23}
\]
```


## u16: Molar gas volume at STP and condition qualification

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
    "reason": "Molar volume of ideal gas at standard temperature and pressure (0 °C, 1 atm) is correctly stated as 22.4 L, with appropriate qualification.",
    "errors": []
  }
}
```

```text
عند الظروف القياسية تقريبًا في بعض المناهج، يشغل مول واحد من الغاز حجمًا مقداره:

\[
22.4 \text{ L}
\]

وذلك عند درجة حرارة \(0^\circ C\) وضغط \(1\ atm\).

مثال:

\[
1 \text{ mol من } O_2 = 22.4 \text{ L}
\]

\[
2 \text{ mol من } O_2 = 44.8 \text{ L}
\]

> ملاحظة: هذا القانون يستخدم فقط عند الظروف القياسية المحددة.
```


## u17: Summary recap and mnemonic comparison to a dozen

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "المول في الكيمياء يشبه كلمة “دزينة”، لكن بدل 12 قطعة، يحتوي على \\(6.022 \\times 10^{23}\\) جسيمًا."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately summarizes the previously taught definitions and core equations.",
    "errors": []
  }
}
```

```text
- المول هو كمية مادة تحتوي على:

\[
6.022 \times 10^{23}
\]

جسيمًا.

- الكتلة المولية هي كتلة مول واحد، ووحدتها \(g/mol\).

- أهم القوانين:

\[
n = \frac{m}{M}
\]

\[
m = n \times M
\]

\[
N = n \times 6.022 \times 10^{23}
\]

حيث \(N\) هو عدد الجسيمات.

**فكرة سهلة للحفظ:**  
المول في الكيمياء يشبه كلمة “دزينة”، لكن بدل 12 قطعة، يحتوي على \(6.022 \times 10^{23}\) جسيمًا.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u16"
    ],
    "issue": "The unit contains both the concept of molar volume at STP and a concluding limitation/qualification note (ملاحظة: هذا القانون يستخدم فقط عند الظروف القياسية المحددة).",
    "proposed_resolution": "The qualification is tied directly to the definition and use of molar volume at STP, serving as an immediate qualifying condition rather than an independently developed caveat section, so it was kept within unit u16."
  }
]
```

## Unassigned text for coverage review

```text
## مفهوم المول في الكيمياء


```

```text


---

## ما الجسيمات التي يقيسها المول؟


```

```text


---

# لماذا نحتاج إلى المول؟


```

```text
  

---

# الكتلة المولية


```

```text


### مثال 1: عنصر الأكسجين


```

```text


---

## كيف نحسب الكتلة المولية للمركبات؟


```

```text


### مثال 2: الماء \(H_2O\)


```

```text


---

### مثال 3: ثاني أكسيد الكربون \(CO_2\)


```

```text


---

# التحويل بين الكتلة والمولات


```

```text
  

---

## مثال 4: كم مولًا في 36 g من الماء؟


```

```text


---

## مثال 5: ما كتلة 3 mol من ثاني أكسيد الكربون؟


```

```text


---

# التحويل بين المولات وعدد الجسيمات


```

```text


---

## مثال 6: كم جزيئًا يوجد في 2 mol من الماء؟


```

```text


---

## مثال 7: كم مولًا في \(3.011 \times 10^{23}\) ذرة من الحديد؟


```

```text


---

# خريطة التحويل المهمة


```

```text


---

# المول والغازات


```

```text


---

## ملخص سريع


```
