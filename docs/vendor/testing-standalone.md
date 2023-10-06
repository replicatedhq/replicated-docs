# Using the Compatibility Matrix as a Standalone Component (Beta)

This topic describes how to use the Replicated compatibility matrix, inlcuding requesting credits, creating clusters from the vendor portal and the replicated CLI, and integrating the compatibility matrix with CI/CD workflows.

:::note
This topic includes information about using the compatibility matrix as a standalone component.

For additional compatibility matrix options available to users of other Replicated platform features (such as release management, licensing, and installation tooling), see [About the Compatibility Matrix (Beta)](/vendor/testing-about). 
::: 

## Overview

You can use the Replicated compatibility matrix to quickly provision ephemeral clusters. The compatibility matrix is useful for tasks such as:

* CI/CD to automate testing and validate an application is compatible with supported distributions.
* Local development to quickly get access to a cluster, develop on it, and delete it when done.
* Support to quickly reproduce a reported issue on a customer-representative environment.

### Supported Clusters

You can create cloud-based and virtual machine (VM) clusters with the compatibility matrix:

* Cloud-based Kubernetes distributions are run in a Replicated managed and controlled cloud account to optimize and deliver a clusters quickly and reliably. The Replicated account has control planes ready and adds a node group when you request it, making the cluster available much faster than if you try to create your own cluster with your own cloud account.

* Virtual machines (VMs) run on Replicated bare metal servers located in several data centers, including data centers physically in the European Union.

To get the most up-to-date list of support types of clusters, you can run `replicated cluster versions`. For command usage, see [cluster versions](/reference/replicated-cli-cluster-versions).

For more detailed information about the supported clusters and versions, see [Supported Compatibility Matrix Cluster Types (Beta)](testing-supported-clusters).

### Billing and Credits

Clusters created with the compatiblity matrix are billed by the minute. Per-minute billing begins when the cluster reaches a Ready state and ends when the cluster is deleted. The compatibility matrix marks a cluster as ready when a working kubeconfig for the cluster is accessible.

You are billed only for the time that the cluster is in a Ready state. You are not billed for the time that it takes the compatibility matrix to create and tear down clusters.

To create clusters with the compatibility matrix, you must have credits in your vendor portal account. 
To request credits, log in to the vendor portal and go to [Compatibility Matrix > Request more credits](https://vendor.replicated.com/compatibility-matrix).

## Prerequisites

To get started with the compatibility matrix, complete the following prerequisites:

* Create an account in the Replicated vendor portal. See [Creating a Vendor Account](/vendor/vendor-portal-creating-account).

* Install the replicated CLI and then authorize the CLI using your vendor account. See [Installing the replicated CLI](/reference/replicated-cli-installing).

* Request access to the compatibility matrix add-on by opening a product request. To open a product request, log in to the vendor portal and go to [Support > Request a feature](https://vendor.replicated.com/support?requestType=feature&productArea=vendor).

* Request credits by going to [Compatibility Matrix > Request more credits](https://vendor.replicated.com/compatibility-matrix) in the vendor portal. For more information, see [Billing and Credits](#billing-and-credits) above.

## Create, Access, and Delete Clusters

You can interact with the compatibility matrix through the vendor portal and through the replicated CLI.

### Create Clusters

Provisions a cluster based on the parameters specified. After a cluster is provisioned, an application can be installed in the cluster by creating a release, promoting the release to a temporary channel, and creating a temporary customer in the Replicated platform. A recommended use case for the `cluster create` command is provisioning clusters for testing in CD workflows that release your software to customers.

The following example creates a kind cluster with Kubernetes version 1.27.0, a disk size of 100 GiB, and an instance type of `r1.small`. 

```bash
replicated cluster create --name kind-example --distribution kind --version 1.27.0 --disk 100 --instance-type r1.small
```

For command usage, see [cluster create](/reference/replicated-cli-cluster-create).

### Access Clusters with Kubectl

The compatibility matrix provides the kubeconfig for clusters so that you can access the cluster with kubectl.

After a cluster is created and is marked as ready, you can access the kubeconfig for the cluster by running `replicated cluster kubeconfig CLUSTER_ID`, 

### Delete Clusters

When you are done working with a cluster, you can delete the cluster with the following commadn: `replicated cluster rm CLUSTER_ID`, where CLUSTER_ID is the ID of the target cluster.

You can alsoinclude the TTL property at the time of creating a cluster to ensure that the cluster is deleted after a period of time.

For command usage, see [cluster rm](/reference/replicated-cli-cluster-rm).

## Integrate with CI/CD

Replicated strongly recommends that you integrate the compatibility matrix into your existing CI/CD workflow to automate the process of creating clusters to install your application and run tests.

1. Build application images
1. Create clusters 
1. Deploy application and optionally run tests
1. Delete cluster
1. Report the success or failure of tests 

### GitHub Actions

Replicated maintains a set of custom GitHub actions that are designed to replace repetitive tasks related to distributing your application with Replicated and related to using the compatibility matrix, such as creating and removing clusters and reporting the success or failure of tests. 

If you use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using replicated CLI commands. Integrating the Replicated GitHub actions into your CI/CD pipeline helps you quickly build workflows with the required inputs and outputs, without needing to manually create the required CLI commands for each step.

To view all the available GitHub actions that Replicated maintains, see the [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.
