import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HelmChart from "../partials/getting-started/_grafana-helmchart.mdx"
import KotsApp from "../partials/getting-started/_grafana-kots-app.mdx"
import K8sApp from "../partials/getting-started/_grafana-k8s-app.mdx"
import Config from "../partials/getting-started/_grafana-config.mdx"

# Step 4: Add the Chart Archive to a Release

Next, add the Helm chart archive to a new release for the application in the Replicated vendor platform. The purpose of this step is to configure a release that supports installation with both Replicated KOTS and with the Helm CLI.

A _release_ represents a single version of your application and contains your application files. Each release is promoted to one or more _channels_. Channels provide a way to progress releases through the software development lifecycle: from internal testing, to sharing with early-adopters, and finally to making the release generally available.

To create a release:

1. In the `grafana` directory, create a subdirectory named `manifests`:

   ```
   mkdir manifests
   ```

   You will add the files required to support installation with Replicated KOTS to this subdirectory.

1. Move the Helm chart archive that you created to `manifests`:

   ```
   mv grafana-9.6.5.tgz manifests
   ```

1. In the `manifests` directory, create the following YAML files to configure the release:
   
  ```
  cd manifests
  ```
  ```
  touch kots-app.yaml k8s-app.yaml kots-config.yaml grafana.yaml
  ```

1. In each file, paste the corresponding YAML provided in the tabs below:

   <Tabs>
      <TabItem value="kots-app" label="kots-app.yaml" default>
   <h5>Description</h5>
    <p>The KOTS Application custom resource enables features in the Replicated admin console such as branding, release notes, port forwarding, dashboard buttons, application status indicators, and custom graphs.</p><p>The YAML below provides a name for the application to display in the admin console, adds a custom <em>status informer</em> that displays the status of the <code>grafana</code> Deployment resource in the admin console dashboard, adds a custom application icon, and creates a port forward so that the user can open the Grafana application in a browser.</p>
    <h5>YAML</h5>
    <KotsApp/>
   </TabItem>
   <TabItem value="k8s-app" label="k8s-app.yaml">
   <h5>Description</h5>
    <p>The Kubernetes Application custom resource supports functionality such as including buttons and links on the Replicated admin console dashboard. The YAML below adds an <strong>Open App</strong> button to the admin console dashboard that opens the application using the port forward configured in the KOTS Application custom resource.</p>
    <h5>YAML</h5>
    <K8sApp/>
   </TabItem>
   <TabItem value="config" label="kots-config.yaml">
    <h5>Description</h5>
    <p>The Config custom resource specifies a user-facing configuration page in the Replicated admin console designed for collecting application configuration preference from users. The YAML below creates "Admin User" and "Admin Password" fields that will be shown to the user on the configuration page during installation. These fields will be used to set the credentials for logging in to the Grafana application.</p>
    <h5>YAML</h5>
    <Config/>
   </TabItem>
   <TabItem value="helmchart" label="grafana.yaml">
    <h5>Description</h5>
    <p>The KOTS HelmChart custom resource provides instructions to KOTS about how to deploy the Helm chart.</p>
    <p>The HelmChart custom resource below contains a <code>values</code> key, which creates a mapping to the Grafana <code>values.yaml</code> file. In this case, the <code>values.admin.user</code> and <code>values.admin.password</code> fields map to <code>admin.user</code> and <code>admin.password</code> in the Grafana <code>values.yaml</code> file.</p>
    <p>The <code>values.admin.user</code> and <code>values.admin.password</code> fields also use ConfigOption template functions, which return the user-supplied values from the fields that you created in the Config custom resource. During installation, KOTS renders the template functions and then overrides <code>admin.user</code> and <code>admin.password</code> in the Grafana <code>values.yaml</code> file accordingly.</p>
    <h5>YAML</h5>
    <HelmChart/>
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
   preflight-spec                     warn                          Missing preflight spec
   troubleshoot-spec                  warn                          Missing troubleshoot spec
   nonexistent-status-informer-object warn    kots-app.yaml   8     Status informer points to a nonexistent kubernetes object. If this is a Helm resource, this warning can be ignored.
   ```
   :::note
   The output includes warning messages that list missing manifest files. These manifests control additional KOTS functionality and can be ignored for the purpose of this tutorial. The `nonexistent-status-informer-object` warning can also be ignored because the `grafana` Deployment resource that was added as a status informer in the KOTS Application custom resource is a Helm resource.
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

  In the release editor, you can see the manifest files that you created, the Helm chart `.tgz` archive, and the `Chart.yaml` and `values.yaml` files for the Grafana Helm chart. You can also see the same warning messages that were displayed in the CLI output.

  ![Edit Release page in the vendor portal](/images/tutorial-kots-helm-release-edit-seq-1.png)

  [View a larger version of this image](/images/tutorial-kots-helm-release-edit-seq-1.png)

1. At the top of the page, click **Promote**.

1. In the dialog, for **Which channels you would like to promote this release to?**, select **Unstable**. Unstable is a default channel that is intended for use with internal testing. Click **Promote**.

   <img alt="Promote release dialog" src="/images/release-promote.png" width="400px"/>

   [View a larger version of this image](/images/release-promote.png)    

## Next Step

Create a customer with the KOTS entitlement so that you can install the release in your cluster using Replicated KOTS. See [Step 5: Create a KOTS-Enabled Customer](tutorial-config-create-customer).

## Related Topics

* [About Channels and Releases](/vendor/releases-about)
* [Configuring the HelmChart Custom Resource](/vendor/helm-native-v2-using)