# Event Data

This topic describes the application instance data fields that the Replicated vendor portal uses to generate events for the instance.

## About Events

When the vendor portal receives instance data from the app manager, it evaluates each data field to determine if there was a change in its value. For each field that changes in value, the vendor portal creates an _event_ to record the change. For example, a change from `ready` to `degraded` in the `appStatus` data field generates an event in the vendor portal.

In addition to creating events for changes in data fields sent by the app manager, the vendor portal also generates events for changes in the value of a computed metric. For example, the vendor portal computes a `numberVersionsBehind` metric that tracks the number of versions behind the latest available version for the instance. When the instance checks for updates and the vendor portal identifies a new version that is available to the instance, then the vendor portal generates an event to indicate the change in the value of the `numberVersionsBehind` metric. The vendor portal updates the values of computed metrics each time the app manager sends instance data.

Each event that the vendor portal generates for application instances has the following fields:

* `fieldName`: The instance data field that generated the event. For example, `appStatus`. 
* `previousValue`: The value of the data field before the vendor portal generated the event.
* `newValue`: The value of the data field after the vendor portal generated the event.

The vendor portal uses events to display insights for each active application instance in a **Instance details** dashboard. 
For more information about using the vendor portal **Instance details** page to monitor active instances of your application, see [Viewing Instance Details](instance-insights-details).

## Instance Events

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

### Application Installation and Upgrade Events {#install-upgrade}

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
      <p>A string that represents the status of the application.</p>
      <p>Possible values: Ready, Updating, Degraded, Unavailable, Missing. For more information about how the app manager determines <code>appStatus</code>, see <a href="/enterprise/status-viewing-details#resource-statuses">Resource Statuses</a> in <em>Viewing Status Details</em>.</p>
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
      <p>Indicates if the cluster was provisioned by the Replicated Kubernetes installer.</p>
      <p>Possible values:</p>
      <ul>
        <li><code>kURL</code>: The cluster is provisioned by the Kubernetes installer.</li>
        <li><code>Existing</code>: The cluster is <em>not</em> provisioned by the Kubernetes installer.</li>
      </ul>
      <p>See <a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</p>
    </td>
    <td>boolean</td>
    <td>Cluster Type</td>
  </tr> 
  <tr>
    <td><code>k8sVersion</code></td>
    <td>The version of Kubernetes running in the cluster.</td>
    <td></td>
    <td></td>
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
    <p><strong>Note:</strong> Applies only to clusters provisioned by the Kubernetes installer.</p></td>
    <td>number</td>
    <td>kURL Nodes Total</td>
  </tr>
  <tr>
    <td><code>kurlNodeCountReady</code></td>
    <td><p>Number of nodes in the cluster that are in a healthy state and ready to run Pods.</p>
    <p><strong>Note:</strong> Applies only to clusters provisioned by the Kubernetes installer.</p>
    </td>
    <td>number</td>
    <td>kURL Nodes Ready</td>
  </tr>
  <tr>
    <td><code>kurlInstallerSpecID</code></td>
    <td><p>The ID of the Kubernetes installer specification that provisioned the cluster. An installer specification is a manifest file that has <code>apiVersion: cluster.kurl.sh/v1beta1</code> and <code>kind: Installer</code>. A <code>kurlInstallerSpecID</code> event indicates that a new Installer specification was added. See <a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</p>
    <p><strong>Note:</strong> Applies only to clusters provisioned by the Kubernetes installer.</p>
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
    <td></td>
    <td></td>
  </tr>  
    <tr>
    <td><code>kurlOSFlavor</code>*</td>
    <td><p>One or more operating systems detected across cluster nodes.</p>
    <p><strong>Note:</strong> Applies only to clusters provisioned by the Kubernetes installer.</p>
    </td>
    <td>string</td>
    <td>Cloud Region</td>
  </tr>
  <tr>
    <td><code>kurlOSVersion</code>*</td>
    <td><p>One or more operating systems detected across cluster nodes.</p>
    <p><strong>Note:</strong> Applies only to clusters provisioned by the Kubernetes installer.</p>
    </td>
    <td>string</td>
    <td>Operating System Version</td>
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
    <td>The version of the Replicated app manager that the instance is running. The app manager version is displayed as a Semantic Versioning compliant string.</td>
    <td>string</td>
    <td>KOTS Version</td>
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
      <p>The <code>numberVersionsBehind</code> metric is computed by the vendor portal each time the app manager sends instance data.</p>
    </td>
    <td>number</td>
    <td>Versions Behind</td>
  </tr>
</table>