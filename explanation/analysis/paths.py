"""Stable data/configuration locations for analysis scripts, independent of cwd."""
from pathlib import Path

EXPLANATION_ROOT = Path(__file__).resolve().parents[1]
PROJECT_ROOT = EXPLANATION_ROOT.parent
DEFAULT_ANALYSIS = EXPLANATION_ROOT / 'outputs/all-languages-comparison-six-topics'
