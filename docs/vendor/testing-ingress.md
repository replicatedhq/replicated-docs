# Accessing Your Application

This topic describes the networking options for accessing applications deployed on clusters created with Replicated Compatibility Matrix. It also describes how to use and manage Compatibility Matrix tunnels.

## Networking Options

After deploying your application into Compatibility Matrix clusters, you will want to execute your tests using your own test runner.
In order to do this, you need to access your application. 
Compatibility matrix offers several methods to access your application.

Some standard Kubernetes networking options are available, but vary based on the distribution.
For VM-based distributions, there is no default network route into the cluster, making inbound connections challenging to create.

### Port Forwarding
Port forwarding is a low-cost and portable mechanism to access your application. 
Port forwarding works on all clusters supported by Compatibility Matrix because the connection is initiated from the client, over the Kubernetes API server port.
If you have a single service or pod and are not worried about complex routing, this is a good mechanism. 
The basic steps are to connect the port-forward, execute your tests against localhost, and then shut down the port-forward.

### LoadBalancer
If your application is only running on cloud services (EKS, GKE, AKS) you can create a service of type `LoadBalancer`. 
This will provision the cloud-provider specific load balancer.
The `LoadBalancer` service will be filled by the in-tree Kubernetes functionality that's integrated with the underlying cloud provider.
You can then query the service definition using `kubectl` and connect to and execute your tests over the `LoadBalancer` IP address.

### Ingress
Ingress is a good way to recreate customer-representative environments, but the problem still remains on how to get inbound access to the IP address that the ingress controller allocates.
Ingress is also not perfectly portable; each ingress controller might require different annotations in the ingress resource to work properly.
Supported ingress controllers vary based on the distribution.
Compatibility matrix supports ingress controllers that are running as a `NodePort` service.

### Compatibility Matrix Tunnels (Alpha)
All VM-based Compatibility Matrix clusters support tunneling traffic into a `NodePort` service. 
When this option is used, Replicated is responsible for creating the DNS record and TLS certs.
Replicated will route traffic from `:443` and/or `:80` into the `NodePort` service you defined. For more information about using tunnels, see [Managing Compatibility Matrix Tunnels (Alpha)](#manage-nodes) below.

The following diagram shows how the traffic is routed into the service using Compatibility Matrix tunnels:

<img src="/images/compatibility-matrix-ingress.png" alt="Compatibility Matrix ingress"></img>

[View a larger version of this image](/images/compatibility-matrix-ingress.png)

## Managing Compatibility Matrix Tunnels (Alpha) {#manage-nodes}

:::note
Compatibity matrix tunnels are an alpha feature.
:::

Tunnels are viewed, created, and removed using the Replicated CLI, GitHub Actions, or directly with the Vendor API v3. There is no limit to the number of tunnels you can create for a cluster and multiple tunnels can connect to a single service, if desired.

### Limitations

Compatibility Matrix tunnels have the following limitations:
* One tunnel can only connect to one service. If you need fanout routing into different services, consider installing the nginx ingress controller as a `NodePort` service and exposing it.
* Tunnels are not supported for cloud distributions (EKS, GKE, AKS).

### Supported Protocols

A tunnel can support one or more protocols.
The supported protocols are HTTP and HTTPS.
WebSockets, GRPC, and other protocols are not routed into the cluster.

### Exposing Ports
Once you have a node port available on the cluster, you can use the Replicated CLI to expose the node port to the public internet. 
This can be used multiple times on a single cluster.

Optionally, you can specify the `--wildcard` flag to expose this port with wildcard DNS and TLS certificate.
This feature adds extra time to provision the port so should only be used if necessary.

```bash
replicated cluster port expose \
    [cluster id] \
    --port [node port] \
    --protocol [protocol] \
    --wildcard
```

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

:::note
You can expose a node port that does not yet exist in the cluster. 
This is useful if you have a deterministic node port, but need the DNS name as a value in your Helm chart.
:::

### Viewing Ports
To view all exposed ports, use the Replicated CLI `port ls` subcommand with the cluster ID:

```bash
% replicated cluster port ls 1e616c55
ID              CLUSTER PORT    PROTOCOL        EXPOSED PORT                                            WILDCARD        STATUS
d079b2fc        32456           http            http://happy-germain.ingress.replicatedcluster.com      true            ready

d079b2fc        32456           https           https://happy-germain.ingress.replicatedcluster.com     true            ready
```

### Removing Ports
Exposed ports are automatically deleted when a cluster terminates.
If you want to remove a port (and the associated DNS records and TLS certs) prior to cluster termination, run the `port rm` subcommand with the cluster ID:

```bash
% replicated cluster port rm 1e616c55 --id d079b2fc
```

You can remove just one protocol, or all.
Removing all protocols also removes the DNS record and TLS cert.