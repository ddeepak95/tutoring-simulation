# Stage 1: Hindi / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, atomic structure background, carbon isotopes example, properties, applications, and a mnemonic for isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation directly and accurately explains the concept of isotopes (समस्थानिक), covering definition, atomic composition, an illustrative comparison of carbon isotopes, physical/chemical properties, practical applications, and a memory aid.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of isotopes and atomic structure background | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparative example of carbon isotopes (C-12, C-13, C-14) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Application of carbon-14 in radiocarbon dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u5 | EXAMPLE | Application of cobalt-60 in cancer treatment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | EXAMPLE | Application of iodine-131 in thyroid diagnosis and treatment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of uranium-235 in nuclear energy | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | STUDY_SUPPORT | Mnemonic rhyme for remembering isotope characteristics | {"subtype": "mnemonic"} | accurate |

## u1: Definition of isotopes and atomic structure background

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
    "reason": "The explanation correctly defines subatomic particles, atomic number, and isotopes based on identical proton numbers and differing neutron numbers.",
    "errors": []
  }
}
```

```text
समस्थानिक (Isotopes) ऐसे परमाणु होते हैं जो **एक ही तत्व** के होते हैं, लेकिन उनके **न्यूट्रॉनों की संख्या अलग-अलग** होती है।

### पहले परमाणु को समझें
परमाणु में मुख्यतः तीन कण होते हैं:

- **प्रोटॉन**: धनावेशित कण  
- **न्यूट्रॉन**: आवेशहीन कण  
- **इलेक्ट्रॉन**: ऋणावेशित कण  

किसी तत्व की पहचान उसके **प्रोटॉनों की संख्या** से होती है। इसे **परमाणु क्रमांक (Atomic Number)** कहते हैं।

### समस्थानिक की परिभाषा
जब दो या अधिक परमाणुओं में:

- प्रोटॉनों की संख्या **समान** हो,
- लेकिन न्यूट्रॉनों की संख्या **भिन्न** हो,

तो वे उस तत्व के **समस्थानिक** कहलाते हैं।
```


## u2: Comparative example of carbon isotopes (C-12, C-13, C-14)

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
    "reason": "The proton, neutron, and mass numbers for carbon-12, carbon-13, and carbon-14 are factually correct, and the reasoning about identical identity with differing mass is sound.",
    "errors": []
  }
}
```

```text
## उदाहरण: कार्बन के समस्थानिक

कार्बन का परमाणु क्रमांक 6 है, अर्थात हर कार्बन परमाणु में 6 प्रोटॉन होते हैं।

| समस्थानिक | प्रोटॉन | न्यूट्रॉन | द्रव्यमान संख्या |
|---|---:|---:|---:|
| कार्बन-12 | 6 | 6 | 12 |
| कार्बन-13 | 6 | 7 | 13 |
| कार्बन-14 | 6 | 8 | 14 |

इन तीनों में प्रोटॉन 6 हैं, इसलिए ये सभी कार्बन हैं। पर न्यूट्रॉन अलग होने के कारण इनका द्रव्यमान अलग है।
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
    "reason": "The description accurately explains why chemical properties are similar while physical properties like density and radioactivity vary.",
    "errors": []
  }
}
```

```text
## समस्थानिकों के गुण

1. **रासायनिक गुण लगभग समान होते हैं**  
   क्योंकि रासायनिक व्यवहार मुख्यतः इलेक्ट्रॉनों और प्रोटॉनों की संख्या पर निर्भर करता है।

2. **भौतिक गुण अलग हो सकते हैं**  
   जैसे द्रव्यमान, घनत्व और रेडियोधर्मिता।

3. कुछ समस्थानिक **स्थिर** होते हैं, जबकि कुछ **रेडियोधर्मी** होते हैं।  
   उदाहरण: कार्बन-14 रेडियोधर्मी है।
```


## u4: Application of carbon-14 in radiocarbon dating

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
    "reason": "Carbon-14 is standardly used for dating archaeological and organic materials.",
    "errors": []
  }
}
```

```text
- **कार्बन-14**: पुरानी हड्डियों, लकड़ी और पुरातात्त्विक वस्तुओं की आयु ज्ञात करने में।
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
    "reason": "Cobalt-60 is widely used as a radiation source in cancer radiotherapy.",
    "errors": []
  }
}
```

```text
- **कोबाल्ट-60**: कैंसर के उपचार में।
```


## u6: Application of iodine-131 in thyroid diagnosis and treatment

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
    "reason": "Iodine-131 is correctly identified as a radiopharmaceutical used in thyroid imaging and therapy.",
    "errors": []
  }
}
```

```text
- **आयोडीन-131**: थायरॉयड रोगों की जाँच और उपचार में।
```


## u7: Application of uranium-235 in nuclear energy

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
    "reason": "Uranium-235 is the fissile isotope standardly used as fuel in nuclear reactors.",
    "errors": []
  }
}
```

```text
- **यूरेनियम-235**: परमाणु ऊर्जा और परमाणु रिएक्टरों में।
```


## u8: Mnemonic rhyme for remembering isotope characteristics

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
    "reason": "The mnemonic accurately encapsulates the defining properties of isotopes (same element, same protons, different neutrons).",
    "errors": []
  }
}
```

```text
### याद रखने की आसान ट्रिक
**“एक ही तत्व, प्रोटॉन समान; न्यूट्रॉन अलग, समस्थानिक नाम।”**
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Whether the introductory explanation of subatomic particles ('पहले परमाणु को समझें') should be split as a separate prerequisite CONCEPT unit from the formal isotope definition.",
    "proposed_resolution": "Kept together within u1 because the atomic structure overview serves directly as immediate explanatory setup for understanding what defines an isotope."
  },
  {
    "unit_ids": [
      "u4",
      "u5",
      "u6",
      "u7"
    ],
    "issue": "Whether the four listed applications under 'उपयोग' should be grouped into a single EXAMPLE unit or treated as distinct units.",
    "proposed_resolution": "Split into four separate illustrative EXAMPLE units (u4-u7) following the explicit instruction that independent applications listed together are separate units unless they jointly demonstrate a comparative relationship."
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

## उपयोग


```
