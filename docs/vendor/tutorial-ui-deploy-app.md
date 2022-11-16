# Step 5: Deploy the Application

After you run the installation script from the previous step, the admin console and Kubernetes are running, but the application is not deployed yet. This is also what your customer will be experiencing when installing your application.

This procedure shows you how to deploy the application by logging into the admin console, uploading the license file that you created as part of [Step 3: Create a Customer](tutorial-ui-create-customer), completing the application configuration settings, and running the preflight checks.

To deploy the application:

1. In a browser, enter the URL `http://localhost:8800` (existing clusters) or `http://[ip-address]:8800` (embedded clusters) and the password from [Step 4: Install the App Manager](tutorial-ui-install-app-manager).

1. (Embedded clusters only) On the Bypass Browser TLS warning page, click **Continue to Setup**.

1. (Embedded clusters only) On the HTTPS page, click **Skip & continue** to use the self-signed TLS certificate and omit the hostname.

1. On the Upload license page, select the customer license YAML file or drag and drop the license file from your desktop. Click **Upload license**.

  The admin console can pull the application YAML and containers now.

1. On the Configure App Name page, select the **Customize Text Inputs** checkbox. In the **Text Example** field, enter any text. For example, `Hello`.

  This page displays configuration settings that are specific to the application. Software vendors define the fields that are displayed on this page in the Config custom resource. For more information, see [Config](/reference/custom-resource-config) in _Reference_.

  There are other example configuration options on this page. Feel free to explore and toggle some of the options. You can see the results of your changes later.

  :::note
  You will customize what appears on this screen in a later step.
  :::

1. Click **Continue**.

  The preflight checks run automatically. In the Results from your preflight checks list, look for the status of the number of nodes in the cluster. It should show the pass or warning messages that you configured earlier, depending on your cluster setup.

  ![Preflight Results](/images/preflight-warning.png)

1. Ignore any preflight warnings and click **Continue**. If there are failing preflight checks, click **Deploy and continue** in the dialog.

  The admin console dashboard opens.

  ![Cluster](/images/guides/kots/application-tutorial-ui.png)

  On the Dashboard tab, users can take various actions, including viewing the application status, opening the application, checking for application updates, syncing their license, and setting up application monitoring on the cluster with Prometheus.

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

1. Run the following command to start the console again:

  ```bash
  kubectl kots admin-console --namespace NAMESPACE_NAME
  ```

  Replace `NAMESPACE_NAME` with the namespace where the application and admin console are deployed. Typically this value is `default`.

  If you are using a VM that is behind a firewall and you get an error message, you might need to create a firewall rule to enable access to port 8800. For more information, see [Installation Requirements](/enterprise/installing-general-requirements).

## Next Step

Continue to [Step 6: Create a New Version](tutorial-ui-create-new-version) to make a change to one of the manifest files and promote a new release.
