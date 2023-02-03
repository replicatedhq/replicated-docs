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

To install the kots CLI without root access, you can do any of the following:

* (Online Only) [Install to a Different Directory](#install-to-a-different-directory)
* (Online Only) [Install Using Sudo](#install-using-sudo)
* (Online or Air Gap) [Manually Download and Install](#manually-download-and-install)

### Install to a Different Directory

You can set the `REPL_INSTALL_PATH` environment variable to install the kots CLI to a directory other than `/usr/local/bin` that does not require elevated permissions.

**Example:**

In the following example, the installation script installs the kots CLI to `~/bin` in the local directory. You can use the user home symbol `~` in the `REPL_INSTALL_PATH` environment variable. The script expands `~` to `$HOME`.

```bash
curl -L https://kots.io/install | REPL_INSTALL_PATH=~/bin bash
```

### Install Using Sudo

If you have sudo access to the directory where you want to install the kots CLI, you can set the `REPL_USE_SUDO` environment variable so that the installation script prompts you for your sudo password.

When you set the `REPL_USE_SUDO` environment variable to any value, the installation script uses sudo to create and write to the installation directory as needed. The script prompts for a sudo password if it is required for the user executing the script in the specified directory.

**Example:**

In the following example, the script uses sudo to install the kots CLI to the default `/usr/local/bin` directory.

```bash
curl -L https://kots.io/install | REPL_USE_SUDO=y bash
```

**Example:**

In the following example, the script uses sudo to install the kots CLI to the `/replicated/bin` directory.

```bash
curl -L https://kots.io/install | REPL_INSTALL_PATH=/replicated/bin REPL_USE_SUDO=y bash
```

### Manually Download and Install

You can manually download and install the kots CLI binary to install without root access, rather than using the installation script.

Users in air gap environments can also follow this procedure to install the kots CLI.

To manually download and install the `kots` CLI:

1. Download the kots CLI release for your operating system from the [Releases](https://github.com/replicatedhq/kots/releases/latest) page in the KOTS GitHub repository:

   * **MacOS (AMD and ARM)**:

      ```bash
      curl -L https://github.com/replicatedhq/kots/releases/latest/download/kots_darwin_all.tar.gz
      ```

   * **Linux (AMD)**:

      ```bash
      curl -L https://github.com/replicatedhq/kots/releases/latest/download/kots_linux_amd64.tar.gz
      ```

   * **Linux (ARM)**:

      ```bash
      curl -L https://github.com/replicatedhq/kots/releases/latest/download/kots_linux_arm64.tar.gz
      ```

 :::note
 For air gap environments, download the kots CLI release from the download portal provided by your vendor.
 :::

1. Unarchive the `.tar.gz` file that you downloaded:

   * **MacOS (AMD and ARM)**:

      ```bash
      tar xvf kots_darwin_all.tar.gz
      ```
   * **Linux (AMD)**:

      ```bash
      tar xvf kots_linux_amd64.tar.gz
      ```
   * **Linux (ARM)**:

      ```bash
      tar xvf kots_linux_arm64.tar.gz
      ```

1. Rename the `kots` executable to `kubectl-kots` and move it to one of the directories that is in your PATH environment variable. This ensures that the system can access the executable when you run kots CLI commands.

   :::note
   You can run `echo $PATH` to view the list of directories in your PATH.
   :::

   Run one of the following commands, depending on if you have write access to the target directory:

   * **You have write access to the directory**:

     ```bash
     mv kots /PATH_TO_TARGET_DIRECTORY/kubectl-kots
     ```
     Replace `PATH_TO_TARGET_DIRECTORY` with the path to a directory that is in your PATH environment variable. For example, `/usr/local/bin`.

   * **You do _not_ have write access to the directory**: 

     ```bash
     sudo mv kots /PATH_TO_TARGET_DIRECTORY/kubectl-kots
     ```
     Replace `PATH_TO_TARGET_DIRECTORY` with the path to a directory that is in your PATH environment variable. For example, `/usr/local/bin`.

1. Verify the installation:

   ```
   kubectl kots --help
   ```

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
