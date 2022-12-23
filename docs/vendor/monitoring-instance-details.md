# Monitoring Application Instances

This topic describes using the event data and key performance indicators (KPIs) in the Replicated vendor portal to monitor the health and performance of active application instances.

## Overview of Instance Reporting

Each time an active application instance in an online environment checks for updates, the Replicated app manager sends event data to the vendor portal with the status of the application and of the infrastructure where the application is installed.

The vendor portal uses this event data to provide insights about the health, status, and performance of the active application instances associated with each customer license. The vendor portal displays these insights on **Instance details** dashboards. 

You can use the event data and insights on the **Instance details** page to more quickly troubleshoot issues with active instances, helping to reduce support burden. The **Instance details** page also provides business value metrics for each instance, such as the rate of successful upgrades, total uptime, and the    drive improvement in these key business value metrics.

measuring the ease of use and success of your installer.


## Limitations

Instance data in the vendor portal has the following limitations:

* The **Instances details** page is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.
* Inactive instances are not included in instance data. An instance is considered inactive if ** **[ADD INACTIVE DESCRIPTION]** ** 
* The vendor portal receives updated instance data only when the application instance checks for updates. By default, instances automatically check for updates every four hours. However, if users disable automatic update checks, then the rate at which instance data is updated depends on the frequency that users manually check for updates. 

## About the Instance Details Page

Instance data is displayed in a dashboard on the **Instance details** page in the vendor portal. To access the **Instance details** page, go to **Customers** and click the **Customer reporting** button for the customer that you want to view. From the **Reporting** page for the selected customer, click the **View details** button for the desired application instance. 

The data displayed on the **Instance details** page is the most recent data available based on the last time that the instance checked for an update.

The following screenshot shows an example of the **Instance details** page:

** **UPDATE SCREENSHOT** **

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

### Install Insights

The **Install Insights** section displays computed metrics that .

#### Time to Live

The Time to Live metric in the Install Insights section represents how quickly the customer was able to deploy the application to a Ready state in their environment.

Replicated recommends that you use Time to Live as a KPI of the quality of the packaging, configuration, and documentation of your application. If the installation process for your application is cumbersome, poorly documented, lacks appropriate preflight checks, or relies heavily on manual steps, then it can take days or weeks to deploy the application in customer environments. This generally represents a significantly increased support burden and a degraded customer installation experience.

The vendor portal displays the following metrics that measure Time to Live:

* **Time to Live (License)**: The time between when you create the customer license in the vendor portal, and when the application instance `appStatus` field reports a `ready` state in the customer environment. Time to Live (License) represents the time that it takes for a customer to successfully deploy your application after you intend to distribute the application to the customer. Replicated uses the timestamp of when you create the customer license in the vendor portal to represent your intent to distribute the application to the customer because creating the license file for the customer is generally the final step before you share the installation materials with the customer.

   The following diagram demonstrates how the vendor portal computes the Time to Live (License) metric:
   
   ** **DIAGRAM** **

   As shown in the diagram above, Time to Live (License) includes several activities that are involved in deploying the application, including the customer receiving the necessary materials and documentation, downloading the assets, provisioning the required hardware, networking, external systems, completing the preflight checks, and finally installing, configuring, and deploying the application.

* **Time to Live (Instance)**: The time between when the vendor portal records the first event for the application instance in the customer environment, and when the instance `appStatus` field reports a `ready` state.

   The following diagram demonstrates the activities included and excluded in Time to Live (Instance):

   ** **DIAGRAM** **

   As shown in the diagram above, Time to Live (Instance) is the length of time that it takes for the application to reach a Ready state after the customer makes a successful deployment attempt in their environment. A deployment attempt is considered to be successful when the application instance reports its first event. Time to Live (Instance) does not include any deployment attempts that were unsuccessful. For example, Time to Live (Instance) does not include any time spent by the customer discarding servers and attempting to deploy the instance again on a new server.
#### Upgrades

​​The ease with which customers can discover and execute new upgrades can be an important factor in determining the quality of a delivered software package. If the process of upgrading is simple and straightforward, customers may be more likely to upgrade their software, which can help to ensure that they are using the most up-to-date version. On the other hand, if the process is complicated, error-prone, or time-consuming, customers may be less likely to upgrade, which can result in them using outdated or vulnerable versions of the software.

* **Upgrade Success Rate**: The vendor portal calculates the Upgrade Success Rate by dividing the number of successful upgrades by the total number of upgrades completed.
  
  The vendor portal considers an upgrade successful if _all_ of the following are true:     
    * There are no errors on the deployment of the new version. Depending on if the customer upgrades the instance using the app manager or the helm CLI, then the deployment command is either `kubectl apply` or `helm upgrade`.
    * The instance enters a Ready status in 15 minutes or less after the `kubectl apply` or `helm upgrade` command completes.
    * The instance does _not_ enter a Missing or Unavailable status in the first 15 minutes after the instance is no longer in an Updating status.
* **Number of Upgrades**: The vendor portal computes the total number of upgrades using the `appVersion` and `appStatus` events.

   TBD

#### Uptime

The vendor portal computes the total Uptime for the instance as the fraction of time that an application spends in a Ready, Updating, or Degraded state. High uptime indicates that the application is reliable and able to handle the demands of the customer environment, while low uptime might indicate that the software is prone to errors or failures. By measuring the total uptime of customer instances, you can better understand the performance of your application. This can indicate if it is necessary to improve the reliability and stability of the application.

The vendor portal classifies the application as either up or down using the following statuses:

<table>
  <tr>
    <th>Up</th>
    <td>Ready, Updating, Degraded</td>
  </tr>
  <tr>
    <th>Down</th>
    <td>Missing, Unavailable, Inactive</td>
  </tr>
</table>

Degraded is considered uptime because it is possible that a Degraded status is expected during an update, depending on the rollout strategy used.

If you configured StatusInformers for multiple application workloads, then the application uses the least available workload status. For example, if at least one workload reports Unavailable, then the application is Unavailable. Or, if all workloads are Ready, then one workload changes to Degraded, the aggregate application status also changes from Ready to Degraded. 

### Install Information

The **Install Information** section displays details about the cluster infrastructure where the application is installed:

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

### Instance Uptime

The Instance Uptime graph shows the percentage of each 8 hour time period in the previous two weeks that the instance was up, Degraded, or down.

The Instance Uptime graph uses the `appStatus` field to classify the instance:  
* Up: Ready or Updating
* Degraded: Degraded
* Down: Missing or Unavailable

You can hover over the bars to see the exact breakdown of ready/degraded/missing/unavailable during that time period. In general, any non-zero amount of non-uptime will be shown as at least 7% of the bar area.

### Instance Activity

The **Instance Activity** section displays realtime event data for the instance. The event data stream is updated each time an instance checks for updates. When an instance checks for updates, it reports details about the current KOTS version, Kubernetes version, application version, and application status. 

By default, all event data is collected and sent every 4 hours, as part of the default update check. This data is not cached. End customers can always disable automatic update checks or change the schedule, so the 4-hour interval is not guaranteed.

You can filter the **Instance Activity** stream by the following event categories:

* TBD
* TBD
* TBD

For more information about each category of event data displayed in the **Instance Activity** stream, see [Event Data](monitoring-event-data).