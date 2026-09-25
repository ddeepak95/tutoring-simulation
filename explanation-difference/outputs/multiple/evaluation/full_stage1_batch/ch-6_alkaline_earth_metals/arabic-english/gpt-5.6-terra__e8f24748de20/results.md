# Stage 1: Arabic / alkaline earth metals

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "alkaline earth metals",
  "observed_topic": "Alkaline earth metals (Group 2 elements): definition, electronic configuration, physical and chemical properties, reactions, natural compounds, flame test, and applications",
  "topic_match": "on_topic",
  "reason": "The explanation thoroughly introduces and explains alkaline earth metals, their periodic table position, electron configuration, general properties, reactions, occurrence, flame colors, and practical applications.",
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
    "u12"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and list of alkaline earth metals | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Electronic configuration and typical oxidation state | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Physical properties of alkaline earth metals | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Chemical reactivity and group periodic trend | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Reactivity of alkaline earth metals with water | {"depth": "explanation"} | accurate |
| u6 | CONCEPT | Reaction of alkaline earth metals with oxygen | {"depth": "explanation"} | accurate |
| u7 | CONCEPT | Reaction of alkaline earth metals with acids | {"depth": "explanation"} | accurate |
| u8 | EXAMPLE | Natural minerals and compounds of alkaline earth metals | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | CONCEPT | Flame test colors of alkaline earth metals | {"depth": "explanation"} | contains_error |
| u10 | EXAMPLE | Practical applications of alkaline earth metals and their compounds | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u11 | STUDY_SUPPORT | Summary comparison table between alkali and alkaline earth metals | {"subtype": "recap"} | accurate |
| u12 | STUDY_SUPPORT | Closing summary of the topic | {"subtype": "recap"} | accurate |

## u1: Definition and list of alkaline earth metals

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
    "reason": "The identification of Group 2 elements, the origin of the name 'alkaline earth', and the note on radium are factually accurate.",
    "errors": []
  }
}
```

```text
الفلزات القلوية الترابية هي عناصر تقع في **المجموعة الثانية** من الجدول الدوري، أي في العمود الثاني من اليسار. سُمّيت:

- **قلوية** لأن أكاسيدها وهيدروكسيداتها تعطي محاليل قاعدية.
- **ترابية** لأن كثيرًا من مركباتها توجد في القشرة الأرضية على شكل معادن صلبة.

### عناصرها

| الرمز | العنصر |
|---|---|
| Be | البيريليوم |
| Mg | المغنيسيوم |
| Ca | الكالسيوم |
| Sr | السترونشيوم |
| Ba | الباريوم |
| Ra | الراديوم |

> الراديوم عنصر مشع ونادر، لذلك لا يُستخدم كثيرًا في التطبيقات اليومية.
```


## u2: Electronic configuration and typical oxidation state

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
    "reason": "Correctly states the general valence configuration ns^2, the tendency to lose two valence electrons, and the +2 oxidation state.",
    "errors": []
  }
}
```

```text
تمتلك جميع الفلزات القلوية الترابية **إلكترونين في مستوى الطاقة الخارجي**، لذلك يكون تركيبها الخارجي العام:

\[
ns^2
\]

ولهذا تميل إلى فقد إلكترونين لتكوين أيونات موجبة شحنتها \(+2\):

\[
M \rightarrow M^{2+} + 2e^-
\]

مثال:

\[
Mg \rightarrow Mg^{2+} + 2e^-
\]

لذلك تكون حالة التأكسد الشائعة جدًا لهذه العناصر هي:

\[
+2
\]
```


## u3: Physical properties of alkaline earth metals

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
    "reason": "The listed physical characteristics and their comparison to alkali metals are standard and correct.",
    "errors": []
  }
}
```

```text
الفلزات القلوية الترابية تشترك في عدد من الصفات:

- فلزات لامعة عند قطعها حديثًا.
- جيدة التوصيل للحرارة والكهرباء.
- أصلب وأعلى كثافة من الفلزات القلوية في المجموعة الأولى، مثل الصوديوم والبوتاسيوم.
- لها درجات انصهار أعلى عمومًا من الفلزات القلوية.
- لونها غالبًا أبيض فضي.

لكنها لا توجد غالبًا حرة في الطبيعة بسبب نشاطها الكيميائي، بل توجد في صورة مركبات.
```


## u4: Chemical reactivity and group periodic trend

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
    "reason": "Accurately compares reactivity to Group 1 metals and explains the down-the-group trend based on atomic radius and electron shielding.",
    "errors": []
  }
}
```

```text
هذه العناصر نشطة كيميائيًا، لكنها **أقل نشاطًا من الفلزات القلوية** في المجموعة الأولى؛ لأن فقد إلكترونين أصعب من فقد إلكترون واحد.

### يزداد نشاطها الكيميائي عند النزول إلى أسفل المجموعة:

\[
Be < Mg < Ca < Sr < Ba
\]

والسبب هو أن الإلكترونات الخارجية تصبح أبعد عن النواة، فيسهل فقدها.
```


## u5: Reactivity of alkaline earth metals with water

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
    "reason": "Correctly describes the variation in reactivity with water down the group, including Be passivity, Mg behavior with cold water vs steam, and gives the balanced equation for Ca with water.",
    "errors": []
  }
}
```

```text
تختلف سرعة تفاعلها مع الماء:

- **البيريليوم Be:** لا يتفاعل تقريبًا مع الماء بسبب وجود طبقة أكسيد واقية.
- **المغنيسيوم Mg:** يتفاعل ببطء مع الماء البارد، وأسرع مع الماء الساخن أو البخار.
- **الكالسيوم Ca والسترونشيوم Sr والباريوم Ba:** تتفاعل بسهولة مع الماء البارد.

مثال تفاعل الكالسيوم مع الماء:

\[
Ca + 2H_2O \rightarrow Ca(OH)_2 + H_2
\]

ينتج:
- هيدروكسيد الكالسيوم، وهو مادة قاعدية.
- غاز الهيدروجين.
```


## u6: Reaction of alkaline earth metals with oxygen

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
    "reason": "Accurately represents the oxidation reaction, the combustion observation for magnesium, and the basic character of the resulting oxides.",
    "errors": []
  }
}
```

```text
تتفاعل هذه الفلزات مع الأكسجين لتكوين أكاسيد فلزية:

\[
2Mg + O_2 \rightarrow 2MgO
\]

عند احتراق المغنيسيوم، يصدر ضوء أبيض شديد السطوع، لذلك لا يجب النظر إليه مباشرة.

أكاسيدها غالبًا قاعدية، مثل:

\[
CaO + H_2O \rightarrow Ca(OH)_2
\]

حيث يتكون هيدروكسيد الكالسيوم، وهو قاعدة.
```


## u7: Reaction of alkaline earth metals with acids

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
    "reason": "The general reaction with dilute acids producing salt and hydrogen gas, along with the reaction equation for magnesium and hydrochloric acid, is correct.",
    "errors": []
  }
}
```

```text
تتفاعل مع الأحماض المخففة مكوّنة ملحًا وغاز الهيدروجين.

مثال:

\[
Mg + 2HCl \rightarrow MgCl_2 + H_2
\]

وهنا يتكون كلوريد المغنيسيوم وغاز الهيدروجين.
```


## u8: Natural minerals and compounds of alkaline earth metals

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "موجودة في الحجر الجيري والرخام والطباشير."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "All listed mineral names and chemical formulas match their common real-world occurrences.",
    "errors": []
  }
}
```

```text
لا توجد هذه العناصر غالبًا بصورة حرة، بل في مركبات مثل:

- **كربونات الكالسيوم** \(CaCO_3\): موجودة في الحجر الجيري والرخام والطباشير.
- **كبريتات الكالسيوم** \(CaSO_4\): توجد في الجبس.
- **كلوريد المغنيسيوم** \(MgCl_2\): يوجد في ماء البحر.
- **كبريتات الباريوم** \(BaSO_4\): معدن الباريت.
- **دولوميت**: يحتوي على كربونات الكالسيوم والمغنيسيوم.
```


## u9: Flame test colors of alkaline earth metals

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
    "verdict": "contains_error",
    "reason": "Magnesium ions do not impart a characteristic color to a Bunsen burner flame in a standard flame test (the emission is in the UV range). The white light mentioned occurs upon the combustion of magnesium metal ribbon in air, not in a flame test for magnesium ions.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "| المغنيسيوم Mg | ضوء أبيض ساطع عند الاحتراق |"
          }
        ],
        "description": "Including magnesium in a flame test table and listing 'bright white light upon combustion' conflates the combustion of magnesium ribbon with a qualitative analytical flame test for metal ions. Magnesium ions do not produce a visible flame test color in a Bunsen burner flame.",
        "correction": "Magnesium does not give a characteristic color in standard flame tests (colorless / no color), whereas burning magnesium metal produces intense white light.",
        "severity": "minor"
      }
    ]
  }
}
```

```text
تتميز بعض أيونات هذه العناصر بأنها تعطي ألوانًا مميزة عند تسخينها في اللهب:

| العنصر | لون اللهب |
|---|---|
| الكالسيوم Ca | أحمر قرميدي أو برتقالي محمر |
| السترونشيوم Sr | أحمر قرمزي |
| الباريوم Ba | أخضر تفاحي |
| المغنيسيوم Mg | ضوء أبيض ساطع عند الاحتراق |

يُستخدم اختبار اللهب للمساعدة في التعرف إلى هذه العناصر في المختبر.
```


## u10: Practical applications of alkaline earth metals and their compounds

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "ضروري لبناء العظام والأسنان."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "All stated applications in biology, medicine, pyrotechnics, construction, and metallurgy are factually accurate.",
    "errors": []
  }
}
```

```text
### المغنيسيوم \(Mg\)
- يدخل في صناعة سبائك خفيفة للطائرات والسيارات.
- يستخدم في الألعاب النارية والمشاعل بسبب ضوئه الأبيض الشديد.
- عنصر ضروري للنبات؛ لأنه يدخل في تركيب الكلوروفيل.

### الكالسيوم \(Ca\)
- ضروري لبناء العظام والأسنان.
- يدخل في صناعة الإسمنت والجير.
- يستخدم هيدروكسيد الكالسيوم في معالجة المياه وصناعة الملاط.

### السترونشيوم \(Sr\)
- يستخدم في الألعاب النارية لإنتاج اللون الأحمر.

### الباريوم \(Ba\)
- تستخدم كبريتات الباريوم في بعض الفحوص الطبية للجهاز الهضمي؛ لأنها لا تذوب بسهولة ولا يمتصها الجسم.
- يستخدم في الألعاب النارية لإنتاج اللون الأخضر.

### البيريليوم \(Be\)
- يستخدم في صناعات متخصصة، مثل بعض أجزاء الطائرات والأجهزة الدقيقة.
- مركباته سامة، لذا يجب التعامل معه بحذر.
```


## u11: Summary comparison table between alkali and alkaline earth metals

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
    "reason": "The comparative properties between Group 1 and Group 2 metals are accurate.",
    "errors": []
  }
}
```

```text
| الخاصية | الفلزات القلوية | الفلزات القلوية الترابية |
|---|---|---|
| المجموعة | الأولى | الثانية |
| إلكترونات التكافؤ | 1 | 2 |
| الأيون المتكون | \(M^+\) | \(M^{2+}\) |
| النشاط الكيميائي | أعلى غالبًا | أقل نسبيًا |
| الصلابة والكثافة | أقل | أعلى عادةً |
```


## u12: Closing summary of the topic

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
    "reason": "Accurately summarizes the core points introduced earlier in the lesson.",
    "errors": []
  }
}
```

```text
الفلزات القلوية الترابية هي عناصر المجموعة الثانية، وتمتلك إلكترونين في غلافها الخارجي. لذلك تفقدهما غالبًا لتكوين أيونات موجبة ثنائية الشحنة \(M^{2+}\). وهي فلزات نشطة يزداد نشاطها كلما نزلنا إلى أسفل المجموعة، وتكوّن أكاسيد وهيدروكسيدات ذات طبيعة قاعدية. من أهم عناصرها المغنيسيوم والكالسيوم، وهما مهمان جدًا في الحياة والصناعة.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u10"
    ],
    "issue": "Unit u10 presents a list of multiple elements and their practical applications. This could either be kept as a single comparative/overview illustrative example unit of applications or divided into separate example units per element.",
    "proposed_resolution": "Kept as a single illustrative EXAMPLE unit because it constitutes a unified, structured section under the heading 'استخدامات مهمة' intended to give high school learners an overview of the group's practical significance."
  },
  {
    "unit_ids": [
      "u11"
    ],
    "issue": "Unit u11 is a comparison table with alkali metals, which could be categorized as CONCEPT (comparative chemistry concept) or STUDY_SUPPORT (recap).",
    "proposed_resolution": "Categorized as STUDY_SUPPORT with subtype 'recap' because it explicitly reviews and condenses previously covered comparative points in a quick reference table titled 'مقارنة سريعة مع الفلزات القلوية'."
  }
]
```

## Unassigned text for coverage review

```text
## الفلزات القلوية الترابية


```

```text


---

## 1. التركيب الإلكتروني


```

```text


---

## 2. الخصائص الفيزيائية


```

```text


---

## 3. النشاط الكيميائي


```

```text


---

## 4. تفاعلها مع الماء


```

```text


---

## 5. تفاعلها مع الأكسجين


```

```text


---

## 6. تفاعلها مع الأحماض


```

```text


---

## 7. أهم المركبات الموجودة في الطبيعة


```

```text


---

## 8. ألوان اللهب


```

```text


---

## 9. استخدامات مهمة


```

```text


---

## 10. مقارنة سريعة مع الفلزات القلوية


```

```text


---

## خلاصة


```
