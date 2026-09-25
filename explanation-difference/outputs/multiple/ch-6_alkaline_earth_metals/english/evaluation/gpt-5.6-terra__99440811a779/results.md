# Nested content-unit annotation

Subject: **Chemistry**. English topic: **alkaline earth metals**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains the alkaline earth metals (Group 2), covering their identities, electron arrangement, general properties, reactivity trends, chemical reactions, significant compounds, flame test colours, anomalous behavior, and everyday applications.

## Counts

```json
{
  "total_content_units": 21,
  "substantive_content_units": 21,
  "total_passages": 127,
  "content_unit_kinds": {
    "CONCEPT": 13,
    "CAVEAT": 2,
    "EXAMPLE": 5,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 127,
  "unique_subtopics": 11,
  "contextualization": {
    "none": 13,
    "everyday": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 21
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Group 2 definition and members (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the alkaline earth metals as Group 2 elements and enumerates the individual members of the group.

Accuracy: **accurate**. Correctly specifies Group 2 location and lists the six alkaline earth metals from beryllium to radium.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | ## Alkaline Earth Metals | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | **Alkaline earth metals** are a group of elements in the periodic table. They are found in **Group 2**, the second column from the left. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | The alkaline earth metals are: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | &#124; Symbol &#124; Element &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p5 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p6 | &#124; Be &#124; Beryllium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p7 | &#124; Mg &#124; Magnesium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p8 | &#124; Ca &#124; Calcium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p9 | &#124; Sr &#124; Strontium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p10 | &#124; Ba &#124; Barium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p11 | &#124; Ra &#124; Radium &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p12 | Radium is radioactive and rare, so it is less commonly studied in school chemistry. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Origin of the name alkaline earth metals (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the etymological and chemical origin of 'alkaline' and 'earth' in the group name.

Accuracy: **accurate**. Accurately describes how basic oxide/hydroxide solutions relate to 'alkaline' and historic mineral insolubility relates to 'earth'.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ## Why are they called “alkaline earth” metals? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | - **Alkaline**: Their oxides and hydroxides form basic, or alkaline, solutions in water. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p16 |   - Example: calcium oxide reacts with water to produce calcium hydroxide, which is alkaline. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | - **Earth**: Early scientists called substances that did not dissolve easily in water “earths.” Many compounds of these metals occur naturally in rocks and minerals. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Electron arrangement and divalent ion formation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how having two valence electrons leads to the loss of both electrons and the formation of 2+ cations.

Accuracy: **accurate**. Accurately represents the electron configurations (2,8,2 and 2,8,8,2) and the oxidation half-reaction forming 2+ ions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ## Electron Arrangement | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | All alkaline earth metals have **two electrons in their outer shell**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | For example: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | - Magnesium: 2,8,2   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 | - Calcium: 2,8,8,2   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 | Because they have two outer electrons, they usually lose both when reacting. They form ions with a **2+ charge**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p25 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p26 | \text{Mg} \rightarrow \text{Mg}^{2+} + 2e^- | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p27 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p28 | So their compounds often contain ions such as: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p29 | - Mg²⁺ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p30 | - Ca²⁺ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | - Ba²⁺ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p32 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: General physical and chemical properties (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists shared metallic characteristics, comparisons to Group 1, and explains why they do not occur uncombined in nature.

Accuracy: **accurate**. Correctly states physical properties (shiny, conductors, harder and denser than alkali metals) and chemical reactivity in nature.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ## General Physical Properties | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | Alkaline earth metals are: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p35 | - Shiny, silvery metals when freshly cut | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p36 | - Good conductors of heat and electricity | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p37 | - Usually harder and denser than Group 1 alkali metals | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 | - Reactive, although generally less reactive than Group 1 metals | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p39 | - Able to form positive ions easily | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | They are not found as pure metals in nature because they react with oxygen, water, and other substances. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p41 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Reactivity trend down Group 2 (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains atomic radius, nuclear shielding/distance, and ease of losing outer electrons to account for increasing reactivity down Group 2.

Accuracy: **accurate**. Accurately details the mechanistic reasons behind the downward increase in reactivity for alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | ## Reactivity Trend | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p43 | Reactivity generally **increases down Group 2**: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p44 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p45 | \text{Be} &lt; \text{Mg} &lt; \text{Ca} &lt; \text{Sr} &lt; \text{Ba} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p46 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p47 | This happens because, down the group: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p48 | 1. The atoms become larger. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p49 | 2. The outer electrons are further from the nucleus. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p50 | 3. The attraction between the nucleus and the outer electrons becomes weaker. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p51 | 4. The atoms lose their two outer electrons more easily. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p52 | Therefore, barium is more reactive than magnesium. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p53 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Reaction with oxygen (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formation of basic metal oxides when reacting with oxygen, illustrated by burning magnesium.

Accuracy: **accurate**. Correctly states that alkaline earth metals burn to form metal oxides, balances the equation 2Mg + O2 -> 2MgO, and notes lab safety.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p54 | ## Reactions of Alkaline Earth Metals | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p55 | ### 1. Reaction with Oxygen | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p56 | They react with oxygen to form metal oxides. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p57 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p58 | 2\text{Mg} + \text{O}_2 \rightarrow 2\text{MgO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p59 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p60 | Magnesium burns with a very bright white flame, producing magnesium oxide. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p61 | **Safety note:** Never look directly at burning magnesium because the light can damage your eyes. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p62 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Reaction with water (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the trend in reaction with water down Group 2 and shows the balanced reaction and products for calcium.

Accuracy: **accurate**. Accurately represents the increasing reactivity of Be through Ba with water, and provides the correct chemical equation and products for calcium.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p63 | ### 2. Reaction with Water | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p64 | The reactivity with water increases down the group. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p65 | - **Beryllium:** does not react easily with water. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p66 | - **Magnesium:** reacts very slowly with cold water, but reacts faster with steam. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p67 | - **Calcium:** reacts noticeably with cold water. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p68 | - **Strontium and barium:** react vigorously with water. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p69 | Example with calcium: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p70 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p71 | \text{Ca} + 2\text{H}_2\text{O} \rightarrow \text{Ca(OH)}_2 + \text{H}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p72 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p73 | This produces: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p74 | - Calcium hydroxide, an alkaline solution | EXAMPLE | {} | [&#x27;list&#x27;] |
| p75 | - Hydrogen gas | EXAMPLE | {} | [&#x27;list&#x27;] |
| p76 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u8: Reaction with acids (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the reaction of alkaline earth metals with acids to produce a salt and hydrogen gas, illustrated with magnesium and hydrochloric acid.

Accuracy: **accurate**. Accurately gives the general reaction with acid and provides a balanced equation for Mg + 2HCl -> MgCl2 + H2.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p77 | ### 3. Reaction with Acids | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p78 | They react with acids to form a salt and hydrogen gas. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p79 | For example: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p80 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p81 | \text{Mg} + 2\text{HCl} \rightarrow \text{MgCl}_2 + \text{H}_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | Magnesium reacts with hydrochloric acid to make magnesium chloride and hydrogen. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p84 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Magnesium oxide properties and uses (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p89", "quote": "Found in some antacids"}]}

Annotation rationale: Describes the physical appearance and applications of magnesium oxide.

Accuracy: **accurate**. Accurately lists properties of MgO (white solid, refractory, antacid component).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p85 | ## Important Compounds | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p86 | ### Magnesium Oxide, MgO | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p87 | - A white solid | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p88 | - Used in refractory materials that can withstand high temperatures | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p89 | - Found in some antacids | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u10: Calcium carbonate occurrences, uses, and reactions (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p91", "quote": "Found in limestone, marble, chalk, and seashells"}]}

Annotation rationale: Describes the natural occurrences, construction applications, and acid reaction of calcium carbonate.

Accuracy: **accurate**. Accurately identifies natural forms of CaCO3 and supplies a balanced reaction with HCl.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p90 | ### Calcium Carbonate, CaCO₃ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p91 | - Found in limestone, marble, chalk, and seashells | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p92 | - Used in cement and building materials | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p93 | - Reacts with acids to release carbon dioxide | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p94 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p95 | \text{CaCO}_3 + 2\text{HCl} \rightarrow \text{CaCl}_2 + \text{CO}_2 + \text{H}_2\text{O} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p96 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u11: Calcium hydroxide properties and uses (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the common name and uses of calcium hydroxide in soil treatment, water treatment, and construction.

Accuracy: **accurate**. Accurately identifies Ca(OH)2 as slaked lime and lists its standard agricultural and industrial applications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p97 | ### Calcium Hydroxide, Ca(OH)₂ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p98 | - Also called slaked lime | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p99 | - Used to neutralize acidic soils | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p100 | - Used in water treatment and construction | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u12: Magnesium sulfate properties and uses (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p102", "quote": "Commonly known as Epsom salt"}]}

Annotation rationale: Presents the common name and applications of magnesium sulfate.

Accuracy: **accurate**. Correctly links magnesium sulfate with Epsom salt and its medical/agricultural applications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p101 | ### Magnesium Sulfate, MgSO₄ | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p102 | - Commonly known as Epsom salt | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p103 | - Used in some medical and agricultural applications | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p104 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u13: Flame test colours of alkaline earth metals (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes characteristic flame emission colours for Group 2 cations.

Accuracy: **accurate**. Accurately matches Ca2+ (brick-red), Sr2+ (crimson red), Ba2+ (apple green), and Mg2+ (no distinctive flame colour).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p105 | ## Flame Colours | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p106 | Some alkaline earth metals give characteristic colours in flame tests: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p107 | &#124; Metal ion &#124; Flame colour &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p108 | &#124;---&#124;---&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p109 | &#124; Ca²⁺ &#124; Orange-red / brick-red &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p110 | &#124; Sr²⁺ &#124; Crimson red &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p111 | &#124; Ba²⁺ &#124; Apple green &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p112 | &#124; Mg²⁺ &#124; No distinctive flame colour &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p113 | These colours help scientists identify metal ions. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p114 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u14: Anomalous behavior of beryllium (CAVEAT)

Attributes: {"subtype": "exception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Identifies beryllium as an exception to the typical properties of Group 2 metals due to its covalent character and lower reactivity.

Accuracy: **accurate**. Accurately notes the anomalous covalent tendencies, smaller atomic size, and lower reactivity of beryllium compared to other alkaline earth metals.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p115 | ## Important Exceptions | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p116 | Although the elements are in the same group, **beryllium** behaves differently from the others. It is smaller, harder, and less reactive. Its compounds can have more covalent character rather than being purely ionic. | CAVEAT | {&#x27;subtype&#x27;: &#x27;exception&#x27;} | [&#x27;prose&#x27;] |

## u15: Qualification on magnesium reactivity with water (CAVEAT)

Attributes: {"subtype": "qualification"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Qualifies that magnesium reacts sluggishly with cold water in contrast to heavier Group 2 members.

Accuracy: **accurate**. Accurately contrasts the slow reaction of magnesium with cold water against calcium's easier reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p117 | Magnesium is also less reactive than calcium, strontium, and barium. For example, magnesium reacts slowly with cold water, while calcium reacts more easily. | CAVEAT | {&#x27;subtype&#x27;: &#x27;qualification&#x27;} | [&#x27;prose&#x27;] |
| p118 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u16: Magnesium in chlorophyll (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p120", "quote": "- **Magnesium** is important in chlorophyll, the green pigment used by plants in photosynthesis."}]}

Annotation rationale: Provides a real-world biological application of magnesium in plant photosynthesis.

Accuracy: **accurate**. Magnesium is indeed the central metal ion in the porphyrin ring of chlorophyll.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p119 | ## Everyday Importance | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p120 | - **Magnesium** is important in chlorophyll, the green pigment used by plants in photosynthesis. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u17: Calcium in human biology (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p121", "quote": "- **Calcium** is essential for bones, teeth, muscles, and blood clotting."}]}

Annotation rationale: Illustrates the essential biological functions of calcium in the human body.

Accuracy: **accurate**. Calcium is essential for structural integrity of bones and teeth, muscle contraction, and coagulation cascades.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p121 | - **Calcium** is essential for bones, teeth, muscles, and blood clotting. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u18: Strontium in fireworks (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p122", "quote": "- **Strontium** is used in fireworks to produce red colours."}]}

Annotation rationale: Illustrates the use of strontium compounds to create red pyrotechnic effects.

Accuracy: **accurate**. Strontium salts are standard pyrotechnic colorants for generating red flames.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p122 | - **Strontium** is used in fireworks to produce red colours. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u19: Barium in medical imaging and fireworks (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p123", "quote": "- **Barium** compounds are used in some medical imaging procedures and fireworks."}]}

Annotation rationale: Illustrates the practical applications of barium compounds in radiology and pyrotechnics.

Accuracy: **accurate**. Barium sulfate is commonly used as a radio-opaque contrast agent, and barium compounds are used for green fireworks.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p123 | - **Barium** compounds are used in some medical imaging procedures and fireworks. | EXAMPLE | {} | [&#x27;list&#x27;] |

## u20: Beryllium in aerospace and electronics (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p124", "quote": "- **Beryllium** is used in lightweight, strong materials for aircraft and electronics."}]}

Annotation rationale: Illustrates the specialized engineering applications of beryllium alloys.

Accuracy: **accurate**. Beryllium alloys (such as beryllium-copper) are widely valued in aerospace and electronics for high stiffness, low density, and thermal conductivity.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p124 | - **Beryllium** is used in lightweight, strong materials for aircraft and electronics. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p125 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u21: Summary of alkaline earth metals (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concluding recap of key concepts regarding alkaline earth metals.

Accuracy: **accurate**. Accurately synthesizes Group 2 valence, ion formation, reactivity trends, and major applications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p126 | ## Summary | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p127 | Alkaline earth metals are Group 2 metals with two outer-shell electrons. They form **2+ ions**, react to form alkaline oxides and hydroxides, and become more reactive down the group. Magnesium and calcium are especially important in everyday life, biology, industry, and construction. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

