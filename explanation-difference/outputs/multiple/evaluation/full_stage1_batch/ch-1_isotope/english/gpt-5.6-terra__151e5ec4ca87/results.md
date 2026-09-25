# Stage 1: English / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition of isotopes, comparison of carbon isotopes, and stability versus radioactive decay with carbon-14 dating",
  "topic_match": "on_topic",
  "reason": "The explanation directly defines isotopes, illustrates the concept using carbon isotopes, and discusses isotopic stability and radioactive decay.",
  "content_unit_ids": [
    "u1",
    "u2",
    "u3",
    "u4"
  ],
  "major_task_failure": false
}

| Unit | Kind | Label | Attributes | Accuracy |
|---|---|---|---|---|
| u1 | CONCEPT | Definition of isotopes and relationship between subatomic particles and mass | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparison of carbon-12, carbon-13, and carbon-14 isotopes | {"context": "abstract_or_hypothetical", "treatment": "worked"} | accurate |
| u3 | CONCEPT | Distinction between stable and radioactive isotopes | {"depth": "statement"} | accurate |
| u4 | EXAMPLE | Radiocarbon dating using carbon-14 | {"context": "real_world", "treatment": "illustrative"} | accurate |

## u1: Definition of isotopes and relationship between subatomic particles and mass

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
    "reason": "The definition correctly specifies that isotopes share the same proton number but differ in neutron number, explaining how this affects isotopic mass.",
    "errors": []
  }
}
```

```text
An **isotope** is a version of an element that has the same number of **protons** but a different number of **neutrons**.

- The number of **protons** decides which element it is.
- The number of **neutrons** can change without changing the element.
- Therefore, isotopes of the same element have different **masses**.
```


## u2: Comparison of carbon-12, carbon-13, and carbon-14 isotopes

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
    "reason": "The proton counts, neutron counts, mass numbers, and qualitative deductions for carbon-12, carbon-13, and carbon-14 are factually correct.",
    "errors": []
  }
}
```

```text
### Example: Carbon isotopes

Every carbon atom has **6 protons**. However, carbon can have different numbers of neutrons:

| Isotope | Protons | Neutrons | Mass number |
|---|---:|---:|---:|
| Carbon-12 | 6 | 6 | 12 |
| Carbon-13 | 6 | 7 | 13 |
| Carbon-14 | 6 | 8 | 14 |

All three are carbon because they all contain 6 protons. But they are different isotopes because their numbers of neutrons are different.
```


## u3: Distinction between stable and radioactive isotopes

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
    "reason": "The definitions provided for stable and radioactive isotopes accurately state their basic physical behavior.",
    "errors": []
  }
}
```

```text
Some isotopes are **stable**, meaning they do not change over time. Others are **radioactive**, meaning they slowly break down and release radiation.
```


## u4: Radiocarbon dating using carbon-14

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
    "reason": "Carbon-14 is indeed an unstable radioactive isotope used in radiometric dating of organic remains.",
    "errors": []
  }
}
```

```text
For example, carbon-14 is radioactive and is used to estimate the age of ancient bones, wood, and fossils.
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "Attribute treatment for u2: whether presenting the table and concluding that all three are carbon isotopes constitutes 'worked' qualitative reasoning or an 'illustrative' example.",
    "proposed_resolution": "Classified as 'worked' because it supplies specific quantities of protons and neutrons, applies the definition, and reasons to a conclusion identifying why they are the same element yet distinct isotopes."
  },
  {
    "unit_ids": [
      "u3",
      "u4"
    ],
    "issue": "Unit boundary: whether the mention of carbon-14 dating should be kept within u3 as a supporting illustrative sentence or split into a distinct EXAMPLE unit.",
    "proposed_resolution": "Separated into u4 as an EXAMPLE unit because it introduces an explicit real-world application of radioactive isotopes."
  }
]
```

## Unassigned text for coverage review
