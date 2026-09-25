# Stage 1: Bengali / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Covalent radius: definition, clay ball analogy, calculation for chlorine molecule, periodic trends, and conditions for single covalent bond radius",
  "topic_match": "on_topic",
  "reason": "The explanation directly teaches the definition, formula, calculation example, and periodic trends of covalent radius.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and mathematical formulation of covalent radius | {"depth": "explanation"} | accurate |
| u2 | ANALOGY | Clay or plasticine spheres analogy for covalent bonding overlap and radius | {} | accurate |
| u3 | EXAMPLE | Worked calculation of covalent radius of chlorine molecule | {"context": "real_world", "treatment": "worked"} | accurate |
| u4 | CONCEPT | Periodic trends of covalent radius across periods and groups | {"depth": "explanation"} | accurate |
| u5 | CAVEAT | Conditions and qualifications for determining covalent radius | {"subtype": "qualification"} | contains_error |

## u1: Definition and mathematical formulation of covalent radius

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
    "reason": "Correctly explains why direct measurement of atomic radius is impossible due to electron clouds and defines homonuclear single covalent radius as half of the internuclear distance.",
    "errors": []
  }
}
```

```text
আমরা জানি, বৃত্তের কেন্দ্র থেকে পরিধি পর্যন্ত দূরত্বকে ব্যাসার্ধ বলে। কিন্তু পরমাণুর তো কোনো শক্ত সীমানা বা দেয়াল নেই; এর বাইরে থাকে ইলেকট্রনের মেঘ। তাই স্কেল দিয়ে একা একটা পরমাণুর ব্যাসার্ধ মাপা অসম্ভব! 

তাহলে বিজ্ঞানীরা এটা কীভাবে মাপেন? চলো দেখে নেওয়া যাক।

---

### সমযোজী ব্যাসার্ধ কী? (সহজ সংজ্ঞা)

যখন **একই মৌলের দুটি পরমাণু** একক সমযোজী বন্ধন (single covalent bond) দিয়ে পরস্পরের সাথে যুক্ত থাকে, তখন **তাদের নিউক্লিয়াস দুটির মধ্যবর্তী দূরত্বের অর্ধেককে** ওই মৌলের **সমযোজী ব্যাসার্ধ** বলে।
```

```text
### গাণিতিক রূপ:

ধরি, একই মৌলের দুটি পরমাণু সমযোজী বন্ধনে আবদ্ধ। 
* তাদের নিউক্লিয়াসদ্বয়ের মধ্যবর্তী দূরত্ব = $d$ 
* তাহলে, সমযোজী ব্যাসার্ধ, $r = \frac{d}{2}$
```


## u2: Clay or plasticine spheres analogy for covalent bonding overlap and radius

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "নরম মাটির বা প্লাস্টিসিনের গোলক আছে। তুমি গোলক দুটোকে চেপে একসাথে জোড়া লাগিয়ে দিলে। এতে তাদের কিছুটা অংশ একে অপরের ভেতর ঢুকে গেল"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy reasonably maps atomic orbital overlap in a covalent bond to soft clay spheres pressing together, with the distance between centers divided by two representing the radius.",
    "errors": []
  }
}
```

```text
> **একটি সহজ উদাহরণ দিয়ে বুঝি:**
> মনে করো, তোমার কাছে দুটো একই সাইজের নরম মাটির বা প্লাস্টিসিনের গোলক আছে। তুমি গোলক দুটোকে চেপে একসাথে জোড়া লাগিয়ে দিলে। এতে তাদের কিছুটা অংশ একে অপরের ভেতর ঢুকে গেল (যেমনটা সমযোজী বন্ধনে ইলেকট্রন শেয়ারের সময় হয়)। এখন যদি তুমি প্রথম গোলকের কেন্দ্র থেকে দ্বিতীয় গোলকের কেন্দ্রের দূরত্ব মেপে তাকে **দুই দিয়ে ভাগ** করো, তবেই তুমি গোলকটির ব্যাসার্ধ পাবে।
```


## u3: Worked calculation of covalent radius of chlorine molecule

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The internuclear distance in a chlorine molecule is approximately 198 pm, yielding a covalent radius of 99 pm.",
    "errors": []
  }
}
```

```text
**বাস্তব উদাহরণ:**
ক্লোরিন অণুর ($Cl_2$) ক্ষেত্রে দুটি ক্লোরিন পরমাণুর নিউক্লিয়াসের মধ্যকার দূরত্ব হলো **১৯৮ পিকোমিটার (pm)**। 
তাহলে ক্লোরিনের সমযোজী ব্যাসার্ধ হবে:
$$r = \frac{১৯৮}{২} = ৯৯ \text{ পিকোমিটার (pm)}$$
```


## u4: Periodic trends of covalent radius across periods and groups

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
    "reason": "Correctly states and explains the periodic trends: decreasing across a period due to increasing nuclear charge without adding shells, and increasing down a group due to the addition of energy levels.",
    "errors": []
  }
}
```

```text
### পর্যায় সারণিতে এটি কীভাবে পরিবর্তিত হয়? (পরীক্ষার জন্য খুব জরুরি!)

১. **পর্যায় বরাবর (বাম থেকে ডানে):**
* সমযোজী ব্যাসার্ধ সাধারণত **কমে**।
* **কারণ:** বাম থেকে ডানে গেলে নতুন কোনো কক্ষপথ যুক্ত হয় না, কিন্তু প্রোটন ও ইলেকট্রন সংখ্যা বাড়ে। ফলে নিউক্লিয়াসের আকর্ষণ বল বেড়ে যায় এবং পরমাণু সংকুচিত হয়ে ছোট হয়ে যায়।

২. **শ্রেণি বা গ্রুপ বরাবর (ওপর থেকে নিচে):**
* সমযোজী ব্যাসার্ধ সাধারণত **বাড়ে**।
* **কারণ:** ওপর থেকে নিচে নামলে প্রতি ধাপে একটি করে নতুন শক্তিস্তর (কক্ষপথ) যুক্ত হয়। ফলে নিউক্লিয়াস থেকে বাইরের স্তরের দূরত্ব স্বাভাবিকভাবেই বেড়ে যায়।
```


## u5: Conditions and qualifications for determining covalent radius

```json
{
  "attributes": {
    "subtype": "qualification"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "contains_error",
    "reason": "The unit erroneously lists oxygen gas ($O_2$) as an example satisfying the condition of single-bonded homonuclear diatomic molecules for calculating standard single-bond covalent radius, even though $O_2$ has a double bond.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "১. পরমাণু দুটিকে অবশ্যই **একই মৌলের** হতে হবে (যেমন: $H_2, Cl_2, O_2$ ইত্যাদি)।\n২. তাদের মধ্যে **একক বন্ধন** (Single bond) থাকতে হবে।"
          }
        ],
        "description": "Oxygen gas ($O_2$) has a double bond ($O=O$), not a single bond. Therefore, it does not satisfy the second stated condition requiring a single covalent bond, and dividing its bond length by two yields the double-bond covalent radius rather than the standard single-bond covalent radius.",
        "correction": "Replace $O_2$ with a single-bonded homonuclear diatomic molecule such as $F_2$ or $Br_2$, or clarify that $O_2$ contains a double bond.",
        "severity": "minor"
      }
    ]
  }
}
```

```text
### মনে রাখার মতো দুটি জরুরি শর্ত:
১. পরমাণু দুটিকে অবশ্যই **একই মৌলের** হতে হবে (যেমন: $H_2, Cl_2, O_2$ ইত্যাদি)।
২. তাদের মধ্যে **একক বন্ধন** (Single bond) থাকতে হবে।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1",
      "u3"
    ],
    "issue": "The section 'গাণিতিক রূপ' presents the general algebraic formula r = d/2. It can either be viewed as completing the definition concept (u1) or as the formula setup introducing the worked chlorine example (u3).",
    "proposed_resolution": "Assigned to u1 as a second excerpt because it establishes the general definition formula symbolically rather than providing Chlorine-specific givens or working."
  },
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "The closing section 'মনে রাখার মতো দুটি জরুরি শর্ত' recaps the homonuclear and single-bond conditions from the definition. This could be classified either as CAVEAT (subtype: qualification) because it specifies necessary conditions/boundaries for applying the r = d/2 formula, or as STUDY_SUPPORT (subtype: recap) because it summarizes key points to remember.",
    "proposed_resolution": "Classified as CAVEAT with subtype qualification because its primary function is stating the strict qualifying constraints under which this definition of covalent radius applies."
  }
]
```

## Unassigned text for coverage review

```text
হ্যালো! কেমন আছো? আজ আমরা রসায়নের খুব মজার এবং গুরুত্বপূর্ণ একটা বিষয় সহজভাবে শিখব। বিষয়টি হলো—**সমযোজী ব্যাসার্ধ (Covalent Radius)**।


```

```text


---


```

```text


---


```

```text


---


```

```text


আশা করি সমযোজী ব্যাসার্ধের ধারণাটি তোমার কাছে একদম পরিষ্কার হয়েছে! কোনো জায়গায় বুঝতে সমস্যা হলে দ্বিধা না করে আমাকে বলো।
```
