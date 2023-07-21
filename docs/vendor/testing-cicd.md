# Using the Reliability Matrix in CI

The Reliability Matrix works great in a CI/CD pipeline. This document describes  the concepts and fundamental building blocks Replicated provides to integrate reliability testing into your pipeline. We also have a [specific document for GitHub Actions](./reliability-testing-github-actions).

Designing a comprehensive testing strategy for your application is essential to ensure quality and reliability before it is released to customers. Given the variety of customer environments and configurations, it's important to establish a progressively-more-complete test scenario that delivers quick feedback on every change while also incorporating more thorough and representative scenarios before releasing. Here is a suggested multi-stage testing strategy:

### Application Testing

Out of the scope of this document is traditional testing that all applications should include. This includes unit, integration, and end-to-end tests. This are critical for application reliability, and the Replicated Reliability Matrix is designed to incorporate and use your application testing.

### Performance Testing

Benchmark your application to ensure it can handle the expected load and scale gracefully. Test your application under a range of workloads and scenarios to identify any bottlenecks or performance issues. Make sure to optimize your application for different Kubernetes distributions and configurations.

### Smoke Testing

Using a single, conformant Kubernetes distribution to test basic functionality of your application with default (or standard) configuration values is a quick way to get feedback if something is going to be broken for all/most customers. The Reliability Matrix expands basic smoke testing by adding [Process Violation Testing](./reliability-testing-process-violation) into smoke tests for quick feedback.

### Compatibility Testing

Since your application runs on various Kubernetes distributions and configurations, it's important to test compatibility across different environments. The Reliability Matrix delivers this infrastructure.

### Canary Testing
Before releasing to all customers, consider deploying your application to a small subset of your customer base as a "canary" release. This allows you to monitor the application's performance and stability in real-world environments, while minimizing the impact of potential issues. The Reliability Matrix enables canary testing by simulating exact (or near) customer environments and configuration to test your application wiht,


We recommend a workflow like this:

1. Build your container images and push them
1. Update your helm chart
1. Use the Replicated CLI to create a new channel & release
1. Validate your application on the new channel
1. Promote the release to the unstable channel

To do this, here's an example (truncated for clarity) GitHub workflow:

On pull request:
    build and push your images
    build a chart
    create a channel
    create a customer
    testing it using reliability matrix
    send the reliability matrix results back to replicated

## How to handle semver
Helm charts use semver for release. You probably don't want to create a new semver for every commit/PR. So how can you handle this?

The replicated actions can help here.

A common pattern that we build on and work with is pushing a tag in your CI to represent the new semver.

But what about each PR? We don't want to "consume" semvers that you want to use later.

So we have a pattern to find the closest semver to the branch the commit is on (or the PR is targetting) by querying the github releases & tags. We will then take that version and add a `-<sha>` to the end and use that internally.

If you want to change this behavior, your branch should be semver compliant. We will honor the branch as the semver release if it parses as a semvber.


# smoke tests
smoke tests run a single config, single set of entitlements on a single distribtion with pilocy violation detection

# release tests
release tests tests 1 environment per customer. we use customer-representative envs.