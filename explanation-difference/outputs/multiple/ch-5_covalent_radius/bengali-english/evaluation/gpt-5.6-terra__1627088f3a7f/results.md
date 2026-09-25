# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **Bengali**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation defines covalent radius, presents its mathematical formula, provides a worked calculation using chlorine, explains why atomic radius is an approximate measurement, details periodic trends across periods and groups, and discusses the effect of bond order.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 45,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 45,
  "unique_subtopics": 7,
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

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the internuclear distance between two identical bonded atoms and provides the corresponding formula.

Accuracy: **accurate**. The definition and formula correctly state that homonuclear covalent radius is half of the internuclear distance between the two bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **সমযোজী ব্যাসার্ধ (Covalent radius)** হলো একটি পরমাণুর আনুমানিক আকার বোঝানোর একটি মাপ। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | যখন একই মৌলের দুটি পরমাণু **সমযোজী বন্ধন** (covalent bond) তৈরি করে, তখন তাদের নিউক্লিয়াস দুটির মধ্যবর্তী দূরত্বের অর্ধেককে প্রতিটি পরমাণুর সমযোজী ব্যাসার্ধ বলা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | ### সূত্র | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p4 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p5 | \text{সমযোজী ব্যাসার্ধ} = \frac{\text{দুটি নিউক্লিয়াসের মধ্যবর্তী দূরত্ব}}{2} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p6 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u2: Worked calculation of chlorine's covalent radius (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows a worked step-by-step calculation of chlorine's covalent radius from the internuclear distance in a Cl2 molecule.

Accuracy: **accurate**. The internuclear distance in Cl2 is accurately stated as 198 pm, yielding a single-bond covalent radius of 99 pm.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### উদাহরণ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | ধরা যাক, ক্লোরিন অণুতে \((Cl_2)\) দুটি ক্লোরিন পরমাণুর নিউক্লিয়াসের দূরত্ব \(198\) pm (পিকোমিটার)। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | তাহলে একটিমাত্র ক্লোরিন পরমাণুর সমযোজী ব্যাসার্ধ— | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p10 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p11 | \frac{198}{2} = 99 \text{ pm} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p13 | অতএব, ক্লোরিনের সমযোজী ব্যাসার্ধ \(99\) pm। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Explanation of why covalent radius is an approximation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the physical reason atomic radius is approximate, noting the lack of a defined boundary due to the diffuse electron cloud.

Accuracy: **accurate**. Correctly explains that isolated atoms do not have rigid, sharp boundaries because electron density is diffuse, necessitating indirect measurement from bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | ## কেন “আনুমানিক” বলা হয়? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | পরমাণুর কোনো কঠিন, নির্দিষ্ট বাইরের সীমানা নেই। ইলেকট্রন মেঘ নিউক্লিয়াসের চারপাশে ছড়িয়ে থাকে। তাই পরমাণুর ব্যাসার্ধ সরাসরি মাপা যায় না; বন্ধনে থাকা দুই পরমাণুর দূরত্ব থেকে হিসাব করা হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Periodic trend across a period (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes and explains the decrease in covalent radius from left to right across a period due to increasing nuclear charge, illustrated with period 2 elements.

Accuracy: **accurate**. The trend across a period (decreasing radius with increasing nuclear charge pulling electrons inward) and the ordering C > N > O > F are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p18 | ## পর্যায় সারণিতে পরিবর্তন | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | ### ১. একই পর্যায়ে বাম থেকে ডানে গেলে | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | সমযোজী ব্যাসার্ধ সাধারণত **কমে যায়**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | **কারণ:** নিউক্লিয়াসে প্রোটনের সংখ্যা বাড়ে, ফলে ইলেকট্রনগুলোকে আরও শক্তভাবে আকর্ষণ করে। তাই পরমাণু ছোট হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p22 | উদাহরণ:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p24 | C &gt; N &gt; O &gt; F | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p25 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 | অর্থাৎ কার্বনের ব্যাসার্ধ ফ্লোরিনের চেয়ে বেশি। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Periodic trend down a group (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Describes and explains the increase in covalent radius down a group due to the addition of electron shells, illustrated with halogen elements.

Accuracy: **accurate**. The trend down a group (increasing radius with the addition of electron shells) and the halogen ordering F < Cl < Br < I are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ### ২. একই গ্রুপে উপর থেকে নিচে গেলে | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | সমযোজী ব্যাসার্ধ সাধারণত **বাড়ে**। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p29 | **কারণ:** নিচে নামার সঙ্গে সঙ্গে নতুন নতুন ইলেকট্রন স্তর বা খোলস যুক্ত হয়। ফলে পরমাণুর আকার বড় হয়। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p30 | উদাহরণ:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p32 | F &lt; Cl &lt; Br &lt; I | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u6: Effect of bond order on covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how increasing bond multiplicity pulls atoms closer together, reducing effective covalent radius from single to triple bonds.

Accuracy: **accurate**. Accurately describes how bond order influences internuclear distance and covalent radius, correctly showing single bond > double bond > triple bond.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | ## বন্ধনের প্রভাব | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | বন্ধনের ধরন বদলালে সমযোজী ব্যাসার্ধও কিছুটা বদলাতে পারে। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p37 | - **একক বন্ধন**ে ব্যাসার্ধ বেশি   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 | - **দ্বিবন্ধন**ে ব্যাসার্ধ কম   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p39 | - **ত্রিবন্ধন**ে ব্যাসার্ধ আরও কম   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | কারণ, একাধিক বন্ধন হলে দুটি পরমাণু একে অপরের আরও কাছে আসে। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p41 | উদাহরণ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | C-C &gt; C=C &gt; C\equiv C | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u7: Summary recap (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Concludes the response with a concise recap summarizing the core definition of covalent radius.

Accuracy: **accurate**. The concluding summary statement accurately reiterates the definition of covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | সংক্ষেপে, **সমযোজী ব্যাসার্ধ হলো সমযোজী বন্ধনে যুক্ত দুটি একই পরমাণুর নিউক্লিয়াসের দূরত্বের অর্ধেক।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

