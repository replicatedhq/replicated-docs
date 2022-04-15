# Troubleshooting an Application

The Replicated admin console includes a Troubleshoot page where you can generate, analyze, manage, and review remediation suggestions for troubleshooting an application and generate a support bundle that can be shared with your vendor.

## Create a Support Bundle using the Admin Console

1. From the admin console, select the Troubleshoot tab.

  ![Troubleshoot](/images/troubleshoot.png)

1. Click **Analyze** to start analyzing the application.

  The analysis works by the admin console operator executing the support bundle plugin and sending the collected bundle directly to the admin console API.

  :::note
  No data leaves the cluster. Data is never sent across the internet or to anyone else.
  :::

  The collected bundle is then run through various analyzers, and the results are displayed.
  If any known issues are detected, they are highlighted with possible remediation suggestions.

  ![Analysis](/images/analysis.png)

1. (Optional) Click **Download bundle** to download the collected and redacted support bundle. You can send the bundle to your vendor for assistance.

## Create a Support Bundle using the CLI

You can generate a support bundle using the CLI instead of the admin console. For example, if an installation fails when you are using an embedded KURL cluster to install the Replicated admin console or upload the application, the admin console may not be available.

Create a support bundle using one of the following methods, depending on your environment or situation.

### Create a Support Bundle Using the Default kots.io Specification
To use the default kots.io 11 specification, run the following command to create a support bundle:

  ```
  kubectl support-bundle https://kots.io
  ```

### Create a Support Bundle on an Air Gap Server
If you are on an air gapped server, perform the following steps to create a support bundle:

1. Run the following command to copy the default kots.io 11 specification:

    ```
    curl -o spec.yaml https://kots.io -H 'User-agent:Replicated_Troubleshoot/v1beta1'
    ```

1. Run the following command to upload the specification to the server, and then use the local specification:

    ```
    kubectl support-bundle /path/to/spec.yaml
    ```

### Create a Support Bundle when the Admin Console and Application are Installed

If the admin console is running and the application is installed, run the following command to create a support bundle:

  ```
  kubectl support-bundle http://<server-address>:8800/api/v1/troubleshoot/<app-slug>
  ```

### Create a Support Bundle when an Application is not Installed
If the application is not installed but the admin console is running, run the following command to create a support bundle:

  ```
  kubectl support-bundle http://<server-address>:8800/api/v1/troubleshoot
  ```
### Install the Support Bundle Plugin
- If you do not already have the `support-bundle` kubectl plugin installed, run the following command to install the plugin:

  ```
  curl https://krew.sh/support-bundle | bash
  ```

### Install the Support Bundle Plugin using krew 5
If you have installed krew 5, run the following command to install the `support-bundle` plugin:

  ```
  kubectl krew install support-bundle
  ```
