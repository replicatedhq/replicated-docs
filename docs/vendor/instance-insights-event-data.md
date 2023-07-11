import Checkins from "../partials/instance-insights/_appCheckins.mdx"

# About Instance and Event Data

This topic provides an overview of the customer and instance insights that you can view in the Replicated vendor portal. It includes information about how the vendor portal accesses data from online installations and requirements and limitations for viewing instance data.  

## How the Vendor Portal Collects Instance Data {#about-reporting}

The vendor portal collects data from instances installed in online environments. Depending on the application's installation method, either the Replicated SDK or Replicated KOTS periodically sends a small amount of data to the vendor portal, including properties such as the current version and status of the instance.

For a full overview of what data might be included, see the [Replicated Data Transmission Policy](https://docs.replicated.com/vendor/policies-data-transmission).

The vendor portal receives instance data when any of the following _check-ins_ occur:

<Checkins/>

## How the Vendor Portal Generates Events and Insights

When the vendor portal receives instance data, it evaluates each data field to determine if there was a change in its value. For each field that changes in value, the vendor portal creates an _event_ to record the change. For example, a change from Ready to Degraded in the application status generates an event.

In addition to creating events for changes in data sent by the instance, the vendor portal also generates events for changes in values of computed metrics. The vendor portal updates the values of computed metrics each time it receives instance data. For example, the vendor portal computes a _Versions behind_ metric that tracks the number of versions behind the latest available version for the instance. When the instance checks for updates and a new update is available, the value of this metric changes and the vendor portal generates an event.

The vendor portal uses events to display insights for each active instance in a **Instance details** dashboard. For more information about using the vendor portal **Instance details** page to monitor active instances of your application, see [Instance Details](instance-insights-details).

## Requirements

Viewing instance data in the vendor portal has the following requirements:

* For applications installed with Helm, the Replicated SDK must also be installed in the cluster to send data to the vendor portal. To install the SDK with your application, include the SDK as a dependency in your `Chart.yaml` file. For more information, [About the Replicated SDK (Alpha)](replicated-sdk-overview).

* Collecting application status data for an instance requires additional configuration to indicate which of the Kubernetes resources deployed as part of your application Replicated will monitor for changes in state. For more information, see [Enabling and Understanding Application Status](insights-app-status).

## Limitations

The vendor portal has the following limitations for reporting instance data and generating events:

* **Air gap not supported**: Instance data is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.
* **Active instances only**: Instance data is available only for active application instances. An instance is considered inactive when its most recent check-in was more than two weeks ago. An instance can become inactive if it is decommissioned, stops checking for updates, or otherwise stops reporting.

   The vendor portal continues to display data for an inactive instance from its most-recently seen state. This means that data for an inactive instance might continue to show a Ready status after the instance becomes inactive. Replicated recommends that you use the timestamp in the **Last Check-in** field to understand if an instance might have become inactive, causing its data to be out-of-date.
* **Instance data freshness**: The rate at which data is updated in the vendor portal varies depending on how often the vendor portal receives instance data.
* **Event timestamps**: The timestamp of events displayed on the **Instances details** page is the timestamp when the Replicated Vendor API received the data from the instance. The timestamp of events does not necessarily reflect the timestamp of when the event occurred.
* **Caching for kURL cluster data**: For clusters created with Replicated kURL (embedded clusters), KOTS stores the counts of total nodes and ready nodes in a cache for five minutes. If KOTS sends instance data to the vendor portal within the five minute window, then the reported data for total nodes and ready nodes reflects the data in the cache. This means that events displayed on the **Instances details** page for the total nodes and ready nodes can show values that differ from the current values of these fields.