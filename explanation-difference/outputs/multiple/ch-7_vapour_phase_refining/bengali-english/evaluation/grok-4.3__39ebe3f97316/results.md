# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains vapour phase refining in Bengali, covering its basic principle, the Mond and Van Arkel processes, and its key advantages.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 21,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 21,
  "unique_subtopics": 4,
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

## u1: Definition and basic principle of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces vapour phase refining and explains how impure metals are converted to volatile compounds and subsequently decomposed into pure metals.

Accuracy: **accurate**. Accurately describes the core mechanism of vapour phase refining: formation of a volatile compound and its subsequent thermal decomposition leaving impurities behind.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | প্রিয় ছাত্র/ছাত্রী, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | আজ আমরা ধাতু পরিশোধনের একটি গুরুত্বপূর্ণ পদ্ধতি **বাষ্পীয় পর্যায় পরিশোধন** (Vapour phase refining) সম্পর্কে সহজ ভাষায় জানব। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### বাষ্পীয় পর্যায় পরিশোধন কী? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | এটি এমন একটি পদ্ধতি যেখানে অশুদ্ধ ধাতুকে প্রথমে একটি **উদ্বায়ী** (volatile) যৌগে পরিণত করা হয়। এই যৌগটি সহজেই বাষ্প হয়ে উড়ে যায়। পরে এই বাষ্পকে উচ্চ তাপমাত্রায় গরম করলে যৌগটি ভেঙে **বিশুদ্ধ ধাতু** তৈরি হয়। অমেধ্যগুলো এই প্রক্রিয়ায় যৌগ গঠন করে না বলে আলাদা হয়ে যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | সহজ কথায়: ধাতুকে “বাষ্প বানিয়ে” নিয়ে তারপর আবার “ফিরিয়ে আনা” হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Mond's process for nickel refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides Mond's process as a concrete industrial example of vapour phase refining for nickel using carbon monoxide.

Accuracy: **accurate**. The reaction conditions (50–60 °C for carbonyl formation, ~230 °C for decomposition) and balanced chemical equations for Mond's process are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### দুটি গুরুত্বপূর্ণ উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | **১. মন্ড প্রক্রিয়া (Mond’s process) — নিকেল পরিশোধন** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | - অশুদ্ধ নিকেলকে কার্বন মনোক্সাইড (CO) গ্যাসের সাথে ৫০–৬০° সেলসিয়াস তাপমাত্রায় বিক্রিয়া করানো হয়। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - ফলে নিকেল টেট্রাকার্বনিল নামে একটি উদ্বায়ী যৌগ তৈরি হয়:   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 |   **Ni (অশুদ্ধ) + 4CO → Ni(CO)₄** (বাষ্প) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p11 | - এই বাষ্পকে ২৩০° সেলসিয়াস তাপমাত্রায় গরম করলে যৌগটি ভেঙে বিশুদ্ধ নিকেল জমা হয়:   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 |   **Ni(CO)₄ → Ni (বিশুদ্ধ) + 4CO** | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u3: Van Arkel process for titanium refining (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the Van Arkel process as another key example of vapour phase refining using iodine.

Accuracy: **accurate**. Accurately represents the chemical equation and operational setup (tungsten filament decomposition) of the Van Arkel process.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | **২. ভ্যান আরকেল প্রক্রিয়া (Van Arkel process) — টাইটানিয়াম বা জিরকোনিয়াম পরিশোধন** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - অশুদ্ধ টাইটানিয়ামকে আয়োডিনের সাথে বিক্রিয়া করিয়ে টাইটানিয়াম টেট্রা-আয়োডাইড তৈরি করা হয়:   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 |   **Ti + 2I₂ → TiI₄** (বাষ্প) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | - এই বাষ্পকে একটি খুব গরম তারের (tungsten filament) উপর দিয়ে চালনা করা হয়। TiI₄ ভেঙে বিশুদ্ধ টাইটানিয়াম তারের উপর জমা হয় এবং আয়োডিন আলাদা হয়ে যায়। | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Advantages and significance of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why vapour phase refining is used, noting high purity yield and separation from unreactive impurities.

Accuracy: **accurate**. The explanation of the advantages and purity levels achievable is standard and scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### কেন এই পদ্ধতি ব্যবহার করা হয়? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | - যেসব ধাতু উদ্বায়ী যৌগ তৈরি করতে পারে, সেগুলোকে খুব উচ্চ বিশুদ্ধতায় (৯৯.৯%+) পাওয়া যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | - অমেধ্যগুলো সাধারণত এই যৌগ গঠন করে না, তাই সহজেই আলাদা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Summary scheme and closing remark (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick summary flow (ধাতু → উদ্বায়ী যৌগ → বিশুদ্ধ ধাতু) to reinforce learning, followed by a closing remark.

Accuracy: **accurate**. The schematic summary correctly captures the core steps of the refining method.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | এই পদ্ধতি বোঝার জন্য মনে রাখো: **“ধাতু → উদ্বায়ী যৌগ (বাষ্প) → বিশুদ্ধ ধাতু”**। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p21 | কোনো অংশ বুঝতে অসুবিধা হলে বা আরও উদাহরণ চাইলে বলো! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

