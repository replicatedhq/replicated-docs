import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HelmChartCr from "../partials/getting-started/_gitea-helmchart-cr.mdx"
import KotsCr from "../partials/getting-started/_gitea-kots-app-cr.mdx"
import K8sCr from "../partials/getting-started/_gitea-k8s-app-cr.mdx"

# Step 4: Add the Chart Archive to a Release

Next, create a new release with the Helm chart archive.

A _release_ represents a single version of your application and contains your application files. Each release is promoted to one or more _channels_. Channels provide a way to progress releases through the software development lifecycle: from internal testing, to sharing with early-adopters, and finally to making the release generally available.

To create a release:

1. In the `gitea` directory, created a subdirectory named `manifests`:

   ```
   mkdir manifests
   ```

   In this `manifests` subdirectory, you will add the files and manifests required to support installation with Replicated KOTS.

1. Move the Helm chart archive that you created to the `manifests` subdirectory:

   ```
   mv gitea-1.0.6.tgz manifests
   ```

1. In the `manifests` subdirectory, create the YAML files required by KOTS:
   ```
   cd manifests
   ```
   ```
   touch gitea.yaml kots-app.yaml k8s-app.yaml
   ```

1. In each file, paste the corresponding YAML provided below:

   <Tabs>
   <TabItem value="helmchart" label="gitea.yaml" default>
    <HelmChartCr/>
   </TabItem>
   <TabItem value="kots-app" label="kots-app.yaml">
    <KotsCr/>
   </TabItem>
   <TabItem value="k8s-app" label="k8s-app.yaml">
    <K8sCr/>
   </TabItem>
   </Tabs>

1. Install the replicated CLI:

   ```
   brew install replicatedhq/replicated/cli
   ```
   For more installation options, see [Installing the replicated CLI](/reference/replicated-cli-installing).

1. Authorize the replicated CLI:

   ```
   replicated login
   ```
   In the browser window that opens, complete the prompts to log in to your vendor account and authorize the CLI.

1. Set the `REPLICATED_APP` environment variable:

   1. Get the application slug:

      ```
      replicated app ls gitea-example
      ```
      **Example output**:
      ```
      ID                             NAME            SLUG            SCHEDULER
      2WthxUIfGT13RlrsUx9HR7So8bR    Gitea Example   gitea-example   kots
      ```
      In the example above, the application slug in `gitea-example`.

   1. Set the environment variable using the slug:

      ```
      export REPLICATED_APP=gitea-example
      ```   

1. Lint the `manifests` directory using the replicated CLI:

   ```
   replicated release lint --yaml-dir . --app gitea-example
   ```
   Where:
     * `--yaml-dir` is the directory that contains the Helm chart archive and the manifest files required by KOTS.
     * `--app` is the slug for the application that you created in the vendor portal.

   **Example output**:

   ```
   RULE                               TYPE    FILENAME        LINE  MESSAGE
   config-spec                        warn                          Missing config spec                                                         
   preflight-spec                     warn                          Missing preflight spec
   troubleshoot-spec                  warn                          Missing troubleshoot spec
   nonexistent-status-informer-object warn    kots-app.yaml   8     Status informer points to a nonexistent kubernetes object. If this is a Helm resource, this warning can be ignored.
   ```
   You can ignore these warning message for the purpose of this tutorial.

1. Create a release using the replicated CLI:

   ```
   replicated release create --yaml-dir . --app gitea-example
   ```
   Where:
     * `--yaml-dir` is the directory that contains the Helm chart archive and the manifest files required by KOTS.
     * `--app` is the slug for the application that you created in the vendor portal.

1. Log in to the vendor portal and go to **Releases**. Click on the release that you just created.

1. Click **Promote**. In the dialog, for **Which channels you would like to promote this release to?**, select **Unstable**. Unstable is a default channel that is intended for use with internal testing. Click **Promote**.

   <img alt="Promote release dialog" src="/images/release-promote.png" width="500px"/>

   [View a larger version of this image](/images/release-promote.png)    

## Next Step

Create a customer so that you can install the release in your cluster. See [Create a Customer](tutorial-kots-helm-create-customer).

## Related Topics

* [About Channels and Releases](/vendor/releases-about)
* [Configuring the HelmChart Custom Resource](/vendor/helm-native-v2-using)