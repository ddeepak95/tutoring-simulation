# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and comprehensively explains the concept, requirements, and key industrial methods (Mond process and Van Arkel method) of vapour phase refining in high-school level Bengali.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 42,
  "content_unit_kinds": {
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 42,
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

## u1: Principles and requirements of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the need for ultra-pure metals in industry, the basic three-step principle of vapour phase refining, and the essential conditions for volatile compound formation and decomposition.

Accuracy: **accurate**. The explanation correctly defines vapour phase refining, its industrial rationale, and its two fundamental conditions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # বাষ্পীয় দশা বিশোধন (Vapor Phase Refining) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | চলো, আজ আমরা ধাতু বিশুদ্ধকরণের একটি চমৎকার পদ্ধতি নিয়ে আলোচনা করি। প্রথমে বুঝি কেন এই পদ্ধতির দরকার হয়। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ## কেন এই পদ্ধতি দরকার? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | প্রকৃতি থেকে আকরিক (ore) থেকে যে ধাতু পাওয়া যায়, তাতে অনেক সময় অন্যান্য অপদ্রব্য (impurities) মিশে থাকে। শিল্পক্ষেত্রে ব্যবহারের জন্য অনেক সময় ৯৯.৯৯% পর্যন্ত বিশুদ্ধ ধাতু দরকার হয়। এই অত্যন্ত উচ্চমানের বিশুদ্ধতা পেতে ব্যবহার করা হয় **বাষ্পীয় দশা বিশোধন** পদ্ধতি। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p5 | ## মূল নীতি | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | এই পদ্ধতির পেছনের মূল ধারণাটি খুব সহজ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p7 | 1. অপদ্রব্যযুক্ত ধাতুকে একটি উদ্বায়ী (volatile) যৌগে (compound) রূপান্তর করা হয় | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p8 | 2. এই যৌগটিকে বাষ্পে পরিণত করা হয় (তাই নাম &quot;বাষ্পীয় দশা&quot;) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p9 | 3. অপদ্রব্য থেকে আলাদা করার পর, এই যৌগকে পুনরায় বিয়োজিত (decompose) করে বিশুদ্ধ ধাতু পাওয়া যায় | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p10 | **শর্ত:** যে যৌগ তৈরি হবে, সেটা— | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p11 | - সহজে উদ্বায়ী হতে হবে (কম তাপমাত্রায় বাষ্পে পরিণত হবে) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p12 | - সহজেই আবার বিয়োজিত হয়ে বিশুদ্ধ ধাতু দেবে | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | চলো এবার দুটি বিখ্যাত উদাহরণ দিয়ে বুঝি। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Mond process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining through the two-step Mond process for nickel, providing balanced chemical equations and temperature conditions.

Accuracy: **accurate**. The reaction temperatures (330–350 K for Ni(CO)4 formation and 450–470 K for decomposition) and chemical equations for the Mond process are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## ১. মন্ড প্রক্রিয়া (Mond Process) — নিকেল বিশুদ্ধকরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | **ধাপ ১:** অপদ্রব্যযুক্ত নিকেল ধাতুকে প্রায় ৩৩০–৩৫০ কেলভিন তাপমাত্রায় কার্বন মনোক্সাইড (CO) গ্যাসের সাথে বিক্রিয়া করানো হয়: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | $$Ni + 4CO \xrightarrow{330-350K} Ni(CO)_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | এখানে **নিকেল কার্বোনিল** [Ni(CO)₄] নামক একটি উদ্বায়ী যৌগ তৈরি হয়। মজার ব্যাপার হলো অপদ্রব্যগুলো এই বিক্রিয়ায় অংশ নেয় না, তাই তারা পিছনে পড়ে থাকে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | **ধাপ ২:** এই নিকেল কার্বোনিল বাষ্পকে আলাদা করে নিয়ে অনেক বেশি তাপমাত্রায় (৪৫০–৪৭০ কেলভিন) উত্তপ্ত করা হয়: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | $$Ni(CO)_4 \xrightarrow{450-470K} Ni + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | এভাবে বিশুদ্ধ নিকেল পাওয়া যায়, আর CO গ্যাস আবার প্রথম ধাপে পুনরায় ব্যবহার করা যায়! | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Van Arkel method for titanium and zirconium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining through the Van Arkel method for titanium and zirconium using iodine vapor and a tungsten filament.

Accuracy: **accurate**. The reaction temperatures (approx 523 K for iodination and 1700 K on a tungsten filament for decomposition) and chemical equations for the Van Arkel method are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## ২. ভ্যান আর্কেল পদ্ধতি (Van Arkel Method) — টাইটানিয়াম/জিরকোনিয়াম বিশুদ্ধকরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | এই পদ্ধতিতে অত্যন্ত বিশুদ্ধ টাইটানিয়াম (Ti) বা জিরকোনিয়াম (Zr) পাওয়া যায়। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p25 | **ধাপ ১:** অপদ্রব্যযুক্ত ধাতুকে আয়োডিনের সাথে উত্তপ্ত করা হয়, তৈরি হয় উদ্বায়ী **টাইট্যানিয়াম টেট্রা-আয়োডাইড**: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p26 | $$Ti + 2I_2 \xrightarrow{523K} TiI_4$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p27 | **ধাপ ২:** এই বাষ্পকে খুবই উচ্চ তাপমাত্রার (প্রায় ১৭০০ কেলভিন) একটি টাংস্টেন ফিলামেন্টের ওপর দিয়ে পাঠানো হয়। ফিলামেন্টের উত্তাপে যৌগটি ভেঙে যায়: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p28 | $$TiI_4 \xrightarrow{1700K} Ti + 2I_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | খাঁটি টাইটানিয়াম ফিলামেন্টের গায়ে জমা হয়, আর আয়োডিন গ্যাস মুক্ত হয়ে আবার প্রথম ধাপে ব্যবহৃত হতে পারে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Comparison table for Mond and Van Arkel processes (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a side-by-side comparative table to help the student easily retain the distinguishing features of the two refining processes.

Accuracy: **accurate**. The table accurately summarizes metals, reagents, intermediates, and decomposition conditions for both processes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p31 | ## সহজ কথায় মনে রাখার কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | &#124; বিষয় &#124; মন্ড প্রক্রিয়া &#124; ভ্যান আর্কেল পদ্ধতি &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;table&#x27;] |
| p33 | &#124;---&#124;---&#124;---&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;table&#x27;] |
| p34 | &#124; ধাতু &#124; নিকেল (Ni) &#124; টাইটানিয়াম/জিরকোনিয়াম &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;table&#x27;] |
| p35 | &#124; ব্যবহৃত গ্যাস &#124; CO &#124; আয়োডিন (I₂) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;table&#x27;] |
| p36 | &#124; গঠিত যৌগ &#124; Ni(CO)₄ &#124; TiI₄ &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;table&#x27;] |
| p37 | &#124; বিয়োজন তাপমাত্রা &#124; বেশি তাপে &#124; টাংস্টেন ফিলামেন্টে অতি উচ্চ তাপে &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;table&#x27;] |

## u5: Summary of vapour phase refining (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a high-level summary flow diagram and concluding explanation of vapour phase refining, followed by an interactive closing offer.

Accuracy: **accurate**. The summary flow and takeaway description accurately encapsulate the core mechanism of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## সারকথা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | বাষ্পীয় দশা বিশোধনের মূল কৌশল হলো— | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p40 | &gt; **অপদ্রব্যযুক্ত ধাতু → উদ্বায়ী যৌগ (বাষ্প) → বিয়োজন → বিশুদ্ধ ধাতু** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p41 | এই পদ্ধতিতে অপদ্রব্য যৌগ তৈরিতে অংশ নেয় না বলে সহজেই আলাদা হয়ে যায়, আর ফলাফল হয় অত্যন্ত উচ্চমানের বিশুদ্ধ ধাতু। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p42 | কোনো অংশ আরও বিস্তারিতভাবে বুঝতে চাইলে বলো, আমি আরও উদাহরণ দিয়ে ব্যাখ্যা করব! 😊 | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

