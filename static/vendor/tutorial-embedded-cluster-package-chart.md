# Step 2: Package the Gitea Helm Chart

Next, get the sample Gitea Helm chart from Bitnami. Add the Replicated SDK as a dependency of the chart, then package the chart into a `.tgz` archive. The purpose of this step is to prepare the Helm chart to be added to a release.

The Replicated SDK is a Helm chart that can be optionally added as a dependency of your application Helm chart. The SDK is installed as a small service running alongside your application, and provides an in-cluster API that you can use to embed Replicated features into your application. Additionally, the Replicated SDK provides access to insights and telemetry for instances of your application installed with the Helm CLI.

To add the Replicated SDK and package the Helm chart:

1. Run the following command to pull and untar version 1.0.6 of the Bitnami Gitea Helm chart:

   ```
   helm pull --untar oci://registry-1.docker.io/bitnamicharts/gitea --version 1.0.6
   ```
   For more information about this chart, see the [bitnami/gitea](https://github.com/bitnami/charts/tree/main/bitnami/gitea) repository in GitHub.

1. Change to the new `gitea` directory that was created:
   ```
   cd gitea
   ```
1. View the files in the directory:   
   ```
   ls
   ```
   The directory contains the following files:
   ```
   Chart.lock  Chart.yaml  README.md  charts  templates  values.yaml
   ```

1. In the `Chart.yaml` file, add the Replicated SDK as a dependency:

   ```yaml
# Chart.yaml
dependencies:
- name: replicated
  repository: oci://registry.replicated.com/library
  version: 1.5.1
```

For the latest version information for the Replicated SDK, see the [replicated-sdk repository](https://github.com/replicatedhq/replicated-sdk/releases) in GitHub.

1. Update dependencies and package the Helm chart to a `.tgz` chart archive:

   ```bash
   helm package . --dependency-update
   ```
   :::note
If you see a `401 Unauthorized` error message, log out of the Replicated registry by running `helm registry logout registry.replicated.com` and then run `helm package . --dependency-update` again.
:::

## Next Step

Create a release using the Helm chart archive. See [Step 3: Add the Chart Archive to a Release](tutorial-embedded-cluster-create-release).

## Related Topics

* [Packaging a Helm Chart for a Release](/vendor/helm-install-release.md)
* [About the Replicated SDK](/vendor/replicated-sdk-overview)
* [Helm Package](https://helm.sh/docs/helm/helm_package/)