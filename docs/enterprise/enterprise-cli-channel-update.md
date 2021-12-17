# channel update

Update an existing release channel

### Synopsis

Update an existing shared release channel.

### Usage
```bash
replicated enterprise channel update [flags]
```


| Flag                  | Type   | Description |
|-----------------------|--------|-------------|
| `-h, --help` | | help for update |
| `--id` | string | The id of the channel to be updated |
| `--name` | string | The name of this channel |
| `--description` | string | A longer description of this channel |

### Examples

```bash
replicated enterprise channel update --id "1aUcp52Hcvval50e1gyYaoW5oUO" --name "Some Big Bank" --description "An updated description of the channel"
ID                             NAME
1aUcp52Hcvval50e1gyYaoW5oUO    Some Big Bank
```
