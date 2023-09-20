import Build from "../partials/ci-cd/_build-source-code.mdx"

# Recommended CI/CD Workflows

This topic provides Replicated's recommended development and release workflows for your continuous integration and continuous delivery (CI/CD) pipelines.

## Overview

Replicated recommends that you maintain unique workflows for development (continuous integration) and for releasing your software (continuous delivery). The development and release workflows in this topic describe the recommended steps and jobs to include in your workflows. For each step, the corresponding replicated CLI command or custom GitHub action is provided. 

For more information about using the replicated CLI, see [Installing the replicated CLI](/reference/replicated-cli-installing). For more information about integrating the GitHub actions into your CI/CD workflows, see [Integrating Replicated GitHub Actions](ci-workflows-github-actions).

:::note
How you implement CI/CD workflows varies depending on the platform, such as GitHub, GitLab, CircleCI, TravisCI, or Jenkins. Refer to the documentation for your CI/CD platform for additional guidance on how to create jobs and workflows.
:::

## Development Workflow

1. [Define workflow triggers](#dev-triggers)
1. [Build source code](#dev-build)
1. [Prepare clusters, deploy, and test](#dev-deploy)

### Define workflow triggers {#dev-triggers}

Run a development workflow on every commit to a branch in your code repository that is _not_ `main`. The following example shows defining a workflow trigger in GitHub Actions that runs the workflow when a commit is pushed to any branch other than `main`:

```yaml
name: development-workflow-example

on:
  push:
    branches:
      - '*'         # matches every branch that doesn't contain a '/'
      - '*/*'       # matches every branch containing a single '/'
      - '**'        # matches every branch
      - '!main'     # excludes main

jobs:
  ...
```

### Build source code {#dev-build}

<Build/>

### Prepare clusters, deploy, and test {#dev-deploy}

Add a job with the following steps to prepare clusters with the Replicated compatibility matrix, deploy the application, and run tests:

1. Use the Replicated compatibility matrix to prepare one or more clusters and deploy the application. For more information about the compatibility matrix, see [About the Compatibility Matrix](testing-about).

  For development workflows, Replicated recommends that you use the `cluster prepare` command to provision one or more clusters with the compatibility matrix. The `cluster prepare` command creates a cluster, creates a release, and installs the release in the cluster, without the need to promote the release to a channel or create a temporary customer. For more information, see [`cluster prepare`](/reference/replicated-cli-cluster-prepare).

  :::note
  The `cluster prepare` command is Beta. It is recommended for development only and is not recommended for production releases. For production releases, Replicated recommends that you use the `cluster create` command instead. For more information, see [Create cluster matrix and deploy](#rel-deploy) in _Release Workflow_ below.
  :::

1. Run tests, such as integration, smoke, and canary tests. For more information about recommended types of tests to run, see [Test Script Recommendations](/vendor/testing-how-to#test-script-recommendations) in _Using the Compatibility Matrix_.

1. After the tests complete, remove the cluster. Alternatively, if you used the `--ttl` flag with the `prepare cluster` command, the cluster is automatically removed when the time period provided is reached. See the [`cluster remove`](/reference/replicated-cli-cluster-prepare) replicated CLI command. Or, for GitHub Actions workflow, see the [remove-cluster](https://github.com/replicatedhq/replicated-actions/tree/main/remove-cluster) action. 

## Release Workflow

1. [Define workflow triggers](#rel-triggers)
1. [Build source code](#rel-build)
1. [Create a release and promote to a temporary channel](#rel-release)
1. [Create cluster matrix, deploy, and test](#rel-deploy)
1. [Promote to a shared channel](#rel-promote)
1. [Archive the temporary channel and customer](#rel-cleanup)

### Define workflow triggers {#rel-triggers}

Create multiple release workflows for creating and promoting releases to your team's internal-only, beta, or stable channels. Define unique event triggers for each of your release workflows so that releases are only promoted to a channel when a given condition is met:

* On every commit to the `main` branch in your code repository, promote a release to the channel that your team uses for internal testing (such as the default Unstable channel).

  The following example shows defining a workflow trigger in GitHub Actions that runs the workflow on commits to `main`:

   ```yaml
   name: unstable-release-example

   on:
     push:
       branches:
         - 'main'

   jobs:
     ...
   ```

* On pushing a tag that contains a version label with the semantic versioning format `x.y.z-beta-n` (such as `1.0.0-beta.1` or `v1.0.0-beta.2`), promote a release to your team's Beta channel.

  The following example shows defining a workflow trigger in GitHub Actions that runs the workflow when a tag that matches the format `v*.*.*-beta.*` is pushed:

   ```yaml
   name: beta-release-example

   on:
     push:
       tags:
       - "v*.*.*-beta.*"

   jobs:
     ...
   ```

* On pushing a tag that contains a version label with the semantic versioning format `x.y.z` (such as `1.0.0` or `v1.0.01`), promote a release to your team's Stable channel.

  The following example shows defining a workflow trigger in GitHub Actions that runs the workflow when a tag that matches the format `v*.*.*` is pushed:

   ```yaml
   name: stable-release-example

   on:
     push:
       tags:
       - "v*.*.*"

   jobs:
     ...
   ```

### Build source code {#rel-build}

<Build/>

### Create a release and promote to a temporary channel {#rel-release}

Add a job that uses the `release create` command to create and promote a release to a temporary channel. This allows the release to be installed for testing in the next step. For more information, see [release create](/reference/replicated-cli-release-create).

Consider the following requirements and recommendations:

* Use a consistent naming pattern for the temporary channels. Additionally, configure the workflow so that a new temporary channel with a unique name is created each time that the release workflow runs. 

* Use semantic versioning for the release version label.

  :::note
  If semantic versioning is enabled on the channel where you promote the release, then the release version label _must_ be a valid semantic version number. See [Semantic Versioning](releases-about#semantic-versioning) in _About Channels and Releases_.
  :::

* For Helm chart-based applications, the release version label must match the version in the `version` field of the Helm chart `Chart.yaml` file. To automatically update the `version` field in the `Chart.yaml` file, you can define a step in this job that updates the version label before packaging the Helm chart into a `.tgz` archive.

* For releases that will be promoted to a customer-facing channel such as Beta or Stable, Replicated recommends that the version label for the release matches the tag that triggered the release workflow. For example, if the tag `1.0.0-beta.1` was used to trigger the workflow, then the version label for the release is also `1.0.0-beta.1`.

### Create cluster matrix, deploy, and test {#rel-deploy}

Add a job with the following steps to provision clusters with the compatibility matrix, deploy your application to the clusters, and run tests:

1. Create a temporary customer for installing the release. See the [customer create](/reference/replicated-cli-customer-create) replicated CLI command. Or, for GitHub Actions workflows, see the [create-customer](https://github.com/replicatedhq/replicated-actions/tree/main/create-customer) action.

1. Use the compatibility matrix to create a matrix of different Kubernetes cluster distributions and versions to run tests against. See the [cluster create](/reference/replicated-cli-cluster-create) replicated CLI command. Or, for GitHub Actions workflows, see the [create-cluster](https://github.com/replicatedhq/replicated-actions/tree/main/create-cluster) action.

   Consider the following recommendations:

     * For release workflows, Replicated recommends that you run tests against multiple clusters of different Kubernetes distributions and versions. To help build the matrix, you can review the most common Kubernetes distributions and versions used by your customers on the **Customers > Reporting** page in the Replicated vendor portal. For more information, see [Customer Reporting](/vendor/customer-reporting).
     
     * GitHub Actions users can also use the `get-customer-instances` action to automate the creation of a cluster matrix based on the distributions of clusters where instances of your application are installed and running. For more information, see [get-customer-instances](https://github.com/replicatedhq/replicated-actions/tree/main/get-customer-instances) in GitHub. 

   The following example shows creating a matrix of clusters of different distributions and versions using GitHub Actions:

    ```yaml
    # github actions cluster matrix example

    compatibility-matrix-example:
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

1. Run tests, such as integration, smoke, and canary tests. For more information about recommended types of tests to run, see [Test Script Recommendations](/vendor/testing-how-to#test-script-recommendations) in _Using the Compatibility Matrix_.

1. Delete the cluster when the tests complete. See [cluster rm](/reference/replicated-cli-cluster-rm).

### Promote to a shared channel {#rel-promote}

Add a job that uses the `release promote` command to promote the release to a channel, such as the default Unstable, Beta, or Stable channel. For more information, see [release promote](/reference/replicated-cli-release-promote).

Consider the following requirements and recommendations:

* Replicated recommends that you include the `--version` flag with the `release promote` command to explicitly declare the version label for the release. Use the same version label that was used when the release was created as part of [Create a release and promote to a temporary channel](#rel-release) above. Although the `--version` flag is not required, declaring the same release version label during promotion provides additional consistency that makes the releases easier to track. 

* The channel to which the release is promoted depends on the event triggers that you defined for the workflow. For example, if the workflow runs on every commit to the `main` branch, then promote the release to an internal-only channel, such as Unstable. For more information, see [Define Workflow Triggers](#rel-triggers) above.

* Use the `--release-notes` flag to include detailed release notes in markdown.

### Archive the temporary channel and customer {#rel-cleanup}

Finally, add a job to archive the temporary channel and customer that you created. This ensures that these artifacts are removed from your Replicated team and that they do not have to be manually archived after the release is promoted.

For more information, see [channel delete](/reference/replicated-cli-channel-delete) and [customer/{customer_id}/archive](https://replicated-vendor-api.readme.io/reference/archivecustomer) in the Vendor API v3 documentation.