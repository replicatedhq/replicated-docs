# release promote

Associates (promotes) a given release to a channel.

## Usage
```bash
replicated release promote SEQUENCE CHANNEL_ID [Flags]
```

* _The required `SEQUENCE` argument is the integer number corresponding to a specific release._
* _The required `CHANNEL_ID` argument is channel ID or the **case sensitive** name of the channel, as displayed to the user._

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `--release-notes` | string |  The release notes for the release. Supports markdown formatting.|
| `--version` | string |       A version label for the release in this channel. |
| `-h, --help`   |  |          Help for the command. |
| `--app string` | |   The app slug or app id used in all calls. **Default**: `$REPLICATED_APP` environment variable. |
| `--token string` | |  The API token used to access your app in the Vendor API. **Default**: `$REPLICATED_API_TOKEN` environment variable. |

## Examples
```bash
replicated release promote 24 Beta --optional --version 1.3.0 --release-notes "Optional Beta release for feature X"
Channel jWNZHo8ypjrX1HkC4UXInoSI5OsK586m successfully set to release 24
```

```bash
replicated release promote 15 fe4901690971757689f022f7a460f9b2
Channel fe4901690971757689f022f7a460f9b2 successfully set to release 15
