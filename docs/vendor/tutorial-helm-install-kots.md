# Step 8: Install the Release with KOTS

After you add and configure the HelmChart custom resource, install the release with Replicated KOTS. Using the kots CLI, you will install KOTS and the sample application in your cluster.

KOTS is an installer that allows your users to install, manage, and upgrade your application. Users can interact with KOTS through the admin console or through the kots CLI.

To install KOTS and the application:

1. Before you attempt to install the application with KOTS, uninstall the Helm chart using the Helm CLI. 

1. In the vendor portal, go to **Customers**. Click on the customer that you created previously and download the license file. KOTS requires the license file for authentication in order to install the application.

1. In the vendor portal, go to **Channels**. From the Unstable channel, copy the **KOTS Install** command.

  ![Installation Methods](/images/guides/kots/installation-methods-existing.png)

  The script installs the latest KOTS version as a `kubectl` plugin. For more information about installing an application with the kots CLI, see [install](../reference/kots-cli-install/) in the kots CLI documentation.

  **Example:**

  ```bash
  curl https://kots.io/install | bash
  kubectl kots install my-test-app/unstable
  ```

1. For `Enter installation path (leave blank for /usr/local/bin):`, use the default and press **Enter**.

1. For `Enter a new password to be used for the Admin Console:`, provide a password to access the admin console. You use this password in a later step to access the admin console and deploy the application.

  When the admin console is ready, the script prints the https://localhost:8800 URL where you can access the admin console.

  **Example output:**

  ```bash
  Enter the namespace to deploy to: my-app-unstable
    • Deploying Admin Console
      • Creating namespace ✓
      • Waiting for datastore to be ready ✓
  Enter a new password to be used for the Admin Console: ••••••••
    • Waiting for Admin Console to be ready ✓

    • Press Ctrl+C to exit
    • Go to http://localhost:8800 to access the Admin Console
  ```

1. Verify that the Pods are running for the example NGNIX service and for kotsadm:

  ```bash
  kubectl get pods --namespace NAMESPACE
  ```

  Replace `NAMESPACE` with the namespace where KOTS and application was installed.

  **Example output:**

  ```NAME                       READY   STATUS    RESTARTS   AGE
  kotsadm-7ccc8586b8-n7vf6   1/1     Running   0          12m
  kotsadm-minio-0            1/1     Running   0          17m
  kotsadm-rqlite-0           1/1     Running   0          17m
  nginx-688f4b5d44-8s5v7     1/1     Running   0          11m
  ```

  After you run the installation script from the previous step, the admin console is running, but the application is not deployed yet.

1. In a browser, enter the URL `http://localhost:8800` and the password from the output of the installation command.

1. On the **Upload license** page, select the customer license file. Click **Upload license**.

   The admin console dashboard opens.

  ![Cluster](/images/guides/kots/application-tutorial-ui.png)

  On the **Dashboard** tab, users can take various actions, including viewing the application status, opening the application, checking for application updates, syncing their license, and setting up application monitoring on the cluster with Prometheus.

1. Click **Open App** to view the application in your browser.

  ![Open App](/images/guides/kots/open-app.png)

  Notice that the text that you entered previously on the Configure App Name page is displayed on the application screen.

1. In your cluster, press **Ctrl + C** to exit the admin console.

1. Run the following command to reload your shell so that you can access the cluster with kubectl:

  ```bash
    bash -l
    ```
1. Run the following command to see the example NGINX service that you just deployed:

  ```bash
  kubectl get pods --namespace NAMESPACE_NAME
  ```
  Replace `NAMESPACE_NAME` with the namespace where the application and admin console are deployed. Typically this value is `default`.

  **Example output:**

  ```
    NAME                                 READY   STATUS    RESTARTS   AGE
    kotsadm-7595595bf5-pmlng   1/1     Running   0          21m
    kotsadm-minio-0            1/1     Running   0          22m
    kotsadm-rqlite-0           1/1     Running   0          22m
    nginx-667f4fc76b-8gvr9     1/1     Running   0          17m
    ```

1. (Optional) Run the following command to start the console again:

  ```bash
  kubectl kots admin-console --namespace NAMESPACE_NAME
  ```

  Replace `NAMESPACE_NAME` with the namespace where the application and admin console are deployed. Typically this value is `default`.

  If you are using a VM that is behind a firewall and you get an error message, you might need to create a firewall rule to enable access to port 8800. For more information, see [Installation Requirements](/enterprise/installing-general-requirements).

1. Under **Customers** in the vendor portal, select the customer name to open the **Reporting** page. In the **Instances** pane, you can verify that the instance is active and drill down from the details area to see the **Instance details** page. For more information, see [Customer Reporting](customer-reporting) and [Instance Details](instance-insights-details).

  ![Customer instance reporting](/images/customer-instances-tutorial.png)

  [View a larger version of this image](/images/customer-instances-tutorial.png)

## Related Topic

## Next Step