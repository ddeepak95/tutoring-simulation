# Nested content-unit annotation

Subject: **Chemistry**. English topic: **redox reactions**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and comprehensively explains redox reactions, covering definitions, mnemonics, worked chemical reactions, oxidizing and reducing agents, everyday applications, oxidation numbers, and synthesis summaries.

## Counts

```json
{
  "total_content_units": 14,
  "substantive_content_units": 14,
  "total_passages": 53,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 2,
    "EXAMPLE": 6
  },
  "nested_passages": 53,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 10,
    "everyday": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 14
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of Redox Reaction (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what redox stands for and introduces it as a chemical reaction involving electron transfer.

Accuracy: **accurate**. Correctly defines redox as short for reduction-oxidation and as reactions involving electron transfer.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Redox Reactions Explained | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## What Does &quot;Redox&quot; Mean? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **Redox** is short for **Red**uction-**Ox**idation. It&#x27;s a type of chemical reaction where **electrons are transferred** between substances. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Redox as a Trade Analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Uses a cross-domain comparison to a commercial trade to explain giving and receiving electrons.

Accuracy: **accurate**. Accurately represents the bilateral transfer of electrons between two participating substances.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | Think of it like a trade: one substance gives away electrons, and another substance receives them. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p5 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Oxidation and Reduction Definitions (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the two complementary components of redox: oxidation as loss of electrons and reduction as gain of electrons.

Accuracy: **accurate**. Standard definitions of oxidation and reduction in terms of electron transfer are completely correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## The Two Halves of Redox | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | ### 1. Oxidation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | - Definition: **Loss** of electrons | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p10 | ### 2. Reduction | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | - Definition: **Gain** of electrons | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u4: OIL RIG Mnemonic (STUDY_SUPPORT)

Attributes: {"subtype": "mnemonic"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the classic OIL, RIG, and combined OIL RIG mnemonics to aid student recall.

Accuracy: **accurate**. The OIL RIG mnemonic accurately maps to Oxidation Is Loss and Reduction Is Gain.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p9 | - Memory trick: **&quot;OIL&quot;** = **O**xidation **I**s **L**oss | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p12 | - Memory trick: **&quot;RIG&quot;** = **R**eduction **I**s **G**ain | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;list&#x27;] |
| p13 | **Combined memory trick: &quot;OIL RIG&quot;** 🛢️ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;mnemonic&#x27;} | [&#x27;prose&#x27;] |
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Zinc and Copper Redox Reaction (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a step-by-step worked example breaking down the zinc-copper displacement reaction into half-reactions, electron changes, and identifying the reducing and oxidizing agents.

Accuracy: **accurate**. The equation, half-reactions, electron bookkeeping, and identifications of Zn as oxidized/reducing agent and Cu2+ as reduced/oxidizing agent are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## A Simple Example | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | Consider this reaction: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | $$Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 | Let&#x27;s break it down: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p19 | &#124; Substance &#124; What Happens &#124; Electrons &#124; Term &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p20 | &#124;-----------&#124;--------------&#124;-----------&#124;------&#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p21 | &#124; Zn → Zn²⁺ &#124; Loses 2 electrons &#124; Zn → Zn²⁺ + 2e⁻ &#124; **Oxidized** &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p22 | &#124; Cu²⁺ → Cu &#124; Gains 2 electrons &#124; Cu²⁺ + 2e⁻ → Cu &#124; **Reduced** &#124; | EXAMPLE | {} | [&#x27;table&#x27;] |
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p26 |   - In our example: Cu²⁺ is the oxidizing agent | EXAMPLE | {} | [&#x27;list&#x27;] |
| p28 |   - In our example: Zn is the reducing agent | EXAMPLE | {} | [&#x27;list&#x27;] |

## u6: Oxidizing and Reducing Agents (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines oxidizing agents and reducing agents and explains their reciprocal roles in electron transfer.

Accuracy: **accurate**. Correctly defines oxidizing agents as electron acceptors that become reduced, and reducing agents as electron donors that become oxidized.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ## Key Vocabulary | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | - **Oxidizing Agent**: The substance that *causes* oxidation by *accepting* electrons (it gets reduced itself) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p27 | - **Reducing Agent**: The substance that *causes* reduction by *donating* electrons (it gets oxidized itself) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p29 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Batteries Application (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p32", "quote": "- 🔋 **Batteries** (electron transfer creates electrical energy)"}]}

Annotation rationale: Illustrates redox reactions using batteries converting electron transfer into electrical energy.

Accuracy: **accurate**. Accurately connects electrochemical batteries to electron transfer reactions generating electrical energy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | ## Why Does This Matter? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | Redox reactions are everywhere in daily life: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | - 🔋 **Batteries** (electron transfer creates electrical energy) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u8: Combustion Application (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p33", "quote": "- 🔥 **Combustion** (burning fuel, like wood or gasoline)"}]}

Annotation rationale: Illustrates redox via fuel combustion like burning wood or gasoline.

Accuracy: **accurate**. Combustion of fuels is an accurate real-world example of redox reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | - 🔥 **Combustion** (burning fuel, like wood or gasoline) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u9: Metabolism Application (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p34", "quote": "- 🍎 **Metabolism** (your body breaking down food for energy)"}]}

Annotation rationale: Illustrates redox through metabolic breakdown of food in the body.

Accuracy: **accurate**. Cellular respiration and nutrient breakdown in metabolism are classic biological redox processes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | - 🍎 **Metabolism** (your body breaking down food for energy) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u10: Rusting Application (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p35", "quote": "- 🚗 **Rusting** (iron reacting with oxygen)"}]}

Annotation rationale: Illustrates redox with the oxidation of iron to form rust.

Accuracy: **accurate**. Rusting of iron via reaction with oxygen is a standard everyday redox reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | - 🚗 **Rusting** (iron reacting with oxygen) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u11: Oxidation Numbers and Redox Rules (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how changes in oxidation states/numbers indicate whether a substance is oxidized or reduced.

Accuracy: **accurate**. Accurately relates an increase in oxidation number to oxidation and a decrease to reduction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ## Quick Check: Oxidation Numbers | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | Another way to spot redox reactions is by tracking **oxidation numbers** (also called oxidation states): | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p39 | - If an element&#x27;s oxidation number **increases** → it&#x27;s **oxidized** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | - If an element&#x27;s oxidation number **decreases** → it&#x27;s **reduced** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u12: Sodium and Chlorine Reaction Example (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates tracking oxidation numbers in the reaction of sodium with chlorine to form sodium chloride.

Accuracy: **accurate**. The oxidation numbers (Na: 0 to +1, Cl: 0 to -1) and their assignments as oxidized and reduced are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p41 | **Example:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p42 | $$2Na + Cl_2 \rightarrow 2NaCl$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p43 | - Na: 0 → +1 (increased) → **oxidized** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p44 | - Cl: 0 → −1 (decreased) → **reduced** | EXAMPLE | {} | [&#x27;list&#x27;] |
| p45 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Redox Summary Table (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key attributes of oxidation and reduction, including electron change, oxidation number change, and role.

Accuracy: **accurate**. The table correctly synthesizes all core relationships across terms, electron transfers, oxidation numbers, and agent roles.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | ## Summary Table | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | &#124; Term &#124; Electron Change &#124; Oxidation Number &#124; Role &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p48 | &#124;------&#124;-----------------&#124;-------------------&#124;------&#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p49 | &#124; Oxidation &#124; Loses electrons &#124; Increases &#124; Reducing agent gets oxidized &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p50 | &#124; Reduction &#124; Gains electrons &#124; Decreases &#124; Oxidizing agent gets reduced &#124; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;table&#x27;] |
| p51 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Coupled Nature of Redox Reactions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the fundamental principle that oxidation and reduction must occur simultaneously.

Accuracy: **accurate**. Accurately highlights that electron conservation requires oxidation and reduction to take place together in every redox reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p52 | **Remember:** In every redox reaction, oxidation and reduction happen **together**—you can&#x27;t have one without the other, just like you can&#x27;t have a trade with only one person! 🤝 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p53 | Would you like me to walk through a practice problem to test your understanding? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

