# Standalone question capture agent

The local agent launches installed Chrome in a dedicated persistent profile, starts one new ChatGPT conversation per question, explores bounded interactive response controls, and saves both the HTML archive and an annotation-ready conversation to the portal.

## Run it

1. Set `GEMINI_API_KEY` in the workspace `.env`. The agent reads the portal URL and public key from `annotation-portal/.env.local`, and the Gemini model from `annotation-portal/server/generated/evaluation-config.json`.
2. Run `npm --prefix chatgpt-conversation-extension run agent:questions`. On its first run it creates `.runtime/question-agent/questions.json` with a template and exits.
3. Edit the `questions` array. Each item has a unique `id`, `prompt`, `title`, `topic`, and `language`.
4. Run the command again. Sign in to the portal with an admin username and password when prompted. The password is entered without terminal echo and is not written to disk.
5. If ChatGPT is not signed in, the agent opens the same profile in ordinary Chrome for manual sign-in. Complete sign-in, close that Chrome window, and press Enter. The agent reopens the profile for capture; the ChatGPT session persists between runs.

Example question file:

```json
{
  "questions": [
    {
      "id": "linear-equations-01",
      "prompt": "Explain how to solve a linear equation, with one worked example.",
      "title": "Solving linear equations",
      "topic": "Algebra",
      "language": "English"
    }
  ]
}
```

The agent captures the complete visible conversation page as styled HTML, embeds one viewport screenshot with the chat input excluded, and captures additional HTML states as the agent interacts. It uses the configured Gemini model directly. It may select an unanswered quiz option only when the observed panel has blocked navigation; it never submits or finishes a quiz. Generated choices are recorded in archive metadata, not inserted as explanatory notes in the transcript.

Each completed item is saved as a raw HTML archive with captured images uploaded to the existing capture-images bucket, followed by an annotation-ready conversation prepared from the same archive. The progress file is `.runtime/question-agent/progress.json`; the dedicated Chrome data is in `.runtime/question-agent/chrome-profile`. Both stay local and are ignored by Git. Completed questions are skipped on later runs. If archive save succeeds but preparation fails, the next run resumes from that archive.

The agent allows at most 18 model decisions and 24 unique captured states per question. Unreadable frames, timeouts, UI changes, or size limits are reported; it stops on the first failed question so the saved progress can be reviewed and resumed. Keep the ChatGPT tab open while a question is being captured.
