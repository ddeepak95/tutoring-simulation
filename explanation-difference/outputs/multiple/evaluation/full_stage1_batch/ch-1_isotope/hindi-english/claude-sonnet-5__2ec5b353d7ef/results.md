# Stage 1: Hindi / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Isotopes: definition, subatomic composition, hydrogen and carbon examples, chemical and physical properties, and a memory trick",
  "topic_match": "on_topic",
  "reason": "The explanation directly addresses isotopes in Hindi, detailing their definition, subatomic particle composition, examples (hydrogen and carbon), properties, and an etymological mnemonic.",
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
| u1 | CONCEPT | Definition of isotopes and explanation of how neutron variation alters mass number | {"depth": "explanation"} | contains_error |
| u2 | ANALOGY | Analogy comparing isotopes to siblings with identical parents but different weights | {} | accurate |
| u3 | EXAMPLE | Comparative example of hydrogen isotopes (protium, deuterium, and tritium) | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u4 | EXAMPLE | Comparative example of carbon isotopes (carbon-12 and carbon-14) | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u5 | CONCEPT | Chemical and physical properties and periodic table placement of isotopes | {"depth": "explanation"} | accurate |
| u6 | STUDY_SUPPORT | Etymological mnemonic for the Hindi term 'samsthanik' | {"subtype": "mnemonic"} | accurate |

## u1: Definition of isotopes and explanation of how neutron variation alters mass number

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
    "reason": "The text states that isotopes are 'elements' ('वे तत्व होते हैं'), whereas isotopes are atoms/nuclides of the same chemical element.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "**समस्थानिक** (Isotope) वे तत्व होते हैं जिनका **परमाणु क्रमांक (Atomic Number) समान** होता है"
          }
        ],
        "description": "Isotopes are defined as 'elements' ('वे तत्व होते हैं'), but isotopes are atoms of the same chemical element that share the same atomic number while having different mass numbers.",
        "correction": "समस्थानिक एक ही तत्व के वे परमाणु होते हैं जिनका परमाणु क्रमांक समान होता है, लेकिन उनकी द्रव्यमान संख्या अलग-अलग होती है।",
        "severity": "minor"
      }
    ]
  }
}
```

```text
**समस्थानिक** (Isotope) वे तत्व होते हैं जिनका **परमाणु क्रमांक (Atomic Number) समान** होता है, लेकिन उनका **द्रव्यमान संख्या (Mass Number) अलग-अलग** होती है।
```

```text
$$\text{द्रव्यमान संख्या (A)} = \text{प्रोटॉन} + \text{न्यूट्रॉन}$$

चूंकि प्रोटॉन की संख्या (परमाणु क्रमांक) समान रहती है, इसलिए न्यूट्रॉन की संख्या बदलने से द्रव्यमान संख्या बदल जाती है।
```


## u2: Analogy comparing isotopes to siblings with identical parents but different weights

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "सोचिए कि एक ही परिवार के भाई-बहन हैं:\n- उनके **माता-पिता एक ही हैं** (यानी पहचान एक जैसी)\n- लेकिन उनका **वजन अलग-अलग** हो सकता है"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy accurately maps the concept of shared identity (protons) and different weights (neutrons/mass) using siblings in a family.",
    "errors": []
  }
}
```

```text
सोचिए कि एक ही परिवार के भाई-बहन हैं:
- उनके **माता-पिता एक ही हैं** (यानी पहचान एक जैसी)
- लेकिन उनका **वजन अलग-अलग** हो सकता है

ठीक इसी तरह, समस्थानिकों में:
- **प्रोटॉन (Protons) की संख्या समान** होती है
- लेकिन **न्यूट्रॉन (Neutrons) की संख्या अलग-अलग** होती है
```


## u3: Comparative example of hydrogen isotopes (protium, deuterium, and tritium)

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
    "reason": "The proton count, neutron count, and mass numbers for protium, deuterium, and tritium are factually correct.",
    "errors": []
  }
}
```

```text
| नाम | प्रोटॉन | न्यूट्रॉन | द्रव्यमान संख्या |
|------|---------|-----------|-------------------|
| प्रोटियम (¹H) | 1 | 0 | 1 |
| ड्यूटीरियम (²H) | 1 | 1 | 2 |
| ट्राइटियम (³H) | 1 | 2 | 3 |

देखिए! तीनों में **प्रोटॉन = 1** है, लेकिन **न्यूट्रॉन अलग-अलग** हैं।
```


## u4: Comparative example of carbon isotopes (carbon-12 and carbon-14)

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
    "reason": "The proton and neutron counts for carbon-12 and carbon-14 are factually correct.",
    "errors": []
  }
}
```

```text
- कार्बन-12 (¹²C): 6 प्रोटॉन + 6 न्यूट्रॉन
- कार्बन-14 (¹⁴C): 6 प्रोटॉन + 8 न्यूट्रॉन
```


## u5: Chemical and physical properties and periodic table placement of isotopes

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
    "reason": "The explanations that isotopes have identical chemical properties due to the same electron count, differing physical properties due to mass variations, and identical periodic table placement are factually accurate.",
    "errors": []
  }
}
```

```text
✅ समस्थानिकों के **रासायनिक गुण (Chemical Properties) समान** होते हैं (क्योंकि इलेक्ट्रॉन संख्या समान होती है)

✅ लेकिन उनके **भौतिक गुण (Physical Properties) अलग** हो सकते हैं (जैसे घनत्व, क्वथनांक)

✅ आवर्त सारणी (Periodic Table) में समस्थानिक **एक ही स्थान** पर रखे जाते हैं
```


## u6: Etymological mnemonic for the Hindi term 'samsthanik'

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
    "reason": "The etymological breakdown of 'सम' and 'स्थानिक' correctly serves as a memory aid connecting the term to identical positioning in the periodic table.",
    "errors": []
  }
}
```

```text
**"समस्थानिक"** शब्द को तोड़ें:
- **सम** = समान (Same)
- **स्थानिक** = स्थान (Place/Position)

यानी "एक ही स्थान पर रहने वाले" - आवर्त सारणी में एक ही जगह!
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "The formal definition of isotopes and the mass number formula/explanation are separated by the sibling analogy. They could either be treated as two separate CONCEPT units (a definition statement unit and a formula explanation unit) or unified into a single CONCEPT unit via two excerpts.",
    "proposed_resolution": "Unified into a single CONCEPT unit ('u1') using two excerpts in accordance with the guideline that an isotope definition and its direct explanation of how neutron variation alters mass number belong together."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Unit u3 includes an interpretive closing sentence ('देखिए! तीनों में प्रोटॉन = 1 है, लेकिन न्यूट्रॉन अलग-अलग हैं।') following the data table, which could be argued as qualitative worked reasoning rather than purely illustrative.",
    "proposed_resolution": "Assigned treatment 'illustrative' because the unit simply displays the known subatomic particle values and highlights the pattern rather than carrying out a calculation or problem-solving procedure."
  }
]
```

## Unassigned text for coverage review

```text
# समस्थानिक (Isotope) - सरल भाषा में समझाएं

## परिभाषा

```

```text


## आसान भाषा में समझें


```

```text


## सूत्र याद रखें


```

```text


## उदाहरण: हाइड्रोजन के समस्थानिक


```

```text


## एक और उदाहरण: कार्बन


```

```text


## मुख्य बिंदु (याद रखने के लिए)


```

```text


## याद रखने की ट्रिक

```

```text


---
क्या आप चाहेंगे कि मैं **समभारिक (Isobars)** या **समन्यूट्रॉनिक (Isotones)** के बारे में भी समझाऊं, ताकि आप इनके बीच का अंतर स्पष्ट रूप से समझ सकें?
```
