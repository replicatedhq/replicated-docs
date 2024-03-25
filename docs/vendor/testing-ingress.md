import TestRecs from "../partials/ci-cd/_test-recs.mdx"
import Prerequisites from "../partials/cmx/_prerequisites.mdx"

# Accessing Your Application

After you've deployed your application into Compatibility Matrix clusters, you will want to execute your tests using your own test runner. In order to do this, you'll need to access your application. 
Compatibility Matrix offers several methods to access your application

## Networking Options

Some traditional Kubernetes networking options are available, but these vary based on the distribution.
For VM-based distributions, there is no default network route into the cluster, making inbound connections challenging to create.

### Port Forwarding
Port forwarding is a low-cost and portable mechanism to access your cluster. 
Port forwarding works on all clusters supported by Compatibility Matrix because the connection is initiated from the client, over the Kubernetes API server port.
If you have a single service or pod, and are not worried about complex routing, this is a good mechanism. 
The basic steps are to connect the port-forward, execute your tests against localhost, and then shut down the port-forward.

### LoadBalancer
If your application is only running on cloud services (EKS, GKE, AKS) you can create a service of type "LoadBalancer". 
This will provision the cloud-provider specific load balancer.
The LoadBalancer service will be filled by the in-tree Kubernetes functionality that's integrated with the underlying cloud provider.
You can then query the service definition using kubectl and connect to and execute your tests over the LoadBalancer.

### Ingress
Ingress is a good way to recreate customer-representative environments, but the problem still remains on how to get inbound access to the ip address that the ingress controller allocates.
For this reason, Compatibility Matrix supports a `port expose` command.

### `port expose` 

 <img src="/images/compatibility-matrix-ingress.png" alt="compatibility matrix ingress"></img>


:::note
You can expose a node port that does not yet exist. This is useful if you have a deterministic node port, but need the DNS name as a value in your Helm chart.
:::

## CLI
Once you have a node port available on the cluster, you can use the CLI to expose the node port to the public internet. This can be used multiple times on a single cluster.

:::note
HTTP and HTTPS are the only supported protocols at this time. WebSockets, GRPC, and other protocols will not be routed into the cluster.
:::


```
replicated cluster port expose [cluster id] --port [node port] --protocol [protocol]
```

## GitHub Action
Replicated publishes github actions that will also expose a port. This can be used multiple times on a single cluster. The action will wait and not return until the ingress object is ready and usable.


