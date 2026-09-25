# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides an accurate high school-level explanation of covalent radius in Bengali, covering its definition, an illustrative example with Cl2, the rationale behind the definition, applicability conditions, periodic trends, and a memory tip.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 25,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 25,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the internuclear distance between two identical bonded atoms.

Accuracy: **accurate**. The definition accurately states that covalent radius is half of the internuclear distance between two covalently bonded identical atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # সমযোজী ব্যাসার্ধ (Covalent Radius) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | চলো, একটি সহজ উদাহরণ দিয়ে বিষয়টা বুঝি। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## সমযোজী ব্যাসার্ধ কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | যখন দুটি একই মৌলের পরমাণু একটি সমযোজী বন্ধন (covalent bond) দিয়ে যুক্ত হয়, তখন তাদের নিউক্লিয়াস দুটির মধ্যে যে দূরত্ব থাকে, তার **অর্ধেক**কে বলা হয় সমযোজী ব্যাসার্ধ। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Chlorine diatomic molecule example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates how covalent radius is calculated for a diatomic chlorine molecule using internuclear distance d.

Accuracy: **accurate**. The calculation and illustration of covalent radius as d/2 for Cl2 is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### সহজ ভাষায় বুঝি: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | ধরো, তুমি ক্লোরিন (Cl₂) অণুর কথা চিন্তা করছো। এখানে দুটি ক্লোরিন পরমাণু একটি সমযোজী বন্ধন দিয়ে যুক্ত থাকে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | ``` | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p8 | Cl —————— Cl | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p9 |    দূরত্ব = d | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p10 | ``` | EXAMPLE | {} | [&#x27;diagram&#x27;] |
| p11 | এই দুই নিউক্লিয়াসের মধ্যবর্তী দূরত্ব (d) যদি আমরা মাপি, তাহলে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | $$\text{সমযোজী ব্যাসার্ধ} = \frac{d}{2}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u3: Reason for defining radius through covalent bonding (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why atomic radius is defined this way due to the lack of sharp boundaries in electron clouds.

Accuracy: **accurate**. The explanation correctly identifies the probabilistic and fuzzy nature of the electron cloud as the reason why an isolated atom's boundary cannot be directly measured.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ## কেন এভাবে সংজ্ঞায়িত করা হয়? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | একটি পরমাণুর প্রকৃত আকার সরাসরি মাপা কঠিন, কারণ ইলেকট্রন মেঘের কোনো নির্দিষ্ট সীমানা থাকে না। তাই বিজ্ঞানীরা বন্ধনযুক্ত দুটি পরমাণুর মধ্যকার দূরত্ব মেপে, তার অর্ধেক নিয়ে পরমাণুর ব্যাসার্ধ নির্ণয় করেন। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Direct measurement limitation to homonuclear bonds (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Qualifies that dividing the bond distance by two only applies directly to homonuclear bonds, whereas heteronuclear bonds rely on pre-determined radii.

Accuracy: **accurate**. The distinction between homonuclear and heteronuclear covalent bonding regarding radius determination is factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## একটি গুরুত্বপূর্ণ বিষয় | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | - একই মৌলের দুটি পরমাণুর মধ্যে বন্ধন হলে তবেই এই পদ্ধতি সরাসরি কাজ করে। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | - ভিন্ন মৌলের মধ্যে বন্ধন হলে (যেমন H—Cl), তখন প্রতিটি মৌলের পূর্বনির্ধারিত সমযোজী ব্যাসার্ধ ব্যবহার করে হিসাব করা হয়। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Periodic trends in covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes and explains the periodic trends down groups and across periods.

Accuracy: **accurate**. The trends and explanations (adding electron shells down a group, increasing effective nuclear charge across a period) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ## পর্যায় সারণিতে প্রবণতা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | &#124; দিক &#124; পরিবর্তন &#124; কারণ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p20 | &#124;------&#124;----------&#124;------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p21 | &#124; একই গ্রুপে উপর থেকে নিচে &#124; **বৃদ্ধি পায়** &#124; নতুন শক্তিস্তর (shell) যোগ হয় &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p22 | &#124; একই পর্যায়ে বামদিক থেকে ডানদিকে &#124; **হ্রাস পায়** &#124; নিউক্লিয়ার চার্জ বাড়ে, ইলেকট্রনকে বেশি টানে &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |

## u6: Memory aid for covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise phrase to remember the core definition, followed by an interactive closing question.

Accuracy: **accurate**. The mnemonic phrase correctly captures the essential definition of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## মনে রাখার সহজ উপায় | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | **&quot;বন্ধনের দূরত্বের অর্ধেকই হলো ব্যাসার্ধ&quot;** — এভাবে মনে রাখলে সহজ হবে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p25 | তোমার কি এই বিষয়ে আরও কোনো প্রশ্ন আছে, যেমন আয়নিক ব্যাসার্ধের সাথে এর পার্থক্য? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

