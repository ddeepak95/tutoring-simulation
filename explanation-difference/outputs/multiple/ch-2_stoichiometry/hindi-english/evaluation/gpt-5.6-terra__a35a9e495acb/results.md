# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive, accurate Hindi explanation of stoichiometry for a high school level, covering balanced chemical equations, the mole concept, molar mass conversions, general steps, worked quantitative examples, limiting reactants, and key takeaways.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 176,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 176,
  "unique_subtopics": 10,
  "contextualization": {
    "none": 10
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and Importance of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry, explains its core purpose in relating quantities of reactants and products, and notes its dependence on balanced equations.

Accuracy: **accurate**. The definition and foundational premise of stoichiometry are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## स्टॉइकियोमेट्री (Stoichiometry) क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | **स्टॉइकियोमेट्री** रसायन विज्ञान की वह विधि है जिसमें हम किसी रासायनिक अभिक्रिया (chemical reaction) में शामिल पदार्थों की **मात्रा** का हिसाब लगाते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | सरल शब्दों में: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | &gt; यदि हमें पता हो कि किसी अभिक्रिया में एक पदार्थ की कितनी मात्रा है, तो स्टॉइकियोमेट्री से हम पता कर सकते हैं कि दूसरे पदार्थ की कितनी मात्रा चाहिए या बनेगी। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | यह गणना हमेशा **संतुलित रासायनिक समीकरण (balanced chemical equation)** पर आधारित होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Significance of Balanced Chemical Equations and Mole Ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why chemical equations must be balanced before performing stoichiometric calculations and derives the concept of mole ratios using the water synthesis reaction.

Accuracy: **accurate**. The equation balancing and the derivation of mole ratios from stoichiometric coefficients are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | # 1. संतुलित समीकरण क्यों जरूरी है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | मान लीजिए हाइड्रोजन गैस और ऑक्सीजन गैस मिलकर पानी बनाती हैं: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 | H_2 + O_2 \rightarrow H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p11 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | यह समीकरण संतुलित नहीं है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | बाएँ तरफ: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p14 | - H = 2 परमाणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | - O = 2 परमाणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | दाएँ तरफ: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p17 | - H = 2 परमाणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p18 | - O = 1 परमाणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p19 | ऑक्सीजन की संख्या बराबर नहीं है। इसे संतुलित करते हैं: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p20 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p21 | \boxed{2H_2 + O_2 \rightarrow 2H_2O} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p23 | अब: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p24 | - H: बाएँ 4, दाएँ 4 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p25 | - O: बाएँ 2, दाएँ 2 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p26 | यह संतुलित समीकरण बताता है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p28 | 2 \text{ mol } H_2 + 1 \text{ mol } O_2 \rightarrow 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 | अर्थात: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | - 2 मोल हाइड्रोजन | EXAMPLE | {} | [&#x27;list&#x27;] |
| p32 | - 1 मोल ऑक्सीजन | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | मिलकर 2 मोल पानी बनाते हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | इन्हीं संख्याओं को **मोल अनुपात (mole ratio)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: The Mole Concept and Avogadro's Number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the mole as a counting unit for microscopic particles and defines Avogadro's number with examples.

Accuracy: **accurate**. Avogadro's constant (6.022 x 10^23) and its interpretation for water molecules and carbon atoms are standard and accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | # 2. मोल (Mole) क्या होता है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | रसायन विज्ञान में कणों की बहुत बड़ी संख्या को गिनने के लिए **मोल** का प्रयोग किया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p38 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p39 | 1 \text{ mol} = 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p40 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p41 | कणों को **एवोगैड्रो संख्या (Avogadro’s number)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p42 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p43 | - 1 mol पानी = \(6.022 \times 10^{23}\) पानी के अणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p44 | - 1 mol कार्बन = \(6.022 \times 10^{23}\) कार्बन परमाणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p45 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Converting Between Grams and Moles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how molar mass is defined and provides the formula and a water calculation to convert between grams and moles.

Accuracy: **accurate**. The relationship moles = mass / molar mass and the molar mass of H2O (18 g/mol) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | # 3. ग्राम से मोल में कैसे बदलें? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | ग्राम से मोल निकालने का सूत्र: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p48 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p49 | \boxed{\text{Moles} = \frac{\text{Mass in grams}}{\text{Molar mass}}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p50 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p51 | जहाँ **molar mass** किसी पदार्थ के 1 mol का द्रव्यमान है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p52 | उदाहरण: पानी \(H_2O\) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p53 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | H_2O = 2(1) + 16 = 18 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p56 | इसलिए: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | 1 \text{ mol } H_2O = 18 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Steps to Solve Stoichiometry Problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the five sequential procedural steps required to solve standard stoichiometry problems.

Accuracy: **accurate**. The procedural sequence (write equation -> balance -> convert to moles -> mole ratio -> convert to desired units) is correct and standard.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p61 | # 4. स्टॉइकियोमेट्री करने के मुख्य चरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p62 | किसी भी प्रश्न में सामान्यतः ये चरण अपनाइए: | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p63 | 1. **रासायनिक समीकरण लिखिए।** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p64 | 2. **समीकरण को संतुलित कीजिए।** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p65 | 3. दी गई मात्रा को **मोल** में बदलें। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p66 | 4. संतुलित समीकरण के गुणांकों से **मोल अनुपात** लगाएँ। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p67 | 5. उत्तर को जरूरत के अनुसार ग्राम, अणु, आयतन आदि में बदलें। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p68 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Worked Example: Calculating Mass of Water Produced (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked problem calculating the mass of water formed from 4 g of hydrogen reacting with excess oxygen.

Accuracy: **accurate**. All calculations (4 g H2 = 2 mol H2 -> 2 mol H2O -> 36 g H2O) are mathematically and chemically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p69 | # 5. उदाहरण 1: कितने ग्राम पानी बनेगा? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p70 | प्रश्न:   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p71 | यदि 4 ग्राम हाइड्रोजन पूरी तरह ऑक्सीजन से अभिक्रिया करे, तो कितना पानी बनेगा? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p72 | समीकरण: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p73 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p74 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p75 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p76 | ### चरण 1: हाइड्रोजन के मोल निकालें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p77 | हाइड्रोजन गैस \(H_2\) का molar mass: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p78 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | H_2 = 2 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | दिया है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p82 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | 4 \text{ g } H_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p85 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | \text{Moles of } H_2 = \frac{4}{2} = 2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p87 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | ### चरण 2: मोल अनुपात लगाएँ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p89 | समीकरण के अनुसार: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p90 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | 2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p92 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | अर्थात \(H_2 : H_2O = 2:2 = 1:1\) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p94 | तो: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p95 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | 2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | ### चरण 3: पानी के मोल को ग्राम में बदलें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p99 | पानी का molar mass: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p100 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p101 | H_2O = 18 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p102 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p103 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | \text{Mass of water} = 2 \times 18 = 36 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p105 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p107 | \boxed{36 \text{ ग्राम पानी बनेगा}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p109 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Worked Example: Decomposition of Calcium Carbonate (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a fully worked stoichiometry problem finding the mass of CO2 produced from decomposing 100 g of CaCO3.

Accuracy: **accurate**. Calculations for CaCO3 molar mass (100 g/mol), 1:1 mole ratio, and CO2 mass (44 g) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p110 | # 6. उदाहरण 2: कैल्शियम कार्बोनेट का अपघटन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p111 | समीकरण: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p112 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p113 | CaCO_3 \rightarrow CaO + CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p114 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p115 | प्रश्न: 100 g \(CaCO_3\) से कितनी \(CO_2\) बनेगी? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p116 | ### चरण 1: \(CaCO_3\) का molar mass | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p117 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p118 | CaCO_3 = 40 + 12 + 3(16) | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p119 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p120 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p121 | = 40 + 12 + 48 = 100 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p122 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p123 | अर्थात: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p124 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p125 | 100 \text{ g } CaCO_3 = 1 \text{ mol } CaCO_3 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p126 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p127 | ### चरण 2: मोल अनुपात | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p128 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p129 | CaCO_3 \rightarrow CaO + CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p130 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p131 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p132 | 1 \text{ mol } CaCO_3 \rightarrow 1 \text{ mol } CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p133 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p134 | इसलिए 1 mol \(CaCO_3\) से 1 mol \(CO_2\) बनेगी। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p135 | ### चरण 3: \(CO_2\) का द्रव्यमान | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p136 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p137 | CO_2 = 12 + 2(16) = 44 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p138 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p139 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p140 | 1 \text{ mol } CO_2 = 44 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p141 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p142 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p143 | \boxed{100 \text{ g } CaCO_3 \text{ से } 44 \text{ g } CO_2 \text{ बनेगी}} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p144 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p145 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Limiting Reactant Concept and Identification (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant is, explains its role in determining product yield, and provides an illustrative reaction mixture.

Accuracy: **accurate**. The definition of limiting reactant and the reasoning identifying H2 as limiting in a 2 mol H2 + 2 mol O2 mixture are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p146 | # 7. सीमित अभिकारक (Limiting Reactant) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p147 | कई बार अभिक्रिया में दो पदार्थ दिए होते हैं, लेकिन उनमें से एक पदार्थ पहले पूरी तरह खत्म हो जाता है। वही पदार्थ **सीमित अभिकारक** कहलाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p148 | यह तय करता है कि उत्पाद कितना बनेगा। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p149 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p150 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p151 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p152 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p153 | मान लीजिए: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p154 | - \(2\) mol \(H_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p155 | - \(2\) mol \(O_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p156 | समीकरण के अनुसार 2 mol \(H_2\) के लिए केवल 1 mol \(O_2\) चाहिए। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p157 | यहाँ: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p158 | - \(H_2\) पूरी तरह खर्च हो जाएगी। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p159 | - \(O_2\) में से 1 mol बच जाएगी। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p160 | इसलिए \(H_2\) **limiting reactant** है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p161 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Key Rules and Conversion Formulas (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recaps important guidelines (coefficients vs subscripts) and conversion formulas for quick recall.

Accuracy: **accurate**. All bullet points and formulas are scientifically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p162 | # 8. याद रखने योग्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p163 | - स्टॉइकियोमेट्री की शुरुआत हमेशा **balanced equation** से करें। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p164 | - समीकरण के आगे लिखे अंक (coefficients) मोल अनुपात बताते हैं। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p165 | - सूत्र के नीचे लिखे अंक (subscripts), जैसे \(H_2O\) में 2, को कभी नहीं बदलते। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p166 | - ग्राम से मोल: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p167 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p168 | \text{Moles} = \frac{\text{Mass}}{\text{Molar mass}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p169 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p170 | - मोल से ग्राम: | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p171 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p172 | \text{Mass} = \text{Moles} \times \text{Molar mass} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p173 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p174 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: One-Line Stoichiometry Summary (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise single-sentence summary of the entire concept of stoichiometry.

Accuracy: **accurate**. The one-line summary accurately captures the essence of stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p175 | ## एक पंक्ति में सार | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p176 | &gt; **स्टॉइकियोमेट्री संतुलित रासायनिक समीकरण का उपयोग करके अभिकारकों और उत्पादों की मात्राओं की गणना करने की विधि है।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

