# Stage 1: Bengali / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Isotopes: definition, hydrogen isotope examples, general properties, applications, and summary",
  "topic_match": "on_topic",
  "reason": "The response clearly and comprehensively explains the concept of isotopes in chemistry, illustrating with hydrogen isotopes, describing their chemical and physical properties, and giving real-world applications.",
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
| u1 | CONCEPT | Definition of isotopes and relationship between atomic number and mass number | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparative example of hydrogen isotopes (protium, deuterium, and tritium) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Application of carbon-14 in radiometric dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u5 | EXAMPLE | Application of cobalt-60 in cancer treatment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | EXAMPLE | Application of uranium-235 in nuclear power generation | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | STUDY_SUPPORT | Summary recap of the definition of isotope | {"subtype": "recap"} | accurate |

## u1: Definition of isotopes and relationship between atomic number and mass number

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
    "reason": "Correctly defines isotopes as atoms of the same element having the same number of protons (and atomic number) but differing neutron numbers and mass numbers.",
    "errors": []
  }
}
```

```text
**আইসোটোপ (Isotope)** হলো একই মৌলের এমন পরমাণু, যাদের—

- **প্রোটনের সংখ্যা একই**
- কিন্তু **নিউট্রনের সংখ্যা ভিন্ন**

প্রোটনের সংখ্যা একই থাকার কারণে তাদের **পারমাণবিক সংখ্যা একই** থাকে। কিন্তু নিউট্রন ভিন্ন হওয়ায় তাদের **ভরসংখ্যা ভিন্ন** হয়।
```


## u2: Comparative example of hydrogen isotopes (protium, deuterium, and tritium)

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
    "reason": "Accurately details the proton and neutron counts of protium, deuterium, and tritium to demonstrate how identical proton counts with varying neutron counts yield different isotope masses.",
    "errors": []
  }
}
```

```text
### উদাহরণ: হাইড্রোজেনের আইসোটোপ
হাইড্রোজেনের পারমাণবিক সংখ্যা ১, অর্থাৎ প্রতিটি হাইড্রোজেন পরমাণুতে ১টি প্রোটন থাকে।

হাইড্রোজেনের তিনটি আইসোটোপ হলো—

1. **প্রোটিয়াম** \((¹₁H)\)  
   - প্রোটন = ১  
   - নিউট্রন = ০  

2. **ডিউটেরিয়াম** \((²₁H)\)  
   - প্রোটন = ১  
   - নিউট্রন = ১  

3. **ট্রিটিয়াম** \((³₁H)\)  
   - প্রোটন = ১  
   - নিউট্রন = ২  

এদের সবার প্রোটন ১টি, তাই এরা সবাই হাইড্রোজেন। কিন্তু নিউট্রনের সংখ্যা আলাদা, তাই এদের ভর আলাদা।
```


## u3: Chemical and physical properties of isotopes

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
    "reason": "Correctly states that isotopes share nearly identical chemical properties (governed by electron configuration) while differing in certain physical properties due to mass, and notes that some are radioactive.",
    "errors": []
  }
}
```

```text
### আইসোটোপের বৈশিষ্ট্য
- একই মৌলের আইসোটোপগুলোর **রাসায়নিক ধর্ম প্রায় একই**।
- তবে ভর ভিন্ন হওয়ার কারণে তাদের কিছু **ভৌত ধর্ম** (যেমন ঘনত্ব, গলনাঙ্ক) ভিন্ন হতে পারে।
- কিছু আইসোটোপ **তেজস্ক্রিয়** হতে পারে, যেমন কার্বন-১৪।
```


## u4: Application of carbon-14 in radiometric dating

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
    "reason": "Carbon-14 dating is standard for determining the age of organic archaeological artifacts and fossils.",
    "errors": []
  }
}
```

```text
- **কার্বন-১৪**: পুরোনো জীবাশ্ম বা প্রত্নবস্তুের বয়স নির্ণয়ে।
```


## u5: Application of cobalt-60 in cancer treatment

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
    "reason": "Cobalt-60 is commonly used in radiotherapy for treating cancer.",
    "errors": []
  }
}
```

```text
- **কোবাল্ট-৬০**: ক্যানসারের চিকিৎসায়।
```


## u6: Application of uranium-235 in nuclear power generation

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
    "reason": "Uranium-235 is fissile and widely used as a fuel in nuclear power plants.",
    "errors": []
  }
}
```

```text
- **ইউরেনিয়াম-২৩৫**: পারমাণবিক শক্তি উৎপাদনে।
```


## u7: Summary recap of the definition of isotope

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
    "reason": "Accurately summarizes the core definition of isotopes.",
    "errors": []
  }
}
```

```text
**সংক্ষেপে:**  
> একই প্রোটন সংখ্যা কিন্তু ভিন্ন নিউট্রন সংখ্যাবিশিষ্ট একই মৌলের পরমাণুগুলোকে আইসোটোপ বলে।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u4",
      "u5",
      "u6"
    ],
    "issue": "The list of three applications under '### ব্যবহার' could be interpreted as a single aggregated unit or three separate EXAMPLE units.",
    "proposed_resolution": "Separated into three distinct EXAMPLE units per guidelines specifying that independent applications listed together are separate units unless they jointly demonstrate a single comparative relationship."
  }
]
```

## Unassigned text for coverage review

```text


### ব্যবহার

```
