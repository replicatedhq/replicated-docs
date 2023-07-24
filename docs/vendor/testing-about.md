# About Compatibility Testing
This topic describes how vendors can use the Replicated compatibility matrix feature to test an application on customer-representative environments before distribution.

:::note
This feature requires an an additional entitlement. For more information or to have this feature enabled on your account, contact your customer success representative or click **Request a feature** on the [Support page](https://vendor.replicated.com/support) in the Replicated vendor portal.
:::

## About the Compatibility Matrix

The Replicated compatibility matrix quickly creates managed, ephemeral clusters that represent customer environments that you can use to test your application and to help troubleshoot support issues. 

You design and run your own tests based on your application and use case needs. Using the compatibility matrix let you focus on iterating your code base instead of spending time creating test clusters. Cloud and virtual machine (VM) clusters are supported. For a list of supported clusters and versions, see [Supported Clusters](testing-supported-clusters).

Cloud-based clusters are run in the Replicated cloud account, not in your vendor account. When you request a cloud cluster, the compatibility matrix has control planes ready and adds a node group when you request it, making the cluster available much faster than if you try to create your own cluster with your own cloud account.

Clusters are created using the replicated CLI. You have full access to the cluster using kubeconfig, so you can connect with kubectl or use another tool and have full admin access to the cluster.

Compatibility matrix clusters have a Time To Live (TTL). By default, the TTL is two hours, but you can configure it to a minimum of 10 minutes and a maximum of 48 hours. When the TTL expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in the Ready state.

## Testing Use Cases

An application that functions reliably in one Kubernetes distribution can fail in other distributions because distributions often have different requirements for workloads. For example, some distributions do not run root or privileged containers. LoadBalancer service controllers are generally available in cloud providers, and are not always available on bare metal servers. Ingress objects are often non-portable. 

The differences in distributions require that vendors test applications in a variety of customer-representative environments to ensure compatibility. Testing during the development cycle and for support cases also requires provisioning a variety of environments, which is time consuming.

The compatibility matrix is useful for creating test environments for:

- Continuous integration (CI) to automate testing and validate an application is compatible with supported distributions. See [Testing with CI](testing-cicd).
- Local development to quickly get access to a cluster, develop on it, and delete it when done. See [Manual Testing and Validation](testing-manual).
- Support to quickly reproduce a reported issue on a customer-representative environment. See [Manual Testing and Validation](testing-manual).

## Limitations

The following limitations apply when using the compatibility matrix:

- Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
- On cloud clusters, only one node group per cluster is supported.
- For virtual machine (VM)-based clusters, only single nodes are supported.

## Supported Platforms and Kubernetes Versions

The compatibility matrix can create clusters on VMs, such as kind, k3s, and Red Hat OpenShift OKD, and also create cloud-managed clusters, such as AWS EKS. For a complete list of supported clusters, Kubernetes versions, and the Kubernetes support policy, see [Supported Clusters](testing-supported-clusters).




