# channel enable-semantic-versioning

Enable semantic versioning for a channel.

### Usage
```bash
replicated channel enable-semantic-versioning CHANNEL_ID
```

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |  |          Help for the command. |
| `--app string` | |   The app slug or app id used in all calls. **Default**: Uses the `$REPLICATED_APP` environment variable. |
| `--token string` | |  The API token used to access your app in the Vendor API. **Default**: Uses the `$REPLICATED_API_TOKEN` environment variable. |

### Examples
```bash
replicated channel enable-semantic-versioning 1xyB2Mgbg9N7rExShfbdBYIuzeW
Semantic versioning successfully enabled for channel 1xyB2Mgbg9N7rExShfbdBYIuzeW
```
