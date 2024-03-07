import SDKOverview from "../partials/replicated-sdk/_overview.mdx"

# Onboarding with KOTS

This topic describes how to onboard with Replicated KOTS, including prerequisites and the list of custom resources to add to your releases in order to support KOTS installations.

## Prerequisites

If you are new to Replicated, complete the following prerequisites before you get started with KOTS:

* Create an account in the vendor portal. You can either create a new team or join an existing team. For more information, see [Creating a Vendor Account](vendor-portal-creating-account).

* Complete a basic Replicated onboarding workflow to create an application and then promote and install initial releases in a development environment: 
  * (Recommended) For Helm chart-based applications, Replicated recommends that you complete the [Replicated Quick Start](/vendor/replicated-onboarding) workflow before getting started with KOTS. The workflow in _Replicated Quick Start_ demonstrates how to add a Helm chart to a release in the vendor platform and then install with the Helm CLI.
  
     :::note
     Packaging your application with Helm is recommended because it allows you to support both installations with the Helm CLI and with KOTS from the same release, without having to maintain separate sets of Helm charts or application manifests.
     :::

  * Alternatively, if you do _not_ intend to distribute a Helm chart-based application with Replicated, see [KOTS Tutorial (UI)](tutorial-ui-setup) for a workflow that uses a sample application with standard Kubernetes manifests.

## Add Custom Resources

You can add custom resources to your releases to support installations with KOTS. The custom resources are consumed by KOTS and are not deployed to the cluster. This section provides a checklist of the custom resources to add as well as information about how to add and test custom resources.

### How to Add Custom Resources

Replicated recommends that you configure and add one custom resource at a time by creating a release and then upgrading in a development environment to test. You can add these custom resources to releases in any order that you prefer.

For more information about creating releases, see [Managing Releases with the Vendor Portal](releases-creating-releases). For more information about installing and upgrading with KOTS, see [About Installing an Application](/enterprise/installing-overview) and [Updating Applications](/enterprise/updating-apps).

### Custom Resource Checklist

This section lists the required and recommended custom resources to add to your releases to enable KOTS installations for your application. The custom resources are grouped in the following categories:

* [KOTS Admin Console](#admin-console)
* [Helm Chart Installations](#helm-chart-installations)
* [Embedded Kubernetes](#embedded-kubernetes)
* [Recommended Features for KOTS](#recommended-features)

#### KOTS Admin Console {#admin-console}

The following custom resources can be added to customize the admin console experience for your application and enable recommended features for KOTS.

<table>
  <tr>
    <th width="25%">Custom Resource</th>
    <th width="50%">Description</th>
    <th width="25%">How To</th>
  </tr>
  <tr>
    <td>KOTS Application</td>
    <td><p>Control the KOTS admin console experience for your application.</p></td>
    <td>
      <a href="/reference/custom-resource-application">Application</a>
    </td>  
  </tr>
  <tr>
    <td>Kubernetes SIG Application</td>
    <td><p>Add links to the admin console dashboard. A common use case for the Kubernetes Application custom resource is adding a button to the dashboard that users can click to navigate to port forwarded services for your application.</p></td>
    <td><a href="/vendor/admin-console-adding-buttons-links">Adding Application Links to the Dashboard</a></td>
  </tr>
  <tr>
  <td>Config</td>
    <td>
      <p>Create a configuration screen in the admin console to collect required and optional configuration values from your users.</p>
      <p><strong>Note:</strong> This feature does not apply to Kubernetes Operators.</p>
    </td>
    <td><a href="/vendor/admin-console-customize-config-screen">Creating and Editing Configuration Fields</a></td>
  </tr>
  <tr>
    <td>Preflight</td>
    <td><p>Define preflight checks to test for system compliance during the installation process and reduce the number of support escalations.</p></td>
    <td><a href="/vendor/preflight-defining">Defining Preflight Checks</a></td>
  </tr>
  <tr>
    <td>SupportBundle</td>
    <td><p>Enable customers to quickly collect and analyze troubleshooting data from their clusters to help you diagnose problems with application deployments.</p></td>
    <td><a href="/vendor/support-bundle-customizing">Adding and Customizing Support Bundles</a></td>
  </tr>
  <tr>
    <td>Backup</td>
    <td>Enable snapshots with Velero so that end users can back up and restore their application data.</td>
    <td><a href="snapshots-configuring-backups">Configuring Backup and Restore</a></td>
  </tr>
</table>

#### Helm Chart Installations

The HelmChart custom resource is required to install Helm charts with KOTS.

<table>
  <tr>
    <th width="25%">Custom Resource</th>
    <th width="50%">Description</th>
    <th width="25%">How To</th>
  </tr>
  <tr>
    <td>HelmChart</td>
    <td><p>Provides instructions for KOTS about how to deploy a given Helm chart.</p></td>
    <td><a href="helm-native-v2-using">Configuring the HelmChart Custom Resource</a></td>
  </tr>
</table>

#### Embedded Kubernetes

The following custom resources can be added to embed Kubernetes with your application to support KOTS installations in VMs or bare metal servers.

You can choose to use either Replicated embedded cluster or Replicated kURL to embed Kubernetes. For more information, see [About Embedded Kubernetes](/vendor/embedded-kubernetes-overview).

<table>
  <tr>
    <th width="25%">Custom Resource</th>
    <th width="50%">Description</th>
    <th width="25%">How To</th>
  </tr>
  <tr>
    <td>Embedded Cluster Config (Beta)</td>
    <td>Create an embedded cluster config to support installations in VMs or bare metal servers with Replicated embedded cluster.</td>
    <td><a href="embedded-overview">Using Embedded Cluster (Beta)</a></td>
  </tr>
  <tr>
    <td>Installer</td>
    <td>Create an Installer spec to support installations in in VMs or bare metal servers with Replicated kURL.</td>
    <td><a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a></td>
  </tr>
</table>

## Distribute the SDK with your Application

<SDKOverview/>

## Configure Additional Replicated Features

Review the [Features Checklist](/vendor/replicated-onboarding#features-checklist) in _Replicated Quick Start_ for a list of features to integrate with your application to fully onboard onto the Replicated platform.

For example, you can add custom domains for the Replicated registry and app service, configure checks in your application for custom license entitlements, collect custom metrics using the Replicated SDK API, and more.