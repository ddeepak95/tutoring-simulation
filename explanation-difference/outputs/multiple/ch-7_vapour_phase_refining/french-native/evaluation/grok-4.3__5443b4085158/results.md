# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation directly covers the principles, mechanism, and classic industrial example (the Mond process for nickel) of vapour phase refining.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 27,
  "content_unit_kinds": {
    "CONCEPT": 2,
    "ANALOGY": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 27,
  "unique_subtopics": 3,
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

## u1: Définition et principe fondamental du raffinage en phase vapeur (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces vapour phase refining as a purification technique where an impure metal is temporarily transformed into a volatile compound to separate it from solid impurities before thermal decomposition.

Accuracy: **accurate**. The basic principle of converting the metal into a volatile compound and later decomposing it to retrieve the pure metal is correctly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Le raffinage en phase vapeur est une méthode de purification utilisée principalement pour certains métaux (comme le nickel). Je vais t’expliquer cela simplement, comme en cours de chimie de lycée. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | ### Principe de base | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p3 | On ne purifie pas le métal directement. À la place, on le transforme temporairement en un **composé volatil** (qui passe facilement à l’état de gaz ou de vapeur). Ce composé peut ensuite être transporté ailleurs et décomposé pour récupérer le métal **pur**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u2: Analogie du tri de billes transformées en fumée (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p4", "quote": "C’est un peu comme si tu voulais trier des billes d’un sac mélangé : tu les transformais en « fumée » sélective qui s’envole toute seule, en laissant les impuretés au sol, puis tu refais apparaître les billes propres plus loin."}]}

Annotation rationale: Uses a pedagogical analogy comparing the selective volatilization of the metal from its impurities to turning mixed marbles into smoke that separates and recondenses elsewhere.

Accuracy: **accurate**. The analogy accurately conveys the qualitative physical idea of selective volatilization and reconversion without introducing misconceptions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p4 | C’est un peu comme si tu voulais trier des billes d’un sac mélangé : tu les transformais en « fumée » sélective qui s’envole toute seule, en laissant les impuretés au sol, puis tu refais apparaître les billes propres plus loin. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Procédé Mond pour la purification du nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the classic worked example of the Mond process: reaction of nickel with carbon monoxide at 50 °C to form nickel tetracarbonyl vapour, followed by thermal decomposition at 200 °C to obtain pure nickel.

Accuracy: **accurate**. The reaction equations, stoichiometric coefficients, intermediate compound Ni(CO)4, and approximate operational temperatures (~50 °C for formation, ~200 °C for decomposition) are chemically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### Exemple classique : le nickel (procédé Mond) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | C’est le cas le plus connu au lycée. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p7 | 1. **Réaction de formation du composé volatil**   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 |    Le nickel impur (avec des impuretés comme du fer, du cuivre, etc.) est mis en contact avec du monoxyde de carbone (CO) à environ 50 °C : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p9 |    \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p10 |    \ce{Ni (impur) + 4 CO -&gt; Ni(CO)4 (gaz)} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p11 |    \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p12 |    Le tétracarbonyle de nickel, \(\ce{Ni(CO)4}\), est un gaz incolore qui s’évapore facilement. Les impuretés, elles, ne forment pas de composé volatil avec le CO : elles restent solides. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p13 | 2. **Décomposition et récupération du métal pur**   | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p14 |    On chauffe le gaz \(\ce{Ni(CO)4}\) à environ 200 °C. Il se décompose : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 |    \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 |    \ce{Ni(CO)4 (gaz) -&gt; Ni (pur) + 4 CO} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p17 |    \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p18 |    Le nickel pur se dépose sous forme de billes ou de poudre brillante, et le monoxyde de carbone est récupéré pour être réutilisé. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Raisons de l'efficacité et avantages du procédé (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains why vapour phase refining is effective: physical separation facilitated by phase change, lower energy consumption compared to smelting or electrolysis, and the carrier role of the reagent.

Accuracy: **accurate**. The technical explanations of phase separation and cyclic utilization of the carrier gas are scientifically sound.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p19 | ### Pourquoi ça marche bien ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | - Le composé volatil permet une **séparation physique** très efficace (le gaz s’éloigne des impuretés solides). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p21 | - On évite les méthodes classiques de fusion ou d’électrolyse qui consomment beaucoup d’énergie. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p22 | - Le monoxyde de carbone joue le rôle de « transporteur » : il vient chercher le nickel et le ramène pur. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Récapitulatif des points clés à retenir (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes key takeaways (difference from classical distillation, chemical selectivity, limitations to certain metals) and provides an interactive closing prompt.

Accuracy: **accurate**. The recap correctly summarizes the distinction from physical distillation and the high selectivity of the chemical reaction.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | ### Points importants à retenir | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | - Ce n’est pas une distillation classique (on ne sépare pas des liquides). C’est une réaction chimique qui crée un gaz intermédiaire. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 | - Le procédé fonctionne seulement pour les métaux capables de former des composés volatils stables (nickel, et dans une moindre mesure cobalt ou fer). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p26 | - C’est une méthode très sélective : les impuretés qui ne réagissent pas restent derrière. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p27 | Tu as compris le principe ? Si tu veux, je peux te faire un schéma simple, te donner les équations avec les états physiques, ou comparer avec d’autres méthodes de raffinage (électrolyse, fusion par zone…). Dis-moi ce qui t’intéresse ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

