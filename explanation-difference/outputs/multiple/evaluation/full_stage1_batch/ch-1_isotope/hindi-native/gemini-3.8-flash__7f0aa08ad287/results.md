# Stage 1: Hindi / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Isotopes: definition, subatomic basis, everyday analogy, examples, properties, and applications",
  "topic_match": "on_topic",
  "reason": "The text directly and comprehensively explains isotopes, covering the subatomic definitions (atomic number and mass number), an analogy, specific elemental examples (hydrogen and carbon), physical and chemical properties, and practical applications.",
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
| u1 | CONCEPT | Definition of isotopes and foundational subatomic concepts | {"depth": "explanation"} | contains_error |
| u2 | ANALOGY | School bag analogy for isotopes | {} | accurate |
| u3 | EXAMPLE | Comparative example of hydrogen isotopes | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u4 | EXAMPLE | Comparative example of carbon isotopes | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u5 | CONCEPT | Chemical and physical properties of isotopes | {"depth": "explanation"} | accurate |
| u6 | EXAMPLE | Application of carbon-14 in radiocarbon dating | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of cobalt-60 in cancer radiotherapy | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | EXAMPLE | Application of iodine-131 in goitre and thyroid treatment | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | EXAMPLE | Application of uranium-235 in nuclear power generation | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u10 | STUDY_SUPPORT | Recap of key defining features of isotopes | {"subtype": "recap"} | accurate |

## u1: Definition of isotopes and foundational subatomic concepts

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
    "reason": "The unit accurately defines atomic number, subatomic composition, and the core definition of isotopes, but makes a minor terminological error by referring to the nucleon count (mass number) as 'परमाणु भार' (atomic weight) rather than 'द्रव्यमान संख्या'.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "(प्रोटॉन + न्यूट्रॉन) की कुल संख्या को हम **परमाणु भार (Mass Number)** कहते हैं।"
          }
        ],
        "description": "The total number of protons and neutrons is the mass number, which is termed 'द्रव्यमान संख्या' in Hindi. 'परमाणु भार' strictly translates to atomic weight/mass, which represents the weighted average mass of an element's isotopes rather than an integer nucleon count.",
        "correction": "(प्रोटॉन + न्यूट्रॉन) की कुल संख्या को हम द्रव्यमान संख्या (Mass Number) कहते हैं।",
        "severity": "minor"
      }
    ]
  }
}
```

```text
हम जानते हैं कि हर परमाणु (Atom) के नाभिक (Nucleus) में दो मुख्य कण होते हैं:
1. **प्रोटॉन (Proton):** यह परमाणु का 'आधार कार्ड' या 'रोल नंबर' है। अगर प्रोटॉन की संख्या बदली, तो तत्व (Element) ही बदल जाएगा। इसे हम **परमाणु क्रमांक (Atomic Number)** कहते हैं।
2. **न्यूट्रॉन (Neutron):** यह नाभिक में प्रोटॉन के साथ रहता है, लेकिन इस पर कोई चार्ज नहीं होता। 

(प्रोटॉन + न्यूट्रॉन) की कुल संख्या को हम **परमाणु भार (Mass Number)** कहते हैं।

---

### 2. तो, 'समस्थानिक' (Isotopes) क्या हैं?

शब्द को तोड़कर देखिए: **सम + स्थानिक** = जिनका आवर्त सारणी (Periodic table) में **'स्थान समान'** हो।

**सरल परिभाषा:** 
> "एक ही तत्व के ऐसे अलग-अलग रूप (परमाणु), जिनके पास **प्रोटॉन की संख्या (परमाणु क्रमांक) तो समान** होती है, लेकिन **न्यूट्रॉन की संख्या अलग** होने के कारण उनका **परमाणु भार (Mass Number) भिन्न** होता है, उन्हें **समस्थानिक (Isotopes)** कहते हैं।"
```


## u2: School bag analogy for isotopes

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "मान लीजिए आपके स्कूल बैग का वजन 3 किलोग्राम है।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The analogy correctly maps unchanging student identity to element identity (atomic number) and extra books adding weight to extra neutrons increasing mass.",
    "errors": []
  }
}
```

```text
मान लीजिए आपके स्कूल बैग का वजन 3 किलोग्राम है। 
अब सोचिए, आप वही छात्र हैं (आपकी पहचान नहीं बदली), लेकिन एक दिन आपने बैग में दो भारी किताबें अतिरिक्त रख लीं। अब आपका कुल वजन 2 किलो बढ़ गया। 
क्या किताबें बढ़ने से आपका नाम बदल गया? नहीं! 
**आप वही हैं, बस आपका वजन बढ़ गया।** 

समस्थानिक बिल्कुल ऐसे ही होते हैं—तत्व वही रहता है, बस कुछ परमाणुओं की जेब में न्यूट्रॉन ज़्यादा आ जाते हैं, जिससे वे भारी हो जाते हैं!
```


## u3: Comparative example of hydrogen isotopes

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
    "reason": "The descriptions, proton/neutron counts, names, and general properties of protium, deuterium, and tritium are factually correct.",
    "errors": []
  }
}
```

```text
#### (क) हाइड्रोजन के तीन भाई (Hydrogen Isotopes)
हाइड्रोजन प्रकृति का इकलौता ऐसा तत्व है जिसके समस्थानिकों के अलग-अलग नाम भी हैं:
1. **प्रोटियम ($^1H$):** 1 प्रोटॉन, **0 न्यूट्रॉन** (यह सबसे सामान्य हाइड्रोजन है जो पानी में होता है)।
2. **ड्यूटीरियम ($^2H$):** 1 प्रोटॉन, **1 न्यूट्रॉन** (इसे 'भारी हाइड्रोजन' कहते हैं, इससे भारी जल बनता है)।
3. **ट्रिटियम ($^3H$):** 1 प्रोटॉन, **2 न्यूट्रॉन** (यह रेडियोधर्मी यानी Radioactive होता है)।

*ध्यान दें: तीनों में प्रोटॉन केवल 1 ही है, इसलिए तीनों ही 'हाइड्रोजन' हैं!*
```


## u4: Comparative example of carbon isotopes

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
    "reason": "The proton/neutron compositions and general characteristics of carbon-12 and carbon-14 are stated correctly.",
    "errors": []
  }
}
```

```text
#### (ख) कार्बन (Carbon)
* **कार्बन-12 ($^{12}C$):** इसमें 6 प्रोटॉन और 6 न्यूट्रॉन हैं। (हमारे चारों ओर 99% यही है)।
* **कार्बन-14 ($^{14}C$):** इसमें 6 प्रोटॉन और **8 न्यूट्रॉन** हैं। (यह दुर्लभ और रेडियोधर्मी है)।
```


## u5: Chemical and physical properties of isotopes

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
    "reason": "The explanation correctly attributes identical chemical behavior to identical electron configurations and differing physical properties to mass differences.",
    "errors": []
  }
}
```

```text
### 5. इनके गुण (Properties) कैसे होते हैं?
* **रासायनिक गुण (Chemical Properties):** ये **एक जैसे** होते हैं, क्योंकि रासायनिक क्रियाओं में इलेक्ट्रॉन भाग लेते हैं और समस्थानिकों में इलेक्ट्रॉनों की संख्या समान होती है।
* **भौतिक गुण (Physical Properties):** भार अलग होने के कारण इनका घनत्व (density), क्वथनांक (boiling point) आदि **थोड़े अलग** हो सकते हैं।
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
    "reason": "Carbon-14 is accurately identified as the isotope used for radiocarbon dating of organic archaeological artifacts and fossils.",
    "errors": []
  }
}
```

```text
1. **कार्बन डेटिंग (Carbon-14):** पुरानी लकड़ियों, जीवाश्मों और मिस्र के पिरामिडों की उम्र पता लगाने के लिए।
```


## u7: Application of cobalt-60 in cancer radiotherapy

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
    "reason": "Cobalt-60 is accurately stated to be used in radiation therapy to destroy cancerous cells.",
    "errors": []
  }
}
```

```text
2. **कैंसर के इलाज में:** कोबाल्ट-60 ($^{60}Co$) का उपयोग कैंसर कोशिकाओं को नष्ट करने के लिए किया जाता है।
```


## u8: Application of iodine-131 in goitre and thyroid treatment

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
    "reason": "Iodine-131 is accurately identified for its clinical role in thyroid examination and treatment.",
    "errors": []
  }
}
```

```text
3. **घेंघा रोग (Goitre) की जांच:** आयोडीन-131 ($^{131}I$) का उपयोग थायरॉइड ग्रंथि के इलाज में होता है।
```


## u9: Application of uranium-235 in nuclear power generation

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
    "reason": "Uranium-235 is correctly identified as a fissile fuel used in nuclear power reactors.",
    "errors": []
  }
}
```

```text
4. **परमाणु ऊर्जा:** यूरेनियम-235 ($^{235}U$) का उपयोग बिजली बनाने वाले परमाणु रिएक्टरों में ईंधन के रूप में होता है।
```


## u10: Recap of key defining features of isotopes

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
    "reason": "The summary correctly encapsulates that isotopes share the same atomic number (protons) but differ in mass number (neutrons).",
    "errors": []
  }
}
```

```text
### संक्षेप में याद रखने का मूलमंत्र:
* **समान:** परमाणु क्रमांक (प्रोटॉन की संख्या)।
* **भिन्न:** द्रव्यमान संख्या (न्यूट्रॉन की संख्या)।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Section 1 ('पहले आधार समझें') reviews atomic number and mass number as prerequisite foundation, while Section 2 formally defines isotopes. These could be split into two separate CONCEPT units.",
    "proposed_resolution": "Kept together as a single CONCEPT unit because Section 1 explicitly serves as a brief prerequisite reminder supporting the definition in Section 2, following the preference to keep supporting background and definition together within a single teaching progression."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "u3 ends with an explicit deduction ('तीनों में प्रोटॉन केवल 1 ही है, इसलिए तीनों ही 'हाइड्रोजन' हैं!'), which could arguably be classified as 'worked' qualitative reasoning rather than 'illustrative'.",
    "proposed_resolution": "Assigned 'illustrative' because the primary teaching function is presenting the classic three isotopes of hydrogen rather than solving a problem or working through a calculation."
  },
  {
    "unit_ids": [
      "u6",
      "u7",
      "u8",
      "u9"
    ],
    "issue": "The four applications appear in a single bulleted list under Section 6 and could potentially be grouped into one comparative EXAMPLE unit.",
    "proposed_resolution": "Separated into four distinct EXAMPLE units following the specific guideline rule that distinct real-world applications (such as radiocarbon dating and cancer treatment) constitute separate EXAMPLE units even when sharing a single list or heading."
  }
]
```

## Unassigned text for coverage review

```text
नमस्ते! एक शिक्षक के रूप में, मुझे विज्ञान की जटिल अवधारणाओं को आसान बनाकर सिखाना बहुत पसंद है। 

आज हम रसायन विज्ञान (Chemistry) के एक बहुत ही महत्वपूर्ण और दिलचस्प विषय को समझेंगे—**समस्थानिक (Isotopes)**।

इसे रटने के बजाय, आइए एक कहानी और उदाहरण से समझते हैं।

---

### 1. पहले आधार समझें (Flashback)

```

```text


---

### 3. एक मज़ेदार उदाहरण (Daily Life Analogy)

```

```text


---

### 4. विज्ञान की दुनिया से सबसे प्रसिद्ध उदाहरण


```

```text


---


```

```text


---

### 6. हम समस्थानिकों के बारे में क्यों पढ़ते हैं? (इनका उपयोग)
समस्थानिक केवल किताबों में नहीं हैं, ये हमारे बहुत काम आते हैं:

```

```text


---


```

```text


आशा है कि अब आपको 'समस्थानिक' की अवधारणा पूरी तरह स्पष्ट हो गई होगी! क्या आप इससे जुड़ा कोई सवाल पूछना चाहते हैं?
```
