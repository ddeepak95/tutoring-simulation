"""Package only the audited extension build; never include environment files."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json

root = Path(__file__).resolve().parents[1]
dist = root / "dist"
allowed = {"manifest.json", "config.js", "background.js", "assisted.js", "assisted-page.js", "capture.js", "original.js", "archive-store.js", "selectable.js", "selectable-ui.js", "client.js", "review.js", "review.html", "review.css"}
files = list(dist.iterdir())
if {p.name for p in files} != allowed or any(not p.is_file() or p.is_symlink() for p in files):
    raise SystemExit("Build is incomplete or contains unexpected files. Run the build first.")
manifest = json.loads((dist / "manifest.json").read_text(encoding="utf-8"))
archive = root / f"chatgpt-conversation-extension-{manifest['version']}.zip"
for file in files:
    text = file.read_text(encoding="utf-8")
    if any(marker in text for marker in ("sb_secret_", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_ACCESS_TOKEN", "PRIVATE KEY-----")):
        raise SystemExit("Private credential material detected; packaging cancelled.")
with ZipFile(archive, "w", ZIP_DEFLATED) as output:
    for file in sorted(files):
        output.write(file, file.name)
print(f"Packaged {archive.name} ({archive.stat().st_size:,} bytes).")
