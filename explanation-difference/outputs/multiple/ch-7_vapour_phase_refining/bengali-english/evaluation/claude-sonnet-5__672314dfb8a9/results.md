# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and directly explains vapour phase refining in Bengali, covering its principle, conditions, key industrial examples (Mond process and Van Arkel method), and characteristics.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 34,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 34,
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

## u1: Principle and essential conditions of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the foundational concept, working mechanism, and the two critical criteria necessary for vapour phase refining.

Accuracy: **accurate**. Correctly states the fundamental principle of vapour phase refining and the two standard necessary conditions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # বাষ্প দশা পরিশোধন (Vapour Phase Refining) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## ভূমিকা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | আচ্ছা, ধরো তোমার কাছে একটা অশুদ্ধ ধাতু আছে, যার মধ্যে অন্য কিছু অপদ্রব্য (impurities) মিশে আছে। এই অশুদ্ধ ধাতুকে খাঁটি করার একটা চমৎকার পদ্ধতি হলো **বাষ্প দশা পরিশোধন**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ## মূলনীতি (Principle) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | এই পদ্ধতির মূল নীতি হলো: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | &gt; **ধাতুটিকে প্রথমে একটি উদ্বায়ী যৌগে (volatile compound) রূপান্তরিত করা হয়, তারপর সেই যৌগকে পচিয়ে (decompose) বিশুদ্ধ ধাতু পাওয়া হয়।** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | এখানে দুটি শর্ত পূরণ হতে হবে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p8 | 1. ধাতুটি সহজেই একটি উদ্বায়ী যৌগে পরিণত হতে পারবে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | 2. সেই যৌগ সহজেই বিশ্লিষ্ট (decompose) হয়ে বিশুদ্ধ ধাতু দেবে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u2: Mond process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining using the Mond process for nickel, specifying steps, temperatures, and chemical reactions.

Accuracy: **accurate**. The reaction temperatures (330-350 K for formation and 450-470 K for decomposition) and chemical equations for the Mond process are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## প্রধান দুটি উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | ### ১. মন্ড প্রক্রিয়া (Mond Process) - নিকেল পরিশোধনের জন্য | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | **ধাপ ১:** অশুদ্ধ নিকেলকে কার্বন মনোক্সাইড গ্যাসের সাথে প্রায় 330-350 K তাপমাত্রায় উত্তপ্ত করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | $$Ni + 4CO \xrightarrow{330-350K} Ni(CO)_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p14 | এখানে নিকেল কার্বনিল (Ni(CO)₄) তৈরি হয়, যা একটি উদ্বায়ী যৌগ। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 | **ধাপ ২:** এই নিকেল কার্বনিলকে আরও উচ্চ তাপমাত্রায় (450-470 K) উত্তপ্ত করা হয়, ফলে এটি বিশ্লিষ্ট হয়ে খাঁটি নিকেল দেয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | $$Ni(CO)_4 \xrightarrow{450-470K} Ni + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u3: Van Arkel method for zirconium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the Van Arkel method using zirconium and iodine, specifying the formation of volatile iodide and its thermal decomposition on a tungsten filament.

Accuracy: **accurate**. The equations and conditions (~1800 K on tungsten filament) for the Van Arkel method are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### ২. ভ্যান আর্কেল পদ্ধতি (Van Arkel Method) - জিরকোনিয়াম/টাইটানিয়াম পরিশোধনের জন্য | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | **ধাপ ১:** অশুদ্ধ ধাতুকে (যেমন জিরকোনিয়াম) আয়োডিনের সাথে উত্তপ্ত করা হয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | $$Zr + 2I_2 \rightarrow ZrI_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p20 | এখানে জিরকোনিয়াম আয়োডাইড (ZrI₄) তৈরি হয়, যা উদ্বায়ী। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | **ধাপ ২:** এই যৌগকে খুব উচ্চ তাপমাত্রায় (প্রায় 1800 K) টাংস্টেন ফিলামেন্টের উপর উত্তপ্ত করা হলে এটি বিশ্লিষ্ট হয়ে খাঁটি জিরকোনিয়াম দেয়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | $$ZrI_4 \xrightarrow{1800K} Zr + 2I_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u4: Schematic memory aid and intuitive explanation (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides an ASCII schematic workflow and intuitive language simplification to help students easily remember the two-stage concept.

Accuracy: **accurate**. The schematic and intuitive summary accurately represent the thermal cycles involved in vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## সহজে মনে রাখার কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p25 | অশুদ্ধ ধাতু + গ্যাস → উদ্বায়ী যৌগ (কম তাপমাত্রায়) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;diagram&#x27;, &#x27;prose&#x27;] |
| p26 |                 ↓ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;diagram&#x27;] |
| p27 | উদ্বায়ী যৌগ → বিশুদ্ধ ধাতু + গ্যাস (বেশি তাপমাত্রায়) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;diagram&#x27;, &#x27;prose&#x27;] |
| p28 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p29 | **সহজ ভাষায়:** এটা অনেকটা এরকম - তুমি প্রথমে ধাতুকে &quot;গ্যাসে পরিণত&quot; করছো (impurity থেকে আলাদা করার জন্য), তারপর সেই গ্যাস থেকে আবার &quot;খাঁটি ধাতু&quot; ফিরিয়ে আনছো। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |

## u5: Key features and applicability of vapour phase refining (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes key attributes such as ultra-high purity, cost considerations, and metals typically refined this way.

Accuracy: **accurate**. The listed characteristics (high purity, applicable to Ni, Zr, Ti, expensive but effective) are standard facts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ## গুরুত্বপূর্ণ পয়েন্ট | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | - এই পদ্ধতিতে **অত্যন্ত বিশুদ্ধ (highly pure)** ধাতু পাওয়া যায় | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 | - মূলত **নিকেল, জিরকোনিয়াম, টাইটানিয়াম** এর মতো ধাতুর জন্য ব্যবহৃত হয় | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 | - এটি একটি ব্যয়বহুল কিন্তু কার্যকরী পদ্ধতি | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 | কোনো অংশ নিয়ে আরও বিস্তারিত জানতে চাইলে বলো! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

