# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and thoroughly addresses the covalent radius, including its definition, formula, a concrete worked example with chlorine, its significance, periodic table trends with explanations, a summary schematic, and an analogy.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 35,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1,
    "ANALOGY": 1
  },
  "nested_passages": 35,
  "unique_subtopics": 5,
  "contextualization": {
    "none": 5,
    "everyday": 1
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Définition et calcul du rayon covalent (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the formal definition of covalent radius as half the internuclear distance between two identical bonded atoms and provides the corresponding formula.

Accuracy: **accurate**. The definition and formula correctly reflect standard introductory chemistry conventions for homonuclear single-bonded diatomic molecules.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | # Le Rayon Covalent | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p2 | ## Définition | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | Le **rayon covalent** est la moitié de la distance qui sépare les noyaux de deux atomes identiques liés par une liaison covalente simple. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p4 | $$r_{covalent} = \frac{d_{A-A}}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p5 | Où **d** représente la distance internucléaire mesurée entre les deux atomes. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Calcul du rayon covalent du chlore (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Applies the definition to the chlorine molecule (Cl2), providing the experimental internuclear bond length and deriving the covalent radius of chlorine.

Accuracy: **accurate**. The Cl-Cl bond length of 198 pm and the resulting covalent radius of 99 pm are factually correct standard chemical values.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p6 | ## Exemple concret | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p7 | Prenons la molécule de dichlore (Cl₂) : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p8 | - La distance entre les deux noyaux de chlore est de **198 pm** (picomètres) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p9 | - Le rayon covalent du chlore est donc : 198/2 = **99 pm** | EXAMPLE | {} | [&#x27;list&#x27;] |

## u3: Importance du rayon covalent (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Lists the primary chemical utilities and applications of understanding the covalent radius.

Accuracy: **accurate**. The stated purposes (predicting bond lengths, comparing atomic sizes, and understanding chemical reactivity) are standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | ## Pourquoi c&#x27;est important ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p11 | Cette grandeur nous permet de : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | 1. **Prédire la longueur des liaisons** dans différentes molécules | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p13 | 2. **Comparer la taille des atomes** entre eux | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p14 | 3. **Comprendre la réactivité chimique** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u4: Tendances périodiques du rayon covalent (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how the covalent radius varies across periods and down groups in the periodic table, providing the underlying atomic structure explanations.

Accuracy: **accurate**. The explanation of trends (decreasing across a period due to increased nuclear charge/attraction; increasing down a group due to added electron shells) is scientifically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ## Évolution dans le tableau périodique | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | Le rayon covalent suit des tendances régulières : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p17 | **Le long d&#x27;une période (de gauche à droite) :** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p18 | - Le rayon **diminue** ↓ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p19 | - Explication : le nombre de protons augmente, donc l&#x27;attraction du noyau sur les électrons est plus forte | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p20 | **Le long d&#x27;une colonne (de haut en bas) :** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | - Le rayon **augmente** ↑ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p22 | - Explication : on ajoute des couches électroniques supplémentaires | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Schéma visuel récapitulatif des tendances périodiques (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a visual ASCII-art summary diagram reinforcing the periodic trends for students to memorize.

Accuracy: **accurate**. The schematic diagram accurately reflects that radius decreases towards the right across a period and increases downwards along a column.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ## Schéma mental à retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | ``` | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;separator&#x27;] |
| p25 |         Rayon augmente ↓ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;diagram&#x27;] |
| p26 |         ┌─────────────┐ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;diagram&#x27;] |
| p27 |         │  H           │ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;diagram&#x27;] |
| p28 | Rayon → │  Li  Be  ... │ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;diagram&#x27;] |
| p29 | diminue │  Na  Mg  ... │ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;diagram&#x27;] |
| p30 |    →    │  K   Ca  ... │ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;diagram&#x27;] |
| p31 |         └─────────────┘ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;diagram&#x27;] |
| p32 | ``` | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;separator&#x27;] |

## u6: Analogie de la poignée de main (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p34", "quote": "Pense au rayon covalent comme à **la moitié d'une poignée de main** entre deux atomes identiques : plus les atomes sont \"gros\", plus la distance de la poignée de main est grande !"}]}

Annotation rationale: Uses a pedagogical everyday analogy comparing the covalent radius to half a handshake between two people.

Accuracy: **accurate**. The intuitive analogy of a handshake appropriately conveys the concept of sharing a bond and the distance separating the two participants.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p33 | ## Petit conseil pédagogique | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p34 | Pense au rayon covalent comme à **la moitié d&#x27;une poignée de main** entre deux atomes identiques : plus les atomes sont &quot;gros&quot;, plus la distance de la poignée de main est grande ! | ANALOGY | {} | [&#x27;prose&#x27;] |
| p35 | Veux-tu que je t&#x27;explique maintenant la différence avec le rayon ionique ou le rayon de van der Waals ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

