import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"
import KotsCliInstall from "../partials/install/_kots-cli-install.mdx"

# Installing with Automation

This topic describes using the kots CLI to automate installation in online and air gap environments.

## About Using Automation to Install

You can automate application installation by creating an installation command with the Replicated kots CLI, then adding the command to an existing CI/CD workflow.

In an automated installation, you provide all the information required to install and deploy the application in the kots CLI `kots install` command, rather than through the Replicated admin console UI.

For more information about the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

## Prerequisites

Complete the following prerequisites:

* Create a ConfigValues manifest file to define the application's configuration values. The following is an example of a ConfigValues file:

  <ConfigValuesExample/>

  As shown in the example above, the ConfigValues file includes the names of the configuration fields for the application along with a user-supplied `value` for each field.

  :::note
  Your application vendor provides details about the required and optional configuration fields to include in the ConfigValues file.
  :::

* (Existing Clusters Only) To automate installation in an existing cluster, complete the following prerequisites: 
  * [Online Prerequisites](installing-existing-cluster#prerequisites)
  * [Air Gap Prerequisites](installing-existing-cluster-airgapped#prerequisites)

* (Kubernetes Installer Only) To automate installation in a VM or bare metal server, complete the following prerequisites: 
## Installation Command

To install an application with the kots CLI in an online environment, run the following command:

```
kubectl kots install APP_NAME \
--namespace APP_NAMESPACE \
--shared-password PASSWORD \
--license-file PATH_TO_LICENSE_FILE \
--config-values PATH_TO_CONFIGVALUES_FILE \
--airgap-bundle PATH_TO_AIRGAP_BUNDLE \
--kotsadm-namespace ADMIN_CONSOLE_NAMESPACE \
--kotsadm-registry PRIVATE_REGISTRY_HOST \
--registry-username READ_WRITE_USERNAME \
--registry-password READ_WRITE_PASSWORD
```

Replace:

<KotsCliInstall/>

* (Air Gap Only) `PATH_TO_AIRGAP_BUNDLE` with the path in your local directory to the `.airgap` bundle for the application. The air gap bundle is provided by your application vendor.

* (Air Gap Only) `ADMIN_CONSOLE_NAMESPACE` with the namespace where you want the admin console to be installed.

* (Air Gap Only) `PRIVATE_REGISTRY_HOST` with the hostname for the private image registry where you pushed the admin console images in the previous step.

* (Air Gap Only) `READ_WRITE_USERNAME` and `READ_WRITE_PASSWORD` with credentials with read write permissions to the private image registry where you pushed the admin console images in the previous step.