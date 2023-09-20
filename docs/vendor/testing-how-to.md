import TestRecs from "../partials/ci-cd/_test-recs.mdx"

# Using the Compatibility Matrix (Beta)

This topic describes how to use the Replicated compatibility matrix to create ephemeral clusters that you can use for manual and CI/CD testing.

:::note
The compatibility matrix add-on is Beta. The features, limitations, and requirements of the compatibility matrix are subject to change. As the compatiblity matrix add-on progresses towards general availability, many of its limitations will be removed.
:::

## Limitations

The compatibility matrix has the following limitations:

- Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
- On cloud clusters, only one node group per cluster is supported.
- Multi-node support is available only for GKE and EKS.
- There is no support for IPv6.
- The `cluster upgrade` feature is available only for kURL distributions. See [cluster upgrade](/reference/replicated-cli-cluster-upgrade).
- Clusters have a maximum Time To Live (TTL) of 48 hours. See [Setting TTL](#setting-ttl) below.
- Cloud clusters do not allow for the configuration of CNI, CSI, CRI, Ingress, or other plugins, add-ons, services, and interfaces.
- The node operating systems for clusters created with the compatibility matrix cannot be configured nor replaced with different operating systems.
- The Kubernetes scheduler for clusters created with the compatibility matrix cannot be replaced with a different scheduler.
- Each team has a quota limit on the amount of resources that can be used simultaneously. This limit can be raised by messaging your account representative.

For additional distribution-specific limitations, see [Supported Compatibility Matrix Cluster Types (Beta)](testing-supported-clusters).

## Prerequisites

Before you can use the compatibility matrix, you must complete the following prerequisites:

- Request access or purchase access to the compatibility testing. To do so, [open a product request](https://vendor.replicated.com/support?requestType=feature&productArea=vendor).
- Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).
- Existing accounts must accept the TOS for the trial at the [Compatibility Matrix](https://vendor.replicated.com/compatibility-matrix) page in the Replicated vendor portal.
- Request credits for the compatibility by going to the [Compatibility Matrix](https://vendor.replicated.com/compatibility-matrix) page in the vendor portal and clicking **Request more credits**.

## Creating and Preparing Clusters

The Replicated compatibility matrix functionality is provided through the replicated CLI  `cluster` commands.

You can run the commands to manually create a cluster when you need one for a short period of time, such as when debugging a support issue or to use testing as part of an inner development loop. You can also integrate the commands in your continuous integration and continuous delivery (CI/CD) workflows to automatically provision clusters for running tests. For more information, see [Integrating with CI/CD](ci-overview). 

You can use both `cluster create` and `cluster prepare` to provision clusters. The following describes the use cases for each command:

* `cluster create`: Provisions a cluster based on the parameters specified. After a cluster is provisioned, an application can be installed in the cluster by creating a release, promoting the release to a temporary channel, and creating a temporary customer in the Replicated platform. A recommended use case for the `cluster create` command is provisioning clusters for testing in CD workflows that release your software to customers.

  The following example creates a kind cluster with Kubernetes version 1.27.0, a disk size of 100 GiB, and an instance type of `r1.small`. 

  ```bash
  replicated cluster create --name kind-example --distribution kind --version 1.27.0 --disk 100 --instance-type r1.small
  ```

  For command usage, see [cluster create](/reference/replicated-cli-cluster-create) in the _replicated CLI_ reference.

* `cluster prepare`: Provisions a cluster based on the parameters specified, creates a release, and then installs the release in the cluster. The `cluster prepare` command allows you to install an application in a cluster for testing without needing to create a temporary channel or a temporary customer in the Replicated platform. A recommended use case for the `cluster prepare` command is provisioning clusters for testing in CI workflows that run on every commit.

  The following example creates a kind cluster and installs a Helm chart in the cluster using the `nginx-chart-0.0.14.tgz` chart archive:

  ```bash
  replicated cluster cluster prepare \
    --distribution kind \
    --version 1.27.0 \
    --chart nginx-chart-0.0.14.tgz \
    --set key1=val1,key2=val2 \
    --set-string s1=val1,s2=val2 \
    --set-json j1='{"key1":"val1","key2":"val2"}' \
    --set-literal l1=val1,l2=val2 \
    --values values.yaml
  ```

  For command usage, see [cluster prepare](/reference/replicated-cli-cluster-prepare) in the _replicated CLI_ reference.

* `cluster upgrade`: Upgrades an existing cluster version. A recommended use case for the `cluster upgrade` command is for testing your application's compatibility with Kubernetes API resource version migrations post upgrade in CD workflows that release your software to customers.

  The following example upgrades a kURL cluster from its previous version to version 9d5a44c.

  ```bash
  replicated cluster upgrade upgrade cabb74d5 --version 9d5a44c
  ```

  For command usage, see [cluster upgrade](/reference/replicated-cli-cluster-upgrade) in the _replicated CLI_ reference.

## Setting TTL

To help you manage costs, compatibility matrix clusters have a Time To Live (TTL) mechanism, using the `--ttl` flag. By default, the TTL is one hour, but you can configure it to a minimum of 10 minutes and a maximum of 48 hours. When the TTL expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in the Ready state.

To delete the cluster before the TTL expires, use the `replicated cluster rm` command with the cluster ID. 

For more information about the `replicated cluster` commands, see the [replicated CLI](/reference/replicated-cli-cluster-create) reference.

## Test Script Recommendations

Incorporating code tests into your CI/CD workflows is important for ensuring that developers receive quick feedback and can make updates in small iterations. Replicated recommends that you create and run all of the following test types as part of your CI/CD workflows:

<TestRecs/>
