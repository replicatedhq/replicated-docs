# About Integrating with CI/CD

This topic provides recommendations and considerations for integrating replicated CLI commands into your continuous integration and continuous delivery (CI/CD) pipeline.

## Overview

Using automated CI/CD workflows to compile code and run tests improves the speed at which teams can test, iterate on, and deliver releases to customers. When you integrate replicated CLI commands into your CI/CD pipeline, you can automate the process of deploying your application to clusters for testing, rather than needing to manually create and archive channels, customers, and development environments to test your releases.

In addition to integrating replicated CLI commands into CI/CD workflows that support the development process, you can also create continuous delivery workflows to automatically promote a release to a shared channel in your Replicated team. This allows you to more easily share releases with team members for internal testing and iteration, and to promote releases when they are ready to be shared with customers.

For more information about the CI/CD workflows that Replicated recommends for development and releasing, see [Recommended Workflows](ci-workflows).

## Compatibility Matrix

The Replicated compatibility matrix quickly provisions ephemeral clusters representing your customer environments, so that you can test your application and troubleshoot issues. Integrating the compatibility matrix into your development and release workflows for CI/CD allows you to automate the process of provisioning clusters for testing.

For more information about the compatibility matrix, see [About the Compatibility Matrix](testing-about).

## Test Recommendations

Incorporating code tests into your CI/CD workflows is important for ensuring that developers receive quick feedback and can make updates in small iterations.

Replicated recommends that you create and run all of the following test types as part of your CI/CD workflows:

- **Application Testing:** Traditional application testing includes unit, integration, and end-to-end tests. These tests are critical for application reliability, and the compatibility matrix is designed to to incorporate and use your application testing.

- **Performance Testing:** Performance testing is used to benchmark your application to ensure it can handle the expected load and scale gracefully. Test your application under a range of workloads and scenarios to identify any bottlenecks or performance issues. Make sure to optimize your application for different Kubernetes distributions and configurations by creating all of the environments you need to test in.

- **Smoke Testing:** Using a single, conformant Kubernetes distribution to test basic functionality of your application with default (or standard) configuration values is a quick way to get feedback if something is likely to be broken for all or most customers.

- **Compatibility Testing:** Because applications run on various Kubernetes distributions and configurations, it is important to test compatibility across different environments. The compatibility matrix provides this infrastructure.

- **Canary Testing:** Before releasing to all customers, consider deploying your application to a small subset of your customer base as a _canary_ release. This lets you monitor the application's performance and stability in real-world environments, while minimizing the impact of potential issues. The compatibility matrix enables canary testing by simulating exact (or near) customer environments and configurations to test your application with.

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