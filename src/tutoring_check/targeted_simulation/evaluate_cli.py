"""CLI: score every target cell under a run root (docs/target_turns.md §7).
A cell is a directory holding a `responses.jsonl`; cells are scored in parallel, repeats in order.
"""
from __future__ import annotations

import argparse
import asyncio
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.evaluation import instruction_annotator
from tutoring_check.simulation.catalog import resolve_model_ref
from tutoring_check.targeted_simulation.evaluate import (
    evaluation_name,
    read_cell,
    score_cell,
    scored_repeats,
)
from tutoring_check.targeted_simulation.target import RESPONSES_NAME


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Score sampled target turns with the mTeach annotator.")
    parser.add_argument("--runs", type=Path, default=Path("runs/targets"), help="Root dir to traverse for cells.")
    parser.add_argument("--annotator-model", type=str, required=True, help="Annotator model: a models.json id or a litellm model string.")
    parser.add_argument("--script-id", type=str, default=None, help="Score only cells for this script.")
    parser.add_argument(
        "--tag",
        type=str,
        default=None,
        help="Suffix the evaluation file, so a second annotation (e.g. another annotator) sits "
             "beside the existing one instead of colliding with it.",
    )
    parser.add_argument(
        "--in-language",
        action="store_true",
        help="Annotate the turns as sampled instead of their English rendering, into "
             "evaluation_source.jsonl. The gap between the two files is the translation's own effect.",
    )
    parser.add_argument("--concurrency", type=int, default=4, help="Max cells in flight at once.")
    parser.add_argument(
        "--annotator-reasoning",
        type=str,
        default=None,
        help="Reasoning effort for the annotator model (low/medium/high); its trace is logged in the responses file.",
    )
    parser.add_argument(
        "--annotator-prompt",
        type=str,
        default=instruction_annotator.DEFAULT_PROMPT_VERSION,
        choices=sorted(instruction_annotator.PROMPT_VERSIONS),
        help="Which wording of the annotator system prompt to use; recorded in the evaluation header.",
    )
    return parser


def find_cells(runs: Path, script_id: str | None = None) -> list[Path]:
    """Cell dirs = <runs>/<script_id>/<language_id>/<model_id>, found by their responses file."""
    cells = sorted(p.parent for p in runs.rglob(RESPONSES_NAME))
    if script_id:
        cells = [c for c in cells if c.parent.parent.name == script_id]
    return cells


async def run(args: argparse.Namespace) -> int:
    load_dotenv()
    cells = find_cells(args.runs, args.script_id)
    if not cells:
        raise ValueError(f"no cell with a {RESPONSES_NAME} found under {args.runs}")

    # Resolve through the catalog so a region-pinned annotator picks up its litellm_params.
    annotator_model, annotator_params = resolve_model_ref(args.annotator_model)

    sem = asyncio.Semaphore(max(1, args.concurrency))
    name = evaluation_name(not args.in_language, args.tag)

    async def score(cell_dir: Path) -> None:
        async with sem:
            await score_cell(
                cell_dir,
                annotator_model=annotator_model,
                annotator_reasoning=args.annotator_reasoning,
                annotator_model_params=annotator_params,
                annotator_prompt=args.annotator_prompt,
                prefer_english=not args.in_language,
                tag=args.tag,
            )
            print(f"scored {cell_dir / name}")

    tasks = []
    for cell_dir in cells:
        done, complete = scored_repeats(cell_dir, name)
        sampled = {r["repeat"] for r in read_cell(cell_dir, prefer_english=not args.in_language)[1]}
        if complete and done >= sampled:
            print(f"skip (complete) {cell_dir}")
            continue
        if done:
            print(f"resume ({len(done)}/{len(sampled)}) {cell_dir}")
        tasks.append(score(cell_dir))
    await asyncio.gather(*tasks)
    return 0


def main() -> int:
    args = build_parser().parse_args()
    return asyncio.run(run(args))


if __name__ == "__main__":
    raise SystemExit(main())
