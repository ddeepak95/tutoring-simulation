# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response provides a comprehensive and tailored explanation of the mole concept for a high school audience in French, covering the package analogy, Avogadro's constant, molar mass, and the mass-mole conversion formula.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 53,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 4,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 53,
  "unique_subtopics": 4,
  "contextualization": {
    "everyday": 4,
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 7
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: Analogie de la douzaine et de la rame de papier pour introduire la mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "Imagine que tu travailles dans une fabrique d’œufs. Si un client te demande des œufs, tu ne vas pas les compter un par un (\"un, deux, trois...\"). Tu vas utiliser un mot magique : **une douzaine**."}, {"passage_id": "p8", "quote": "Si tu achètes des feuilles de papier pour l'imprimante, tu achètes **une rame** (un paquet de 500 feuilles)."}]}

Annotation rationale: Uses familiar everyday packaging units (a dozen eggs, a ream of paper) to intuitively explain why chemists group microscopic particles into countable 'packages'.

Accuracy: **accurate**. The analogy correctly relates familiar counting units to the concept of the mole as a macroscopic bundle.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Installe-toi. La mole, c’est souvent la bête noire des élèves de lycée, mais tu vas voir qu’en réalité, **c&#x27;est une idée toute simple.** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Pour bien la comprendre, oublie la chimie deux minutes. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. L’analogie du quotidien : Les &quot;paquets&quot; | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Imagine que tu travailles dans une fabrique d’œufs. Si un client te demande des œufs, tu ne vas pas les compter un par un (&quot;un, deux, trois...&quot;). Tu vas utiliser un mot magique : **une douzaine**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | * Une douzaine = 12 œufs. | ANALOGY | {} | [&#x27;list&#x27;] |
| p7 | * Deux douzaines = 24 œufs. | ANALOGY | {} | [&#x27;list&#x27;] |
| p8 | Si tu achètes des feuilles de papier pour l&#x27;imprimante, tu achètes **une rame** (un paquet de 500 feuilles). | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | Eh bien, en chimie, **la mole, c&#x27;est exactement la même chose : c&#x27;est un &quot;paquet&quot;.** | ANALOGY | {} | [&#x27;prose&#x27;] |

## u2: Raison d'être de la mole : l'échelle microscopique des particules (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p13", "quote": "Si tu bois une seule petite gorgée d'eau, tu avales environ :"}]}

Annotation rationale: Explains why counting individual molecules is impractical due to their immense quantity even in macroscopic sips of water.

Accuracy: **accurate**. The estimation of ~10^24 water molecules in a sip (~30 mL / 1.67 mol) is physically accurate to the correct order of magnitude.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p10 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p11 | ### 2. Pourquoi les chimistes ont-ils inventé ce paquet ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | Les atomes et les molécules sont **infiniment petits**.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | Si tu bois une seule petite gorgée d&#x27;eau, tu avales environ : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | $1000000000000000000000000$ molécules d&#x27;eau (un 1 suivi de 24 zéros !). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p15 | C&#x27;est un nombre tellement gigantesque que c&#x27;est impossible et inutile de compter les molécules une par une. Les chimistes ont donc dit :  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p16 | &gt; *&quot;Créons un paquet géant pour compter ces objets minuscules.&quot;* | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p17 | Ce paquet s&#x27;appelle **la mole** (symbole : **mol**). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u3: Nombre d'Avogadro et quantité de matière (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p27", "quote": "* **1 mole d'élèves** = $6,02 \\times 10^{23}$ élèves (la Terre exploserait, c'est beaucoup trop !)."}]}

Annotation rationale: Defines the Avogadro constant (6.022 x 10^23) as the exact size of a mole, illustrates it across entities, and introduces the term 'quantité de matière' (n).

Accuracy: **accurate**. The value of Avogadro's number and the definition of quantity of matter are correctly presented with standard pedagogical simplifications.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p18 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p19 | ### 3. Combien y a-t-il d&#x27;objets dans &quot;une mole&quot; ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p20 | Dans une douzaine, il y a 12 objets.  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p21 | Dans une mole, il y a toujours : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p22 | $$6,022 \times 10^{23} \text{ objets}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p23 | Ce nombre s&#x27;appelle le **Nombre d&#x27;Avogadro** (noté $N_A$).  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p24 | C&#x27;est un 6 suivi de 23 zéros !  | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p25 | * **1 mole d&#x27;atomes de carbone** = $6,02 \times 10^{23}$ atomes de carbone. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p26 | * **1 mole de molécules d&#x27;eau** = $6,02 \times 10^{23}$ molécules d&#x27;eau. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p27 | * **1 mole d&#x27;élèves** = $6,02 \times 10^{23}$ élèves (la Terre exploserait, c&#x27;est beaucoup trop !). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p28 | On appelle le nombre de moles la **quantité de matière**, notée **$n$**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u4: Masse molaire : le pont entre particules et pesée (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p38", "quote": "* Pour l'eau ($H_2O$) : la masse molaire est de $18\\text{ g/mol}$. Si tu pèses **18 g** d'eau, tu as exactement 1 mole d'eau dans ton verre !"}]}

Annotation rationale: Explains how molar mass links microscopic particle counts to macroscopic weighable mass on a balance, referencing carbon and water.

Accuracy: **accurate**. The explanation of molar mass and its unit (g/mol), along with values for carbon (12 g/mol) and water (18 g/mol), is correct within introductory high school chemistry conventions.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p29 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p30 | ### 4. Le tour de magie : Le lien avec la balance (La Masse Molaire) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p31 | Tu te demandes sûrement : *« D&#x27;accord, mais au laboratoire, je ne peux pas voir ces paquets, comment je fais ? »* | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p32 | C&#x27;est là que la mole devient géniale. **Elle fait le pont entre le monde invisible (les atomes) et notre monde (la balance).** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p33 | Regarde ton tableau périodique. Tu verras que le Carbone a une masse de **12**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p34 | Les chimistes ont fait exprès de choisir le nombre d&#x27;Avogadro pour que : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p35 | * **1 mole d&#x27;atomes de carbone pèse exactement 12 grammes !** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p36 | Cette masse s&#x27;appelle la **Masse Molaire** (notée **$M$**, en grammes par mole : $\text{g/mol}$). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p37 | * Si tu veux 1 mole de Carbone ($6,02 \times 10^{23}$ atomes), tu prends une balance et tu pèses **12 g**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p38 | * Pour l&#x27;eau ($H_2O$) : la masse molaire est de $18\text{ g/mol}$. Si tu pèses **18 g** d&#x27;eau, tu as exactement 1 mole d&#x27;eau dans ton verre ! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u5: Formule fondamentale reliant quantité de matière, masse et masse molaire (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Introduces the formula n = m / M and explains each term and its unit.

Accuracy: **accurate**. The formula n = m / M and its associated variables and units are accurate.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p39 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p40 | ### 5. La formule magique à retenir pour tes devoirs | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p41 | C&#x27;est la formule la plus importante de la chimie au lycée : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p42 | $$n = \frac{m}{M}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p43 | * **$n$** : la quantité de matière (en **moles**, mol) $\rightarrow$ *le nombre de paquets* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p44 | * **$m$** : la masse de ton échantillon (en **grammes**, g) $\rightarrow$ *ce que dit la balance* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p45 | * **$M$** : la masse molaire (en **g/mol**) $\rightarrow$ *le poids d&#x27;un seul paquet (trouvé dans le tableau périodique)* | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u6: Calcul du nombre de moles pour 112 g de fer (EXAMPLE)

Attributes: {"context": "real_world", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: A fully worked calculation applying n = m / M to determine the number of moles in a 112 g piece of iron.

Accuracy: **accurate**. The calculation n = 112 / 56 = 2 moles is mathematically and scientifically correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p46 | #### Un petit exemple rapide : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p47 | Tu as un morceau de fer de **112 g**. La masse molaire du fer est $M = 56\text{ g/mol}$. Combien as-tu de moles ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | $$n = \frac{112}{56} = 2\text{ moles}$$ | EXAMPLE | {} | [&#x27;equation&#x27;] |
| p49 | Tu as **2 moles** de fer (soit 2 fois le paquet d&#x27;Avogadro d&#x27;atomes de fer). | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u7: Récapitulatif du concept de la mole (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential takeaway of the mole as a counting unit for chemists and concludes with a check for comprehension.

Accuracy: **accurate**. The recap accurately synthesizes the core meaning of the mole.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p51 | ### En résumé : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p52 | La mole n&#x27;a rien de mystique. C&#x27;est simplement **l&#x27;unité des chimistes pour compter par gros paquets** ce qui est trop petit pour être compté à l&#x27;unité.  | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p53 | Est-ce que cette image du &quot;paquet&quot; te paraît claire ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

