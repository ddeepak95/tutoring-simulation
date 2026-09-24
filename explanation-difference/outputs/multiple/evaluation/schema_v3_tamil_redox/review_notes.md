# Review notes for the Tamil pilot

These are review flags, not adjudicated factual corrections. The saved model output is preserved.

- All 45 passages passed schema, source-span and link validation after one repair attempt. This does not validate the scientific judgments or completeness of claim extraction.
- Claims c2 (word origin), c4 (hydrogen-based definitions), and c23 (respiration) receive correct verdicts although the supplied reference notes do not cover those assertions. Under this prompt they need additional evidence or an unverifiable verdict.
- Claims c5, c15, c22 and c25 use atom counting. That establishes equation balance, not by itself whether the reaction occurs or adequately represents the named phenomenon. Separate these assertions when assessing accuracy.
- Claim c22 combines an everyday phenomenon and its proposed equation; it needs a dedicated reference and review of the scope of the simplified representation.
- Several claims combine paired assertions despite the atomic-claim instruction (for example c3 and c4). Therefore 25 is the model's extracted claim count, not an established count of every factual assertion.
- No confirmed accuracy percentage is reported. Zero proposed errors must not be interpreted as a verified error-free explanation.

Next useful step: an independent evidence-review pass focused on reference entailment and claim splitting, before consolidating accuracy scores.
