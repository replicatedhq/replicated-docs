# Using the Reliability Matrix in CI/CD

The Reliability Matrix works great in a CI/CD pipeline. This document describes the concepts and fundamental building blocks Replicated provides to integrate reliability testing into your pipeline. We also have a [specific document for GitHub Actions](./reliability-testing-github-actions).

Designing a comprehensive testing strategy for your application is essential to ensure quality and reliability before it is released to customers. Given the variety of customer environments and configurations, it's important to establish a progressively-more-complete test scenario that delivers quick feedback on every change while also incorporating more thorough and representative scenarios before releasing. Here is a suggested multi-stage testing strategy:

## Test Types and Scripts

You design and write your own test scripts to use with the compatibility matrix. This section describes some of the options and common use cases to help guide you.

### Application Testing

Traditional application testing includes unit, integration, and end-to-end tests. These tests are critical for application reliability, and the compatibility matrix is designed to to incorporate and use your application testing.

### Performance Testing

Performance testing is used to benchmark your application to ensure it can handle the expected load and scale gracefully. Test your application under a range of workloads and scenarios to identify any bottlenecks or performance issues. Make sure to optimize your application for different Kubernetes distributions and configurations by creating all of the environments you need to test in.

### Smoke Testing

Using a single, conformant Kubernetes distribution to test basic functionality of your application with default (or standard) configuration values is a quick way to get feedback if something is likely to be broken for all or most customers. The compatibility matrix expands basic smoke testing by adding process violation testing to smoke tests for quick feedback. For more information, see [Process Violation Testing](testing-process-violation).

### Compatibility Testing

Because applications run on various Kubernetes distributions and configurations, it is important to test compatibility across different environments. The compatibility matrix provides this infrastructure.

### Canary Testing
Before releasing to all customers, consider deploying your application to a small subset of your customer base as a _canary_ release. This lets you monitor the application's performance and stability in real-world environments, while minimizing the impact of potential issues. The compatibility matrix enables canary testing by simulating exact (or near) customer environments and configurations to test your application with.


## CI/CD Workflow for a Helm Chart Release

<!--
Replicated recommends using a CI/CD workflow similar to the following:

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

-->

This example describes how to use the compatibility matrix in a CI/CD workflow using Helm charts.

1. Set up CI to push to Replicated:
    1. Create a GitHub repository and add your unpackaged Helm chart files to the repository. If your release is not opinionated, the Chart.yaml file is at the root of the release.
    1. Promote a release from the `main` branch to the **Unstable** channel:

        ```bash
        replicated release create  --yaml-dir=manifests --promote Unstable
        ```
    1. You can use any of the following options:
    
        - Use existing CI
        - Create a Git repository and use GitHub Actions
        - For simple testing, you can run a step that executes a shell command that you have tested locally

1. Set up the GitHub Action for a smoke test in your CI to enable the compatibility matrix on the **Unstable** channel:
    1. Push a change and validate the smoke test.
    1. Enable in admin by setting compatibility Max Clusters to `1`.
    1. Create a tests/test.sh script as the smoke test validation. Scripts ran in this context have access to `kubectl`
    1. Example of a smoke test???



1. Set up the Github Action for customer-representative testing in your CI to enable the compatibility matrix on the **Unstable** channel:
    1. The following example workflow shows how you can add an action that will invoke the list cluster usage endpoint and inject it dynamically in the GitHub workflow matrix:

    ```
    name: development

    on:
    push:
        branches:
        - '*'         # matches every branch that doesn't contain a '/'
        - '*/*'       # matches every branch containing a single '/'
        - '**'        # matches every branch
        - '!main'     # excludes main

    jobs:
    get-customer-instances:
        outputs:
        matrix: ${{ steps.get-customer-instances.outputs.matrix}}
        runs-on: ubuntu-22.04
        steps:
        - uses: actions/checkout@v3

        - name: Get Customer Instances
            id: get-customer-instances
            uses: replicatedhq/compatibility-actions/get-customer-instances@v0
            with:
            app-slug: ${{ secrets.REPLICATED_APP }}
            api-token: ${{ secrets.REPLICATED_API_TOKEN }}

    compatibility-matrix:
        needs: get-customer-instances
        if: ${{ !contains(needs.get-customer-instances.outputs.matrix, '[]') }}
        strategy:
        fail-fast: false
        matrix:
            cluster: ${{ fromJson(needs.get-customer-instances.outputs.matrix) }}
        runs-on: ubuntu-22.04
        steps:
        - uses: actions/checkout@v3

        - name: Define App Version
            shell: bash
            run: echo "APP_VERSION=0.0.1-${GITHUB_REF_NAME//[^a-zA-Z0-9]/}.${GITHUB_RUN_ID}${GITHUB_RUN_ATTEMPT}" >> $GITHUB_ENV

        - name: Package Helm Chart for Replicated
            id: package-helm-chart
            run: |
            helm package relmatrix-app -u -d kots \
                --app-version=0.0.1-${{ github.ref_name }} \
                --version=${{ env.APP_VERSION }}

        - name: Update the HelmChart kind
            uses: jacobtomlinson/gha-find-replace@v3
            with:
            include: 'kots/relmatrix-app-chart.yaml'
            find: '$VERSION'
            replace: ${{ env.APP_VERSION }}
            regex: false

        - name: Smoke Test
            id: smoke-test
            uses: replicatedhq/compatibility-actions/smoke-test@v0
            with:
            app-slug: ${{ secrets.REPLICATED_APP }}
            api-token: ${{ secrets.REPLICATED_API_TOKEN }}
            yaml-dir: kots
            kubernetes-distribution: ${{ matrix.cluster.distribution }}
            kubernetes-version: ${{ matrix.cluster.version }}
            installation-method: helm
            test-script: ./tests/test.sh
            helm-chart-name: relmatrix-app
            helm-values: |
                image:
                tag: latest
    ```

1. Get your customer-representative environment information and input them to the compatibility matrix. 

    1. To get the customer environment information, you can use the [listClusterUsage endpoint](https://replicated-vendor-api.readme.io/reference/listclusterusage) in the Vendor API.
    1. Test the endpoint in the API docs browser by providing an APP ID and an API token.

## How to handle semver
Helm charts use semver for release. You probably don't want to create a new semver for every commit/PR. So how can you handle this?

The replicated actions can help here.

A common pattern that we build on and work with is pushing a tag in your CI to represent the new semver.

But what about each PR? We don't want to "consume" semvers that you want to use later.

So we have a pattern to find the closest semver to the branch the commit is on (or the PR is targetting) by querying the github releases & tags. We will then take that version and add a `-<sha>` to the end and use that internally.

If you want to change this behavior, your branch should be semver compliant. We will honor the branch as the semver release if it parses as a semvber.

