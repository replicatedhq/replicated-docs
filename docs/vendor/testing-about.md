# About the Compatibility Matrix (Beta)
This topic describes the Replicated compatibility matrix feature and use cases for testing applications in customer-representative environments.

:::note
The compatibility matrix add-on is available to Replicated customers at an additional cost. Please [open a product request](https://vendor.replicated.com/support?requestType=feature&productArea=vendor) if you are interested in this feature. 
:::

## Overview

The Replicated compatibility matrix quickly provisions ephemeral clusters representing your customer environments, so that you can test your application and troubleshoot issues.

You can chose either a cloud-based and virtual machine (VM) clusters for the compatibility matrix to provision. For a list of supported clusters and versions, see [Supported Clusters](testing-supported-clusters).

Cloud-based Kubernetes distributions are run in a Replicated managed and controlled cloud account to optimize and deliver a clusters quickly and reliably. The Replicated account has control planes ready and adds a node group when you request it, making the cluster available much faster than if you try to create your own cluster with your own cloud account.

Virtual machines (VMs) run on Replicated bare metal servers located in several data centers, including data centers physically in the European Union.

Clusters are created using the replicated CLI. You can download a kubeconfig file, and then connect using kubectl or another tool to have full admin access to the cluster.

You design your own tests based on your application needs, and then run your tests on the clusters created by the compatibility matrix. For information about test recommendations, see [Test Script Recommendations](testing-how-to#test-script-recommendations).

## Use Cases

An application that functions reliably in one Kubernetes distribution can fail in others because of different workload requirements. For example, some distributions do not run root or privileged containers. LoadBalancer service controllers are generally available in cloud providers, and are not always available on bare metal servers. The differences in distributions require that vendors test applications in a variety of customer-representative environments to ensure compatibility.

The compatibility matrix is useful for creating test environments for:

- CI/CD to automate testing and validate an application is compatible with supported distributions.
- Local development to quickly get access to a cluster, develop on it, and delete it when done.
- Support to quickly reproduce a reported issue on a customer-representative environment.

For more information about how to use the compatibility matrix, see [Using the Compatibility Matrix](testing-how-to).

## Supported Clusters and Kubernetes Versions

The compatibility matrix can create clusters on VMs, such as kind, k3s, and Red Hat OpenShift OKD, and also create cloud-managed clusters, such as AWS EKS. For a complete list of supported clusters, Kubernetes versions, and the Kubernetes support policy, see [Supported Clusters](testing-supported-clusters).