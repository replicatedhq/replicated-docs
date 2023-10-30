# Installing with Helm

This topic describes how to use Helm to install releases that contain one or more Helm charts. For more information about the `helm install` command, including how to override values in a chart during installation, see [Helm Install](https://helm.sh/docs/helm/helm_install/) in the Helm documentation.

## Prerequisites

Before you install, complete the following prerequisites:

* You must have a customer in the Replicated vendor portal with a valid email address. This email address is only used as a username for the Replicated registry and is never contacted. For more information about creating and editing customers in the vendor portal, see [Creating a Customer](/vendor/releases-creating-customer).
* (Recommended) To install the Replicated SDK alongside the application, declare the SDK as a dependency. For more information, see [How to Distribute the SDK](replicated-sdk-overview#how-to-distribute-the-sdk) in _About the Replicated SDK (Beta)_.

## Install

To install a Helm chart in an online environment:

1. In the vendor portal, go to **Customers** and click on the target customer.

1. Click **Helm install instructions**.

   <img alt="Helm install button" src="/images/helm-install-button.png" width="700px"/>

   [View a larger image](/images/helm-install-button.png)

1. In the **Helm install instructions** dialog, run the first command to log in to the Replicated registry:

   ```bash
   helm registry login registry.replicated.com --username EMAIL_ADDRESS --password LICENSE_ID
   ```
   Replace `EMAIL_ADDRESS` and `LICENSE_ID` with the values provided in the dialog. The `--username` flag requires the customer's email address and the `--password` flag requires the ID of the customer's license. 

   :::note
   You can safely ignore the following warning message: `WARNING: Using --password via the CLI is insecure.` This message is displayed because using the `--password` flag stores the password in bash history. This login method is not insecure.

   Alternatively, to avoid the warning message, you can click **(show advanced)** in the **Helm install instructions** dialog to display a login command that excludes the `--password` flag. With the advanced login command, you are prompted for the password after running the command.  
   :::

1. (Optional) Run the second and third commands to install the preflight plugin and run preflight checks. If no preflight checks are defined, these commands are not displayed. For more information about defining and running preflight checks, see [About Preflight Checks and Support Bundles](preflight-support-bundle-about).

1. Run the fourth command to install using Helm:

   ```bash
   helm install RELEASE_NAME oci://registry.replicated.com/APP_SLUG/CHANNEL_SLUG/CHART_NAME
   ```
   Replace `RELEASE_NAME`, `APP_SLUG`, `CHANNEL_SLUG`, and `CHART_NAME`, with the values provided in the command in the **Helm install instructions** dialog.

   :::note
   The channel slug is not required for releases promoted to the Stable channel.
   :::

   :::note
   To install the SDK with custom RBAC permissions, include the `--set` flag with the `helm install` command to override the value of the `replicated.serviceAccountName` field with a custom service account. For more information, see [Customizing RBAC for the SDK](/vendor/replicated-sdk-customizing#customize-rbac-for-the-sdk).
   :::

1. (Optional) In the vendor portal, click **Customers**. You can see that the customer you used to install is marked as **Active** and the details about the application instance are listed under the customer name. 

   **Example**:

   ![example customer in the vendor portal with an active instance](/images/sdk-customer-active-example.png)
   [View a larger version of this image](/images/sdk-customer-active-example.png)

## Install in Air Gap Environments

Installing a release using the Helm CLI in an air gapped environment requires first pulling the chart from the Replicated registry from a machine with internet access. Additionally, if the Replicated SDK is included in the Helm chart, you must push the SDK image to a private registry from the air gapped machine.

To install in air gap environments:

1. Log in to the Replicated registry:

   ```bash
   helm registry login registry.replicated.com --username EMAIL_ADDRESS --password LICENSE_ID
   ```
   Where:
   * `EMAIL_ADDRESS` is the email address of the customer.
   * `LICENSE_ID` is the license ID for the customer.

1. From a machine with internet access, pull the application Helm chart from the Replicated registry:

   ```
   helm pull oci://registry.replicated.com/APP_SLUG/CHANNEL_SLUG/CHART_NAME
   ```

1.  Copy the application Helm chart to the air gapped machine.   

1. If the Replicated SDK is included in the Helm chart, do the following to get the `replicated-sdk` image:

   1. From a machine with internet access, download the Replicated SDK Helm chart archive:

      ```
      docker save replicated/replicated-sdk:SDK_VERSION -o replicated-sdk.tar
      ```
      Where `SDK_VERSION` is the version of the SDK to save.

      **Example**:
   
      ```
      docker save replicated/replicated-sdk:v1.0.0-beta.11 -o replicated-sdk.tar
      ```
   
   1. Copy the `replicated-sdk.tar` file to the air gapped machine.
   
   1. On the air gapped machine, load the image into Docker:
   
      ```
      docker load -i replicated-sdk.tar
      ```
   
   1. Retag the image:
   
      ```
      docker tag replicated/replicated-sdk:v1.0.0-beta.11 DESTINATION_REGISTRY/replicated-sdk:IMAGE_TAG
      ```
   
   1. Push to the air gapped registry:
   
      ```
      docker push DESTINATION_REGISTRY/replicated-sdk:IMAGE_TAG
      ```

1. Install the pulled chart with the following Helm values:

   ```
   helm install RELEASE CHART_TGZ --set replicated.images.replicated-sdk=DESTINATION_REGISTRY/replicated-sdk:IMAGE_NAME --set replicated.isAirgap=true
   ```