# Monitoring Application Instances

This topic describes how to monitor active application instances using the instance details data in the Replicated vendor portal.

## Overview of Customer Reporting

The Replicated vendor portal **Customers** page displays details about each customer license that you create, including the channel the customer is assigned, the type of license, the number of active application instances installed with the license, and more.

From the **Customers** page, you can click **Customer reporting** for a customer to view reporting information about the active application instances associated with the customer license.

For each active application instance listed on the **Customer reporting** page, you can click the **View details** button to access the **Instance details** page. The **Instance details** page displays key metrics and details to help you understand the performance and status of each active application instance.

The following screenshot shows the location of the **View details** button on the **Customer reporting** page:

![Customer reporting page that lists one active instance with box around View details button](/images/customer-reporting-view-details.png)


## Limitations

The instance reporting data in the vendor portal has the following limitations:

* Instance reporting data is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available. 

## About the Instance Details Page

Each customer license is associated with one or more installed instances of your application. For each application instance, you can view an **Instance details** page in the vendor portal to understand the health, performance, and current state of the instance.

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

The **Current State** section includes the following metrics:

* App status
* App version
* Version age
* Versions behind 
* Last check-in
* Absolute age -- Time since the currently running release was promoted to the channel from which this instance pulled the currently running release.
* Relative age / days behind latest - The time difference between the currently running release’s promotion date and the promotion date of the latest available release on the channel from which this instance pulled the currently running release.

### Install Insights

The **Install Insights** section displays key performance indicators (KPIs) for the instance.

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

The **Instance Activity** section of the Reporting page displays realtime event data for the .

Every time an internet-connected KOTS instance checks for updates, it reports details about the KOTS version, Kubernetes Version, current app version, and current app status. These checkin events have always been surfaced to vendors, but we’re now refining this data at the point of sending, and using it to surface not only more detailed granular status, but also some powerful computed insights around business value recognized. The event data we send is cataloged here: Instance events and insights This granular event data is provided to vendors in the vendor portal and updated in real time