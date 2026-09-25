# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains covalent radius thoroughly and accurately in Bengali, covering its definition, calculation formula with a worked example, the reason for the term, and trends across periods and down groups.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 42,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 42,
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

## u1: Definition of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what covalent radius is as half the internuclear distance between two identical bonded atoms.

Accuracy: **accurate**. The definition of covalent radius as half the distance between the nuclei of two identical covalently bonded atoms is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **সমযোজী ব্যাসার্ধ (Covalent Radius)** হলো কোনো পরমাণুর আকার বোঝানোর একটি উপায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | যখন দুটি একই ধরনের পরমাণু **সমযোজী বন্ধন** (covalent bond) তৈরি করে, তখন তাদের নিউক্লিয়াস দুটির মধ্যকার দূরত্ব মাপা যায়। এই দূরত্বের অর্ধেককে প্রতিটি পরমাণুর **সমযোজী ব্যাসার্ধ** বলা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### সহজ সংজ্ঞা   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | দুটি একই পরমাণুর মধ্যে সমযোজী বন্ধনের দৈর্ঘ্যের অর্ধেক = সেই পরমাণুর সমযোজী ব্যাসার্ধ। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Formula and worked calculation for chlorine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the covalent radius formula to a Cl2 molecule with given bond length 198 pm to compute the covalent radius of Cl as 99 pm, including the definition of picometer.

Accuracy: **accurate**. The formula, the Cl-Cl bond length (198 pm), the calculation yielding 99 pm, and the definition of 1 pm = 10^-12 m are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### সূত্র   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | ধরা যাক, দুটি ক্লোরিন পরমাণু যুক্ত হয়ে \(Cl_2\) অণু তৈরি করেছে। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p8 | \text{সমযোজী ব্যাসার্ধ} = \frac{\text{দুই নিউক্লিয়াসের মধ্যকার দূরত্ব}}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p9 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | যদি \(Cl-Cl\) বন্ধনের দৈর্ঘ্য 198 pm হয়, তাহলে— | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | \text{Cl-এর সমযোজী ব্যাসার্ধ} = \frac{198}{2} = 99 \text{ pm} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p13 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p14 | এখানে **pm (পিকোমিটার)** খুব ক্ষুদ্র দৈর্ঘ্যের একক। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p16 | 1 \text{ pm} = 10^{-12} \text{ m} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p17 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Why the radius is called covalent (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that the radius is specifically determined for atoms engaged in electron-sharing covalent bonds, citing examples like H2, Cl2, and O2.

Accuracy: **accurate**. The clarification of electron sharing forming covalent bonds and the illustrative diatomic molecules are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ## কেন এটি “সমযোজী” ব্যাসার্ধ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | কারণ এই ব্যাসার্ধ নির্ণয় করা হয় এমন পরমাণুর ক্ষেত্রে, যারা ইলেকট্রন ভাগাভাগি করে সমযোজী বন্ধন তৈরি করে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | যেমন: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | - \(H_2\)-এ H–H বন্ধন   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 | - \(Cl_2\)-এ Cl–Cl বন্ধন   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | - \(O_2\)-এ O=O বন্ধন   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Trend across a period (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that covalent radius decreases across a period from left to right due to increasing nuclear charge pulling electrons closer, with the example of Na > Mg > Al.

Accuracy: **accurate**. The explanation of increasing nuclear attraction causing a decrease in atomic/covalent radius across a period, and the relative sizes Na > Mg > Al, are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p26 | ## পর্যায় সারণিতে সমযোজী ব্যাসার্ধের পরিবর্তন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p27 | ### ১. পর্যায়ে বাম থেকে ডানে গেলে | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | সমযোজী ব্যাসার্ধ সাধারণত **কমে যায়**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p29 | কারণ: নিউক্লিয়াসে প্রোটনের সংখ্যা বাড়ে, ফলে ইলেকট্রনগুলো আরও বেশি আকর্ষিত হয়ে নিউক্লিয়াসের কাছে চলে আসে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | উদাহরণ:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p31 | Na-এর ব্যাসার্ধ &gt; Mg-এর ব্যাসার্ধ &gt; Al-এর ব্যাসার্ধ | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Trend down a group (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that covalent radius increases down a group due to the addition of electron shells, with the halogen example F < Cl < Br < I.

Accuracy: **accurate**. The increase in radius down a group due to additional electron shells and the halogen order F < Cl < Br < I are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ### ২. গ্রুপে ওপর থেকে নিচে গেলে | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | সমযোজী ব্যাসার্ধ সাধারণত **বাড়ে**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p34 | কারণ: নিচে নামার সঙ্গে সঙ্গে নতুন নতুন ইলেকট্রন স্তর বা খোলস যুক্ত হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p35 | উদাহরণ:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p36 | F &lt; Cl &lt; Br &lt; I | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p37 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Quick summary of covalent radius and trends (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise bulleted recap of the key definition and periodic trends, followed by a concluding summary sentence.

Accuracy: **accurate**. All summary points accurately reflect the established chemical concepts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p38 | ## মনে রাখার সহজ কৌশল | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | - **বন্ধনের দূরত্বের অর্ধেক** = সমযোজী ব্যাসার্ধ   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p40 | - পর্যায়ে **বাম থেকে ডানে কমে**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p41 | - গ্রুপে **ওপর থেকে নিচে বাড়ে** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p42 | সংক্ষেপে, সমযোজী ব্যাসার্ধ আমাদের বলে দেয়—সমযোজী বন্ধনের সময় একটি পরমাণু মোটামুটি কতটা স্থান দখল করে। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

