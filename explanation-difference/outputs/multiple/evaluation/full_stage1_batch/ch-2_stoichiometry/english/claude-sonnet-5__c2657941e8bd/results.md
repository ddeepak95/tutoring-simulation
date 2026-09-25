# Stage 1: English / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "stoichiometry, including balanced equations, the mole concept, problem-solving roadmap, worked calculation, limiting reactant, percent yield, practical tips, and a sandwich analogy",
  "topic_match": "on_topic",
  "reason": "The text directly and thoroughly teaches stoichiometry: defining the discipline, explaining the role of balanced equations and mole ratios, outlining a step-by-step problem-solving roadmap, working through a stoichiometric calculation, defining limiting reactant and percent yield, and offering practical strategies and an everyday analogy.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of stoichiometry and the questions it answers | {"depth": "statement"} | accurate |
| u2 | CONCEPT | Balanced chemical equations and conservation of mass as the foundation of stoichiometry | {"depth": "explanation"} | accurate |
| u3 | CONCEPT | The mole concept and its interpretation in balanced equations | {"depth": "explanation"} | accurate |
| u4 | PROCEDURE | Three-step stoichiometry problem-solving roadmap | {} | accurate |
| u5 | EXAMPLE | Worked mass-to-mass stoichiometry problem for the formation of water | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u6 | CONCEPT | Definitions of limiting and excess reactants | {"depth": "statement"} | accurate |
| u7 | CONCEPT | Definitions of theoretical yield and percent yield | {"depth": "statement"} | accurate |
| u8 | STUDY_SUPPORT | Practical tips and strategies for students solving stoichiometry problems | {"subtype": "study_strategy"} | accurate |
| u9 | ANALOGY | Sandwich recipe analogy for stoichiometry and limiting reactant | {} | accurate |

## u1: Definition of stoichiometry and the questions it answers

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The definition accurately describes stoichiometry and the core quantitative questions it addresses in chemistry.",
    "errors": []
  }
}
```

```text
Stoichiometry (pronounced "stoy-kee-OM-eh-tree") is the branch of chemistry that deals with the **quantitative relationships** between reactants and products in a chemical reaction. Think of it as the "math of chemistry" — it helps us answer questions like:

- How much product will I get?
- How much reactant do I need?
- Will I have leftover materials?
```


## u2: Balanced chemical equations and conservation of mass as the foundation of stoichiometry

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly links the requirement for balanced equations to the Law of Conservation of Mass and explains that stoichiometric coefficients provide mole ratios.",
    "errors": []
  }
}
```

```text
Before doing any stoichiometry, you need a **balanced chemical equation**. This is crucial because of the **Law of Conservation of Mass** — matter cannot be created or destroyed.

**Example:**
$$2H_2 + O_2 \rightarrow 2H_2O$$

This tells us:
- 2 molecules of hydrogen react with 1 molecule of oxygen
- to produce 2 molecules of water

The coefficients (2, 1, 2) give us **mole ratios** — the key to all stoichiometry calculations.
```


## u3: The mole concept and its interpretation in balanced equations

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately defines the mole as 6.022 × 10²³ particles and explains that equation coefficients scale directly to molar quantities.",
    "errors": []
  }
}
```

```text
The **mole** is chemistry's counting unit (like "dozen" = 12, "mole" = 6.022 × 10²³ particles).

Stoichiometry works because coefficients in a balanced equation represent **mole ratios**, not just molecule ratios.

So in $2H_2 + O_2 \rightarrow 2H_2O$:
- 2 moles H₂ react with 1 mole O₂ to give 2 moles H₂O
```


## u4: Three-step stoichiometry problem-solving roadmap

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately outlines the standard general method for solving mass-to-mass stoichiometry problems using molar mass and mole ratios.",
    "errors": []
  }
}
```

```text
Most problems follow this path:

```
Grams (A) → Moles (A) → Moles (B) → Grams (B)
```

**Step-by-step process:**

1. **Convert given quantity to moles** (using molar mass)
2. **Use mole ratio** from balanced equation to switch substances
3. **Convert moles back to desired unit** (grams, liters, particles, etc.)
```


## u5: Worked mass-to-mass stoichiometry problem for the formation of water

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "All calculations, molar masses (using common introductory integer approximations of 2 g/mol for H2 and 18 g/mol for H2O), mole ratios, and units cancel correctly to yield 36 g of water.",
    "errors": []
  }
}
```

```text
**Question:** How many grams of water are produced when 4 grams of H₂ react completely with excess O₂?

**Reaction:** $2H_2 + O_2 \rightarrow 2H_2O$

**Step 1: Convert grams of H₂ to moles**
$$4 \text{ g H}_2 \times \frac{1 \text{ mol H}_2}{2 \text{ g H}_2} = 2 \text{ mol H}_2$$

**Step 2: Use mole ratio to find moles of H₂O**
$$2 \text{ mol H}_2 \times \frac{2 \text{ mol H}_2O}{2 \text{ mol H}_2} = 2 \text{ mol H}_2O$$

**Step 3: Convert moles of H₂O to grams**
$$2 \text{ mol H}_2O \times \frac{18 \text{ g H}_2O}{1 \text{ mol H}_2O} = 36 \text{ g H}_2O$$

**Answer: 36 grams of water** ✅
```


## u6: Definitions of limiting and excess reactants

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly defines limiting reactant as the substance consumed first that bounds product yield, and excess reactant as what remains.",
    "errors": []
  }
}
```

```text
### 1. **Limiting Reactant**
The reactant that runs out first — it *limits* how much product can form. The other reactant is "in excess."
```


## u7: Definitions of theoretical yield and percent yield

```json
{
  "attributes": {
    "depth": "statement"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately defines theoretical yield and gives the standard formula for calculating percent yield from actual and theoretical yields.",
    "errors": []
  }
}
```

```text
### 2. **Theoretical Yield**
The maximum amount of product possible (calculated using stoichiometry).

### 3. **Percent Yield**
Compares actual yield (from lab) to theoretical yield:
$$\% \text{Yield} = \frac{\text{Actual Yield}}{\text{Theoretical Yield}} \times 100$$
```


## u8: Practical tips and strategies for students solving stoichiometry problems

```json
{
  "attributes": {
    "subtype": "study_strategy"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The practical guidelines and checking mechanisms provide sound study and problem-solving strategies for stoichiometry.",
    "errors": []
  }
}
```

```text
✅ **Always balance the equation first**
✅ **Convert everything to moles before comparing substances**
✅ **Use dimensional analysis** (unit conversion chains) to avoid mistakes
✅ **Check units** at each step — they should cancel out properly
✅ **Watch for limiting reactant problems** — calculate product from BOTH reactants and pick the smaller answer
```


## u9: Sandwich recipe analogy for stoichiometry and limiting reactant

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "recipe for making sandwiches:\n> 2 bread slices + 1 cheese slice → 1 sandwich"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The sandwich recipe accurately maps stoichiometric proportions, reactant limitation, and product yields to an everyday non-chemical domain.",
    "errors": []
  }
}
```

```text
Think of a recipe for making sandwiches:
> 2 bread slices + 1 cheese slice → 1 sandwich

If you have 10 bread slices and 3 cheese slices, cheese is your "limiting reactant" — you can only make 3 sandwiches, even though you have enough bread for 5!

Stoichiometry works exactly the same way, just with atoms and molecules instead of sandwiches. 🥪⚗️
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u6",
      "u7"
    ],
    "issue": "Under the heading 'Important Related Concepts', three numbered terms are introduced (Limiting Reactant, Theoretical Yield, Percent Yield). They could be treated as a single unified CONCEPT unit covering related stoichiometric definitions, split into three individual units, or split into two units (Limiting Reactant vs. Yield concepts).",
    "proposed_resolution": "Separated into two CONCEPT units (u6 for limiting/excess reactants and u7 for theoretical and percent yield) because limiting reactant addresses reactant constraints while theoretical/percent yield directly form a single paired topic on reaction yield efficiency."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "In u3, the text mentions '(like \"dozen\" = 12, \"mole\" = 6.022 × 10²³ particles)'. It is ambiguous whether this brief parenthetical reference to 'dozen' warrants contextualization: 'everyday' or 'none'.",
    "proposed_resolution": "Assigned contextualization: 'none' because 'dozen = 12' is presented purely as a numerical/counting comparison without explicitly situating the teaching in a daily activity or situation. If any mention of common non-scientific counting units is counted as everyday context, 'everyday' with quote 'like \"dozen\" = 12' would be the alternative."
  },
  {
    "unit_ids": [
      "u9"
    ],
    "issue": "The section is introduced with the heading '## Analogy to Remember', which suggests a mnemonic or study aid role (STUDY_SUPPORT), but the body develops a domain-mapping analogy.",
    "proposed_resolution": "Classified as ANALOGY rather than STUDY_SUPPORT because the substantive teaching contribution is an explicit cross-domain mapping (sandwiches and ingredients mapped to products and reactants) rather than an acronym or study strategy."
  }
]
```

## Unassigned text for coverage review

```text
# Stoichiometry: A Complete Guide

## What is Stoichiometry?


```

```text


---

## The Foundation: Balanced Equations


```

```text


---

## Key Concept: The Mole


```

```text


---

## The Stoichiometry "Roadmap"


```

```text


---

## Worked Example


```

```text


---

## Important Related Concepts


```

```text


---

## Quick Tips for Students


```

```text


---

## Analogy to Remember


```

```text


Would you like me to walk through a practice problem together, or explain limiting reactants in more depth?
```
