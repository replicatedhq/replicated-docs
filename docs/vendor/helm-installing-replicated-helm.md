# Adding a Helm Chart to a Release

This topic describes how to add a Helm chart to a release in the Replicated vendor portal.

## Overview

When you add a Helm chart to a release, added to a new section near the top of the file tree, and the `values.yaml`, `chart.yaml` and a new `chart-name.yaml` file will be created.

The following screenshot shows

![Postgres Helm Chart](/images/postgres-helm-chart.png)

<table>
<tr>
  <th width="30%">YAML file</th>
  <th>Description</th>
</tr>
<tr>
  <td>HelmChart custom resource</td>
  <td>This file is required for the chart to be installed.
  When using the vendor portal generated automatically when adding a new chart, and allows you to configure the chart with your application. For more information, see <a href="../reference/custom-resource-helmchart">HelmChart</a> in the <em>Custom Resources</em> section.</td>
</tr>
<tr>
  <td>Chart.yaml</td>
  <td>This file is read-only, and extracted from the Helm chart (as metadata).</td>
</tr>
<tr>
  <td>values.yaml</td>
  <td>This file is read-only, and extracted from the Helm chart (as metadata).</td>
</tr>
</table>

## Add a Helm Chart to a Release

To add a Helm chart to a release, you must package the Helm chart in a `.tgz` file, and then add the `.tgz` file to your release.

To package a Helm chart and add it to a release:

1. `cd` to the location of the `Chart.yaml` file in your local directory.
1. If the Helm chart source is in a repository such as Artifact Hub, do the following:
   1. Get the latest information about available Helm charts from the repository:

      ```
      helm repo update
      ```
   1. Download the Helm chart that you want to add to the release from the repository:

      ```
      helm fetch stable/CHART_NAME
      ```
      Replace `CHART_NAME` with the name of the Helm chart as it appears in the repository.

      After running these commands, the latest copy of the Helm chart is copied to your current directory in a `.tgz` file. The file uses the naming convention: `chartname-version.tgz`. For example, `postgresql-8.1.2.tgz`.

1. If the Helm chart source is in a local directory:

   1. If the Helm chart as dependencies, run:

      ```
      helm dependency update
      ```
   1. Create a package of the Helm chart that you can add to the Replicated release:

      ```
      helm package .
      ```

      After running these commands, the latest copy of the Helm chart is copied to your current directory in a `.tgz` file. The file uses the naming convention: `chartname-version.tgz`. For example, `postgresql-8.1.2.tgz`.

1. In the vendor portal, create a new release or open an existing release where you want to add the Helm chart.

1. Drag and drop the Helm chart package from your local directory into the file tree in the release.

  
