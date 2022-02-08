# release ls

List all of an app's releases.

## Usage
```bash
replicated release ls
```

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |  |          Help for the command |
| `--app string` | |   The app slug or app id used in all calls (default uses `$REPLICATED_APP` env variable) |
| `--token string` | |  The API token used to access your app in the Vendor API (default uses `$REPLICATED_API_TOKEN` env variable) |

## Example
```bash
replicated release ls
SEQUENCE    CREATED                      EDITED                  ACTIVE_CHANNELS
26          2020-01-20T17:53:22-08:00    0001-01-01T00:00:00Z    Unstable
25          2019-12-12T15:40:58-08:00    0001-01-01T00:00:00Z    
24          2019-10-28T19:41:23-07:00    0001-01-01T00:00:00Z    Beta
1           2019-10-17T15:01:16-07:00    0001-01-01T00:00:00Z    Stable   
```
