# Add Custom Graphs

This topic describes how to customize the graphs that are displayed on the Replicated Admin Console dashboard.

## Overview of Monitoring with Prometheus

The KOTS Admin Console can use the open source systems monitoring tool Prometheus to collect metrics on an application and the cluster where the application is installed. Prometheus components include the main Prometheus server, which scrapes and stores time series data, an Alertmanager for alerting on metrics, and Grafana for visualizing metrics. For more information about Prometheus, see [What is Prometheus?](https://prometheus.io/docs/introduction/overview/) in the Prometheus documentation.

The Admin Console exposes graphs with key metrics collected by Prometheus in the **Monitoring** section of the dashboard. By default, the Admin Console displays the following graphs:

* Cluster disk usage
* Pod CPU usage
* Pod memory usage

In addition to these default graphs, application developers can also expose business and application level metrics and alerts on the dashboard.

The following screenshot shows an example of the **Monitoring** section on the Admin Console dashboard with the Disk Usage, CPU Usage, and Memory Usage default graphs:

<img alt="Graphs on the Admin Console dashboard" src="/images/kotsadm-dashboard-graph.png" width="700px"/> 

[View a larger version of this image](/images/kotsadm-dashboard-graph.png)

## About Customizing Graphs

If your application exposes Prometheus metrics, you can add custom graphs to the Admin Console dashboard to expose these metrics to your users. You can also modify or remove the default graphs.

To customize the graphs that are displayed on the Admin Console, edit the [`graphs`](/reference/custom-resource-application#graphs) property in the KOTS Application custom resource manifest file. At a minimum, each graph in the `graphs` property must include the following fields:
* `title`: Defines the graph title that is displayed on the Admin Console.
* `query`: A valid PromQL Prometheus query. You can also include a list of multiple queries by using the `queries` property. For more information about querying Prometheus with PromQL, see [Querying Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/) in the Prometheus documentation.

:::note
By default, a kURL cluster exposes the Prometheus expression browser at NodePort 30900. For more information, see [Expression Browser](https://prometheus.io/docs/visualization/browser/) in the Prometheus documentation.
:::

## Limitation

Monitoring applications with Prometheus is not supported for installations with [Replicated Embedded Cluster](/vendor/embedded-overview).

## Add and Modify Graphs

To customize graphs on the Admin Console dashboard:

1. In the [Vendor Portal](https://vendor.replicated.com/), click **Releases**. Then, either click **Create release** to create a new release, or click **Edit YAML** to edit an existing release.

1. Create or open the [KOTS Application](/reference/custom-resource-application) custom resource manifest file.

1. In the Application manifest file, under `spec`, add a `graphs` property. Edit the `graphs` property to modify or remove existing graphs or add a new custom graph. For more information, see [graphs](/reference/custom-resource-application#graphs) in _Application_.

   **Example**:

   The following example shows the YAML for adding a custom graph that displays the total number of user signups for an application.

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: Application
   metadata:
     name: my-application
   spec:
     graphs:
       - title: User Signups
         query: 'sum(user_signup_events_total)'        
   ```

1. (Optional) Under `graphs`, copy and paste the specs for the default Disk Usage, CPU Usage, and Memory Usage Admin Console graphs provided in the YAML below.

   Adding these default graphs to the Application custom resource manifest ensures that they are not overwritten when you add one or more custom graphs. When the default graphs are included in the Application custom resource, the Admin Console displays them in addition to any custom graphs.

   Alternatively, you can exclude the YAML specs for the default graphs to remove them from the Admin Console dashboard.

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: Application
   metadata:
     name: my-application
   spec:
     graphs:
       - title: User Signups
         query: 'sum(user_signup_events_total)'
       # Disk Usage, CPU Usage, and Memory Usage below are the default graphs
       - title: Disk Usage
         queries:
           - query: 'sum((node_filesystem_size_bytes{job="node-exporter",fstype!="",instance!=""} - node_filesystem_avail_bytes{job="node-exporter", fstype!=""})) by (instance)'
             legend: 'Used: {{ instance }}'
           - query: 'sum((node_filesystem_avail_bytes{job="node-exporter",fstype!="",instance!=""})) by (instance)'
             legend: 'Available: {{ instance }}'
         yAxisFormat: bytes
       - title: CPU Usage
         query: 'sum(rate(container_cpu_usage_seconds_total{namespace="{{repl Namespace}}",container!="POD",pod!=""}[5m])) by (pod)'
         legend: '{{ pod }}'
       - title: Memory Usage
         query: 'sum(container_memory_usage_bytes{namespace="{{repl Namespace}}",container!="POD",pod!=""}) by (pod)'
         legend: '{{ pod }}'
         yAxisFormat: bytes
      ```   
1. Save and promote the release to a development environment to test your changes.