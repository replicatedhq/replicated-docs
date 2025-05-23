# Step 5: Run Preflights with the Helm CLI

Use the Helm CLI installation instructions provided for the customer that you created to run the preflight checks for Gitea and install. The purpose of this step is to demonstrate how enterprise users can run preflight checks defined in a Helm chart before installing.

To run preflight checks and install with the Helm CLI:

1. Create a `gitea` namespace for the installation:

   ```
   kubectl create namespace gitea
   ```

1. Update the current kubectl context to target the new `gitea` namespace. This ensures that the chart is installed in the `gitea` namespace without requiring you to set the `--namespace` flag with the `helm install` command:

   ```
   kubectl config set-context --namespace=gitea --current
   ```

1. In the [vendor portal](https://vendor.replicated.com), go to the **Customers** page.

1. On the **Customer details** page for the customer that you created, click **Helm install instructions**.

   ![Helm install instrucitons button](/images/tutorial-gitea-helm-customer-install-button.png)

   [View a larger version of this image](/images/tutorial-gitea-helm-customer-install-button.png)

1. Run the first command in the **Helm install instructions** dialog to log in to the Replicated registry.

1. Run the second command to install the preflight kubectl plugin:

   ```bash
   curl https://krew.sh/preflight | bash
   ```
   The preflight plugin is a client-side utility used to run preflight checks.

1. Run the third command to run preflight checks:

   ```bash
   helm template oci://registry.replicated.com/$REPLICATED_APP/unstable/gitea | kubectl preflight -
   ```
   This command templates the Gitea chart and then pipes the result to the preflight plugin. The following shows an example of the ouput for this command:

   <img alt="Preflight CLI output" src="/images/gitea-preflights-cli.png" width="600px"/>

   [View a larger version of this image](/images/gitea-preflights-cli.png)

1. Run the fourth command listed under **Option 1: Install Gitea** to install the application:

   ```bash
   helm install gitea oci://registry.replicated.com/$REPLICATED_APP/unstable/gitea
   ```   

1. Uninstall and delete the namespace:

   ```bash
   helm uninstall gitea --namespace gitea
   ```
   ```bash
   kubectl delete namespace gitea
   ```

## Next Step

Install the application with KOTS to see how preflight checks are run from the KOTS Admin Console. See [Run Preflights with KOTS](tutorial-preflight-helm-install-kots).

## Related Topics

* [Running Preflight Checks](/vendor/preflight-running)  
* [Installing with Helm](/vendor/install-with-helm)