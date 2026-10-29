# Count-regression pilot

This offline analysis fits conversation-level feature totals using
`count ~ language * model + topic`. Topic is a fixed effect; there are no random
effects and no length offset. The default pilot features are Questions, Examples,
and Social Cues. `--features` accepts other feature keys.
Use `--all-features` to analyze every feature in the saved rubric. Keep a separate
output directory to preserve the initial pilot. Each feature receives an explicit
fit status. All-zero model/language cells or topics are flagged as not estimable
for the full unpenalized model; zero counts are not replaced with pseudocounts,
topics are not silently excluded, and numerical failures do not erase other
features' results.

Create a dedicated environment and install `requirements.txt`. From the repository
root on Windows:

```powershell
python -m venv conversation-evaluation/statistics/.venv
conversation-evaluation/statistics/.venv/Scripts/python.exe -m pip install -r conversation-evaluation/statistics/requirements.txt
conversation-evaluation/statistics/.venv/Scripts/python.exe conversation-evaluation/statistics/count_glm.py .runtime/glm-pilot/input.json --output .runtime/glm-pilot/results
```

The saved input snapshot contains one observation per original conversation,
feature counts, baseline IDs, model/language/topic metadata, and evaluator/rubric
provenance. The local export operation is retained at
`.runtime/export-count-glm-input.mjs`; it reads Supabase without modifying it and
requires all 100 current originals to have the current rubric, prompt hash, and
direct-Google Argon evaluation. It validates section highlights before exporting.
The Python validator requires five observations per topic/language/model cell;
missing evaluations are never imputed as zeros.

On this Windows host, application-control policy blocked the compiled Python
libraries. The successful alternative is an isolated Linux container, with the
analysis source mounted read-only and only the input/output directory writable:

```powershell
$analysisPath = (Resolve-Path conversation-evaluation/statistics).Path
$resultPath = (Resolve-Path .runtime/glm-pilot).Path
docker run --rm --mount "type=bind,source=$analysisPath,target=/analysis,readonly" --mount "type=bind,source=$resultPath,target=/work" python:3.13-slim@sha256:2d44738ebf4ce5f63b9d9ea871e9c7cfdc0426f7b0c97cac915fd88ded1d86bb sh -c 'pip install --only-binary=:all: -r /analysis/requirements.txt && cd /analysis && python -m unittest test_count_glm.py && python count_glm.py /work/input.json --output /work/results'
```

The container receives no database credentials and makes no model calls. This
leaves Windows application-control policy unchanged. The output records the
actual Python and analysis-library versions.

Negative-binomial NB2 regression estimates the dispersion parameter jointly by
maximum likelihood. A log-link Poisson GLM with HC0 sandwich covariance is fitted
as a sensitivity analysis. Nonconverged, boundary-dispersion, or invalid-covariance
NB2 results are flagged; the report explicitly labels a Poisson HC0 fallback.
Neither model is selected based on its p-values. Check the reported convergence,
residual dispersion, zero patterns, warnings, and individual residuals before
interpreting effects.

Outputs include `report.md`, `results.json`, conversation `counts.csv`,
`contrasts.csv`, and `residuals.csv`. English/Tamil ratios are calculated within
each model, including the language-by-model interaction. Predicted counts are
averaged equally over the selected topics. Confidence intervals and two-sided
Wald p-values are asymptotic, model-based, unadjusted, and conditional on the
selected topics. They do not establish generalization to other topics or address
errors in automated labels. This pilot does not change portal comparisons.

Run checks with the environment's Python from this directory:

```powershell
.venv/Scripts/python.exe -m unittest test_count_glm.py
```

## Full archived English–Tamil comparison

`archive_language_glm.py` reads the dated archive without a database connection. It
uses all 3,150 original conversations, the latest v19 evaluation for each one,
and all 24 rubric features. It validates the complete five-try design and pinned
rubric, evaluator, and prompt hashes. Each feature is fitted as a Poisson GLM
with language-by-model interaction and topic fixed effects; standard errors are
clustered by topic. This compares absolute counts per conversation, without a
response-length offset. Sparse features may have unavailable contrasts.

From the repository root, using the same Linux container as the pilot:

```powershell
$analysisPath = (Resolve-Path conversation-evaluation/statistics).Path
$archivePath = (Resolve-Path research-archive/oct-29).Path
$resultPath = (Resolve-Path .runtime/glm-pilot).Path
docker run --rm --mount "type=bind,source=$analysisPath,target=/analysis,readonly" --mount "type=bind,source=$archivePath,target=/archive,readonly" --mount "type=bind,source=$resultPath,target=/work" python:3.13-slim@sha256:2d44738ebf4ce5f63b9d9ea871e9c7cfdc0426f7b0c97cac915fd88ded1d86bb sh -c 'pip install --quiet --root-user-action=ignore --only-binary=:all: -r /analysis/requirements.txt && python /analysis/archive_language_glm.py /archive --output /work/archive-language-all-features'
```

The output has `report.md`, `results.json`, `counts.csv`, and `contrasts.csv`.
The pooled effect is an equal-model average log ratio across models with counts
in both languages;
the CSV lists each model's English/Tamil contrast. P-values are exploratory and
unadjusted. Inspect feature sparsity, response length, and automated-label
accuracy before treating a contrast as a substantive language difference.

To restrict the analysis to the rubric's eight **Explanatory & Pedagogical Devices**
and five **Conversational & Tutoring Moves**, add
`--focus pedagogical-conversational` and use
`--output /work/pedagogical-conversational`. Each feature is fitted independently,
so this focused report reproduces its estimates from the all-feature report.

For response-length sensitivity, first run
`node conversation-evaluation/statistics/export_archive_lengths.mjs` from the
repository root. This writes one row per archived conversation to
`.runtime/glm-pilot/pedagogical-conversational/lengths.csv`, counting only tutor
output with a single Unicode segmentation rule for both languages. In the
container command, add `--lengths /work/pedagogical-conversational/lengths.csv`
and either `--exposure graphemes` or `--exposure words`. Write each fit to its own
output directory, such as `/work/pedagogical-conversational/grapheme-adjusted`
and `/work/pedagogical-conversational/word-adjusted`. The model then uses the log
length as an offset. These adjusted ratios describe occurrence density under
the chosen length unit; neither graphemes nor words is a perfect common unit
across English and Tamil. Keep the absolute-count fit as a separate estimand.
