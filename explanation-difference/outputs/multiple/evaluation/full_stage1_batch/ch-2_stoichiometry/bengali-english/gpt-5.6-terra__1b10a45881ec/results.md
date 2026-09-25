# Stage 1: Bengali / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, formulas, molar calculations, limiting reagents, and worked examples",
  "topic_match": "on_topic",
  "reason": "The explanation covers the core principles of stoichiometry, including balancing chemical equations, mole-mass conversions, molar mass, step-by-step procedures, worked stoichiometric calculations, and limiting reagents.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Balanced chemical equations and stoichiometric coefficients as mole ratios | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Definition of mole, Avogadro's number, and mole-mass conversion formula | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Definition and calculation of molar mass | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Worked calculation of water produced from 4 g of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | PROCEDURE | General step-by-step method for solving stoichiometry problems | {} | accurate |
| u7 | EXAMPLE | Worked calculation of carbon dioxide produced from decomposition of calcium carbonate | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | CONCEPT | Limiting reactant concept and identification | {"depth": "explanation"} | accurate |
| u9 | STUDY_SUPPORT | Key takeaways and schematic summary of stoichiometry | {"subtype": "recap"} | accurate |

## u1: Definition of stoichiometry

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
    "reason": "Correctly defines stoichiometry as the quantitative relationship between reactants and products in a chemical reaction.",
    "errors": []
  }
}
```

```text
স্টইকিওমেট্রি (Stoichiometry) হলো রাসায়নিক বিক্রিয়ায় বিক্রিয়ক (reactant) ও উৎপাদ (product)-এর পরিমাণগত সম্পর্ক নির্ণয়ের পদ্ধতি। সহজভাবে বললে:

> একটি বিক্রিয়ায় কত গ্রাম পদার্থ লাগবে, কত গ্রাম উৎপাদ তৈরি হবে, বা কত মোল গ্যাস উৎপন্ন হবে—এসব হিসাবই স্টইকিওমেট্রি।
```


## u2: Balanced chemical equations and stoichiometric coefficients as mole ratios

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
    "reason": "Accurately explains that stoichiometric coefficients in a balanced equation represent mole ratios.",
    "errors": []
  }
}
```

```text
## ১. রাসায়নিক সমীকরণ ব্যালান্স করা

স্টইকিওমেট্রির প্রথম শর্ত হলো **সমীকরণটি ব্যালান্সড** হতে হবে।

উদাহরণ:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

এখানে—

- 2 মোল \(H_2\) বিক্রিয়া করে
- 1 মোল \(O_2\)-এর সঙ্গে
- 2 মোল \(H_2O\) তৈরি করে

সমীকরণের সামনে থাকা সংখ্যা, যেমন 2, 1, 2—এগুলোকে **স্টইকিওমেট্রিক সহগ (coefficient)** বলে।

এগুলোকে মোলের অনুপাত হিসেবে পড়া যায়:

\[
H_2 : O_2 : H_2O = 2 : 1 : 2
\]
```


## u3: Definition of mole, Avogadro's number, and mole-mass conversion formula

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
    "reason": "Accurately defines the mole, cites Avogadro's number, and provides the formula relating mass, molar mass, and moles.",
    "errors": []
  }
}
```

```text
## ২. মোল কী?

রাসায়নিক হিসাবের মূল একক হলো **মোল**।

1 মোল কোনো পদার্থে থাকে:

\[
6.022 \times 10^{23}
\]

টি কণা (পরমাণু, অণু বা আয়ন)। এই সংখ্যাকে অ্যাভোগাড্রো সংখ্যা বলে।

তবে স্টইকিওমেট্রিতে সাধারণত গ্রাম থেকে মোল এবং মোল থেকে গ্রামে রূপান্তর করা হয়।

### গুরুত্বপূর্ণ সূত্র

\[
\text{মোলের সংখ্যা} = \frac{\text{ভর (গ্রাম)}}{\text{মোলার ভর (g/mol)}}
\]

অথবা,

\[
\text{ভর} = \text{মোল} \times \text{মোলার ভর}
\]
```


## u4: Definition and calculation of molar mass

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
    "reason": "Correctly defines molar mass as the mass of 1 mole of a substance and demonstrates how it is calculated using atomic masses.",
    "errors": []
  }
}
```

```text
## ৩. মোলার ভর কী?

কোনো পদার্থের 1 মোলের ভরকে তার **মোলার ভর** বলে।

উদাহরণ:

- \(H_2\) এর মোলার ভর = \(2 \, g/mol\)
- \(O_2\) এর মোলার ভর = \(32 \, g/mol\)
- \(H_2O\) এর মোলার ভর = \(18 \, g/mol\)

কারণ:

\[
H_2O = 2(1) + 16 = 18 \, g/mol
\]
```


## u5: Worked calculation of water produced from 4 g of hydrogen

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
    "reason": "All calculations, stoichiometric ratios, and final units are accurate.",
    "errors": []
  }
}
```

```text
# উদাহরণ ১: কত গ্রাম পানি তৈরি হবে?

প্রশ্ন: 4 g হাইড্রোজেন সম্পূর্ণভাবে অক্সিজেনের সঙ্গে বিক্রিয়া করলে কত গ্রাম পানি উৎপন্ন হবে?

সমীকরণ:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

### ধাপ ১: হাইড্রোজেনের মোল বের করি

\[
\text{মোল } H_2 = \frac{4}{2} = 2 \text{ mol}
\]

### ধাপ ২: সমীকরণ থেকে মোলের অনুপাত ব্যবহার করি

সমীকরণ অনুযায়ী:

\[
2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O
\]

অর্থাৎ 2 mol \(H_2\) থেকে 2 mol \(H_2O\) তৈরি হবে।

### ধাপ ৩: পানির ভর বের করি

\[
\text{ভর } H_2O = 2 \times 18 = 36 \, g
\]

**উত্তর: 4 g হাইড্রোজেন থেকে 36 g পানি তৈরি হবে।**
```


## u6: General step-by-step method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The outlined steps provide a standard and correct algorithm for solving stoichiometric calculations.",
    "errors": []
  }
}
```

```text
## ৪. স্টইকিওমেট্রির সাধারণ ধাপ

যেকোনো স্টইকিওমেট্রির অঙ্ক সমাধানের জন্য এই ধাপগুলো অনুসরণ করো:

1. **রাসায়নিক সমীকরণ লেখো ও ব্যালান্স করো।**
2. প্রদত্ত ভরকে **মোলে** রূপান্তর করো।
3. সমীকরণের সহগ ব্যবহার করে এক পদার্থের মোল থেকে অন্য পদার্থের **মোল** বের করো।
4. প্রয়োজন হলে মোলকে আবার **গ্রাম, অণু, বা গ্যাসের আয়তনে** রূপান্তর করো।

সংক্ষেপে:

\[
\text{গ্রাম} \rightarrow \text{মোল} \rightarrow \text{মোল অনুপাত} \rightarrow \text{গ্রাম}
\]
```


## u7: Worked calculation of carbon dioxide produced from decomposition of calcium carbonate

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
    "reason": "The molar mass calculations, mole conversions, and product mass derivation are completely accurate.",
    "errors": []
  }
}
```

```text
# উদাহরণ ২: ক্যালসিয়াম কার্বোনেটের বিয়োজন

\[
CaCO_3 \rightarrow CaO + CO_2
\]

প্রশ্ন: 100 g \(CaCO_3\) উত্তপ্ত করলে কত গ্রাম \(CO_2\) উৎপন্ন হবে?

### ধাপ ১: \(CaCO_3\)-এর মোলার ভর

\[
CaCO_3 = 40 + 12 + 3(16) = 100 \, g/mol
\]

অতএব,

\[
100 \, g \, CaCO_3 = 1 \, mol
\]

### ধাপ ২: সমীকরণের অনুপাত

\[
1 \, mol \, CaCO_3 \rightarrow 1 \, mol \, CO_2
\]

অর্থাৎ 1 mol \(CaCO_3\) থেকে 1 mol \(CO_2\) তৈরি হবে।

### ধাপ ৩: \(CO_2\)-এর ভর

\[
CO_2 = 12 + 2(16) = 44 \, g/mol
\]

সুতরাং,

\[
1 \, mol \, CO_2 = 44 \, g
\]

**উত্তর: 100 g \(CaCO_3\) থেকে 44 g \(CO_2\) উৎপন্ন হবে।**
```


## u8: Limiting reactant concept and identification

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
    "reason": "The definition of limiting reactant and the accompanying quantitative explanation identifying H2 as limiting are scientifically sound and accurate.",
    "errors": []
  }
}
```

```text
## ৫. লিমিটিং রিএজেন্ট বা সীমাবদ্ধ বিক্রিয়ক

অনেক সময় দুটি বিক্রিয়কই দেওয়া থাকে, কিন্তু একটি আগে শেষ হয়ে যায়। যে পদার্থটি আগে শেষ হয়ে বিক্রিয়া বন্ধ করে দেয়, তাকে **লিমিটিং রিএজেন্ট** বলে।

উদাহরণ:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

ধরা যাক আছে:

- 2 mol \(H_2\)
- 2 mol \(O_2\)

সমীকরণ অনুযায়ী 2 mol \(H_2\)-এর জন্য মাত্র 1 mol \(O_2\) দরকার। কিন্তু এখানে \(O_2\) আছে 2 mol।

তাই \(H_2\) আগে শেষ হবে। অর্থাৎ \(H_2\) হলো **লিমিটিং রিএজেন্ট** এবং \(O_2\) অতিরিক্ত থাকবে।
```


## u9: Key takeaways and schematic summary of stoichiometry

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
    "reason": "The summary points and boxed diagrams accurately recap the key guidelines and conceptual flowchart for stoichiometric calculations.",
    "errors": []
  }
}
```

```text
## ৬. মনে রাখার বিষয়

- সমীকরণ ব্যালান্স না করলে স্টইকিওমেট্রির হিসাব ভুল হবে।
- সমীকরণের সহগগুলো ভর নয়, **মোলের অনুপাত** বোঝায়।
- গ্রাম থেকে সরাসরি গ্রামে যাওয়া যায় না; আগে সাধারণত মোলে যেতে হয়।
- মোলার ভর বের করার সময় পর্যায় সারণির পারমাণবিক ভর ব্যবহার করতে হয়।
- লিমিটিং রিএজেন্ট থাকলে উৎপাদের পরিমাণ সেটিই নির্ধারণ করে।

---

### একটি সহজ সূত্রে পুরো ধারণা

\[
\boxed{
\text{প্রদত্ত ভর} \div \text{মোলার ভর}
\rightarrow
\text{মোল অনুপাত}
\rightarrow
\text{মোল} \times \text{মোলার ভর}
}
\]

অর্থাৎ:

\[
\boxed{\text{গ্রাম} \rightarrow \text{মোল} \rightarrow \text{অনুপাত} \rightarrow \text{গ্রাম}}
\]

স্টইকিওমেট্রি মূলত রাসায়নিক সমীকরণকে ব্যবহার করে “কতটুকু পদার্থ লাগবে বা উৎপন্ন হবে” তার হিসাব করার বিজ্ঞান।
```

## Ambiguities

```json
[]
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
