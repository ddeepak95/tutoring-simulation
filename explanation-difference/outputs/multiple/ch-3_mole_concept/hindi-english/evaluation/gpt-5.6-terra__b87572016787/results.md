# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **Hindi**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response is dedicated to explaining the mole concept in Hindi, covering fundamental definitions, counting analogies, molar mass, calculation formulas, molar volume at STP, stoichiometry, and practical examples.

## Counts

```json
{
  "total_content_units": 24,
  "substantive_content_units": 24,
  "total_passages": 236,
  "content_unit_kinds": {
    "CONCEPT": 11,
    "ANALOGY": 1,
    "EXAMPLE": 7,
    "CAVEAT": 2,
    "STUDY_SUPPORT": 3
  },
  "nested_passages": 236,
  "unique_subtopics": 9,
  "contextualization": {
    "none": 22,
    "everyday": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 24
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Need for the mole unit in chemistry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why the mole unit is necessary because particles like atoms, molecules, and ions are too small to count individually.

Accuracy: **accurate**. The explanation accurately conveys why chemists use a macroscopic counting unit for submicroscopic particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## मोल कॉन्सेप्ट (Mole Concept) क्या है? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | रसायन विज्ञान में पदार्थ की मात्रा बहुत छोटे कणों—जैसे परमाणु, अणु और आयन—के रूप में होती है। ये कण इतने छोटे होते हैं कि इन्हें एक-एक करके गिनना संभव नहीं है। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | इसलिए वैज्ञानिकों ने कणों को गिनने के लिए एक विशेष इकाई बनाई: **मोल (mole)**। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Dozen and score analogy for the mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "- 1 दर्जन = 12 वस्तुएँ  "}, {"passage_id": "p7", "quote": "- 1 स्कोर = 20 वस्तुएँ  "}]}

Annotation rationale: Compares the mole to everyday counting units like a dozen (12) and a score (20) to illustrate that it represents a fixed number of items.

Accuracy: **accurate**. The analogy correctly pairs dozen (12) and score (20) with the mole (6.022 x 10^23).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### सरल उदाहरण | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | जैसे: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p6 | - 1 दर्जन = 12 वस्तुएँ   | ANALOGY | {} | [&#x27;list&#x27;] |
| p7 | - 1 स्कोर = 20 वस्तुएँ   | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | - उसी प्रकार **1 मोल = \(6.022 \times 10^{23}\) कण** | ANALOGY | {} | [&#x27;list&#x27;] |

## u3: Avogadro's number and particle representations (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces Avogadro's number (N_A = 6.022 x 10^23) and illustrates how 1 mole represents this number of carbon atoms, water molecules, or sodium ions.

Accuracy: **accurate**. The value of Avogadro's number and the particle examples are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | इस संख्या को **एवोगैड्रो संख्या (Avogadro Number)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p11 | N_A = 6.022 \times 10^{23} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p12 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p13 | अर्थात: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | - 1 mol कार्बन परमाणु = \(6.022 \times 10^{23}\) कार्बन परमाणु   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p15 | - 1 mol पानी के अणु = \(6.022 \times 10^{23}\) पानी के अणु   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | - 1 mol सोडियम आयन = \(6.022 \times 10^{23}\) सोडियम आयन   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Formal definition of the mole (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines 1 mole as the amount of substance containing 6.022 x 10^23 particles (atoms, molecules, ions, electrons, etc.).

Accuracy: **accurate**. Accurately defines the mole based on particle count and clarifies the broad nature of eligible particles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | # 1. मोल की परिभाषा | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | **किसी पदार्थ की वह मात्रा जिसमें \(6.022 \times 10^{23}\) कण उपस्थित हों, उसे 1 मोल कहते हैं।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p20 | कण परमाणु, अणु, आयन, इलेक्ट्रॉन आदि कुछ भी हो सकते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Definition and units of molar mass (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines molar mass as the mass of 1 mole of a substance and gives its units (g mol^-1 or g/mol).

Accuracy: **accurate**. The definition of molar mass and its standard units (g/mol) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p22 | # 2. मोलर द्रव्यमान (Molar Mass) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p23 | **किसी पदार्थ के 1 मोल का द्रव्यमान मोलर द्रव्यमान कहलाता है।** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | इसकी इकाई होती है: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p25 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p26 | \text{g mol}^{-1} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p27 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p28 | या simply **g/mol** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u6: Molar mass calculation and atom count for carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through the atomic mass of carbon (12 u) to derive its molar mass (12 g/mol), 1 mole mass, and particle count.

Accuracy: **accurate**. The connection between atomic mass in unified atomic mass units (u) and molar mass in g/mol for carbon-12 is scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | ### उदाहरण: कार्बन | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | कार्बन का परमाणु द्रव्यमान = 12 u | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | इसलिए कार्बन का मोलर द्रव्यमान: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p33 | 12\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p35 | अर्थात: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p36 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p37 | 12\ g \text{ कार्बन} = 1\ mol \text{ कार्बन परमाणु} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p39 | और इसमें होंगे: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p40 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p41 | 6.022 \times 10^{23} \text{ परमाणु} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Formula for calculating moles from mass (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula n = m / M along with variable definitions.

Accuracy: **accurate**. The equation n = m/M and its associated units are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | # 3. मोल निकालने का सूत्र | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | यदि किसी पदार्थ का द्रव्यमान दिया हो, तो: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p46 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p47 | \boxed{\text{मोल की संख्या} = \frac{\text{दिया गया द्रव्यमान}}{\text{मोलर द्रव्यमान}}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p48 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p49 | अर्थात: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p50 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p51 | \boxed{n = \frac{m}{M}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p52 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p53 | जहाँ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p54 | - \(n\) = मोलों की संख्या   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p55 | - \(m\) = दिया गया द्रव्यमान (g में)   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p56 | - \(M\) = मोलर द्रव्यमान (g/mol में)   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p57 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Worked example: Moles in 18 g of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the molar mass of H2O (18 g/mol) and finds the number of moles in 18 g of water (1 mol).

Accuracy: **accurate**. The molar mass calculation of H2O (2*1 + 16 = 18 g/mol) and the mole calculation (18/18 = 1 mol) are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p58 | ## उदाहरण 1: 18 g पानी में कितने मोल हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p59 | पानी का सूत्र: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p60 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p61 | H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p62 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p63 | मोलर द्रव्यमान: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p64 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p65 | = 2(1) + 16 = 18\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p66 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p67 | अब, | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p68 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p69 | n = \frac{m}{M} = \frac{18}{18} = 1\ mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p70 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p71 | **उत्तर: 18 g पानी = 1 mol पानी** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p72 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Worked example: Moles in 44 g of carbon dioxide (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the molar mass of CO2 (44 g/mol) and determines the number of moles in 44 g of CO2 (1 mol).

Accuracy: **accurate**. The molar mass calculation of CO2 (12 + 2*16 = 44 g/mol) and mole calculation (44/44 = 1 mol) are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p73 | ## उदाहरण 2: 44 g कार्बन डाइऑक्साइड में कितने मोल हैं? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p74 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p75 | CO_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p76 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | मोलर द्रव्यमान: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p78 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | = 12 + 2(16) = 44\ g/mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p80 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | n = \frac{44}{44} = 1\ mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | **उत्तर: 44 g \(CO_2\) = 1 mol \(CO_2\)** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p85 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Formula relating moles and number of particles (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formula N = n * N_A relating the total number of particles to moles and Avogadro's number.

Accuracy: **accurate**. The formula N = n * N_A is correctly stated with its terms defined.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p86 | # 4. मोल और कणों की संख्या का संबंध | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p87 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p88 | \boxed{\text{कणों की संख्या} = \text{मोल} \times 6.022 \times 10^{23}} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p89 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p90 | या, | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p91 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p92 | \boxed{N = nN_A} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p93 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p94 | जहाँ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p95 | - \(N\) = कणों की संख्या   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p96 | - \(n\) = मोल   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p97 | - \(N_A\) = एवोगैड्रो संख्या   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p98 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Worked example: Number of molecules in 2 mol of oxygen (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates the number of O2 molecules in 2 moles using N = n * N_A, yielding 1.2044 x 10^24 molecules.

Accuracy: **accurate**. The calculation 2 * 6.022 x 10^23 = 1.2044 x 10^24 molecules is correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p99 | ## उदाहरण 3: 2 mol ऑक्सीजन अणुओं में कितने अणु होंगे? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p100 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p101 | N = nN_A | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p102 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p103 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | N = 2 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p105 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p107 | N = 1.2044 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p109 | **उत्तर: \(1.2044 \times 10^{24}\) ऑक्सीजन अणु** | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u12: Molecules versus atoms distinction in diatomic oxygen (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies that for O2, the calculated particles represent molecules rather than individual atoms.

Accuracy: **accurate**. The distinction between O2 molecules and O atoms is essential and correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p110 | ध्यान दें: यदि पदार्थ \(O_2\) है, तो ये **अणु** हैं, परमाणु नहीं। | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p111 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Roadmap and formula summary connecting mass, moles, and particles (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a visual conversion diagram and consolidated list of formulas connecting mass, moles, and particles.

Accuracy: **accurate**. All formulas and the conversion path between mass, moles, and particles are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p112 | # 5. मोल, द्रव्यमान और कण: मुख्य संबंध | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p113 | इसे ऐसे याद रखें: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p114 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p115 | \text{Mass (g)} \xleftrightarrow{\div/\times \text{ molar mass}} \text{Moles} \xleftrightarrow{\times/\div N_A} \text{Particles} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p116 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p117 | ### सूत्रों का सार | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p118 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p119 | \boxed{n = \frac{m}{M}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p120 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p121 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p122 | \boxed{m = n \times M} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p123 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p124 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p125 | \boxed{N = n \times N_A} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p126 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p127 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p128 | \boxed{n = \frac{N}{N_A}} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p129 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p130 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Molar volume of gases at STP (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains that at STP (0°C, 1 atm), 1 mole of any ideal gas occupies 22.4 L, defining molar volume and the formula n = V / 22.4.

Accuracy: **accurate**. The traditional standard temperature and pressure (0 °C, 1 atm) and standard molar volume of 22.4 L/mol are standard high school chemistry conventions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p131 | # 6. गैसों के लिए मोल कॉन्सेप्ट | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p132 | मानक ताप और दाब (STP: \(0^\circ C\), 1 atm) पर: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p133 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p134 | \boxed{1\ mol \text{ गैस} = 22.4\ L} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p135 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p136 | इसे **मोलर आयतन (Molar Volume)** कहते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p137 | अतः: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p138 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p139 | \boxed{n = \frac{\text{गैस का आयतन}}{22.4}} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p140 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |

## u15: Applicability limitation of 22.4 L molar volume (CAVEAT)

Attributes: {"subtype": "limitation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Highlights that the molar volume formula n = V / 22.4 applies specifically at STP conditions.

Accuracy: **accurate**. Correctly notes that the formula is limited to STP conditions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p141 | &gt; यह सूत्र सामान्यतः STP पर ही उपयोग किया जाता है। | CAVEAT | {&#x27;subtype&#x27;: &#x27;limitation&#x27;} | [&#x27;prose&#x27;] |
| p142 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Worked example: Moles and molecules in 11.2 L of O2 at STP (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Calculates moles from 11.2 L of O2 at STP (0.5 mol) and then finds the number of O2 molecules (3.011 x 10^23).

Accuracy: **accurate**. Calculations n = 11.2 / 22.4 = 0.5 mol and N = 0.5 * 6.022 x 10^23 = 3.011 x 10^23 molecules are exact.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p143 | ## उदाहरण 4: STP पर 11.2 L ऑक्सीजन गैस के कितने मोल होंगे? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p144 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p145 | n = \frac{V}{22.4} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p146 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p147 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p148 | n = \frac{11.2}{22.4} = 0.5\ mol | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p149 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p150 | **उत्तर: 0.5 mol \(O_2\)** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p151 | अब अणुओं की संख्या: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p152 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p153 | N = 0.5 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p154 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p155 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p156 | N = 3.011 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p157 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p158 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u17: Concept and mole context of an atom (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines an atom as the smallest particle of an element and specifies that 1 mol of He contains 6.022 x 10^23 helium atoms.

Accuracy: **accurate**. The definition of an atom and the helium example are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p159 | # 7. परमाणु, अणु और आयन में अंतर | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p160 | ### (i) परमाणु (Atom) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p161 | एक तत्व का सबसे छोटा कण। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p162 | उदाहरण: He, Na, C | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p163 | - 1 mol He = \(6.022 \times 10^{23}\) हीलियम परमाणु | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u18: Concept and mole context of a molecule (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines a molecule as composed of two or more atoms and specifies that 1 mol of H2O contains 6.022 x 10^23 water molecules.

Accuracy: **accurate**. The definition of a molecule and the H2O example are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p164 | ### (ii) अणु (Molecule) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p165 | दो या अधिक परमाणुओं से बना कण। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p166 | उदाहरण: \(H_2\), \(O_2\), \(H_2O\), \(CO_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p167 | - 1 mol \(H_2O\) = \(6.022 \times 10^{23}\) पानी के अणु | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u19: Concept and mole context of an ion (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines an ion as a charged particle and specifies that 1 mol of Na+ contains 6.022 x 10^23 sodium ions.

Accuracy: **accurate**. The definition of an ion and the Na+ example are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p168 | ### (iii) आयन (Ion) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p169 | आवेशित कण। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p170 | उदाहरण: \(Na^+\), \(Cl^-\), \(SO_4^{2-}\) | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p171 | - 1 mol \(Na^+\) = \(6.022 \times 10^{23}\) सोडियम आयन | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p172 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u20: Worked example: Number of constituent atoms in 1 mol of water (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Analyzes the atomic composition of 1 mol of H2O to calculate moles of H (2 mol), moles of O (1 mol), total moles of atoms (3 mol), and total atom count (1.8066 x 10^24 atoms).

Accuracy: **accurate**. The stoichiometric breakdown of 1 mol of H2O into 2 mol of H atoms and 1 mol of O atoms, giving 3 mol of atoms (1.8066 x 10^24), is fully correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p173 | # 8. बहुत महत्वपूर्ण उदाहरण: पानी में परमाणुओं की संख्या | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p174 | मान लीजिए आपके पास 1 mol पानी है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p175 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p176 | 1\ mol\ H_2O = 6.022 \times 10^{23} \text{ पानी के अणु} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p177 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p178 | हर एक पानी के अणु में: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p179 | - 2 हाइड्रोजन परमाणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p180 | - 1 ऑक्सीजन परमाणु | EXAMPLE | {} | [&#x27;list&#x27;] |
| p181 | इसलिए 1 mol पानी में: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p182 | ### हाइड्रोजन परमाणुओं के मोल | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p183 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p184 | 2\ mol \text{ H atoms} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p185 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p186 | ### ऑक्सीजन परमाणुओं के मोल | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p187 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p188 | 1\ mol \text{ O atoms} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p189 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p190 | ### कुल परमाणु | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p191 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p192 | 3\ mol \text{ atoms} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p193 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p194 | अर्थात कुल परमाणुओं की संख्या: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p195 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p196 | 3 \times 6.022 \times 10^{23} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p197 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p198 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p199 | = 1.8066 \times 10^{24} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p200 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p201 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u21: Coefficients in chemical equations as mole ratios (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States that stoichiometric coefficients in a chemical equation represent the mole ratio of reactants and products.

Accuracy: **accurate**. Correctly states that chemical equation coefficients denote mole ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p202 | # 9. रासायनिक समीकरण में मोल का उपयोग | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p203 | रासायनिक समीकरण में गुणांक (coefficients) पदार्थों के **मोल अनुपात** बताते हैं। | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u22: Worked example: Stoichiometric mass and mole relationships in water formation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies stoichiometric mole ratios to 2H2 + O2 -> 2H2O, translates them into mass (4g + 32g -> 36g), and verifies the law of conservation of mass.

Accuracy: **accurate**. Molar masses, mass conversions (4 g H2, 32 g O2, 36 g H2O), and conservation of mass are all accurately represented.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p204 | उदाहरण: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p205 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p206 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p207 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p208 | इसका अर्थ है: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p209 | - 2 mol \(H_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p210 | - 1 mol \(O_2\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p211 | - मिलकर 2 mol \(H_2O\) बनाते हैं। | EXAMPLE | {} | [&#x27;list&#x27;] |
| p212 | द्रव्यमान के रूप में: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p213 | - \(2 mol H_2 = 2 \times 2 = 4 g\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p214 | - \(1 mol O_2 = 32 g\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p215 | - \(2 mol H_2O = 2 \times 18 = 36 g\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p216 | अर्थात: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p217 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p218 | 4g\ H_2 + 32g\ O_2 \rightarrow 36g\ H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p219 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p220 | यह **द्रव्यमान संरक्षण के नियम** को भी दिखाता है। | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p221 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u23: Summary table of mole concept formulas (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a structured table summarizing the formulas for calculating moles from mass, particles, and gas volume at STP.

Accuracy: **accurate**. All equations in the quick summary table and the Avogadro constant value are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p222 | # जल्दी याद करने के लिए सारांश | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p223 | &#124; Quantity &#124; Formula &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p224 | &#124;---&#124;---&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p225 | &#124; मोल ज्ञात करने के लिए &#124; \(\displaystyle n=\frac{m}{M}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p226 | &#124; द्रव्यमान ज्ञात करने के लिए &#124; \(\displaystyle m=nM\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p227 | &#124; कणों की संख्या &#124; \(\displaystyle N=nN_A\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p228 | &#124; मोल ज्ञात करने के लिए (कणों से) &#124; \(\displaystyle n=\frac{N}{N_A}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p229 | &#124; STP पर गैस के मोल &#124; \(\displaystyle n=\frac{V}{22.4}\) &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p230 | जहाँ: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p231 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p232 | N_A = 6.022 \times 10^{23} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p233 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p234 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u24: One-line takeaway summary of the mole concept (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p236", "quote": "**मोल पदार्थ की मात्रा बताने की इकाई है, जैसे दर्जन वस्तुओं की संख्या बताता है; लेकिन 1 मोल में \\(6.022 \\times 10^{23}\\) कण होते हैं।**"}]}

Annotation rationale: Concludes with a concise one-line summary defining the mole in terms of substance quantity compared to a dozen.

Accuracy: **accurate**. The one-line summary accurately captures the fundamental concept of the mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p235 | ## एक पंक्ति में मोल कॉन्सेप्ट | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p236 | **मोल पदार्थ की मात्रा बताने की इकाई है, जैसे दर्जन वस्तुओं की संख्या बताता है; लेकिन 1 मोल में \(6.022 \times 10^{23}\) कण होते हैं।** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

