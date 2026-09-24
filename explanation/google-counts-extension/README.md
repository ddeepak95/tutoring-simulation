# Collect with your everyday signed-in Chrome

1. Open `chrome://extensions` in your everyday Chrome profile.
2. Enable **Developer mode** and choose **Load unpacked**.
3. Select `D:\Projects\PhD\tutoring-check\explanation\google-counts-extension`.
4. Open the **Research Google Result Counts** extension from Chrome's extensions menu.
5. Click **Start / resume**. It opens one study tab and searches the 48 fixed topic phrases, at least 30 seconds apart. Keep Chrome open.
6. If it pauses for verification or consent, complete that yourself and click **Start / resume** again. Missing or conflicting counts also pause the collection. Nothing is entered as zero just because a count is unavailable.
7. Click **Export results** when finished. Chrome downloads `google-browser-counts.json`; partial exports are also supported.

The extension operates in the Chrome profile where you load it, retaining that profile's existing Google sign-in. It does not independently verify account identity. It never switches accounts, solves verification, reads cookies/passwords, or changes existing tabs. It reads only its own study tab on `https://www.google.com/`, stores counts and result-panel HTML locally, and downloads the export when clicked. It sends no results to an API or server. The queries themselves are sent to Google through ordinary navigation and may appear in your account's search history.

The manifest requests scripting, local storage, alarms, and access to Google.com. Remove the unpacked extension after exporting if no longer needed. Search settings are `hl=en`, `gl=us`, `pws=0`, with no results-language restriction; signed-in and location effects can still remain.

These will be a new dataset, separate from the earlier research-profile browser and SerpAPI measurements. Counts reflect visible estimates, not a verified census of web pages.
