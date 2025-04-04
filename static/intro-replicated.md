---
pagination_prev: null
---










# Introduction to Replicated

This topic provides an introduction to the Replicated Platform, including a platform overview and a list of key features. It also describes the Commercial Software Distribution Lifecycle and how Replicated features can be used in each phase of the lifecycle.

## About the Replicated Platform

Replicated is a commercial software distribution platform. Independent software vendors (ISVs) can use features of the Replicated Platform to distribute modern commercial software into complex, customer-controlled environments, including on-prem and air gap.

The Replicated Platform features are designed to support ISVs during each phase of the Commercial Software Distribution Lifecycle. For more information, see [Commercial Software Distribution Lifecycle](#csdl) below.

The following diagram demonstrates the process of using the Replicated Platform to distribute an application, install the application in a customer environment, and support the application after installation:

![replicated platform features workflow](/images/replicated-platform.png)

[View a larger version of this image](/images/replicated-platform.png)

The diagram above shows an application that is packaged with the [**Replicated SDK**](/vendor/replicated-sdk-overview). The application is tested in clusters provisioned with the [**Replicated Compatibility Matrix**](/vendor/testing-about), then added to a new release in the [**Vendor Portal**](/vendor/releases-about) using an automated CI/CD pipeline.

The application is then installed by a customer ("Big Bank") on a VM. To install, the customer downloads their license, which grants proxy access to the application images through the [**Replicated proxy registry**](/vendor/private-images-about). They also download the installation assets for the [**Replicated Embedded Cluster**](/vendor/embedded-overview) installer.

Embedded Cluster runs [**preflight checks**](/vendor/preflight-support-bundle-about) to verify that the environment meets the installation requirements, provisions a cluster on the VM, and installs [**Replicated KOTS**](intro-kots) in the cluster. KOTS provides an [**Admin Console**](intro-kots#kots-admin-console) where the customer enters application-specific configurations, runs application preflight checks, optionally joins nodes to the cluster, and then deploys the application. After installation, customers can manage both the application and the cluster from the Admin Console.

Finally, the diagram shows how [**instance data**](/vendor/instance-insights-event-data) is automatically sent from the customer environment to the Vendor Portal by the Replicated SDK API and the KOTS Admin Console. Additionally, tooling from the open source [**Troubleshoot**](https://troubleshoot.sh/docs/collect/) project is used to generate and send [**support bundles**](/vendor/preflight-support-bundle-about), which include logs and other important diagnostic data.

## Replicated Platform Features

The following describes the key features of the Replicated Platform.

### Compatibility Matrix

Replicated Compatibility Matrix can be used to get kubectl access to running clusters within minutes or less. Compatibility Matrix supports various Kubernetes distributions and versions and can be interacted with through the Vendor Portal or the Replicated CLI.

For more information, see [About Compatibility Matrix](/vendor/testing-about).

### Embedded Cluster

Replicated Embedded Cluster is a Kubernetes installer based on the open source Kubernetes distribution k0s. With Embedded Cluster, users install and manage both the cluster and the application together as a single appliance on a VM or bare metal server. In this way, Kubernetes is _embedded_ with the application.

Additionally, each version of Embedded Cluster includes a specific version of [Replicated KOTS](#kots) that is installed in the cluster during installation. KOTS is used by Embedded Cluster to deploy the application and also provides the Admin Console UI where users can manage both the application and the cluster.

For more information, see [Embedded Cluster Overview](/vendor/embedded-overview).

### KOTS (Admin Console) {#kots}

KOTS is a kubectl plugin and in-cluster Admin Console that installs Kubernetes applications in customer-controlled environments.

KOTS is used by [Replicated Embedded Cluster](#embedded-cluster) to deploy applications and also to provide the Admin Console UI where users can manage both the application and the cluster. KOTS can also be used to install applications in existing Kubernetes clusters in customer-controlled environments, including clusters in air-gapped environments with limited or no outbound internet access.

For more information, see [Introduction to KOTS](intro-kots).

### Preflight Checks and Support Bundles

Preflight checks and support bundles are provided by the Troubleshoot open source project, which is maintained by Replicated. Troubleshoot is a kubectl plugin that provides diagnostic tools for Kubernetes applications. For more information, see the open source [Troubleshoot](https://troubleshoot.sh/docs/collect/) documentation.

Preflight checks and support bundles analyze data from customer environments to provide insights that help users to avoid or troubleshoot common issues with an application:
* **Preflight checks** run before an application is installed to check that the customer environment meets the application requirements.
* **Support bundles** collect troubleshooting data from customer environments to help users diagnose problems with application deployments.

For more information, see [About Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-about).

### Proxy Registry

The Replicated proxy registry grants proxy access to an application's images using the customer's unique license. This means that customers can get access to application images during installation without the vendor needing to provide registry credentials.

For more information, see [About the Replicated Proxy Registry](/vendor/private-images-about).

### Replicated SDK

The Replicated SDK is a Helm chart that can be installed as a small service alongside your application. It provides an in-cluster API that can be used to communicate with the Vendor Portal. For example, the SDK API can return details about the customer's license or report telemetry on the application instance back to the Vendor Portal.

For more information, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

### Vendor Portal

The Replicated Vendor Portal is the web-based user interface that you can use to configure and manage all of the Replicated features for distributing and managing application releases, supporting your release, viewing customer insights and reporting, and managing teams.

The Vendor Portal can also be interacted with programmatically using the following developer tools:

* **Replicated CLI**: The Replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the Replicated CLI](/reference/replicated-cli-installing).

* **Vendor API v3**: The Vendor API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams and license files. For more information, see [Using the Vendor API v3](/reference/vendor-api-using).

## Commercial Software Distribution Lifecycle {#csdl}

Replicated Platform features are designed to support ISVs in each phase of the Commercial Software Distribution Lifecycle shown below:

![software distribution lifecycle wheel](/images/software-dev-lifecycle.png)

[View a larger version of this image](/images/software-dev-lifecycle.png)

Commercial software distribution is the business process that independent software vendors (ISVs) use to enable enterprise customers to self-host a fully private instance of the vendor's application in an environment controlled by the customer.

Replicated has developed the Commercial Software Distribution Lifecycle to represents the stages that are essential for every company that wants to deliver their software securely and reliably to customer controlled environments.

This lifecycle was inspired by the DevOps lifecycle and the Software Development Lifecycle (SDLC), but it focuses on the unique things that must be done to successfully distribute third party, commercial software to tens, hundreds, or thousands of enterprise customers.

For more information about to download a copy of The Commercial Software Distribution Handbook, see [The Commercial Software Distribution Handbook](https://www.replicated.com/the-commercial-software-distribution-handbook).

The following describes the phases of the software distribution lifecycle:

* **[Develop](#develop)**: Application design and architecture decisions align with customer needs, and development teams can quickly iterate on new features.
* **[Test](#test)**: Run automated tests in several customer-representative environments as part of continuous integration and continuous delivery (CI/CD) workflows.
* **[Release](#release)**: Use channels to share releases with external and internal users, publish release artifacts securely, and use consistent versioning.
* **[License](#license)**: Licenses are customized to each customer and are easy to issue, manage, and update.
* **[Install](#install)**: Provide unique installation options depending on customers' preferences and experience levels.
* **[Report](#report)**: Make more informed prioritization decisions by collecting usage and performance metadata for application instances running in customer environments.
* **[Support](#support)**: Diagnose and resolve support issues quickly.

For more information about the Replicated features that support each of these phases, see the sections below.

### Develop

The Replicated SDK exposes an in-cluster API that can be developed against to quickly integrate and test core functionality with an application. For example, when the SDK is installed alongside an application in a customer environment, the in-cluster API can be used to send custom metrics from the instance to the Replicated vendor platform. 

For more information about using the Replicated SDK, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

### Test

The Replicated Compatibility Matrix rapidly provisions ephemeral Kubernetes clusters, including multi-node and OpenShift clusters. When integrated into existing CI/CD pipelines for an application, the Compatibility Matrix can be used to automatically create a variety of customer-representative environments for testing code changes.

For more information, see [About Compatibility Matrix](/vendor/testing-about).

### Release

Release channels in the Replicated Vendor Portal allow ISVs to make different application versions available to different customers, without needing to maintain separate code bases. For example, a "Beta" channel can be used to share beta releases of an application with only a certain subset of customers. 

For more information about working with channels, see [About Channels and Releases](/vendor/releases-about).

Additionally, the Replicated proxy registry grants proxy access to private application images using the customers' license. This ensures that customers have the right access to images based on the channel they are assigned. For more information about using the proxy registry, see [About the Replicated Proxy Registry](/vendor/private-images-about).

### License

Create customers in the Replicated Vendor Portal to handle licensing for your application in both online and air gap environments. For example:
* License free trials and different tiers of product plans
* Create and manage custom license entitlements
* Verify license entitlements both before installation and during runtime
* Measure and report usage

For more information about working with customers and custom license fields, see [About Customers](/vendor/licenses-about).

### Install

Applications distributed with the Replicated Platform can support multiple different installation methods from the same application release, helping you to meet your customers where they are. For example:

* Customers who are not experienced with Kubernetes or who prefer to deploy to a dedicated cluster in their environment can install on a VM or bare metal server with the Replicated Embedded Cluster installer. For more information, see [Embedded Cluster Overview](/vendor/embedded-overview).
* Customers familiar with Kubernetes and Helm can install in their own existing cluster using Helm. For more information, see [Installing with Helm](/vendor/install-with-helm).
* Customers installing into environments with limited or no outbound internet access (often referred to as air-gapped environments) can securely access and push images to their own internal registry, then install using Helm or a Replicated installer. For more information, see [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap) and [Installing and Updating with Helm in Air Gap Environments (Alpha)](/vendor/helm-install-airgap).

### Report

When installed alongside an application, the Replicated SDK and Replicated KOTS automatically send instance data from the customer environment to the Replicated Vendor Portal. This instance data includes health and status indicators, adoption metrics, and performance metrics. For more information, see [About Instance and Event Data](/vendor/instance-insights-event-data).

ISVs can also set up email and Slack notifications to get alerted of important instance issues or performance trends. For more information, see [Configuring Instance Notifications](/vendor/instance-notifications-config).

### Support

Support teams can use Replicated features to more quickly diagnose and resolve application issues. For example:

- Customize and generate support bundles, which collect and analyze redacted information from the customer's cluster, environment, and application instance. See [About Preflights Checks and Support Bundles](/vendor/preflight-support-bundle-about).
- Provision customer-representative environments with Compatibility Matrix to recreate and diagnose issues. See [About Compatibility Matrix](/vendor/testing-about).
- Get insights into an instance's status by accessing telemetry data, which covers the health of the application, the current application version, and details about the infrastructure and cluster where the application is running. For more information, see [Customer Reporting](/vendor/customer-reporting). For more information, see [Customer Reporting](/vendor/customer-reporting).