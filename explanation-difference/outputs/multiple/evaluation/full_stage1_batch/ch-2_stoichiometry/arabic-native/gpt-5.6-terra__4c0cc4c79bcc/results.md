# Stage 1: Arabic / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, including the mole concept, equation balancing, molar mass, mole-mass calculations, gas stoichiometry at STP, limiting reactants, and percent yield",
  "topic_match": "on_topic",
  "reason": "The response explains stoichiometry directly and comprehensively for high school chemistry, covering its foundational concepts (conservation of mass, balancing, mole ratios), standard quantitative conversions, limiting reactants, and percentage yield.",
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
    "u15"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of stoichiometry and the law of conservation of mass | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Balancing the chemical equation for water formation | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Meaning of stoichiometric coefficients as mole ratios | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | The mole concept and Avogadro's number | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Molar mass definition and calculation from periodic table atomic weights | {"depth": "explanation"} | accurate |
| u6 | EXAMPLE | Calculating the molar mass of H2O and CO2 | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | CONCEPT | Relationship and conversion between mass and moles | {"depth": "explanation"} | accurate |
| u8 | PROCEDURE | General step-by-step procedure for solving stoichiometric problems | {} | accurate |
| u9 | EXAMPLE | Worked mass-to-mass stoichiometry problem calculating water produced from hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u10 | CONCEPT | Gas stoichiometry and molar volume at STP | {"depth": "explanation"} | accurate |
| u11 | CONCEPT | Limiting reactant concept | {"depth": "explanation"} | accurate |
| u12 | ANALOGY | Sandwich-making analogy for limiting reactant | {} | accurate |
| u13 | CONCEPT | Theoretical yield, actual yield, and percent yield | {"depth": "explanation"} | accurate |
| u14 | STUDY_SUPPORT | Summary recap of core stoichiometry formulas | {"subtype": "recap"} | accurate |
| u15 | STUDY_SUPPORT | Stoichiometry roadmap study strategy | {"subtype": "study_strategy"} | accurate |

## u1: Definition of stoichiometry and the law of conservation of mass

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
    "reason": "The definition of stoichiometry and the statement and explanation of the law of conservation of mass (atoms are rearranged and conserved) are factually accurate.",
    "errors": []
  }
}
```

```text
الحسابات الكيميائية هي طريقة استخدام **المعادلات الكيميائية** لمعرفة كميات المواد المتفاعلة أو الناتجة في التفاعل، مثل: الكتلة، عدد المولات، حجم الغاز، أو عدد الجسيمات.

## 1) الفكرة الأساسية: قانون حفظ الكتلة

في أي تفاعل كيميائي:

> كتلة المواد المتفاعلة = كتلة المواد الناتجة

فالذرات لا تختفي ولا تُخلق من العدم، وإنما يعاد ترتيبها لتكوين مواد جديدة.

مثال:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

هذا يعني أن الهيدروجين والأكسجين يتفاعلان لتكوين الماء، مع بقاء عدد ذرات كل عنصر متساوياً قبل التفاعل وبعده.
```


## u2: Balancing the chemical equation for water formation

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
    "reason": "The atom counting and balancing steps for the combustion of hydrogen to form water are correct.",
    "errors": []
  }
}
```

```text
## 2) موازنة المعادلة الكيميائية

قبل إجراء أي حسابات، يجب أن تكون المعادلة **موزونة**.

مثال غير موزون:

\[
H_2 + O_2 \rightarrow H_2O
\]

نعد الذرات:

- يسار المعادلة: 2 هيدروجين، 2 أكسجين.
- يمين المعادلة: 2 هيدروجين، 1 أكسجين.

لذلك نضع معاملات مناسبة:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

الآن:

- الهيدروجين: 4 ذرات في الطرفين.
- الأكسجين: ذرتان في الطرفين.
```


## u3: Meaning of stoichiometric coefficients as mole ratios

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
    "reason": "Correctly explains stoichiometric coefficients in terms of mole proportions.",
    "errors": []
  }
}
```

```text
### معنى الأرقام في المعادلة

في المعادلة:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

النسبة المولية هي:

\[
2 : 1 : 2
\]

أي:

- 2 مول من \(H_2\)
- تتفاعل مع 1 مول من \(O_2\)
- لتنتج 2 مول من \(H_2O\)
```


## u4: The mole concept and Avogadro's number

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
    "reason": "The definition of the mole as the unit of amount of substance, Avogadro's number, and particle types are standard and correct.",
    "errors": []
  }
}
```

```text
## 3) مفهوم المول

المول هو وحدة تستخدم لقياس كمية المادة.

\[
1 \text{ مول} = 6.02 \times 10^{23}
\]

جسيماً تقريباً، وهذا العدد يسمى **عدد أفوجادرو**.

قد يكون الجسيم:

- ذرة، مثل ذرات الحديد.
- جزيء، مثل جزيئات الماء.
- أيون، مثل أيونات الصوديوم.

مثال:

\[
1 \text{ مول من } H_2O
\]

يحتوي على:

\[
6.02 \times 10^{23}
\]

جزيء ماء.
```


## u5: Molar mass definition and calculation from periodic table atomic weights

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
    "reason": "The definition, units (g/mol), and calculation method from atomic weights are accurate.",
    "errors": []
  }
}
```

```text
## 4) الكتلة المولية

الكتلة المولية هي كتلة مول واحد من المادة، ووحدتها:

\[
g/mol
\]

نحسبها بجمع الكتل الذرية للعناصر من الجدول الدوري.
```


## u6: Calculating the molar mass of H2O and CO2

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
    "reason": "Calculations of the molar masses of water (18 g/mol) and carbon dioxide (44 g/mol) are accurate.",
    "errors": []
  }
}
```

```text
### مثال: الكتلة المولية للماء \(H_2O\)

- كتلة الهيدروجين \(H = 1\)
- كتلة الأكسجين \(O = 16\)

\[
M(H_2O) = 2(1) + 16 = 18 \ g/mol
\]

إذن:

\[
1 \text{ مول ماء} = 18 \text{ غراماً}
\]

### مثال: ثاني أكسيد الكربون \(CO_2\)

\[
M(CO_2)=12+2(16)=44 \ g/mol
\]
```


## u7: Relationship and conversion between mass and moles

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
    "reason": "The mole-mass formulas (n = m/M and m = n * M) and the worked calculation for 36 g of water are correct.",
    "errors": []
  }
}
```

```text
## 5) التحويل بين الكتلة والمولات

القانون الأساسي:

\[
n = \frac{m}{M}
\]

حيث:

- \(n\): عدد المولات.
- \(m\): الكتلة بالغرام.
- \(M\): الكتلة المولية بوحدة \(g/mol\).

### مثال

احسب عدد مولات الماء في \(36 g\) من الماء.

نعرف أن:

\[
M(H_2O)=18 \ g/mol
\]

إذن:

\[
n=\frac{36}{18}=2 \ mol
\]

أي أن \(36 g\) من الماء تساوي \(2 mol\).

ولإيجاد الكتلة من عدد المولات نستخدم:

\[
m=n \times M
\]
```


## u8: General step-by-step procedure for solving stoichiometric problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The listed sequence represents the standard general methodology for stoichiometry problem solving.",
    "errors": []
  }
}
```

```text
## 6) خطوات حل مسائل الحسابات الكيميائية

في معظم المسائل اتبع هذه الخطوات:

1. اكتب المعادلة الكيميائية.
2. وازن المعادلة.
3. حوّل المعطى إلى مولات إذا كان بالجرام.
4. استخدم النسبة المولية من المعادلة الموزونة.
5. حوّل الناتج إلى الوحدة المطلوبة: جرام، حجم، عدد جسيمات… إلخ.
```


## u9: Worked mass-to-mass stoichiometry problem calculating water produced from hydrogen

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
    "reason": "All calculations (moles of H2 = 2 mol, mole ratio 2:2 giving 2 mol H2O, mass of H2O = 36 g) are factually and mathematically correct.",
    "errors": []
  }
}
```

```text
# مثال كامل: حساب كتلة ناتج

لدينا التفاعل:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

إذا تفاعل \(4 g\) من غاز الهيدروجين، فما كتلة الماء الناتجة؟

### الخطوة 1: حساب مولات الهيدروجين

الكتلة المولية للهيدروجين \(H_2\):

\[
M(H_2)=2 \ g/mol
\]

\[
n(H_2)=\frac{4}{2}=2 \ mol
\]

### الخطوة 2: استخدام النسبة المولية

من المعادلة:

\[
2 mol \ H_2 \rightarrow 2 mol \ H_2O
\]

إذن:

\[
2 mol \ H_2 \rightarrow 2 mol \ H_2O
\]

### الخطوة 3: حساب كتلة الماء

الكتلة المولية للماء:

\[
M(H_2O)=18 \ g/mol
\]

\[
m = n \times M
\]

\[
m(H_2O)=2 \times 18=36g
\]

**إذن كتلة الماء الناتجة = \(36 g\).**
```


## u10: Gas stoichiometry and molar volume at STP

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
    "reason": "The molar volume of an ideal gas at traditional STP (22.4 L/mol) and the calculation for 2 mol of O2 (44.8 L) are standard and correct.",
    "errors": []
  }
}
```

```text
## 7) الحسابات الكيميائية للغازات

عند الظروف القياسية من الحرارة والضغط (STP)، يشغل مول واحد من أي غاز حجماً مقداره تقريباً:

\[
22.4 \ L
\]

لذلك:

\[
V=n \times 22.4
\]

حيث:

- \(V\): حجم الغاز باللتر.
- \(n\): عدد المولات.

### مثال

ما حجم \(2 mol\) من غاز الأكسجين عند الظروف القياسية؟

\[
V=2 \times 22.4=44.8L
\]
```


## u11: Limiting reactant concept

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
    "reason": "The definition of the limiting reactant as the substance consumed first, which dictates product yield, is accurate.",
    "errors": []
  }
}
```

```text
## 8) المتفاعل المحدِّد

أحياناً تكون كميات المواد المتفاعلة غير متناسبة تماماً. المادة التي تنفد أولاً تسمى:

> **المتفاعل المحدِّد** أو العامل المحدِّد.

وهي التي تحدد كمية الناتج المتكون.
```

```text
في الكيمياء نطبق الفكرة نفسها: نحسب كمية الناتج التي يمكن أن يعطيها كل متفاعل، ثم الأقل هو الناتج الحقيقي المتوقع.
```


## u12: Sandwich-making analogy for limiting reactant

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "إذا كان لديك 10 أرغفة خبز و3 قطع جبن، وكل شطيرة تحتاج رغيفين وقطعة جبن واحدة، فإن الجبن هو المحدِّد"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The bread and cheese sandwich comparison correctly maps the ratio of ingredients to stoichiometric limiting reactant identification.",
    "errors": []
  }
}
```

```text
مثال: إذا كان لديك 10 أرغفة خبز و3 قطع جبن، وكل شطيرة تحتاج رغيفين وقطعة جبن واحدة، فإن الجبن هو المحدِّد؛ لأنه سينفد أولاً.
```


## u13: Theoretical yield, actual yield, and percent yield

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
    "reason": "The definitions of theoretical and actual yields, the percent yield formula, and the numerical calculation (16/20 * 100 = 80%) are completely accurate.",
    "errors": []
  }
}
```

```text
## 9) المردود النظري والمردود المئوي

### المردود النظري
هو أكبر كمية من الناتج يمكن الحصول عليها حسابياً، إذا تم التفاعل بصورة مثالية.

### المردود الفعلي
هو كمية الناتج التي نحصل عليها فعلاً في المختبر.

### المردود المئوي

\[
\text{المردود المئوي}=
\frac{\text{المردود الفعلي}}{\text{المردود النظري}}
\times 100
\]

### مثال

إذا كان المردود النظري \(20 g\)، لكن التجربة أعطت \(16 g\):

\[
\text{المردود المئوي}=
\frac{16}{20}\times100=80\%
\]
```


## u14: Summary recap of core stoichiometry formulas

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
    "reason": "All summarized formulas correctly represent the equations introduced throughout the lesson.",
    "errors": []
  }
}
```

```text
## ملخص القوانين المهمة

### عدد المولات من الكتلة

\[
n=\frac{m}{M}
\]

### الكتلة من عدد المولات

\[
m=n \times M
\]

### عدد الجسيمات

\[
N=n \times 6.02 \times 10^{23}
\]

### حجم الغاز عند الظروف القياسية

\[
V=n \times 22.4
\]

### المردود المئوي

\[
\%\text{المردود}=
\frac{\text{الفعلي}}{\text{النظري}}\times100
\]
```


## u15: Stoichiometry roadmap study strategy

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
    "reason": "The roadmap (grams -> moles -> mole ratio -> moles -> required unit) is the standard heuristic for mastering stoichiometric problem-solving.",
    "errors": []
  }
}
```

```text
## نصيحة مهمة

في الحسابات الكيميائية، لا تحفظ الحلول؛ بل اتبع دائماً هذا المسار:

\[
\text{جرامات} \rightarrow \text{مولات} \rightarrow \text{نسبة من المعادلة} \rightarrow \text{مولات} \rightarrow \text{الوحدة المطلوبة}
\]

وهذا هو المفتاح الأساسي لإتقان معظم مسائل الحسابات الكيميائية.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u11",
      "u12"
    ],
    "issue": "The sandwich analogy in Section 8 is embedded between the definition of limiting reactant and the explanation of its chemical application.",
    "proposed_resolution": "Extracted the sandwich example as an ANALOGY unit (u12) because it explicitly maps a non-chemical domain (bread and cheese assembly) to teach the target concept, leaving the surrounding chemical definition and procedure in CONCEPT unit u11 across two non-contiguous excerpts."
  },
  {
    "unit_ids": [
      "u5",
      "u6"
    ],
    "issue": "Section 4 introduces the definition of molar mass followed by two worked calculations (water and carbon dioxide).",
    "proposed_resolution": "Separated the theoretical definition of molar mass (u5, CONCEPT) from the worked example calculating specific molar masses from atomic weights (u6, EXAMPLE)."
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

```text


---


```
