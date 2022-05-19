# Adding Helm Charts to a Release

This topic describes how to add a Helm chart to a release in the Replicated vendor portal. Adding a Helm chart to a release is useful if you want to distribute a Kubernetes application with Replicated that is already packaged using Helm.

For more information, see [Helm Overview](helm-overview).

## About Releasing with Helm Charts

You can add one or more Helm charts to a release in the vendor portal by uploading each Helm chart as a `.tgz` package. This allows you to use Replicated to distribute applications that are packaged with Helm.

When you add a Helm chart to a release, Replicated adds a copy of the `Chart.yaml` file and the `values.yaml` file from the Helm chart to the release.

Replicated also automatically creates a HelmChart custom resource manifest file in the release for each Helm chart that you add. You use this HelmChart custom resource to configure the Helm chart with your application.

The following table provides more information about these files:

<table>
<tr>
  <th width="30%">File</th>
  <th>Description</th>
</tr>
<tr>
  <td>HelmChart custom resource manifest file</td>
  <td>The HelmChart custom resource manifest is a YAML file with <code>kind: HelmChart</code>. Replicated automatically creates the HelmChart custom resource when you add a Helm chart to a release.
  <br/>
  <br/>
  You must include a HelmChart custom resource to enable the Replicated app manager to process and deploy Helm charts. The HelmChart custom resource references the <code>.tgz</code> export of the Helm chart and provides the necessary instructions for processing and preparing the chart for deployment.
  <br/>
  <br/>
  For more information, see <a href="../reference/custom-resource-helmchart">HelmChart</a> in the <em>Custom Resources</em> section.</td>
</tr>
<tr>
  <td>Chart.yaml</td>
  <td>Replicated extracts the <code>Chart.yaml</code> file from the Helm chart <code>.tgz</code> file that you provide. This file is read-only and cannot be edited in the release.</td>
</tr>
<tr>
  <td>values.yaml</td>
  <td>Replicated extracts the <code>values.yaml</code> file from the Helm chart <code>.tgz</code> file that you provide. This file is read-only and cannot be edited in the release.</td>
</tr>
</table>

For example, the following screenshot shows how a Postgres Helm chart displays in the file tree of a release in the vendor portal:

![Postgres Helm Chart](/images/postgres-helm-chart.png)

## Add a Helm Chart to a Release

To include a Helm chart in a release, first you package the Helm chart, including any of its dependencies, as a `.tgz` file.

Then, you add the `.tgz` Helm chart package to your release.

There are different steps for creating the Helm chart package depending on if the Helm chart source is in a remote chart repository such as Artifact Hub, or in a local directory.

To package a Helm chart and add it to a release:

1. If the Helm chart source is in a chart repository, do the following:

   1. Update your local directory with the latest available Helm chart information from the chart repositories. Run:

      ```
      helm repo update
      ```
      :::note
      You can also pass the names of a specific repository or repositories that you want to update in the `helm repo update` command. For more information, see [Helm Repo Update](https://helm.sh/docs/helm/helm_repo_update/) in the Helm documentation.
      :::
   1. Download the latest copy of the desired Helm chart from the repository. Run:

      ```
      helm fetch REPO_NAME/CHART_NAME
      ```
      Replace:
      * `REPO_NAME` with the name of the repository where the Helm chart is located.
      * `CHART_NAME` with the name of the Helm chart as it appears in the repository.

      The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `chartname-version.tgz`. For example, `postgresql-8.1.2.tgz`.

1. If the Helm chart source is in your local directory, do the following:

   1. In your local directory, `cd` to the location of the `Chart.yaml` file for the Helm chart.

   1. If the `Chart.yaml` file includes any dependencies, update the `charts/` directory. Run:

      ```
      helm dependency update
      ```
   1. Package the Helm chart. Run:

      ```
      helm package .
      ```

      The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `chartname-version.tgz`. For example, `postgresql-8.1.2.tgz`.

1. Do one of the following to add the Helm chart `.tgz` package to a release:
   * **From the vendor portal**:

      1. In the [vendor portal](https://vendor.replicated.com), click **Releases**. Then, either click **Create release** to create a new release, or click **View YAML** to edit an existing release.

      1. Drag and drop the Helm chart `.tgz` package from your local directory to the file tree in the release in the vendor portal.

   * **From the replicated CLI**:

      1. Copy the Helm chart `.tgz` package to the local directory for the application.

      1. Create a new release. Run:

          ```
          replicated release create --yaml-dir PATH-TO-APP-DIRECTORY
          ```
          Replace `PATH-TO-APP-DIRECTORY` with the path to the local directory where you copied the Helm chart `.tgz`.

          Alternatively, you can update an existing release by running:

          ```
          replicated release update SEQUENCE --yaml-dir PATH-TO-APP-DIRECTORY
          ```
          Replace:
          * `SEQUENCE` with the release sequence number. This identifies the release to be updated.
          * `PATH-TO-APP-DIRECTORY` with the path to the local directory where you copied the Helm chart `.tgz`.     

1. Save and promote the release to a development environment to test your changes.
