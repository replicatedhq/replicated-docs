import KurlAbout from "../partials/install/_kurl-about.mdx"
import PrereqsEmbeddedCluster from "../partials/install/_prereqs-embedded-cluster.mdx"
import HaLoadBalancerAbout from "../partials/install/_ha-load-balancer-about.mdx"
import HaLoadBalancerPrereq from "../partials/install/_ha-load-balancer-prereq.mdx"
import HAStep from "../partials/install/_embedded-ha-step.mdx"
import LoginPassword from "../partials/install/_embedded-login-password.mdx"
import InstallApp from "../partials/install/_embedded-admin-console-step.mdx"
import AirGapBundle from "../partials/install/_airgap-bundle-prereq.mdx"
import LicenseFile from "../partials/install/_license-file-prereq.mdx"
import AppInstall from "../partials/install/_app-setup-install.mdx"
import ContinueToInstall from "../partials/install/_continue-to-install-step.mdx"

# Air Gap Installation with the Kubernetes Installer

This topic describes how to use Replicated to install an application in an air gap environment, using the Replicated Kubernetes installer to provision an embedded cluster on a virtual machine or on bare metal. The procedure explains how to install with and without high availability mode.

<KurlAbout/>

## About High Availability Mode

Air gap installations can use high availability (HA) mode with the Kubernetes installer.

<HaLoadBalancerAbout/>

## Prerequisites

Complete the following prerequisites:

<PrereqsEmbeddedCluster/>

<AirGapBundle/>

<LicenseFile/>

<HaLoadBalancerPrereq/>

## Provision the Cluster {#air-gap}

This procedure describes how to provision a cluster with the Kubernetes installer and install the Replicated app manager in the cluster. The app manager deploys an admin console, which provides a user interface for installing and deploying the application.

To install the application:

1. In your installation environment, run the following command to download the `.tar.gz` air gap bundle for the Kubernetes installer:

   ```bash
   curl -LO https://k8s.kurl.sh/bundle/FILENAME.tar.gz
   ```

   Replace `FILENAME` with the name of the `.tar.gz` bundle provided by your application vendor. For example, `curl -LO https://k8s.kurl.sh/bundle/my-app.tar.gz`.

1. Extract the contents of the bundle that you downloaded:

   ```bash
   tar -xvzf FILENAME.tar.gz
   ```

1. Run one of the following commands to create the cluster with the Kubernetes installer and install the app manager in air gap mode: 

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

<ContinueToInstall/>  

## Install and Deploy the Application {#install-app} 

Log in to the admin console to provide the license file and `.airgap` bundle, define your configuration values, run preflight checks, and deploy.
  
<AppInstall/>