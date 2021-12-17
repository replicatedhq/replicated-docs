# policy update

Update an existing policy

### Synopsis

Update an existing policy.

### Usage
```bash
replicated enterprise policy update [flags]
```


| Flag                  | Type   | Description |
|-----------------------|--------|-------------|
| `-h, --help` | | help for update |
| `--id` | string | The id of the policy to be updated |
| `--name` | string | The new name for this policy |
| `--description` | string | The new description of this policy |
| `--policy-file` | string | The filename containing an OPA policy |

### Examples

Create a new file `updated-crd.rego` with this content:
```plaintext
# error if a kind is CustomResourceDefinition
lint[output] {
  file := files[_]
  file.content.kind == "CustomResourceDefinition"
  output := {
    "rule": "custom-resource-definition",
    "type": "error",
    "message": "CRDs are not encouraged",
    "path": file.path
  }
}
```

Run the following command to update an existing policy:
```bash
replicated enterprise policy update --id "1bHLBmmybKi4uASV1TDHldZCB6H" --name "CRDs" --description "CRDs are not encouraged" --policy-file updated-crd.rego
ID                             NAME
1bHLBmmybKi4uASV1TDHldZCB6H    CRDs
```
