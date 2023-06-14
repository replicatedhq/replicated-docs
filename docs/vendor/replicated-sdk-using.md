import Beta from "../partials/replicated-sdk/_beta.mdx"

# Deploying the Replicated SDK With Your Application

This topic describes how to begin using the Replicated SDK by declaring the SDK as a dependency in your application Helm chart, then promoting a new release with your Helm chart in the Replicated vendor portal. 

<Beta/>

## Prerequisite

Before you begin using the Replicated SDK, add the following labels on all resources deployed as part of your Helm chart:

```yaml
labels:
  app.kubernetes.io/instance: {{ .Release.Name }}
  app.kubernetes.io/managed-by: {{ .Release.Service}}
  app.kubernetes.io/name: {{ .Chart.Name }}
``` 

These are standard Helm labels that enable the Replicated SDK to report the status of installed instances of your application to the vendor portal so that you can view insights on instances running in customer environments. For more information about viewing insights and telemetry in the vendor portal when you distribute with the SDK, see [Customer Reporting and Instance Insights](replicated-sdk-overview#insights) in _About the Replicated SDK_.

## Declare the SDK as a Dependency

You can distribute the Replicated SDK with your application by declaring it as a dependency in your application Helm chart `Chart.yaml` file.

Replicated recommends that your application is installed as a single chart that includes all necessary charts as dependencies. However, if your application is installed as multiple charts, declare the SDK as a dependency of the chart that customers install first.

To declare the Replicated SDK as a dependency:

1. Edit your Helm chart’s `Chart.yaml` file to add the following dependency:

   ```yaml
   # Chart.yaml
   dependencies:
   - name: replicated
     repository: oci://registry.replicated.com/library
     version: 0.0.1-alpha.15
   ```
   For the latest version information for the Replicated SDK, see **LINK**.

1. From your local directory where the `Chart.yaml` file is saved, run the following command to update the chart’s dependencies:

   ```bash
   helm dependency update
   ```

1. Package the chart:

   ```bash
   helm package .
   ```

   The output of this command is a `.tgz` file.

Continue to [Add Your Helm Chart to a Release](#release) below to add the `.tgz` file to a release in the vendor portal.   

## Add Your Helm Chart to a Release {#release}   

After you package your Helm chart with the Replicated SDK as a dependency, you can add the `.tgz` file to a release in the vendor portal. When you promote the release to a channel, the vendor portal automatically pushes your Helm chart to the Replicated registry where your customers can then pull the chart. For more information, see [How the SDK Runs in a Customer Environment](#about-sdk-initialize).

The following steps demonstrate how to create and promote a release using the vendor portal. You can also create and promote releases with the replicated CLI. For more information, see [Managing Releases with the CLI](releases-creating-cli).

To create and promote a release with your Helm chart in the vendor portal:

1. In the vendor portal, go to **Releases** > **Create a release**.

1. Do one of the following to add your Helm chart to the release:

   * In the **Upload Helm chart** modal, upload your Helm chart `.tgz` file.
     
     ![upload helm chart modal](/images/upload-helm-chart-modal.png)
     [View a larger version of this image](/images/upload-helm-chart-modal.png)
     
   * If the **Upload Helm chart** modal does not appear, drag and drop your Helm chart `.tgz` file from your local directory into the file tree.

   Your Helm chart files appear in the file tree of the release.

   ![wordpress helm chart files in the vendor portal release file tree](/images/helm-chart-file-tree.png)
   [View a larger version of this image](/images/helm-chart-file-tree.png)

1. If you are prompted to select a Helm install method, click **OK**. This option is relevant only for releases distributed with KOTS.

1. Click **Save Release** then click **Promote**. In the **Promote Release** dialog, edit the following fields:
   1. For **Channel**, select the channel that your team uses for development. If you are not sure which channel to use, use the default Unstable channel.
   1. (Optional) For **Release notes**, add release notes to describe the updates in this release.

After the release is promoted, the vendor portal automatically pushes your Helm chart to the Replicated registry. For information about how to install the release in a development environment with Helm, see [Installing an Application and the SDK](replicated-sdk-installing). 