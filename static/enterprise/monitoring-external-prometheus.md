# Consume Prometheus Metrics Externally

:::note
Replicated kURL is available only for existing customers. If you are not an existing kURL user, use Replicated Embedded Cluster instead. For more information, see [Use Embedded Cluster](/vendor/embedded-overview).

kURL is a Generally Available (GA) product for existing customers. For more information about the Replicated product lifecycle phases, see [Support Lifecycle Policy](/vendor/policies-support-lifecycle).
:::

This topic describes how to consume Prometheus metrics in Replicated kURL clusters from a monitoring service that is outside the cluster.

For information about how to access Prometheus, Grafana, and Alertmanager, see [Accessing Dashboards Using Port Forwarding](/enterprise/monitoring-access-dashboards).

## Overview

The KOTS Admin Console can use the open source systems monitoring tool Prometheus to collect metrics on an application and the cluster where the application is installed. Prometheus components include the main Prometheus server, which scrapes and stores time series data, an Alertmanager for alerting on metrics, and Grafana for visualizing metrics. For more information about Prometheus, see [What is Prometheus?](https://prometheus.io/docs/introduction/overview/) in the Prometheus documentation.

The Admin Console exposes graphs with key metrics collected by Prometheus in the **Monitoring** section of the dashboard. By default, the Admin Console displays the following graphs:

* Cluster disk usage
* Pod CPU usage
* Pod memory usage

In addition to these default graphs, application developers can also expose business and application level metrics and alerts on the dashboard.

The following screenshot shows an example of the **Monitoring** section on the Admin Console dashboard with the Disk Usage, CPU Usage, and Memory Usage default graphs:

<img alt="Graphs on the Admin Console dashboard" src="/images/kotsadm-dashboard-graph.png" width="700px"/> 

[View a larger version of this image](/images/kotsadm-dashboard-graph.png)

For kURL installations, if the [kURL Prometheus add-on](https://kurl.sh/docs/add-ons/prometheus) is included in the kURL installer spec, then the Prometheus monitoring system is installed alongside the application. No additional configuration is required to collect metrics and view any default and custom graphs on the Admin Console dashboard.

Prometheus is deployed in kURL clusters as a NodePort service named `prometheus-k8s` in the `monitoring` namespace. The `prometheus-k8s` service is exposed on the IP address for each node in the cluster at port 30900.

You can run the following command to view the `prometheus-k8s` service in your cluster:

```
kubectl get services -l app=kube-prometheus-stack-prometheus -n monitoring
```
The output of the command includes details about the Prometheus service, including the type of service and the ports where the service is exposed. For example:

```
NAME            TYPE      CLUSTER_IP   EXTERNAL_IP  PORT(S)         AGE
prometheus-k8s  NodePort  10.96.2.229  <none>       9090:30900/TCP  5hr
```
As shown in the example above, port 9090 on the `prometheus-k8s` service maps to port 30900 on each of the nodes.

For more information about NodePort services, see [Type NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) in _Services_ in the Kubernetes documentation.  

## Prerequisite

Before you can consume Prometheus metrics in kURL clusters externally, ensure that firewall rules on all nodes in the cluster allow inbound TCP traffic on port 30900. 

## Consume Metrics from External Services

You can connect to the `prometheus-k8s` service on port 30900 from any node in the cluster to access Prometheus metrics emitted by kURL clusters.

To consume Prometheus metrics from an external service:

1. Get the external IP address for one of the nodes in the cluster. You will use this IP address in the next step to access the `prometheus-k8s` service.

   You can find the IP address for a node in the output of the following command:

   ```
   kubectl describe node NODE_NAME
   ```
   Where `NODE_NAME` is the name of a node in the cluster.

   :::note
   Depending on the node's network configuration, there might be different IP addresses for accessing the node from an external or internal network. For example, the IP address 10.128.0.35 might be assigned to the node in the internal network, whereas the IP address used to access the node from external or public networks is 34.28.178.93.
   
   Consult your infrastructure team to assist you in determining which IP address to use.
   :::   

1. In a browser, go to `http://NODE_IP_ADDRESS:30900` to verify that you can connect to the `prometheus-k8s` NodePort service. Replace `NODE_IP_ADDRESS` with the external IP address that you copied in the first step. For example, `http://34.28.178.93:30900`.

   If the connection is successful, the Prometheus UI displays in the browser.

1. From your external monitoring solution, add Prometheus as an HTTP data source using the same URL from the previous step: `http://NODE_IP_ADDRESS:30900`.