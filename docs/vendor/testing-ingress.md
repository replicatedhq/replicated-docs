# CMX Cluster Networking

This topic describes the networking options for accessing applications deployed on clusters created with Replicated Compatibility Matrix (CMX). It also describes how to use and manage CMX tunnels.

## Networking Options

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
If your application is only running on cloud services (EKS, GKE, AKS) you can create a service of type `LoadBalancer`. 
This will provision the cloud-provider specific load balancer.
The `LoadBalancer` service will be filled by the in-tree Kubernetes functionality that's integrated with the underlying cloud provider.
You can then query the service definition using `kubectl` and connect to and execute your tests over the `LoadBalancer` IP address.

### Ingress
Ingress is a good way to recreate customer-representative environments, but the problem still remains on how to get inbound access to the IP address that the ingress controller allocates.
Ingress is also not perfectly portable; each ingress controller might require different annotations in the ingress resource to work properly.
Supported ingress controllers vary based on the distribution.
CMX supports ingress controllers that are running as a `NodePort` service.

### CMX Tunnels
All VM-based CMX clusters support tunneling traffic into a `NodePort` service. 
When this option is used, Replicated is responsible for creating the DNS record and TLS certs.
Replicated will route traffic from `:443` and/or `:80` into the `NodePort` service you defined. For more information about using tunnels, see [Expose Ports Using Tunnels](testing-vm-networking).