# Generating Support Bundles

The Replicated admin console includes a Troubleshoot page where you can generate an analysis and review remediation suggestions for troubleshooting an application. You can also download a support bundle to share with your vendor.

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

## Generating a Bundle Using the CLI

You can generate a support bundle using the CLI instead of the admin console. For example, the admin console might not be available if you are using a Kubernetes installer (embedded installer) and the installation fails. Or perhaps you need to use a more recent version of the support-bundle plugin than what is embedded in the admin console.

### Install the support-bundle Plugin

Install or update the support-bundle plugin (a kubectl plugin) before you generate a support bundle using the CLI. The plugin is required to generate a support bundle.

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
#### Install Manually from the Release Archives

To manually install the latest version of the plugin manually from the release archives:

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

### Create a Support Bundle with the CLI

After you install or update the support-bundle plugin, generate a support bundle using one of the following methods, depending on your environment or situation.

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
