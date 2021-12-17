# installer create

Create a new custom installer

### Synopsis

Create a new custom installer

### Usage
```bash
replicated enterprise installer create [flags]
```


| Flag                  | Type   | Description |
|-----------------------|--------|-------------|
| `-h, --help` | | help for create |
| `--yaml-file` | string | The filename containing the installer yaml |

### Examples

Create a new file `custom-installer.yaml` with this content:
```yaml
apiversion: cluster.kurl.sh/v1beta1"
kind: Installer
metadata:
  name: latest
spec:
  contour:
    version: latest
  kotsadm:
    version: 1.14.0
  kubernetes:
    version: latest
  registry:
    version: latest
  rook:
    version: latest
  weave:
    version: latest
```

Run the following command to create the installer:
```bash
replicated enterprise installer create --yaml-file custom-installer.yaml
ID
1bHJ3o4vEL7Mbwhm3bcug2HpkeY
```
