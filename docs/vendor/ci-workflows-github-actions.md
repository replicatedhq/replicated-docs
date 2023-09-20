# Integrating Replicated GitHub Actions

This topic describes how to integrate Replicated's custom GitHub actions into continuous integration and continuous delivery (CI/CD) workflows that use the GitHub Actions platform.

## Overview

Replicated maintains a set of custom GitHub actions that are designed to replace repetitive tasks related to distributing your application with Replicated and related to using the compatibility matrix, such as:
  * Creating and removing customers, channels, and clusters
  * Promoting releases
  * Creating a matrix of clusters for testing based on the Kubernetes distributions and versions where your customers are running application instances
  * Reporting the success or failure of tests 

If you use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using replicated CLI commands. Integrating the Replicated GitHub actions into your CI/CD pipeline helps you quickly build workflows with the required inputs and outputs, without needing to manually create the required CLI commands for each step.

To view all the available GitHub actions that Replicated maintains, see the [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.

## GitHub Actions Workflow Examples

The [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) repository in GitHub contains example workflows that use the Replicated GitHub actions. You can use these workflows as a template for your own GitHub Actions CI/CD workflows:

* For a simplified development workflow, see [development-helm-prepare-cluster.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm-prepare-cluster.yaml).
* For a customizable development workflow for applications installed with the Helm CLI, see [development-helm.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm.yaml).
* For a customizable development workflow for applications installed with KOTS, see [development-kots.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-kots.yaml).
* For a release workflow, see [release.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/release.yaml).

## Integrate GitHub Actions

The following table lists GitHub actions that are maintained by Replicated that you can integrate into your CI/CI workflows. The table also describes when to use the action in a workflow and indicates the related replicated CLI command where applicable.

:::note
For an up-to-date list of the avilable custom GitHub actions, see the [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.
:::

<table>
  <tr>
    <th width="25%">GitHub Action</th>
    <th width="50%">When to Use</th>
    <th width="25%">Related replicated CLI commands</th>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/archive-channel">archive-channel</a></td>
    <td>
      <p>In release workflows, a temporary channel is created to promote a release for testing. This action archives the temporary channel after tests complete.</p>
      <p>See <a href="/vendor/ci-workflows#rel-cleanup">Archive the temporary channel and customer</a> in <em>Recommended CI/CD Workflows</em>.</p>
    </td> 
    <td><a href="/reference/replicated-cli-channel-delete"><code>channel delete</code></a></td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/archive-customer">archive-customer</a></td>
    <td>
      <p>In release workflows, a temporary customer is created so that a release can be installed for testing. This action archives the temporary customer after tests complete.</p>
      <p>See <a href="/vendor/ci-workflows#rel-cleanup">Archive the temporary channel and customer</a> in <em>Recommended CI/CD Workflows</em>.</p>
    </td> 
    <td>N/A</td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/create-cluster">create-cluster</a></td>
    <td>
      <p>In release workflows, use this action to create one or more clusters for testing.</p>
      <p>See <a href="/vendor/ci-workflows#rel-deploy">Create cluster matrix, deploy, and test</a> in <em>Recommended CI/CD Workflows</em>.</p>
    </td>
    <td><a href="/reference/replicated-cli-cluster-create"><code>cluster create</code></a></td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/create-release">create-release</a></td>
    <td>
      <p>In release workflows, use this action to create a release to be installed and tested, and optionally to be promoted to a shared channel after tests complete.</p>
      <p>See <a href="/vendor/ci-workflows#rel-release">Create a release and promote to a temporary channel</a> in <em>Recommended CI/CD Workflows</em>. </p>
    </td>
    <td><a href="/reference/replicated-cli-release-create"><code>release create</code></a></td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/get-customer-instances">get-customer-instances</a></td>
    <td>
      <p>In release workflows, use this action to create a matrix of clusters for running tests based on the Kubernetes distributions and versions of active instances of your application running in customer environments.</p>
      <p>See <a href="/vendor/ci-workflows#rel-deploy">Create cluster matrix, deploy, and test</a> in <em>Recommended CI/CD Workflows</em>.</p>
    </td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/helm-install">helm-install</a></td>
    <td><p>In development or release workflows, use this action to install a release using the Helm CLI in one or more clusters for testing.</p>
    <p>See <a href="/vendor/ci-workflows#rel-deploy">Create cluster matrix, deploy, and test</a> in <em>Recommended CI/CD Workflows</em>.</p>
    </td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/kots-install">kots-install</a></td>
    <td>
    <p>In development or release workflows, use this action to install a release with Replicated KOTS in one or more clusters for testing.</p>
    <p>See <a href="/vendor/ci-workflows#rel-deploy">Create cluster matrix, deploy, and test</a> in <em>Recommended CI/CD Workflows</em>.</p>
    </td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/prepare-cluster">prepare-cluster</a></td>
    <td>
      <p>In development workflows, use this action to create a cluster, create a temporary customer of type <code>test</code>, and install an application in the cluster.</p>
      <p>See <a href="/vendor/ci-workflows#dev-deploy">Prepare clusters, deploy, and test</a> in <em>Recommended CI/CD Workflows</em>.</p>
    </td>
    <td><a href="/reference/replicated-cli-cluster-prepare"><code>cluster prepare</code></a></td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/promote-release">promote-release</a></td>
    <td>
      <p>In release workflows, use this action to promote a release to an internal or customer-facing channel (such as Unstable, Beta, or Stable) after tests pass.</p>
      <p>See <a href="/vendor/ci-workflows#rel-promote">Promote to a shared channel</a>in <em>Recommended CI/CD Workflows</em>.</p>
    </td>
    <td><a href="/reference/replicated-cli-release-promote"><code>release promote</code></a></td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/remove-cluster">remove-cluster</a></td>
    <td><p>In development or release workflows, use this action to remove a cluster after running tests if no <code>ttl</code> was set for the cluster.</p>
    <p>See <a href="/vendor/ci-workflows#dev-deploy">Prepare clusters, deploy, and test</a> and <a href="/vendor/ci-workflows#rel-deploy">Create cluster matrix, deploy, and test</a> in <em>Recommended CI/CD Workflows</em>.</p>
    </td>
    <td><a href="/reference/replicated-cli-cluster-rm"><code>cluster rm</code></a></td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/report-compatibility-result">report-compatibility-result</a></td>
    <td>In development or release workflows, use this action to report the success or failure of tests that ran in clusters provisioned by the compatibility matrix.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/upgrade-cluster">upgrade-cluster</a></td>
    <td>In release workflows, use this action to test your application's compatibility with Kubernetes API resource version migrations after upgrading.</td>
    <td><a href="/reference/replicated-cli-cluster-upgrade"><code>cluster upgrade</code></a></td>
  </tr>
</table> 