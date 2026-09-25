# Stage 1: Bengali / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry in chemistry: definition, balanced chemical equations, mole ratios, worked mass-mass calculation, key terminology (limiting/excess reagents and yields), and problem-solving strategy",
  "topic_match": "on_topic",
  "reason": "The response comprehensively explains stoichiometry for high school chemistry, covering definition, mole ratios from balanced equations, a step-by-step worked example, related concepts, and practice.",
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
| u1 | CONCEPT | Definition and etymology of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Balanced chemical equations as stoichiometric basis | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Mole ratios and their role in stoichiometry | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Worked mass-to-mass stoichiometry calculation (H2 to H2O) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | CONCEPT | Core stoichiometric concepts: limiting/excess reagents and yields | {"depth": "statement"} | accurate |
| u6 | PROCEDURE | General roadmap for solving stoichiometry problems | {} | accurate |
| u7 | STUDY_SUPPORT | Practice problem on mass-mass stoichiometry (N2 to NH3) | {"subtype": "practice_question"} | accurate |

## u1: Definition and etymology of stoichiometry

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
    "reason": "The definition and Greek etymology of stoichiometry are factually accurate.",
    "errors": []
  }
}
```

```text
## স্টয়কিওমেট্রি কী?

স্টয়কিওমেট্রি হলো রসায়নের এমন একটি শাখা যেখানে আমরা **রাসায়নিক বিক্রিয়ায় বিভিন্ন পদার্থের পরিমাণগত সম্পর্ক** নিয়ে কাজ করি। অর্থাৎ, একটি বিক্রিয়ায় কতটুকু বিক্রিয়ক (Reactant) লাগবে এবং কতটুকু উৎপাদ (Product) তৈরি হবে - তা হিসাব করাই স্টয়কিওমেট্রির কাজ।

**গ্রিক শব্দ থেকে এসেছে:**
- Stoicheion = উপাদান (Element)
- Metron = পরিমাপ (Measure)
```


## u2: Balanced chemical equations as stoichiometric basis

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
    "reason": "The role of balanced equations and interpretation of stoichiometric coefficients as molar quantities is correct.",
    "errors": []
  }
}
```

```text
## মূল ভিত্তি: ভারসাম্যপূর্ণ সমীকরণ

স্টয়কিওমেট্রি বুঝতে হলে প্রথমে দরকার একটি **balanced chemical equation**।

উদাহরণ দেখি:
$$2H_2 + O_2 \rightarrow 2H_2O$$

এখানে সহগ (coefficient) গুলো (2, 1, 2) আমাদের বলে দেয়:
- **2 mol** হাইড্রোজেন + **1 mol** অক্সিজেন → **2 mol** পানি তৈরি করে
```


## u3: Mole ratios and their role in stoichiometry

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
    "reason": "The derivation and definition of mole ratios from stoichiometric coefficients are correct.",
    "errors": []
  }
}
```

```text
## মোল অনুপাত (Mole Ratio) - স্টয়কিওমেট্রির প্রাণ

উপরের সমীকরণ থেকে আমরা পাই:

$$\frac{H_2}{O_2} = \frac{2}{1}, \quad \frac{H_2}{H_2O} = \frac{2}{2}, \quad \frac{O_2}{H_2O} = \frac{1}{2}$$

এই অনুপাতগুলো ব্যবহার করেই আমরা যেকোনো একটি পদার্থের পরিমাণ জানলে বাকিগুলো বের করতে পারি।
```


## u4: Worked mass-to-mass stoichiometry calculation (H2 to H2O)

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
    "reason": "All calculations, conversions, and reasoning steps in the worked problem are correct.",
    "errors": []
  }
}
```

```text
## সমস্যা সমাধানের ধাপসমূহ

চলো একটি উদাহরণ দিয়ে বুঝি:

**সমস্যা:** 4 gram H₂ সম্পূর্ণ বিক্রিয়া করলে কত গ্রাম H₂O তৈরি হবে?

### ধাপ ১: সমীকরণ লিখে ব্যালেন্স করো
$$2H_2 + O_2 \rightarrow 2H_2O$$

### ধাপ ২: দেওয়া ভরকে মোলে রূপান্তর করো
$$\text{মোল} = \frac{\text{ভর}}{\text{আণবিক ভর}}$$
$$n(H_2) = \frac{4g}{2 \, g/mol} = 2 \, mol$$

### ধাপ ৩: মোল অনুপাত ব্যবহার করো
সমীকরণ অনুযায়ী, 2 mol H₂ → 2 mol H₂O

তাই, 2 mol H₂ থেকে **2 mol H₂O** তৈরি হবে।

### ধাপ ৪: মোলকে আবার ভরে রূপান্তর করো
$$\text{ভর} = \text{মোল} \times \text{আণবিক ভর}$$
$$\text{ভর}(H_2O) = 2 \, mol \times 18 \, g/mol = 36 \, gram$$

**উত্তর: 36 গ্রাম পানি উৎপন্ন হবে।**
```


## u5: Core stoichiometric concepts: limiting/excess reagents and yields

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
    "reason": "The definitions of limiting reagent, excess reagent, theoretical yield, actual yield, and percentage yield formula are accurate.",
    "errors": []
  }
}
```

```text
## গুরুত্বপূর্ণ ধারণা যা জানা দরকার

| ধারণা | ব্যাখ্যা |
|---|---|
| **Limiting Reagent** | যে বিক্রিয়ক আগে শেষ হয়ে যায় এবং বিক্রিয়া থামিয়ে দেয় |
| **Excess Reagent** | যে বিক্রিয়ক অতিরিক্ত থেকে যায় |
| **Theoretical Yield** | তাত্ত্বিকভাবে যতটুকু উৎপাদ পাওয়া উচিত |
| **Actual Yield** | বাস্তবে পরীক্ষাগারে যতটুকু পাওয়া যায় |
| **Percentage Yield** | $\frac{\text{Actual Yield}}{\text{Theoretical Yield}} \times 100\%$ |
```


## u6: General roadmap for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The stoichiometric conversion flowchart (given quantity -> given moles -> target moles -> target quantity) is standard and correct.",
    "errors": []
  }
}
```

```text
## মনে রাখার সহজ কৌশল (Trick)

স্টয়কিওমেট্রি সমস্যা সমাধানের সময় সবসময় এই পথ অনুসরণ করো:

$$\text{ভর/আয়তন (দেওয়া)} \rightarrow \text{মোল (দেওয়া)} \rightarrow \text{মোল (চাওয়া)} \rightarrow \text{ভর/আয়তন (চাওয়া)}$$
```


## u7: Practice problem on mass-mass stoichiometry (N2 to NH3)

```json
{
  "attributes": {
    "subtype": "practice_question"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The equation, molecular masses, and conditions provided for the practice task are chemically accurate.",
    "errors": []
  }
}
```

```text
## অনুশীলনের জন্য একটি প্রশ্ন

তুমি নিজে চেষ্টা করো:
$$N_2 + 3H_2 \rightarrow 2NH_3$$

যদি 28 gram N₂ বিক্রিয়া করে, তাহলে কত গ্রাম NH₃ উৎপন্ন হবে?

**(Hint: N₂ এর আণবিক ভর = 28, NH₃ এর আণবিক ভর = 17)**
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2",
      "u3"
    ],
    "issue": "u2 and u3 both use the 2H2 + O2 -> 2H2O equation to develop stoichiometric foundations. They could be merged into a single concept unit covering balanced equations and mole ratios.",
    "proposed_resolution": "Separated because u2 specifically teaches how coefficients represent molar quantities, while u3 develops mole ratios as distinct relational conversion factors under its own explicit heading."
  },
  {
    "unit_ids": [
      "u6"
    ],
    "issue": "u6 is introduced with the heading 'মনে রাখার সহজ কৌশল (Trick)', which suggests STUDY_SUPPORT (study_strategy), but its content presents a reusable general step-by-step conversion pathway for solving stoichiometry problems, characteristic of PROCEDURE.",
    "proposed_resolution": "Classified as PROCEDURE because its substantive teaching job is providing the general reusable method for stoichiometry calculations."
  }
]
```

## Unassigned text for coverage review

```text
# স্টয়কিওমেট্রি (Stoichiometry) - সহজ ভাষায় ব্যাখ্যা

আচ্ছা, আজকে আমরা রসায়নের একটি গুরুত্বপূর্ণ বিষয় **স্টয়কিওমেট্রি** নিয়ে আলোচনা করব।


```

```text


তুমি কি এই সমস্যাটি নিজে সমাধান করে দেখতে চাও? আমি তোমাকে সাহায্য করতে পারি! 😊
```
