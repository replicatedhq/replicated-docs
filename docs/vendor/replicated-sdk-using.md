# Deploying the Replicated SDK with Your Application

This topic describes how to begin using the Replicated SDK by declaring it as a dependency in your application Helm chart, then promoting a new release with your Helm chart in the Replicated vendor portal. 

## Prerequisite

To enable the Replicated SDK to report the status of your application to the vendor portal, add the following labels on resources deployed as part of your Helm chart:

```yaml
labels:
  app.kubernetes.io/instance: {{ .Release.Name }}
  app.kubernetes.io/managed-by: {{ .Release.Service}}
  app.kubernetes.io/name: {{ .Chart.Name }}
``` 

## Declare the SDK as a Dependency

:::note
Replicated recommends that your application is installed as a single chart that includes all necessary charts as dependencies. However, if your application is installed as multiple charts, declare the SDK as a dependency of the chart that customers install first.
:::

To declare the Replicated SDK as a dependency:

1. Edit your Helm chart’s `Chart.yaml` file to add the SDK as a dependency.

   **Example:**

   ```yaml
   # Chart.yaml
   dependencies:
   - name: replicated
     repository: oci://registry.replicated.com/library
     version: 0.0.1-alpha.15
   ```

1. From the directory where the `Chart.yaml` file is saved, run the following command to update the chart’s dependencies:

   ```bash
   helm dependency update
   ```

1. Package the chart:

   ```bash
   helm package .
   ```

   The output of this command is a `.tgz` file.

Continue to [Add Your Helm Chart to a Release](#release) below to create and promote a new release with your Helm chart.   

## Promote a Release with Your Helm Chart {#release}   

After you package the Helm chart with the Replicated SDK as a dependency, you can add the `.tgz` file to a release in the vendor portal. When you promote the release to a channel, the vendor portal automatically pushes your Helm chart to the Replicated registry. 

To create and promote a release in the vendor portal:

1. In the vendor portal, go to **Releases** > **Create a release**.

1. Delete any existing files from the release that the vendor portal created by default. These files are relevant only to applications deployed with Replicated KOTS. Your packaged Helm chart is the only file that you need to include in the release.

1. Add your Helm chart `.tgz` file to the release by dragging and dropping it into the text editor or by clicking **New File** at the bottom of the file tree.

1. If prompted to select a Helm install method, click **OK**. This step is relevant only for applications deployed with KOTS.

1. Click **Save Release** then click **Promote**. In the **Promote Release** dialog, edit the fields:
   1. For **Channel**, select the channel that your team uses for development. If you are not sure which channel to use, use the Unstable channel.
   1. (Optional) For **Version label**, enter a version label for this release.
   1. For **Requirements**, leave **Prevent this release from being skipped during upgrades** disabled. This fields applies only to applications deployed with KOTS.
   1. (Optional) For **Release notes**, add release notes to describe the updates in this release.

After the release is promoted, the vendor portal pushes your Helm chart to the Replicated registry.