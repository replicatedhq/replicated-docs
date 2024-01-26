---
pagination_next: null
---

import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# Quick Start

Welcome! This topic provides a quick start workflow to help you get started with Replicated. For more information about Replicated, see [Introduction to Replicated](../intro-replicated).

The goals of this quick start workflow are to introduce new Replicated users to the following common tasks so that they can successfully onboard their application to the Replicated platform:
* Working with _applications_, _channels_, _releases_, and _customers_ in the Replicated vendor portal and replicated CLI
* Packaging a Helm chart into a chart archive and adding it to a release
* Testing and iterating on releases by installing in a development environment

:::note
For vendors with access to the Replicated KOTS installer that do _not_ intend to distribute an application that is packaged with Helm, see [KOTS Tutorial (UI)](tutorial-ui-setup)

to follow an onboarding workflow that uses a sample application with standard Kubernetes manifests and demonstrates installing with Replicated KOTS.
::: 

## Prerequisites

Before you begin, complete the following prerequisites:

* This workflow assumes that you have a Helm chart that you can install and develop against. Replicated strongly recommends that all vendors distribute their application as a Helm chart because many enterprise users expect to be able to install using Helm.

  You can use your own application chart or a sample chart. If you want to use a sample chart, Replicated recommends that you run the following Helm CLI command to to create a new `replicated-onboarding` folder with a basic NGINX deployment:
  ```bash
  helm create replicated-onboarding
  ``` 
  For more information, see [Helm Create](https://helm.sh/docs/helm/helm_create/) in the Helm documentation.
  
  Alternatively, more advanced users can also use one of the following open source Helm charts:
    * [Gitea](https://github.com/bitnami/charts/tree/main/bitnami/gitea)

       ```
       helm pull --untar oci://registry-1.docker.io/bitnamicharts/gitea
       ```

    * [MediaWiki](https://github.com/bitnami/charts/tree/main/bitnami/mediawiki) 

       ```
       helm pull --untar oci://registry-1.docker.io/bitnamicharts/mediawiki
       ```

    * [WordPress](https://github.com/bitnami/charts/tree/main/bitnami/wordpress)

       ```
       helm pull --untar oci://registry-1.docker.io/bitnamicharts/wordpress
       ```

* You must have kubectl access to a cluster where you can develop against the Helm chart. Replicated recommends that you confirm that you can successfully install the chart in the cluster and also log in to the application UI. After you confirm that you can install and access the application, uninstall it before proceeding to the onboarding workflow. For more information, see [Helm Install](https://helm.sh/docs/helm/helm_install/) and [Helm Uninstall](https://helm.sh/docs/helm/helm_uninstall/) in the Helm documentation.

## Workflow

This quick start workflow provides steps for using the Replicated vendor platform to create releases for a Helm chart, then using the Helm CLI to install in a development environment.

You will repeat these same basic steps to create and test releases throughout the onboarding process when you integrate and test Replicated features. You will also repeat these steps after onboarding whenever you need to integrate new Replicated features with your application.

1. Create an account in the vendor portal. You can either create a new team or join an existing team. For more information, see [Creating a Vendor Account](vendor-portal-creating-account).

1. Create a new application:

   1. In the [vendor portal](https://vendor.replicated.com/), from the application drop down, click **Create new app..**.

   1. In the **Name your application** field, enter a name based on the Helm chart that you will use for onboarding. For example, "Wordpress Test" or "MediaWiki Onboarding".

1. In the Helm chart `Chart.yaml`, add the Replicated SDK as a dependency:

   <DependencyYaml/>

   The Replicated SDK is a Helm chart that provides access to Replicated features and can be installed as a small service alongside your application. For more information, see [About the Replicated SDK (Beta)](/vendor/replicated-sdk-overview).

1. Update dependencies then package the Helm chart to a `.tgz` file:

   ```bash
   helm package . --dependency-update
   ```

   For more information, see [Packaging a Helm Chart for a Release](helm-install-release).  

1. Create a release with the Helm chart:

   1. In the vendor portal, click **Releases > Create release**.
   
      :::note
      If a drop down is displayed, click **Create Helm-only release**.
      :::
   
   1. In the **Upload Helm chart** dialog, drag and drop the Helm chart `.tgz` package. Click **Upload chart**.
      
      ![Upload Helm chart dialog](/images/upload-helm-chart-modal.png)
      
      [View a larger image](/images/upload-helm-chart-modal.png)

   1. On the release page, click **Promote**.

   1. In the dialog, For **Which channels you would like to promote this release to?** select **Unstable**. Unstable is a default channel that is intended for use with internal testing.

      <img alt="Promote release dialog" src= "/images/release-promote.png" width="500px"/>

      [View a larger image](/images/release-promote.png)

   1. Click **Promote**.

     :::note
     You can ignore any error messages in the **Promote Release** dialog.
     ::: 

1. Create a customer so that you can install the release in your cluster:

   1. Click **Customer > Create customer**.

   1. For **Customer name**, add a name.

   1. For **Channel**, select **Unstable**. This allows the customer to install releases promoted to the Unstable channel.

   1. For **Customer email**, enter an email address. An email address is required for Helm installations to authenticate with the Replicated registry. This email address is never used to send emails to customers.

   1. Click **Save Changes**.

   For more information, see [Creating and Managing Customers](/vendor/releases-creating-customer).

1. Install the application:
   1. On the **Customers** page for the customer that you created, click **Helm install instructions**.

      ![Helm install instructions button](/images/helm-install-button.png)

      [View a larger image](/images/helm-install-button.png)

   1. Run the commands in the **Helm install instructions** dialog to log in to the registry and install the Helm chart. Skip the step to run preflight checks.

     <img alt="Helm install instructions dialog" src="/images/helm-install-instructions-no-preflights.png" width="500px"/>
     
     [View a larger image](/images/helm-install-instructions-no-preflights.png)

     :::note
     Ignore the **No preflight checks found** warning, if one is displayed in the dialog. This warning appears because there are no specifications for preflight checks in the Helm chart archive. You will add preflight checks later in the onboarding process.
     ::: 

   1. After you install, in the vendor portal, go to **Customers**. Under the name of the customer, confirm that you can see an active instance.

     **Example**: 

     ![Customers page with one customer that has an active isntance](/images/onboarding-view-telemetry.png)
     [View a larger image](/images/onboarding-view-telemetry.png)
   
     This instance telemetry is automatically collected and sent back to the vendor portal when the Replicated SDK is installed alongside the application. For more information, see [Customer Reporting and Instance Insights](/vendor/replicated-sdk-overview#insights) in _About the Replicated SDK_.

   1. Under **Instance ID**, click on the ID to view additional insights including the versions of Kubernetes and the Replicated SDK running in the cluster where you installed the application. For more information, see [Instance Details](/vendor/instance-insights-details).

1. Create a new release in the vendor portal and then upgrade the instance in the cluster:

   1. Make a small change in the chart, such as incrementing the semantic version in the `Chart.yaml` to a new version. Then, package the chart again.

   1. In the vendor portal, create a new release (**Releases > Create release**). Drag and drop the new chart `.tgz` and then promote the new release to the Unstable channel. 

   1. In your cluster, run `helm upgrade` to upgrade the instance to the new release that you just promoted. The `helm upgrade` command is  the same as the command you used for `helm install` in a previous step, replacing `install` with `upgrade`.

      **Example**:

      ```
      helm upgrade wordpress oci://registry.replicated.com/my-app/unstable/wordpress
      ```

      See [Helm Upgrade](https://helm.sh/docs/helm/helm_upgrade/) in the Helm documentation.

   1. After the upgrade completes, return to the **Instance details** page in the vendor portal and confirm that you can see the new application version.

      **Example**:

      ![Instance details page](/images/onboarding-instance-details-new-version.png)

      [View a larger version](/images/onboarding-instance-details-new-version.png)

## Next Steps

Now that you are familiar with the workflow of creating and installing releases, you can continue creating new releases to configure and test additional Replicated features.

You can continue testing features with the sample Helm chart, or you can use your own application to begin the onboarding process.

To begin onboarding to the Replicated platform, see [Onboarding Checklist](replicated-onboarding-checklist).