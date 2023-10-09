import Billing from "../partials/cmx/_billing.mdx"
import Overview from "../partials/cmx/_overview.mdx"
import SupportedClusters from "../partials/cmx/_supported-clusters-overview.mdx"

# Using the Compatibility Matrix as a Standalone Component (Beta)

This topic describes how to use the Replicated compatibility matrix, inlcuding requesting credits, creating clusters using the Replicated vendor portal and the replicated CLI, and integrating the compatibility matrix into continuous integration and continuous delivery (CI/CD) workflows.

:::note
This topic provides information about using the compatibility matrix as a standalone component.

For additional compatibility matrix options available to users of other Replicated platform features, such as release management, licensing, and installation tooling, see [About the Compatibility Matrix (Beta)](/vendor/testing-about). 
::: 

## Overview

<Overview/>

### Supported Clusters

<SupportedClusters/>

### Billing and Credits

<Billing/>

### Time to Live

Replicated recommends that you set a Time To Live (TTL) at the time of creating a cluster to ensure that the cluster is deleted after a period of time. By default, the TTL is one hour, but you can configure it to a minimum of 10 minutes and a maximum of 48 hours. When the TTL expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in the Ready state.

## Use the Compatibility Matrix

This section provides prerequisites and procedures for using the compatibility matrix.

### Prerequisites

To get started with the compatibility matrix, complete the following prerequisites:

* Create an account in the Replicated vendor portal. See [Creating a Vendor Account](/vendor/vendor-portal-creating-account).

* Install the replicated CLI and then authorize the CLI using your vendor account. See [Installing the replicated CLI](/reference/replicated-cli-installing).

* Request access to the compatibility matrix add-on by opening a product request. To open a product request, log in to the vendor portal and go to [Support > Request a feature](https://vendor.replicated.com/support?requestType=feature&productArea=vendor).

* Request credits by going to [Compatibility Matrix > Request more credits](https://vendor.replicated.com/compatibility-matrix) in the vendor portal. For more information, see [Billing and Credits](#billing-and-credits) above.

### Create Clusters

#### replicated CLI

The following example creates a kind cluster with Kubernetes version 1.27.0, a disk size of 100 GiB, and an instance type of `r1.small`. 

```bash
replicated cluster create --name kind-example --distribution kind --version 1.27.0 --disk 100 --instance-type r1.small
```

For command usage, see [cluster create](/reference/replicated-cli-cluster-create).

#### Vendor Portal

To create a cluster from the vendor portal:

1. Go to **Compatibility Matrix > Create cluster**.

1. In the **Cluster configuration** dialog, complete the fields. 

   <img alt="Cluster configuration dialog" src="/images/cmx-cluster-configuration.png" width="400px"/>

1. Click **Create cluster**.

   <img alt="Cluster configuration dialog" src="/images/cmx-assigned-cluster.png" width="400px"/>

   :::note
   If the cluster is not automatically displayed in the list of clusters on the **Compatibility Matrix** page, refresh your browser window.
   :::

#### GitHub Action

The `create-cluster` GtiHub Action https://github.com/replicatedhq/replicated-actions/tree/main/create-cluster 

### Access Clusters with Kubectl

The compatibility matrix provides the kubeconfig for clusters so that you can access the cluster with kubectl.

After a cluster is created and is marked as ready, you can access the kubeconfig for the cluster by running `replicated cluster kubeconfig CLUSTER_ID`.

For command usage, see [cluster kubeconfig](/reference/replicated-cli-cluster-kubeconfig).

### Delete Clusters

#### replicated CLI

To delete a cluster using the replicated CLI:

1. Get the cluster ID:

   * Run `cluster ls`
   * In the vendor portal, the cluster ID is displayed in the list of assigned and running clusters

1. Run the following command:

    ```
    replicated cluster rm CLUSTER_ID
    ```
    Where `CLUSTER_ID` is the ID of the target cluster. 

    For command usage, see [cluster rm](/reference/replicated-cli-cluster-rm).

Confirm that the cluster was deleted:

#### Vendor Portal

To delete a cluster using the vendor portal:

1. Go to **Compatibility Matrix**.

1. In the menu for the target cluster, click **Delete cluster**.

   <img alt="Delete cluster button" src="/images/cmx-delete-cluster.png" width="550px"/>

   [View a larger version of this image](/images/cmx-delete-cluster.png)

#### GitHub Action

The `remove-cluster` GitHub Action deletes a cluster using your API token and the cluster ID as required input. 

For more information, see [remove-cluster](https://github.com/replicatedhq/replicated-actions/tree/main/remove-cluster) in GitHub.

### Integrate with CI/CD

Replicated recommends that you integrate the compatibility matrix into your existing CI/CD workflow to automate the process of creating clusters to install your application and run tests.

<table>
  <tr>
    <th>Step</th>
    <th>Description</th>
    <th width="20%">CLI Command</th>
    <th width="20%">GitHub Action</th>
    
  </tr>
  <tr>
    <td>Build application images</td>
    <td>N/A</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Create clusters</td>
    <td>N/A</td>
    <td>replicated cluster create</td>
    <td>create-cluster</td>
  </tr>
  <tr>
    <td>Install the application and run tests</td>
    <td>For a list of recommended tests to run, see <a href="/vendor/ci-overview#best-practices-and-recommendations">Best Practices and Recommendations</a> in <em>About Integrating with CI/CD</em>.</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Delete clusters</td>
    <td>N/A</td>
    <td>replicated cluster rm</td>
    <td>delete-cluster</td>
  </tr>
</table>

#### GitHub Actions

Replicated maintains a set of custom GitHub actions that are designed to replace repetitive tasks related to distributing your application with Replicated and related to using the compatibility matrix, such as creating and removing clusters and reporting the success or failure of tests. 

If you use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using replicated CLI commands. Integrating the Replicated GitHub actions into your CI/CD pipeline helps you quickly build workflows with the required inputs and outputs, without needing to manually create the required CLI commands for each step.

To view all the available GitHub actions that Replicated maintains, see the [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.
