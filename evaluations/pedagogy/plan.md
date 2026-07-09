# Plan: Dimension-Conditioned Pedagogical Scoring Model

*Working plan — July 2026. Supersedes the staged plan at the bottom of `goals.md` (kept there as historical record). Dimension definitions live in `dimensions.md`.*

## 1. Goal

A model that takes a **raw, unlabeled tutoring conversation** and produces a **1–5 score for a chosen pedagogical dimension**. The dimension is not detected from the text — it is **asserted as a query** at inference time. Scope: the **six top-level dimensions only** (Cognitive Engagement, Formative Assessment, Accountability, Cultural Responsiveness, Metacognition, Power Dynamics). Sub-dimensions are out of scope.

Application target: scoring our own simulated tutoring conversations (see §8a) per-dimension. NCTE/MQI/CLASS external validation is **not** part of this plan.

**Scope refinement (2026-07-09):** the claims we ultimately need cover **Cognitive Engagement, Formative Assessment, and Accountability only** (still train on all six — the other dims' rows help the shared encoder — but report and validate on these three; Cultural Responsiveness' r=0.178 does not block). **End goal:** compare tutoring-conversation quality on these dimensions **across languages**. That makes two things load-bearing that weren't before: (a) the scorer must eventually run on non-English conversations — ModernBERT is English-only, so the final model needs a multilingual port (§10); (b) cross-language *comparison* requires the scorer to be language-invariant, i.e. score differences between languages must reflect quality, not the language itself — testable with matched engineered vh/vl sets per language (§10).

## 2. Dataset facts (verified against `masharma/convolearn`, 2026-07-08)

- 2,134 rows; columns: `kb_subdim`, `kb_dim`, `effectiveness_consensus`, `completeness_consensus`, `cleaned_conversation`, `earthscience_topic`, `num_exchanges`.
- Each row = one conversation tagged with a **single** dimension and one score for that pairing.
- **All 2,134 conversations are unique** — no transcript appears under more than one dimension, so a row-level split *is* a conversation-level split. (Checked 2026-07-08; no duplicate `cleaned_conversation` values.)
- **Labels are half-point floats**: 1.0, 1.5, …, 5.0 (9 values; 2.0 and 4.0–4.5 dominate). Regress on them directly; do not round to integers during training.
- Per-dimension counts: Metacognition 589, Cognitive Engagement 501, Formative Assessment 289, Power Dynamics 288, Accountability 278, Cultural Responsiveness 189.
- Conversation length: mean ~708 / median ~641 tokens — short relative to any modern encoder's context window.
- Known limitation: the paper split by *seed question* to prevent near-paraphrase leakage; that column is not in the public dataset. We keep the `earthscience_topic`-stratified 70/15/15 split (seeded) and note this as a limitation rather than trying to reconstruct seed-question grouping.

## 3. Primary design: dimension-conditioned regression

One shared encoder reads the conversation **plus an explicit statement of which dimension is being asked about**, and outputs a single scalar.

**Input format (per example):**

```
Dimension: Cognitive Engagement
Definition: <the paragraph for that dimension from dimensions.md>

Conversation:
<cleaned_conversation>
```

- Training target: the row's `effectiveness_consensus` (float, MSE loss). Never shown as input text.
- Train on **all 2,134 rows across all 6 dimensions** — every example also teaches the shared encoder the constructs themselves, which is what saves the thin dimensions (Cultural Responsiveness: 189 rows).
- Inference on an unlabeled conversation: **N forward passes**, one per dimension of interest, swapping only the Dimension/Definition block. The "raw input" problem disappears by construction.
- The definition (not just the name) matters: a bare two-word label is a weak signal against a ~650-token conversation, and the definition lets thin dimensions borrow meaning from the text itself. *Ablation to run: name-only vs. name+definition conditioning.*

## 4. Base model

**`answerdotai/ModernBERT-large`** (395M), architecture: encoder → attention-masked mean pooling → dropout → linear head → scalar.

- **Precision/hardware constraint (hard):** train in **bf16 on Ampere+ (A100 or L4)**. ModernBERT was pretrained in bf16 and has known fp16 NaN issues; T4 has no bf16. The existing `ModernBertMultiHead.ipynb` uses `fp16=True` — change to `bf16=True` before running.
- Longformer-base is *not* carried forward (2020-era pretraining; its custom global-attention kernel crashes on A100, forcing T4 — see `longformer.ipynb` cell 0). It remains the Stage-1 replication bridge only.
- If ModernBERT-large shows a large train/val gap: first dropout + early stopping, then LoRA, then fall back to ModernBERT-base (149M) — same code, same tokenizer family.
- `max_length`: start at 1024 (covers the bulk of conversations; check the 99th-percentile token length first and raise if the tail is fat). 4096/8192 available if needed.
- Starting hyperparameters: lr 2e-5, 5 epochs, effective batch ~16 via gradient accumulation, warmup 10%, early stopping on validation loss, seed 42.

## 5. The gate before trusting anything: the swap test

The conditioned model never sees (conversation, *wrong*-dimension) pairs in training, so it may learn to ignore the conditioning text and score generic conversation quality — and aggregate metrics would still look fine. **Before using the model:**

1. Take held-out test conversations; score each under its true dimension and under each of the 5 swapped dimensions.
2. Check that scores actually move with the conditioning (report per-conversation score spread across dimensions, and whether true-dimension predictions track labels better than swapped ones).

**If the swap test fails** → the multi-head fallback (§6) becomes the primary design.

The held-out simulated set (§8a) provides a *labeled* complement to this test: conversations engineered to be very-high or very-low on one specific dimension, so we can check not just that scores move with the conditioning, but that they move in the right direction on the right dimension.

## 6. Fallback design: multi-head (already scaffolded)

Shared encoder, **no** conditioning text, `Linear(hidden, 6)` = one output unit per dimension, masked MSE (each row backprops only through its own dimension's column; the encoder still learns from all 2,134 rows). One forward pass yields all 6 scores; structurally incapable of collapsing across dimensions.

Already implemented in `TutoringExperiment.ipynb` (Stage 2, Longformer) and `ModernBertMultiHead.ipynb` (ModernBERT). **Contingency only — not trained unless triggered.** Triggers (any one):

1. Swap test (§5) fails — scores barely move when the conditioning text changes.
2. Discrimination check on the simulated set (§8a) fails — the vh−vl gap is not concentrated on the targeted dimension.
3. Per-dimension test metrics are substantially worse than the overall number (model only works on data-rich dimensions).

If none fire, the conditioned model stands and the multi-head is never trained.

## 7. Evaluation

- **Primary: Pearson r, RMSE, MAE** — overall and **per-dimension**. Per-dimension is what actually matters for the goal; overall is for continuity with the paper.
- Secondary: Spearman; QWK computed on binned scores (labels are half-points, so QWK requires 9 bins or rounding — report it, don't optimize for it).
- Reference points:
  - Paper (Longformer, dim+subdim conditioning): r = 0.736, RMSE = 0.710, MAE = 0.530.
  - Our Stage-1 Longformer replication (already run, `TutoringExperiment.ipynb`): r = 0.672, RMSE = 0.815, MAE = 0.607. **ModernBERT results are compared against this bridge, not directly against the paper** (different backbone, no sub-dim line, added definitions).
- **Zero-shot LLM-judge baseline:** prompt a strong general model with the same dimension definition + rubric on the test split, no fine-tuning. With ~2K training rows this is the honest check on whether fine-tuning buys anything. Timing is flexible (it gates nothing), but it must be run — on the same frozen test split with the same definitions — before results are written up.

## 8. Order of operations

| # | Step | Status |
|---|------|--------|
| 1 | Stage-1 Longformer replication (sanity-check pipeline vs. paper) | **Done** — r=0.672 / RMSE=0.815 / MAE=0.607 |
| 2 | Train conditioned ModernBERT-large (§3–4): dimension name + definition, no sub-dim — `ModernBertConditioned.ipynb` | **Done 2026-07-08** — test overall r=0.702 / RMSE=0.767 / MAE=0.578 (beats Longformer bridge; near paper). Per-dim r: Acc .749, CE .688, FA .816, Meta .702, PD .711, **CR .178 (n=24 — fails)** |
| 3 | **Gate:** swap test (§5) + first scoring of the simulated set (§8a validity + discrimination checks) on that checkpoint — gate cells at the end of `ModernBertConditioned.ipynb` | **Done 2026-07-08 — MIXED.** Validity passed (vh-vs-vl AUC .96–1.0 on targeted dim). Discrimination **failed**: vh−vl gap ~uniform across all 6 scored dims (targeted dim not even the max in any row). Swap test borderline: spread 0.48; r_true 0.702 vs r_swapped 0.670 |
| 4 | *(contingent)* Multi-head ModernBERT (§6) — **triggered** by §6 trigger 2 (and trigger 3 for Cultural Responsiveness) | **Done 2026-07-09 — WORSE than conditioned on every axis.** Test overall r=0.656/RMSE=0.829/MAE=0.655 (cond: 0.702/0.767/0.578). Per-dim r: Acc .749, CE .573, CR .185, FA .764, Meta .681, PD .640. Sim-set gate: vh−vl gaps tiny (0.03–0.38 vs cond ~0.5), AUC on target only .77/.79/.58 (cond: .96–1.0), targeted dim max in 1/3 rows. Architecture change did NOT restore discrimination → points at label/data structure, not conditioning collapse. Conditioned model remains primary. Checkpoint at Drive `models/multihead_modernbert` |
| 4b | Generate **cross-dimension contrast set** (§8b) and score it with both the conditioned and multi-head checkpoints — the decisive diagnostic for whether the step-3 discrimination failure is in the model or in the eval set | **Done 2026-07-09 — BOTH MODELS FAIL.** Mean sign-acc: multi-head 48%, conditioned 62% — but after cancelling per-dimension calibration offsets via mirrored cells, the true within-conversation contrast effect is ≤0.05 points (1–5 scale) for both. Conditioned scores also saturate at ceiling (~4.9–5.1 on every dim, incl. the engineered-Very-Low one). Per §8b: dimensions likely not separable from CONVOLEARN's single-dimension labels — **stop tuning architectures.** Open caveat: generation fidelity of the contrast set unverified (does an `acvh-cevl` transcript really exhibit low CE?) — check via human read / LLM judge before finalizing the conclusion |
| 5 | Ablations one variable at a time (name-only vs. +definition; weighted sampling so Metacognition doesn't drown Cultural Responsiveness; LoRA; base vs. large) — decisions on the validation split ONLY, never on the simulated set | todo |
| 6 | LLM-judge zero-shot baseline — same frozen test split, same `dimensions.md` definitions; needed as context before reporting results, but doesn't gate anything above | todo |
| 7 | Final scoring of the simulated set (§8a) with the final model — second and last touch | todo |

## 8a. Held-out application set: simulated conversations

`runs/convolearn/run_set_07081515/conversations.jsonl` — 60 simulated tutoring conversations, JSONL with `label` and `text` fields. Labels: 3 dimensions × 2 engineered quality levels × 10 conversations:

| Prefix | Dimension | Levels |
|---|---|---|
| `ac` | Accountability | `vh` (very high) / `vl` (very low) |
| `ce` | Cognitive Engagement | `vh` / `vl` |
| `fa` | Formative Assessment | `vh` / `vl` |

These conversations are never used in training, and are scored **exactly twice**: once at the gate (step 3 — binary architecture check: does the conditioned model discriminate?) and once with the final model (step 7 — reported numbers). They are never consulted when choosing between ablation variants; those decisions use the validation split only. Protocol per scoring pass:

1. Score all 60 conversations on all 6 dimensions (6 forward passes each with the conditioned model, or 1 pass with the multi-head).
2. **Validity check:** on each conversation's *targeted* dimension, `vh` items should score high and `vl` items low. Report the mean vh−vl gap and vh-vs-vl separation (e.g., AUC) per dimension.
3. **Discrimination check:** the vh−vl gap should be largest on the targeted dimension and smaller on the other five. If an `ac-vh`/`ac-vl` contrast is equally visible on every dimension's score, the model is measuring generic quality, not the construct — same failure mode the swap test (§5) probes, but with ground truth.

Caveat: these conversations were generated with the same knowledge-base approach as CONVOLEARN itself (same domain, similar generation style), so this is a *controlled construct-validity* test, not fully out-of-distribution external validation. Genre transfer (e.g., real classroom transcripts) remains untested under this plan.

## 8b. Cross-dimension contrast set (diagnostic — added 2026-07-09)

The step-3 discrimination failure has two candidate causes that the §8a set cannot distinguish: (i) the model measures generic quality and ignores the construct, or (ii) the vh/vl conversations, engineered on one dimension, genuinely co-vary on the others (an `ac-vl` tutor who never demands justification is plausibly also less cognitively engaging), so even a perfect scorer would show gaps on every column. To disentangle:

- **Design:** conversations engineered **very high on dimension A *and* very low on dimension B simultaneously**, for the 6 ordered pairs among {Accountability, Cognitive Engagement, Formative Assessment} — e.g. a tutor who constantly demands evidence and justification (ac-vh) but asks only closed recall questions and lectures otherwise (ce-vl). ~10 per cell = 60 conversations, same generation pipeline as §8a.
- **Pass criterion (per conversation):** score conditioned on A > score conditioned on B, with the margin reversing when A/B roles reverse across cells. Report per-pair sign-accuracy and mean within-conversation A−B margin.
- **Interpretation:** conditioned model passes → step-3 failure was an eval-set confound, conditioned model stands. Both models fail → dimensions may not be separable from this training data at all (single-dimension labels), which caps what any architecture can do.
- **Status:** this is a *diagnostic* set — unlike §8a it is not under the two-touch rule and may be scored freely during development. It must NOT be used to tune hyperparameters via repeated peeking at the same generation batch; regenerate a fresh batch if a decision hinges on it twice.

## 9. Risks

| Risk | Mitigation |
|---|---|
| ModernBERT fp16 NaN instability | bf16 on Ampere+ only; never fp16, never T4 for ModernBERT |
| Model ignores conditioning text (shortcut learning) | Swap test (§5) is a hard gate; multi-head fallback ready |
| Overfitting 395M params on 189–589 rows/dimension | Dropout, early stopping on val loss; then LoRA; then ModernBERT-base |
| Thin dimensions drowned by Metacognition/Cognitive Engagement | Shared encoder trained on all rows; weighted sampling as an ablation (§8.6) |
| Seed-question paraphrase leakage across splits | Not fixable with public columns — documented limitation (§2) |
| Fine-tuning adds nothing over prompting | LLM-judge baseline run early (§8.2) |
| ModernBERT is English-only but the end goal is cross-language | Treat current work as method development; port the winning recipe to a multilingual encoder (§10) before any cross-language claims |
| Scorer is language-biased (scores shift with language independent of quality) | Language-invariance check: matched engineered vh/vl sets per target language (§10) |

## 10. Cross-language extension (end goal — sketched 2026-07-09, to be firmed up once §8b resolves)

The ultimate application is comparing tutoring quality on the three target dimensions across languages. The current English-only ModernBERT work is **method development**: settle *which architecture and recipe* produces construct-specific scores (conditioned vs. multi-head, ±definitions, etc.) cheaply in English, then port.

1. **Backbone port:** retrain the winning recipe on a multilingual encoder. Leading candidate: **mmBERT** (ModernBERT-architecture multilingual encoder, 2025 — same code path, long context); alternatives: XLM-R-large, mDeBERTa-v3. Training data stays English CONVOLEARN → inference on other languages is zero-shot cross-lingual transfer.
2. **Translate-then-score fallback:** MT everything to English and keep the English model. Simpler, but MT quality differences across languages become a confound in exactly the comparison we care about — acceptable as a robustness check, not as the primary method.
3. **Language-invariance validation (required before any cross-language claim):** generate the §8a-style vh/vl set (and ideally the §8b contrast set) *matched across each target language* with the same simulation pipeline. The scorer passes if vh/vl separation is comparable per language AND same-quality conversations score the same across languages (no main effect of language on matched content).
4. Target-language list: TBD (decision needed — affects backbone choice and which MT/simulation resources are required).
