# Stage 1: Hindi / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, including definition, balanced equations, stoichiometric coefficients, mass conservation calculations, problem-solving steps, and real-world applications",
  "topic_match": "on_topic",
  "reason": "The response clearly and thoroughly explains stoichiometry, explaining the law of conservation of mass, balanced reactions, stoichiometric coefficients as mole ratios, mass-mass calculations, steps for solving problems, and practical applications.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | ANALOGY | Sandwich recipe analogy for stoichiometry | {} | accurate |
| u2 | CONCEPT | Definition and etymology of stoichiometry | {"depth": "statement"} | accurate |
| u3 | CONCEPT | Requirement of balanced chemical equations and stoichiometric coefficients based on mass conservation | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Demonstration of mass conservation in water synthesis using molar masses | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | PROCEDURE | Three-step procedure for solving stoichiometry problems | {} | accurate |
| u6 | EXAMPLE | Application of stoichiometry in pharmaceutical manufacturing | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of stoichiometry in rocket propulsion | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | EXAMPLE | Application of stoichiometry in industrial manufacturing to minimize waste | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | STUDY_SUPPORT | Summary recap of stoichiometry | {"subtype": "recap"} | accurate |

## u1: Sandwich recipe analogy for stoichiometry

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "मान लीजिए आपको एक **सैंडविच** बनाना है।"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The sandwich recipe accurately maps fixed ingredient ratios to stoichiometric ratios in chemical reactions.",
    "errors": []
  }
}
```

```text
मान लीजिए आपको एक **सैंडविच** बनाना है। 
आपकी रेसिपी है:
**2 ब्रेड + 1 चीज़ स्लाइस = 1 सैंडविच**

अब अगर मैं आपसे पूछूँ:
* 10 ब्रेड से कितने सैंडविच बनेंगे? आप तुरंत कहेंगे – **5 सैंडविच** (और इसके लिए 5 चीज़ स्लाइस चाहिए होंगे)।

बस! यही **रससमीकरणमिति (Stoichiometry)** है।
```


## u2: Definition and etymology of stoichiometry

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
    "reason": "The definition and Greek etymology (stoicheion and metron) are factually accurate.",
    "errors": []
  }
}
```

```text
* **परिभाषा:** रसायन विज्ञान में, किसी रासायनिक अभिक्रिया (Chemical Reaction) में भाग लेने वाले पदार्थों (अभिकारक/Reactants) और बनने वाले पदार्थों (उत्पाद/Products) की मात्रा के हिसाब-किताब को ही **रससमीकरणमिति** कहते हैं। इसे आप **"केमिस्ट्री की रेसिपी"** कह सकते हैं।

*(यह शब्द ग्रीक भाषा के दो शब्दों से बना है: 'Stoicheion' यानी तत्व और 'Metron' यानी मापना।)*
```


## u3: Requirement of balanced chemical equations and stoichiometric coefficients based on mass conservation

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "जैसे 1 दर्जन = 12 केले"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The law of conservation of mass, balanced equation principle, stoichiometric coefficients, and mole definition are correctly explained.",
    "errors": []
  }
}
```

```text
जैसे रसोई में आप कोई चीज़ गायब नहीं कर सकते, वैसे ही प्रकृति में **द्रव्यमान संरक्षण का नियम (Law of Conservation of Mass)** काम करता है—*द्रव्यमान को न तो बनाया जा सकता है, न ही नष्ट किया जा सकता है।*

इसलिए, स्टोइकीओमेट्री का पहला नियम है: **समीकरण हमेशा संतुलित (Balanced) होना चाहिए।**

**उदाहरण देखिए:**
पानी बनने की अभिक्रिया:
$$2H_2 + O_2 \rightarrow 2H_2O$$

यहाँ आगे लिखे हुए नंबर ($2, 1, 2$) को **रससमीकरणमितीय गुणांक (Stoichiometric Coefficients)** कहते हैं। यह हमें 'अनुपात' (Ratio) बताते हैं:
* हाइड्रोजन के **2 अणु** + ऑक्सीजन का **1 अणु** मिलकर पानी के **2 अणु** बनाते हैं।
* या बड़े स्तर पर कहें तो: हाइड्रोजन के **2 मोल** + ऑक्सीजन का **1 मोल** मिलकर पानी के **2 मोल** बनाते हैं।

*(नोट: 'मोल' को आप केमिस्ट्री का 'दर्जन' समझ सकते हैं, जैसे 1 दर्जन = 12 केले, वैसे ही 1 मोल = $6.022 \times 10^{23}$ कण।)*
```


## u4: Demonstration of mass conservation in water synthesis using molar masses

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
    "reason": "The molar mass calculations and verification of mass conservation for the water reaction are mathematically and chemically accurate.",
    "errors": []
  }
}
```

```text
आइए उसी पानी वाले उदाहरण को ग्राम में देखें:
* $H_2$ (हाइड्रोजन) का मोलर द्रव्यमान = 2 ग्राम। तो $2H_2$ = $2 \times 2 = 4$ ग्राम।
* $O_2$ (ऑक्सीजन) का मोलर द्रव्यमान = 32 ग्राम।
* $H_2O$ (पानी) का मोलर द्रव्यमान = 18 ग्राम। तो $2H_2O$ = $2 \times 18 = 36$ ग्राम।

समीकरण के अनुसार:
**4 ग्राम हाइड्रोजन + 32 ग्राम ऑक्सीजन = 36 ग्राम पानी**

जाँचिए: 
बाएँ हाथ की तरफ कुल भार = $4 + 32 = 36$ ग्राम।
दाएँ हाथ की तरफ कुल भार = $36$ ग्राम।
हिसाब बिल्कुल पक्का है!
```


## u5: Three-step procedure for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The three-step general method correctly captures the standard algorithm for stoichiometric calculations.",
    "errors": []
  }
}
```

```text
जब भी परीक्षा में रससमीकरणमिति का कोई सवाल आए, तो बस ये तीन कदम (Steps) याद रखना:

1. **कदम 1 (समीकरण संतुलित करें):** सबसे पहले रासायनिक समीकरण को बैलेंस करें।
2. **कदम 2 (मोल में बदलें):** जो भी वज़न (ग्राम) दिया गया है, उसे **मोल** में बदल लें। ($\text{मोल} = \frac{\text{दिया गया भार}}{\text{मोलर द्रव्यमान}}$)
3. **कदम 3 (अनुपात से उत्तर निकालें):** संतुलित समीकरण के अनुपात को देखकर पता लगाएँ कि कितना उत्पाद बनेगा, और फिर ज़रूरत पड़ने पर उसे वापस ग्राम में बदल लें।
```


## u6: Application of stoichiometry in pharmaceutical manufacturing

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
    "reason": "Accurately illustrates the critical importance of stoichiometric proportions in pharmaceutical synthesis.",
    "errors": []
  }
}
```

```text
* **दवाइयां बनाने में:** अगर पैरासिटामोल बनाते समय केमिकल का अनुपात थोड़ा भी गलत हो गया, तो दवा ज़हर बन सकती है।
```


## u7: Application of stoichiometry in rocket propulsion

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
    "reason": "Accurately illustrates the calculation of fuel-to-oxidizer ratios in rocket propulsion.",
    "errors": []
  }
}
```

```text
* **रॉकेट साइंस में:** रॉकेट में कितना ईंधन और कितनी ऑक्सीजन भरनी है ताकि वह अंतरिक्ष तक पहुँच सके, यह गणना इसी से होती है।
```


## u8: Application of stoichiometry in industrial manufacturing to minimize waste

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
    "reason": "Accurately illustrates the role of stoichiometric optimization in minimizing reagent waste in industrial chemistry.",
    "errors": []
  }
}
```

```text
* **फ़ैक्टरी में:** कोई भी कंपनी कच्चा माल बर्बाद नहीं करना चाहती, इसलिए वे सटीक हिसाब लगाते हैं।
```


## u9: Summary recap of stoichiometry

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
    "reason": "The recap accurately synthesizes the main definition and purpose of stoichiometry.",
    "errors": []
  }
}
```

```text
रससमीकरणमिति कुछ और नहीं, बस **रसायन विज्ञान का गणित** है, जो हमें बताता है कि कितना कच्चा माल डालने पर कितना उत्पाद मिलेगा।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1",
      "u2"
    ],
    "issue": "Section 1 presents both a sandwich recipe analogy and the formal definition of stoichiometry. These could either be treated as an ANALOGY followed by a CONCEPT, or combined into a single CONCEPT unit where the sandwich serves as an introductory analogy.",
    "proposed_resolution": "Separated into u1 (ANALOGY) and u2 (CONCEPT) because the sandwich recipe is developed as an explicit cross-domain analogy with its own quantitative mapping before the formal definition and etymology are introduced."
  },
  {
    "unit_ids": [
      "u6",
      "u7",
      "u8"
    ],
    "issue": "The three bullet points in Section 5 appear under a single heading detailing real-world applications (pharmaceuticals, rockets, industrial factories). They could be merged into one multi-application EXAMPLE unit or split.",
    "proposed_resolution": "Separated into individual EXAMPLE units in accordance with the guideline that lists naming independent applications represent separate EXAMPLE units."
  }
]
```

## Unassigned text for coverage review

```text
नमस्ते प्यारे छात्र! रसायन विज्ञान की इस खूबसूरत कक्षा में आपका स्वागत है। 

मुझे पता है कि **"रससमीकरणमिति" (Stoichiometry - स्टोइकीओमेट्री)** नाम सुनने में थोड़ा कठिन और डरावना लगता है, लेकिन यकीन मानिए, यह उतना ही आसान है जितना कि रसोई में चाय या मैगी बनाना! 

आइए, इसे बिल्कुल आसान भाषा में समझते हैं।

---

### 1. रससमीकरणमिति आखिर है क्या? (एक आसान उदाहरण)


```

```text


---

### 2. इसका सबसे बड़ा नियम: 'संतुलित समीकरण' (Balanced Equation)


```

```text


---

### 3. यह ग्राम (द्रव्यमान) में कैसे काम करता है?


```

```text


---

### 4. परीक्षा में प्रश्न कैसे हल करें? (3 आसान कदम)


```

```text


---

### 5. हम इसे क्यों पढ़ते हैं? (दैनिक जीवन में उपयोग)


```

```text


### सारांश (Summary):

```

```text


क्या आपको यह समझ आया, या हम इस पर एक छोटा सा न्यूमेरिकल (सवाल) हल करके देखें?
```
