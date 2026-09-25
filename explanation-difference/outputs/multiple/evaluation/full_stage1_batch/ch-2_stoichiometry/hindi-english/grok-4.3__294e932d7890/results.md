# Stage 1: Hindi / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, mole ratios, balanced equations, and worked mass-mole calculations",
  "topic_match": "on_topic",
  "reason": "The explanation introduces stoichiometry, explains its basis in the law of conservation of mass, introduces mole ratios from balanced equations, and walks through worked stoichiometric calculations.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition, etymology, and conservation of mass basis of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Water formation reaction, mole ratio, and mass stoichiometry calculation | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Overview of common stoichiometric calculations and topics | {"depth": "statement"} | accurate |
| u4 | EXAMPLE | Worked mass calculation for the formation of sodium chloride | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u5 | STUDY_SUPPORT | Key tips and rules of thumb for stoichiometry problem solving | {"subtype": "study_strategy"} | accurate |

## u1: Definition, etymology, and conservation of mass basis of stoichiometry

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
    "reason": "The definition, Greek etymology, and explanation of the Law of Conservation of Mass as the foundation of stoichiometry are factually accurate.",
    "errors": []
  }
}
```

```text
स्टोइकियोमेट्री रसायन विज्ञान की वह शाखा है जिसमें हम **रासायनिक अभिक्रियाओं** में अभिकारकों (reactants) और उत्पादों (products) की मात्राओं की गणना करते हैं। 

यह ग्रीक शब्दों से बना है — “स्टोइकियोन” (तत्व) + “मेट्रॉन” (माप) = तत्वों का माप।

मुख्य आधार: **द्रव्यमान संरक्षण का नियम** (Law of Conservation of Mass) — किसी भी रासायनिक अभिक्रिया में कुल द्रव्यमान न तो कम होता है और न ही बढ़ता है।
```


## u2: Water formation reaction, mole ratio, and mass stoichiometry calculation

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
    "reason": "The balanced chemical equation, mole ratio, molar masses of water and hydrogen, and the calculated mass of hydrogen required are all factually correct.",
    "errors": []
  }
}
```

```text
सबसे आसान उदाहरण लेते हैं — हाइड्रोजन गैस और ऑक्सीजन गैस से पानी बनना:

**असंतुलित समीकरण:**  
H₂ + O₂ → H₂O

**संतुलित समीकरण:**  
**2H₂ + O₂ → 2H₂O**

इसका मतलब क्या है?  
- 2 अणु हाइड्रोजन + 1 अणु ऑक्सीजन → 2 अणु पानी  
- या मोल में: **2 मोल H₂ + 1 मोल O₂ → 2 मोल H₂O**

यहाँ **मोल अनुपात** (mole ratio) 2 : 1 : 2 है।

### मोल क्या है?
मोल एक इकाई है। 1 मोल = 6.022 × 10²³ कण (अणु, परमाणु आदि)।  
इसे अवोगाद्रो संख्या कहते हैं।

उदाहरण:
- H₂O का मोलर द्रव्यमान = 18 g/mol  
- अगर 36 ग्राम पानी बनाना है, तो कितने मोल?  
  → 36 ÷ 18 = **2 मोल** पानी

अब सवाल: 2 मोल पानी बनाने के लिए कितनी हाइड्रोजन गैस चाहिए?  
समीकरण से: 2 मोल H₂O बनाने के लिए 2 मोल H₂ चाहिए।  
H₂ का मोलर द्रव्यमान = 2 g/mol → 2 मोल = **4 ग्राम** H₂
```


## u3: Overview of common stoichiometric calculations and topics

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
    "reason": "The listed calculation types and concepts (equation balancing, mole ratios, conversions, limiting reagents, percentage yield) correctly reflect standard high school stoichiometry.",
    "errors": []
  }
}
```

```text
1. **समीकरण को संतुलित करना** (सबसे पहला और जरूरी कदम)
2. **मोल अनुपात** से गणना करना
3. **द्रव्यमान से मोल** और **मोल से द्रव्यमान** में बदलना
4. **सीमित अभिकारक** (Limiting Reagent) — कौन सा पदार्थ पहले खत्म हो जाएगा
5. **प्रतिक्रिया की उपज** (Percentage yield)
```


## u4: Worked mass calculation for the formation of sodium chloride

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
    "reason": "The balanced equation, conversion of 46 g Na to 2 moles, 1:1 mole ratio of Na to NaCl, molar mass calculation of NaCl (58.5 g/mol), and final yield of 117 g NaCl are all completely accurate.",
    "errors": []
  }
}
```

```text
प्रतिक्रिया:  
2Na + Cl₂ → 2NaCl

सवाल: 46 ग्राम सोडियम से कितना NaCl बनेगा?  
- Na का परमाणु द्रव्यमान = 23 → 46 g = 2 मोल Na  
- 2 मोल Na से 2 मोल NaCl बनेगा  
- NaCl का मोलर द्रव्यमान = 58.5 g/mol  
- 2 मोल NaCl = 117 ग्राम
```


## u5: Key tips and rules of thumb for stoichiometry problem solving

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
    "reason": "The advice to always balance the equation first, work through mole ratios, and use appropriate conversion formulas is standard and correct problem-solving guidance.",
    "errors": []
  }
}
```

```text
- हमेशा पहले समीकरण को संतुलित करो।
- मोल अनुपात से ही सारी गणनाएँ होती हैं।
- इकाइयाँ (gram, mole, litre) बदलते समय सही सूत्र इस्तेमाल करो।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "Whether the definition of the mole and Avogadro's number ('### मोल क्या है?...') should be split out as an independent CONCEPT unit or kept within the surrounding water formation worked example.",
    "proposed_resolution": "Kept together within u2 because it functions as an embedded supporting definition directly motivating the molar masses and quantities used in the ongoing water calculation, following the guideline that a worked example unit can contain supporting definitions needed for the solution."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Whether the list of stoichiometric calculations ('### स्टोइकियोमेट्री में क्या-क्या गणनाएँ की जाती हैं?') should be classified as PROCEDURE or CONCEPT.",
    "proposed_resolution": "Classified as CONCEPT with depth 'statement' because it lists the categories and topics of calculations covered under stoichiometry rather than providing a reusable step-by-step procedural algorithm for solving a problem."
  },
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "Whether 'याद रखने वाली बातें' should have subtype 'study_strategy' or 'recap'.",
    "proposed_resolution": "Assigned 'study_strategy' because the items are presented as imperative rules of thumb and advice on how to approach problem solving ('हमेशा पहले समीकरण को संतुलित करो', 'सही सूत्र इस्तेमाल करो') rather than a pure factual recap."
  }
]
```

## Unassigned text for coverage review

```text
नमस्ते! आज हम स्टोइकियोमेट्री (Stoichiometry) को आसान भाषा में समझेंगे। मैं आपको हाई स्कूल के स्तर पर पढ़ा रहा हूँ, जैसे कक्षा 11 की केमिस्ट्री में पढ़ाया जाता है।

### स्टोइकियोमेट्री क्या है?

```

```text


### उदाहरण से समझें

```

```text


### स्टोइकियोमेट्री में क्या-क्या गणनाएँ की जाती हैं?

```

```text


### एक और सरल उदाहरण

```

```text


### याद रखने वाली बातें

```

```text


अगर तुम्हें कोई खास उदाहरण या सीमित अभिकारक (limiting reagent) वाला सवाल समझना हो, तो बताओ — मैं और विस्तार से उदाहरण देकर समझा दूंगा।

कुछ समझ आया? या कोई डाउट है?
```
