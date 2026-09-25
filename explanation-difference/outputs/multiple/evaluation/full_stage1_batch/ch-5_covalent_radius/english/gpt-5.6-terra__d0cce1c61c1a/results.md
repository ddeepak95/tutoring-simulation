# Stage 1: English / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Definition, calculation example, periodic trends, and bond-order dependence of covalent radius",
  "topic_match": "on_topic",
  "reason": "The text directly defines covalent radius, illustrates how it is calculated using Cl₂, explains its periodic trends across periods and down groups, and discusses the effect of bond order.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4",
    "u5"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition and explanation of covalent radius | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Calculation of the covalent radius of chlorine from the internuclear distance in Cl₂ | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Periodic trends of covalent radius across periods and down groups | {"depth": "explanation"} | accurate |
| u4 | CAVEAT | Qualification that covalent radius varies with bond order | {"subtype": "qualification"} | accurate |
| u5 | STUDY_SUPPORT | Summary recap of the meaning of covalent radius | {"subtype": "recap"} | accurate |

## u1: Definition and explanation of covalent radius

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
    "reason": "The definition and the explanation of why internuclear distance is used instead of a direct edge measurement are standard and chemically accurate.",
    "errors": []
  }
}
```

```text
**Covalent radius** is a measure of the size of an atom when it is joined to another atom by a **covalent bond**.

A covalent bond forms when two atoms **share electrons**. Because atoms do not have sharp outer edges, scientists cannot directly measure the “edge” of one atom. Instead, they use the distance between the nuclei of two bonded atoms.

### Definition
The covalent radius of an atom is:

> **Half the distance between the nuclei of two identical atoms joined by a single covalent bond.**
```


## u2: Calculation of the covalent radius of chlorine from the internuclear distance in Cl₂

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
    "reason": "The internuclear distance of Cl₂ (198 pm) and the resulting covalent radius of Cl (99 pm) are standard textbook values and correctly calculated.",
    "errors": []
  }
}
```

```text
For example, in a chlorine molecule, Cl₂, the two chlorine atoms are joined by a covalent bond. If the distance between their nuclei is 198 pm (picometres), then:

\[
\text{Covalent radius of Cl} = \frac{198}{2} = 99\text{ pm}
\]

A **picometre (pm)** is \(10^{-12}\) metres, so atomic radii are extremely small.
```


## u3: Periodic trends of covalent radius across periods and down groups

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
    "reason": "The trends across a period (nuclear charge increase pulling electrons in) and down a group (addition of electron shells) are correctly described and explained.",
    "errors": []
  }
}
```

```text
### Trends in the periodic table

- **Across a period (left to right):** covalent radius generally **decreases**.  
  This happens because the number of protons increases, pulling the outer electrons closer to the nucleus.

- **Down a group (top to bottom):** covalent radius generally **increases**.  
  This is because each element has an additional electron shell, making the atom larger.
```


## u4: Qualification that covalent radius varies with bond order

```json
{
  "attributes": {
    "subtype": "qualification"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Multiple bonds have shorter bond lengths, meaning effective covalent radii differ for single, double, and triple bonds, as illustrated with carbon.",
    "errors": []
  }
}
```

```text
### Important note
The covalent radius can depend slightly on the type of bond:
- A **single bond** is longer, so it gives a larger radius.
- A **double bond** is shorter.
- A **triple bond** is even shorter.

For example, carbon has a slightly smaller effective radius in a triple bond than in a single bond because the atoms are pulled closer together.
```


## u5: Summary recap of the meaning of covalent radius

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
    "reason": "Accurately summarizes the core takeaway of covalent radius.",
    "errors": []
  }
}
```

```text
In short, covalent radius tells us the approximate size of an atom when it forms covalent bonds.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "u4 could be viewed as a CONCEPT explaining how bond multiplicity affects covalent radius rather than a CAVEAT.",
    "proposed_resolution": "Classified as CAVEAT (qualification) because it is explicitly introduced under '### Important note' to qualify the earlier strict single-bond definition."
  },
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "u5 is a brief concluding sentence that could either be merged with u4 / treated as closing prose or isolated as a STUDY_SUPPORT recap.",
    "proposed_resolution": "Separated as STUDY_SUPPORT with subtype 'recap' because 'In short, ...' serves as an explicit summary of the main concept."
  }
]
```

## Unassigned text for coverage review
