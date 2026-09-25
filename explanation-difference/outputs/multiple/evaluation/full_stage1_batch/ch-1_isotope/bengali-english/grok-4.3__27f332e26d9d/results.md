# Stage 1: Bengali / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, examples (hydrogen and carbon), properties, and applications of isotopes",
  "topic_match": "on_topic",
  "reason": "The text directly and comprehensively explains the concept of isotopes, provides standard chemical examples, explains why their chemical and physical properties behave the way they do, and lists practical applications.",
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
| u1 | CONCEPT | Definition of atomic number and isotope | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Isotopes of hydrogen (protium, deuterium, tritium) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | EXAMPLE | Isotopes of carbon (carbon-12 and carbon-14) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Medical applications of isotopes | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | EXAMPLE | Isotopes in nuclear power generation | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Carbon-14 dating in archaeology | {"context": "real_world", "treatment": "illustrative"} | accurate |

## u1: Definition of atomic number and isotope

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
    "reason": "The definition correctly explains that atomic number corresponds to proton count and that isotopes are atoms of the same element having the same number of protons but different numbers of neutrons.",
    "errors": []
  }
}
```

```text
প্রত্যেক মৌলের পরমাণুতে একটি নির্দিষ্ট সংখ্যক প্রোটন থাকে। এই সংখ্যাকে বলা হয় **পারমাণবিক সংখ্যা (Z)**। কিন্তু সেই পরমাণুতে নিউট্রনের সংখ্যা ভিন্ন হতে পারে।

যখন একই মৌলের পরমাণুগুলোর প্রোটনের সংখ্যা একই থাকে, কিন্তু নিউট্রনের সংখ্যা আলাদা হয়, তখন সেগুলোকে **আইসোটোপ** বলে।
```


## u2: Isotopes of hydrogen (protium, deuterium, tritium)

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
    "reason": "Correctly states the proton and neutron counts for protium (1p, 0n), deuterium (1p, 1n), and tritium (1p, 2n), and explains why they are isotopes.",
    "errors": []
  }
}
```

```text
হাইড্রোজেন মৌলের তিনটি আইসোটোপ আছে:
- **প্রোটিয়াম** — ১ প্রোটন + ০ নিউট্রন
- **ডিউটেরিয়াম** — ১ প্রোটন + ১ নিউট্রন
- **ট্রিটিয়াম** — ১ প্রোটন + ২ নিউট্রন

এরা সবাই হাইড্রোজেনের আইসোটোপ, কারণ প্রোটনের সংখ্যা একই (১), শুধু নিউট্রনের সংখ্যা ভিন্ন।
```


## u3: Isotopes of carbon (carbon-12 and carbon-14)

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
    "reason": "Correctly identifies that both carbon-12 and carbon-14 have 6 protons, while having 6 and 8 neutrons respectively.",
    "errors": []
  }
}
```

```text
আরেকটি উদাহরণ: কার্বন-১২ ও কার্বন-১৪। দুটোতেই প্রোটন আছে ৬টি, কিন্তু নিউট্রন যথাক্রমে ৬ ও ৮। তাই এরা কার্বনের আইসোটোপ।
```


## u4: Chemical and physical properties of isotopes

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
    "reason": "Correctly explains that isotopes share identical chemical properties due to having the same electron configuration, but differ in physical properties such as mass and nuclear stability due to differing mass.",
    "errors": []
  }
}
```

```text
আইসোটোপগুলোর রাসায়নিক ধর্ম একই রকম (কারণ রাসায়নিক বৈশিষ্ট্য নির্ভর করে ইলেকট্রনের সংখ্যার উপর, যা প্রোটনের সমান)। কিন্তু ভর ভিন্ন হওয়ায় তাদের ভৌত ধর্মে (যেমন: ভর, স্থায়িত্ব) পার্থক্য দেখা যায়।
```


## u5: Medical applications of isotopes

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
    "reason": "Radioisotopes are widely used in medicine for diagnosis and radiotherapy.",
    "errors": []
  }
}
```

```text
চিকিৎসায়
```


## u6: Isotopes in nuclear power generation

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
    "reason": "Isotopes (such as uranium-235) are standard fuel sources in nuclear power generation.",
    "errors": []
  }
}
```

```text
পারমাণবিক বিদ্যুৎ উৎপাদনে
```


## u7: Carbon-14 dating in archaeology

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
    "reason": "Radiocarbon dating (using carbon-14) is an established archaeological method to determine the age of organic materials.",
    "errors": []
  }
}
```

```text
প্রত্নতত্ত্বে (কার্বন-১৪ ডেটিং দিয়ে জিনিসের বয়স বের করা হয়)
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "The first paragraph introduces atomic number before the definition of isotopes. It could be viewed as a separate concept unit defining atomic number.",
    "proposed_resolution": "Kept as a single CONCEPT unit because the atomic number definition functions directly as prerequisite context to explain and define isotopes in the following sentence."
  },
  {
    "unit_ids": [
      "u5",
      "u6",
      "u7"
    ],
    "issue": "The three applications of isotopes (medicine, nuclear power, and carbon dating) appear in a single sentence and could alternatively be grouped as one compound EXAMPLE unit listing applications.",
    "proposed_resolution": "Separated into three distinct EXAMPLE units in accordance with the guideline that lists naming independent real-world applications should be treated as separate example units."
  }
]
```

## Unassigned text for coverage review

```text
প্রিয় ছাত্র/ছাত্রী,

আজ আমরা “আইসোটোপ” নামক গুরুত্বপূর্ণ একটি বিষয় নিয়ে আলোচনা করব। সহজ ভাষায় বুঝিয়ে বলছি।


```

```text


**সহজ উদাহরণ দিয়ে বোঝাই:**


```

```text


**গুরুত্বপূর্ণ কথা:**  

```

```text


আইসোটোপের ব্যবহার অনেক — 
```

```text
, 
```

```text
 এবং 
```

```text
।

কোনো অংশ বুঝতে অসুবিধা হলে বা আরও উদাহরণ চাইলে বলো!
```
