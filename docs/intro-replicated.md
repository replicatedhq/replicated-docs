# About KOTS and kURL

This topic describes Replicated KOTS, used for packaging, installing, and managing applications in a Kubernetes cluster. It also describes the Replicated kURL installer option.

## Overview

KOTS lets you package and update applications using Helm charts, Kubernetes manifests, or Kubernetes Operators. Applications are then securely deployed in customer environments using the KOTS installer. 

For customers that do not have an existing cluster, you can include a kURL installer to provision an embedded cluster, and then KOTS installs the application. For more information about kURL, see [kURL](#kurl).

KOTS and kURL support installing in air gapped environments.

KOTS installs the Replicated admin console and the kots CLI on a cluster that lets customers manage the application, in addition to helping deploy the application and upgrades. For more information, see [Admin Console](#admin-console) and [kots CLI](#kots-cli).

KOTS provides additional features for managing your application. For more information about KOTS and its features, see [KOTS](#kots).

## Architecture

The following architecture diagram shows the components as they relate to you as a vendor packaging your application with KOTS using either the vendor portal, replicated CLI, or Vendor API. The application can be packaged using either Helm charts, Kubernetes manifests, or Kubernetes operators.

 Then the application, admin console, and kots CLI are installed in an existing cluster and on a cluster provisioned by kURL.

![KOTS and kURL deployments](/images/replicated-components-diagram.png)

[View larger image](/images/replicated-components-diagram.png)

For more information, see:

- [KOTS](#kots)
- [Admin Console](#admin-console)
- [kots CLI](#kots-cli)
- [kURL](#kurl)

## KOTS

KOTS installs the admin console and the kots CLI on a cluster, and deploys the application files using either the admin console or kots CLI. The admin console and kots CLI also let customers manage the application.

KOTS lets your customize your customer experience with the admin console during installation and when managing the application instance. For more information about the admin console, see [Admin Console](#admin-console).

You use custom resources to configure and control the application experience. Custom resources are packaged with your application but are not deployed to the cluster. The custom resources are used to customize or enable options, such as the:

- Customer-facing Config screen in the admin console
- Admin console branding, release notes, custom graphs display, application status display, and more
- Preflight checks
- Support bundle specifications
- Back and restore
- Identity service
- Default rule levels for the linter

KOTS lets you add optional and conditional resources, using annotations, to include or exclude resources based on conditional statements. For example, a customer might want to use their own database and so any database option provided by your Kubernetes manifests should not be installed. You can also use annotations to control the order in which resources are deployed. For more information, see [Including Optional and Conditional Resources](packaging-include-resources), [Orchestrating Resource Deployment](orchestrating-resource-deployment).

You can enable backup and restore capabilities with KOTS snapshots, so that customers can implement full disaster recovery protection for the application and the admin console. Backup and restore is supported in all environments, included air gap. For more information, see [Understanding Backup and Restore](snapshots-overview).

Role-based access control (RBAC) is supported for clusters and namespaces. By default, the KOTS installation sets RBAC for the cluster, but you can scope it to namespaces instead. For more information, see [Configuring KOTS RBAC](packaging-rbac).

### Admin Console

KOTS installs the admin console. The admin console is a customer-facing user interface includes built-in functionality that allows users to install, manage, update, configure, monitor, backup and restore, and troubleshoot their application instances. The admin console communicates securely with KOTS to synchronize licenses, check for upgrades, and so on. 

As a vendor, you can customize the admin console. For example, you can customize the Config screen to allow customers to specify inputs related to unique options that your application provides. You can also include your own branding on the admin console, configure status informers, and add custom graphs.

![Admin Console Dashboard](/images/guides/kots/application.png)

### kots CLI

The kots command-line interface (CLI) is a kubectl plugin. Customers can run commands with the kots CLI to install and manage their application instances with KOTS programmatically. For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).

## kURL

Replicated kURL allows software vendors to create custom Kubernetes distributions to share with their users for installation in online or air gapped environments. kURL has a built-in integration with KOTS through its KOTS add-on. With this integration, users can run a kURL installation script in their virtual machine (VM) or bare metal server, which creates a cluster and then automatically installs KOTS in the cluster. Clusters created by kURL are called _embedded clusters_.

For information about how to install applications in embedded clusters, see [Installing with kURL](/enterprise/installing-embedded-cluster). For information about how to create a specification for kURL, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes).

kURL is an open source project that is maintained by Replicated. For more information, see the [kURL repository](https://github.com/replicatedhq/kURL) in GitHub and the [kURL documentation](https://kurl.sh).
