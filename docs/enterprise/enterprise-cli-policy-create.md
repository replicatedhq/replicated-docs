# policy create

Create a new policy

### Synopsis

Create a new policy that can later be assigned to a channel.

### Usage
```bash
replicated enterprise policy create [flags]
```


| Flag                  | Type   | Description |
|-----------------------|--------|-------------|
| `-h, --help` | | help for create |
| `--name` | string | The name of this policy |
| `--description` | string | A longer description of this policy |
| `--policy-file` | string | The filename containing an OPA policy |

### Examples

Create a new file `crd.rego` with this content:
```plaintext
# warn if a kind is CustomResourceDefinition
lint[output] {
  file := files[_]
  file.content.kind == "CustomResourceDefinition"
  output := {
    "rule": "custom-resource-definition",
    "type": "warn",
    "message": "CRDs are not encouraged",
    "path": file.path
  }
}
```

Run the following command to create the policy:
```bash
replicated enterprise policy create --name "CRDs" --description "CRDs are not encouraged" --policy-file crd.rego
ID                             NAME
1bHLBmmybKi4uASV1TDHldZCB6H    CRDs
```
