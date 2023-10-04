# Step 7: Install the Release with the Helm CLI

To install the release:

1. On the **Customers** page for the customer that you created, click **Helm install instructions**.

    ![Helm install instructions button](/images/helm-install-button.png)

    [View a larger image](/images/helm-install-button.png)

1. Run the commands in the **Helm install instructions** dialog to log in to the registry and install the Helm chart. Skip the step to run preflight checks.

    <img alt="Helm install instructions dialog" src="/images/helm-install-instructions-no-preflights.png" width="500px"/>
    
    [View a larger image](/images/helm-install-instructions-no-preflights.png)

    :::note
    Ignore the **No preflight checks found** warning, if one is displayed in the dialog. This warning appears because there are no specifications for preflight checks in the Helm chart archive. You will add preflight checks later in the onboarding process.
    ::: 

1. After you install, in the vendor portal, go to **Customers**. Under the name of the customer, confirm that you can see an active instance.

    **Example**: 

    ![Customers page with one customer that has an active isntance](/images/onboarding-view-telemetry.png)
    [View a larger image](/images/onboarding-view-telemetry.png)

    This instance telemetry is automatically collected and sent back to the vendor portal when the Replicated SDK is installed alongside the application. For more information, see [Customer Reporting and Instance Insights](/vendor/replicated-sdk-overview#insights) in _About the Replicated SDK_.

1. Under **Instance ID**, click on the ID to view additional insights including the versions of Kubernetes and the Replicated SDK running in the cluster where you installed the application. For more information, see [Instance Details](/vendor/instance-insights-details).

## Related Topics

## Next Step