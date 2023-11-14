# Migrating Existing Installations to HelmChart v2

This topic provides guidance for migrating existing installations that were deployed with the HelmChart custom resource `kots.io/v1beta1` with `useHelmInstall: true` to use `kots.io/v1beta2` instead.

## Overview

The HelmChart custom resource `kots.io/v1beta1` is deprecated and is not recommended for new installations. Existing installations that were installed with `kots.io/v1beta1` and `useHelmInstall: true` can be migrated to `kots.io/v1beta2` without needing to reinstall the application. For information about how to support installation with the `kots.io/v1beta2` HelmChart custom resource, including rewriting images, injecting pull secrets, and adding backup labels, see [Configuring the HelmChart Custom Resource v2](helm-native-v2-using).

### `useHelmInstall: false` Limitation

Migration from `kots.io/v1beta1` with `useHelmInstall: false` to any other installation method (including to `kots.io/v1beta1` with `useHelmInstall: true` or to `kots.io/v1beta2`) is _not_ supported.

To change the installation method from `useHelmInstall: false` to a different method, the user must reinstall your application.

## How to Migrate Existing Installations

The HelmChart custom resource version `kots.io/v1beta2` is available only for installations that use KOTS v1.99.0 or later. To support existing users that have not yet upgraded to KOTS v1.99.0 or later, Replicated recommends that you include both a `kots.io/v1beta2` and a `kots.io/v1beta1` (with `useHelmInstall: true`) HelmChart custom resource for each Helm chart in your release. This allows you to support both installation methods from the same release.

When you include both versions in a single release for the same Helm chart, installations with KOTS v1.98.0 or earlier use `kots.io/v1beta1`. Installations with KOTS v1.99.0 or later use `kots.io/v1beta2`.

After all customer environments where the Helm chart was previously installed with `kots.io/v1beta1` and `useHelmInstall: true` are upgraded to KOTS v1.99.0 or later, you can remove version `kots.io/v1beta1` of the HelmChart custom resource from your releases.