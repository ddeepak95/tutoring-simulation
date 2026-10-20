# Original page and JavaScript experiment (1.4.0)

Reload the extension, start a capture, then select **Capture original page + JavaScript** in the review tab. This works even when the cleaned HTML capture failed. Chrome may ask you to accept the new `pageCapture` permission when updating. Chrome 116+ is required; no persistent ChatGPT host permission is added.

**Download original page (.mhtml)** saves Chrome's native archive with its original layout and available resources. The cleaned capture's style and height edits do not affect it. Open the downloaded file directly in a new Chrome tab. MHTML cannot serve as the embedded portal preview and does not guarantee JavaScript replay.

**Download experiment (.zip)** contains:

- `index.html`: the local JavaScript replay entry point, preserving original layout.
- `source.html.txt`: captured original source for inspection.
- `assets/`: accessible scripts, CSS, images, SVG and fonts.
- `originals/`: unmodified versions of resource files whose links were rewritten for local replay.
- `manifest.json`: source mapping, missing resources, omissions and limitations.
- `README.txt`: instructions for running the local experiment.
- `page.mhtml`, when Chrome's native capture succeeded.
- `conversation.html`, when the separate cleaned history capture succeeded.

Extract the ZIP. Open a terminal in that folder and run:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/index.html` in Chrome. Stop the server with Ctrl+C afterward. Archived scripts execute in this local page; CSS and SVG animations can replay. Remote API calls are blocked. The scripts are never executed inside the extension or portal. Initialization state, dynamic imports, workers and server-dependent interactions may still fail: this is not a saved JavaScript virtual machine or ChatGPT server.

Native capture is limited to 64 MiB. Resource collection is bounded to about 25 seconds, 256 resources, 32 MiB total and 8 MiB per resource. The manifest distinguishes saved, missing and omitted resources. Requests are subject to browser CORS and use credentials only for same-origin resources. Cookies, browser storage and account API responses are not deliberately exported.

Original archives are stored in extension-origin IndexedDB, separate from the smaller session-storage transcript. They are removed when superseded by a new capture or when the extension starts in a new browser or extension session. Downloaded files remain wherever Chrome saves them. **Save to database still saves only the cleaned HTML snapshot**. Original MHTML and ZIP files are local experiments; they are not uploaded automatically.

Original archives capture the DOM present when that capture runs. They cannot recover history already removed by virtualization; `conversation.html` contains the separate scrolled capture. Compare the native archive, local replay and actual ChatGPT page before treating fidelity as verified.

The browser test `tests/browser/original-archive.spec.ts` exercises real native capture, ZIP integrity, local JavaScript replay, CSS animation, SVG animation, images, missing resources, downloads and opening MHTML from disk. It uses a fixture; live ChatGPT needs a separate manual check.
