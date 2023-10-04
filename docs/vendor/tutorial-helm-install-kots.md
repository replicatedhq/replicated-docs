# Step 6: Install the Release with KOTS

Get the installation command from the Unstable channel and then install the release with KOTS, using the customer license that you downloaded.

KOTS is a kubectl plugin that automates installations to on-prem, online, or air gap environments, making it quick and easy for your users to install with minimal Kubernetes expertise.

To install the release with KOTS:

1. In the [vendor portal](https://vendor.replicated.com), go to **Channels**. From the **Unstable** channel card, under **Install**, copy the **KOTS Install** command.

  ![KOTS Install tab on the Unstable channel card](/images/helm-tutorial-unstable-kots-install-command.png)

  [View a larger version of this image](/images/helm-tutorial-unstable-kots-install-command.png)

1. On the command line, run the **KOTS Install** command that you copied.

  **Example:**

  ```bash
  curl https://kots.io/install | bash
  kubectl kots install example-nginx-app/unstable
  ```

  This installs the latest version of KOTS and the Replicated admin console. The admin console provides a user interface where you can upload the customer license file and deploy the application.

  :::note
  By default, the command installs KOTS in the `/user/local/bin` directory. If you do not have root access or cannot write to the `/user/local/bin` directory, you can use the `REPL_USE_SUDO=y` environment variable to install with sudo. For example:

  ```
  curl https://kots.io/install | REPL_USE_SUDO=y bash
  kubectl kots install example-nginx-app/unstable
  ```
  For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).
  :::

1. Complete the prompts in the installation command to choose the installation directory and namespace for KOTS. 

1. For `Enter a new password to be used for the Admin Console:`, provide a password to access the admin console. You use this password in a later step to access the admin console and deploy the application.

  When the admin console is ready, the script prints the URL where you can access the admin console. At this point, KOTS is installed and the admin console is running, but the application is not yet deployed.

  **Example:**

  ```bash
  Enter the namespace to deploy to: example-nginx-app
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

1. On the configuration page, click **Continue**.

1. After the preflight checks complete, click **Deploy**.

   The admin console dashboard opens.

   On the admin console dashboard, users can take various actions, including viewing the application status, opening the application, checking for application updates, syncing their license, and setting up application monitoring on the cluster with Prometheus.

1. Click **Open App** to view the application in your browser.

  ![Open App](/images/guides/kots/open-app.png)

1. Under **Customers** in the vendor portal, select the customer name to open the **Reporting** page. In the **Instances** pane, you can verify that the instance is active and drill down from the details area to see the **Instance details** page. For more information, see [Customer Reporting](customer-reporting) and [Instance Details](instance-insights-details).

  ![Customer instance reporting](/images/customer-instances-tutorial.png)

  [View a larger version of this image](/images/customer-instances-tutorial.png)

1. Uninstall the application and the admin console:

  ```
  kubectl kots remove example-nginx-app --namespace example-nginx-app --undeploy
  ```
  
   • Removing application example-nginx-app reference from Admin Console and deleting associated resources from the cluster ✓
   • Application example-nginx-app has been removed

## Next Step

Install the same release with the Helm CLI.

## Related Topics

* [kots install](/reference/kots-cli-install/)