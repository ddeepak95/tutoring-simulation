# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response accurately and clearly explains covalent radius in Bengali, covering its definition in homonuclear molecules, calculation in heteronuclear compounds, worked examples, periodic trends, and distinction from isolated atomic radius.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 16,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 3,
    "CAVEAT": 1
  },
  "nested_passages": 16,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 7
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of covalent radius in homonuclear diatomic molecules (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces bond length and defines covalent radius as half of the internuclear distance between two identical bonded atoms.

Accuracy: **accurate**. The definition of covalent radius in homonuclear diatomic molecules is scientifically standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | সহজ ভাষায় বোঝাই। তোমরা ইতিমধ্যে জানো যে সমযোজী বন্ধন গঠনের সময় দুটো পরমাণুর মধ্যে কিছুটা দূরত্ব থাকে। আর এই দূরত্বকে বলা হয় বন্ধন দৈর্ঘ্য (bond length)। এখন, সমযোজী বন্ধনে আবদ্ধ দুটি একই মৌলের একই ধরনের পরমাণুর নিউক্লিয়াসদ্বয়ের মধ্যবর্তী দূরত্বের অর্ধেককে ঐ মৌলের সমযোজী ব্যাসার্ধ বলে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Covalent radius calculation for chlorine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates calculation of the covalent radius of chlorine using Cl2 bond length.

Accuracy: **accurate**. The internuclear distance of Cl2 (198 pm) and the resulting radius (99 pm) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p2 | উদাহরণ হিসেবে বলা যায়, ক্লোরিন অনু Cl2 তে দুটি ক্লোরিন পরমাণু সমযোজী বন্ধনে আবদ্ধ থাকে। পরীক্ষার মাধ্যমে দেখা গেছে এই বন্ধনে আবদ্ধ দুটি ক্লোরিন পরমাণুর নিউক্লিয়াসের মধ্যবর্তী দূরত্ব ১৯৮ পিকোমিটার। সুতরাং ক্লোরিনের সমযোজী ব্যাসার্ধ হবে $\frac{198}{2}$ = 99 পিকোমিটার। | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |

## u3: Covalent radius calculation for hydrogen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates calculation of the covalent radius of hydrogen using H2 bond length.

Accuracy: **accurate**. The internuclear distance of H2 (74 pm) and the resulting radius (37 pm) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | এভাবে হাইড্রোজেন অণুতে (H2) হাইড্রোজেন পরমাণুদ্বয়ের নিউক্লিয়াসের মধ্যবর্তী দূরত্ব 74 pm। সুতরাং হাইড্রোজেনের সমযোজী ব্যাসার্ধ $\frac{74}{2}$ = 37 pm. | EXAMPLE | {} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |

## u4: Additivity principle in heteronuclear covalent bonds (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the covalent bond length in heteronuclear molecules approximates the sum of the covalent radii of the bonded atoms.

Accuracy: **accurate**. The additivity principle (r_A + r_B = d(A-B)) is correctly stated as the standard method for determining unknown covalent radii.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | কিন্তু যদি দুটি ভিন্ন মৌলের দুটি পরমাণু সমযোজী বন্ধনে আবদ্ধ হয় তবে তাদের সমযোজী ব্যাসার্ধের যোগফল ঐ যৌগের বন্ধন দৈর্ঘ্যের সমান হবে। যেমন- HCl অণুতে হাইড্রোজেন ও ক্লোরিন পরমাণুদ্বয়ের সমযোজী ব্যাসার্ধের যোগফল হবে বন্ধন দৈর্ঘ্যের সমান। অর্থাৎ, rH + rCl = d(H–Cl)। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;, &#x27;equation&#x27;] |
| p5 | এখানে, rH হলো হাইড্রোজেনের সমযোজী ব্যাসার্ধ, rCl হলো ক্লোরিনের সমযোজী ব্যাসার্ধ এবং d(H–Cl) হলো HCl এর বন্ধন দৈর্ঘ্য। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | এখন যদি আমরা rH ও d(H–Cl) এর মান জানি তবে আমরা সহজেই rCl বের করতে পারবো। আর এভাবেই আমরা যেকোনো মৌলের সমযোজী ব্যাসার্ধ বের করতে পারব। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u5: Worked example calculating carbon covalent radius from CCl4 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a complete step-by-step problem finding the covalent radius of carbon in carbon tetrachloride.

Accuracy: **accurate**. The calculation 176 pm - 99 pm = 77 pm is arithmetic and scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | তোমাদের বোঝার সুবিধার্থে আরেকটি উদাহরণ দেই। কার্বন টেট্রাক্লোরাইড (CCl4) তে C-Cl বন্ধন দৈর্ঘ্য 176 pm এবং ক্লোরিনের সমযোজী ব্যাসার্ধ 99 pm হলে কার্বনের সমযোজী ব্যাসার্ধ কত? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | আমরা জানি, rC + rCl = d(C–Cl) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p9 | বা, rC = d(C–Cl) - rCl | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 | বা, rC = 176 - 99 = 77 pm | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p11 | অর্থাৎ কার্বনের সমযোজী ব্যাসার্ধ 77 pm. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius decreases across a period and increases down a group in the periodic table.

Accuracy: **accurate**. The rationale for periodic trends (nuclear charge increasing across a period, addition of shells down a group) is factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | এখন প্রশ্ন হলো সমযোজী ব্যাসার্ধ নিয়ে আমাদের এত মাথাব্যথা কেন? আসলে এটা খুবই গুরুত্বপূর্ণ একটা টপিক। কারণ এর সাথে পর্যায় সারণীর মৌলসমূহের ধর্মের একটা সম্পর্ক আছে। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | পর্যায় সারণীর যেকোনো পর্যায়ে বাম থেকে ডানে গেলে সমযোজী ব্যাসার্ধ কমতে থাকে। কারণ বাম থেকে ডানে গেলে পরমাণুর আধান বা চার্জ বাড়তে থাকে। ফলে নিউক্লিয়াসের আকর্ষণ শক্তি বাড়ে এবং ইলেকট্রন মেঘের আকার ছোট হয়ে যায়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | আবার গ্রুপে উপর থেকে নিচে গেলে নতুন শেল বা কক্ষপথ যোগ হতে থাকে। ফলে পরমাণুর আকার বড় হয়। তাই উপর থেকে নিচে গেলে সমযোজী ব্যাসার্ধ বাড়ে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u7: Distinction between atomic radius and covalent radius (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies the common confusion between atomic radius of an isolated atom and covalent radius in a bonded molecule.

Accuracy: **accurate**. The distinction between the hypothetical size of an isolated single atom and bonded covalent radius is accurately presented.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | তোমরা হয়তো ভাবছো যে পারমাণবিক ব্যাসার্ধ আর সমযোজী ব্যাসার্ধ কি একই জিনিস? না, এগুলো এক জিনিস নয়। তবে একই মৌলের ক্ষেত্রে এদের মান প্রায় কাছাকাছি হয়। পারমাণবিক ব্যাসার্ধ বলতে আমরা বোঝাই কোনো মৌলের একক পরমাণুর নিউক্লিয়াস থেকে সর্ববহিঃস্থ কক্ষপথের ইলেকট্রনের দূরত্বের গড় মান। আর সমযোজী ব্যাসার্ধ হলো সমযোজী বন্ধনে আবদ্ধ একই মৌলের দুটি পরমাণুর নিউক্লিয়াসের মধ্যবর্তী দূরত্বের অর্ধেক। | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p16 | আশা করি তোমরা বুঝতে পেরেছ। ধন্যবাদ। | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

