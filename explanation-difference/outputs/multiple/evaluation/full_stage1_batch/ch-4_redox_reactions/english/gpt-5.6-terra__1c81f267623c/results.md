# Stage 1: English / redox reactions

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "redox reactions",
  "observed_topic": "Redox reactions, electron transfer, oxidation numbers, oxidising and reducing agents, and real-world examples",
  "topic_match": "on_topic",
  "reason": "The text directly and comprehensively explains redox reactions, covering definitions of oxidation and reduction via electron transfer, oxidising and reducing agents, oxidation states, and multiple illustrative examples.",
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
    "u12",
    "u13",
    "u14",
    "u15",
    "u16"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of redox reactions and coupled electron transfer | {"depth": "explanation"} | accurate |
| u2 | STUDY_SUPPORT | OIL RIG mnemonic for electron loss and gain | {"subtype": "mnemonic"} | accurate |
| u3 | CONCEPT | Definitions of oxidation and reduction in terms of electron transfer and charge changes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Worked example of magnesium burning in oxygen | {"context": "real_world", "treatment": "worked"} | accurate |
| u5 | CONCEPT | Definitions and roles of oxidising agents and reducing agents | {"depth": "explanation"} | accurate |
| u6 | CONCEPT | Concept of oxidation numbers and relationship to oxidation and reduction | {"depth": "explanation"} | accurate |
| u7 | EXAMPLE | Worked example of zinc and copper(II) sulfate displacement using oxidation numbers | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u8 | CAVEAT | Limitation of historical oxygen-based definition of oxidation | {"subtype": "limitation"} | accurate |
| u9 | EXAMPLE | Rusting of iron as a real-world redox reaction | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u10 | EXAMPLE | Combustion of fuels as a real-world redox reaction | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u11 | EXAMPLE | Batteries as a real-world application of redox reactions | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u12 | EXAMPLE | Respiration as a biological redox process | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u13 | PROCEDURE | Procedure for identifying a redox reaction using oxidation numbers | {} | accurate |
| u14 | EXAMPLE | Worked application of identification procedure to sodium and chlorine reaction | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u15 | STUDY_SUPPORT | Recap summary of core redox concepts | {"subtype": "recap"} | accurate |
| u16 | STUDY_SUPPORT | LEO says GER mnemonic for electron transfer | {"subtype": "mnemonic"} | accurate |

## u1: Definition of redox reactions and coupled electron transfer

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
    "reason": "Accurately defines redox reactions in terms of electron transfer and explains that reduction and oxidation are coupled.",
    "errors": []
  }
}
```

```text
A **redox reaction** is a chemical reaction in which **electrons are transferred** between substances.

The word **redox** combines:

- **Red**uction
- **Ox**idation

These two processes always happen together: if one substance loses electrons, another substance must gain them.
```


## u2: OIL RIG mnemonic for electron loss and gain

```json
{
  "attributes": {
    "subtype": "mnemonic"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately presents the standard OIL RIG mnemonic.",
    "errors": []
  }
}
```

```text
> **OIL RIG**  
> **O**xidation **I**s **L**oss of electrons  
> **R**eduction **I**s **G**ain of electrons
```


## u3: Definitions of oxidation and reduction in terms of electron transfer and charge changes

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
    "reason": "Accurately explains how electron loss and gain change charge, supported by representative half-equations.",
    "errors": []
  }
}
```

```text
### Oxidation
When a particle **loses electrons**, it becomes more positive.

\[
\text{Mg} \rightarrow \text{Mg}^{2+} + 2e^-
\]

Magnesium loses two electrons, so magnesium is **oxidised**.

### Reduction
When a particle **gains electrons**, it becomes more negative.

\[
\text{O} + 2e^- \rightarrow \text{O}^{2-}
\]

Oxygen gains electrons, so oxygen is **reduced**.
```


## u4: Worked example of magnesium burning in oxygen

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "worked"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly shows the balanced reaction, electron bookkeeping, and separate half-equations for magnesium reacting with oxygen.",
    "errors": []
  }
}
```

```text
When magnesium burns, it reacts with oxygen to make magnesium oxide:

\[
2Mg + O_2 \rightarrow 2MgO
\]

What happens to the electrons?

- Magnesium starts as neutral Mg and becomes \(Mg^{2+}\). It **loses electrons**.
- Oxygen starts in \(O_2\) and becomes \(O^{2-}\). It **gains electrons**.

So:

- **Magnesium is oxidised**
- **Oxygen is reduced**

The ionic changes can be shown as half-equations:

### Oxidation half-equation
\[
Mg \rightarrow Mg^{2+} + 2e^-
\]

### Reduction half-equation
\[
O_2 + 4e^- \rightarrow 2O^{2-}
\]

The electrons lost by magnesium are exactly the electrons gained by oxygen.
```


## u5: Definitions and roles of oxidising agents and reducing agents

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
    "reason": "Accurately defines oxidising and reducing agents and explains that oxidising agents accept electrons (are reduced) while reducing agents donate electrons (are oxidised).",
    "errors": []
  }
}
```

```text
In redox reactions, substances can cause oxidation or reduction.

### Oxidising agent
An **oxidising agent** causes another substance to be oxidised.

- It **accepts electrons**
- Therefore, it is **reduced**

For example, oxygen often acts as an oxidising agent because it takes electrons from other substances.

### Reducing agent
A **reducing agent** causes another substance to be reduced.

- It **donates electrons**
- Therefore, it is **oxidised**

In the magnesium reaction, magnesium is the reducing agent because it gives electrons to oxygen.

| Substance | What it does | Name |
|---|---|---|
| Magnesium | Loses electrons; is oxidised | Reducing agent |
| Oxygen | Gains electrons; is reduced | Oxidising agent |
```


## u6: Concept of oxidation numbers and relationship to oxidation and reduction

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
    "reason": "Accurately defines oxidation numbers conceptually and states the rule correlating changes in oxidation number with oxidation and reduction.",
    "errors": []
  }
}
```

```text
Sometimes electrons are not written in an equation. Instead, you can identify redox reactions by looking at **oxidation numbers**.

An oxidation number is a number that helps show how many electrons an atom has effectively lost or gained.

### Key rule

- **Oxidation number increases** → oxidation
- **Oxidation number decreases** → reduction
```


## u7: Worked example of zinc and copper(II) sulfate displacement using oxidation numbers

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
    "reason": "Correctly determines oxidation numbers before and after reaction, gives the half-reactions, and identifies the oxidised/reduced species and corresponding agents.",
    "errors": []
  }
}
```

```text
Example:

\[
Zn + CuSO_4 \rightarrow ZnSO_4 + Cu
\]

We can focus on zinc and copper:

\[
Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu
\]

| Element | Before reaction | After reaction | Change |
|---|---:|---:|---|
| Zinc | 0 | +2 | Oxidised |
| Copper | +2 | 0 | Reduced |

Zinc loses two electrons:

\[
Zn \rightarrow Zn^{2+} + 2e^-
\]

Copper ions gain them:

\[
Cu^{2+} + 2e^- \rightarrow Cu
\]

Therefore:

- Zinc is oxidised and is the **reducing agent**
- Copper(II) ions are reduced and are the **oxidising agent**
```


## u8: Limitation of historical oxygen-based definition of oxidation

```json
{
  "attributes": {
    "subtype": "limitation"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately describes the historical definition of oxidation and explains why the electron-transfer definition is broader and more complete.",
    "errors": []
  }
}
```

```text
Historically, oxidation meant “adding oxygen.” For example:

\[
2Cu + O_2 \rightarrow 2CuO
\]

Copper gains oxygen, so it is oxidised.

However, the modern and more complete definition is based on electrons:

> **Oxidation is loss of electrons.**  
> **Reduction is gain of electrons.**

This definition works even when oxygen is not involved.
```


## u9: Rusting of iron as a real-world redox reaction

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
    "reason": "Accurately states that the formation of rust involves the oxidation of iron via electron loss.",
    "errors": []
  }
}
```

```text
### Rusting
Iron reacts with oxygen and water to form rust. Iron loses electrons, so it is oxidised.
```


## u10: Combustion of fuels as a real-world redox reaction

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
    "reason": "Accurately identifies fuel combustion as a redox process involving fuel oxidation and oxygen reduction.",
    "errors": []
  }
}
```

```text
### Combustion
Burning fuels, such as methane, is a redox reaction. The fuel is oxidised and oxygen is reduced.
```


## u11: Batteries as a real-world application of redox reactions

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
    "reason": "Accurately describes how batteries generate current via directed electron flow from the oxidised species to the reduced species.",
    "errors": []
  }
}
```

```text
### Batteries
Batteries produce electricity through redox reactions. Electrons move through a circuit from the substance being oxidised to the substance being reduced.
```


## u12: Respiration as a biological redox process

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
    "reason": "Accurately identifies respiration as a biological redox reaction oxidising glucose and reducing oxygen; the displayed unbalanced equation is a standard introductory simplification.",
    "errors": []
  }
}
```

```text
### Respiration
In living cells, glucose is oxidised and oxygen is reduced to release energy:

\[
\text{glucose} + O_2 \rightarrow CO_2 + H_2O
\]
```


## u13: Procedure for identifying a redox reaction using oxidation numbers

```json
{
  "attributes": {},
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Provides a correct general 4-step method to identify redox reactions using oxidation numbers.",
    "errors": []
  }
}
```

```text
To decide whether a reaction is redox:

1. Find the oxidation numbers of important elements before and after the reaction.
2. Look for an increase in oxidation number: this is oxidation.
3. Look for a decrease in oxidation number: this is reduction.
4. Remember that both must happen in the same reaction.
```


## u14: Worked application of identification procedure to sodium and chlorine reaction

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
    "reason": "Accurately applies oxidation number changes to demonstrate that 2Na + Cl2 -> 2NaCl is a redox reaction.",
    "errors": []
  }
}
```

```text
For example:

\[
2Na + Cl_2 \rightarrow 2NaCl
\]

- Sodium: \(0 \rightarrow +1\), so it is oxidised.
- Chlorine: \(0 \rightarrow -1\), so it is reduced.

This is a redox reaction.
```


## u15: Recap summary of core redox concepts

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
    "reason": "Accurately summarizes the key definitions, oxidation number trends, and roles of oxidising and reducing agents.",
    "errors": []
  }
}
```

```text
- **Redox reactions involve electron transfer.**
- **Oxidation = loss of electrons.**
- **Reduction = gain of electrons.**
- **Oxidation number goes up during oxidation.**
- **Oxidation number goes down during reduction.**
- The **oxidising agent** gains electrons and is reduced.
- The **reducing agent** loses electrons and is oxidised.
```


## u16: LEO says GER mnemonic for electron transfer

```json
{
  "attributes": {
    "subtype": "mnemonic"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Accurately presents the LEO says GER mnemonic mapping loss of electrons to oxidation and gain of electrons to reduction.",
    "errors": []
  }
}
```

```text
> **LEO says GER**  
> **L**ose **E**lectrons = **O**xidation  
> **G**ain **E**lectrons = **R**eduction
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1",
      "u3"
    ],
    "issue": "Whether the introductory overview defining redox reactions (u1) and the subsequent definitions of oxidation and reduction with half-equations (u3) constitute two separate CONCEPT units or a single CONCEPT unit interrupted by the OIL RIG mnemonic (u2).",
    "proposed_resolution": "Separated into u1 and u3 because u1 specifically introduces the overall coupled nature of redox reactions while u3 formally defines oxidation and reduction as individual directional electron and charge shifts."
  },
  {
    "unit_ids": [
      "u4"
    ],
    "issue": "For unit u4 attribute 'context', the reaction is framed as 'When magnesium burns, it reacts with oxygen to make magnesium oxide', which describes an observable laboratory combustion phenomenon, but could also be interpreted as an abstract textbook reaction setup.",
    "proposed_resolution": "Assigned 'real_world' because it explicitly situates the reaction in the physical phenomenon of burning/combustion rather than presenting a purely symbolic or uncontextualized equation."
  },
  {
    "unit_ids": [
      "u8"
    ],
    "issue": "Whether unit u8 is best classified as a CAVEAT (subtype: limitation) highlighting the insufficiency of the historical oxygen-addition definition, or as a CONCEPT explaining the evolution of redox definitions.",
    "proposed_resolution": "Assigned CAVEAT with subtype 'limitation' because the text explicitly contrasts the historical definition with the modern one to point out where the historical rule is insufficient ('This definition works even when oxygen is not involved')."
  },
  {
    "unit_ids": [
      "u12"
    ],
    "issue": "In unit u12, the displayed equation '\\text{glucose} + O_2 \\rightarrow CO_2 + H_2O' mixes a word with chemical formulas and omits stoichiometric balancing coefficients.",
    "proposed_resolution": "Judged as accurate under the guideline to respect reasonable introductory simplifications, as it accurately conveys the qualitative overall biological transformation without claiming to be a formal balanced chemical equation."
  }
]
```

## Unassigned text for coverage review

```text


---

## 1. Oxidation and reduction

A useful memory phrase is:


```

```text


---

## 2. Example: magnesium burning in oxygen


```

```text


---

## 3. Oxidising agents and reducing agents


```

```text


---

## 4. Oxidation numbers


```

```text


---

## 5. Another way to think about oxidation


```

```text


---

## 6. Common real-life redox reactions


```

```text


---

## 7. How to identify a redox reaction


```

```text


---

## Key summary


```

```text


A final memory aid:


```
