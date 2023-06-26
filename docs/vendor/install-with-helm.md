import FeatureFlag from "../partials/helm/_feature-flag.mdx"
import Beta from "../partials/helm/_helm-install-beta.mdx"

# Installing an Application with Helm (Beta)

This topic describes how to use Helm to install releases that contain one or more Helm charts.

:::note
<Beta/>
:::
## Prerequisites

Before you install, complete the following prerequisites:

* You must have a customer in the Replicated vendor portal with a valid email address. This email address is only used as a username for the Replicated registry and is never contacted in any way. For more information about creating and editing customers in the vendor portal, see [Creating a Customer](/vendor/releases-creating-customer).
* <FeatureFlag/>

## Install

If you declared the Replicated SDK as a dependency of your Helm chart, then the SDK is installed alongside your application. For more information about the SDK, see [About the Replicated SDK (Beta)](replicated-sdk-overview).

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

1. Skip the second and third commands for installing the preflight plugin and running preflight checks. For more information about configuring and running preflight checks, see [About Preflight Checks and Support Bundles](preflight-support-bundle-about).

1. Run the fourth command to install using Helm:

    ```bash
    helm install RELEASE_NAME oci://registry.replicated.com/APP_SLUG/CHANNEL_SLUG/CHART_NAME
    ```
    Replace `RELEASE_NAME`, `APP_SLUG`, `CHANNEL_SLUG`, and `CHART_NAME`, with the values provided in the command in the **Helm install instructions** dialog.

    :::note
    The channel slug is not required if the release is promoted to the Stable channel.
    :::

1. (Optional) In the vendor portal, click **Customers**. You can see that the customer you used to install is marked as **Active** and that details about the application instance that you installed are listed under the customer name. 

   **Example**:

   ![example customer in the vendor portal with an active instance](/images/sdk-customer-active-example.png)
   [View a larger version of this image](/images/sdk-customer-active-example.png)