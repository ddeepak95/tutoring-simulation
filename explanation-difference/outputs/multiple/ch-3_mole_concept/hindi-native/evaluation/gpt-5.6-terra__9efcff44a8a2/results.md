# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains the mole concept, Avogadro's number, molar mass, molar volume of gases at STP, and formulas with solved examples in Hindi as requested.

## Counts

```json
{
  "total_content_units": 17,
  "substantive_content_units": 17,
  "total_passages": 148,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 7,
    "EXAMPLE": 7,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 148,
  "unique_subtopics": 10,
  "contextualization": {
    "everyday": 2,
    "none": 15
  },
  "proposed_substantive_verdicts": {
    "accurate": 17
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Introduction to mole through the dozen analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p1", "quote": "जैसे हम चीज़ों को गिनने के लिए “दर्जन” कहते हैं—"}, {"passage_id": "p2", "quote": "- 1 दर्जन = 12 वस्तुएँ  "}]}

Annotation rationale: Explains the concept of a mole as a counting unit by comparing it to the everyday counting unit of a dozen.

Accuracy: **accurate**. The analogy to a dozen and the definition of a mole and Avogadro's number (6.022 × 10^23 particles) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | मोल (Mole) रसायन विज्ञान में पदार्थ की **बहुत बड़ी संख्या में कणों को गिनने** की इकाई है। जैसे हम चीज़ों को गिनने के लिए “दर्जन” कहते हैं— | ANALOGY | {} | [&#x27;prose&#x27;] |
| p2 | - 1 दर्जन = 12 वस्तुएँ   | ANALOGY | {} | [&#x27;list&#x27;] |
| p3 | वैसे ही, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | - **1 मोल = \(6.022 \times 10^{23}\) कण** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | इस संख्या को **एवोगैड्रो संख्या (Avogadro’s number)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Why the mole is needed (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p8", "quote": "उदाहरण के लिए, एक पानी की बूंद में भी अकल्पनीय रूप से बहुत सारे पानी के अणु होते हैं।"}]}

Annotation rationale: Explains the physical reason scientists require the mole concept due to the tiny size and enormous count of particles like atoms and molecules.

Accuracy: **accurate**. The explanation accurately conveys why microscopic particles cannot be counted individually and require a large unit like the mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p7 | ## 1. मोल की आवश्यकता क्यों पड़ती है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | परमाणु, अणु और आयन इतने छोटे होते हैं कि उन्हें एक-एक करके गिनना संभव नहीं है। उदाहरण के लिए, एक पानी की बूंद में भी अकल्पनीय रूप से बहुत सारे पानी के अणु होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p9 | इसलिए वैज्ञानिकों ने कणों की विशाल संख्या को व्यक्त करने के लिए “मोल” का उपयोग किया। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Meaning of 1 mole and types of representative particles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains what constituent particles correspond to 1 mole depending on whether the substance is atomic, molecular, ionic, or subatomic.

Accuracy: **accurate**. The table and descriptions accurately correlate the type of particle (atoms for He, molecules for O2, formula units for NaCl, subatomic particles for electrons) with 1 mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p11 | ## 2. 1 मोल का अर्थ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | 1 मोल पदार्थ में हमेशा: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p14 | 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p15 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p16 | कण होते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | कण का अर्थ पदार्थ के अनुसार बदल सकता है: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | &#124; पदार्थ &#124; 1 मोल में क्या होगा? &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p19 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p20 | &#124; हीलियम (He) &#124; \(6.022 \times 10^{23}\) हीलियम परमाणु &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p21 | &#124; ऑक्सीजन गैस (\(O_2\)) &#124; \(6.022 \times 10^{23}\) ऑक्सीजन अणु &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p22 | &#124; सोडियम क्लोराइड (NaCl) &#124; \(6.022 \times 10^{23}\) NaCl सूत्रक इकाइयाँ &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p23 | &#124; इलेक्ट्रॉन &#124; \(6.022 \times 10^{23}\) इलेक्ट्रॉन &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |

## u4: Molar mass definition and unit (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass of one mole of a substance, provides its units (g/mol), and relates it to atomic/molecular mass.

Accuracy: **accurate**. The definition of molar mass, its units, and its numerical equality with atomic/molecular mass in unified mass units (u) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p25 | ## 3. मोलर द्रव्यमान (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | किसी पदार्थ के **1 मोल का द्रव्यमान** उसका **मोलर द्रव्यमान** कहलाता है। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | इसकी इकाई होती है: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p28 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p29 | \text{ग्राम प्रति मोल (g/mol)} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p30 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p31 | मोलर द्रव्यमान संख्यात्मक रूप से परमाणु/आणविक द्रव्यमान के बराबर होता है, पर उसकी इकाई g/mol होती है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u5: Molar mass of carbon (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows step-by-step determination of the molar mass of carbon and how 12 g corresponds to 1 mole and Avogadro's number of atoms.

Accuracy: **accurate**. Atomic mass of carbon is 12 u, molar mass is 12 g/mol, and 12 g contains 6.022 × 10^23 carbon atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p32 | ### उदाहरण 1: कार्बन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p33 | कार्बन का परमाणु द्रव्यमान = 12 u | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p34 | अतः कार्बन का मोलर द्रव्यमान: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p36 | 12\ \text{g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | इसका अर्थ: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p39 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p40 | 12\ \text{g कार्बन} = 1\ \text{मोल कार्बन परमाणु} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | और इनमें \(6.022 \times 10^{23}\) कार्बन परमाणु होंगे। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u6: Molar mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Shows step-by-step determination of the molecular and molar mass of water, relating 18 g to 1 mole and Avogadro's number of water molecules.

Accuracy: **accurate**. Molecular mass calculation of water (2*1 + 16 = 18) and conversion to 18 g/mol is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | ### उदाहरण 2: पानी (\(H_2O\)) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | पानी का आणविक द्रव्यमान: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p45 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p46 | 2(1) + 16 = 18 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p47 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p48 | अतः पानी का मोलर द्रव्यमान: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p49 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p50 | 18\ \text{g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p51 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p52 | यानि: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p53 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p54 | 18\ \text{g पानी} = 1\ \text{मोल पानी} = 6.022 \times 10^{23}\ \text{पानी के अणु} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p55 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u7: Formula: Moles from mass (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula for calculating number of moles from given mass and molar mass: n = m / M.

Accuracy: **accurate**. The formula n = m/M and its variables are described accurately.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p56 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p57 | ## 4. महत्वपूर्ण सूत्र | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p58 | ### (क) द्रव्यमान से मोल निकालना | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p59 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p60 | \text{मोलों की संख्या} = \frac{\text{दिया गया द्रव्यमान (g)}}{\text{मोलर द्रव्यमान (g/mol)}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p61 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p62 | अथवा, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p63 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p64 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p65 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p66 | जहाँ:   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p67 | - \(n\) = मोलों की संख्या   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p68 | - \(m\) = द्रव्यमान   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p69 | - \(M\) = मोलर द्रव्यमान   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u8: Calculating moles from mass of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through calculating the number of moles in 36 g of water.

Accuracy: **accurate**. 36 g / (18 g/mol) = 2 mol; the calculation is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p70 | ### उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p71 | 36 g पानी में मोल कितने हैं? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p72 | पानी का मोलर द्रव्यमान = 18 g/mol | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p73 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p74 | n = \frac{36}{18} = 2\ \text{mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p75 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p76 | अर्थात 36 g पानी में 2 मोल पानी है। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u9: Formula: Number of particles from moles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula for finding the number of particles by multiplying moles by Avogadro's number.

Accuracy: **accurate**. Number of particles = moles * 6.022 * 10^23 is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p77 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p78 | ### (ख) मोल से कणों की संख्या निकालना | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p79 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p80 | \text{कणों की संख्या} = \text{मोल} \times 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p81 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u10: Calculating molecules in 2 moles of water (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through calculating the total number of water molecules in 2 moles of water.

Accuracy: **accurate**. 2 * 6.022 * 10^23 = 1.2044 * 10^24 molecules; calculation is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p82 | ### उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p83 | 2 मोल पानी में अणुओं की संख्या: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p84 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p85 | 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p87 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | = 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p90 | अर्थात 2 मोल पानी में \(1.2044 \times 10^{24}\) पानी के अणु होते हैं। | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u11: Formula: Moles from number of particles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula for finding number of moles by dividing particle count by Avogadro's number.

Accuracy: **accurate**. Moles = number of particles / (6.022 * 10^23) is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p91 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p92 | ### (ग) कणों की संख्या से मोल निकालना | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p93 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p94 | \text{मोल} = \frac{\text{कणों की संख्या}}{6.022 \times 10^{23}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p95 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u12: Calculating moles from count of oxygen molecules (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through determining moles when given 3.011 * 10^23 oxygen molecules.

Accuracy: **accurate**. (3.011 * 10^23) / (6.022 * 10^23) = 0.5 mol; calculation is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p96 | ### उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p97 | यदि किसी नमूने में \(3.011 \times 10^{23}\) ऑक्सीजन अणु हैं, तो मोल होंगे: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p98 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | \frac{3.011 \times 10^{23}}{6.022 \times 10^{23}} = 0.5\ \text{mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p100 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u13: Molar volume of gases at STP (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that at STP (0°C, 1 atm), 1 mole of an ideal gas occupies 22.4 L, and gives the formula to compute moles from volume.

Accuracy: **accurate**. Under standard high school chemistry definitions, STP (0°C, 1 atm) corresponds to a molar volume of 22.4 L/mol.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p101 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p102 | ## 5. गैसों के लिए मोल | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p103 | मानक ताप और दाब (STP: 0°C और 1 atm) पर: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p104 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p105 | 1\ \text{मोल गैस} = 22.4\ \text{लीटर} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p106 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p107 | इसलिए: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p108 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p109 | \text{मोल} = \frac{\text{गैस का आयतन (L)}}{22.4} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p110 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u14: Calculating moles from gas volume at STP (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through calculating moles in 44.8 L of oxygen gas at STP.

Accuracy: **accurate**. 44.8 L / (22.4 L/mol) = 2 mol; calculation is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p111 | ### उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p112 | STP पर 44.8 L ऑक्सीजन गैस में मोल कितने होंगे? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p113 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p114 | n = \frac{44.8}{22.4} = 2\ \text{mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p115 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u15: Conversion formulas reference table (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a comprehensive reference table of mole conversion formulas based on known and unknown quantities.

Accuracy: **accurate**. All formulas summarized in the table are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p116 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p117 | ## 6. एक उपयोगी सारणी | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p118 | &#124; क्या ज्ञात है? &#124; क्या निकालना है? &#124; सूत्र &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p119 | &#124;---&#124;---&#124;---&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p120 | &#124; द्रव्यमान &#124; मोल &#124; \(\frac{m}{M}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p121 | &#124; मोल &#124; द्रव्यमान &#124; \(n \times M\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p122 | &#124; मोल &#124; कणों की संख्या &#124; \(n \times 6.022 \times 10^{23}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p123 | &#124; कणों की संख्या &#124; मोल &#124; \(\frac{N}{6.022 \times 10^{23}}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p124 | &#124; गैस का आयतन (STP) &#124; मोल &#124; \(\frac{V}{22.4}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |

## u16: Key takeaways to remember (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists five essential summary points about the mole concept for quick revision.

Accuracy: **accurate**. The listed summary points correctly capture the core principles of the mole concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p125 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p126 | ## 7. याद रखने योग्य बातें | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p127 | 1. **1 मोल में हमेशा \(6.022 \times 10^{23}\) कण होते हैं।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p128 | 2. अलग-अलग पदार्थों के 1 मोल का द्रव्यमान अलग होता है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p129 | 3. 1 मोल कार्बन = 12 g, लेकिन 1 मोल पानी = 18 g। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p130 | 4. STP पर 1 मोल किसी भी आदर्श गैस का आयतन लगभग 22.4 L होता है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p131 | 5. मोल रासायनिक अभिक्रियाओं में पदार्थों की मात्रा की तुलना करने का सबसे महत्वपूर्ण तरीका है। | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

## u17: Summary example with CO2 and concluding remark (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a brief worked example showing the molar mass and particle count for 1 mole of carbon dioxide, concluding with a summary statement on the bridge between counting and mass.

Accuracy: **accurate**. Calculations for CO2 molar mass (12 + 32 = 44 g/mol) and particle equivalence are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p132 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p133 | ### छोटा उदाहरण: CO₂ का 1 मोल | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p134 | कार्बन डाइऑक्साइड का सूत्र: \(CO_2\) | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p135 | मोलर द्रव्यमान: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p136 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p137 | 12 + 2(16) = 44\ \text{g/mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p138 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p139 | अतः: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p140 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p141 | 1\ \text{मोल CO}_2 = 44\ \text{g CO}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p142 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p143 | और इसमें: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p144 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p145 | 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p146 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p147 | CO₂ अणु होंगे। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p148 | संक्षेप में, **मोल पदार्थ की “गिनती” और “द्रव्यमान” के बीच पुल का काम करता है।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

