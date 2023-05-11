# Install a Helm Chart and the SDK

Note: For this step, the Show Helm Install Tab feature flag must be enabled for the team.

## Install your App and the SDK Helm Chart

To install your application Helm chart along with the SDK:

1. Create or locate a customer in the Replicated vendor portal. The Customer email field must be populated. This email address is only used as a username for the Replicated registry and is never contacted in any way.

1. Click the Helm install instructions button to view instructions to install the release using Helm.

1. Run the first command to log in to the Replicated registry.

    ```bash
    helm registry login registry.replicated.com --username EMAIL_ADDRESS --password LICENSE_ID
    ```

1. Run the fourth command to install the chart(s) using Helm.

    ```bash
    helm install CHART_NAME oci://registry.replicated.com/APP_SLUG/CHART_NAME
    ```

   :::note
   The second and third commands relate to preflight checks and can be ignored for now.
   :::

1. Verify that the SDK was installed by getting the Kubernetes Deployments in the appropriate namespace:

    ```
    kubectl get deployments
    ```
