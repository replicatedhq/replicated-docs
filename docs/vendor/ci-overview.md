import TestRecs from "../partials/ci-cd/_test-recs.mdx"

# About Integrating with CI/CD

This topic provides an introduction to integrating replicated CLI commands in your continuous integration and continuous delivery (CI/CD) pipelines, including Replicated's best practices and recommendations.

## Overview

Using CI/CD workflows to automatically compile code and run tests improves the speed at which teams can test, iterate on, and deliver releases to customers. When you integrate replicated CLI commands into your CI/CD workflows, you can automate the process of deploying your application to clusters for testing, rather than needing to manually create and then archive channels, customers, and environments for testing.

You can also include continuous delivery workflows to automatically promote a release to a shared channel in your Replicated team. This allows you to more easily share releases with team members for internal testing and iteration, and then to promote releases when they are ready to be shared with customers.

## Best Practices and Recommendations

The following are Replicated's best practices and recommendations for CI/CD:

* Include unique workflows for development and for releasing your application. This allows you to run tests on every commit, and then to promote releases to internal and customer-facing channels only when ready. For more information about the workflows that Replicated recommends, see [Recommended CI/CD Workflows](ci-workflows).

* Integrate the Replicated compatibility matrix into your CI/CD workflows to quickly create multiple different types of clusters where you can deploy and test your application. Supported distributions include OpenShift, GKE, EKS, and more. For more information, see [About the Compatibility Matrix](testing-about).

* To help show you are conforming to a secure supply chain, sign all commits and container images. Additionally, provide a verification mechanism for container images.

* Incorporating code tests into your CI/CD workflows is important for ensuring that developers receive quick feedback and can make updates in small iterations. Replicated recommends that you create and run all of the following test types as part of your CI/CD workflows:
    <TestRecs/>

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