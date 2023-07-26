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

After you package your Helm chart with the Replicated SDK as a dependency, add the `.tgz` file to a release. For more information, see [Creating a Release with Your Helm Chart](helm-install-release).