import Checkins from "../partials/instance-insights/_appCheckins.mdx"

# Instance Details

This topic describes using the Replicated vendor portal to quickly understand the recent events and performance of application instances installed in your customers' environments.

## About Instance Reporting {#about-reporting}

For active application instances installed in online customer environments, the Replicated app manager sends a small amount of instance data to the vendor portal when any of the following occur:

<Checkins/>

The instance data that the app manager sends includes properties such as the current application version and application status. The primary purpose of this instance data is to help the cloud-hosted update service to compile the list of new versions that are available to the given instance for upgrade. For a full overview of what might be included, please see the [Replicated Data Transmission Policy](https://docs.replicated.com/vendor/policies-data-transmission).

The vendor portal also uses this data to display insights about the active instances of your application. For more information about the instance data insights displayed in the vendor portal, see [About the Instance Details Page](#about-page) below.

## Requirements and Limitations

Instance data has the following requirements and limitations:

* You must configure one or more status informers for your application in the Application custom resource to populate instance data about the application status or uptime. For more information about how to configure status informers, see [Displaying Application Status](admin-console-display-app-status).

* Instance data is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.

* Instance data is available only for active application instances. If an instance is decommissioned, stops checking for updates, or otherwise stops reporting, the vendor portal continues to display data for the instance from its most-recently seen state.

  For example, this means that data for an inactive instance might continue to show a Ready status after the instance becomes inactive. Replicated recommends that you use the timestamp in the **Last Check-in** field to understand if an instance might have become inactive, causing its data to be out-of-date.

* The rate at which data is updated on the **Instances details** page varies depending on how often the vendor portal receives instance data from the app manager. The vendor portal receives instance data when any of the following occur:

  <Checkins/>

* The timestamp of events displayed on the **Instances details** page is the timestamp when the Replicated Vendor API received the instance data from the app manager. The timestamp of events does not necessarily reflect the timestamp of when the event occurred.

* For clusters launched with the Replicated Kubernetes Installer, the app manager stores the total nodes and ready nodes counts in a cache for five minutes. If the app manager sends instance data to the vendor portal within the five minute window, then the reported data for total nodes and ready nodes reflects the data in the cache. This means that events displayed on the **Instances details** page for the total nodes and ready nodes can show values that differ from the current values of these fields.

## About the Instance Details Page {#about-page}

The vendor portal provides insights about the health, status, and performance of the active application instances associated with each customer license on the **Instance details** page. You can use the insights on the **Instance details** page to more quickly troubleshoot issues with your customers' active instances, helping to reduce support burden. 

For example, you can use the **Instance details** page to track the following events for each instance:

* Recent performance degradation or downtime
* Length of instance downtime
* Recent changes to the cluster or infrastructure
* Changes in the number of nodes, such as nodes lost or added
* Changes in the cluster's Kubernetes version
* Changes in the application version that the instance is running

To access the **Instance details** page, go to **Customers** and click the **Customer reporting** button for the customer that you want to view:

![Customer reporting button on the Customers page](/images/customer-reporting-button.png)

From the **Reporting** page for the selected customer, click the **View details** button for the desired application instance.

The following shows an example of the **Instance details** page:

![Instance details full page](/images/instance-details.png)

[View a larger version of this image](/images/instance-details.png)

As shown in the image above, the **Instance details** page includes the following sections:

* **Current State**: Information about the state of the instance, such as the current application version. See [Current State](#current-state) below.
* **Insights**: Key performance indicators (KPIs) related to health, performance, and adoption. See [Insights](#insights) below. 
* **Instance Information**: Information about the cluster where the instance is installed, such as the version of Kubernetes running on the cluster. See [Instance Information](#install-information) below.
* **Instance Uptime**: Details about instance uptime over time. See [Instance Uptime](#instance-uptime) below.
* **Instance Activity**: Event data stream. See [Instance Activity](#instance-activity) below.

### Current State

The **Current State** section displays the following event data about the status and version of the instance:

* **App status**: The status of the application. Possible statuses are Ready, Updating, Degraded, Unavailable, and Missing. The app manager computes the application status based on the status informers that you configure for the application. For more information about how to configure status informers, see [Displaying Application Status](/vendor/admin-console-display-app-status).

* **App version**: The version label of the currently running release. You define the version label when you promote the release to a channel in the vendor portal. For more information about how to create version labels, see [Creating and Promoting Releases](releases-creating-releases).

   If there is no version label for the release, then the vendor portal displays the release sequence in the **App version** field. You can find the sequence number associated with a release by running the `replicated release ls` command. See [release ls](/reference/replicated-cli-release-ls) in the _replicated CLI_ documentation.

* **Version age**: The absolute and relative ages of the instance:

  * **Absolute age**: `now - current_release.promoted_date`
  
     The number of days since the currently running application version was promoted to the channel. For example, if the instance is currently running version 1.0.0, and version 1.0.0 was promoted to the channel 30 days ago, then the absolute age is 30.

  * **Relative age (Days Behind Latest)**: `channel.latest_release.promoted_date - current_release.promoted_date`
  
     The number of days between when the currently running application version was promoted to the channel and when the latest available version on the channel was promoted.
     
     For example, the instance is currently running version 1.0.0, which was promoted to the Stable channel. The latest version available on the Stable channel is 1.5.0. If 1.0.0 was promoted 30 days ago and 1.5.0 was promoted 10 days ago, then the relative age of the application instance is 20 days. 

* **Versions behind**: The number of versions between the currently running version and the latest version available on the channel where the instance is assigned.

   For example, the instance is currently running version 1.0.0, which was promoted to the Stable channel. If the later versions 1.1.0, 1.2.0, 1.3.0, 1.4.0, and 1.5.0 were also promoted to the Stable channel, then the instance is five versions behind.

* **Last check-in**: The timestamp when the app manager most recently sent instance data  to the vendor portal. The vendor portal receives instance data from the app manager when any of the following occur:

  <Checkins/>

### Insights

The **Insights** section includes the following metrics computed by the vendor portal:

* [Uptime](#uptime)
* [Time to Install](#time-to-install)

#### Uptime

The vendor portal computes the total uptime for the instance as the fraction of time that the instance spends with a Ready, Updating, or Degraded status. The vendor portal also provides more granular details about uptime in the **Instance Uptime** graph. See [Instance Uptime](#instance-uptime) below.

High uptime indicates that the application is reliable and able to handle the demands of the customer environment. Low uptime might indicate that the application is prone to errors or failures. By measuring the total uptime, you can better understand the performance of your application.

The following table lists the application statuses that are associated with an Up or Down state in the total uptime calculation:

<table>
  <tr>
    <th>Uptime State</th>
    <th>Application Statuses</th>
  </tr>
  <tr>
    <td>Up</td>
    <td>Ready, Updating, or Degraded</td>
  </tr>
  <tr>
    <td>Down</td>
    <td>Missing or Unavailable</td>
  </tr>
</table>

:::note
The vendor portal includes time spent in a Degraded status in the total uptime for an instance because an app may still be capable of serving traffic when some subset of desired replicas are available. Further, it is possible that a Degraded state is expected during upgrade.
:::

#### Time to Install

The vendor portal computes both _License time to install_ and _Instance time to install_ metrics to represent how quickly the customer was able to deploy the application to a Ready state in their environment.

Replicated recommends that you use Time to Install as an indicator of the quality of the packaging, configuration, and documentation of your application.

If the installation process for your application is challenging, poorly documented, lacks appropriate preflight checks, or relies heavily on manual steps, then it can take days or weeks to deploy the application in customer environments. A longer Time to Install generally represents a significantly increased support burden and a degraded customer installation experience.

The following describes the _License time to install_ and _Instance time to install_ metrics:

* **License time to install**: The time between when you create the customer license in the vendor portal, and when the application instance reaches a Ready status in the customer environment.

   License time to install represents the time that it takes for a customer to successfully deploy your application after you intend to distribute the application to the customer. Replicated uses the timestamp of when you create the customer license in the vendor portal to represent your intent to distribute the application because creating the license file is generally the final step before you share the installation materials with the customer.

   License time to install includes several activities that are involved in deploying the application, including the customer receiving the necessary materials and documentation, downloading the assets, provisioning the required hardware, networking, external systems, completing the preflight checks, and finally installing, configuring, and deploying the application.

* **Instance time to install**: The time between when the vendor portal records the first event for the application instance in the customer environment, and when the instance reaches a Ready status.

   Instance time to install is the length of time that it takes for the application to reach a Ready state after the customer starts a deployment attempt in their environment. Replicated considers a deployment attempt started when the vendor portal first records an event for the instance.
   
   For more information about how the vendor portal generates events, see [About Events](instance-insights-event-data#about-events) in _Event Data_.
   
  :::note
  Instance time to install does _not_ include any deployment attempts that a customer might have made that did not generate an event. For example, time spent by the customer discarding the server used in a failed attempt before attempting to deploy the instance again on a new server.
  :::

### Instance Information

The **Instance Information** section displays the following details about the cluster infrastructure where the application is installed:

* The Kubernetes distribution for the cluster. For example, GKE or EKS.
* The version of Kubernetes running in the cluster.
* The Replicated app manager (KOTS) version installed in the cluster.
* For **First Seen**, the timestamp of the first event that the vendor portal generated for the instance. For more information about how the vendor portal generates events, see [About Events](instance-insights-event-data#about-events) in _Event Data_.
* If detected, the cloud provider and region where the cluster is running. For example, `GCP: us-central1`.

In addition to the details listed above, the **Instance Information** section also displays the following for clusters provisioned by the Replicated Kubernetes installer:
* Node operating systems
* Node operating systems versions
* Total number of cluster nodes
* Number of cluster nodes in a Ready state
* ID of the Kubernetes installer specification

For more information about the data fields displayed in the **Instance Information** section, see [Cluster Status Events](instance-insights-event-data#cluster) and [Infrastructure Status Events](instance-insights-event-data#infrastructure) in _Event Data_.

### Instance Uptime

The **Instance Uptime** graph shows the percentage of a given time period that the instance was in an Up, Degraded, or Down state. 

To determine if the instance is Up, Degraded, or Down, the vendor portal uses the application status. Possible application statuses are Ready, Updating, Degraded, Unavailable, and Missing. The following table lists the application statuses that are associated with each state in the **Instance Uptime** graph:

<table>
  <tr>
    <th>Uptime State</th>
    <th>Application Statuses</th>
  </tr>
  <tr>
    <td>Up</td>
    <td>Ready or Updating</td>
  </tr>
  <tr>
    <td>Degraded</td>
    <td>Degraded</td>
  </tr>
  <tr>
    <td>Down</td>
    <td>Missing or Unavailable</td>
  </tr>
</table>

The following shows an example of an **Instance Uptime** graph:

![Uptime Graph on the Instance details page](/images/instance-uptime-graph.png)

You can hover over the bars in the **Instance Uptime** graph to view more detail about the percent of time that the instance was in each state during the given time period.

![Uptime Graph with event markers on the Instance details page](/images/instance-uptime-graph-event-markers.png)

You can hover over the event markers in the **Instance Uptime** graph to view more detail about the events that occurred during that given interval on the graph. If more than two events occurred in that period, the event marker displays the number of events that occurred during that period. If you click the event marker or the event in the tooltip, the **Instance Activity** section highlights the event or the first event in the group.

### Instance Activity

The **Instance Activity** section displays recent events for the instance. The data stream is updated each time one of the following occurs:

<Checkins/>

The timestamp of events displayed in the **Instance Activity** stream is the timestamp when the Replicated Vendor API received the instance data from the app manager. The timestamp of events does not necessarily reflect the timestamp of when the event occurred.

The following shows an example of the **Instance Activity** data stream:

![Instance Activity section of Instance details page](/images/instance-activity.png)

You can filter the **Instance Activity** stream by the following event categories:

* Cluster status
* Upstream update
* App status
* App install/upgrade
* KOTS status
* Infrastructure status

For more information about the types of events displayed in the **Instance Activity** stream, see [Event Data](instance-insights-event-data).
