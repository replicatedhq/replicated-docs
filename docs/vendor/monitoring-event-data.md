# Event Data

This topic describes the instance data fields that the Replicated vendor portal uses to generate events for the instance.

## About Events

When the vendor portal receives instance data from the app manager, it evaluates each data field to determine if there was a change in its value. For each field that changes in value, the vendor portal creates an _event_ to record the change. For example, a change from `ready` to `degraded` in the `appStatus` data field generates an event in the vendor portal.

In addition to creating events for changes in data fields sent by the app manager, the vendor portal also generates events when there is a change in the value of a computed metric. 

For more information about using the vendor portal **Instance details** page to monitor active instances of your application, see [Monitoring Application Instances](monitoring-instance-details).

## Instance Events

Each event that the vendor portal generates for application instances has the following fields:

* `fieldName` 
* `previousValue`
* `newValue` 

The section describes each event, including:
* Field Name: The `fieldName` associated with the event.
* Description: 
* Type: The data type of the event. Possible values are string, number, and boolean.
* Label: The label for the event in the **Instance Activity** stream in the vendor portal **Instance Details** page. For more information, see

### Application Installation and Upgrade Events {#install-upgrade}

The following table describes the instance data fields that can generate events related to application installation and upgrade. 

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
      <p>A string that represents the availability status of the application.</p>
      <p>Possible values: ready, updating, degraded, unavailable, missing. For more information about how the app manager determines <code>appStatus</code>, see <a href="/enterprise/status-viewing-details#resource-statuses">Resource Statuses</a> in <em>Viewing Status Details</em>.</p>
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
    <td><code>kotsVersion</code></td>
    <td>The version of the Replicated app manager that the instance is running. The app manager version is displayed as a Semantic Versioning compliant string.</td>
    <td>string</td>
    <td>KOTS Version</td>
  </tr> 
  <tr>
    <td><code>versionLabel</code></td>
    <td>The version label of the release that the instance is currently running. The <code>versionLabel</code> is the version assigned to the release when the release was promoted.</td>
    <td>string</td>
    <td>App Version</td>
  </tr> 
</table>

### Cluster Status Events

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
      <p>For more information about the Kubernetes installer, see <a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</p>
    </td>
    <td>boolean</td>
    <td>Cluster Type</td>
  </tr> 
  <tr>
    <td><code>k8sVersion</code></td>
    <td>The version of Kubernetes running in the cluster.</td>
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
    <td>Total number of nodes in the cluster. Applies only to clusters provisioned by the Kubernetes installer.</td>
    <td>number</td>
    <td>kURL Nodes Total</td>
  </tr>
  <tr>
    <td><code>kurlNodeCountReady</code></td>
    <td>Number of nodes in the cluster that are in a healthy state and ready to run Pods. Applies only to clusters provisioned by the Kubernetes installer.</td>
    <td>number</td>
    <td>kURL Nodes Ready</td>
  </tr>
  <tr>
    <td><code>kurlInstallerSpecID</code></td>
    <td>The ID of the Kubernetes installer specification that provisioned the cluster. An installer specification is a manifest file that has <code>apiVersion: cluster.kurl.sh/v1beta1</code> and <code>kind: Installer</code>.A <code>kurlInstallerSpecID</code> event indicates that a new Installer specification was added. For more information, see <a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</td>
  </tr>
  <td>string</td>
  <td>New kURL Installer</td>
</table>


### Infrastructure Status Events

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
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
  </tr>
  <tr>
    <td><code>cloudProviderRegion</code></td>
    <td>
      <p>The cloud provider region where the instance is running. For example, <code>us-central1-b</code></p>
    </td>
  </tr>  
    <tr>
    <td><code>kurlOSFlavor</code>*</td>
    <td>One or more operating systems detected across cluster nodes. Applies only to cluster provisioned by the Kubernetes installer.</td>
  </tr>
  <tr>
    <td><code>kurlOSVersion</code>*</td>
    <td>One or more operating systems detected across cluster nodes. Applies only to cluster provisioned by the Kubernetes installer.</td>
  </tr>
</table>

### Preflight Check Events

Preflight check data is sent only by instances on the app manager version 1.93.0 or later.

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td><code>preflightCheckStatus</code></td>
    <td>
    </td>
  </tr>
</table>

## Upstream Update Events

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td><code>versionAge</code></td>
    <td>
    </td>
  </tr>
  <tr>
    <td><code>versionAgeSinceLatest</code></td>
    <td>
    </td>
  </tr>  
  <tr>
    <td><code>numberVersionsBehind</code></td>
    <td></td>
  </tr>
</table>