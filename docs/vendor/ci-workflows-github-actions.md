# GitHub Actions CI/CD Workflows

This topic describes how to integrate Replicated's custom GitHub actions into continuous integration and continuous delivery (CI/CD) workflows that use the GitHub Actions platform.

## Overview

Replicated maintains a set of custom actions that are designed to replace repetitive tasks such as creating and removing customers, channels, clusters, and more. If you use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using replicated CLI commands. 

For more information, see the [replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.

## Recommended Workflows

### Development Workflow

#### Define workflow triggers {#dev-triggers}

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

#### Build source code {#dev-build}

<Build/>

#### Prepare clusters, deploy, and test {#dev-deploy}

Add a job with the following steps to prepare clusters with the Replicated compatibility matrix, deploy the application, and run tests:

1. Use the Replicated compatibility matrix to prepare one or more clusters and deploy the application. For more information about the compatibility matrix, see [About the Compatibility Matrix](testing-about).

  Use the [prepare-cluster](https://github.com/replicatedhq/replicated-actions/tree/main/prepare-cluster) action.

1. Run tests, such as integration, smoke, and canary tests. For more information about recommended types of tests to run, see [Test Script Recommendations](/vendor/testing-how-to#test-script-recommendations) in _Using the Compatibility Matrix_.

1. After the tests complete, remove the cluster. Use the [remove-cluster](https://github.com/replicatedhq/replicated-actions/tree/main/remove-cluster) action.

### Release Workflow

1. [Define workflow triggers](#rel-triggers)
1. [Build source code](#rel-build)
1. [Create a release and promote to a temporary channel](#rel-release)
1. [Create cluster matrix, deploy, and test](#rel-deploy)
1. [Promote to a shared channel](#rel-promote)
1. [Archive the temporary channel and customer](#rel-cleanup)

#### Define workflow triggers {#rel-triggers}

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

#### Build source code {#rel-build}

<Build/>

#### Create a release and promote to a temporary channel {#rel-release}

Add a job that uses the [create release](https://github.com/replicatedhq/replicated-actions/tree/main/create-release) action to create and promote a release to a temporary channel. This allows the release to be installed for testing in the next step.

**Example**:

```yaml
- name: Create Replicated Release
  id: create-release
  uses: replicatedhq/replicated-actions/create-release@v1
    with:
      app-slug: ${{ secrets.REPLICATED_APP }}
      api-token: ${{ secrets.REPLICATED_API_TOKEN }}
      yaml-dir: ./my-dir
      promote-channel: ${{ env.CHANNEL_NAME }}
      version: ${{ github.ref_name }}
```

Consider the following requirements and recommendations:

* Use a consistent naming pattern for the temporary channels. Additionally, configure the workflow so that a new temporary channel with a unique name is created each time that the release workflow runs. 

* Use semantic versioning for the release version label.

  :::note
  If semantic versioning is enabled on the channel where you promote the release, then the release version label _must_ be a valid semantic version number. See [Semantic Versioning](releases-about#semantic-versioning) in _About Channels and Releases_.
  :::

* For Helm chart-based applications, the release version label must match the version in the `version` field of the Helm chart `Chart.yaml` file. To automatically update the `version` field in the `Chart.yaml` file, you can define a step in this job that updates the version label before packaging the Helm chart into a `.tgz` archive.

* For releases that will be promoted to a customer-facing channel such as Beta or Stable, Replicated recommends that the version label for the release matches the tag that triggered the release workflow. For example, if the tag `1.0.0-beta.1` was used to trigger the workflow, then the version label for the release is also `1.0.0-beta.1`.

#### Create cluster matrix, deploy, and test {#rel-deploy}

Add a job with the following steps to provision clusters with the compatibility matrix, deploy your application to the clusters, and run tests:

1. Create a temporary customer for installing the release. See [create-customer](https://github.com/replicatedhq/replicated-actions/tree/main/create-customer). 

   **Example**
   
   ```yaml
   - name: Create Customer 
        id: create-customer
        uses: replicatedhq/replicated-actions/create-customer@v1
        with:
          app-slug: ${{ secrets.REPLICATED_APP }}
          api-token: ${{ secrets.REPLICATED_API_TOKEN }}
          customer-name: ${{ github.ref_name }}-${{ matrix.cluster.distribution }}-${{ matrix.cluster.version }}
          channel-slug: ${{ needs.push-to-replicated.outputs.channel-slug }}
          customer-email: ${{ github.ref_name }}@example.com
          expires-in: 14
    ```      

1. Use the compatibility matrix to create a matrix of different Kubernetes cluster distributions and versions to run tests against. See [create-cluster](https://github.com/replicatedhq/replicated-actions/tree/main/create-cluster).

   For release workflows, Replicated recommends that you run tests against multiple clusters of different Kubernetes distributions and versions. To help build the matrix, you can review the most common Kubernetes distributions and versions used by your customers on the **Customers > Reporting** page in the Replicated vendor portal. For more information, see [Customer Reporting](/vendor/customer-reporting).

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

    Create cluster example:
    
    ```yaml
     - name: Create Cluster
        id: create-cluster
        uses: replicatedhq/replicated-actions/create-cluster@v1
        
        with:
          api-token: ${{ secrets.REPLICATED_API_TOKEN }}
          kubernetes-distribution: ${{ matrix.cluster.distribution }}
          kubernetes-version: ${{ matrix.cluster.version }}
          cluster-name: ${{ github.ref_name }}-${{ matrix.cluster.distribution }}-${{ matrix.cluster.version }}
          timeout-minutes: 2
          ttl: 10m
    ```

1. Run tests, such as integration, smoke, and canary tests. For more information about recommended types of tests to run, see [Test Script Recommendations](/vendor/testing-how-to#test-script-recommendations) in _Using the Compatibility Matrix_.

   **Example**

   ```yaml
         - name: Run a test
        # mask the kubeconfig so it doesn't show up in the logs
        run: |
          echo "Running a test"
          echo "${{ steps.create-cluster.outputs.cluster-kubeconfig }}" > kubeconfig.yaml
          sleep 60
          kubectl port-forward svc/relmatrix-app --pod-running-timeout=2m --kubeconfig='./kubeconfig.yaml' 8080:80 &
          sleep 120
          curl -f http://localhost:8080
          echo "Test complete"
    ```     

1. Delete the cluster when the tests complete, and archive the temporary customers. See [remove-cluster](https://github.com/replicatedhq/replicated-actions/tree/main/remove-cluster) and [archive-customer](https://github.com/replicatedhq/replicated-actions/tree/main/archive-customer) in the replicated-actions repository.

   **Example**

   ```yaml
   - name: Remove Cluster
        id: remove-cluster
        uses: replicatedhq/replicated-actions/remove-cluster@v1
        continue-on-error: true # It could be that the cluster is already removed
        with:
          api-token: ${{ secrets.REPLICATED_API_TOKEN }}
          cluster-id: ${{ steps.create-cluster.outputs.cluster-id }}

      - name: Archive Customer
        id: archive-customer
        if: always()
        uses: replicatedhq/replicated-actions/archive-customer@v1
        with:
          api-token: ${{ secrets.REPLICATED_API_TOKEN }}
          customer-id:  ${{ steps.create-customer.outputs.customer-id }}
    ```      



#### Promote to a shared channel {#rel-promote}

Add a job that uses the `release promote` command to promote the release to a channel, such as the default Unstable, Beta, or Stable channel. For more information, see [release promote](/reference/replicated-cli-release-promote).

Consider the following requirements and recommendations:

* Replicated recommends that you include the `--version` flag with the `release promote` command to explicitly declare the version label for the release. Use the same version label that was used when the release was created as part of [Create a release and promote to a temporary channel](#rel-release) above. Although the `--version` flag is not required, declaring the same release version label during promotion provides additional consistency that makes the releases easier to track. 

* The channel to which the release is promoted depends on the event triggers that you defined for the workflow. For example, if the workflow runs on every commit to the `main` branch, then promote the release to an internal-only channel, such as Unstable. For more information, see [Define Workflow Triggers](#rel-triggers) above.

* Use the `--release-notes` flag to include detailed release notes in markdown.

### Archive the temporary channel and customer {#rel-cleanup}

Finally, add a job to archive the temporary channel and customer that you created. This ensures that these artifacts are removed from your Replicated team and that they do not have to be manually archived after the release is promoted.

For more information, see [channel delete](/reference/replicated-cli-channel-delete) and [customer/{customer_id}/archive](https://replicated-vendor-api.readme.io/reference/archivecustomer) in the Vendor API v3 documentation.

## Additional Examples

The [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) repository in GitHub contains example GitHub Actions workflows that you can use as a template for your own CI/CD pipelines:

* For a simplified development workflow that uses the `cluster prepare` command to avoid the need to create a release, channel, or customer for testing, see [development-helm-prepare-cluster.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm-prepare-cluster.yaml).

* For a customizable development workflow for applications installed with the Helm CLI, see [development-helm.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm.yaml).

* For a customizable development workflow for applications installed with KOTS installations, see [development-kots.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-kots.yaml).

* For a release workflow, see [release.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/release.yaml).