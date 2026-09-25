# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly explains vapour phase refining in metallurgy, covering its core definition, working principle, general procedure, and two classic industrial examples (Mond process and Van Arkel process) along with a summary recap.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
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

## u1: Definition of Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the topic, contrasts metal solids with high melting points against volatile compound conversion, and defines the basic concept of vapour phase refining.

Accuracy: **accurate**. The definition accurately states the conversion of impure metal into a volatile compound and its subsequent thermal decomposition to yield pure metal.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | হ্যালো! ধাতু নিষ্কাশন এবং পরিশোধনের (Metallurgy) অধ্যায়ে **&quot;বাষ্পীয় দশার পরিশোধন&quot; (Vapour Phase Refining)** একটি অত্যন্ত গুরুত্বপূর্ণ এবং মজার বিষয়। চলো, এটি একদম সহজ ভাষায় বুঝে নিই। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p3 | ### বাষ্পীয় দশার পরিশোধন কী? (What is Vapour Phase Refining?) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | সাধারণত ধাতুগুলো কঠিন অবস্থায় থাকে এবং এদের গলনাঙ্ক অনেক বেশি হয়। কিন্তু এই পদ্ধতিতে আমরা একটি **অশুদ্ধ ধাতুকে প্রথমে একটি উদ্বায়ী গ্যাসে (বা বাষ্পে) রূপান্তরিত করি**, তারপর সেই গ্যাসটিকে ভেঙে **একদম বিশুদ্ধ ধাতু** তৈরি করি।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | সহজ কথায়:  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | &gt; **অশুদ্ধ ধাতু $\rightarrow$ বাষ্পীয় যৌগ $\rightarrow$ খাঁটি ধাতু** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |

## u2: Principles and Conditions for Vapour Phase Refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the two essential chemical requirements: forming an unstable volatile compound that unreactive impurities do not form, and enabling thermal decomposition to recover pure metal.

Accuracy: **accurate**. The two stated conditions precisely reflect standard metallurgy principles for vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p8 | ### এর মূল নীতি (Principle) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | এই পদ্ধতিটি সফল হতে গেলে **দুটি প্রধান শর্ত** পূরণ হতে হবে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | 1. **উদ্বায়ী যৌগ গঠন:** ধাতুর সাথে এমন একটি বিকারক (Reagent) যোগ করতে হবে, যা শুধুমাত্র ধাতুটির সাথেই বিক্রিয়া করে সহজে বাষ্পীভূত হতে পারে এমন একটি যৌগ (Volatile compound) তৈরি করবে। কিন্তু অশুদ্ধিগুলো বিক্রিয়া করবে না। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p11 | 2. **সহজে ভেঙে যাওয়া (বিয়োজন):** তৈরি হওয়া বাষ্পীয় যৌগটি এমন হতে হবে, যাতে সেটিকে একটু বেশি গরম করলেই তা সহজে ভেঙে যায় এবং খাঁটি ধাতু ফেরত দেয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u3: Step-by-Step Procedure of Vapour Phase Refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the reusable two-step general procedure of heating the crude metal with reagent at a lower temperature and decomposing the vapour at higher temperature.

Accuracy: **accurate**. The generalized steps accurately describe the mechanism of separation and recovery in vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p13 | ### এটি কীভাবে কাজ করে? (Step-by-Step Process) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | * **ধাপ ১:** অশুদ্ধ ধাতুর সাথে নির্দিষ্ট বিকারক মিশিয়ে কম তাপে উত্তপ্ত করা হয়। এতে ধাতুটি বাষ্পে পরিণত হয়, কিন্তু অপদ্রব্য বা নোংরাগুলো নিচে কঠিন হিসেবে পড়ে থাকে। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | * **ধাপ ২:** এই বাষ্পকে আলাদা করে অন্য একটি পাত্রে নিয়ে যাওয়া হয় এবং আরও উচ্চ তাপমাত্রায় উত্তপ্ত করা হয়। ফলে বাষ্পটি ভেঙে গিয়ে নিচে খাঁটি ধাতু জমা হয় এবং বিকারক গ্যাসটি উড়ে যায় (যা পরে আবার ব্যবহার করা যায়)। | PROCEDURE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u4: Mond Process for Nickel Refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Mond process for refining impure nickel via nickel tetracarbonyl.

Accuracy: **accurate**. The reaction temperatures (330-350 K for formation and 450-470 K for decomposition) and chemical equations for the Mond process are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p17 | ### উচ্চ মাধ্যমিকের জন্য দুটি সেরা উদাহরণ (Examples for Exam) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | তোমাদের পরীক্ষার জন্য দুটি পদ্ধতির নাম এবং বিক্রিয়া খুব ভালো করে মনে রাখতে হবে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p19 | #### ১. মন্ড-এর পদ্ধতি (Mond Process) – নিকেল (Ni) পরিশোধনে ব্যবহৃত হয়: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | * **ধাপ ১:** অশুদ্ধ নিকেলকে কার্বন মনোক্সাইড ($CO$) গ্যাসের সাথে ৩৩০-৩৫০ K তাপমাত্রায় উত্তপ্ত করলে উদ্বায়ী **নিকেল টেট্রাকার্বনিল** বাষ্প তৈরি হয়। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 |   $$Ni (\text{অশুদ্ধ}) + 4CO \xrightarrow{330-350 \text{ K}} Ni(CO)_4 \ (\text{বাষ্প})$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | * **ধাপ ২:** এবার এই বাষ্পকে ৪৫০-৪৭০ K তাপমাত্রায় উত্তপ্ত করলে এটি ভেঙে খাঁটি নিকেল তৈরি করে। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 |   $$Ni(CO)_4 \xrightarrow{450-470 \text{ K}} Ni (\text{বিশুদ্ধ}) + 4CO \uparrow$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u5: Van Arkel Method for Refining Zirconium and Titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Van Arkel-de Boer method for ultra-pure Zr and Ti.

Accuracy: **accurate**. The Van Arkel process conditions, including removal of oxygen/nitrogen impurities, formation of ZrI4 at around 870 K, and tungsten filament decomposition at ~2075 K, are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | #### ২. ভ্যান-আরকেল পদ্ধতি (Van Arkel Method) – জিরকোনিয়াম (Zr) ও টাইটানিয়াম (Ti) পরিশোধনে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | এই পদ্ধতি দিয়ে মহাকাশযান তৈরিতে ব্যবহৃত অতি-বিশুদ্ধ টাইটানিয়াম বা জিরকোনিয়াম পাওয়া যায়। এতে মূলত অক্সিজেন ও নাইট্রোজেনের মতো অশুদ্ধি দূর করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | * **ধাপ ১:** অশুদ্ধ জিরকোনিয়ামকে আয়োডিন ($I_2$) সহ একটি ভ্যাকুয়াম পাত্রে ৮৭০ K তাপমাত্রায় উত্তপ্ত করে উদ্বায়ী টেট্রাআয়োডাইড বাষ্প তৈরি করা হয়। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 |   $$Zr (\text{অশুদ্ধ}) + 2I_2 \xrightarrow{870 \text{ K}} ZrI_4 \ (\text{বাষ্প})$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | * **ধাপ ২:** এই বাষ্পকে একটি খুব গরম টাংস্টেন ফিলামেন্টের (প্রায় ২০৭৫ K) ওপর দিয়ে চালনা করা হয়। উচ্চ তাপে আয়োডাইড ভেঙে ফিলামেন্টের গায়ে খাঁটি জিরকোনিয়াম জমা হয়। | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 |   $$ZrI_4 \xrightarrow{2075 \text{ K, Tungsten filament}} Zr (\text{বিশুদ্ধ}) + 2I_2 \uparrow$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u6: Recap Tips for Examination (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick reference summary of the two key refining methods paired with their respective metals and reagents.

Accuracy: **accurate**. The summary correctly links the Mond process to Ni + CO and the Van Arkel process to Zr/Ti + I2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p31 | ### এক নজরে মনে রাখার টিপস: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | * **Mond Process** = নিকেল ($Ni$) + কার্বন মনোক্সাইড ($CO$) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 | * **Van Arkel Process** = জিরকোনিয়াম ($Zr$) বা টাইটানিয়াম ($Ti$) + আয়োডিন ($I_2$) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 | আশা করি পদ্ধতিটি তোমার কাছে পরিষ্কার হয়েছে! কোনো ধাপে বুঝতে সমস্যা থাকলে নির্দ্বিধায় আমাকে আবার জিজ্ঞেস করতে পারো। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

