# Using an SDK-Enabled Chart for KOTS Installations

This topic provides information about how to use Helm charts that include the Replicated SDK to support installations with Replicated KOTS. For more information about the SDK, see [About the Replicated SDK](replicated-sdk-overview).

## Overview

Distributing your application as one or more Helm charts is recommended because you can use the same Helm charts to support installations with both KOTS and with the Helm CLI.

If you include the Replicated SDK as a dependency in a Helm chart that you want to use for both KOTS and Helm CLI installations, then you must add a conditional value to exclude the SDK when the chart is installed by KOTS. Excluding the SDK for KOTS installations prevents duplication of instance data in the vendor portal and related APIs, which can be caused when both KOTS and the SDK are reporting data for an instance.

## Limitation

When the SDK is excluded from KOTS installations, the SDK API endpoints are not available. For example, you cannot use the `app` endpoints to allow your users to check for updates when the SDK is excluded. And, you cannot use the `license` endpoints to check customer entitlements during runtime.

However, KOTS also provides access to this functionality that is available through the SDK API. For example, users can check for updates through the admin console, and vendors can check license entitlements at runtime using the admin console API. If you use any SDK API endpoints in your application, Replicated recommends that you verify that the comparable functionality available through KOTS provides the expected user experience.

## Exclude the SDK from KOTS Installations

To conditionally exclude the SDK from KOTS installations, do the following for each Helm chart that includes the SDK as a dependency:

1. In the `Chart.yaml`, add a `condition` field to the `dependencies` entry for the SDK to allow the SDK to be conditionally included or excluded when a value is true or false.

   **Example:**

   ```yaml
   # Chart.yaml file

   dependencies:
   - name: replicated-sdk
     repository: oci://registry.replicated.com/library
     version: .0.1-beta.1
     condition: replicated.enabled
   ```

   For more information about adding conditions to dependencies, see [Conditions and Tags](https://helm.sh/docs/chart_best_practices/dependencies/#conditions-and-tags) in the Helm documentation.

1. Add a value to the `values.yaml` file to include the SDK by default. Ensure that the field name you use matches what you added to the `condition` field in the previous step. 

   **Example:**

    ```yaml
    # Helm chart values.yaml
    
    replicated:
      # Set `enabled: true` to include the SDK by default
      enabled: true
    ```

1. In the HelmChart custom resource that KOTS uses to install the chart, include a value with the same name to disable the SDK for KOTS installations:

   **Example:**

    ```yaml
    # KOTS HelmChart custom resource

    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: my-app
    spec:
      chart:
        name: my-app
        chartVersion: v1.0.1
      values:
        # Add a value with the same name set to `enabled: false`
        # This excludes the SDK from KOTS installations
        replicated:
          enabled: false
        ...     
    ```

    For more information about how KOTS consumes values in the HelmChart custom resource, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

 1. Add the Helm chart and the HelmChart custom resource to a new release and promote to a development channel. Test the release by installing with KOTS and the Helm CLI in development environments. See [Managing Releases with the Vendor Portal](releases-creating-releases) or [Managing Release with the CLI](releases-creating-cli).

 1. Repeat these steps for each Helm chart in your release that includes the SDK as a dependency. 