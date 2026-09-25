# Nested content-unit annotation

Subject: **Chemistry**. English topic: **covalent radius**. Language: **French**. Judge: Gemini-3.8-flash.

Accuracy verdicts are model proposals based on subject knowledge; no external references supplied.

[Source](source.md) | [Prompt](prompt.md) | [Evaluation](evaluation.json) | [Schema](schema.json)

## Topic relevance

on_topic: The response clearly and accurately explains the concept of covalent radius to a high school student, addressing why isolated atomic radii cannot be directly measured, how covalent radii are defined and calculated from homonuclear bond lengths, an explanatory analogy, periodic trends, and units of measurement.

## Counts

```json
{
  "total_content_units": 5,
  "substantive_content_units": 5,
  "total_passages": 28,
  "content_unit_kinds": {
    "CONCEPT": 3,
    "ANALOGY": 1,
    "STUDY_SUPPORT": 1
  },
  "nested_passages": 28,
  "unique_subtopics": 3,
  "contextualization": {
    "everyday": 3,
    "none": 2
  },
  "proposed_substantive_verdicts": {
    "accurate": 5
  },
  "proposed_error_records": 0,
  "proposed_error_severity": {},
  "note": "LLM proposals, not verified accuracy. Organization excluded from substantive counts. Errors counted per unit, not globally deduplicated."
}
```

## u1: The problem of defining atomic boundaries (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p5", "quote": "bille de billard"}]}

Annotation rationale: Explains why measuring the size of an isolated atom is impossible due to its fuzzy electron cloud, contrasting it with a hard sphere and setting up the need for bonded measurements.

Accuracy: **accurate**. The explanation correctly characterizes the electron cloud as lacking a sharp boundary and motivates measuring internuclear distances in bonded atoms.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p1 | Bonjour ! C’est une excellente question, et rassure-toi, c&#x27;est une notion très visuelle une fois qu&#x27;on a la bonne image en tête. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |
| p2 | Pour bien comprendre le **rayon covalent**, faisons un petit détour par un problème fondamental en chimie. | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;prose&#x27;] |
| p3 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p4 | ### 1. Le problème : Un atome n&#x27;a pas de bord net ! | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p5 | Si je te demande de mesurer le rayon d&#x27;une bille de billard, c&#x27;est facile : elle a un bord dur et bien défini.  | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p6 | Mais un atome, ce n&#x27;est pas une bille rigide. C&#x27;est un noyau minuscule entouré d&#x27;un **nuage d&#x27;électrons**. Ce nuage est un peu comme du brouillard : plus on s&#x27;éloigne du centre, plus il devient flou, sans jamais s&#x27;arrêter d&#x27;un coup net. On ne peut donc pas poser une règle pour mesurer où s&#x27;arrête l&#x27;atome. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p7 | Alors, comment font les chimistes ? **Ils mesurent les atomes quand ils sont attachés ensemble !** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |

## u2: Definition and calculation of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Defines the covalent radius as half the internuclear distance between two identical bonded atoms sharing electrons.

Accuracy: **accurate**. The definition of the covalent radius as r_cov = D/2 for a homonuclear single covalent bond is standard and correct.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p8 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p9 | ### 2. La solution : Le rayon covalent | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p10 | Quand deux atomes identiques partagent des électrons pour former une **liaison covalente** (par exemple, deux atomes de chlore dans la molécule $\text{Cl}_2$, ou deux atomes de carbone), ils se rapprochent tellement que leurs nuages électroniques fusionnent un peu. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;prose&#x27;] |
| p11 | Les chimistes sont capables de mesurer très précisément la **distance entre les deux noyaux** (appelons-la $D$). | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p12 | Le **rayon covalent ($r_{\text{cov}}$)**, c&#x27;est tout simplement **la moitié de cette distance** : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p13 | $$r_{\text{cov}} = \frac{D}{2}$$ | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;equation&#x27;] |

## u3: Foam ball analogy for covalent overlap (ANALOGY)

Attributes: {}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p15", "quote": "balles en mousse"}]}

Annotation rationale: Uses the image of two compressed foam balls to help visualize why covalent radius corresponds to half the distance between centers of bonded atoms.

Accuracy: **accurate**. The analogy accurately conveys the idea of overlapping or deformed spheres and why the measured radius reflects this bonded distance.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p14 | &gt; **L&#x27;analogie de la balle en mousse :** | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p15 | &gt; Imagine deux balles en mousse qu&#x27;on presse l&#x27;une contre l&#x27;autre. Elles s&#x27;écrasent un peu au point de contact. Le rayon covalent, c&#x27;est la moitié de la distance entre les centres de ces deux balles pressées. | ANALOGY | {} | [&#x27;prose&#x27;] |

## u4: Periodic trends of covalent radius (CONCEPT)

Attributes: {"depth": "explanation"}

Contextualization: {"value": "everyday", "evidence": [{"passage_id": "p20", "quote": "comme si on rajoutait une épaisseur à un oignon"}]}

Annotation rationale: Explains how and why covalent radii vary across periods (increasing effective nuclear charge) and down groups (increasing principal quantum shell).

Accuracy: **accurate**. The periodic trends and their underlying physical justifications (addition of electron shells down a group, higher nuclear charge pulling electrons inward across a period) are scientifically accurate and appropriate for high school chemistry.

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p16 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p17 | ### 3. Comment varie-t-il dans le tableau périodique ? (Très utile pour les devoirs !) | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p18 | Le rayon covalent n&#x27;est pas le même pour tous les éléments, et il suit une logique formidable sur le tableau périodique : | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;prose&#x27;] |
| p19 | 1. **Quand on descend dans une colonne $\downarrow$ : le rayon AUGMENTE.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p20 |    * *Pourquoi ?* À chaque ligne, on ajoute une nouvelle couche d&#x27;électrons (comme si on rajoutait une épaisseur à un oignon). L&#x27;atome devient mécaniquement plus gros. | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |
| p21 | 2. **Quand on va de gauche à droite sur une ligne $\rightarrow$ : le rayon DIMINUE.** | CONCEPT | {&#x27;depth&#x27;: &#x27;statement&#x27;} | [&#x27;list&#x27;] |
| p22 |    * *Pourquoi ? (Attention, c&#x27;est contre-intuitif !)* Sur une même ligne, on a le même nombre de couches, mais le noyau gagne de plus en plus de protons (+). Ce noyau plus puissant attire les électrons (-) plus fortement vers lui. Résultat : l&#x27;atome &quot;s&#x27;auto-compacte&quot; et rétrécit ! | CONCEPT | {&#x27;depth&#x27;: &#x27;explanation&#x27;} | [&#x27;list&#x27;] |

## u5: Recap of covalent radius definition and units (STUDY_SUPPORT)

Attributes: {"subtype": "recap"}

Contextualization: {"value": "none", "evidence": []}

Annotation rationale: Summarizes the essential points of the lesson including definition, interpretation, and measurement units (picometers and angstroms), concluding with an interactive check for understanding.

Accuracy: **accurate**. The summary accurately re-states the definition specifying single covalent bonds and gives correct unit conversion factors for pm (10^-12 m) and Å (10^-10 m).

Review flags: []

| Passage | Source text | Category | Attributes | Formats |
|---|---|---|---|---|
| p23 | --- | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;separator&#x27;] |
| p24 | ### En résumé : | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;structural&#x27;} | [&#x27;heading&#x27;] |
| p25 | * Le **rayon covalent**, c&#x27;est la moitié de la distance entre les noyaux de deux atomes identiques liés par une liaison covalente simple. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p26 | * C&#x27;est la façon dont les chimistes définissent la &quot;taille&quot; pratique d&#x27;un atome engagé dans une molécule. | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p27 | * Il s&#x27;exprime souvent en **picomètres** ($1 \text{ pm} = 10^{-12} \text{ m}$) ou en **angströms** ($1 \text{ Å} = 10^{-10} \text{ m}$). | STUDY_SUPPORT | {&#x27;subtype&#x27;: &#x27;recap&#x27;} | [&#x27;list&#x27;] |
| p28 | Est-ce que cette image te semble claire, ou aimerais-tu qu&#x27;on applique ça à un exemple précis (comme la molécule de dihydrogène $\text{H}_2$) ? | ORGANIZATION | {&#x27;subtype&#x27;: &#x27;social&#x27;} | [&#x27;prose&#x27;] |

