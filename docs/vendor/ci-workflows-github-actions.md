# Integrating Replicated GitHub Actions

This topic describes how to integrate Replicated's custom GitHub actions into continuous integration and continuous delivery (CI/CD) workflows that use the GitHub Actions platform.

## Overview

Replicated maintains a set of custom actions that are designed to replace repetitive tasks such as creating and removing customers, channels, clusters, and more. If you use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using replicated CLI commands. Integrating the Replicated GitHub actions into your CI/CD pipeline helps you quickly build workflows with the required inputs and outputs, without needing to manually create the required CLI commands for each step. 

To view all the available GitHub actions that Replicated maintains, see the [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.

## GitHub Actions Workflow Examples

The [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) repository in GitHub contains example GitHub Actions workflows that you can use as a template for your own CI/CD pipelines:

* For a simplified development workflow, see [development-helm-prepare-cluster.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm-prepare-cluster.yaml).

* For a customizable development workflow for applications installed with the Helm CLI, see [development-helm.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm.yaml).

* For a customizable development workflow for applications installed with KOTS, see [development-kots.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-kots.yaml).

* For a release workflow, see [release.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/release.yaml).

## Integrate GitHub Actions into CI/CD Workflows

The following table lists each of the replicated CLI commands that are used in CI/CD workflows with the GitHub action that can be used instead. The table also provides and a link to an example of using the action in a CI/CD workflow.

<table>
  <tr>
    <th width="25%">Replaces this replicated CLI command...</th>
    <th width="25%">GitHub action</th>
    <th width="25%">Description</th>
    <th width="25%">Example</th>
  </tr>
  <tr>
    <td><code>cluster prepare</code></td>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/prepare-cluster">prepare-cluster</a></td>
    <td>
      <p>In development workflows, prepare a cluster for testing.</p>
      <p></p>
    </td>
    <td>
    <a href="https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm-prepare-cluster.yaml#L26">development-helm-prepare-cluster.yaml</a>
    </td>
  </tr>
  <tr>
    <td><code>cluster remove</code></td>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/remove-cluster">remove-cluster</a></td>
    <td>Remove a cluster after running tests</td>
    <td></td>
  </tr>
  <tr>
    <td><code>release create</code></td>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/create-release">create-release</a></td>
    <td>In a release workflow, promote a release to a temporary channel. This allows the release to be installed in one or more clusters for testing.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>cluster create</code></td>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/create-cluster">create-release</a></td>
    <td>In a release workflow, create a cluster for testing.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>cluster remove</code></td>
    <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/archive-customer">archive-customer</a></td>
    <td>
      <p>In release workflows, archive the temporary customer after running tests.</p>
      <p>See <a href="/vendor/ci-workflows#rel-release">Create a release and promote to a temporary channel</a> in <em>Recommended CI/CD Workflows</em>.</p>
    </td> 
    <td></td>
  </tr>
</table> 