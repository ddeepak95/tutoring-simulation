# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains what isotopes are, illustrates them using carbon isotopes and standard nuclear notation, and discusses their chemical properties and radioactive decay.

## Counts

```json
{
  "total_content_units": 4,
  "substantive_content_units": 4,
  "total_passages": 29,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1
  },
  "nested_passages": 29,
  "unique_subtopics": 3,
  "contextualization": {
    "none": 3,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 4
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Definition and nuclear composition of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines what an isotope is and explains how atoms of the same element share the same number of protons while differing in neutron count and mass.

Accuracy: **accurate**. The explanation that isotopes of an element share the same proton number but differ in neutron number and atomic mass is factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Un **isotope** est une version différente d’un même élément chimique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | Tous les atomes d’un même élément ont le même nombre de **protons** dans leur noyau. C’est ce nombre qui définit l’élément. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p3 | En revanche, les isotopes d’un même élément n’ont pas forcément le même nombre de **neutrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p4 | - Même nombre de protons → même élément chimique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - Nombre de neutrons différent → isotope différent. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - Donc leur masse peut être différente. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u2: Isotopes of carbon (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a concrete example comparing Carbon-12, Carbon-13, and Carbon-14 in terms of proton and neutron counts.

Accuracy: **accurate**. The proton and neutron numbers for carbon-12, carbon-13, and carbon-14 are correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p7 | ### Exemple : le carbone | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p8 | Le carbone possède toujours **6 protons**. Il existe notamment : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 | - **Carbone-12** : 6 protons et 6 neutrons   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | - **Carbone-13** : 6 protons et 7 neutrons   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p11 | - **Carbone-14** : 6 protons et 8 neutrons   | EXAMPLE | {} | [&#x27;list&#x27;] |
| p12 | Les trois sont des atomes de carbone, car ils ont tous 6 protons. Mais ils sont des isotopes car leur nombre de neutrons varie. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u3: Mass number and isotopic notation (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the mass number is defined as the sum of protons and neutrons, and demonstrates how it is written in standard isotopic notation.

Accuracy: **accurate**. The definition of mass number (A = Z + N) and the standard notation for carbon-14 are fully accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | Le nombre après le nom, par exemple dans « carbone-14 », correspond au **nombre total de nucléons** : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p15 | \text{nombre de masse} = \text{protons} + \text{neutrons} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p16 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p17 | Ainsi, pour le carbone-14 : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p18 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p19 | 6\ \text{protons} + 8\ \text{neutrons} = 14 | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p20 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p21 | On peut aussi l’écrire ainsi : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p23 | {}^{14}_{6}\text{C} | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p24 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p25 | - 14 est le nombre total de nucléons ; | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | - 6 est le nombre de protons. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u4: Properties and radioactive dating (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p29", "quote": "Par exemple, le carbone-14 est radioactif et sert à dater des objets anciens, comme des ossements ou du bois."}]}

Annotation rationale: Explains the similarity in chemical properties among isotopes and introduces instability/radioactivity along with the real-world application of carbon-14 dating.

Accuracy: **accurate**. Isotopes share essentially identical chemical behavior due to identical electronic configuration, and radioactive isotopes like carbon-14 are indeed used for radiocarbon dating of organic matter.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p27 | ### Propriétés | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p28 | Les isotopes ont presque les mêmes propriétés chimiques, car ils possèdent le même nombre d’électrons et de protons. Cependant, certains isotopes sont **radioactifs**, c’est-à-dire que leur noyau est instable et se transforme avec le temps. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p29 | Par exemple, le carbone-14 est radioactif et sert à dater des objets anciens, comme des ossements ou du bois. | EXAMPLE | {} | [&#x27;prose&#x27;] |

