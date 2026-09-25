# Stage 1: English / isotope

Gemini-3.8-flash; model proposals, not independently verified. Stage 2 was not run.

## Topic relevance

{
  "requested_topic": "isotope",
  "observed_topic": "Definition, subatomic structure, carbon isotope examples, chemical and physical properties, and radiocarbon dating of isotopes",
  "topic_match": "on_topic",
  "reason": "The text directly defines isotopes, explains their subatomic basis, presents carbon isotope examples and notation, discusses chemical and physical properties, and illustrates an application with carbon dating.",
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
| u1 | CONCEPT | Definition of isotopes and subatomic explanation | {"depth": "explanation"} | accurate |
| u2 | EXAMPLE | Comparison of carbon isotopes and notation | {"context": "abstract_or_hypothetical", "treatment": "illustrative"} | accurate |
| u3 | CONCEPT | Chemical and physical properties and stability of isotopes | {"depth": "explanation"} | accurate |
| u4 | EXAMPLE | Radiocarbon dating application | {"context": "real_world", "treatment": "illustrative"} | accurate |
| u5 | STUDY_SUPPORT | Quick check practice question on identifying isotopes | {"subtype": "practice_question"} | accurate |

## u1: Definition of isotopes and subatomic explanation

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
    "reason": "The definition and the explanation connecting proton count to element identity and neutron variation to mass number and isotope formation are factually correct.",
    "errors": []
  }
}
```

```text
## Definition
**Isotopes** are atoms of the same element that have the **same number of protons** but a **different number of neutrons**.

This means isotopes have the same **atomic number** but different **mass numbers**.

---

## Let's Break This Down

Remember the structure of an atom:
- **Protons** (positive charge) — located in the nucleus
- **Neutrons** (no charge) — located in the nucleus
- **Electrons** (negative charge) — orbit around the nucleus

The **number of protons** determines what element an atom is. For example, every carbon atom has exactly 6 protons — that's what makes it carbon!

However, the **number of neutrons can vary**, even for the same element. This variation creates isotopes.
```


## u2: Comparison of carbon isotopes and notation

```json
{
  "attributes": {
    "context": "abstract_or_hypothetical",
    "treatment": "illustrative"
  },
  "contextualization": {
    "value": "none",
    "evidence": []
  },
  "accuracy": {
    "verdict": "accurate",
    "reason": "The proton counts, neutron counts, mass numbers, and isotopic notations for Carbon-12, Carbon-13, and Carbon-14 are completely accurate.",
    "errors": []
  }
}
```

```text
## Example: Carbon

| Isotope | Protons | Neutrons | Mass Number |
|---------|---------|----------|-------------|
| Carbon-12 | 6 | 6 | 12 |
| Carbon-13 | 6 | 7 | 13 |
| Carbon-14 | 6 | 8 | 14 |

All three are **carbon** (6 protons), but they have different numbers of neutrons, making them different isotopes.

📝 *Notation:* We write isotopes as **Carbon-12** or **¹²C**, where the number represents the mass number (protons + neutrons).
```


## u3: Chemical and physical properties and stability of isotopes

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
    "reason": "The explanation correctly links identical chemical properties to electron/proton configurations, notes differences in physical properties and stability, and accurately identifies Carbon-12 as stable and Carbon-14 as radioactive.",
    "errors": []
  }
}
```

```text
## Key Points to Remember

✅ Isotopes of the same element have **identical chemical properties** (since chemistry depends on electrons/protons)

✅ Isotopes can have **different physical properties**, like mass and stability

✅ Some isotopes are **stable** (like Carbon-12), while others are **radioactive/unstable** (like Carbon-14, which decays over time)
```


## u4: Radiocarbon dating application

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
    "reason": "The statement accurately reflects how Carbon-14 decay is utilized in radiocarbon dating of ancient organic matter.",
    "errors": []
  }
}
```

```text
## Real-World Application
Carbon-14 is famously used in **carbon dating** — scientists measure how much Carbon-14 has decayed in ancient fossils or artifacts to determine their age!
```


## u5: Quick check practice question on identifying isotopes

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
    "reason": "The problem setup and the provided answer correctly identify atoms with 8 protons as oxygen and conclude that different neutron numbers make them isotopes.",
    "errors": []
  }
}
```

```text
## Quick Check ✏️
**Question:** An atom has 8 protons and 8 neutrons. Another atom has 8 protons and 10 neutrons. Are these isotopes? Why or why not?

*(Answer: Yes! They have the same number of protons — both are oxygen — but different numbers of neutrons.)*
```

## Ambiguities

```json
[
  {
    "unit_ids": [
      "u1"
    ],
    "issue": "Whether to split the initial definition of isotopes from the atomic structure review in 'Let's Break This Down'.",
    "proposed_resolution": "Kept together as a single CONCEPT unit because the atomic structure breakdown directly explains and justifies why proton constancy preserves identity while varying neutron count creates isotopes."
  },
  {
    "unit_ids": [
      "u2"
    ],
    "issue": "Whether the carbon isotope example treatment is 'illustrative' or 'worked'.",
    "proposed_resolution": "Assigned treatment 'illustrative' because the table and text present and interpret the isotopes and notation as a comparative case rather than carrying out step-by-step problem-solving operations."
  },
  {
    "unit_ids": [
      "u3"
    ],
    "issue": "Whether to classify 'Key Points to Remember' as STUDY_SUPPORT (recap) or CONCEPT.",
    "proposed_resolution": "Classified as CONCEPT because the chemical properties, physical properties, and radioactive stability distinctions are substantive concepts introduced for the first time in this section rather than a summary of prior text."
  },
  {
    "unit_ids": [
      "u5"
    ],
    "issue": "Whether the answered 'Quick Check' section should be classified as STUDY_SUPPORT (subtype: practice_question) or EXAMPLE (context: abstract_or_hypothetical, treatment: worked).",
    "proposed_resolution": "Classified as STUDY_SUPPORT with subtype 'practice_question' because it is explicitly presented as a self-check task for the reader, with the parenthetical answer functioning as immediate feedback."
  }
]
```

## Unassigned text for coverage review

```text
# Isotopes


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
