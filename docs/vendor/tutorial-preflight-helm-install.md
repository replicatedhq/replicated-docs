# Step 5: Run Preflights and Install

Next, use the Helm installation instructions provided for the customer that you created to run preflight checks and install.

The purpose of this step is to demonstrate how enterprise users can authenticate with the Replicated registry to run preflight checks defined in a Helm chart before installing.

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

   You will use the instructions provided in the **Helm install instructions** dialog to install the chart.

1. Run the first command in the provided in the **Helm install instructions** dialog to log in to the registry.

1. Run the first command to install the preflight kubectl plugin.

1. Run the third command to run preflight checks.

   Check the ouput of the preflight command to see that your cluster's version of Kubernetes meets the requirements.

1. Run the fourth command to install the application.

1. Uninstall the Helm chart:

   ```
   helm uninstall gitea --namespace gitea
   ```
   This command removes all the Kubernetes components associated with the chart and uninstalls the `gitea` release.

1. Delete the namespace:

   ```
   kubectl delete namespace gitea
   ```