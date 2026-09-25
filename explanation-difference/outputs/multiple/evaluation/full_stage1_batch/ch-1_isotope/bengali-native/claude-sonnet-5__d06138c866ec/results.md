# Stage 1: Bengali / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, examples, memory aid, key properties, and self-assessment regarding isotopes (সমস্থানিক)",
  "topic_match": "on_topic",
  "reason": "The text directly and comprehensively explains the concept of isotopes in Bengali (সমস্থানিক), covering their definition, specific examples (hydrogen, carbon), etymological memory aid, chemical/physical properties, and a check-for-understanding question.",
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
| u1 | CONCEPT | Review of basic atomic structure | {"depth": "statement"} | accurate |
| u2 | CONCEPT | Definition and explanation of isotopes | {"depth": "explanation"} | accurate |
| u3 | EXAMPLE | Isotopes of hydrogen (Protium, Deuterium, Tritium) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u4 | STUDY_SUPPORT | Etymological memory aid for the Bengali term 'সমস্থানিক' | {"subtype": "mnemonic"} | accurate |
| u5 | EXAMPLE | Isotopes of carbon and their characteristics | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | CONCEPT | General physical and chemical properties of isotopes | {"depth": "explanation"} | accurate |
| u7 | STUDY_SUPPORT | Self-assessment practice question identifying isotopes | {"subtype": "practice_question"} | accurate |

## u1: Review of basic atomic structure

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
    "reason": "Correctly states the basic subatomic particles, their locations, and their charges.",
    "errors": []
  }
}
```

```text
## প্রথমে পরমাণুর গঠন মনে করি

তুমি জানো, প্রতিটি পরমাণুতে থাকে:
- **প্রোটন** (নিউক্লিয়াসে, ধনাত্মক চার্জ)
- **নিউট্রন** (নিউক্লিয়াসে, চার্জ নেই)
- **ইলেকট্রন** (নিউক্লিয়াসের বাইরে ঘোরে, ঋণাত্মক চার্জ)
```


## u2: Definition and explanation of isotopes

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
    "reason": "Accurately defines isotopes and explains that having the same number of protons but different numbers of neutrons leads to different mass numbers.",
    "errors": []
  }
}
```

```text
## সমস্থানিক কী?

**সমস্থানিক** হলো একই মৌলের এমন পরমাণু যাদের:
- **প্রোটন সংখ্যা একই** (তাই পারমাণবিক সংখ্যা একই)
- কিন্তু **নিউট্রন সংখ্যা ভিন্ন**
- ফলে **ভর সংখ্যা (mass number) ভিন্ন**
```


## u3: Isotopes of hydrogen (Protium, Deuterium, Tritium)

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
    "reason": "Accurately lists the subatomic composition and mass numbers of the three hydrogen isotopes.",
    "errors": []
  }
}
```

```text
### সহজ উদাহরণ দিয়ে বুঝি: হাইড্রোজেন

হাইড্রোজেনের তিনটি সমস্থানিক আছে:

| নাম | প্রোটন | নিউট্রন | ভর সংখ্যা |
|------|--------|---------|-----------|
| প্রোটিয়াম (¹H) | ১ | ০ | ১ |
| ডিউটেরিয়াম (²H) | ১ | ১ | ২ |
| ট্রিটিয়াম (³H) | ১ | ২ | ৩ |

দেখো, তিনটিরই প্রোটন সংখ্যা **১**, তাই এরা সবাই হাইড্রোজেন। কিন্তু নিউট্রন সংখ্যা ভিন্ন হওয়ায় এদের ভর আলাদা।
```


## u4: Etymological memory aid for the Bengali term 'সমস্থানিক'

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
    "reason": "Accurately breaks down the etymology of the Bengali word 'সমস্থানিক' (same position in the periodic table) as a mnemonic device.",
    "errors": []
  }
}
```

```text
## মনে রাখার সহজ কৌশল

**"সম" মানে একই, "স্থান" মানে পর্যায় সারণির স্থান**

অর্থাৎ, পর্যায় সারণিতে **একই স্থানে (একই ঘরে)** থাকে এমন পরমাণু — কারণ প্রোটন সংখ্যা একই বলে এরা একই মৌল হিসেবে গণ্য হয়, শুধু ভরে আলাদা।
```


## u5: Isotopes of carbon and their characteristics

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
    "reason": "Correctly states the proton and neutron counts for C-12, C-13, and C-14, along with their general properties (abundance, stability, radiocarbon dating application). The superscript on '⁶ প্রোটন' is a minor typographic quirk representing 6, not a factual error.",
    "errors": []
  }
}
```

```text
## আরেকটি উদাহরণ: কার্বন

- **কার্বন-১২** (⁶ প্রোটন, ৬ নিউট্রন) — সবচেয়ে বেশি পাওয়া যায়
- **কার্বন-১৩** (৬ প্রোটন, ৭ নিউট্রন) — স্থিতিশীল
- **কার্বন-১৪** (৬ প্রোটন, ৮ নিউট্রন) — তেজস্ক্রিয়, প্রত্নতাত্ত্বিক বয়স নির্ণয়ে ব্যবহৃত হয়!
```


## u6: General physical and chemical properties of isotopes

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
    "reason": "Accurately explains why chemical properties are nearly identical (same electron configuration) while physical properties vary (different masses).",
    "errors": []
  }
}
```

```text
## গুরুত্বপূর্ণ পয়েন্ট

1. সমস্থানিকদের **রাসায়নিক ধর্ম প্রায় একই** (কারণ ইলেকট্রন সংখ্যা একই)
2. কিন্তু **ভৌত ধর্ম** (যেমন ভর, ঘনত্ব) ভিন্ন হতে পারে
3. কিছু সমস্থানিক **স্থিতিশীল**, কিছু **তেজস্ক্রিয় (radioactive)**
```


## u7: Self-assessment practice question identifying isotopes

```json
{
  "attributes": {
    "subtype": "practice_question"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The question and the provided answer correctly identify oxygen-16 and oxygen-18 as isotopes based on equal proton numbers and differing neutron numbers.",
    "errors": []
  }
}
```

```text
## প্রশ্ন করে নিজেকে যাচাই করো

তুমি কি বলতে পারবে, নিচের পরমাণুগুলো একে অপরের সমস্থানিক কিনা?
- যদি একটির প্রোটন ৮, নিউট্রন ৮ হয়
- আরেকটির প্রোটন ৮, নিউট্রন ১০ হয়

(উত্তর: হ্যাঁ, কারণ প্রোটন সংখ্যা একই — দুটোই অক্সিজেনের সমস্থানিক, যথাক্রমে অক্সিজেন-১৬ ও অক্সিজেন-১৮!)
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
# সমস্থানিক (Isotope) - সহজ ভাষায় বোঝা যাক


```

```text


কোনো অংশ বুঝতে অসুবিধা হলে জিজ্ঞেস করো! 😊
```
