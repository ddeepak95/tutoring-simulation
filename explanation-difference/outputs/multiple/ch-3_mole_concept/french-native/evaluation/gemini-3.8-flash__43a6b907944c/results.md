# Nested content-unit annotation

Subject: **Chemistry**. English topic: **mole concept**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response comprehensively explains the mole concept in chemistry for a high school student, covering counting units by analogy, the microscopic necessity of moles, Avogadro's number, molar mass, and the calculation formula n = m / M with a worked example.

## Counts

```json
{
  "total_content_units": 7,
  "substantive_content_units": 7,
  "total_passages": 52,
  "content_unit_kinds": {
    "ANALOGY": 1,
    "CONCEPT": 3,
    "CAVEAT": 1,
    "EXAMPLE": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 52,
  "unique_subtopics": 6,
  "contextualization": {
    "everyday": 4,
    "none": 3
  },
  "proposed_substantive_verdicts": {
    "accurate": 6,
    "contains_error": 1
  },
  "proposed_error_records": 1,
  "proposed_error_severity": {
    "minor": 1
  },
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: L'analogie des paquets du quotidien pour introduire la mole (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "Si je te demande d’aller acheter des œufs et que je te dis : « Prends une **douzaine** d'œufs », tu sais exactement combien il y en a : **12**."}, {"passage_id": "p6", "quote": "Si je te parle d'une **paire** de chaussures, tu penses à **2**."}]}

Annotation rationale: Introduces the mole conceptually by drawing an analogy to familiar everyday grouping units (dozen, pair, ream).

Accuracy: **accurate**. The comparison of chemical moles to counting collections like dozens or reams is standard, pedagogical, and factually correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! Installe-toi. Je sais que la mole est souvent la « bête noire » des élèves au lycée, mais tu vas voir : **c&#x27;est en réalité une idée toute simple.** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Pour bien la comprendre, oublie la chimie deux minutes et viens faire des courses avec moi. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. L’analogie des œufs (ou le « paquet » du chimiste) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Si je te demande d’aller acheter des œufs et que je te dis : « Prends une **douzaine** d&#x27;œufs », tu sais exactement combien il y en a : **12**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p6 | Si je te parle d&#x27;une **paire** de chaussures, tu penses à **2**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p7 | Si je te parle d&#x27;une **rame** de papier, tu penses à **500** feuilles. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p8 | Ces mots (« douzaine », « paire », « rame ») sont juste des **mots pratiques pour désigner des paquets d’objets**. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p9 | Eh bien, pour un chimiste : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p10 | &gt; **Une mole, c’est juste un paquet.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Raison d'être de la mole liée à l'échelle atomique (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p14", "quote": "Si tu devais compter les atomes dans une simple gorgée d'eau, tu te retrouverais avec des milliards de milliards de milliards d'atomes."}]}

Annotation rationale: Explains why chemists need a distinct, extremely large unit rather than ordinary units, citing the minuscule size and immense number of atoms.

Accuracy: **accurate**. Correctly explains the physical rationale for adopting a macroscopic counting unit for entities at the atomic scale.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p11 | ### 2. Pourquoi créer un nouveau paquet ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p12 | Pourquoi ne pas utiliser la « douzaine » en chimie ? | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | Parce que les atomes et les molécules sont **infiniment petits**. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p14 | Si tu devais compter les atomes dans une simple gorgée d&#x27;eau, tu te retrouverais avec des milliards de milliards de milliards d&#x27;atomes. C&#x27;est impossible à manipuler ! Les chimistes ont donc créé un « paquet géant », adapté à la taille minuscule des atomes. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |

## u3: Valeur du nombre d'Avogadro et exemples d'entités (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p20", "quote": "une mole d'atomes de carbone, par exemple, ça tient dans le creux de ta main."}]}

Annotation rationale: Presents the exact numerical magnitude of Avogadro's number (6.022 x 10^23) and gives illustrative examples of what 1 mole represents.

Accuracy: **contains_error**. Passage p19 states that 6.022 x 10^23 is 'un 6 suivi de 23 zéros', which would be 6 x 10^23; in reality, it is a 6 followed by 23 digits (specifically 022 followed by 20 zeros, as correctly written immediately afterwards in fully expanded notation).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p15 | ### 3. Combien y a-t-il d&#x27;objets dans une mole ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p16 | Dans **une mole**, il y a toujours : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p17 | **$6,022 \times 10^{23}$ objets.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p18 | *(C&#x27;est ce qu&#x27;on appelle le **Nombre d&#x27;Avogadro**, noté $N_A$)*. | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p19 | C&#x27;est un 6 suivi de 23 zéros : **602 200 000 000 000 000 000 000 !** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p20 | C&#x27;est un nombre gigantesque. Si tu avais une mole de billes, elles recouvriraient toute la surface de la Terre sur une hauteur de plusieurs kilomètres ! Mais comme les atomes sont minuscules, une mole d&#x27;atomes de carbone, par exemple, ça tient dans le creux de ta main. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p21 | * Retiens bien : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p22 |   * 1 mole de fer = $6,022 \times 10^{23}$ atomes de fer. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p23 |   * 1 mole d&#x27;eau = $6,022 \times 10^{23}$ molécules d&#x27;eau. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p24 |   * 1 mole d&#x27;élèves = $6,022 \times 10^{23}$ élèves (ça ferait beaucoup trop de copies à corriger !). | EXAMPLE | {} | [&#x27;list&#x27;] |

Error (minor; p19): The text states that 6.022 x 10^23 is 'un 6 suivi de 23 zéros', but 6 followed by 23 zeros equals 6 x 10^23. For 6.022 x 10^23, the digit 6 is followed by 23 decimal digits, of which only 20 are trailing zeros (602 200... with 20 zeros).

Correction: Say 'un 6 suivi de 23 chiffres' or '6022 suivi de 20 zéros'.

## u4: Confusion fréquente entre nombre d'entités et masse (masse molaire) (CAVEAT)

Attributes: {"subtype": "misconception"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p27", "quote": "Est-ce qu'une douzaine d'œufs pèse le même poids qu'une douzaine d'éléphants ?"}]}

Annotation rationale: Clarifies the common student misconception that a mole always has the same weight, explaining that while the entity count is identical, molar masses vary between elements.

Accuracy: **accurate**. The distinction between counting entities and molar mass is accurately explained, and the molar masses cited (C: 12 g/mol, O: 16 g/mol, Au: 197 g/mol) are standard values.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p25 | ### 4. Le piège à éviter : Le poids du paquet ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p26 | Attention, c&#x27;est là que beaucoup d&#x27;élèves se trompent : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p27 | Est-ce qu&#x27;une douzaine d&#x27;œufs pèse le même poids qu&#x27;une douzaine d&#x27;éléphants ? | ANALOGY | {} | [&#x27;prose&#x27;] |
| p28 | **Non, bien sûr.** Il y a 12 individus à chaque fois, mais un éléphant est plus lourd qu&#x27;un œuf. | ANALOGY | {} | [&#x27;prose&#x27;] |
| p29 | En chimie, c&#x27;est pareil : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p30 | * Une mole contient **toujours le même nombre** d&#x27;atomes ($6,022 \times 10^{23}$). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p31 | * Mais **chaque mole a sa propre masse**, parce que certains atomes sont plus lourds que d&#x27;autres. | CAVEAT | {&#x27;subtype&#x27;: &#x27;misconception&#x27;} | [&#x27;list&#x27;] |
| p32 | La masse d&#x27;une mole s&#x27;appelle la **Masse Molaire** (notée $M$, en grammes par mole ou $\text{g/mol}$) : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p33 | * 1 mole de Carbone pèse **12 g**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p34 | * 1 mole d&#x27;Oxygène pèse **16 g**. | EXAMPLE | {} | [&#x27;list&#x27;] |
| p35 | * 1 mole d&#x27;Or pèse **197 g** (l&#x27;atome d&#x27;or est beaucoup plus lourd !). | EXAMPLE | {} | [&#x27;list&#x27;] |
| p36 | *(Toutes ces valeurs sont écrites dans la classification périodique, tu n&#x27;as jamais à les apprendre par cœur).* | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;study_strategy&#x27;} | [&#x27;prose&#x27;] |

## u5: Formule fondamentale reliant masse, masse molaire et quantité de matière (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Presents the bridge formula n = m / M used in high school practical laboratory work and defines each variable with its associated units.

Accuracy: **accurate**. The equation n = m / M and the definitions and units of n (mol), m (g), and M (g/mol) are accurately stated.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p37 | ### 5. À quoi ça sert dans les exercices ? (La formule magique) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p38 | Au laboratoire, on ne peut pas compter les atomes un par un. Par contre, on a une balance ! | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p39 | La mole est **le pont entre le monde invisible (les atomes) et notre monde (les grammes sur la balance).** | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p40 | Quand tu es en TP, tu utilises la formule reine du lycée : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p41 | $$n = \frac{m}{M}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |
| p42 | *   $n$ = la **quantité de matière** (le nombre de &quot;paquets&quot;, c&#x27;est-à-dire le nombre de **moles**, noté en **mol**). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p43 | *   $m$ = la **masse** de ton échantillon (ce que tu pèses sur la balance, en **grammes**). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p44 | *   $M$ = la **masse molaire** (le poids d&#x27;un seul &quot;paquet&quot;, que tu trouves dans le tableau périodique, en **$\text{g/mol}$**). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |

## u6: Calcul de la quantité de matière dans un échantillon de carbone (EXAMPLE)

Attributes: {"context": "abstract_or_hypothetical", "treatment": "worked"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Demonstrates a worked numerical calculation determining the number of moles from a given sample mass of 24 g of carbon.

Accuracy: **accurate**. The arithmetic (24 / 12 = 2 mol) and entity conversion (2 * 6.022 * 10^23) are correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p45 | **Un exemple concret :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p46 | Tu pèses $24\text{ g}$ de carbone. Combien as-tu de paquets (de moles) ? | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p47 | Puisqu&#x27;un paquet pèse $12\text{ g}$ ($M = 12\text{ g/mol}$), tu fais : | EXAMPLE | {} | [&#x27;prose&#x27;] |
| p48 | $n = \frac{24}{12} = 2\text{ moles}$. | EXAMPLE | {} | [&#x27;equation&#x27;, &#x27;prose&#x27;] |
| p49 | Tu as 2 paquets de carbone (soit $2 \times 6,022 \times 10^{23}$ atomes). | EXAMPLE | {} | [&#x27;prose&#x27;] |

## u7: Récapitulatif final et conclusion (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the core takeaway of the mole as a standardized grouping box for microscopic entities, closing the lesson.

Accuracy: **accurate**. The summary provides an accurate, accessible closing synthesis of the concept.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p50 | ### En résumé : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p51 | La mole n&#x27;est rien d&#x27;autre qu&#x27;une **boîte standard** que le chimiste utilise pour regrouper les atomes par milliards, afin de pouvoir facilement les peser et faire ses recettes de cuisine chimique. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;prose&#x27;] |
| p52 | Est-ce que cette image du &quot;paquet&quot; te paraît plus claire ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

