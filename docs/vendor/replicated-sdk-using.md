import HelmReleaseSteps from "../partials/helm/_helm-release-steps.mdx"
import HelmReleaseStepsCLI from "../partials/helm/_helm-release-steps-cli.mdx"

# Using the SDK With Your Application (Beta)

This topic describes how to begin using the Replicated SDK by declaring it as a dependency in your application Helm chart. 

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
   For the latest version information for the Replicated SDK, see the [replicated-sdk](https://github.com/replicatedhq/replicated-sdk/tags) repository in GitHub.

1. From your local directory where the `Chart.yaml` file is saved, run the following command to update the chart’s dependencies:

   ```bash
   helm dependency update
   ```

1. Package the chart:

   ```bash
   helm package .
   ```

   The output of this command is a `.tgz` file.

Continue to [Add Your Helm Chart to a Release](#release) below to add the `.tgz` file to a release.   

## Add Your Helm Chart to a Release {#release}   

After you package your Helm chart with the Replicated SDK as a dependency, you can add the `.tgz` file to a release. When you promote the release to a channel, the vendor portal automatically pushes your Helm chart to the Replicated registry where your customers can then pull the chart. For more information, see [How the SDK Runs in a Customer Environment](replicated-sdk-overview#about-sdk-initialize).

You can create and promote the release using the replicated CLI or the vendor portal.

### Using the replicated CLI

<HelmReleaseStepsCLI/>

### Using the Vendor Portal

<HelmReleaseSteps/>