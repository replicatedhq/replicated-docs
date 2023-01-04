# Monitoring Application Instances

This topic describes using the event data and key performance indicators (KPIs) in the Replicated vendor portal to monitor the health and performance of application instances installed in your customers' environments.

## About Instance Reporting

Each time an active application instance installed in an online environment checks for updates, the Replicated app manager sends a small amount of instance metadata to help help the update server build an appropriate list of available new versions for that instance. During this update check process, if any properties like app version or app status have changed,  an event is generated on the server side to record the state change.

The vendor portal uses this event data to provide insights about the health, status, and performance of the active application instances associated with each customer license. The vendor portal displays these insights on an **Instance details** dashboard. 

You can use the event data and insights on the **Instance details** page to more quickly troubleshoot issues with active instances, helping to reduce support burden. It becomes easy to quickly get answers to questions like:

1. Has the application experienced any performance degradation or downtime recently? How long has it been down?
1. Have any cluster or infrastructure changes occurred recently? Have nodes been lost or added? Has the underlying Kubernetes version changed?
1. Were any upgrades attempted recently? Which of them succeeded? Which version of the application is currently running?

 
   The **Instance details** page also provides business value metrics for each instance, such as the rate of successful upgrades, total uptime, and the time that it takes your customers to successfully deploy an instance of your application.

For more information about the event data and metrics displayed on the **Instance details** page, see [About the Instance Details Page](#about) below.
## Requirements and Limitations

Viewing instance data in the vendor portal has the following requirements and limitations:

* The **Instances details** page is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.
* Inactive instances are not included in instance data. An instance is considered inactive if **ADD INACTIVE DESCRIPTION**
* The vendor portal receives updated instance data only when the application instance checks for updates. By default, instances automatically check for updates every four hours. However, if users edit the frequency of automatic update checks, then the rate at which instance data is updated changes accordingly. Additionally, if users disable automatic update checks, then the rate at which instance data is updated depends on the frequency that users manually check for updates. 
* To view event data and insights related to instance uptime on the **Instances details** page, you must configure status informers for your application in the Application custom resource. For more information about how to configure status informers, see [Displaying Application Status](admin-console-display-app-status).
* Data in the **Instance Activity** stream is not cached. **NEED MORE INFO**

## About the Instance Details Page {#about}

Data for each active instance of your application is displayed in a dashboard on the **Instance details** page in the vendor portal. To access the **Instance details** page, go to **Customers** and click the **Customer reporting** button for the customer that you want to view. From the **Reporting** page for the selected customer, click the **View details** button for the desired application instance. 

The following screenshot shows an example of the **Instance details** page:

**UPDATE SCREENSHOT**

![Instance details full page](/images/instance-details.png)

[View a larger version of this image](/images/instance-details.png)

As shown in the screenshot above, the **Instance details** page includes the following sections:

* **Current State**: Displays information about the state of the instance, such as the current application version. See [Current State](#current-state) below.
* **Install Insights**: Displays KPIs related to health, performance, and adoption. See [Install Insights](#install-insights) below. 
* **Install Information**: Displays information about the cluster where the instance is installed, such as the version of Kubernetes running on the cluster and details about completed preflight checks. See [Install Information](#install-information) below.
* **Instance Uptime**: Displays granular details about instance uptime over time. See [Instance Uptime](#instance-uptime) below.
* **Instance Activity**: Streams all event data from the instance. See [Instance Activity](#instance-activity) below.

### Current State

The **Current State** section displays event data about the state of the instance at the time of the most recent update check.

**SCREENSHOT**

As shown in the screenshot above, the  **Current State** section includes the following fields:
* **App status**: The status computed based on an application's configured [Status Informers](/vendor/admin-console-display-app-status)
* **App version**: The version label of the currently running release, as set during [Release Promotion](/vendor/releases-creating-releases). If no version is set, the [release sequence](/vendor/releases-about#release-sequence-mechanics) will be used.
* **Version age**: The absolute and relative ages of the application instance:
  * **Absolute age**: `now - current_release.promoted_date`. The number of days since the current application version was promoted to the channel. For example, if the current application version is 1.0.0, and version 1.0.0 was promoted to the channel 30 days ago, then the absolute age is 30.
  * **Relative age (Days Behind Latest)**: `channel.latest_release.promoted_date - current_release.promoted_date`. The number of days between when the current application version was promoted to the channel and when the latest available version on the channel was promoted. For example, the current application version is 1.0.0 and the latest version available on the channel is 1.5.0. If 1.0.0 was promoted 30 days ago and 1.5.0 was promoted 10 days ago, then the relative age of the application instance is 20 days. 
* **Versions behind**: The number of versions between the current version and the latest version available on the channel where the instance is assigned. For example, if the current application version is 1.0.0, and the latest version available on the 
* **Last check-in**: The timestamp that the instance most recently checked for an update.

For more information about the event data in the **Current State** section, see [Application Installation and Upgrade Events](monitoring-event-data#install-upgrade) in _Event Data_. 

### Install Insights

The **Install Insights** section displays the following computed metrics:
* Time to Install
* Total Upgrades and Upgrade Success Rate
* Application Uptime 

#### Time to Install

The Time to Install metrics in the **Install Insights** section represent how quickly the customer was able to deploy the application to a Ready state in their environment.

Replicated recommends that you use Time to Install as a KPI of the quality of the packaging, configuration, and documentation of your application. If the installation process for your application is challenging, poorly documented, lacks appropriate preflight checks, or relies heavily on manual steps, then it can take days or weeks to deploy the application in customer environments. A longer Time to Install generally represents a significantly increased support burden and a degraded customer installation experience.

The vendor portal displays the following metrics that measure Time to Install:

* **Time to Install (License)**: The time between when you create the customer license in the vendor portal, and when the application instance `appStatus` field reports a `ready` state in the customer environment. Time to Install (License) represents the time that it takes for a customer to successfully deploy your application after you intend to distribute the application to the customer. Replicated uses the timestamp of when you create the customer license in the vendor portal to represent your intent to distribute the application to the customer because creating the license file for the customer is generally the final step before you share the installation materials with the customer.

   The following diagram demonstrates how the vendor portal computes the Time to Install (License) metric:
   
   ** **INSERT DIAGRAM** **

   As shown in the diagram above, Time to Install (License) includes several activities that are involved in deploying the application, including the customer receiving the necessary materials and documentation, downloading the assets, provisioning the required hardware, networking, external systems, completing the preflight checks, and finally installing, configuring, and deploying the application.

* **Time to Install (Instance)**: The time between when the vendor portal records the first event for the application instance in the customer environment, and when the instance `appStatus` field reports a `ready` state.

   The following diagram demonstrates the activities included and excluded in Time to Install (Instance):

   ** **INSERT DIAGRAM** **

   As shown in the diagram above, Time to Install (Instance) is the length of time that it takes for the application to reach a Ready state after the customer makes a successful deployment attempt in their environment. A deployment attempt is considered to be successful when the application instance reports its first event. Time to Install (Instance) does not include any deployment attempts that were unsuccessful. For example, Time to Live (Instance) does not include any time spent by the customer discarding servers and attempting to deploy the instance again on a new server.
#### Upgrades

​​The ease with which customers can upgrade their application instance is often an important factor in determining the quality of a delivered software package. If the process of upgrading is simple and straightforward, customers may be more likely to upgrade their software, which can help to ensure that they are using the most up-to-date version. On the other hand, if the process is complicated, error-prone, or time-consuming, customers may be less likely to upgrade, which can result in them using outdated or vulnerable versions of the software.

The vendor portal displays the following metrics to measure the ease of upgrading your application:

* **Number of Upgrades**: The vendor portal computes the total number of upgrades using the `appVersion` and `appStatus` events.

   TBD

* **Upgrade Success Rate**: The vendor portal calculates the upgrade success rate by dividing the number of successful upgrades by the total number of upgrades completed.
  
  The vendor portal considers an upgrade successful if _all_ of the following are true:     
    * There are no errors on the deployment of the new version. Depending on if the customer upgrades the instance using the app manager or the helm CLI, then the deployment command is either `kubectl apply` or `helm upgrade`.
    * The instance enters a Ready status in 15 minutes or less after the `kubectl apply` or `helm upgrade` command completes.
    * The instance does _not_ enter a Missing or Unavailable status in the first 15 minutes after the instance is no longer in an Updating status.


#### Uptime

The vendor portal computes the total uptime for the instance as the fraction of time that an application spends in a Ready, Updating, or Degraded state. High uptime indicates that the application is reliable and able to handle the demands of the customer environment, while low uptime might indicate that the application is prone to errors or failures. By measuring the total uptime of customer instances, you can better understand the performance of your application.

The vendor portal uses the status of the Kubernetes resources that you provide in the `statusInformers` field of the Application custom resource to determine the status of the application. For more information about how to configure status informers for your application, see [Displaying Application Status](admin-console-display-app-status).

The following table lists the application statuses that indicate whether the application is up or down:

<table>
  <tr>
    <th>Up</th>
    <td>Ready, Updating, Degraded</td>
  </tr>
  <tr>
    <th>Down</th>
    <td>Missing, Unavailable</td>
  </tr>
</table>

:::note
The vendor portal includes time spent in a Degraded state in the total uptime for an application instance because it is possible that a Degraded state is expected during upgrade.
:::

### Install Information

The **Install Information** section displays details about the cluster infrastructure where the application is installed, such as the version and distribution of Kubernetes running in the cluster where the application is installed. For applications that are installed in clusters provisioned by the Replicated Kubernetes installer, the **Install Information** section also provides details such as the number of nodes in the cluster and the node operating systems.

**SCREENSHOT**

As shown in the image above, the **Install Information** section displays the following data:

* Kubernetes Distribution
* Kubernetes Version
* KOTS version
* First Seen: The first event recorded by the instance.
* Datacenter (if detected)
* Datacenter region (if detected)
* (Kubernetes Installer Cluster Only) Node Operating System(s)
* (Kubernetes Installer Cluster Only) Node Operating System Version(s)
* (Kubernetes Installer Cluster Only) Cluster Nodes Total
* (Kubernetes Installer Cluster Only) Cluster Nodes Ready
* (Kubernetes Installer Cluster Only) Link to the kurl.sh Kubernetes Installer spec used

For more information about the cluster event data in the **Install Information** section, see [Cluster Status Events](monitoring-event-data) in _Event Data_.

### Instance Uptime

The Instance Uptime graph shows the percentage of each 8 hour time period in the previous two weeks that the instance was in an up, degraded, or down state. The vendor portal uses the status of the Kubernetes resources that you provide in the `statusInformers` field of the Application custom resource to determine the status of the application. For more information about how to configure status informers for your application, see [Displaying Application Status](admin-console-display-app-status).

The following table lists the application statuses that are associated with an up, degraded, or down state in the Instance Uptime graph:

<table>
  <tr>
    <th>Up</th>
    <td>Ready, Updating</td>
  </tr>
  <tr>
    <th>Degraded</th>
    <td>Degraded</td>
  </tr>
  <tr>
    <th>Down</th>
    <td>Missing, Unavailable, Inactive</td>
  </tr>
</table>

:::note
The vendor portal includes time spent in a Degraded state in the total uptime for an application instance. 
:::

The following shows an example of an Instance Uptime graph:

**INSERT SCREENSHOT**

You can hover over the bars in the Instance Uptime graph to view more detail about the percent of time that the instance was in each state during the given time period.

### Instance Activity

The **Instance Activity** section displays event data for the instance. The event data stream is updated each time an instance checks for updates. When an instance checks for updates, it reports details about the current app manager version, Kubernetes version, application version, and application status. 

By default, instances automatically check for updates every four hours. However, if users edit the frequency of automatic update checks, then the rate at which instance data is updated changes accordingly. Additionally, if users disable automatic update checks, then the rate at which instance data is updated depends on the frequency that users manually check for updates.

The following shows an example of the **Instance Activity** data stream:

**SCREENSHOT**

You can filter the **Instance Activity** stream by the following event categories:

* TBD
* TBD
* TBD

For more information about the event data displayed in the **Instance Activity** stream, see [Event Data](monitoring-event-data).