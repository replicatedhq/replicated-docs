# Compatibility Testing for Applications
This topic describes how vendors can use the Replicated compatibility matrix feature to test an application on customer-representative environments before distribution.

:::note
This feature requires an an additional entitlement. For more information or to have this feature enabled on your account, contact your customer success representative or click **Request a feature** on the [Support page](https://vendor.replicated.com/support) in the Replicated vendor portal.
:::

## About the Compatibility Matrix

The Replicated compatibility matrix quickly creates managed, ephemeral clusters that represent customer environments that you can use to test your application and to help troubleshoot support issues. You develop and run your own tests, and can focus on your code base instead of spending time creating test clusters. Cloud and virtual machine clusters are supported. When you request a cloud cluster, the compatibility matrix has control planes ready and adds a node group when you request it, making the cluster available much faster than if you try to create your own cluster with your own cloud account.

Although Kubernetes is a robust orchestration tool, an application that functions reliably in one Kubernetes distribution might fail in other distributions because because various distributions have different requirements for workloads. For example, OpenShift does not run root or privileged containers. LoadBalancer service controllers are generally available in cloud providers, and are not always available on bare metal servers. Ingress objects are often non-portable. The differences in distributions require that vendors test applications in customer-representative environments to ensure compatibility. Creating a variety of testing environments is time consuming.

The compatibility matrix runs in the Replicated cloud account, not in your vendor account.

The compatibility matrix is useful for:
- Continuous integration (CI) to automate testing and validate an application is compatible with supported distributions
- Local development to quickly get access to a cluster, develop on it, and delete it when done
- Support to quickly reproduce a reported issue on a customer-representative environment

When you create a cluster with the compatibility matrix, you have full access to the cluster using kubeconfig, so you can connect with kubectl or use another tool and have full admin access to the cluster.

Compatibility matrix clusters have a Time To Live (TTL). By default, the TTL is two hours, but you can configure it to a minimum of 10 minutes and a maximum of 48 hours. When the TTL expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in the Ready state.

<!-- 
Cluster states When a cluster is created, it goes through a few states: Queued: the request to create the cluster was accepted and is waiting to be fulfilled Assigned: the cluster has been assigned to one of our cluster provisioners Preparing: the cluster preparation is being done. Provisioning: the cluster is being provisioned Running: the cluster is running. You can now download the kubeconfig.
-->

## Limitations

The following limitations apply when using the compatibility matrix:

- Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
- On cloud clusters, only one node group per cluster is supported.
- For virtual machine (VM)-based clusters, only single nodes are supported.

## Supported Platforms

The compatibility matrix can create clusters on a VM, such as kind, k3s, and OpenShift), and also create cloud-managed clusters, such as EKS. For a complete list of supported clusters and versions, see Supported Clusters.

## Kubernetes Version Support Policy

We do not maintain forks or patches of the supported distributions. When a Kubernetes version in the compatibility matrix is out of support (EOL), Replicated will attempt to continue to support this version for six months for compatibility testing to support customers who are running out-of-date versions of Kubernetes. In the event that a critical security issue or bug is found and unresolved, we might discontinue support for EOL versions of Kubernetes prior to 6 months post EOL.


