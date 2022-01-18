# app delete

Delete a kots app.

## Usage
```bash
replicated app delete NAME
```

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |  |          Help for the command |
| `-f, --force`  |  | Skip the confirmation prompt. This action cannot be undone. |
| `--token string` | |  The API token used to access your app in the Vendor API (default uses `$REPLICATED_API_TOKEN` env variable) |

## Examples
```bash
replicated app delete deletion-example
  • Fetching App ✓
ID                             NAME                        SLUG                        SCHEDULER
1xyAIzrmbvqHzzcKPbTmmrTxhl4    deletion-example            deletion-example            kots
Delete the above listed application? There is no undo: yes█
  • Deleting App ✓
```
