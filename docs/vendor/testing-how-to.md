# Using the Compatibility Matrix (Beta)

This topic describes how to use the Replicated compatibility matrix to create ephemeral clusters.

:::note
The compatibility matrix add-on is Beta. The features, limitations, and requirements of the compatibility matrix are subject to change. As the compatiblity matrix add-on progresses towards general availability, many of its limitations will be removed.
:::

## Prerequisites

Before you can use the compatibility matrix, you must complete the following prerequisites:

- Request access or purchase access to the compatibility testing. To do so, [open a product request](https://vendor.replicated.com/support?requestType=feature&productArea=vendor).
- Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).
- Existing accounts must accept the TOS for the trial at the [Compatibility Matrix](https://vendor.replicated.com/compatibility-matrix) page in the Replicated vendor portal.
- Request credits for the compatibility by going to the [Compatibility Matrix](https://vendor.replicated.com/compatibility-matrix) page in the vendor portal and clicking **Request more credits**.

## About Compatibility Matrix Credits

Request credits for the compatibility by going to the [Compatibility Matrix](https://vendor.replicated.com/compatibility-matrix) page in the vendor portal and clicking **Request more credits**.

### Set Time To Live

To help you manage costs, compatibility matrix clusters have a Time To Live (TTL) mechanism, using the `--ttl` flag. By default, the TTL is one hour, but you can configure it to a minimum of 10 minutes and a maximum of 48 hours. When the TTL expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in the Ready state.

To delete the cluster before the TTL expires, use the `replicated cluster rm` command with the cluster ID. 

For more information about the `replicated cluster` commands, see the [replicated CLI](/reference/replicated-cli-cluster-create) reference.

## Create a Cluster

You can provide parameters to create clusters with the compatibiity matrix, such as the target Kubernetes distribution and version.

For more information about the supported cluster types, see [Supported Compatibility Matrix Cluster Types](/vendor/testing-supported-clusters).

### CLI

You can use the `cluster create` command to create clusters with the compatibility matrix. For command usage, see [cluster create](/reference/replicated-cli-cluster-create) in the _replicated CLI_ reference.

**Example**

The following example creates a kind cluster with Kubernetes version 1.27.0, a disk size of 100 GiB, and an instance type of `r1.small`: 

```bash
replicated cluster create --name kind-example --distribution kind --version 1.27.0 --disk 100 --instance-type r1.small
```

### Vendor Portal

To create a cluster with the compatibility matrix from the vendor portal:

1. In the vendor portal, go to the **Compatibility Matrix** tab.
1. If you do not have credits, click **Request credits**.
1. Click **Create Cluster**.
1. In the Cluster configuration dialog, complete the following fields:

   <img alt="Cluster configuration dialog" src="/images/matrix-create-cluster.png" width="500px"/>

   1. For **Cluster name**, enter a name.
   1. For **Kubernetes distribution**, select the target Kubernetes distribution, such as OpenShift or EKS.
   1. For **Instance type**, select the target instance type based on the distribution selected. See [Replicated Instance Types](testing-supported-clusters) in _Support Compatibility Matrix Cluster Types_.
   1. For **Nodes**, select the target number of nodes for the cluster.
   1. **Kubernetes version**, select the target Kubernetes version. The Kubernetes versions available to select vary depending on the distribution.
   1. For **TTL**, set the Time to Live for the cluster. When the TTL is reached, the cluster is automatically deleted.

1. Run one of the following commands to download the kubeconfig file for the cluster:

  * (Default) Write the kubeconfig file to your existing kubeconfig:

    ```
    replicated cluster kubeconfig CLUSTER_ID
    ```
    Replace `CLUSTER_ID` with the ID of the cluster.

  * Write the kubeconfig file to an output path:

    ```
    replicated cluster kubeconfig CLUSTER_ID --output-path PATH
    ```
    Replace `CLUSTER_ID` with the ID of the cluster.

  * Write the kubeconfig file to stdout:

    ```
    replicated cluster kubeconfig CLUSTER_ID --stdout
    ```
    Replace `CLUSTER_ID` with the ID of the cluster.  
  
  For command usage, see [cluster kubeconfig](/reference/replicated-cli-cluster-kubeconfig).

1. 

## Create a Cluster and Install a Release

You can use the `replicated cluster prepare` command to provision a cluster based on the parameters specified, create a release, create a test customer, and installs the release in the cluster. This allows you to install a release in a cluster for testing without needing to create and then archive a channel and customer. For example, the `cluster prepare` command is particularly useful 

**Example**

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

## Test kURL Cluster Upgrades

You can use the `replicated cluster upgrade` command to upgrade an existing cluster version. A recommended use case for the `cluster upgrade` command is for testing your application's compatibility with Kubernetes API resource version migrations post upgrade in CD workflows that release your software to customers.

The following example upgrades a kURL cluster from its previous version to version 9d5a44c.

```bash
replicated cluster upgrade cabb74d5 --version 9d5a44c
```

For command usage, see [cluster upgrade](/reference/replicated-cli-cluster-upgrade) in the _replicated CLI_ reference.

## Integrate with CI/CD

See [Recommended CI/CD Workflows](ci-workflows)

### Test Script Recommendations

Incorporating code tests into your CI/CD workflows is important for ensuring that developers receive quick feedback and can make updates in small iterations. Replicated recommends that you create and run all of the following test types as part of your CI/CD workflows:

<TestRecs/>