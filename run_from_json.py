"""Run every session declared in data/run_set.json (JSON-driven, resumable).

Resolves each run_set item into a SessionConfig + models + teacher prompt via the catalog loader,
then runs it `repeats` times. Output is organized as runs/from_json/<item_id>/r<n>/<timestamp>_<uuid>/.
Re-running skips cells that already have a transcript, so it is safe to resume.
"""
from __future__ import annotations

import asyncio
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.teachtune.catalog import load_run_set
from tutoring_check.teachtune.session import run_teachtune_session

OUTPUT_ROOT = Path("runs/from_json")


async def main() -> None:
    load_dotenv()
    runs = load_run_set()
    total = sum(r.repeats for r in runs)
    done = 0
    for r in runs:
        for rep in range(r.repeats):
            cell = OUTPUT_ROOT / r.item_id / f"r{rep}"
            if list(cell.glob("*/transcript.jsonl")):
                done += 1
                print(f"[{done}/{total}] skip (exists) {cell}")
                continue
            out_dir = await run_teachtune_session(
                r.config,
                teacher_model=r.teacher_model,
                student_model=r.student_model,
                output_root=cell,
                teacher_prompt=r.teacher_prompt,
            )
            done += 1
            print(f"[{done}/{total}] {r.item_id} r{rep} -> {out_dir}")


if __name__ == "__main__":
    asyncio.run(main())
