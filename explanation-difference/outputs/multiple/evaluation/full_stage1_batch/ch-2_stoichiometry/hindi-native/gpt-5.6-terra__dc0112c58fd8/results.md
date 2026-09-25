# Stage 1: Hindi / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry concepts, mole calculations, and worked chemical equation examples",
  "topic_match": "on_topic",
  "reason": "The text directly explains stoichiometry (रासायनिक समीकरणमिति) in Hindi, covering balanced chemical equations, mole ratios, molar mass, step-by-step calculation methods, limiting reactants, and worked numerical examples.",
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
| u1 | CONCEPT | Definition of stoichiometry and its dependence on balanced equations | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Necessity of balanced equations, conservation of mass, and mole ratios | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Definition of the mole and Avogadro's number | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Definition and calculation of molar mass | {"depth": "explanation"} | accurate |
| u5 | PROCEDURE | General step-by-step method for solving stoichiometry problems | {} | accurate |
| u6 | EXAMPLE | Worked problem calculating water produced from given mass of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | CONCEPT | Concept and determination of limiting reactant | {"depth": "explanation"} | accurate |
| u8 | STUDY_SUPPORT | Summary reference of essential formulas | {"subtype": "recap"} | accurate |
| u9 | EXAMPLE | Worked problem calculating CO2 produced from decomposition of CaCO3 | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u10 | STUDY_SUPPORT | Review of key points and reminders for stoichiometry | {"subtype": "recap"} | accurate |

## u1: Definition of stoichiometry and its dependence on balanced equations

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
    "reason": "The definition accurately describes stoichiometry and explains the quantitative relationship among reacting substances based on a balanced equation.",
    "errors": []
  }
}
```

```text
## रासायनिक समीकरणमिति (Stoichiometry) क्या है?

**रासायनिक समीकरणमिति** रसायन विज्ञान की वह शाखा है जिसमें हम किसी रासायनिक अभिक्रिया में पदार्थों की **मात्रा** का हिसाब लगाते हैं।  
सरल शब्दों में:

> यदि हमें पता हो कि कितनी मात्रा में एक पदार्थ अभिक्रिया कर रहा है, तो हम पता लगा सकते हैं कि दूसरे पदार्थ की कितनी मात्रा चाहिए या कितनी बनेगी।

यह गणना हमेशा **संतुलित रासायनिक समीकरण** पर आधारित होती है।
```


## u2: Necessity of balanced equations, conservation of mass, and mole ratios

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
    "reason": "Correctly explains the law of conservation of atoms/mass as the reason for balancing equations and interprets stoichiometric coefficients as mole ratios.",
    "errors": []
  }
}
```

```text
## 1. संतुलित रासायनिक समीकरण क्यों जरूरी है?

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
    "reason": "The definition of the mole and the value of Avogadro's number are stated and illustrated correctly.",
    "errors": []
  }
}
```

```text
## 2. मोल (Mole) क्या होता है?

रसायन विज्ञान में बहुत छोटे कणों—परमाणुओं और अणुओं—की गिनती के लिए **मोल** का उपयोग किया जाता है।

\[
1 \text{ मोल} = 6.022 \times 10^{23} \text{ कण}
\]

इसे एवोगैड्रो संख्या कहते हैं।

उदाहरण:

- 1 मोल \(H_2O\) = \(6.022 \times 10^{23}\) पानी के अणु
- 1 मोल कार्बन = \(6.022 \times 10^{23}\) कार्बन परमाणु
```


## u4: Definition and calculation of molar mass

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
    "reason": "The definition, units (g/mol), and molecular mass calculations for water and carbon dioxide are correct.",
    "errors": []
  }
}
```

```text
## 3. मोलर द्रव्यमान (Molar Mass)

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


## u5: General step-by-step method for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The standard sequence of steps (mass to moles, mole ratio, moles to desired quantity) is accurate and widely accepted.",
    "errors": []
  }
}
```

```text
## 4. समीकरणमिति हल करने की मुख्य विधि

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


## u6: Worked problem calculating water produced from given mass of hydrogen

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
    "reason": "All calculations (moles of H2 = 2 mol, mole ratio 1:1, mass of H2O = 36 g) are factually and mathematically correct.",
    "errors": []
  }
}
```

```text
## 5. उदाहरण: पानी बनने की मात्रा

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


## u7: Concept and determination of limiting reactant

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
    "reason": "The definition of limiting reactant and the accompanying illustrative case (identifying H2 as the limiting reactant when 2 mol H2 reacts with 2 mol O2) are accurate.",
    "errors": []
  }
}
```

```text
## 6. सीमित अभिकारक (Limiting Reactant)

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


## u8: Summary reference of essential formulas

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
    "reason": "All three formulas correctly formulate the relationships between moles, mass, molar mass, and particle count.",
    "errors": []
  }
}
```

```text
## 7. कुछ महत्वपूर्ण सूत्र

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


## u9: Worked problem calculating CO2 produced from decomposition of CaCO3

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
    "reason": "The molar mass calculations and stoichiometric conversion steps from 100 g CaCO3 to 44 g CO2 are entirely correct.",
    "errors": []
  }
}
```

```text
## 8. एक और छोटा उदाहरण

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


## u10: Review of key points and reminders for stoichiometry

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
    "reason": "The recap items provide correct reminders and guidance for solving stoichiometry problems.",
    "errors": []
  }
}
```

```text
## याद रखने योग्य बातें

- सबसे पहले समीकरण को **संतुलित** करें।
- समीकरण के गुणांक द्रव्यमान नहीं, बल्कि **मोल अनुपात** बताते हैं।
- ग्राम से सीधे तुलना नहीं करें; पहले उन्हें **मोल** में बदलें।
- सीमित अभिकारक ही उत्पाद की वास्तविक मात्रा निर्धारित करता है।
- इकाइयों—ग्राम, मोल, g/mol—का ध्यान रखें।

रासायनिक समीकरणमिति वास्तव में “रसायनों की मात्रा का गणित” है। अभ्यास के साथ यह बहुत आसान हो जाती है।
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u7"
    ],
    "issue": "Section 6 introduces the concept of limiting reactant and immediately follows it with a short illustrative scenario (2 mol H2 and 2 mol O2). It could be split into a CONCEPT unit and an EXAMPLE unit.",
    "proposed_resolution": "Kept together as a single CONCEPT unit because the example is integrated directly as an explanatory vehicle to define and demonstrate what a limiting reactant is, rather than developed as a standalone worked numerical problem."
  },
  {
    "unit_ids": [
      "u8"
    ],
    "issue": "Section 7 presents three formulas. It could be classified as CONCEPT (depth: statement) or STUDY_SUPPORT (subtype: recap).",
    "proposed_resolution": "Classified as STUDY_SUPPORT (recap) because the formulas compile and restate mathematical relations defined in earlier sections into a reference summary list ('महत्वपूर्ण सूत्र')."
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


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```
