# Installing the kots CLI

The Replicated app manager uses the kots CLI, which is a `kubectl`-based plugin, to help manage Kubernetes Off-The-Shelf software. This plugin runs locally on any computer that has `kubectl` installed.


## Prerequisite

Before you install the kots CLI, install [kubectl](https://kubernetes.io/docs/tasks/tools/) on your machine.

:::note
If you are using an [embedded Kubernetes installer-created cluster](../enterprise/installing-embedded-cluster), both tools are already pre-installed.
:::

## Install

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

## Install without Root Access

You can install the kots CLI on computers without root access or computers that cannot write to the `/usr/local/bin` directory. This procedure applies to online clusters and air gapped environments.

To download the `kots` CLI without root access:

1. Download the release for your operating system from https://github.com/replicatedhq/kots/releases/latest. Air gap customers can also download this file from the download portal provided by your vendor.

  Linux and MacOS are supported.

  **Example:**

  ```bash
  curl -L https://github.com/replicatedhq/kots/releases/download/v1.89.0/kots_linux_amd64.tar.gz
  ```
1. Unarchive the binary by running the following command:

  ```bash
  tar xvf kots_linux_amd64.tar.gz
  ```

1. Rename the `kots` executable to `kubectl-kots` and move the plugin to your path by running the following command:

  ```bash
  mv kots /PATH/kubectl-kots
  ```

  Replace PATH with the path to the directory where your system can access the binary.

## Uninstall

The kots CLI is a plugin for the Kubernetes kubectl command line tool. The kots CLI plugin is named `kubectl-kots`.

For more information about working with kubectl, see [Command line tool (kubectl)](https://kubernetes.io/docs/reference/kubectl/) in the Kubernetes documentation.

To uninstall the kots CLI:

1. Find the location where the `kubectl-kots` plugin is installed on your `PATH`:

   ```
   kubectl plugin list kubectl-kots cli
   ```

2. Delete `kubectl-kots`:

   ```
   sudo rm PATH_TO_KOTS
   ```
   Replace `PATH_TO_KOTS` with the location where `kubectl-kots` is installed.

   **Example**:

   ```
   sudo rm /usr/local/bin/kubectl-kots
   ```
