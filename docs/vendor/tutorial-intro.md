import EnvironmentSetup from "../partials/getting-started/_environment-setup.mdx"

# Introduction and Setup

Welcome to the Replicated Getting Started Tutorials!

## About the Tutorials

The UI and CLI tutorials in this section are designed to introduce you to the Replicated features for software vendors and their enterprise users.

In both tutorials, you use a set of sample application manifest files to learn how to:
* Create and promote releases for an application as a software vendor
* Install and update an application as an enterprise user

Replicated recommends that you begin with the UI tutorial, which shows you how to use the Replicated vendor portal to create and promote releases. See [UI Tutorial](tutorial-ui-create-app).

After you complete the UI tutorial, follow the steps in the CLI tutorial to learn how to create and promote releases using the replicated CLI. See [CLI tutorial](tutorial-cli-install-cli).

:::note
Both tutorials assume that you have a working knowledge of Kubernetes. For an introduction to Kubernetes and free training resources, see [Training](https://kubernetes.io/training/) in the Kubernetes documentation.
:::

## Prerequisite: Set Up the Environment

<EnvironmentSetup/>

## Additional Labs

Replicated also offers a sandbox environment where you can complete several beginner, intermediate, and advanced labs. The sandbox environment automatically provisions the required Kubernetes cluster or VM.

To get started with an introductory Hello World lab, see [Deploy a Hello World Application with Replicated](https://play.instruqt.com/replicated/tracks/hello-world).

## Related Topics

For more information about the subjects in these tutorials, see the following topics:

* [Installing the replicated CLI](/reference/replicated-cli-installing)
* [Using Vendor API Tokens](/reference/replicated-cli-tokens)
* [KOTS Lint Rules](/reference/kots-lint)
* [Installing on an Existing Cluster](/enterprise/installing-existing-cluster)
* [Installing on a Kubernetes Installer Cluster](/enterprise/installing-embedded-cluster)
* [Updating an Application](/enterprise/updating-apps)
