> **Note (July 2026):** the current working plan is `plan.md` — six dimensions only, ModernBERT-large, conditioned regression with swap-test gate. This file is kept as the historical record of how the plan evolved.

The main goal of the model is to produce score for predefined pedagogical dimensions for learning conversations. For example, when I input a tutoring conversation, it should output the score for dimension Cognitive Engagement from 1 to 5. In the dataset that we are using, there is already scores produced for the conversations across six dimensions and 21 sub-dimensions. 

Note on the actual dataset shape (checked against `masharma/convolearn` on HF): each row is one conversation tagged with a *single* `kb_dim`/`kb_subdim` pair and one `effectiveness_consensus` score for that pairing — not one conversation with scores across all six dimensions. Per-dimension counts: Metacognition 589, Cognitive Engagement 501, Formative Assessment 289, Power Dynamics 288, Accountability 278, Cultural Responsiveness 189 (sub-dims are thinner, ~90-160 each).

Inference requirement (confirmed): conversations to be scored (e.g. NCTE transcripts) will be raw/untagged — no dimension label present on the input itself. But the dimension doesn't need to be *recovered* from the conversation — it can be *asserted* as a query: run the trained model once per dimension of interest, substituting the dimension name into the conditioning text each time, on the same conversation/chunk. That reconciles "raw input, multi-dimension output" with a single conditioned scalar-output model — see revised decision below.

---

**Update: we are replicating a specific published setup (paper Section 6, "Ecological Validity"), which supersedes the multi-head plan below.**

The paper's actual method (Section 6.1):
- **One** Longformer regression model (not per-dimension heads), trained on the full CONVOLEARN dataset with dimension-tagged dialogues (`"Dimension: X\nSub-dimension: Y\n\n<conversation>"` → `effectiveness_consensus`). This matches the original notebook design, not the multi-head/masked-loss design proposed further down.
- Split 70/15/15 by "seed question" in the paper to prevent leakage. The public `masharma/convolearn` HF dataset has no `seed_question` column (only kb_subdim, kb_dim, effectiveness_consensus, completeness_consensus, cleaned_conversation, earthscience_topic, num_exchanges) — decided to keep the existing `earthscience_topic`-stratified split as a stand-in rather than trying to reconstruct seed-question grouping.
- Longformer-base-4096, 5 epochs. Reported test results: Pearson r = 0.736 (p < .001), RMSE = 0.710, MAE = 0.530.
- External validation (applying the trained model to NCTE transcripts scored per-dimension via the conditioning-text trick above, then correlating with MQI/CLASS) is **deferred** — not needed for the current step. We're focused on replicating the 6.1 training result first.

Revised answers to the original open questions, in light of the above:

1. **Single model or separate model per dimension?** → Single model, dimension-conditioned via text prefix (the paper's approach), trained on all 6 dimensions' data. The multi-head/masked-loss design is a valid *alternative* worth keeping in mind if the conditioning approach underperforms, but it is not what we're replicating right now.

2. **Train only on the 3 target dimensions' conversations?** → No — train on the full 6-dimension dataset, same as the paper. The 3-dimension focus (Cognitive Engagement, Formative Assessment, Metacognition) only matters at the NCTE-application stage, where those are the only dimensions judged observable in transcript language alone; it doesn't restrict what the CONVOLEARN training set should contain.

Current status: `longformer.ipynb` already implements the single conditioned-regressor design (topic-stratified split, dimension/subdim text prefix, `effectiveness_consensus` regression target, bf16 + right-sized batch on A100, per-metric eval including Pearson/Spearman). Next step is running it and comparing test-set Pearson/RMSE/MAE against the paper's reported r=0.736 / RMSE=0.710 / MAE=0.530.

---

**Update: staged plan reconciling paper replication with the actual end goal (individual per-dimension scores).**

The paper's conditioned single-output model produces per-dimension scores only via N separate forward passes (once per dimension, swapping the conditioning text) — but since it never saw `(conversation, wrong-dimension)` pairs during training, there's a real risk it doesn't actually discriminate between dimensions when the same conversation is conditioned on different dimension names, which would undercut the goal of *individual* scores.

Decision: pursue both, in sequence, on CONVOLEARN only (NCTE not required for either stage — it's only needed for the later external-validation step, which stays deferred):

1. **Stage 1 (done, not yet run): paper replication.** The existing dimension-conditioned single-output model in `longformer.ipynb`. Purpose: sanity-check that the data pipeline and hyperparameters reproduce something near the paper's reported r=0.736/RMSE=0.710/MAE=0.530 before trusting the setup further.
2. **Stage 2 (scaffolding now): multi-head model.** One shared Longformer encoder (no dimension-conditioning text — raw `cleaned_conversation` only) with a single `Linear(hidden_size, num_dims)` layer acting as 6 independent per-dimension heads (one output unit per `kb_dim`). Masked MSE loss: each example only backprops through the output column matching its own `kb_dim`, so every head is trained purely on its own dimension's data (189-589 examples), while the shared encoder benefits from all 2134 examples regardless of dimension. One forward pass yields all 6 dimension scores simultaneously — this is the architecture actually suited to the stated goal, and avoids the conditioning-collapse risk of stage 1. Reporting focuses on the 3 target dimensions (Cognitive Engagement, Formative Assessment, Metacognition) but all 6 heads are trained since it costs nothing and helps the shared encoder.

Stage 2 is not directly comparable to the paper's single r/RMSE/MAE number — it gets its own per-dimension metrics instead.