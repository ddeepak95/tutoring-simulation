"""Combine completed semantic and image-language analyses in one Markdown report."""
import argparse
import csv
import json
from pathlib import Path


def read_csv(path):
    return list(csv.DictReader(path.open(encoding='utf-8-sig')))


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('folder',type=Path)
    args=parser.parse_args();root=args.folder
    semantics=read_csv(root/'semantic/summary.csv')
    central={r['condition']:r for r in semantics if float(r['threshold'])==.7}
    images=read_csv(root/'image-language/summary.csv')
    manifest=json.loads((root/'semantic/manifest.json').read_text(encoding='utf-8'))
    image_manifest=json.loads((root/'image-language/manifest.json').read_text(encoding='utf-8'))
    diagnostics=json.loads((root/'semantic/coverage_diagnostics.json').read_text(encoding='utf-8'))
    native=sorted((c for c in central if not c.startswith('Code-mixed ')),
                  key=lambda c:float(central[c]['mean_coverage_percent']),reverse=True)
    lines=['# Semantic diversity, approximate coverage, and image language', '',
        f'{manifest["answers"]} answers on six shared topics; 15 prompt conditions across eight languages. '
        f'{manifest["segments"]} sentence-like segments were embedded with text-embedding-3-large. '
        f'Gemini 2.5 Flash classified {image_manifest["unique_images"]} unique rendered images representing '
        f'{image_manifest["occurrences"]} appearances in the answers.', '',
        '## Native-language answers', '',
        '| Language | Mean sentence-like units | Semantic diversity | Mean represented clusters | Approx. coverage |',
        '| --- | ---: | ---: | ---: | ---: |']
    for c in native:
        r=central[c]
        lines.append(f"| {c} | {float(r['mean_segments']):.1f} | {float(r['mean_pairwise_semantic_distance']):.4f} | {float(r['mean_clusters']):.1f} | {float(r['mean_coverage_percent']):.1f}% |")
    lines+=['','Diversity is the average cosine distance between distinct sentence embeddings within an answer. '
        'A higher value means greater semantic spread; it does not necessarily mean more ideas.', '',
        'Approximate coverage is the fraction of clusters represented by an answer after pooling all conditions within each topic. '
        'Complete-link clustering uses cosine similarity ≥0.70; percentages are averaged equally across topics. '
        'This is coverage of the observed pooled responses, not a verified inventory of all ideas. '
        'Longer answers generally have more opportunities to cover clusters.', '',
        f'**Coverage diagnostic:** {diagnostics["singleton_percent"]:.1f}% of clusters are singletons at this threshold. '
        f'Mean represented-cluster count and mean segment count have correlation r={diagnostics["mean_segments_vs_mean_clusters_pearson_r"]:.3f} across conditions. '
        'The coverage approximation therefore largely reflects sentence-unit quantity; it is not a validated independent idea count.', '',
        '## Native versus code-mixed prompts', '',
        '| Language | Native diversity | Code-mixed diversity | Native coverage | Code-mixed coverage |',
        '| --- | ---: | ---: | ---: | ---: |']
    for c in native:
        if 'Code-mixed '+c not in central:continue
        a,b=central[c],central['Code-mixed '+c]
        lines.append(f"| {c} | {float(a['mean_pairwise_semantic_distance']):.4f} | {float(b['mean_pairwise_semantic_distance']):.4f} | {float(a['mean_coverage_percent']):.1f}% | {float(b['mean_coverage_percent']):.1f}% |")
    lines+=['','![Semantic comparison](semantic/semantics.png)','',
        '## Image-language comparison', '',
        '| Prompt condition | Image appearances | Identifiable language | English only | Target language present | No language text | Unreadable/ambiguous |',
        '| --- | ---: | ---: | ---: | ---: | ---: | ---: |']
    for r in images:
        lines.append('| '+' | '.join(r[k] for k in ['condition','image_appearances','readable_language_images','english_only','target_language_present','no_linguistic_text','unreadable_or_ambiguous'])+' |')
    lines+=['','Target language is the language named by the prompt condition (English for the English baseline). '
        'For code-mixed conditions it measures presence of the named non-English language, not whether an image is acceptable. '
        'Multilingual images can contain both English and the target language. No-text images are kept separate, not counted as English or localization failures.', '',
        '![Image-language comparison](image-language/image_languages.png)', '',
        'Gemini saw only the image and the classification instructions, not the prompt language. '
        'It was asked for short visible-text evidence and to exclude math symbols, names, units, logos and watermarks from the main language decision. '
        'Incidental watermark/attribution languages are retained separately in the per-image CSV. '
        'Identical files share a classification, but each answer-image appearance is counted in the comparison. '
        'These labels are automated judgments, not independently verified OCR ground truth.', '',
        'One image required a Gemini language-only retry after repetitive transcription output. It was labeled Japanese; '
        'its missing transcription evidence and modified generation settings are recorded in the audit files.', '',
        '## Sensitivity and limits', '',
        'Coverage sensitivity is available at cosine thresholds 0.50–0.90. Equal-size sentence subsampling checks diversity against sentence-count differences; '
        'its ranges are sampling variability, not confidence intervals. Exact repeated segments within an answer are removed. '
        'Punctuation, list items and table rows define heuristic units; these do not guarantee one idea per unit. '
        'Language-specific follow-up removal is disabled for equal treatment. '
        'Cross-language embedding geometry, account/batch differences and one answer per topic/condition limit interpretation. '
        'No statistical significance or causal language effect is claimed.', '',
        'The corpus has 15 conditions, so coverage percentages are not directly comparable to the earlier English/Tamil-only analysis. '
        'All source conversations are retained; missing image downloads were retrieved from their saved URLs into the analysis folder. '
        'No conversations were regenerated for this analysis.', '',
        '## Audit and outputs', '',
        '- [Semantic methods, threshold tables and results](semantic/report.md)',
        '- [Interactive cluster explorer](semantic/explorer.html)',
        '- [Per-answer semantic diversity](semantic/diversity.csv)',
        '- [Coverage at every threshold](semantic/coverage.csv)',
        '- [Equal-size diversity sensitivity](semantic/equal_size_sensitivity.csv)',
        '- [Image-language methods and results](image-language/report.md)',
        '- [Image audit gallery with model evidence](image-language/gallery.html)',
        '- [Per-image classifications](image-language/image_classifications.csv)',
        '- [Original length, image-count and timing comparison](report.md)', '',
        'API references: [OpenAI embedding model](https://developers.openai.com/api/docs/models/text-embedding-3-large), '
        '[Gemini 2.5 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-2.5-flash).', '']
    (root/'semantic-and-image-comparison.md').write_text('\n'.join(lines),encoding='utf-8')
    print('Saved semantic-and-image-comparison.md')


if __name__=='__main__':main()
