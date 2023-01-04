# Event Data

This topic describes the event fields displayed in the Replicated vendor portal **Instance details** page. For more information, see [Monitoring Application Instances](monitoring-instance-details).

## Application Installation and Upgrade Events {#install-upgrade}

The following table describes the fields that the vendor portal uses to display application installation and upgrade events.

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
    <td>The version that the instance is running. The <code>versionLabel</code> is the version assigned to the release when the release was promoted.</td>
    <td>string</td>
    <td>App Version</td>
  </tr> 
  <tr>
    <td><code>upgradeSuccess</code></td>
    <td>Tracks when an upgrade is successful according to the defined criteria.</td>
    <td>boolean</td>
    <td><p>Upgrade Successful</p><p>Upgrade Failed</p>
</td>
  </tr> 
</table>

## Cluster Status Events

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td><code>isKurl</code></td>
    <td>
      <p>Indicates if the cluster was provisioned by the Replicated Kubernetes installer.</p>
      <p>Possible values:</p>
      <ul>
        <li><code>kURL</code>: The cluster is a Kubernetes installer cluster.</li>
        <li><code>Existing</code>: The cluster is <em>not</em> a Kubernetes installer cluster.</li>
      </ul>
    </td>
  </tr> 
  <tr>
    <td><code>k8sVersion</code></td>
    <td>The version of Kubernetes running in the cluster. The Kubernetes version often contains details that may help determine the Kubernetes distribution. For example, <code>1.24.5-eks-ae7312d</code>.</td>
  </tr>
  <tr>
    <td><code>k8sDistribution</code></td>
    <td>
      <p>The Kubernetes distribution of the cluster, when detected.</p>
      <p>Possible values:</p>
      <ul>
        <li>EKS</li>
        <li>GKE</li>
        <li>K3S</li>
        <li>RKE2</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>kurlNodeCountTotal</code></td>
    <td>Total number of nodes in the Kubernetes cluster. Applies to clusters provisioned by a kurl.sh Kubernetes installer only.</td>
  </tr>
  <tr>
    <td><code>kurlNodeCountReady</code></td>
    <td>Number of nodes in the Kubernetes installer cluster that are in a healthy state and ready to run Pods. Applies to clusters provisioned by the Kubernetes installer only.</td>
  </tr>
  <tr>
    <td><code>kurlNodeCountReady</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>kurlInstallerSpecID</code></td>
    <td></td>
  </tr>
</table>


## Infrastructure Status Events

<table>
  <tr>
    <th>Field Name</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td><code>cloudProvider</code></td>
    <td>
      <p>The cloud provider where the instance is running. Determined from the IP address that makes the request.</p>
      <p>Possible values include:</p>
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
    <td>One or more operating systems detected across cluster nodes</td>
  </tr>
  <tr>
    <td><code>kurlOSVersion</code>*</td>
    <td>One or more operating systems detected across cluster nodes</td>
  </tr>
</table>

## Preflight Check Events

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