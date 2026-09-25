# Stage 1: Hindi / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, nuclear structure explanation, carbon example, properties, practical applications, and a mnemonic for isotopes",
  "topic_match": "on_topic",
  "reason": "The explanation directly defines isotopes, explains the underlying nuclear difference (same protons, different neutrons), illustrates with carbon isotopes, lists key properties and uses, and provides a mnemonic.",
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
| u1 | CONCEPT | Definition of isotopes and explanation of difference in mass number | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparative example of carbon isotopes | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | General chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Application of carbon-14 in radiometric dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u5 | EXAMPLE | Application of iodine-131 in treating thyroid diseases | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u6 | EXAMPLE | Application of cobalt-60 in cancer therapy and sterilization | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of uranium-235 in nuclear power generation | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | STUDY_SUPPORT | Mnemonic verse for remembering isotope definitions | {"subtype": "mnemonic"} | accurate |

## u1: Definition of isotopes and explanation of difference in mass number

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
    "reason": "Correctly defines isotopes as atoms of the same element having the same atomic number but different mass numbers due to differing neutron counts.",
    "errors": []
  }
}
```

```text
**समस्थानिक (Isotopes)** वे परमाणु होते हैं जो **एक ही तत्व** के होते हैं, इसलिए उनका **परमाणु क्रमांक (Atomic Number)** समान होता है, लेकिन उनके **द्रव्यमान संख्या (Mass Number)** अलग-अलग होते हैं।

### ऐसा क्यों होता है?
किसी परमाणु में:

- **प्रोटॉन** की संख्या = परमाणु क्रमांक  
- **प्रोटॉन + न्यूट्रॉन** की संख्या = द्रव्यमान संख्या  

समस्थानिकों में प्रोटॉन की संख्या समान रहती है, लेकिन **न्यूट्रॉन की संख्या अलग** होती है।
```


## u2: Comparative example of carbon isotopes

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
    "reason": "The proton, neutron, and mass numbers given for carbon-12, carbon-13, and carbon-14 are completely accurate.",
    "errors": []
  }
}
```

```text
### उदाहरण: कार्बन के समस्थानिक

कार्बन का परमाणु क्रमांक **6** है। अर्थात कार्बन के हर परमाणु में 6 प्रोटॉन होंगे।

| समस्थानिक | प्रोटॉन | न्यूट्रॉन | द्रव्यमान संख्या |
|---|---:|---:|---:|
| कार्बन-12 (¹²C) | 6 | 6 | 12 |
| कार्बन-13 (¹³C) | 6 | 7 | 13 |
| कार्बन-14 (¹⁴C) | 6 | 8 | 14 |

तीनों कार्बन हैं क्योंकि तीनों में 6 प्रोटॉन हैं। पर न्यूट्रॉन अलग होने के कारण उनका द्रव्यमान अलग है।
```


## u3: General chemical and physical properties of isotopes

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
    "reason": "Correctly outlines key properties, including identical electron configurations leading to similar chemical properties, differing physical properties, and radioactive behavior in some isotopes.",
    "errors": []
  }
}
```

```text
### मुख्य बातें

1. समस्थानिकों का **परमाणु क्रमांक समान** होता है।  
2. उनका **द्रव्यमान संख्या अलग** होता है।  
3. उनके **रासायनिक गुण लगभग समान** होते हैं, क्योंकि इलेक्ट्रॉनों की व्यवस्था समान होती है।  
4. उनके कुछ **भौतिक गुण अलग** हो सकते हैं, जैसे द्रव्यमान और स्थिरता।  
5. कुछ समस्थानिक **रेडियोधर्मी** होते हैं, जैसे कार्बन-14।
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
    "reason": "Accurately identifies radiocarbon dating of fossils and ancient objects as a standard application of carbon-14.",
    "errors": []
  }
}
```

```text
**कार्बन-14:** पुरानी वस्तुओं, जीवाश्मों आदि की आयु जानने में
```


## u5: Application of iodine-131 in treating thyroid diseases

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
    "reason": "Accurately identifies iodine-131's medical use in treating thyroid conditions.",
    "errors": []
  }
}
```

```text
**आयोडीन-131:** थायरॉइड रोगों के उपचार में
```


## u6: Application of cobalt-60 in cancer therapy and sterilization

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
    "reason": "Accurately identifies cobalt-60's radiotherapy application and medical instrument irradiation sterilization.",
    "errors": []
  }
}
```

```text
**कोबाल्ट-60:** कैंसर उपचार और चिकित्सा उपकरणों को कीटाणुरहित करने में
```


## u7: Application of uranium-235 in nuclear power generation

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
    "reason": "Accurately identifies uranium-235 as a nuclear fuel in power generation.",
    "errors": []
  }
}
```

```text
**यूरेनियम-235:** परमाणु ऊर्जा उत्पादन में
```


## u8: Mnemonic verse for remembering isotope definitions

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
    "reason": "The rhyming mnemonic correctly pairs same element/protons with different neutrons to identify isotopes.",
    "errors": []
  }
}
```

```text
**याद रखने की ट्रिक:**  
> “एक ही तत्व, प्रोटॉन समान; न्यूट्रॉन अलग, समस्थानिक पहचान।”
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "The section 'मुख्य बातें' contains a mixture of recap points (atomic number and mass number) and new conceptual information (chemical properties, physical properties, radioactivity). It could be interpreted as a recap STUDY_SUPPORT unit or a CONCEPT unit.",
    "proposed_resolution": "Classified as CONCEPT because points 3 to 5 introduce and explain substantial new general concepts (electron arrangements determining similar chemical properties, differing physical properties, and radioactivity) rather than simply reviewing prior text."
  },
  {
    "unit_ids": [
      "u4",
      "u5",
      "u6",
      "u7"
    ],
    "issue": "The applications of isotopes are listed under a single heading '### उपयोग'. They could either be grouped together into a single illustrative EXAMPLE unit or separated into individual independent EXAMPLE units.",
    "proposed_resolution": "Separated into four distinct EXAMPLE units (u4–u7) following the explicit instruction that independent applications listed together (such as radiocarbon dating and cancer therapy) constitute separate units unless they jointly demonstrate a specific comparison."
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

### उपयोग

- 
```

```text
  
- 
```

```text
  
- 
```

```text
  
- 
```
