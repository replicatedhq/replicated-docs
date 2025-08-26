import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"
import UnauthorizedError from "../partials/replicated-sdk/_401-unauthorized.mdx"

# Step 2: Package the Helm Chart and Create a Release

Next, add the Replicated SDK as a dependency of the Helm chart and then package the chart into a `.tgz` archive. The purpose of this step is to prepare the Helm chart to be added to a release.

The Replicated SDK is a Helm chart that can be optionally added as a dependency of your application Helm chart. The SDK is installed as a small service running alongside your application, and provides an in-cluster API that you can use to embed Replicated features into your application. Additionally, the Replicated SDK provides access to insights and telemetry for instances of your application installed with the Helm CLI.

Then, add the Helm chart archive to a new release for the application in the Replicated Vendor Portal. A _release_ represents a single version of your application and contains your application files. Each release is promoted to one or more _channels_. Channels provide a way to progress releases through the software development lifecycle: from internal testing, to sharing with early-adopters, and finally to making the release generally available.

To get the sample SlackerNews chart, add the Replicated SDK, and package the chart:

1. Run the following command to create a directory named `quick-start` and download version 0.4.14 of the `slackernews` Helm chart to this new directory: 

    ```
    curl -O --create-dirs --output-dir quick-start https://docs.replicated.com/slackernews-0.4.14.tar.gz
    ```

1. Untar the chart:

    ```
    tar -xzf quick-start/slackernews-0.4.14.tar.gz -C quick-start/ && rm slackernews-0.4.14.tar.gz
    ```

1. Change to the `slackernews` chart directory:

    ```bash
    cd quick-start/chart/slackernews
    ```

1. List the files in the `slackernews` directory to view the contents of the Helm chart:
    ```bash
    ls
    ```
    ```bash
    Chart.lock  Chart.yaml  NOTES.txt   README.md   templates   values.yaml
    ```

1. In the SlackerNews Helm chart `Chart.yaml`, add the Replicated SDK as a dependency:

    <DependencyYaml/>

    The Replicated SDK is a Helm chart that provides access to Replicated features and can be installed as a small service alongside your application. For more information, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

1. Update dependencies and package the Helm chart to a `.tgz` chart archive:

    ```bash
    helm package -u .
    ```
    Where `-u` or `--dependency-update` is an option for the helm package command that updates chart dependencies before packaging. For more information, see [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation.

    <UnauthorizedError/>

    The output of this command is a file named `slackernews-0.4.14.tgz`.

1. From the directory where you packaged the chart, create a release:

   ```
   replicated release create --yaml-dir .
   ```
   **Example output**:
   ```
   • Reading manifests from . ✓
   • Creating Release ✓
     • SEQUENCE: 1
   ```

## Next Step

Create a customer. See [Step 5: Create a Helm-Enabled Customer](tutorial-kots-helm-create-customer).

## Related Topics

* [About Channels and Releases](/vendor/releases-about)
* [Configuring the HelmChart Custom Resource v2](/vendor/helm-native-v2-using)
* [Packaging a Helm Chart for a Release](/vendor/helm-install-release.md)
* [About the Replicated SDK](/vendor/replicated-sdk-overview)
* [Helm Package](https://helm.sh/docs/helm/helm_package/)
