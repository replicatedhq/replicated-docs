import ChartRequirements from "../partials/replicated-sdk/_chart-requirements-note.mdx"
import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# Get a Helm Chart-Based Application

This workflow assumes that you have a Helm chart that you can install and develop against. Replicated strongly recommends that all vendors distribute their application as a Helm chart because many enterprise users expect to be able to install using Helm.

To get a Helm chart-based application:

1. Create a new `replicated-onboarding` folder with a basic NGINX deployment:

    ```bash
    helm create replicated-onboarding
    ``` 
    For more information, see [Helm Create](https://helm.sh/docs/helm/helm_create/) in the Helm documentation.

1. In the Helm chart `Chart.yaml`, add the Replicated SDK as a dependency:

   <DependencyYaml/>

   The Replicated SDK is a Helm chart that provides access to Replicated features and can be installed as a small service alongside your application. For more information, see [About the Replicated SDK (Beta)](/vendor/replicated-sdk-overview).

   :::note
   <ChartRequirements/>
   :::

1. Update dependencies then package the Helm chart to a `.tgz` file:

   ```bash
   helm package . --dependency-update
   ```

   For more information, see [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation.

## Next Step

Add the Helm chart archive to a release in the vendor portal.