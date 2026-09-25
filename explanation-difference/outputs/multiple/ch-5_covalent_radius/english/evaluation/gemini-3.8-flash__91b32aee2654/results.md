# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly addresses covalent radius, explaining why it is needed, how it is defined and calculated, an example with chlorine, an analogy, its periodic trends, and a summary.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 35,
  "content_unit_kinds": {
    "CONCEPT": 5,
    "EXAMPLE": 1,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 35,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 3,
    "none": 5
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Indeterminate atomic boundary and measurement challenge (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "Imagine trying to measure the exact size of a fluffy cloud or a cotton ball. It’s hard, right? There is no hard outer surface—just a fuzzy edge."}]}

Annotation rationale: Explains why measuring the size of an isolated atom directly is impossible due to the lack of a sharp boundary in the electron cloud, supported by the cloud/cotton ball analogy.

Accuracy: **accurate**. Accurately describes how the diffuse nature of the electron cloud prevents direct physical measurement of an individual atom's radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Hello! Welcome to chemistry class. Today, we’re going to tackle a concept that sounds fancy, but is actually very logical once you picture it: the **covalent radius**. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Let’s break it down step-by-step. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### The Problem: How do you measure an atom? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Imagine trying to measure the exact size of a fluffy cloud or a cotton ball. It’s hard, right? There is no hard outer surface—just a fuzzy edge.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | Atoms are the same way. An atom has a nucleus in the center, surrounded by a &quot;cloud&quot; of electrons. Because this cloud doesn&#x27;t have a sharp boundary, **you can&#x27;t just take a ruler and measure the radius from the center to the edge.** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Measuring internuclear distance via covalent bonding (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how forming a covalent bond locks identical atoms into a fixed, measurable distance that can be measured via X-ray technology.

Accuracy: **accurate**. Accurately explains that covalent bonding creates a fixed internuclear distance that can be experimentally measured using X-ray techniques.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### The Solution: Teamwork between atoms! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | To solve this, scientists wait until two identical atoms bond together by sharing electrons—which is called a **covalent bond**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p9 | When two identical atoms form a covalent bond, their electron clouds overlap, and their nuclei are locked at a stable, measurable distance from each other.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p10 | Scientists can easily measure the distance between the centers (the nuclei) of these two bonded atoms using X-ray technology.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Definition and formula of covalent radius (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the formal definition and equation for calculating the covalent radius as half the internuclear distance between bonded identical atoms.

Accuracy: **accurate**. The definition and formula accurately represent covalent radius for homonuclear single bonds.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### The Definition | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | &gt; **The covalent radius is simply half the distance between the nuclei of two identical atoms joined by a single covalent bond.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | Here is the simple formula: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p14 | $$\text{Covalent Radius} = \frac{\text{Distance between two nuclei}}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u4: Calculation of chlorine's covalent radius (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked calculation of the covalent radius of chlorine using the bond length in Cl2.

Accuracy: **accurate**. The internuclear distance of 198 pm in Cl2 and the resulting covalent radius of 99 pm are factually correct, and the arithmetic is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | * **Example:** In a chlorine molecule ($\text{Cl}_2$), the distance between the two chlorine nuclei is about **198 picometers** (pm).  | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | * To find the covalent radius of a single chlorine atom, just divide that by 2: | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 |   $$\frac{198}{2} = 99\text{ pm}$$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p18 | * So, the covalent radius of chlorine is **99 pm**. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Squished tennis balls analogy for covalent radius (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p19", "quote": "Think of it like two identical tennis balls squished slightly together. If you measure the distance from the center of Ball A to the center of Ball B and divide by two, you get the radius of one ball"}]}

Annotation rationale: Uses the analogy of two slightly squished tennis balls to explain taking half the center-to-center distance to find atomic radius.

Accuracy: **accurate**. The analogy accurately conveys the physical intuition of finding the radius from overlapping, identical contacting spheres.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | *(Think of it like two identical tennis balls squished slightly together. If you measure the distance from the center of Ball A to the center of Ball B and divide by two, you get the radius of one ball).* | ANALOGY | {} | [&#x27;prose&#x27;] |

## u6: Periodic trend: covalent radius down a group (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p24", "quote": "It’s like putting on another bulky winter jacket."}]}

Annotation rationale: Explains the trend that atoms get larger down a group due to the addition of principal energy shells.

Accuracy: **accurate**. Correctly states and explains the increase in atomic covalent radius down a periodic table group due to additional electron shells.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p21 | ### How does it change on the Periodic Table? (Trends to know for tests!) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | Your chemistry teacher will definitely ask you how covalent radius changes as you move across the periodic table. Here are the two rules: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p23 | #### 1. Going DOWN a group (column) $\downarrow$ $\rightarrow$ Atoms get BIGGER. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | * **Why?** Every time you move down a row, you are adding a completely new **energy level (shell)** of electrons. It’s like putting on another bulky winter jacket. The outer electrons are further from the center, so the covalent radius increases. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Periodic trend: covalent radius across a period (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the trend that atoms get smaller across a period due to increased nuclear charge pulling the same electron shell closer.

Accuracy: **accurate**. Accurately describes the decrease in covalent radius across a period caused by increased effective nuclear charge acting on the same principal energy level.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | #### 2. Going ACROSS a period (row) from Left to Right $\rightarrow$ Atoms get SMALLER. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | * **Why?** *(This one usually tricks students!)* As you go left to right, you are adding more protons to the nucleus and more electrons to the *same* energy level.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 | * More protons mean a stronger positive charge in the center. The nucleus acts like a stronger magnet, pulling that electron cloud closer and tighter toward the middle. This shrinks the atom, so the covalent radius decreases. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Summary of covalent radius concepts and trends (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a quick reference recap summarizing the definition, rationale, and periodic trends of covalent radius.

Accuracy: **accurate**. The recap accurately synthesizes the definition, purpose, and periodic trends for covalent radius.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p28 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p29 | ### Quick Summary for Your Notes: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p30 | * **What is it?** Half the distance between the centers of two identical atoms bonded covalently. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p31 | * **Why use it?** Atoms are fuzzy; this gives us a reliable way to define an atom&#x27;s &quot;size.&quot; | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p32 | * **Periodic Trend:**  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 |   * **Down** a column = Radius gets **larger**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 |   * **Across** a row (left to right) = Radius gets **smaller**. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p35 | Does that make sense? Let me know if you want to practice with an example! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

