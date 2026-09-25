# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly explains covalent radius, covering why isolated atomic radius cannot be directly measured, the concept of measuring internuclear distance in a covalent bond, the formal definition and formula, a worked chlorine example, periodic trends, and a summary recap.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 33,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "ANALOGY": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 33,
  "unique_subtopics": 6,
  "contextualization": {
    "none": 6,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Difficulty of measuring the radius of an isolated atom (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why measuring the radius of a single isolated atom is nearly impossible due to the lack of a sharp boundary in the electron cloud.

Accuracy: **accurate**. Correctly explains that atoms have diffuse electron clouds without definite physical boundaries, preventing direct measurement of isolated atomic size.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | স্নেহের শিক্ষার্থী, রসায়নের ক্লাসে তোমাকে স্বাগতম! আজকে আমরা খুব সহজ ও সুন্দর একটি ধারণা নিয়ে কথা বলব, যার নাম **সমযোজী ব্যাসার্ধ (Covalent Radius)**।  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | ভয় পাওয়ার কিচ্ছু নেই, নামটা একটু গালভরা হলেও বিষয়টা কিন্তু পানির মতো সহজ। চলো, ধাপে ধাপে বুঝি। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### ১. সমস্যাটা কোথায়? (পরমাণুর আকার মাপা কেন কঠিন?) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | তুমি নিশ্চয়ই জানো, পরমাণুর কেন্দ্রে থাকে নিউক্লিয়াস আর বাইরে ঘোরে ইলেকট্রন। কিন্তু সমস্যা হলো, পরমাণুর কোনো শক্ত বা নির্দিষ্ট সীমানা নেই—ঠিক যেমন মেঘের কোনো নির্দিষ্ট সীমানা থাকে না! ইলেকট্রনগুলো মেঘের মতো ছড়িয়ে থাকে। তাহলে একটা পরমাণু ঠিক কতটা বড়, অর্থাৎ এর ব্যাসার্ধ কত, তা একা একা মাপা প্রায় অসম্ভব।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Using covalent bonding to measure atomic radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how scientists overcome the boundary problem by measuring two bonded identical atoms sharing electrons.

Accuracy: **accurate**. Accurately introduces the concept of measuring bonded atoms sharing electrons in a covalent bond.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ### ২. সমাধান: &quot;কোলাকুলি&quot; বা সমযোজী বন্ধন! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | বিজ্ঞানীরা এই সমস্যার সমাধান করলেন দারুণ এক উপায়ে। তাঁরা বললেন, &quot;যেহেতু একটা পরমাণুর সীমানা মাপা যাচ্ছে না, চলো দুটো পরমাণুকে একসাথে যুক্ত করে মাপি!&quot;  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p8 | যখন একই ধরনের দুটি পরমাণু পরস্পরের সাথে ইলেকট্রন শেয়ার করে **সমযোজী বন্ধন (Covalent Bond)** তৈরি করে, তখন তারা খুব কাছাকাছি চলে আসে।  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Hugging friend analogy for covalent radius measurement (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p10", "quote": "ধরে নাও, তুমি আর তোমার বন্ধু দুজনে হাত ধরে খুব শক্ত করে একটা কোলাকুলি করলে। এখন তোমাদের দুজনের বুকের ঠিক মাঝখানের (হৃৎপিণ্ডের) দূরত্ব মেপে তাকে যদি দুই দিয়ে ভাগ করা যায়, তবে কি তোমাদের প্রত্যেকের শরীরের আনুমানিক প্রস্থ পাওয়া যাবে না?"}]}

Annotation rationale: Uses a cross-domain comparison of two friends hugging tightly and halving the distance between their centers to approximate width.

Accuracy: **accurate**. The analogy accurately models the relationship between internuclear distance and single-atom radius in a homonuclear diatomic system.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | **একটি সহজ উদাহরণ ভাবো:**  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;prose&#x27;] |
| p10 | ধরে নাও, তুমি আর তোমার বন্ধু দুজনে হাত ধরে খুব শক্ত করে একটা কোলাকুলি করলে। এখন তোমাদের দুজনের বুকের ঠিক মাঝখানের (হৃৎপিণ্ডের) দূরত্ব মেপে তাকে যদি দুই দিয়ে ভাগ করা যায়, তবে কি তোমাদের প্রত্যেকের শরীরের আনুমানিক প্রস্থ পাওয়া যাবে না?  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p11 | ঠিক এই কাজটাই পরমাণুর ক্ষেত্রে করা হয়! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u4: Formal definition and mathematical formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides the formal chemistry definition of covalent radius for single-bonded homonuclear atoms along with the formula r = d/2.

Accuracy: **accurate**. The definition correctly specifies two identical atoms bonded by a single covalent bond and defines covalent radius as half the internuclear distance (r = d/2).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p13 | ### ৩. সমযোজী ব্যাসার্ধের সহজ সংজ্ঞা | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | &gt; **&quot;একই মৌলের দুটি পরমাণু যখন একক সমযোজী বন্ধনে আবদ্ধ থাকে, তখন তাদের নিউক্লিয়াস দুটির মধ্যবর্তী দূরত্বের অর্ধেককে ওই মৌলের সমযোজী ব্যাসার্ধ বলে।&quot;** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | গাণিতিকভাবে বললে: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p16 | $$r = \frac{d}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p17 | *(এখানে, $r$ হলো সমযোজী ব্যাসার্ধ, আর $d$ হলো দুটি নিউক্লিয়াসের মাঝখানের দূরত্ব বা Internuclear Distance)* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: Covalent radius calculation for chlorine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through the calculation of chlorine's covalent radius using experimental Cl2 internuclear distance (198 pm / 2 = 99 pm).

Accuracy: **accurate**. The bond distance in Cl2 is accurately given as 198 pm, and the calculation yields the correct covalent radius of 99 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p19 | ### ৪. একটা বাস্তব উদাহরণ দেখা যাক: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | ক্লোরিন গ্যাসের কথা ভাবো। ক্লোরিন গ্যাস প্রকৃতিতে $Cl_2$ অণু হিসেবে থাকে (দুটো ক্লোরিন পরমাণু একসাথে জোড়া লেগে থাকে)।  | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p21 | * এক্স-রে বা বিশেষ যন্ত্র দিয়ে মেপে দেখা গেছে, $Cl_2$ অণুতে থাকা দুটো ক্লোরিন পরমাণুর নিউক্লিয়াসের মধ্যকার দূরত্ব হলো **১৯৮ পিকোমিটার (pm)**।  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | * তাহলে একটি ক্লোরিন পরমাণুর সমযোজী ব্যাসার্ধ কত হবে?  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 | * খুব সহজ! $\frac{১৯৮}{২} = \mathbf{৯৯\text{ পিকোমিটার}}$।  | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;, &#x27;prose&#x27;] |
| p24 | ব্যস, কত সহজে আমরা একটা ক্লোরিন পরমাণুর আকার জেনে গেলাম! | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Periodic trends in covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the periodic trends across periods (decreasing due to increased nuclear charge) and down groups (increasing due to additional electron shells).

Accuracy: **accurate**. Correctly states and explains the trends across periods (decreases left to right) and down groups (increases top to bottom) with sound physical reasons.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p26 | ### ৫. পর্যায় সারণিতে এর নিয়ম (পরীক্ষার জন্য খুব জরুরি!) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | পর্যায় সারণিতে (Periodic Table) এটি কীভাবে পরিবর্তিত হয়, তা মনে রাখা খুব সহজ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | ১. **বাম থেকে ডানে গেলে কমে:** পর্যায় সারণির একই পর্যায়ে তুমি যত বাম দিক থেকে ডান দিকে যাবে, পরমাণুর ব্যাসার্ধ তত **কমবে**। কারণ প্রোটন সংখ্যা বাড়ে, ফলে আকর্ষণ বেড়ে পরমাণুটা একটু সংকুচিত বা ছোট হয়ে যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 | ২. **উপর থেকে নিচে গেলে বাড়ে:** একই গ্রুপে তুমি যত উপর থেকে নিচে নামবে, ব্যাসার্ধ তত **বাড়বে**। কারণ প্রতি ধাপে পরমাণুতে নতুন নতুন কক্ষপথ বা শেল (Shell) যুক্ত হয়, ঠিক যেন পরমাণুটি একটা নতুন জামা গায়ে চড়াচ্ছে! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Recap of how covalent radius is determined (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick step-by-step summary of finding covalent radius, along with closing teacher-student remarks.

Accuracy: **accurate**. The summary flow accurately captures the essential steps in determining covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p31 | **সংক্ষেপে মনে রাখার উপায়:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p32 | দুটো অভিন্ন পরমাণু জোড়া লাগবে $\rightarrow$ তাদের কেন্দ্র দুটির দূরত্ব মাপা হবে $\rightarrow$ সেই দূরত্বকে ২ দিয়ে ভাগ করলেই পেয়ে যাবে **সমযোজী ব্যাসার্ধ**! | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p33 | কেমন লাগল বিষয়টি? কোনো অংশ বুঝতে কি কোনো অসুবিধা হয়েছে? লাগলে বলো, আমি আবারও বুঝিয়ে দেব! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

