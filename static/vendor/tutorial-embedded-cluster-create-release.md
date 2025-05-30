# Step 3: Add the Chart Archive to a Release

Next, add the Helm chart archive to a new release for the application in the Replicated Vendor Portal. The purpose of this step is to configure a release that supports installation with Replicated Embedded Cluster.

A _release_ represents a single version of your application and contains your application files. Each release is promoted to one or more _channels_. Channels provide a way to progress releases through the software development lifecycle: from internal testing, to sharing with early-adopters, and finally to making the release generally available.

To create a release:

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
   touch gitea.yaml kots-app.yaml k8s-app.yaml embedded-cluster.yaml
   ```

1. In each of the files that you created, paste the corresponding YAML provided in the tabs below:

   <Tabs>
   <TabItem value="helmchart" label="gitea.yaml" default>
    <h5>Description</h5>
    <p>The KOTS HelmChart custom resource provides instructions to KOTS about how to deploy the Helm chart. The <code>name</code> and <code>chartVersion</code> listed in the HelmChart custom resource must match the name and version of a Helm chart archive in the release. The <a href="/vendor/helm-optional-value-keys#conditionally-set-values"><code>optionalValues</code></a> field sets the specified Helm values when a given conditional statement evaluates to true. In this case, if the application is installed with Embedded Cluster, then the Gitea service type is set to `NodePort` and the node port is set to `"32000"`. This will allow Gitea to be accessed from the local machine after deployment.</p>
    <h5>YAML</h5>
    ```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: gitea
spec:
  # chart identifies a matching chart from a .tgz
  chart:
    name: gitea
    chartVersion: 1.0.6
  optionalValues:
  - when: 'repl{{ eq Distribution "embedded-cluster" }}'
    recursiveMerge: false
    values:
      service:
        type: NodePort
        nodePorts:
          http: "32000"
```
   </TabItem>
   <TabItem value="kots-app" label="kots-app.yaml">
   <h5>Description</h5>
    <p>The KOTS Application custom resource enables features in the Replicated Admin Console such as branding, release notes, application status indicators, and custom graphs.</p><p>The YAML below provides a name for the application to display in the Admin Console, adds a custom <em>status informer</em> that displays the status of the <code>gitea</code> Deployment resource in the Admin Console dashboard, adds a custom application icon, and adds the port where the Gitea service can be accessed so that the user can open the application after installation.</p>
    <h5>YAML</h5>
    ```yaml
apiVersion: kots.io/v1beta1
kind: Application
metadata:
  name: gitea
spec:
  title: Gitea
  statusInformers:
    - deployment/gitea
  ports:
    - serviceName: "gitea"
      servicePort: 3000
      localPort: 32000
      applicationUrl: "http://gitea"
  icon: https://raw.githubusercontent.com/cncf/artwork/master/projects/kubernetes/icon/color/kubernetes-icon-color.png
```
   </TabItem>
   <TabItem value="k8s-app" label="k8s-app.yaml">
   <h5>Description</h5>
    <p>The Kubernetes Application custom resource supports functionality such as including buttons and links on the Replicated Admin Console dashboard. The YAML below adds an <strong>Open App</strong> button to the Admin Console dashboard that opens the application using the service port defined in the KOTS Application custom resource.</p>
    <h5>YAML</h5>
    ```yaml
apiVersion: app.k8s.io/v1beta1
kind: Application
metadata:
  name: "gitea"
spec:
  descriptor:
    links:
      - description: Open App
        # needs to match applicationUrl in kots-app.yaml
        url: "http://gitea"
```
   </TabItem>
   <TabItem value="ec" label="embedded-cluster.yaml">
   <h5>Description</h5>
    <p>To install your application with Embedded Cluster, an Embedded Cluster Config must be present in the release. At minimum, the Embedded Cluster Config sets the version of Embedded Cluster that will be installed. You can also define several characteristics about the cluster.</p>
    <h5>YAML</h5>
    ```yaml
apiVersion: embeddedcluster.replicated.com/v1beta1
kind: Config
spec:
  version: 2.1.3+k8s-1.30
```
   </TabItem>
   </Tabs>

1. Lint:

   ```bash
   replicated release lint --yaml-dir .
   ```
   ```bash
   RULE                                  TYPE    FILENAME         LINE    MESSAGE
   config-spec                           warn                                                                                                                                                    Missing config spec
   preflight-spec                        warn                                                                                                                                                    Missing preflight spec
   troubleshoot-spec                     warn                                                                                                                                                    Missing troubleshoot spec
   nonexistent-status-informer-object    warn    kots-app.yaml    8       Status informer points to a nonexistent kubernetes object. If this is a Helm resource, this warning can be ignored.
   ```
   :::note
   You can ignore any warning messages for the purpose of this tutorial.
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

1. Log in to the Vendor Portal and go to **Releases**.

    The release that you created is listed under **All releases**.

    ![Release page in the Vendor Portal with one release](/images/gitea-ec-release-seq-1.png)

    [View a larger version of this image](/images/gitea-ec-release-seq-1.png)

1. Click the dot menu then **Edit release** to view the files in the release.

    ![dot menu](/images/gitea-ec-release-edit-button.png)

    [View a larger version of this image](/images/gitea-ec-release-edit-button.png) 

    In the release editor, you can see the manifest files that you created, the Helm chart `.tgz` archive, and the `Chart.yaml` and `values.yaml` files for the Gitea Helm chart. You can also see the same warning messages that were displayed in the CLI output.

    ![Edit Release page in the Vendor Portal](/images/gitea-ec-release-edit-seq-1.png)

    [View a larger version of this image](/images/gitea-ec-release-edit-seq-1.png)

1. At the top of the page, click **Promote**.

1. In the dialog, for **Which channels you would like to promote this release to?**, select **Unstable**. Unstable is a default channel that is intended for use with internal testing. Click **Promote**.

    <img alt="Promote release dialog" src="/images/release-promote.png" width="400px"/>

    [View a larger version of this image](/images/release-promote.png)    

## Next Step

Create a customer with the Embedded Cluster entitlement so that you can install the release using Embedded Cluster. See [Step 4: Create an Embedded Cluster-Enabled Customer](tutorial-embedded-cluster-create-customer).

## Related Topics

* [About Channels and Releases](/vendor/releases-about)
* [Configuring the HelmChart Custom Resource](/vendor/helm-native-v2-using)
* [Embedded Cluster Config](/reference/embedded-config)
* [Setting Helm Values with KOTS](/vendor/helm-optional-value-keys)