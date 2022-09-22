# Generating Support Bundles

The Replicated admin console includes a Troubleshoot page where you can generate an analysis and review remediation suggestions for troubleshooting an application. You can also download a support bundle to share with your vendor.

## Create a Support Bundle using the Admin Console

1. From the admin console, select the Troubleshoot tab.

  ![Troubleshoot](/images/troubleshoot.png)

1. Click **Analyze** to start analyzing the application.

  The analysis executes the support bundle plugin. After the analysis completes, the bundle is available on the Troubleshoot tab in the admin console. If any known issues are detected, they are highlighted with possible remediation suggestions.

  :::note
  No data leaves the cluster. Data is never sent across the internet or to anyone else.
  :::

  ![Analysis](/images/analysis.png)

1. (Optional) Click **Download bundle** to download the support bundle. You can send the bundle to your vendor for assistance.

## Creating a Support Bundle Using the CLI

You can generate a support bundle using the CLI instead of the admin console. For example, if an installation fails when you are using an embedded KURL cluster to install the Replicated admin console or upload the application, the admin console may not be available.

## Install the Support Bundle Plugin {#plugin}

The `support-bundle` kubectl plugin is required to generate a support bundle.

To install the plugin, do one of the following actions:

- If krew is _not_ installed, run the following command:

    ```
    curl https://krew.sh/support-bundle | bash
    ```

- If krew is installed, run the following command:

    ```
    kubectl krew install support-bundle
    ```

- If you do not want to install the plugin using krew or want an easier way to install the plugin in an air gapped environment, run the following command:

  ```
  curl -L https://github.com/replicatedhq/troubleshoot/releases/download/VERSION/support-bundle_linux_amd64.tar.gz | tar xzvf -
  ```

  Replace `VERSION` with `v` and the version number. For example, `v0.40.0`. To get the latest release version, see the [Troubleshoot](https://github.com/replicatedhq/troubleshoot/releases) repository in GitHub.

### Create a Support Bundle with the CLI

Create a support bundle using one of the following methods, depending on your environment or situation.

#### With the Default kots.io Specification

To use the default kots.io specification, run the following command to create a support bundle:

  ```
  kubectl support-bundle https://kots.io
  ```

#### On an Air Gap Server
If you are on an air gapped server, perform the following steps to create a support bundle:

1. Run the following command from a computer with internet access to download the default kots.io specification:

    ```
    curl -o spec.yaml https://kots.io -H 'User-agent:Replicated_Troubleshoot/v1beta1'
    ```

1. Upload the `spec.yaml` file to the air gapped server.

1. Run the following command to create a support bundle using the uploaded `spec.yaml` file:

    ```
    kubectl support-bundle /path/to/spec.yaml
    ```

#### When the Admin Console and Application are Installed

If the admin console is running and the application is installed, run the following command to create a support bundle that includes any customization specific to the application from the [support-bundle.yaml manifest file](/vendor/preflight-support-bundle-creating#creating-support-bundles):

  ```
  kubectl support-bundle http://<server-address>:8800/api/v1/troubleshoot/<app-slug>
  ```

#### When the Application is not Installed
If the application is not installed but the admin console is running, run the following command to create a support bundle with additional customization from the admin console:

  ```
  kubectl support-bundle http://<server-address>:8800/api/v1/troubleshoot
  ```

## Generate a Host Collectors and Analyzers Bundle

For Kubernetes installer provisioned clusters (embedded clusters), you can run host collectors and analyzers to help with troubleshooting a cluster that is down. Your vendor provides you with a host collector YAML file (`kind: SupportBundle`) that you run with a command to generate the support bundle on the host.

Root access is typically not required to run the host collectors. However, depending on what is being collected, you might need to run the support-bundle binary with elevated permissions. For example, if you run the `filesystemPerformance` host collector against `/var/lib/etcd` and the user running the binary does not have permissions on this directory, the collection process fails.

:::note
There is no method to run host collectors on remote nodes. If you have a multi-node Kubernetes cluster, you must run the support-bundle binary on each node and generate a host collector support bundle for each node.
:::

To run host collectors and analyzers:

1. Install the support-bundle plugin. See [Install the Support Bundle Plugin]({#plugin}).

1. Save the host collector YAML file from your vendor on the host node. For air gap environments, download the file and copy it to the air gap machine.

1. Run the following command on the host to generate a support bundle:

  ```
  ./support-bundle --interactive=false PATH/FILE.yaml
  ```
  Replace:

    - `PATH` with the path to the host collector YAML file.
    - `FILE` with the name of the host collector YAML file from your vendor.

1. If needed, share the results with your vendor's support team.
