# Onboard to the Replicated Platform

This topic describes how to onboard applications to the Replicated Platform.

## Before You Begin

This section includes guidance and prerequisites to review before you begin onboarding your application.  

### Best Practices and Recommendations

The following are some best practices and recommendations for successfully onboarding with Replicated:

* When integrating new Replicated features with an application, make changes in small iterations and test frequently by installing or upgrading the application in a development environment. This will help you to more easily identify issues and troubleshoot. This onboarding workflow will guide you through the process of integrating features in small iterations.

* Use the Replicated CLI to create and manage your application and releases. Getting familiar with the Replicated CLI will also help later on when integrating Replicated workflows into your CI/CD pipelines. For more information, see [Install the Replicated CLI](/reference/replicated-cli-installing).

* These onboarding tasks assume that you will test the installation of each release on a VM with the Replicated Embedded Cluster installer _and_ in a cluster with the Replicated KOTS installer. If you do not intend to offer existing cluster installations with KOTS (for example, if you intend to support only Embedded Cluster and Helm installations for your users), then can choose to test with Embedded Cluster only.

* Ask for help from the Replicated community. For more information, see [Get Help from the Community](#community) below.

### Getting Help from the Community {#community}

The [Replicated community site](https://community.replicated.com/) is a forum where Replicated team members and users can post questions and answers related to working with the Replicated Platform. It is designed to help Replicated users troubleshoot and learn more about common tasks involved with distributing, installing, observing, and supporting their application. 

Before posting in the community site, use the search to find existing knowledge base articles related to your question. If you are not able to find an existing article that addresses your question, create a new topic or add a reply to an existing topic so that a member of the Replicated community or team can respond.

To search and participate in the Replicated community, see https://community.replicated.com/.

### Prerequisites

* Create an account in the Vendor Portal. You can either create a new team or join an existing team. For more information, see [Create a Vendor Account](vendor-portal-creating-account).

* Install the Replicated CLI. See [Install the Replicated CLI](/reference/replicated-cli-installing).

* Complete a basic quick start workflow to create an application with a sample Helm chart and then promote and install releases in a development environment. This helps you get familiar with the process of creating, installing, and updating releases in the Replicated Platform. See [Replicated Quick Start](/vendor/quick-start).

* Ensure that you have access to a VM that meets the requirements for the Replicated Embedded Cluster installer. You will use this VM to test installation with Embedded Cluster.

  Embedded Cluster has the following requirements:

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

* (Optional) Ensure that you have kubectl access to a Kubernetes cluster. You will use this cluster to test installation with KOTS. If you do not intend to offer existing cluster installations with KOTS (for example, if you intend to support only Embedded Cluster and Helm installations for your users), then you do not need access to a cluster for the main onboarding tasks.

  You can use any cloud provider or tool that you prefer to create a cluster, such as [Replicated Compatibility Matrix](/vendor/testing-how-to), Google Kubernetes Engine (GKE), or minikube. 

## Onboard

Complete the tasks in this section to onboard your application. When you are done, you can continue to [Next Steps](#next-steps) to integrate other Replicated features with your application.

### Task 1: Create An Application

To get started with onboarding, first create a new application. This will be the official Vendor Portal application used by your team to create and promote both internal and customer-facing releases.

To create an application:

1. Create a new application using the Replicated CLI or the Vendor Portal. Use an official name for your application. See [Create an Application](/vendor/vendor-portal-manage-app#create-an-application).
   
   <details>
   <summary>Can I change the application name in the future?</summary>

   You can change the application name, but you cannot change the application _slug_.

   The Vendor Portal automatically generates and assigns a unique slug for each application based on the application's name. For example, the slug for "Example App" would be `example-app`.
   
   Application slugs are unique across all of Replicated. This means that, if necessary, the Vendor Portal will append a random word to the end of slug to ensure uniqueness. For example, `example-app-flowers`.
   </details>

1. Set the `REPLICATED_APP` environment variable to the unique slug of the application that you created. This will allow you to interact with the application from the Replicated CLI throughout onboarding. See [Set Environment Variables](/reference/replicated-cli-installing#replicated_app) in _Installing the Replicated CLI_.

   For example:

   ```bash
   export REPLICATED_APP=my-app
   ```

### Task 2: Connect Your Image Registry

Add credentials for your image registry to the Vendor Portal. This will allow you to use the Replicated proxy registry in a later step so that you can grant proxy access to application images without exposing registry credentials to your customers.

For more information, see [Connect to an External Registry](/vendor/packaging-private-images).

### Task 3: Add the Replicated SDK and Package your Chart

Next, add the Replicated SDK as a dependency of your Helm chart and package the chart as a `.tgz` archive.

The Replicated SDK is a Helm chart that can be installed as a small service alongside your application. The SDK provides access to key Replicated functionality, including an in-cluster API and automatic access to insights and operational telemetry for instances running in customer environments. For more information, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

To package your Helm chart with the Replicated SDK:

1. Go to the local directory where your Helm chart is.

1. In your application Helm chart `Chart.yaml` file, add the YAML below to declare the SDK as a dependency.
   
   If your application is installed as multiple charts, declare the SDK as a dependency of the chart that customers install first. Do not declare the SDK in more than one chart. For more information, see [Package a Helm Chart for a Release](helm-install-release).

   ```yaml
# Chart.yaml
dependencies:
- name: replicated
  repository: oci://registry.replicated.com/library
  version: 1.5.1
```

For the latest version information for the Replicated SDK, see the [replicated-sdk repository](https://github.com/replicatedhq/replicated-sdk/releases) in GitHub.   

1. Update dependencies and package the chart as a `.tgz` file:

    ```bash
helm package -u PATH_TO_CHART
```  
Where:
* `-u` or `--dependency-update` is an option for the `helm package` command that updates chart dependencies before packaging. For more information, see [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation.
* `PATH_TO_CHART` is the path to the Helm chart in your local directory. For example, `helm package -u .`.

The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

    :::note
If you see a `401 Unauthorized` error message, log out of the Replicated registry by running `helm registry logout registry.replicated.com` and then run `helm package . --dependency-update` again.
:::

1. If your application is deployed as multiple Helm charts, package each chart as a separate `.tgz` archive using the `helm package -u PATH_TO_CHART` command. Do not declare the SDK in more than one chart.

### Task 4: Create the Initial Release with KOTS HelmChart and Embedded Cluster Config {#first-release}

After packaging your Helm chart, you can create a release. The initial release for your application will include the minimum files required to install a Helm chart with the Embedded Cluster installer:
* The Helm chart `.tgz` archive
* [KOTS HelmChart custom resource](/reference/custom-resource-helmchart-v2)
* [Embedded Cluster Config](/reference/embedded-config)

If you have multiple charts, you will add each chart archive to the release, plus a corresponding KOTS HelmChart custom resource for each archive.

:::note
Configuring the KOTS HelmChart custom resource includes several tasks, and involves the use of KOTS template functions. Depending on how many Helm charts your application uses, Replicated recommends that you allow about two to three hours for configuring the HelmChart custom resource and creating and testing your initial release.
:::

To create the first release for your application:

1. In the local directory for your Helm chart, create a subdirectory named `manifests` where you will add the files for the release.

1. In the `manifests` directory:

   1. Move the `.tgz` chart archive that you packaged. If your application is deployed as multiple Helm charts, move each `.tgz` archive to `manifests`.

   1. Create an `embedded-cluster.yaml` file with the following default Embedded Cluster Config:

      ```yaml
apiVersion: embeddedcluster.replicated.com/v1beta1
kind: Config
spec:
  version: 2.1.3+k8s-1.30
```

      <details>
      <summary>What is the Embedded Cluster Config?</summary>
      
      The Embedded Cluster Config is required to install with Embedded Cluster.
      </details>
    
      For more information, see [Use Embedded Cluster](/vendor/embedded-overview).

   1. Create a new YAML file. In this file, configure the KOTS HelmChart custom resource by completing the workflow in [Configuring the HelmChart Custom Resource](helm-native-v2-using).
   
      <details>
      <summary>What is the KOTS HelmChart custom resource?</summary>
      
      The KOTS HelmChart custom resource is required to install Helm charts with KOTS and Embedded Cluster. As part of configuring the KOTS HelmChart custom resource, you will rewrite image names and add image pull secrets to allow your application images to be accessed through the Replicated proxy registry.
      </details>

   1. If your application is deployed as multiple Helm charts, repeat the step above to add a separate HelmChart custom resource for each Helm chart archive in the release.

   1. If there are values in any of your Helm charts that need to be set for the installation to succeed, you can set those values using the `values` key in the corresponding HelmChart custom resource. See [Set Helm Values with KOTS](/vendor/helm-optional-value-keys).
   
      This is a temporary measure to ensure the values get passed to the Helm chart during installation until you configure the Admin Console Config screen in a later onboarding task. If your default Helm values are sufficient for installation, you can skip this step.  

   1. If your application requires that certain components are deployed before the application and as part of the Embedded Cluster itself, then update the Embedded Cluster Config to add [extensions](/reference/embedded-config#extensions). Extensions allow you to provide Helm charts that are deployed before your application. For example, one situation where this is useful is if you want to ship an ingress controller because Embedded Cluster does not include one.

      For more information, see [extensions](/reference/embedded-config#extensions) in _Embedded Cluster Config_.   

1. From the `manifests` directory, create a release and promote it to the Unstable channel. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

    ```bash
    replicated release create --yaml-dir . --promote Unstable
    ```

1. Install the release in your development environment to test:

   1. Install with Embedded Cluster on a VM. See [Online Installation with Embedded Cluster](/enterprise/installing-embedded).
   
   1. (Optional) Install in an existing cluster with KOTS. See [Online Installation in Existing Clusters with KOTS](/enterprise/installing-existing-cluster).

After successfully installing the initial release on a VM with Embedded Cluster (and optionally in an existing cluster with KOTS), go to the next task. You will continue to iterate throughout the rest of the onboarding process by creating and promoting new releases, then upgrading to the new version in your development environment.

### Task 5: Customize the KOTS Admin Console {#admin-console}

Configure the KOTS Application custom resource to add an application name, icon, and status informers. The name and icon will be displayed in the Admin Console and the Replicated Download Portal. The status informers will be used to display the application status on the Admin Console dashboard.

To configure the KOTS Application custom resource:

1. In your `manifests` directory, create a new `kots-app.yaml` file.

1. In the `kots-app.yaml` file, add the [KOTS Application](/reference/custom-resource-application) custom resource YAML and set the `title`, `icon`, and `statusInformers` fields.

   **Example:**

    ```yaml
    apiVersion: kots.io/v1beta1
    kind: Application
    metadata:
      name: gitea
    spec:
      title: Gitea
      # Base64 encoded image string
      icon: fyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O
      statusInformers:
        - deployment/gitea
    ```
    For more information, see:
    * [Customizing the Application Icon](/vendor/admin-console-customize-app-icon)
    * [Enabling and Understanding Application Status](/vendor/insights-app-status)
    * [Application](/reference/custom-resource-application)
    <br/>
    <details>
    <summary>Can I preview the icon before installing the release?</summary>

     Yes. The Vendor Portal includes a **Application icon preview** in the **Help** pane on the **Edit release** page.

     ![Icon preview](/images/icon-preview.png)

     [View a larger version of this image](/images/icon-preview.png)

    </details>  

1. Create a new release and promote it to the Unstable channel. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

1. Install the release to test your changes. For Embedded Cluster installations, see [Performing Udpates in Embedded Clusters](/enterprise/updating-embedded). For existing cluster installations with KOTS, see [Perform Updates in Existing Clusters](/enterprise/updating-app-manager).

### Task 6: Set Up the Admin Console Config Screen and Map to Helm Values

The KOTS Admin Console Config screen is used to collect required and optional application configuration values from your users. User-supplied values provided on the Config screen can be mapped to your Helm values.

Before you begin this task, you can complete the [Set Helm Values with KOTS](/vendor/tutorial-config-setup) tutorial to learn how to map user-supplied values from the Admin Console Config screen to a Helm chart.

:::note
Setting up the Admin Console config screen can include the use of various types of input fields, conditional statements, and KOTS template functions. Depending on your application's configuration options, Replicated recommends that you allow about two to three hours for configuring the Config custom resource and testing the Admin Console config screen.
:::

To set up the Admin Console Config screen for your application:

1. In your `manifests` directory, create a new file named `kots-config.yaml`.

1. In `kots-config.yaml`, add the KOTS Config custom resource. Configure the KOTS Config custom resource based on the values that you need to collect from users.

    **Example:**

    ```yaml
    apiVersion: kots.io/v1beta1
    kind: Config
    metadata:
      name: my-application
    spec:
      groups:
        - name: example_group
          title: Example Group
          items:
            - name: example_item
              title: Example Item
              type: text
              default: "Hello World"
    ```

    For more information, see:
    * [Creating and Editing Configuration Fields](/vendor/admin-console-customize-config-screen) 
    * [Using Conditional Statements in Configuration Fields](/vendor/config-screen-conditional)  
    * [Config](/reference/custom-resource-config)

    <br/>

    <details>
    <summary>Can I preview the Admin Console config screen before installing the release?</summary>

     Yes. The Vendor Portal includes a **Config preview** in the **Help** pane on the **Edit release** page.

     For example:

     ![Config preview](/images/config-preview.png)

     [View a larger version of this image](/images/config-preview.png)
    </details>  

1. Create a new release and promote it to the Unstable channel. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

1. Install the release to test your changes. For Embedded Cluster installations, see [Performing Udpates in Embedded Clusters](/enterprise/updating-embedded). For existing cluster installations with KOTS, see [Perform Updates in Existing Clusters](/enterprise/updating-app-manager).

1. In `manifests`, open the KOTS HelmChart custom resource that you configured in a previous step. Configure the `values` key of the HelmChart custom resource to map the fields in the KOTS Config custom resource to your Helm values.

   For more information, see:
   * [Mapping User-Supplied Values](/vendor/config-screen-map-inputs)
   * [Tutorial: Set Helm Chart Values with KOTS](/vendor/tutorial-config-setup)
   * [Setting Helm Values with KOTS](/vendor/helm-optional-value-keys)
   * [`values`](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_

1. Create a new release and promote it to the Unstable channel. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

1. Install the release to test your changes. For Embedded Cluster installations, see [Performing Udpates in Embedded Clusters](/enterprise/updating-embedded). For existing cluster installations with KOTS, see [Perform Updates in Existing Clusters](/enterprise/updating-app-manager).

1. Continue to create and test new releases with new config fields until you are ready to move on to the next task.

### Task 7: Define Preflight Checks

In the next two tasks, you will add specs for _preflight checks_ and _support bundles_.

Preflight checks and support bundles are provided by the Troubleshoot open source project, which is maintained by Replicated. Troubleshoot is a kubectl plugin that provides diagnostic tools for Kubernetes applications. For more information, see the open source [Troubleshoot](https://troubleshoot.sh/docs/) documentation.

Preflight checks and support bundles analyze data from customer environments to provide insights that help users to avoid or troubleshoot common issues with an application:
* **Preflight checks** run before an application is installed to check that the customer environment meets the application requirements.
* **Support bundles** collect troubleshooting data from customer environments to help users diagnose problems with application deployments.

:::note
Before you begin this task, you can complete the [Add Preflight Checks to a Helm Chart](/vendor/tutorial-preflight-helm-setup) tutorial to learn how to add a preflight spec to a Helm chart in a Kubernetes secret and run the preflight checks before installation.
:::

To define preflight checks for your application:

1. In your Helm chart `templates` directory, add a Kubernetes Secret that includes a preflight spec. For more information, see [Define Preflight Checks](/vendor/preflight-defining). For examples, see [Example Preflight Specs](/vendor/preflight-examples).
     :::note
     If your application is deployed as multiple Helm charts, add the Secret to the `templates` directory for the chart that is installed first.
     :::

1. Update dependencies and package the chart as a `.tgz` file:

   ```bash
helm package -u PATH_TO_CHART
```  
Where:
* `-u` or `--dependency-update` is an option for the `helm package` command that updates chart dependencies before packaging. For more information, see [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation.
* `PATH_TO_CHART` is the path to the Helm chart in your local directory. For example, `helm package -u .`.

The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

1. Move the `.tgz` file to the `manifests` directory.

1. Create a new release and promote it to the Unstable channel. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

1. Install the release to test your changes. For Embedded Cluster installations, see [Performing Udpates in Embedded Clusters](/enterprise/updating-embedded). For existing cluster installations with KOTS, see [Perform Updates in Existing Clusters](/enterprise/updating-app-manager).

    Preflight checks run automatically during installation.

1. Continue to create and test new releases with additional preflight checks until you are ready to move on to the next task.

### Task 8: Add a Support Bundle Spec

To add the default support bundle spec to your application:

1. In your Helm chart `templates` directory, add the following YAML to a Kubernetes Secret to enable the default support bundle spec for your application:

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      labels:
        troubleshoot.sh/kind: support-bundle
      name: example
    stringData:
      support-bundle-spec: |
        apiVersion: troubleshoot.sh/v1beta2
        kind: SupportBundle
        metadata:
          name: support-bundle
        spec:
          collectors: []
          analyzers: []
    ```
    :::note
    If your application is installed as multiple Helm charts, you can optionally create separate support bundle specs in each chart. The specs are automatically merged when a support bundle is generated. Alternatively, continue with a single support bundle spec and then optionally revisit how you organize your support bundle specs after you finish onboarding.
    :::
   
1. (Recommended) At a minimum, Replicated recommends that all support bundle specs include the `logs` collector. This collects logs from running Pods in the cluster.

   **Example:**

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: example
     labels:
       troubleshoot.sh/kind: support-bundle
   stringData: 
     support-bundle-spec: |-
       apiVersion: troubleshoot.sh/v1beta2
       kind: SupportBundle
       metadata:
         name: example
       spec:
         collectors:
           - logs:
               selector:
                 - app.kubernetes.io/name=myapp
               namespace: {{ .Release.Namespace }}
               limits:
                 maxAge: 720h
                 maxLines: 10000
   ```

   For more information, see:
   * [Adding and Customizing Support Bundles](/vendor/support-bundle-customizing)
   * [Example Support Bundle Specs](/vendor/support-bundle-examples)
   * [Pod Logs](https://troubleshoot.sh/docs/collect/logs/) in the Troubleshoot documentation.

1. (Recommended) Ensure that any preflight checks that you added are also include in your support bundle spec. This ensures that support bundles collect at least the same information collected when running preflight checks. 

1. Update dependencies and package the chart as a `.tgz` file:

   ```bash
helm package -u PATH_TO_CHART
```  
Where:
* `-u` or `--dependency-update` is an option for the `helm package` command that updates chart dependencies before packaging. For more information, see [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation.
* `PATH_TO_CHART` is the path to the Helm chart in your local directory. For example, `helm package -u .`.

The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

1. Move the `.tgz` file to the `manifests` directory.

1. Create a new release and promote it to the Unstable channel. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

1. Install the release to test your changes. For Embedded Cluster installations, see [Performing Udpates in Embedded Clusters](/enterprise/updating-embedded). For existing cluster installations with KOTS, see [Perform Updates in Existing Clusters](/enterprise/updating-app-manager).

   For information about how to generate support bundles, see [Generate Support Bundles](/vendor/support-bundle-generating).

1. (Optional) Customize the support bundle spec by adding additional collectors and analyzers.

### Task 9: Alias Replicated Endpoints with Your Own Domains

Your customers are exposed to several Replicated domains by default. Replicated recommends you use custom domains to unify the customer's experience with your brand and simplify security reviews.

For more information, see [Use Custom Domains](/vendor/custom-domains-using).

## Next Steps

After completing the main onboarding tasks, Replicated recommends that you also complete the following additional tasks to integrate other Replicated features with your application. You can complete these next recommended tasks in any order and at your own pace.

### Add Support for Helm Installations

Existing KOTS releases that include one or more Helm charts can be installed with the Helm CLI; it is not necessary to create and manage separate releases or channels for each installation method.

To enable Helm installations for Helm charts distributed with Replicated, the only extra step is to add a Secret to your chart to authenticate with the Replicated proxy registry.  

This is the same secret that is passed to KOTS in the HelmChart custom resource using `'{{repl ImagePullSecretName }}'`, which you did as part of [Task 4: Create and Install the Initial Release](#first-release). So, whereas this Secret is created automatically for KOTS and Embedded Cluster installations, you need to create it and add it to your Helm chart for Helm installations.

:::note
Before you test Helm installations for your application, you can complete the [Deploy a Helm Chart with KOTS and the Helm CLI](tutorial-kots-helm-setup) tutorial to learn how to install a single release with both KOTS and Helm.
:::

To support and test Helm installations:

1. Follow the steps in [Using the Proxy Registry with Helm Installations](/vendor/helm-image-registry) to authenticate with the Replicated proxy registry by creating a Secret with `type: kubernetes.io/dockerconfigjson` in your Helm chart.

1. Update dependencies and package the chart as a `.tgz` file:

    ```bash
helm package -u PATH_TO_CHART
```  
Where:
* `-u` or `--dependency-update` is an option for the `helm package` command that updates chart dependencies before packaging. For more information, see [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation.
* `PATH_TO_CHART` is the path to the Helm chart in your local directory. For example, `helm package -u .`.

The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

1. Add the `.tgz` file to a release. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

1. Install the release in a cluster with the Helm CLI to test your changes. For more information, see [Install with Helm](/vendor/install-with-helm).

### Add Support for Air Gap Installations

Replicated Embedded Cluster and KOTS support installations in _air gap_ environments with no outbound internet access. Users can install with Embedded Cluster and KOTS in air gap environments by providing air gap bundles that contain the required images for the installers and for your application.

:::note
Replicated also offers Alpha support for air gap installations with Helm. If you are interested in trying Helm air gap installations and providing feedback, please reach out to your account rep to enable this feature.
:::

To add support for air gap installations:

1. If there are any images for your application that are not listed in your Helm chart, list these images in the `additionalImages` attribute of the KOTS Application custom resource. This ensures that the images are included in the air gap bundle for the release. One common use case for this is applications that use Kubernetes Operators. See [Define Additional Images](/vendor/operator-defining-additional-images).

1. In the KOTS HelmChart custom resource `builder` key, pass any values that are required in order for `helm template` to yield all the images needed to successfully install your application. See [Package Air Gap Bundles for Helm Charts](/vendor/helm-packaging-airgap-bundles).

    :::note
    If the default values in your Helm chart already enable all the images needed to successfully deploy, then you do not need to configure the `builder` key.
    ::: 

   <details>
   <summary>How do I know if I need to configure the `builder` key?</summary>
   
   When building an air gap bundle, the Vendor Portal templates the Helm charts in a release with `helm template` in order to detect the images that need to be included in the bundle. Images yielded by `helm template` are included in the bundle for the release.

   For many applications, running `helm template` with the default values would not yield all the images required to install. In these cases, vendors can pass the additional values in the `builder` key to ensure that the air gap bundle includes all the necessary images.
   </details>

1. If you have not done so already as part of [Task 4: Create and Install the Initial Release](#first-release), ensure that the `values` key in the KOTS HelmChart custom resource correctly rewrites image names for air gap installations. This is done using the KOTS HasLocalRegistry, LocalRegistryHost, and LocalRegistryNamespace template functions to render the location of the given image in the user's own local registry.

   For more information, see [Rewrite Image Names](/vendor/helm-native-v2-using#rewrite-image-names) in _Configuring the HelmChart Custom Resource v2_.

1. Create and promote a new release with your changes. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

1. In the [Vendor Portal](https://vendor.replicated.com), go the channel where the release was promoted to build the air gap bundle. Do one of the following:
     * If the **Automatically create airgap builds for newly promoted releases in this channel** setting is enabled on the channel, watch for the build status to complete.
     * If automatic air gap builds are not enabled, go to the **Release history** page for the channel and build the air gap bundle manually.

1. Create a customer with the **Airgap Download Enabled** entitlement enabled so that you can test air gap installations. See [Create and Manage Customers](/vendor/releases-creating-customer).

1. Download the Embedded Cluster air gap installation assets, then install with Embedded Cluster on an air gap VM to test. See [Install in Air Gap Environments with Embedded Cluster](/enterprise/installing-embedded-air-gap).

1. (Optional) Download the `.airgap` bundle for the release and the air gap bundle for the KOTS Admin Console. You can also download both bundles from the Download Portal for the target customer. Then, install in an air gap existing cluster to test. See [Air Gap Installation in Existing Clusters with KOTS](/enterprise/installing-existing-cluster-airgapped).

1. (Optional) Follow the steps in [Installing and Updating with Helm in Air Gap Environments (Alpha)](/vendor/helm-install-airgap) to test air gap installation with Helm. 

    :::note
    Air gap Helm installations are an Alpha feature. If you are interested in trying Helm air gap installations and providing feedback, please reach out to your account rep to enable this feature.
    :::

### Add Roles for Multi-Node Clusters in Embedded Cluster Installations

The Embedded Cluster Config supports roles for multi-node clusters. One or more roles can be selected and assigned to a node when it is joined to the cluster. Node roles can be used to determine which nodes run the Kubernetes control plane, and to assign application workloads to particular nodes.

For more information, see [roles](/reference/embedded-config#roles) in _Embedded Cluster Config_.

### Add and Map License Entitlements

You can add custom license entitlements for your application in the Vendor Portal. Custom license fields are useful when there is entitlement information that applies to a subset of customers. For example, you can use entitlements to:
* Limit the number of active users permitted
* Limit the number of nodes a customer is permitted on their cluster
* Identify a customer on a "Premium" plan that has access to additional features or functionality not available with your base plan

For more information about how to create and assign custom entitlements in the Vendor Portal, see [Manage Customer License Fields](/vendor/licenses-adding-custom-fields) and [Creating and Managing Customers](/vendor/releases-creating-customer).

#### Map Entitlements to Helm Values

You can map license entitlements to your Helm values using KOTS template functions. This can be useful when you need to set certain values based on the user's license information. For more information, see [Use KOTS Template Functions](/vendor/helm-optional-value-keys#using-kots-template-functions) in _Setting Helm Values with KOTS_.

#### Query Entitlements Before Installation and at Runtime

You can add logic to your application to query license entitlements both before deployment and at runtime. For example, you might want to add preflight checks that verify a user's entitlements before installing. Or, you can expose additional product functionality dynamically at runtime based on a customer's entitlements.

For more information, see:
* [Querying Entitlements with the Replicated SDK API](/vendor/licenses-reference-sdk)
* [Checking Entitlements in Preflights with KOTS Template Functions](/vendor/licenses-referencing-fields)

### Add Application Links to the Admin Console Dashboard

You can add the Kubernetes SIG Application custom resource to your release to add a link to your application from the Admin Console dashboard. This makes it easier for users to access your application after installation.

You can also configure the Kubernetes SIG Application resource add links to other resources like documentation or dashboards.

For more information, see [Add Application Links to the Dashboard](/vendor/admin-console-adding-buttons-links).

### Update the Preflight and Support Bundles Specs

After adding basic specs for preflights and support bundles, you can continue to add more collectors and analyzers as needed.

Consider the following recommendations and best practices:

* Revisit your preflight and support bundle specs when new support issues arise that are not covered by your existing specs.

* Your support bundles should include all of the same collectors and analyzers that are in your preflight checks. This ensures that support bundles include all the necessary troubleshooting information, including any failures in preflight checks.

* Your support bundles will most likely need to include other collectors and analyzers that are not in your preflight checks. This is because some of the information used for troubleshooting (such as logs) is not necessary when running preflight checks before installation.

* If your application is installed as multiple Helm charts, you can optionally add separate support bundle specs in each chart. This can make it easier to keep the specs up-to-date and to avoid merge conflicts that can be caused when multiple team members contribute to a single, large support bundle spec. When an application has multiple support bundle specs, the specs are automatically merged when generating a support bundle so that only a single support bundle is provided to the user.

The documentation for the open-source Troubleshoot project includes the full list of available collectors and analyzers that you can use. See [All Collectors](https://troubleshoot.sh/docs/collect/all/) and the [Analyze](https://troubleshoot.sh/docs/analyze/) section in the Troubleshoot documentation.

You can also view common examples of collectors and analyzers used in preflight checks and support bundles in [Preflight Spec Examples](preflight-examples) and [Support Bundle Spec Examples](support-bundle-examples).

### Configure Backup and Restore

Enable backup and restore with Velero for your application so that users can back up and restore their KOTS Admin Console and application data. 

There are different steps to configure backup and restore for Embedded Cluster and for existing cluster installations with KOTS:
* To configure the disaster recovery feature for Embedded Cluster, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery)
* To configure the snapshots feature for existing cluster KOTS installations, see [Configure Snapshots](snapshots-configuring-backups).

### Add Custom Metrics

In addition to the built-in insights displayed in the Vendor Portal by default (such as uptime and time to install), you can also configure custom metrics to measure instances of your application running in customer environments. Custom metrics can be collected for application instances running in online or air gap environments using the Replicated SDK.

For more information, see [Configure Custom Metrics](/vendor/custom-metrics).

### Integrate with CI/CD

Replicated recommends that teams integrate the Replicated Platform into their existing develeopment and production CI/CD workflows. This can be useful for automating the processes of creating new releases, promoting releases, and testing releases with the Replicated Compatibility Matrix.

For more information, see:
* [About Integrating with CI/CD](/vendor/ci-overview)
* [About Compatibility Matrix](/vendor/testing-about)
* [Recommended CI/CD Workflows](/vendor/ci-workflows)

### Customize Release Channels

By default, the Vendor Portal includes Unstable, Beta, and Stable channels. You can customize the channels in the Vendor Portal based on your application needs.

Consider the following recommendations:
* Use the Stable channel for your primary release cadence. Releases should be promoted to the Stable channel only as frequently as your average customer can consume new releases. Typically, this is no more than monthly. However, this cadence varies depending on the customer base.
* If you have a SaaS product, you might want to create an "Edge" channel where you promote the latest SaaS releases.
* You can consider a "Long Term Support" channel where you promote new releases less frequently and support those releases for longer.
* It can be useful to create channels for each feature branch so that internal teams reviewing a PR can easily get the installation artifacts as well as review the code. You can automate channel creation as part of a pipeline or Makefile.

For more information, see:
* [About Channels and Releases](/vendor/releases-about)
* [Creating and Editing Channels](/vendor/releases-creating-channels)

### Write Your Documentation

Before distributing your application to customers, ensure that your documentation is up-to-date. In particular, be sure to update the installation documentation to include the procedures and requirements for installing with Embedded Cluster, Helm, and any other installation methods that you support. 

For guidance on how to get started with documentation for applications distributed with Replicated, including key considerations, examples, and templates, see [Writing Great Documentation for On-Prem Software Distributed with Replicated](https://www.replicated.com/blog/writing-great-documentation-for-on-prem-software-distributed-with-replicated) in the Replicated blog.