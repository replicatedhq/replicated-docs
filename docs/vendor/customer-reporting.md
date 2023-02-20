# Customer Reporting

The **Customers > Reporting** page in the Replicated vendor portal displays details about each customer, including details about the active application instances associated with the customer.

For more information about the instance details displayed on the Reporting page, see [Instance Details](instance-insights-details).

The following shows an example of the Reporting page for a customer:

![Customer reporting page showing two active instances](/images/customer-reporting-page.png)

[View a larger version of this image](/images/customer-reporting-page.png)

As shown in the image above, the Customer Reporting page has the following sections:
* [Customer Details](#customer-details)
* [Time to Install](#time-to-install)
* [Download Portal](#download-portal)
* [Instances](#instances)

## Customer Details

The Customer Details section displays the following information about the customer:

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
  
In this section you can also view Helm install instructions for the customer and download the customer license.

## Time to Install

The Time to Install section displays _License time to install_ and _Instance time to install_ metrics if the customer has one or more application instances that have reached a Ready status at least one time:

* **License time to install**: The time between when you create the customer license in the vendor portal, and when the application instance reaches a Ready status in the customer environment.
* **Instance time to install**: The time between when the vendor portal records the first event for the application instance in the customer environment, and when the instance reaches a Ready status.

For more information about how to interpret these time to install metrics, see [Time to Install](instance-insights-details#time-to-install) in _Instance Details_.

A _Ready_ status indicates that all Kubernetes resources that you added as status informers for the application are Ready. For example, if you defined a Deployment resource as a status informer, then the Deployment resource is considered Ready when the number of Ready replicas equals the total desired number of replicas. For more information about how to configure status informers for your application, see [Displaying Application Status](admin-console-display-app-status).

If the customer has no application instances that have ever reported a Ready status, or if you have not configured status informers for your application, then the Time to Install section displays a **No Ready Instances** message.

If the customer has more than one application instance that has previously reported a Ready status, then the Time to Install section displays metrics for the instance that most recently reported a Ready status for the first time.

For example, Instance A reported its first Ready status at 9:00 AM today. Instance B reported its first Ready status at 8:00 AM today, moved to a Degraded status, then reported a Ready status again at 10:00 AM today. In this case, the vendor portal displays the time to install metrics for Instance A, which reported its _first_ Ready status most recently.

## Download Portal

From the Download Portal section, you can:
* Copy the URL of the download portal for the customer
* Generate a new password for the download portal. The customer uses this password to log in.
* Access the unique download portal for the customer

You can use the download portal to give your customers access to the files they need to install your application, such as their license file or air gap bundles. For more information, see [Sharing Files through the Download Portal](releases-sharing-license-install-script#download-portal).

## Instances

The Instances section displays details about the active application instances associated with the customer.

You can click any of the rows on the Instances section of the Reporting page to open the Instance details page. The Instance details page displays additional event data and computed metrics to help you understand the performance and status of each active application instance. For more information, see [Instance Details](instance-insights-details).

The Instances section displays the following details about each active instance:

* The first seven characters of the instance ID

* The status of the instance. Status is based on the status informers configured for the application. Possible statuses are Missing, Unavailable, Degraded, Ready, and Updating. For more information, see [Resource Statuses](admin-console-display-app-status#resource-statuses) in _Displaying Application Status_. 

* The application version

* Details about the cluster where the instance is installed, including:

   * The Kubernetes distribution for the cluster, if applicable
   * The Kubernetes version running in the cluster
   * Whether the instance is installed in a Kubernetes installer (kURL) cluster
   * (Kubernetes Installer Clusters Only) The number of nodes ready in the cluster

     The following shows an example of the Nodes field for an instance installed in a Kubernetes installer cluster:
     
     ![Instance with 1/1 nodes ready](/images/kurl-instance-row.png)

     [View a larger version of this image](/images/kurl-instance-row.png)

   * The app manager version running in the cluster
   * The cloud provider and region, if applicable

* Instance uptime data, including:

   * The timestamp of the last recorded check-in for the instance. A check-in is recorded when any of the following occur:
   
      <AppCheckin/>

   * An uptime graph of the previous two weeks. For more information about how the vendor portal determines uptime, see [Instance Uptime](https://docs.replicated.com/vendor/instance-insights-details#instance-uptime) in _Viewing Instance Details_.
   * The uptime ratio in the previous two weeks.
