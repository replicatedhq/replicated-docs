import AppInstallIntroAirGap from "../partials/install/_install-app-admin-console-intro-air-gap.mdx"
import IntroExisting from "../partials/install/_intro-existing.mdx"
import KotsAbout from "../partials/install/_kots-about.mdx"

import PrereqsExistingCluster from "../partials/install/_prereqs-existing-cluster.mdx"
import AirGapBundle from "../partials/install/_airgap-bundle-prereq.mdx"
import LicenseFile from "../partials/install/_license-file-prereq.mdx"

import InstallCommandPrompts from "../partials/install/_kots-install-prompts.mdx"
import ContinueToInstall from "../partials/install/_continue-to-install-step.mdx"
import InstallApp from "../partials/install/_install-app-admin-console.mdx"

# Air Gap Installation in Existing Clusters

<IntroExisting/>

The procedures in this topic apply to installation environments that do not have access to the internet.
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

* Download the `kotsadm.tar.gz` air gap bundle from the kots release page on GitHub. The `kotsadm.tar.gz` air gap bundle includes the container images for the Replicated admin console. See [Releases](https://github.com/replicatedhq/kots/releases) in the kots GitHub repository.

## Install the App Manager {#air-gap}

This procedure describes how to install the Replicated app manager in your existing cluster using the `kotsadm.tar.gz` air gap bundle.

<KotsAbout/>

To install the app manager:

1. Install the kots CLI plugin. See [Install without Root Access](/reference/kots-cli-getting-started#install-without-root-access) in the kots CLI reference section.

1. Run the following command to confirm that the kots CLI version matches the version of the `kotsadm.tar.gz` air gap bundle that you downloaded:

  ```shell
  kubectl kots version
  ```

1. Run the following command to extract container images from the `kotsadm.tar.gz` bundle and push the images to your private registry:

   ```shell
   kubectl kots admin-console push-images ./kotsadm.tar.gz REGISTRY_HOST \
     --registry-username RW_USERNAME \
     --registry-password RW_PASSWORD
   ```

    Replace:

    * `REGISTRY_HOST` with the hostname for the private registry. For example, `private.registry.host`.
    
    * `RW_USERNAME` with the username for an account that has read and write access to the private image registry.

    * `RW_PASSWORD` with the password for the account with read and write access.
    
    :::note
    Replicated does not store or reuse these credentials.
    :::

1. Run the following command to install the app manager using the images that you pushed in the previous step:

   ```shell
   kubectl kots install APP_NAME \
     --kotsadm-registry REGISTRY_HOST \
     --kotsadm-namespace REGISTRY_NAMESPACE \
     --registry-username RO-USERNAME \
     --registry-password RO-PASSWORD
   ```

   Replace:

   * `APP_NAME` with a name for the application. This is the unique name that the app manager will use to refer to the application that you install.
   
   * `REGISTRY_HOST` with the hostname for the private registry where you pushed the images. For example, `private.registry.host`.
   
   * `REGISTRY_NAMESPACE` with the namespace in the private registry where you pushed the images. For example, if you pushed the images to `my-registry.example.com/app-name/image:tag`, then `app-name` is the registry namespace.
   
   * `RO_USERNAME` with the username for an account that has read-only access to the private image registry.
   
   * `RO_PASSWORD` with the password for the read-only account.

   :::note
   Replicated stores these read-only credentials in a Kubernetes secret in the same namespace where the admin console is installed.

   Replicated uses these credentials to pull the images. To allow Replicated to pull images, the credentials are automatically created as an imagePullSecret on all of the admin console Pods.
   :::

1. <InstallCommandPrompts/>

1. <ContinueToInstall/>    

## Install and Deploy the Application {#install-app}    

<AppInstallIntroAirGap/>

<InstallApp/>