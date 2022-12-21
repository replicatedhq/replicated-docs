# Monitoring Application Instances

This topic describes how to monitor active application instances using the instance details data in the Replicated vendor portal.

## Overview of Instance Reporting

The vendor portal includes key metrics and event data for each active instance of your application. You can view these metrics to understand the health, performance, and current state of the instance.

## Limitations

The instance reporting data in the vendor portal has the following limitations:

* Instance reporting data is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.
* Inactive instances are not included in instance reporting data. An instance is considered inactive if ** **[ADD INACTIVE DESCRIPTION]** ** 

## About the Instance Details Page

Instance reporting data is displayed in a dashboard on the **Instance details** page in the vendor portal. 

The following screenshot shows an example of the **Instance details** page:

** **UPDATE SCREENSHOT** **

![Instance details full page](/images/instance-details.png)

[View a larger version of this image](/images/instance-details.png)

As shown in the screenshot above, the **Instance details** page includes the following sections:

* **Current State**: Displays information about the current state of the instance, such as details about the installed application version. See [Current State](#current-state) below.
* **Install Insights**: Displays key performance indicators (KPIs) for instance upgrade. See [Install Insights](#install-insights) below. 
* **Install Information**: Displays information about the cluster where the instance is installed, such as the version of Kubernetes running on the cluster and details about completed preflight checks. See [Install Information](#install-information) below.
* **Instance Uptime**: Displays the percent of instance uptime, calculated as a fraction of the specified time period. See [Instance Uptime](#instance-uptime) below.
* **Instance Activity**: Streams realtime event data for the instance, including events such as a change in the status of the instance or a change in the version of the app manager installed on the cluster. See [Instance Activity](#instance-activity) below.

### Current State

The **Current State** section displays information about the current state of the instance.

**SCREENSHOT**

The following table describes the data and computed metrics displayed in the Current State section:

<table>
  <tr>
    <th width="25%">Field</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>App status</td>
    <td><p>The status of the application availability.</p>
      <p>Possible values: ready, updating, degraded, inactive, unavailable, missing. For more information about the status, see <a href="/enterprise/status-viewing-details#resource-statuses">Resource Statuses</a> in <em>Viewing Status Details</em>.</p>
    </td>
  </tr>
  <tr>
    <td>App version</td>
    <td>The version that the instance is running. Uses the version assigned to the release when the release was promoted.</td>
  </tr>
  <tr>
    <td>Version age</td>
    <td>
      <p>The Version age fields displays the following computed metrics:</p>
      <ul>
        <li>Absolute age: <code>now - current_release.promoted_date</code>
        <p>Time since the currently running release was promoted to the channel from which this instance pulled the currently running release.</p></li>
        <li>Relative age: <code>channel.latest_release.promoted_date - current_release.promoted_date</code>
        <p> The time difference between the currently running release’s promotion date and the promotion date of the latest available release on the channel from which this instance pulled the currently running release.</p></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Last check-in</td>
    <td>?</td>
  </tr>
</table>

### Install Insights

The **Install Insights** section displays key health and performance metrics for the installation.

#### Time to Live



#### Upgrade Success Rate

App version and status are used to compute upgrade events and upgrade success.

An upgrade is successful if _all_ of the following are true:
     
* There are no errors on deployment of the new version (the `kubectl apply` or `helm upgrade` commands)
* The instance enters a “ready” status within 15 minutes.
* The instance does not enter a “missing” or “unavailable” status in the first 15 minutes after the “Upgrading” phase is complete. This is _not_ the first 15 minutes after the `kubectl apply` or `helm upgrade` deployment command completes.

A temporary “degraded” status does _not_ cause a failed upgrade. This is because a degraded status might be expected for the count of expected workloads and endpoints to drop below the ideal level during an update, depending on the rollout strategy used.

#### Number of Upgrades


#### Total Percent Uptime

Uptime is computed as the fraction of time that an application spends in a “ready” state. High uptime indicates that the software is reliable and able to handle the demands of the customer environment, while low uptime may indicate that the software is prone to errors or failures. By measuring the uptime of end-customer instances, it is possible to get a sense of how well the software is performing in the field, and to identify areas where it may be necessary to improve its reliability and stability.

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

The Instance Uptime graph shows what percentage of a given time period an instance was in a degraded or downtime (“missing” or “unavailable”) state. Note that unlike the overall uptime calculation, which counts “degraded” as an “Up” state, the uptime graph shows degraded as its own unique state.

On hover, you will be able to see a breakdown of the actual downtime (in minutes, hours, days, etc). 

The amount of downtime or degraded time may not be shown completely proportionately to the height of the bar. For example, if one bar represents one day, and there was 1 hour of downtime during that day (4% downtime), more than 4% of the bar may be colored red. This is primarily to ensure that any downtime or degraded-time is clearly visible, even if it’s a small amount. You can hover over the bars to see the exact breakdown of ready/degraded/missing/unavailable during that time period. In general, any non-zero amount of non-uptime will be shown as at least 7% of the bar area.


### Instance Activity

The **Instance Activity** section displays realtime event data for the instance. The event data stream is updated each time an instance checks for updates. When an instance checks for updates, it reports details about the current KOTS version, Kubernetes version, application version, and application status. 

You can filter the **Instance Activity** stream by the following event categories:

* TBD

For more information about the event data displayed in the **Instance Activity** stream, see [Event Data](monitoring-event-data).