# Completing Application Setup and Deploying

This topic describes how to access the Replicated admin console to complete the application setup, run preflight checks, and deploy.

## Prerequisite

This procedure assumes that you have already installed the admin console on either an existing cluster or on a cluster provisioned by the Replicated Kubernetes installer.

For more information, see [Installing on an Existing Cluster](installing-existing-cluster-online) or [Installing with the Kubernetes Installer](installing-embedded-cluster).

## Access the Admin Console and Deploy the Application

To complete application setup and deploy from the admin console:

1. Access the admin console on port 8800:
   * **Existing cluster**: If the port forward is active, go to [http://localhost:8800](http://localhost:8800) to access the admin console.

      If you need to reopen the port forward to the admin console, run the following command:

      ```
      kubectl kots admin-console -n APP_NAMESPACE
      ```
      Replace `APP_NAMESPACE` with the namespace on the cluster where you installed the application.

   * **Kubernetes installer cluster**: Go to the address provided in the `Kotsadm` field in the output of the installation command. For example, `Kotsadm: http://34.171.140.123:8800`.

1. (Kubernetes Installer Cluster Only) On the Bypass Browser TLS warning page, review the information about how to bypass the browser TLS warning, and then click **Continue to Setup**.

1. (Kubernetes Installer Cluster Only) On the HTTPS page, upload a private key and SSL certificate to secure communication between your browser and the admin console. Then, click **Upload & continue**. Alternatively, click **Skip & continue** to use the self-signed TLS certificate.

1. Log in to the admin console:
   * **Existing cluster**: Log in with the password that you created during installation.
   * **Kubernetes installer provisioned cluster**: Log in with the password that was provided in the `Login with password (will not be shown again):` field in the output of the installation command.

1. Upload the license file provided by your application vendor.

1. (Air Gap Only) Upload the `.airgap` air gap bundle provided by your application vendor.

1. If there are configurations specific to the application, complete the fields on the configuration screen then click **Continue**. The required and optional configuration fields on this screen are used to build the final deployable Kubernetes manifests for the application.

   If the application vendor did not include any configuration options for the application, this screen is not displayed.

1. Complete the preflight checks. The admin console automatically runs preflight checks (conformance tests) against the target namespace and cluster to ensure that the environment meets the minimum requirements to support the application.

   * If there are no preflight check warnings or failures, continue with deployment.
   * If there are any preflight check warnings and failures:
      * Resolve the warnings and failures, then click **Re-run** to run the preflight checks again.
      * If there are no failures that prevent application deployment, you can choose to dismiss the preflight check warnings to continue.
      * If you are installing with minimal role-based access control (RBAC), the admin console recognizes if the preflight checks have failed due to insufficient privileges.

      When this occurs, a kubectl preflight command displays that lets you manually run the preflight checks. The results are then automatically uploaded to the admin console.

  After preflight checks are complete, Replicated deploys the admin console and the application, and the admin console dashboard opens in the browser.     

1. (Recommended) Change the admin console login password:
   1. Click the menu in the top right corner of the admin console, then click **Change password**.
   1. Enter a new password in the dialog then click **Change Password** to save.

   Replicated strongly recommends that you change the password from the default provided during installation on a Kubernetes installer provisioned cluster. For more information, see [Changing an Admin Console Password](auth-changing-passwords).

## Join Primary and Secondary Nodes

You can generate commands in the admin console to join additional primary and secondary nodes to the cluster. Primary nodes run services that control the cluster. Secondary nodes run services that control the pods that host the application containers. Adding nodes can help manage resources to ensure that your application runs smoothly.

For high availability clusters, Kubernetes recommends using at least 3 primary nodes, and that you use an odd number of nodes to help with leader selection if machine or zone failure occurs. For more information, see [Creating Highly Available Clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/) in the Kubernetes documentation.

To add primary and secondary nodes:

1. (Air gap only) Download and extract the `.tar.gz` bundle on the remote node before running the join command.
1. In the admin console, click **Cluster > Add Node**.
1. Copy the command and run it on the node that you are joining to the cluster.

  **Example:**

  ```
  curl -sSL https://k8s.kurl.sh/my-test-app-unstable/join.sh | sudo bash -s \
  kubernetes-master-address=192.0.2.0:6443 \
  kubeadm-token=8z0hjv.s9wru9z \
  kubeadm-token-ca-hash=sha256:289f5c0d61775edec20d4e980602deeeeeeeeeeeeeeeeffffffffffggggggg \
  docker-registry-ip=198.51.100.3 \
  kubernetes-version=v1.19.16 \
  primary-host=203.0.113.6
  ```
