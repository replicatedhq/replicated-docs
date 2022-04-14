# Troubleshooting an Application

The Replicated admin console includes a Troubleshoot page where you can generate, analyze, manage, and review remediation suggestions for troubleshooting an applicationand generate a support bundle that can be shared with your vendor.

## Create a Support Bundle using the Admin Console

1. Click the Troubleshoot tab in the admin console.

  ![Troubleshoot](/images/troubleshoot.png)

1. Click **Analyze** to start analyzing the application.

  No data leaves the cluster. The analysis works by the admin console operator executing the support bundle plugin and sending the collected bundle directly to the admin console API.

  Data is never sent across the internet, or to anyone else.

  The collected bundle is then run through various analyzers, and the results are shown.
  If any known issues are detected, they will be highlighted with possible remediation suggestions.

  ![Analysis](/images/analysis.png)

1. (Optional) Click **Download bundle** to download the collected and redacted support bundle, and send it to the application developer for assistance.

## Create a Support Bundle using the CLI

If you are using an embedded KURL cluster to install the Replicated admin console or upload the application and the installation fails, you can generate a support bundle using the CLI instead of the admin console.

You can create a support bundle using one of the following methods, depending on your environment:

- To use the default kots.io 11 specification, run the following command:

  ```
  kubectl support-bundle https://kots.io
  ```

- If you are on an air gapped server, perform the following steps:

    1. Run the following command to copy the default kots.io 11 specification:

    ```
    curl -o spec.yaml https://kots.io -H 'User-agent:Replicated_Troubleshoot/v1beta1'
    ```

    1. Run the following command to upload the specification to the server, and then use the local specification:

    ```
    kubectl support-bundle /path/to/spec.yaml
    ```

- If the admin console is running and the application is installed, run the following command:

  ```
  kubectl support-bundle http://<server-address>:8800/api/v1/troubleshoot/<app-slug>
  ```

- If the application is not installed but the admin console is running, run the following command:

  ```
  kubectl support-bundle http://<server-address>:8800/api/v1/troubleshoot
  ```

- If you do not already have the support-bundle kubectl plugin installed, run the following command to install the plugin:

  ```
  curl https://krew.sh/support-bundle | bash
  ```

- You can install krew 5 and run the following command:

```
kubectl krew install support-bundle
```
