# Create a New Release and Update

Create a new release in the vendor portal and then upgrade the instance in the cluster:

1. Make a small change in the chart, such as incrementing the semantic version in the `Chart.yaml` to a new version. Then, package the chart again.

1. In the vendor portal, create a new release (**Releases > Create release**). Drag and drop the new chart `.tgz` and then promote the new release to the Unstable channel. 

1. In your cluster, run `helm upgrade` to upgrade the instance to the new release that you just promoted. The `helm upgrade` command is  the same as the command you used for `helm install` in a previous step, replacing `install` with `upgrade`.

    **Example**:

    ```
    helm upgrade wordpress oci://registry.replicated.com/my-app/unstable/wordpress
    ```

    See [Helm Upgrade](https://helm.sh/docs/helm/helm_upgrade/) in the Helm documentation.

1. After the upgrade completes, return to the **Instance details** page in the vendor portal and confirm that you can see the new application version.

    **Example**:

    ![Instance details page](/images/onboarding-instance-details-new-version.png)

    [View a larger version](/images/onboarding-instance-details-new-version.png)

## Related Topics

## Next Step