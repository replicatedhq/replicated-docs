import ChartRequirements from "../partials/replicated-sdk/_chart-requirements-note.mdx"
import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# Step 3: Add the SDK and Package the Chart

Next, add the Replicated SDK as a dependency of the sample NGINX Helm chart.

The Replicated SDK is a Helm chart that can be installed as a small service running alongside your application Helm chart. The Replicated SDK provides an in-cluster API that you can use to embed Replicated features into your application.

To get a Helm chart-based application:

1. In your local file system, go to the `replicated-onboarding` directory that you created as part of [Step 1: Get the Sample Chart and Test](tutorial-helm-get-chart).

1. Open the `Chart.yaml` file for the sample NGINX Helm chart in your preferred text editor.

1. In the `Chart.yaml` file, add the Replicated SDK as a dependency:

   <DependencyYaml/>

   :::note
   <ChartRequirements/>
   :::

1. Update dependencies then package the Helm chart to a `.tgz` chart archive:

   ```bash
   helm package . --dependency-update
   ```

## Next Step

Add the Helm chart archive to a release in the vendor portal. See [Add the Chart Archive to a Release](tutorial-helm-create-release).

## Related Topics

* [About the Replicated SDK (Beta)](/vendor/replicated-sdk-overview)
* [Helm Package](https://helm.sh/docs/helm/helm_package/)