import Billing from "../partials/cmx/_billing.mdx"
import Overview from "../partials/cmx/_overview.mdx"
import SupportedClusters from "../partials/cmx/_supported-clusters-overview.mdx"
import Build from "../partials/ci-cd/_build-source-code.mdx"
import TTL from "../partials/cmx/_ttl.mdx"

# Using the Compatibility Matrix as a Standalone Component (Beta)

This topic describes the Replicated compatibility matrix, inlcuding how to use the compatibility matrix from the Replicated vendor portal and the replicated CLI, and how to integrate the compatibility matrix into continuous integration and continuous delivery (CI/CD) workflows.

:::note
This topic provides information about using the compatibility matrix as a standalone component.

For additional compatibility matrix options available to users of other Replicated platform features, such as release management, licensing, and installation tooling, see [About the Compatibility Matrix (Beta)](/vendor/testing-about). 
::: 

## Overview

<Overview/>

### Supported Cluster Types

<SupportedClusters/>

### Billing and Credits

<Billing/>

## Use the Compatibility Matrix

This section includes prerequisites and procedures for using the compatibility matrix.

### Prerequisites

To get started with the compatibility matrix, complete the following prerequisites:

* Create an account in the Replicated vendor portal. See [Creating a Vendor Account](/vendor/vendor-portal-creating-account).

* Install the replicated CLI and then authorize the CLI using your vendor account. See [Installing the replicated CLI](/reference/replicated-cli-installing).

* Request access to the compatibility matrix add-on by opening a product request. To open a product request, log in to the vendor portal and go to [Support > Request a feature](https://vendor.replicated.com/support?requestType=feature&productArea=vendor).

* Request credits by going to [Compatibility Matrix > Request more credits](https://vendor.replicated.com/compatibility-matrix) in the vendor portal. For more information, see [Billing and Credits](#billing-and-credits) above.

### Create Clusters

You can create clusters with the compatibility matrix using the replicated CLI or the vendor portal.

#### replicated CLI

To create a cluster using the replicated CLI:

1. (Optional) View the available cluster distributions, including the supported Kubernetes versions, instance types, and maximum nodes for each distribution:

   ```bash
   replicated cluster versions
   ```
   For command usage, see [cluster versions](/reference/replicated-cli-cluster-versions).

1. Run the following command:

   ```
   replicated cluster create --name NAME --distribution K8S_DISTRO --version K8S_VERSION --disk DISK_SIZE --instance-type INSTANCE_TYPE
   ```
   Where:
   * `NAME` is any name for the cluster. If `--name` is excluded, a name is automatically generated for the cluster.
   * `K8S_DISTRO` is the Kubernetes distribution for the cluster.
   * `K8S_VERSION` is the Kubernetes version for the cluster.
   * `DISK_SIZE` is the disk size (GiB) to request per node.
   * `INSTANCE_TYPE` is the instance type to use for the nodes.
   
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
   
#### Vendor Portal

To create a cluster from the vendor portal:

1. Go to **Compatibility Matrix > Create cluster**.

1. In the **Cluster configuration** dialog, complete the fields. 

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
       <td><p>Select the Time to Live (TTL) for the cluster.</p> <TTL/></td>
     </tr>
     <tr>
       <td>Disk size</td>
       <td>Select the disk size in GiB to use per node in the cluster.</td>
     </tr>
   </table>

1. Click **Create cluster**. The cluster is displayed in the list of clusters on the **Compatibility Matrix** page.

   :::note
   If the cluster is not automatically displayed, refresh your browser window.
   :::

   <img alt="Cluster configuration dialog" src="/images/cmx-assigned-cluster.png" width="650px"/>

   [View a larger version of this image](/images/cmx-assigned-cluster.png)

### Access Clusters

The compatibility matrix provides the kubeconfig so that you can access the cluster with the kubectl command line tool. For more information, see [Command line tool (kubectl)](https://kubernetes.io/docs/reference/kubectl/) in the Kubernetes documentation.

To access a cluster from the command line:

1. Verify that the cluster is in a Running state:

   ```bash
   replicated cluster ls
   ```
   :::note
   The `STATUS` for the target cluster must be `running` in order to access the kubeconfig.
   :::

1. Run the following command to download the kubeconfig for the cluster and update Kubernetes context:

   ```bash
   replicated cluster kubeconfig CLUSTER_ID
   ```
   When the command completes, a `Updated kubernetes context` message is displayed.

   For command usage, see [cluster kubeconfig](/reference/replicated-cli-cluster-kubeconfig).

1. Verify that you can interact with the cluster through kubectl:

   ```bash
   kubectl get ns
   ```

### Delete Clusters

You can delete clusters using the replicated CLI or the vendor portal.

#### replicated CLI

To delete a cluster using the replicated CLI:

1. Get the ID of the target cluster:

   ```
   replicated cluster ls
   ```
   
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

   In the output of the command, you can see that the `STATUS` of the cluster is `terminated`.

   For command usage, see [cluster ls](/reference/replicated-cli-cluster-ls).

#### Vendor Portal

To delete a cluster using the vendor portal:

1. Go to **Compatibility Matrix**.

1. In the menu for the target cluster, click **Delete cluster**.

   <img alt="Delete cluster button" src="/images/cmx-delete-cluster.png" width="650px"/>

   [View a larger version of this image](/images/cmx-delete-cluster.png)

## Integrate with CI/CD

Replicated recommends that you integrate the compatibility matrix into your existing CI/CD workflow to automate the process of creating clusters to install your application and run tests.

### About Replicated GitHub Actions

Replicated maintains a set of custom GitHub actions that are designed to replace repetitive tasks related to using the compatibility matrix, such as creating and removing clusters. The Replicated GitHub Actions are also designed to users of other Replicated platform features, such as release management, licensing, and installation tooling,

If you use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using replicated CLI commands. Integrating the Replicated GitHub actions into your CI/CD pipeline helps you quickly build workflows with the required inputs and outputs, without needing to manually create the required CLI commands for each step.

To view all the available GitHub actions that Replicated maintains, see the [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.

### Recommended Workflow

The following table describes a recommended CI/CD workflow. For each step, it includes the corresponding replicated CLI command or Replicated GitHub Action, if applicable.

<table>
  <tr>
    <th width="25%">Step</th>
    <th width="35%">Description</th>
    <th width="20%">CLI Command</th>
    <th width="20%">GitHub Action</th>
    
  </tr>
  <tr>
    <td>1. Build application images</td>
    <td><Build/></td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>2. Create clusters</td>
    <td>
      <p>Add a job to create one or more clusters with the compatibility matrix.</p>
      <p>For a list of the available cluster distributions, including the supported Kubernetes versions, instance types, and maximum nodes for each distribution, run <a href="/reference/replicated-cli-cluster-versions"><code>replicated cluster versions</code></a>.</p>
    </td>
    <td><a href="/reference/replicated-cli-cluster-create"><code>replicated cluster create</code></a></td>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/create-cluster">create-cluster</a></td>
  </tr>
  <tr>
    <td>3. Install the application and run tests</td>
    <td><p>Add a job to install your application on the cluster or clusters created by the compatibility matrix.</p><p> Optionally, run tests against the application after installing. For a list of recommended tests to run, see <a href="/vendor/ci-overview#best-practices-and-recommendations">Best Practices and Recommendations</a> in <em>About Integrating with CI/CD</em>.</p></td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>4. Delete clusters</td>
    <td>Add a job to delete the clusters after the application is installed and any tests complete.</td>
    <td><a href="/reference/replicated-cli-cluster-rm"><code>replicated cluster rm</code></a></td>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/remove-cluster">remove-cluster</a></td>
  </tr>
</table>