# CI Workflows

This topic provides recommendations and considerations for integrating replicated CLI commands into your continuous integration (CI) workflows.

## Overview

Using automated CI workflows to compile your code and run tests frequently throughout the development process helps to ensure . When you integrate replicated CLI commands to create customers, channels, releases, and clusters, 

Additionally, Replicated offers example workflows in Replicated Actions that you can reference. For more information, see [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) in GitHub.

## Recommended Workflows 

This section includes recommended CI/CD workflow steps to automate on every commit and when . The implementation details for these workflows varies depending on your CI platform.

### Workflow for Every Commit

This workflow is intended to run on every commit to a branch. It creates a channel, customer, and cluster for running automated tests, then cleans up the artifacts after tests are complete.

1. Build application source code.
1. Create a channel and customer for that branch.
1. Deploy to a test cluster.

   Recommended to use the c11y matrix (recommended to create a kind cluster since it’s lighter weight, and this is going to run on every commit):

   ```bash
   replicated cluster create --name kind-example --distribution kind --version 1.25.2 --disk 100 --instance-type r1.small
   ```

   See https://github.com/replicatedhq/replicated-actions/tree/main/create-cluster

1. Run tests against that cluster.
1. Tear down the cluster.
1. Archive the channel and customer.


### Workflow for Creating Unstable Releases

For every commit that passes your code quality checks, Replicated recommends that you promote a release to your unstable (development) channel.

Replicated recommends that you run a workflow to creates a new release on the Unstable channel every time you merge a branch or commit to `main`.

1. Build application source code.
1. Create a channel and customer for the branch.
1. Create a matrix of clusters to create based on your common customer environments. You can go to the Customers page to see the common k8s distributions and versions

   **Example:**

   ```yaml
   # github actions example

   compatibility-matrix:
   runs-on: ubuntu-22.04
   strategy:
      fail-fast: false
      matrix:
        cluster: [ {distribution: k3s, version: "1.26"}, {distribution: k3s, version: "1.25"}, {distribution: eks, version: "1.27"}]
   ```

1. Create a release named for the commit: `Unstable-${SHA}`.
