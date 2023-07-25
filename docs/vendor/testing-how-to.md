# Using the Compatibility Matrix

This topic describes how to use the compatibility matrix to create for ephemeral clusters that vendors can use for manual testing and CI/CD pipeline testing.

The full functionality of the Replicated compatibility matrix is provided using the replicated CLI.

## Prerequisites

Before you can use the compatibility matrix, you must complete the following prerequisites:

- Get an entitlement for compatibility testing.
- Create your test scripts.
- Review the limitations. See [Limitations](testing-about#limitations) in _About the Compatibility Matrix_.
- Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).

## Manual Testing

It can be useful to test manually when you need customer-representative clusters for a short period of time, such as when debugging a customer issue or when you want to use testing as part of an inner development loop.

Use the `replicated cluster` commands locally to create and get admin access to a test cluster. For more information about the `replicated cluster` commands, see the [replicated CLI](replicated-cli-customer-create) reference.


## CI/CD Testing

In general, software vendors should always test for compatibility before releasing an application. This compatibility testing should be included within CI/CD pipelines so that it is automated. Replicated vendors can update their existing CI/CD workflows to include the replicated CLI commands to spin up test clusters where they can run their compatibility tests. Additionally, Replicated offers example workflows in GitHub Actions that you can reference.

To use compatibility with CI, add the `replicated cluster` commands to your CI/CD pipeline. For more information about the `replicated cluster` commands, see the [replicated CLI](replicated-cli-customer-create) reference.

## Handling Semantic Versioning

Helm charts use semantic versioning (semver) for release. Until you are ready to push a release, you might not want to create a new semver for every commit or PR. To help avoid the consumption of semvers during test commits and PRs, Replicated actions use a pattern to push a tag in your CI to represent the new semver.

The Replicated pattern finds the closest semver to the branch the commit is on, or that the PR is targetting, by querying the GitHub releases and tags. Replicated takes that version and appends `-<sha>` to the version and uses that internally.

If you do not want to use this behavior, make sure that your branch is semver compliant. Replicated treats the branch as a semver release if it parses as a semver.

