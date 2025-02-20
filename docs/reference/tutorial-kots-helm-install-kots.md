import KotsVerReq from "../partials/replicated-sdk/_kots-version-req.mdx"

# Step 6: Install the Release with KOTS

Next, get the KOTS installation command from the Unstable channel in the Vendor Portal and then install the release using the customer license that you downloaded.

To install the release with KOTS:

1. In the [Vendor Portal](https://vendor.replicated.com), go to **Channels**. From the **Unstable** channel card, under **Install**, copy the **KOTS Install** command.

    ![KOTS Install tab on the Unstable channel card](/images/helm-tutorial-unstable-kots-install-command.png)

    [View a larger version of this image](/images/helm-tutorial-unstable-kots-install-command.png)

1. On the command line, run the **KOTS Install** command that you copied:

    ```bash
    curl https://kots.io/install | bash
    kubectl kots install $REPLICATED_APP/unstable
    ```

    This installs the latest version of the KOTS CLI and the Replicated KOTS Admin Console. The Admin Console provides a user interface where you can upload the customer license file and deploy the application.

    For additional KOTS CLI installation options, including how to install without root access, see [Installing the KOTS CLI](/reference/kots-cli-getting-started).

    :::note
    <KotsVerReq/>
    :::

1. Complete the installation command prompts:

    1. For `Enter the namespace to deploy to`, enter `gitea`. 

    1. For `Enter a new password to be used for the Admin Console`, provide a password to access the Admin Console.

    When the Admin Console is ready, the command prints the URL where you can access the Admin Console. At this point, the KOTS CLI is installed and the Admin Console is running, but the application is not yet deployed.

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

1. With the port forward running, in a browser, go to `http://localhost:8800` to access the Admin Console.

1. On the login page, enter the password that you created.

1. On the license page, select the license file that you downloaded previously and click **Upload license**.

    The Admin Console dashboard opens. The application status changes from Missing to Unavailable while the `gitea` Deployment is being created:

    ![Admin console dashboard](/images/tutorial-gitea-unavailable.png)

    [View a larger version of this image](/images/tutorial-gitea-unavailable.png)

1. While waiting for the `gitea` Deployment to be created, do the following:

   1. On the command line, press Ctrl+C to exit the port forward.

   1. Watch for the `gitea` Deployment to become ready:

       ```
       kubectl get deploy gitea --namespace gitea --watch
       ```

   1. After the `gitea` Deployment is ready, confirm that an external IP for the `gitea` LoadBalancer service is available:

       ```
       kubectl get svc gitea --namespace gitea
       ```

   1. Start the port foward again to access the Admin Console:

       ```
       kubectl kots admin-console --namespace gitea 
       ```

   1. Go to `http://localhost:8800` to open the Admin Console.   

1. On the Admin Console dashboard, the application status is now displayed as Ready and you can click **Open App** to view the Gitea application in a browser:

    ![Admin console dashboard showing ready status](/images/tutorial-gitea-ready.png)

    [View a larger version of this image](/images/tutorial-gitea-ready.png)

1. In another browser window, open the [Vendor Portal](https://vendor.replicated.com/) and go to **Customers**. Select the customer that you created.

    On the **Reporting** page for the customer, you can see details about the customer's license and installed instances:

    ![Customer reporting page](/images/tutorial-gitea-customer-reporting.png)

    [View a larger version of this image](/images/tutorial-gitea-customer-reporting.png)

1. On the **Reporting** page, under **Instances**, click on the instance that you just installed to open the instance details page.

    On the instance details page, you can see additional insights such as the cluster where the application is installed, the version of KOTS running in the cluster, instance status and uptime, and more:

    ![Customer instance details page](/images/tutorial-gitea-instance-insights.png)

    [View a larger version of this image](/images/tutorial-gitea-instance-insights.png)

1. Uninstall the Gitea application from your cluster so that you can install the same release again using the Helm CLI:

    ```bash
    kubectl kots remove $REPLICATED_APP --namespace gitea --undeploy
    ```
    **Example output**:
    ```
     • Removing application gitea-boxer reference from Admin Console and deleting associated resources from the cluster ✓
     • Application gitea-boxer has been removed
    ```

1. Remove the Admin Console from the cluster:  

   1. Delete the namespace where the Admin Console is installed:

      ```
      kubectl delete namespace gitea
      ```
   1. Delete the Admin Console ClusterRole and ClusterRoleBinding:  

      ```
      kubectl delete clusterrole kotsadm-role
      ```
      ```
      kubectl delete clusterrolebinding kotsadm-rolebinding
      ```

## Next Step

Install the same release with the Helm CLI. See [Step 7: Install the Release with the Helm CLI](tutorial-kots-helm-install-helm).

## Related Topics

* [kots install](/reference/kots-cli-install/)
* [Installing the KOTS CLI](/reference/kots-cli-getting-started/)
* [Deleting the Admin Console and Removing Applications](/enterprise/delete-admin-console)
* [Customer Reporting](customer-reporting)
* [Instance Details](instance-insights-details)
