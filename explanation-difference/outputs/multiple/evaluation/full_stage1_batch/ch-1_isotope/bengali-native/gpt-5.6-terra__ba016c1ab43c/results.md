# Stage 1: Bengali / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, atomic structure background, examples, properties, applications, and a mnemonic for isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation directly teaches the definition, notation, examples (carbon and hydrogen), properties, and applications of isotopes in Bengali.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9",
    "u10"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of isotope and connection to mass number | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Atomic structure and role of protons in element identity | {"depth": "explanation"} | accurate |
| u3 | EXAMPLE | Carbon isotopes comparison and notation | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | EXAMPLE | Hydrogen isotopes | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u5 | CONCEPT | General properties of isotopes | {"depth": "explanation"} | accurate |
| u6 | EXAMPLE | Application of carbon-14 in radiocarbon dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of cobalt-60 in cancer treatment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | EXAMPLE | Application of iodine-131 in thyroid diagnosis and treatment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | EXAMPLE | Application of uranium-235 in nuclear power | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u10 | STUDY_SUPPORT | Memory aid for definition of isotope | {"subtype": "mnemonic"} | accurate |

## u1: Definition of isotope and connection to mass number

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
    "reason": "Correctly defines isotopes as atoms of the same element having the same number of protons but different numbers of neutrons, resulting in different mass numbers.",
    "errors": []
  }
}
```

```text
### সমস্থানিক (Isotope) কী?

একই মৌলের এমন পরমাণুগুলোকে **সমস্থানিক** বলে যাদের—

- **প্রোটন সংখ্যা একই**
- কিন্তু **নিউট্রন সংখ্যা ভিন্ন**

প্রোটন সংখ্যা একই হওয়ায় তারা একই মৌলের পরমাণু। তবে নিউট্রন আলাদা হওয়ায় তাদের **ভরসংখ্যা** আলাদা হয়।
```


## u2: Atomic structure and role of protons in element identity

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
    "reason": "Accurately describes subatomic particles (protons, neutrons, electrons), their locations/charges, and the fact that proton number determines element identity.",
    "errors": []
  }
}
```

```text
### পরমাণুর গুরুত্বপূর্ণ অংশ

পরমাণুর কেন্দ্রে থাকে নিউক্লিয়াস। সেখানে থাকে—

- **প্রোটন**: ধনাত্মক চার্জযুক্ত
- **নিউট্রন**: চার্জহীন
- **ইলেকট্রন**: ঋণাত্মক চার্জযুক্ত, নিউক্লিয়াসের বাইরে থাকে

কোনো মৌল কী হবে, তা নির্ধারণ করে তার **প্রোটন সংখ্যা**।
```


## u3: Carbon isotopes comparison and notation

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
    "reason": "Correctly shows carbon-12, carbon-13, and carbon-14, their subatomic composition, and isotope notation with atomic number and mass number.",
    "errors": []
  }
}
```

```text
## উদাহরণ: কার্বনের সমস্থানিক

কার্বনের সব পরমাণুতে প্রোটন থাকে **৬টি**। কিন্তু নিউট্রনের সংখ্যা ভিন্ন হতে পারে।

| কার্বনের ধরন | প্রোটন | নিউট্রন | ভরসংখ্যা |
|---|---:|---:|---:|
| কার্বন-12 | 6 | 6 | 12 |
| কার্বন-13 | 6 | 7 | 13 |
| কার্বন-14 | 6 | 8 | 14 |

এরা সবাই কার্বন, কারণ সবার প্রোটন সংখ্যা ৬। কিন্তু নিউট্রন সংখ্যা আলাদা বলে এরা কার্বনের ভিন্ন ভিন্ন **সমস্থানিক**।

এভাবে লেখা হয়:

\[
{}^{12}_{6}\text{C}, \quad {}^{13}_{6}\text{C}, \quad {}^{14}_{6}\text{C}
\]

এখানে—

- নিচের সংখ্যা = **পারমাণবিক সংখ্যা** = প্রোটন সংখ্যা
- উপরের সংখ্যা = **ভরসংখ্যা** = প্রোটন + নিউট্রন
```


## u4: Hydrogen isotopes

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately lists protium, deuterium, and tritium along with their proton and neutron counts.",
    "errors": []
  }
}
```

```text
### আরেকটি উদাহরণ: হাইড্রোজেন

হাইড্রোজেনের তিনটি পরিচিত সমস্থানিক আছে:

1. **প্রোটিয়াম** \(({}^{1}_{1}H)\): ১ প্রোটন, ০ নিউট্রন  
2. **ডিউটেরিয়াম** \(({}^{2}_{1}H)\): ১ প্রোটন, ১ নিউট্রন  
3. **ট্রিটিয়াম** \(({}^{3}_{1}H)\): ১ প্রোটন, ২ নিউট্রন  
```


## u5: General properties of isotopes

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
    "reason": "Accurately explains why chemical properties are similar (same electron configuration), why masses differ (different neutron count), and that unstable isotopes undergo radioactive decay.",
    "errors": []
  }
}
```

```text
## সমস্থানিকের বৈশিষ্ট্য

### ১. রাসায়নিক ধর্ম প্রায় একই
যেহেতু একই মৌলের সমস্থানিকগুলোর প্রোটন ও ইলেকট্রন সংখ্যা একই, তাই তাদের রাসায়নিক ধর্ম সাধারণত একই রকম।

### ২. ভর ভিন্ন
নিউট্রন সংখ্যা ভিন্ন হওয়ায় তাদের ভর ভিন্ন হয়।

### ৩. কিছু সমস্থানিক তেজস্ক্রিয়
কিছু সমস্থানিক স্থিতিশীল নয়। তারা বিকিরণ ছড়ায়, তাই তাদের **তেজস্ক্রিয় সমস্থানিক** বলে। যেমন কার্বন-14।
```


## u6: Application of carbon-14 in radiocarbon dating

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly states the use of carbon-14 in dating ancient biological and archaeological artifacts.",
    "errors": []
  }
}
```

```text
- **কার্বন-14**: পুরোনো কাঠ, হাড় বা প্রত্নতাত্ত্বিক বস্তু কত বছরের পুরোনো তা নির্ণয়ে।
```


## u7: Application of cobalt-60 in cancer treatment

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly identifies cobalt-60 as being used in radiation therapy for cancer.",
    "errors": []
  }
}
```

```text
- **কোবাল্ট-60**: ক্যানসারের চিকিৎসায়।
```


## u8: Application of iodine-131 in thyroid diagnosis and treatment

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly mentions iodine-131's medical use in diagnosing and treating thyroid disorders.",
    "errors": []
  }
}
```

```text
- **আয়োডিন-131**: থাইরয়েড রোগ নির্ণয় ও চিকিৎসায়।
```


## u9: Application of uranium-235 in nuclear power

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly identifies uranium-235 as a fissile fuel used in nuclear power generation.",
    "errors": []
  }
}
```

```text
- **ইউরেনিয়াম-235**: পারমাণবিক বিদ্যুৎ উৎপাদনে।
```


## u10: Memory aid for definition of isotope

```json
{
  "attributes": {
    "subtype": "mnemonic"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Provides an accurate mnemonic summarizing the core defining feature of isotopes.",
    "errors": []
  }
}
```

```text
### মনে রাখার সহজ কৌশল

> **“একই প্রোটন, ভিন্ন নিউট্রন = সমস্থানিক”**

অর্থাৎ, একই মৌলের পরমাণু হলেও নিউট্রনের সংখ্যা আলাদা হলে তারা সমস্থানিক।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "Whether the third sub-point on radioactive isotopes ('৩. কিছু সমস্থানিক তেজস্ক্রিয়') should be separated into an independent CONCEPT unit.",
    "proposed_resolution": "Kept as a single CONCEPT unit (u5) because the source presents it as one of three coordinated general properties of isotopes under the heading 'সমস্থানিকের বৈশিষ্ট্য', without developing a separate detailed lesson on radioactivity."
  },
  {
    "unit_ids": [
      "u6",
      "u7",
      "u8",
      "u9"
    ],
    "issue": "Whether the bulleted list of isotope applications should be grouped as a single unit or split into distinct application examples.",
    "proposed_resolution": "Split into separate EXAMPLE units (u6–u9) following the guideline that a list presenting independent real-world applications constitutes separate example units even if grouped under a shared heading."
  }
]
```

## Unassigned text for coverage review

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


---


```

```text


---

## সমস্থানিকের ব্যবহার


```

```text


---


```
