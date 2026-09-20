# Analysis code

Run commands from the repository root with `.venv\Scripts\python.exe explanation/analyze.py COMMAND ...`. Use `COMMAND --help` for inputs. The dispatcher uses these scripts directly, so measurements and command-specific options retain their existing behavior.

| Command | Implementation | Purpose |
| --- | --- | --- |
| `measure` | `compare_languages.py` | Extract words, image counts and timing from saved conversations |
| `words` | `compare_word_medians.py` | Medians, quartiles and topic-paired comparisons |
| `headings` | `compare_heading_counts.py` | Frozen annotations and content-heading counts |
| `plots` | `plot_words_and_headings.py` | Box plots and individual observations |
| `google` | `google_coverage_analysis.py` | Correlations using saved query counts |
| `google-compare` | `compare_browser_serpapi.py` | Historical browser/provider comparison |
| `semantics` | `semantic_all_languages.py` | Sentence embeddings, diversity and approximate coverage |
| `diversity` | `semantic_diversity.py` | Earlier English/Tamil cached pairwise-distance analysis |
| `relevance` | `judge_relevance.py` | Gemini relevance judgments |
| `image-language` | `image_language_analysis.py` | Image-language classification |
| `semantic-report` | `render_semantic_image_comparison.py` | Render the combined report |

The embedding command can make API calls with `--embed`; relevance/image judgments can make API calls with `--classify`. Image downloads use `--download-missing`. Inspect the command help before enabling those options. Local measurement, plotting and saved-count correlation commands do not request new responses.

## Common commands

```powershell
# Write a fresh comparison directory.
.venv\Scripts\python.exe explanation/analyze.py measure explanation/outputs/my-experiment-01 explanation/outputs/my-experiment-02 explanation/outputs/five-accounts-01 explanation/outputs/relativity-en-ta-01 --output explanation/outputs/comparison-new

# These update the derived reports under the specified analysis root.
.venv\Scripts\python.exe explanation/analyze.py words --root explanation/outputs/comparison-new
.venv\Scripts\python.exe explanation/analyze.py headings --root explanation/outputs/comparison-new
.venv\Scripts\python.exe explanation/analyze.py plots --root explanation/outputs/comparison-new

# Use the everyday-browser measurements for the primary Google analysis.
.venv\Scripts\python.exe explanation/analyze.py google --root explanation/outputs/all-languages-comparison-six-topics --output explanation/outputs/all-languages-comparison-six-topics/google-coverage-everyday-browser
```

Heading annotations are specific to the existing 90-answer, six-topic study. New conversations require reviewing those annotations; they are not a general-purpose automatic idea counter. The Google analysis also requires the saved heading counts and relevance judgments.

## Supporting and historical scripts

`analyze_html.py` and `analysis_statistics.py` provide extraction/statistical helpers. `semantic_coverage.py` provides segmentation and embedding helpers. `heading_count_pilot.py` provides the original English/Hindi coding rules, and `heading_idea_codes.py` contains the idea annotations.

Earlier workflows remain available as direct scripts under this folder: `analyze_combined.py`, `compare_english_hindi.py`, `compare_semantic_segmentations.py`, `heading_count_pilot.py`, and `heading_idea_correlation.py`. Their original copies remain in the consolidated snapshot. Some historical scripts have fixed study inputs rather than command-line options.

## Path migration

Old analysis paths such as `explanation/compare_languages.py` are now `explanation/analysis/compare_languages.py`; the recommended entry point is `explanation/analyze.py measure`. Collection entry points (`browser_run.py`, `browser_queues.py`, `open_browser.py`, `run.py`, and the Google collectors) retain their original paths.

`paths.py` locates the explanation and project roots independently of the working directory. Explicit CLI input/output paths are still relative to the working directory. Original generated reports are historical evidence and have not been rewritten to change old command examples.
