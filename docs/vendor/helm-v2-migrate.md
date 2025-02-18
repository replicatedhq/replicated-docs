# Migrating Existing Installations to HelmChart v2

This topic provides guidance for migrating existing installations that were deployed with the Replicated KOTS HelmChart `kots.io/v1beta1` method to use HelmChart `kots.io/v1beta2` instead.

## Overview

The HelmChart custom resource `kots.io/v1beta1` is deprecated and is not recommended for new installations. Existing installations that were installed with `kots.io/v1beta1` can be migrated to `kots.io/v1beta2` without needing to reinstall the application.

## Requirement

HelmChart `kots.io/v1beta2` is available for installations that use KOTS v1.99.0 or later.

## Migrate From HelmChart v1 and `useHelmInstall: true` 

If all your customers are running KOTS v1.99.0 or later, existing installations that used HelmChart v1 and `useHelmInstall: true` can migrate to HelmChart v2 by upgrading their instance in the Admin Console.

To migrate existing installation from HelmChart v1 and `useHelmInstall: true` to HelmChart v2:

1. Ensure that all your customers are running KOTS v1.99.0 or later.

1. In a new release, update the version of each HelmChart custom resource to `kots.io/v1beta2`.

1. Configure the HelmChart custom resource to rewrite images, inject pull secrets, and add backup labels. See [Configuring the HelmChart Custom Resource v2](helm-native-v2-using).

1. Test the release.

1. When ready, promote the release to your customer-facing channels.

1. Customers can follow the regular upgrade flow in the Admin Console to update their instance to the new release version with HelmChart v2.

## Migrate From HelmChart v1 and `useHelmInstall: false`

With HelmChart `kots.io/v1beta1` and `useHelmInstall: false`, KOTS renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. With HelmChart `kots.io/v1beta2`, KOTS does a Helm install or upgrade of the chart directly.

When migrating existing installations from HelmChart `kots.io/v1beta1` and `useHelmInstall: false` to HelmChart `kots.io/v1beta2`, you can use the following the ensure that Helm takes ownership of any existing resources deployed to the cluster:
* **`kots.io/keep`:** Prevents KOTS from deleting resources during an upgrade if the resource is no longer present in the new release.
* **`--take-ownership`:** Allows Helm to take ownership of the resources

To migrate existing installation from HelmChart v1 and `useHelmInstall: true` to HelmChart v2:

1. Create a release with manifests that add the keep annotation.

1. Ensure that all your customers are running KOTS v1.99.0 or later.

1. In a new release, update the version of each HelmChart custom resource to `kots.io/v1beta2`.

1. Configure the HelmChart custom resource to rewrite images, inject pull secrets, and add backup labels. See [Configuring the HelmChart Custom Resource v2](helm-native-v2-using). 

1. Test the release.

1. When ready, promote the release to your customer-facing channels.

1. Customers can follow the regular upgrade flow in the Admin Console to update their instance to the new release version with HelmChart v2.

Create another release that removes the manifests and includes `--take-ownership` on the new chart. Have customer(s) upgrade to the first release and only then the second release.

## Supporting Customers on KOTS Versions Earlier Than 1.99.0

If you have existing customers that have not yet upgraded to KOTS v1.99.0 or later, you can support both the `kots.io/v1beta2` and `kots.io/v1beta1` installation methods from the same release.

To do this, for each Helm chart in the release, include two HelmChart custom resources:
* HelmChart `kots.io/v1beta2`
* HelmChart `kots.io/v1beta1` with `useHelmInstall: true`

When you include both versions of the HelmChart custom resource in a single release, installations with KOTS v1.98.0 or earlier use the `kots.io/v1beta1` method, while installations with KOTS v1.99.0 or later use `kots.io/v1beta2`.

After all customer environments where the Helm chart was previously installed with `kots.io/v1beta1` and `useHelmInstall: true` are upgraded to KOTS v1.99.0 or later, you can remove version `kots.io/v1beta1` of the HelmChart custom resource from your releases.