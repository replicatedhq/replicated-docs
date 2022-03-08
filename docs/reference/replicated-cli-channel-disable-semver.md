# channel disable-semantic-versioning

Disable semantic versioning for a channel.

### Usage
```bash
replicated channel disable-semantic-versioning CHANNEL_ID
```

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |  |          Help for the command. |
| `--app string` | |   The app slug or app id used in all calls. **Default**: Uses the `$REPLICATED_APP` environment variable. |
| `--token string` | |  The API token used to access your app in the Vendor API. **Default**: Uses the `$REPLICATED_API_TOKEN` environment variable. |

### Examples
```bash
replicated channel disable-semantic-versioning 1xyB2Mgbg9N7rExShfbdBYIuzeW
Semantic versioning successfully disabled for channel 1xyB2Mgbg9N7rExShfbdBYIuzeW
```
