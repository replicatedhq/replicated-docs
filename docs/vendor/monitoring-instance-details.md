# Monitoring Application Instances

This topic describes how to monitor active application instances using the instance details data in the Replicated vendor portal.

## Overview of Instance Reporting


## Limitations

The instance reporting data in the vendor portal has the following limitations:

* Instance reporting data is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.
* Inactive instances are not included in instance reporting data. 

## About the Instance Details Page

Each customer license is associated with one or more installed instance of your application. For each application instance, you can view an **Instance details** page in the vendor portal to understand the health, performance, and current state of the instance.

The following screenshot shows an example of the **Instance details** page in the vendor portal:

** **UPDATE SCREENSHOT** **

![Instance details full page](/images/instance-details.png)

[View a larger version of this image](/images/instance-details.png)

As shown in the screenshot above, the vendor portal **Instance details** page includes the following sections:

* **Current State**: Displays information about the current state of the instance, such as details about the installed application version. See [Current State](#current-state) below.
* **Install Insights**: Displays key performance indicators (KPIs) for instance upgrade. See [Install Insights](#install-insights) below. 
* **Install Information**: Displays information about the cluster where the instance is installed, such as the version of Kubernetes running on the cluster and details about completed preflight checks. See [Install Information](#install-information) below.
* **Instance Uptime**: Displays the percent of instance uptime, calculated as a fraction of the specified time period. 
* **Instance Activity**: Streams realtime event data for the instance, including events such as a change in the status of the instance or a change in the version of the app manager installed on the cluster.

### Current State

The **Current State** section includes the following details and computed metrics:

* App status
* App version
* Version age
* Versions behind 
* Last check-in
* Absolute age -- Time since the currently running release was promoted to the channel from which this instance pulled the currently running release.
* Relative age / days behind latest - The time difference between the currently running release’s promotion date and the promotion date of the latest available release on the channel from which this instance pulled the currently running release.

### Install Insights

The **Install Insights** section displays key health metrics for the installation.

instance-time-to-live
license-time-to-live
upgrade success rate
Number of upgrades
total uptime %

### Install Information

The **Install Information** section displays details about the cluster infrastructure where the application is installed:

* Kubernetes Flavor
* Kubernetes Version
* KOTS version
* First Seen
* Datacenter (if detected)
* Datacenter region (if detected)
* (Kubernetes Installer Cluster Only) Node Operating System(s)
* (Kubernetes Installer Cluster Only) Node Operating System Version(s)
* (Kubernetes Installer Cluster Only)Cluster Nodes Total
* (Kubernetes Installer Cluster Only) Cluster Nodes Ready
* (Kubernetes Installer Cluster Only) Link to the kurl.sh Kubernetes Installer spec used

### Instance Uptime



### Instance Activity

The **Instance Activity** section of the Reporting page displays realtime event data for the instance.

Each time an instance checks for updates, it reports details about the current KOTS version, Kubernetes Version, application version, and application status. 

You can filter the Instance Activity stream by the following event categories:

* App install/upgrade
* Status change
* Downstream update 
* kURL install/upgrade
* KOTS install/upgrade

#### App Install/Upgrade

The following table describes the fields that the vendor portal uses to display application installation and upgrade events.

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
    <th>Event Stream Label</th>
  </tr> 
  <tr>
    <td><code>channelId</code></td>
    <td>The ID of the channel to which the application instance is assigned. The channel name associated with this ID displays on the event stream.</td>
    <td>App Channel: Stable</td>
  </tr> 
  <tr>
    <td><code>versionLabel</code></td>
    <td>The version that the instance is running. The <code>versionLabel</code> </td>
    <td></td>
  </tr> 
</table>

#### Status Change

The following table describes the fields that the vendor portal uses to display application status change events.

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
    <th>Event Stream Label</th>
  </tr> 
  <tr>
    <td><code>appStatus</code></td>
    <td>
      <p>A string that represents the availability status of the application.</p>
      <p>Possible values: ready, updating, degraded, inactive, unavailable, missing. For more information about how the app manager determines <code>appStatus</code>, see <a href="/enterprise/status-viewing-details#resource-statuses">Resource Statuses</a> in <em>Viewing Status Details</em>.</p>
    </td>
    <td>App Status: Ready</td>
  </tr> 
</table>

#### Downstream Update

#### kURL Install/Upgrade

#### KOTS Install/Upgrade