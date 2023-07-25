# Using the Compatibility Matrix

This topic describes how to use the compatibility matrix to create an ephemeral cluster infrastructure that vendors can use for manual and CI/CD pipeline testing.

The Replicated compatibility matrix functionality is provided using the replicated CLI.

## Prerequisites

Before you can use the compatibility matrix, you must complete the following prerequisites:

- Get an entitlement for compatibility testing.
- Create your test scripts.
- Review the limitations. See [Limitations](testing-about#limitations) in _About the Compatibility Matrix_.
- Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).

## Manual Testing

It can be useful to test manually when you need customer-representative clusters for a short period of time, such as when debugging a support issue or when you want to use testing as part of an inner development loop.

- Use the `replicated cluster` commands locally to create and get admin access to a test cluster. For more information about the `replicated cluster` commands, see the [replicated CLI](replicated-cli-customer-create) reference.

- Specify the values based on your needs and the type of cluster you are creating. For more information, see [Supported Clusters](testing-supported-clusters).

## CI/CD Testing

In general, software vendors should test for compatibility before releasing an application. Replicated recommends  including compatibility testing within CI/CD pipelines so that it is automated. As a vendor, you can update your existing CI/CD workflows to include the replicated CLI commands to create the test cluster infrastructure where you can run your unique compatibility tests. Additionally, Replicated offers example workflows in GitHub Actions that you can reference.

To use the compatibility matrix with CI/CD, add the `replicated cluster` commands directly to your CI/CD pipeline. For more information about the `replicated cluster` commands, see the [replicated CLI](replicated-cli-customer-create) reference.

**Examples:**

- To create a k3s test cluster:

    ```bash
    replicated cluster create --name k3s-example --distribution k3s --version 1.24 --disk 100 --instance-type repl.small
    ```
    Specify the values based on your needs and the type of cluster you are creating. For more information, see [Supported Clusters](testing-supported-clusters).

- To get the cluster ID:

    ```bash
    replicated cluster ls
    ```

- To get full admin access to the test cluster:

    ```bash
    replicated cluster kubeconfig --id ID
    ```

    Replace `ID` with the ID of the cluster from the output of the `replicated cluster ls` command.

## Handling Semantic Versioning

Helm charts use semantic versioning (semver) for release. Until you are ready to push a release, you might not want to create a new semver for every commit or PR. To help avoid the consumption of semvers during test commits and PRs, Replicated actions use a pattern to push a tag in your CI to represent the new semver.

The Replicated pattern finds the closest semver to the branch the commit is on, or that the PR is targetting, by querying the GitHub releases and tags. Replicated takes that version and appends `-<sha>` to the version and uses that internally.

If you do not want to use this behavior, make sure that your branch is semver compliant. Replicated treats the branch as a semver release if it parses as a semver.

