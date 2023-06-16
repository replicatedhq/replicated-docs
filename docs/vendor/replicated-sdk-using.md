import Beta from "../partials/replicated-sdk/_beta.mdx"
import HelmReleaseSteps from "../partials/helm/_helm-release-steps.mdx"

# Using the SDK With Your Application (Beta)

This topic describes how to begin using the Replicated SDK by declaring it as a dependency in your application Helm chart. 

<Beta/>

## Prerequisite

Before you begin using the Replicated SDK, add the following labels on all resources deployed as part of your Helm chart:

```yaml
labels:
  app.kubernetes.io/instance: {{ .Release.Name }}
  app.kubernetes.io/managed-by: {{ .Release.Service}}
  app.kubernetes.io/name: {{ .Chart.Name }}
``` 

These are standard Helm labels that enable the Replicated SDK to report the status of installed instances of your application to the Replicated vendor portal so that you can view insights on instances running in customer environments. For more information about viewing insights and telemetry in the vendor portal when you distribute with the SDK, see [Customer Reporting and Instance Insights](replicated-sdk-overview#insights) in _About the Replicated SDK_.

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
   For the latest version information for the Replicated SDK, see **LINK**.

1. From your local directory where the `Chart.yaml` file is saved, run the following command to update the chart’s dependencies:

   ```bash
   helm dependency update
   ```

1. Package the chart:

   ```bash
   helm package .
   ```

   The output of this command is a `.tgz` file.

Continue to [Add Your Helm Chart to a Release](#release) below to add the `.tgz` file to a release in the vendor portal.   

## Add Your Helm Chart to a Release {#release}   

After you package your Helm chart with the Replicated SDK as a dependency, you can add the `.tgz` file to a release in the vendor portal. When you promote the release to a channel, the vendor portal automatically pushes your Helm chart to the Replicated registry where your customers can then pull the chart. For more information, see [How the SDK Runs in a Customer Environment](replicated-sdk-overview#about-sdk-initialize).

<HelmReleaseSteps/>