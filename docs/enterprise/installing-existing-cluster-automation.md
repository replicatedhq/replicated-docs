import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"
import PlaceholdersGlobal from "../partials/install/_placeholders-global.mdx"
import PlaceholderAirgapBundle from "../partials/install/_placeholder-airgap-bundle.mdx"
import PlaceholderNamespaceEmbedded from "../partials/install/_placeholder-namespace-embedded.mdx"
import PlaceholderNamespaceExisting from "../partials/install/_placeholder-namespace-existing.mdx"
import IntroExisting from "../partials/install/_automation-intro-existing.mdx"
import IntroEmbedded from "../partials/install/_automation-intro-embedded.mdx"

# Installing with Automation

This topic describes using the Replicated kots CLI to automate the installation of an application in online and air gap clusters.

## About Installing with Automation

You can automate the installation of an application in your existing cluster or in a cluster that you previously created with the Replicated Kubernetes installer. To automate installation, you create an installation command with the Replicated kots CLI `kots install` command.

In an automated installation, you provide all the information required to install and deploy the application with the `kots install` command, rather than providing this information in the Replicated admin console. For example, rather than uploading your license file for the application in the admin console UI, you provide your license file with the `kots install` command using the `--license-file` flag.

The flags that you use with the `kots install` command vary depending on the type of your cluster (existing cluster or Kubernetes installer cluster) and on the cluster's internet access (_online_ environment with internet access or _air gap_ environment without internet access).

For more information about the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

## Prerequisites

Before you install an application with the kots CLI, you must complete the following prerequisites:

* Create a ConfigValues manifest file to define your configuration preferences for the application. Ensure that you can access the ConfigValues file that you create from your installation environment.

  **Example:**

  <ConfigValuesExample/>

  As shown in the example above, the ConfigValues file includes the names of the configuration fields for the application along with a user-supplied `value` for each field.

  Your application vendor provides details about the required and optional configuration fields to include in the ConfigValues file.
  
* (Existing Clusters Only) Install the kots CLI. See [Installing the kots CLI](/reference/kots-cli-getting-started).

* (Existing Clusters Only) Complete the prerequisites for your environment: 
  * **Online**: See [Prerequisites](installing-existing-cluster#prerequisites) in _Online Existing Cluster Installation_.
  * **Air Gap**: See [Prerequisites](installing-existing-cluster-airgapped#prerequisites) in _Air Gap Existing Cluster Installation_. 

* (Kubernetes Installer Only) This topic assumes that you have already run the Kubernetes installer installation script in your VM or bare metal server to provision a cluster. After you have provisioned a cluster, you can then use the `kots install` command to install an application in the cluster.

  For information about how to provision a cluster with the Kubernetes installer, see the following:

    * **Online**: See [Prerequisites](installing-embedded-cluster#prerequisites) and [Provision the Cluster](installing-embedded-cluster#provision-cluster) in _Online Installation with the Kubernetes Installer_.
    * **Air Gap**: See [Prerequisites](installing-embedded-airgapped#prerequisites) and [Provision the Cluster](installing-embedded-airgapped#air-gap) in _Air Gap Installation with the Kubernetes Installer_.
   
## Installation Commands

This section provides the `kots install` commands that you can use to automate installation in an existing cluster or in a Kubernetes installer cluster. It includes commands for both online and air gap environments.

### Online Existing Cluster

<IntroExisting/>

The following is the kots CLI command for installing an application in an existing cluster that has access to the internet:

```bash 
kubectl kots install APP_NAME \
  --shared-password PASSWORD \
  --license-file PATH_TO_LICENSE \
  --config-values PATH_TO_CONFIGVALUES \
  --namespace NAMESPACE \
  --no-port-forward
```
Replace:

<PlaceholdersGlobal/>

<PlaceholderNamespaceExisting/>

### Online Kubernetes Installer Cluster

<IntroEmbedded/>

The following is the kots CLI command for installing an application in a Kubernetes installer cluster that has access to the internet:

```bash
kubectl kots install APP_NAME \
  --shared-password PASSWORD \
  --license-file PATH_TO_LICENSE \
  --config-values PATH_TO_CONFIGVALUES \
  --namespace default \
  --no-port-forward
```

Replace:

<PlaceholdersGlobal/>

### Air Gap Existing Cluster 

<IntroExisting/>

The following is the kots CLI command for installing an application in an existing cluster that does not have access to the internet:

```bash
kubectl kots install APP_NAME \
  --shared-password PASSWORD \
  --license-file PATH_TO_LICENSE \
  --config-values PATH_TO_CONFIGVALUES \
  --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
  --namespace NAMESPACE \
  --kotsadm-registry REGISTRY_HOST \
  --kotsadm-namespace REGISTRY_NAMESPACE \
  --registry-username READ_WRITE_USERNAME \
  --registry-password READ_WRITE_PASSWORD \
  --no-port-forward
```

Replace:

<PlaceholdersGlobal/>

<PlaceholderAirgapBundle/>

<PlaceholderNamespaceExisting/>

* `REGISTRY_HOST` with the hostname for the private registry where you pushed the images. For example, `private.registry.host`.

* `REGISTRY_NAMESPACE` with the namespace in the private registry where you pushed the images. For example, if you pushed the images to `my-registry.example.com/app-name/image:tag`, then `app-name` is the registry namespace.

* `READ_WRITE_USERNAME` and `READ_WRITE_PASSWORD` with credentials with read write permissions to the private registry where you pushed the images.

### Air Gap Kubernetes Installer Cluster

<IntroEmbedded/>

The following is the kots CLI command for installing an application in a Kubernetes installer cluster that does not have access to the internet:

```bash
kubectl kots install APP_NAME \
  --shared-password PASSWORD \
  --license-file PATH_TO_LICENSE \
  --config-values PATH_TO_CONFIGVALUES \
  --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
  --namespace default \
  --no-port-forward
```

Replace:

<PlaceholdersGlobal/>

<PlaceholderAirgapBundle/>

## (Optional) Access the Admin Console

When you install an application in an existing cluster or when you provision a cluster with the Kubernetes installer, you also install the Replicated app manager in the cluster. The app manager deploys the Replicated admin console. The admin console is a user interface where you can manage and upgrade your application instances.

By default, during installation, the app manager automatically opens localhost port 8800 to provide access to the admin console UI. The `--no-port-forward` flag in the `kots install` command prevents the app manager from creating a port forward to the admin console.

After you install with the `--no-port-forward` flag, you can optionally create a port forward so that you can log in to the admin console in a browser window.

To access the admin console:

1. If you installed in a VM where you cannot open a browser window, forward a port on your local machine to `localhost:8800` on the remote VM using the SSH client:

  ```bash
  ssh -L LOCAL_PORT:localhost:8800 USERNAME@IP_ADDRESS
  ```
  Replace:
   * `LOCAL_PORT` with the port on your local machine to forward. For example, `9900` or `8800`.
   * `USERNAME` with your username for the VM.
   * `IP_ADDRESS` with the IP address for the VM.

  **Example**:

  The following example shows using the SSH client to forward port 8800 on your local machine to `localhost:8800` on the remote VM.
  
  ```bash
  ssh -L 8800:localhost:8800 user@ip-addr
  ```

1. Run the following kots CLI command to open localhost port 8800, which forwards to the admin console service:

  ```bash
  kubectl kots admin-console --namespace NAMESPACE
  ```
  Replace `NAMESPACE` with the namespace where the admin console was installed.

  For more information about the `kots admin-console` command, see [admin-console](/reference/kots-cli-admin-console-index) in the _kots CLI_ documentation.

1. Open a browser window and go to `https://localhost:8800`.

1. Log in to the admin console using the password that you created as part of the `kots install` command.