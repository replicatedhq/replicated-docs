# About KOTS and kURL

This topic describes Replicated KOTS, used for packaging, installing, and managing applications in a Kubernetes cluster. It also describes the Replicated kURL installer option.

:::note
You must have the KOTS entitlement to use the KOTS and kURL installers and features.
:::

## KOTS

Replicated KOTS installs and manages applications in a Kubernetes cluster. You can use KOTS to deploy Kubernetes applications or Helm charts securely to the following online or air gap environments:

- Existing clusters
- Embedded clusters created by Replicated kURL. See [kURL](#kurl) below.

KOTS installs the Replicated admin console and then deploys the application files using either the admin console or kots CLI. The admin console and kots CLI also let customers manage the application.

KOTS is an open source project that is maintained by Replicated. For more information, see the kots repository in GitHub.

<!--## Custom Resources

You use KOTS and Troubleshoot custom resources to configure and control the application experience. Custom resources are packaged with your application but are not deployed to the cluster. 

You can add optional and conditional resources with annotations to include or exclude resources based on conditional statements. For example, a customer might want to use their own database and so any database option provided by your Kubernetes manifests should not be installed. You can also use annotations to control the order in which resources are deployed. For more information, see [Including Optional and Conditional Resources](packaging-include-resources), [Orchestrating Resource Deployment](orchestrating-resource-deployment).

For more information about adding KOTS functionality, see [How to Create Releases for Your Application](distributing-workflow).

## Architecture

The following architecture diagram shows the components as they relate to you as a vendor packaging your application with KOTS using either the vendor portal, replicated CLI, or Vendor API.

 Then the application, admin console, and kots CLI are installed in an existing cluster and on a cluster provisioned by kURL.

![KOTS and kURL deployments](/images/replicated-components-diagram.png)

[View larger image](/images/replicated-components-diagram.png)

For more information, see:

- [KOTS](#kots)
- [Admin Console](#admin-console)
- [kots CLI](#kots-cli)
- [kURL](#kurl) -->

## Admin Console

The admin console is a customer-facing user interface that includes built-in functionality allowing users to install, manage, update, configure, monitor, backup and restore, and troubleshoot their application instances. The admin console communicates securely with KOTS to synchronize licenses, check for upgrades, and so on. 

![Admin Console Dashboard](/images/guides/kots/application.png)

<!--
The admin console features include:

- **Config Screen:** Customize the customer-facing Config screen in the admin console to collect required or optional values from your customers that are used to run your application. 
- **Custom Admin Console:** Customize the admin console with your company's branding, release notes, custom graphs display, application status display, and more.
- **Backup and Restore:** Enable backup and restore capabilities so that customers can implement full disaster recovery protection for the application and the admin console. 
- **RBAC:** Use role-based access control (RBAC) for clusters and namespaces. By default, the KOTS installation sets RBAC for the cluster, but you can scope it to namespaces instead. 
-->

## kots CLI

The kots command-line interface (CLI) is a kubectl plugin. Customers can run commands with the kots CLI to install and manage their application instances with KOTS programmatically. For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).

## kURL

Replicated kURL provisions Kubernetes clusters, which allows customers who do not have an existing cluster to install your application without provisioning a cluster themselves. Clusters created by kURL are called _embedded clusters_. Embedded clusters can be online or air gap environments.

kURL has a built-in integration with KOTS through its KOTS add-on. With this integration, customers can run a kURL installation script in their virtual machine (VM) or bare metal server, which creates a cluster and then automatically installs KOTS in the cluster. Your application is then deployed with KOTS. 

For information about how to install applications in embedded clusters, see [Installing with kURL](/enterprise/installing-embedded-cluster). For information about how to create a specification for kURL, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes).

kURL is an open source project that is maintained by Replicated. For more information, see the [kURL repository](https://github.com/replicatedhq/kURL) in GitHub and the [kURL documentation](https://kurl.sh).
