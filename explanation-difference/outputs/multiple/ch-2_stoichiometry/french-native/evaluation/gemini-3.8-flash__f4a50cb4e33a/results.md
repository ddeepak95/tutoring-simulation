# Nested content-unit annotation

Subject: **Chemistry**. English topic: **stoichiometry**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response explains stoichiometry clearly for a high school audience, covering definitions, analogies, stoichiometric coefficients, mole-mass distinctions, limiting reactants, and problem-solving steps.

## Counts

```json
{
  "total_content_units": 6,
  "substantive_content_units": 6,
  "total_passages": 49,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "CAVEAT": 1,
    "PROCEDURE": 1
  },
  "nested_passages": 49,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 3,
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 6
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Introduction and definition of stoichiometry (CONCEPT)

Attributes: {"depth": "statement"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p1", "quote": "c’est juste **la recette de cuisine de la chimie**"}]}

Annotation rationale: Introduces stoichiometry via etymology and the conceptual definition of measuring proportions in chemical reactions.

Accuracy: **accurate**. The etymological breakdown and basic description of stoichiometry as the measurement of reaction proportions are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Installe-toi. Ne te laisse pas impressionner par ce mot barbare : **stœchiométrie** (prononce *sté-kio-mé-tri*). Ça ressemble à une formule magique dans Harry Potter, mais en réalité, c’est juste **la recette de cuisine de la chimie**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p2 | D&#x27;ailleurs, le mot vient du grec ancien : *stoikheion* (élément) et *metron* (mesure). Faire de la stœchiométrie, c’est simplement **mesurer les bonnes proportions d&#x27;éléments chimiques**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p3 | Laisse-moi t&#x27;expliquer cela simplement. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p4 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |

## u2: Sandwich recipe analogy (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "Imagine que tu prépares des sandwichs jambon-fromage selon cette recette stricte :"}]}

Annotation rationale: Uses the construction of ham and cheese sandwiches according to a strict recipe to demonstrate fixed stoichiometric ratios.

Accuracy: **accurate**. The sandwich analogy accurately demonstrates fixed proportion calculations.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p5 | ### 1. La métaphore du sandwich (Pour comprendre le principe) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p6 | Imagine que tu prépares des sandwichs jambon-fromage selon cette recette stricte : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | &gt; **2 tranches de pain + 1 tranche de jambon + 2 tranches de fromage = 1 sandwich** | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | Si je te demande : *&quot;J&#x27;ai 10 tranches de pain, combien me faut-il de jambon et de fromage pour faire des sandwichs parfaits ?&quot;* | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | Tu vas calculer instinctivement : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p10 | * Il te faut 5 tranches de jambon (la moitié du pain). | ANALOGY | {} | [&#x27;list&#x27;] |
| p11 | * Il te faut 10 tranches de fromage (autant que de pain). | ANALOGY | {} | [&#x27;list&#x27;] |
| p12 | * Tu obtiendras 5 sandwichs. | ANALOGY | {} | [&#x27;list&#x27;] |
| p13 | Félicitations, **tu viens de faire de la stœchiométrie sans le savoir !** Tu as utilisé les proportions de la recette pour calculer les quantités nécessaires. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u3: Stoichiometric coefficients and conservation of mass (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains how chemical equations represent molecular ratios using stoichiometric coefficients and illustrates this with water formation and mass conservation.

Accuracy: **accurate**. The balanced equation for water formation, definition of stoichiometric coefficients, and reference to Lavoisier's conservation of mass are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p15 | ### 2. Du sandwich aux molécules | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | En chimie, c&#x27;est exactement la même chose. Sauf qu&#x27;au lieu de tranches de pain, on a des atomes ou des molécules. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | Prenons la fabrication de l&#x27;eau : l&#x27;hydrogène ($H_2$) réagit avec l&#x27;oxygène ($O_2$) pour donner de l&#x27;eau ($H_2O$). | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p18 | L&#x27;équation chimique (la recette), c&#x27;est : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p19 | $$2 H_2 + 1 O_2 \rightarrow 2 H_2O$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p20 | Les grands chiffres devant les molécules s&#x27;appellent les **coefficients stœchiométriques**. Ils te donnent la proportion : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | * Il te faut **2** paquets de dihydrogène pour **1** paquet de dioxygène. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p22 | * Cela te donnera **2** paquets d&#x27;eau. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p23 | Rien ne se perd, rien ne se crée (merci Lavoisier) : tu as 4 atomes de H et 2 atomes de O au début, tu as 4 atomes de H et 2 atomes de O à la fin. Tout est équilibré. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u4: Pitfall of equating grams with stoichiometric ratios (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Clarifies the common student misconception of applying stoichiometric coefficients directly to masses in grams rather than to amounts in moles.

Accuracy: **accurate**. Correctly warns against performing direct stoichiometric calculations on masses, explaining that coefficients denote molar ratios.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p25 | ### 3. Le piège à éviter : Les grammes vs Les Moles | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | C&#x27;est ici que beaucoup d&#x27;élèves se trompent. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p27 | Dans ma recette : 2 tranches de pain + 1 tranche de jambon. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p28 | Est-ce que ça veut dire que 2 **grammes** de pain vont avec 1 **gramme** de jambon ? **Non !** Une tranche de pain ne pèse pas la même chose qu&#x27;une tranche de jambon. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p29 | En chimie, c&#x27;est pareil : | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p30 | Une molécule d&#x27;oxygène est beaucoup plus lourde qu&#x27;une molécule d&#x27;hydrogène. Tu ne peux donc **JAMAIS faire de calculs directs avec les masses (en grammes)**. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;prose&#x27;] |
| p31 | Pour compter les molécules, les chimistes utilisent une unité spéciale : **la mole** (le &quot;paquet&quot; de molécules). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p32 | * Les coefficients de l&#x27;équation te parlent en **moles**, jamais en grammes. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p33 | * $2 H_2 + 1 O_2 \rightarrow 2 H_2O$ veut dire : **2 moles** de $H_2$ réagissent avec **1 mole** de $O_2$ pour donner **2 moles** d&#x27;$H_2O$. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Limiting reactant, excess reactant, and stoichiometric proportions (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p36", "quote": "Que se passe-t-il si tu as 10 tranches de pain, mais seulement 2 tranches de jambon ?"}]}

Annotation rationale: Defines limiting and excess reactants and stoichiometric proportions, tying the concept back to the sandwich components.

Accuracy: **accurate**. The definitions of limiting reactant, excess reactant, and stoichiometric proportions are scientifically standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p34 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p35 | ### 4. Le concept du &quot;Réactif limitant&quot; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p36 | Que se passe-t-il si tu as 10 tranches de pain, mais seulement 2 tranches de jambon ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p37 | Tu ne pourras faire que 2 sandwichs. Il te restera du pain sur les bras. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p38 | En chimie : | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p39 | * Le jambon est le **réactif limitant** : c&#x27;est lui qui s&#x27;épuise en premier et qui arrête la réaction. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p40 | * Le pain est le **réactif en excès** : il en reste à la fin. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p41 | * Un mélange est dit **&quot;dans les proportions stœchiométriques&quot;** quand on a mis pile-poil les bonnes quantités : tout disparaît en même temps, il n&#x27;y a aucun reste ! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Four-step methodology for stoichiometry problems (PROCEDURE)

Attributes: {}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a clear 4-step procedure for students to solve stoichiometry problems (balancing, converting to moles, mole ratios/tableau d'avancement, and converting to target quantity).

Accuracy: **accurate**. The procedural steps and formulas (n = m/M and m = n * M) are entirely correct and standard for high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p42 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p43 | ### 5. La méthode infaillible pour tes exercices (La boîte à outils) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p44 | Quand ton prof te donne un problème de stœchiométrie, suis toujours ces 4 étapes : | PROCEDURE | {} | [&#x27;prose&#x27;] |
| p45 | 1. **Équilibre l&#x27;équation** : Trouve les bons coefficients (la bonne recette). | PROCEDURE | {} | [&#x27;list&#x27;] |
| p46 | 2. **Passe par les moles** : Si on te donne des grammes, convertis-les en moles avec la formule magique : $n = \frac{m}{M}$ *(quantité de matière = masse / masse molaire)*. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p47 | 3. **Fais les proportions (Le tableau d&#x27;avancement)** : Utilise les coefficients stœchiométriques pour voir combien de moles de produits tu vas fabriquer. | PROCEDURE | {} | [&#x27;list&#x27;] |
| p48 | 4. **Réponds à la question** : Si on te demande une masse finale, reconvertis tes moles en grammes ($m = n \times M$). | PROCEDURE | {} | [&#x27;list&#x27;] |
| p49 | Tu vois ? La stœchiométrie n&#x27;a rien de magique. C&#x27;est juste de la comptabilité appliquée aux molécules. Est-ce que cette explication te semble claire ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

