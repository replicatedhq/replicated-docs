# Running Preflight Checks for Helm Installations

This topic describes how to use the preflight kubectl plugin to run preflight checks for applications installed with the Helm CLI.

## Overview

For Replicated KOTS installations of Helm chart- or standard manifest-based applications, preflight checks run automatically as part of the installation process.

For installations with the Helm CLI, your users can optionally run preflight checks with the open source preflight kubectl plugin before they run `helm install`. The kubectl preflight plugin requires a preflight check specification as input. The preflight plugin automatically finds and runs preflight specifications by filtering the stream of stdout for preflight specifications.

## Prerequisites

Before you run preflight checks, complete the following prerequisites:

* These instructions assume that the there is a valid preflight specification defined in a Kubernetes Secret in the `templates` directory of your application Helm chart. For more information, see [Defining Preflight Checks](/vendor/preflight-kots-defining).
* The preflight kubectl plugin is required to run preflight checks for Helm CLI installations. The preflight plugin is a client-side utility that adds a single binary to the path.

  To install the preflight plugin, run the following command to install the preflight plug-in using krew:

  ```
  curl https://krew.sh/preflight | bash
  ```
  For information about the preflight plugin, including additional installation options, see [Getting Started](https://troubleshoot.sh/docs/) in the open source Troubleshoot documentation. 

## Run Preflight Checks from a Release

For more information about running preflight checks with the kubectl preflight plugin, see [Run Preflight Checks using the CLI](https://troubleshoot.sh/docs/preflight/cli-usage/#options) in the open source Troubleshoot documentation.

To run preflights checks:

1. In the [vendor portal](https://vendor.replicated.com/apps/gitea-boxer/customers), go to the **Customers** page. Click on the name of the target customer.

1. On the landing page for the customer, click **Helm install instructions**.

  The **Helm install instructions** dialog opens. For example:

  <img alt="Helm install instructions dialog with preflight checks" src="/images/helm-install-preflights.png" width="550px"/>

1. Run the commands in the dialog to run preflight checks:

    1. Log in to the registry where the Helm chart and preflight specification were pushed:

        ```
        helm registry login REGISTRY_DOMAIN --username USERNAME --password PASSWORD
        ```

        Where:

        - `REGISTRY_DOMAIN` is the registry domain that contains the Helm chart.
        - `USERNAME` is the username that has access to the registry.
        - `PASSWORD` is the password for the registry.

        **Example:**
        ```
        helm registry login registry.replicated.com --username example@companyname.com password 1234abcd
        ```

    1. Run the following command to template the Helm chart and then pipe the result to the kubectl preflight plugin:

        ```
        helm template oci://REGISTRY/APP_SLUG/CHANNEL/CHART | kubectl preflight -
        ```

        Where:
        - `REGISTRY` is the registry domain where your Helm chart is located. This can be the Replicated registry or a custom domain.
        - `APP_SLUG` is the name of the application.
        - `CHANNEL` is the lowercased name of the release channel.
        - `CHART` is the name of the Helm chart.

        For all available options with this command, see [Run Preflight Checks using the CLI](https://troubleshoot.sh/docs/preflight/cli-usage/#options) in the open source Troubleshoot documentation.

        **Examples:**

        ```
        helm template oci://registry.replicated.com/gitea-app/unstable/gitea | kubectl preflight -
        ```
        ```
        helm template oci://registry.replicated.com/gitea-app/unstable/gitea --values values.yaml | kubectl preflight -
        ```
        ```
        helm template oci://registry.replicated.com/gitea-app/unstable/gitea --set mysql.enabled=true | kubectl preflight -
        ```

![Example preflight checks output on the command line](/images/helm-preflight-output.png)        

## (Optional) Save Output

The output shows the success, warning, or fail message for each preflight check, depending on how they were configured. You can ask customers to send you the results of the preflight checks if needed.

![Save output dialog](/images/helm-preflight-save-output.png)
