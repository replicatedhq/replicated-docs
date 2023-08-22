# CI/CD Recommendations

This topic provides recommendations and considerations for integrating Replicated into your continuous integration and continuous delivery (CI/CD) workflows.

## Overview

Using automated CI workflows to compile code and run tests against every commit to a shared repository improves the speed at which developers can test, iterate on, and deliver releases to customers. When you integrate common Replicated application distribution tasks (though including replicated CLI commands, Vendor API v3 requests, or Replicated GitHub Actions) into your CI pipeline, you can automate the process of creating customers, channels, clusters, and releases, rather than needing to manually create these artifacts to test your changes in a development environment.

## Recommended CI/CD Workflow 

This section includes recommended CI workflow steps to integrate replicated CLI commands into a CI pipeline. For example workflows that use GitHub Actions, see the [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) repository in GitHub.

How you implement CI/CD workflows varies depending on the CI/CD platform that you use, such as GitHub, GitLab, CircleCI, TravisCI, or Jenkins. Refer to the documentation for your CI/CD platform for more information.

The table in this section includes the following:
* The recommended CI workflow steps with descriptions of each step
* When applicable, the corresponding replicated CLI command or Vendor API v3 endpoint
* For users of GitHub Actions, the corresponding GitHub Action maintained by Replicated

<table>
<tr>
  <th width="33%">Step</th>
  <th width="33%">Commands or Endpoints</th>
  <th width="33%">Replicated GitHub Actions</th>
</tr>
<tr>
  <td>Build your application source code and Docker images.</td>
  <td>N/A</td>
  <td>N/A</td>
</tr>
<tr>
  <td>
    Create release, channel, and customer artifacts in the Replicated platform. See <a href="#create-artifacts">Create a Release, Channel, and Customer</a>.
  </td>
  <td>
    <p><a href="/reference/replicated-cli-release-create">release create</a></p>
    <p><a href="/reference/replicated-cli-channel-create">channel create</a></p>
    <p><a href="/reference/replicated-cli-customer-create">customer create</a></p>
  </td>
  <td>
    <p><a href="https://github.com/replicatedhq/replicated-actions/blob/main/create-release/README.md">replicatedhq/replicated-actions/create-release</a></p>
    <p><a href="https://github.com/replicatedhq/replicated-actions/tree/main/create-customer">replicatedhq/replicated-actions/create-customer</a></p>
  </td>
</tr>
<tr>
  <td>
    Use the compatibility matrix to create one or more clusters and deploy the application. See <a href="#create-clusters">Create Clusters</a>.
  </td>
  <td>
    <a href="/reference/replicated-cli-cluster-create">cluster create</a>
  </td>
  <td><a href="https://github.com/replicatedhq/replicated-actions/tree/main/create-cluster">replicatedhq/replicated-actions/create-cluster</a></td>
</tr>
<tr>
  <td>
    Run tests against the cluster. See <a href="#run-tests">Run Tests</a>.
  </td>
  <td><a href="/reference/replicated-cli-cluster-rm">cluster rm</a></td>
  <td>
    <a href="https://github.com/replicatedhq/replicated-actions/tree/main/remove-cluster">replicatedhq/replicated-actions/remove-cluster</a>
  </td>
</tr>
<tr>
  <td>Delete the cluster and archive the channel and customer. See <a href="#clean-up">Clean Up</a>.</td>
  <td>
    <p><a href="/reference/replicated-cli-channel-delete">channel delete</a></p>
    <p><a href="https://replicated-vendor-api.readme.io/reference/archivecustomer">customer/&#123;customer_id&#125;/archive</a></p>
  </td>
  <td>
    <a href="https://github.com/replicatedhq/replicated-actions/tree/main/archive-customer">replicatedhq/replicated-actions/archive-customer</a>
  </td>
</tr>
</table>

### Create a Release, Channel, and Customer {#create-artifacts}

Replicated recommends that you run a workflow to creates a new release on the Unstable channel every time you merge a branch or commit to `main`. Create a release named for the commit: `Unstable-${SHA}`.

#### Using Tags for Production Releases

Replicated recommends using a Git-based workflow. Using a Git-based workflow allows teams to map Git branches to channels in the Replicated vendor portal, and allows multiple team members to seamlessly collaborate across features and releases.

If you support Replicated KOTS installation, for an example tag-based workflow that adds logic for making production releases using Git tags, see [main.yml
](https://github.com/replicatedhq/replicated-starter-kots/tree/main/.github/workflows/main.yml) in the replicated-starter-kots repository in GitHub.

Replicated recommends:
* On pushes to the `main` branch, create a release on unstable with the name `Unstable-${SHA}`
* On pushing a Git tag, create a release on the beta branch, using the name `Beta-${TAG}` for the release version.

Replicated recommends that these tags be tested, and then the release be manually promoted to the `Stable` channel using the vendor portal. Using manual promotion with the vendor portal rather than automated promotion with the replicated CLI allows you to restrict which team members can publish new versions using RBAC roles in the vendor portal.

### Create Clusters {#create-clusters}

To create a cluster for the purpose of running tests against every commit, Replicated recommends that you use the compatibility matrix to create a cluster with kind. Kind is a lighter weight Kubernetes distribution that 

The following example replicated CLI command demonstrates using the compatibility matrix to create a kind cluster: 

```bash
replicated cluster create --name kind-example --distribution kind --version 1.25.2 --disk 100 --instance-type r1.small
```

For more complete tests, Replicated recommends that you use the compatibility matrix and the matrix functionality provided by your CI/CD platform to create a representative set of clusters based on your customer's environments. You can go to the **Customers** page in the Replicated vendor portal to see the common k8s distributions and versions.

The following example shows creating a matrix of clusters of different distributions and versions using GitHub Actions:

  ```yaml
  # github actions example
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
  ```

### Run Tests

You design and write your own test scripts to use with the compatibility matrix. This section describes some of the options and common use cases to help guide you.

For release testing, Replicated recommends that you create and run all of the following test types and include them in CI/CD pipelines so that testing is automated.

- **Application Testing:** Traditional application testing includes unit, integration, and end-to-end tests. These tests are critical for application reliability, and the compatibility matrix is designed to to incorporate and use your application testing.

- **Performance Testing:** Performance testing is used to benchmark your application to ensure it can handle the expected load and scale gracefully. Test your application under a range of workloads and scenarios to identify any bottlenecks or performance issues. Make sure to optimize your application for different Kubernetes distributions and configurations by creating all of the environments you need to test in.

- **Smoke Testing:** Using a single, conformant Kubernetes distribution to test basic functionality of your application with default (or standard) configuration values is a quick way to get feedback if something is likely to be broken for all or most customers.

- **Compatibility Testing:** Because applications run on various Kubernetes distributions and configurations, it is important to test compatibility across different environments. The compatibility matrix provides this infrastructure.

- **Canary Testing:** Before releasing to all customers, consider deploying your application to a small subset of your customer base as a _canary_ release. This lets you monitor the application's performance and stability in real-world environments, while minimizing the impact of potential issues. The compatibility matrix enables canary testing by simulating exact (or near) customer environments and configurations to test your application with.

### Clean Up

Archive channels and customers

Delete the cluster