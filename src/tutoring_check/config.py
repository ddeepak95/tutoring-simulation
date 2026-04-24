from __future__ import annotations

import json
import os
from pathlib import Path

from tutoring_check.schemas import (
    LanguagesFile,
    ModelsFile,
    ResolvedSession,
    RunSetFile,
    TopicsFile,
)


def _read_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def load_config(
    run_set_path: Path,
    topics_path: Path,
    languages_path: Path,
    models_path: Path,
) -> tuple[RunSetFile, TopicsFile, LanguagesFile, ModelsFile]:
    run_set = RunSetFile.model_validate(_read_json(run_set_path))
    topics = TopicsFile.model_validate(_read_json(topics_path))
    languages = LanguagesFile.model_validate(_read_json(languages_path))
    models = ModelsFile.model_validate(_read_json(models_path))
    return run_set, topics, languages, models


def resolve_sessions(
    run_set: RunSetFile,
    topics: TopicsFile,
    languages: LanguagesFile,
    models: ModelsFile,
    teacher_model_override: str | None = None,
    student_model_override: str | None = None,
) -> list[ResolvedSession]:
    topic_by_id = {t.id: t for t in topics.topics}
    language_by_id = {l.id: l for l in languages.languages}
    model_by_id = {m.id: m for m in models.models}

    teacher_env_default = os.getenv("TUTORING_TEACHER_MODEL")
    student_env_default = os.getenv("TUTORING_STUDENT_MODEL")

    resolved: list[ResolvedSession] = []
    for item in run_set.items:
        if item.topic_id not in topic_by_id:
            raise ValueError(f"Unknown topic_id '{item.topic_id}' in run set item '{item.id}'")
        if item.language_id not in language_by_id:
            raise ValueError(f"Unknown language_id '{item.language_id}' in run set item '{item.id}'")

        topic = topic_by_id[item.topic_id]
        language = language_by_id[item.language_id]
        misconception_by_id = {m.id: m for m in topic.misconception_sets}
        if item.misconception_set_id not in misconception_by_id:
            raise ValueError(
                f"Unknown misconception_set_id '{item.misconception_set_id}' for topic '{item.topic_id}' "
                f"in run set item '{item.id}'"
            )
        misconception_set = misconception_by_id[item.misconception_set_id]

        teacher_litellm_model = _resolve_litellm_model(
            override=teacher_model_override,
            model_id=item.teacher_model_id,
            model_by_id=model_by_id,
            env_default=teacher_env_default,
            role="teacher",
            run_set_item_id=item.id,
        )
        student_litellm_model = _resolve_litellm_model(
            override=student_model_override,
            model_id=item.student_model_id,
            model_by_id=model_by_id,
            env_default=student_env_default,
            role="student",
            run_set_item_id=item.id,
        )

        resolved.append(
            ResolvedSession(
                run_set_item_id=item.id,
                topic_id=topic.id,
                misconception_set_id=misconception_set.id,
                language_id=language.id,
                language_locale=language.locale,
                language_name=language.name,
                question=topic.question,
                criteria=topic.criteria,
                misconceptions=misconception_set.misconceptions,
                teacher_model_id=item.teacher_model_id,
                student_model_id=item.student_model_id,
                teacher_litellm_model=teacher_litellm_model,
                student_litellm_model=student_litellm_model,
            )
        )
    return resolved


def _resolve_litellm_model(
    *,
    override: str | None,
    model_id: str | None,
    model_by_id: dict,
    env_default: str | None,
    role: str,
    run_set_item_id: str,
) -> str:
    if override:
        return override
    if model_id:
        preset = model_by_id.get(model_id)
        if preset is None:
            raise ValueError(
                f"Unknown {role}_model_id '{model_id}' in run set item '{run_set_item_id}'"
            )
        return preset.litellm_model
    if env_default:
        return env_default
    raise ValueError(
        f"Missing {role} model for run set item '{run_set_item_id}'. "
        f"Set {role}_model_id in run_set.json, pass --{role}-model, or set env fallback."
    )
