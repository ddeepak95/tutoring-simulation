# Stage 1: English / covalent radius

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "covalent radius",
  "observed_topic": "Definition, measurement method, worked calculation example, and periodic trends of covalent radius",
  "topic_match": "on_topic",
  "reason": "The explanation directly addresses covalent radius, explaining why it is defined via bonded atoms, stating its formula, calculating an example with chlorine, and detailing trends down groups and across periods.",
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
| u1 | CONCEPT | Definition and measurement rationale of covalent radius | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Worked calculation of covalent radius for a chlorine molecule | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Periodic trend of covalent radius down a group | {"depth": "explanation"} | accurate |
| u4 | CONCEPT | Periodic trend of covalent radius across a period | {"depth": "explanation"} | accurate |
| u5 | STUDY_SUPPORT | Summary review of covalent radius definition and trends | {"subtype": "recap"} | accurate |

## u1: Definition and measurement rationale of covalent radius

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "Imagine trying to measure the exact size of a fluffy cloud or a cotton ball."
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly explains the quantum mechanical issue of atomic boundary indeterminacy, the operational definition of covalent radius as half the internuclear distance of homonuclear single-bonded atoms, and the use of X-ray diffraction to measure internuclear distances.",
    "errors": []
  }
}
```

```text
### The Problem: How do you measure an atom?

Imagine trying to measure the exact size of a fluffy cloud or a cotton ball. It’s hard, right? There is no hard outer surface—just a fuzzy edge. 

Atoms are the same way. An atom has a nucleus in the center, surrounded by a "cloud" of electrons. Because this cloud doesn't have a sharp boundary, **you can't just take a ruler and measure the radius from the center to the edge.**

### The Solution: Teamwork between atoms!

To solve this, scientists wait until two identical atoms bond together by sharing electrons—which is called a **covalent bond**. 

When two identical atoms form a covalent bond, their electron clouds overlap, and their nuclei are locked at a stable, measurable distance from each other. 

Scientists can easily measure the distance between the centers (the nuclei) of these two bonded atoms using X-ray technology. 

### The Definition

> **The covalent radius is simply half the distance between the nuclei of two identical atoms joined by a single covalent bond.**

Here is the simple formula:

$$\text{Covalent Radius} = \frac{\text{Distance between two nuclei}}{2}$$
```


## u2: Worked calculation of covalent radius for a chlorine molecule

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "two identical tennis balls squished slightly together"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The internuclear distance for Cl2 is accurately stated as ~198 pm, yielding a standard covalent radius of 99 pm through correct division by 2.",
    "errors": []
  }
}
```

```text
* **Example:** In a chlorine molecule ($\text{Cl}_2$), the distance between the two chlorine nuclei is about **198 picometers** (pm). 
* To find the covalent radius of a single chlorine atom, just divide that by 2:
  $$\frac{198}{2} = 99\text{ pm}$$
* So, the covalent radius of chlorine is **99 pm**.

*(Think of it like two identical tennis balls squished slightly together. If you measure the distance from the center of Ball A to the center of Ball B and divide by two, you get the radius of one ball).*
```


## u3: Periodic trend of covalent radius down a group

```json
{
  "attributes": {
    "depth": "explanation"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "putting on another bulky winter jacket"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly states and explains the increase in atomic and covalent radius down a group due to the addition of principal electron shells.",
    "errors": []
  }
}
```

```text
#### 1. Going DOWN a group (column) $\downarrow$ $\rightarrow$ Atoms get BIGGER.
* **Why?** Every time you move down a row, you are adding a completely new **energy level (shell)** of electrons. It’s like putting on another bulky winter jacket. The outer electrons are further from the center, so the covalent radius increases.
```


## u4: Periodic trend of covalent radius across a period

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
    "reason": "Correctly identifies the decrease in radius across a period from left to right due to increased effective nuclear charge pulling the same valence shell closer to the nucleus.",
    "errors": []
  }
}
```

```text
#### 2. Going ACROSS a period (row) from Left to Right $\rightarrow$ Atoms get SMALLER.
* **Why?** *(This one usually tricks students!)* As you go left to right, you are adding more protons to the nucleus and more electrons to the *same* energy level. 
* More protons mean a stronger positive charge in the center. The nucleus acts like a stronger magnet, pulling that electron cloud closer and tighter toward the middle. This shrinks the atom, so the covalent radius decreases.
```


## u5: Summary review of covalent radius definition and trends

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
    "reason": "Accurately summarizes the core definition, operational rationale, and periodic trends taught earlier in the text.",
    "errors": []
  }
}
```

```text
### Quick Summary for Your Notes:
* **What is it?** Half the distance between the centers of two identical atoms bonded covalently.
* **Why use it?** Atoms are fuzzy; this gives us a reliable way to define an atom's "size."
* **Periodic Trend:** 
  * **Down** a column = Radius gets **larger**.
  * **Across** a row (left to right) = Radius gets **smaller**.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Whether 'The Problem' (measuring an atom with a fuzzy electron cloud) should be separated from 'The Solution / Definition' of covalent radius.",
    "proposed_resolution": "Kept together within u1 because the problem is introduced specifically to justify why covalent radius is defined and measured using bonded pairs rather than individual atoms, forming a single coherent explanatory episode."
  },
  {
    "unit_ids": [
      "u3",
      "u4"
    ],
    "issue": "Whether the periodic trends down a group and across a period should be combined into a single CONCEPT unit or kept separate.",
    "proposed_resolution": "Separated into u3 and u4 because each direction involves an independent physical mechanism (increasing principal quantum number / shells vs increasing effective nuclear charge within the same shell)."
  }
]
```

## Unassigned text for coverage review

```text
Hello! Welcome to chemistry class. Today, we’re going to tackle a concept that sounds fancy, but is actually very logical once you picture it: the **covalent radius**.

Let’s break it down step-by-step.

---


```

```text


---

### How does it change on the Periodic Table? (Trends to know for tests!)

Your chemistry teacher will definitely ask you how covalent radius changes as you move across the periodic table. Here are the two rules:


```

```text


---


```

```text


Does that make sense? Let me know if you want to practice with an example!
```
