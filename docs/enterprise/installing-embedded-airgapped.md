import KurlAbout from "../partials/install/_kurl-about.mdx"
import HaLoadBalancerAbout from "../partials/install/_ha-load-balancer-about.mdx"
import ProvisionClusterIntro from "../partials/install/_provision-cluster-intro.mdx"
import AppInstallIntroAirGap from "../partials/install/_install-app-admin-console-intro-air-gap.mdx"
import IntroEmbedded from "../partials/install/_intro-embedded.mdx"
import IntroAirGap from "../partials/install/_intro-air-gap.mdx"
import KotsAbout from "../partials/install/_kots-about.mdx"

import PrereqsEmbeddedCluster from "../partials/install/_prereqs-embedded-cluster.mdx"
import HaLoadBalancerPrereq from "../partials/install/_ha-load-balancer-prereq.mdx"
import AirGapBundle from "../partials/install/_airgap-bundle-prereq.mdx"
import LicenseFile from "../partials/install/_license-file-prereq.mdx"

import HAStep from "../partials/install/_embedded-ha-step.mdx"
import LoginPassword from "../partials/install/_embedded-login-password.mdx"
import ContinueToInstall from "../partials/install/_continue-to-install-step.mdx"
import InstallApp from "../partials/install/_install-app-admin-console.mdx"

# Air Gap Installation with kURL

<IntroEmbedded/>

<IntroAirGap/>

<KurlAbout/>

## About High Availability Mode

Air gap installations can use high availability (HA) mode with the kURL installer.

<HaLoadBalancerAbout/>

## Prerequisites

Complete the following prerequisites:

<PrereqsEmbeddedCluster/>

<AirGapBundle/>

<LicenseFile/>

* Download the `.tar.gz` air gap bundle for the kURL installer provided by your software vendor. Ensure that you can access the downloaded bundle from the environment where you will install the application.

<HaLoadBalancerPrereq/>

## Provision the Embedded Cluster {#air-gap}

<ProvisionClusterIntro/>

<KotsAbout/>

To provision an embedded cluster:

1. Extract the contents of the kURL `.tar.gz` bundle that you downloaded:

   ```bash
   tar -xvzf FILENAME.tar.gz
   ```

1. Run one of the following commands to create the cluster and install KOTS in air gap mode: 

    - For a regular installation, run:

      ```bash
      cat install.sh | sudo bash -s airgap
      ```

    - For high availability, run:

      ```bash
      cat install.sh | sudo bash -s airgap ha
      ```

1. <HAStep/>

1. <LoginPassword/>

1. <ContinueToInstall/>

## Install and Deploy the Application {#install-app} 

<AppInstallIntroAirGap/>
  
<InstallApp/>