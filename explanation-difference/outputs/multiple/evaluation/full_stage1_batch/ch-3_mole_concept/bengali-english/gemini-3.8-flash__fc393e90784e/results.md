# Stage 1: Bengali / mole concept

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "mole concept",
  "observed_topic": "Mole concept in chemistry, including Avogadro's number, molar mass, molar volume at STP, calculation formulas, and a worked example",
  "topic_match": "on_topic",
  "reason": "The explanation thoroughly introduces the mole concept, defining it using Avogadro's number, relating it to mass and gas volume, providing calculation formulas, and working through an illustrative example.",
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
| u1 | ANALOGY | Analogy of everyday counting units (dozen, hali, pair) to explain the mole | {} | accurate |
| u2 | CONCEPT | Definition of mole in terms of Avogadro's number of particles | {"depth": "statement"} | accurate |
| u3 | CONCEPT | Relationship between mole and mass (molar mass) | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Molar volume of a gas at STP | {"depth": "statement"} | accurate |
| u5 | PROCEDURE | Formulas for calculating moles from mass, particle number, and gas volume | {} | accurate |
| u6 | EXAMPLE | Worked problem calculating moles in 36 g of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | STUDY_SUPPORT | One-line summary connecting mass, particle count, and volume to mole | {"subtype": "recap"} | accurate |

## u1: Analogy of everyday counting units (dozen, hali, pair) to explain the mole

```json
{
  "attributes": {},
  "contextualization": {
    "value": "localized",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "যদি বলো, \" **এক হালি** লেবু দিন\", দোকানদার দেবে **৪টি**।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy accurately maps familiar group counting units to the concept of the mole as a counting unit for subatomic particles.",
    "errors": []
  }
}
```

```text
তুমি যখন বাজারে গিয়ে বলো, "আমাকে **এক ডজন** ডিম দিন", দোকানদার তোমাকে কয়টি ডিম দেয়? **১২টি**।
যদি বলো, " **এক হালি** লেবু দিন", দোকানদার দেবে **৪টি**।
যদি বলো, " **এক জোড়া** জুতো দিন", তুমি পাবে **২টি**।

রসায়নে পরমাণু (atom) বা অণু (molecule)-রা এত ছোট যে তাদের একটা-দুটো করে গোনা অসম্ভব। সামান্য এক ফোঁটা জলেও কোটি কোটি অণু থাকে! তাই বিজ্ঞানীদের এমন একটা বড় "প্যাকেট" বা "একক" দরকার ছিল, যা দিয়ে পরমাণু বা অণু গোনা যায়।

রসায়নের সেই "ডজন"-এর মতো এককটাই হলো **'মোল' (Mole)**।
```


## u2: Definition of mole in terms of Avogadro's number of particles

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
    "reason": "Avogadro's constant and the particle count in one mole are correctly defined and illustrated.",
    "errors": []
  }
}
```

```text
১ ডজন মানে যেমন সবসময় ১২টি, তেমনই রসায়নে:
> **১ মোল = $6.022 \times 10^{23}$ টি কণা (পরমাণু, অণু বা আয়ন)।**

এই বিশাল সংখ্যাটিকে বলা হয় **অ্যাভোগাড্রো সংখ্যা (Avogadro's Number)**, যাকে সংক্ষেপে **$N_A$** লেখা হয়। 

*   ১ মোল হাইড্রোজেন পরমাণু = $6.022 \times 10^{23}$ টি হাইড্রোজেন পরমাণু।
*   ১ মোল জল ($H_2O$) = $6.022 \times 10^{23}$ টি জলের অণু।
*   এমনকি তুমি যদি ১ মোল ক্রিকেট বল নাও, তার মানে তোমার কাছে $6.022 \times 10^{23}$ টি বল আছে!
```


## u3: Relationship between mole and mass (molar mass)

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
    "reason": "Molar mass is correctly defined as the mass of one mole obtained by expressing atomic/molecular mass in grams, with correct calculations for carbon and water.",
    "errors": []
  }
}
```

```text
ল্যাবরেটরিতে তো আর কণা গুণে গুণে কাজ করা যায় না, সেখানে আমাদের ভর (weight) মাপতে হয়। তাহলে ১ মোলের ওজন কত গ্রাম হবে?

নিয়মটি খুব সহজ: **কোনো মৌল বা যৌগের পারমাণবিক ভর (Atomic mass) বা আণবিক ভরকে (Molecular mass) গ্রামে প্রকাশ করলেই ১ মোল পাওয়া যায়।** একে **মোলার ভর (Molar Mass)** বলে।

**উদাহরণ দিয়ে বুঝি:**
1. **কার্বন ($C$):** কার্বনের পারমাণবিক ভর হলো ১২। 
   * সুতরাং, **১২ গ্রাম কার্বন = ১ মোল কার্বন** (যার মধ্যে $6.022 \times 10^{23}$ টি কার্বন পরমাণু আছে)।
2. **জল ($H_2O$):** 
   * হাইড্রোজেনের ভর = ১, অক্সিজেনের ভর = ১৬।
   * জলের আণবিক ভর = $(1 \times 2) + 16 = 18$।
   * সুতরাং, **১৮ গ্রাম জল = ১ মোল জল** (যার মধ্যে $6.022 \times 10^{23}$ টি জলের অণু আছে)।
```


## u4: Molar volume of a gas at STP

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
    "reason": "The molar volume of an ideal gas at STP (22.4 L) and its application to oxygen gas are stated correctly according to standard introductory chemistry curriculum.",
    "errors": []
  }
}
```

```text
যদি কোনো পদার্থ গ্যাসীয় অবস্থায় থাকে, তবে প্রমাণ তাপমাত্রা ও চাপে (STP - Standard Temperature and Pressure):
> **যেকোনো গ্যাসের ১ মোলের আয়তন হবে ২২.৪ লিটার (22.4 L)।**

তার মানে, STP-তে ২২.৪ লিটার অক্সিজেন ($O_2$) গ্যাস মানেই হলো সেখানে ১ মোল বা $6.022 \times 10^{23}$ টি অক্সিজেন অণু আছে এবং তার ভর ৩২ গ্রাম।
```


## u5: Formulas for calculating moles from mass, particle number, and gas volume

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "All three formulas for calculating the number of moles are mathematically and conceptually correct.",
    "errors": []
  }
}
```

```text
মোল সংখ্যাকে আমরা ছোট হাতের **$n$** দিয়ে প্রকাশ করি।

1. ভর দেওয়া থাকলে:
   $$n = \frac{w}{M}$$
   *(এখানে, $w$ = দেওয়া ভর গ্রামে, $M$ = মোলার ভর)*

2. কণার সংখ্যা দেওয়া থাকলে:
   $$n = \frac{N}{N_A}$$
   *(এখানে, $N$ = মোট কণার সংখ্যা, $N_A = 6.022 \times 10^{23}$)*

3. STP-তে গ্যাসের আয়তন দেওয়া থাকলে:
   $$n = \frac{V}{22.4}$$
   *(এখানে, $V$ = লিটারে দেওয়া আয়তন)*
```


## u6: Worked problem calculating moles in 36 g of water

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
    "reason": "The worked solution applies the formula correctly to determine that 36 g of water corresponds to 2 moles.",
    "errors": []
  }
}
```

```text
**প্রশ্ন:** ৩৬ গ্রাম জলে ($H_2O$) কত মোল জল আছে?

**সমাধান:**
* আমরা জানি, জলের মোলার ভর ($M$) = ১৮ গ্রাম/মোল।
* দেওয়া ভর ($w$) = ৩৬ গ্রাম।
* সূত্র: $n = \frac{w}{M} = \frac{৩৬}{১৮} = \mathbf{২\text{ মোল}}$।
*(তার মানে ৩৬ গ্রাম জলে $2 \times 6.022 \times 10^{23}$ টি জলের অণু আছে!)*
```


## u7: One-line summary connecting mass, particle count, and volume to mole

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The closing summary accurately recaps the mole as a central quantity connecting mass, particle count, and molar volume.",
    "errors": []
  }
}
```

```text
**এক লাইনে সারসংক্ষেপ:**
মোল হলো রসায়নের এমন একটি সেতু, যা ভর (গ্রাম), কণার সংখ্যা (অ্যাভোগাড্রো সংখ্যা) এবং গ্যাসের আয়তন (২২.৪ লিটার)-কে একে অপরের সাথে যুক্ত করে।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "u1 could be classified as CONCEPT introducing the definition and need for the mole, or as ANALOGY mapping macroscopic counting units (dozen, hali, pair) to the mole.",
    "proposed_resolution": "Classified as ANALOGY because its primary pedagogical mechanism is explicitly mapping familiar domain units to the chemist's counting unit."
  },
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "u5 presents three calculation formulas and could be considered a CONCEPT (mathematical definitions) or PROCEDURE (a reusable problem-solving method).",
    "proposed_resolution": "Classified as PROCEDURE because the text explicitly introduces them as practical calculation formulas ('অংক করার জন্য জাদুকরী সূত্র') for determining moles under different given conditions."
  },
  {
    "unit_ids": [
      "u6"
    ],
    "issue": "u6 is introduced with the heading 'একটি ছোট্ট টেস্ট (Practice Problem)', which could suggest STUDY_SUPPORT (practice_question).",
    "proposed_resolution": "Classified as EXAMPLE (worked) because the question is immediately followed by a fully worked step-by-step solution rather than leaving it unanswered for learner practice."
  }
]
```

## Unassigned text for coverage review

```text
হ্যালো! রসায়ন (Chemistry)-এর অন্যতম গুরুত্বপূর্ণ এবং মজার একটি বিষয় হলো **'মোল ধারণা' (Mole Concept)**। এটি প্রথম দিকে একটু কঠিন মনে হলেও, একবার বুঝে গেলে খুব সহজ। 

চলো, একদম সহজভাবে বিষয়টাকে বুঝে নেওয়া যাক।

---

### ১. 'মোল' আসলে কী? (একটি সহজ উদাহরণ)

```

```text


---

### ২. ১ মোলে কয়টি কণা থাকে? (অ্যাভোগাড্রো সংখ্যা)

```

```text


---

### ৩. মোলের সাথে ভরের (Mass) সম্পর্ক কী?

```

```text


---

### ৪. গ্যাসের ক্ষেত্রে মোলের আয়তন (Molar Volume)

```

```text


---

### ৫. অংক করার জন্য জাদুকরী সূত্র (Formulas):


```

```text


---

### একটি ছোট্ট টেস্ট (Practice Problem):

```

```text


---

```

```text


বিষয়টি কি পরিষ্কার হয়েছে, নাকি কোনো জায়গায় বুঝতে অসুবিধা আছে? দ্বিধা না করে বলো!
```
