import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"
import KotsCliInstall from "../partials/install/_kots-cli-install.mdx"
import AppInstall from "../partials/install/_app-setup-install.mdx"

# Installing with Automation

This topic describes using the kots CLI to automate installation in online and air gap environments.

## About Installing with Automation

You can automate application installation by creating an installation command with the Replicated kots CLI, then adding the command to an existing CI/CD workflow.

In an automated installation, you provide all the information required to install and deploy the application in the kots CLI `kots install` command, rather than through the Replicated admin console UI. After you install an application using automation with the kots CLI, you can optionally access the admin console by opening a port forward.

For more information about the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

## Prerequisites

Before you can use the kots CLI to automate installation, you must complete the following prerequisites:

* Create a ConfigValues manifest file to define the application's configuration values. The following is an example of a ConfigValues file:

  <ConfigValuesExample/>

  As shown in the example above, the ConfigValues file includes the names of the configuration fields for the application along with a user-supplied `value` for each field.

  :::note
  Your application vendor provides details about the required and optional configuration fields to include in the ConfigValues file.
  :::

* (Existing Clusters Only) To install in an existing cluster, complete the prerequisites for your environment: 
  * [Online Prerequisites](installing-existing-cluster#prerequisites)
  * [Air Gap Prerequisites](installing-existing-cluster-airgapped#prerequisites)

* (Kubernetes Installer Only) To install in a VM or bare metal server with the Replicated Kubernetes installer, complete the prerequisites for your environment: 
  * [Online Prerequisites](installing-embedded-cluster#prerequisites)
  * [Air Gap Prerequisites](installing-embedded-airgapped#prerequisites)

* (Kubernetes Installer Only) Before you can use the kots CLI to install an application in a Kubernetes installer cluster, you must first run the Kubernetes installer installation script to provision the cluster. See:
  * [Online Installation with the Kubernetes Installer](installing-embedded-cluster)
  * [Air Gap Installation with the Kubernetes Installer](installing-embedded-airgapped)  
## Installation Commands

This section provides the kots CLI `kots install` commands that you can use to automate installation.

### Online Existing Cluster

The following is the kots CLI command for installing an application in an existing cluster that has access to the internet:

```bash 
kubectl kots install APP_NAME \
  --license-file PATH_TO_LICENSE_FILE \
  --config-values PATH_TO_CONFIGVALUES_FILE \
  --namespace APP_NAMESPACE \
  --shared-password PASSWORD \
  --no-port-forward
```
Replace:


### Online Kubernetes Installer Cluster

The following is the kots CLI command for installing an application in a Kubernetes installer cluster that has access to the internet:

```bash
kubectl kots install APP_NAME \
  --license-file PATH_TO_LICENSE_FILE \
  --config-values PATH_TO_CONFIG_VALUES \
  --namespace ADMIN_CONSOLE_NAMESPACE \
  --shared-password PASSWORD \
  --no-port-forward
```

Replace:

<KotsCliInstall/>

### Air Gap Existing Cluster 

The following is the kots CLI command for installing an application in an existing cluster that does not have access to the internet:

```bash
kubectl kots install APP_NAME \
  --license-file PATH_TO_LICENSE_FILE \
  --config-values PATH_TO_CONFIGVALUES_FILE \
  --shared-password PASSWORD \
  --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
  --namespace NAMESPACE \
  --kotsadm-namespace ADMIN_CONSOLE_NAMESPACE \
  --kotsadm-registry PRIVATE_REGISTRY_HOST \
  --registry-username READ_WRITE_USERNAME \
  --registry-password READ_WRITE_PASSWORD \
  --no-port-forward
```

Replace:

* `APP_NAME` with a name for the application.

* `PATH_TO_LICENSE_FILE` with the path to the license file that you downloaded.

* `PATH_TO_CONFIG_VALUES` with the path to the ConfigValues manifest file. See [Prerequisites](#prerequisites) above.

* `PASSWORD` with a shared password for accessing the admin console.

* `PATH_TO_AIRGAP_BUNDLE` with the path in your local directory to the `.airgap` bundle for the application. The air gap bundle is provided by your application vendor.

* `NAMESPACE` with the namespace 

* `ADMIN_CONSOLE_NAMESPACE` 

* `PRIVATE_REGISTRY_HOST` with the hostname for the private image registry where you pushed the admin console images in the previous step.

* `READ_WRITE_USERNAME` and `READ_WRITE_PASSWORD` with credentials with read write permissions to the private image registry where you previously pushed the admin console images.

### Air Gap Kubernetes Installer Cluster

The following is the kots CLI command for installing an application in a Kubernetes installer cluster that does not have access to the internet:

```bash
kubectl kots install APP_NAME \
  --license-file PATH_TO_LICENSE_FILE \
  --config-values PATH_TO_CONFIG_VALUES \
  --namespace NAMESPACE \
  --shared-password PASSWORD \
  --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
  --no-port-forward
```

Replace:

* `APP_NAME` with a name for the application.

* `PATH_TO_LICENSE_FILE` with the path to the license file that you downloaded.

* `PATH_TO_CONFIG_VALUES` with the path to the ConfigValues manifest file.

* `NAMESPACE` with the namespace where the admin console is installed. **Default:** `default`

* `PASSWORD` with a shared password for accessing the admin console.

* `PATH_TO_AIRGAP_BUNDLE` with the path to the `.airgap` bundle that you downloaded.

## (Optional) Access the Admin Console

By default, the kots install command opens a port forward to the admin console. `--no-port-forward` is an optional flag that disables the default port forward. It is common to use the `--no-port-forward` flag for automated installations.

If you include `--no-port-forward`, you can run the following command after the installation command completes to access the admin console at `http://localhost:8800`:

```
kubectl kots admin-console --namespace NAMESPACE
```
Replace `NAMESPACE` with the namespace where the admin console was installed. **Default**: `default`.