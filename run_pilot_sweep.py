"""Model-variability sweep: teacher models x {P3, P3.1} on a fixed student (Blake).

Holds the student profile AND the student model fixed so differences across runs are attributable
to the teacher model and the teacher prompt. Each cell is repeated REPEATS times to estimate
run-to-run noise. Output dirs are tagged model__prompt__student__rN for manual scoring.
"""
from __future__ import annotations

import asyncio
from pathlib import Path

from dotenv import load_dotenv

from tutoring_check.teachtune.agents import TeacherPrompt
from tutoring_check.teachtune.config import create_pilot_profiles
from tutoring_check.teachtune.session import run_teachtune_session


TEACHER_MODELS = [
    "openai/gpt-4o",
    "openai/gpt-5.4-mini",
    "gemini/gemini-2.5-flash",
]
STUDENT_MODEL = "openai/gpt-4o" # constant
PROMPTS = [TeacherPrompt.P3, TeacherPrompt.P3_1]
PROFILE_NAMES = ["Blake"]
REPEATS = 3
OUTPUT_ROOT = Path("runs/pilot_model")


def _slug(model: str) -> str:
    return model.replace("/", "-")


async def main() -> None:
    load_dotenv()
    profiles = {p.student_name: p for p in create_pilot_profiles()}
    selected = [profiles[name] for name in PROFILE_NAMES]

    total = len(TEACHER_MODELS) * len(PROMPTS) * len(selected) * REPEATS
    done = 0
    for teacher_model in TEACHER_MODELS:
        for prompt in PROMPTS:
            for profile in selected:
                for rep in range(REPEATS):
                    cell = OUTPUT_ROOT / f"{_slug(teacher_model)}__{prompt.value}__{profile.student_name}__r{rep}"
                    if list(cell.glob("*/transcript.jsonl")):
                        done += 1
                        print(f"[{done}/{total}] skip (exists) {cell}")
                        continue
                    out_dir = await run_teachtune_session(
                        profile,
                        teacher_model=teacher_model,
                        student_model=STUDENT_MODEL,
                        output_root=cell,
                        teacher_prompt=prompt,
                    )
                    done += 1
                    print(f"[{done}/{total}] {teacher_model} {prompt.value} {profile.student_name} r{rep} -> {out_dir}")


if __name__ == "__main__":
    asyncio.run(main())