# Using the Compatibility Matrix

This topic describes how to use the compatibility matrix to create ephemeral clusters that you can use for manual and CI/CD testing.

The Replicated compatibility matrix functionality is provided using the replicated CLI.

## Limitations

The following limitations apply when using the compatibility matrix:

- Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
- On cloud clusters, only one node group per cluster is supported.
- For virtual machine (VM) clusters, only single nodes are supported.

## Prerequisites

Before you can use the compatibility matrix, you must complete the following prerequisites:

- Purchase an entitlement for compatibility testing. To do so, [open a product request](https://vendor.replicated.com/support?requestType=feature&productArea=vendor).
- Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).

## Manual

It can be useful to manually create a cluster when you need one for a short period of time, such as when debugging a support issue or to use testing as part of an inner development loop.

Run the `replicated cluster` commands locally to create and get admin access to a test cluster.  

## CI/CD

Replicated recommends including compatibility testing within CI/CD pipelines so that it is automated. As a vendor, you can update your existing CI/CD workflows to include the replicated CLI commands to create test clusters where you can run your unique compatibility tests. Additionally, Replicated offers example workflows in GitHub Actions that you can reference.

To use the compatibility matrix with CI/CD, add the `replicated cluster` commands directly to your CI/CD pipeline.

## CLI Workflow Example

Whether you are testing locally or are using CI/CD, the following example shows the basic CLI command workflow to create and get access to a test cluster. Additional flags can be set. For more information about the `replicated cluster` commands, see the [replicated CLI](replicated-cli-customer-create) reference. 

1. Create a test cluster. Specify the values based on your needs and the type of cluster you are creating. For more information, see [Supported Clusters](testing-supported-clusters).

    ```bash
    replicated cluster create --name NAME --distribution DISTRIBUTION --version VERSION --disk SIZE --instance-type INSTANCE_TYPE
    ```
    Replace:

    - `NAME` with the name of the cluster. If no name is specified, a name is generated.
    - `DISTRIBUTION` with a supported distribution type.
    - `VERSION` with a supported Kubernetes version.
    - `SIZE` with the size of the disk needed for testing.
    - `INSTANCE_TYPE` with a supported instance type.
    
1. Get the cluster ID:

    ```bash
    replicated cluster ls
    ```

1. Get full admin access to the test cluster:

    ```bash
    replicated cluster kubeconfig --id ID
    ```

    Replace `ID` with the ID of the cluster from the output of the `replicated cluster ls` command.

## Setting TTL

To help you manage costs, compatibility matrix clusters have a Time To Live (TTL) mechanism, using the `--ttl` flag. By default, the TTL is one hour, but you can configure it to a minimum of 10 minutes and a maximum of 48 hours. When the TTL expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in the Ready state.

## Handling Semantic Versioning

Helm charts use semantic versioning (semver) for release. Until you are ready to push a release, you might not want to create a new semver for every commit or PR. To help avoid the consumption of semvers during test commits and PRs, Replicated actions use a pattern to push a tag in your CI to represent the new semver.

The Replicated pattern finds the closest semver to the branch the commit is on, or that the PR is targetting, by querying the GitHub releases and tags. Replicated takes that version and appends `-<sha>` to the version and uses that internally.

If you do not want to use this behavior, make sure that your branch is semver compliant. Replicated treats the branch as a semver release if it parses as a semver.

## Test Script Recommendations

You design and write your own test scripts to use with the compatibility matrix. This section describes some of the options and common use cases to help guide you.

For release testing, Replicated recommends that you create and run all of the following test types.

- **Application Testing:** Traditional application testing includes unit, integration, and end-to-end tests. These tests are critical for application reliability, and the compatibility matrix is designed to to incorporate and use your application testing.

- **Performance Testing:** Performance testing is used to benchmark your application to ensure it can handle the expected load and scale gracefully. Test your application under a range of workloads and scenarios to identify any bottlenecks or performance issues. Make sure to optimize your application for different Kubernetes distributions and configurations by creating all of the environments you need to test in.

- **Smoke Testing:** Using a single, conformant Kubernetes distribution to test basic functionality of your application with default (or standard) configuration values is a quick way to get feedback if something is likely to be broken for all or most customers. The compatibility matrix expands basic smoke testing by adding process violation testing to smoke tests for quick feedback. For more information, see [Process Violation Testing](testing-process-violation).

- **Compatibility Testing:** Because applications run on various Kubernetes distributions and configurations, it is important to test compatibility across different environments. The compatibility matrix provides this infrastructure.

- **Canary Testing:** Before releasing to all customers, consider deploying your application to a small subset of your customer base as a _canary_ release. This lets you monitor the application's performance and stability in real-world environments, while minimizing the impact of potential issues. The compatibility matrix enables canary testing by simulating exact (or near) customer environments and configurations to test your application with.