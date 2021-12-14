# Create an Installer through the API

An installer is the specification for a customized distribution of Kubernetes.
The minimum valid installer spec requires only a supported Kubernetes version:

```yaml
apiVersion: cluster.kurl.sh/v1beta1
kind: Installer
metadata:
  name: my-installer
spec:
  kubernetes:
    version: "1.15.3"
```

Retrieve the install script for that spec by POSTing it to `https://kurl.sh/installer`:
```bash
$ curl -X POST -H "Content-Type: text/yaml" --data-binary "@installer.yaml" https://kurl.sh/installer && echo ""
# https://kurl.sh/3138d30
```

The returned URL can be used to install a Kubernetes cluster:
```bash
curl https://kurl.sh/3138d30 | sudo bash
```

Refer to the [reference documentation](kubernetes-installers-advanced-options) for a full list of options available in the installer yaml.
