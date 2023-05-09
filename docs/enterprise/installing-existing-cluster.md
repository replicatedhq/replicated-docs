import AppInstallIntroOnline from "../partials/install/_install-app-admin-console-intro-online.mdx"
import IntroExisting from "../partials/install/_intro-existing.mdx"

import PrereqsExistingCluster from "../partials/install/_prereqs-existing-cluster.mdx"
import AirGapBundle from "../partials/install/_airgap-bundle-prereq.mdx"
import LicenseFile from "../partials/install/_license-file-prereq.mdx"

import InstallCommandPrompts from "../partials/install/_kots-install-prompts.mdx"
import ContinueToInstall from "../partials/install/_continue-to-install-step.mdx"
import InstallApp from "../partials/install/_install-app-admin-console.mdx"

# Online Installation in Existing Clusters

<IntroExisting/>

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

1. <InstallCommandPrompts/>

1. <ContinueToInstall/>

## Install and Deploy the Application {#install-app} 

<AppInstallIntroOnline/>

<InstallApp/>