# Stage 1: Hindi / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, analogy, examples, mnemonic, applications, and properties of isotopes",
  "topic_match": "on_topic",
  "reason": "The response comprehensively explains isotopes, including their definition, examples (hydrogen and carbon), etymological mnemonic, practical uses, and properties.",
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
| u1 | CONCEPT | Definition of isotopes | {"depth": "explanation"} | accurate |
| u2 | ANALOGY | Family siblings analogy for isotopes | {} | accurate |
| u3 | EXAMPLE | Isotopes of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u4 | EXAMPLE | Isotopes of carbon | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u5 | STUDY_SUPPORT | Etymological memory trick for the term samasthanik | {"subtype": "mnemonic"} | accurate |
| u6 | EXAMPLE | Application of carbon-14 in radiocarbon dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of cobalt-60 in cancer treatment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | EXAMPLE | Application of uranium-235 in nuclear power | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | EXAMPLE | Application of iodine-131 in thyroid diagnosis | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u10 | CAVEAT | Distinction between chemical and physical properties of isotopes | {"subtype": "qualification"} | accurate |

## u1: Definition of isotopes

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
    "reason": "Correctly defines isotopes in terms of atomic number (protons), neutron variance, and the resulting difference in mass number.",
    "errors": []
  }
}
```

```text
**समस्थानिक** उन परमाणुओं को कहते हैं जो:
- एक ही **तत्व** के होते हैं
- जिनमें **प्रोटॉन की संख्या समान** होती है (परमाणु क्रमांक समान)
- लेकिन **न्यूट्रॉन की संख्या अलग-अलग** होती है
- इसलिए इनका **द्रव्यमान संख्या (Mass Number) अलग** होता है
```


## u2: Family siblings analogy for isotopes

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "सोचिए एक ही परिवार के भाई-बहन हैं - सबका सरनेम (उपनाम) एक जैसा है, लेकिन उनका वज़न अलग-अलग हो सकता है।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy maps shared family surname to shared element identity and differing weights to differing mass numbers appropriately.",
    "errors": []
  }
}
```

```text
सोचिए एक ही परिवार के भाई-बहन हैं - सबका सरनेम (उपनाम) एक जैसा है, लेकिन उनका वज़न अलग-अलग हो सकता है। ठीक वैसे ही समस्थानिक एक ही तत्व के "भाई-बहन" जैसे होते हैं।
```


## u3: Isotopes of hydrogen

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
    "reason": "Correctly lists protium, deuterium, and tritium along with their proton, neutron, and mass numbers.",
    "errors": []
  }
}
```

```text
### 1️⃣ हाइड्रोजन के समस्थानिक
| नाम | प्रोटॉन | न्यूट्रॉन | द्रव्यमान संख्या |
|------|---------|-----------|-------------------|
| प्रोटियम (¹H) | 1 | 0 | 1 |
| ड्यूटीरियम (²H) | 1 | 1 | 2 |
| ट्राइटियम (³H) | 1 | 2 | 3 |
```


## u4: Isotopes of carbon

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
    "reason": "Correctly lists carbon-12, carbon-13, and carbon-14 with their proton and neutron counts and notes C-14's radioactivity.",
    "errors": []
  }
}
```

```text
### 2️⃣ कार्बन के समस्थानिक
- **कार्बन-12** (⁶ प्रोटॉन + ⁶ न्यूट्रॉन)
- **कार्बन-13** (⁶ प्रोटॉन + ⁷ न्यूट्रॉन)
- **कार्बन-14** (⁶ प्रोटॉन + ⁸ न्यूट्रॉन) - यह रेडियोधर्मी होता है!
```


## u5: Etymological memory trick for the term samasthanik

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
    "reason": "Accurately breaks down the term 'समस्थानिक' (same place in the periodic table) and explains the underlying reason.",
    "errors": []
  }
}
```

```text
**"समस्थानिक" शब्द का अर्थ ही है - "समान स्थान"**
- **सम** = समान
- **स्थानिक** = स्थान (आवर्त सारणी में)

यानी समस्थानिक आवर्त सारणी में **एक ही स्थान** पर रहते हैं, क्योंकि उनके रासायनिक गुण समान होते हैं (प्रोटॉन संख्या समान होने के कारण)।
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
    "reason": "Carbon-14 is accurately identified as the isotope used in radiocarbon dating.",
    "errors": []
  }
}
```

```text
1. **कार्बन-14** → पुरातात्विक वस्तुओं की उम्र पता करने में (Carbon Dating)
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
    "reason": "Cobalt-60 is accurately identified as an isotope used in radiation therapy for cancer.",
    "errors": []
  }
}
```

```text
2. **कोबाल्ट-60** → कैंसर के इलाज में (रेडियोथेरेपी)
```


## u8: Application of uranium-235 in nuclear power

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
    "reason": "Uranium-235 is accurately identified as a fissile isotope used in nuclear power generation.",
    "errors": []
  }
}
```

```text
3. **यूरेनियम-235** → परमाणु ऊर्जा उत्पादन में
```


## u9: Application of iodine-131 in thyroid diagnosis

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
    "reason": "Iodine-131 is accurately identified as an isotope used in thyroid diagnostic investigations and treatments.",
    "errors": []
  }
}
```

```text
4. **आयोडीन-131** → थायरॉइड की जांच में
```


## u10: Distinction between chemical and physical properties of isotopes

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
    "verdict": "accurate",
    "reason": "Correctly states that chemical properties are identical due to electron configuration while physical properties differ due to atomic mass.",
    "errors": []
  }
}
```

```text
समस्थानिकों के **रासायनिक गुण एक जैसे** होते हैं (क्योंकि इलेक्ट्रॉन की संख्या समान होती है), लेकिन **भौतिक गुण अलग** हो सकते हैं (जैसे घनत्व, क्वथनांक) क्योंकि द्रव्यमान अलग होता है।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u10"
    ],
    "issue": "u10 qualifies that isotopes share chemical properties but differ in physical properties, introduced with an alert header ('एक महत्वपूर्ण बात ध्यान रखें ⚠️'). It could be classified as CAVEAT (qualification) or CONCEPT (explanation).",
    "proposed_resolution": "Classified as CAVEAT with subtype qualification because it serves as an explicit cautionary distinction qualifying the extent to which isotopes of the same element are identical."
  }
]
```

## Unassigned text for coverage review

```text
# समस्थानिक (Isotopes) 🔬

नमस्ते! आज हम एक बहुत ही रोचक विषय समझेंगे - **समस्थानिक**।

## समस्थानिक क्या हैं?


```

```text


## आसान भाषा में समझें 🎯


```

```text


## मुख्य उदाहरण


```

```text


## याद रखने की सरल ट्रिक 💡


```

```text


## समस्थानिकों के उपयोग


```

```text


## एक महत्वपूर्ण बात ध्यान रखें ⚠️


```

```text


---

**क्या आप कोई विशेष उदाहरण या प्रश्न पूछना चाहेंगे?** मैं और विस्तार से समझा सकता हूँ! 😊
```
