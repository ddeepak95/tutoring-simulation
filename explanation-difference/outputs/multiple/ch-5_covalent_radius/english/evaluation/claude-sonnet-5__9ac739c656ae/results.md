# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly explains covalent radius, including its definition, formula, worked calculation examples, physical rationale, periodic trends, and key characteristics.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 26,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 26,
  "unique_subtopics": 4,
  "contextualization": {
    "none": 6
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines covalent radius as half the internuclear distance between identical atoms joined by a single covalent bond and provides an explanation and formula for computing it.

Accuracy: **accurate**. The definition and calculation formula for covalent radius are standard and scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Covalent Radius | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Definition | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | **Covalent radius** is defined as **half the distance between the nuclei of two identical atoms that are joined together by a single covalent bond**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | ## A Simple Way to Picture It | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Imagine two identical atoms bonded together, like in a chlorine molecule (Cl–Cl). If you measure the distance between the centers (nuclei) of the two chlorine atoms, and then divide that distance by 2, you get the covalent radius of chlorine. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | $$\text{Covalent radius} = \frac{\text{Distance between nuclei of bonded atoms}}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u2: Calculating the covalent radius of chlorine (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a worked calculation of the covalent radius of chlorine from the experimental bond length of Cl2.

Accuracy: **accurate**. The Cl-Cl bond length (198 pm) and resulting covalent radius of Cl (99 pm) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | **Example:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | - The bond length in a Cl₂ molecule is 198 pm (picometers) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - Covalent radius of Cl = 198/2 = **99 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Physical rationale for the covalent radius concept (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why covalent radius is defined via internuclear distance rather than direct boundary measurement due to diffuse electron clouds.

Accuracy: **accurate**. Accurately explains that atoms lack sharp boundaries due to electron probability distributions, necessitating operational definitions of atomic size.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## Why Do We Need This Concept? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | Atoms don&#x27;t have a fixed, sharply defined boundary (electrons are spread out in probability clouds), so we can&#x27;t measure the &quot;size&quot; of an atom directly like we would measure a ball. Instead, scientists measure the distance between two bonded atoms and use that to define atomic size. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Periodic trends in covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the trends of covalent radius across periods and down groups in the periodic table along with physical explanations.

Accuracy: **accurate**. Periodic trends across periods (decrease due to increasing nuclear charge) and down groups (increase due to addition of shells) are accurately described.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ## Trends in the Periodic Table | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | Covalent radius follows predictable patterns: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | &#124; Direction &#124; Trend &#124; Reason &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;table&#x27;] |
| p15 | &#124;-----------&#124;-------&#124;--------&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;separator&#x27;, &#x27;table&#x27;] |
| p16 | &#124; **Across a period (left to right)** &#124; Decreases &#124; Nuclear charge increases, pulling electrons closer to the nucleus &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p17 | &#124; **Down a group (top to bottom)** &#124; Increases &#124; New electron shells are added, increasing the size &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |

## u5: Key points recap for covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes key properties, scope, units of measurement, and applications of covalent radius.

Accuracy: **accurate**. All summary points regarding covalent radius are factually accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ## Key Points to Remember | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | 1. It applies specifically to **covalently bonded** atoms (not ionic or metallic bonds) | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p20 | 2. It&#x27;s usually measured in **picometers (pm)** or **angstroms (Å)** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p21 | 3. It helps us compare and predict the relative sizes of atoms | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p22 | 4. It&#x27;s used to calculate bond lengths in different molecules | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |

## u6: Quick check practice question on bromine covalent radius (STUDY_SUPPORT)

Attributes: {"subtype": "practice_question"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a practice question calculating the covalent radius of bromine from Br2 bond length, along with the correct answer and a polite concluding offer.

Accuracy: **accurate**. The practice question givens and calculation (228 pm / 2 = 114 pm) are factually and mathematically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## Quick Check Question | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | If the bond length between two identical bromine atoms (Br–Br) is 228 pm, what is the covalent radius of bromine? | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p25 | *(Answer: 228 ÷ 2 = 114 pm)* | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;practice_question&#x27;} | [&#x27;prose&#x27;] |
| p26 | Would you like me to explain how this compares to other types of atomic radii, like ionic or metallic radius? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

