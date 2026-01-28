# Expose Port and Access Applications

This topic explains how to access applications running in Replicated Compatibility Matrix (CMX) clusters and virtual machines (VMs).

## Overview

After you deploy your application into CMX clusters or VMs, there are several methods to expose ports for your application:

- **Port forwarding** works on all distributions for testing via localhost. See [Port Forwarding](#port-forwarding).

- **VM-based distributions** (K3s, Kind, RKE2, OpenShift, kURL, Embedded Cluster) run on Replicated-managed VMs with no public IP addresses. Use CMX Tunnels to expose ports on the public internet. See [CMX Tunnels](#cmx-tunnels).

- **Cloud distributions** (EKS, GKE, AKS, OKE) support native Kubernetes `LoadBalancer` services to expose ports on the public internet. See [LoadBalancer Services](#loadbalancer-services).

## Port Forwarding

Port forwarding works on all CMX clusters and provides access to your application on localhost only, not on the public internet. This is the simplest option for testing and works well for a single service or pod without complex routing requirements.

The basic steps are:

1. Get the kubeconfig for your cluster:

   ```bash
   replicated cluster kubeconfig CLUSTER_ID > kubeconfig.yaml
   ```

1. Connect the port-forward to your service:

   ```bash
   kubectl --kubeconfig=kubeconfig.yaml port-forward svc/my-service 8080:80
   ```

1. Execute your tests against `localhost:8080`.

1. Shut down the port-forward when finished (Ctrl+C).

## VM-Based Distributions

### CMX Tunnels

CMX Tunnels provide public internet access to applications running in VM-based clusters. Tunnels work by connecting to a Kubernetes NodePort service in your cluster.

There is no limit to the number of tunnels you can create for a cluster, and multiple tunnels can connect to a single service.

:::note
You can expose a NodePort that does not yet exist in the cluster. 
This is useful if you have a deterministic NodePort, but need the DNS name as a value in your Helm chart.
:::

The following diagram shows how traffic is routed into the service using CMX Tunnels:

<img src="/images/compatibility-matrix-ingress.png" alt="Compatibility Matrix ingress"></img>

[View a larger version of this image](/images/compatibility-matrix-ingress.png)

#### Limitations

* A tunnel can only connect to one service. If you need fanout routing into different services, consider installing the nginx ingress controller as a `NodePort` service and exposing it.
* Tunnels are not supported for cloud distributions (EKS, GKE, AKS, OKE).

#### Supported Protocols

A tunnel can support one or more protocols. Options are HTTP, HTTPS, WS, and WSS. GRPC and other protocols are not routed into the cluster.

#### Expose Ports on Clusters

##### Using the CLI

To expose a port on a cluster using the Replicated CLI:

```bash
replicated cluster port expose CLUSTER_ID \
    --port NODE_PORT \
    --protocol PROTOCOL
```

You can specify multiple protocols:

```bash
replicated cluster port expose 1e616c55 \
    --port 32456 \
    --protocol http \
    --protocol https
```

For more information, see [cluster port](/reference/replicated-cli-cluster-port).

##### Using the Vendor Portal

To expose ports on a cluster using the Vendor Portal:

1. In the Vendor Portal, go to [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix).

1. Click the cluster name or select **Edit Cluster** from the cluster's menu.

1. Select the **Ingress & Ports** tab.

1. Enter the port number, select the protocols, and click **Add**.

The DNS record and TLS certificate are provisioned automatically. Port status transitions from **Pending** to **Applied** to **Ready**.

#### Use Wildcard DNS

By default, each exposed port gets a unique hostname like `boring-wozniak.ingress.replicatedcluster.com`. If you need multiple subdomains to share a common base domain, use the `--wildcard` flag to create a wildcard DNS entry:

```bash
replicated cluster port expose CLUSTER_ID --port PORT --protocol https --wildcard
```

With a hostname like `*.boring-wozniak.ingress.replicatedcluster.com`, any subdomain will route to your NodePort service. You can have an ingress controller route traffic based on the subdomain:

- `app1.boring-wozniak.ingress.replicatedcluster.com`
- `app2.boring-wozniak.ingress.replicatedcluster.com`
- `api.boring-wozniak.ingress.replicatedcluster.com`

Wildcard DNS takes additional time to provision because Replicated must create a dedicated DNS record and TLS certificate.

#### Expose Ports on VMs

You can also expose ports on standalone VMs and make them accessible on the public internet.

:::note
Wildcard DNS is not supported for VMs.
:::

##### Using the CLI

To expose a port on a VM using the Replicated CLI:

```bash
replicated vm port expose VM_ID \
    --port PORT \
    --protocol PROTOCOL
```

For more information, see [replicated vm port expose](/reference/replicated-cli-vm-port-expose).

##### Using the Vendor Portal

To expose ports on a VM using the Vendor Portal:

1. In the Vendor Portal, go to [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix).

1. Click the VM name or select **Edit VM** from the VM's menu.

   ![Edit VM in the dot menu](/images/compatibility-matrix-edit-vm.png)

   [View a larger version of this image](/images/compatibility-matrix-edit-vm.png)

1. Under **Ingress & Ports**, enter the port number, select the protocols, and click **Add**.

   ![DNS record for a VM](/images/compatibility-matrix-ingress-ports.png)

   [View a larger version of this image](/images/compatibility-matrix-ingress-ports.png)

   A DNS record and valid TLS certificate are created and connected to the specified port.

#### Remove Exposed Ports

Exposed ports are automatically deleted when the cluster or VM terminates.

To remove a port (and the associated DNS records and TLS certificates) prior to termination:

```bash
# For clusters
replicated cluster port rm PORT_ID --id CLUSTER_ID

# For VMs  
replicated vm port rm VM_ID
```

You can remove just one protocol, or all.
Removing all protocols also removes the DNS record and TLS certificate.

## Cloud Distributions

### LoadBalancer Services

For cloud distributions (EKS, GKE, AKS, OKE), you can expose your application to the public internet using a Kubernetes `LoadBalancer` service. When you create a `LoadBalancer` service, the cloud provider automatically creates a load balancer with a public IP address that routes traffic to your application.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: my-app
```

Query the service to get the external IP:

```bash
kubectl get service my-service
```

#### AKS-Specific Configuration

AKS clusters require additional annotations for LoadBalancer traffic to route correctly:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  annotations:
    service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
spec:
  type: LoadBalancer
  externalTrafficPolicy: Local
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: my-app
```

- `externalTrafficPolicy: Local` preserves the client source IP
- `service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path` must point to an endpoint that returns HTTP 200 when your service is ready

For more information, see [Use a public standard load balancer in Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/load-balancer-standard) in the Azure documentation.
