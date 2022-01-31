# Adding custom graphs

By default, when installing an application into an embedded cluster, the Prometheus monitoring system will be included alongside the application.
This will collect valuable metrics about the cluster as well as the application and expose graphs with key metrics on the dashboard of the admin console.
When running in an existing cluster, it is possible to configure the address of the Prometheus service in the Admin Console.

![Graphs](/images/kotsadm-dashboard-graph.png)

By default, metrics graphs that are included monitor cluster disk usage, pod cpu usage, pod memory usage and pod health.

### Application manifest

To add custom graphs, use the `graphs` property of the `application.yaml` manifest file.
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

### Prometheus Query

A valid PromQL prometheus query is required in the `query` property.
By default an embedded cluster exposes the [Prometheus Expression Browser](https://prometheus.io/docs/visualization/browser/) at NodePort 30900.
This can be used to aid in constructing queries.

For more information on querying Prometheus with PromQL, see [Querying Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/).
