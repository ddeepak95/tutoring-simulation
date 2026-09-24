"""Entry point for explanation measurements and assessments."""
import argparse
from pathlib import Path
import runpy
import sys

SCRIPTS = Path(__file__).resolve().parent / 'analysis'
COMMANDS = {
    'measure': ('compare_languages.py', 'Extract and compare local saved conversations'),
    'words': ('compare_word_medians.py', 'Summarize median word counts'),
    'headings': ('compare_heading_counts.py', 'Count headings using the frozen study annotations'),
    'plots': ('plot_words_and_headings.py', 'Plot word and heading distributions'),
    'google': ('google_coverage_analysis.py', 'Analyze saved Google counts; no search requests'),
    'google-compare': ('compare_browser_serpapi.py', 'Compare saved browser and SerpAPI counts'),
    'semantics': ('semantic_all_languages.py', 'Semantic analysis; embedding API available with --embed'),
    'diversity': ('semantic_diversity.py', 'Compute pairwise distance from saved embeddings'),
    'relevance': ('judge_relevance.py', 'Relevance assessment; Gemini API available with --classify'),
    'image-language': ('image_language_analysis.py', 'Image-language assessment; see command help for API flags'),
    'semantic-report': ('render_semantic_image_comparison.py', 'Render saved semantic and image results'),
}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__,
        epilog='Use COMMAND --help for its inputs and options. Paths supplied on the command line are relative to your working directory.',
        formatter_class=argparse.RawTextHelpFormatter)
    parser.add_argument('command', choices=COMMANDS, metavar='COMMAND',
        help='\n'.join(f'{key}: {value[1]}' for key, value in COMMANDS.items()))
    arguments = list(sys.argv[1:] if argv is None else argv)
    # Parse the dispatcher only; leave command-specific --help untouched.
    if not arguments or arguments[0] in {'-h', '--help'}:
        parser.print_help()
        return 0
    args = parser.parse_args(arguments[:1])
    original_argv, original_path = sys.argv, sys.path[:]
    try:
        script = SCRIPTS / COMMANDS[args.command][0]
        sys.argv = [str(script), *arguments[1:]]
        sys.path.insert(0, str(SCRIPTS))
        runpy.run_path(str(script), run_name='__main__')
    finally:
        sys.argv = original_argv
        sys.path[:] = original_path
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
