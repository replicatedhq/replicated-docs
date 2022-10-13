# Adding Custom Graphs

This topic describes how to customize the graphs that are displayed on the Replicated admin console dashboard.

## Overview of Monitoring with Prometheus

The admin console uses the open source systems monitoring tool, Prometheus, to collect metrics on an application and the cluster where the application is installed. For more information about Prometheus, see [What is Prometheus?](https://prometheus.io/docs/introduction/overview/) in the Prometheus documentation.

The admin console Prometheus monitoring system also exposes graphs with key metrics on the admin console dashboard. By default, the admin console includes graphs with the following metrics:

* Cluster disk usage
* Pod CPU usage
* Pod memory usage

The screenshot below shows an example of the Monitoring section on the admin console dashboard with the Disk Usage, CPU Usage, and Memory Usage default graphs.

![Graphs on the admin console dashboard](/images/kotsadm-dashboard-graph.png)

If your users install your application on an embedded cluster created by the Replicated Kubernetes installer, the Prometheus monitoring system is included by default alongside the installed application. No additional configuration is required to collect metrics and view any default and custom graphs on the admin console dashboard.

If your users install your application on an existing cluster, they must connect the admin console to a Prometheus endpoint on their cluster to collect metrics and view default and custom graphs. For more information about how users connect to a Prometheus endpoint on an existing cluster, see [Monitoring Applications](../enterprise/monitoring-applications) in the _Enterprise_ documentation.

## About Customizing Graphs

If your application exposes Prometheus metrics, you can add custom graphs to the admin console dashboard to expose these metrics to your users. You can also modify or remove the default graphs.

To customize the graphs that are displayed on the admin console, edit the `graphs` property in the Application custom resource manifest file. At a minimum, each graph in the `graphs` property must include the following fields:
  * `title`: Defines the graph title that is displayed on the admin console.
  * `query`: A valid PromQL Prometheus query. You can also include a list of multiple queries by using the `queries` property. For more information about querying Prometheus with PromQL, see [Querying Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/) in the Prometheus documentation.

  :::note
  By default, an embedded cluster created by the Kubernetes installer exposes the Prometheus expression browser at NodePort 30900. For more information, see [Expression Browser](https://prometheus.io/docs/visualization/browser/) in the Prometheus documentation.
  :::

## Add and Modify Graphs

To customize graphs on the admin console dashboard:

1. In the [vendor portal](https://vendor.replicated.com/), click **Releases**. Then, either click **Create release** to create a new release, or click **Edit YAML** to edit an existing release.

1. Create or open the Application custom resource manifest file. An Application custom resource manifest file has `kind: Application`.

1. In the Application manifest file, under `spec`, add a `graphs` property. Edit the `graphs` property to modify or remove existing graphs or add a new custom graph. For more information about the syntax of the `graphs` property, see [graphs](../reference/custom-resource-application#graphs) in _Application_.

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

1. (Optional) Under `graphs`, copy and paste the specifications for the default Disk Usage, CPU Usage, and Memory Usage admin console graphs provided in the YAML below.

   Adding these default graphs to the Application custom resource manifest ensures that they are not overwritten when you add one or more custom graphs. When the default graphs are included in the Application custom resource, the admin console displays them in addition to any custom graphs.

   Alternatively, you can exclude the YAML specifications for the default graphs to remove them from the admin console dashboard.

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
