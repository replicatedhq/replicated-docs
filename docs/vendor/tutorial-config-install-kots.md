# Step 6: Install the Release with KOTS

Next, get the KOTS installation command from the Unstable channel in the Vendor Portal and then install the release using the customer license that you downloaded.

As part of installation, you will set Grafana login credentials on the KOTS Admin Console configuration page.

To install the release with KOTS:

1. In the [Vendor Portal](https://vendor.replicated.com), go to **Channels**. From the **Unstable** channel card, under **Install**, copy the **KOTS Install** command.

    ![KOTS Install tab on the Unstable channel card](/images/grafana-unstable-channel.png)

    [View a larger version of this image](/images/grafana-unstable-channel.png)

1. On the command line, run the **KOTS Install** command that you copied:

    ```bash
    curl https://kots.io/install | bash
    kubectl kots install $REPLICATED_APP/unstable
    ```

    This installs the latest version of the KOTS CLI and the  Admin Console. The Admin Console provides a user interface where you can upload the customer license file and deploy the application.

    For additional KOTS CLI installation options, including how to install without root access, see [Installing the KOTS CLI](/reference/kots-cli-getting-started).

    :::note
    KOTS v1.104.0 or later is required to deploy the Replicated SDK. You can verify the version of KOTS installed with `kubectl kots version`.
    :::

1. Complete the installation command prompts:

    1. For `Enter the namespace to deploy to`, enter `grafana`. 

    1. For `Enter a new password to be used for the Admin Console`, provide a password to access the Admin Console.

   When the Admin Console is ready, the command prints the URL where you can access the Admin Console. At this point, the KOTS CLI is installed and the Admin Console is running, but the application is not yet deployed.

   **Example output:**

   ```bash
   Enter the namespace to deploy to: grafana
   • Deploying Admin Console
     • Creating namespace ✓
     • Waiting for datastore to be ready ✓
   Enter a new password for the Admin Console (6+ characters): ••••••••
   • Waiting for Admin Console to be ready ✓
 
   • Press Ctrl+C to exit
   • Go to http://localhost:8800 to access the Admin Console
   ```

1. With the port forward running, go to `http://localhost:8800` in a browser to access the Admin Console.

1. On the login page, enter the password that you created for the Admin Console.

1. On the license page, select the license file that you downloaded previously and click **Upload license**.

1. On the **Configure Grafana** page, enter a username and password. You will use these credentials to log in to Grafana.

     ![Admin Console config page with username and password fields](/images/grafana-config.png)

     [View a larger version of this image](/images/grafana-config.png)

1. Click **Continue**.

     The Admin Console dashboard opens. The application status changes from Missing to Unavailable while the `grafana` Deployment is being created.

     ![Admin Console dashboard showing unavailable application status](/images/grafana-unavailable.png)

     [View a larger version of this image](/images/grafana-unavailable.png)

1. On the command line, press Ctrl+C to exit the port forward.

1. Watch for the `grafana` Deployment to become ready:

    ```
    kubectl get deploy grafana --namespace grafana --watch
    ```

1. After the Deployment is ready, run the following command to confirm that the `grafana-admin` Secret was updated with the new password that you created on the **Configure Grafana** page:

   ```
   echo "Password: $(kubectl get secret grafana-admin --namespace grafana -o jsonpath="{.data.GF_SECURITY_ADMIN_PASSWORD}" | base64 -d)"
   ```

   The ouput of this command displays the password that you created.

1. Start the port foward again to access the Admin Console:

   ```
   kubectl kots admin-console --namespace grafana 
   ```

1. Go to `http://localhost:8800` to open the Admin Console.   

   On the Admin Console dashboard, the application status is now displayed as Ready:

   ![Admin console dashboard showing ready application status](/images/grafana-ready.png)

   [View a larger version of this image](/images/grafana-ready.png)

1. Click **Open App** to open the Grafana login page in a browser.

   <img alt="Grafana login webpage" src="/images/grafana-login.png" width="300px"/>

   [View a larger version of this image](/images/grafana-login.png)

1. On the Grafana login page, enter the username and password that you created on the **Configure Grafana** page. Confirm that you can log in to the application to access the Grafana dashboard:

   <img alt="Grafana dashboard" src="/images/grafana-dashboard.png" width="500px"/>

   [View a larger version of this image](/images/grafana-dashboard.png)

1. On the command line, press Ctrl+C to exit the port forward. 

1. Uninstall the Grafana application from your cluster:

    ```bash
    kubectl kots remove $REPLICATED_APP --namespace grafana --undeploy
    ```
    **Example output**:
    ```
     • Removing application grafana-python reference from Admin Console and deleting associated resources from the cluster ✓
     • Application grafana-python has been removed
    ```

1. Remove the Admin Console from the cluster:  

   1. Delete the namespace where the Admin Console is installed:

      ```
      kubectl delete namespace grafana
      ```
   1. Delete the Admin Console ClusterRole and ClusterRoleBinding:  

      ```
      kubectl delete clusterrole kotsadm-role
      ```
      ```
      kubectl delete clusterrolebinding kotsadm-rolebinding
      ```

## Next Step

Congratulations! As part of this tutorial, you used the KOTS Config custom resource to define a configuration page in the Admin Console. You also used the KOTS HelmChart custom resource and KOTS ConfigOption template function to override the default Grafana login credentials with a user-supplied username and password.

To learn more about how to customize the Config custom resource to create configuration fields for your application, see [Config](/reference/custom-resource-config).

## Related Topics

* [kots install](/reference/kots-cli-install/)
* [Installing the KOTS CLI](/reference/kots-cli-getting-started/)
* [Installing an Application](/enterprise/installing-overview)
* [Deleting the Admin Console and Removing Applications](/enterprise/delete-admin-console)
