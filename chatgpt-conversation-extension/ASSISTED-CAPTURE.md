# Assisted capture (1.7.1)

The regular capture remains the starting snapshot. Assisted capture adds an agent that observes the response DOM and a screenshot, asks the configured Gemini model for one next action, executes it against an observed control, and preserves revealed states using the existing HTML/image extractor. It does not ask the model to regenerate the transcript or reconstruct images.

## Try it

1. Reload the unpacked extension from `dist` in `chrome://extensions`. Version 1.7.0 adds access only to the local helper at `http://127.0.0.1:8766/*` alongside the existing Supabase host.
2. Start the local helper from the repository root:

   ```powershell
   npm --prefix chatgpt-conversation-extension run agent
   ```

3. The helper reads `GEMINI_API_KEY` from the existing root `.env`, public Supabase settings from `annotation-portal/.env.local`, and the model from `annotation-portal/server/generated/evaluation-config.json`. It calls the **direct Gemini API**, never OpenRouter. No model key is bundled in the extension or returned by the helper. The portal dev server can remain closed.
4. Refresh a saved ChatGPT conversation, make a normal capture, and sign in with your portal account in the review tab.
5. Under **Assisted capture**, leave **Allow the agent to select quiz answers** enabled (the default), or uncheck it to opt out. This changes source answers; generated answers and feedback are capture artifacts, not learner responses.
6. Click **Start assisted capture**. Keep ChatGPT active while it runs. A **Stop** button appears on the source page; the review tab also provides Stop and an action log. Stop cancels pending model requests and prevents further actions after the current operation.
7. Review the original snapshot and collected interactive states. Save normally, or download the selectable HTML/project. The database archive includes the assisted action log, model/provider, counts, limitations, and labels for agent-generated answer states.

## What it handles

- Recognized assistant responses: details/accordions, tabs/buttons, radio-option quizzes, sliders, dropdowns, bounded scrolling, and waits for rendering.
- Actual text and computed styles remain HTML. Original accessible image files are embedded; rendered visuals use the existing bounded screenshot fallback.
- Before/after states are appended to the original capture. Tabs and quiz screens can therefore appear together in the saved document. These are additional views of the same response, not new conversational turns.
- The helper uses [Gemini structured output](https://ai.google.dev/api/generate-content) to choose an action. Both the helper and extension validate it; the model cannot provide arbitrary JavaScript or selectors.
- Every model request requires a verified Supabase admin/annotator session. The helper binds only to loopback, checks extension origins and request sizes, and limits requests. It does not log source content, credentials or provider responses to disk.

## Limits and source changes

This is a bounded trial, not an exhaustive browser crawler or exact interactive replica. It runs at most 18 decisions / three minutes, limits collected states and output size, and stops repeated actions. Unreadable cross-origin or sandboxed frames are reported; the agent cannot bypass their permissions. Unknown role markup may prevent assisted actions even if ordinary HTML capture succeeds.

The agent never operates the composer, account/sidebar controls, links, Submit/Finish, delete/reset, share/upload/download or purchases. Quiz choices require the separate checkbox and existing selected answers are not replaced. Page content is treated as untrusted data in the agent prompt; page actions are also restricted by code.

Details, sliders/dropdowns and source scrolling are restored where possible. Tabs, widget navigation and quiz answers may remain changed. States after an agent answer carry visible artifact labels; the original baseline remains separate. Completing the agent loop does not certify that every question, hidden state, asset or pixel has been captured. A real ChatGPT conversation still requires a manual check.

Normal capture and recapture select quiz answers by default to collect all questions and feedback. Existing selected answers are preserved; generated selections stay labeled as capture artifacts. Normal recapture clears the assisted state collection and creates a fresh snapshot. Translations and previously saved database archives are not rewritten automatically. If Chrome restarts its extension worker during a run, the review marks it interrupted and retains the previous snapshot for retry.

## Verification

```powershell
npm --prefix chatgpt-conversation-extension run test:agent
npm --prefix chatgpt-conversation-extension run package
cd annotation-portal
npx playwright test tests/browser/assisted-capture.spec.ts
```

The tests cover direct Google request formatting, schema/target validation, authorization, blocked controls, expanded/tab/slider HTML states, saving provenance, restoration and Stop. Automated tests use synthetic pages; live provider and actual ChatGPT compatibility are separate checks.
