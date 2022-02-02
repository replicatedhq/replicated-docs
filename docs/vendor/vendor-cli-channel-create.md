# channel create

Create a new channel in your application, and then print the channel.

## Usage
```bash
replicated channel create --name Beta --description 'New features subject to change'
```

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `--description` | string | A longer description of this channel |
| `--name` | string | The name of this channel (**required**) |
| `-h, --help`   |  |          Help for the command |
| `--app string` | |   The app slug or app id used in all calls (default uses `$REPLICATED_APP` env variable) |
| `--token string` | |  The API token used to access your app in the Vendor API (default uses `$REPLICATED_API_TOKEN` env variable) |

## Examples
```bash
replicated channel create --name cli-created --description "this is a description for a channel"
ID                             NAME           RELEASE    VERSION
1xyB2Mgbg9N7rExShfbdBYIuzeW    cli-created    1          0.0.1
```
