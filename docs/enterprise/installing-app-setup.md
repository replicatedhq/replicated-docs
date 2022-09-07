# Completing Application Setup and Deploying

This topic describes how to access the Replicated admin console to complete the application setup, run preflight checks, and deploy.

## Prerequisite

This procedure assumes that you have already installed the admin console on either an existing cluster or on a cluster provisioned by the Replicated Kubernetes installer.

For more information, see [Installing on an Existing Cluster](installing-existing-cluster) or [Installing with the Kubernetes Installer](installing-embedded-cluster).

## Access the Admin Console and Deploy the Application

To complete application setup and deploy from the admin console:

1. Access the admin console on port 8800:
   * **Existing cluster**: If the port forward is active, go to [http://localhost:8800](http://localhost:8800) to access the admin console.

      If you need to reopen the port forward to the admin console, run the following command:

      ```shell
      kubectl kots admin-console -n APP_NAMESPACE
      ```
      Replace `APP_NAMESPACE` with the namespace on the cluster where you installed the application.

   * **Kubernetes installer cluster**: Go to the address provided in the `Kotsadm` field in the output of the installation command. For example, `Kotsadm: http://34.171.140.123:8800`.

1. (Kubernetes Installer Cluster Only) On the Bypass Browser TLS warning page, review the information about how to bypass the browser TLS warning, and then click **Continue to Setup**.

1. (Kubernetes Installer Cluster Only) On the HTTPS page, do one of the following:

    - To use the self-signed TLS certificate only, enter the hostname (required) if you are using the identity service. If you are not using the identity service, the hostname is optional. Click **Skip & continue**.
    - To use a custom certificate only, enter the hostname (required) if you are using the identity service. If you are not using the identity service, the hostname is optional. Then upload a private key and SSL certificate to secure communication between your browser and the admin console. Click **Upload & continue**.

1. Log in to the admin console:
   * **Existing cluster**: Log in with the password that you created during installation.
   * **Kubernetes installer cluster**: Log in with the password that was provided in the `Login with password (will not be shown again):` field in the output of the installation command.

   ![Secure Console](/images/secure-console.png)

1. Upload the license file provided by your application vendor.

1. (Air Gap Only) Upload the `.airgap` air gap bundle provided by your application vendor.

1. If there are configurations specific to the application, complete the fields on the configuration screen then click **Continue**. The required and optional configuration fields on this screen are used to build the final deployable Kubernetes manifests for the application.

   If the application vendor did not include any configuration options for the application, this screen does not display.

   ![Initial Config](/images/initial-config.png)

1. Complete the preflight checks. The admin console automatically runs preflight checks (conformance tests) against the target namespace and cluster to ensure that the environment meets the minimum requirements to support the application.

   * If there are no preflight check warnings or failures, continue with deployment.
   * If there are any preflight check warnings and failures:
      * Resolve the warnings and failures, and click **Re-run** to run the preflight checks again.
      * If there are no failures that prevent application deployment, you can choose to dismiss the preflight check warnings to continue.
      :::note
      Replicated recommends that you address any warnings or failures, rather than dismissing them. Preflight checks help ensure that your environment meets the requirements for application deployment.
      :::
      * If you are installing with minimal role-based access control (RBAC), the admin console recognizes if the preflight checks failed due to insufficient privileges.

      When this occurs, a kubectl preflight command displays that lets you manually run the preflight checks. The results are then automatically uploaded to the admin console.

  After preflight checks are complete, Replicated deploys the admin console and the application, and the admin console dashboard opens:

  ![Graphs on the admin console dashboard](/images/kotsadm-dashboard-graph.png)     

1. (Recommended) Change the admin console login password:
   1. Click the menu in the top right corner of the admin console, then click **Change password**.
   1. Enter a new password in the dialog, and click **Change Password** to save.

   Replicated strongly recommends that you change the password from the default provided during installation on a Kubernetes installer provisioned cluster. For more information, see [Changing an Admin Console Password](auth-changing-passwords).

1. (Kubernetes Installer Cluster Only) Add primary and secondary nodes to the cluster. You might add nodes to either meet application requirements defined by the vendor or to support your usage of the application. See [Adding Nodes to Kubernetes Installer Clusters](cluster-management-add-nodes).
   :::note
   Reach out to your application vendor for information about any node requirements.
   :::
1. (Existing Cluster Only) Configure application and cluster monitoring. This allows you to view graphs on the admin console dashboard with key metrics collected by Prometheus. See [Monitoring Applications](monitoring-applications).
