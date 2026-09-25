# Stage 1: Bengali / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Definition, determination, examples, and periodic trends of covalent radius",
  "topic_match": "on_topic",
  "reason": "The explanation directly defines covalent radius, demonstrates how to calculate it for homonuclear and heteronuclear molecules with worked examples, explains periodic trends, and clarifies how it differs from atomic radius.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of bond length and covalent radius | {"depth": "statement"} | accurate |
| u2 | EXAMPLE | Calculation of covalent radius of chlorine from Cl2 bond length | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | EXAMPLE | Calculation of covalent radius of hydrogen from H2 bond length | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | CONCEPT | Additivity of covalent radii in heteronuclear covalent bonds | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Calculation of carbon covalent radius from CCl4 bond length | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | CONCEPT | Periodic trends in covalent radius across periods and groups | {"depth": "explanation"} | contains_error |
| u7 | CAVEAT | Distinction between atomic radius and covalent radius | {"subtype": "misconception"} | accurate |

## u1: Definition of bond length and covalent radius

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The standard high school definition of covalent radius (specifically homonuclear single-bond covalent radius) as half the internuclear distance between two identical bonded atoms is correctly stated.",
    "errors": []
  }
}
```

```text
তোমরা ইতিমধ্যে জানো যে সমযোজী বন্ধন গঠনের সময় দুটো পরমাণুর মধ্যে কিছুটা দূরত্ব থাকে। আর এই দূরত্বকে বলা হয় বন্ধন দৈর্ঘ্য (bond length)। এখন, সমযোজী বন্ধনে আবদ্ধ দুটি একই মৌলের একই ধরনের পরমাণুর নিউক্লিয়াসদ্বয়ের মধ্যবর্তী দূরত্বের অর্ধেককে ঐ মৌলের সমযোজী ব্যাসার্ধ বলে।
```


## u2: Calculation of covalent radius of chlorine from Cl2 bond length

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The experimental Cl-Cl internuclear distance (198 pm) and the resulting covalent radius (99 pm) are calculated and stated accurately.",
    "errors": []
  }
}
```

```text
উদাহরণ হিসেবে বলা যায়, ক্লোরিন অনু Cl2 তে দুটি ক্লোরিন পরমাণু সমযোজী বন্ধনে আবদ্ধ থাকে। পরীক্ষার মাধ্যমে দেখা গেছে এই বন্ধনে আবদ্ধ দুটি ক্লোরিন পরমাণুর নিউক্লিয়াসের মধ্যবর্তী দূরত্ব ১৯৮ পিকোমিটার। সুতরাং ক্লোরিনের সমযোজী ব্যাসার্ধ হবে $\frac{198}{2}$ = 99 পিকোমিটার।
```


## u3: Calculation of covalent radius of hydrogen from H2 bond length

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The H-H bond distance (74 pm) and the resulting covalent radius (37 pm) are calculated and stated accurately.",
    "errors": []
  }
}
```

```text
এভাবে হাইড্রোজেন অণুতে (H2) হাইড্রোজেন পরমাণুদ্বয়ের নিউক্লিয়াসের মধ্যবর্তী দূরত্ব 74 pm। সুতরাং হাইড্রোজেনের সমযোজী ব্যাসার্ধ $\frac{74}{2}$ = 37 pm.
```


## u4: Additivity of covalent radii in heteronuclear covalent bonds

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The principle of additivity of covalent radii to find heteronuclear bond lengths or an unknown covalent radius is correctly presented within standard introductory chemistry simplifications.",
    "errors": []
  }
}
```

```text
কিন্তু যদি দুটি ভিন্ন মৌলের দুটি পরমাণু সমযোজী বন্ধনে আবদ্ধ হয় তবে তাদের সমযোজী ব্যাসার্ধের যোগফল ঐ যৌগের বন্ধন দৈর্ঘ্যের সমান হবে। যেমন- HCl অণুতে হাইড্রোজেন ও ক্লোরিন পরমাণুদ্বয়ের সমযোজী ব্যাসার্ধের যোগফল হবে বন্ধন দৈর্ঘ্যের সমান। অর্থাৎ, rH + rCl = d(H–Cl)।

এখানে, rH হলো হাইড্রোজেনের সমযোজী ব্যাসার্ধ, rCl হলো ক্লোরিনের সমযোজী ব্যাসার্ধ এবং d(H–Cl) হলো HCl এর বন্ধন দৈর্ঘ্য।

এখন যদি আমরা rH ও d(H–Cl) এর মান জানি তবে আমরা সহজেই rCl বের করতে পারবো। আর এভাবেই আমরা যেকোনো মৌলের সমযোজী ব্যাসার্ধ বের করতে পারব।
```


## u5: Calculation of carbon covalent radius from CCl4 bond length

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The calculation correctly uses the C-Cl bond length (176 pm) and Cl covalent radius (99 pm) to find the covalent radius of carbon (77 pm).",
    "errors": []
  }
}
```

```text
তোমাদের বোঝার সুবিধার্থে আরেকটি উদাহরণ দেই। কার্বন টেট্রাক্লোরাইড (CCl4) তে C-Cl বন্ধন দৈর্ঘ্য 176 pm এবং ক্লোরিনের সমযোজী ব্যাসার্ধ 99 pm হলে কার্বনের সমযোজী ব্যাসার্ধ কত?

আমরা জানি, rC + rCl = d(C–Cl)

বা, rC = d(C–Cl) - rCl

বা, rC = 176 - 99 = 77 pm

অর্থাৎ কার্বনের সমযোজী ব্যাসার্ধ 77 pm.
```


## u6: Periodic trends in covalent radius across periods and groups

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "contains_error",
    "reason": "The unit contains a minor conceptual imprecision regarding what increases across a period: an isolated atom remains electrically neutral, whereas the nuclear charge (or effective nuclear charge) increases.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "বাম থেকে ডানে গেলে পরমাণুর আধান বা চার্জ বাড়তে থাকে"
          }
        ],
        "description": "The text states that across a period from left to right, the atom's charge increases ('পরমাণুর আধান বা চার্জ বাড়তে থাকে'). However, neutral atoms do not acquire a net charge across a period; it is the nuclear charge (নিউক্লীয় আধান) or proton number in the nucleus that increases.",
        "correction": "পরমাণুর আধানের পরিবর্তে নিউক্লিয়াসের ধনাত্মক আধান (বা কার্যকরী নিউক্লীয় চার্জ) বৃদ্ধি পাওয়ার বিষয়টি উল্লেখ করা সমীচীন।",
        "severity": "minor"
      }
    ]
  }
}
```

```text
এখন প্রশ্ন হলো সমযোজী ব্যাসার্ধ নিয়ে আমাদের এত মাথাব্যথা কেন? আসলে এটা খুবই গুরুত্বপূর্ণ একটা টপিক। কারণ এর সাথে পর্যায় সারণীর মৌলসমূহের ধর্মের একটা সম্পর্ক আছে।

পর্যায় সারণীর যেকোনো পর্যায়ে বাম থেকে ডানে গেলে সমযোজী ব্যাসার্ধ কমতে থাকে। কারণ বাম থেকে ডানে গেলে পরমাণুর আধান বা চার্জ বাড়তে থাকে। ফলে নিউক্লিয়াসের আকর্ষণ শক্তি বাড়ে এবং ইলেকট্রন মেঘের আকার ছোট হয়ে যায়।

আবার গ্রুপে উপর থেকে নিচে গেলে নতুন শেল বা কক্ষপথ যোগ হতে থাকে। ফলে পরমাণুর আকার বড় হয়। তাই উপর থেকে নিচে গেলে সমযোজী ব্যাসার্ধ বাড়ে।
```


## u7: Distinction between atomic radius and covalent radius

```json
{
  "attributes": {
    "subtype": "misconception"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The distinction directly addresses the common misconception that atomic radius (defined theoretically for an isolated atom) and covalent radius (measured operationally from bonded internuclear distance) are identical.",
    "errors": []
  }
}
```

```text
তোমরা হয়তো ভাবছো যে পারমাণবিক ব্যাসার্ধ আর সমযোজী ব্যাসার্ধ কি একই জিনিস? না, এগুলো এক জিনিস নয়। তবে একই মৌলের ক্ষেত্রে এদের মান প্রায় কাছাকাছি হয়। পারমাণবিক ব্যাসার্ধ বলতে আমরা বোঝাই কোনো মৌলের একক পরমাণুর নিউক্লিয়াস থেকে সর্ববহিঃস্থ কক্ষপথের ইলেকট্রনের দূরত্বের গড় মান। আর সমযোজী ব্যাসার্ধ হলো সমযোজী বন্ধনে আবদ্ধ একই মৌলের দুটি পরমাণুর নিউক্লিয়াসের মধ্যবর্তী দূরত্বের অর্ধেক।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Whether u1 should have depth 'statement' or 'explanation'. The unit states the operational definition of bond length and covalent radius without detailing underlying quantum or atomic mechanisms.",
    "proposed_resolution": "Assigned 'statement' because defining a term directly based on internuclear distance constitutes stating the definition rather than explaining underlying causes."
  }
]
```

## Unassigned text for coverage review

```text
সহজ ভাষায় বোঝাই। 
```

```text


আশা করি তোমরা বুঝতে পেরেছ। ধন্যবাদ।
```
