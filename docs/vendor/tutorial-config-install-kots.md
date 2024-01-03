# Step 6: Install the Release with KOTS

Next, get the KOTS installation command from the Unstable channel in the vendor portal and then install the release using the customer license that you downloaded. As part of installation, you will set Grafana login credentials on the admin console configuration page.

To install the release with KOTS:

1. In the [vendor portal](https://vendor.replicated.com), go to **Channels**. From the **Unstable** channel card, under **Install**, copy the **KOTS Install** command.

  ![KOTS Install tab on the Unstable channel card](/images/grafana-unstable-channel.png)

  [View a larger version of this image](/images/grafana-unstable-channel.png)

1. On the command line, run the **KOTS Install** command that you copied:

  ```bash
  curl https://kots.io/install | bash
  kubectl kots install $REPLICATED_APP/unstable
  ```

  This installs the latest version of the kots CLI and the Replicated admin console. The admin console provides a user interface where you can upload the customer license file and deploy the application.

  For additional kots CLI installation options, including how to install without root access, see [Installing the kots CLI](/reference/kots-cli-getting-started).

  :::note
  KOTS v1.104.0 or later is required to deploy the Replicated SDK. You can verify the version of KOTS installed with `kubectl kots version`.
  :::

1. Complete the installation command prompts:

   1. For `Enter the namespace to deploy to`, enter `grafana`. 

   1. For `Enter a new password to be used for the Admin Console`, provide a password to access the admin console.

  When the admin console is ready, the command prints the URL where you can access the admin console. At this point, the kots CLI is installed and the admin console is running, but the application is not yet deployed.

  **Example output:**

  ```bash
  Enter the namespace to deploy to: grafana
  • Deploying Admin Console
    • Creating namespace ✓
    • Waiting for datastore to be ready ✓
  Enter a new password for the admin console (6+ characters): ••••••••
  • Waiting for Admin Console to be ready ✓

  • Press Ctrl+C to exit
  • Go to http://localhost:8800 to access the Admin Console
  ```

1. With the port forward running, in a browser, go to `http://localhost:8800` to access the admin console.

1. On the login page, enter the password that you created for the admin console.

1. On the license page, select the license file that you downloaded previously and click **Upload license**.

1. On the **Configure Grafana** page, enter any username and password. The credentials that you provide are mapped to the Grafana `values.yaml` file so that they can be used to log in to the Grafana application.

   ![admin console config page with username and password fields](/images/grafana-config.png)

   [View a larger version of this image](/images/grafana-config.png)

1. Click **Continue**.

   The admin console dashboard opens. The application status changes from Missing to Unavailable while the `grafana` Deployment is being created.

   ![admin console dashboard showing unavailable application status](/images/grafana-unavailable.png)

   [View a larger version of this image](/images/grafana-unavailable.png)

1. While waiting for the `grafana` Deployment to be created, do the following:

   1. On the command line, press Ctrl+C to exit the port forward.

   1. Watch for the `grafana` Deployment to become ready:

      ```
      kubectl get deploy grafana --namespace grafana --watch
      ```

   1. Start the port foward again to access the admin console:

      ```
      kubectl kots admin-console --namespace grafana 
      ```

   1. Go to `http://localhost:8800` to open the admin console.   

      On the admin console dashboard, the application status is now displayed as Ready:

      ![Admin console dashboard showing ready application status](/images/grafana-ready.png)

      [View a larger version of this image](/images/grafana-ready.png)

1. Click **Open App** to open the Grafana login page in a browser.

   <img alt="Grafana login webpage" src="/images/grafana-login.png" width="300px"/>

   [View a larger version of this image](/images/grafana-login.png)

1. On the Grafana login page, enter the credentials that you created on the **Configure Grafana** page during installation. Confirm that you can log in to the application to access the Grafana dashboard:

   <img alt="Grafana dashboard" src="/images/grafana-dashboard.png" width="500px"/>

   [View a larger version of this image](/images/grafana-dashboard.png)

1. Uninstall the Gitea application from your cluster so that you can install the same release again using the Helm CLI:

  ```bash
  kubectl kots remove $REPLICATED_APP --namespace grafana --undeploy
  ```
  **Example output**:
  ```
   • Removing application grafana-python reference from Admin Console and deleting associated resources from the cluster ✓
   • Application grafana-python has been removed
  ```

1. Remove the admin console from the cluster:  

   1. Delete the namespace where the admin console is installed:

      ```
      kubectl delete namespace grafana
      ```
   1. Delete the admin console ClusterRole and ClusterRoleBinding:  

      ```
      kubectl delete clusterrole kotsadm-role
      ```
      ```
      kubectl delete clusterrolebinding kotsadm-rolebinding
      ```

## Next Step

Congratulations! As part of this tutorial, you used the KOTS Config custom resource to collect a username and password from users. You also used the KOTS HelmChart custom resource and KOTS ConfigOption template function to map the user-supplied credentials to the Grafana `values.yaml` file.

To learn more about how to customize the Config custom resource to create configuration fields for your application, see [Config](/reference/custom-resource-config).

## Related Topics

* [kots install](/reference/kots-cli-install/)
* [Installing the kots CLI](/reference/kots-cli-getting-started/)
* [Deleting the Admin Console and Removing Applications](/enterprise/delete-admin-console)
