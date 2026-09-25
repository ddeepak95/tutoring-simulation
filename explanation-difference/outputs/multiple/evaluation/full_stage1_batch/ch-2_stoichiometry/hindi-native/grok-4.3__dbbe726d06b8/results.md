# Stage 1: Hindi / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, balanced chemical equations, the mole concept, and quantitative reaction calculations",
  "topic_match": "on_topic",
  "reason": "The explanation defines stoichiometry and illustrates how to use balanced equations, mole ratios, and molar masses to calculate reactant and product quantities.",
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
| u1 | CONCEPT | Definition and purpose of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Role of balanced chemical equations in stoichiometry | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | The mole concept and molar mass | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Worked calculation of mass of water formed from 4 grams of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | EXAMPLE | Worked mass-to-mass calculation of CaO formed from CaCO3 decomposition | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | STUDY_SUPPORT | Key takeaways and guidelines for solving stoichiometry problems | {"subtype": "recap"} | accurate |
| u7 | STUDY_SUPPORT | Practice questions on stoichiometric calculations | {"subtype": "practice_question"} | accurate |

## u1: Definition and purpose of stoichiometry

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
    "reason": "Correctly defines stoichiometry as the calculation of relative quantities of reactants and products in a chemical reaction using balanced equations.",
    "errors": []
  }
}
```

```text
रससमीकरणमिति रसायन विज्ञान की वह विधि है, जिसमें हम **रासायनिक अभिक्रिया** में शामिल पदार्थों की मात्रा (द्रव्यमान, मोल या आयतन) की गणना करते हैं। 

सरल शब्दों में: जब दो या अधिक पदार्थ मिलकर नया पदार्थ बनाते हैं, तो हम जानना चाहते हैं कि **कितना अभिकारक** लगेगा और **कितना उत्पाद** बनेगा। यह सब **संतुलित रासायनिक समीकरण** की मदद से किया जाता है।
```


## u2: Role of balanced chemical equations in stoichiometry

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
    "reason": "Accurately relates equation balancing to the law of conservation of mass and explains the mole ratio derived from the balanced reaction.",
    "errors": []
  }
}
```

```text
रासायनिक समीकरण तभी सही गणना करने में मदद करता है, जब वह **संतुलित** हो। संतुलित समीकरण में दोनों तरफ परमाणुओं की संख्या समान होती है (द्रव्यमान संरक्षण का नियम)।

**उदाहरण:**
- असंतुलित: H₂ + O₂ → H₂O
- संतुलित: **2H₂ + O₂ → 2H₂O**

इस संतुलित समीकरण से हमें पता चलता है कि:
- 2 मोल हाइड्रोजन गैस + 1 मोल ऑक्सीजन गैस → 2 मोल पानी
```


## u3: The mole concept and molar mass

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
    "reason": "Correctly states Avogadro's number, defines molar mass, and provides the correct molar mass and particle count for water.",
    "errors": []
  }
}
```

```text
रससमीकरणमिति में सबसे महत्वपूर्ण चीज **मोल** है। 
- 1 मोल = 6.022 × 10²³ कण (परमाणु, अणु या आयन)
- 1 मोल किसी भी पदार्थ का द्रव्यमान उसके **मोलर द्रव्यमान** (आणविक द्रव्यमान) के बराबर होता है।

उदाहरण:
- H₂O का मोलर द्रव्यमान = 18 g/mol
- 1 मोल पानी = 18 ग्राम पानी = 6.022 × 10²³ अणु
```


## u4: Worked calculation of mass of water formed from 4 grams of hydrogen

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
    "reason": "The stoichiometric steps and calculations are fully accurate: 4 g H₂ corresponds to 2 moles of H₂, which produces 2 moles of H₂O (36 g).",
    "errors": []
  }
}
```

```text
**प्रश्न:** 4 ग्राम हाइड्रोजन गैस (H₂) पूरी तरह से ऑक्सीजन के साथ जलने पर कितने ग्राम पानी बनेगा?

**हल:**

1. **संतुलित समीकरण लिखें:**
   2H₂ + O₂ → 2H₂O

2. **मोल अनुपात ज्ञात करें:**
   2 मोल H₂ → 2 मोल H₂O
   यानी 1 मोल H₂ → 1 मोल H₂O

3. **H₂ का मोलर द्रव्यमान = 2 g/mol**
   अतः 4 ग्राम H₂ = 4 ÷ 2 = **2 मोल** H₂

4. **उत्पाद की गणना:**
   2 मोल H₂ से 2 मोल H₂O बनेगा
   2 मोल H₂O = 2 × 18 = **36 ग्राम** पानी

**उत्तर:** 36 ग्राम पानी बनेगा।
```


## u5: Worked mass-to-mass calculation of CaO formed from CaCO3 decomposition

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
    "reason": "The reaction stoichiometry and molar masses are correct, leading accurately to 5.6 g CaO from 10 g CaCO₃.",
    "errors": []
  }
}
```

```text
**प्रश्न:** 10 ग्राम कैल्शियम कार्बोनेट (CaCO₃) गर्म करने पर कितना कैल्शियम ऑक्साइड (CaO) बनेगा?

**समीकरण:** CaCO₃ → CaO + CO₂ (संतुलित)

- CaCO₃ का मोलर द्रव्यमान = 100 g/mol
- CaO का मोलर द्रव्यमान = 56 g/mol

**हल:**
- 100 g CaCO₃ → 56 g CaO
- 10 g CaCO₃ → (56 × 10) / 100 = **5.6 g** CaO
```


## u6: Key takeaways and guidelines for solving stoichiometry problems

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
    "reason": "Summarizes the essential procedural checklist and correctly mentions the limiting reagent principle.",
    "errors": []
  }
}
```

```text
1. हमेशा पहले समीकरण को **संतुलित** करें।
2. मोल अनुपात (stoichiometric ratio) का इस्तेमाल करें।
3. इकाइयाँ (gram, mole, litre) सही रखें।
4. अगर कोई अभिकारक कम मात्रा में हो (limiting reagent), तो वही उत्पाद की मात्रा तय करता है।
```


## u7: Practice questions on stoichiometric calculations

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
    "reason": "The practice problems provide standard, solvable stoichiometry tasks with sound physical premises.",
    "errors": []
  }
}
```

```text
1. 8 ग्राम O₂ से कितने ग्राम पानी बनेगा (H₂ + O₂ → H₂O)?
2. 5.6 लीटर CO₂ (STP पर) में कितने मोल CO₂ हैं?
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
नमस्ते! आज मैं आपको **रससमीकरणमिति** (Stoichiometry) को बहुत आसान भाषा में समझाता हूँ। यह हाई स्कूल के रसायन विज्ञान का एक महत्वपूर्ण और रोचक टॉपिक है।

### रससमीकरणमिति क्या है?


```

```text


### संतुलित रासायनिक समीकरण क्यों जरूरी है?


```

```text


### मोल (Mole) की अवधारणा


```

```text


### रससमीकरणमिति की गणना कैसे करें? (सरल उदाहरण)


```

```text


### एक और उदाहरण (द्रव्यमान से द्रव्यमान)


```

```text


### महत्वपूर्ण बातें याद रखें


```

```text


### अभ्यास के लिए प्रश्न


```

```text


अगर आपको कोई भी हिस्सा और विस्तार से समझना हो, या कोई गणना का उदाहरण चाहिए, तो बता दो! मैं और सरल उदाहरणों से समझा दूंगा।
```
