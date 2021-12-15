# Monitoring applications with Prometheus

Kots includes built-in monitoring functionality for all distributed applications.
By default, Kots displays cluster disk usage, pod cpu usage, pod memory usage, and pod health graphs on the dashboard page of the Admin Console.
Additionally, application developers can choose to expose business and application level metrics and alerts.
In order to take advantage of the monitoring functionality, [Prometheus](https://prometheus.io/) will need to be installed in the cluster.

If Prometheus is already installed, see [Configuring Kots](#configuring-kots) below for more information on configuring an existing Prometheus installation.

![Admin Console Dashboard](/images/kotsadm-dashboard-graph.png)

### About Prometheus

Prometheus is an open-source systems monitoring and alerting toolkit.
Prometheus features a multi-dimensional data model with time series data and a flexible query language to leverage this dimensionality.
Prometheus's components include the main Prometheus server which scrapes and stores time series data, and an alertmanager to handle alerts.
More information on Promethus can be found in the [official documentation](https://prometheus.io/docs/introduction/overview/).

### Installing Prometheus

We recommend using CoreOS's [Kube-Prometheus](https://github.com/coreos/kube-prometheus) distribution for installing and configuring highly available Prometheus in an existing Kubernetes cluster.
This repository collects Kubernetes manifests, Grafana dashboards, and Prometheus rules combined with documentation and scripts to provide easy to operate end-to-end Kubernetes cluster monitoring with Prometheus using the Prometheus Operator.

To quickly get Prometheus running, clone the repo to the device from where there is access to the cluster via `kubectl`. `kubectl` can then be used to create the resources in the cluster.

```bash
# Create the namespace and CRDs, and then wait for them to be availble before creating the remaining resources
kubectl create -f manifests/setup
until kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done
kubectl create -f manifests/
```

For more advanced and cluster-specific configuration, the Kube-Prometheus can be customized by compiling the manifests using [jsonnet](https://jsonnet.org/). More details on advanced configuring can be found [here](https://github.com/coreos/kube-prometheus#customizing-kube-prometheus).

### Configuring Kots

Once installed, Kots needs to be made aware of the address of the Prometheus instance within the cluster in which it is installed.
The address can be configured on the Admin Console dashboard page, by clicking the "Configure Prometheus Address" link and entering the address in the text box and clicking "Save".
Graphs should appear on the dashboard shortly after saving the address.
A [support bundle](/kotsadm/troubleshooting/support-bundle/) may include more information when troubleshooting configuration of the Prometheus address.

![Configuring Prometheus](/images/kotsadm-dashboard-configureprometheus.png)

### Access the dashboards

Prometheus, Grafana, and Alertmanager dashboards can be accessed quickly using kubectl port-forward after installing the manifests via the commands below.
For more advanced configuration it is possible to expose these pods on [NodePorts](https://github.com/coreos/kube-prometheus#nodeports) or behind an [ingress controller](https://github.com/coreos/kube-prometheus#exposing-prometheusalermanagergrafana-via-ingress).

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

In addition to the [Prometheus Expression Browser](https://prometheus.io/docs/visualization/browser/), [Grafana](https://grafana.com/) along with some preconfigured dashboards are included with Kube-Prometheus for advanced visualization.
More information on how to configure Grafana can be found in the [Grafana documentation](https://grafana.com/docs/).
For documentation on constructing Prometheus queries, see the [Querying documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/).

### Alerting

Alerting with Prometheus is separated into two parts.
Alerting rules in Prometheus servers send alerts to an Alertmanager.
The Alertmanager then manages those alerts, including silencing, inhibition, aggregation, and sending out notifications via methods such as email, on-call notification systems, and chat platforms.

For more information on how to configure Alertmanager, see [the configuration documentation](https://prometheus.io/docs/alerting/configuration/).
