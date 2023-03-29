import ImageRegistryAirgap from "../partials/image-registry/_image-registry-airgap.mdx"
import KurlAbout from "../partials/install/_kurl-about.mdx"

# Installing in Air Gap Clusters

This topic describes how to use Replicated to install an application in an air gap environment. Procedures are provided for installing using an existing Kubernetes cluster or a cluster provisioned by the Replicated Kubernetes installer.

<KurlAbout/>

## Existing Air Gap Clusters

### Prerequisites

Complete the following tasks before installing in an existing air gap cluster:

* Ensure that your cluster meets the minimum system requirements. See [Minimum System Requirements](/enterprise/installing-general-requirements#minimum-system-requirements) in _Installation Requirements_.
* Ensure that you have at least the minimum RBAC permissions in the cluster required to install the app manager. See [RBAC Requirements](/enterprise/installing-general-requirements#rbac-requirements) in _Installation Requirements_.

  :::note
  If you manually created RBAC resources for the app manager as described in [Namespace-scoped RBAC Requirements](/enterprise/installing-general-requirements#namespace-scoped), include both the `--ensure-rbac=false` and `--skip-rbac-check` flags when you run the `kots install` command.
  
  These flags prevent the app manager from checking for or attempting to create a Role with `* * *` permissions in the namespace. For more information about these flags, see [install](/reference/kots-cli-install) or [admin-console upgrade](/reference/kots-cli-admin-console-upgrade).
  :::
* Replicated recommends that you review the options available with the `kots install` command before installing. The `kots install` command includes several optional flags to support different installation use cases. For a list of options, see [install](/reference/kots-cli-install) in the _kots CLI_ documentation. 

- <ImageRegistryAirgap/>

### Install in an Existing Cluster {#air-gap}

When installing an application with the Replicated app manager from a `.airgap` package, the container images and application manifests are provided by the application vendor in an archive that can be used to deliver the artifacts into the cluster.

This feature is only available for licenses that have the air gapped feature enabled.

You can install the admin console using the kots CLI plugin for the kubectl command-line tool. To install the admin console, you use the admin console binary bundle, `kotsadm.tar.gz`.

To push images and install:

1. Install the kots CLI plugin. See [Install without Root Access](/reference/kots-cli-getting-started#install-without-root-access) in the kots CLI reference section.

1. Download `kotsadm.tar.gz` from the kots release page on GitHub. See [Releases](https://github.com/replicatedhq/kots/releases) in the kots GitHub repository.

1. Run the following command to confirm that the asset version matches the kots CLI version:

  ```shell
  kubectl kots version
  ```

1. Run the following command to extract admin console container images and push them into a private registry:

   ```shell
   kubectl kots admin-console push-images ./kotsadm.tar.gz private.registry.host/app-name \
     --registry-username RW_USERNAME \
     --registry-password RW_PASSWORD
   ```

   Replace:

   * `RW_USERNAME` with the username for an account that has read and write access to the private image registry.

   * `RW_PASSWORD` with the password for the account with read and write access.
   :::note
   Replicated does not store or reuse these credentials.
   :::

1. Install the admin console using the images that you pushed in the previous step:

   ```shell
   kubectl kots install app-name \
     --kotsadm-namespace app-name \
     --kotsadm-registry private.registry.host \
     --registry-username RO-USERNAME \
     --registry-password RO-PASSWORD
   ```

   Replace:

   * `RO_USERNAME` with the username for an account that has read-only access to the private image registry.

   * `RO_PASSWORD` with the password for the read-only account.

   :::note
   Replicated stores these read-only credentials in a Kubernetes secret in the same namespace where the admin console is installed.

   Replicated uses these credentials to pull the images. To allow Replicated to pull images, the credentials are automatically created as an imagePullSecret on all of the admin console Pods.
   :::

1. When prompted by the `kots install` command:
   1. Provide the namespace where you want to deploy the application and the admin console.
   1. Create a new password for logging in to the admin console.

     **Example**:

     ```shell
     $ kubectl kots install application-name
     Enter the namespace to deploy to: application-name
       • Deploying Admin Console
         • Creating namespace ✓
         • Waiting for datastore to be ready ✓
     Enter a new password to be used for the Admin Console: ••••••••
       • Waiting for Admin Console to be ready ✓

       • Press Ctrl+C to exit
       • Go to http://localhost:8800 to access the Admin Console

     ```   

After the `kots install` command installs the admin console and the application on the cluster, it creates a port forward to the admin console. The admin console is exposed internally on the cluster and can only be accessed using a port forward.

Log in to the admin console to complete the application setup, run preflight checks, and deploy. See [Completing Application Setup and Deploying](installing-app-setup).


## Kubernetes Installer Air Gap Clusters

The Replicated Kubernetes installer can provision a cluster and deploy the application on a virtual machine (VM) in an air gap environment. This type of cluster is known as the Kubernetes installer cluster or embedded cluster.

### Prerequisites

Complete the following before before installing on an air gap VM using the Kubernetes installer:

- Meet the system requirements. See [Kubernetes Installer Cluster Requirements](installing-general-requirements#embedded-cluster-requirements) in _Installation Requirements_.

- If you are installing in high availability mode:
  - (Optional) If you are going to use the internal load balancer, you can preconfigure it by passing `| sudo bash -s ha ekco-enable-internal-load-balancer`.
  - For an external load balancer, ensure that your load balancer is:
    - A TCP forwarding external load balancer.
    - Configured to distribute traffic to all healthy control plane nodes in its target list.
    - (Optional) Preconfigured by passing the `load-balancer-address=HOST:PORT` flag.
    
- <ImageRegistryAirgap/>

### Install on a VM {#air-gap}

To install an application on a virtual machine (VM) in an air gapped environment:

1. Run the following commands:

    ```bash
    curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
    tar -xvzf FILENAME.tar.gz
    cat install.sh | sudo bash -s airgap
    ```

    Replace `FILENAME` with the name of the kURL air gap `.tar.gz` file.

    After the installation command finishes, note the `Kotsadm` and `Login with password (will not be shown again)` fields in the output of the installation command. You can use these in the next step to log in to the admin console and install the application.

    :::note
    You can construct the URL for the air gap bundle by prefixing the URL path for online installations with `/bundle` and adding `.tar.gz` to the end. For more information, see [Install in an Online Environment](#online).
    :::

  1. Install the application using one of the following methods:

      - **Admin console:** Use the `kotsadm` and password from the previous step to log into the admin console. For information about using the admin console, see [Completing Application Setup and Deploying](installing-app-setup).

      - **kots CLI:**

          1. Install the kots CLI. See [Install without Root Access](/reference/kots-cli-getting-started#install-without-root-access) in the _Installing the kots CLI_ reference section.
          1. Use the following command to install the application `.airgap` bundle. For more information about the `kots install` command, see [install](../reference/kots-cli-install) in the kots CLI documentation.

              ```
                kubectl kots install APP_NAME \
                --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
                --license-file PATH_TO_LICENSE_FILE \
                  --config-values PATH_TO_CONFIG_VALUES \
                  --namespace default \
                  --shared-password PASSWORD
              ```

              Replace:
              * `APP_NAME` with the name for the application.
              * `PATH_TO_AIRGAP_BUNDLE` with the path to the `.airgap` bundle file.
              * `PATH_TO_LICENSE_FILE` with the path to the license file.
              * `PATH_TO_CONFIG_VALUES` with the path to the ConfigValues manifest file.
              * `PASSWORD` with a shared password.

### Install with High Availability Mode

Air gap installations can be installed in high availability (HA) mode with the Kubernetes installer.

A load balancer is required for high availability mode. If your vendor has chosen to use the internal load balancer with the EKCO add-on, you do not need to provide your own external load balancer. An external load balancer can be preferred when clients outside the cluster need access to the cluster's Kubernetes API.

If you decide to use an external load balancer, the external load balancer must be a TCP forwarding load balancer. For more information, see [Prerequisites](#prerequisites).

The health check for an apiserver is a TCP check on the port that the kube-apiserver listens on. The default value is `:6443`. For more information about the kube-apiserver external load balancer, see [Create load balancer for kube-apiserver](https://kubernetes.io/docs/setup/independent/high-availability/#create-load-balancer-for-kube-apiserver) in the Kubernetes documentation.

To install with high availability in an air gapped environment:

1. Run the following commands:

  ```bash
  curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
  tar xvzf FILENAME.tar.gz
  cat install.sh | sudo bash -s airgap ha
  ```

  Replace `FILENAME` with the name of the kURL air gap `.tar.gz` file.

  After the installation command finishes, note the `Kotsadm` and `Login with password (will not be shown again)` fields in the output of the installation command. You can use these in a later step to log in to the admin console and install the application.

  :::note
  You can construct the URL for the air gap bundle by prefixing the URL path for online installations with `/bundle` and adding `.tar.gz` to the end. For more information, see [Install in an Online Environment](#online).
  :::

1. If you did not preconfigure a load balancer, you are prompted during the installation. Do one of the following:

    - If you are using the internal load balancer, leave the prompt blank and proceed with the installation.

    - If you are using an external load balancer, pass the load balancer address.

1. Install the application using one of the following methods:

    - **Admin console:** Use the `kotsadm` and password from the previous step to log into the admin console. For information about using the admin console, see [Completing Application Setup and Deploying](installing-app-setup).

    - **kots CLI:** Use the following command to install the application `.airgap` bundle. For more information about the `kots install` command, see [install](../reference/kots-cli-install) in the kots CLI documentation.

      ```
        kubectl kots install APP_NAME \
        --airgap-bundle PATH_TO_AIRGAP_BUNDLE \
        --license-file PATH_TO_LICENSE_FILE \
          --config-values PATH_TO_CONFIG_VALUES \
          --namespace default \
          --shared-password PASSWORD
      ```
      Replace:
      * `APP_NAME` with the name for the application.
      * `PATH_TO_AIRGAP_BUNDLE` with the path to the `.airgap` bundle file.
      * `PATH_TO_LICENSE_FILE` with the path to the license file.
      * `PATH_TO_CONFIG_VALUES` with the path to the ConfigValues manifest file.
      * `PASSWORD` with a shared password.
