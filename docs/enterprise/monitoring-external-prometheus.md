# Consuming Prometheus Metrics Externally

This topic describes how to consume Prometheus metrics in Replicated Kubernetes installer clusters from a monitoring service that is outside the cluster.

## About the Prometheus NodePort Service

By default, Prometheus is included in Kubernetes installer clusters as a NodePort service named `prometheus-k8s` in the `monitoring` namespace. The `prometheus-k8s` service is exposed on the IP address for each node in the cluster at port 30900.

For more information about NodePort services, see [Type NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) in _Services_ in the Kubernetes documentation.  

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

## Prerequisite

Before you can consume Prometheus metrics in Kubernetes installer clusters externally, ensure that firewall rules on all nodes in the cluster allow TCP traffic on port 30900. 

## Consume Metrics from External Services

You can connect to the 

To consume Prometheus metrics from an external service:

1. Get the IP address of one of the nodes in the cluster. You will use this IP address in the next step to access the `prometheus-k8s` service.

   You can find the IP address for a node in the output of the following command:

   ```
   kubectl describe node NODE_NAME
   ```
   Where `NODE_NAME` is the name of a node in the Kubernetes installer cluster.   

1. (Optional) Verify that 

1. From your external monitoring solution, add Prometheus as a data source using the following format: 

   ```
   NODE_IP_ADDRESS:9000/30900
   ```
   Where `NODE_IP_ADDRESS` is the node IP address that you copied in the first step. 