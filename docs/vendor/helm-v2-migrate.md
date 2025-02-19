# Migrating Existing Installations to HelmChart v2

This topic describes how to migrate existing Replicated KOTS installations to the KOTS HelmChart `kots.io/v1beta2` (HelmChart v2) installation method, without having to reinstall the application. It also includes information about how to support both HelmChart v1 and HelmChart v2 installations from a single release, and frequently-asked questions related to migrating to HelmChart v2.

For more information about how KOTS deploys Helm charts, see [About Distributing Helm Charts with KOTS](helm-native-about).

## Migrate to HelmChart v2

There are different migrations paths depending on which of the following methods were used to install the application previously:
* HelmChart `kots.io/v1beta1` with `useHelmInstall: true`
* HelmChart `kots.io/v1beta1` with `useHelmInstall: false`
* KOTS installations of releases packaged as standard Kubernetes manifests

### Requirement

The HelmChart v2 custom resource is supported for installations that use KOTS v1.99.0 or later. If any of your customers are running a version of KOTS earlier than v1.99.0, see [Support Customers on KOTS Versions Earlier Than v1.99.0](#support-both-v1-v2) below for more information about how to support both HelmChart v1 and HelmChart v2 installations from the same release.

### Migrate From HelmChart v1 with `useHelmInstall: true`

Your customers can follow the regular upgrade flow in the KOTS Admin Console to update their instance to the new version using HelmChart v2.

To migrate existing installations from HelmChart v1 with `useHelmInstall: true` to HelmChart v2:

1. In a new release, for each HelmChart custom resource in the release, update the `apiVersion` to `kots.io/v1beta2`:

     ```yaml
     # Set apiVersion to kots.io/v1beta2
     apiVersion: kots.io/v1beta2
     kind: HelmChart
     metadata:
       name: samplechart
     spec:

     ```

1. Configure the HelmChart custom resource to rewrite images, inject image pull secrets, and add backup labels. See [Configuring the HelmChart Custom Resource v2](helm-native-v2-using).

1. Promote the release to channel that your team uses for testing.

1. Access a development environment where there is an instance of your application that was deployed with KOTS HelmChart v1 with `useHelmInstall: true`. In the development environment, log in to the Admin Console and confirm that you can upgrade to the new HelmChart v2 release.

1. When you are ready, promote the release to one or more of your customer-facing channels.

### Migrate From HelmChart v1 with `useHelmInstall: false`

With HelmChart v1 and `useHelmInstall: false`, KOTS renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. With HelmChart v2, KOTS does a Helm install or upgrade of the chart directly.

When migrating to HelmChart v2 from HelmChart v1 and `useHelmInstall: false`, you can use the `kots.io/keep` annotation to ensure that KOTS does not delete any existing resources from the cluster. Additionally, the `--take-ownership` flag will be used to allow Helm to take ownership of existing resources.

To migrate existing installations from HelmChart v1 and `useHelmInstall: false` to HelmChart v2:

1. Create a new release containing your application files:

     1. Add the `kots.io/keep` annotation to any resources that were previously deployed with `kubectl apply`. This includes any resources packaged as standard Kubernetes manifests or in Helm `templates`. The `kots.io/keep` annotation prevents KOTS from uninstalling these resources when deploying the release with HelmChart v2.

     1. In the Embedded Cluster Config, add the `--take-ownership` flag.

     1. (Recommended) In the KOTS Application custom resource, set `minKotsVersion: 1.122.0` to ensure that the `--take-ownership` flag is supported.

     1. For each HelmChart custom resource in the release, update the `apiVersion` to `kots.io/v1beta2`:

         ```yaml
         # Set apiVersion to kots.io/v1beta2
         apiVersion: kots.io/v1beta2
         kind: HelmChart
         metadata:
           name: samplechart
         spec:

         ```

     1. Configure the HelmChart custom resource to rewrite images, inject pull secrets, and add backup labels. See [Configuring the HelmChart Custom Resource v2](helm-native-v2-using). 

1. Promote the release to channel that your team uses for testing.

1. Install the release in a development environment to test that you can upgrade to the new release successfully.

1. After testing, promote the release to one or more of your customer-facing channels.

    Your customers can follow the regular upgrade flow in the Admin Console to update their instance to the new version using HelmChart `v1beta2`.

### Migrate Installations Previously Distributed as Standard Manifests

For applications distributed through KOTS that were packaged as standard Kubernetes manifests and are now packaged as one or more Helm charts, migrating to HelmChart v2 requires adding the `kots.io/keep` annotation to any previously-deployed resources. This ensures that KOTS does not delete these existing resources from the cluster when deploying a new release using the KOTS HelmChart v2 method.

To migrate applications that were previously packaged as standard Kubernetes manifests:

1. Create a new release containing the Kubernetes manifests for your application.

1. For each of the application manifests in the release, add the `kots.io/keep` annotation.

     This ensures that KOTS will not delete these resources from the cluster when deploying a new release that uses the HelmChart v2 method.

1. Save the release.

1. Create another new release:

     1. In the release, add your new application Helm chart or charts.
     
     1. Remove the Kubernetes manifests that are replaced by the Helm chart(s).

     1. In the Embedded Cluster Config, add the `--take-ownership` flag to the `helmUpgradeFlags` field, as shown below:

         ```yaml
         # HelmChart v1 beta2
         apiVersion: kots.io/v1beta2
         kind: HelmChart
         metadata:
           name: samplechart
         spec:
            helmUpgradeFlags:
              - --take-ownership
         ```   

         When the `--take-ownership` flag is enabled, Helm automatically takes ownership of existing resources in the cluster during upgrade.  

     1. (Recommended) In the KOTS Application custom resource, set `minKotsVersion: 1.122.0`. The Helm `--take-ownership` flag is not supported on versions of KOTS earlier than 1.122.0.

     1. Save the release.

1. Test the upgrade flow:

    1. Promote the first release to an internal-only channel used for testing.
    
        :::note
        Replicated recommends that you mark the release as required because customers must upgrade to this release first before they can upgrade to the release that migrates to HelmChart v2.
        :::

    1. In a development environment, install the release.

    1. Promote the second release to the same channel.

    1. In your development environment, upgrade to the second release to migrate the installation to HelmChart v2. Confirm that none of the existing resources in the cluster were deleted during upgrade.

1. When you are ready, promote the first release containing your application manifests to one or more customer-facing channels.

1. Promote the second release containing your application Helm chart to the same channel or channels.

1. Instruct customers to migrate by first upgrading to the release packaged with standard manifests, then upgrading to the release packaged with Helm second.

## Support Customers on KOTS Versions Earlier Than v1.99.0 {#support-both-v1-v2}

The HelmChart v2 installation method requires KOTS v1.99.0 or later. If you have existing customers that have not yet upgraded to KOTS v1.99.0 or later, Replicated recommends that you support both the HelmChart v2 and v1 installation methods from the same release until all installations are running KOTS v1.99.0 or later.

To support both installation methods from the same release, include both versions of the HelmChart custom resource for each Helm chart in your application releases:
* HelmChart `kots.io/v1beta2`
* HelmChart `kots.io/v1beta1` with `useHelmInstall: true`

When you include both versions of the HelmChart custom resource for a Helm chart, installations with KOTS v1.98.0 or earlier use the v1 method, while installations with KOTS v1.99.0 or later use v2.

After all customers are using KOTS v1.99.0 or later, you can remove the HelmChart `kots.io/v1beta1` custom resources so that all customers are using the HelmChart v2 method.

## HelmChart v2 Migration FAQs

This section includes FAQs related to migrating existing installations to the KOTS HelmChart v2 method.

### Which migration scenarios require the `kots.io/keep` annotation?

When applied to a resource in a release, the `kots.io/keep` annotation prevents the given resource from being uninstalled. The `kots.io/keep` annotation can be used to prevent KOTS from deleting resources that you intend to adopt into Helm charts, or that were previously deployed with `kubectl apply` and will be deployed with Helm using KOTS HelmChart v2.

To prevent existing resources from being uninstalled, the `kots.io/keep` annotation is required for the following types of migrations:
  * Applications previously packaged as Kubernetes manifests migrating to HelmChart v2
  * HelmChart v1 with `useHelmInstall: false` migrating to HelmChart v2

`kots.io/keep` is _not_ needed when migrating from HelmChart v1 with `useHelmInstall: true` to HelmChart v1beta2. This is because the HelmChart v1 with `useHelmInstall: true` method deploys the given application with Helm, rather than using `kubectl apply`.

### Which migration scenarios require the `--take-ownership` flag?

When the `--take-ownership` flag is enabled, Helm automatically takes ownership of existing resources by automatically adding the required annotations.

The `--take-ownership` flag is required for the following types of migrations:
  * Applications previously packaged as Kubernetes manifests migrating to HelmChart v2
  * HelmChart v1 with `useHelmInstall: false` migrating to HelmChart v2

`--take-ownership` is _not_ needed when migrating from HelmChart v1 with `useHelmInstall: true` to HelmChart v1beta2. This is because the HelmChart v1 with `useHelmInstall: true` method deploys the given application with Helm, rather than using `kubectl apply`.

### Where can I find more help?

For additional support migrating existing installations to HelmChart v2, reach out to your Replicated account representative.