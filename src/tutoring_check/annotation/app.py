"""FastAPI app: the transcript picker, the chat-thread annotation view, and its sidebar (annotation_tool.md "Delivery form").

One process serves both the routes and the Jinja+HTMX front-end; SQLite is the live store.
"""
from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, PlainTextResponse, RedirectResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from tutoring_check.annotation import store
from tutoring_check.evaluation.transcript import load_transcript

_HERE = Path(__file__).parent
templates = Jinja2Templates(directory=str(_HERE / "templates"))
templates.env.filters["label_class"] = store.label_class
templates.env.filters["sanitize"] = store.sanitize


def _static_v() -> str:
    """Cache-busting token = style.css mtime, recomputed per render so edits show up."""
    try:
        return str(int((_HERE / "static" / "style.css").stat().st_mtime))
    except OSError:
        return "0"


templates.env.globals["static_v"] = _static_v

app = FastAPI(title="Tutoring annotation tool")
app.mount("/static", StaticFiles(directory=str(_HERE / "static")), name="static")
store.init_db()

ANNOTATOR_COOKIE = "annotator_id"
ANNOTATORS = ["deepak", "emily"]


def annotator_of(request: Request) -> str:
    """The annotator id from the cookie, or "" when none has been set yet."""
    return request.cookies.get(ANNOTATOR_COOKIE, "")


def _needs_annotator(request: Request) -> Response | None:
    """Guard for annotator-dependent routes: send the client to the picker if none is set.

    HTMX honours the HX-Redirect header, so stale fragment requests navigate away
    instead of silently creating an annotation set with no annotator.
    """
    if annotator_of(request):
        return None
    resp = Response(status_code=204)
    resp.headers["HX-Redirect"] = "/"
    return resp


@app.get("/favicon.ico")
def favicon():
    from fastapi.responses import Response

    return Response(status_code=204)



# picker (cascading dropdowns)

@app.get("/", response_class=HTMLResponse)
def picker(request: Request):
    return templates.TemplateResponse(
        request,
        "picker.html",
        {"request": request, "run_sets": store.list_run_sets(),
         "annotator": annotator_of(request), "annotators": ANNOTATORS},
    )


@app.post("/annotator")
def set_annotator(annotator_id: str = Form(...)):
    resp = RedirectResponse("/", status_code=303)
    if annotator_id.strip() in ANNOTATORS:  # ignore anything off the known list
        resp.set_cookie(ANNOTATOR_COOKIE, annotator_id.strip())
    return resp


@app.get("/api/items", response_class=HTMLResponse)
def api_items(request: Request, run_set: str = ""):
    return templates.TemplateResponse(
        request,
        "fragments/options.html",
        {"request": request, "placeholder": "topic item…", "values": store.list_items(run_set)},
    )


@app.get("/api/runs", response_class=HTMLResponse)
def api_runs(request: Request, run_set: str = "", item: str = ""):
    return templates.TemplateResponse(
        request,
        "fragments/options.html",
        {"request": request, "placeholder": "run…", "values": store.list_runs(run_set, item)},
    )


@app.get("/api/resolve", response_class=HTMLResponse)
def api_resolve(request: Request, run_set: str = "", item: str = "", run: str = ""):
    if (guard := _needs_annotator(request)) is not None:
        return guard
    ref = store.ref_for(f"{run_set}/{item}/{run}")
    if ref is None:
        return HTMLResponse("")
    header = store.header_of(str(ref.path))
    transcript = load_transcript(ref.path)
    with store.connect() as conn:
        set_id = store.get_or_create_set(conn, ref, header, annotator_of(request))
        done, total = store.conversation_status(transcript, store.load_annotations(conn, set_id))
    return templates.TemplateResponse(
        request,
        "fragments/resolve.html",
        {"request": request, "ref": ref, "header": header, "name": store.display_name(header),
         "done": done, "total": total},
    )


# annotation view

def _load(request: Request, slug: str):
    """Resolve a slug to (ref, header, transcript, set_id, annotations)."""
    ref = store.ref_for(store.key_from_slug(slug))
    if ref is None:
        return None
    header = store.header_of(str(ref.path))
    transcript = load_transcript(ref.path)
    with store.connect() as conn:
        set_id = store.get_or_create_set(conn, ref, header, annotator_of(request))
        annotations = store.load_annotations(conn, set_id)
    return ref, header, transcript, set_id, annotations


@app.get("/annotate/{slug}", response_class=HTMLResponse)
def annotate(request: Request, slug: str):
    if not annotator_of(request):  # no annotator set yet — back to the picker
        return RedirectResponse("/", status_code=303)
    loaded = _load(request, slug)
    if loaded is None:
        return PlainTextResponse("transcript not found", status_code=404)
    ref, header, transcript, set_id, annotations = loaded
    markers = {
        t.turn_id: store.turn_complete(
            "tutor_dimensions", annotations.get(t.turn_id, {}).get("data", {})
        )
        for t in transcript.turns
        if t.is_tutor
    }
    done, total = store.conversation_status(transcript, annotations)
    return templates.TemplateResponse(
        request,
        "annotate.html",
        {"request": request, "slug": slug, "ref": ref, "header": header,
         "name": store.display_name(header), "turns": transcript.turns,
         "markers": markers, "done": done, "total": total,
         "annotator": annotator_of(request)},
    )


@app.get("/annotate/{slug}/sidebar", response_class=HTMLResponse)
def sidebar(request: Request, slug: str, turn_id: int):
    if (guard := _needs_annotator(request)) is not None:
        return guard
    loaded = _load(request, slug)
    if loaded is None:
        return PlainTextResponse("transcript not found", status_code=404)
    ref, header, transcript, set_id, annotations = loaded
    turn = next((t for t in transcript.turns if t.turn_id == turn_id), None)
    if turn is None:
        return PlainTextResponse("turn not found", status_code=404)
    data = annotations.get(turn_id, {}).get("data", {})
    ctx = {"request": request, "slug": slug, "turn": turn, "data": data}
    if turn.is_tutor:
        ctx["dimensions"] = store.TUTOR_DIMENSIONS
        ctx["labels"] = data.get("labels", {})
        return templates.TemplateResponse(request, "fragments/sidebar_tutor.html", ctx)
    return templates.TemplateResponse(request, "fragments/sidebar_student.html", ctx)


@app.post("/annotate/{slug}/save", response_class=HTMLResponse)
async def save(request: Request, slug: str, turn_id: int, kind: str, dim: str = "", field: str = ""):
    if (guard := _needs_annotator(request)) is not None:
        return guard
    ref = store.ref_for(store.key_from_slug(slug))
    if ref is None:
        return PlainTextResponse("transcript not found", status_code=404)
    header = store.header_of(str(ref.path))
    transcript = load_transcript(ref.path)
    form = await request.form()
    value = (form.get("value") or "").strip()
    with store.connect() as conn:
        set_id = store.get_or_create_set(conn, ref, header, annotator_of(request))
        if field == "note":
            store.set_note(conn, set_id, turn_id, kind, form.get("note", ""))
        elif kind == "tutor_dimensions":
            store.set_dimension(conn, set_id, turn_id, dim, value)
        annotations = store.load_annotations(conn, set_id)
    data = annotations.get(turn_id, {}).get("data", {})
    complete = store.turn_complete(kind, data)
    done, total = store.conversation_status(transcript, annotations)
    # Status line for the sidebar, plus out-of-band swaps of the bubble's marker
    # and the conversation progress count.
    return templates.TemplateResponse(
        request,
        "fragments/saved.html",
        {"request": request, "turn_id": turn_id, "complete": complete,
         "done": done, "total": total},
    )


@app.post("/annotate/{slug}/export", response_class=HTMLResponse)
def export(request: Request, slug: str):
    if (guard := _needs_annotator(request)) is not None:
        return guard
    ref = store.ref_for(store.key_from_slug(slug))
    if ref is None:
        return PlainTextResponse("transcript not found", status_code=404)
    header = store.header_of(str(ref.path))
    with store.connect() as conn:
        out = store.export_jsonl(conn, ref, header, annotator_of(request))
    return HTMLResponse(f"<span class='ok'>exported → {out}</span>")


# per-run-set interrater reliability


@app.get("/aggregate", response_class=HTMLResponse)
def aggregate(request: Request, run_set: str = ""):
    result = store.interrater_run_set(run_set) if run_set else None
    language_comparison = store.language_dimension_distribution(run_set) if run_set else None
    return templates.TemplateResponse(
        request,
        "aggregate.html",
        {"request": request, "run_sets": store.list_run_sets(),
         "run_set": run_set, "result": result, "dimensions": store.TUTOR_DIMENSIONS,
         "language_comparison": language_comparison},
    )


def main() -> None:
    """Console entry point (`tutoring-annotate`); host/port via ANNOTATION_HOST/ANNOTATION_PORT.

    Set ANNOTATION_RELOAD=1 during development to auto-reload on code/template edits.
    """
    import os

    import uvicorn

    host = os.environ.get("ANNOTATION_HOST", "127.0.0.1")
    port = int(os.environ.get("ANNOTATION_PORT", "8000"))
    reload = os.environ.get("ANNOTATION_RELOAD", "").lower() in ("1", "true", "yes")
    print(f"annotation tool → http://{host}:{port}/" + ("  (auto-reload on)" if reload else ""))
    uvicorn.run("tutoring_check.annotation.app:app", host=host, port=port, reload=reload)


if __name__ == "__main__":
    main()