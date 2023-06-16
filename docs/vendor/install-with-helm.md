# Installing an Application with Helm (Beta)

This topic describes how to use Helm to install releases that contain one or more Helm charts.

## Prerequisites

Before you install, complete the following prerequisites:

* You must have a license with a valid email address. This email address is only used as a username for the Replicated registry and is never contacted in any way. For more information about creating and editing customers in the vendor portal, see [Creating a Customer](/vendor/releases-creating-customer).
* The **Show Helm Install Tab** feature flag must be enabled for your team in the vendor portal.
* (Optional) To install the Replicated SDK with your application, declare the SDK as a dependency in your chart.
* (Optional) To run preflight checks before installing, you must have configured a preflight check specification for your application. For more information, see [About Preflight Checks and Support Bundles](preflight-support-bundle-creating).

## Install

To install, you first pull your chart from the Replicated registry using the email address and license ID associated with a customer in the vendor portal. Then, use Helm to install the chart. If you declared the Replicated SDK as a dependency, then the SDK is installed alongside your application.

To install a Helm chart:

1. In the vendor portal, go to **Customers** and click on the target customer.

1. Click **Helm install instructions**.

   <img alt="Helm install instructions dialog" src="/images/helm-install-instructions.png" width="500px"/>

   [View a larger version of this image](/images/helm-install-instructions.png)

1. In the **Helm install instructions** dialog, run the first command to log into the Replicated registry:

   ```bash
   helm registry login registry.replicated.com --username EMAIL_ADDRESS --password LICENSE_ID
   ```
   Replace `EMAIL_ADDRESS` and `LICENSE_ID` with the values provided in the command in the **Helm install instructions** dialog.

1. (Optional) Run the second command to install the preflight plugin:

   ```bash
   curl https://krew.sh/preflight | bash
   ```

1. (Optional) Run the third command to run preflight checks to confirm that your installation environment meets the requirements for the application:

   ```bash
   kubectl preflight oci://registry.replicated.com/APP_SLUG
   ```
   Replace `APP_SLUG` with the value provided in the command in the **Helm install instructions** dialog.

1. Run the fourth command to install using Helm:

    ```bash
    helm install RELEASE_NAME oci://registry.replicated.com/APP_SLUG/CHANNEL_NAME/CHART_NAME
    ```
    Replace `RELEASE_NAME`, `APP_SLUG`, `CHANNEL_NAME`, and `CHART_NAME`, with the values provided in the command in the **Helm install instructions** dialog.

1. Verify that the application was installed by getting the Kubernetes Deployments in the appropriate namespace:

   ```bash
   kubectl get deployments
   ```

   :::note
   If you includes the Replicated SDK as a dependency of your Helm chart, you can also see the SDK listed in your Deployments.
   :::

1. (Optional) In the vendor portal, click **Customers**. You can see that the customer you used to install is marked as **Active** and that details about the application instance that you installed are listed under the customer name. 

   **Example**:

   ![example customer in the vendor portal with an active instance](/images/sdk-customer-active-example.png)
   [View a larger version of this image](/images/sdk-customer-active-example.png)