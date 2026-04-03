# Migrate from Embedded Cluster v2

This page describes how to migrate from Embedded Cluster v2 to Embedded Cluster v3.

It includes information about how to update your application release to support Embedded Cluster v3. It also describes how to upgrade existing installations from Embedded Cluster v2 to v3.

## Comparison to Embedded Cluster v2

This section describes the key differences between Embedded Cluster v2 and v3. 

### Removal of KOTS

Embedded Cluster v3 removes Replicated KOTS from the architecture. This reduces the number of dependencies that are running in the cluster, which improves reliability.

The KOTS CLI does not work with Embedded Cluster v3, and there is no KOTS Admin Console.

Embedded Cluster v3 still requires the KOTS HelmChart v2 custom resource to process and deploy Helm charts. Embedded Cluster v3 also still uses KOTS custom resources like the KOTS Application and KOTS Config resources to define aspects of the installation experience.

### Replicated SDK required for application status informers

Because Embedded Cluster v3 removes KOTS, you must include the [Replicated SDK](/vendor/replicated-sdk-overview) in your application to get instance reporting in the Vendor Portal from application status informers.

### Troubleshoot Preflight `v1beta3` required

Application preflight checks must use Troubleshoot `v1beta3`. `v1beta2` preflight specs are not supported.

For more information, see [v1beta3 overview](https://troubleshoot.sh/docs/preflight/v1beta3-overview) in the Troubleshoot documentation.

### HelmChart v2 required

Embedded Cluster v3 supports installing Helm charts with a corresponding HelmChart v2 custom resource (API version `v1beta2`).

Embedded Cluster v3 does not support Kustomize, Kubernetes manifests, or HelmChart v1.

### Unsupported Replicated template functions

Some Replicated template functions are unsupported with Embedded Cluster v3.

## Update your release to Embedded Cluster v3

To update your release to support installation with Embedded Cluster v3:

1. Remove any standalone Kubernetes manifests or `kustomization.yaml` files from your release. Embedded Cluster v3 only deploys resources that are managed by Helm charts. If you need to deploy any components before your application is deployed, use Helm chart `extensions`.

1. Ensure that you include a corresponding HelmChart v2 custom resource for each of your Helm charts. For information about how to configure the HelmChart v2 custom resource, see [Support installations with HelmChart v2](/vendor/helm-native-v2-using).

## Migrate an installation from Embedded Cluster v2 to Embedded Cluster v3


