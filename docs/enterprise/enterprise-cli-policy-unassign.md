# policy unassign

Unassigns a policy from a channel

### Synopsis

Unassigns a policy from a release channel

### Usage
```bash
replicated enterprise policy unassign [flags]
```


| Flag                  | Type   | Description |
|-----------------------|--------|-------------|
| `-h, --help` | | help for unassign |
| `--policy-id` | string | The id of the policy to be unassigned |
| `--channel-id` | string | The id of the channel to unassign the policy from |

### Examples

```bash
replicated enterprise policy unassign --policy-id "1bHLBmmybKi4uASV1TDHldZCB6H" --channel-id "1aUcp52Hcvval50e1gyYaoW5oUO"

Policy successfully unassigned
```
