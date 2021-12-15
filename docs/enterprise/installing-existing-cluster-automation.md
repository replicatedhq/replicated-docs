# Using automation to install on an existing cluster

Starting with KOTS 1.15.0, it's possible to automate a KOTS installation to an existing cluster (non-airgap) by providing a license file and the application configuration values when running `kots install`.
When these values are provided, they are written as ConfigMaps to the cluster, and the Admin Console will find these and process them to complete the installation.

### License File

Given a license file stored locally as `license.yaml`, running:

```shell
kubectl kots install app-name \
  --license-file ./license.yaml \
  --shared-password <some value> \
  --namespace app-name
```

Will install the Admin Console to the `app-name` namespace, and when starting, the Admin Console will automatically install the license file provided.

### Config Values

Many applications need configuration. It's possible to also supply the config values at installation time using the `--config-values` flag.
To do this, create a local YAML file that contains all of the config values.
The easist way to get a template to start from is to use `kubectl kots download --decrypt-password-values` from an already running instance of the application.
When KOTS downloads the application from the cluster using this command, a file will be written to `upstream/userdata/config.yaml`.
This file will be:

```yaml
apiVersion: kots.io/v1beta1
kind: ConfigValues
...
```

All password type items will be decrypted and the value will be stored in `valuePlaintext`.
All non-password type config items will have their value stored in `value`.
When this file is uploaded, any `valuePlaintext` will be re-encrypted if the matching config item is a type password.

### Disable Admin Console port-forwarding
`kots install` by default will open up a port-forward to the Admin Console as part of the installation. To disable this behavior add the following flag to the install command:

```shell
--port-forward=false
```

You can later access the Admin Console with the following command:

```shell
kubectl kots admin-console -n <your app namespace>
```

## Example

Given the information above, and a config file named `configvalues.yaml`, a license file named `license.yaml`, the following command might be used to automate the installation of an application:

```shell
kubectl kots install app-name \
  --namespace app-name \
  --shared-password password \
  --license-file ./license.yaml \
  --config-values ./configvalues.yaml \
  --port-forward=false
```

Once this has completed, visiting http://localhost:8800 will show the configured application dashboard, assuming all required config items were set and any included preflight checks passed.

## Airgap Install

As the first step, Admin Console images must be pushed to a private registry using `kubectl kots admin-console push-images` command as described in [this](/kotsadm/installing/airgap-packages/#kots-install) document.

```shell
kubectl kots install app-name \
  --namespace app-name \
  --shared-password password \
  --license-file ./license.yaml \
  --config-values ./configvalues.yaml \
  --airgap-bundle /path/to/application.airgap \
  --kotsadm-registry private.registry.host \
  --kotsadm-namespace app-name \
  --registry-username rw-username \
  --registry-password rw-password \
  --port-forward=false
```
