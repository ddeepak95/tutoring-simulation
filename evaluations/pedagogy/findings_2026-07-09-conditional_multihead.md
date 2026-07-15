# Findings: Per-Dimension Pedagogical Scoring of Tutoring Conversations

*Deepak — July 9, 2026. Artifacts: `plan.md` (working plan), `ModernBertConditioned.ipynb`, `ModernBertMultiHead.ipynb`.*

## Goal

A model that scores a raw tutoring conversation 1–5 on an asserted pedagogical dimension
(target dimensions: Cognitive Engagement, Formative Assessment, Accountability), as a
step toward comparing tutoring quality across languages.

## Setup

- **Training data:** CONVOLEARN (HF `masharma/convolearn`) — 2,134 unique conversations,
  each labeled on **one** of six dimensions with a consensus effectiveness score
  (1.0–5.0, half-points). Per-dimension counts: Metacognition 589, Cognitive Engagement
  501, Formative Assessment 289, Power Dynamics 288, Accountability 278, Cultural
  Responsiveness 189.
- **Split:** topic-stratified 70/15/15 (1,491 / 318 / 325), seed 42, identical across all
  models. (The paper split by seed question; that column isn't public — known limitation.)
- **Two architectures**, both ModernBERT-large (395M), bf16, A100, ~6 min training each:
  1. **Dimension-conditioned regression** — input is `Dimension: <name>\nDefinition:
     <paragraph>\n\nConversation: <text>` → one scalar; scoring a new conversation on N
     dimensions = N forward passes swapping the conditioning block.
  2. **Multi-head** — raw conversation, one output unit per dimension, masked MSE (each
     row trains only its own dimension's head). Structurally cannot collapse across
     dimensions at the head level.
- **Reference points:** the CONVOLEARN paper's conditioned Longformer: r=0.736,
  RMSE=0.710, MAE=0.530. Our Longformer replication (same public data): r=0.672,
  RMSE=0.815, MAE=0.607.

## Result 1: held-out test metrics (n=325)

| | Conditioned | Multi-head |
|---|---|---|
| Overall Pearson r | **0.702** | 0.656 |
| Overall Spearman ρ | 0.710 | 0.665 |
| RMSE | **0.767** | 0.829 |
| MAE | **0.578** | 0.655 |

Per-dimension Pearson r:

| Dimension | n | Conditioned | Multi-head |
|---|---|---|---|
| Accountability | 45 | 0.749 | 0.749 |
| Cognitive Engagement | 83 | 0.688 | 0.573 |
| Cultural Responsiveness | 24 | 0.178 | 0.185 |
| Formative Assessment | 36 | 0.816 | 0.764 |
| Metacognition | 87 | 0.702 | 0.681 |
| Power Dynamics | 50 | 0.711 | 0.640 |

**Observation 1.** Fine-tuning works for overall effectiveness: the conditioned model
beats our Longformer replication on every metric and approaches the paper's number
despite a smaller input format (no sub-dimension line). The three target dimensions land
at r = 0.69–0.82.

**Observation 2.** Cultural Responsiveness (r ≈ 0.18 under *both* architectures) is
unlearnable at 189 training examples — a data-volume problem, not an architecture choice.
It is outside our target scope.

## Result 2: construct validity checks on engineered conversations

Two held-out sets of 60 simulated tutoring conversations each (our own simulation
pipeline; tutor instructed to exhibit specified pedagogy levels).

**Check A — single-dimension extremes** (10× Very-High and 10× Very-Low per target
dimension, other dimensions neutral). Question: does the score *for the manipulated
dimension* separate vh from vl, and is the separation specific to that dimension?

- Conditioned: near-perfect separation on the targeted dimension (AUC 0.96 / 0.995 / 1.0
  for Acc / CE / FA) — **but** the vh−vl gap was essentially uniform across all six
  scored dimensions, and the targeted dimension was never the largest gap.
- Multi-head: far weaker separation (AUC 0.77 / 0.79 / 0.58) and still not
  dimension-specific (targeted dimension was the row max in 1 of 3 cases).

**Check B — cross-dimension contrast** (the decisive test): 60 conversations engineered
**Very High on dimension A and simultaneously Very Low on dimension B** (all 6 ordered
pairs among the three target dimensions × 10). A construct-specific scorer must rank
score(A) > score(B) *within the same conversation*.

| Model | Mean sign-accuracy (chance = 50%) | Offset-corrected contrast effect |
|---|---|---|
| Conditioned | 62% | ≤ ~0.02 points (1–5 scale) |
| Multi-head | 48% | ≤ ~0.05 points |

Raw sign-accuracy overstates specificity because each dimension carries a fixed
calibration offset (e.g., the multi-head's FA head scores ~0.2 lower than its CE head on
any conversation). Averaging each cell with its mirrored cell (A-high/B-low vs.
B-high/A-low) cancels the offset; the surviving within-conversation contrast effect is
≤0.05 points for both models — effectively zero.

**Observation 3.** Neither architecture is construct-specific. The per-dimension scores
are one shared "overall quality" signal plus a per-dimension calibration offset. Since an
architecture that structurally cannot collapse across dimensions (multi-head) shows the
same pattern, the cause is almost certainly the **training labels**: every CONVOLEARN row
scores one conversation on one dimension, quality co-varies heavily across dimensions,
and the model is never shown same-conversation contrast — so it is never forced to learn
what distinguishes the constructs.

**Observation 4 (ceiling effect).** On the contrast conversations, the conditioned model
scores ~4.9–5.1 on *every* dimension — including the engineered-Very-Low one. Compare
Check A, where Very-Low conversations dropped ~0.5 points on all dimensions: one strongly
exhibited good practice lifts the perceived quality of the whole conversation to ceiling,
hiding the engineered deficit. This is the generic-quality signature seen from another
angle, and it means Check A's high AUCs reflect detection of overall polish rather than
the construct.

**Caveat.** Check B assumes the simulator faithfully produced the contrast (e.g., that an
"Accountability-high / Cognitive-Engagement-low" transcript really exhibits low cognitive
engagement). Instructing a tutor model to be very good at one practice and very poor at
another simultaneously is unusual; fidelity is not yet verified. Verification is the next
step (below) — until then, Observation 3 is strongly indicated but provisional.

## Implications and proposed next steps

1. **Verify contrast-set fidelity with a zero-shot LLM judge** (dimension rubrics from
   `dimensions.md`). This doubles as a diagnostic: if a judge *can* rank the high
   dimension above the low one where our fine-tuned models cannot, the constructs are
   expressible in text and the limitation is confirmed to be CONVOLEARN's single-dimension
   labels; if the judge also fails, the contrast set needs regeneration. (Also satisfies
   most of the planned LLM-judge baseline.)
2. **If confirmed:** two viable paths for construct-specific scoring —
   (a) use the LLM judge directly as the per-dimension scorer (multilingual for free,
   which suits the cross-language goal), keeping the fine-tuned model as an
   overall-quality anchor; and/or (b) generate multi-dimension-labeled training data with
   our own simulator (it assigns a level to *every* dimension in every conversation —
   exactly the supervision CONVOLEARN lacks) and fine-tune on that.
3. **What stands regardless:** the conditioned ModernBERT is a strong scorer of overall
   tutoring effectiveness (r = 0.70 on held-out data), and the conditioning-text design
   transfers to out-of-genre simulated conversations far better than the multi-head
   (AUC ~1.0 vs ~0.6–0.8) — evidence that the embedded dimension definitions provide real
   semantic anchoring, which bodes well for a future multilingual port.
