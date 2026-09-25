# Stage 1: Hindi / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, molar mass, mole ratio, procedure, worked examples, and limiting reactant in Hindi",
  "topic_match": "on_topic",
  "reason": "The explanation defines stoichiometry, explains the role of balanced chemical equations, the mole concept, molar mass, step-by-step stoichiometric problem-solving procedure, limiting reactants, and provides fully worked calculation examples.",
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
| u1 | CONCEPT | Definition and core concept of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Role of balanced equations, mole ratios, and conservation of mass | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Definition of the mole and Avogadro's number | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Molar mass definition and calculation | {"depth": "explanation"} | accurate |
| u5 | PROCEDURE | General method for solving stoichiometry problems | {} | accurate |
| u6 | EXAMPLE | Worked example calculating water produced from 4 g hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | CONCEPT | Concept and determination of the limiting reactant | {"depth": "explanation"} | accurate |
| u8 | CONCEPT | Formulas for moles, mass, and number of particles | {"depth": "statement"} | accurate |
| u9 | EXAMPLE | Worked example calculating carbon dioxide produced from 100 g calcium carbonate | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u10 | STUDY_SUPPORT | Summary recap of key rules to remember for stoichiometry | {"subtype": "recap"} | accurate |

## u1: Definition and core concept of stoichiometry

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
    "reason": "Correctly defines stoichiometry as the calculation of relative quantities of reactants and products based on balanced chemical equations.",
    "errors": []
  }
}
```

```text
**रासायनिक समीकरणमिति** रसायन विज्ञान की वह शाखा है जिसमें हम किसी रासायनिक अभिक्रिया में पदार्थों की **मात्रा** का हिसाब लगाते हैं।  
सरल शब्दों में:

> यदि हमें पता हो कि कितनी मात्रा में एक पदार्थ अभिक्रिया कर रहा है, तो हम पता लगा सकते हैं कि दूसरे पदार्थ की कितनी मात्रा चाहिए या कितनी बनेगी।

यह गणना हमेशा **संतुलित रासायनिक समीकरण** पर आधारित होती है।
```


## u2: Role of balanced equations, mole ratios, and conservation of mass

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
    "reason": "Accurately connects coefficients in a balanced equation to molecular and molar ratios, and justifies balancing using the law of conservation of mass.",
    "errors": []
  }
}
```

```text
उदाहरण:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

इसका अर्थ है:

- 2 अणु (या 2 मोल) हाइड्रोजन
- 1 अणु (या 1 मोल) ऑक्सीजन से
- 2 अणु (या 2 मोल) पानी बनता है।

यहाँ गुणांक \(2:1:2\) पदार्थों का **मोल अनुपात (mole ratio)** बताते हैं।

ध्यान रखें: अभिक्रिया में परमाणु न तो बनते हैं, न नष्ट होते हैं। इसलिए समीकरण का संतुलित होना आवश्यक है।
```


## u3: Definition of the mole and Avogadro's number

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
    "reason": "Correctly defines the mole as a counting unit in chemistry and states Avogadro's number with appropriate examples.",
    "errors": []
  }
}
```

```text
रसायन विज्ञान में बहुत छोटे कणों—परमाणुओं और अणुओं—की गिनती के लिए **मोल** का उपयोग किया जाता है।

\[
1 \text{ मोल} = 6.022 \times 10^{23} \text{ कण}
\]

इसे एवोगैड्रो संख्या कहते हैं।

उदाहरण:

- 1 मोल \(H_2O\) = \(6.022 \times 10^{23}\) पानी के अणु
- 1 मोल कार्बन = \(6.022 \times 10^{23}\) कार्बन परमाणु
```


## u4: Molar mass definition and calculation

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
    "reason": "Accurately defines molar mass, specifies units (g/mol), and correctly calculates the molar mass of H2O and CO2 using atomic masses.",
    "errors": []
  }
}
```

```text
किसी पदार्थ के **1 मोल का द्रव्यमान** उसका मोलर द्रव्यमान कहलाता है। इसकी इकाई **g/mol** होती है।

उदाहरण:

### पानी \((H_2O)\)

- H का परमाणु द्रव्यमान = 1
- O का परमाणु द्रव्यमान = 16

\[
H_2O = 2(1) + 16 = 18 \text{ g/mol}
\]

अर्थात:

\[
1 \text{ मोल पानी} = 18 \text{ ग्राम}
\]

### कार्बन डाइऑक्साइड \((CO_2)\)

\[
CO_2 = 12 + 2(16) = 44 \text{ g/mol}
\]

अर्थात 1 मोल \(CO_2\) का द्रव्यमान 44 ग्राम है।
```


## u5: General method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Presents the standard general multi-step algorithm for mass-to-mass stoichiometric calculations correctly.",
    "errors": []
  }
}
```

```text
अधिकांश प्रश्नों में यह क्रम अपनाएँ:

1. **रासायनिक समीकरण लिखें।**
2. **समीकरण को संतुलित करें।**
3. दिए गए द्रव्यमान को **मोल** में बदलें।
4. संतुलित समीकरण से **मोल अनुपात** लगाएँ।
5. आवश्यक हो तो मोल को फिर **ग्राम**, **कणों**, या **गैस के आयतन** में बदलें।

इसे संक्षेप में ऐसे याद रख सकते हैं:

\[
\text{ग्राम} \rightarrow \text{मोल} \rightarrow \text{मोल अनुपात} \rightarrow \text{ग्राम}
\]
```


## u6: Worked example calculating water produced from 4 g hydrogen

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
    "reason": "All calculations (moles of H2 = 2, mole ratio 2:2, mass of H2O = 36 g) are factually and mathematically correct.",
    "errors": []
  }
}
```

```text
समीकरण:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

प्रश्न: यदि 4 ग्राम हाइड्रोजन पूरी तरह अभिक्रिया करे, तो कितना पानी बनेगा?

### चरण 1: हाइड्रोजन के मोल ज्ञात करें

\(H_2\) का मोलर द्रव्यमान:

\[
H_2 = 2 \text{ g/mol}
\]

\[
\text{मोल } H_2 = \frac{4}{2} = 2 \text{ mol}
\]

### चरण 2: मोल अनुपात देखें

समीकरण में:

\[
2H_2 \rightarrow 2H_2O
\]

अर्थात:

\[
2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O
\]

इसलिए 2 मोल \(H_2\) से 2 मोल \(H_2O\) बनेंगे।

### चरण 3: पानी के मोल को ग्राम में बदलें

\[
1 \text{ mol } H_2O = 18 \text{ g}
\]

\[
2 \text{ mol } H_2O = 2 \times 18 = 36 \text{ g}
\]

**उत्तर: 4 ग्राम हाइड्रोजन से 36 ग्राम पानी बनेगा**, यदि ऑक्सीजन पर्याप्त मात्रा में उपलब्ध हो।
```


## u7: Concept and determination of the limiting reactant

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
    "reason": "Correctly defines the limiting reactant and explains how to determine it using mole ratios for the reaction of 2 mol H2 with 2 mol O2.",
    "errors": []
  }
}
```

```text
कई बार अभिक्रिया में एक पदार्थ कम पड़ जाता है। जो पदार्थ सबसे पहले समाप्त हो जाता है, उसे **सीमित अभिकारक** कहते हैं।

उदाहरण:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

मान लीजिए आपके पास:

- 2 मोल \(H_2\)
- 2 मोल \(O_2\)

समीकरण के अनुसार 2 मोल \(H_2\) को केवल 1 मोल \(O_2\) चाहिए।  
इसलिए \(H_2\) पूरा खर्च हो जाएगा और 1 मोल \(O_2\) बच जाएगा।

यहाँ \(H_2\) **सीमित अभिकारक** है, क्योंकि वही पानी बनने की अधिकतम मात्रा तय करेगा।
```


## u8: Formulas for moles, mass, and number of particles

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
    "reason": "Formulas relating moles, mass, molar mass, and particle count via Avogadro's constant are standard and correct.",
    "errors": []
  }
}
```

```text
### मोल निकालने का सूत्र

\[
\text{मोल} = \frac{\text{दिया गया द्रव्यमान (g)}}{\text{मोलर द्रव्यमान (g/mol)}}
\]

### द्रव्यमान निकालने का सूत्र

\[
\text{द्रव्यमान} = \text{मोल} \times \text{मोलर द्रव्यमान}
\]

### कणों की संख्या

\[
\text{कणों की संख्या} = \text{मोल} \times 6.022 \times 10^{23}
\]
```


## u9: Worked example calculating carbon dioxide produced from 100 g calcium carbonate

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
    "reason": "All calculations for the thermal decomposition of 100 g CaCO3 producing 44 g CO2 are mathematically and chemically accurate.",
    "errors": []
  }
}
```

```text
\[
CaCO_3 \rightarrow CaO + CO_2
\]

प्रश्न: 100 ग्राम कैल्शियम कार्बोनेट \((CaCO_3)\) से कितना \(CO_2\) बनेगा?

मोलर द्रव्यमान:

\[
CaCO_3 = 40 + 12 + 3(16) = 100 \text{ g/mol}
\]

अतः 100 ग्राम \(CaCO_3\) = 1 मोल \(CaCO_3\)

समीकरण के अनुसार:

\[
1 \text{ mol } CaCO_3 \rightarrow 1 \text{ mol } CO_2
\]

\(CO_2\) का मोलर द्रव्यमान = 44 g/mol

इसलिए:

\[
1 \text{ mol } CO_2 = 44 \text{ g}
\]

**उत्तर: 100 ग्राम \(CaCO_3\) से 44 ग्राम \(CO_2\) बनेगा।**
```


## u10: Summary recap of key rules to remember for stoichiometry

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
    "reason": "The review bullet points accurately summarize key conceptual cautions and rules for stoichiometric calculations.",
    "errors": []
  }
}
```

```text
- सबसे पहले समीकरण को **संतुलित** करें।
- समीकरण के गुणांक द्रव्यमान नहीं, बल्कि **मोल अनुपात** बताते हैं।
- ग्राम से सीधे तुलना नहीं करें; पहले उन्हें **मोल** में बदलें।
- सीमित अभिकारक ही उत्पाद की वास्तविक मात्रा निर्धारित करता है।
- इकाइयों—ग्राम, मोल, g/mol—का ध्यान रखें।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u8"
    ],
    "issue": "Section 7 ('कुछ महत्वपूर्ण सूत्र') presents formulas for mole, mass, and particle count. This could be viewed as a STUDY_SUPPORT (recap/formula sheet) or a CONCEPT unit stating core formulas.",
    "proposed_resolution": "Classified as CONCEPT with depth 'statement' because it formally defines the mathematical expressions for calculating moles, mass, and particles, rather than merely repeating an earlier list."
  }
]
```

## Unassigned text for coverage review

```text
## रासायनिक समीकरणमिति (Stoichiometry) क्या है?


```

```text


---

## 1. संतुलित रासायनिक समीकरण क्यों जरूरी है?


```

```text


---

## 2. मोल (Mole) क्या होता है?


```

```text


---

## 3. मोलर द्रव्यमान (Molar Mass)


```

```text


---

## 4. समीकरणमिति हल करने की मुख्य विधि


```

```text


---

## 5. उदाहरण: पानी बनने की मात्रा


```

```text


---

## 6. सीमित अभिकारक (Limiting Reactant)


```

```text


---

## 7. कुछ महत्वपूर्ण सूत्र


```

```text


---

## 8. एक और छोटा उदाहरण


```

```text


---

## याद रखने योग्य बातें


```

```text


रासायनिक समीकरणमिति वास्तव में “रसायनों की मात्रा का गणित” है। अभ्यास के साथ यह बहुत आसान हो जाती है।
```
