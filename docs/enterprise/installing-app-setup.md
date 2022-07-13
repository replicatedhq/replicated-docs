# Deploying the Application from the Admin Console

This topic describes how to access the Replicated admin console to complete the application setup and deploy.

## About Setting Up and Deploying the Application from the Admin Console

After you install the admin console and application components on the cluster, the `kots install` kots CLI command opens a port forward to the admin console on port 8800 by default. The admin console is exposed internally in the cluster and can only be accessed using a port forward.

The following example shows the kots CLI output of the `kots install` command:

```shell
$ kubectl kots install application-name
Enter the namespace to deploy to: namespace-name
  • Deploying Admin Console
    • Creating namespace ✓
    • Waiting for datastore to be ready ✓
Enter a new password to be used for the Admin Console: ••••••••
  • Waiting for Admin Console to be ready ✓

  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console

```

To finish installing the application, you log in to the admin console on port 8800, complete the application setup, and deploy the application.

## Prerequisite

This procedure assumes that you have already installed the admin console on either an existing cluster or on a cluster provisioned by the Replicated Kubernetes installer.

For more information, see [Installing on an Existing Cluster](installing-existing-cluster-online) or [Installing with the Kubernetes Installer](installing-embedded-cluster).

## Access the Admin Console and Deploy the Application

To complete application installation in the admin console:

1. If the port forward is active, go to [http://localhost:8800](http://localhost:8800) to access the admin console.

   If you need to reopen the admin console port forward, run the following command:

   ```
   kubectl kots admin-console -n APP_NAMESPACE
   ```
   Replace `APP_NAMESPACE` with the namespace on the cluster where you installed the application.

1. Log in to the admin console using the password that you created when you installed the admin console on the cluster.

1. Upload the YAML license file provided by your application vendor.

1. (Air Gap Only) Upload the `.airgap` air gap bundle provided by your application vendor.

1. If there are configurations specific to the application, complete the fields on the configuration screen. The required and optional configuration fields on this screen are used to build the final deployable Kubernetes manifests for the application.

   If the application vendor did not include any configuration options for the application, this screen is not displayed.

1. Complete the preflight checks. The admin console runs preflight checks (conformance tests) against the target namespace and cluster to ensure that the environment meets the minimum requirements to support the application.

   Do the following to resolve or dismiss any preflight warnings and failures:

   * If you are not prevented from proceeding, you can the dismiss the preflight checks to continue with deployment.
   * If you are prevented from proceeding, resolve the failures, then click **Re-run** to run the preflight checks.
   * If you are installing with minimal role-based access control (RBAC), the admin console recognizes if the preflight checks have failed due to insufficient privileges.

      When this occurs, a kubectl preflight command is displayed that lets you manually run the preflight checks and upload the results.

After the preflight checks are complete, the admin console dashboard opens.
