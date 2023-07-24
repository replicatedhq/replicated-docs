# GitHub Actions for Reliability Matrix

There are published Reliability Matrix GitHub Actions to use in your own workflow.

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

