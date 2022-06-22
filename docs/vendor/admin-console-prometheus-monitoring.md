# Adding Custom Graphs

This topic describes how to add custom graphs on the Replicated admin console dashboard.

## Overview of Monitoring with Prometheus

The admin console uses the open source systems monitoring tool, Prometheus, to collect metrics on an application and the cluster where the application is installed. For more information about Prometheus, see [What is Prometheus?](https://prometheus.io/docs/introduction/overview/) in the Prometheus documentation.

The Prometheus monitoring system also exposes graphs with key metrics on the admin console dashboard. By default, the admin console includes graphs with the following metrics:

* Cluster disk usage
* Pod CPU usage
* Pod memory usage
* Pod health

The screenshot below shows an example of the Monitoring section on the admin console dashboard with Disk Usage, CPU Usage, and Memory Usage graphs.

![Graphs on the admin console dashboard](/images/kotsadm-dashboard-graph.png)

## About Customizing Graphs

You can customize the graphs that appear on the admin console dashboard by editing the `graphs` property in the Application custom resource manifest file. For example, if your application exposes Prometheus metrics, you can add custom graphs to the admin console dashboard to expose these metrics to your enterprise users.

If your enterprise users install your application on an embedded cluster created by the Replicated Kubernetes installer, the Prometheus monitoring system is included by default alongside the installed application. No additional configuration is required to view the graphs that are defined in the Application manifest file, including any default or custom graphs.

If your enterprise users install your application on an existing cluster, they can connect the admin console to a Prometheus endpoint on their cluster to view the graphs defined in the Application manifest file. For more information about how users connect to a Prometheus endpoint, see [Monitoring Applications](../enterprise/monitoring-applications) in the _Enterprise_ documentation.

## Add Custom Graphs

You can add new graphs as well as modify or remove the existing default graphs by editing the Application custom resource manifest file.

A minimal graph includes only a title and a Prometheus query:

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

See below for a more robust example:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: my-application
spec:
  graphs:
    - title: Disk Usage
      queries:
        - query: 'sum((node_filesystem_size_bytes{job="node-exporter",fstype!="",instance!=""} - node_filesystem_avail_bytes{job="node-exporter", fstype!=""})) by (instance)'
          legend: 'Used: {{ instance }}'
        - query: 'sum((node_filesystem_avail_bytes{job="node-exporter",fstype!="",instance!=""})) by (instance)'
          legend: 'Available: {{ instance }}'
      yAxisFormat: bytes
```

For more information about the fields for the `graphs` property, see [graphs](../reference/custom-resource-application#graphs) in _Application_.

### Prometheus Query

A valid PromQL prometheus query is required in the `query` property.
By default an embedded cluster exposes the [Prometheus Expression Browser](https://prometheus.io/docs/visualization/browser/) at NodePort 30900.
This can be used to aid in constructing queries.

For more information on querying Prometheus with PromQL, see [Querying Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/).
