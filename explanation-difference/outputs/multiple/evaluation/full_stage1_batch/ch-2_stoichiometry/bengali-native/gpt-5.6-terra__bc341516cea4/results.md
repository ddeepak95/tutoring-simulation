# Stage 1: Bengali / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Fundamentals and calculations of stoichiometry, including mole ratios, balanced equations, molar mass, limiting reagents, and gas molar volume",
  "topic_match": "on_topic",
  "reason": "The explanation directly teaches chemical stoichiometry, including balanced equations, mole concepts, calculation procedures with worked examples, limiting reagents, and molar volume.",
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
| u1 | CONCEPT | Definition of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Role of coefficients and mole ratio in chemical equations | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Requirement of balanced chemical equations based on conservation of mass | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Definition of mole and Avogadro's number | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Definition and calculation of molar mass | {"depth": "explanation"} | accurate |
| u6 | PROCEDURE | General procedure for stoichiometric calculations | {} | accurate |
| u7 | EXAMPLE | Worked calculation: Mass of water formed from 4 g of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | EXAMPLE | Worked calculation: Mass of carbon dioxide produced from thermal decomposition of 100 g calcium carbonate | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u9 | CONCEPT | Concept and determination of limiting reagent | {"depth": "explanation"} | accurate |
| u10 | CONCEPT | Molar volume of a gas at STP | {"depth": "explanation"} | accurate |
| u11 | STUDY_SUPPORT | Formula reference card for stoichiometry | {"subtype": "recap"} | accurate |
| u12 | STUDY_SUPPORT | Summary of key takeaways for stoichiometry | {"subtype": "recap"} | accurate |

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
    "reason": "Correctly defines stoichiometry as the calculation of quantitative relationships between reactants and products.",
    "errors": []
  }
}
```

```text
রাসায়নিক **সমীকরণমিতি** (Stoichiometry) হলো রাসায়নিক বিক্রিয়ায় বিক্রিয়ক (reactant) ও উৎপাদ (product)-এর **পরিমাণগত সম্পর্ক** নিয়ে হিসাব করার পদ্ধতি। সহজভাবে বললে—

> একটি বিক্রিয়ায় কত গ্রাম পদার্থ লাগবে, কত গ্রাম উৎপন্ন হবে, বা কত মোল গ্যাস তৈরি হবে—এসব বের করাই সমীকরণমিতি।
```


## u2: Role of coefficients and mole ratio in chemical equations

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
    "reason": "Accurately explains stoichiometric coefficients and how they establish mole ratios for a chemical reaction.",
    "errors": []
  }
}
```

```text
## ১. রাসায়নিক সমীকরণ কেন গুরুত্বপূর্ণ?

ধরা যাক, হাইড্রোজেন ও অক্সিজেন বিক্রিয়া করে পানি তৈরি করে।

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

এখানে সংখ্যাগুলোকে **সহগ** (coefficient) বলে।

এর অর্থ হলো:

- 2 মোল \(H_2\)
- 1 মোল \(O_2\)
- বিক্রিয়া করে
- 2 মোল \(H_2O\) তৈরি করে।

অর্থাৎ মোলের অনুপাত:

\[
H_2 : O_2 : H_2O = 2 : 1 : 2
\]

সমীকরণমিতির সব হিসাবের মূল চাবিকাঠি হলো এই **মোল অনুপাত**।
```


## u3: Requirement of balanced chemical equations based on conservation of mass

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
    "reason": "Correctly states that atoms are conserved in chemical reactions and demonstrates checking/balancing atom counts.",
    "errors": []
  }
}
```

```text
## ২. সমীকরণ অবশ্যই সাম্যাবস্থায় (Balanced) হতে হবে

রাসায়নিক বিক্রিয়ায় কোনো পরমাণু সৃষ্টি বা ধ্বংস হয় না। তাই বিক্রিয়ার দুই পাশে প্রতিটি মৌলের পরমাণুর সংখ্যা সমান থাকতে হবে।

উদাহরণ:

\[
H_2 + O_2 \rightarrow H_2O
\]

এটি অসমতাযুক্ত, কারণ বাম পাশে অক্সিজেন 2টি, ডান পাশে 1টি।

সাম্য করলে:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

এখন—

| মৌল | বাম পাশ | ডান পাশ |
|---|---:|---:|
| H | 4 | 4 |
| O | 2 | 2 |

তাই এটি সঠিক সাম্যযুক্ত সমীকরণ।
```


## u4: Definition of mole and Avogadro's number

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
    "reason": "Accurately defines a mole and states Avogadro's constant.",
    "errors": []
  }
}
```

```text
## ৩. মোল কী?

**1 মোল** কোনো পদার্থের এমন পরিমাণ যাতে থাকে:

\[
6.02 \times 10^{23}
\]

টি কণা (পরমাণু, অণু বা আয়ন)।

এই সংখ্যাকে অ্যাভোগাড্রো সংখ্যা বলে।

উদাহরণ:

- 1 মোল কার্বন পরমাণু = \(6.02 \times 10^{23}\) টি কার্বন পরমাণু
- 1 মোল পানি = \(6.02 \times 10^{23}\) টি পানির অণু
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
    "reason": "Correctly defines molar mass, its units (g/mol), and illustrates its calculation using atomic masses.",
    "errors": []
  }
}
```

```text
## ৪. মোলার ভর

কোনো পদার্থের 1 মোলের ভরকে তার **মোলার ভর** বলে। একক: g/mol।

উদাহরণ:

### পানির মোলার ভর

\[
H_2O
\]

- H-এর পারমাণবিক ভর = 1
- O-এর পারমাণবিক ভর = 16

তাই,

\[
H_2O = (2 \times 1) + 16 = 18 \text{ g/mol}
\]

অর্থাৎ,

\[
1 \text{ mol } H_2O = 18 \text{ g}
\]

আরও কিছু উদাহরণ:

| পদার্থ | মোলার ভর |
|---|---:|
| \(H_2\) | 2 g/mol |
| \(O_2\) | 32 g/mol |
| \(CO_2\) | 44 g/mol |
| \(NaCl\) | 58.5 g/mol |
```


## u6: General procedure for stoichiometric calculations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately outlines the standard step-by-step procedure (mass to moles, mole ratio, moles to mass).",
    "errors": []
  }
}
```

```text
## ৫. সমীকরণমিতির মূল ধাপ

সাধারণত এই ক্রমে হিসাব করা হয়:

\[
\text{গ্রাম} \rightarrow \text{মোল} \rightarrow \text{মোল অনুপাত} \rightarrow \text{মোল} \rightarrow \text{গ্রাম}
\]

অর্থাৎ—

1. রাসায়নিক সমীকরণ সাম্য করো।
2. দেওয়া ভরকে মোল-এ রূপান্তর করো।
3. সমীকরণের সহগ থেকে মোল অনুপাত ব্যবহার করো।
4. প্রয়োজনীয় পদার্থের মোল বের করো।
5. দরকার হলে মোলকে গ্রামে রূপান্তর করো।
```


## u7: Worked calculation: Mass of water formed from 4 g of hydrogen

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
    "reason": "All calculations, stoichiometric ratios, formulas, and stated conditions are mathematically and chemically accurate.",
    "errors": []
  }
}
```

```text
# উদাহরণ ১: 4 গ্রাম হাইড্রোজেন থেকে কত গ্রাম পানি তৈরি হবে?

সমীকরণ:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

### ধাপ ১: \(H_2\)-এর মোল বের করি

\(H_2\)-এর মোলার ভর = 2 g/mol

\[
\text{মোল} = \frac{\text{ভর}}{\text{মোলার ভর}}
\]

\[
= \frac{4}{2} = 2 \text{ mol}
\]

অর্থাৎ 4 g হাইড্রোজেন = 2 mol \(H_2\)

### ধাপ ২: মোল অনুপাত ব্যবহার করি

সমীকরণ থেকে:

\[
2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O
\]

তাই 2 mol \(H_2\) থেকে তৈরি হবে 2 mol \(H_2O\)।

### ধাপ ৩: পানির ভর বের করি

\(H_2O\)-এর মোলার ভর = 18 g/mol

\[
\text{ভর} = \text{মোল} \times \text{মোলার ভর}
\]

\[
= 2 \times 18 = 36 \text{ g}
\]

### উত্তর:

\[
\boxed{4 \text{ g } H_2 \text{ থেকে } 36 \text{ g } H_2O \text{ তৈরি হবে}}
\]

শর্ত: অক্সিজেন পর্যাপ্ত পরিমাণে থাকতে হবে।
```


## u8: Worked calculation: Mass of carbon dioxide produced from thermal decomposition of 100 g calcium carbonate

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
    "reason": "All calculations, molar masses, and stoichiometric steps are completely correct.",
    "errors": []
  }
}
```

```text
# উদাহরণ ২: ক্যালসিয়াম কার্বোনেট উত্তপ্ত করলে কত কার্বন ডাই-অক্সাইড তৈরি হবে?

সমীকরণ:

\[
CaCO_3 \rightarrow CaO + CO_2
\]

ধরা যাক, 100 g \(CaCO_3\) উত্তপ্ত করা হলো।

### ধাপ ১: \(CaCO_3\)-এর মোলার ভর

\[
CaCO_3 = 40 + 12 + (3 \times 16)
\]

\[
= 100 \text{ g/mol}
\]

অর্থাৎ,

\[
100 \text{ g } CaCO_3 = 1 \text{ mol}
\]

### ধাপ ২: মোল অনুপাত

সমীকরণ থেকে:

\[
1 \text{ mol } CaCO_3 \rightarrow 1 \text{ mol } CO_2
\]

তাই 1 mol \(CaCO_3\) থেকে 1 mol \(CO_2\) তৈরি হবে।

### ধাপ ৩: \(CO_2\)-এর ভর

\[
CO_2 = 12 + (2 \times 16) = 44 \text{ g/mol}
\]

অতএব,

\[
1 \text{ mol } CO_2 = 44 \text{ g}
\]

### উত্তর:

\[
\boxed{100 \text{ g } CaCO_3 \text{ থেকে } 44 \text{ g } CO_2 \text{ তৈরি হবে}}
\]
```


## u9: Concept and determination of limiting reagent

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
    "reason": "Correctly defines limiting reagent and explains how it limits product yield using a clear concrete case.",
    "errors": []
  }
}
```

```text
## ৬. সীমাবদ্ধ বিক্রিয়ক (Limiting Reagent)

অনেক সময় দুটি বিক্রিয়কই দেওয়া থাকে, কিন্তু একটি পদার্থ আগে শেষ হয়ে যায়। যে পদার্থটি আগে শেষ হয়, তাকে **সীমাবদ্ধ বিক্রিয়ক** বলে।

উদাহরণ:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

ধরা যাক, আছে—

- 2 mol \(H_2\)
- 2 mol \(O_2\)

সমীকরণ অনুযায়ী 2 mol \(H_2\)-এর জন্য দরকার মাত্র 1 mol \(O_2\)।

এখানে \(H_2\) পুরোটা শেষ হয়ে যাবে, কিন্তু \(O_2\)-এর 1 mol অতিরিক্ত থাকবে। তাই—

\[
\boxed{H_2 \text{ হলো সীমাবদ্ধ বিক্রিয়ক}}
\]

এবং যত পানি তৈরি হবে, তা নির্ধারণ করবে \(H_2\)-এর পরিমাণ।
```


## u10: Molar volume of a gas at STP

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
    "reason": "Correctly states the standard molar volume of an ideal gas at classical STP (0 °C, 1 atm) as 22.4 L and applies it in a simple calculation.",
    "errors": []
  }
}
```

```text
## ৭. গ্যাসের ক্ষেত্রে মোলার আয়তন

সাধারণ তাপমাত্রা ও চাপে (STP) 1 মোল আদর্শ গ্যাসের আয়তন প্রায়:

\[
22.4 \text{ L}
\]

অর্থাৎ,

\[
1 \text{ mol gas} = 22.4 \text{ L at STP}
\]

উদাহরণ: 2 mol অক্সিজেন গ্যাসের আয়তন—

\[
2 \times 22.4 = 44.8 \text{ L}
\]
```


## u11: Formula reference card for stoichiometry

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
    "reason": "All summary formulas are algebraically correct and standard.",
    "errors": []
  }
}
```

```text
## মনে রাখার সহজ সূত্র

### মোল বের করতে:

\[
\boxed{\text{মোল} = \frac{\text{ভর}}{\text{মোলার ভর}}}
\]

### ভর বের করতে:

\[
\boxed{\text{ভর} = \text{মোল} \times \text{মোলার ভর}}
\]

### কণার সংখ্যা বের করতে:

\[
\boxed{\text{কণার সংখ্যা} = \text{মোল} \times 6.02 \times 10^{23}}
\]

### STP-তে গ্যাসের আয়তন বের করতে:

\[
\boxed{\text{আয়তন} = \text{মোল} \times 22.4 \text{ L}}
\]
```


## u12: Summary of key takeaways for stoichiometry

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
    "reason": "Accurately summarizes the core sequence and principles of stoichiometry.",
    "errors": []
  }
}
```

```text
## সংক্ষিপ্ত সারাংশ

সমীকরণমিতিতে প্রধান বিষয়গুলো হলো:

- আগে রাসায়নিক সমীকরণ সাম্য করতে হবে।
- গ্রাম থেকে মোল-এ যেতে হবে।
- সমীকরণের সহগ ব্যবহার করে মোলের অনুপাত নিতে হবে।
- তারপর প্রয়োজন অনুযায়ী গ্রাম, কণা সংখ্যা বা গ্যাসের আয়তন বের করতে হবে।
- একাধিক বিক্রিয়ক থাকলে সীমাবদ্ধ বিক্রিয়ক চিহ্নিত করতে হবে।

সবচেয়ে গুরুত্বপূর্ণ কথা:

\[
\boxed{\text{সমীকরণমিতির কেন্দ্রবিন্দু হলো “মোল অনুপাত”}}
\]
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

```text


---


```

```text


---


```

```text


---


```
