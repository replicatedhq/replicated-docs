# Step 3: Package the Helm Chart

Next, add the Replicated SDK as a dependency of the Helm chart and then package the chart into a `.tgz` archive. The purpose of this step is to prepare the Helm chart to be added to a release.

To add the Replicated SDK and package the Helm chart:

1. In your local file system, go to the `grafana` directory that was created as part of [Step 1: Get the Sample Chart and Test](tutorial-config-get-chart).

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

Create a release using the Helm chart archive. See [Step 4: Add the Chart Archive to a Release](tutorial-config-create-release).

## Related Topics

* [About the Replicated SDK](/vendor/replicated-sdk-overview)
* [Helm Package](https://helm.sh/docs/helm/helm_package/)