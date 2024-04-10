import TestRecs from "../partials/ci-cd/_test-recs.mdx"
import Prerequisites from "../partials/cmx/_prerequisites.mdx"

# Accessing Your Application

After you've deployed your application into Compatibility Matrix clusters, you will want to execute your tests using your own test runner.
In order to do this, you'll need to access your application. 
Compatibility Matrix offers several methods to access your application.

## Networking Options

Some standard Kubernetes networking options are available, but vary based on the distribution.
For VM-based distributions, there is no default network route into the cluster, making inbound connections challenging to create.

### Port Forwarding
Port forwarding is a low-cost and portable mechanism to access your cluster. 
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
Ingress is not perfectly portable either - each ingress controller may require different annotations in the ingress resource to work properly.
Supported ingress controllers vary based on the distribution.
Compatibility Matrix supports ingress controllers that are running as a `NodePort` service.

### Compatibility Matrix Tunnels (alpha)
All VM-based (not cloud distributions) Compatibility Matrix clusters support tunneling traffic into a `NodePort` service. 
When this option is used, Replicated is responsible for creating the DNS record and TLS certs.
Replicated will route traffic from `:443` and/or `:80` into the `NodePort` service you defined.

A diagram showing how the traffic is routed into the service using the Compatibility Matrix Tunnels is below:

<img src="/images/compatibility-matrix-ingress.png" alt="compatibility matrix ingress"></img>

# Managing Tunnels

Compatibity Matrix tunnels are an alpha feature.
Tunnels are viewed, created, and removed via the Replicated CLI, GitHub Actions, or directly via the API.
There is currently no limit to the number of tunnels you can create for a cluster.
Multiple tunnels can connect to a single service, if desired.
One tunnel can only connect to one service.
If you need fanout routing into different services, consider installing the nginx ingress controller as a `NodePort` service and exposing it.
Subdomains and wildcards are not yet supported.

## Protocols

A tunnel can support one or more protocols.
HTTP and HTTPS are the only supported protocols at this time.
WebSockets, GRPC, and other protocols will not be routed into the cluster.

## CLI

The Replicated CLI can be used to manage exposed ports:

### Exposing ports
Once you have a node port available on the cluster, you can use the CLI to expose the node port to the public internet. 
This can be used multiple times on a single cluster.


```
replicated cluster port expose \
    [cluster id] \
    --port [node port] \
    --protocol [protocol]
```

For example, if you have the nginx ingress controller installed and the node port is 32456:

```
% replicated cluster ls
ID          NAME                           DISTRIBUTION    VERSION       STATUS         
1e616c55    tender_ishizaka                k3s             1.29.2        running        

% replicated cluster port expose \
    1e616c55 \
    --port 32456 \
    --protocol http \
    --protocol https
```

:::note
You can expose a node port that does not yet exist in the cluster. 
This is useful if you have a deterministic node port, but need the DNS name as a value in your Helm chart.
:::

### Viewing ports
To view all exposed ports, use the `port ls` subcommand, with the cluster id.

```
replicated cluster port ls 1e616c55
```

### Removing ports
Exposed ports will be automatically deleted when a cluster terminates.
If you want to remove a port (and the associated DNS records and TLS certs) prior to cluster termination, run the `port rm` subcommand:
You can remove just one protocol, or all.
Removing all protocols also removes the DNS record and TLS cert.

```
replicated cluster port rm 1e616c55 --port 32456 --protocol http --protocol https
```



