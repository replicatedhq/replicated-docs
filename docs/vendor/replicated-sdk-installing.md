import Beta from "../partials/replicated-sdk/_beta.mdx"

# Installing an Application and the SDK

This topic describes how to install Helm chart applications that include the Replicated SDK Helm chart as a dependency.

<Beta/>

## About Installing an Application and the SDK

Your customers log in to the Replicated registry using their license ID to pull your chart from the Replicated registry. This ensures that any customer who pulls your chart has a valid, unexpired license.

When a Helm chart is pulled from the Replicated registry, the registry uses the unique license ID to inject certain values into the chart in the `replicated` section of the Helm chart `values.yaml` file. These values include license and release information that the SDK uses for initialization.

## Prerequisites

To install an application Helm chart and the Replicated SDK, ensure that you meet the following prerequisites:

* The license ID used to install must be associated with a valid email address. This email address is only used as a username for the Replicated registry and is never contacted in any way. For more information about creating and editing customers in the vendor portal, see [Creating a Customer](/vendor/releases-creating-customer).
* The **Show Helm Install Tab** feature flag must be enabled for your team in the vendor portal.

## Install

To install a Helm chart application and the Replicated SDK:

1. In the vendor portal, go to **Customers** and click on the target customer.

1. Click **Helm install instructions**.

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

1. Run the fourth command to install the chart or charts using Helm:

    ```bash
    helm install RELEASE_NAME oci://registry.replicated.com/APP_SLUG/CHANNEL_NAME/CHART_NAME
    ```
    Replace `RELEASE_NAME`, `APP_SLUG`, `CHANNEL_NAME`, and `CHART_NAME`, with the values provided in the command in the **Helm install instructions** dialog.

1. Verify that the Replicated SDK was installed by getting the Kubernetes Deployments in the appropriate namespace:

   ```bash
   kubectl get deployments
   ```