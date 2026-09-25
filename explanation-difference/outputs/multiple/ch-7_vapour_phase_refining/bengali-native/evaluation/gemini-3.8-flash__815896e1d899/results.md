# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and comprehensively explains vapour phase refining in Bengali, covering its basic principle, the two main steps, standard industrial examples (Mond process and Van Arkel process), essential conditions, and a conceptual analogy.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 32,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "CAVEAT": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 32,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 1,
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Sand-mud and magical air analogy for vapour phase refining (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "মনে করো, তোমার কাছে এক মুঠো কাদা আর বালি আছে, আর তার ভেতরে লোহার কিছু অতিক্ষুদ্র কণা মিশে আছে।"}]}

Annotation rationale: Introduces the principle of vapour phase refining using a simplified intuitive thought experiment involving separating iron particles from mud and sand using magical gas.

Accuracy: **accurate**. The analogy intuitively and correctly mirrors the physical concept of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | স্নেহের শিক্ষার্থী, রসায়নের ক্লাসে তোমাকে স্বাগতম!  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | আজ আমরা ধাতু নিষ্কাশন ও শোধনের খুব চমৎকার এবং চতুর একটি পদ্ধতি শিখব। এর নাম **বাষ্পীয় দশা বিশোধন (Vapor Phase Refining)**।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | ভয় পাওয়ার কিছু নেই, নামটা একটু গালভরা হলেও এর পেছনের বুদ্ধিটা কিন্তু খুব সহজ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### চলো একটা মজার গল্প দিয়ে শুরু করি: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | মনে করো, তোমার কাছে এক মুঠো কাদা আর বালি আছে, আর তার ভেতরে লোহার কিছু অতিক্ষুদ্র কণা মিশে আছে। তুমি হাত দিয়ে বেছে লোহা আলাদা করতে পারছ না। এখন যদি এমন কোনো জাদুকরী বাতাস থাকত যা শুধু লোহার সাথে মিশে তাকে গ্যাস বা বাষ্প বানিয়ে উড়িয়ে নিয়ে যেতে পারত, আর কাদা-বালি নিচে পড়ে থাকত—তাহলে কেমন হতো? তারপর সেই গ্যাসকে অন্য পাত্রে নিয়ে ঠান্ডা করলেই খাঁটি লোহা নিচে জমা হয়ে যেত!  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | ঠিক এই বুদ্ধিটাই কাজে লাগানো হয় **বাষ্পীয় দশা বিশোধনে**। | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Definition and two-step mechanism of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines vapour phase refining and explains the two fundamental steps: forming a volatile compound from crude metal, followed by thermal decomposition to obtain pure metal.

Accuracy: **accurate**. The general definition and explanation of the two-step mechanism are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | ### বাষ্পীয় দশা বিশোধন আসলে কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | এটি ধাতু শোধনের এমন একটি পদ্ধতি যেখানে **অবিশুদ্ধ ধাতুকে প্রথমে একটি উপযুক্ত পদার্থের সাথে বিক্রিয়া করিয়ে বাষ্পে (উদ্বায়ী যৌগে) পরিণত করা হয়**। ফলে ভেজালগুলো নিচে পড়ে থাকে। এরপর সেই বাষ্পকে অন্য জায়গায় নিয়ে গিয়ে **উচ্চ তাপে ভেঙে ফেললে একদম খাঁটি ধাতু পাওয়া যায়।** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | এই পদ্ধতিতে মূল কাজ হয় **দুটি ধাপে**: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p12 | 1. **ধাপ ১ (উদ্বায়ী যৌগ তৈরি):** অবিশুদ্ধ ধাতুকে একটি বিকারকের (Reagent) সাথে উত্তপ্ত করা হয়। ধাতুটির সাথে বিক্রিয়া করে বিকারকটি একটি &#x27;উদ্বায়ী&#x27; (সহজে বাষ্প হয়ে যায় এমন) যৌগ তৈরি করে উড়ে চলে যায়। কিন্তু ভেজালগুলো বিক্রিয়া করে না, তাই পাত্রেই পড়ে থাকে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p13 | 2. **ধাপ ২ (যৌগ ভেঙে ধাতু উদ্ধার):** সেই বাষ্পকে আলাদা পাত্রে নিয়ে আরও বেশি তাপে উত্তপ্ত করা হয়। এতে যৌগটি ভেঙে যায় এবং বিকারকটি উড়ে চলে যায়, আর আমরা পেয়ে যাই **১০০% খাঁটি ধাতু**। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Mond process for refining nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining with the Mond process for nickel, providing reaction conditions, chemical formulas, and equations.

Accuracy: **accurate**. The chemical reactions, reactants, products, and temperature ranges (330-350 K and 450-470 K) for the Mond process are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### বিজ্ঞানের দুটি বিখ্যাত উদাহরণ (যা পরীক্ষায় প্রায়ই আসে): | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | এই পদ্ধতির দুটো বিখ্যাত প্রয়োগ তোমাদের সিলেবাসে থাকে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | #### ১. মন্ডের পদ্ধতি (Mond Process) - নিকেল (Ni) শোধনে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | * **ধাপ ১:** অবিশুদ্ধ নিকেলকে কার্বন মনোক্সাইড ($CO$) গ্যাসের সাথে প্রায় ৩৩০-৩৫০ কেলভিন তাপমাত্রায় উত্তপ্ত করা হয়। এতে তৈরি হয় **নিকেল টেট্রাকার্বনিল** [$Ni(CO)_4$] বাষ্প। ভেজাল নিচে পড়ে থাকে। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 |   $$Ni (\text{অবিশুদ্ধ}) + 4CO \xrightarrow{330-350 K} Ni(CO)_4 (\text{বাষ্প})$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p20 | * **ধাপ ২:** এই বাষ্পকে আরও বেশি তাপে (৪৫০-৪৭০ কেলভিন) গরম করলে এটি ভেঙে গিয়ে একদম **খাঁটি নিকেল ধাতু** পাওয়া যায়। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p21 |   $$Ni(CO)_4 \xrightarrow{450-470 K} Ni (\text{খাঁটি}) + 4CO$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u4: Van Arkel method for refining zirconium and titanium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates vapour phase refining with the Van Arkel method used for refining zirconium or titanium using iodine and a hot tungsten filament.

Accuracy: **accurate**. The description of forming volatile iodides and their decomposition on a heated tungsten filament in the Van Arkel process is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | #### ২. ভ্যান-আর্কেল পদ্ধতি (Van Arkel Method) - জিরকোনিয়াম (Zr) বা টাইটানিয়াম (Ti) শোধনে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | * এখানে টাইটানিয়াম বা জিরকোনিয়াম ধাতুকে আয়োডিন ($I_2$) বাষ্পের সাথে উত্তপ্ত করে উদ্বায়ী আয়োডাইড তৈরি করা হয়। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | * পরে একটি অত্যন্ত উত্তপ্ত টাংস্টেন তারের ওপর সেই বাষ্প পাঠালে তা ভেঙে গিয়ে তারের গায়ে খাঁটি ধাতু জমা হয়। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u5: Prerequisites and conditions for vapour phase refining (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines the specific requirements and boundary conditions under which a metal can be refined using this technique.

Accuracy: **accurate**. The two essential conditions (forming an easily volatilized compound with an available reagent, and ease of thermal decomposition) are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p26 | ### এই পদ্ধতির দুটি সোনালী শর্ত: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | সব ধাতুকে কিন্তু এভাবে বাষ্প বানিয়ে শোধন করা যায় না। এর জন্য দুটো শর্ত মানতে হয়: | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p28 | ১. ধাতুটিকে এমন কোনো বিকারক পেতে হবে, যার সাথে বিক্রিয়া করে সে **সহজেই বাষ্প হতে পারে**। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |
| p29 | ২. সেই বাষ্প হওয়া যৌগটিকে যেন খুব সহজেই তাপে **ভেঙে ফেলা যায়** (যেন খাঁটি ধাতু সহজে ফিরে পাওয়া যায়)। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;] |

## u6: Concise summary recap of the refining steps (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick, high-level summary flow for students to easily remember the overall refining process, along with closing encouragement.

Accuracy: **accurate**. The summary accurately captures the fundamental logic of the process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ### সংক্ষেপে মনে রাখার টিপস: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | **অবিশুদ্ধ ধাতু $\rightarrow$ বাষ্প বানাও (ভেজাল ফেলে দাও) $\rightarrow$ বাষ্প ভেঙে খাঁটি ধাতু নাও!** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p32 | কী, খুব বেশি কঠিন মনে হলো? কোনো জায়গা বুঝতে সমস্যা হলে নিঃসংকোচে আমাকে প্রশ্ন করতে পারো! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

