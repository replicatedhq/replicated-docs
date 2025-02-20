import TestRecs from "../partials/ci-cd/_test-recs.mdx"

# About Integrating with CI/CD

This topic provides an introduction to integrating Replicated CLI commands in your continuous integration and continuous delivery (CI/CD) pipelines, including Replicated's best practices and recommendations.

## Overview

Using CI/CD workflows to automatically compile code and run tests improves the speed at which teams can test, iterate on, and deliver releases to customers. When you integrate Replicated CLI commands into your CI/CD workflows, you can automate the process of deploying your application to clusters for testing, rather than needing to manually create and then archive channels, customers, and environments for testing.

You can also include continuous delivery workflows to automatically promote a release to a shared channel in your Replicated team. This allows you to more easily share releases with team members for internal testing and iteration, and then to promote releases when they are ready to be shared with customers.

## Best Practices and Recommendations

The following are Replicated's best practices and recommendations for CI/CD:

* Include unique workflows for development and for releasing your application. This allows you to run tests on every commit, and then to promote releases to internal and customer-facing channels only when ready. For more information about the workflows that Replicated recommends, see [Recommended CI/CD Workflows](ci-workflows).

* Integrate Replicated Compatibility Matrix into your CI/CD workflows to quickly create multiple different types of clusters where you can deploy and test your application. Supported distributions include OpenShift, GKE, EKS, and more. For more information, see [About Compatibility Matrix](testing-about).

* If you use the GitHub Actions CI/CD platform, integrate the custom GitHub actions that Replicated maintains to replace repetitive tasks related to distributing application with Replicated or using Compatibility Matrix. For more information, see [Integrating Replicated GitHub Actions](/vendor/ci-workflows-github-actions).

* To help show you are conforming to a secure supply chain, sign all commits and container images. Additionally, provide a verification mechanism for container images.

* Use custom RBAC policies to control the actions that can be performed in your CI/CD workflows. For example, you can create a policy that blocks the ability to promote releases to your production channel. For more information about creating custom RBAC policies in the Vendor Portal, see [Configuring RBAC Policies](/vendor/team-management-rbac-configuring). For a full list of available RBAC resources, see [RBAC Resource Names](/vendor/team-management-rbac-resource-names).

* Incorporating code tests into your CI/CD workflows is important for ensuring that developers receive quick feedback and can make updates in small iterations. Replicated recommends that you create and run all of the following test types as part of your CI/CD workflows:
    <TestRecs/>