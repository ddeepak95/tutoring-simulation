# Direct API conversations

This command asks the prompts in `topics.json` in order, with the selected OpenAI model. Each request includes the full visible user and assistant history. It sends no system or developer instructions and sets `store: false`. The resulting conversation is uploaded to the portal with `provider` set to the exact model ID and `access_type` set to `API`.

Run from the repository root:

```powershell
node agentic_conversation_capture/direct-api-conversation.mjs dry-run --topic alkaline-earth-metals --language en --model gpt-6.1-sol
node agentic_conversation_capture/direct-api-conversation.mjs generate --topic alkaline-earth-metals --language en --model gpt-6.1-sol --project uwrjiimzrafxlecqgxhu
```

The command reads `OPENAI_API_KEY` from the repository `.env`, and `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from `annotation-portal/.env.local`. If the portal has multiple admins, add `--admin USERNAME`. The project reference must match the configured Supabase URL. The generated JSON artifact is saved under `outputs/api/<topic>/<language>/` and uploaded to the private `transcripts` bucket. The command then verifies the saved database row and transcript. It creates no annotation or assignment rows.

If the upload fails after generation, use the saved artifact without making any more OpenAI requests:

```powershell
node agentic_conversation_capture/direct-api-conversation.mjs upload path\to\conversation.json --project uwrjiimzrafxlecqgxhu
```

The artifact records the exact requests, assistant answers, response IDs, usage, and settings. An incomplete or empty response leaves a failed local artifact and cannot be uploaded.
