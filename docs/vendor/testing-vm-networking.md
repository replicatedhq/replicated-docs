<!-- # Access Applications in CMX Environments

## Expose Ports

This topic explains how to expose ports on VMs and VM-based clusters created with Replicated Compatibility Matrix (CMX).

## Expose Ports on VMs

You can expose ports on a VM and make them accessible on the public internet.

#### Limitation

Creating wildcard DNS entries for VMs is not supported. For feedback, contact Replicated support.

#### CLI

```bash
replicated vm port expose VMID_OR_VMNAME --port PORT --protocol PROTOCOL
```

For example, to expose port 3000 with HTTP protocol:
```bash
replicated vm port expose VM_ID --port 30000 --protocol http
```

#### Vendor Portal

To update the ingress and ports settings for a VM:

1. In the Vendor Portal, go to [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix).

1. Create a VM.

1. Open the dot menu for the VM and click **Edit VM**.

   ![Edit VM in the dot menu](/images/compatibility-matrix-edit-vm.png)

   [View a larger version of this image](/images/compatibility-matrix-edit-vm.png)

1. Under **Ingress & Ports**, for **Add DNS record**, edit the fields as desired and click **Add** to create a DNS record.

   ![DNS record for a VM](/images/compatibility-matrix-ingress-ports.png)
   [View a larger version of this image](/images/compatibility-matrix-ingress-ports.png)

   A DNS record and valid TLS cert are created and connected to the specified port.

### Expose Ports on VM-Based Clusters

After you have a node port available on the cluster, you can expose the node port to the public internet using the Replicated CLI. 
There is no limit to the number of tunnels you can create for a cluster and multiple tunnels can connect to a single service.

:::note
You can expose a node port that does not yet exist in the cluster. 
This is useful if you have a deterministic node port, but need the DNS name as a value in your Helm chart.
:::

The following diagram shows how the traffic is routed into the service using CMX tunnels:

<img src="/images/compatibility-matrix-ingress.png" alt="Compatibility Matrix ingress"></img>

[View a larger version of this image](/images/compatibility-matrix-ingress.png)

#### Limitations

* A tunnel can only connect to one service. If you need fanout routing into different services, consider installing the nginx ingress controller as a `NodePort` service and exposing it.
* Tunnels are not supported for cloud distributions (EKS, GKE, AKS).

#### Supported Protocols

A tunnel can support one or more protocols.
The supported protocols are HTTP, HTTPS, WS and WSS.
GRPC and other protocols are not routed into the cluster.

### Expose Ports with the CLI

To expose a port on a cluster using the Replicated CLI:

```bash
replicated cluster port expose \
    [cluster id] \
    --port [node port] \
    --protocol [protocol]
```

See [cluster port](/reference/replicated-cli-cluster-port).

#### Use Wildcard DNS

Optionally, you can specify the `--wildcard` flag to expose this port with wildcard DNS and TLS certificate.
This feature adds extra time to provision the port, so it should only be used if necessary.

For example, if you have the nginx ingress controller installed and the node port is 32456:

```bash
% replicated cluster ls
ID          NAME                           DISTRIBUTION    VERSION       STATUS         
1e616c55    tender_ishizaka                k3s             1.29.2        running        

% replicated cluster port expose \
    1e616c55 \
    --port 32456 \
    --protocol http \
    --protocol https \
    --wildcard
```

### View Exposed Ports

To view all exposed ports, use the `replicated port ls` subcommand with the cluster or VM ID:

```bash
replicated cluster port ls CLUSTER_ID
```

```bash
replicated vm port ls VMID_OR_VMNAME
```

### Remove Ports

Exposed ports are automatically deleted when the cluster or VM terminates.

If you want to remove a port (and the associated DNS records and TLS certs) prior to termination, run the `port rm` subcommand with the cluster or VM ID:

```bash
replicated cluster port rm PORT_ID --id CLUSTER_ID
```

```bash
replicated vm port rm VMID_OR_VMNAME
```

You can remove just one protocol, or all.
Removing all protocols also removes the DNS record and TLS cert.

## About Cluster Networking Options

After deploying your application into CMX clusters, you will want to execute your tests using your own test runner.
In order to do this, you need to access your application. 
CMX offers several methods to access your application.

Some standard Kubernetes networking options are available, but vary based on the distribution.
For VM-based distributions, there is no default network route into the cluster, making inbound connections challenging to create.

### Port Forwarding
Port forwarding is a low-cost and portable mechanism to access your application. 
Port forwarding works on all clusters supported by CMX because the connection is initiated from the client, over the Kubernetes API server port.
If you have a single service or pod and are not worried about complex routing, this is a good mechanism. 
The basic steps are to connect the port-forward, execute your tests against localhost, and then shut down the port-forward.

### LoadBalancer
If your application is only running on cloud services (EKS, GKE, AKS), you can create a service of type `LoadBalancer`. 
This will provision the cloud-provider specific load balancer.
The `LoadBalancer` service will be filled by the in-tree Kubernetes functionality that's integrated with the underlying cloud provider.
You can then query the service definition using `kubectl` and connect to and execute your tests over the `LoadBalancer` IP address.

:::note
AKS clusters require the following additional annotations to be set on LoadBalancer services for traffic to be routed:
* `controller.service.externalTrafficPolicy` must be set to `Local`
* `service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path` must be set to a health check endpoint that returns a successful HTTP response when your service is ready

For more information about these annotations, see the [Use a public standard load balancer in Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/load-balancer-standard) in the Azure documentation.
:::

### Ingress
Ingress is a good way to recreate customer-representative environments, but the problem still remains on how to get inbound access to the IP address that the ingress controller allocates.
Ingress is also not perfectly portable; each ingress controller might require different annotations in the ingress resource to work properly.
Supported ingress controllers vary based on the distribution.
CMX supports ingress controllers that are running as a `NodePort` service.

### CMX Tunnels
All VM-based CMX clusters support tunneling traffic into a `NodePort` service. 
When this option is used, Replicated is responsible for creating the DNS record and TLS certs.
Replicated will route traffic from `:443` and/or `:80` into the `NodePort` service you defined. For more information about using tunnels, see [Expose Ports Using Tunnels](testing-vm-networking). -->
