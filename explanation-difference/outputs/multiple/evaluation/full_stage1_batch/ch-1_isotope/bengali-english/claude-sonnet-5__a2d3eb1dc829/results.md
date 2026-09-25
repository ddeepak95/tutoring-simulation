# Stage 1: Bengali / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, properties, examples, analogy, and memory rule for isotopes",
  "topic_match": "on_topic",
  "reason": "The text directly explains the concept of isotopes, including their defining nuclear characteristics, properties, examples (hydrogen and carbon), an analogy, and a memory rule.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of isotopes based on proton, neutron, and mass numbers | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Hydrogen isotopes comparison | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | ANALOGY | Three brothers analogy for isotopes | {} | accurate |
| u4 | CONCEPT | Chemical and physical properties and periodic table placement of isotopes | {"depth": "explanation"} | accurate |
| u5 | EXAMPLE | Carbon isotopes and radiocarbon dating application | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | STUDY_SUPPORT | Memory rule for isotopes | {"subtype": "mnemonic"} | accurate |

## u1: Definition of isotopes based on proton, neutron, and mass numbers

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
    "reason": "The definition correctly identifies isotopes as atoms of the same element having the same atomic number (protons) but different numbers of neutrons and hence different mass numbers.",
    "errors": []
  }
}
```

```text
## আইসোটোপ কী?

**আইসোটোপ** হলো একই মৌলের এমন পরমাণু যাদের:
- **প্রোটন সংখ্যা (পারমাণবিক সংখ্যা) একই** ✅
- কিন্তু **নিউট্রন সংখ্যা ভিন্ন** ❌
- ফলে **ভর সংখ্যা (Mass Number) আলাদা** হয়
```


## u2: Hydrogen isotopes comparison

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
    "reason": "The table and accompanying reasoning accurately state the proton, neutron, and mass numbers of protium, deuterium, and tritium.",
    "errors": []
  }
}
```

```text
### হাইড্রোজেনের আইসোটোপ:

| নাম | প্রোটন | নিউট্রন | ভর সংখ্যা |
|------|--------|---------|-----------|
| প্রোটিয়াম (¹H) | 1 | 0 | 1 |
| ডিউটেরিয়াম (²H) | 1 | 1 | 2 |
| ট্রিটিয়াম (³H) | 1 | 2 | 3 |

লক্ষ্য করো - **তিনটিরই প্রোটন সংখ্যা 1**, তাই তিনটিই হাইড্রোজেন। কিন্তু নিউট্রন সংখ্যা ভিন্ন হওয়ায় এদের ভর আলাদা।
```


## u3: Three brothers analogy for isotopes

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "তিন ভাই - একই বাবা-মায়ের সন্তান (একই মৌল), কিন্তু তাদের ওজন ভিন্ন"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy maps the concept of identical identity (same parents / same element) with differing weights (mass numbers) to illustrate the relationship between isotopes.",
    "errors": []
  }
}
```

```text
## একটি সহজ উপমা (Analogy)

ধরো, তিন ভাই - একই বাবা-মায়ের সন্তান (একই মৌল), কিন্তু তাদের ওজন ভিন্ন (ভর সংখ্যা ভিন্ন)। তারা "ভাই" পরিচয়ে এক, কিন্তু শারীরিক গঠনে (ওজনে) আলাদা।
```


## u4: Chemical and physical properties and periodic table placement of isotopes

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
    "reason": "The explanation correctly connects electronic configuration to chemical similarity, mass differences to physical property differences, and accurately gives the etymology and periodic table placement.",
    "errors": []
  }
}
```

```text
## গুরুত্বপূর্ণ পয়েন্ট

1. **রাসায়নিক ধর্ম প্রায় একই** — কারণ ইলেকট্রন সংখ্যা একই থাকে
2. **ভৌত ধর্ম ভিন্ন** — যেমন ঘনত্ব, ভর ইত্যাদি ভিন্ন হয়
3. পর্যায় সারণিতে আইসোটোপগুলো **একই স্থানে** অবস্থান করে (তাই নাম "iso" = same, "topos" = place)
```


## u5: Carbon isotopes and radiocarbon dating application

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
    "reason": "The nuclear compositions of C-12, C-13, and C-14 are correct, as is the mention of C-14 being radioactive and used in radiocarbon dating.",
    "errors": []
  }
}
```

```text
## আরেকটি উদাহরণ - কার্বনের আইসোটোপ

- **C-12**: 6 প্রোটন + 6 নিউট্রন (সবচেয়ে সাধারণ)
- **C-13**: 6 প্রোটন + 7 নিউট্রন
- **C-14**: 6 প্রোটন + 8 নিউট্রন (তেজস্ক্রিয়, প্রত্নতাত্ত্বিক বয়স নির্ণয়ে ব্যবহৃত হয়)
```


## u6: Memory rule for isotopes

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
    "reason": "The short memory rule accurately captures the defining criterion of isotopes.",
    "errors": []
  }
}
```

```text
## সংক্ষেপে মনে রাখার সূত্র

> **"একই প্রোটন, ভিন্ন নিউট্রন = আইসোটোপ"**
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
# আইসোটোপ (Isotope) - ব্যাখ্যা

আচ্ছা, চলো আমরা খুব সহজভাবে **আইসোটোপ** কী তা বুঝি।


```

```text


## সহজ উদাহরণ দিয়ে বুঝি


```

```text


---

তোমার কি এই বিষয়ে আরও কোনো প্রশ্ন আছে? যেমন - আইসোটোপের ব্যবহার সম্পর্কে জানতে চাও?
```
