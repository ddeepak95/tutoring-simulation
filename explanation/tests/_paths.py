"""Make existing standalone runner imports available to unittest discovery."""
import sys
from pathlib import Path

EXPLANATION_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(EXPLANATION_ROOT))
sys.path.insert(0, str(EXPLANATION_ROOT / 'analysis'))
