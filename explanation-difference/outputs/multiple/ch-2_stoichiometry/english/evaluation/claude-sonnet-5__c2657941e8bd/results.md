# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The text directly and comprehensively explains stoichiometry, covering its definition, balanced chemical equations, mole ratios, calculation procedures, a worked example, limiting reactants, yields, tips, and an everyday analogy.

## Counts

```json
{
  "total_content_units": 10,
  "substantive_content_units": 10,
  "total_passages": 65,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "PROCEDURE": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1,
    "ANALOGY": 1
  },
  "nested_passages": 65,
  "unique_subtopics": 8,
  "contextualization": {
    "none": 9,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 10
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and Scope of Stoichiometry (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines stoichiometry as quantitative relationships in chemical reactions and explains what practical questions it answers.

Accuracy: **accurate**. Accurately defines stoichiometry and its scope in answering quantitative chemical reaction questions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Stoichiometry: A Complete Guide | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## What is Stoichiometry? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Stoichiometry (pronounced &quot;stoy-kee-OM-eh-tree&quot;) is the branch of chemistry that deals with the **quantitative relationships** between reactants and products in a chemical reaction. Think of it as the &quot;math of chemistry&quot; — it helps us answer questions like: | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | - How much product will I get? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - How much reactant do I need? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - Will I have leftover materials? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Balanced Chemical Equations as the Foundation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why balanced chemical equations are essential for stoichiometry based on the Law of Conservation of Mass and demonstrates how coefficients provide mole ratios.

Accuracy: **accurate**. Accurately connects the requirement for balanced equations to the Law of Conservation of Mass and describes how reaction coefficients establish mole ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## The Foundation: Balanced Equations | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | Before doing any stoichiometry, you need a **balanced chemical equation**. This is crucial because of the **Law of Conservation of Mass** — matter cannot be created or destroyed. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p10 | **Example:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | $$2H_2 + O_2 \rightarrow 2H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 | This tells us: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p13 | - 2 molecules of hydrogen react with 1 molecule of oxygen | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | - to produce 2 molecules of water | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p15 | The coefficients (2, 1, 2) give us **mole ratios** — the key to all stoichiometry calculations. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: The Mole Concept and Mole Ratios (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the definition of a mole as chemistry's counting unit and demonstrates how balanced equation coefficients translate to mole relationships.

Accuracy: **accurate**. Correctly defines the mole (including Avogadro's number) and explains its role in stoichiometry calculations via mole ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ## Key Concept: The Mole | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | The **mole** is chemistry&#x27;s counting unit (like &quot;dozen&quot; = 12, &quot;mole&quot; = 6.022 × 10²³ particles). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p19 | Stoichiometry works because coefficients in a balanced equation represent **mole ratios**, not just molecule ratios. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | So in $2H_2 + O_2 \rightarrow 2H_2O$: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p21 | - 2 moles H₂ react with 1 mole O₂ to give 2 moles H₂O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: Stoichiometry Problem-Solving Roadmap (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable step-by-step conversion pathway and procedure for solving mass-to-mass stoichiometry problems.

Accuracy: **accurate**. Accurately maps the standard stoichiometry conversion chain: grams to moles, mole ratio conversion, and moles to target unit.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## The Stoichiometry &quot;Roadmap&quot; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | Most problems follow this path: | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p25 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p26 | Grams (A) → Moles (A) → Moles (B) → Grams (B) | PROCEDURE | {} | [&#x27;diagram&#x27;] |
| p27 | ``` | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p28 | **Step-by-step process:** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p29 | 1. **Convert given quantity to moles** (using molar mass) | PROCEDURE | {} | [&#x27;list&#x27;] |
| p30 | 2. **Use mole ratio** from balanced equation to switch substances | PROCEDURE | {} | [&#x27;list&#x27;] |
| p31 | 3. **Convert moles back to desired unit** (grams, liters, particles, etc.) | PROCEDURE | {} | [&#x27;list&#x27;] |
| p32 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Worked Example: Gram-to-Gram Water Formation (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Works through a complete numerical problem calculating the mass of water produced from a given mass of hydrogen gas.

Accuracy: **accurate**. All calculations, unit cancellations, molar masses, and the final answer (36 g H2O) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ## Worked Example | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | **Question:** How many grams of water are produced when 4 grams of H₂ react completely with excess O₂? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p35 | **Reaction:** $2H_2 + O_2 \rightarrow 2H_2O$ | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p36 | **Step 1: Convert grams of H₂ to moles** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | $$4 \text{ g H}_2 \times \frac{1 \text{ mol H}_2}{2 \text{ g H}_2} = 2 \text{ mol H}_2$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p38 | **Step 2: Use mole ratio to find moles of H₂O** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p39 | $$2 \text{ mol H}_2 \times \frac{2 \text{ mol H}_2O}{2 \text{ mol H}_2} = 2 \text{ mol H}_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p40 | **Step 3: Convert moles of H₂O to grams** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | $$2 \text{ mol H}_2O \times \frac{18 \text{ g H}_2O}{1 \text{ mol H}_2O} = 36 \text{ g H}_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p42 | **Answer: 36 grams of water** ✅ | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p43 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Limiting and Excess Reactants (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what a limiting reactant and an excess reactant are in a chemical reaction.

Accuracy: **accurate**. Accurately defines limiting and excess reactants.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | ## Important Related Concepts | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p45 | ### 1. **Limiting Reactant** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | The reactant that runs out first — it *limits* how much product can form. The other reactant is &quot;in excess.&quot; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u7: Theoretical Yield (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines theoretical yield as the maximum possible product calculated via stoichiometry.

Accuracy: **accurate**. Accurately defines theoretical yield.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p47 | ### 2. **Theoretical Yield** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p48 | The maximum amount of product possible (calculated using stoichiometry). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u8: Percent Yield (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines percent yield and states its mathematical formula comparing actual yield to theoretical yield.

Accuracy: **accurate**. Correctly states the relationship and formula for calculating percent yield.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p49 | ### 3. **Percent Yield** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p50 | Compares actual yield (from lab) to theoretical yield: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p51 | $$\% \text{Yield} = \frac{\text{Actual Yield}}{\text{Theoretical Yield}} \times 100$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p52 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u9: Tips for Solving Stoichiometry Problems (STUDY_SUPPORT)

Attributes: {"subtype": "study_strategy"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a list of best practices, strategies, and checks for students when tackling stoichiometry problems.

Accuracy: **accurate**. All tips represent scientifically sound and standard problem-solving strategies for stoichiometry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p53 | ## Quick Tips for Students | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p54 | ✅ **Always balance the equation first** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p55 | ✅ **Convert everything to moles before comparing substances** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p56 | ✅ **Use dimensional analysis** (unit conversion chains) to avoid mistakes | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p57 | ✅ **Check units** at each step — they should cancel out properly | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p58 | ✅ **Watch for limiting reactant problems** — calculate product from BOTH reactants and pick the smaller answer | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p59 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u10: Sandwich Recipe Analogy for Limiting Reactants (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p61", "quote": "Think of a recipe for making sandwiches:"}]}

Annotation rationale: Uses a cross-domain comparison of making sandwiches from bread and cheese to explain the limiting reactant concept.

Accuracy: **accurate**. Accurately maps the stoichiometry concept of limiting reactants to an everyday recipe analogy.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p60 | ## Analogy to Remember | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p61 | Think of a recipe for making sandwiches: | ANALOGY | {} | [&#x27;prose&#x27;] |
| p62 | &gt; 2 bread slices + 1 cheese slice → 1 sandwich | ANALOGY | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p63 | If you have 10 bread slices and 3 cheese slices, cheese is your &quot;limiting reactant&quot; — you can only make 3 sandwiches, even though you have enough bread for 5! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p64 | Stoichiometry works exactly the same way, just with atoms and molecules instead of sandwiches. 🥪⚗️ | ANALOGY | {} | [&#x27;prose&#x27;] |
| p65 | Would you like me to walk through a practice problem together, or explain limiting reactants in more depth? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

