# Stage 1: English / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Definition, measurement, rationale, periodic trends, and calculation of covalent radius",
  "topic_match": "on_topic",
  "reason": "The text directly and thoroughly explains covalent radius, its definition, why it is used, its calculation formula, periodic trends, and includes examples and a practice check.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and formula of covalent radius | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Calculation of the covalent radius of chlorine | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Rationale for defining atomic radius via covalent bonding | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Periodic trends of covalent radius across periods and down groups | {"depth": "explanation"} | accurate |
| u5 | STUDY_SUPPORT | Key points recap for covalent radius | {"subtype": "recap"} | accurate |
| u6 | STUDY_SUPPORT | Quick check practice question on bromine covalent radius | {"subtype": "practice_question"} | accurate |

## u1: Definition and formula of covalent radius

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
    "reason": "The definition and formula correctly specify half the internuclear distance between two identical homonuclear atoms joined by a single covalent bond.",
    "errors": []
  }
}
```

```text
**Covalent radius** is defined as **half the distance between the nuclei of two identical atoms that are joined together by a single covalent bond**.
```

```text
$$\text{Covalent radius} = \frac{\text{Distance between nuclei of bonded atoms}}{2}$$
```


## u2: Calculation of the covalent radius of chlorine

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
    "reason": "The bond length of Cl2 is 198 pm and the resulting covalent radius is correctly calculated as 99 pm.",
    "errors": []
  }
}
```

```text
Imagine two identical atoms bonded together, like in a chlorine molecule (Cl–Cl). If you measure the distance between the centers (nuclei) of the two chlorine atoms, and then divide that distance by 2, you get the covalent radius of chlorine.
```

```text
**Example:**
- The bond length in a Cl₂ molecule is 198 pm (picometers)
- Covalent radius of Cl = 198/2 = **99 pm**
```


## u3: Rationale for defining atomic radius via covalent bonding

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
    "reason": "Accurately explains that electron probability clouds prevent direct measurement of isolated atomic boundaries, necessitating bonded distance measurements.",
    "errors": []
  }
}
```

```text
## Why Do We Need This Concept?

Atoms don't have a fixed, sharply defined boundary (electrons are spread out in probability clouds), so we can't measure the "size" of an atom directly like we would measure a ball. Instead, scientists measure the distance between two bonded atoms and use that to define atomic size.
```


## u4: Periodic trends of covalent radius across periods and down groups

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
    "reason": "Periodic table trends across a period (decrease due to increasing effective nuclear charge) and down a group (increase due to additional electron shells) are correctly described and explained.",
    "errors": []
  }
}
```

```text
## Trends in the Periodic Table

Covalent radius follows predictable patterns:

| Direction | Trend | Reason |
|-----------|-------|--------|
| **Across a period (left to right)** | Decreases | Nuclear charge increases, pulling electrons closer to the nucleus |
| **Down a group (top to bottom)** | Increases | New electron shells are added, increasing the size |
```


## u5: Key points recap for covalent radius

```json
{
  "attributes": {
    "subtype": "recap"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The summary points accurately reflect the nature, units, and applications of covalent radii.",
    "errors": []
  }
}
```

```text
## Key Points to Remember

1. It applies specifically to **covalently bonded** atoms (not ionic or metallic bonds)
2. It's usually measured in **picometers (pm)** or **angstroms (Å)**
3. It helps us compare and predict the relative sizes of atoms
4. It's used to calculate bond lengths in different molecules
```


## u6: Quick check practice question on bromine covalent radius

```json
{
  "attributes": {
    "subtype": "practice_question"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The practice calculation is factually correct: 228 pm divided by 2 gives 114 pm.",
    "errors": []
  }
}
```

```text
## Quick Check Question
If the bond length between two identical bromine atoms (Br–Br) is 228 pm, what is the covalent radius of bromine?

*(Answer: 228 ÷ 2 = 114 pm)*
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1",
      "u2"
    ],
    "issue": "Under 'A Simple Way to Picture It', the text weaves conceptual explanation with the chlorine example around the general formula.",
    "proposed_resolution": "The general formula was assigned to u1 (the definition/formula concept) and the chlorine narrative and calculation to u2 (worked example)."
  },
  {
    "unit_ids": [
      "u6"
    ],
    "issue": "Whether u6 should be classified as EXAMPLE (worked) or STUDY_SUPPORT (practice_question), since the prompt provides both the question and the answer in parentheses.",
    "proposed_resolution": "Classified as STUDY_SUPPORT (practice_question) because its primary structural and pedagogical function is a 'Quick Check Question' for learner self-testing."
  }
]
```

## Unassigned text for coverage review

```text
# Covalent Radius

## Definition


```

```text


## A Simple Way to Picture It


```

```text


Would you like me to explain how this compares to other types of atomic radii, like ionic or metallic radius?
```
