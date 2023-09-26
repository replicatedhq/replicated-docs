# Using the Compatibility Matrix (Beta)

This topic describes how to use the Replicated compatibility matrix.

## Prerequisites

Before you can use the compatibility matrix, you must complete the following prerequisites:

- Request access to the compatibility matrix. To do so, [open a product request](https://vendor.replicated.com/support?requestType=feature&productArea=vendor).
- Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).
- Existing accounts must accept the TOS for the trial at the [Compatibility Matrix](https://vendor.replicated.com/compatibility-matrix) page in the Replicated vendor portal.
- Request credits for the compatibility by going to the [Compatibility Matrix](https://vendor.replicated.com/compatibility-matrix) page in the vendor portal and clicking **Request more credits**.

## Create Clusters

You can create clusters with the compatibiity matrix based on cluster parameters such as the target Kubernetes distribution and version. The compatibility matrix has the following options for creating a cluster:
* **Create a cluster only**: Provision a cluster based on the paramaters provided. After the cluster is created, you can download the kubeconfig file and use kubectl to interact with the cluster
* **Create a cluster and a release**: 

For information about the supported cluster types, see [Supported Compatibility Matrix Cluster Types](/vendor/testing-supported-clusters).

### Create a Cluster Only

You can create a cluster with the compatibility matrix using the replicated CLI or the Replicated vendor portal. 

#### With the CLI

To create a cluster with the replicated CLI:

1. Run the following command:

   ```bash

   ```

    The following example creates a kind cluster with Kubernetes version 1.27.0, a disk size of 100 GiB, and an instance type of `r1.small`: 

    ```bash
    replicated cluster create \
      --name kind-example \
      --distribution kind \
      --version 1.27.0 \
      --disk 100 \
      --instance-type r1.small
    ```

   For command usage, see [cluster create](/reference/replicated-cli-cluster-create).

1. When you are done working with the cluster, delete it:

   ```
   cluster rm CLUSTER_ID
   ```
   Replace `CLUSTER_ID` with the ID of the cluster to delete. You can find the cluster ID with 

   For command usage, see [cluster rm](/reference/replicated-cli-cluster-rm).    

#### With the Vendor Portal

To create a cluster with the compatibility matrix from the vendor portal:

1. In the vendor portal, go to the **Compatibility Matrix** tab.
1. If you do not have credits, click **Request credits**.
1. Click **Create Cluster**.
1. In the Cluster configuration dialog, complete the following fields:

   <img alt="Cluster configuration dialog" src="/images/matrix-create-cluster.png" width="500px"/>

   1. For **Cluster name**, enter a name.
   1. For **Kubernetes distribution**, select the target Kubernetes distribution, such as OpenShift or EKS.
   1. For **Instance type**, select the target instance type based on the distribution selected.
   
      :::note
      When creating a VM-based cluster with the compatibility matrix, you must specify a Replicated instance type. For more information, see [Replicated Instance Types](testing-supported-clusters#types) in _Support Compatibility Matrix Cluster Types_.
      :::

   1. For **Nodes**, select the target number of nodes for the cluster.
   1. **Kubernetes version**, select the target Kubernetes version. The Kubernetes versions available to select vary depending on the distribution.
   1. For **TTL**, set the Time to Live for the cluster. When the TTL expires, the cluster is automatically deleted.

### Create a Cluster and a Release

The `cluster prepare` command provisions a cluster and installs an application in the cluster. The application to install can be either a local Helm chart archive or a YAML directory containing the application files. To install the application, the `cluster prepare` command creates a release associated with 



The `cluster prepare` command uses a customer of type `test`. Test customers created by the `cluster prepare` command are not created in your vendor portal team. 

The `cluster prepare` command is useful in continuous integration (CI) workflows that run multiple times a day in which you need to install an application in a variety of different clusters for testing.

1. Package the Helm chart to install 

1. Run _one_ of the following commands, depending on the type of application to install:

   * **Install a Helm chart**:

      ```bash
      replicated cluster prepare \
        --distribution K8S_DISTRO \
        --version K8S_VERSION \
        --chart HELM_CHART_TGZ
      ```

      The following example creates a kind cluster and installs a Helm chart in the cluster using the `nginx-chart-0.0.14.tgz` chart archive:

      ```bash
      replicated cluster prepare \
        --distribution kind \
        --version 1.27.0 \
        --chart nginx-chart-0.0.14.tgz \
        --set key1=val1,key2=val2 \
        --set-string s1=val1,s2=val2 \
        --set-json j1='{"key1":"val1","key2":"val2"}' \
        --set-literal l1=val1,l2=val2 \
        --values values.yaml
      ```

    * **Install from a YAML directory**:

      ```bash
      replicated cluster prepare \
        --distribution K8S_DISTRO \
        --version K8S_VERSION \
        --yaml-dir PATH_TO_YAML_DIR
      ```

      ```bash
      replicated cluster prepare \
        --distribution k3s \
        --version 1.26 \
        --namespace config-validation \
        --shared-password password \
        --app-ready-timeout 10m \
        --yaml-dir config-validation \
        --config-values-file conifg-values.yaml \
        --entitlements "num_of_queues=5"
        ```

      For command usage, see [cluster prepare](/reference/replicated-cli-cluster-prepare).

1. When you are done working with the cluster, delete it:

   ```
   cluster rm CLUSTER_ID
   ```

   For command usage, see [cluster rm](/reference/replicated-cli-cluster-rm).

## Download the Kubeconfig for a Cluster

After creating a cluster with the compatiblity matrix, you can get admin access to the cluster by downloading the kubeconfig file. This allows you to interact with the cluster through kubectl.

To get admin access to a cluster created by the compatibility matrix, run one of the following commands:

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

## Test kURL Cluster Upgrades

You can use the `replicated cluster upgrade` command to upgrade an existing cluster version. A recommended use case for the `cluster upgrade` command is for testing your application's compatibility with Kubernetes API resource version migrations post upgrade in CD workflows that release your software to customers.

The following example upgrades a kURL cluster from its previous version to version 9d5a44c.

```bash
replicated cluster upgrade cabb74d5 --version 9d5a44c
```

For command usage, see [cluster upgrade](/reference/replicated-cli-cluster-upgrade) in the _replicated CLI_ reference.