import Beta from "../partials/replicated-sdk/_beta.mdx"

# Installing an Application and the SDK

This topic describes how to install Helm chart applications that include the Replicated SDK as a dependency.

<Beta/>

## Prerequisites

To install an application Helm chart and the Replicated SDK, ensure that you meet the following prerequisites:

* The license ID used to install must be associated with a valid email address. This email address is only used as a username for the Replicated registry and is never contacted in any way. For more information about creating and editing customers in the vendor portal, see [Creating a Customer](/vendor/releases-creating-customer).
* The **Show Helm Install Tab** feature flag must be enabled for your team in the vendor portal.
* (Optional) To run preflight checks before installing, you must have configured a preflight check specification for your application. For more information, see [About Preflight Checks and Support Bundles](preflight-support-bundle-creating).

## Install

To install, you first pull your chart from the Replicated registry using the email address and license ID associated with a customer in the vendor portal. This step ensures that any customer who pulls your chart has a valid, unexpired license.

When a Helm chart is pulled from the Replicated registry, the registry uses the unique license ID to inject certain values into the chart in the `replicated` section of the Helm chart `values.yaml` file. These values include license and release information that the SDK uses for initialization. For more information about the values injected by the Replicated registry, see [SDK Initialization with Replicated Values](replicated-sdk-overview#replicated-values) in _About the Replicated SDK_.

To install a Helm chart application and the Replicated SDK:

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

1. Verify that the application and the Replicated SDK were installed by getting the Kubernetes Deployments in the appropriate namespace:

   ```bash
   kubectl get deployments
   ```
1. (Optional) In the vendor portal, click **Customers**. You can see that the customer you used to install is marked as **Active** and that details about the application instance that you installed are listed under the customer name. 

   **Example**:

   ![example customer in the vendor portal with an active instance](/images/sdk-customer-active-example.png)
   [View a larger version of this image](/images/sdk-customer-active-example.png)