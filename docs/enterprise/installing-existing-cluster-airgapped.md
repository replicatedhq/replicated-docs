import PrereqsExistingCluster from "../partials/install/_prereqs-existing-cluster.mdx"
import AirGapBundle from "../partials/install/_airgap-bundle-prereq.mdx"
import LicenseFile from "../partials/install/_license-file-prereq.mdx"

# Air Gap Installation in Existing Clusters

This topic describes how to use Replicated to install an application in an air gap environment. Procedures are provided for installing using an existing Kubernetes cluster.

## About Private Registries

Air gapped networks must have a Docker image registry that is available inside the network. The app manager rewrites the application image names in all application manifests to read from the on-premises registry, and it re-tags and pushes the images to the on-premises registry. When authenticating to the registry, credentials with `push` permissions are required.

A single application expects to use a single namespace in the Docker image registry. The namespace name can be any valid URL-safe string, supplied at installation time. A registry typically expects the namespace to exist before any images can be pushed into it.

:::note
ECR does not use namespaces.
:::

## Prerequisites

Complete the following prerequisites:

<PrereqsExistingCluster/>

* Ensure that there is a compatible Docker image registry available inside the network. For more information about Docker registry compatibility, see [Private Registry Requirements](/enterprise/installing-general-requirements#private-registry-requirements).

<AirGapBundle/>

<LicenseFile/>

## Install the Application {#air-gap}

When installing an application with the Replicated app manager from a `.airgap` package, the container images and application manifests are provided by the application vendor in an archive that can be used to deliver the artifacts into the cluster.

This feature is only available for licenses that have the air gapped feature enabled.

You can install the admin console using the kots CLI plugin for the kubectl command-line tool. To install the admin console, you use the admin console binary bundle, `kotsadm.tar.gz`.

To install the application:

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

1. Log in to the admin console to provide the license file, define your configuration values, run preflight checks, and deploy. See [Deploying the Application using the Admin Console](installing-app-setup).


