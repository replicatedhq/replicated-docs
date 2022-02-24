# Getting Started with the kots CLI

The Replicated app manager uses a `kubectl` plugin to help manage Kubernetes Off-The-Shelf software. This plugin runs locally on any computer that has `kubectl` installed. The app manager does not run in a cluster, but it helps manage the preflight, install, support, and upgrade process of third party software in Kubernetes.

The app manager installs and configures the Replicated admin console that runs alongside the application. The admin console is installed in the cluster and provides a web-based UI to manage the lifecycle of an application, including upgrades to the application.


## Prerequisite

Before you install the kots CLI, install [kubectl](https://kubernetes.io/docs/tasks/tools/) on your machine.

:::note
If you are using an [embedded Kubernetes installer cluster](/kotsadm/installing/installing-embedded-cluster/), both tools are already be pre-installed.
:::

## Install the kots CLI

To install the latest version of the kots CLI, run:

```bash
curl https://kots.io/install | bash
```

To install a specific version of the kots CLI, run:

```bash
curl https://kots.io/install/<version> | bash
```

To verify your installation, run:

```bash
kubectl kots --help
```

## Install the kots CLI without Root Access

For computers without root access or comupters that cannot write to the `/usr/local/bin` directory, the `kots` plugin can be downloaded using the following steps:

1. Download the release for your pperating system from https://github.com/replicatedhq/kots/releases/latest (Linux and MacOS are supported).
1. Unpack the release.
1. Rename the `kots` executable to `kubectl-kots`.
1. Copy the renamed `kubectl-kots` to anywhere on the `PATH`.
