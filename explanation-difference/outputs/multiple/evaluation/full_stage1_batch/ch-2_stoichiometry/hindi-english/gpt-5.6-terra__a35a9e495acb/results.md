# Stage 1: Hindi / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Stoichiometry, balanced chemical equations, mole concept, conversion between mass and moles, and limiting reactants in Hindi",
  "topic_match": "on_topic",
  "reason": "The text directly explains the concept of stoichiometry, balanced equations, mole ratios, calculation steps with worked examples, and limiting reactants.",
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
| u1 | CONCEPT | Definition and basic principle of stoichiometry | {"depth": "explanation"} | accurate |
| u2 | CONCEPT | Importance of balanced equations and definition of mole ratio | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | Definition of mole and Avogadro's number | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Conversion between mass and moles using molar mass | {"depth": "explanation"} | accurate |
| u5 | PROCEDURE | General sequence of steps for solving stoichiometry problems | {} | accurate |
| u6 | EXAMPLE | Worked example calculating water produced from 4 grams of hydrogen | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | EXAMPLE | Worked example calculating carbon dioxide produced from 100 grams of calcium carbonate | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | CONCEPT | Concept and definition of limiting reactant | {"depth": "explanation"} | accurate |
| u9 | STUDY_SUPPORT | Summary recap of key rules and formula review | {"subtype": "recap"} | accurate |

## u1: Definition and basic principle of stoichiometry

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
    "reason": "The definition accurately states that stoichiometry relates quantities of reactants and products based on balanced chemical equations.",
    "errors": []
  }
}
```

```text
## स्टॉइकियोमेट्री (Stoichiometry) क्या है?

**स्टॉइकियोमेट्री** रसायन विज्ञान की वह विधि है जिसमें हम किसी रासायनिक अभिक्रिया (chemical reaction) में शामिल पदार्थों की **मात्रा** का हिसाब लगाते हैं।

सरल शब्दों में:

> यदि हमें पता हो कि किसी अभिक्रिया में एक पदार्थ की कितनी मात्रा है, तो स्टॉइकियोमेट्री से हम पता कर सकते हैं कि दूसरे पदार्थ की कितनी मात्रा चाहिए या बनेगी।

यह गणना हमेशा **संतुलित रासायनिक समीकरण (balanced chemical equation)** पर आधारित होती है।
```


## u2: Importance of balanced equations and definition of mole ratio

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
    "reason": "The explanation correctly shows the balancing of hydrogen and oxygen reacting to form water and defines the stoichiometric coefficients as mole ratios.",
    "errors": []
  }
}
```

```text
# 1. संतुलित समीकरण क्यों जरूरी है?

मान लीजिए हाइड्रोजन गैस और ऑक्सीजन गैस मिलकर पानी बनाती हैं:

\[
H_2 + O_2 \rightarrow H_2O
\]

यह समीकरण संतुलित नहीं है।

बाएँ तरफ:
- H = 2 परमाणु
- O = 2 परमाणु

दाएँ तरफ:
- H = 2 परमाणु
- O = 1 परमाणु

ऑक्सीजन की संख्या बराबर नहीं है। इसे संतुलित करते हैं:

\[
\boxed{2H_2 + O_2 \rightarrow 2H_2O}
\]

अब:
- H: बाएँ 4, दाएँ 4
- O: बाएँ 2, दाएँ 2

यह संतुलित समीकरण बताता है:

\[
2 \text{ mol } H_2 + 1 \text{ mol } O_2 \rightarrow 2 \text{ mol } H_2O
\]

अर्थात:
- 2 मोल हाइड्रोजन
- 1 मोल ऑक्सीजन

मिलकर 2 मोल पानी बनाते हैं।

इन्हीं संख्याओं को **मोल अनुपात (mole ratio)** कहते हैं।
```


## u3: Definition of mole and Avogadro's number

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
    "reason": "The mole is correctly described as a counting unit for particles with the numerical value of Avogadro's number.",
    "errors": []
  }
}
```

```text
# 2. मोल (Mole) क्या होता है?

रसायन विज्ञान में कणों की बहुत बड़ी संख्या को गिनने के लिए **मोल** का प्रयोग किया जाता है।

\[
1 \text{ mol} = 6.022 \times 10^{23}
\]

कणों को **एवोगैड्रो संख्या (Avogadro’s number)** कहते हैं।

उदाहरण:
- 1 mol पानी = \(6.022 \times 10^{23}\) पानी के अणु
- 1 mol कार्बन = \(6.022 \times 10^{23}\) कार्बन परमाणु
```


## u4: Conversion between mass and moles using molar mass

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
    "reason": "The formula and definition of molar mass, as well as the calculation for water (18 g/mol), are accurate.",
    "errors": []
  }
}
```

```text
# 3. ग्राम से मोल में कैसे बदलें?

ग्राम से मोल निकालने का सूत्र:

\[
\boxed{\text{Moles} = \frac{\text{Mass in grams}}{\text{Molar mass}}}
\]

जहाँ **molar mass** किसी पदार्थ के 1 mol का द्रव्यमान है।

उदाहरण: पानी \(H_2O\)

\[
H_2O = 2(1) + 16 = 18 \text{ g/mol}
\]

इसलिए:

\[
1 \text{ mol } H_2O = 18 \text{ g}
\]
```


## u5: General sequence of steps for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The listed sequence of steps standardly represents the method for stoichiometric calculations.",
    "errors": []
  }
}
```

```text
# 4. स्टॉइकियोमेट्री करने के मुख्य चरण

किसी भी प्रश्न में सामान्यतः ये चरण अपनाइए:

1. **रासायनिक समीकरण लिखिए।**
2. **समीकरण को संतुलित कीजिए।**
3. दी गई मात्रा को **मोल** में बदलें।
4. संतुलित समीकरण के गुणांकों से **मोल अनुपात** लगाएँ।
5. उत्तर को जरूरत के अनुसार ग्राम, अणु, आयतन आदि में बदलें।
```


## u6: Worked example calculating water produced from 4 grams of hydrogen

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
    "reason": "All calculations from molar mass of H2 to mole ratio and final mass of water are correct.",
    "errors": []
  }
}
```

```text
# 5. उदाहरण 1: कितने ग्राम पानी बनेगा?

प्रश्न:  
यदि 4 ग्राम हाइड्रोजन पूरी तरह ऑक्सीजन से अभिक्रिया करे, तो कितना पानी बनेगा?

समीकरण:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

### चरण 1: हाइड्रोजन के मोल निकालें

हाइड्रोजन गैस \(H_2\) का molar mass:

\[
H_2 = 2 \text{ g/mol}
\]

दिया है:

\[
4 \text{ g } H_2
\]

\[
\text{Moles of } H_2 = \frac{4}{2} = 2 \text{ mol}
\]

### चरण 2: मोल अनुपात लगाएँ

समीकरण के अनुसार:

\[
2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O
\]

अर्थात \(H_2 : H_2O = 2:2 = 1:1\)

तो:

\[
2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O
\]

### चरण 3: पानी के मोल को ग्राम में बदलें

पानी का molar mass:

\[
H_2O = 18 \text{ g/mol}
\]

\[
\text{Mass of water} = 2 \times 18 = 36 \text{ g}
\]

\[
\boxed{36 \text{ ग्राम पानी बनेगा}}
\]
```


## u7: Worked example calculating carbon dioxide produced from 100 grams of calcium carbonate

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
    "reason": "Molar masses (100 g/mol for CaCO3, 44 g/mol for CO2) and the stoichiometric deduction leading to 44 g of CO2 are completely accurate.",
    "errors": []
  }
}
```

```text
# 6. उदाहरण 2: कैल्शियम कार्बोनेट का अपघटन

समीकरण:

\[
CaCO_3 \rightarrow CaO + CO_2
\]

प्रश्न: 100 g \(CaCO_3\) से कितनी \(CO_2\) बनेगी?

### चरण 1: \(CaCO_3\) का molar mass

\[
CaCO_3 = 40 + 12 + 3(16)
\]

\[
= 40 + 12 + 48 = 100 \text{ g/mol}
\]

अर्थात:

\[
100 \text{ g } CaCO_3 = 1 \text{ mol } CaCO_3
\]

### चरण 2: मोल अनुपात

\[
CaCO_3 \rightarrow CaO + CO_2
\]

\[
1 \text{ mol } CaCO_3 \rightarrow 1 \text{ mol } CO_2
\]

इसलिए 1 mol \(CaCO_3\) से 1 mol \(CO_2\) बनेगी।

### चरण 3: \(CO_2\) का द्रव्यमान

\[
CO_2 = 12 + 2(16) = 44 \text{ g/mol}
\]

\[
1 \text{ mol } CO_2 = 44 \text{ g}
\]

\[
\boxed{100 \text{ g } CaCO_3 \text{ से } 44 \text{ g } CO_2 \text{ बनेगी}}
\]
```


## u8: Concept and definition of limiting reactant

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
    "reason": "The definition of limiting reactant and the accompanying quantitative illustration with 2 mol H2 and 2 mol O2 are correct.",
    "errors": []
  }
}
```

```text
# 7. सीमित अभिकारक (Limiting Reactant)

कई बार अभिक्रिया में दो पदार्थ दिए होते हैं, लेकिन उनमें से एक पदार्थ पहले पूरी तरह खत्म हो जाता है। वही पदार्थ **सीमित अभिकारक** कहलाता है।

यह तय करता है कि उत्पाद कितना बनेगा।

उदाहरण:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

मान लीजिए:
- \(2\) mol \(H_2\)
- \(2\) mol \(O_2\)

समीकरण के अनुसार 2 mol \(H_2\) के लिए केवल 1 mol \(O_2\) चाहिए।

यहाँ:
- \(H_2\) पूरी तरह खर्च हो जाएगी।
- \(O_2\) में से 1 mol बच जाएगी।

इसलिए \(H_2\) **limiting reactant** है।
```


## u9: Summary recap of key rules and formula review

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
    "reason": "The recap correctly summarizes the key guidelines and formulas of stoichiometry.",
    "errors": []
  }
}
```

```text
# 8. याद रखने योग्य बातें

- स्टॉइकियोमेट्री की शुरुआत हमेशा **balanced equation** से करें।
- समीकरण के आगे लिखे अंक (coefficients) मोल अनुपात बताते हैं।
- सूत्र के नीचे लिखे अंक (subscripts), जैसे \(H_2O\) में 2, को कभी नहीं बदलते।
- ग्राम से मोल:

\[
\text{Moles} = \frac{\text{Mass}}{\text{Molar mass}}
\]

- मोल से ग्राम:

\[
\text{Mass} = \text{Moles} \times \text{Molar mass}
\]

---

## एक पंक्ति में सार

> **स्टॉइकियोमेट्री संतुलित रासायनिक समीकरण का उपयोग करके अभिकारकों और उत्पादों की मात्राओं की गणना करने की विधि है।**
```

## Ambiguities

```json
[]
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
