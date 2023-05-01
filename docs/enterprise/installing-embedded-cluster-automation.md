import KurlAbout from "../partials/install/_kurl-about.mdx"
import PrereqsEmbeddedCluster from "../partials/install/_prereqs-embedded-cluster.mdx"
import HaLoadBalancerAbout from "../partials/install/_ha-load-balancer-about.mdx"
import HaLoadBalancerPrereq from "../partials/install/_ha-load-balancer-prereq.mdx"
import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"
import PrereqsConfigValues from "../partials/install/_prereqs-configvalues.mdx"
import PortForwardStep from "../partials/install/_port-forward-step.mdx"

# Using Automation to Install with the Kubernetes Installer

This topic describes how to use the Replicated Kubernetes installer and the kots CLI to automate installation in an online or air gap environment.

## About Automating Installation

Automating an install means that you run a single CLI command to provision the cluster with the Kubernetes installer, install the Replicated app manager, and then install and deploy the application.

## Prerequisites

Complete the following prerequisites:

<PrereqsEmbeddedCluster/>

<HaLoadBalancerPrereq/>

* <PrereqsConfigValues/>

    The following is an example of a ConfigValues file:

    <ConfigValuesExample/>

    As shown in the example above, the ConfigValues file includes the names of the configuration fields for the application, along with a user-supplied value for each field.

    Your application vendor provides details about the required and optional configuration fields to include in the ConfigValues file. For more information, see [Downloading the ConfigValues File](/vendor/releases-configvalues).

## Automate Online Installations

1. Create the cluster with the Kubernetes installer and install the Replicated app manager in the cluster:

   ```
   curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash
   ```

1. Construct the installation script to install the application in the `default` namespace where the admin console was installed:

    ```
    kubectl kots install APP_NAME \
    --license-file PATH_TO_LICENSE_FILE \
    --config-values PATH_TO_CONFIG_VALUES \
    --namespace default \
    --shared-password PASSWORD
    ```

    Replace:
    * `APP_NAME` with the name for the application.
    * `PATH_TO_LICENSE_FILE` with the path to the license file.
    * `PATH_TO_CONFIG_VALUES` with the path to the ConfigValues manifest file.
    * `PASSWORD` with a shared password for accessing the Replicated admin console.

    For more information about the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

1. Add this script to your existing CI/CD workflow.

1. <PortForwardStep/>

## Automate Air Gap Installations