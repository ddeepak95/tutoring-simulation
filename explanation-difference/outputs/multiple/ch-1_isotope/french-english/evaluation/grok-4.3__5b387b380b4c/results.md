# Nested content-unit annotation

Subject: **Chemistry**. English topic: **isotope**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly and thoroughly covers the requested topic of isotopes, including the atomic structure context, core definition, carbon examples, physical and chemical properties, real-world applications, and a summary.

## Counts

```json
{
  "total_content_units": 8,
  "substantive_content_units": 8,
  "total_passages": 23,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 2,
    "EXAMPLE": 4,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 23,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 8
  },
  "proposed_substantive_verdicts": {
    "accurate": 8
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Planetary analogy for atomic structure (ANALOGY)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces subatomic particles (protons, neutrons, electrons) by comparing the atom to a small planet with an orbiting system.

Accuracy: **accurate**. Accurately introduces basic atomic structure using an introductory planetary model comparison.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Je vais t’expliquer ce qu’est un isotope de façon simple et claire, comme si nous étions en cours de chimie au lycée. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Imagine un atome comme une petite planète avec un noyau au centre. Dans ce noyau, il y a toujours deux types de particules : les **protons** (qui ont une charge positive) et les **neutrons** (qui n’ont pas de charge). Autour du noyau tournent les **électrons** (charge négative). | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Definition of an isotope (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: States the fundamental definition of an isotope as atoms of the same element having identical proton numbers but differing neutron numbers.

Accuracy: **accurate**. The definition is standard and factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p3 | Un **isotope** est une version d’un élément chimique qui a le **même nombre de protons**, mais un **nombre différent de neutrons**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Carbon isotopes and notation (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Walks through carbon isotopes (carbon-12, 13, and 14) showing how protons and neutrons sum to mass number and how isotopic notation is written.

Accuracy: **accurate**. All proton counts, neutron counts, mass numbers, and isotopic notations for carbon are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | ### Exemple concret : le carbone | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | - Tous les atomes de carbone ont **6 protons** (c’est ce qui définit l’élément carbone). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p6 | - Il existe plusieurs isotopes du carbone : | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p7 |   - Le carbone-12 : 6 protons + 6 neutrons → masse = 12 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p8 |   - Le carbone-13 : 6 protons + 7 neutrons → masse = 13 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 |   - Le carbone-14 : 6 protons + 8 neutrons → masse = 14 | EXAMPLE | {} | [&#x27;list&#x27;] |
| p10 | On les écrit comme ceci :   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p11 | **¹²C**, **¹³C**, **¹⁴C**   | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p12 | (le petit nombre en haut à gauche est le **nombre de masse** = protons + neutrons). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Chemical and physical properties of isotopes (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why isotopes of an element have identical chemical properties while differing in physical characteristics like mass and nuclear stability.

Accuracy: **accurate**. The explanation of identical chemical behavior due to electronic structure and differing physical/nuclear stability properties is accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p13 | ### Points importants à retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | - Les isotopes d’un même élément ont **les mêmes propriétés chimiques** (ils réagissent de la même façon avec les autres atomes), car les réactions chimiques dépendent surtout des électrons et du nombre de protons. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p15 | - En revanche, ils peuvent avoir des **propriétés physiques différentes**, notamment leur masse et leur stabilité. Par exemple, le carbone-14 est **radioactif** (il se transforme lentement en azote), alors que le carbone-12 est stable. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | - On trouve souvent des isotopes stables et d’autres radioactifs (isotopes radioactifs ou radioisotopes). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Medical applications of radioisotopes (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a real-world example of radioisotope utilization in medical treatments and diagnostic imaging.

Accuracy: **accurate**. Accurately references the medical use of radioisotopes for cancer treatment and medical imaging.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p17 | ### Pourquoi c’est utile ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | - En médecine : certains isotopes radioactifs servent à soigner le cancer ou à faire des examens (scanners). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u6: Archaeological dating with carbon-14 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a distinct concrete application of carbon-14 in archaeology for dating ancient artifacts.

Accuracy: **accurate**. Accurately identifies radiocarbon dating of historical artifacts as an application of carbon-14.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | - En archéologie : la datation au carbone-14 permet de savoir l’âge des objets anciens. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u7: Energy application of uranium-235 (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Provides a distinct real-world application of uranium-235 as fuel in nuclear power plants.

Accuracy: **accurate**. Accurately notes the use of uranium-235 as a nuclear fuel.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | - En énergie : l’uranium-235 est un isotope utilisé dans les centrales nucléaires. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u8: Summary recap of isotope definition (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential defining properties of isotopes in a single recap sentence with closing remarks.

Accuracy: **accurate**. The summary statement is correct and aligns with standard chemistry definitions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p21 | En résumé :   | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 | **Un isotope = même élément, même nombre de protons, nombre de neutrons différent.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p23 | Tu as compris ? Si tu veux, je peux te donner d’autres exemples (hydrogène, uranium, etc.) ou t’expliquer la radioactivité plus en détail ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

