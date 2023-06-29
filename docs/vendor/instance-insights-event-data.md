import Checkins from "../partials/instance-insights/_appCheckins.mdx"

# About Instance and Event Data

This topic describes the customer and instance insights that you can view in the Replicated vendor portal. It includes information about how the vendor portal accesses data from Helm installations and Replicated KOTS installations, the types of instance events displayed in the vendor portal, and requirements and limitations of instance data.

## Requirements

Viewing instance data in the vendor portal has the following requirements:

* For instances installed with Helm, you must include the Replicated SDK as a dependency of your Helm chart. For more information, [About the Replicated SDK (Alpha)](replicated-sdk-overview).

* Getting data on the status of application instances requires additional configuration. For more information, see [Enabling and Understanding App Status](insights-app-status).

## Limitations

The vendor portal has the following limitations for reporting instance data and generating events:

* **Air gap not supported**: Instance data is available only for application instances installed in online environments. Data for instances installed in air gapped environments is not available.
* **Active instances only**: Instance data is available only for active application instances. An instance is considered inactive when its most recent check-in was more than two weeks ago. An instance can become inactive if it is decommissioned, stops checking for updates, or otherwise stops reporting.

   The vendor portal continues to display data for an inactive instance from its most-recently seen state. This means that data for an inactive instance might continue to show a Ready status after the instance becomes inactive. Replicated recommends that you use the timestamp in the **Last Check-in** field to understand if an instance might have become inactive, causing its data to be out-of-date.
* **Instance data freshness**: The rate at which data is updated in the vendor portal varies depending on how often the vendor portal receives instance data.
* **Event timestamps**: The timestamp of events displayed on the **Instances details** page is the timestamp when the Replicated Vendor API received the data from the instance. The timestamp of events does not necessarily reflect the timestamp of when the event occurred.
* **Caching for kURL cluster data**: For clusters created with Replicated kURL (embedded clusters), KOTS stores the counts of total nodes and ready nodes in a cache for five minutes. If KOTS sends instance data to the vendor portal within the five minute window, then the reported data for total nodes and ready nodes reflects the data in the cache. This means that events displayed on the **Instances details** page for the total nodes and ready nodes can show values that differ from the current values of these fields.  

## How the Vendor Portal Collects Instance Data {#about-reporting}

The vendor portal collects instance data from instances that were installed in online environments with either Helm and the Replicated SDK or with KOTS. Depending on the installation method, either the Replicated SDK or KOTS periodically sends a small amount of data to the vendor portal, including properties such as the current version and status of the instance.

The primary purpose of this instance data is to help the cloud-hosted update service to compile the list of new versions that are available to the given instance for upgrade. For a full overview of what data might be included, see the [Replicated Data Transmission Policy](https://docs.replicated.com/vendor/policies-data-transmission).

The vendor portal receives instance data when any of the following _check-ins_ occur:

<Checkins/>

## How the Vendor Portal Generates Events

When the vendor portal receives instance data, it evaluates each data field to determine if there was a change in its value. For each field that changes in value, the vendor portal creates an _event_ to record the change. For example, a change from `ready` to `degraded` in the `appStatus` data field generates an event in the vendor portal.

In addition to creating events for changes in data fields sent by the instance, the vendor portal also generates events for changes in the value of a computed metric. For example, the vendor portal computes a `numberVersionsBehind` metric that tracks the number of versions behind the latest available version for the instance. When the instance checks for updates and the vendor portal identifies a new version that is available to the instance, then the vendor portal generates an event to indicate the change in the value of the `numberVersionsBehind` metric. The vendor portal updates the values of computed metrics each time it receives instance data.

Each event that the vendor portal generates for application instances has the following fields:

* `fieldName`: The instance data field that generated the event. For example, `appStatus`. 
* `previousValue`: The value of the data field before the vendor portal generated the event.
* `newValue`: The value of the data field after the vendor portal generated the event.

The vendor portal uses events to display insights for each active application instance in a **Instance details** dashboard. 
For more information about using the vendor portal **Instance details** page to monitor active instances of your application, see [Viewing Instance Details](instance-insights-details).

## Types of Events

This section describes each type of event that the vendor portal generates for active application instances. Events in the vendor portal are grouped into the following categories:

* [Application Installation and Upgrade Events](#install-upgrade)
* [Cluster Status Events](#cluster)
* [Infrastructure Status Events](#infrastructure)
* [KOTS Status Events](#kots)
* [Upstream Update Events](#upstream)

The tables in this section include the following details about each event type:

* **Field Name**: The `fieldName` associated with the event.
* **Description**: A description of the data field.
* **Type**: The data type of the field. Possible values are string, number, and boolean.
* **Label**: The label for the event that displays in the **Instance Activity** stream in the vendor portal **Instance Details** page. For more information, see [Instance Activity](instance-insights-details#instance-activity) in _Viewing Instance Details_.

### Installation and Upgrade Events {#install-upgrade}

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
    <th>Type</th>
    <th>Label</th>
  </tr> 
  <tr>
    <td><code>appStatus</code></td>
    <td>
      <p>A string that represents the status of the application. Possible values: Ready, Updating, Degraded, Unavailable, Missing.</p>
      <p>Additional configuration is required to get <code>appStatus</code> data. See <a href="#requirements">Requirements</a>.</p>
    </td>
    <td>string</td>
    <td>App Status</td>
  </tr>
  <tr>
    <td><code>channelId</code></td>
    <td>The ID of the channel the application instance is assigned.</td>
    <td>string</td>
    <td>App Channel</td>
  </tr> 
  <tr>
    <td><code>versionLabel</code></td>
    <td>The version label of the release that the instance is currently running. The <code>versionLabel</code> is the version that you assigned to the release when promoting it to a channel.</td>
    <td>string</td>
    <td>App Version</td>
  </tr> 
</table>

### Cluster Status Events {#cluster}

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
    <th>Type</th>
    <th>Label</th>
  </tr> 
  <tr>
    <td><code>isKurl</code></td>
    <td>
      <p>Indicates if the cluster was provisioned by kURL.</p>
      <p>Possible values:</p>
      <ul>
        <li><code>kURL</code>: The cluster is provisioned by kURL.</li>
        <li><code>Existing</code>: The cluster is <em>not</em> provisioned by kURL.</li>
      </ul>
      <p>For more information about kURL clusters, see <a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</p>
    </td>
    <td>boolean</td>
    <td>Cluster Type</td>
  </tr> 
  <tr>
    <td><code>k8sVersion</code></td>
    <td>The version of Kubernetes running in the cluster.</td>
    <td>string</td>
    <td>Kubernetes Version</td>
  </tr>
  <tr>
    <td><code>k8sDistribution</code></td>
    <td>
      <p>The Kubernetes distribution of the cluster.</p>
      <p>Possible values:</p>
      <ul>
        <li>EKS</li>
        <li>GKE</li>
        <li>K3S</li>
        <li>RKE2</li>
      </ul>
    </td>
    <td>string</td>
    <td>Kubernetes Distribution</td>
  </tr>
  <tr>
    <td><code>kurlNodeCountTotal</code></td>
    <td><p>Total number of nodes in the cluster.</p>
    <p><strong>Note:</strong> Applies only to kURL clusters.</p></td>
    <td>number</td>
    <td>kURL Nodes Total</td>
  </tr>
  <tr>
    <td><code>kurlNodeCountReady</code></td>
    <td><p>Number of nodes in the cluster that are in a healthy state and ready to run Pods.</p>
    <p><strong>Note:</strong> Applies only to kURL clusters.</p>
    </td>
    <td>number</td>
    <td>kURL Nodes Ready</td>
  </tr>
  <tr>
    <td><code>kurlInstallerSpecID</code></td>
    <td><p>The ID of the Kubernetes installer specification that kURL used to provision the cluster. An installer specification is a manifest file that has <code>apiVersion: cluster.kurl.sh/v1beta1</code> and <code>kind: Installer</code>. A <code>kurlInstallerSpecID</code> event indicates that a new Installer specification was added.</p>
    <p>For more information about installer specifications for kURL, see <a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</p>
    <p><strong>Note:</strong> Applies only to kURL clusters.</p>
    </td>
    <td>string</td>
    <td>New kURL Installer</td>
  </tr>  
</table>


### Infrastructure Status Events {#infrastructure}

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
    <th>Type</th>
    <th>Label</th>
  </tr> 
  <tr>
    <td><code>cloudProvider</code></td>
    <td>
      <p>The cloud provider where the instance is running. <code>cloudProvider</code> is determined by the IP address that makes the request.</p>
      <p>Possible values:</p>
      <ul>
        <li>AWS</li>
        <li>GCP</li>
        <li>DigitalOcean</li>
      </ul>
    </td>
    <td>string</td>
    <td>Cloud Provider</td>
  </tr>
  <tr>
    <td><code>cloudProviderRegion</code></td>
    <td>
      <p>The cloud provider region where the instance is running. For example, <code>us-central1-b</code></p>
    </td>
    <td>string</td>
    <td>Cloud Region</td>
  </tr>
</table>

### KOTS Status Events {#kots}

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
    <th>Type</th>
    <th>Label</th>
  </tr>
  <tr>
    <td><code>kotsVersion</code></td>
    <td>The version of KOTS that the instance is running. KOTS version is displayed as a Semantic Versioning compliant string.</td>
    <td>string</td>
    <td>KOTS Version</td>
  </tr> 
</table>

### Replicated SDK Status Events {#sdk}

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
    <th>Type</th>
    <th>Label</th>
  </tr>
  <tr>
    <td><code>sdkVersion</code></td>
    <td>The version of the Replicated SDK that the instance is running. SDK version is displayed as a Semantic Versioning compliant string.</td>
    <td>string</td>
    <td>Replicated SDK Version</td>
  </tr> 
</table>

### Upstream Update Events {#upstream}

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
    <th>Type</th>
    <th>Label</th>
  </tr> 
  <tr>
    <td><code>numberVersionsBehind</code></td>
    <td>
      <p>The number of versions between the version that the instance is currently running and the latest version available on the channel.</p>
      <p>The <code>numberVersionsBehind</code> metric is computed by the vendor portal each time KOTS sends instance data.</p>
    </td>
    <td>number</td>
    <td>Versions Behind</td>
  </tr>
</table>