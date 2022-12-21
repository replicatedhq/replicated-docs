# Monitoring Application Instances

This topic describes using the event data and key performance indicators (KPIs) in the Replicated vendor portal to monitor the health and performance of active application instances.

## Overview of Instance Reporting

Each time an active application instance in an online environment checks for updates, the Replicated app manager sends event data to the vendor portal about the status of the application as well as the status of the infrastructure where the application is installed.

The vendor portal uses this event data to provide key insights about the health, status, and performance of the active instances associated with each customer license. For example, the vendor portal 

This will reduce the time to diagnose and remediate end customer problems that occur in the field, reducing support burden. Giving a vendor insights about adoption rate, time-to-live, uptime, and upgrade success rate will help drive improvement in these key business value metrics. It will also enable Replicated’s primary vendor users to better communicate challenges and successes on the platform.

We have added visibility into these metrics because you can't improve what you can't measure. Our hope is that you, as a Replicated vendor, make this data a critical part of measuring the ease of use and success of your installer.


## Limitations

The instance data in the vendor portal has the following limitations:

* Instance data is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.
* Inactive instances are not included in instance data. An instance is considered inactive if ** **[ADD INACTIVE DESCRIPTION]** ** 
* The vendor portal receives updated instance data only when the application instance checks for updates. By default, instances automatically check for updates every four hours. However, if your users disable these automatic update checks, then the rate at which instance data is updated depends on the frequency that your users manually check for updates. 

## About the Instance Details Page

Instance data is displayed in a dashboard on the **Instance details** page in the vendor portal. The data on the **Instance details** page represents the most recent data available based on the last time that the instance checked for an update.

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

The speed at which customers can get a Vendor’s software up and running in a new customer environment is a key indicator of the quality of the packaging, configuration, and documentation of a distributed software product. If the process of installing is simple and straightforward, Vendors should expect to see a Time to Live of less than 2 hours for at least 80% of their customer installation attempts.  If the process is cumbersome, poorly documented, lacks appropriate preflight checks, or relies heavily on manual steps, then it can take days or weeks to get software up and running in customer environments. This generally represents a significantly increased Vendor support burden, and a significantly degraded end-customer experience.

The vendor portal displays the following metrics that measure Time to Live:

* **Time to Live (Instance)**: The time between when the instances reports the first event, and when the application instance reports a `ready` value for the `appStatus` field.  

   ** **DIAGRAM** **

* **Time to Live (License)**: The time between when you create the customer license in the vendor portal, and when the application instance reports a `ready` value for the `appStatus` field.
   
   ** **DIAGRAM** **

#### Upgrade Success Rate

The vendor portal computes the number of upgrade events using the `appVersion` and `appStatus` fields from event data.

An upgrade is successful if _all_ of the following are true:
     
* There are no errors on deployment of the new version (the `kubectl apply` or `helm upgrade` commands)
* The instance enters a “ready” status within 15 minutes.
* The instance does not enter a “missing” or “unavailable” status in the first 15 minutes after the “Upgrading” phase is complete. This is _not_ the first 15 minutes after the `kubectl apply` or `helm upgrade` deployment command completes.

#### Number of Upgrades

The vendor portal computes the total number of upgrades using the `appVersion` and `appStatus` events.

#### Total Percent Uptime

Uptime is computed as the fraction of time that an application spends in a “ready” state. High uptime indicates that the software is reliable and able to handle the demands of the customer environment, while low uptime may indicate that the software is prone to errors or failures. By measuring the uptime of end-customer instances, it is possible to get a sense of how well the software is performing in the field, and to identify areas where it may be necessary to improve its reliability and stability.

The following table lists the application statuses that classify the application as either up or down:

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

Degraded is part of uptime because a degraded status might be expected for the count of expected workloads and endpoints to drop below the ideal level during an update, depending on the rollout strategy used.

If your app declares StatusInformers for multiple workloads, the aggregate app status will always be represented as the state of the “least available” workload status. That is, if at least one Status Informer reports “unavailable”, then the app will be noted as “unavailable”. If all workloads are “Ready”, then the app will report ready, but if one drops to “degraded”, then the aggregate app status will be “degraded”. 

### Install Information

The **Install Information** section displays details about the cluster infrastructure where the application is installed:

* Kubernetes Distribution
* Kubernetes Version
* KOTS version
* First Seen
* Datacenter (if detected)
* Datacenter region (if detected)
* (Kubernetes Installer Cluster Only) Node Operating System(s)
* (Kubernetes Installer Cluster Only) Node Operating System Version(s)
* (Kubernetes Installer Cluster Only) Cluster Nodes Total
* (Kubernetes Installer Cluster Only) Cluster Nodes Ready
* (Kubernetes Installer Cluster Only) Link to the kurl.sh Kubernetes Installer spec used

### Instance Uptime

The Instance Uptime graph shows the percentage of each 8 hour time period in the previous two weeks that the instance was up, degraded, or down.

The Instance Uptime graph uses the `appStatus` field to classify the instance  
* Up: Ready or Updating
* Degraded: Degraded
* Down: Missing or Unavailable

On hover, you will be able to see a breakdown of the actual downtime (in minutes, hours, days, etc). 

The amount of downtime or degraded time may not be shown completely proportionately to the height of the bar. For example, if one bar represents one day, and there was 1 hour of downtime during that day (4% downtime), more than 4% of the bar may be colored red. This is primarily to ensure that any downtime or degraded-time is clearly visible, even if it’s a small amount. You can hover over the bars to see the exact breakdown of ready/degraded/missing/unavailable during that time period. In general, any non-zero amount of non-uptime will be shown as at least 7% of the bar area.

### Instance Activity

The **Instance Activity** section displays realtime event data for the instance. The event data stream is updated each time an instance checks for updates. When an instance checks for updates, it reports details about the current KOTS version, Kubernetes version, application version, and application status. 

By default, all event data is collected and sent every 4 hours, as part of the default update check. This data is not cached. End customers can always disable automatic update checks or change the schedule, so the 4-hour interval is not guaranteed.

You can filter the **Instance Activity** stream by the following event categories:

* TBD
* TBD
* TBD

For more information about each category of event data displayed in the **Instance Activity** stream, see [Event Data](monitoring-event-data).