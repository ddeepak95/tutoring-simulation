# Stage 1: English / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition of isotopes, subatomic particle composition, examples of carbon and hydrogen isotopes, and their stability and applications",
  "topic_match": "on_topic",
  "reason": "The response directly defines isotopes in terms of protons and neutrons, illustrates them with carbon and hydrogen examples, and explains their stability and uses.",
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
| u1 | CONCEPT | Definition of isotopes and atomic structure | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Isotopes of carbon | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u3 | EXAMPLE | Isotopes of hydrogen | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u4 | CONCEPT | Significance of isotopes: stability and radioactivity | {"depth": "explanation"} | contains_error |
| u5 | STUDY_SUPPORT | Summary recap of isotopes | {"subtype": "recap"} | accurate |

## u1: Definition of isotopes and atomic structure

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
    "reason": "Correctly defines protons, neutrons, and electrons and how differences in neutron count yield isotopes of the same element with different masses.",
    "errors": []
  }
}
```

```text
**Isotopes** are like different versions of the same element.

Every atom has three main particles:
- **Protons** (positive charge) — these decide what element the atom is.
- **Neutrons** (no charge) — these add weight but don’t change the element.
- **Electrons** (negative charge) — these orbit around the nucleus.

An **isotope** is an atom that has the **same number of protons** (so it’s the same element) but a **different number of neutrons** (so it has a different mass).
```


## u2: Isotopes of carbon

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
    "reason": "Accurately compares Carbon-12, Carbon-13, and Carbon-14 in proton and neutron counts and correctly explains why their chemical behavior is identical.",
    "errors": []
  }
}
```

```text
### Simple Example: Carbon
All carbon atoms have **6 protons**. That’s what makes them carbon.

But they can have different numbers of neutrons:
- Carbon-12: 6 protons + 6 neutrons (most common, stable)
- Carbon-13: 6 protons + 7 neutrons
- Carbon-14: 6 protons + 8 neutrons (radioactive, used for dating old objects)

Even though they have different weights, they all behave chemically the same way because they still have 6 protons and 6 electrons.
```


## u3: Isotopes of hydrogen

```json
{
  "attributes": {
    "context": "real_world",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "everyday",
    "evidence": [
      {
        "excerpt_index": 0,
        "quote": "used in some watches"
      }
    ]
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "Correctly identifies protium, deuterium, and tritium along with their proton and neutron counts and notable real-world uses.",
    "errors": []
  }
}
```

```text
### Another Easy Example: Hydrogen
- **Protium** (normal hydrogen): 1 proton, 0 neutrons
- **Deuterium**: 1 proton, 1 neutron (used in heavy water)
- **Tritium**: 1 proton, 2 neutrons (radioactive, used in some watches and nuclear tests)
```


## u4: Significance of isotopes: stability and radioactivity

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
    "verdict": "contains_error",
    "reason": "The unit misclassifies dinosaur bones as 'artifacts' and implies that dinosaur bones are directly dated via radiometric dating in the same manner as archaeological artifacts like the Shroud of Turin.",
    "errors": [
      {
        "evidence": [
          {
            "excerpt_index": 0,
            "quote": "dating ancient artifacts like the Shroud of Turin or dinosaur bones"
          }
        ],
        "description": "Dinosaur bones are fossils, not human-made 'artifacts'. Furthermore, organic radiocarbon dating (used on artifacts like the Shroud of Turin) cannot date dinosaur fossils, which are tens of millions of years old; dinosaur ages are determined by dating surrounding volcanic/sedimentary rock strata using long-lived radioisotopes.",
        "correction": "dating ancient artifacts like the Shroud of Turin or dating rock layers surrounding dinosaur fossils using long-lived radioisotopes.",
        "severity": "minor"
      }
    ]
  }
}
```

```text
### Why do isotopes matter?
- Some are stable (they don’t change).
- Some are radioactive (they slowly break down and release energy — this is useful in medicine, energy, and dating ancient artifacts like the Shroud of Turin or dinosaur bones).
```


## u5: Summary recap of isotopes

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
    "reason": "Accurately summarizes the core defining features of isotopes.",
    "errors": []
  }
}
```

```text
**Key point to remember**:  
Isotopes = same element, different number of neutrons → different mass, but usually very similar behavior.
```

## Ambiguities

```json
[]
```

## Unassigned text for coverage review

```text


Would you like me to show you how to calculate the number of neutrons in an isotope or give more real-life examples?
```
