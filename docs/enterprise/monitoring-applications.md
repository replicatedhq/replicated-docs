# Monitoring Applications

The Replicated app manager includes built-in monitoring functionality for all applications.
By default, the app manager displays cluster disk usage, pod cpu usage, pod memory usage, and pod health graphs on the dashboard page of the Replicated admin console.

Additionally, application developers can choose to expose business and application level metrics and alerts.
In order to take advantage of the monitoring functionality, Prometheus will need to be installed in the cluster.

If Prometheus is already installed, see [Configure the Prometheus address](#configure-the-prometheus-address) below for more information on configuring an existing Prometheus installation.

![Admin Console Dashboard](/images/kotsadm-dashboard-graph.png)

### About Prometheus

Prometheus is an open-source systems monitoring and alerting toolkit.
Prometheus features a multi-dimensional data model with time series data and a flexible query language to leverage this dimensionality.

Prometheus's components include the main Prometheus server which scrapes and stores time series data, and an alertmanager to handle alerts.

For more information about Prometheus, see the [Prometheus documentation](https://prometheus.io/docs/introduction/overview/).

### Installing Prometheus

We recommend using CoreOS's Kube-Prometheus distribution for installing and configuring highly available Prometheus in an existing Kubernetes cluster. For more information, see the [kube-prometheus](https://github.com/coreos/kube-prometheus) GitHub repository.

This repository collects Kubernetes manifests, Grafana dashboards, and Prometheus rules combined with documentation and scripts to provide easy to operate end-to-end Kubernetes cluster monitoring with Prometheus using the Prometheus Operator.

To quickly get Prometheus running, clone the repo to the device from where there is access to the cluster via `kubectl`. `kubectl` can then be used to create the resources in the cluster.

```bash
# Create the namespace and CRDs, and then wait for them to be available before creating the remaining resources
kubectl create -f manifests/setup
until kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done
kubectl create -f manifests/
```

For more advanced and cluster-specific configuration, you can customize Kube-Prometheus by compiling the manifests using jsonnet. For more information, see the [jsonnet website](https://jsonnet.org/).

For more information about advanced configuration, see [Customizing Kube-Prometheus](https://github.com/coreos/kube-prometheus#customizing-kube-prometheus) in the kube-prometheus GitHub repository.

### Configure the Prometheus Address

The app manager needs to be made aware of the address of the Prometheus instance within the cluster in which it is installed.

You can configure the address on the admin console dashboard page by clicking **Configure Prometheus Address**, entering the address in the text box, and clicking **Save**.

Graphs appear on the dashboard shortly after saving the address.

A support bundle may include more information when troubleshooting configuration of the Prometheus address. For more information about using support bundles to troubleshoot, see [Troubleshooting an application](troubleshooting-an-app).

![Configuring Prometheus](/images/kotsadm-dashboard-configureprometheus.png)

### Access the Dashboards

You can use the commands below to access Prometheus, Grafana, and Alertmanager dashboards using kubectl port-forward after you install the manifests.

You can also expose these pods on NodePorts or behind an ingress controller. This is an advanced use case.

For information about exposing the pods on NodePorts, see [NodePorts](https://github.com/prometheus-operator/kube-prometheus/blob/main/docs/customizations/node-ports.md) in the kube-prometheus GitHub repository.

For information about exposing the pods behind an ingress controller, see [Expose via Ingress](https://github.com/prometheus-operator/kube-prometheus/blob/main/docs/customizations/exposing-prometheus-alertmanager-grafana-ingress.md) in the kube-prometheus GitHub repository.

##### Prometheus

```bash
$ kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
Then access via http://localhost:9090
```

##### Grafana

```bash
$ kubectl --namespace monitoring port-forward svc/grafana 3000
Then access via http://localhost:3000 and use the default grafana user:password of admin:admin.
```

##### Alert Manager

```bash
$ kubectl --namespace monitoring port-forward svc/alertmanager-main 9093
Then access via http://localhost:9093
```

### Visualization

In addition to the Prometheus Expression Browser, Grafana and some preconfigured dashboards are included with Kube-Prometheus for advanced visualization.

For information about configuring Grafana, see the [Grafana documentation](https://grafana.com/docs/).

For information about constructing Prometheus queries, see the [Querying Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/) in the Prometheus documentation.

For information about the Prometheus Expression Browser, see [Expression Browser](https://prometheus.io/docs/visualization/browser/) in the Prometheus documentation.


### Alerting

Alerting with Prometheus has two phases:

1. Alerting rules in Prometheus servers send alerts to an Alertmanager.
2. The Alertmanager then manages those alerts, including silencing, inhibition, aggregation, and sending out notifications through methods such as email, on-call notification systems, and chat platforms.

For more information about configuring Alertmanager, see [Configuration](https://prometheus.io/docs/alerting/configuration/) in the Prometheus documentation.
