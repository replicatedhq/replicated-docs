# (Optional) Step 6: Run Preflight Checks and Install with KOTS

Optionally, install the same release with KOTS to see how preflight checks are embedded into the KOTS installation experience.

To install with KOTS:

1. In the [vendor portal](https://vendor.replicated.com), go to the **Customers** page.

1. For the customer that you created, for **License options**, verify that **KOTS Install Enabled** is enabled. This is the entitlement that allows the customer to install with KOTS.

1. Go to **Channels**. From the **Unstable** channel card, under **Install**, copy the **KOTS Install** command.

  ![KOTS Install tab on the Unstable channel card](/images/helm-tutorial-unstable-kots-install-command.png)

  [View a larger version of this image](/images/helm-tutorial-unstable-kots-install-command.png)

1. On the command line, run the **KOTS Install** command that you copied:

  ```bash
  curl https://kots.io/install | bash
  kubectl kots install $REPLICATED_APP/unstable
  ```

  This installs the latest version of the kots CLI and the Replicated admin console. The admin console provides a user interface where you can upload the customer license file and deploy the application.

  For additional kots CLI installation options, including how to install without root access, see [Installing the kots CLI](/reference/kots-cli-getting-started).

  :::note
  <KotsVerReq/>
  :::

1. Complete the installation command prompts:

   1. For `Enter the namespace to deploy to`, enter `gitea`. 

   1. For `Enter a new password to be used for the Admin Console`, provide a password to access the admin console.

  When the admin console is ready, the command prints the URL where you can access the admin console. At this point, the kots CLI is installed and the admin console is running, but the application is not yet deployed.

  **Example output:**

  ```bash
  Enter the namespace to deploy to: gitea
  • Deploying Admin Console
    • Creating namespace ✓
    • Waiting for datastore to be ready ✓
  Enter a new password for the admin console (6+ characters): ••••••••
  • Waiting for Admin Console to be ready ✓

  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console
  ```

1. With the port forward running, in a browser, go to `http://localhost:8800` to access the admin console.

1. On the login page, enter the password that you created.

1. On the license page, select the license file that you downloaded previously and click **Upload license**.

  Preflight checks run automatically.

1. When the preflight checks finish, click **Deploy** to deploy the application.

   The admin console dashboard opens. The application status changes from Missing to Unavailable while the `gitea` Deployment is being created:

   ![Admin console dashboard](/images/tutorial-gitea-unavailable.png)

   [View a larger version of this image](/images/tutorial-gitea-unavailable.png)

1. (Optional) After the application is in a Ready status, click **Open App** to view the Gitea application in a browser:

   ![Admin console dashboard showing ready status](/images/tutorial-gitea-ready.png)

   [View a larger version of this image](/images/tutorial-gitea-ready.png) 

1. Uninstall the Gitea application from your cluster so that you can install the same release again using the Helm CLI:

  ```bash
  kubectl kots remove $REPLICATED_APP --namespace gitea --undeploy
  ```
  **Example output**:
  ```
   • Removing application gitea-boxer reference from Admin Console and deleting associated resources from the cluster ✓
   • Application gitea-boxer has been removed
  ```

1. Remove the admin console from the cluster:  

   1. Delete the namespace where the admin console is installed:

      ```
      kubectl delete namespace gitea
      ```
   1. Delete the admin console ClusterRole and ClusterRoleBinding:  

      ```
      kubectl delete clusterrole kotsadm-role
      ```
      ```
      kubectl delete clusterrolebinding kotsadm-rolebinding
      ```     