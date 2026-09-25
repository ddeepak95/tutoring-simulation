# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation thoroughly introduces stoichiometry in Hindi, explaining core concepts such as balanced equations, the mole concept, molar mass, calculation steps, worked examples, and limiting reactants.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 147,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "PROCEDURE": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 147,
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

## u1: Definition and scope of stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what stoichiometry is, how it relates quantities of reactants and products, and its dependence on balanced chemical equations.

Accuracy: **accurate**. The definition of stoichiometry and its reliance on balanced chemical equations are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## रासायनिक समीकरणमिति (Stoichiometry) क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | **रासायनिक समीकरणमिति** रसायन विज्ञान की वह शाखा है जिसमें हम किसी रासायनिक अभिक्रिया में पदार्थों की **मात्रा** का हिसाब लगाते हैं।   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | सरल शब्दों में: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | &gt; यदि हमें पता हो कि कितनी मात्रा में एक पदार्थ अभिक्रिया कर रहा है, तो हम पता लगा सकते हैं कि दूसरे पदार्थ की कितनी मात्रा चाहिए या कितनी बनेगी। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p5 | यह गणना हमेशा **संतुलित रासायनिक समीकरण** पर आधारित होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Role of balanced chemical equations and mole ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why balanced equations are needed (conservation of mass/atoms) and how coefficients represent mole ratios.

Accuracy: **accurate**. The relationship between balanced chemical coefficients, molecular ratios, and mole ratios is correctly explained, alongside the conservation of atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## 1. संतुलित रासायनिक समीकरण क्यों जरूरी है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p10 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p11 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p12 | इसका अर्थ है: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | - 2 अणु (या 2 मोल) हाइड्रोजन | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p14 | - 1 अणु (या 1 मोल) ऑक्सीजन से | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p15 | - 2 अणु (या 2 मोल) पानी बनता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p16 | यहाँ गुणांक \(2:1:2\) पदार्थों का **मोल अनुपात (mole ratio)** बताते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | ध्यान रखें: अभिक्रिया में परमाणु न तो बनते हैं, न नष्ट होते हैं। इसलिए समीकरण का संतुलित होना आवश्यक है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Mole concept and Avogadro's number (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the mole as a counting unit for chemical entities and introduces Avogadro's number with illustrative examples.

Accuracy: **accurate**. The definition of mole and Avogadro's number (6.022 x 10^23 particles) is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ## 2. मोल (Mole) क्या होता है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | रसायन विज्ञान में बहुत छोटे कणों—परमाणुओं और अणुओं—की गिनती के लिए **मोल** का उपयोग किया जाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p22 | 1 \text{ मोल} = 6.022 \times 10^{23} \text{ कण} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p23 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p24 | इसे एवोगैड्रो संख्या कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p26 | - 1 मोल \(H_2O\) = \(6.022 \times 10^{23}\) पानी के अणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p27 | - 1 मोल कार्बन = \(6.022 \times 10^{23}\) कार्बन परमाणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Molar mass definition and calculation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass, specifies its units (g/mol), and demonstrates how to calculate molar mass for H2O and CO2.

Accuracy: **accurate**. The definition and calculation of molar masses for water (18 g/mol) and carbon dioxide (44 g/mol) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ## 3. मोलर द्रव्यमान (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | किसी पदार्थ के **1 मोल का द्रव्यमान** उसका मोलर द्रव्यमान कहलाता है। इसकी इकाई **g/mol** होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p31 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | ### पानी \((H_2O)\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | - H का परमाणु द्रव्यमान = 1 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p34 | - O का परमाणु द्रव्यमान = 16 | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p35 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p36 | H_2O = 2(1) + 16 = 18 \text{ g/mol} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p37 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p38 | अर्थात: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p39 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p40 | 1 \text{ मोल पानी} = 18 \text{ ग्राम} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p41 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p42 | ### कार्बन डाइऑक्साइड \((CO_2)\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p44 | CO_2 = 12 + 2(16) = 44 \text{ g/mol} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p45 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p46 | अर्थात 1 मोल \(CO_2\) का द्रव्यमान 44 ग्राम है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p47 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: General procedure for stoichiometric calculations (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable step-by-step method and a flowchart for converting between mass, moles, mole ratios, and product mass.

Accuracy: **accurate**. The standard sequence of steps (write equation, balance, convert to moles, apply mole ratio, convert to target quantity) is accurate and standard in stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p48 | ## 4. समीकरणमिति हल करने की मुख्य विधि | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p49 | अधिकांश प्रश्नों में यह क्रम अपनाएँ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p50 | 1. **रासायनिक समीकरण लिखें।** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p51 | 2. **समीकरण को संतुलित करें।** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p52 | 3. दिए गए द्रव्यमान को **मोल** में बदलें। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p53 | 4. संतुलित समीकरण से **मोल अनुपात** लगाएँ। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p54 | 5. आवश्यक हो तो मोल को फिर **ग्राम**, **कणों**, या **गैस के आयतन** में बदलें। | PROCEDURE | {} | [&#x27;list&#x27;] |
| p55 | इसे संक्षेप में ऐसे याद रख सकते हैं: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p56 | \[ | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p57 | \text{ग्राम} \rightarrow \text{मोल} \rightarrow \text{मोल अनुपात} \rightarrow \text{ग्राम} | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p58 | \] | PROCEDURE | {} | [&#x27;equation&#x27;] |
| p59 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Worked example calculating water produced from hydrogen (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the stoichiometric calculation procedure to determine mass of water produced from 4 g of hydrogen gas.

Accuracy: **accurate**. All calculations (moles of H2 = 2 mol, mole ratio 2:2, mass of H2O = 2 * 18 = 36 g) are correctly worked out.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p60 | ## 5. उदाहरण: पानी बनने की मात्रा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p61 | समीकरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p62 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p63 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p64 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p65 | प्रश्न: यदि 4 ग्राम हाइड्रोजन पूरी तरह अभिक्रिया करे, तो कितना पानी बनेगा? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p66 | ### चरण 1: हाइड्रोजन के मोल ज्ञात करें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p67 | \(H_2\) का मोलर द्रव्यमान: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p68 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p69 | H_2 = 2 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p71 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p72 | \text{मोल } H_2 = \frac{4}{2} = 2 \text{ mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p74 | ### चरण 2: मोल अनुपात देखें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p75 | समीकरण में: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p76 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | 2H_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p78 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | अर्थात: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p80 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | 2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | इसलिए 2 मोल \(H_2\) से 2 मोल \(H_2O\) बनेंगे। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p84 | ### चरण 3: पानी के मोल को ग्राम में बदलें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p85 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | 1 \text{ mol } H_2O = 18 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p87 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | 2 \text{ mol } H_2O = 2 \times 18 = 36 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | **उत्तर: 4 ग्राम हाइड्रोजन से 36 ग्राम पानी बनेगा**, यदि ऑक्सीजन पर्याप्त मात्रा में उपलब्ध हो। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p92 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Limiting reactant concept and identification (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the limiting reactant and explains how to determine it using the water synthesis reaction.

Accuracy: **accurate**. The definition of limiting reactant and the deduction that 2 mol H2 limits 2 mol O2 are scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p93 | ## 6. सीमित अभिकारक (Limiting Reactant) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p94 | कई बार अभिक्रिया में एक पदार्थ कम पड़ जाता है। जो पदार्थ सबसे पहले समाप्त हो जाता है, उसे **सीमित अभिकारक** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p95 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p96 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | मान लीजिए आपके पास: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p100 | - 2 मोल \(H_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p101 | - 2 मोल \(O_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p102 | समीकरण के अनुसार 2 मोल \(H_2\) को केवल 1 मोल \(O_2\) चाहिए।   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p103 | इसलिए \(H_2\) पूरा खर्च हो जाएगा और 1 मोल \(O_2\) बच जाएगा। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p104 | यहाँ \(H_2\) **सीमित अभिकारक** है, क्योंकि वही पानी बनने की अधिकतम मात्रा तय करेगा। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p105 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Key formulas for stoichiometric conversions (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists core formulas for calculating moles, mass, and number of particles.

Accuracy: **accurate**. Formulas relating moles, mass, molar mass, and Avogadro's number are mathematically and conceptually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p106 | ## 7. कुछ महत्वपूर्ण सूत्र | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p107 | ### मोल निकालने का सूत्र | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p108 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p109 | \text{मोल} = \frac{\text{दिया गया द्रव्यमान (g)}}{\text{मोलर द्रव्यमान (g/mol)}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p110 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p111 | ### द्रव्यमान निकालने का सूत्र | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p112 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p113 | \text{द्रव्यमान} = \text{मोल} \times \text{मोलर द्रव्यमान} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p114 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p115 | ### कणों की संख्या | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p116 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p117 | \text{कणों की संख्या} = \text{मोल} \times 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p118 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p119 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Worked example calculating carbon dioxide from calcium carbonate decomposition (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows a worked calculation determining grams of CO2 produced from 100 g CaCO3 decomposition.

Accuracy: **accurate**. Calculations for the thermal decomposition of CaCO3 yielding 44 g CO2 from 100 g CaCO3 are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p120 | ## 8. एक और छोटा उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p121 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p122 | CaCO_3 \rightarrow CaO + CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p123 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p124 | प्रश्न: 100 ग्राम कैल्शियम कार्बोनेट \((CaCO_3)\) से कितना \(CO_2\) बनेगा? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p125 | मोलर द्रव्यमान: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p126 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p127 | CaCO_3 = 40 + 12 + 3(16) = 100 \text{ g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p128 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p129 | अतः 100 ग्राम \(CaCO_3\) = 1 मोल \(CaCO_3\) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p130 | समीकरण के अनुसार: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p131 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p132 | 1 \text{ mol } CaCO_3 \rightarrow 1 \text{ mol } CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p133 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p134 | \(CO_2\) का मोलर द्रव्यमान = 44 g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p135 | इसलिए: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p136 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p137 | 1 \text{ mol } CO_2 = 44 \text{ g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p138 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p139 | **उत्तर: 100 ग्राम \(CaCO_3\) से 44 ग्राम \(CO_2\) बनेगा।** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p140 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Summary tips and key takeaways (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes important rules to remember (balancing equations, mole ratios vs mass, units) when doing stoichiometry.

Accuracy: **accurate**. All recap points and takeaways correctly reinforce proper stoichiometric problem-solving practices.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p141 | ## याद रखने योग्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p142 | - सबसे पहले समीकरण को **संतुलित** करें। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p143 | - समीकरण के गुणांक द्रव्यमान नहीं, बल्कि **मोल अनुपात** बताते हैं। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p144 | - ग्राम से सीधे तुलना नहीं करें; पहले उन्हें **मोल** में बदलें। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p145 | - सीमित अभिकारक ही उत्पाद की वास्तविक मात्रा निर्धारित करता है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p146 | - इकाइयों—ग्राम, मोल, g/mol—का ध्यान रखें। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p147 | रासायनिक समीकरणमिति वास्तव में “रसायनों की मात्रा का गणित” है। अभ्यास के साथ यह बहुत आसान हो जाती है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |

