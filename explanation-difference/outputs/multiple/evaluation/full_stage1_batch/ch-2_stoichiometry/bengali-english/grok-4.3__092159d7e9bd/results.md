# Stage 1: Bengali / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, its principles using balanced equations and mole ratios, a worked example of methane combustion, steps for solving stoichiometry problems, and industrial applications",
  "topic_match": "on_topic",
  "reason": "The response directly teaches stoichiometry by defining it, explaining its basis in balanced chemical equations and mole ratios, working through a stoichiometric calculation example, and providing a step-by-step procedure for solving problems.",
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
| u1 | CONCEPT | Definition of stoichiometry and its basis in balanced chemical equations and mole ratios | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Worked stoichiometry calculation for the combustion of methane | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | PROCEDURE | General step-by-step procedure for solving stoichiometry problems | {} | accurate |
| u4 | EXAMPLE | Industrial application of stoichiometry to calculate raw materials and product yield | {"context": "real_world", "treatment": "illustrative"} | accurate |

## u1: Definition of stoichiometry and its basis in balanced chemical equations and mole ratios

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
    "reason": "The definition of stoichiometry, its reliance on balanced chemical equations for mole ratios, and the definition of a mole with Avogadro's number are scientifically correct.",
    "errors": []
  }
}
```

```text
সহজ ভাষায় বললে, স্টোইকিওমেট্রি হলো রাসায়নিক বিক্রিয়ায় বিক্রিয়ক (যেসব পদার্থ বিক্রিয়া করে) এবং উৎপাদ (যেসব পদার্থ তৈরি হয়) এর পরিমাণের সম্পর্ক বের করার পদ্ধতি। এর মাধ্যমে আমরা হিসাব করে বলতে পারি—কতটা বিক্রিয়ক লাগবে, কতটা উৎপাদ তৈরি হবে, বা কোনোটি বেশি/কম আছে।

### মূল কথা কী?
সবকিছু নির্ভর করে **সুষম রাসায়নিক সমীকরণ** এর উপর। সমীকরণ সুষম না হলে অনুপাত ঠিক পাওয়া যায় না। সমীকরণ থেকে আমরা **মোলের অনুপাত** বের করি। মোল হলো পদার্থের একটা নির্দিষ্ট পরিমাণ (৬.০২×১০²³ কণা)।
```


## u2: Worked stoichiometry calculation for the combustion of methane

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
    "reason": "The balanced equation and the mole-mole stoichiometric calculations for 4 moles of CH4 are completely correct.",
    "errors": []
  }
}
```

```text
মিথেন গ্যাস পোড়ালে কার্বন ডাই-অক্সাইড ও পানি তৈরি হয়। সুষম সমীকরণ:

**CH₄ + 2O₂ → CO₂ + 2H₂O**

এখান থেকে মোলের অনুপাত বের করা যায়:
- ১ মোল CH₄
- ২ মোল O₂
- ১ মোল CO₂
- ২ মোল H₂O

অর্থাৎ, ১ মোল মিথেনের সাথে ঠিক ২ মোল অক্সিজেন বিক্রিয়া করে ১ মোল কার্বন ডাই-অক্সাইড ও ২ মোল পানি তৈরি করে।

**এখন হিসাব করি:**  
তোমার কাছে ৪ মোল মিথেন আছে। তাহলে:
- কত মোল অক্সিজেন লাগবে? → ৪ × ২ = ৮ মোল O₂  
- কত মোল পানি তৈরি হবে? → ৪ × ২ = ৮ মোল H₂O  
- কত মোল CO₂ তৈরি হবে? → ৪ × ১ = ৪ মোল CO₂
```


## u3: General step-by-step procedure for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The four general steps (balancing, finding mole ratios, converting using molar mass, and identifying the limiting reactant) accurately describe standard stoichiometric problem-solving.",
    "errors": []
  }
}
```

```text
### স্টোইকিওমেট্রি সমস্যা সমাধানের সাধারণ ধাপ
1. সমীকরণ সুষম করো।
2. মোলের অনুপাত বের করো (যেমন ২:১)।
3. দেওয়া তথ্য (মোল বা ভর) থেকে অজানা জিনিস বের করো। ভর-মোল রূপান্তরের জন্য মোলার ভর ব্যবহার করো।
4. যদি দুটো বিক্রিয়ক দেওয়া থাকে, তাহলে **সীমিত বিক্রিয়ক** বের করো (যেটা আগে শেষ হয়ে যাবে)।

এভাবে আমরা ভর-ভর, মোল-মোল, ভর-মোল ইত্যাদি সব ধরনের হিসাব করতে পারি।
```


## u4: Industrial application of stoichiometry to calculate raw materials and product yield

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
    "reason": "Stoichiometry is accurately identified as the quantitative method used in industrial manufacturing to determine required raw materials and expected product yields.",
    "errors": []
  }
}
```

```text
এটা শুধু পরীক্ষার জন্য নয়—বাস্তবে কারখানায় কতটা কাঁচামাল লাগবে বা কতটা পণ্য তৈরি হবে তা হিসাব করতেও ব্যবহার হয়।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Whether the text in u1 should be split into two CONCEPT units: one defining stoichiometry and another explaining the fundamental role of balanced equations and mole ratios.",
    "proposed_resolution": "Kept together as a single CONCEPT unit because the discussion of balanced equations and mole ratios directly explains the mechanism underpinning the quantitative definition of stoichiometry within the same teaching episode."
  },
  {
    "unit_ids": [
      "u3",
      "u4"
    ],
    "issue": "Whether the sentence mentioning industrial factory applications should be merged into u3 as closing context for the procedure or split into a distinct EXAMPLE unit.",
    "proposed_resolution": "Separated as an illustrative EXAMPLE (u4) because it introduces a distinct real-world application domain (factory manufacturing calculations) rather than serving as an operational step of the problem-solving procedure."
  }
]
```

## Unassigned text for coverage review

```text
প্রিয় ছাত্র/ছাত্রী,

আজ আমরা রসায়নের একটি খুব গুরুত্বপূর্ণ অধ্যায় **স্টোইকিওমেট্রি** সম্পর্কে শিখব। 
```

```text


### সহজ উদাহরণ দিয়ে বোঝাই

```

```text


কোনো উদাহরণ বা সমস্যা দিয়ে অনুশীলন করতে চাইলে বলো, আমরা একসাথে সমাধান করব!
```
