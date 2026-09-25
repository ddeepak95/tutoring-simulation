# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly addresses the requested topic of covalent radius in Bengali, explaining its definition, an intuitive physical analogy, calculation method with a worked example, periodic trends across periods and groups, and key qualifying conditions.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 30,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "EXAMPLE": 1,
    "CAVEAT": 1
  },
  "nested_passages": 30,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 5,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 5,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius and why direct measurement of atomic radius is impossible (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why an isolated atom's radius cannot be measured directly due to fuzzy electron clouds, and defines covalent radius as half the distance between the nuclei of two identical atoms joined by a single covalent bond.

Accuracy: **accurate**. The explanation of the electron cloud preventing direct scale measurement and the standard introductory definition of covalent radius are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | হ্যালো! কেমন আছো? আজ আমরা রসায়নের খুব মজার এবং গুরুত্বপূর্ণ একটা বিষয় সহজভাবে শিখব। বিষয়টি হলো—**সমযোজী ব্যাসার্ধ (Covalent Radius)**। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | আমরা জানি, বৃত্তের কেন্দ্র থেকে পরিধি পর্যন্ত দূরত্বকে ব্যাসার্ধ বলে। কিন্তু পরমাণুর তো কোনো শক্ত সীমানা বা দেয়াল নেই; এর বাইরে থাকে ইলেকট্রনের মেঘ। তাই স্কেল দিয়ে একা একটা পরমাণুর ব্যাসার্ধ মাপা অসম্ভব!  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | তাহলে বিজ্ঞানীরা এটা কীভাবে মাপেন? চলো দেখে নেওয়া যাক। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p5 | ### সমযোজী ব্যাসার্ধ কী? (সহজ সংজ্ঞা) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | যখন **একই মৌলের দুটি পরমাণু** একক সমযোজী বন্ধন (single covalent bond) দিয়ে পরস্পরের সাথে যুক্ত থাকে, তখন **তাদের নিউক্লিয়াস দুটির মধ্যবর্তী দূরত্বের অর্ধেককে** ওই মৌলের **সমযোজী ব্যাসার্ধ** বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Clay sphere overlap analogy for covalent radius (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p8", "quote": "মনে করো, তোমার কাছে দুটো একই সাইজের নরম মাটির বা প্লাস্টিসিনের গোলক আছে। তুমি গোলক দুটোকে চেপে একসাথে জোড়া লাগিয়ে দিলে।"}]}

Annotation rationale: Uses an everyday analogy of pressing two soft clay or plasticine spheres together and dividing the inter-center distance by two to illustrate covalent bonding overlap and covalent radius calculation.

Accuracy: **accurate**. The analogy accurately captures overlapping electron clouds during covalent bond formation and the geometric definition of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | &gt; **একটি সহজ উদাহরণ দিয়ে বুঝি:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | &gt; মনে করো, তোমার কাছে দুটো একই সাইজের নরম মাটির বা প্লাস্টিসিনের গোলক আছে। তুমি গোলক দুটোকে চেপে একসাথে জোড়া লাগিয়ে দিলে। এতে তাদের কিছুটা অংশ একে অপরের ভেতর ঢুকে গেল (যেমনটা সমযোজী বন্ধনে ইলেকট্রন শেয়ারের সময় হয়)। এখন যদি তুমি প্রথম গোলকের কেন্দ্র থেকে দ্বিতীয় গোলকের কেন্দ্রের দূরত্ব মেপে তাকে **দুই দিয়ে ভাগ** করো, তবেই তুমি গোলকটির ব্যাসার্ধ পাবে। | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Mathematical expression of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the mathematical formula for covalent radius as half the internuclear distance d between two homonuclear bonded atoms.

Accuracy: **accurate**. The algebraic relation r = d/2 for homonuclear single covalent bonds is accurately presented.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p10 | ### গাণিতিক রূপ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | ধরি, একই মৌলের দুটি পরমাণু সমযোজী বন্ধনে আবদ্ধ।  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | * তাদের নিউক্লিয়াসদ্বয়ের মধ্যবর্তী দূরত্ব = $d$  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | * তাহলে, সমযোজী ব্যাসার্ধ, $r = \frac{d}{2}$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;, &#x27;list&#x27;] |

## u4: Worked calculation of chlorine covalent radius (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates the application of the formula using the chlorine molecule (Cl2) with an internuclear bond distance of 198 pm, calculating the covalent radius as 99 pm.

Accuracy: **accurate**. The bond length of 198 pm for Cl2 and the resulting covalent radius calculation of 99 pm are chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | **বাস্তব উদাহরণ:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | ক্লোরিন অণুর ($Cl_2$) ক্ষেত্রে দুটি ক্লোরিন পরমাণুর নিউক্লিয়াসের মধ্যকার দূরত্ব হলো **১৯৮ পিকোমিটার (pm)**।  | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p16 | তাহলে ক্লোরিনের সমযোজী ব্যাসার্ধ হবে: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | $$r = \frac{১৯৮}{২} = ৯৯ \text{ পিকোমিটার (pm)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u5: Periodic trends of covalent radius across periods and groups (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how covalent radius changes across periods (decreases due to increasing effective nuclear charge) and down groups (increases due to addition of energy levels/shells).

Accuracy: **accurate**. The trends across periods and down groups, as well as their underlying physical reasons (nuclear charge vs. addition of electron shells), are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p19 | ### পর্যায় সারণিতে এটি কীভাবে পরিবর্তিত হয়? (পরীক্ষার জন্য খুব জরুরি!) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | ১. **পর্যায় বরাবর (বাম থেকে ডানে):** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p21 | * সমযোজী ব্যাসার্ধ সাধারণত **কমে**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | * **কারণ:** বাম থেকে ডানে গেলে নতুন কোনো কক্ষপথ যুক্ত হয় না, কিন্তু প্রোটন ও ইলেকট্রন সংখ্যা বাড়ে। ফলে নিউক্লিয়াসের আকর্ষণ বল বেড়ে যায় এবং পরমাণু সংকুচিত হয়ে ছোট হয়ে যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p23 | ২. **শ্রেণি বা গ্রুপ বরাবর (ওপর থেকে নিচে):** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p24 | * সমযোজী ব্যাসার্ধ সাধারণত **বাড়ে**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 | * **কারণ:** ওপর থেকে নিচে নামলে প্রতি ধাপে একটি করে নতুন শক্তিস্তর (কক্ষপথ) যুক্ত হয়। ফলে নিউক্লিয়াস থেকে বাইরের স্তরের দূরত্ব স্বাভাবিকভাবেই বেড়ে যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Necessary conditions for defining single-bond covalent radius (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Specifies two qualifying conditions required for this standard introductory definition of covalent radius: homonuclear atoms and single bond linkage.

Accuracy: **contains_error**. The text lists O2 alongside H2 and Cl2 as examples of molecules meeting the conditions for determining single-bond covalent radius, but O2 contains a double bond (O=O), contradicting the stated single-bond condition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p27 | ### মনে রাখার মতো দুটি জরুরি শর্ত: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | ১. পরমাণু দুটিকে অবশ্যই **একই মৌলের** হতে হবে (যেমন: $H_2, Cl_2, O_2$ ইত্যাদি)। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p29 | ২. তাদের মধ্যে **একক বন্ধন** (Single bond) থাকতে হবে। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p30 | আশা করি সমযোজী ব্যাসার্ধের ধারণাটি তোমার কাছে একদম পরিষ্কার হয়েছে! কোনো জায়গায় বুঝতে সমস্যা হলে দ্বিধা না করে আমাকে বলো। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

Error (minor; p28): O2 is cited as an example of a molecule satisfying the requirements for single-bond covalent radius measurement, but O2 contains a double covalent bond rather than a single bond.

Correction: Replace O2 with a single-bonded homonuclear diatomic molecule such as F2, Br2, or I2.

