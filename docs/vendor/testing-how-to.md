# Using the Compatibility Matrix (Beta)

This topic describes how to use the compatibility matrix to create ephemeral clusters that you can use for manual and CI/CD testing.

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

The Replicated compatibility matrix functionality is provided using the `replicated cluster` commands. For command usage, see the [replicated CLI](/reference/replicated-cli-cluster-create) reference.

Create a test cluster with the compatibility matrix using one of the follow options:

- Manually create a cluster when you need one for a short period of time, such as when debugging a support issue or to use testing as part of an inner development loop.

- Integrate the compatibility matrix with your existing CI/CD pipeline so that cluster management is automated to run with your unique testing.

    To use the compatibility matrix with CI/CD, add the `replicated cluster` commands directly to your CI/CD pipeline. 
    
    Additionally, Replicated offers example workflows in Replicated Actions that you can reference. For more information, see [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) in GitHub.  

## Setting TTL

To help you manage costs, compatibility matrix clusters have a Time To Live (TTL) mechanism, using the `--ttl` flag. By default, the TTL is one hour, but you can configure it to a minimum of 10 minutes and a maximum of 48 hours. When the TTL expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in the Ready state.

To delete the cluster before the TTL expires, use the `replicated cluster rm` command with the cluster ID. 

For more information about the `replicated cluster` commands, see the [replicated CLI](replicated-cli-customer-create) reference.

## Test Script Recommendations

You design and write your own test scripts to use with the compatibility matrix. This section describes some of the options and common use cases to help guide you.

For release testing, Replicated recommends that you create and run all of the following test types and include them in CI/CD pipelines so that testing is automated.

- **Application Testing:** Traditional application testing includes unit, integration, and end-to-end tests. These tests are critical for application reliability, and the compatibility matrix is designed to to incorporate and use your application testing.

- **Performance Testing:** Performance testing is used to benchmark your application to ensure it can handle the expected load and scale gracefully. Test your application under a range of workloads and scenarios to identify any bottlenecks or performance issues. Make sure to optimize your application for different Kubernetes distributions and configurations by creating all of the environments you need to test in.

- **Smoke Testing:** Using a single, conformant Kubernetes distribution to test basic functionality of your application with default (or standard) configuration values is a quick way to get feedback if something is likely to be broken for all or most customers. <!--The compatibility matrix expands basic smoke testing by adding process violation testing to smoke tests for quick feedback. For more information, see [Process Violation Testing](testing-process-violation).-->

- **Compatibility Testing:** Because applications run on various Kubernetes distributions and configurations, it is important to test compatibility across different environments. The compatibility matrix provides this infrastructure.

- **Canary Testing:** Before releasing to all customers, consider deploying your application to a small subset of your customer base as a _canary_ release. This lets you monitor the application's performance and stability in real-world environments, while minimizing the impact of potential issues. The compatibility matrix enables canary testing by simulating exact (or near) customer environments and configurations to test your application with.