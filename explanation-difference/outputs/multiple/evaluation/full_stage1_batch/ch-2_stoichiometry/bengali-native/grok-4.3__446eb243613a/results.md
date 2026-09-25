# Stage 1: Bengali / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, balanced chemical equations, mole ratios, stoichiometric mass calculations, and limiting reactants",
  "topic_match": "on_topic",
  "reason": "The text directly explains chemical stoichiometry, including equation balancing, mole ratios, worked mass calculations, and limiting reactants.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of stoichiometry | {"depth": "statement"} | accurate |
| u2 | ANALOGY | Cake recipe analogy for balanced chemical equations | {} | accurate |
| u3 | EXAMPLE | Worked balancing of water formation reaction | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | CONCEPT | Interpreting stoichiometric coefficients as mole and mass ratios | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Worked stoichiometric mass calculation problem | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | CONCEPT | Concept of limiting reactant | {"depth": "explanation"} | accurate |
| u7 | STUDY_SUPPORT | Recap of the three pillars of stoichiometry | {"subtype": "recap"} | accurate |

## u1: Definition of stoichiometry

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
    "reason": "Correctly defines stoichiometry as the calculation of relative quantities of reactants and products in chemical reactions.",
    "errors": []
  }
}
```

```text
সমীকরণমিতি হলো রাসায়নিক বিক্রিয়ায় **“কতটা”** জিনিস লাগবে আর **“কতটা”** জিনিস তৈরি হবে, সেটা হিসাব করার বিজ্ঞান।
```


## u2: Cake recipe analogy for balanced chemical equations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "যদি তুমি একটা কেক বানাতে চাও, তাহলে রেসিপিতে লেখা থাকে—২ কাপ ময়দা + ১ কাপ চিনি + ২টা ডিম। এই অনুপাত না মানলে কেক ঠিক হবে না।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Appropriately maps ingredient proportions in a cake recipe to stoichiometric ratios in a balanced chemical equation.",
    "errors": []
  }
}
```

```text
যেমন: যদি তুমি একটা কেক বানাতে চাও, তাহলে রেসিপিতে লেখা থাকে—২ কাপ ময়দা + ১ কাপ চিনি + ২টা ডিম। এই অনুপাত না মানলে কেক ঠিক হবে না। ঠিক একইভাবে রসায়নে প্রতিটা বিক্রিয়ার একটা নির্দিষ্ট “রেসিপি” আছে, সেটাই হলো **ভারসাম্যযুক্ত রাসায়নিক সমীকরণ**।
```


## u3: Worked balancing of water formation reaction

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
    "reason": "Correctly emphasizes the need for balanced equations and demonstrates the balancing of H2 + O2 -> 2H2O by verifying atom counts on both sides.",
    "errors": []
  }
}
```

```text
যেকোনো সমীকরণমিতির হিসাব করার আগে সমীকরণকে অবশ্যই ভারসাম্য করতে হবে। 

**উদাহরণ:**  
হাইড্রোজেন গ্যাস ও অক্সিজেন গ্যাস থেকে পানি তৈরি হয়।

অসমীকরণ: H₂ + O₂ → H₂O  
ভারসাম্য সমীকরণ: **2H₂ + O₂ → 2H₂O**

এখানে:
- বাম পাশে ৪টা H ও ২টা O
- ডান পাশেও ৪টা H ও ২টা O

এখন সমীকরণ ভারসাম্য হয়ে গেছে।
```


## u4: Interpreting stoichiometric coefficients as mole and mass ratios

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
    "reason": "Accurately connects coefficients to mole ratios and converts them to mass relationships adhering to the law of conservation of mass.",
    "errors": []
  }
}
```

```text
ভারসাম্য সমীকরণের সংখ্যাগুলো (coefficients) আমাদের **অনুপাত** দেয়।

**2H₂ + O₂ → 2H₂O** সমীকরণ থেকে আমরা বলতে পারি:

- ২ মোল H₂ + ১ মোল O₂ বিক্রিয়া করে → ২ মোল H₂O তৈরি করে
- অথবা, ৪ গ্রাম H₂ + ৩২ গ্রাম O₂ → ৩৬ গ্রাম পানি তৈরি করে

(কারণ H₂-এর আণবিক ভর = ২, তাই ২ মোল = ৪ গ্রাম)
```


## u5: Worked stoichiometric mass calculation problem

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
    "reason": "The mathematical operations, stoichiometric conversions between grams and moles, and final answers are entirely correct.",
    "errors": []
  }
}
```

```text
**প্রশ্ন:** ৪ গ্রাম হাইড্রোজেন গ্যাসের সাথে কত গ্রাম অক্সিজেন বিক্রিয়া করবে এবং কত গ্রাম পানি তৈরি হবে?

**সমাধান:**

1. সমীকরণ লিখি: **2H₂ + O₂ → 2H₂O**
2. অনুপাত বের করি:
   - ২ মোল H₂ : ১ মোল O₂ : ২ মোল H₂O
3. ৪ গ্রাম H₂ = ২ মোল H₂ (কারণ ১ মোল H₂ = ২ গ্রাম)
4. অনুপাত অনুসারে:
   - ২ মোল H₂-এর জন্য লাগবে **১ মোল O₂** = ৩২ গ্রাম
   - তৈরি হবে **২ মোল H₂O** = ৩৬ গ্রাম

**উত্তর:** ৩২ গ্রাম অক্সিজেন লাগবে এবং ৩৬ গ্রাম পানি তৈরি হবে।
```


## u6: Concept of limiting reactant

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
    "reason": "Correctly defines the limiting reactant as the reactant consumed first that determines/limits the reaction.",
    "errors": []
  }
}
```

```text
যদি তোমার কাছে একটা বিক্রিয়ক বেশি থাকে আর আরেকটা কম থাকে, তাহলে যেটা আগে শেষ হয়ে যাবে, সেটাই বিক্রিয়া নিয়ন্ত্রণ করবে। একে বলে **সীমাবদ্ধ বিক্রিয়ক** (Limiting Reactant)।
```


## u7: Recap of the three pillars of stoichiometry

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
    "reason": "Accurately summarizes the essential components required for stoichiometric problem solving.",
    "errors": []
  }
}
```

```text
সমীকরণমিতি মূলত তিনটা জিনিসের উপর নির্ভর করে:
1. ভারসাম্য সমীকরণ
2. মোল অনুপাত
3. ভর ও মোলের সম্পর্ক (মোলার ভর)
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1",
      "u2"
    ],
    "issue": "Whether the cake recipe analogy should be merged into u1 as supporting elaboration of the definition of stoichiometry or separated as an independent ANALOGY unit.",
    "proposed_resolution": "Separated as an ANALOGY unit because it explicitly develops a mapping between a daily-life domain (baking proportions) and the target chemistry domain (balanced chemical equations)."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Whether u3 should be categorized as CONCEPT (explaining the necessity of balancing equations) or EXAMPLE (worked demonstration of balancing 2H2 + O2 -> 2H2O).",
    "proposed_resolution": "Categorized as EXAMPLE with worked treatment because the bulk of the unit works through a specific chemical reaction demonstrating atom conservation on both sides."
  },
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "Whether u4 should be categorized as an illustrative EXAMPLE or a CONCEPT.",
    "proposed_resolution": "Categorized as CONCEPT with explanation depth because its main pedagogical role is introducing the theoretical principle that coefficients represent mole and mass ratios, using the reaction as illustrative support."
  }
]
```

## Unassigned text for coverage review

```text
হ্যালো! আমি তোমার রসায়নের শিক্ষক। আজ আমরা খুব সহজ ভাষায় **রাসায়নিক সমীকরণমিতি** (Stoichiometry) বুঝব। 

### সমীকরণমিতি আসলে কী?

```

```text


### প্রথম ধাপ: সমীকরণ ভারসাম্য করা

```

```text


### দ্বিতীয় ধাপ: মোল অনুপাত বোঝা

```

```text


### সহজ উদাহরণ দিয়ে হিসাব করা যাক

```

```text


### আরেকটা গুরুত্বপূর্ণ কথা

```

```text


### সারকথা

```

```text


তুমি যদি এখন একটা সহজ সমস্যা সমাধান করে দেখাতে চাও, তাহলে বলো। আমি তোমার সাথে ধাপে ধাপে সমাধান করব। 

কোনো অংশ বুঝতে অসুবিধা হলে সরাসরি জিজ্ঞাসা করো!
```
