# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response explains stoichiometry clearly and accurately in French, using introductory analogies, chemical equations, stoichiometric coefficients, the mole concept, limiting reactants, and a step-by-step problem-solving method.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 52,
  "content_unit_kinds": {
    "CONCEPT": 4,
    "ANALOGY": 1,
    "PROCEDURE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 52,
  "unique_subtopics": 7,
  "contextualization": {
    "everyday": 5,
    "none": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Définition introductive de la stœchiométrie (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p2", "quote": "Si tu sais suivre une recette de cuisine, tu as déjà compris 80 % du travail. **La stœchiométrie, c'est simplement la recette de cuisine de la chimie.**"}]}

Annotation rationale: Introduces the subject, de-dramatizes the term, and defines stoichiometry via the cooking recipe metaphor.

Accuracy: **accurate**. The definition accurately captures the high school conceptual understanding of stoichiometry as the recipe and quantitative proportions of chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Installe-toi. Ne te laisse pas impressionner par ce mot un peu barbare : **la stœchiométrie** (prononce *sté-kio-mé-tri*).  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | En réalité, c&#x27;est un concept très logique. Si tu sais suivre une recette de cuisine, tu as déjà compris 80 % du travail. **La stœchiométrie, c&#x27;est simplement la recette de cuisine de la chimie.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | Voici comment ça marche, étape par étape. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: L'analogie du sandwich pour illustrer les proportions stœchiométriques (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "Imagine que tu prépares des sandwichs au fromage."}]}

Annotation rationale: Presents a concrete sandwich-making scenario to illustrate how stoichiometric ratios work in practice.

Accuracy: **accurate**. The sandwich calculation (10 slices bread + 5 cheese -> 5 sandwiches) is mathematically correct and provides a valid cross-domain analogy for stoichiometric ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### 1. L&#x27;analogie du grilled-cheese (ou du sandwich) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | Imagine que tu prépares des sandwichs au fromage. La &quot;recette&quot;, c&#x27;est : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | &gt; **2 tranches de pain + 1 tranche de fromage $\rightarrow$ 1 sandwich** | ANALOGY | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p8 | Si je te donne **10 tranches de pain**, combien de tranches de fromage te faut-il pour ne rien gaspiller ?  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | Il t&#x27;en faut **5**, et tu obtiendras **5 sandwichs**.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p10 | Félicitations, tu viens de faire de la stœchiométrie ! Tu as calculé les proportions nécessaires pour que la réaction se fasse parfaitement. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u3: Coefficients stœchiométriques et conservation de la matière (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p13", "quote": "En chimie, les ingrédients sont les **réactifs**, et le plat final est le **produit**."}]}

Annotation rationale: Explains chemical reactants, products, stoichiometric coefficients, and the law of conservation of atoms using the synthesis of water.

Accuracy: **accurate**. The equation 2 H2 + O2 -> 2 H2O is correctly balanced, the stoichiometric coefficients are accurately identified, and Lavoisier's conservation of atoms is properly stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p12 | ### 2. Le passage à la chimie : Les coefficients | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | En chimie, les ingrédients sont les **réactifs**, et le plat final est le **produit**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | Prenons la fabrication de l&#x27;eau : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p15 | $$\text{2 H}_2 + \text{O}_2 \rightarrow \text{2 H}_2\text{O}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p16 | Regarde les grands chiffres devant les molécules (on les appelle les **coefficients stœchiométriques**) : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | * Le **2** devant $\text{H}_2$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p18 | * Le **1** sous-entendu devant $\text{O}_2$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | * Le **2** devant $\text{H}_2\text{O}$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 | Cela se lit exactement comme la recette du sandwich :  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | *&quot;Il me faut 2 molécules de dihydrogène et 1 molécule de dioxygène pour fabriquer 2 molécules d&#x27;eau.&quot;* | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p22 | &gt; **Règle d&#x27;or de Lavoisier :** *&quot;Rien ne se perd, rien ne se crée, tout se transforme.&quot;* Tu dois toujours avoir le même nombre d&#x27;atomes à gauche (réactifs) et à droite (produits). Ici, on a 4 hydrogènes et 2 oxygènes des deux côtés. L&#x27;équation est dite **équilibrée**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u4: La mole comme échelle macroscopique (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p27", "quote": "C'est comme quand tu achètes des œufs : tu ne les achètes pas à l'unité, tu achètes une *douzaine* (paquet de 12)."}]}

Annotation rationale: Explains why moles are used instead of single molecules, mentions Avogadro's number and the dozen analogy, and demonstrates how equations are read in moles.

Accuracy: **accurate**. The definition of the mole, the value of Avogadro's number (~6.022 x 10^23), and the interpretation of stoichiometric coefficients in terms of moles are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | ### 3. Le problème de la balance : La Mole | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | Dans la vraie vie, au laboratoire, on ne peut pas attraper &quot;deux molécules&quot; avec une pince à épiler, c&#x27;est beaucoup trop petit. On pèse des grammes avec une balance. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p26 | Pour faire le pont entre le monde microscopique (les atomes) et notre monde (les grammes), les chimistes utilisent un &quot;paquet&quot; géant : **la mole**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p27 | * C&#x27;est comme quand tu achètes des œufs : tu ne les achètes pas à l&#x27;unité, tu achètes une *douzaine* (paquet de 12). | ANALOGY | {} | [&#x27;list&#x27;] |
| p28 | * Une mole, c&#x27;est un paquet d&#x27;environ $6{,}022 \times 10^{23}$ molécules (le nombre d&#x27;Avogadro). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p29 | Donc, dans notre équation : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p30 | $$\text{2 H}_2 + \text{O}_2 \rightarrow \text{2 H}_2\text{O}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p31 | On lit maintenant :  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p32 | *&quot;**2 moles** de $\text{H}_2$ réagissent avec **1 mole** de $\text{O}_2$ pour donner **2 moles** de $\text{H}_2\text{O}$.&quot;* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p33 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u5: Réactif limitant et réactif en excès (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p36", "quote": "Tu as **10 tranches de pain**, mais seulement **2 tranches de fromage** dans ton frigo. Combien de sandwichs peux-tu faire ?"}]}

Annotation rationale: Explains the concepts of limiting and excess reactants using an everyday sandwich scenario before connecting them to chemical reactions.

Accuracy: **accurate**. The reasoning that 2 slices of cheese limit production to 2 sandwiches (leaving 6 slices of bread in excess) is correct, and the definitions of limiting and excess reactants are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | ### 4. Le piège classique : Le réactif limitant | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p35 | Reprenons les sandwichs : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p36 | Tu as **10 tranches de pain**, mais seulement **2 tranches de fromage** dans ton frigo. Combien de sandwichs peux-tu faire ? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p37 | Seulement **2**.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p38 | Il te restera 6 tranches de pain sur les bras.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p39 | * Le fromage est ce qu&#x27;on appelle le **réactif limitant** : c&#x27;est lui qui s&#x27;épuise en premier et qui dicte l&#x27;arrêt de la réaction. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p40 | * Le pain est le **réactif en excès**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p41 | En chimie, c&#x27;est pareil ! Le calcul stœchiométrique te permet de savoir quel ingrédient va manquer en premier. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p42 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u6: Méthode en 4 étapes pour résoudre un exercice de stœchiométrie (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a reusable four-step procedure to solve mass-to-mass stoichiometry problems.

Accuracy: **accurate**. The 4-step algorithm (balancing, mass-to-mole conversion n=m/M, stoichiometric mole ratio, and mole-to-mass conversion m=n*M) is the standard and correct method.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p43 | ### 5. La méthode infaillible pour résoudre un exercice | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | Quand ton professeur te donne un problème de stœchiométrie (par exemple : *&quot;Combien de grammes d&#x27;eau puis-je produire avec 8 grammes d&#x27;oxygène ?&quot;*), suis toujours ces 4 étapes : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p45 | 1. **Équilibre l&#x27;équation chimique** (écris la bonne recette). | PROCEDURE | {} | [&#x27;list&#x27;] |
| p46 | 2. **Convertis les grammes en moles** (car la recette parle en moles, pas en grammes ! Formule : $n = \frac{m}{M}$). | PROCEDURE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p47 | 3. **Utilise les proportions de la recette** (fais un produit en croix / règle de trois grâce aux coefficients). | PROCEDURE | {} | [&#x27;list&#x27;] |
| p48 | 4. **Reconvertis les moles en grammes** si la question te demande une masse ($m = n \times M$). | PROCEDURE | {} | [&#x27;equation&#x27;, &#x27;list&#x27;] |
| p49 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u7: Synthèse et clôture (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the key takeaway of stoichiometry in one sentence and closes with an invitation for further practice.

Accuracy: **accurate**. The summary accurately distills stoichiometry to counting molecules in moles to respect proportions in balanced reactions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | **En résumé :**  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p51 | La stœchiométrie n&#x27;est rien d&#x27;autre que l&#x27;art de compter les molécules par paquets (les moles) pour respecter les proportions d&#x27;une réaction chimique équilibrée. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p52 | Est-ce que cette explication te semble claire ? Veux-tu qu&#x27;on essaie de faire un petit exemple de calcul ensemble ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

