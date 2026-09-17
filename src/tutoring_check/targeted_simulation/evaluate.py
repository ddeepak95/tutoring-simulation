"""Score one cell: annotate each sampled target turn and count the moves (docs/target_turns.md §7).
Only the sampled turn is annotated; the script is context, never scored.
"""
from __future__ import annotations

import json
from pathlib import Path

from litellm import acompletion

from tutoring_check.evaluation import instruction_annotator
from tutoring_check.evaluation.dimensions import dimension_keys
from tutoring_check.evaluation.evaluator import _completion_kwargs, _parse_moves, _presence_vector
from tutoring_check.evaluation.transcript import Transcript, Turn
from tutoring_check.runlog import JsonlLogger, serialize_response, utc_now
from tutoring_check.targeted_simulation.script import SYSTEM, TUTOR
from tutoring_check.targeted_simulation.target import RESPONSES_NAME
from tutoring_check.vertex_auth import with_adc_token

EVALUATION_NAME = "evaluation.jsonl"
# The same turns annotated in their own language, so the
# translation step's effect on the tags can be read off the difference.
EVALUATION_SOURCE_NAME = "evaluation_source.jsonl"
TRANSLATED_NAME = "responses_en.jsonl"


class CellError(ValueError):
    """A cell that cannot be scored as it stands."""


def evaluation_name(prefer_english: bool, tag: str | None = None) -> str:
    """Which evaluation file a run writes; annotations that differ never share one.
    `tag` names a run kept alongside the default, e.g. the same turns under a second annotator.
    """
    stem = EVALUATION_NAME if prefer_english else EVALUATION_SOURCE_NAME
    return f"{stem.removesuffix('.jsonl')}_{tag}.jsonl" if tag else stem


def read_cell(cell_dir: Path, *, prefer_english: bool = True) -> tuple[dict, list[dict]]:
    """The `target_start` header and the per-repeat records, in repeat order.
    `prefer_english` off returns the sampled text itself, which is what §6 translates from.
    """
    path = cell_dir / RESPONSES_NAME
    if not path.exists():
        raise CellError(f"no {RESPONSES_NAME} in {cell_dir}")

    header: dict | None = None
    records: list[dict] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        record = json.loads(line)
        if record.get("type") == "target_start":
            header = record
        elif "repeat" in record:
            records.append(record)
    if header is None:
        raise CellError(f"no target_start header in {path}")
    if not records:
        raise CellError(f"no sampled responses in {path}")

    # §6 renders the sampled turns in English; the rubric is applied to those when they are there.
    english = cell_dir / TRANSLATED_NAME
    if prefer_english and english.exists():
        by_repeat = {
            r["repeat"]: r
            for line in english.read_text(encoding="utf-8").splitlines()
            if line.strip() and "repeat" in (r := json.loads(line))
        }
        missing = [r["repeat"] for r in records if r["repeat"] not in by_repeat]
        if missing:
            raise CellError(f"{english} is missing repeats {missing}")
        records = [by_repeat[r["repeat"]] for r in records]

    return header, sorted(records, key=lambda r: r["repeat"])


def _transcript(cell_dir: Path, header: dict, content: str) -> tuple[Transcript, int]:
    """The scripted turns plus one sampled turn, and that turn's id. Only the last turn varies."""
    # The system message is the tutor's instructions, not a turn the annotator reads.
    turns = [
        Turn(turn_id=i, speaker="tutor" if m["role"] == TUTOR else "student", content=m["content"])
        for i, m in enumerate(m for m in header["messages"] if m["role"] != SYSTEM)
    ]
    target_id = len(turns)
    turns.append(Turn(turn_id=target_id, speaker="tutor", content=content))
    transcript = Transcript(
        path=cell_dir / RESPONSES_NAME,
        scenario_id=header["script_id"],
        scenario_type="target",
        region=header.get("region", ""),
        language=header.get("language", ""),
        tutor_model=header.get("tutor_model", ""),
        turns=tuple(turns),
    )
    return transcript, target_id


def scored_repeats(cell_dir: Path, name: str = EVALUATION_NAME) -> tuple[set[int], bool]:
    """Which repeats are already annotated, and whether the summary was written."""
    path = cell_dir / name
    if not path.exists():
        return set(), False
    done: set[int] = set()
    complete = False
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        record = json.loads(line)
        if "repeat" in record:
            done.add(record["repeat"])
        elif record.get("type") == "summary":
            complete = True
    return done, complete


def scored_header(cell_dir: Path, name: str = EVALUATION_NAME) -> dict | None:
    """The header of an existing annotation, or None when there is none to compare against."""
    path = cell_dir / name
    if not path.exists():
        return None
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip() and (record := json.loads(line)).get("type") == "evaluation_start":
            return record
    return {}


async def _annotate(
    model: str,
    transcript: Transcript,
    target_id: int,
    repeat: int,
    logger: JsonlLogger,
    reasoning: str | None,
    params: dict | None,
    prompt_version: str,
) -> list[int]:
    messages = [
        {"role": "system", "content": instruction_annotator.build_system_prompt(prompt_version)},
        {"role": "user", "content": instruction_annotator.mark_dialogue(transcript, target_id)},
    ]
    request = _completion_kwargs(model, messages, reasoning, params)
    logger.log_api_request({"timestamp": utc_now(), "repeat": repeat, "payload": request})
    response = await acompletion(**with_adc_token(request))
    logger.log_api_response(
        {"timestamp": utc_now(), "repeat": repeat, "raw_response": serialize_response(response)}
    )
    return _presence_vector(_parse_moves(response, repeat))


async def score_cell(
    cell_dir: Path,
    *,
    annotator_model: str,
    annotator_reasoning: str | None = None,
    annotator_model_params: dict | None = None,
    annotator_prompt: str = instruction_annotator.DEFAULT_PROMPT_VERSION,
    prefer_english: bool = True,
    tag: str | None = None,
) -> Path:
    """Annotate every sampled turn in `cell_dir`; resume-safe.
    `prefer_english` off annotates the turns in their own language into `evaluation_source.jsonl`;
    the difference between the two files is the translation step's own effect on the tags.
    """
    # Fail before any API call on a bad prompt version or unsupported reasoning effort.
    instruction_annotator.build_system_prompt(annotator_prompt)
    _completion_kwargs(annotator_model, [], annotator_reasoning, annotator_model_params)

    header, records = read_cell(cell_dir, prefer_english=prefer_english)
    source = (
        TRANSLATED_NAME
        if prefer_english and (cell_dir / TRANSLATED_NAME).exists()
        else RESPONSES_NAME
    )
    name = evaluation_name(prefer_english, tag)
    done, complete = scored_repeats(cell_dir, name)

    # An existing annotation is only resumed or skipped when it was made the same way. Otherwise a
    # cell scored before §6 ran, or under a different annotator, would silently stand as this one's.
    previous = scored_header(cell_dir, name)
    if previous is not None:
        changed = [
            f"{field}: {previous.get(field) or 'unrecorded'} -> {now}"
            for field, now in (
                ("source", source),
                ("annotator_model", annotator_model),
                ("annotator_prompt", annotator_prompt),
            )
            if previous.get(field, "") != now
        ]
        if changed:
            raise CellError(
                f"{cell_dir / name} was annotated differently ({'; '.join(changed)}). Pass --tag to "
                "keep this run alongside it, or delete it and its request/response logs to replace it."
            )
    # A summary alone is not completion: a cell resampled to a larger `repeats` has turns this
    # annotation never saw, and skipping on the summary would report 10 of 50 as a finished cell.
    if complete and done >= {record["repeat"] for record in records}:
        return cell_dir

    keys = list(dimension_keys())
    stem = name.removesuffix(".jsonl")
    logger = JsonlLogger(
        out_dir=cell_dir,
        transcript_name=name,
        request_name=f"{stem}_requests.jsonl",
        response_name=f"{stem}_responses.jsonl",
    )
    # Keyed on the file, not on `done`: a run that died between the header and the first
    # annotation leaves a header with no vectors, and resuming would write a second one.
    if not logger.transcript_path.exists():
        logger.log_transcript(
            {
                "timestamp": utc_now(),
                "type": "evaluation_start",
                "script_id": header["script_id"],
                "language": header.get("language", ""),
                "tutor_model": header.get("tutor_model", ""),
                "annotator_model": annotator_model,
                "annotator_reasoning": annotator_reasoning,
                "annotator_prompt": annotator_prompt,
                "source": source,
                "repeats": len(records),
                "dimensions": keys,
            }
        )

    vectors: dict[int, list[int]] = {}
    for record in records:
        repeat = record["repeat"]
        if repeat in done:
            continue
        transcript, target_id = _transcript(cell_dir, header, record["content"])
        vector = await _annotate(
            annotator_model,
            transcript,
            target_id,
            repeat,
            logger,
            annotator_reasoning,
            annotator_model_params,
            annotator_prompt,
        )
        vectors[repeat] = vector
        logger.log_transcript({"timestamp": utc_now(), "repeat": repeat, "dimensions": vector})

    # Summed over every repeat in the file, including ones annotated by an earlier run.
    all_vectors = _all_vectors(cell_dir, name)
    counts = [sum(v[i] for v in all_vectors) for i in range(len(keys))]
    logger.log_transcript(
        {
            "timestamp": utc_now(),
            "type": "summary",
            "repeats": len(all_vectors),
            "counts": dict(zip(keys, counts)),
        }
    )
    return cell_dir


def _all_vectors(cell_dir: Path, name: str = EVALUATION_NAME) -> list[list[int]]:
    """Every per-repeat vector written to the evaluation file, in repeat order."""
    path = cell_dir / name
    by_repeat: dict[int, list[int]] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        record = json.loads(line)
        if "repeat" in record:
            by_repeat[record["repeat"]] = record["dimensions"]
    return [by_repeat[k] for k in sorted(by_repeat)]
