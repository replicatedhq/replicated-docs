# installer update

Update an existing installer

### Synopsis

Update an existing installer.

### Usage
```bash
replicated enterprise installer update [flags]
```


| Flag                  | Type   | Description |
|-----------------------|--------|-------------|
| `-h, --help` | | help for update |
| `--id` | string | The id of the installer to be updated |
| `--yaml-file` | string | The filename containing the installer yaml |

### Examples

Create a new file `updated-installer.yaml` with this content:
```yaml
apiversion: cluster.kurl.sh/v1beta1"
kind: Installer
metadata:
  name: latest
spec:
  contour:
    version: latest
  kotsadm:
    version: 1.14.2
  kubernetes:
    version: latest
  registry:
    version: latest
  rook:
    version: latest
  weave:
    version: latest
```

Run the following command to update an existing installer:
```bash
replicated enterprise installer update --id "1bHJ3o4vEL7Mbwhm3bcug2HpkeY" --yaml-file updated-installer.yaml
ID
1bHJ3o4vEL7Mbwhm3bcug2HpkeY
```
