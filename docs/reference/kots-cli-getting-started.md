# Installing the kots CLI

The Replicated app manager uses the kots CLI, which is a `kubectl`-based plugin, to help manage Kubernetes Off-The-Shelf software. This plugin runs locally on any computer that has `kubectl` installed.


## Prerequisite

Before you install the kots CLI, install [kubectl](https://kubernetes.io/docs/tasks/tools/) on your machine.

:::note
If you are using an [embedded Kubernetes installer-created cluster](../enterprise/installing-embedded-cluster), both tools are already pre-installed.
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

## Install the kots CLI Without Root Access

For computers without root access or computers that cannot write to the `/usr/local/bin` directory, the `kots` CLI can be downloaded using the following steps:

1. Download the release for your operating system from https://github.com/replicatedhq/kots/releases/latest (Linux and MacOS are supported).
1. Unpack the release.
1. Rename the `kots` executable to `kubectl-kots`.
1. Copy the renamed `kubectl-kots` to anywhere on the `PATH`.
