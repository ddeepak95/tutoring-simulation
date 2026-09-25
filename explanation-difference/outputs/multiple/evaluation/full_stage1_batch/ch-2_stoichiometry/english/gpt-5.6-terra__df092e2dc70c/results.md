# Stage 1: English / stoichiometry

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "stoichiometry",
  "observed_topic": "Fundamentals of stoichiometry, including mole ratios, molar mass conversions, calculation pathways, worked examples, limiting reactants, and common pitfalls",
  "topic_match": "on_topic",
  "reason": "The explanation directly and comprehensively covers stoichiometry, explaining balanced chemical equations, mole ratios, molar mass, conversion steps, limiting reactants, and providing worked examples.",
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
| u1 | CONCEPT | Definition of stoichiometry | {"depth": "statement"} | accurate |
| u2 | ANALOGY | Cooking recipe analogy for stoichiometric ratios | {} | accurate |
| u3 | CONCEPT | Role of coefficients and mole ratios in balanced equations | {"depth": "explanation"} | accurate |
| u4 | CAVEAT | Distinguishing subscripts from stoichiometric coefficients | {"subtype": "misconception"} | accurate |
| u5 | CONCEPT | The mole as chemistry's counting unit | {"depth": "explanation"} | accurate |
| u6 | CONCEPT | Molar mass as the conversion factor between grams and moles | {"depth": "explanation"} | accurate |
| u7 | PROCEDURE | General pathway for solving stoichiometry problems | {} | accurate |
| u8 | EXAMPLE | Worked mass-to-mass calculation of water formed from hydrogen gas | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u9 | PROCEDURE | Single-line dimensional analysis method for stoichiometry | {} | accurate |
| u10 | CONCEPT | Concept of limiting and excess reactants | {"depth": "explanation"} | accurate |
| u11 | CAVEAT | Common stoichiometry pitfalls and misconceptions | {"subtype": "misconception"} | accurate |
| u12 | STUDY_SUPPORT | Recap of stoichiometry concepts and workflow | {"subtype": "recap"} | accurate |

## u1: Definition of stoichiometry

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
    "reason": "Accurately defines stoichiometry as the calculation of relative quantities of reactants and products in chemical reactions using balanced equations.",
    "errors": []
  }
}
```

```text
**Stoichiometry** is the part of chemistry that uses a balanced chemical equation to calculate how much of each substance reacts or is produced.
```


## u2: Cooking recipe analogy for stoichiometric ratios

```json
{
  "attributes": {},
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "A recipe might say: **2 eggs + 1 cup flour → 12 cookies**"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The comparison maps recipe ingredients and yield to chemical reactants and products, effectively illustrating fixed stoichiometric ratios.",
    "errors": []
  }
}
```

```text
It is like using a recipe:

- A recipe might say: **2 eggs + 1 cup flour → 12 cookies**
- A chemical equation might say: **2 molecules of hydrogen + 1 molecule of oxygen → 2 molecules of water**

The numbers in front of substances tell us the required ratios.
```


## u3: Role of coefficients and mole ratios in balanced equations

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
    "reason": "Correctly explains how stoichiometric coefficients in a balanced equation represent molecule counts and mole ratios.",
    "errors": []
  }
}
```

```text
## 1. Start with a Balanced Chemical Equation

For example:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

This means:

- 2 molecules (or moles) of hydrogen gas react with
- 1 molecule (or mole) of oxygen gas to make
- 2 molecules (or moles) of water.

So the mole ratio is:

\[
2 \text{ mol } H_2 : 1 \text{ mol } O_2 : 2 \text{ mol } H_2O
\]

The coefficients—**2, 1, and 2**—are essential in stoichiometry.
```


## u4: Distinguishing subscripts from stoichiometric coefficients

```json
{
  "attributes": {
    "subtype": "misconception"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly warns against confusing formula subscripts with reaction coefficients.",
    "errors": []
  }
}
```

```text
> Never use the small numbers inside chemical formulas as mole ratios.  
> For example, the 2 in \(H_2\) means each hydrogen molecule has two hydrogen atoms. It does not mean “2 moles.”
```


## u5: The mole as chemistry's counting unit

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
    "reason": "Accurately defines the mole, gives Avogadro's number, and explains why moles are necessary for stoichiometry.",
    "errors": []
  }
}
```

```text
## 2. The Mole: Chemistry’s Counting Unit

Atoms and molecules are too tiny to count individually, so chemists use the **mole**.

\[
1 \text{ mole} = 6.022 \times 10^{23} \text{ particles}
\]

A mole can refer to atoms, molecules, ions, or formula units.

For stoichiometry, moles are important because balanced equations compare substances in **moles**.
```


## u6: Molar mass as the conversion factor between grams and moles

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
    "reason": "Accurately explains the definition and practical application of molar mass to convert between mass and mole amounts, using water as an illustrative calculation.",
    "errors": []
  }
}
```

```text
## 3. Molar Mass Connects Grams and Moles

In a laboratory, substances are usually measured in grams, not moles. To convert between grams and moles, use **molar mass**.

\[
\text{moles} = \frac{\text{mass in grams}}{\text{molar mass in g/mol}}
\]

For example, the molar mass of water, \(H_2O\), is:

\[
(2 \times 1.01) + 16.00 = 18.02 \text{ g/mol}
\]

So:

\[
1 \text{ mol } H_2O = 18.02 \text{ g}
\]
```


## u7: General pathway for solving stoichiometry problems

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately details the standard 4-step sequence for mass-to-mass stoichiometry problems.",
    "errors": []
  }
}
```

```text
# The Main Stoichiometry Pathway

Most stoichiometry questions follow this pattern:

\[
\boxed{\text{grams} \rightarrow \text{moles} \rightarrow \text{moles} \rightarrow \text{grams}}
\]

More specifically:

1. **Balance the equation.**
2. **Convert the given amount to moles.**
3. **Use the mole ratio from the balanced equation.**
4. **Convert the answer into the unit requested**, often grams.
```


## u8: Worked mass-to-mass calculation of water formed from hydrogen gas

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
    "reason": "All calculations, molar masses, mole ratios, unit conversions, and significant figure rounding (4.00 / 2.02 * 18.02 = 35.68 -> 35.7 g) are correct.",
    "errors": []
  }
}
```

```text
## Example: How Many Grams of Water Form?

Question:

> How many grams of water are produced when 4.00 g of hydrogen gas reacts completely with oxygen?

### Step 1: Write the balanced equation

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

### Step 2: Convert grams of hydrogen to moles

Molar mass of \(H_2\):

\[
2.02 \text{ g/mol}
\]

\[
4.00 \text{ g } H_2 \times \frac{1 \text{ mol } H_2}{2.02 \text{ g } H_2}
= 1.98 \text{ mol } H_2
\]

### Step 3: Use the mole ratio

From the balanced equation:

\[
2 \text{ mol } H_2 \rightarrow 2 \text{ mol } H_2O
\]

The ratio is:

\[
\frac{2 \text{ mol } H_2O}{2 \text{ mol } H_2}
\]

\[
1.98 \text{ mol } H_2 \times \frac{2 \text{ mol } H_2O}{2 \text{ mol } H_2}
= 1.98 \text{ mol } H_2O
\]

### Step 4: Convert moles of water to grams

Molar mass of water:

\[
18.02 \text{ g/mol}
\]

\[
1.98 \text{ mol } H_2O \times \frac{18.02 \text{ g } H_2O}{1 \text{ mol } H_2O}
= 35.7 \text{ g } H_2O
\]

### Final Answer

\[
\boxed{35.7 \text{ g of water}}
\]
```


## u9: Single-line dimensional analysis method for stoichiometry

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly shows how unit-cancellation via dimensional analysis streamlines stoichiometric calculations.",
    "errors": []
  }
}
```

```text
# Dimensional Analysis: Let Units Guide You

A useful way to set up stoichiometry is to write conversion factors so that units cancel.

\[
4.00 \text{ g } H_2
\times
\frac{1 \text{ mol } H_2}{2.02 \text{ g } H_2}
\times
\frac{2 \text{ mol } H_2O}{2 \text{ mol } H_2}
\times
\frac{18.02 \text{ g } H_2O}{1 \text{ mol } H_2O}
\]

Everything cancels except grams of water:

\[
\text{g } H_2 \rightarrow \text{mol } H_2 \rightarrow \text{mol } H_2O \rightarrow \text{g } H_2O
\]

This helps prevent mistakes.
```


## u10: Concept of limiting and excess reactants

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
    "reason": "Accurately defines limiting and excess reactants and illustrates the concept using a clear qualitative mole comparison.",
    "errors": []
  }
}
```

```text
# Limiting Reactant

Sometimes you are given amounts of **two reactants**. One may run out first. This substance is called the **limiting reactant**.

The limiting reactant determines the maximum amount of product that can form.

For example:

\[
2H_2 + O_2 \rightarrow 2H_2O
\]

If you have:

- 2 moles of \(H_2\)
- 2 moles of \(O_2\)

The equation needs only 1 mole of \(O_2\) for every 2 moles of \(H_2\). Therefore:

- 2 moles of \(H_2\) use 1 mole of \(O_2\)
- You have 2 moles of \(O_2\), so 1 mole is left over
- Hydrogen runs out first

Therefore, \(H_2\) is the **limiting reactant**.

The leftover reactant is called the **excess reactant**.
```


## u11: Common stoichiometry pitfalls and misconceptions

```json
{
  "attributes": {
    "subtype": "misconception"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Identifies genuine, widespread high school student mistakes in stoichiometry and explains why each is an error.",
    "errors": []
  }
}
```

```text
# Common Stoichiometry Mistakes

1. **Not balancing the equation first**  
   Always balance before calculating mole ratios.

2. **Using grams directly in the mole ratio**  
   Coefficients compare **moles**, not grams.

3. **Using subscripts instead of coefficients**  
   In \(2H_2 + O_2 \rightarrow 2H_2O\), use the coefficients 2, 1, and 2.

4. **Forgetting molar mass**  
   You usually need molar mass to change grams into moles or moles into grams.

5. **Reversing a conversion factor**  
   Make sure unwanted units cancel.
```


## u12: Recap of stoichiometry concepts and workflow

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Think of the balanced equation as a recipe, and moles as the quantities needed to follow that recipe."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Provides a concise and correct summary of the entire stoichiometry process.",
    "errors": []
  }
}
```

```text
## Quick Summary

Stoichiometry uses a balanced chemical equation to calculate amounts of substances in a reaction.

The key sequence is:

\[
\boxed{\text{Balance} \rightarrow \text{Convert to moles} \rightarrow \text{Use mole ratio} \rightarrow \text{Convert units}}
\]

The most common pattern is:

\[
\boxed{\text{grams of A} \rightarrow \text{moles of A} \rightarrow \text{moles of B} \rightarrow \text{grams of B}}
\]

Think of the balanced equation as a recipe, and moles as the quantities needed to follow that recipe.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u9"
    ],
    "issue": "Whether the dimensional analysis section should be categorized as PROCEDURE (a reusable general calculation technique) or STUDY_SUPPORT (study_strategy).",
    "proposed_resolution": "Categorized as PROCEDURE because it demonstrates the specific operational method of chained conversion factors for canceling units in stoichiometric calculations."
  },
  {
    "unit_ids": [
      "u11"
    ],
    "issue": "Whether the 'Common Stoichiometry Mistakes' list should be categorized as CAVEAT (misconception) or STUDY_SUPPORT (study_strategy).",
    "proposed_resolution": "Categorized as CAVEAT with subtype 'misconception' because it explicitly details errors in student thinking (e.g., using grams directly in mole ratios, confusing subscripts with coefficients) rather than merely offering study tips."
  }
]
```

## Unassigned text for coverage review

```text
## Stoichiometry: The Chemistry of “How Much?”


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```

```text


---


```
