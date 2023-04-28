import KurlAbout from "../partials/install/_kurl-about.mdx"
import PrereqsEmbeddedCluster from "../partials/install/_prereqs-embedded-cluster.mdx"
import HaLoadBalancerAbout from "../partials/install/_ha-load-balancer-about.mdx"
import HaLoadBalancerPrereq from "../partials/install/_ha-load-balancer-prereq.mdx"
import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"

# Using Automation to Install with the Kubernetes Installer

This topic describes how to use the the Kubernetes and the kots CLI to automate installation in an online or air gap environment.

## About Automating Installation

Automating an install means that you run a single CLI command to provision the cluster with the Kubernetes installer, install the Replicated app manager, and then install and deploy the application. This allows you to 

## About High Availability Mode

Online installations can use high availability (HA) mode with the Kubernetes installer.

<HaLoadBalancerAbout/>

## Prerequisites

Complete the following prerequisites:

<PrereqsEmbeddedCluster/>

<HaLoadBalancerPrereq/>

* You supply application configuration values by defining the values in a local ConfigValues YAML file. Then, you provide the file to the app manager when you run the `kots install` command using the `--config-values` flag.

    The following is an example of a ConfigValues file:

    <ConfigValuesExample/>

    As shown in the example above, the ConfigValues file includes the names of the configuration fields for the application, along with a user-supplied value for each field.

    Your application vendor provides details about the required and optional configuration fields to include in the ConfigValues file. For more information, see [Downloading the ConfigValues File](/vendor/releases-configvalues).

## Automate Online Installations

1. Create the installation command. The command install the app manager and then uses the license file, config values, namespace, and shared install and deploy the application. For more information about the `kots install` command, see [install](/reference/kots-cli-install) in the kots CLI documentation.

      ```
        kubectl kots install APP_NAME \
        --license-file PATH_TO_LICENSE_FILE \
        --config-values PATH_TO_CONFIG_VALUES \
        <!-- --namespace ADMIN_CONSOLE_NAMESPACE \ -->
        --shared-password PASSWORD
        --no-port-forward
      ```

      Replace:
        * `APP_NAME` with the name for the application.
        * `PATH_TO_LICENSE_FILE` with the path to the license file.
        * `PATH_TO_CONFIG_VALUES` with the path to the ConfigValues manifest file.
        * `ADMIN_CONSOLE_NAMESPACE` with the namespace where the admin console will be installed. **Default:** `default`
        * `PASSWORD` with a shared password.

1. Optional 

## Automate Air Gap Installations