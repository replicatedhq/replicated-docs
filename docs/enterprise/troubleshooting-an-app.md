# Generating Support Bundles

The Replicated admin console includes a Troubleshoot page where you can generate an analysis and review remediation suggestions for troubleshooting an application. You can download a support bundle to share with your vendor.

Alternatively, you can generate a support bundle using the CLI, which can be helpful when the admin console is not available or when you want to debug a host.

## Generate a Bundle using the Admin Console

1. From the admin console, select the Troubleshoot tab.

  ![Troubleshoot](/images/troubleshoot.png)

1. Click **Analyze** to start analyzing the application.

  The analysis executes the support bundle plugin. After the analysis completes, the bundle is available on the Troubleshoot tab in the admin console. If any known issues are detected, they are highlighted with possible remediation suggestions.

  :::note
  No data leaves the cluster. Data is never sent across the internet or to anyone else.
  :::

  ![Analysis](/images/analysis.png)

1. (Optional) Click **Download bundle** to download the support bundle. You can send the bundle to your vendor for assistance.

## Generating a Bundle using the CLI

You can generate a support bundle using the command line (CLI) instead of the admin console. For example, the admin console might not be available if you are using a Kubernetes installer (embedded installer) and the installation fails. Or perhaps you need to use a more recent version of the support-bundle plugin than what is embedded in the admin console.

### Prerequisite: Install the Plugin {#plugin}

Install or update the support-bundle plugin (a kubectl plugin) before you generate a support bundle using the CLI. The plugin is required to generate a support bundle.

:::note
If your application was installed using a Kubernetes installer script, then `kubectl` and the `support-bundle` plugin should already be present on all of the control plane nodes.
:::

You can install the support-bundle plugin using krew or install it manually from the release archives.

#### Install using krew

To install the support-bundle plugin using krew, do one of the following actions:

- If krew is _not_ installed, run the following command:

    ```
    curl https://krew.sh/support-bundle | bash
    ```

- If krew is installed, run the following command:

    ```
    kubectl krew install support-bundle
    ```
#### Install Manually

If you do not want to install the plugin using krew or want an easier way to install the plugin in an air gapped environment, you can install the plugin manually from the release archives.

To install the support-bundle plugin manually:

1. Run the following command to download and unarchive the latest release and move the plugin into your $PATH:

  ```
  curl -L https://github.com/replicatedhq/troubleshoot/releases/latest/download/support-bundle_linux_amd64.tar.gz | tar xzvf -
  sudo mv ./support-bundle /usr/local/bin/kubectl-support-bundle
  ```
  :::note
  If you do not have root access, or choose not to add the support-bundle plugin to your path, you can run the binary directly from where you unzipped it by executing `./support-bundle`.  If you choose not to put the plugin into your $PATH, then replace all instances of `kubectl support-bundle` in these instructions with `./support-bundle` or with the absolute path to the binary.
  :::

1. Run the following command to install the plugin:

  ```
  kubectl support-bundle
  ```

### Generate a Bundle on a Running Cluster

If the admin console is running and the application is installed, run the following command to generate a support bundle that includes customizations provided by the software vendor:

  ```
  kubectl support-bundle secrets/NAMESPACE/APP_NAMEkotsadm-supportbundle
  ```

Replace:

- NAMESPACE with the name of the namespace.
- APP_NAME with the name of the application.

### Generate a Host Support Bundle

For Kubernetes installer provisioned clusters (embedded clusters), you can generate a host support bundle. Use this method when:

- A cluster is down
- The application is not installed
- The admin console is not working
- To debug a host-specific performance and configuration problems even when the cluster is running

Your vendor typically provides you with a host support bundle YAML file that you run with a command to generate the host support bundle. You can also create a your own host support bundle YAML file. For more information about creating a YAML file, see [All Host Collectors and Analyzers](https://troubleshoot.sh/docs/host-collect-analyze/all/) in the Troubleshoot documentation.

If you want to use a default YAML file from the Troubleshoot.sh repository for troubleshooting a degraded cluster, follow the command in the steps below.

Root access is typically not required to run the host collectors and analyzers. However, depending on what is being collected, you might need to run the support-bundle binary with elevated permissions. For example, if you run the `filesystemPerformance` host collector against `/var/lib/etcd` and the user running the binary does not have permissions on this directory, the collection process fails.

To generate a host support bundle:

1. Do one of the following:

    - Save the host support bundle YAML file on the host.

    - Run the following command to download a host support bundle YAML file from the Troubleshoot repository that can help troubleshoot a degraded Kubernetes installer cluster:

    ```
    kubectl support-bundle https://github.com/replicatedhq/troubleshoot-specs/blob/main/host/cluster-down.yaml
    ```
  :::note
  For air gap environments, download the YAML file and copy it to the air gap machine.
  :::

1. Run the following command on the host to generate a host support bundle:

  ```
  ./support-bundle --interactive=false PATH/FILE.yaml
  ```
  Replace:

    - `PATH` with the path to the host support bundle YAML file.
    - `FILE` with the name of the host support bundle YAML file from your vendor.

1. Share the host support bundle with your vendor's support team, if needed.

1. Repeat these steps for each node because there is no method to generate host support bundles on remote hosts. If you have a multi-node Kubernetes cluster, you must run the support-bundle binary on each node and generate a host support bundle for each node. Note that the support-bundle plugin must be installed on each control plane node to generate a support bundle from that node.

### Generate a Bundle with a Default kots.io FIle

You can generate a support bundle using the default kots.io manifest file if the application does not have a support bundle manifest included.

#### In an Online Environment

In an online environment, run the following command to generate a support bundle using the default kots.io manifest file:

  ```
  kubectl support-bundle https://kots.io
  ```

#### On an Air Gap Server

If you are on an air gapped server, perform the following steps to create a support bundle using the default kots.io manifest file:

1. Run the following command from a computer with internet access to download the default kots.io manifest:

    ```
    curl -o spec.yaml https://kots.io -H 'User-agent:Replicated_Troubleshoot/v1beta1'
    ```

1. Upload the `spec.yaml` file to the air gapped server.

1. Run the following command to create a support bundle using the uploaded `spec.yaml` file:

    ```
    kubectl support-bundle /path/to/spec.yaml
    ```
