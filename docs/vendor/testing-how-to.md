import TestRecs from "../partials/ci-cd/_test-recs.mdx"
import Prerequisites from "../partials/cmx/_prerequisites.mdx"

# Using the Compatibility Matrix

This topic describes how to use the Replicated compatibility matrix to create ephemeral clusters.

## Prerequisites

Before you can use the compatibility matrix, you must complete the following prerequisites:

<Prerequisites/>

* Existing accounts must accept the TOS for the trial on the [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix) page in the Replicated vendor portal.

## Create and Manage Clusters

This section explains how to use the compatibility matrix to create and manage clusters with the replicated CLI or the vendor portal.

For information about creating and managing clusters with the Vendor API v3, see the [clusters](https://replicated-vendor-api.readme.io/reference/listclusterusage) section in the Vendor API v3 documentation.

### Create Clusters

You can create clusters with the compatibility matrix using the replicated CLI or the vendor portal.

#### replicated CLI

To create a cluster using the replicated CLI:

1. (Optional) View the available cluster distributions, including the supported Kubernetes versions, instance types, and maximum nodes for each distribution:

   ```bash
   replicated cluster versions
   ```
   For command usage, see [cluster versions](/reference/replicated-cli-cluster-versions).

1. Run the following command to create a cluster:

   ```
   replicated cluster create --name NAME --distribution K8S_DISTRO --version K8S_VERSION --disk DISK_SIZE --instance-type INSTANCE_TYPE
   ```
   Where:
   * `NAME` is any name for the cluster. If `--name` is excluded, a name is automatically generated for the cluster.
   * `K8S_DISTRO` is the Kubernetes distribution for the cluster.
   * `K8S_VERSION` is the Kubernetes version for the cluster.
   * `DISK_SIZE` is the disk size (GiB) to request per node.
   * `INSTANCE_TYPE` is the instance type to use for each node.

   For command usage and additional optional flags, see [cluster create](/reference/replicated-cli-cluster-create).

   **Example:**

   The following example creates a kind cluster with Kubernetes version 1.27.0, a disk size of 100 GiB, and an instance type of `r1.small`. 

   ```bash
   replicated cluster create --name kind-example --distribution kind --version 1.27.0 --disk 100 --instance-type r1.small
   ```

1. Verify that the cluster was created:

   ```bash
   replicated cluster ls CLUSTER_NAME
   ```
   Where `CLUSTER_NAME` is the name of the cluster that you created.

   In the output of the command, you can see that the `STATUS` of the cluster is `assigned`. When the kubeconfig for the cluster is accessible, the cluster's status is changed to `running`. For more information about cluster statuses, see [Cluster Status](testing-about#cluster-status) in _About the Compatibility Matrix._

#### Vendor Portal

To create a cluster using the vendor portal:

1. Go to [**Compatibility Matrix > Create cluster**](https://vendor.replicated.com/compatibility-matrix).

1. In the **Cluster configuration** dialog, complete the fields: 

   <img alt="Cluster configuration dialog" src="/images/cmx-cluster-configuration.png" width="400px"/>

   [View a larger version of this image](/images/cmx-cluster-configuration.png)

   <table>
     <tr>
       <th>Field</th>
       <th>Description</th>
     </tr>
     <tr>
       <td>Cluster name</td>
       <td>Enter a name for the cluster.</td>
     </tr>
     <tr>
       <td>Kubernetes distribution</td>
       <td>Select the Kubernetes distribution for the cluster.</td>
     </tr>
     <tr>
       <td>Instance type</td>
       <td>Select the instance type to use for the nodes in the cluster. The options available are specific to the distribution selected.</td>
     </tr>
     <tr>
       <td>Nodes</td>
       <td>Select the number of nodes to provision for the cluster. The options available are specific to the distribution selected.</td>
     </tr>
     <tr>
       <td>Kubernetes version</td>
       <td>Select the Kubernetes version for the cluster. The options available are specific to the distribution selected.</td>
     </tr>
     <tr>
       <td>TTL</td>
       <td><p>Select the Time to Live (TTL) for the cluster.</p></td>
     </tr>
     <tr>
       <td>Disk size</td>
       <td>Select the disk size in GiB to use per node in the cluster.</td>
     </tr>
   </table>

1. Click **Create cluster**.

  The cluster is displayed in the list of clusters on the **Compatibility Matrix** page with a status of Assigned. When the kubeconfig for the cluster is accessible, the cluster's status is changed to Running.

  :::note
  If the cluster is not automatically displayed, refresh your browser window.
  :::

  <img alt="Cluster configuration dialog" src="/images/cmx-assigned-cluster.png" width="700px"/>

  [View a larger version of this image](/images/cmx-assigned-cluster.png)

### Prepare Clusters

For applications distributed with the Replicated vendor platform, the [`cluster prepare`](/reference/replicated-cli-cluster-prepare) command reduces the number of steps required to provision a cluster and then deploy a release to the cluster for testing. This is useful in continuous integration (CI) workflows that run multiple times a day. For an example workflow that uses the `cluster prepare` command, see [Recommended CI/CD Workflows](/vendor/ci-workflows).

The `cluster prepare` command does the following:
* Creates a cluster
* Creates a release for your application based on either a Helm chart archive or a directory containing the application YAML files
* Creates a temporary customer of type `test`
  :::note
  Test customers created by the `cluster prepare` command are not saved in your vendor portal team.
  :::
* Installs the release in the cluster using either the Helm CLI or Replicated KOTS

The `cluster prepare` command requires either a Helm chart archive or a directory containing the application YAML files to be installed:

* **Install a Helm chart with the Helm CLI**:

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

* **Install with KOTS from a YAML directory**:

  ```bash
  replicated cluster prepare \
    --distribution K8S_DISTRO \
    --version K8S_VERSION \
    --yaml-dir PATH_TO_YAML_DIR
  ```
  The following example creates a k3s cluster and installs an application in the cluster using the manifest files in a local directory named `config-validation`: 
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

For command usage, including additional options, see [cluster prepare](/reference/replicated-cli-cluster-prepare).
### Access Clusters

The compatibility matrix provides the kubeconfig for clusters so that you can access clusters with the kubectl command line tool. For more information, see [Command line tool (kubectl)](https://kubernetes.io/docs/reference/kubectl/) in the Kubernetes documentation.

To access a cluster from the command line:

1. Verify that the cluster is in a Running state:

   ```bash
   replicated cluster ls
   ```
   In the output of the command, verify that the `STATUS` for the target cluster is `running`. For command usage, see [cluster ls](/reference/replicated-cli-cluster-ls).

1. Run the following command to download the kubeconfig for the cluster and update Kubernetes context:

   ```bash
   replicated cluster kubeconfig CLUSTER_ID
   ```
   When the command completes, a `Updated kubernetes context` message is displayed. For command usage, see [cluster kubeconfig](/reference/replicated-cli-cluster-kubeconfig).

1. Verify that you can interact with the cluster through kubectl by running a command. For example:

   ```bash
   kubectl get ns
   ```

### Upgrade Clusters (kURL Only)

For kURL clusters provisioned with the compatibility matrix, you can use the the `cluster upgrade` command to upgrade the version of the kURL installer specification used to provision the cluster. A recommended use case for the `cluster upgrade` command is for testing your application's compatibility with Kubernetes API resource version migrations after upgrade.

The following example upgrades a kURL cluster from its previous version to version `9d5a44c`:

```bash
replicated cluster upgrade cabb74d5 --version 9d5a44c
```

For command usage, see [cluster upgrade](/reference/replicated-cli-cluster-upgrade).

### Delete Clusters

You can delete clusters using the replicated CLI or the vendor portal.

#### replicated CLI

To delete a cluster using the replicated CLI:

1. Get the ID of the target cluster:

   ```
   replicated cluster ls
   ```
   In the output of the command, copy the ID for the cluster.

   **Example:**

   ```
   ID        NAME              DISTRIBUTION   VERSION   STATUS    CREATED                        EXPIRES 
   1234abc   My Test Cluster   eks            1.27      running   2023-10-09 17:08:01 +0000 UTC  - 
   ``` 

   For command usage, see [cluster ls](/reference/replicated-cli-cluster-ls).

1. Run the following command:

    ```
    replicated cluster rm CLUSTER_ID
    ```
    Where `CLUSTER_ID` is the ID of the target cluster. 
    For command usage, see [cluster rm](/reference/replicated-cli-cluster-rm).
1. Confirm that the cluster was deleted:
   ```
   replicated cluster ls CLUSTER_ID --show-terminated
   ```
   Where `CLUSTER_ID` is the ID of the target cluster.
   In the output of the command, you can see that the `STATUS` of the cluster is `terminated`. For command usage, see [cluster ls](/reference/replicated-cli-cluster-ls).
#### Vendor Portal

To delete a cluster using the vendor portal:

1. Go to **Compatibility Matrix**.

1. Under **Clusters**, in the vertical dots menu for the target cluster, click **Delete cluster**.

   <img alt="Delete cluster button" src="/images/cmx-delete-cluster.png" width="700px"/>

   [View a larger version of this image](/images/cmx-delete-cluster.png)

## About Using the Compatibility Matrix with CI/CD

Replicated recommends that you integrate the compatibility matrix into your existing CI/CD workflow to automate the process of creating clusters to install your application and run tests. For more information, including additional best practices and recommendations for CI/CD, see [About Integrating with CI/CD](/vendor/ci-overview).

### Replicated GitHub Actions

Replicated maintains a set of custom GitHub actions that are designed to replace repetitive tasks related to using the compatibility matrix and distributing applications with Replicated.

If you use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using replicated CLI commands. Integrating the Replicated GitHub actions into your CI/CD pipeline helps you quickly build workflows with the required inputs and outputs, without needing to manually create the required CLI commands for each step.

To view all the available GitHub actions that Replicated maintains, see the [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.

For more information, see [Integrating Replicated GitHub Actions](/vendor/ci-workflows-github-actions).

### Recommended Workflows

Replicated recommends that you maintain unique CI/CD workflows for development (continuous integration) and for releasing your software (continuous delivery). For example development and release workflows that integrate the compatibility matrix for testing, see [Recommended CI/CD Workflows](/vendor/ci-workflows).

### Test Script Recommendations

Incorporating code tests into your CI/CD workflows is important for ensuring that developers receive quick feedback and can make updates in small iterations. Replicated recommends that you create and run all of the following test types as part of your CI/CD workflows:

<TestRecs/>