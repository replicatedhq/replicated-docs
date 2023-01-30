# Installing the kots CLI

The Replicated app manager uses the kots CLI, which is a `kubectl`-based plugin, to help manage Kubernetes Off-The-Shelf software. This plugin runs locally on any computer that has `kubectl` installed.


## Prerequisite

Before you install the kots CLI, install [kubectl](https://kubernetes.io/docs/tasks/tools/) on your machine.

:::note
If you are using an [embedded Kubernetes installer-created cluster](../enterprise/installing-embedded-cluster), both tools are already pre-installed.
:::

## Install

To install the latest version of the kots CLI to `/usr/local/bin`, run:

```bash
curl https://kots.io/install | bash
```

To install to a directory other than `/usr/local/bin`, run:

```bash
curl https://kots.io/install | REPL_INSTALL_PATH=/path/to/cli bash
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

You can install the kots CLI on computers without root access or computers that cannot write to the `/usr/local/bin` directory.

### Using the Install Script

To install the kots CLI without root access in an online environment, you can change the installation path to a directory that doesn't require elevated permissions, or you can have the installation script prompt you for your sudo password if needed.

The `REPL_INSTALL_PATH` environment variable can be used to install to a different directory. The user home symbol `~` can be used and will be expanded to `$HOME`.

**Example:**
```bash
curl -L https://kots.io/install | REPL_INSTALL_PATH=~/bin bash
```

The `REPL_USE_SUDO` environment variable can be set to any value if the install can be done using sudo. The installation script will use sudo to create and write to the installation directory as needed. The script will prompt for the sudo password if it is required for the user executing the script.

**Example:**
```bash
curl -L https://kots.io/install | REPL_USE_SUDO=y bash
```

The two environment variables can be combined to use a different directory that also requires sudo.

**Example:**
```bash
curl -L https://kots.io/install | REPL_INSTALL_PATH=/replicated/bin REPL_USE_SUDO=y bash
```

### Manual Install

To download the `kots` CLI without root access:

1. Download the release for your operating system from https://github.com/replicatedhq/kots/releases/latest. Air gap customers can also download this file from the download portal provided by your vendor.

  Linux and MacOS are supported.

  **Example:**

  ```bash
  curl -L https://github.com/replicatedhq/kots/releases/latest/download/kots_linux_amd64.tar.gz
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
