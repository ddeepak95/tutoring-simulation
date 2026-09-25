# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly explains stoichiometry in Bengali, covering its definition and Greek etymology, an intuitive tea recipe analogy, the foundational role of balanced equations and mass conservation, a 4-step calculation procedure, a fully worked numerical example, and key mole relationships at STP.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 53,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 53,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 5,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and Etymology of Stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces stoichiometry, its Greek etymology (stoicheion + metron), and defines it as the calculation of reactant and product amounts in a chemical reaction.

Accuracy: **accurate**. The Greek etymology and definition of stoichiometry as quantitative chemical calculations are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | হ্যালো! রসায়নের অন্যতম মজার এবং গুরুত্বপূর্ণ একটি বিষয় হলো **স্টয়কিওমেট্রি (Stoichiometry)**, যাকে বাংলায় আমরা **&quot;রাসায়নিক গণনা&quot;** বলতে পারি।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ভয় পাওয়ার কিছু নেই, এটা আসলে রান্নার রেসিপির মতো সহজ! চলো, খুব সহজভাবে এটা বুঝে নেওয়া যাক। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### ১. স্টয়কিওমেট্রি আসলে কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | গ্রিক শব্দ *Stoicheion* (মৌল) এবং *Metron* (পরিমাপ) থেকে এই শব্দের উৎপত্তি।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | সহজ কথায়: **কোনো রাসায়নিক বিক্রিয়ায় কতটুকু বিক্রিয়ক (Reactant) ব্যবহার করলে কতটুকু উৎপাদ (Product) তৈরি হবে—তার হিসাব-নিকাশ করাই হলো স্টয়কিওমেট্রি।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Tea Recipe Analogy for Stoichiometric Proportions (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p9", "quote": "*১ কাপ দুধ + ১ চামচ চিনি + ১ চামচ চা পাতা = ১ কাপ স্পেশাল চা*"}]}

Annotation rationale: Uses the daily-life analogy of a tea recipe to explain how fixed component proportions scale up linearly.

Accuracy: **accurate**. The tea recipe comparison correctly illustrates the concept of stoichiometric ratios and proportional scaling.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | &gt; **চায়ের উদাহরণ দিয়ে বুঝি:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | &gt; ধরো, ১ কাপ দুধের চায়ের রেসিপি হলো:  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | &gt; *১ কাপ দুধ + ১ চামচ চিনি + ১ চামচ চা পাতা = ১ কাপ স্পেশাল চা* | ANALOGY | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p10 | &gt; এখন তোমাকে যদি বলি **৫ কাপ চা** বানাতে হবে, তুমি নিশ্চয়ই বলবে: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p11 | &gt; *৫ কাপ দুধ + ৫ চামচ চিনি + ৫ চামচ চা পাতা লাগবে।* | ANALOGY | {} | [&#x27;prose&#x27;] |
| p12 | &gt;  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p13 | &gt; রসায়নে এই সাধারণ ঐকিক নিয়মের হিসাবটাই হলো স্টয়কিওমেট্রি! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Balanced Chemical Equations and Stoichiometric Relationships (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why balancing equations is essential based on the law of conservation of mass, and details how a balanced equation provides molecular, molar, and mass-level relationships.

Accuracy: **accurate**. The explanation of the law of conservation of mass, equation balancing, and molecular, molar, and mass interpretations of 2H2 + O2 -> 2H2O is entirely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | ### ২. স্টয়কিওমেট্রির মূল ভিত্তি: সমতাকৃত সমীকরণ (Balanced Equation) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | স্টয়কিওমেট্রি করার প্রথম এবং প্রধান শর্ত হলো—রাসায়নিক সমীকরণটির **সমতাকরণ (Balance)** করা থাকতে হবে। কারণ *ভরের নিত্যতা সূত্র* অনুযায়ী পরমাণু কখনো ধ্বংস বা সৃষ্টি হয় না। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | একটি সহজ সমীকরণ দেখা যাক: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p18 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p19 | এই সমীকরণটি আমাদের কী তথ্য দিচ্ছে? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | * **অণু হিসেবে:** ২ অণু হাইড্রোজেন ($H_2$) + ১ অণু অক্সিজেন ($O_2$) মিলে তৈরি করে ২ অণু পানি ($H_2O$)। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 | * **মোল হিসেবে (সবচেয়ে গুরুত্বপূর্ণ):** **২ মোল** $H_2$ + **১ মোল** $O_2$ মিলে তৈরি করে **২ মোল** $H_2O$। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p22 | * **ভর হিসেবে:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p23 |   * ২ মোল $H_2 = 2 \times 2 = 4\text{ g}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p24 |   * ১ মোল $O_2 = 1 \times 32 = 32\text{ g}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p25 |   * ২ মোল $H_2O = 2 \times 18 = 36\text{ g}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p26 |   *(খেয়াল করে দেখো: বিক্রিয়কের মোট ভর $4+32 = 36\text{ g}$, এবং উৎপাদের ভরও $36\text{ g}$!)* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Four-Step Procedure for Solving Stoichiometry Problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a clear 4-step algorithmic sequence for solving chemical stoichiometry problems.

Accuracy: **accurate**. The 4-step method (write/balance equation -> convert given to moles -> use mole ratio -> convert moles to target unit) is the standard correct pedagogical procedure.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p28 | ### ৩. স্টয়কিওমেট্রির অংক করার ৪টি জাদুকরী ধাপ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | যেকোনো গাণিতিক সমস্যা সমাধান করতে এই ধাপগুলো মনে রাখবে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p30 | 1. **ধাপ ১:** সঠিক রাসায়নিক সমীকরণটি লেখো এবং সেটির **সমতাকরণ (Balance)** করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p31 | 2. **ধাপ ২:** প্রশ্নে যে মানটি দেওয়া আছে (যেমন: গ্রামে ভর, বা লিটারে আয়তন), সেটিকে **মোলে (Mole)** রূপান্তর করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p32 | 3. **ধাপ ৩:** সমীকরণের অনুপাত (Mole Ratio) দেখে উৎপাদের মোল সংখ্যা বের করো। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p33 | 4. **ধাপ ৪:** উৎপাদের মোল সংখ্যাকে প্রশ্নে যা চেয়েছে (গ্রাম বা লিটার বা অণুর সংখ্যা) তাতে রূপান্তর করো। | PROCEDURE | {} | [&#x27;list&#x27;] |

## u5: Worked Problem: Water Formation from Hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a complete worked example calculating the mass of water formed from 8 g of hydrogen reacting with excess oxygen.

Accuracy: **accurate**. All calculations are correct: 4 g of H2 yields 36 g of H2O, hence 8 g of H2 yields 72 g of H2O.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | ### ৪. চলো একটা উদাহরণ সমাধান করি! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | **প্রশ্ন:** *৮ গ্রাম হাইড্রোজেন গ্যাস ($H_2$) পর্যাপ্ত অক্সিজেনের সাথে বিক্রিয়া করলে কত গ্রাম পানি ($H_2O$) তৈরি হবে?* | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p37 | **সমাধান:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p38 | * **ধাপ ১ (সমীকরণ):** $2H_2 + O_2 \rightarrow 2H_2O$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p39 | * **ধাপ ২ (মোলার ভর বের করা):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p40 |   * $H_2$-এর মোলার ভর = $2\text{ g/mol}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p41 |   * সমীকরণ অনুযায়ী, $2$ মোল $H_2 = 2 \times 2\text{ g} = 4\text{ g}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p42 |   * এবং $2$ মোল পানি ($H_2O$) = $2 \times 18\text{ g} = 36\text{ g}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p43 | * **ধাপ ৩ (ঐকিক নিয়ম):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;list&#x27;] |
| p44 |   * সমীকরণ মতে, $4\text{ g } H_2$ থেকে পানি পাওয়া যায় = $36\text{ g}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p45 |   * সুতরাং, $1\text{ g } H_2$ থেকে পানি পাওয়া যায় = $\frac{36}{4}\text{ g}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p46 |   * সুতরাং, $8\text{ g } H_2$ থেকে পানি পাওয়া যায় = $\frac{36 \times 8}{4} = 72\text{ g}$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p47 | **উত্তর:** ৭২ গ্রাম পানি তৈরি হবে! দেখলে, কত সহজ? | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Recap of Avogadro's Number, Molar Volume, and the Mole Bridge (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps essential conversion constants (Avogadro's number and 22.4 L at STP) and summarizes the concept of the mole as a central bridge.

Accuracy: **accurate**. Avogadro's constant (6.022 x 10^23) and standard molar volume of gas at STP (22.4 L) are stated accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p49 | ### মনে রাখার মতো কিছু তথ্য (STP-তে): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | * **১ মোল** যেকোনো পরমাণু/অণু = $6.022 \times 10^{23}$ টি কণা (অ্যাভোগাড্রো সংখ্যা)। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p51 | * **১ মোল** গ্যাস প্রমাণ তাপমাত্রা ও চাপে (STP) = **২২.৪ লিটার** জায়গা দখল করে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p52 | স্টয়কিওমেট্রি মূলত **মোল (Mole)**-কে সেতু হিসেবে ব্যবহার করে ভর, আয়তন এবং কণার সংখ্যার মধ্যে সম্পর্ক তৈরি করে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p53 | তোমার কি এই বিষয়টি বুঝতে কোথাও সমস্যা হচ্ছে? লাগলে বলো, আমরা আরও কিছু প্র্যাকটিস করতে পারি! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

