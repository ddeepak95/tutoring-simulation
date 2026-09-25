# Stage 1: Bengali / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Introduction to chemical stoichiometry, covering balanced equations, mole ratios, molar mass, a worked problem, and general problem-solving steps",
  "topic_match": "on_topic",
  "reason": "The explanation directly and thoroughly teaches stoichiometry, its foundational concepts, a worked example, and a systematic procedure for solving stoichiometric problems.",
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
| u1 | CONCEPT | Definition and concept of stoichiometry explained through recipe proportions | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Role and molecular interpretation of a balanced chemical equation | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | The mole concept and mole ratios in chemical equations | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Definition and specific examples of molar mass | {"depth": "statement"} | accurate |
| u5 | EXAMPLE | Worked stoichiometric calculation of mass of water formed from hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | PROCEDURE | Step-by-step general method for solving stoichiometry problems | {} | accurate |
| u7 | STUDY_SUPPORT | Mnemonic rhyme for remembering stoichiometry problem-solving steps | {"subtype": "mnemonic"} | accurate |

## u1: Definition and concept of stoichiometry explained through recipe proportions

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
        "quote": "মনে করো, তুমি ডিমের অমলেট বানাবে। তোমার রেসিপি হলো:\n> **১টি ডিম + ১ চিমটি লবণ = ১টি অমলেট**"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The unit accurately defines stoichiometry conceptually as the quantitative calculation relating amounts of reactants and products in a chemical reaction.",
    "errors": []
  }
}
```

```text
খুব সহজ কথায়: **রাসায়নিক সমীকরণমিতি হলো রসায়নের ‘রেসিপি’ (Recipe) বা হিসাব-নিকাশ।**

মনে করো, তুমি ডিমের অমলেট বানাবে। তোমার রেসিপি হলো:
> **১টি ডিম + ১ চিমটি লবণ = ১টি অমলেট**

এখন আমি যদি তোমাকে বলি, "তোমার বন্ধুদের জন্য ৫টি অমলেট বানাতে হবে।" তুমি কিন্তু সাথে সাথেই হিসাব করে বলে দেবে— "তাহলে ৫টি ডিম আর ৫ চিমটি লবণ লাগবে!" 

এই যে তুমি আগে থেকেই হিসাব করে ফেললে যে কতটুকু উৎপাদ (অমলেট) পেতে হলে ঠিক কতটুকু বিক্রিয়ক (ডিম ও লবণ) লাগবে—ঠিক এই হিসাবটাই রসায়নে যখন পরমাণু বা অণুর ক্ষেত্রে করা হয়, তাকে বলে **রাসায়নিক সমীকরণমিতি**।
```


## u2: Role and molecular interpretation of a balanced chemical equation

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
    "reason": "Correctly states the necessity of balanced equations in stoichiometry and gives the accurate molecular ratio for the formation of water.",
    "errors": []
  }
}
```

```text
#### ক) সমতাকৃত সমীকরণ (Balanced Equation):
এটা হলো রসায়নের মূল রেসিপি। সমীকরণটি ব্যালেন্স বা সমতা করা না থাকলে কিন্তু হিসাব ভুল হবে! 
যেমন: পানি তৈরির বিক্রিয়া—
$$2H_2 + O_2 \rightarrow 2H_2O$$
এর মানে হলো: **২ অণু হাইড্রোজেন** গ্যাসের সাথে **১ অণু অক্সিজেন** গ্যাস মিলে **২ অণু পানি** তৈরি করে।
```


## u3: The mole concept and mole ratios in chemical equations

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
        "quote": "দোকানে গিয়ে যেমন আমরা ১২টি ডিম না বলে ‘১ ডজন’ বলি"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately introduces the mole as a counting unit for particles and correctly explains how stoichiometric coefficients represent mole ratios.",
    "errors": []
  }
}
```

```text
#### খ) মোল (Mole) — রসায়নের ‘ডজন’:
দোকানে গিয়ে যেমন আমরা ১২টি ডিম না বলে ‘১ ডজন’ বলি, রসায়নে বিজ্ঞানীদের পরমাণু বা অণু মাপার একক হলো **‘মোল’**। 
উপরের সমীকরণটাকে আমরা মোলের ভাষায় বলতে পারি:
> **২ মোল $H_2$ + ১ মোল $O_2$ = ২ মোল $H_2O$**
```


## u4: Definition and specific examples of molar mass

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
    "reason": "Accurately defines molar mass as the mass in grams of one mole of a substance and provides correct molar masses for H2, O2, and H2O.",
    "errors": []
  }
}
```

```text
#### গ) মোলার ভর (Molar Mass):
১ মোল পদার্থের গ্রাম এককে ভর। 
যেমন: 
* ১ মোল হাইড্রোজেনের ($H_2$) ভর = $2$ গ্রাম।
* ১ মোল অক্সিজেনের ($O_2$) ভর = $32$ গ্রাম।
* ১ মোল পানির ($H_2O$) ভর = $18$ গ্রাম।
```


## u5: Worked stoichiometric calculation of mass of water formed from hydrogen

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
    "reason": "The reaction stoichiometry, molar mass conversions, and unitary calculation are all factually and mathematically correct.",
    "errors": []
  }
}
```

```text
**প্রশ্ন:** ৪ গ্রাম হাইড্রোজেন ($H_2$) গ্যাস পর্যাপ্ত অক্সিজেনের সাথে বিক্রিয়া করলে কত গ্রাম পানি ($H_2O$) তৈরি হবে?

**সমাধানের ধাপগুলো দেখো (খুবই সহজ ঐকিক নিয়ম):**

**ধাপ ১: সমীকরণ লেখা ও সমতা করা**
$$2H_2 + O_2 \rightarrow 2H_2O$$

**ধাপ ২: গ্রাম ভর হিসাব করা**
* হাইড্রোজেনের ভর = $2 \times (1 \times 2) = 4$ গ্রাম
* পানির ভর = $2 \times (1 \times 2 + 16) = 2 \times 18 = 36$ গ্রাম

**ধাপ ৩: এবার ঐকিক নিয়মে হিসাব করো**
সমীকরণ থেকে আমরা দেখতে পাচ্ছি:
> ৪ গ্রাম $H_2$ থেকে পানি পাওয়া যায় = **৩৬ গ্রাম**।

ব্যস! কত সহজে উত্তর বের হয়ে গেল! তোমাকে আলাদা করে কোনো জটিল হিসাবও করতে হলো না।
```


## u6: Step-by-step general method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The four steps accurately describe the standard algorithm for stoichiometric problem solving.",
    "errors": []
  }
}
```

```text
### ৪. শিক্ষকের স্পেশাল টিপস (যেকোনো অংক সমাধানের গোপন সূত্র):

পরীক্ষায় যখনই সমীকরণমিতির কোনো অংক আসবে, মনে মনে এই ৪টি ধাপ মনে রাখবে:

1. **সমীকরণ লিখবে এবং ব্যালেন্স করবে।**
2. প্রশ্নে যার পরিমাণ দেওয়া আছে, তাকে **‘মোলে’ (Mole)** রূপান্তর করবে।
3. সমীকরণের অনুপাত দেখে নির্ণেয় পদার্থের **মোল সংখ্যা** বের করবে।
4. সবশেষে সেই মোলকে প্রশ্নে যা চেয়েছে (গ্রামে নাকি লিটারে) তাতে রূপান্তর করে নেবে।
```


## u7: Mnemonic rhyme for remembering stoichiometry problem-solving steps

```json
{
  "attributes": {
    "subtype": "mnemonic"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The mnemonic correctly represents the sequence of conversions required in stoichiometry.",
    "errors": []
  }
}
```

```text
> **সংক্ষেপে মনে রাখার ছন্দ:**  
> দেওয়া আছে গ্রামে $\rightarrow$ নাও তাকে মোলে $\rightarrow$ অনুপাত করো সমীকরণ দেখে $\rightarrow$ রূপান্তর করো নিজের মতো করে!
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Unit u1 can be interpreted as either a CONCEPT unit defining stoichiometry or an ANALOGY unit mapping an omelette recipe to chemical reactants and products.",
    "proposed_resolution": "Classified as CONCEPT because its primary teaching function in the response is addressing the section heading '১. সমীকরণমিতি আসলে কী?' to define and introduce the concept of stoichiometry."
  },
  {
    "unit_ids": [
      "u2",
      "u3",
      "u4"
    ],
    "issue": "Section 2 introduces three foundational keys under a shared umbrella heading. They could either be grouped into a single multi-concept unit or separated into individual concepts.",
    "proposed_resolution": "Separated into three distinct CONCEPT units (u2 for balanced equations, u3 for mole ratios, and u4 for molar mass) because each introduces and explains a distinct chemical concept with its own definition and examples."
  },
  {
    "unit_ids": [
      "u6",
      "u7"
    ],
    "issue": "The mnemonic in u7 immediately follows the four procedural steps in u6 under Section 4 and could be seen as supporting text within that procedure rather than an independent unit.",
    "proposed_resolution": "Split u7 as a distinct STUDY_SUPPORT (mnemonic) unit because it is explicitly introduced as a separate learning aid ('সংক্ষেপে মনে রাখার ছন্দ:')."
  }
]
```

## Unassigned text for coverage review

```text
হ্যালো! কেমন আছো? রসায়ন বিষয়টাকে অনেকে একটু ভয় পায়, কিন্তু সত্যি বলতে রসায়ন আসলে রান্নাবান্নার মতোই মজার একটা বিষয়! 

আজকে আমরা রসায়নের খুবই গুরুত্বপূর্ণ এবং মজার একটা টপিক নিয়ে কথা বলব, যার নাম **“রাসায়নিক সমীকরণমিতি” (Stoichiometry)**। নামটা শুনে বেশ কঠিন আর ভারী মনে হলেও, আসল ব্যাপারটা কিন্তু দারুণ সহজ! 

চলো, একদম সহজ করে বিষয়টা বুঝে নেওয়া যাক।

---

### ১. সমীকরণমিতি আসলে কী?

```

```text


---

### ২. সমীকরণমিতির ৩টি মূল চাবিকাঠি:

সমীকরণমিতির অংক বা হিসাবগুলো পানির মতো সহজ করার জন্য তোমাকে ৩টি জিনিস মাথায় রাখতে হবে:


```

```text


---

### ৩. চলো একটা ছোট উদাহরণ দিয়ে বুঝে নিই!


```

```text


---


```

```text


---

**শেষ কথা:**
রাসায়নিক সমীকরণমিতি মোটেও কোনো ভয়ের বিষয় নয়, এটা স্রেফ ক্লাস ফাইভের **ঐকিক নিয়ম**; শুধু উপাদানগুলো চাল-ডালের বদলে হাইড্রোজেন, অক্সিজেন বা নাইট্রোজেন! 

তোমার কি এই বিষয়ে কোনো জায়গায় বুঝতে সমস্যা হচ্ছে? কোনো নির্দিষ্ট অংক নিয়ে কি কনফিউশন আছে? আমাকে নিঃসংকোচে বলতে পারো, আমি আবার বুঝিয়ে দেব!
```
