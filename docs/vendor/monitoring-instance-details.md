import Checkins from "../partials/instance-monitoring/_appCheckins.mdx"

# Monitoring Application Instances

This topic describes using the event data and key performance indicators (KPIs) in the Replicated vendor portal to monitor the health and performance of application instances installed in your customers' environments.

## About Instance Reporting {#about-reporting}

For active application instances installed in online customer environments, the Replicated app manager sends a small amount of instance metadata to the vendor portal when any of the following occur:

<Checkins/>

The instance data that the app manager sends includes properties such as the current application version and application status. The primary purpose of this instance data is to compile the list of new versions that are available to the given instance for upgrade.

The vendor portal also uses this data to display insights about your active application instances. For more information about the event data and metrics displayed in the vendor portal, see [About the Instance Details Page](#about-page) below.

## Requirements and Limitations

Instance data has the following requirements and limitations:

* Instance data is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.

* Inactive instances are not included in instance data. An instance is considered inactive if **ADD INACTIVE DESCRIPTION**

* The rate at which data is updated on the **Instances details** page varies depending on how often the vendor portal receives instance data from the app manager. The vendor portal receives instance data when any of the following occur:

  <Checkins/>

* To view data that uses the application status property, you must configure status informers for your application in the Application custom resource. For more information about how to configure status informers, see [Displaying Application Status](admin-console-display-app-status).

* Data in the **Instance Activity** stream is not cached. **NEED MORE INFO**

## About the Instance Details Page {#about-page}

The vendor portal provides insights about the health, status, and performance of the active application instances associated with each customer license on an **Instance details** dashboard. You can use the insights on the **Instance details** page to more quickly troubleshoot issues with your customers' active instances, helping to reduce support burden. 

For example, you can use the **Instance details** page to track the following events in each instance:

* Recent performance degradation or downtime
* Length of instance downtime
* Recent changes to the cluster or infrastructure
* Changes in the number of nodes, such as nodes lost or added
* Changes in the underlying Kubernetes version
* Recent upgrade attempts, including which upgrade attempts were successful
* The application version that the instance is running

To access the **Instance details** page, go to **Customers** and click the **Customer reporting** button for the customer that you want to view. From the **Reporting** page for the selected customer, click the **View details** button for the desired application instance. 

The following shows the **View details** button on the **Reporting** page:

**SCREENSHOT**

The following shows an example of the **Instance details** page:

**UPDATE SCREENSHOT**

![Instance details full page](/images/instance-details.png)

[View a larger version of this image](/images/instance-details.png)

As shown in the image above, the **Instance details** page includes the following sections:

* **Current State**: Displays information about the state of the instance, such as the current application version. See [Current State](#current-state) below.
* **Insights**: Displays KPIs related to health, performance, and adoption. See [Insights](#insights) below. 
* **Install Information**: Displays information about the cluster where the instance is installed, such as the version of Kubernetes running on the cluster and details about completed preflight checks. See [Install Information](#install-information) below.
* **Instance Uptime**: Displays granular details about instance uptime over time. See [Instance Uptime](#instance-uptime) below.
* **Instance Activity**: Streams all event data from the instance. See [Instance Activity](#instance-activity) below.

### Current State

The **Current State** section displays event data about the state of the instance.

**SCREENSHOT**

As shown in the image above, the **Current State** section includes the following fields:

* **App status**: The status of the application. Possible statuses are Ready, Updating, Degraded, Unavailable, and Missing. The app manager computes the application status based on the status informers that you configure for the application. For more information about how to configure status informers, see [Displaying Application Status](/vendor/admin-console-display-app-status).

* **App version**: The version label of the currently running release. You define the version label when you promote the release to a channel in the vendor portal. For more information about how to create version labels, see [Creating and Promoting Releases](releases-creating-releases).

   If there is no version label for the release, then the vendor portal displays the release sequence in the **App version** field. You can find the sequence number associated with a release by running the `replicated release ls` command. See [release ls](/reference/replicated-cli-release-ls).

* **Version age**: The absolute and relative ages of the application instance:

  * **Absolute age**: The number of days since the currently running application version was promoted to the channel. For example, if the instance is currently running version 1.0.0, and version 1.0.0 was promoted to the channel 30 days ago, then the absolute age is 30.

    Absolute age is calculated as `now - current_release.promoted_date`.

  * **Relative age (Days Behind Latest)**: The number of days between when the currently running application version was promoted to the channel and when the latest available version on the channel was promoted. For example, the instance is currently running version 1.0.0, which was promoted to the Stable channel. The latest version available on the Stable channel is 1.5.0. If 1.0.0 was promoted 30 days ago and 1.5.0 was promoted 10 days ago, then the relative age of the application instance is 20 days. 

     Absolute age is calculated as `channel.latest_release.promoted_date - current_release.promoted_date`.

* **Versions behind**: The number of versions between the currently running version and the latest version available on the channel where the instance is assigned. For example, the instance is currently running version 1.0.0, which was promoted to the Stable channel. If the later versions 1.1.0, 1.2.0, 1.3.0, 1.4.0, and 1.5.0 were also promoted to the Stable channel, then the instance is five versions behind.

* **Last check-in**: The timestamp when the app manager most recently sent instance metadata to the vendor portal. The vendor portal receives instance data from the app manager when any of the following occur:

  <Checkins/>

### Insights

The **Insights** section includes the following metrics computed by the vendor portal to provide key performance indicators (KPIs) about your application:

* [Uptime](#uptime)
* [Time to Install](#time-to-install)

#### Uptime

The vendor portal computes the total uptime for the instance as the fraction of time that the instance spends with a Ready, Updating, or Degraded status. The vendor portal includes time spent in a Degraded status in the total uptime for an instance because it is possible that a Degraded state is expected during upgrade.

High uptime indicates that the application is reliable and able to handle the demands of the customer environment, while low uptime might indicate that the application is prone to errors or failures. By measuring the total uptime, you can better understand the performance of your application.

The following table lists the application statuses that are associated with an Up or Down state in the total uptime calculation:

<table>
  <tr>
    <th>State</th>
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

The app manager computes the application status property based on the status informers that you configure for your application. For more information about how to configure status informers, see [Displaying Application Status](/vendor/admin-console-display-app-status).


#### Time to Install

The vendor portal computes two Time to Install metrics that represent how quickly the customer was able to deploy the application to a Ready state in their environment.

Replicated recommends that you use Time to Install as an indicator of the quality of the packaging, configuration, and documentation of your application. If the installation process for your application is challenging, poorly documented, lacks appropriate preflight checks, or relies heavily on manual steps, then it can take days or weeks to deploy the application in customer environments. A longer Time to Install generally represents a significantly increased support burden and a degraded customer installation experience.

The following describes the Time to Install metrics:

* **License time to install**: The time between when you create the customer license in the vendor portal, and when the application instance reaches a Ready status in the customer environment. License time to install represents the time that it takes for a customer to successfully deploy your application after you intend to distribute the application to the customer. Replicated uses the timestamp of when you create the customer license in the vendor portal to represent your intent to distribute the application to the customer because creating the license file for the customer is generally the final step before you share the installation materials with the customer.

   The following diagram demonstrates how the vendor portal computes the License time to install metric:
   
   ** **INSERT DIAGRAM** **

   As shown in the diagram above, License time to install includes several activities that are involved in deploying the application, including the customer receiving the necessary materials and documentation, downloading the assets, provisioning the required hardware, networking, external systems, completing the preflight checks, and finally installing, configuring, and deploying the application.

* **Instance time to install**: The time between when the vendor portal records the first event for the application instance in the customer environment, and when the instance reaches a Ready status.

   The following diagram demonstrates the activities included and excluded in Instance time to install:

   ** **INSERT DIAGRAM** **

   As shown in the diagram above, Instance time to install is the length of time that it takes for the application to reach a Ready state after the customer starts a deployment attempt in their environment. A deployment attempt is considered to be started when the vendor portal first records an event for the application instance. An _event_ is any change in the properties for an instance. For example, as part of a deployment attempt, the application status property might change to Unavailable.
   
  :::note
  Instance time to install does not include any deployment attempts that a customer might have made that did not produce an event. For example, Time to Live (Instance) does not include any time spent by the customer discarding servers and attempting to deploy the instance again on a new server.
  :::

### Install Information

The **Install Information** section displays details about the cluster infrastructure where the application is installed, such as the version and distribution of Kubernetes running in the cluster where the application is installed.

**SCREENSHOT**

As shown in the image above, the **Install Information** section displays the following fields:

* **Kubernetes Distribution**: 
* **Kubernetes Version**:
* **KOTS version**:
* **First Seen**: The timestamp of the first event that the vendor portal generated for the instance.
* **Datacenter**:  (if detected)
* **Datacenter region**:  (if detected)

In addition to the fields listed above, the **Install Information** section also displays the following fields for Kubernetes installer clusters:
* **Node Operating System(s)**:
* **Node Operating System Version(s)**:
* **Cluster Nodes Total**:
* **Cluster Nodes Ready**:
* **Kubernetes installer specification**: A link to the Kubernetes installer manifest file used the provision the cluster.

For more information about the cluster event data in the **Install Information** section, see [Cluster Status Events](monitoring-event-data) in _Event Data_.

### Instance Uptime

The **Instance Uptime** graph shows the percentage of each eight hour time period in the previous two weeks that the instance was in an Up, Degraded, or Down state. 

The vendor portal uses the application status property to determine if the instance is Up, Degraded, or Down. Possible application statuses are Ready, Updating, Degraded, Unavailable, and Missing. The following table lists the application statuses that are associated with each state in the **Instance Uptime** graph:

<table>
  <tr>
    <th>State</th>
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

The app manager computes the application status property based on the status informers that you configure for your application. For more information about how to configure status informers, see [Displaying Application Status](/vendor/admin-console-display-app-status).

The following shows an example of an **Instance Uptime** graph:

**INSERT SCREENSHOT**

You can hover over the bars in the **Instance Uptime** graph to view more detail about the percent of time that the instance was in each state during the given time period.

### Instance Activity

The **Instance Activity** section displays recent events for the instance. The data stream is updated each time one of the following occurs:

<Checkins/>

The following shows an example of the **Instance Activity** data stream:

**SCREENSHOT**

You can filter the **Instance Activity** stream by the following event categories:

* Cluster status
* Upstream update
* App status
* App install/upgrade
* KOTS status
* Infrastructure status

For more information about the event data displayed in the **Instance Activity** stream, see [Event Data](monitoring-event-data).