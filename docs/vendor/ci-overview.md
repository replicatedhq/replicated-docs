# Integrating with CI/CD

This topic provides recommendations and considerations for integrating replicated CLI commands into your continuous integration and continuous delivery (CI/CD) pipeline.

## Overview

Using automated CI workflows to compile code and run tests against commits to a shared repository improves the speed at which teams can test, iterate on, and deliver releases to customers. When you integrate replicated CLI commands into your CI pipeline, you can automate the process of deploying your application to development environments for testing, rather than needing to manually create and archive releases, channels, and customers to install and test in a development environment.

In addition to integrating replicated CLI commands into CI workflows to support the development process, you can also include workflows in your pipeline for continuous delivery of your releases. For example, you can define a workflow to automatically create and promote a release to the shared Unstable or Beta channel after tests pass.

:::note
How you implement CI/CD workflows varies depending on the CI/CD platform that you use, such as GitHub, GitLab, CircleCI, TravisCI, or Jenkins. Refer to the documentation for your CI/CD platform for more information.
:::

## Recommended Workflows

### Development Workflow

Replicated recommends that you run this workflow on every commit to a branch in your shared repository that is not `main`.

<table>
<tr>
  <th width="33%">Step</th>
  <th width="33%">Description</th>
  <th width="33%">Commands or Endpoints</th>
</tr>
<tr>
  <td>Build</td>
  <td>Build your application source code and Docker images.</td>
  <td>N/A</td>
</tr>
<tr>
  <td>
    Create clusters
  </td>
  <td>
    Use the Replicated compatibility matrix to create one or more clusters. Deploy the application.
  </td>
  <td>
    <a href="/reference/replicated-cli-cluster-prepare">cluster prepare</a>
  </td>
</tr>
<tr>
  <td>
    Test
  </td>
  <td>Run tests against the cluster. See Test Script Recommendations</td>
  <td>N/A</td>
</tr>
<tr>
  <td>Clean up</td>
  <td>Delete the cluster and archive the channel and customer.</td>
  <td>
    <p><a href="/reference/replicated-cli-channel-delete">channel delete</a></p>
    <p><a href="https://replicated-vendor-api.readme.io/reference/archivecustomer">customer/&#123;customer_id&#125;/archive</a></p>
    <p><a href="/reference/replicated-cli-cluster-rm">cluster rm</a></p>
  </td>
</tr>
</table>

### Release Workflow

Replicated recommends that you run this workflow based on the following event triggers:
* For every merge or commit to the `main` branch, create a release on the Unstable with the version label `Unstable-${SHA}`.
* On pushing a Git tag, create a release on the Beta branch with the version label `Beta-${TAG}`.

After you test the tags, and then the release be manually promoted to the `Stable` channel using the vendor portal. Using manual promotion with the vendor portal rather than automated promotion with the replicated CLI allows you to restrict which team members can publish new versions using RBAC roles in the vendor portal.

<table>
<tr>
  <th width="33%">Step</th>
  <th width="33%">Commands or Endpoints</th>
</tr>
<tr>
  <td>Build your application source code and Docker images.</td>
  <td>N/A</td>
</tr>
<tr>
  <td>
    Create a release, channel, and customer.
  </td>
  <td>
    <p><a href="/reference/replicated-cli-release-create">release create</a></p>
    <p><a href="/reference/replicated-cli-channel-create">channel create</a></p>
    <p><a href="/reference/replicated-cli-customer-create">customer create</a></p>
  </td>
</tr>
<tr>
  <td>
    Use the Replicated compatibility matrix to create one or more clusters and deploy the application. See <a href="#create-clusters">Create Clusters</a>.
  </td>
  <td>
    <a href="/reference/replicated-cli-cluster-create">cluster create</a>
  </td>
</tr>
<tr>
  <td>
    Run tests against the cluster.
  </td>
  <td>N/A</td>
</tr>
<tr>
  <td>Delete the cluster and archive the channel and customer.</td>
  <td>
    <p><a href="/reference/replicated-cli-channel-delete">channel delete</a></p>
    <p><a href="https://replicated-vendor-api.readme.io/reference/archivecustomer">customer/&#123;customer_id&#125;/archive</a></p>
    <p><a href="/reference/replicated-cli-cluster-rm">cluster rm</a></p>
  </td>
</tr>
<tr>
  <td>Promote to a shared channel, such as the Unstable or Beta channel.</td>
  <td><a href="/reference/replicated-cli-release-promote">release promote</a></td>
</tr>
</table>

<!-- ## Create Clusters {#create-clusters}

Your CI workflow should create one or more cluster where you can deploy the application and run tests. Whether you decide to create one or many clusters depends on if you intend to run the tests on every commit to a development branch, or only for every release that you intend to promote to a channel (as indicated by a tag or on merge to the `main` branch).

### Create a Single Cluster

For the purpose of running tests against every commit to a development branch, Replicated recommends that you use the Replicated compatibility matrix to create a single cluster of Kind distribution. Kind is a lighter weight Kubernetes distribution, which makes it useful for the purpose of frequent testing. 

The following example replicated CLI command demonstrates using the compatibility matrix to create a kind cluster: 

```bash
replicated cluster create --name kind-example --distribution kind --version 1.25.2 --disk 100 --instance-type r1.small
```

### Create Multiple Clusters Using a Matrix

For releases that you intended to promote to the customer-facing channels, Replicated recommends that you run tests against multiple clusters of different Kubernetes distributions and versions. To create this representative set of clusters, you can use the compatibility matrix and the matrix functionality provided by your CI/CD platform. You can go to the **Customers** page in the Replicated vendor portal to see the common k8s distributions and versions.

The following example shows creating a matrix of clusters of different distributions and versions using GitHub Actions:

  ```yaml
  # github actions cluster matrix example

  compatibility-matrix:
    runs-on: ubuntu-22.04
    strategy:
      matrix:
        cluster:
          - {distribution: kind, version: "1.25.3"}
          - {distribution: kind, version: "1.26.3"}
          - {distribution: eks, version: "1.26"}
          - {distribution: gke, version: "1.27"}
          - {distribution: openshift, version: "4.13.0-okd"} 
  ``` -->

## Test Script Recommendations

For release testing, Replicated recommends that you create and run all of the following test types:

- **Application Testing:** Traditional application testing includes unit, integration, and end-to-end tests. These tests are critical for application reliability, and the compatibility matrix is designed to to incorporate and use your application testing.

- **Performance Testing:** Performance testing is used to benchmark your application to ensure it can handle the expected load and scale gracefully. Test your application under a range of workloads and scenarios to identify any bottlenecks or performance issues. Make sure to optimize your application for different Kubernetes distributions and configurations by creating all of the environments you need to test in.

- **Smoke Testing:** Using a single, conformant Kubernetes distribution to test basic functionality of your application with default (or standard) configuration values is a quick way to get feedback if something is likely to be broken for all or most customers.

- **Compatibility Testing:** Because applications run on various Kubernetes distributions and configurations, it is important to test compatibility across different environments. The compatibility matrix provides this infrastructure.

- **Canary Testing:** Before releasing to all customers, consider deploying your application to a small subset of your customer base as a _canary_ release. This lets you monitor the application's performance and stability in real-world environments, while minimizing the impact of potential issues. The compatibility matrix enables canary testing by simulating exact (or near) customer environments and configurations to test your application with.

## GitHub Actions

### Replicated Actions

Replicated maintains a set of custom actions that are compatible with GitHub Actions pipelines. If your use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than  

<a href="https://github.com/replicatedhq/replicated-actions/blob/main/create-release/README.md">replicatedhq/replicated-actions/create-release</a>
<a href="https://github.com/replicatedhq/replicated-actions/tree/main/create-customer">replicatedhq/replicated-actions/create-customer</a>
<a href="https://github.com/replicatedhq/replicated-actions/tree/main/promote-release">replicatedhq/replicated-actions/promote-release</a>
<a href="https://github.com/replicatedhq/replicated-actions/tree/main/prepare-cluster">replicatedhq/replicated-actions/prepare-cluster</a>
<a href="https://github.com/replicatedhq/replicated-actions/tree/main/create-cluster">replicatedhq/replicated-actions/create-cluster</a>
<a href="https://github.com/replicatedhq/replicated-actions/tree/main/remove-cluster">replicatedhq/replicated-actions/remove-cluster</a>
<a href="https://github.com/replicatedhq/replicated-actions/tree/main/archive-customer">replicatedhq/replicated-actions/archive-customer</a>
<a href="/reference/replicated-cli-release-promote">release promote</a>

### Example GitHub Action Workflows

The [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) repository in GitHub contains example workflows that:
* Development workflow that uses the Beta `cluster prepare` command to avoid the need to create a release, channel, or customer for testing: https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm-prepare-cluster.yaml
* Development workflow for Helm that runs on each commit: https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm.yaml
* Development workflow for KOTS installations that runs on each commit: https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-kots.yaml
* Release workflow that runs each time a tag is placed on the repository: https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/release.yaml

Additionally, if you support Replicated KOTS installation, for an example tag-based workflow that adds logic for making production releases using Git tags, see [main.yml
](https://github.com/replicatedhq/replicated-starter-kots/tree/main/.github/workflows/main.yml) in the `replicated-starter-kots` repository in GitHub.