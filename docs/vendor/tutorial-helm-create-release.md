# Step 3: Add the Helm Chart to a Release

To create a release with the Helm chart:

1. In the vendor portal, click **Releases > Create release**.

    :::note
    If a drop down is displayed, click **Create Helm-only release**.
    :::

1. In the **Upload Helm chart** dialog, drag and drop the Helm chart `.tgz` package. Click **Upload chart**.
    
    ![Upload Helm chart dialog](/images/upload-helm-chart-modal.png)
    
    [View a larger image](/images/upload-helm-chart-modal.png)

1. On the release page, click **Promote**.

1. In the dialog, For **Which channels you would like to promote this release to?** select **Unstable**. Unstable is a default channel that is intended for use with internal testing.

    <img alt="Promote release dialog" src= "/images/release-promote.png" width="500px"/>

    [View a larger image](/images/release-promote.png)

1. Click **Promote**.

    :::note
    You can ignore any error messages in the **Promote Release** dialog.
    :::