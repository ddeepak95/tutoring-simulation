# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The explanation thoroughly and accurately covers stoichiometry in French, addressing stoichiometric coefficients, balanced chemical equations, molar calculations, limiting reagents, and gas volumes with worked examples.

## Counts

```json
{
  "total_content_units": 15,
  "substantive_content_units": 15,
  "total_passages": 207,
  "content_unit_kinds": {
    "CONCEPT": 6,
    "CAVEAT": 1,
    "EXAMPLE": 4,
    "PROCEDURE": 1,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 2
  },
  "nested_passages": 207,
  "unique_subtopics": 9,
  "contextualization": {
    "none": 13,
    "everyday": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 15
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Définition de la stœchiométrie et questions associées (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduit la définition de la stœchiométrie et énumère les questions pratiques de calcul de quantités de matière auxquelles elle répond.

Accuracy: **accurate**. La définition et les questions types de la stœchiométrie sont exactes et claires.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | La **stœchiométrie** est la partie de la chimie qui permet de calculer les **quantités de réactifs et de produits** impliquées dans une réaction chimique. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | En bref : elle répond à des questions comme : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | - Quelle masse de produit peut-on fabriquer ? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p4 | - Quelle quantité de réactif faut-il utiliser ? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p5 | - Quel réactif va manquer en premier ? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p6 | - Quel volume de gaz sera produit ? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p7 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Proportions stœchiométriques et passage aux moles (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p9", "quote": "Une équation chimique équilibrée fonctionne comme une recette."}]}

Annotation rationale: Explique comment une équation chimique équilibrée fournit les proportions de réaction, d'abord au niveau microscopique puis au niveau molaire via les coefficients stœchiométriques.

Accuracy: **accurate**. La relation entre l'échelle moléculaire, l'échelle molaire et la signification des coefficients stœchiométriques est parfaitement expliquée.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | ## 1. L’idée principale : une recette chimique | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p9 | Une équation chimique équilibrée fonctionne comme une recette. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p10 | Par exemple : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p11 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p12 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p13 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p14 | Cela signifie que : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p15 | - 2 molécules de dihydrogène \(H_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p16 | - réagissent avec 1 molécule de dioxygène \(O_2\) | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p17 | - pour former 2 molécules d’eau \(H_2O\). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p18 | Mais en laboratoire, on ne compte pas les molécules une par une. On utilise une unité appelée la **mole**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p19 | On peut donc aussi lire l’équation ainsi : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p20 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p21 | 2\ \text{mol de } H_2 + 1\ \text{mol de } O_2 \rightarrow 2\ \text{mol de } H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p22 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p23 | Les nombres devant les formules, appelés **coefficients stœchiométriques**, indiquent les proportions. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Conservation des atomes et équilibrage d'une réaction (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explique la loi de conservation des atomes et démontre pas à pas l'équilibrage d'une équation chimique avec un tableau de vérification.

Accuracy: **accurate**. La conservation des atomes et la méthode d'équilibrage avec vérification sont rigoureusement exactes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p25 | ## 2. Toujours commencer par équilibrer l’équation | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | Une équation chimique doit respecter la conservation des atomes : on ne crée pas et on ne détruit pas d’atomes. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | Exemple non équilibré : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p28 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p29 | H_2 + O_2 \rightarrow H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p30 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p31 | À gauche, il y a 2 atomes d’oxygène ; à droite, seulement 1. Ce n’est pas équilibré. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p32 | On ajoute donc des coefficients : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p33 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p34 | 2H_2 + O_2 \rightarrow 2H_2O | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p35 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p36 | Vérification : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p37 | &#124; Élément &#124; À gauche &#124; À droite &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p38 | &#124;---&#124;---:&#124;---:&#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p39 | &#124; H &#124; 4 &#124; 4 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p40 | &#124; O &#124; 2 &#124; 2 &#124; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;table&#x27;] |
| p41 | L’équation est équilibrée. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Interdiction de modifier les indices chimiques (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Alerte l'élève sur une erreur classique consistant à changer les indices au lieu des coefficients stœchiométriques.

Accuracy: **accurate**. La mise en garde est exacte et pédagogiquement essentielle pour éviter de dénaturer les espèces chimiques lors de l'équilibrage.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | &gt; Attention : on ne change jamais les indices dans les formules chimiques.   | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p43 | &gt; Par exemple, on ne transforme pas \(H_2O\) en \(H_2O_2\). On ajoute seulement des coefficients devant les formules. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |

## u5: La mole et la formule de la masse molaire (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Définit la mole et la relation fondamentale liant quantité de matière, masse et masse molaire (n = m / M).

Accuracy: **accurate**. La formule n = m / M et les unités associées sont exactes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p44 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p45 | ## 3. La mole et la masse molaire | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | La **mole** est une unité de quantité de matière, notée \(n\). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p47 | La relation essentielle est : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p48 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p49 | n = \frac{m}{M} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p50 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p51 | avec : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p52 | - \(n\) : quantité de matière, en moles (mol) ; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p53 | - \(m\) : masse, en grammes (g) ; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p54 | - \(M\) : masse molaire, en g·mol\(^{-1}\). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Calcul de la masse molaire de l'eau (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Donne un exemple résolu de calcul de masse molaire moléculaire à partir des masses molaires atomiques de H et O.

Accuracy: **accurate**. Le calcul de la masse molaire de H2O (18 g/mol) est rigoureusement exact.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p55 | ### Exemple : masse molaire de l’eau | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p56 | Pour \(H_2O\) : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p57 | - H : environ \(1\ \text{g·mol}^{-1}\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p58 | - O : environ \(16\ \text{g·mol}^{-1}\) | EXAMPLE | {} | [&#x27;list&#x27;] |
| p59 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p60 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p61 | M(H_2O) = 2 \times 1 + 16 = 18\ \text{g·mol}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p62 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p63 | Une mole d’eau a donc une masse de 18 g. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u7: Méthode générale en 5 étapes pour un exercice de stœchiométrie (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Fournit l'algorithme séquentiel réutilisable pour résoudre n'importe quel problème stœchiométrique classique.

Accuracy: **accurate**. La méthode en 5 étapes correspond fidèlement à la démarche canonique enseignée au lycée.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p64 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p65 | ## 4. Méthode générale pour un exercice de stœchiométrie | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p66 | Voici la méthode à suivre presque tout le temps : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p67 | 1. **Écrire et équilibrer l’équation chimique.** | PROCEDURE | {} | [&#x27;list&#x27;] |
| p68 | 2. **Transformer les données en moles**, si elles sont données en grammes, litres, etc. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p69 | 3. **Utiliser le rapport des coefficients** de l’équation équilibrée. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p70 | 4. **Convertir le résultat** dans l’unité demandée : grammes, litres, moles… | PROCEDURE | {} | [&#x27;list&#x27;] |
| p71 | 5. Vérifier si un **réactif limitant** est présent. | PROCEDURE | {} | [&#x27;list&#x27;] |

## u8: Exemple résolu 1 : Calcul de la masse de produit formée (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Exercice entièrement résolu appliquant les étapes stœchiométriques pour trouver la masse d'eau produite à partir de 4,0 g de dihydrogène.

Accuracy: **accurate**. Tous les calculs (conversion masse en moles, application du rapport stœchiométrique 1:1, conversion en masse : 36 g) sont corrects.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p72 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p73 | # Exemple 1 : Calculer une masse de produit | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p74 | On fait réagir 4,0 g de dihydrogène \(H_2\) avec suffisamment de dioxygène. Quelle masse d’eau peut-on produire ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p75 | ### Étape 1 : équation équilibrée | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p76 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p77 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p78 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p79 | ### Étape 2 : calculer la quantité de matière de \(H_2\) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p80 | La masse molaire du dihydrogène est : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p81 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p82 | M(H_2) = 2 \times 1 = 2\ \text{g·mol}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p83 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p84 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p85 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p86 | n(H_2) = \frac{m}{M} = \frac{4,0}{2,0} = 2,0\ \text{mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p87 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p88 | ### Étape 3 : utiliser les coefficients stœchiométriques | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p89 | Dans l’équation : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p90 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p91 | 2H_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p92 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p93 | Le rapport est donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p94 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p95 | 2\ \text{mol de } H_2 \rightarrow 2\ \text{mol de } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p96 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p97 | Ainsi : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p98 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p99 | n(H_2O) = 2,0\ \text{mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p100 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p101 | ### Étape 4 : convertir en masse | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p102 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p103 | M(H_2O) = 18\ \text{g·mol}^{-1} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p104 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p105 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p106 | m(H_2O) = n \times M | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p107 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p108 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p109 | m(H_2O) = 2,0 \times 18 = 36\ \text{g} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p110 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p111 | **Réponse : on peut produire 36 g d’eau.** | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u9: Exemple résolu 2 : Utilisation d'un rapport stœchiométrique non unitaire (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Démontre le calcul des moles d'ammoniac NH3 formées à partir de 6,0 mol de H2 en utilisant le rapport stœchiométrique 2/3.

Accuracy: **accurate**. Le calcul (6,0 * 2/3 = 4,0 mol) est parfaitement exact.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p112 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p113 | # Exemple 2 : Utiliser un rapport différent | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p114 | Considérons la réaction : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p115 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p116 | N_2 + 3H_2 \rightarrow 2NH_3 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p117 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p118 | Le diazote \(N_2\) réagit avec le dihydrogène \(H_2\) pour former de l’ammoniac \(NH_3\). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p119 | Supposons que l’on possède 6,0 mol de \(H_2\), avec du \(N_2\) en excès. Combien de moles de \(NH_3\) peut-on former ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p120 | D’après l’équation : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p121 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p122 | 3\ \text{mol de } H_2 \rightarrow 2\ \text{mol de } NH_3 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p123 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p124 | Donc : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p125 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p126 | n(NH_3) = 6,0 \times \frac{2}{3} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p127 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p128 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p129 | n(NH_3) = 4,0\ \text{mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p130 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p131 | **Réponse : 6,0 mol de \(H_2\) permettent de former 4,0 mol de \(NH_3\).** | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u10: Notion de réactif limitant (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Définit le réactif limitant et explique pourquoi il conditionne la quantité maximale de produit susceptible d'être formée.

Accuracy: **accurate**. La définition théorique du réactif limitant est exacte.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p132 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p133 | ## 5. Le réactif limitant | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p134 | Le **réactif limitant** est celui qui est entièrement consommé en premier. Il limite donc la quantité maximale de produits formés. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u11: Analogie de la fabrication de sandwichs (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p135", "quote": "Imagine une recette de sandwich :"}, {"passage_id": "p136", "quote": "- 2 tranches de pain + 1 tranche de fromage → 1 sandwich."}]}

Annotation rationale: Mobilise une comparaison de la vie courante (pain et fromage pour faire des sandwichs) pour faire comprendre intuitivement le rôle du facteur limitant.

Accuracy: **accurate**. L'analogie du sandwich illustre parfaitement le concept de réactif limitant sans erreur logique.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p135 | Imagine une recette de sandwich : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p136 | - 2 tranches de pain + 1 tranche de fromage → 1 sandwich. | ANALOGY | {} | [&#x27;list&#x27;] |
| p137 | Si tu as : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p138 | - 10 tranches de pain, | ANALOGY | {} | [&#x27;list&#x27;] |
| p139 | - 3 tranches de fromage, | ANALOGY | {} | [&#x27;list&#x27;] |
| p140 | tu peux faire seulement 3 sandwichs. Le fromage est le **facteur limitant**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p141 | En chimie, c’est pareil. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u12: Exemple résolu : Détermination du réactif limitant (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Exemple chimique complet comparant les quantités initiales de H2 et O2 pour déterminer le réactif limitant et la quantité maximale de produit.

Accuracy: **accurate**. La comparaison des rapports molaires montre correctement que H2 est limitant et engendre 3,0 mol d'eau.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p142 | ### Exemple | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p143 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p144 | 2H_2 + O_2 \rightarrow 2H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p145 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p146 | On possède : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p147 | - \(3,0\) mol de \(H_2\), | EXAMPLE | {} | [&#x27;list&#x27;] |
| p148 | - \(2,0\) mol de \(O_2\). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p149 | L’équation exige : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p150 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p151 | 2\ \text{mol de } H_2 \text{ pour } 1\ \text{mol de } O_2 | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p152 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p153 | Pour faire réagir 3,0 mol de \(H_2\), il faut : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p154 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p155 | n(O_2) = 3,0 \times \frac{1}{2} = 1,5\ \text{mol} | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p156 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p157 | Or on a 2,0 mol de \(O_2\), donc il y en a assez. C’est le \(H_2\) qui manque en premier. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p158 | **Le dihydrogène \(H_2\) est le réactif limitant.** | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p159 | Puisque \(2H_2 \rightarrow 2H_2O\), les 3,0 mol de \(H_2\) produisent : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p160 | \[ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p161 | 3,0\ \text{mol de } H_2O | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p162 | \] | EXAMPLE | {} | [&#x27;equation&#x27;] |

## u13: Volume molaire des gaz (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Présente la relation V = n * Vm pour les espèces gazeuses et la notion de volume molaire.

Accuracy: **accurate**. La définition du volume molaire et la relation V = n * Vm sont exactes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p163 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p164 | ## 6. Cas des gaz : volume molaire | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p165 | Pour les gaz, on peut parfois utiliser le **volume molaire**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p166 | À température et pression données : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p167 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p168 | V = n \times V_m | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p169 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p170 | avec : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p171 | - \(V\) : volume du gaz ; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p172 | - \(n\) : quantité de matière ; | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p173 | - \(V_m\) : volume molaire. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p174 | Souvent, dans les exercices au lycée, on donne \(V_m\), par exemple : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p175 | \[ | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p176 | V_m = 24,0\ \text{L·mol}^{-1} | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p177 | \] | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;equation&#x27;] |
| p178 | Cela signifie qu’une mole de gaz occupe 24,0 L dans ces conditions. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u14: Récapitulatif des formules importantes (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Fiche de synthèse regroupant les formules directes et inverses reliant moles, masse et volume d'un gaz.

Accuracy: **accurate**. Toutes les formules récapitulées sont parfaitement correctes.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p179 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p180 | ## 7. Formules importantes à connaître | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p181 | ### Pour passer de la masse aux moles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p182 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p183 | n = \frac{m}{M} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p184 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p185 | ### Pour passer des moles à la masse | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p186 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p187 | m = n \times M | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p188 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p189 | ### Pour un gaz | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p190 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p191 | n = \frac{V}{V_m} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p192 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p193 | ou | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p194 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p195 | V = n \times V_m | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p196 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |

## u15: Résumé des idées maîtresses et cheminement type (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Résume les trois piliers de la stœchiométrie et schématise le parcours classique de conversion masse-moles-produit.

Accuracy: **accurate**. Le résumé synthétise fidèlement et sans erreur l'ensemble du cours.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p197 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p198 | ## 8. Résumé | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p199 | La stœchiométrie repose sur trois idées : | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p200 | 1. **Équilibrer l’équation chimique.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p201 | 2. **Utiliser les coefficients comme rapports entre les moles.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p202 | 3. **Convertir entre masse, quantité de matière et volume selon la situation.** | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p203 | Le chemin typique est : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p204 | \[ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p205 | \text{masse du réactif} \rightarrow \text{moles du réactif} \rightarrow \text{moles du produit} \rightarrow \text{masse ou volume du produit} | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p206 | \] | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p207 | La chose la plus importante à retenir est que les coefficients de l’équation équilibrée donnent les proportions de la réaction. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |

