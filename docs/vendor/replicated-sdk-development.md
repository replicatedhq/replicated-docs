# Developing Against the SDK API (Beta)

This topic describes how to use integration mode for the Replicated SDK to develop and test changes locally. For more information about the SDK API, see [Replicated SDK API (Beta)](/reference/replicated-sdk-apis).

## Overview

You can use the Replicated SDK in integration mode to develop locally against the SDK API without needing to make real changes in the Replicated Vendor Portal or in your environment.

To use integration mode, install the Replicated SDK as a standalone component using a valid development license created in the Vendor Portal. After you install in integration mode, the SDK provides default mock data for requests to the SDK API `app` endpoints. Requests to the `license` endpoints use the real data from your development license.

To develop against the SDK API:

1. Create a Development license that you can use to install the SDK in integration mode:

   1. In the Vendor Portal, go to **Customers** and click **Create customer**.

   1. Complete the following fields:
      
      1. For **Customer name**, add a name for the customer.
      
      1. For **Assigned channel**, assign the customer to the channel that you use for testing. For example, Unstable.
      
      1. For **Customer type**, select **Development**.
      
      1. For **Customer email**, add the email address that you want to use for the license.

      1. For **Install types**, ensure that the **Existing Cluster (Helm CLI)** option is enabled.

      1. (Optional) Add any license field values that you want to use for testing:

         1. For **Expiration policy**, you can add an expiration date for the license. 

         1. For **Custom fields**, you can add values for any custom license fields in your application. For information about how to create custom license fields, see [Managing Customer License Fields](/vendor/licenses-adding-custom-fields).

   1. Click **Save Changes**.

1. On the **Manage customer** page for the customer you created, click **Helm install instructions**.

   <img alt="Helm install instructions button on the manage customer page" src="/images/helm-install-instructions-button.png" width="700px"/>

   [View a larger version of this image](/images/helm-install-instructions-button.png)

1. In the **Helm install instructions** dialog, copy and run the command to log in to the Replicated registry.

   <img alt="Registry login command in the Helm install instructions dialog" src="/images/helm-install-instructions-registry-login.png" width="600px"/>

   [View a larger version of this image](/images/helm-install-instructions-registry-login.png)

1. From the same dialog, copy and run the command to install the SDK in integration mode:

   <img alt="SDK integration mode install command in the Helm install instructions dialog" src="/images/helm-install-instructions-sdk-integration.png" width="600px"/>

   [View a larger version of this image](/images/helm-install-instructions-sdk-integration.png)

   After the Replicated SDK is installed and initialized in a cluster, the Replicated SDK API is exposed at `replicated:3000`. You can access the SDK API for testing by forwarding port 3000 to your local machine.

1. Run the following command to port forward to the SDK API service:

    ```bash
    kubectl port-forward service/replicated 3000
    ```
    ```
    Forwarding from 127.0.0.1:3000 -> 3000
    Forwarding from [::1]:3000 -> 3000
    ```

1. With the port forward running, test the SDK API endpoints as desired. For example:

   ```bash
   curl localhost:3000/api/v1/license/fields/expires_at
   curl localhost:3000/api/v1/license/fields/{field}
   ```
   
   For more information about using the SDK API, see [Replicated SDK API (Beta)](/reference/replicated-sdk-apis).

   :::note
   Requests to the `license` endpoints use your actual development license data, while requests to the `app` endpoints use the default mock data.
   :::