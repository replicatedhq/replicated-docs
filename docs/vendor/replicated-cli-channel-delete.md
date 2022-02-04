# channel delete

Delete (archive) a channel.

## Usage
```bash
replicated channel rm CHANNEL_ID
```

Note: You can only use the channel ID to delete the channel, not the channel name.

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |  |          Help for the command |
| `--app string` | |   The app slug or app id used in all calls (default uses `$REPLICATED_APP` env variable) |
| `--token string` | |  The API token used to access your app in the Vendor API (default uses `$REPLICATED_API_TOKEN` env variable) |

## Examples
```bash
replicated channel rm 1xyB2Mgbg9N7rExShfbdBYIuzeW
Channel 1xyB2Mgbg9N7rExShfbdBYIuzeW successfully archived
```
