# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the definition, principles, general steps, and two primary real-world industrial examples (Mond process and Van Arkel method) of vapour phase refining in Bengali as requested.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 51,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 51,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and fundamental principles of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines vapour phase refining and explains the two key chemical conditions required for this refining technique.

Accuracy: **accurate**. The definition and the two essential criteria (formation of a volatile compound and its subsequent thermal decomposition to yield pure metal) are chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **বাষ্প-পর্যায় পরিশোধন (Vapour Phase Refining)** হলো ধাতুকে বিশুদ্ধ করার একটি পদ্ধতি। এই পদ্ধতিতে অশুদ্ধ ধাতুকে প্রথমে এমন একটি **উদ্বায়ী যৌগে** রূপান্তর করা হয়, যা সহজে বাষ্পে পরিণত হতে পারে। পরে সেই বাষ্পকে ভেঙে আবার বিশুদ্ধ ধাতু পাওয়া যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p2 | ## মূল নীতি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | এই পদ্ধতি দুটি বৈশিষ্ট্যের উপর নির্ভর করে— | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | 1. ধাতুটি কোনো বিকারকের সঙ্গে বিক্রিয়া করে **উদ্বায়ী যৌগ** তৈরি করবে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p5 | 2. ওই উদ্বায়ী যৌগকে উত্তপ্ত করলে তা ভেঙে **বিশুদ্ধ ধাতু** জমা হবে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p6 | অপদ্রব্যগুলো সাধারণত উদ্বায়ী যৌগ তৈরি করে না, তাই তারা আলাদা হয়ে যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: General step-by-step sequence of vapour phase refining (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the general five-step procedure followed during vapour phase refining.

Accuracy: **accurate**. The general sequence describing reaction with reagent, formation of volatile compound, transfer, thermal breakdown, and collection of pure metal is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p8 | ## সাধারণ ধাপ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | 1. **অশুদ্ধ ধাতুর সঙ্গে উপযুক্ত গ্যাস/বিকারক যোগ করা হয়।** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p10 | 2. ধাতু বিক্রিয়া করে একটি **গ্যাসীয় বা উদ্বায়ী যৌগ** তৈরি করে। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p11 | 3. যৌগটির বাষ্পকে অন্য একটি গরম স্থানে পাঠানো হয়। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p12 | 4. সেখানে তাপের প্রভাবে যৌগটি ভেঙে যায়। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p13 | 5. ফলে **বিশুদ্ধ ধাতু** পাওয়া যায় এবং বিকারকটি আবার বেরিয়ে আসে। | PROCEDURE | {} | [&#x27;list&#x27;] |

## u3: Mond process for the purification of nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a complete worked application of vapour phase refining via the Mond process for refining nickel, specifying temperatures, chemical equations, and intermediate products.

Accuracy: **accurate**. The chemical reactions (formation of Ni(CO)4 at 50–60°C and thermal decomposition at ~180°C to yield pure Ni) and explanations are chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | # উদাহরণ ১: নিকেলের মন্ড প্রক্রিয়া (Mond Process) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | নিকেলকে বিশুদ্ধ করার জন্য এই পদ্ধতি ব্যবহার করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | ### ধাপ ১: নিকেল কার্বোনিল তৈরি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | অশুদ্ধ নিকেলের উপর প্রায় **50–60°C তাপমাত্রায় কার্বন মনোক্সাইড (CO)** প্রবাহিত করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p20 | \text{Ni} + 4\text{CO} \rightarrow \text{Ni(CO)}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | এখানে নিকেল টেট্রাকার্বোনিল, \(\text{Ni(CO)}_4\), একটি উদ্বায়ী পদার্থ। এটি বাষ্পে পরিণত হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p23 | ### ধাপ ২: বিশুদ্ধ নিকেল সংগ্রহ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | এই বাষ্পকে প্রায় **180°C তাপমাত্রায়** উত্তপ্ত করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | \text{Ni(CO)}_4 \rightarrow \text{Ni} + 4\text{CO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | ফলে বিশুদ্ধ নিকেল জমা হয় এবং কার্বন মনোক্সাইড আবার বেরিয়ে আসে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 | **মনে রাখবে:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p30 | অশুদ্ধ নিকেল → নিকেল কার্বোনিল (বাষ্প) → বিশুদ্ধ নিকেল | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Van Arkel process for zirconium and titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked real-world industrial example of vapour phase refining via the Van Arkel method using iodine and a tungsten filament to refine zirconium/titanium.

Accuracy: **accurate**. The Van Arkel reaction equations for Zr with I2 forming volatile ZrI4 and its decomposition on a hot tungsten filament to deposit pure Zr are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p32 | # উদাহরণ ২: জিরকোনিয়াম ও টাইটানিয়ামের ভ্যান আরকেল প্রক্রিয়া | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | জিরকোনিয়াম (Zr) বা টাইটানিয়াম (Ti) বিশুদ্ধ করতে **আয়োডিন (I₂)** ব্যবহার করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | উদাহরণ হিসেবে জিরকোনিয়াম: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | \text{Zr} + 2\text{I}_2 \rightarrow \text{ZrI}_4 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | জিরকোনিয়াম টেট্রাআয়োডাইড (\(\text{ZrI}_4\)) উদ্বায়ী। একে একটি খুব গরম টাংস্টেন তারের কাছে নিলে এটি ভেঙে যায়— | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p39 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p40 | \text{ZrI}_4 \rightarrow \text{Zr} + 2\text{I}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | ফলে বিশুদ্ধ জিরকোনিয়াম টাংস্টেন তারের উপর জমা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Summary recap of vapour phase refining concepts and examples (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap summarizing the essential steps and mapping the two main metal examples to their respective refining methods.

Accuracy: **accurate**. The recap accurately synthesizes the process and associates Nickel with the Mond process and Titanium/Zirconium with the Van Arkel process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p44 | ## সংক্ষেপে | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | বাষ্প-পর্যায় পরিশোধনে— | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p46 | - অশুদ্ধ ধাতু থেকে উদ্বায়ী যৌগ তৈরি করা হয়। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p47 | - সেই যৌগকে বাষ্প অবস্থায় আলাদা করা হয়। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p48 | - উত্তপ্ত করে যৌগটি ভেঙে বিশুদ্ধ ধাতু পাওয়া যায়। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p49 | **প্রধান উদাহরণ:**   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p50 | - নিকেল → মন্ড প্রক্রিয়া   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p51 | - টাইটানিয়াম ও জিরকোনিয়াম → ভ্যান আরকেল প্রক্রিয়া | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

