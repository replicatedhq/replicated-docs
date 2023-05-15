# Creating a Helm Chart Package

Before you can include a Helm chart in a release, you must first package the Helm chart, including any of its dependencies, as a `.tgz` file. Then, you add the `.tgz` Helm chart package to your release.

There are different steps for creating the Helm chart package depending on if the Helm chart source is in a remote chart repository such as Artifact Hub, or in a local directory.

For more information about the Helm CLI commands in this procedure, see the [Helm Commands](https://helm.sh/docs/helm/helm/) section in the Helm documentation.

To create a Helm chart package:

1. If the Helm chart source is in a chart repository, do the following:

   1. Run the following command to update your local directory with the latest available Helm chart information from your chart repositories:

      ```
      helm repo update
      ```
      :::note
      You can also pass the names of a specific repository or repositories that you want to update in the `helm repo update` command. For more information, see [Helm Repo Update](https://helm.sh/docs/helm/helm_repo_update/) in the Helm documentation.
      :::
      
   1. Download the latest copy of the desired Helm chart from a repository. Run:

      ```
      helm fetch REPO_NAME/CHART_NAME
      ```
      Replace:
      * `REPO_NAME` with the name of the repository where the Helm chart is located.
      * `CHART_NAME` with the name of the Helm chart as it appears in the repository.

      The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

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

      The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

## Next Step

Use the Helm chart package to create a Helm release. See [Creating Releases with the Vendor Portal](releases-creating-releases).