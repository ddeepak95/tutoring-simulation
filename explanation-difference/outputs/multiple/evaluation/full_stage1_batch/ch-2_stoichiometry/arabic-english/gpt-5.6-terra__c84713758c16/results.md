# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, balancing equations, moles, molar mass, calculation procedure, worked examples, mole ratios, limiting reactants, percent yield, and summary",
  "topic_match": "on_topic",
  "reason": "The response comprehensively covers stoichiometry, explaining key foundational concepts (mole, molar mass, balanced equations), step-by-step problem-solving methods, worked calculation examples, mole ratios, limiting reagents, and percent yields in Arabic.",
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
    "u13"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and purpose of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Importance of balanced equations and stoichiometric coefficients | {"depth": "explanation"} | accurate |
| u3 | CAVEAT | Misconception warning against modifying chemical subscripts | {"subtype": "misconception"} | accurate |
| u4 | CONCEPT | Definition of the mole and Avogadro's number | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Definition and calculation of molar mass | {"depth": "explanation"} | accurate |
| u6 | PROCEDURE | General procedure for solving stoichiometry problems | {} | accurate |
| u7 | EXAMPLE | Worked stoichiometry problem calculating water yield from hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | EXAMPLE | Worked stoichiometry problem calculating carbon dioxide from methane combustion | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u9 | CONCEPT | Definition and determination of mole ratios | {"depth": "explanation"} | accurate |
| u10 | CONCEPT | Definition and chemical determination of the limiting reactant | {"depth": "explanation"} | accurate |
| u11 | ANALOGY | Sandwich-making analogy for the limiting reactant | {} | accurate |
| u12 | CONCEPT | Theoretical yield, actual yield, and percent yield calculation | {"depth": "explanation"} | accurate |
| u13 | STUDY_SUPPORT | Quick recap of stoichiometry problem-solving steps | {"subtype": "recap"} | accurate |

## u1: Definition and purpose of stoichiometry

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
    "reason": "The definition accurately describes stoichiometry as the study of quantitative relationships among reactants and products in chemical reactions.",
    "errors": []
  }
}
```

```text
**الستويكيومترية (Stoichiometry)** هي فرع من الكيمياء يشرح **العلاقات الكمية بين المواد المتفاعلة والنواتج** في التفاعل الكيميائي.  
بعبارة بسيطة: تساعدنا على معرفة **كمية مادة نحتاجها** أو **كمية مادة ستتكوّن** عند حدوث تفاعل.
```


## u2: Importance of balanced equations and stoichiometric coefficients

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
    "reason": "The explanation of balancing equations, conservation of atoms, and interpreting coefficients as molar ratios is chemically sound.",
    "errors": []
  }
}
```

```text
## 1. لماذا نحتاج إلى معادلة كيميائية موزونة؟

انظر إلى تفاعل تكوين الماء:

\[
H_2 + O_2 \rightarrow H_2O
\]

هذه المعادلة غير موزونة؛ لأن عدد ذرات الأكسجين ليس متساوياً:

- في اليسار: ذرتان أكسجين في \(O_2\)
- في اليمين: ذرة أكسجين واحدة في \(H_2O\)

المعادلة الموزونة هي:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

ومعناها:

- **2 مول** من غاز الهيدروجين تتفاعل مع
- **1 مول** من غاز الأكسجين لتنتج
- **2 مول** من الماء.

الأرقام الموجودة أمام الصيغ الكيميائية تسمى **المعاملات**، وهي أساس مسائل الستويكيومترية.
```


## u3: Misconception warning against modifying chemical subscripts

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
    "reason": "Correctly warns against the common student error of altering chemical subscripts when balancing reactions, noting that changing subscripts changes the chemical identity of the substance.",
    "errors": []
  }
}
```

```text
> ملاحظة مهمة: لا نغيّر الأرقام الصغيرة داخل الصيغة، مثل \(H_2O\)، لأن ذلك يغيّر المادة نفسها. نغيّر فقط المعاملات أمام المواد.
```


## u4: Definition of the mole and Avogadro's number

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
        "quote": "مثلما نستخدم “الدزينة” لعدّ 12 قطعة"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately defines the mole, Avogadro's constant (6.02 x 10^23), and gives representative particulate examples.",
    "errors": []
  }
}
```

```text
## 2. ما هو المول؟

المول هو وحدة تستخدم لقياس كمية المادة، مثلما نستخدم “الدزينة” لعدّ 12 قطعة.

لكن:

\[
1 \text{ مول} = 6.02 \times 10^{23}
\]

جسيمًا، مثل ذرات أو جزيئات أو أيونات.

هذا العدد يسمى **عدد أفوجادرو**.

مثال:

- 1 مول من ذرات الحديد = \(6.02 \times 10^{23}\) ذرة حديد.
- 1 مول من جزيئات الماء = \(6.02 \times 10^{23}\) جزيء ماء.
```


## u5: Definition and calculation of molar mass

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
    "reason": "Accurately defines molar mass, its units, and demonstrates the calculation using the molecular formula of water.",
    "errors": []
  }
}
```

```text
## 3. الكتلة المولية

**الكتلة المولية** هي كتلة مول واحد من المادة، وتقاس بوحدة:

\[
\text{غرام/مول } (g/mol)
\]

نحسبها باستخدام الكتل الذرية من الجدول الدوري.

### مثال: الكتلة المولية للماء \(H_2O\)

- كتلة الهيدروجين \(H = 1\ g/mol\)
- كتلة الأكسجين \(O = 16\ g/mol\)

\[
M(H_2O) = 2(1) + 16 = 18\ g/mol
\]

إذن كتلة مول واحد من الماء تساوي:

\[
18\ g
\]
```


## u6: General procedure for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The outlined steps follow the standard stoichiometric calculation sequence (mass to moles, mole ratio, moles to target quantity).",
    "errors": []
  }
}
```

```text
# 4. خطوات حل مسائل الستويكيومترية

في أغلب المسائل نتبع هذا المسار:

\[
\text{الكتلة} \rightarrow \text{المولات} \rightarrow \text{النسبة المولية} \rightarrow \text{المولات المطلوبة} \rightarrow \text{الكتلة}
\]

أي:

1. **وازن المعادلة الكيميائية.**
2. حوّل الكتلة المعطاة إلى عدد مولات.
3. استخدم معاملات المعادلة لإيجاد النسبة المولية.
4. حوّل عدد المولات الناتج إلى كتلة أو حجم أو عدد جسيمات، حسب المطلوب.
```


## u7: Worked stoichiometry problem calculating water yield from hydrogen

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
    "reason": "All calculations (molar masses, moles of H2, stoichiometric ratio, and final mass of H2O) are correct.",
    "errors": []
  }
}
```

```text
# مثال 1: حساب كتلة ناتج من كتلة متفاعل

لدينا التفاعل:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

إذا تفاعل **4 غرامات من الهيدروجين** بشكل كامل، فما كتلة الماء الناتجة؟

## الخطوة 1: تحويل كتلة الهيدروجين إلى مولات

الكتلة المولية للهيدروجين الجزيئي \(H_2\):

\[
M(H_2)=2\ g/mol
\]

\[
\text{عدد مولات } H_2 = \frac{4}{2}=2\ mol
\]

## الخطوة 2: استخدام النسبة المولية

من المعادلة:

\[
2H_2 \rightarrow 2H_2O
\]

النسبة بين \(H_2\) و\(H_2O\) هي:

\[
\frac{2\ mol\ H_2O}{2\ mol\ H_2}=1
\]

إذن:

\[
2\ mol\ H_2 \rightarrow 2\ mol\ H_2O
\]

## الخطوة 3: تحويل مولات الماء إلى كتلة

الكتلة المولية للماء:

\[
M(H_2O)=18\ g/mol
\]

\[
\text{كتلة الماء} = 2 \times 18 = 36\ g
\]

### الإجابة:

\[
\boxed{36\ غرامًا من الماء}
\]
```


## u8: Worked stoichiometry problem calculating carbon dioxide from methane combustion

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
    "reason": "All steps and calculations for finding the mass of CO2 produced from 16 g of CH4 are mathematically and chemically accurate.",
    "errors": []
  }
}
```

```text
# مثال 2: من كتلة مادة إلى كتلة مادة أخرى

احتراق الميثان:

\[
CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O
\]

إذا احترق \(16\ g\) من الميثان \(CH_4\)، فما كتلة ثاني أكسيد الكربون \(CO_2\) الناتجة؟

## 1. حساب مولات الميثان

الكتلة المولية للميثان:

\[
M(CH_4)=12+4(1)=16\ g/mol
\]

\[
\text{مولات } CH_4 = \frac{16}{16}=1\ mol
\]

## 2. استخدام النسبة المولية

من المعادلة:

\[
1CH_4 \rightarrow 1CO_2
\]

إذن:

\[
1\ mol\ CH_4 \rightarrow 1\ mol\ CO_2
\]

## 3. تحويل مولات \(CO_2\) إلى كتلة

\[
M(CO_2)=12+2(16)=44\ g/mol
\]

\[
\text{كتلة } CO_2=1 \times 44=44\ g
\]

### الإجابة:

\[
\boxed{44\ غرامًا من ثاني أكسيد الكربون}
\]
```


## u9: Definition and determination of mole ratios

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
    "reason": "Accurately defines mole ratio using stoichiometric coefficients from the Haber synthesis reaction.",
    "errors": []
  }
}
```

```text
# 5. النسبة المولية

النسبة المولية هي النسبة بين معاملات المواد في المعادلة الموزونة.

مثلاً في المعادلة:

\[
N_2 + 3H_2 \rightarrow 2NH_3
\]

يمكننا كتابة عدة نسب مولية، مثل:

\[
\frac{3\ mol\ H_2}{1\ mol\ N_2}
\]

أو:

\[
\frac{2\ mol\ NH_3}{3\ mol\ H_2}
\]

أو:

\[
\frac{2\ mol\ NH_3}{1\ mol\ N_2}
\]

نختار النسبة التي تساعدنا على التحويل من المادة المعطاة إلى المادة المطلوبة.
```


## u10: Definition and chemical determination of the limiting reactant

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
    "reason": "Correctly defines the limiting reactant and describes the standard method of calculating which reactant yields the least amount of product.",
    "errors": []
  }
}
```

```text
# 6. المتفاعل المحدِّد

أحيانًا تكون لدينا كميات من أكثر من متفاعل، لكن أحدها ينفد أولًا. هذا يسمى:

\[
\textbf{المتفاعل المحدِّد}
\]

وهو الذي يحدد كمية الناتج النهائي.
```

```text
في الكيمياء، نحدد المتفاعل المحدِّد بحساب كمية الناتج التي يمكن أن يعطيها كل متفاعل. المتفاعل الذي يعطي **أقل كمية من الناتج** هو المتفاعل المحدِّد.
```


## u11: Sandwich-making analogy for the limiting reactant

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "لصنع شطيرة تحتاج إلى:\n\n- شريحتين خبز\n- قطعة جبن واحدة\n\nإذا كان لديك 10 شرائح خبز و3 قطع جبن، فيمكنك صنع 3 شطائر فقط؛ لأن الجبن سينفد أولًا"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy accurately maps the concept of a limiting reagent to a familiar recipe (slices of bread and cheese determining the number of sandwiches).",
    "errors": []
  }
}
```

```text
مثال بسيط: لصنع شطيرة تحتاج إلى:

- شريحتين خبز
- قطعة جبن واحدة

إذا كان لديك 10 شرائح خبز و3 قطع جبن، فيمكنك صنع 3 شطائر فقط؛ لأن الجبن سينفد أولًا. الجبن هنا هو العامل المحدِّد.
```


## u12: Theoretical yield, actual yield, and percent yield calculation

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
    "reason": "Accurately defines theoretical and actual yields, states the percentage yield formula, and performs a correct sample calculation.",
    "errors": []
  }
}
```

```text
# 7. المردود النظري والمردود الفعلي

في التجارب الواقعية، لا نحصل غالبًا على الكمية الكاملة المتوقعة من الناتج.

- **المردود النظري:** أكبر كمية يمكن توقعها حسابيًا من المعادلة.
- **المردود الفعلي:** الكمية التي نحصل عليها فعليًا في المختبر.
- **النسبة المئوية للمردود:**

\[
\%\text{المردود}=
\frac{\text{المردود الفعلي}}{\text{المردود النظري}}
\times100
\]

مثال: إذا كان المردود النظري \(20\ g\)، لكنك حصلت فعليًا على \(15\ g\):

\[
\%\text{المردود}=\frac{15}{20}\times100=75\%
\]
```


## u13: Quick recap of stoichiometry problem-solving steps

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
    "reason": "The recap accurately synthesizes the main stoichiometric steps covered throughout the lesson.",
    "errors": []
  }
}
```

```text
# ملخص سريع

لحل أي مسألة ستويكيومترية:

1. اكتب المعادلة الكيميائية **الموزونة**.
2. حوّل المعطيات إلى **مولات**.
3. استخدم **النسبة المولية** من المعادلة.
4. حوّل النتيجة إلى الوحدة المطلوبة: غرامات، مولات، جزيئات، أو حجم غاز.
5. إذا وُجد أكثر من متفاعل، تحقق من **المتفاعل المحدِّد**.

يمكن تلخيص المسار الأساسي هكذا:

\[
\boxed{
\text{غرامات المادة المعطاة}
\rightarrow
\text{مولات}
\rightarrow
\text{نسبة مولية}
\rightarrow
\text{مولات المادة المطلوبة}
\rightarrow
\text{غرامات المادة المطلوبة}
}
\]
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2",
      "u3"
    ],
    "issue": "Whether the note warning against changing chemical subscripts in balancing reactions should be merged into the CONCEPT unit on balanced equations (u2) or split as a distinct CAVEAT unit (u3).",
    "proposed_resolution": "Split as CAVEAT (u3) because it explicitly highlights and cautions against a common student misconception."
  },
  {
    "unit_ids": [
      "u10",
      "u11"
    ],
    "issue": "Whether the sandwich analogy should be merged into the surrounding limiting reactant CONCEPT unit or separated into an ANALOGY unit.",
    "proposed_resolution": "Separated into ANALOGY (u11) and CONCEPT (u10) because the sandwich scenario is a fully developed cross-domain analogy with explicit mapping, while the surrounding text establishes the formal chemical definition and procedure."
  },
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "Whether mentioning the dozen ('الدزينة') qualifies as everyday contextualization or none.",
    "proposed_resolution": "Assigned everyday because 'الدزينة' explicitly invokes a familiar daily counting unit to make the abstract concept of the mole comprehensible."
  }
]
```

## Unassigned text for coverage review

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
