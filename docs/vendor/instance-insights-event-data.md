# About Instance and Event Data

This topic provides an overview of the customer and instance insights that you can view in the Replicated vendor portal. It includes information about how the vendor portal accesses data from online installations. It also includes requirements and limitations for viewing instance data.  

## How the Vendor Portal Collects Instance Data {#about-reporting}

The vendor portal collects data from instances installed in online environments. Either Replicated KOTS or the Replicated SDK periodically sends a small amount of data to the vendor portal, depending on which is installed in the cluster alongside the application. If both KOTS and the SDK are installed in the cluster (such as when a Helm chart that includes the SDK is installed by KOTS), then both send instance data.

The data sent to the vendor portal includes properties such as the current version and status of the instance. For a full overview of what data might be included, see the [Replicated Data Transmission Policy](https://docs.replicated.com/vendor/policies-data-transmission).

The following diagram shows the flow of different types of data from customer environments to the vendor portal:

![Telemetry sent from instances to vendor platform](/images/telemetry-diagram.png)

[View a larger version of this image](/images/telemetry-diagram.png)

As shown in the diagram above, application instance data, application status data, and details about the KOTS and the SDK instances running in the cluster are all sent to the vendor portal through the Replicated app service:
* When both KOTS and the SDK are installed in the cluster, they both send application instance data, including information about the cluster where the instance is running.
* Any custom metrics configured by the software vendor are sent to the vendor portal through the Replicated SDK API. For more information, see [Configuring Custom Metrics](/vendor/custom-metrics).
* Application status data, such as if the instance is ready or degraded, is sent by KOTS. If KOTS is not installed in the cluster, then the SDK sends the application status data. For more information, see [Enabling and Understanding Application Status](/vendor/insights-app-status).

## Frequency of Data Sent to the Vendor Portal

This section describes how frequently data is sent from the SDK and KOTS to the vendor portal, including the events that trigger the SDK and KOTS to send data.

### From the Replicated SDK

When installed alongside the application, the SDK automatically sends instance data to the vendor portal when any of the following occur:

* The SDK sends data every four hours.

* The instance checks for updates. An update check occurs when the instance makes a request to the `/api/v1/app/updates` SDK API endpoint. See [app](/reference/replicated-sdk-apis#app) in _Replicated SDK API (Alpha)_.

* The instance completes a Helm update to a new application version. After the update completes, the SDK sends data when it restarts.

* The status of an instance changes. For example, an instance can change from a Ready to Degraded status. For more information, see [Enabling and Understanding Application Status](insights-app-status).

### From KOTS

When installed alongisde the application, KOTS automatically sends instance data to the vendor portal when any of the following occur:

* The instance checks for updates. By default, KOTS checks for updates every four hours. Additionally, an update check can occur when a user clicks the **Check for updates** button in the Replicated admin console. 

  :::note
  KOTS users can modify or disable automatic update checks from the admin console. For more information, see [Updating an Application](/enterprise/updating-apps) in the _Enterprise_ section.
  :::

* The status of an instance changes. For example, an instance can change from a Ready to Degraded status. For more information, see [Enabling and Understanding Application Status](insights-app-status).

* (KOTS v1.92 and later only) The instance deploys a new application version.

## How the Vendor Portal Generates Events and Insights {#about-events}

When the vendor portal receives instance data, it evaluates each data field to determine if there was a change in its value. For each field that changes in value, the vendor portal creates an _event_ to record the change. For example, a change from Ready to Degraded in the application status generates an event.

In addition to creating events for changes in data sent by the instance, the vendor portal also generates events for changes in values of computed metrics. The vendor portal updates the values of computed metrics each time it receives instance data. For example, the vendor portal computes a _Versions behind_ metric that tracks the number of versions behind the latest available version for the instance. When the instance checks for updates and a new update is available, the value of this metric changes and the vendor portal generates an event.

The vendor portal uses events to display insights for each active instance in a **Instance details** dashboard. For more information about using the vendor portal **Instance details** page to monitor active instances of your application, see [Instance Details](instance-insights-details).

## Requirements

Collecting instance data has the following requirements:

* Replicated KOTS or the Replicated SDK must be installed in the cluster where the application instance is running. 

* For KOTS installations and for Helm CLI installations that use `helm template` then `kubectl apply`, additional configuration is required to get application status data. For more information, see [Enabling and Understanding Application Status](/vendor/insights-app-status).

## Limitations

The vendor portal has the following limitations for reporting instance data and generating events:

* **Air gap not supported**: Instance data is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.
* **Active instances only**: Instance data is available only for active application instances. An instance is considered inactive when its most recent check-in was more than 24 hours ago. An instance can become inactive if it is decommissioned, stops checking for updates, or otherwise stops reporting.

   The vendor portal continues to display data for an inactive instance from its most-recently seen state. This means that data for an inactive instance might continue to show a Ready status after the instance becomes inactive. Replicated recommends that you use the timestamp in the **Last Check-in** field to understand if an instance might have become inactive, causing its data to be out-of-date.
* **Instance data freshness**: The rate at which data is updated in the vendor portal varies depending on how often the vendor portal receives instance data.
* **Event timestamps**: The timestamp of events displayed on the **Instances details** page is the timestamp when the Replicated Vendor API received the data from the instance. The timestamp of events does not necessarily reflect the timestamp of when the event occurred.
* **Caching for kURL cluster data**: For clusters created with Replicated kURL (embedded clusters), KOTS stores the counts of total nodes and ready nodes in a cache for five minutes. If KOTS sends instance data to the vendor portal within the five minute window, then the reported data for total nodes and ready nodes reflects the data in the cache. This means that events displayed on the **Instances details** page for the total nodes and ready nodes can show values that differ from the current values of these fields.
