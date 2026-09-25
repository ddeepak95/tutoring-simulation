# Stage 1: Bengali / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, balanced equations, step-by-step problem-solving method, and a worked example",
  "topic_match": "on_topic",
  "reason": "The explanation directly introduces stoichiometry, explains the role of balanced chemical equations, provides a step-by-step procedure for calculations, and demonstrates it with a worked example.",
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
| u1 | CONCEPT | Definition and etymological origin of stoichiometry | {"depth": "statement"} | accurate |
| u2 | ANALOGY | Tea recipe analogy for stoichiometric proportions | {} | accurate |
| u3 | CONCEPT | Balanced chemical equations as the foundation of stoichiometry | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Water formation reaction illustrating molecular, molar, and mass relationships | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u5 | PROCEDURE | Four-step general method for solving stoichiometry problems | {} | accurate |
| u6 | EXAMPLE | Worked calculation of water produced from 8 g of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | CONCEPT | Molar relationships at STP and the mole bridge concept | {"depth": "statement"} | accurate |

## u1: Definition and etymological origin of stoichiometry

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
    "reason": "Correctly defines stoichiometry and its Greek etymology (stoicheion = element, metron = measure).",
    "errors": []
  }
}
```

```text
গ্রিক শব্দ *Stoicheion* (মৌল) এবং *Metron* (পরিমাপ) থেকে এই শব্দের উৎপত্তি। 

সহজ কথায়: **কোনো রাসায়নিক বিক্রিয়ায় কতটুকু বিক্রিয়ক (Reactant) ব্যবহার করলে কতটুকু উৎপাদ (Product) তৈরি হবে—তার হিসাব-নিকাশ করাই হলো স্টয়কিওমেট্রি।**
```


## u2: Tea recipe analogy for stoichiometric proportions

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "১ কাপ দুধের চায়ের রেসিপি হলো: \n> *১ কাপ দুধ + ১ চামচ চিনি + ১ চামচ চা পাতা = ১ কাপ স্পেশাল চা*"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately maps the fixed proportions of a recipe scaled by unitary method to stoichiometric ratios in chemical reactions.",
    "errors": []
  }
}
```

```text
> **চায়ের উদাহরণ দিয়ে বুঝি:**
> ধরো, ১ কাপ দুধের চায়ের রেসিপি হলো: 
> *১ কাপ দুধ + ১ চামচ চিনি + ১ চামচ চা পাতা = ১ কাপ স্পেশাল চা*
> এখন তোমাকে যদি বলি **৫ কাপ চা** বানাতে হবে, তুমি নিশ্চয়ই বলবে:
> *৫ কাপ দুধ + ৫ চামচ চিনি + ৫ চামচ চা পাতা লাগবে।*
> 
> রসায়নে এই সাধারণ ঐকিক নিয়মের হিসাবটাই হলো স্টয়কিওমেট্রি!
```


## u3: Balanced chemical equations as the foundation of stoichiometry

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
    "reason": "Accurately explains that chemical equations must be balanced for stoichiometry because atoms are neither created nor destroyed according to the law of conservation of mass.",
    "errors": []
  }
}
```

```text
### ২. স্টয়কিওমেট্রির মূল ভিত্তি: সমতাকৃত সমীকরণ (Balanced Equation)
স্টয়কিওমেট্রি করার প্রথম এবং প্রধান শর্ত হলো—রাসায়নিক সমীকরণটির **সমতাকরণ (Balance)** করা থাকতে হবে। কারণ *ভরের নিত্যতা সূত্র* অনুযায়ী পরমাণু কখনো ধ্বংস বা সৃষ্টি হয় না।
```


## u4: Water formation reaction illustrating molecular, molar, and mass relationships

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
    "reason": "Correctly calculates the molecular, molar, and gram-mass relationships for the formation of water, demonstrating conservation of mass.",
    "errors": []
  }
}
```

```text
একটি সহজ সমীকরণ দেখা যাক:
$$2H_2 + O_2 \rightarrow 2H_2O$$

এই সমীকরণটি আমাদের কী তথ্য দিচ্ছে?
* **অণু হিসেবে:** ২ অণু হাইড্রোজেন ($H_2$) + ১ অণু অক্সিজেন ($O_2$) মিলে তৈরি করে ২ অণু পানি ($H_2O$)।
* **মোল হিসেবে (সবচেয়ে গুরুত্বপূর্ণ):** **২ মোল** $H_2$ + **১ মোল** $O_2$ মিলে তৈরি করে **২ মোল** $H_2O$।
* **ভর হিসেবে:**
  * ২ মোল $H_2 = 2 \times 2 = 4\text{ g}$
  * ১ মোল $O_2 = 1 \times 32 = 32\text{ g}$
  * ২ মোল $H_2O = 2 \times 18 = 36\text{ g}$
  *(খেয়াল করে দেখো: বিক্রিয়কের মোট ভর $4+32 = 36\text{ g}$, এবং উৎপাদের ভরও $36\text{ g}$!)*
```


## u5: Four-step general method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Provides a standard and correct general procedural sequence for stoichiometric problem solving: balance equation, convert given to moles, apply mole ratio, and convert moles to desired unit.",
    "errors": []
  }
}
```

```text
### ৩. স্টয়কিওমেট্রির অংক করার ৪টি জাদুকরী ধাপ:

যেকোনো গাণিতিক সমস্যা সমাধান করতে এই ধাপগুলো মনে রাখবে:

1. **ধাপ ১:** সঠিক রাসায়নিক সমীকরণটি লেখো এবং সেটির **সমতাকরণ (Balance)** করো।
2. **ধাপ ২:** প্রশ্নে যে মানটি দেওয়া আছে (যেমন: গ্রামে ভর, বা লিটারে আয়তন), সেটিকে **মোলে (Mole)** রূপান্তর করো।
3. **ধাপ ৩:** সমীকরণের অনুপাত (Mole Ratio) দেখে উৎপাদের মোল সংখ্যা বের করো।
4. **ধাপ ৪:** উৎপাদের মোল সংখ্যাকে প্রশ্নে যা চেয়েছে (গ্রাম বা লিটার বা অণুর সংখ্যা) তাতে রূপান্তর করো।
```


## u6: Worked calculation of water produced from 8 g of hydrogen

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
    "reason": "The calculation correctly uses stoichiometry to determine that 8 g of H2 produces 72 g of H2O.",
    "errors": []
  }
}
```

```text
### ৪. চলো একটা উদাহরণ সমাধান করি!

**প্রশ্ন:** *৮ গ্রাম হাইড্রোজেন গ্যাস ($H_2$) পর্যাপ্ত অক্সিজেনের সাথে বিক্রিয়া করলে কত গ্রাম পানি ($H_2O$) তৈরি হবে?*

**সমাধান:**

* **ধাপ ১ (সমীকরণ):** $2H_2 + O_2 \rightarrow 2H_2O$
* **ধাপ ২ (মোলার ভর বের করা):**
  * $H_2$-এর মোলার ভর = $2\text{ g/mol}$
  * সমীকরণ অনুযায়ী, $2$ মোল $H_2 = 2 \times 2\text{ g} = 4\text{ g}$
  * এবং $2$ মোল পানি ($H_2O$) = $2 \times 18\text{ g} = 36\text{ g}$

* **ধাপ ৩ (ঐকিক নিয়ম):**
  * সমীকরণ মতে, $4\text{ g } H_2$ থেকে পানি পাওয়া যায় = $36\text{ g}$
  * সুতরাং, $1\text{ g } H_2$ থেকে পানি পাওয়া যায় = $\frac{36}{4}\text{ g}$
  * সুতরাং, $8\text{ g } H_2$ থেকে পানি পাওয়া যায় = $\frac{36 \times 8}{4} = 72\text{ g}$

**উত্তর:** ৭২ গ্রাম পানি তৈরি হবে! দেখলে, কত সহজ?
```


## u7: Molar relationships at STP and the mole bridge concept

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
    "reason": "Accurately states Avogadro's number for 1 mole, the molar volume of an ideal gas at STP (22.4 L), and the role of the mole concept as a bridge between mass, volume, and particle count.",
    "errors": []
  }
}
```

```text
### মনে রাখার মতো কিছু তথ্য (STP-তে):
* **১ মোল** যেকোনো পরমাণু/অণু = $6.022 \times 10^{23}$ টি কণা (অ্যাভোগাড্রো সংখ্যা)।
* **১ মোল** গ্যাস প্রমাণ তাপমাত্রা ও চাপে (STP) = **২২.৪ লিটার** জায়গা দখল করে।

স্টয়কিওমেট্রি মূলত **মোল (Mole)**-কে সেতু হিসেবে ব্যবহার করে ভর, আয়তন এবং কণার সংখ্যার মধ্যে সম্পর্ক তৈরি করে।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u7"
    ],
    "issue": "u7 is introduced with 'মনে রাখার মতো কিছু তথ্য' ('Points to remember'), which could suggest a STUDY_SUPPORT recap. However, Avogadro's number and molar volume at STP are defined here for the first time in the text rather than summarized from earlier sections.",
    "proposed_resolution": "Classified as CONCEPT with depth 'statement' because it introduces new factual definitions rather than purely summarizing previously taught concepts."
  }
]
```

## Unassigned text for coverage review

```text
হ্যালো! রসায়নের অন্যতম মজার এবং গুরুত্বপূর্ণ একটি বিষয় হলো **স্টয়কিওমেট্রি (Stoichiometry)**, যাকে বাংলায় আমরা **"রাসায়নিক গণনা"** বলতে পারি। 

ভয় পাওয়ার কিছু নেই, এটা আসলে রান্নার রেসিপির মতো সহজ! চলো, খুব সহজভাবে এটা বুঝে নেওয়া যাক।

---

### ১. স্টয়কিওমেট্রি আসলে কী?

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


তোমার কি এই বিষয়টি বুঝতে কোথাও সমস্যা হচ্ছে? লাগলে বলো, আমরা আরও কিছু প্র্যাকটিস করতে পারি!
```
