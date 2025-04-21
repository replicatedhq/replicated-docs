# Replicated Quick Start

This topic provides a quick start workflow to help new users learn about the Replicated Platform. Complete this quick start before you onboard your application to the platform.

## Introduction

This quick start shows how to create, install, and update releases for a sample Helm chart in the Replicated Platform. You will repeat these same basic steps to create and test releases throughout the onboarding process to integrate Replicated features with your own application.

The goals of this quick start are to introduce new Replicated users to the following common tasks for the purpose of preparing to onboard to the Replicated Platform:

* Working with _applications_, _channels_, _releases_, and _customers_ in the Replicated Vendor Portal

* Working with the Replicated CLI

* Installing and updating applications on a VM with Replicated Embedded Cluster

* Managing an installation with the Replicated KOTS Admin Console

## Set Up the Environment

Before you begin, ensure that you have access to a VM that meets the requirements for Embedded Cluster:

* Linux operating system

* x86-64 architecture

* systemd

* At least 2GB of memory and 2 CPU cores

* The disk on the host must have a maximum P99 write latency of 10 ms. This supports etcd performance and stability. For more information about the disk write latency requirements for etcd, see [Disks](https://etcd.io/docs/latest/op-guide/hardware/#disks) in _Hardware recommendations_ and [What does the etcd warning “failed to send out heartbeat on time” mean?](https://etcd.io/docs/latest/faq/) in the etcd documentation.

* The data directory used by Embedded Cluster must have 40Gi or more of total space and be less than 80% full. By default, the data directory is `/var/lib/embedded-cluster`. The directory can be changed by passing the `--data-dir` flag with the Embedded Cluster `install` command. For more information, see [Embedded Cluster Install Command Options](/reference/embedded-cluster-install).

   Note that in addition to the primary data directory, Embedded Cluster creates directories and files in the following locations:

      - `/etc/cni`
      - `/etc/k0s`
      - `/opt/cni`
      - `/opt/containerd`
      - `/run/calico`
      - `/run/containerd`
      - `/run/k0s`
      - `/sys/fs/cgroup/kubepods`
      - `/sys/fs/cgroup/system.slice/containerd.service`
      - `/sys/fs/cgroup/system.slice/k0scontroller.service`
      - `/usr/libexec/k0s`
      - `/var/lib/calico`
      - `/var/lib/cni`
      - `/var/lib/containers`
      - `/var/lib/kubelet`
      - `/var/log/calico`
      - `/var/log/containers`
      - `/var/log/embedded-cluster`
      - `/var/log/pods`
      - `/usr/local/bin/k0s`

* (Online installations only) Access to replicated.app and proxy.replicated.com or your custom domain for each

* Embedded Cluster is based on k0s, so all k0s system requirements and external runtime dependencies apply. See [System requirements](https://docs.k0sproject.io/stable/system-requirements/) and [External runtime dependencies](https://docs.k0sproject.io/stable/external-runtime-deps/) in the k0s documentation.

## Quick Start

1. Create an account in the Vendor Portal. You can either create a new team or join an existing team. For more information, see [Create a Vendor Account](vendor-portal-creating-account).

1. Create an application using the Replicated CLI:

   1. On your local machine, install the Replicated CLI:

      ```bash
      brew install replicatedhq/replicated/cli
      ```
      For more installation options, see [Install the Replicated CLI](/reference/replicated-cli-installing).

   1. Authorize the Replicated CLI:

      ```bash
      replicated login
      ```
      In the browser window that opens, complete the prompts to log in to your Vendor Portal account and authorize the CLI.

   1. Create an application named `Gitea`:

      ```bash
      replicated app create Gitea
      ```

   1. Set the `REPLICATED_APP` environment variable to the application that you created:

      ```bash
      export REPLICATED_APP=APP_SLUG
      ```
      Where `APP_SLUG` is the unique application slug provided in the output of the `app create` command. For example, `export REPLICATED_APP=gitea-kite`.

      This allows you to interact with the application using the Replicated CLI without needing to use the `--app` flag with every command.

1. Get the sample Bitnami Gitea Helm chart and add the Replicated SDK as a dependency:

   1. Run the following command to pull and untar version 1.0.6 of the Bitnami Gitea Helm chart:

      ```
      helm pull --untar oci://registry-1.docker.io/bitnamicharts/gitea --version 1.0.6
      ```
      For more information about this chart, see the [bitnami/gitea](https://github.com/bitnami/charts/tree/main/bitnami/gitea) repository in GitHub.

   1. Change to the new `gitea` directory that was created:
      
      ```bash
      cd gitea
      ```

   1. In the Helm chart `Chart.yaml`, add the Replicated SDK as a dependency:

      ```yaml
# Chart.yaml
dependencies:
- name: replicated
  repository: oci://registry.replicated.com/library
  version: 1.5.1
```

For the latest version information for the Replicated SDK, see the [replicated-sdk repository](https://github.com/replicatedhq/replicated-sdk/releases) in GitHub.

      The Replicated SDK is a Helm chart that provides access to Replicated features and can be installed as a small service alongside your application. For more information, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

   1. Update dependencies and package the Helm chart to a `.tgz` chart archive:

      ```bash
      helm package -u .
      ```
      Where `-u` or `--dependency-update` is an option for the helm package command that updates chart dependencies before packaging. For more information, see [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation.

1. Add the chart archive to a release:

   1. In the `gitea` directory, create a subdirectory named `manifests`:

      ```
      mkdir manifests
      ```

      You will add the files required to support installation with Replicated KOTS and Replicated Embedded Cluster to this subdirectory.

   1. Move the Helm chart archive that you created to `manifests`:

      ```
      mv gitea-1.0.6.tgz manifests
      ```

   1. In `manifests`, create the following YAML files:
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
      <p>The KOTS HelmChart custom resource provides instructions to KOTS about how to deploy the Helm chart. The <code>name</code> and <code>chartVersion</code> listed in the HelmChart custom resource must match the name and version of a Helm chart archive in the release. The <a href="/vendor/helm-optional-value-keys#conditionally-set-values"><code>optionalValues</code></a> field sets the specified Helm values when a given conditional statement evaluates to true. In this case, if the application is installed with Embedded Cluster, then the Gitea service type is set to `NodePort` and the node port is set to `"32000"`. This will allow Gitea to be accessed from the local machine after deployment for the purpose of this quick start.</p>
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
      <p>The Kubernetes SIG Application custom resource supports functionality such as including buttons and links on the Replicated Admin Console dashboard. The YAML below adds an <strong>Open App</strong> button to the Admin Console dashboard that opens the application using the service port defined in the KOTS Application custom resource.</p>
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

   1. Lint the YAML files:

      ```bash
      replicated release lint --yaml-dir .
      ```
      **Example output:**
      ```bash
      RULE                                  TYPE    FILENAME         LINE    MESSAGE
      config-spec                           warn                                                                                                                                                    Missing config spec
      preflight-spec                        warn                                                                                                                                                    Missing preflight spec
      troubleshoot-spec                     warn                                                                                                                                                    Missing troubleshoot spec
      nonexistent-status-informer-object    warn    kots-app.yaml    8       Status informer points to a nonexistent kubernetes object. If this is a Helm resource, this warning can be ignored.
      ```
      :::note
      You can ignore any warning messages for the purpose of this quick start.
      :::

   1. Create the release and promote it to the Unstable channel:

      ```bash
      replicated release create --yaml-dir . --promote Unstable
      ```
      **Example output**:
      ```bash
        • Reading manifests from . ✓
        • Creating Release ✓
          • SEQUENCE: 1
        • Promoting ✓
          • Channel 2kvjwEj4uBaCMoTigW5xty1iiw6 successfully set to release 1
      ```

1. Create a customer so that you can install the release on your VM with Embedded Cluster:

   1. In the [Vendor Portal](https://vendor.replicated.com), under the application drop down, select the Gitea application that you created.

      <img alt="App drop down" src="/images/quick-start-select-gitea-app.png" width="250px"/>

      [View a larger version of this image](/images/quick-start-select-gitea-app.png)
   
   1. Click **Customers > Create customer**.

      The **Create a new customer** page opens:

      ![Customer a new customer page in the Vendor Portal](/images/create-customer.png)

      [View a larger version of this image](/images/create-customer.png)

   1. For **Customer name**, enter a name for the customer. For example, `Example Customer`.

   1. For **Channel**, select **Unstable**. This allows the customer to install releases promoted to the Unstable channel.

   1. For **License type**, select **Development**.

   1. For **License options**, enable the following entitlements:
      * **KOTS Install Enabled**
      * **Embedded Cluster Enabled**

   1. Click **Save Changes**.

1. Install the application with Embedded Cluster:
     
    1. On the page for the customer that you created, click **Install instructions > Embedded Cluster**.

       ![Customer install instructions dropdown](/images/customer-install-instructions-dropdown.png)

       [View a larger image](/images/customer-install-instructions-dropdown.png)

    1. On the command line, SSH onto your VM and run the commands in the **Embedded cluster install instructions** dialog to download the latest release, extract the installation assets, and install.

       <img width="500px" src="/images/embedded-cluster-install-dialog-latest.png" alt="embedded cluster install instructions dialog"/>

       [View a larger version of this image](/images/embedded-cluster-install-dialog-latest.png)

   1. When prompted, enter a password for accessing the Admin Console.

      The installation command takes a few minutes to complete.

      **Example output:**

      ```bash
      ? Enter an Admin Console password: ********
      ? Confirm password: ********
      ✔  Host files materialized!
      ✔  Running host preflights
      ✔  Node installation finished!
      ✔  Storage is ready!
      ✔  Embedded Cluster Operator is ready!
      ✔  Admin Console is ready!
      ✔  Additional components are ready!
      Visit the Admin Console to configure and install gitea-kite: http://104.155.145.60:30000
      ```

      At this point, the cluster is provisioned and the Admin Console is deployed, but the application is not yet installed.

   1. Go to the URL provided in the output to access to the Admin Console.
   
   1. On the Admin Console landing page, click **Start**.

   1. On the **Secure the Admin Console** screen, review the instructions and click **Continue**. In your browser, follow the instructions that were provided on the **Secure the Admin Console** screen to bypass the warning.

   1. On the **Certificate type** screen, either select **Self-signed** to continue using the self-signed Admin Console certificate or click **Upload your own** to upload your own private key and certificacte.

       By default, a self-signed TLS certificate is used to secure communication between your browser and the Admin Console. You will see a warning in your browser every time you access the Admin Console unless you upload your own certificate.

   1. On the login page, enter the Admin Console password that you created during installation and click **Log in**.

   1. On the **Configure the cluster** screen, you can view details about the VM where you installed, including its node role, status, CPU, and memory. Users can also optionally add additional nodes on this page before deploying the application. Click **Continue**. 

       The Admin Console dashboard opens.

   1. On the Admin Console dashboard, next to the version, click **Deploy** and then **Yes, Deploy**. 

      The application status changes from Missing to Unavailable while the `gitea` Deployment is being created.

   1. After a few minutes when the application status is Ready, click **Open App** to view the Gitea application in a browser.
   
      For example:

      ![Admin console dashboard showing ready status](/images/gitea-ec-ready.png)

      [View a larger version of this image](/images/gitea-ec-ready.png)

      <img alt="Gitea app landing page" src="/images/gitea-app.png" width="600px"/>

      [View a larger version of this image](/images/gitea-app.png) 

1. Return to the Vendor Portal and go to **Customers**. Under the name of the customer, confirm that you can see an active instance.

   This instance telemetry is automatically collected and sent back to the Vendor Portal by both KOTS and the Replicated SDK. For more information, see [About Instance and Event Data](/vendor/instance-insights-event-data).

1. Under **Instance ID**, click on the ID to view additional insights including the versions of Kubernetes and the Replicated SDK running in the cluster where you installed the application. For more information, see [Instance Details](/vendor/instance-insights-details).    

1. Create a new release that adds preflight checks to the application:

   1. In your local filesystem, go to the `gitea` directory.

   1. Create a `gitea-preflights.yaml` file in the `templates` directory:

      ```
      touch templates/gitea-preflights.yaml
      ```

   1. In the `gitea-preflights.yaml` file, add the following YAML to create a Kubernetes Secret with a simple preflight spec: 

      ```yaml
      apiVersion: v1
      kind: Secret
      metadata:
        labels:
          troubleshoot.sh/kind: preflight
        name: "{{ .Release.Name }}-preflight-config"
      stringData:
        preflight.yaml: |
          apiVersion: troubleshoot.sh/v1beta2
          kind: Preflight
          metadata:
            name: preflight-sample
          spec:
            collectors:
              - http:
                  collectorName: slack
                  get:
                    url: https://api.slack.com/methods/api.test
            analyzers:
              - textAnalyze:
                  checkName: Slack Accessible
                  fileName: slack.json
                  regex: '"status": 200,'
                  outcomes:
                    - pass:
                        when: "true"
                        message: "Can access the Slack API"
                    - fail:
                        when: "false"
                        message: "Cannot access the Slack API. Check that the server can reach the internet and check [status.slack.com](https://status.slack.com)."
      ```
      The YAML above defines a preflight check that confirms that an HTTP request to the Slack API at `https://api.slack.com/methods/api.test` made from the cluster returns a successful response of `"status": 200,`.

   1. In the `Chart.yaml` file, increment the version to 1.0.7:

      ```yaml
      # Chart.yaml
      version: 1.0.7
      ```

   1. Update dependencies and package the chart to a `.tgz` chart archive:

      ```bash
      helm package -u .
      ```

   1. Move the chart archive to the `manifests` directory:

      ```bash
      mv gitea-1.0.7.tgz manifests
      ```

   1. In the `manifests` directory, open the KOTS HelmChart custom resource (`gitea.yaml`) and update the `chartVersion`:

      ```yaml
      # gitea.yaml KOTS HelmChart
      chartVersion: 1.0.7
      ```  

   1. Remove the chart archive for version 1.0.6 of the Gitea chart from the `manifests` directory:

      ```
      rm gitea-1.0.6.tgz
      ```        

   1. From the `manifests` directory, create and promote a new release, setting the version label of the release to `0.0.2`:  

      ```bash
      replicated release create --yaml-dir . --promote Unstable --version 0.0.2
      ```
      **Example output**:
      ```bash
        • Reading manifests from . ✓
        • Creating Release ✓
          • SEQUENCE: 2
        • Promoting ✓
          • Channel 2kvjwEj4uBaCMoTigW5xty1iiw6 successfully set to release 2
      ```

1. On your VM, update the application instance to the new version that you just promoted:

   1. In the Admin Console, go to the **Version history** tab.

      The new version is displayed automatically.

   1. Click **Deploy** next to the new version.

      The Embedded Cluster upgrade wizard opens.

   1. In the Embedded Cluster upgrade wizard, on the **Preflight checks** screen, note that the "Slack Accessible" preflight check that you added was successful. Click **Next: Confirm and deploy**.   

      ![preflight page of the embedded cluster upgrade wizard](/images/quick-start-ec-upgrade-wizard-preflight.png)

      [View a larger version of this image](/images/quick-start-ec-upgrade-wizard-preflight.png)

      :::note
      The **Config** screen in the upgrade wizard is bypassed because this release does not contain a KOTS Config custom resource. The KOTS Config custom resource is used to set up the Config screen in the KOTS Admin Console.
      :::   

   1. On the **Confirm and Deploy** page, click **Deploy**.

1. Reset and reboot the VM to remove the installation:

   ```bash
   sudo ./APP_SLUG reset
   ```
   Where `APP_SLUG` is the unique slug for the application.
   
   :::note
   You can find the application slug by running `replicated app ls` on your local machine.
   :::

## Next Steps

Congratulations! As part of this quick start, you:
* Added the Replicated SDK to a Helm chart
* Created a release with the Helm chart
* Installed the release on a VM with Embedded Cluster
* Viewed telemetry for the installed instance in the Vendor Portal
* Created a new release to add preflight checks to the application
* Updated the application from the Admin Console

Now that you are familiar with the workflow of creating, installing, and updating releases, you can begin onboarding your own application to the Replicated Platform.

To get started, see [Onboard to the Replicated Platform](replicated-onboarding).

## Related Topics

For more information about the Replicated Platform features mentioned in this quick start, see:

* [About Distributing Helm Charts with KOTS](/vendor/helm-native-about)
* [About Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-about)
* [About the Replicated SDK](/vendor/replicated-sdk-overview)
* [Introduction to KOTS](/intro-kots)
* [Managing Releases with the CLI](/vendor/releases-creating-cli)
* [Packaging a Helm Chart for a Release](/vendor/helm-install-release)
* [Using Embedded Cluster](/vendor/embedded-overview)

## Related Tutorials

For additional tutorials related to this quick start, see:

* [Deploying a Helm Chart on a VM with Embedded Cluster](/vendor/tutorial-embedded-cluster-setup)
* [Adding Preflight Checks to a Helm Chart](/vendor/tutorial-preflight-helm-setup)
* [Deploying a Helm Chart with KOTS and the Helm CLI](/vendor/tutorial-kots-helm-setup)