# Stage 1: English / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "stoichiometry, including the mole concept, balancing equations, step-by-step stoichiometric calculations, and limiting reactants",
  "topic_match": "on_topic",
  "reason": "The explanation defines stoichiometry, explains the foundation in the law of conservation of mass and balanced equations, explains the mole and molar mass, details a step-by-step problem-solving procedure with a worked example, introduces limiting reactants, and provides practical applications.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u9",
    "u10",
    "u11",
    "u12"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and primary function of stoichiometry | {"depth": "statement"} | accurate |
| u2 | ANALOGY | Baking recipe analogy for stoichiometric ratios | {} | accurate |
| u3 | CONCEPT | Conservation of mass and balanced chemical equations | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | The mole concept and molar mass calculation | {"depth": "explanation"} | accurate |
| u5 | PROCEDURE | General step-by-step procedure for stoichiometry calculations | {} | accurate |
| u6 | EXAMPLE | Worked mass-to-mass calculation of water from hydrogen gas | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u7 | CONCEPT | Limiting reactant concept and illustrative scenario | {"depth": "explanation"} | accurate |
| u8 | STUDY_SUPPORT | Study strategies and problem-solving tips for students | {"subtype": "study_strategy"} | accurate |
| u9 | EXAMPLE | Application: making medicine | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u10 | EXAMPLE | Application: calculating fuel in rockets | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u11 | EXAMPLE | Application: determining plant fertilizer amounts | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u12 | EXAMPLE | Application: baking on an industrial scale | {"context": "real_world", "treatment": "illustrative"} | accurate |

## u1: Definition and primary function of stoichiometry

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
    "reason": "Accurately introduces stoichiometry as the quantitative relationship between reactants and products in a chemical reaction.",
    "errors": []
  }
}
```

```text
Stoichiometry is basically the "math of chemistry." It helps you figure out exactly how much stuff (reactants) you need to make a certain amount of product in a chemical reaction—or how much product you can make from what you have.
```


## u2: Baking recipe analogy for stoichiometric ratios

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "recipe in baking: if the recipe says \"2 cups flour + 1 cup sugar makes 12 cookies,\" you can scale it up or down to figure out how many cookies you'll get from 4 cups of flour."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately maps the concept of fixed ratios and scaling in chemical reactions to ingredient proportions in a cookie recipe.",
    "errors": []
  }
}
```

```text
Think of it like a recipe in baking: if the recipe says "2 cups flour + 1 cup sugar makes 12 cookies," you can scale it up or down to figure out how many cookies you'll get from 4 cups of flour.
```


## u3: Conservation of mass and balanced chemical equations

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
    "reason": "Correctly states the law of conservation of mass and explains how coefficients in balanced chemical equations represent molecular and mole ratios.",
    "errors": []
  }
}
```

```text
Chemical reactions follow the law of conservation of mass—atoms are never created or destroyed, just rearranged. So we use **balanced chemical equations** to show the exact ratios of molecules involved.

Example (unbalanced):
H₂ + O₂ → H₂O

Balanced:
2H₂ + O₂ → 2H₂O

This tells us that **2 molecules of hydrogen** react with **1 molecule of oxygen** to make **2 molecules of water**. The numbers in front (called coefficients) give us the mole ratios.
```


## u4: The mole concept and molar mass calculation

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
    "reason": "Accurately defines the mole, Avogadro's number, and molar mass, demonstrating the molar mass calculation for water correctly.",
    "errors": []
  }
}
```

```text
Atoms and molecules are tiny, so we don't count them one by one. Instead, we use the **mole** (just like a "dozen" = 12).

- 1 mole = 6.022 × 10²³ particles (Avogadro's number)
- We convert between **grams** (what we can measure) and **moles** using molar mass (found on the periodic table).

For water (H₂O):
- H = 1.008 g/mol × 2 = 2.016 g
- O = 16.00 g/mol
- Total molar mass = 18.016 g/mol

So 1 mole of water weighs about 18 grams.
```


## u5: General step-by-step procedure for stoichiometry calculations

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly outlines the standard sequence of steps for mass-to-mass stoichiometry problems.",
    "errors": []
  }
}
```

```text
You always follow these steps:

1. Write and balance the equation.
2. Convert given amounts (usually in grams) to moles.
3. Use the mole ratio from the balanced equation to find moles of what you're looking for.
4. Convert back to grams if needed.
```


## u6: Worked mass-to-mass calculation of water from hydrogen gas

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
    "reason": "All conversions, mole ratios, and calculations are correctly performed to find that 8 g H2 yields 72 g H2O.",
    "errors": []
  }
}
```

```text
**Real example**: How many grams of water can you make from 8 grams of hydrogen gas (H₂) reacting with plenty of oxygen?

Balanced equation: 2H₂ + O₂ → 2H₂O

- Step 1: Convert 8 g H₂ to moles.  
  Molar mass of H₂ = 2 g/mol  
  8 g ÷ 2 g/mol = 4 moles of H₂

- Step 2: Use the mole ratio.  
  From the equation: 2 moles H₂ make 2 moles H₂O  
  So the ratio is 2:2 (or 1:1)  
  4 moles H₂ will make 4 moles H₂O

- Step 3: Convert moles of H₂O to grams.  
  Molar mass of H₂O = 18 g/mol  
  4 moles × 18 g/mol = 72 grams of water

You can make 72 grams of water from 8 grams of hydrogen.
```


## u7: Limiting reactant concept and illustrative scenario

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
    "reason": "Accurately defines limiting reactants and illustrates the concept correctly using the reaction of hydrogen and oxygen.",
    "errors": []
  }
}
```

```text
Sometimes you don't have "plenty" of everything. The reactant that gets used up first limits how much product you can make.

Example: If you have 4 moles of H₂ but only 1 mole of O₂, oxygen is the limiting reactant (because the equation needs 2 H₂ per 1 O₂, so you can only use 2 moles of H₂). You'll only make 2 moles of water, and you'll have leftover hydrogen.
```


## u8: Study strategies and problem-solving tips for students

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
    "reason": "Provides sound, accurate study and problem-solving strategies for stoichiometry.",
    "errors": []
  }
}
```

```text
### Quick Tips for Students
- Always balance the equation first—everything else depends on it.
- Keep track of units (grams → moles → moles → grams).
- Practice with simple reactions like combustion or making water/ammonia.
- It feels like a lot at first, but once you do 3–4 problems, the pattern becomes automatic.
```


## u9: Application: making medicine

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately names pharmaceutical manufacturing as an application of stoichiometry.",
    "errors": []
  }
}
```

```text
making medicine
```


## u10: Application: calculating fuel in rockets

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately names rocket propellant calculation as an application of stoichiometry.",
    "errors": []
  }
}
```

```text
calculating fuel in rockets
```


## u11: Application: determining plant fertilizer amounts

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately names agricultural fertilizer calculations as an application of stoichiometry.",
    "errors": []
  }
}
```

```text
figuring out how much fertilizer plants need
```


## u12: Application: baking on an industrial scale

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately identifies large-scale commercial baking recipe scaling as an application of stoichiometric principles.",
    "errors": []
  }
}
```

```text
baking on a huge industrial scale
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1",
      "u2"
    ],
    "issue": "The baking recipe analogy in the opening paragraph directly follows the definition of stoichiometry and could be treated as supporting material within a single CONCEPT unit.",
    "proposed_resolution": "Separated the recipe comparison into a distinct ANALOGY unit (u2) because it explicitly develops a domain mapping (scaling flour, sugar, and cookies) rather than merely acting as a passing metaphor."
  },
  {
    "unit_ids": [
      "u7"
    ],
    "issue": "Limiting reactant could be classified as CAVEAT (subtype: qualification or limitation) because it introduces a qualification to the earlier assumption of having plenty of reactants.",
    "proposed_resolution": "Classified as CONCEPT because it defines a foundational chemical concept and explains its mechanism with an illustrative qualitative problem."
  },
  {
    "unit_ids": [
      "u9",
      "u10",
      "u11",
      "u12"
    ],
    "issue": "The concluding list of real-world applications ('making medicine', 'calculating fuel in rockets', 'figuring out how much fertilizer plants need', 'baking on a huge industrial scale') appears in a single sentence and could be viewed as one collective illustrative example.",
    "proposed_resolution": "Split into four separate EXAMPLE units in accordance with the guideline specifying that a list naming independent applications constitutes separate EXAMPLE units unless they jointly demonstrate a comparative relationship."
  }
]
```

## Unassigned text for coverage review

```text


### Why We Need It

```

```text


### The Mole: Chemistry's Counting Unit

```

```text


### How Stoichiometry Works (Step by Step)

```

```text


### Limiting Reactant (The One That Runs Out First)

```

```text


Stoichiometry is used everywhere in real life: 
```

```text
, 
```

```text
, 
```

```text
, or even 
```

```text
. Master this and a huge part of chemistry suddenly makes sense! 

Want me to walk through another example (like making ammonia or burning propane)? Just give me a reaction and amounts.
```
