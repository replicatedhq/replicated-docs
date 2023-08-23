# Integrating with CI/CD

This topic provides recommendations and considerations for integrating replicated CLI commands into your continuous integration and continuous delivery (CI/CD) pipeline.

## Overview

Using automated CI workflows to compile code and run tests against commits to a shared repository improves the speed at which teams can test, iterate on, and deliver releases to customers. When you integrate replicated CLI commands into your CI pipeline, you can automate the process of deploying your application to development environments for testing, rather than needing to manually create and archive releases, channels, and customers to install and test in a development environment.

In addition to integrating replicated CLI commands into CI workflows to support the development process, you can also include workflows in your pipeline for continuous delivery of your releases. For example, you can define a workflow to automatically create and promote a release to the shared Unstable or Beta channel after tests pass.

:::note
How you implement CI/CD workflows varies depending on the CI/CD platform that you use, such as GitHub, GitLab, CircleCI, TravisCI, or Jenkins. Refer to the documentation for your CI/CD platform for more information.
:::

## Recommended Development Workflow

Replicated recommends that you update your CI pipeline to run the following workflow on every commit to a branch in your shared repository that is not `main`: 

1. [Build source code](#dev-build)
1. [Prepare a cluster, deploy, and test](#dev-deploy)
### Build source code {#dev-build}

Build your application source code. For more information, see the documentation for your CI/CD platform.

### Prepare a cluster, deploy, and test {#dev-deploy}

To prepare a cluster and deploy the application, add a job that does the following:
1. (Helm Charts Only) Update chart dependencies and package the Helm chart into a `.tgz` chart archive.

   ```
   helm package . -u
   ```

   See [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation. 

1. Use the Replicated compatibility matrix to prepare one or more clusters and deploy the application. 

  For development workflows, Replicated recommends that you use the compatibility matrix `cluster prepare` command to provision one or more clusters. When you use the `cluster prepare` command, you create a cluster and deploy an application in the cluster in a single command, without needing to create a release, channel, or customer. See [`cluster prepare`](/reference/replicated-cli-cluster-prepare). 

  :::note
  The `cluster prepare` command is Beta. It is recommended for development only and is not recommended for production releases. For production releases, Replicated recommends that you use the `cluster create` command instead. For more information, see [Create cluster matrix and deploy](#rel-deploy) in _Release Workflow_ below.
  :::

  The following example shows how using the `cluster prepare` command to provision a single kind cluster and deploy a Helm chart-based application:

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

1. Run tests, such as integration, smoke, and canary tests. For more information about recommended types of tests to run, see [Test Recommendations](#test-recommendations) below.

1. After the tests complete, remove the cluster. Alternatively, if you set a `ttl` value for the cluster with the `prepare cluster` command, that cluster is automatically removed when the `ttl` is reached. See [`cluster remove`](/reference/replicated-cli-cluster-prepare). 

## Recommended Release Workflow

This section includes a recommended workflow for releasing and application version to your internal development or customer-facing channels (such as the default Unstable, Beta, and Stable channels). You can use variations of this workflow for continuous delivery when you are ready to promote a release for internal testing or for sharing externally with customers.

Replicated recommends that you use the following workflow in your CI/CD pipeline for releases:

1. [Define workflow triggers](#rel-triggers)
1. [Build source code](#rel-build)
1. [Create a release](#rel-release)
1. [Create cluster matrix, deploy, and test](#rel-deploy)
1. [Archive the temporary channel and customer](#rel-cleanup)
1. [Promote to a shared channel](#rel-cleanup)

### Define workflow triggers {#rel-triggers}

Define event triggers for your release workflows so that releases are only promoted to a channel when a given condition is met.

Replicated recommends the following event triggers for unstable, beta, and stable releases:
* On every commit to the `main` branch in your code repository, promote a release to the channel that your team uses for internal testing (such as the default Unstable channel). 
* On pushing a tag that contains a version label with the semantic versioning format `x.y.z-beta-n` (such as `1.0.0-beta.1` or `v1.0.0-beta.2`), promote a release to your team's Beta channel.
* On pushing a tag that contains a version label with the semantic versioning format `x.y.z` (such as `1.0.0` or `v1.0.01`), promote a release to your team's Stable channel.

  :::note
  Replicated recommends that the version label that is used in the tag matches the version label for the release that is created later in this workflow.
  :::

### Build source code {#rel-build}

Build your application source code. For more information, see the documentation for your CI/CD platform.

### Create a release and temporary channel {#rel-release}

Add a job that uses the `releases create` command to create a release and promotes it to a temporary channel. This step allows the release to be installed in clusters for testing. For more information, see [release create](/reference/replicated-cli-release-create).

Include the following in the job to create and promote a release to a temporary channel:

* The application slug and the API token. These are required for interacting with the replicated CLI and the Vendor API v3. See [app ls](/reference/replicated-cli-app-ls) and [Generating API Tokens](/vendor/replicated-api-tokens). 

* (Helm Charts Only) For Helm chart-based applications, update chart dependencies and package the Helm chart into a `.tgz` chart archive.

   ```
   helm package . -u
   ```

   See [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation.

* The application files:
  * For releases installed with KOTS, include the directory for your application files. For Helm chart-based applications, ensure that the `.tgz` chart archive is located in the same directory as the rest of your application files.
  * For releases installed with the Helm CLI, include the `.tgz` Helm chart archive. 

* The name for a temporary channel to promote the release. The `--ensure-channel` flag for the `release create` command creates the channel if it does not already exist.

* The release version label.

### Create cluster matrix, deploy, and test {#rel-deploy}

To provision clusters and run tests, add a job that does the following:

1. Create a temporary customer so that the release can be installed in the clusters created by the compatibility matrix. See [customer create](/reference/replicated-cli-customer-create). 

1. Use the matrix functionality provided by your CI/CD platform to create a matrix of different Kubernetes cluster distributions and versions to run tests against. See [cluster create](/reference/replicated-cli-cluster-create).

   For release workflows that promote a release to one or more shared channels, Replicated recommends that you run tests against multiple clusters of different Kubernetes distributions and versions. You can find the most common Kubernetes distributions and versions used by your customers on the **Customers > Reporting** page in the Replicated vendor portal. For more information, see [Customer Reporting](/vendor/customer-reporting).

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
    ```

1. Run tests, such as integration, smoke, and canary tests. For more information about recommended types of tests to run, see [Test Recommendations](#test-recommendations) below.

1. Delete the cluster when the tests complete. See [cluster rm](/reference/replicated-cli-cluster-rm).
### Archive the temporary channel and customer {#rel-cleanup}

Add a job to archive the temporary channel and customer that you created. This ensures that these artifacts are removed from your Replicated team and that they do not have to be manually archived after the release is promoted.

For more information, see [channel delete](/reference/replicated-cli-channel-delete) and [customer/{customer_id}/archive](https://replicated-vendor-api.readme.io/reference/archivecustomer) in the Vendor API v2 documentation.

### Promote to a shared channel {#rel-promote}

Finally, add a job that uses the `release promote` promote the release to a channel, such as the default Unstable, Beta, or Stable channel. The channel to which the release is promoted depends on the event triggers that you defined for the workflow. For example, if the workflow runs on every commit to the `main` branch, then promote the release to an internal-only channel, such as Unstable. For more information, see [Define Workflow Triggers](#rel-triggers) above.

For more information about promoting releases, see [release promote](/reference/replicated-cli-release-promote).

The `release promote` command requires the following inputs:

* The release sequence number. You can find the release sequence number by running `replicated release ls`. For more information, see [release ls](/reference/replicated-cli-release-ls) and [Sequencing](/vendor/releases-about#sequencing) in _About Channels and Releases_.

* The channel ID. You can find the channel ID by running `replicated channel ls`. For more information, see [channel ls](/reference/replicated-cli-channel-ls) and [Settings](/vendor/releases-about#settings) in _About Channels and Releases_.
Note the following requirements and recommendations for the version label:
  
  * If semantic versioning is enabled on the channel, then the version label must be a valid semantic version number. See [Semantic Versioning](releases-about#semantic-versioning) in _About Channels and Releases_.
  
  * For Helm chart-based applications, the release version label must match the version in the `version` field of the Helm chart `Chart.yaml` file. 
  
  * For releases promoted to a customer-facing channel such as Beta or Stable, Replicated recommends that the version label for the release matches the version label that was used in the tag that triggered the release workflow. See [Define workflow triggers](#rel-triggers) above.

* The application slug and the API token. These are required for interacting with the replicated CLI and the Vendor API v3. See [app ls](/reference/replicated-cli-app-ls) and [Generating API Tokens](/vendor/replicated-api-tokens). 

## Test Recommendations

For release testing, Replicated recommends that you create and run all of the following test types:

- **Application Testing:** Traditional application testing includes unit, integration, and end-to-end tests. These tests are critical for application reliability, and the compatibility matrix is designed to to incorporate and use your application testing.

- **Performance Testing:** Performance testing is used to benchmark your application to ensure it can handle the expected load and scale gracefully. Test your application under a range of workloads and scenarios to identify any bottlenecks or performance issues. Make sure to optimize your application for different Kubernetes distributions and configurations by creating all of the environments you need to test in.

- **Smoke Testing:** Using a single, conformant Kubernetes distribution to test basic functionality of your application with default (or standard) configuration values is a quick way to get feedback if something is likely to be broken for all or most customers.

- **Compatibility Testing:** Because applications run on various Kubernetes distributions and configurations, it is important to test compatibility across different environments. The compatibility matrix provides this infrastructure.

- **Canary Testing:** Before releasing to all customers, consider deploying your application to a small subset of your customer base as a _canary_ release. This lets you monitor the application's performance and stability in real-world environments, while minimizing the impact of potential issues. The compatibility matrix enables canary testing by simulating exact (or near) customer environments and configurations to test your application with.

## GitHub Actions

This section describes the custom actions and example workflows that Replicated maintains that are compatible with the GitHub Action platform. Users of GitHub Actions can use these actions and example workflows 

### Replicated Actions

Replicated maintains a set of custom actions that are compatible with pipelines that use GitHub Actions. The custom Replicated actions are designed to complete repetitive CI/CD tasks such as creating and removing customers, channels, clusters, and more. If your use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using replicated CLI commands. 

For more information, see the [replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.

### Example GitHub Action Workflows

The [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) repository in GitHub contains example GitHub Actions workflows that you can use as a template for your own CI/CD pipelines:
* For a simplified development workflow that uses the `cluster prepare` command to avoid the need to create a release, channel, or customer for testing, see [development-helm-prepare-cluster.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm-prepare-cluster.yaml)..
* For a customizable development workflow for applications installed with the Helm CLI, see [development-helm.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm.yaml).
* For a customizable development workflow for applications installed with KOTS installations, see [development-kots.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-kots.yaml)
* For a release workflow, see [release.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/release.yaml).