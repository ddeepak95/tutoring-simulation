# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **English**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly addresses the requested topic by explaining the structure of atoms, the definition of isotopes, providing concrete examples (carbon and hydrogen), and discussing their significance and applications.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 23,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 23,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 4,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition of isotopes based on subatomic particles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the subatomic particles (protons, neutrons, electrons) and defines an isotope as an atom with the same number of protons but a different number of neutrons.

Accuracy: **accurate**. The explanation accurately identifies the roles of protons, neutrons, and electrons, and correctly defines isotopes based on differences in neutron count and atomic mass.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | **Isotopes** are like different versions of the same element. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | Every atom has three main particles: | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | - **Protons** (positive charge) — these decide what element the atom is. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | - **Neutrons** (no charge) — these add weight but don’t change the element. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - **Electrons** (negative charge) — these orbit around the nucleus. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | An **isotope** is an atom that has the **same number of protons** (so it’s the same element) but a **different number of neutrons** (so it has a different mass). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Carbon isotopes (Carbon-12, Carbon-13, Carbon-14) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Uses carbon isotopes to illustrate how varying neutron counts yield different isotopes with identical chemical properties.

Accuracy: **accurate**. The subatomic compositions of carbon-12, carbon-13, and carbon-14 are correctly stated, as is their identical chemical behavior due to shared valence electron counts.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### Simple Example: Carbon | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | All carbon atoms have **6 protons**. That’s what makes them carbon. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | But they can have different numbers of neutrons: | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p10 | - Carbon-12: 6 protons + 6 neutrons (most common, stable) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | - Carbon-13: 6 protons + 7 neutrons | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 | - Carbon-14: 6 protons + 8 neutrons (radioactive, used for dating old objects) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p13 | Even though they have different weights, they all behave chemically the same way because they still have 6 protons and 6 electrons. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Hydrogen isotopes (Protium, Deuterium, Tritium) (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p17", "quote": "used in some watches"}]}

Annotation rationale: Illustrates the three common isotopes of hydrogen, their names, particle compositions, and notable uses.

Accuracy: **accurate**. Protium, deuterium, and tritium are correctly identified with their respective proton and neutron counts and typical applications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | ### Another Easy Example: Hydrogen | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | - **Protium** (normal hydrogen): 1 proton, 0 neutrons | EXAMPLE | {} | [&#x27;list&#x27;] |
| p16 | - **Deuterium**: 1 proton, 1 neutron (used in heavy water) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p17 | - **Tritium**: 1 proton, 2 neutrons (radioactive, used in some watches and nuclear tests) | EXAMPLE | {} | [&#x27;list&#x27;] |

## u4: Isotope stability and real-world significance (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes matter by distinguishing stable and radioactive isotopes and noting their scientific and technological applications.

Accuracy: **accurate**. The distinction between stable and radioactive decay is scientifically sound, and radiometric dating/medical uses of radioisotopes are appropriately highlighted.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | ### Why do isotopes matter? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p19 | - Some are stable (they don’t change). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 | - Some are radioactive (they slowly break down and release energy — this is useful in medicine, energy, and dating ancient artifacts like the Shroud of Turin or dinosaur bones). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Key takeaway recap and offer for practice (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concise summary equation/formula of the core concept and offers follow-up exercises.

Accuracy: **accurate**. The summary accurately condenses the essential concept of isotopes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | **Key point to remember**:   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | Isotopes = same element, different number of neutrons → different mass, but usually very similar behavior. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p23 | Would you like me to show you how to calculate the number of neutrons in an isotope or give more real-life examples? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

