# Stage 1: Hindi / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, principles, calculation steps, and applications",
  "topic_match": "on_topic",
  "reason": "The text directly explains stoichiometry, its basis in the law of conservation of mass, steps to solve stoichiometric problems, illustrative and worked examples, and practical applications.",
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
| u1 | CONCEPT | Definition and scope of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Underlying principle: law of conservation of mass | {"depth": "explanation"} | accurate |
| u3 | EXAMPLE | Molar and mass interpretation of water formation reaction | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u4 | PROCEDURE | Four-step method for solving stoichiometry problems | {} | accurate |
| u5 | EXAMPLE | Worked problem calculating water produced from 4 grams of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | EXAMPLE | Application of stoichiometry in industry | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u7 | EXAMPLE | Application of stoichiometry in pharmaceutical manufacturing | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u8 | EXAMPLE | Application of stoichiometry in laboratory experiments | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u9 | STUDY_SUPPORT | Key tips and checklist for solving stoichiometry problems | {"subtype": "study_strategy"} | accurate |

## u1: Definition and scope of stoichiometry

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
    "reason": "The definition accurately states that stoichiometry deals with quantitative relationships between reactants and products in chemical reactions.",
    "errors": []
  }
}
```

```text
**रससमीकरणमिति** (Stoichiometry) रसायन विज्ञान की वह शाखा है जिसमें हम **रासायनिक समीकरणों में अभिकारकों (reactants) और उत्पादों (products) की मात्रा** का गणितीय अध्ययन करते हैं।

सरल शब्दों में - यह हमें बताता है कि:
- कितने अणु/मोल अभिकारक चाहिए
- कितने उत्पाद बनेंगे
- क्या कुछ पदार्थ अधिक या कम बचेगा
```


## u2: Underlying principle: law of conservation of mass

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
    "reason": "Correctly states that stoichiometry is based on the law of conservation of mass and provides a standard phrasing of the law.",
    "errors": []
  }
}
```

```text
रससमीकरणमिति **द्रव्यमान संरक्षण के नियम** पर आधारित है:
> "पदार्थ न तो बनाया जा सकता है और न ही नष्ट किया जा सकता है, केवल रूप बदलता है"
```


## u3: Molar and mass interpretation of water formation reaction

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
    "reason": "The stoichiometric coefficients, mole relationships, and corresponding masses (4 g H2 + 32 g O2 = 36 g H2O) are correct.",
    "errors": []
  }
}
```

```text
**हाइड्रोजन और ऑक्सीजन से पानी बनने की अभिक्रिया:**

$$2H_2 + O_2 \rightarrow 2H_2O$$

इस समीकरण से पता चलता है:
- **2 मोल** हाइड्रोजन + **1 मोल** ऑक्सीजन → **2 मोल** पानी
- यानी **4 ग्राम** H₂ + **32 ग्राम** O₂ → **36 ग्राम** H₂O
```


## u4: Four-step method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The outlined steps provide a standard and correct general algorithm for solving stoichiometric calculations.",
    "errors": []
  }
}
```

```text
1. **संतुलित समीकरण लिखें** - सबसे पहले समीकरण को संतुलित करें
2. **मोल में बदलें** - दिए गए द्रव्यमान को मोल में बदलें (मोल = द्रव्यमान/मोलर द्रव्यमान)
3. **मोल अनुपात लगाएं** - संतुलित समीकरण के गुणांकों का उपयोग करें
4. **उत्तर निकालें** - आवश्यक मात्रा (ग्राम, मोल या आयतन) में बदलें
```


## u5: Worked problem calculating water produced from 4 grams of hydrogen

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
    "reason": "All calculations from molar mass to mole conversions and final mass calculation are factually and mathematically correct.",
    "errors": []
  }
}
```

```text
**प्रश्न:** 4 ग्राम हाइड्रोजन से कितना पानी बनेगा?

**हल:**
- H₂ का मोलर द्रव्यमान = 2 g/mol
- मोल H₂ = 4/2 = 2 मोल
- समीकरण के अनुसार: 2 मोल H₂ → 2 मोल H₂O
- अतः 2 मोल पानी बनेगा = 2 × 18 = **36 ग्राम पानी**
```


## u6: Application of stoichiometry in industry

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
    "reason": "Stoichiometry is accurately identified as essential in industrial manufacturing for optimizing raw material usage.",
    "errors": []
  }
}
```

```text
- **उद्योगों में** - सही मात्रा में कच्चा माल उपयोग करने के लिए
```


## u7: Application of stoichiometry in pharmaceutical manufacturing

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
    "reason": "Accurately notes the necessity of stoichiometric precision in pharmaceutical formulation and synthesis.",
    "errors": []
  }
}
```

```text
- **दवा निर्माण** में सटीक मात्रा जानने के लिए
```


## u8: Application of stoichiometry in laboratory experiments

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
    "reason": "Stoichiometric calculations are fundamental for laboratory experimental design and reagent measurements.",
    "errors": []
  }
}
```

```text
- **प्रयोगशाला** में रासायनिक प्रयोग करने के लिए
```


## u9: Key tips and checklist for solving stoichiometry problems

```json
{
  "attributes": {
    "subtype": "study_strategy"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The checklist provides standard, accurate advice for preventing common mistakes when working through stoichiometry problems.",
    "errors": []
  }
}
```

```text
✅ हमेशा समीकरण संतुलित करें
✅ मोल अवधारणा का सही प्रयोग करें
✅ इकाइयों (units) का ध्यान रखें
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u6",
      "u7",
      "u8"
    ],
    "issue": "The list of three application domains (industry, pharmaceuticals, laboratories) under 'क्यों जरूरी है यह विषय?' could either be treated as a single CONCEPT unit explaining practical relevance or split into three independent illustrative EXAMPLE units.",
    "proposed_resolution": "Split into three illustrative EXAMPLE units following the guideline rule that lists naming independent real-world applications should be treated as separate EXAMPLE units."
  }
]
```

## Unassigned text for coverage review

```text
# रससमीकरणमिति (Stoichiometry) - एक सरल परिचय

नमस्ते! आज हम रसायन विज्ञान के एक महत्वपूर्ण विषय **रससमीकरणमिति** को समझेंगे।

## रससमीकरणमिति क्या है?


```

```text


## मूल आधार


```

```text


## एक उदाहरण से समझें


```

```text


## रससमीकरणमिति के मुख्य चरण


```

```text


## व्यावहारिक उदाहरण


```

```text


## क्यों जरूरी है यह विषय?


```

```text


## याद रखने योग्य बातें


```

```text


---
क्या आप चाहेंगे कि मैं इस पर कुछ अभ्यास प्रश्न भी दूं ताकि आप और अच्छे से समझ सकें? 😊
```
