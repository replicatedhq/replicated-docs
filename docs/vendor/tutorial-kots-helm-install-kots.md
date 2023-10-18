# Step 6: Install the Release with KOTS

Next, get the installation command from the Unstable channel in the vendor portal and then install the release with KOTS, using the customer license that you downloaded.

KOTS is a kubectl plugin that automates installations to on-prem, online, or air gap environments, making it quick and easy for your users to install with minimal Kubernetes expertise.

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

  When the admin console is ready, the command prints the URL where you can access the admin console. At this point, KOTS is installed and the admin console is running, but the application is not yet deployed.

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

   The admin console dashboard opens. The application status displays as Unavailable while the `gitea` Deployment is being created:

   ![Admin console dashboard](/images/tutorial-gitea-unavailable.png)

   [View a larger version of this image](/images/tutorial-gitea-unavailable.png)

1. While waiting for the `gitea` Deployment to be created, do the following:

   1. On the command line, press Ctrl+C to exit the port forward.

   1. Watch for the `gitea` Deployment to become ready:

      ```
      kubectl get deploy gitea -n gitea-example --watch
      ```

   1. After the `gitea` Deployment is ready, confirm that the `gitea` LoadBalancer service has an external IP available:

      ```
      kubectl get svc gitea -n gitea-example
      ```

   1. Start the port foward again to access the admin console:

      ```
      kubectl kots admin-console --namespace gitea-example 
      ```

   1. Go to `http://localhost:8800`.   

1. On the admin console dashboard, the application status is displayed as Ready. You can now click **Open App** to view the Gitea application in a browser:

   <img alt="Gitea application webpage" src="/images/gitea-app.png" width="500px"/>

   [View a larger version of this image](/images/gitea-app.png)

1. In another browser window, log in to the vendor portal and go to **Customers**. Select the customer that you created.

  On the **Reporting** page for the customer, you can see details about the customer, including the customer's license details and information about the customer's installed instances:

  ![Customer instance reporting](/images/tutorial-gitea-customer-reporting.png)

  [View a larger version of this image](/images/tutorial-gitea-customer-reporting.png)

1. On the **Reporting** page, under **Instances**, click on the instance that you just installed to open the instance details page. On the instance details page, you can review additional insights such as details about the cluster where the application is installed, the version of KOTS running in the cluster, and instance status and uptime.

1. Uninstall the Gitea application from your cluster:

  ```
  kubectl kots remove gitea-example --namespace gitea-example --undeploy
  ```
  **Example output**:
  ```
   • Removing application gitea-example reference from Admin Console and deleting associated resources from the cluster ✓
   • Application gitea-example has been removed
  ```

## Next Step

Install the same release with the Helm CLI. See [Install the Release with the Helm CLI](tutorial-kots-helm-install-helm).

## Related Topics

* [kots install](/reference/kots-cli-install/)
* [Installing the kots CLI](/reference/kots-cli-getting-started/)
* [Customer Reporting](customer-reporting)
* [Instance Details](instance-insights-details)
