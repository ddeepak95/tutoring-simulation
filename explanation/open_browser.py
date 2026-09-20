"""Open a dedicated Chrome for manual sign-in before attaching the experiment runner."""
import argparse
import os
from pathlib import Path
import socket
import subprocess

HERE = Path(__file__).resolve().parent


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=9222)
    parser.add_argument("--profile", type=Path, default=HERE / ".manual-browser-profile",
                        help="Dedicated Chrome data directory; use a different directory for each account")
    args = parser.parse_args()
    if not 1024 <= args.port <= 65535:
        parser.error("port must be between 1024 and 65535")
    candidates = [Path(os.environ.get(root, "")) / suffix for root, suffix in (
        ("PROGRAMFILES", "Google/Chrome/Application/chrome.exe"),
        ("PROGRAMFILES(X86)", "Google/Chrome/Application/chrome.exe"),
        ("LOCALAPPDATA", "Google/Chrome/Application/chrome.exe"))]
    chrome = next((p for p in candidates if p.is_file()), None)
    if chrome is None:
        parser.error("Google Chrome was not found")
    with socket.socket() as probe:
        try:
            probe.bind(("127.0.0.1", args.port))
        except OSError:
            parser.error("Debugging port is already in use; reuse the existing browser or select another port")
    profile = args.profile.resolve()
    profile.mkdir(parents=True, exist_ok=True)
    subprocess.Popen([str(chrome), f"--user-data-dir={profile}",
                      "--remote-debugging-address=127.0.0.1", f"--remote-debugging-port={args.port}",
                      "https://chatgpt.com/"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("Opened dedicated Chrome. Complete sign-in and verification yourself; leave it open.")
    print("No Playwright connection is made by this launcher.")
    print(f"Start a new run: .venv\\Scripts\\python.exe explanation/browser_run.py --cdp-url http://127.0.0.1:{args.port}")
    print("Use --output PATH to choose an exact run folder. To resume, add --resume and the existing --output PATH.")


if __name__ == "__main__":
    main()
