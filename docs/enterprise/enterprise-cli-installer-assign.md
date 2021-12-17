# installer assign

Assigns an installer to a channel

### Synopsis

Assigns an installer to a release channel.

### Usage
```bash
replicated enterprise installer assign [flags]
```


| Flag                  | Type   | Description |
|-----------------------|--------|-------------|
| `-h, --help` | | help for assign |
| `--installer-id` | string | The id of the installer to be assigned |
| `--channel-id` | string | The id of the channel to assign the installer to |

### Examples

```bash
replicated enterprise installer assign --installer-id "1bHJ3o4vEL7Mbwhm3bcug2HpkeY" --channel-id "1aUcp52Hcvval50e1gyYaoW5oUO"

Installer successfully assigned
```
