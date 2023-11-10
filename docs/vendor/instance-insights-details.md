# Instance Details

This topic describes using the Replicated vendor portal to quickly understand the recent events and performance of application instances installed in your customers' environments.
## About the Instance Details Page {#about-page}

The vendor portal provides insights about the health, status, and performance of the active application instances associated with each customer license on the **Instance details** page. You can use the insights on the **Instance details** page to more quickly troubleshoot issues with your customers' active instances, helping to reduce support burden. 

For example, you can use the **Instance details** page to track the following events for each instance:

* Recent performance degradation or downtime
* Length of instance downtime
* Recent changes to the cluster or infrastructure
* Changes in the number of nodes, such as nodes lost or added
* Changes in the cluster's Kubernetes version
* Changes in the application version that the instance is running

To access the **Instance details** page, go to **Customers** and click the **Customer reporting** button for the customer that you want to view:

![Customer reporting button on the Customers page](/images/customer-reporting-button.png)

From the **Reporting** page for the selected customer, click the **View details** button for the desired application instance.

The following shows an example of the **Instance details** page:

![Instance details full page](/images/instance-details.png)

[View a larger version of this image](/images/instance-details.png)

As shown in the image above, the **Instance details** page includes the following sections:

* **Current State**: Information about the state of the instance, such as the current application version. See [Current State](#current-state) below.
* **Instance Insights**: Key performance indicators (KPIs) related to health, performance, and adoption. See [Insights](#insights) below. 
* **Instance Information**: Information about the cluster where the instance is installed, such as the version of Kubernetes running on the cluster. See [Instance Information](#install-information) below.
* **Custom Metrics**: The values for any custom metrics that are configured for the application, from the most recent check-in. For more information about configuring custom metrics, see [Configuring Custom Metrics](/vendor/custom-metrics).
* **Instance Uptime**: Details about instance uptime over time. See [Instance Uptime](#instance-uptime) below.
* **Instance Activity**: Event data stream. See [Instance Activity](#instance-activity) below.

### Current State

The **Current State** section displays the following event data about the status and version of the instance:

* **App status**: The status of the application. Possible statuses are Ready, Updating, Degraded, Unavailable, and Missing. For more information, see [Enabling and Understanding Application Status](insights-app-status).

* **App version**: The version label of the currently running release. You define the version label in the release properties when you promote the release. For more information about defining release properties, see [Properties](releases-about#properties) in _About Channels and Releases_.

   If there is no version label for the release, then the vendor portal displays the release sequence in the **App version** field. You can find the sequence number associated with a release by running the `replicated release ls` command. See [release ls](/reference/replicated-cli-release-ls) in the _replicated CLI_ documentation.

* **Version age**: The absolute and relative ages of the instance:

  * **Absolute age**: `now - current_release.promoted_date`
  
     The number of days since the currently running application version was promoted to the channel. For example, if the instance is currently running version 1.0.0, and version 1.0.0 was promoted to the channel 30 days ago, then the absolute age is 30.

  * **Relative age (Days Behind Latest)**: `channel.latest_release.promoted_date - current_release.promoted_date`
  
     The number of days between when the currently running application version was promoted to the channel and when the latest available version on the channel was promoted.
     
     For example, the instance is currently running version 1.0.0, which was promoted to the Stable channel. The latest version available on the Stable channel is 1.5.0. If 1.0.0 was promoted 30 days ago and 1.5.0 was promoted 10 days ago, then the relative age of the application instance is 20 days. 

* **Versions behind**: The number of versions between the currently running version and the latest version available on the channel where the instance is assigned.

   For example, the instance is currently running version 1.0.0, which was promoted to the Stable channel. If the later versions 1.1.0, 1.2.0, 1.3.0, 1.4.0, and 1.5.0 were also promoted to the Stable channel, then the instance is five versions behind.

* **Last check-in**: The timestamp when the instance most recently sent data to the vendor portal. The vendor portal receives instance data when any of the following occur:

  <Checkins/>

### Instance Insights

The **Insights** section includes the following metrics computed by the vendor portal:

* [Uptime](#uptime)
* [Time to Install](#time-to-install)

#### Uptime

The vendor portal computes the total uptime for the instance as the fraction of time that the instance spends with a Ready, Updating, or Degraded status. The vendor portal also provides more granular details about uptime in the **Instance Uptime** graph. See [Instance Uptime](#instance-uptime) below.

High uptime indicates that the application is reliable and able to handle the demands of the customer environment. Low uptime might indicate that the application is prone to errors or failures. By measuring the total uptime, you can better understand the performance of your application.

The following table lists the application statuses that are associated with an Up or Down state in the total uptime calculation:

<table>
  <tr>
    <th>Uptime State</th>
    <th>Application Statuses</th>
  </tr>
  <tr>
    <td>Up</td>
    <td>Ready, Updating, or Degraded</td>
  </tr>
  <tr>
    <td>Down</td>
    <td>Missing or Unavailable</td>
  </tr>
</table>

:::note
The vendor portal includes time spent in a Degraded status in the total uptime for an instance because an app may still be capable of serving traffic when some subset of desired replicas are available. Further, it is possible that a Degraded state is expected during upgrade.
:::

#### Time to Install

The vendor portal computes both _License time to install_ and _Instance time to install_ metrics to represent how quickly the customer was able to deploy the application to a Ready state in their environment.

Replicated recommends that you use Time to Install as an indicator of the quality of the packaging, configuration, and documentation of your application.

If the installation process for your application is challenging, poorly documented, lacks appropriate preflight checks, or relies heavily on manual steps, then it can take days or weeks to deploy the application in customer environments. A longer Time to Install generally represents a significantly increased support burden and a degraded customer installation experience.

The following describes the _License time to install_ and _Instance time to install_ metrics:

* **License time to install**: The time between when you create the customer license in the vendor portal, and when the application instance reaches a Ready status in the customer environment.

   License time to install represents the time that it takes for a customer to successfully deploy your application after you intend to distribute the application to the customer. Replicated uses the timestamp of when you create the customer license in the vendor portal to represent your intent to distribute the application because creating the license file is generally the final step before you share the installation materials with the customer.

   License time to install includes several activities that are involved in deploying the application, including the customer receiving the necessary materials and documentation, downloading the assets, provisioning the required hardware, networking, external systems, completing the preflight checks, and finally installing, configuring, and deploying the application.

* **Instance time to install**: The time between when the vendor portal records the first event for the application instance in the customer environment, and when the instance reaches a Ready status.

   Instance time to install is the length of time that it takes for the application to reach a Ready state after the customer starts a deployment attempt in their environment. Replicated considers a deployment attempt started when the vendor portal first records an event for the instance.
   
   For more information about how the vendor portal generates events, see [About Events](instance-insights-event-data#about-events) in _Event Data_.
   
  :::note
  Instance time to install does _not_ include any deployment attempts that a customer might have made that did not generate an event. For example, time spent by the customer discarding the server used in a failed attempt before attempting to deploy the instance again on a new server.
  :::

### Instance Information

The **Instance Information** section displays the following details about the cluster infrastructure where the application is installed:

* The Kubernetes distribution for the cluster. For example, GKE or EKS.
* The version of Kubernetes running in the cluster.
* The version of KOTS or the Replicated SDK installed in the cluster.
* For **First Seen**, the timestamp of the first event that the vendor portal generated for the instance. For more information about how the vendor portal generates events, see [About Events](instance-insights-event-data#about-events) in _Event Data_.
* If detected, the cloud provider and region where the cluster is running. For example, `GCP: us-central1`.

In addition to the details listed above, the **Instance Information** section also displays the following for embedded clusters provisioned by Replicated kURL:
* Node operating systems
* Node operating systems versions
* Total number of cluster nodes
* Number of cluster nodes in a Ready state
* ID of the Kubernetes installer specification

For more information about the data fields displayed in the **Instance Information** section, see [Cluster Status Events](instance-insights-event-data#cluster) and [Infrastructure Status Events](instance-insights-event-data#infrastructure) in _Event Data_.

### Instance Uptime

The **Instance Uptime** graph shows the percentage of a given time period that the instance was in an Up, Degraded, or Down state. 

To determine if the instance is Up, Degraded, or Down, the vendor portal uses the application status. Possible application statuses are Ready, Updating, Degraded, Unavailable, and Missing. The following table lists the application statuses that are associated with each state in the **Instance Uptime** graph:

<table>
  <tr>
    <th>Uptime State</th>
    <th>Application Statuses</th>
  </tr>
  <tr>
    <td>Up</td>
    <td>Ready or Updating</td>
  </tr>
  <tr>
    <td>Degraded</td>
    <td>Degraded</td>
  </tr>
  <tr>
    <td>Down</td>
    <td>Missing or Unavailable</td>
  </tr>
</table>

The following shows an example of an **Instance Uptime** graph:

![Uptime Graph on the Instance details page](/images/instance-uptime-graph.png)

You can hover over the bars in the **Instance Uptime** graph to view more detail about the percent of time that the instance was in each state during the given time period.

![Uptime Graph with event markers on the Instance details page](/images/instance-uptime-graph-event-markers.png)

You can hover over the event markers in the **Instance Uptime** graph to view more detail about the events that occurred during that given interval on the graph. If more than two events occurred in that period, the event marker displays the number of events that occurred during that period. If you click the event marker or the event in the tooltip, the **Instance Activity** section highlights the event or the first event in the group.

### Instance Activity

The **Instance Activity** section displays recent events for the instance. The data stream is updated each time an instance _check-in_ occurs. For more information about what triggers an instance check-in, see [How the Vendor Portal Collects Instance Data](instance-insights-event-data#about-reporting) in _About Instance and Event Data_.

The timestamp of events displayed in the **Instance Activity** stream is the timestamp when the Replicated Vendor API received data from the instance. The timestamp of events does not necessarily reflect the timestamp of when the event occurred.

The following shows an example of the **Instance Activity** data stream:

![Instance Activity section of Instance details page](/images/instance-activity.png)

You can filter the **Instance Activity** stream by the following categories:

* [App install/upgrade](#app-install-upgrade)
* [App status](#app-status)
* [Cluster status](#cluster)
* [Custom metrics](#custom-metrics)
* [Infrastructure status](#infrastructure)
* [KOTS version](#kots)
* [Replicated SDK version](#sdk)
* [Upstream update](#upstream)

The following tables describe the events that can be displayed in the **Instance Activity** stream for each of the categories above:
#### App install/upgrade {#app-install-upgrade}

<table>
  <tr>
    <th>Label</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td>App Channel</td>
    <td>The ID of the channel the application instance is assigned.</td>
  </tr> 
  <tr>
    <td>App Version</td>
    <td>The version label of the release that the instance is currently running. The version label is the version that you assigned to the release when promoting it to a channel.</td>
  </tr> 
</table>

#### App status {#app-status}

<table>
  <tr>
    <th>Label</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td>App Status</td>
    <td>
      <p>A string that represents the status of the application. Possible values: Ready, Updating, Degraded, Unavailable, Missing.</p>
      <p>Additional configuration is required to get app status data. See <a href="insights-app-status">Enabling and Understanding Application Status</a>.</p>
    </td>
  </tr>
</table>

#### Cluster status {#cluster}

<table>
  <tr>
    <th>Label</th>
    <th>Description</th> 
  </tr> 
  <tr>
    <td>Cluster Type</td>
    <td>
      <p>Indicates if the cluster was provisioned by kURL.</p>
      <p>Possible values:</p>
      <ul>
        <li><code>kURL</code>: The cluster is provisioned by kURL.</li>
        <li><code>Existing</code>: The cluster is <em>not</em> provisioned by kURL.</li>
      </ul>
      <p>For more information about kURL clusters, see <a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</p>
    </td>
  </tr> 
  <tr>
    <td>Kubernetes Version</td>
    <td>The version of Kubernetes running in the cluster.</td>
  </tr>
  <tr>
    <td>Kubernetes Distribution</td>
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
  </tr>
  <tr>
    <td>kURL Nodes Total</td>
    <td>
      <p>Total number of nodes in the cluster.</p>
      <p><strong>Note:</strong> Applies only to kURL clusters.</p>
    </td>
  </tr>
  <tr>
    <td>kURL Nodes Ready</td>
    <td>
      <p>Number of nodes in the cluster that are in a healthy state and ready to run Pods.</p>
      <p><strong>Note:</strong> Applies only to kURL clusters.</p>
    </td>
  </tr>
  <tr>
    <td>New kURL Installer</td>
    <td>
      <p>The ID of the Kubernetes installer specification that kURL used to provision the cluster. Indicates that a new Installer specification was added. An installer specification is a manifest file that has <code>apiVersion: cluster.kurl.sh/v1beta1</code> and <code>kind: Installer</code>. </p>
      <p>For more information about installer specifications for kURL, see <a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</p>
      <p><strong>Note:</strong> Applies only to kURL clusters.</p>
    </td> 
  </tr>  
</table>

#### Custom metrics {#custom-metrics}

You can filter the activity feed by any custom metrics that are configured for the application. The labels for the custom metrics vary depending on the custom key value pairs included in the data set that is sent to the vendor portal. For example, the key value pair `"num_projects": 5` is displayed as **Num Projects: 5** in the activity feed.

For more information about configuring custom metrics, see [Configuring Custom Metrics](/vendor/custom-metrics).
#### Infrastructure status {#infrastructure}

<table>
  <tr>
    <th>Label</th>
    <th>Description</th>
  </tr> 
  <tr>
    <td>Cloud Provider</td>
    <td>
      <p>The cloud provider where the instance is running. Cloud provider is determined by the IP address that makes the request.</p>
      <p>Possible values:</p>
      <ul>
        <li>AWS</li>
        <li>GCP</li>
        <li>DigitalOcean</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Cloud Region</td>
    <td>
      <p>The cloud provider region where the instance is running. For example, <code>us-central1-b</code></p>
    </td> 
  </tr>
</table>

#### KOTS version {#kots}

<table>
  <tr>
    <th>Label</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>KOTS Version</td>
    <td>The version of KOTS that the instance is running. KOTS version is displayed as a Semantic Versioning compliant string.</td> 
  </tr> 
</table>

#### Replicated SDK version {#sdk}

<table>
  <tr>
    <th>Label</th>
    <th>Description</th> 
  </tr>
  <tr>
    <td>Replicated SDK Version</td>
    <td>The version of the Replicated SDK that the instance is running. SDK version is displayed as a Semantic Versioning compliant string.</td>
  </tr> 
</table>

#### Upstream update {#upstream}

<table>
  <tr>
    <th>Label</th>
    <th>Description</th> 
  </tr> 
  <tr>
    <td>Versions Behind</td>
    <td>
      <p>The number of versions between the version that the instance is currently running and the latest version available on the channel.</p>
      <p>Computed by the vendor portal each time it receives instance data.</p>
    </td>
  </tr>
</table>
