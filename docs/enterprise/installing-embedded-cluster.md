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
import AppInstallIntro from "../partials/install/_app-install-intro.mdx"
import ContinueToInstall from "../partials/install/_continue-to-install-step.mdx"

# Online Installation with the Kubernetes Installer

This topic describes how to use Replicated to install an application in an embedded cluster provisioned by the Replicated Kubernetes installer. The procedure explains how to install with and without high availability mode.

<KurlAbout/>

## About High Availability Mode

Online installations can use high availability (HA) mode with the Kubernetes installer.

<HaLoadBalancerAbout/>

## Prerequisites

Complete the following prerequisites:

<PrereqsEmbeddedCluster/>

<LicenseFile/>

<HaLoadBalancerPrereq/>

## Provision the Cluster {#provision-cluster}

This procedure describes how to provision a cluster with the Kubernetes installer and install the Replicated app manager in the cluster. The app manager deploys an admin console, which provides a user interface for installing and deploying the application.

To provision a cluster with the Kubernetes installer:

1. Run one of the following commands to create the cluster with the Kubernetes installer:

    * For a regular installation, run:

      ```bash
      curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash
      ```
    
    * For high availability mode:

      ```bash
      curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash -s ha
      ```
    
    Replace `APP_SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.

1. <HAStep/> 

1. <LoginPassword/>

<ContinueToInstall/>

## Install and Deploy the Application {#install-app} 

<AppInstallIntro/>

<AppInstall/>