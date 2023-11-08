import ChartRequirements from "../partials/replicated-sdk/_chart-requirements-note.mdx"
import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# Installing the Replicated SDK (Beta)

This topic describes the methods for distributing and installing the Replicated SDK.

## Install the SDK as a Subchart

You can include the SDK as a dependency of your application Helm chart. When included as a dependency, the SDK is installed as a subchart alongside your Helm chart-based application in customer environments.

Helm charts can be installed using the Helm CLI or Replicated KOTS.

To install the SDK as a subchart alongside an application Helm chart:

1. In your application Helm chart `Chart.yaml` file, declare the SDK as a dependency:

  <DependencyYaml/>

  Consider the following guidelines for adding the SDK as a dependency:

    * <ChartRequirements/>

    * Replicated recommends that your application is installed as a single chart that includes all necessary charts as dependencies. However, if your application is installed as multiple charts, declare the SDK as a dependency of the chart that customers install first.

1. Update dependencies and package the Helm chart to a `.tgz` chart archive:

  ```
  helm package . --dependency-update
  ```

1. Add the chart archive to a new release. For more information, see [Managing Releases with the CLI](/vendor/releases-creating-cli) or [Managing Releases with the Vendor Portal](/vendor/releases-creating-releases).

1. (Optional) Add a HelmChart custom resource to the release to support installation with KOTS. For more information, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about) and [HelmChart v2](/reference/custom-resource-helmchart-v2).

1. Promote the release to an internal-only channel used for testing, such as the default Unstable channel.

1. Install the release using the Helm CLI or KOTS. For information about installing releases with the Helm CLI, see [Installing with Helm](/vendor/install-with-helm). For information about installing with KOTS, see [About Installing an Application](/enterprise/installing-overview).

1. Confirm that the SDK was installed by seeing that the `replicated` Deployment was created:

  ```
  kubectl get deploy --namespace NAMESPACE
  ```
  Where `NAMESPACE` is the namespace in the cluster where the application and the SDK are installed. 

  **Example output**:

  ```
  NAME         READY   UP-TO-DATE   AVAILABLE   AGE
  my-app       0/1     1            0           35s
  replicated   1/1     1            1           35s
  ```

## Install the SDK Alongside a Standard Manifest-Based Applcation

For applications that use standard Kubernetes manifest files, the SDK Helm chart can be added to a release and then installed by KOTS in the customer environment alongside the application.

To add the SDK Helm chart to a release for a standard manifest-based application:

1. Install the Helm CLI using Homebrew:

  ```
  brew install helm
  ```
  For more information, including alternative installation options, see [Install Helm](https://helm.sh/docs/intro/install/) in the Helm documentation.

1. Pull the SDK Helm chart:

  ```
  helm pull oci://registry.replicated.com/library/replicated --version SDK_VERSION
  ```
  Where `SDK_VERSION` is the version of the SDK to install. For a list of available SDK versions, see the [replicated-sdk repository](https://github.com/replicatedhq/replicated-sdk/tags) in GitHub.

  The output of this command is a `.tgz` chart archive of the SDK Helm chart. The naming convention for Helm chart archives is `CHART_NAME-CHART_VERSION.tgz`. For example, `replicated-1.0.0-beta.12.tgz`.

1. Add the SDK `.tgz` chart archive to a new release. For more information, see [Managing Releases with the CLI](/vendor/releases-creating-cli) or [Managing Releases with the Vendor Portal](/vendor/releases-creating-releases).

  The following shows an example of version 1.0.0-beta.12 of the SDK Helm chart added to a draft release for a standard manifest-based application:

  ![SDK Helm chart in a draft release](/images/sdk-kots-release.png)
  
  [View a larger version of this image](/images/sdk-kots-release.png)

1. If one was not created automatically, add a Replicated HelmChart custom resource to the release. HelmChart custom resources have `apiVersion: kots.io/v1beta2` and `kind: HelmChart`. 

  **Example**
  
  ```yaml
  apiVersion: kots.io/v1beta2
  kind: HelmChart
  metadata:
    name: replicated
  spec:
  # chart identifies a matching chart from a .tgz
    chart:
      # for name, enter replicated
      name: replicated
      # for chartversion, enter the version of the
      # SDK Helm chart in the release
      chartVersion: 1.0.0-beta.12
  ```

  As shown in the example above, the HelmChart custom resource requires the name and version of the SDK Helm chart that you added to the release:
   * **`chart.name`**: The name of the SDK Helm chart is `replicated`. You can find the chart name in the `name` field of the SDK Helm chart `Chart.yaml` file.
   * **`chartVersion`**: The chart version varies depending on the version of the SDK that you pulled and added to the release. You can find the chart version in the `version` field of SDK Helm chart `Chart.yaml` file.

  For more information about configuring the HelmChart custom resource to support KOTS installations, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about) and [HelmChart v2](/reference/custom-resource-helmchart-v2).

## Install the SDK in Integration Mode

You can use the Replicated SDK in integration mode to develop locally against the SDK API without needing to add the SDK to your application, create a release in the Replicated vendor portal, or make changes in your environment.

To use integration mode, install the Replicated SDK as a standalone component using a valid development license. For more information, see [Developing Against the SDK API](/vendor/replicated-sdk-development).