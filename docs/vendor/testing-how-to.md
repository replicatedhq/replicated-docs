# Using the Compatibility Matrix (Beta)

This topic describes how to use the Replicated compatibility matrix to create ephemeral clusters that you can use for manual and CI/CD testing.

## Limitations

The following limitations apply when using the compatibility matrix:

- Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
- On cloud clusters, only one node group per cluster is supported.
- For virtual machine (VM) clusters, only single nodes are supported.

## Prerequisites

Before you can use the compatibility matrix, you must complete the following prerequisites:

- Purchase an entitlement for compatibility testing. To do so, [open a product request](https://vendor.replicated.com/support?requestType=feature&productArea=vendor).
- Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).

## Create a Cluster

The Replicated compatibility matrix functionality is provided using the `replicated cluster` commands. For command usage, see the [cluster create](/reference/replicated-cli-cluster-create) replicated CLI reference.

Create a test cluster with the compatibility matrix using one of the follow options:

- Manually create a cluster when you need one for a short period of time, such as when debugging a support issue or to use testing as part of an inner development loop.

    **Example:**

    ```bash
    replicated cluster create --name kind-example --distribution kind --version 1.25.2 --disk 100 --instance-type r1.small
    ```

- Integrate the compatibility matrix with your existing CI/CD pipeline to automatically provision clusters for testing. For more information about integrating the compatibility matrix into your CI/CD pipeline, see [Integrating with CI/CD](ci-overview). 
    
    Additionally, Replicated offers example workflows in Replicated Actions that you can reference. For more information, see [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) in GitHub.  

## Setting TTL

To help you manage costs, compatibility matrix clusters have a Time To Live (TTL) mechanism, using the `--ttl` flag. By default, the TTL is one hour, but you can configure it to a minimum of 10 minutes and a maximum of 48 hours. When the TTL expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in the Ready state.

To delete the cluster before the TTL expires, use the `replicated cluster rm` command with the cluster ID. 

For more information about the `replicated cluster` commands, see the [replicated CLI](/reference/replicated-cli-cluster-create) reference.