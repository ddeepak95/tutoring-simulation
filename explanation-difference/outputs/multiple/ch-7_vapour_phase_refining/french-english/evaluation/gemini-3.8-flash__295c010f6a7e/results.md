# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response directly and comprehensively explains vapour phase refining, including its fundamental mechanism, key conditions, and standard industrial examples (the Mond process and the Van Arkel-de Boer process).

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 40,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 40,
  "unique_subtopics": 5,
  "contextualization": {
    "everyday": 1,
    "none": 4
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Métaphore du déguisement pour expliquer la séparation (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p7", "quote": "Donner un \"déguisement\" invisible au métal"}]}

Annotation rationale: Introduces the overall extraction concept using the everyday analogy of disguising the metal as a gas and removing the disguise later.

Accuracy: **accurate**. The analogy accurately reflects the two-step reversible volatile compound formation and subsequent decomposition in vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Installe-toi. Aujourd&#x27;hui, on va aborder une méthode de chimie très élégante utilisée dans l&#x27;industrie des métaux : **le raffinage en phase vapeur** (ou purification en phase vapeur). | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Ne te laisse pas impressionner par le nom, le principe de base ressemble presque à un tour de magie. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. L&#x27;idée générale : La métaphore du « déguisement » | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Imagine que tu as un bloc de métal brut (comme du nickel ou du titane), mais il est &quot;sale&quot;, c&#x27;est-à-dire mélangé à plein d&#x27;impuretés solides. Comment faire pour extraire uniquement le métal pur ? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | L&#x27;astuce consiste à : | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | 1. **Donner un &quot;déguisement&quot; invisible au métal** pour qu&#x27;il s&#x27;échappe sous forme de gaz (vapeur), en laissant les impuretés derrière lui. | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | 2. **Lui retirer son déguisement** une fois qu&#x27;il est isolé pour récupérer le métal ultra-pur sous forme solide. | ANALOGY | {} | [&#x27;list&#x27;] |
| p9 | C&#x27;est exactement ça, le raffinage en phase vapeur ! | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Mécanisme et conditions en deux étapes du raffinage en phase vapeur (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Explains the two scientific steps: selective volatile compound formation at lower temperature and thermal decomposition at higher temperature.

Accuracy: **accurate**. The explanation correctly outlines the thermodynamic requirements: forming a volatile compound with a specific reagent that leaves impurities behind, followed by high-temperature thermal decomposition.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p11 | ### 2. Comment ça fonctionne concrètement ? (Les 2 étapes clés) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | Pour que cette technique fonctionne, il faut respecter **deux conditions et deux étapes** : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | #### **Étape 1 : La formation d&#x27;un composé volatil (à température modérée)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p14 | On fait réagir le métal impur avec un réactif chimique spécifique. Ce réactif ne va se lier **qu&#x27;avec le métal souhaité** (les impuretés ne réagissent pas).  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p15 | Le produit obtenu est un composé **volatil** (qui s&#x27;évapore très facilement à basse température). Le métal s&#x27;envole donc sous forme de gaz, laissant les impuretés solides au fond du réacteur. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | #### **Étape 2 : La décomposition (à haute température)** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p17 | On récupère ce gaz dans un autre compartiment et on le chauffe à une température beaucoup plus élevée. Sous l&#x27;effet de la forte chaleur, le composé se casse (se décompose) :  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p18 | * Le **métal pur** redevient solide et se dépose. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p19 | * Le **réactif** redevient un gaz libre, qu&#x27;on peut récupérer et réutiliser pour le cycle suivant ! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u3: Procédé Mond pour la purification du nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a complete worked industrial example with balanced chemical equations, temperatures, and products for nickel refining with carbon monoxide.

Accuracy: **accurate**. The reaction conditions (50-60 °C for Ni(CO)4 formation and ~200 °C for decomposition) and stoichiometric chemical equations are completely accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p20 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p21 | ### 3. Deux exemples classiques (parfaits pour tes devoirs !) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | Il y a deux procédés très célèbres que l&#x27;on étudie souvent au lycée : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p23 | #### A. Le procédé Mond (pour purifier le Nickel - $\text{Ni}$) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p24 | * **Étape 1 :** On fait réagir du nickel impur avec du monoxyde de carbone ($\text{CO}$) vers 50-60 °C. Cela donne du tétracarbonyle de nickel, un gaz : | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p25 |   $$\text{Ni (solide impur)} + 4\text{CO (gaz)} \xrightarrow{50-60^\circ\text{C}} \text{Ni(CO)}_4 \text{ (gaz)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p26 |   *(Les impuretés restent solides au fond).* | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | * **Étape 2 :** On chauffe ce gaz vers 200 °C. Il se décompose : | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p28 |   $$\text{Ni(CO)}_4 \text{ (gaz)} \xrightarrow{200^\circ\text{C}} \text{Ni (solide pur)} + 4\text{CO (gaz)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p29 |   *Et voilà, on obtient du nickel pur à 99,9 % !* | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Procédé Van Arkel - de Boer pour le titane (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a worked real-world example of the Van Arkel - de Boer method using iodine and high-temperature tungsten filament decomposition.

Accuracy: **accurate**. The description of reacting impure Ti with iodine at around 250 °C to yield volatile TiI4, followed by cracking on an incandescent tungsten filament (~1400 °C), is chemically and historically accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p30 | #### B. Le procédé Van Arkel - de Boer (pour le Titane - $\text{Ti}$ ou le Zirconium - $\text{Zr}$) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | Ce procédé utilise du **diiode ($\text{I}_2$)**. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p32 | * On chauffe le titane impur avec de l&#x27;iode vers 250 °C pour former un gaz : le tétraiodure de titane ($\text{TiI}_4$). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p33 | * Ce gaz entre ensuite en contact avec un filament de tungstène chauffé à blanc (environ 1400 °C). | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p34 | * Le gaz se décompose instantanément sur le filament : le **titane pur** se dépose dessus et l&#x27;iode gazeux s&#x27;échappe pour recommencer la boucle. | EXAMPLE | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |

## u5: Schéma récapitulatif, bilan énergétique et applications industrielles (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the overarching chemical workflow in a generalized equation, notes its energetic trade-offs, and lists key industrial applications.

Accuracy: **accurate**. The generalized scheme and the discussion of energy costs versus ultra-high purity requirements (e.g., aerospace, nuclear, electronics) are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p36 | ### En résumé : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p37 | Le raffinage en phase vapeur repose sur une règle simple : | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p38 | $$\text{Métal impur} \xrightarrow{+ \text{Réactif}} \text{Gaz (Composé volatil)} \xrightarrow{\text{Forte chaleur}} \text{Métal ultra-pur} + \text{Réactif recyclé}$$ | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;equation&#x27;] |
| p39 | C&#x27;est une méthode un peu coûteuse en énergie (car il faut chauffer), mais elle permet d&#x27;obtenir des métaux d&#x27;une **pureté exceptionnelle**, indispensables pour l&#x27;aéronautique, l&#x27;électronique ou l&#x27;énergie nucléaire. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p40 | Est-ce que cette explication te paraît claire, ou souhaites-tu qu&#x27;on détaille une des équations chimiques ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

