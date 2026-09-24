# Nested content-unit annotation

Subject: **Chemistry**. English topic: **redox reactions**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive explanation of redox reactions, detailing the definitions of oxidation and reduction via electron transfer, half-equations, oxidising and reducing agents, oxidation numbers, real-world occurrences, and procedural identification.

## Counts

```json
{
  "total_content_units": 16,
  "substantive_content_units": 16,
  "total_passages": 143,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "STUDY_SUPPORT": 3,
    "EXAMPLE": 7,
    "PROCEDURE": 1
  },
  "nested_passages": 143,
  "unique_subtopics": 9,
  "contextualization": {
    "none": 16
  },
  "proposed_substantive_verdicts": {
    "accurate": 16
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and coupled nature of redox reactions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines redox reactions as electron transfer processes and explains that reduction and oxidation are mutually coupled.

Accuracy: **accurate**. The definition of redox reactions and the coupling of oxidation and reduction are scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | A **redox reaction** is a chemical reaction in which **electrons are transferred** between substances. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | The word **redox** combines: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | - **Red**uction | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | - **Ox**idation | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | These two processes always happen together: if one substance loses electrons, another substance must gain them. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: OIL RIG mnemonic (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the standard mnemonic phrase OIL RIG to help students remember electron loss and gain.

Accuracy: **accurate**. The mnemonic accurately maps Oxidation Is Loss and Reduction Is Gain.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ## 1. Oxidation and reduction | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | A useful memory phrase is: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p9 | &gt; **OIL RIG**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p10 | &gt; **O**xidation **I**s **L**oss of electrons   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p11 | &gt; **R**eduction **I**s **G**ain of electrons | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

## u3: Definitions of oxidation and reduction with electron transfer (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the electronic definition of oxidation (loss of electrons, becoming more positive) and reduction (gain of electrons, becoming more negative).

Accuracy: **accurate**. The explanation of oxidation and reduction in terms of electron loss and gain, accompanied by elemental half-equations, is factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### Oxidation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | When a particle **loses electrons**, it becomes more positive. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p15 | \text{Mg} \rightarrow \text{Mg}^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p17 | Magnesium loses two electrons, so magnesium is **oxidised**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | ### Reduction | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | When a particle **gains electrons**, it becomes more negative. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p21 | \text{O} + 2e^- \rightarrow \text{O}^{2-} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p22 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p23 | Oxygen gains electrons, so oxygen is **reduced**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Worked example: Magnesium burning in oxygen and identifying agents (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies redox concepts to the reaction of magnesium burning in oxygen, detailing the overall reaction, half-equations, and subsequent identification of the oxidising and reducing agents.

Accuracy: **accurate**. The balanced chemical equations, half-equations, electron counts, and agent assignments for the reaction between magnesium and oxygen are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ## 2. Example: magnesium burning in oxygen | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | When magnesium burns, it reacts with oxygen to make magnesium oxide: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p28 | 2Mg + O_2 \rightarrow 2MgO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p30 | What happens to the electrons? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p31 | - Magnesium starts as neutral Mg and becomes \(Mg^{2+}\). It **loses electrons**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p32 | - Oxygen starts in \(O_2\) and becomes \(O^{2-}\). It **gains electrons**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p33 | So: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p34 | - **Magnesium is oxidised** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p35 | - **Oxygen is reduced** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p36 | The ionic changes can be shown as half-equations: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p37 | ### Oxidation half-equation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p39 | Mg \rightarrow Mg^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p40 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p41 | ### Reduction half-equation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p42 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p43 | O_2 + 4e^- \rightarrow 2O^{2-} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p44 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p45 | The electrons lost by magnesium are exactly the electrons gained by oxygen. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p46 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p58 | In the magnesium reaction, magnesium is the reducing agent because it gives electrons to oxygen. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p59 | &#124; Substance &#124; What it does &#124; Name &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p60 | &#124;---&#124;---&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p61 | &#124; Magnesium &#124; Loses electrons; is oxidised &#124; Reducing agent &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p62 | &#124; Oxygen &#124; Gains electrons; is reduced &#124; Oxidising agent &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p63 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Definitions of oxidising and reducing agents (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what oxidising and reducing agents are and explains their actions in terms of accepting or donating electrons.

Accuracy: **accurate**. The definitions correctly identify oxidising agents as electron acceptors that become reduced, and reducing agents as electron donors that become oxidised.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ## 3. Oxidising agents and reducing agents | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | In redox reactions, substances can cause oxidation or reduction. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p49 | ### Oxidising agent | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | An **oxidising agent** causes another substance to be oxidised. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p51 | - It **accepts electrons** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p52 | - Therefore, it is **reduced** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p53 | For example, oxygen often acts as an oxidising agent because it takes electrons from other substances. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p54 | ### Reducing agent | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | A **reducing agent** causes another substance to be reduced. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p56 | - It **donates electrons** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p57 | - Therefore, it is **oxidised** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Oxidation numbers and rules for redox tracking (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines oxidation numbers and states the fundamental rule relating increases or decreases in oxidation number to oxidation and reduction.

Accuracy: **accurate**. The explanation of oxidation numbers and the rules that an increase corresponds to oxidation and a decrease to reduction are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p64 | ## 4. Oxidation numbers | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p65 | Sometimes electrons are not written in an equation. Instead, you can identify redox reactions by looking at **oxidation numbers**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p66 | An oxidation number is a number that helps show how many electrons an atom has effectively lost or gained. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p67 | ### Key rule | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p68 | - **Oxidation number increases** → oxidation | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p69 | - **Oxidation number decreases** → reduction | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u7: Worked example: Displacement of copper(II) by zinc (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a fully worked example tracking oxidation numbers and identifying agents in the reaction of zinc with copper(II) sulfate.

Accuracy: **accurate**. The full equation, net ionic equation, half-equations, oxidation state changes, and identification of Zn as reducing agent and Cu2+ as oxidising agent are all correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p70 | Example: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p71 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p72 | Zn + CuSO_4 \rightarrow ZnSO_4 + Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p74 | We can focus on zinc and copper: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p75 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p76 | Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p78 | &#124; Element &#124; Before reaction &#124; After reaction &#124; Change &#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p79 | &#124;---&#124;---:&#124;---:&#124;---&#124; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;table&#x27;] |
| p80 | &#124; Zinc &#124; 0 &#124; +2 &#124; Oxidised &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p81 | &#124; Copper &#124; +2 &#124; 0 &#124; Reduced &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p82 | Zinc loses two electrons: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p83 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p84 | Zn \rightarrow Zn^{2+} + 2e^- | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p85 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p86 | Copper ions gain them: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p87 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p88 | Cu^{2+} + 2e^- \rightarrow Cu | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p89 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p90 | Therefore: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p91 | - Zinc is oxidised and is the **reducing agent** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p92 | - Copper(II) ions are reduced and are the **oxidising agent** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p93 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Historical versus modern definition of oxidation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Contrasts the historical oxygen-gain definition of oxidation with the modern, broader electron-transfer definition.

Accuracy: **accurate**. Accurately represents the historical context of oxidation as oxygen addition and clarifies that the electron-transfer definition is more comprehensive.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p94 | ## 5. Another way to think about oxidation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p95 | Historically, oxidation meant “adding oxygen.” For example: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p96 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p97 | 2Cu + O_2 \rightarrow 2CuO | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p98 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p99 | Copper gains oxygen, so it is oxidised. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p100 | However, the modern and more complete definition is based on electrons: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p101 | &gt; **Oxidation is loss of electrons.**   | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p102 | &gt; **Reduction is gain of electrons.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p103 | This definition works even when oxygen is not involved. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p104 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Real-world example: Rusting (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates redox using the formation of rust from iron, oxygen, and water.

Accuracy: **accurate**. Correctly states that rusting involves iron reacting with oxygen and water, with iron losing electrons (oxidised).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p105 | ## 6. Common real-life redox reactions | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p106 | ### Rusting | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p107 | Iron reacts with oxygen and water to form rust. Iron loses electrons, so it is oxidised. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u10: Real-world example: Combustion (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates redox using the combustion of fuel such as methane.

Accuracy: **accurate**. Accurately identifies fuel combustion as a redox reaction where fuel is oxidised and oxygen is reduced.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p108 | ### Combustion | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p109 | Burning fuels, such as methane, is a redox reaction. The fuel is oxidised and oxygen is reduced. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u11: Real-world example: Batteries (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates redox by explaining electrical generation via electron flow in battery circuits.

Accuracy: **accurate**. Correctly explains that batteries produce electric current through redox reactions by moving electrons through an external circuit.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p110 | ### Batteries | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p111 | Batteries produce electricity through redox reactions. Electrons move through a circuit from the substance being oxidised to the substance being reduced. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u12: Real-world example: Cellular respiration (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates redox using biological respiration where glucose is oxidised and oxygen is reduced.

Accuracy: **accurate**. Correctly presents cellular respiration as an oxidation of glucose coupled with the reduction of oxygen.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p112 | ### Respiration | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p113 | In living cells, glucose is oxidised and oxygen is reduced to release energy: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p114 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p115 | \text{glucose} + O_2 \rightarrow CO_2 + H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p116 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p117 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Procedure to identify a redox reaction (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Outlines a step-by-step general method for determining whether a chemical reaction is redox using oxidation numbers.

Accuracy: **accurate**. The procedural steps for identifying redox reactions through changes in oxidation numbers are correct and logical.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p118 | ## 7. How to identify a redox reaction | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p119 | To decide whether a reaction is redox: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p120 | 1. Find the oxidation numbers of important elements before and after the reaction. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p121 | 2. Look for an increase in oxidation number: this is oxidation. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p122 | 3. Look for a decrease in oxidation number: this is reduction. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p123 | 4. Remember that both must happen in the same reaction. | PROCEDURE | {} | [&#x27;list&#x27;] |

## u14: Worked example: Identifying redox in sodium reacting with chlorine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the identification procedure to 2Na + Cl2 -> 2NaCl by analyzing changes in oxidation states.

Accuracy: **accurate**. The oxidation numbers and corresponding redox deductions for sodium (0 to +1) and chlorine (0 to -1) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p124 | For example: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p125 | \[ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p126 | 2Na + Cl_2 \rightarrow 2NaCl | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p127 | \] | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;equation&#x27;] |
| p128 | - Sodium: \(0 \rightarrow +1\), so it is oxidised. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p129 | - Chlorine: \(0 \rightarrow -1\), so it is reduced. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p130 | This is a redox reaction. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p131 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u15: Summary of key redox takeaways (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recapitulates the central ideas of redox, electron movement, oxidation numbers, and agents.

Accuracy: **accurate**. All summary points accurately summarize the key chemical principles taught in the text.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p132 | ## Key summary | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p133 | - **Redox reactions involve electron transfer.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p134 | - **Oxidation = loss of electrons.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p135 | - **Reduction = gain of electrons.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p136 | - **Oxidation number goes up during oxidation.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p137 | - **Oxidation number goes down during reduction.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p138 | - The **oxidising agent** gains electrons and is reduced. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p139 | - The **reducing agent** loses electrons and is oxidised. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

## u16: LEO says GER mnemonic (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the alternative mnemonic LEO says GER for remembering electron loss and gain.

Accuracy: **accurate**. The mnemonic accurately matches Lose Electrons = Oxidation and Gain Electrons = Reduction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p140 | A final memory aid: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p141 | &gt; **LEO says GER**   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p142 | &gt; **L**ose **E**lectrons = **O**xidation   | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p143 | &gt; **G**ain **E**lectrons = **R**eduction | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |

