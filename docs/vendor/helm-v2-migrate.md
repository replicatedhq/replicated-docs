# Migrating Existing Installations to HelmChart v2

This topic describes how to migrate existing Replicated KOTS installations to the KOTS HelmChart `kots.io/v1beta2` (HelmChart v2) installation method, without having to reinstall the application. It also includes information about how to support both HelmChart v1 and HelmChart v2 installations from a single release, and lists frequently-asked questions (FAQs) related to migrating to HelmChart v2.

## Migrate to HelmChart v2

### Requirements

* The HelmChart v2 custom resource is supported with KOTS v1.99.0 and later. If any of your customers are running a version of KOTS earlier than v1.99.0, see [Support Customers on KOTS Versions Earlier Than v1.99.0](#support-both-v1-v2) below for more information about how to support both HelmChart v1 and HelmChart v2 installations from the same release.

* The Helm `--take-ownership` flag is supported with KOTS v1.124.0 and later.

* The `kots.io/keep` annotation is supported with KOTS v1.122.0 and later.

### Migrate From HelmChart v1 with `useHelmInstall: true`

To migrate existing installations from HelmChart v1 with `useHelmInstall: true` to HelmChart v2:

1. In a development environment, install an application release using the KOTS HelmChart v1 with `useHelmInstall: true` method. You will use this installation to test the migration to HelmChart v2.

1. Create a new release containing your application files.

1. For each Helm chart in the release, configure the corresponding HelmChart custom resource to update `apiVersion` to `kots.io/v1beta2`, rewrite images, inject image pull secrets, and add backup labels. See [Configuring the HelmChart Custom Resource v2](helm-native-v2-using).

1. Promote the release to an internal-only channel that your team uses for testing.

1. In your development environment, log in to the Admin Console and confirm that you can upgrade to the new HelmChart v2 release.

1. When you are done testing, promote the release to one or more of your customer-facing channels. Customers can follow the standard upgrade process in the Admin Console to update their instance.

### Migrate From HelmChart v1 with `useHelmInstall: false`

This section describes how to migrate existing HelmChart v1 installations with `useHelmInstall: false`. These migration steps ensure that KOTS does not uninstall any resources that were previously deployed without Helm, and that Helm takes ownership of these existing resources.

To migrate existing installations from HelmChart v1 and `useHelmInstall: false` to HelmChart v2:

1. Create a new release containing your application files:

   1. In the release, for any resources defined in Kubernetes manifests or in your Helm `templates` that were previously installed with HelmChart v1 and `useHelmInstall: false`, add the `kots.io/keep` annotation. The `kots.io/keep` annotation prevents KOTS from uninstalling these resources when upgrading using the HelmChart v2 method.

       **Example:**
    
       ```yaml
       apiVersion: apps/v1
       kind: Statefulset
       metadata:
         name: postgresql
         # Add the kots.io/keep annotation
         annotations:
           kots.io/keep: "true"
       ```
     
     1. Save the release.
     
1. Create another new release:

   1. For each Helm chart in the release, configure the corresponding HelmChart custom resource to update `apiVersion` to `kots.io/v1beta2`, rewrite images, inject image pull secrets, and add backup labels. See [Configuring the HelmChart Custom Resource v2](helm-native-v2-using).

   1. In the HelmChart custom resource, under the `helmUpgradeFlags` field, add the `--take-ownership` flag:

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

      When the `--take-ownership` upgrade flag is enabled, Helm automatically takes ownership of resources that were previously deployed without Helm.

   1. Save the release

1. Test the migration process:

   1. Promote the first release to an internal-only channel that your team uses for testing.

   1. In a development environment, install the first release.

   1. Promote the second release to the same channel.
   
   1. In your development environment, access the Admin Console to upgrade to the second release.

1. When you are done testing, promote the first release to one or more of your customer-facing channels. Replicated recommends that you mark the release as required by enabling **Prevent this release from being skipped during upgrades**. For more information about required releases, see [Properties](/vendor/releases-about#properties) in _About Channels and Releases_.

1. Promote the second release to the same customer-facing channel(s). Replicated recommends that you mark the release as required by enabling **Prevent this release from being skipped during upgrades**.

1. Instruct customers to migrate by first upgrading to the release where the `kots.io.keep` annotation is applied to your resources, then upgrading to the release with HelmChart v2.

1. (Recommended) In subsequent releases, remove the `helmUpgradeFlags` field (including the `--take-ownership` flag) from the HelmChart custom resource. This flag is only required during one upgrade to allow Helm to take ownership of your application resources.

### Migrate From Standard Kubernetes Manifests

This section describes how to migrate existing KOTS installations of applications that were previously packaged as standard Kubernetes manifests and are now packaged as one or more Helm charts. This migration path involves performing two upgrades to ensure that KOTS does not uninstall any resources that were adopted into Helm charts, and that Helm can take ownership of resources that were previously deployed without Helm.

To migrate applications that were previously packaged as standard Kubernetes manifests:

1. Create a new release containing the Kubernetes manifests for your application:

   1. For each of the application manifests in the release, add the `kots.io/keep` annotation. The `kots.io/keep` annotation prevents KOTS from uninstalling resources that were previously installed without Helm when upgrading using the HelmChart v2 method.

      **Example:**
  
      ```yaml
      apiVersion: apps/v1
      kind: Statefulset
      metadata:
        name: postgresql
        annotations:
          kots.io/keep: "true"
      ```   

   1. Save the release.

1. Create another new release:

     1. In the release, add your application Helm chart(s). Remove the application manifests for resources that were adopted into the Helm chart(s).

     1. For each Helm chart in the release, add a corresponding KOTS HelmChart custom resource with `apiVersion` set to `kots.io/v1beta2`. Configure the resource to rewrite images, inject image pull secrets, and add backup labels. See [Configuring the HelmChart Custom Resource v2](helm-native-v2-using).

     1. In the HelmChart custom resource, under the `helmUpgradeFlags` field, add the `--take-ownership` flag:

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

        When the `--take-ownership` upgrade flag is enabled, Helm automatically takes ownership of resources that were previously deployed without Helm.

     1. Save the release.

1. Test the migration process:

   1. Promote the first release to an internal-only channel that your team uses for testing.

   1. In a development environment, install the first release.

   1. Promote the second release to the same channel.
   
   1. In your development environment, access the Admin Console to upgrade to the second release. Upgrading to the second release migrates the installation to HelmChart v2.

1. After you are done testing the migration process, promote the first release containing your application manifests with the `kots.io/keep` annotation to one or more customer-facing channels. Replicated recommends that you mark the release as required by enabling **Prevent this release from being skipped during upgrades**. For more information about required releases, see [Properties](/vendor/releases-about#properties) in _About Channels and Releases_.

1. Promote the second release containing your Helm chart(s) and the HelmChart v2 custom resource(s) to the same channels. Replicated recommends that you mark the release as required by enabling **Prevent this release from being skipped during upgrades**.

1. Instruct customers to migrate by first upgrading to the release containing the standard manifests, then upgrading to the release packaged with Helm.

1. (Recommended) In subsequent releases, remove the `helmUpgradeFlags` field (including the `--take-ownership` flag) from the HelmChart custom resource. This flag is only required during one upgrade to allow Helm to take ownership of your application resources.

## Support Customers on KOTS Versions Earlier Than v1.99.0 {#support-both-v1-v2}

The HelmChart v2 installation method requires KOTS v1.99.0 or later. If you have existing customers that have not yet upgraded to KOTS v1.99.0 or later, Replicated recommends that you support both the HelmChart v2 and v1 installation methods from the same release until all installations are running KOTS v1.99.0 or later.

To support both installation methods from the same release, include both versions of the HelmChart custom resource for each Helm chart in your application releases (HelmChart `kots.io/v1beta2` and HelmChart `kots.io/v1beta1` with `useHelmInstall: true`).

When you include both versions of the HelmChart custom resource for a Helm chart, installations with KOTS v1.98.0 or earlier use the v1 method, while installations with KOTS v1.99.0 or later use v2.

After all customers are using KOTS v1.99.0 or later, you can remove the HelmChart v1 custom resources so that all customers are using the HelmChart v2 method.

## HelmChart v2 Migration FAQs

This section includes FAQs related to migrating existing installations to the KOTS HelmChart v2 method.

### Which migration scenarios require the `kots.io/keep` annotation?

When applied to a resource in a release, the `kots.io/keep` annotation prevents the given resource from being uninstalled. The `kots.io/keep` annotation can be used to prevent KOTS from deleting resources that were adopted into Helm charts or otherwise previously deployed without Helm.

To prevent existing resources from being uninstalled during upgrade, the `kots.io/keep` annotation is required for the following types of migrations:
  * Applications previously packaged as Kubernetes manifests migrating to HelmChart v2
  * HelmChart v1 with `useHelmInstall: false` migrating to HelmChart v2

`kots.io/keep` is _not_ needed when migrating from HelmChart v1 with `useHelmInstall: true` to HelmChart v2.

### Which migration scenarios require the `--take-ownership` flag?

When the `--take-ownership` flag is enabled, Helm automatically takes ownership of resources that were previously deployed to the cluster without Helm.

The `--take-ownership` flag is required for the following types of migrations:
  * Applications previously packaged as Kubernetes manifests migrating to HelmChart v2
  * HelmChart v1 with `useHelmInstall: false` migrating to HelmChart v2

`--take-ownership` is _not_ needed when migrating from HelmChart v1 with `useHelmInstall: true` to HelmChart v2.

### What is the difference between HelmChart v1 with `useHelmInstall: false` and `useHelmInstall: true`?

With HelmChart v1 and `useHelmInstall: false`, KOTS renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. This differs from both the HelmChart v1 with `useHelmInstall: true` and HelmChart v2 methods, where KOTS installs the application using Helm.

Because the HelmChart v1 with `useHelmInstall: false` method does not deploy resources with Helm, it is necessary to use the `kots.io/keep` annotation and the Helm `--take-ownership` flag when migrating to the HelmChart v2 installation method. These ensure that Helm can take ownership of existing resources and that the resources are not uninstalled during upgrade.

For more information about how KOTS deploys Helm charts, including information about the deprecated HelmChart v1 installation methods, see [About Distributing Helm Charts with KOTS](helm-native-about).