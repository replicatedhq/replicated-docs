# Customer Reporting

This topic describes the customer and instance data displayed in the **Customers > Reporting** page of the Replicated Vendor Portal.

## About the Customer Reporting Page {#reporting-page}

The **Customers > Reporting** page displays data about the active application instances associated with each customer. The following shows an example of the **Reporting** page:

![Customer reporting page showing two active instances](/images/customer-reporting-page.png)

[View a larger version of this image](/images/customer-reporting-page.png)

As shown in the image above, the **Reporting** page has the following main sections:
* [Manage Customer](#manage-customer)
* [Time to Install](#time-to-install)
* [Download Portal](#download-portal)
* [Enterprise Portal](#enterprise-portal-alpha)
* [Instances](#instances)
* [Install Attempts](#install-attempts-alpha)

### Manage Customer

The manage customer section displays the following information about the customer:

* The customer name
* The channel the customer is assigned
* Details about the customer license:
  * The license type
  * The date the license was created
  * The expiration date of the license
* The features the customer has enabled, including:
  * GitOps
  * Air gap
  * Identity
  * Snapshots
  
In this section, you can also view the Helm CLI installation instructions for the customer and download the customer license.

### Time to Install

If the customer has one or more application instances that have reached a Ready status at least one time, then the **Time to install** section displays _License time to install_ and _Instance time to install_ metrics:

* **License time to install**: The time between when you create the customer license in the Vendor Portal, and when the application instance reaches a Ready status in the customer environment.
* **Instance time to install**: The time between when the Vendor Portal records the first event for the application instance in the customer environment, and when the instance reaches a Ready status.

A _Ready_ status indicates that all Kubernetes resources for the application are Ready. For example, a Deployment resource is considered Ready when the number of Ready replicas equals the total desired number of replicas. For more information, see [Enabling and Understanding Application Status](insights-app-status).

If the customer has no application instances that have ever reported a Ready status, or if you have not configured your application to deliver status data to the Vendor Portal, then the **Time to install** section displays a **No Ready Instances** message.

If the customer has more than one application instance that has previously reported a Ready status, then the **Time to install** section displays metrics for the instance that most recently reported a Ready status for the first time.

For example, Instance A reported its first Ready status at 9:00 AM today. Instance B reported its first Ready status at 8:00 AM today, moved to a Degraded status, then reported a Ready status again at 10:00 AM today. In this case, the Vendor Portal displays the time to install metrics for Instance A, which reported its _first_ Ready status most recently.

For more information about how to interpret the time to install metrics, see [Time to Install](instance-insights-details#time-to-install) in _Instance Details_.

### Download Portal

:::note
If the Replicated Enterprise Portal is enabled for the customer, then an **Enterprise Portal** section is displayed instead of the **Download Portal** section. For more information, see [Enterprise Portal](#enterprise-portal) below.
:::

From the **Download portal** section, you can:
* Manage the password for the Download Portal
* Access the unique Download Portal URL for the customer

You can use the Download Portal to give your customers access to the files they need to install your application, such as their license file or air gap bundles. For more information, see [Access a Customer's Download Portal](releases-share-download-portal).

### Enterprise Portal (Alpha)

:::note
The **Enterprise Portal** section is available only for customers with the Enterprise Portal enabled. For more information about how to enable the Enterprise Portal for a customer, see [Manage Enterprise Portal Access](/vendor/enterprise-portal-invite).
:::

The following shows an example of the **Enterprise Portal** section:

![Enterprise Portal section of customer reporting page](/images/customer-reporting-enterprise-portal.png)

[View a larger version of this image](/images/customer-reporting-enterprise-portal.png)

From the **Enterprise Portal** section, you can:
* Click **View** to access the unique Enterprise Portal for the customer
* View the status of the customer's access to the Enterprise Portal
* View the timestamp when the Enterprise Portal was most recently accessed by the customer
* View the number of users with Enterprise Portal accounts
* Click **Invite user** to invite a new user to the Enterprise Portal
* View the number of install attempts made by the customer. The **Customer Reporting > Install Attempts** section includes additional details about install attempts. For more information, see [Install Attempts](#install-attempts) below.
* View the number of service accounts created in the Enterprise Portal
* View the number of support bundles uploaded to the Enterprise Portal

For more information about the Enterprise Portal, see [About the Enterprise Portal](/vendor/enterprise-portal-about).

### Instances

The **Instances** section displays details about the active application instances associated with the customer.

You can click any of the rows in the **Instances** section to open the **Instance details** page. The **Instance details** page displays additional event data and computed metrics to help you understand the performance and status of each active application instance. For more information, see [Instance Details](instance-insights-details).

The following shows an example of a row for an active instance in the **Instances** section:

![Row in the Instances section](/images/instance-row.png)
[View a larger version of this image](/images/instance-row.png)

The **Instances** section displays the following details about each active instance:
* The first seven characters of the instance ID.
* The status of the instance. Possible statuses are Missing, Unavailable, Degraded, Ready, and Updating. For more information, see [Enabling and Understanding Application Status](insights-app-status).
* The application version.
* Details about the cluster where the instance is installed, including:
   * The Kubernetes distribution for the cluster, if applicable.
   * The Kubernetes version running in the cluster.
   * Whether the instance is installed in a Replicated kURL cluster.
   * (kURL Clusters Only) The number of nodes ready in the cluster.
   * (KOTS Only) The KOTS version running in the cluster.
   * The Replicated SDK version running in the cluster.
   * The cloud provider and region, if applicable.
* Instance uptime data, including:
   * The timestamp of the last recorded check-in for the instance. For more information about what triggers an instance check-in, see [How the Vendor Portal Collects Instance Data](instance-insights-event-data#about-reporting) in _About Instance and Event Data_.
   * An uptime graph of the previous two weeks. For more information about how the Vendor Portal determines uptime, see [Instance Uptime](instance-insights-details#instance-uptime) in _Instance Details_.
   * The uptime ratio in the previous two weeks.

### Install Attempts (Alpha)

:::note
The **Install Attempts** section is available only for customers with the Replicated Enterprise Portal enabled. For more information about how to enable the Enterprise Portal for a customer, see [Manage Enterprise Portal Access](/vendor/enterprise-portal-invite).
:::

The **Install Attempts** section includes details about the installation attempts made by users. These insights are based on the customer's activity in the Enterprise Portal.

To track install attempts, the Enterprise Portal creates a unique, _just-in-time_ service account that sends data back to the Vendor Portal when the user starts and completes the installation or takes other actions that are specific to the installation type. These service accounts also provide realtime feedback to the user on their installation progress using checkboxes and status indicators, and allow users to pause and return to an installation attempt. 

The following shows an example of the **Install Attempts** section:

<img alt="Install attempts section of customer reporting page" src="/images/customer-reporting-install-attempts-expanded.png" width="700px"/>

[View a larger version of this image](/images/customer-reporting-install-attempts-expanded.png)

The **Install Attempts** section includes the following details about each installation attempt:
* The installation status (succeeded, stalled, or failed)
* The date and time when the installation attempt was started
* The email address of the user that initiated the installation attempt
* Installation environment details:
  * **OS** or **K8s**: The operating system of the VM or bare metal server. Or, the distribution of Kubernetes running in the installation environment.
  * **Mode**: If the installation is online (internet-connected) or air gap (offline).
  * **Registry**: If the image registry used is online (accessed over the internet) or offline (a local registry is used). For air gap installations, the registry is always offline. Users can also optionally use a local image registry in online installations.
* Installation progress details, including when the installation was started and completed as well as other progress indicators that are specific to the installation type. For example:
  * For installations with Helm, the Enterprise Portal reports when your image registry was accessed and when application images were pulled, as shown below:
    ![Helm install attempt progress details](/images/customer-reporting-install-attempts-helm.png)  
    [View a larger version of this image](/images/customer-reporting-install-attempts-helm.png) 
  * For installations with Replicated Embedded Cluster on VMs or bare metal servers, the Enterprise Portal reports when the installation assets were downloaded, as shown below:
    ![VM-based install attempt progress details](/images/customer-reporting-install-attempts-vm.png)  
    [View a larger version of this image](/images/customer-reporting-install-attempts-vm.png)   