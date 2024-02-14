# Developing Against the SDK API (Beta)

This topic describes how to enable integration mode for the Replicated SDK to develop and test changes locally. For more information about the SDK API, see [Replicated SDK API (Beta)](/reference/replicated-sdk-apis).

## About Integration Mode

You can use the Replicated SDK in integration mode to develop locally against the SDK API without needing to make real changes in the Replicated vendor portal or in your environment.

To use integration mode, install the Replicated SDK as a standalone component using a valid development license created in the Replicated vendor portal. After you install in integration mode, the SDK provides default mock data for requests to the SDK API `app` endpoints. Requests to the `license` endpoints use the real data from your development license.

To use the Replicated SDK in integration mode, complete the following procedures:
1. [Create a Development License](#license)
1. [Install the SDK in integration mode](#install)

## Create a Development License {#license}

To use integration mode, you first need to create a development license that you can use to install the SDK. When you create the development license, you can add values to any license fields that you want to use in testing.

For information about development licenses, see [License Types](licenses-about#license-types) in _About Licenses_.

To create a development license:

1. In the vendor portal, go to **Customers** and click **Create customer**.

1. Complete the following fields:
    
    1. For **Customer name**, add a name for the customer.
    
    1. For **Assigned channel**, assign the customer to the channel that you use for testing. For example, Unstable.
    
    1. For **Customer type**, select **Development**.
    
    1. For **Customer email**, add the email address that you want to use for the license.

   ![create customer page in the vendor portal](/images/create-customer-development-mode.png)
   [View a larger version of this image](/images/create-customer-development-mode.png)

1. (Optional) Add any license field values that you want to use for testing:

   1. For **Expiration policy**, you can add an expiration date for the license. 

   1. For **Custom fields**, you can add values for any custom license fields in your application. For information about how to create custom license fields, see [Managing Custom License Fields](/vendor/licenses-adding-custom-fields).

1. Click **Save Changes**.

## Install the SDK in Integration Mode {#install}

To develop against the SDK locally in your development environment, install the SDK in integration mode as a standalone component in your cluster.

To install the SDK in integration mode:

1. On the **Manage customer** page for the customer you created, click **Helm install instructions**.

   ![Helm install instructions button on the manage customer page](/images/helm-install-instructions-button.png)

1. In the **Helm install instructions** dialog, copy and run the command to log in to the Replicated registry.

   ![Registry login command in the Helm install instructions dialog](/images/helm-install-instructions-registry-login.png)

1. From the same dialog, copy and run the command to install the SDK in integration mode:

   ![SDK integration mode install command in the Helm install instructions dialog](/images/helm-install-instructions-sdk-integration.png)

1. Make requests to the SDK API from your application. Requests to the `license` endpoints use your actual development license data, while requests to the `app` endpoints use the default mock data. For more information about using the SDK API, see [Replicated SDK API (Beta)](/reference/replicated-sdk-apis).