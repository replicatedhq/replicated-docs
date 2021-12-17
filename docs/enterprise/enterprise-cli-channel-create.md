# channel create

Create a new shared release channel

### Synopsis

Create a new shared release channel for vendors.

### Usage
```bash
replicated enterprise channel create [flags]
```


| Flag                  | Type   | Description |
|-----------------------|--------|-------------|
| `-h, --help` | | help for create |
| `--name` | string | The name of this channel |
| `--description` | string | A longer description of this channel |

### Examples

```bash
replicated enterprise channel create --name "Some Big Bank" --description "A longer description of the channel"
ID                             NAME
1aUcp52Hcvval50e1gyYaoW5oUO    Some Big Bank
```
