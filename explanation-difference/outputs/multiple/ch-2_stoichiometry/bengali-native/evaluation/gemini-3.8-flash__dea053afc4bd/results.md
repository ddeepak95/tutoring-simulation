# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains chemical stoichiometry in Bengali for a high school student, covering basic definitions, key prerequisites (balanced equations, mole, molar mass), a worked example, and a general problem-solving procedure.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 54,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 54,
  "unique_subtopics": 8,
  "contextualization": {
    "everyday": 3,
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogy of making an omelet to explain stoichiometry (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p7", "quote": "মনে করো, তুমি ডিমের অমলেট বানাবে।"}, {"passage_id": "p8", "quote": "১টি ডিম + ১ চিমটি লবণ = ১টি অমলেট"}]}

Annotation rationale: Uses the real-world cooking analogy of an omelet recipe (eggs and salt to omelet) to explain the concept of stoichiometric ratios between reactants and products.

Accuracy: **accurate**. The analogy correctly relates the proportional relationship of ingredients in a recipe to reactants and products in stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | হ্যালো! কেমন আছো? রসায়ন বিষয়টাকে অনেকে একটু ভয় পায়, কিন্তু সত্যি বলতে রসায়ন আসলে রান্নাবান্নার মতোই মজার একটা বিষয়!  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | আজকে আমরা রসায়নের খুবই গুরুত্বপূর্ণ এবং মজার একটা টপিক নিয়ে কথা বলব, যার নাম **“রাসায়নিক সমীকরণমিতি” (Stoichiometry)**। নামটা শুনে বেশ কঠিন আর ভারী মনে হলেও, আসল ব্যাপারটা কিন্তু দারুণ সহজ!  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | চলো, একদম সহজ করে বিষয়টা বুঝে নেওয়া যাক। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### ১. সমীকরণমিতি আসলে কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | খুব সহজ কথায়: **রাসায়নিক সমীকরণমিতি হলো রসায়নের ‘রেসিপি’ (Recipe) বা হিসাব-নিকাশ।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p7 | মনে করো, তুমি ডিমের অমলেট বানাবে। তোমার রেসিপি হলো: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | &gt; **১টি ডিম + ১ চিমটি লবণ = ১টি অমলেট** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | এখন আমি যদি তোমাকে বলি, &quot;তোমার বন্ধুদের জন্য ৫টি অমলেট বানাতে হবে।&quot; তুমি কিন্তু সাথে সাথেই হিসাব করে বলে দেবে— &quot;তাহলে ৫টি ডিম আর ৫ চিমটি লবণ লাগবে!&quot;  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p10 | এই যে তুমি আগে থেকেই হিসাব করে ফেললে যে কতটুকু উৎপাদ (অমলেট) পেতে হলে ঠিক কতটুকু বিক্রিয়ক (ডিম ও লবণ) লাগবে—ঠিক এই হিসাবটাই রসায়নে যখন পরমাণু বা অণুর ক্ষেত্রে করা হয়, তাকে বলে **রাসায়নিক সমীকরণমিতি**। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Role of balanced chemical equations in stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why a balanced equation is necessary for stoichiometric calculations and demonstrates particle/molecular interpretation using the synthesis of water.

Accuracy: **accurate**. The chemical equation 2H2 + O2 -> 2H2O is properly balanced and the molecular ratio interpretation is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p12 | ### ২. সমীকরণমিতির ৩টি মূল চাবিকাঠি: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | সমীকরণমিতির অংক বা হিসাবগুলো পানির মতো সহজ করার জন্য তোমাকে ৩টি জিনিস মাথায় রাখতে হবে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | #### ক) সমতাকৃত সমীকরণ (Balanced Equation): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | এটা হলো রসায়নের মূল রেসিপি। সমীকরণটি ব্যালেন্স বা সমতা করা না থাকলে কিন্তু হিসাব ভুল হবে!  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | যেমন: পানি তৈরির বিক্রিয়া— | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p18 | এর মানে হলো: **২ অণু হাইড্রোজেন** গ্যাসের সাথে **১ অণু অক্সিজেন** গ্যাস মিলে **২ অণু পানি** তৈরি করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: The mole as a chemical unit of measurement (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p20", "quote": "দোকানে গিয়ে যেমন আমরা ১২টি ডিম না বলে ‘১ ডজন’ বলি"}]}

Annotation rationale: Explains the concept of a mole by drawing a parallel to a dozen, and reinterprets the balanced equation in terms of moles.

Accuracy: **accurate**. The definition of the mole as a counting unit analogous to a dozen and its application to stoichiometric coefficients are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | #### খ) মোল (Mole) — রসায়নের ‘ডজন’: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | দোকানে গিয়ে যেমন আমরা ১২টি ডিম না বলে ‘১ ডজন’ বলি, রসায়নে বিজ্ঞানীদের পরমাণু বা অণু মাপার একক হলো **‘মোল’**।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | উপরের সমীকরণটাকে আমরা মোলের ভাষায় বলতে পারি: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | &gt; **২ মোল $H_2$ + ১ মোল $O_2$ = ২ মোল $H_2O$** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Molar mass definition and examples (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as mass in grams of 1 mole of a substance and gives standard values for H2, O2, and H2O.

Accuracy: **accurate**. The definition and the molar mass values for hydrogen (2 g), oxygen (32 g), and water (18 g) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | #### গ) মোলার ভর (Molar Mass): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | ১ মোল পদার্থের গ্রাম এককে ভর।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | যেমন:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | * ১ মোল হাইড্রোজেনের ($H_2$) ভর = $2$ গ্রাম। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 | * ১ মোল অক্সিজেনের ($O_2$) ভর = $32$ গ্রাম। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p28 | * ১ মোল পানির ($H_2O$) ভর = $18$ গ্রাম। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Worked mass-mass calculation of water formation from hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked-out stoichiometric calculation determining the mass of water produced from 4 g of hydrogen gas.

Accuracy: **accurate**. The calculation 4 g H2 yielding 36 g H2O based on 2H2 + O2 -> 2H2O is mathematically and chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p30 | ### ৩. চলো একটা ছোট উদাহরণ দিয়ে বুঝে নিই! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | **প্রশ্ন:** ৪ গ্রাম হাইড্রোজেন ($H_2$) গ্যাস পর্যাপ্ত অক্সিজেনের সাথে বিক্রিয়া করলে কত গ্রাম পানি ($H_2O$) তৈরি হবে? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | **সমাধানের ধাপগুলো দেখো (খুবই সহজ ঐকিক নিয়ম):** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p33 | **ধাপ ১: সমীকরণ লেখা ও সমতা করা** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p34 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | **ধাপ ২: গ্রাম ভর হিসাব করা** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p36 | * হাইড্রোজেনের ভর = $2 \times (1 \times 2) = 4$ গ্রাম | EXAMPLE | {} | [&#x27;list&#x27;] |
| p37 | * পানির ভর = $2 \times (1 \times 2 + 16) = 2 \times 18 = 36$ গ্রাম | EXAMPLE | {} | [&#x27;list&#x27;] |
| p38 | **ধাপ ৩: এবার ঐকিক নিয়মে হিসাব করো** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p39 | সমীকরণ থেকে আমরা দেখতে পাচ্ছি: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p40 | &gt; ৪ গ্রাম $H_2$ থেকে পানি পাওয়া যায় = **৩৬ গ্রাম**। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p41 | ব্যস! কত সহজে উত্তর বের হয়ে গেল! তোমাকে আলাদা করে কোনো জটিল হিসাবও করতে হলো না। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

## u6: Four-step general procedure for solving stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the standard step-by-step method to solve any stoichiometry problem: balance equation, convert to moles, find mole ratio, and convert to required unit.

Accuracy: **accurate**. The listed sequence of steps is the standard, valid algorithm for chemical stoichiometry calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p43 | ### ৪. শিক্ষকের স্পেশাল টিপস (যেকোনো অংক সমাধানের গোপন সূত্র): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | পরীক্ষায় যখনই সমীকরণমিতির কোনো অংক আসবে, মনে মনে এই ৪টি ধাপ মনে রাখবে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p45 | 1. **সমীকরণ লিখবে এবং ব্যালেন্স করবে।** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p46 | 2. প্রশ্নে যার পরিমাণ দেওয়া আছে, তাকে **‘মোলে’ (Mole)** রূপান্তর করবে। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p47 | 3. সমীকরণের অনুপাত দেখে নির্ণেয় পদার্থের **মোল সংখ্যা** বের করবে। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p48 | 4. সবশেষে সেই মোলকে প্রশ্নে যা চেয়েছে (গ্রামে নাকি লিটারে) তাতে রূপান্তর করে নেবে। | PROCEDURE | {} | [&#x27;list&#x27;] |

## u7: Mnemonic rhyme for stoichiometric steps (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise Bengali rhyming summary/mnemonic to help students memorize the stoichiometric calculation procedure.

Accuracy: **accurate**. The mnemonic accurately reflects the logical order of steps in stoichiometric conversions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | &gt; **সংক্ষেপে মনে রাখার ছন্দ:**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p50 | &gt; দেওয়া আছে গ্রামে $\rightarrow$ নাও তাকে মোলে $\rightarrow$ অনুপাত করো সমীকরণ দেখে $\rightarrow$ রূপান্তর করো নিজের মতো করে! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

## u8: Recap and teacher's closing reassurance (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p53", "quote": "শুধু উপাদানগুলো চাল-ডালের বদলে হাইড্রোজেন, অক্সিজেন বা নাইট্রোজেন!"}]}

Annotation rationale: Summarizes the topic by comparing stoichiometry to elementary unitary method and offers support for further questions.

Accuracy: **accurate**. Framing stoichiometric calculations as proportion/unitary method with chemical quantities is conceptually sound and pedagogically standard.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p51 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p52 | **শেষ কথা:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p53 | রাসায়নিক সমীকরণমিতি মোটেও কোনো ভয়ের বিষয় নয়, এটা স্রেফ ক্লাস ফাইভের **ঐকিক নিয়ম**; শুধু উপাদানগুলো চাল-ডালের বদলে হাইড্রোজেন, অক্সিজেন বা নাইট্রোজেন!  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p54 | তোমার কি এই বিষয়ে কোনো জায়গায় বুঝতে সমস্যা হচ্ছে? কোনো নির্দিষ্ট অংক নিয়ে কি কনফিউশন আছে? আমাকে নিঃসংকোচে বলতে পারো, আমি আবার বুঝিয়ে দেব! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

