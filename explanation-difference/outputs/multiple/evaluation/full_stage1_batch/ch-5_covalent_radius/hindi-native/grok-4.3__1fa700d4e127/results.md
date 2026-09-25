# Stage 1: Hindi / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "covalent radius, its definition, calculation examples, measurement methods, periodic trends, comparison with other radii, and homonuclear requirement",
  "topic_match": "on_topic",
  "reason": "The explanation directly and thoroughly teaches the concept of covalent radius in Hindi, including its definition, examples, measurement, periodic table trends, and comparison with other atomic radii.",
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
| u1 | CONCEPT | Definition and meaning of covalent radius | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Examples of calculating covalent radius (Cl2, H2, and O2) | {"context": "abstract_or_hypothetical", "treatment": "worked"} | contains_error |
| u3 | CONCEPT | Experimental measurement of covalent radius | {"depth": "statement"} | accurate |
| u4 | CONCEPT | Periodic trends of covalent radius | {"depth": "explanation"} | accurate |
| u5 | CONCEPT | Distinction between covalent radius and other types of atomic radii | {"depth": "explanation"} | accurate |
| u6 | CAVEAT | Requirement of homonuclear diatomic molecules for standard covalent radius | {"subtype": "qualification"} | accurate |

## u1: Definition and meaning of covalent radius

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
    "reason": "Correctly defines covalent radius as half the internuclear distance between two covalently bonded atoms.",
    "errors": []
  }
}
```

```text
### सहसंयोजक त्रिज्या क्या है?
जब दो परमाणु आपस में **सहसंयोजक बंध** (covalent bond) बनाते हैं, तो उनके केंद्र (नाभिक) के बीच की दूरी को बंध लंबाई कहते हैं। इस बंध लंबाई का **आधा** भाग ही उस परमाणु की **सहसंयोजक त्रिज्या** कहलाती है।

सरल शब्दों में:  
**सहसंयोजक त्रिज्या = सहसंयोजक बंध की लंबाई ÷ 2**

यह त्रिज्या हमें बताती है कि जब परमाणु दूसरे परमाणु के साथ इलेक्ट्रॉन साझा करके बंध बनाता है, तो उसका आकार कितना होता है।
```


## u2: Examples of calculating covalent radius (Cl2, H2, and O2)

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
    "verdict": "contains_error",
    "reason": "The calculation for oxygen takes the double bond length of O2 (121 pm) to find the standard covalent radius (60.5 pm). By definition, the standard covalent radius of an atom is defined for a single covalent bond (the single-bond covalent radius of oxygen is approximately 66–73 pm). Halving the O=O double bond length gives the double-bond covalent radius, not the general single-bond covalent radius.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "ऑक्सीजन (O₂) में O=O बंध लंबाई 121 pm है, इसलिए O की सहसंयोजक त्रिज्या = **60.5 pm**"
          }
        ],
        "description": "Standard covalent radius is defined as half the distance between nuclei joined by a single covalent bond. Using the O=O double bond length (121 pm) yields the double-bond covalent radius (60.5 pm), which is not the standard covalent radius of oxygen (typically ~66–73 pm from single bonds such as in H2O2).",
        "correction": "सहसंयोजक त्रिज्या सामान्यतः एकल बंध (single bond) के आधार पर परिभाषित होती है; O=O द्विबंध की आधी लंबाई (60.5 pm) द्विबंध त्रिज्या है, जबकि ऑक्सीजन की मानक एकल बंध सहसंयोजक त्रिज्या लगभग 66–73 pm होती है।",
        "severity": "minor"
      }
    ]
  }
}
```

```text
### उदाहरण से समझें
सबसे आसान उदाहरण **क्लोरीन** का लें:

- क्लोरीन गैस (Cl₂) में दो क्लोरीन परमाणु एक-दूसरे से सहसंयोजक बंध बनाते हैं।
- Cl–Cl बंध की लंबाई = **198 pm** (पिकोमीटर)
- इसलिए एक क्लोरीन परमाणु की सहसंयोजक त्रिज्या = 198 ÷ 2 = **99 pm**

इसी तरह:
- हाइड्रोजन (H₂) में H–H बंध लंबाई 74 pm है, इसलिए H की सहसंयोजक त्रिज्या = **37 pm**
- ऑक्सीजन (O₂) में O=O बंध लंबाई 121 pm है, इसलिए O की सहसंयोजक त्रिज्या = **60.5 pm**
```


## u3: Experimental measurement of covalent radius

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
    "reason": "Accurately mentions that X-ray diffraction and spectroscopy are standard experimental techniques used to determine internuclear distances.",
    "errors": []
  }
}
```

```text
### इसे कैसे मापा जाता है?
वैज्ञानिक X-ray diffraction या स्पेक्ट्रोस्कोपी जैसी तकनीकों से अणु में दो परमाणुओं के नाभिकों के बीच की सटीक दूरी माप लेते हैं और उसे आधा कर देते हैं।
```


## u4: Periodic trends of covalent radius

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
    "reason": "Correctly states and explains the periodic trends: decreasing across a period due to increasing effective nuclear charge, and increasing down a group due to the addition of electron shells.",
    "errors": []
  }
}
```

```text
1. **आवर्त सारणी में रुझान (Trend)**:
   - **आवर्त में बाएँ से दाएँ** जाने पर सहसंयोजक त्रिज्या **घटती** है (क्योंकि प्रभावी नाभिकीय आवेश बढ़ता है, इलेक्ट्रॉन बादल अंदर की ओर खिंचता है)।
   - **समूह में ऊपर से नीचे** जाने पर सहसंयोजक त्रिज्या **बढ़ती** है (क्योंकि नया कोश जुड़ता है)।
```


## u5: Distinction between covalent radius and other types of atomic radii

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
    "reason": "Accurately contrasts covalent radius with atomic radius, ionic radius, and van der Waals radius at an introductory level.",
    "errors": []
  }
}
```

```text
2. **यह अन्य त्रिज्याओं से अलग है**:
   - **परमाणु त्रिज्या** (Atomic radius): सामान्यतः सहसंयोजक त्रिज्या को ही परमाणु त्रिज्या माना जाता है जब परमाणु बंधित अवस्था में हो।
   - **आयनिक त्रिज्या**: धनायन या ऋणायन बनने पर आकार बदल जाता है।
   - **वैन डर वाल्स त्रिज्या**: जब परमाणु बंध नहीं बनाते, सिर्फ कमजोर आकर्षण से पास आते हैं।
```


## u6: Requirement of homonuclear diatomic molecules for standard covalent radius

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
    "reason": "Correctly qualifies that covalent radius is strictly defined from homonuclear covalent bonds, while heteronuclear bonds can only approximate it.",
    "errors": []
  }
}
```

```text
### याद रखने वाली बात
सहसंयोजक त्रिज्या हमेशा **दो समान परमाणुओं** (जैसे Cl–Cl, H–H) के बीच मापी जाती है। अगर दो अलग-अलग परमाणु हों (जैसे C–H), तो उससे भी अनुमान लगाया जा सकता है, लेकिन मूल परिभाषा समान परमाणुओं पर आधारित है।
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text
नमस्ते! आज हम **सहसंयोजक त्रिज्या** को बहुत आसान भाषा में समझेंगे। यह रसायन विज्ञान (Periodic Properties) का एक महत्वपूर्ण कॉन्सेप्ट है, जो परमाणुओं के आकार को मापने में मदद करता है।


```

```text


### महत्वपूर्ण बातें (High School स्तर पर)

```

```text


क्या आपको अब सहसंयोजक त्रिज्या का कॉन्सेप्ट साफ हो गया? अगर आप चाहें तो मैं आवर्त सारणी में इसके ट्रेंड को और विस्तार से उदाहरणों के साथ समझा सकता हूँ।
```
