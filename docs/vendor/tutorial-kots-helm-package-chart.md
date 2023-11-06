import ChartRequirements from "../partials/replicated-sdk/_chart-requirements-note.mdx"
import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# Step 3: Package the Helm Chart

Next, add the Replicated SDK as a dependency of the Helm chart and then package the chart into a `.tgz` archive. The purpose of this step is to prepare the Helm chart to be added to a release.

The Replicated SDK is a Helm chart that can be optionally added as a dependency of your application Helm chart. The SDK is installed as a small service running alongside your application, and provides an in-cluster API that you can use to embed Replicated features into your application. Additionally, the Replicated SDK provides access to insights and telemetry for instances of your application installed with the Helm CLI.

To add the Replicated SDK and package the Helm chart:

1. In your local file system, go to the `gitea` directory that was created as part of [Step 1: Get the Sample Chart and Test](tutorial-kots-helm-get-chart).

1. In the `Chart.yaml` file, add the Replicated SDK as a dependency:

   <DependencyYaml/>

1. Update dependencies and package the Helm chart to a `.tgz` chart archive:

   ```bash
   helm package . --dependency-update
   ```

## Next Step

Create a release using the Helm chart archive. See [Step 4: Add the Chart Archive to a Release](tutorial-kots-helm-create-release).

## Related Topics

* [About the Replicated SDK (Beta)](/vendor/replicated-sdk-overview)
* [Helm Package](https://helm.sh/docs/helm/helm_package/)