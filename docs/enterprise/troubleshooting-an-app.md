# Generating Support Bundles

The Replicated admin console includes a Troubleshoot page where you can generate an analysis and review remediation suggestions for troubleshooting an application. You can download a support bundle to share with your vendor.

Alternatively, you can generate a support bundle using the support-bundle CLI, which can be helpful when the admin console is not available or when you want to debug a host.

## Generate a Bundle using the Admin Console

To generate a support bundle in the admin console:

1. Log in to the admin console and go to the **Troubleshoot** tab.

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

You can install the support-bundle plugin using krew or install it manually from the release archives.

:::note
If your application was installed using a Replicated Kubernetes installer script, then `kubectl` and the `support-bundle` plugin should already be present on all of the control plane nodes.
:::

#### Install using krew

To install the support-bundle plugin using krew, do one of the following actions:

- If krew is _not_ installed already, run the following command:

    ```
    curl https://krew.sh/support-bundle | bash
    ```

- If krew is installed already, run the following command:

    ```
    kubectl krew install support-bundle
    ```
#### Install Manually

If you do not want to install the plugin using krew or want an easier way to install the plugin in an air gapped environment, you can install the plugin manually from the release archives.

To install the support-bundle plugin manually:

1. Run the following command to download and unarchive the latest release, and move the plugin to your $PATH:

  ```
  curl -L https://github.com/replicatedhq/troubleshoot/releases/latest/download/support-bundle_linux_amd64.tar.gz | tar xzvf -
  sudo mv ./support-bundle /usr/local/bin/kubectl-support-bundle
  ```
  :::note
  If you do not have root access, or choose not to add the support-bundle plugin to your path, you can run the binary directly from where you unzipped it by executing `./support-bundle`.  If you choose not to put the plugin into your $PATH, then replace all instances of `kubectl support-bundle` in these instructions with `./support-bundle` or with the absolute path to the binary.
  :::

1. (Optional) Run the following command to test that the installation is working:

  ```
  kubectl support-bundle --help
  ```

### Generate a Bundle on a Running Cluster

If the admin console is running and the application is installed, log in to the admin console to get the CLI command for generating a support bundle.

To generate a support bundle on a running cluster with the CLI:

1. Log in to the admin console and go to the **Troubleshoot** tab.

1. On the Troubleshoot page, at the bottom of the Support Bundles section, click the **If you'd prefer, click here to get a command to manually generate a support bundle** link to get the command to generate a support bundle.

  The command includes customizations provided by your application vendor.

1. Run the command provided in the admin console to generate a support bundle:

  ```
  kubectl support-bundle secret/NAMESPACE/kotsadm-APP_SLUG-supportbundle --redactors=configmap/NAMESPACE/kotsadm-redact-spec/redact-spec,configmap/NAMESPACE/kotsadm-APP_SLUG-redact-spec/redact-spec
  ```

  Replace:
  - `NAMESPACE` with the name of the namespace.
  - `APP_SLUG` with the unique application slug.

### Generate a Host Support Bundle

For Kubernetes installer provisioned clusters (embedded clusters), you can generate a host support bundle. Use this method when:

- A cluster is down
- The application is not installed
- The admin console is not working
- To debug a host-specific performance and configuration problems even when the cluster is running

Your vendor typically provides a host support bundle YAML file that you run with a command to generate the host support bundle. You can also create a your own host support bundle YAML file. For more information about creating a YAML file, see [All Host Collectors and Analyzers](https://troubleshoot.sh/docs/host-collect-analyze/all/) in the Troubleshoot documentation.

If you want to use a default YAML file from the Troubleshoot.sh repository for troubleshooting a degraded cluster, follow the command in the steps below.

Root access is typically not required to run the host collectors and analyzers. However, depending on what is being collected, you might need to run the support-bundle binary with elevated permissions. For example, if you run the `filesystemPerformance` host collector against `/var/lib/etcd` and the user running the binary does not have permissions on this directory, the collection process fails.

To generate a host support bundle:

1. Do one of the following:

    - Save the host support bundle YAML file on the host.

    - Run the following command to download a host support bundle YAML file from the Troubleshoot repository that can help troubleshoot a degraded Kubernetes installer cluster:

    ```
    kubectl support-bundle https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/host/cluster-down.yaml
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

1. Repeat these steps for each node because there is no method to generate host support bundles on remote hosts. If you have a multi-node Kubernetes cluster, you must run the support-bundle binary on each node and generate a host support bundle for each node.

### Generate a Bundle with a Default kots.io File

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
### Generate a Merged Support Bundle

Support bundles are generated from support bundle specifications provided by the vendor. Specification types include manifest files in the cluster, specifications that are accessible online, and specifications embedded in Kubernetes Secrets or ConfigMap objects. Your vendor can inform you of any online specifications or Kubernetes objects, if applicable.

You can generate a merged support bundle archive from multiple specifications.

When support bundle specifications are contained in Secrets or ConfigMaps, you can run an automatic discovery in the cluster and generate a merged support bundle.

You must use the support-bundle CLI to perform these tasks.

#### Generate from Multiple Specifications

You can generate a merged support bundle from any combination of the support bundle specification types. For more information, see [Collect a Support Bundle Using Multiple Specs](https://troubleshoot.sh/docs/support-bundle/collecting/#collect-a-support-bundle-using-multiple-specs) in the Troubleshoot documentation.

The following examples show some possible combinations:

- Using multiple files:

  ```bash
  kubectl support-bundle ./PATH_TO_FILE1 ./PATH_TO_FILE2 ./PATH_TO_FILE3
  ```

  Replace `PATH_TO_FILE` with the path and YAML file name for each file.

  **Example:**

  ```bash
  kubectl support-bundle manifests/redis/troubleshoot.yaml manifests/mysql/troubleshoot.yaml manifests/nginx/troubleshoot.yaml
  ```

- Using a URL and a specification in the cluster:

  ```bash
  kubectl support-bundle URL \
  ./PATH_TO_FILE 
  ```
  
  Replace:

  - `URL` with the online specification location provided by your vendor
  - `PATH_TO_FILE` with the path and YAML file name

  **Example:**
  
  ```bash
  kubectl support-bundle https://raw.githubusercontent.com/replicatedhq/troubleshoot-specs/main/in-cluster/default.yaml \
  ./support-bundle-spec-1.yaml
  ```  
#### Discover Specifications and Generate a Bundle

You can run an automatic discovery of specifications contained in Secrets or ConfigMaps in the cluster and generate a merged support bundle using the `--load-cluster-specs` flag. This can be easier than manually typing each specification on the command line.

Run the following command to generate a bundle with all of the specifications discovered in the cluster:

  ```bash
  kubectl support-bundle --load-cluster-specs
  ```
The `--load-cluster-specs` flag can be combined with multiple specifications, such as URLs or specifications that match a custom label. For more information, see [Discover Cluster Specs](https://troubleshoot.sh/docs/support-bundle/discover-cluster-specs/) in the Troubleshoot documentation.