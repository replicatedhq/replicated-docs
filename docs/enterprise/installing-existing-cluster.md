import AppInstallIntroOnline from "../partials/install/_install-app-admin-console-intro-online.mdx"
import IntroExisting from "../partials/install/_intro-existing.mdx"
import KotsAbout from "../partials/install/_kots-about.mdx"

import PrereqsExistingCluster from "../partials/install/_prereqs-existing-cluster.mdx"
import AirGapBundle from "../partials/install/_airgap-bundle-prereq.mdx"
import LicenseFile from "../partials/install/_license-file-prereq.mdx"

import InstallCommandPrompts from "../partials/install/_kots-install-prompts.mdx"
import ContinueToInstall from "../partials/install/_continue-to-install-step.mdx"
import InstallApp from "../partials/install/_install-app-admin-console.mdx"
import AppNameUI from "../partials/install/_placeholder-app-name-UI.mdx"

# Online Installation in Existing Clusters

<IntroExisting/>

## Prerequisites

Complete the following prerequisites:

<PrereqsExistingCluster/> 
<LicenseFile/>

## Install KOTS {#online}

This procedure describes how to install KOTS in your existing cluster.

<KotsAbout/>

To install KOTS:

1. Run one of these commands to install the Replicated kots CLI and KOTS. As part of the command, you also specify a name and version for the application that you will install as part of the [Install and Deploy the Application](#install-app) procedure that follows.

    * **For the latest application version**:
    
      ```shell
      curl https://kots.io/install | bash
      kubectl kots install APP_NAME
      ``` 
    * **For a specific application version**:

      ```shell
      curl https://kots.io/install | bash
      kubectl kots install APP_NAME --app-version-label=VERSION_LABEL
      ```

    Replace, where applicable:
    
    <AppNameUI/>
  
    * `VERSION_LABEL` with the label for the version of the application to install. For example, `--app-version-label=3.0.1`.  

    **Examples:**

    ```shell
    curl https://kots.io/install | bash
    kubectl kots install application-name
    ``` 

    ```shell
    curl https://kots.io/install | bash
    kubectl kots install application-name --app-version-label=3.0.1
    ``` 

1. <InstallCommandPrompts/>

1. <ContinueToInstall/>

## Install and Deploy the Application {#install-app} 

<AppInstallIntroOnline/>

<InstallApp/>