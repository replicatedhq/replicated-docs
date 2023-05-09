import PrereqsExistingCluster from "../partials/install/_prereqs-existing-cluster.mdx"
import LicenseFile from "../partials/install/_license-file-prereq.mdx"
import AppInstall from "../partials/install/_app-setup-install.mdx"
import AppInstallIntro from "../partials/install/_app-install-intro.mdx"
import KotsInstallPrompts from "../partials/install/_kots-install-prompts.mdx"

# Online Installation in Existing Clusters

This topic describes how to use Replicated to install an application in an existing Kubernetes cluster in an online environment.

## Prerequisites

Complete the following prerequisites:

<PrereqsExistingCluster/> 
<LicenseFile/>

## Install the App Manager {#online}

This procedure describes how to install the Replicated app manager in your existing cluster. The app manager deploys an admin console, which provides a user interface for installing and deploying the application.

To install the app manager:

1. Run the following command to install the kots CLI and the app manager:

  ```shell
  curl https://kots.io/install | bash
  kubectl kots install APP_NAME
  ``` 
  Replace `APP_NAME` with the unique slug for the application. The application slug is included in the installation command provided by your application vendor.

  **Example:**

  ```shell
  curl https://kots.io/install | bash
  kubectl kots install application-name
  ``` 

1. <KotsInstallPrompts/>

Continue to [Install and Deploy the Application](#install-app) below to log in to the admin console and install the application.

## Install and Deploy the Application

<AppInstallIntro/>

<AppInstall/>