# Using Automation to Install on an Existing Cluster

Starting with the Replicated app manager v1.15.0, it is possible to automate an application installation to an existing cluster in an online environment by providing a license file and the application configuration values when running `kots install`.

When these values are provided, they are written as ConfigMaps to the cluster, and the Replicated admin console finds these and processes them to complete the installation.

## Online Installation

### Provide a License File

Given a license file stored locally as `license.yaml`, you can run the following command to install the admin console to the `app-name` namespace:

```shell
kubectl kots install app-name \
  --license-file ./license.yaml \
  --shared-password <some value> \
  --namespace app-name
```

When starting, the admin console automatically installs the license file provided.

### Define Application Configuration Values

Many applications need configuration. You can supply the configuration values at installation time using the `--config-values` flag.

To do this, create a local YAML file that contains all of the configuration values.

For a template to start from, Replicated recommends that you use `kubectl kots download --decrypt-password-values` from an already running instance of the application.

When the app manager downloads the application from the cluster using this command, a file will be written to `upstream/userdata/config.yaml`.

This file will be:

```yaml
apiVersion: kots.io/v1beta1
kind: ConfigValues
...
```

All password type items will be decrypted and the value will be stored in `valuePlaintext`.
All non-password type config items will have their value stored in `value`.
When this file is uploaded, any `valuePlaintext` will be re-encrypted if the matching config item is a type password.

### Pass preflight checks

The app manager runs preflight checks (conformance tests) against the target namespace and cluster to ensure that the environment meets the minimum requirements to support the application.

![Preflight Checks](/images/preflight-checks.png)

#### Resolve strict preflight checks

When one or more strict preflight checks are present, the application deployment is blocked until these strict checks are run. Strict preflight checks must not contain failures and block the release from being deployed until the failures are resolved. Strict preflight checks help enforce that vendor-specific requirements are  met before the application can be deployed.

### Resolve role-based access control checks

When the installation uses [minimal role-based access control (RBAC)](../reference/custom-resource-application#requireminimalrbacprivileges), the app manager recognizes if the preflight checks failed due to insufficient privileges. When this occurs, a `kubectl preflight` command is displayed that you must run manually in the cluster to run the preflight checks. When the command runs and completes, the results are automatically uploaded to the app manager.

**Example:**

```bash
curl https://krew.sh/preflight | bash
kubectl preflight secret/<namespace>/kotsadm-<appslug>-preflight
```

### Disable admin console port-forwarding
The `kots install` kots CLI command by default opens a port-forward to the admin console as part of the application installation.

To disable this behavior, add the `--no-port-forward` flag to the install command.

You can later access the admin console with the following command:

```shell
kubectl kots admin-console -n <your app namespace>
```

## Example

Given the information above, and a config file named `configvalues.yaml`, a license file named `license.yaml`, you could use the following command to automate an application installation:

```shell
kubectl kots install app-name \
  --namespace app-name \
  --shared-password password \
  --license-file ./license.yaml \
  --config-values ./configvalues.yaml \
  --no-port-forward
```

After this has completed, you can go to http://localhost:8800 will show the configured application dashboard, assuming all required config items were set and any included preflight checks passed.

## Air Gap Installation

As the first step, admin console images must be pushed to a private registry using `kubectl kots admin-console push-images` command. For more information, see [Installing in an air gapped environment](installing-existing-cluster-airgapped/).

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
  --no-port-forward
```
