# Nested content-unit annotation

Subject: **Chemistry**. English topic: **vapour phase refining**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The entire response directly and accurately explains vapour phase refining, including its core principles, necessary conditions, the two-stage process, and classic industrial examples (Mond process and Van Arkel-de Boer process).

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 41,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 1,
    "EXAMPLE": 2,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 41,
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

## u1: Taxi analogy explaining the principle of vapour phase refining (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p6", "quote": "Le **raffinage en phase vapeur**, c'est comme si tu envoyais une flotte de petits « taxis » chimiques (un gaz) qui ne prennent **que** les atomes de métal à leur bord, en ignorant totalement le sable."}]}

Annotation rationale: Introduces the overall principle of vapour phase refining using an intuitive analogy of a fleet of chemical taxis picking up only metal atoms and leaving sand/impurities behind.

Accuracy: **accurate**. The taxi analogy accurately reflects the selective volatilization and subsequent decomposition steps of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! C’est une excellente question de chimie et de métallurgie. Ne t&#x27;en fais pas, le nom a l’air barbare, mais le principe est en réalité très élégant et logique.  | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Installe-toi, je t’explique tout simplement. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. La grande idée (L&#x27;analogie du taxi) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Imagine que tu aies un tas de sable mélangé à des pépites de métal, et que ce soit impossible de les trier à la main.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | Le **raffinage en phase vapeur**, c&#x27;est comme si tu envoyais une flotte de petits « taxis » chimiques (un gaz) qui ne prennent **que** les atomes de métal à leur bord, en ignorant totalement le sable.  | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | 1. Le métal monte dans le taxi $\rightarrow$ il devient un gaz lui aussi et s&#x27;envole, laissant le sable derrière. | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p8 | 2. On fait rouler le taxi un peu plus loin dans une autre pièce. | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p9 | 3. On force le métal à descendre du taxi $\rightarrow$ le métal redevient solide, totalement pur, et le taxi repart chercher d&#x27;autres atomes. | ANALOGY | {} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p10 | En résumé : **on purifie un métal solide en le transformant temporairement en gaz, pour le séparer de ses impuretés.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Requirements and two-step mechanism of vapour phase refining (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Details the theoretical mechanism, the two necessary conditions (volatility of intermediate compound and ease of decomposition), and the two sequential steps (volatilization at T1 and thermal decomposition at T2).

Accuracy: **accurate**. The two fundamental criteria and the temperature-dependent reversible reaction mechanism are chemically correct and standard.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p12 | ### 2. Comment ça marche en pratique ? (Les 2 étapes clés) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p13 | Ce procédé repose sur une réaction chimique **réversible** (qui peut aller dans un sens puis dans l&#x27;autre) contrôlée par la **température**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p14 | Il y a deux conditions absolues pour que ça marche : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | 1. Le métal doit réagir avec un réactif pour former un composé **volatil** (qui s&#x27;évapore facilement). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p16 | 2. Ce composé gazeux doit pouvoir se décomposer facilement pour redonner le métal pur. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p17 | #### Étape 1 : La volatilisation (On fait monter le métal dans le gaz) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | On prend le métal impur (solide). On fait passer un gaz dessus à une **température $T_1$**. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p19 | Le métal réagit avec le gaz et forme une nouvelle molécule... gazeuse !  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p20 | Les impuretés, elles, ne réagissent pas et restent au fond sous forme solide. On a réussi la séparation. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | #### Étape 2 : La décomposition (On récupère le métal pur) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p22 | On aspire ce nouveau gaz vers un autre endroit du réacteur et on change la température (généralement, on **chauffe beaucoup plus**, à une température $T_2$). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p23 | À cette nouvelle température, la molécule devient instable : elle se « casse ». Le métal redevient un solide ultra-pur qui se dépose sur les parois, et le gaz initial est libéré (puis réutilisé). | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Mond process for the purification of nickel (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Illustrates the application of vapour phase refining via the classic Mond process for nickel with balanced equations and reaction temperatures.

Accuracy: **accurate**. The reaction equations, temperatures (~50 °C for tetracarbonylnickel formation, ~230 °C for decomposition), and physical states are factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p24 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p25 | ### 3. L&#x27;exemple classique du lycée : Le Procédé Mond (pour le Nickel) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | C’est l&#x27;exemple historique parfait découvert à la fin du XIXᵉ siècle pour purifier le **Nickel (Ni)** : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p27 | 1. **La capture (à ~50 °C) :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p28 |    On fait passer du monoxyde de carbone ($CO$, un gaz) sur du nickel impur.  | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p29 |    $$\text{Ni (solide, impur)} + 4\text{CO (gaz)} \xrightarrow{50^\circ\text{C}} \text{Ni(CO)}_4 \text{ (gaz)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p30 |    Le produit formé s&#x27;appelle le *tétracarbonyle de nickel*. C&#x27;est un gaz ! Les impuretés restent solides dans le four. | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p31 | 2. **La libération (à ~230 °C) :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;, &#x27;list&#x27;] |
| p32 |    On envoie ce gaz dans une autre cuve beaucoup plus chaude. La molécule éclate : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p33 |    $$\text{Ni(CO)}_4 \text{ (gaz)} \xrightarrow{230^\circ\text{C}} \text{Ni (solide, PUR à 99,99 %)} + 4\text{CO (gaz)}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p34 |    Le nickel pur se dépose sous forme de petites billes métalliques, et le gaz $CO$ est renvoyé au début pour recommencer le cycle. | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u4: Van Arkel-de Boer process for titanium and zirconium (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "illustrative"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents a brief illustrative mention of the Van Arkel-de Boer process using iodine for refining titanium or zirconium.

Accuracy: **accurate**. The Van Arkel-de Boer process correctly uses iodine (I2) to refine titanium and zirconium into high-purity metals for aerospace and nuclear applications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p35 | *(Autre exemple célèbre pour ta culture : le procédé **Van Arkel-de Boer**, qui utilise du diiode $I_2$ pour purifier le Titane ou le Zirconium pour l&#x27;industrie aérospatiale et nucléaire).* | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u5: Summary of essential points for high school study (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Recapitulates the main takeaways for a student: the meaning of vapour phase, high purity justification, and the role of temperature control.

Accuracy: **accurate**. The summary points accurately capture the rationale, mechanism, and applications of vapour phase refining.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p36 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p37 | ### À retenir pour ton cours : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | * **Pourquoi &quot;phase vapeur&quot; ?** Parce que la séparation se fait en transformant le métal en gaz. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p39 | * **Pourquoi on l&#x27;utilise ?** Parce qu&#x27;il permet d&#x27;obtenir des métaux d&#x27;une **pureté extrême** (plus de 99,9 %), indispensable pour les semi-conducteurs (électronique) ou l&#x27;aéronautique. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p40 | * **Le secret ?** Jouer sur la **température** pour faire réagir le métal dans un sens, puis dans l&#x27;autre. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;, &#x27;prose&#x27;] |
| p41 | Est-ce que c&#x27;est plus clair pour toi présenté comme ça ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

