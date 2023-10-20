# Step 6: Install the Release with KOTS

Next, get the KOTS installation command from the Unstable channel in the vendor portal and then install the release using the customer license that you downloaded.

To install the release with KOTS:

1. In the [vendor portal](https://vendor.replicated.com), go to **Channels**. From the **Unstable** channel card, under **Install**, copy the **KOTS Install** command.

  ![KOTS Install tab on the Unstable channel card](/images/helm-tutorial-unstable-kots-install-command.png)

  [View a larger version of this image](/images/helm-tutorial-unstable-kots-install-command.png)

1. On the command line, run the **KOTS Install** command that you copied.

  ```bash
  curl https://kots.io/install | bash
  kubectl kots install gitea-example/unstable
  ```

  This installs the latest version of the kots CLI and the Replicated admin console. The admin console provides a user interface where you can upload the customer license file and deploy the application.

  For additional kots CLI installation options, including how to install without root access, see [Installing the kots CLI](/reference/kots-cli-getting-started).

1. Complete the installation command prompts:

   1. For `Enter the namespace to deploy to`, enter `gitea-example`. 

   1. For `Enter a new password to be used for the Admin Console`, provide a password to access the admin console.

  When the admin console is ready, the command prints the URL where you can access the admin console. At this point, the kots CLI is installed and the admin console is running, but the application is not yet deployed.

  **Example output:**

  ```bash
  Enter the namespace to deploy to: gitea-example
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

   The admin console dashboard opens. The application status changes from Missing to Unavailable while the `gitea` Deployment is being created:

   ![Admin console dashboard](/images/tutorial-gitea-unavailable.png)

   [View a larger version of this image](/images/tutorial-gitea-unavailable.png)

1. While waiting for the `gitea` Deployment to be created, do the following:

   1. On the command line, press Ctrl+C to exit the port forward.

   1. Watch for the `gitea` Deployment to become ready:

      ```
      kubectl get deploy gitea --namespace gitea-example --watch
      ```

   1. After the `gitea` Deployment is ready, confirm that an external IP for the `gitea` LoadBalancer service is available:

      ```
      kubectl get svc gitea --namespace gitea-example
      ```

   1. Start the port foward again to access the admin console:

      ```
      kubectl kots admin-console --namespace gitea-example 
      ```

   1. Go to `http://localhost:8800` to open the admin console.   

1. On the admin console dashboard, the application status is now displayed as Ready and you can click **Open App** to view the Gitea application in a browser:

   ![Admin console dashboard showing ready status](/images/tutorial-gitea-ready.png)

   [View a larger version of this image](/images/tutorial-gitea-ready.png)

1. In another browser window, open the [vendor portal](https://vendor.replicated.com/) and go to **Customers**. Select the customer that you created.

  On the **Reporting** page for the customer, you can see details about the customer's license and installed instances:

  ![Customer reporting page](/images/tutorial-gitea-customer-reporting.png)

  [View a larger version of this image](/images/tutorial-gitea-customer-reporting.png)

1. On the **Reporting** page, under **Instances**, click on the instance that you just installed to open the instance details page.

  On the instance details page, you can see additional insights such as the cluster where the application is installed, the version of KOTS running in the cluster, instance status and uptime, and more:

  ![Customer instance details page](/images/tutorial-gitea-instance-insights.png)

  [View a larger version of this image](/images/tutorial-gitea-instance-insights.png)

1. Uninstall the Gitea application from your cluster so that you can install the same release again using the Helm CLI:

  ```
  kubectl kots remove gitea-example --namespace gitea-example --undeploy
  ```
  **Example output**:
  ```
   • Removing application gitea-example reference from Admin Console and deleting associated resources from the cluster ✓
   • Application gitea-example has been removed
  ```

## Next Step

Install the same release with the Helm CLI. See [Step 7: Install the Release with the Helm CLI](tutorial-kots-helm-install-helm).

## Related Topics

* [kots install](/reference/kots-cli-install/)
* [Installing the kots CLI](/reference/kots-cli-getting-started/)
* [Deleting the Admin Console and Removing Applications](/enterprise/delete-admin-console)
* [Customer Reporting](customer-reporting)
* [Instance Details](instance-insights-details)
