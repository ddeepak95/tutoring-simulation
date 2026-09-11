"""CLI: produce per-language script versions from the English ones (docs/target_turns.md §2.1).
Machine translation only; the native-speaker pass happens on the files this writes.
"""
from __future__ import annotations

import argparse
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.simulation.catalog import load_catalogs, resolve_model_ref
from tutoring_check.targeted_simulation.script import _DATA_DIR
from tutoring_check.targeted_simulation.script_translate import (
    SOURCE_LANGUAGE_ID,
    source_script_ids,
    translate_script,
)
from tutoring_check.translations.prompts import CODE_MIXED, MODES


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Translate target scripts into other languages.")
    parser.add_argument("--languages", nargs="+", required=True, help="Target language ids, e.g. ta-IN kn-IN sw-KE.")
    parser.add_argument("--translator-model", type=str, required=True, help="Translator model: a models.json id or a litellm model string.")
    parser.add_argument("--script-id", nargs="+", default=None, help="Scripts to translate (default: every English one).")
    parser.add_argument("--scripts", type=Path, default=None, help="Script root (default data/scripts).")
    parser.add_argument("--region-id", type=str, default=None, help="Region for the translated scripts (default: the region whose language this is).")
    parser.add_argument("--mode", type=str, default=CODE_MIXED, choices=sorted(MODES), help="Whether the subject matter is carried in English.")
    parser.add_argument("--max-refine-iters", type=int, default=1, help="Refinement passes the TEaR loop may apply per script.")
    parser.add_argument("--overwrite", action="store_true", help="Replace scripts that already exist.")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    load_dotenv()
    cat = load_catalogs(_DATA_DIR)
    model, params = resolve_model_ref(args.translator_model)
    root = args.scripts or _DATA_DIR / "scripts"
    script_ids = args.script_id or source_script_ids(args.scripts)

    for language_id in args.languages:
        if language_id == SOURCE_LANGUAGE_ID:
            continue
        for script_id in script_ids:
            out_path = root / language_id / f"{script_id}.json"
            # A translated script may have been corrected by hand since; never silently redo it.
            if out_path.exists() and not args.overwrite:
                print(f"skip (exists) {out_path}")
                continue
            written = translate_script(
                script_id,
                language_id,
                model=model,
                mode=args.mode,
                cat=cat,
                region_id=args.region_id,
                model_params=params,
                max_refine_iters=args.max_refine_iters,
                scripts_root=args.scripts,
            )
            print(f"wrote {written}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
