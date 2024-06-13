# Monitoring Applications

This topic describes monitoring applications and clusters with Prometheus. It includes information about how to configure Prometheus monitoring for existing clusters and how to access the dashboard using a port forward.

## Overview

The Replicated KOTS Admin Console uses the open source systems monitoring tool Prometheus to collect metrics on an application and the cluster where the application is installed.

Prometheus uses a multi-dimensional data model with time series data and a flexible query language. Prometheus components include the main Prometheus server, which scrapes and stores time series data, and an Alertmanager for alerting on metrics.

For more information about Prometheus, see [What is Prometheus?](https://prometheus.io/docs/introduction/overview/) in the Prometheus documentation.

Prometheus is included by default on clusters provisioned by Replicated kURL, and no additional configuration is required to view graphs on the Admin Console dashboard.

For information about how to set up Prometheus monitoring in existing clusters, see [Configure Monitoring in Existing Clusters](#configure-existing).

## Limitation

Monitoring applications with Prometheus from the KOTS Admin Console is not supported for installations with [Replicated Embedded Cluster](/vendor/embedded-overview).

## About Admin Console Dashboards

The Admin Console exposes graphs with key metrics collected by Prometheus in the Monitoring section of the dashboard. By default, the Admin Console includes the following graphs:

* Cluster disk usage
* Pod CPU usage
* Pod memory usage

In addition to these default graphs, application developers can also expose business and application level metrics and alerts on the dashboard.

The following screenshot shows an example of the Monitoring section on the Admin Console dashboard with the Disk Usage, CPU Usage, and Memory Usage default graphs.

![Graphs on the Admin Console dashboard](/images/kotsadm-dashboard-graph.png) 

## Configure Monitoring in Existing Clusters {#configure-existing}

To configure Prometheus monitoring for applications installed in an existing cluster, you must connect the Admin Console to the endpoint of an installed instance of Prometheus on the cluster. See the following sections:

* [Install Prometheus](#install-prometheus)
* [Connect to a Prometheus Endpoint](#connect-to-a-prometheus-endpoint)

### Install Prometheus

Replicated recommends that you use CoreOS's Kube-Prometheus distribution for installing and configuring highly available Prometheus on an existing cluster. For more information, see the [kube-prometheus](https://github.com/coreos/kube-prometheus) GitHub repository.

This repository collects Kubernetes manifests, Grafana dashboards, and Prometheus rules combined with documentation and scripts to provide easy to operate end-to-end Kubernetes cluster monitoring with Prometheus using the Prometheus Operator.

To install Prometheus using the recommended Kube-Prometheus distribution:

1. Clone the [kube-prometheus](https://github.com/coreos/kube-prometheus) repository to the device where there is access to the cluster.

1. Use `kubectl` to create the resources on the cluster:

   ```bash
   # Create the namespace and CRDs, and then wait for them to be available before creating the remaining resources
   kubectl create -f manifests/setup
   until kubectl get servicemonitors --all-namespaces ; do date; sleep 1; echo ""; done
   kubectl create -f manifests/
   ```

   For advanced and cluster-specific configuration, you can customize Kube-Prometheus by compiling the manifests using jsonnet. For more information, see the [jsonnet website](https://jsonnet.org/).

   For more information about advanced Kube-Prometheus configuration options, see [Customizing Kube-Prometheus](https://github.com/coreos/kube-prometheus#customizing-kube-prometheus) in the kube-prometheus GitHub repository.

### Connect to a Prometheus Endpoint

To view graphs on the Admin Console dashboard, you must provide the address of the Prometheus instance that you installed on the cluster.

To connect the Admin Console to a Prometheus endpoint:

1. On the Admin Console dashboard, under Monitoring, click **Configure Prometheus Address**.
1. Enter the address for the Prometheus endpoint in the text box and click **Save**.

   ![Configuring Prometheus](/images/kotsadm-dashboard-configureprometheus.png)

   Graphs appear on the dashboard shortly after saving the address.

## Access the Dashboards with kubectl Port Forward

You can use the commands below to access Prometheus, Grafana, and Alertmanager dashboards using `kubectl port-forward` after you install the manifests.

You can also expose these pods on NodePorts or behind an ingress controller. This is an advanced use case. For information about exposing the pods on NodePorts, see [NodePorts](https://github.com/prometheus-operator/kube-prometheus/blob/main/docs/customizations/node-ports.md) in the kube-prometheus GitHub repository. For information about exposing the pods behind an ingress controller, see [Expose via Ingress](https://github.com/prometheus-operator/kube-prometheus/blob/main/docs/customizations/exposing-prometheus-alertmanager-grafana-ingress.md) in the kube-prometheus GitHub repository.

For embedded clusters created with kURL, you can consume Prometheus metrics from an external monitoring solution by connecting to the Prometheus NodePort service running in the cluster. For more information, see [Consuming Prometheus Metrics Externally](monitoring-external-prometheus). 

### Access Prometheus

To access the Prometheus dashboard with a port forward:

1. Run the following command to create the port forward:

   ```bash
   kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
   ```

1. Access the dashboard at http://localhost:9090.

### Access Grafana

To access the Grafana dashboard with a port forward:

1. Run the following command to create the port forward:

   ```bash
   kubectl --namespace monitoring port-forward deployment/grafana 3000
   ```
1. Access the dashboard at http://localhost:3000.
1. Log in to Grafana:
   * **Existing cluster**: Use the default Grafana username and password: `admin:admin`.
   * **Embedded kURL cluster**: The Grafana password is randomly generated by kURL and is displayed on the command line after the kURL provisions the cluster. To log in, use this password generated by kURL and the username `admin`.

      To retrieve the password, run the following kubectl command:

      ```
      kubectl get secret -n monitoring grafana-admin -o jsonpath="{.data.admin-password}" | base64 -d
      ```

### Access Alertmanager

To access the Alertmanager dashboard with a port forward:

1. Run the following command to create the port forward:

   ```
   kubectl --namespace monitoring port-forward svc/prometheus-alertmanager 9093
   ```

1. Access the dashboard at http://localhost:9093.

## About Visualizing Metrics with Grafana

In addition to the Prometheus Expression Browser, Grafana and some preconfigured dashboards are included with Kube-Prometheus for advanced visualization.

For information about configuring Grafana, see the [Grafana documentation](https://grafana.com/docs/).

For information about constructing Prometheus queries, see the [Querying Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/) in the Prometheus documentation.

For information about the Prometheus Expression Browser, see [Expression Browser](https://prometheus.io/docs/visualization/browser/) in the Prometheus documentation.


## About Alerting with Prometheus

Alerting with Prometheus has two phases:

1. Alerting rules in Prometheus servers send alerts to an Alertmanager.
1. The Alertmanager then manages those alerts, including silencing, inhibition, aggregation, and sending out notifications through methods such as email, on-call notification systems, and chat platforms.

For more information about configuring Alertmanager, see [Configuration](https://prometheus.io/docs/alerting/configuration/) in the Prometheus documentation.
