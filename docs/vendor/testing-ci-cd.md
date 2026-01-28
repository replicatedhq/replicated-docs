import TestRecs from "../partials/ci-cd/_test-recs.mdx"

# Test in CMX Environments with CI/CD

This topic describes how to integrate Replicated Compatibility Matrix (CMX) into your CI/CD workflows.

## About Using CMX with CI/CD

Replicated recommends that you integrate CMX into your existing CI/CD workflow to automate the process of creating clusters to install your application and run tests. For more information, including additional best practices and recommendations for CI/CD, see [About Integrating with CI/CD](/vendor/ci-overview).

### Replicated GitHub Actions

Replicated maintains a set of custom GitHub actions that are designed to replace repetitive tasks related to using CMX and distributing applications with Replicated.

If you use GitHub Actions as your CI/CD platform, you can include these custom actions in your workflows rather than using Replicated CLI commands. Integrating the Replicated GitHub actions into your CI/CD pipeline helps you quickly build workflows with the required inputs and outputs, without needing to manually create the required CLI commands for each step.

To view all the available GitHub actions that Replicated maintains, see the [replicatedhq/replicated-actions](https://github.com/replicatedhq/replicated-actions/) repository in GitHub.

For more information, see [Use Replicated GitHub Actions in CI/CD](/vendor/ci-workflows-github-actions).

### Recommended Workflows

Replicated recommends that you maintain unique CI/CD workflows for development (continuous integration) and for releasing your software (continuous delivery). For example development and release workflows that integrate CMX for testing, see [Recommended CI/CD Workflows](/vendor/ci-workflows).

### Test Script Recommendations

Incorporating code tests into your CI/CD workflows is important for ensuring that developers receive quick feedback and can make updates in small iterations. Replicated recommends that you create and run all of the following test types as part of your CI/CD workflows:

<TestRecs/> 