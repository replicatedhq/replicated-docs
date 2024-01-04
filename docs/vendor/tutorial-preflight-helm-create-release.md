import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HelmChartCr from "../partials/getting-started/_gitea-helmchart-cr.mdx"
import KotsCr from "../partials/getting-started/_gitea-kots-app-cr.mdx"
import K8sCr from "../partials/getting-started/_gitea-k8s-app-cr.mdx"

# Step 3: Add the Chart Archive to a Release

Next, add the Helm chart archive to a new release for the application in the Replicated vendor platform. The purpose of this step is to configure a release that supports installation with both Replicated KOTS and with the Helm CLI.

To create a release:

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

1. Create an application named `Gitea`:

   ```
   replicated app create Gitea
   ```

1. Set the `REPLICATED_APP` environment variable to the application that you created. This allows you to interact with the application using the replicated CLI without needing to use the `--app` flag with every command:

   1. Get the slug for the application that you created:

      ```
      replicated app ls
      ```
      **Example output**:
      ```
      ID                             NAME            SLUG            SCHEDULER
      2WthxUIfGT13RlrsUx9HR7So8bR    Gitea           gitea-boxer     kots
      ```
      In the example above, the application slug is `gitea-boxer`.

      :::note
      The application _slug_ is a unique string that is generated based on the application name. You can use the application slug to interact with the application through the replicated CLI and the Vendor API v3. The application name and slug are often different from one another because it is possible to create more than one application with the same name.
      :::

   1. Set the `REPLICATED_APP` environment variable to the application slug.

      **Example:**

      ```
      export REPLICATED_APP=gitea-boxer
      ```

1. In the `gitea` directory, create a subdirectory named `manifests`:

   ```
   mkdir manifests
   ```

   You will add the files required to support installation with Replicated KOTS to this subdirectory.

1. Move the Helm chart archive that you created to `manifests`:

   ```
   mv gitea-1.0.6.tgz manifests
   ```

1. In `manifests`, create the YAML manifests required by KOTS:
   ```
   cd manifests
   ```
   ```
   touch gitea.yaml kots-app.yaml k8s-app.yaml
   ```

1. In each of the files that you created, paste the corresponding YAML provided in the tabs below:

   <Tabs>
   <TabItem value="helmchart" label="gitea.yaml" default>
    <h5>Description</h5>
    <p>The KOTS HelmChart custom resource provides instructions to KOTS about how to deploy the Helm chart. The <code>name</code> and <code>chartVersion</code> listed in the HelmChart custom resource must match the name and version of a Helm chart archive in the release. Each Helm chart archive in a release requires a unique HelmChart custom resource.</p>
    <h5>YAML</h5>
    <HelmChartCr/>
   </TabItem>
   <TabItem value="kots-app" label="kots-app.yaml">
   <h5>Description</h5>
    <p>The KOTS Application custom resource enables features in the Replicated admin console such as branding, release notes, port forwarding, dashboard buttons, application status indicators, and custom graphs.</p><p>The YAML below provides a name for the application to display in the admin console, adds a custom <em>status informer</em> that displays the status of the <code>gitea</code> Deployment resource in the admin console dashboard, adds a custom application icon, and creates a port forward so that the user can open the Gitea application in a browser.</p>
    <h5>YAML</h5>
    <KotsCr/>
   </TabItem>
   <TabItem value="k8s-app" label="k8s-app.yaml">
   <h5>Description</h5>
    <p>The Kubernetes Application custom resource supports functionality such as including buttons and links on the Replicated admin console dashboard. The YAML below adds an <strong>Open App</strong> button to the admin console dashboard that opens the application using the port forward configured in the KOTS Application custom resource.</p>
    <h5>YAML</h5>
    <K8sCr/>
   </TabItem>
   </Tabs>   

1. From the `manifests` directory, lint the YAML files to confirm that there are no errors:

   ```
   replicated release lint --yaml-dir .
   ```
   `--yaml-dir` is the path to the directory that contains the Helm chart archive and the manifest files required by KOTS.

   **Example output**:

   ```
   RULE                               TYPE    FILENAME        LINE  MESSAGE
   config-spec                        warn                          Missing config spec                                                         
   preflight-spec                     warn                          Missing preflight spec
   troubleshoot-spec                  warn                          Missing troubleshoot spec
   nonexistent-status-informer-object warn    kots-app.yaml   8     Status informer points to a nonexistent kubernetes object. If this is a Helm resource, this warning can be ignored.
   ```
   :::note
   The output includes warning messages that list missing manifest files. These manifests control additional KOTS functionality and can be ignored for the purpose of this tutorial. The `nonexistent-status-informer-object` warning can also be ignored because the `gitea` Deployment resource that was added as a status informer in the KOTS Application custom resource is a Helm resource.
   :::

1. Create a release:

   ```
   replicated release create --yaml-dir .
   ```
   **Example output**:
   ```
   • Reading manifests from . ✓
   • Creating Release ✓
     • SEQUENCE: 1
   ```

1. Log in to the vendor portal and go to **Releases**.

  The release that you created is listed under **All releases**.

  ![Release page in the vendor portal with one release](/images/tutorial-kots-helm-release-seq-1.png)

  [View a larger version of this image](/images/tutorial-kots-helm-release-seq-1.png)

1. Click **Edit release** to view the files in the release.

  In the release editor, you can see the manifest files that you created, the Helm chart `.tgz` archive, and the `Chart.yaml` and `values.yaml` files for the Gitea Helm chart. You can also see the same warning messages that were displayed in the CLI output.

  ![Edit Release page in the vendor portal](/images/tutorial-kots-helm-release-edit-seq-1.png)

  [View a larger version of this image](/images/tutorial-kots-helm-release-edit-seq-1.png)

1. At the top of the page, click **Promote**.

1. In the dialog, for **Which channels you would like to promote this release to?**, select **Unstable**. Unstable is a default channel that is intended for use with internal testing. Click **Promote**.

   <img alt="Promote release dialog" src="/images/release-promote.png" width="400px"/>

   [View a larger version of this image](/images/release-promote.png)    

## Next Step

## Related Topics

* [About Channels and Releases](/vendor/releases-about)
* [Configuring the HelmChart Custom Resource](/vendor/helm-native-v2-using)