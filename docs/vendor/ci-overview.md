# About Integrating with CI/CD

This topic provides recommendations and considerations for integrating replicated CLI commands as part of your existing continuous integration and continuous delivery (CI/CD) pipelines.

## Overview

Using automated CI/CD workflows to compile code and run tests improves the speed at which teams can test, iterate on, and deliver releases to customers. When you integrate replicated CLI commands into your CI/CD workflows, you can automate the process of deploying your application to clusters for testing, rather than needing to manually create and archive channels, customers, and development environments to test your releases.

In addition to integrating replicated CLI commands into workflows that support the development process, you can also create continuous delivery workflows to automatically promote a release to a shared channel in your Replicated team. This allows you to more easily share releases with team members for internal testing and iteration, and to promote releases when they are ready to be shared with customers.

For more information about the CI/CD workflows that Replicated recommends for developing against and releasing your application, see [Recommended CI/CD Workflows](ci-workflows).

## Using the Compatibility Matrix in CI/CD

The Replicated compatibility matrix quickly provisions ephemeral clusters where you can deploy your application to run tests and troubleshoot issues. Integrating the compatibility matrix into your development and release CI/CD workflows allows you to automate the process of provisioning clusters for testing.

You can also use the compatibility matrix with the matrix functionality provided by your CI/CD platform to create and deploy your application to multiple clusters of different Kubernetes distributions and versions. 

For more information about the compatibility matrix, see [About the Compatibility Matrix](testing-about).

## GitHub Actions

Replicated maintains custom actions and example workflows that that are compatible with the GitHub Action CI/CD platform. Users of GitHub Actions can use these actions and example workflows to help create their own CI/CD workflows.

### Replicated Custom Actions

Replicated maintains a set of custom actions that are designed to replace repetitive tasks such as creating and removing customers, channels, clusters, and more. If you use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using replicated CLI commands. 

For more information, see the [replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.

### Example GitHub Action Workflows

The [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions#examples) repository in GitHub contains example GitHub Actions workflows that you can use as a template for your own CI/CD pipelines:
* For a simplified development workflow that uses the `cluster prepare` command to avoid the need to create a release, channel, or customer for testing, see [development-helm-prepare-cluster.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm-prepare-cluster.yaml)..
* For a customizable development workflow for applications installed with the Helm CLI, see [development-helm.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-helm.yaml).
* For a customizable development workflow for applications installed with KOTS installations, see [development-kots.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/development-kots.yaml)
* For a release workflow, see [release.yaml](https://github.com/replicatedhq/replicated-actions/blob/main/example-workflows/release.yaml).