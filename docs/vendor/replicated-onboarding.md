# Onboarding with Replicated

Welcome! This topic provides an onboarding workflow and a feature checklist to help you get started with Replicated. For more information about Replicated, see [Introduction to Replicated](../intro-replicated).

The goals of this topic are to introduce new Replicated users to the following common tasks so that they can successfully onboard their application to the Replicated platform:
* Working with applications, channels, releases, and customers in the Replicated vendor portal and replicated CLI
* Testing and iterating on releases by installing in a development environment
* Integrating key Replicated features and functionality with an application

## Best Practices and Recommendations

The following are Replicated's best practices and recommendations for successfully onboarding:

* If you are relatively new to Kubernetes or Helm, start with a basic tutorial. For example, see [10 Helm Tutorials to Start your Kubernetes Journey](https://jfrog.com/blog/10-helm-tutorials-to-start-your-kubernetes-journey/) or [Tutorials](https://kubernetes.io/docs/tutorials/) in the Kubernetes documentation.

* When integrating new Replicated features with an application, make changes in small iterations and test frequently by installing or upgrading the application in a development environment. This will help you to more easily identify issues and troubleshoot.

* Try creating and managing releases with both the vendor portal and the replicated CLI. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

* Ask for help from the Replicated community. For more information, see [Get Help from the Community](#get-help-from-the-community).

* Before you distribute your own application to customers, review the [Planning](/vendor/planning-questionnaire) section for application architecture and planning recommendations. 

## Prerequisites

Before you begin, complete the following prerequisites:

* This workflow assumes that you have a Helm chart that you can install and develop against. This can be your own application chart or a sample chart. If you want to use a sample chart, Replicated recommends one of the following open source Helm charts:
    * [Gitea](https://github.com/bitnami/charts/tree/main/bitnami/gitea)

       ```
       helm fetch bitnami/gitea
       ```

    * [MediaWiki](https://github.com/bitnami/charts/tree/main/bitnami/mediawiki) 

       ```
       helm fetch bitnami/mediawiki
       ```

    * [WordPress](https://github.com/bitnami/charts/tree/main/bitnami/wordpress)

       ```
       helm fetch bitnami/wordpress
       ``` 

  :::note
  If you do not intend to distribute a Helm chart-based application with Replicated, see [KOTS Tutorial (UI)](tutorial-ui-setup) to follow an onboarding workflow that uses a sample application with standard Kubernetes manifests and demonstrates installing with Replicated KOTS.
  ::: 

* You must have kubectl access to a cluster where you can develop against the Helm chart. Replicated recommends that you confirm that you can successfully install the chart in the cluster and also log in to the application UI. After you confirm that you can install and access the application, uninstall it. For more information, see [Helm Install](https://helm.sh/docs/helm/helm_install/) and [Helm Uninstall](https://helm.sh/docs/helm/helm_uninstall/) in the Helm documentation.

## Onboarding Workflow

This onboarding workflow provides steps for using the Replicated platform to create releases for a Helm chart-based application, then using the helm CLI to install in a development environment.

You will repeat these same basic steps to create and test releases throughout the onboarding process to test Replicated features. You will also repeat these steps after onboarding whenever you need to integrate new Replicated features with your application.

To begin onboarding to the Replicated platform with a Helm chart: 

1. Create an account in the vendor portal. You can either create a new team or join an existing team. For more information, see [Creating a Vendor Account](vendor-portal-creating-account).

1. Create a new application:

   1. In the [vendor portal](https://vendor.replicated.com/), from the application drop down, click **Create new app..**.

   1. In the **Name your application** field, enter a name based on the Helm chart that you will use for onboarding. For example, "Wordpress Test" or "MediaWiki Onboarding".

1. In the Helm chart `Chart.yaml`, add the Replicated SDK as a dependency:

   ```yaml
   # Chart.yaml
   dependencies:
   - name: replicated
     repository: oci://registry.replicated.com/library
     version: 0.0.1-alpha.15
   ```

   The Replicated SDK is a Helm chart that provides access to Replicated features and can be installed as a small service alongside your application. For more information, see [About the Replicated SDK (Beta)](/vendor/replicated-sdk-overview).

1. Update dependencies then package the Helm chart to a `.tgz` file:

   ```bash
   helm package . -u
   ```

   For more information, see [Create a Helm Chart Package](helm-release-creating-package).  

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

   1. Click **Promote**.

     :::note
     You can ignore any error messages in the **Promote Release** dialog.
     ::: 

1. Create a customer so that you can install the release in your cluster:

   1. Click **Customer > Create customer**.

   1. For **Customer name**, add a name.

   1. For **Channel**, select **Unstable**. This allows the customer to install releases promoted to the Unstable channel.

   1. For **Customer email**, enter an email address. An email address is required for Helm installations to authenticate with the Replicated registry.

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
     Ignore the **No preflight checks found** warning, if one is displayed in the dialog. This warning appears because there are no specifications for preflight checks in the Helm chart archive.
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

   1. In your cluster, run `helm upgrade` to upgrade the instance to the new release that you just promoted.

      **Example**:

      ```
      helm upgrade --namespace default wordpress oci://registry.replicated.com/my-app/unstable/wordpress
      ```

      See [Helm Upgrade](https://helm.sh/docs/helm/helm_upgrade/) in the Helm documentation.

   1. After the upgrade completes, return to the **Instance details** page in the vendor portal and confirm that you can see the new application version.

      **Example**:

      ![Instance details page](/images/onboarding-instance-details-new-version.png)

      [View a larger version](/images/onboarding-instance-details-new-version.png)

1. Now that you are familiar with the workflow of creating and installing releases, repeat step 8 to integrate and test new Replicated features with the application. Integrate one feature at a time by creating a release and then upgrading in a development environment to test. For the list of recommended features to integrate, see [Features Checklist](#features-checklist) below.

1. (Recommended) Finish setting up your vendor portal account and team:

   1. If you are an admin, invite and manage team members. See [Invite Members](/vendor/team-management#invite-members) in _Managing Team Members_.

   1. Set up Slack or email notifications to be notified when there are changes in the installed instances of your application. Notifications can help catch problems before they happen and let you proactively contact customers to prevent support cases. See [Configuring Instance Notifications (Alpha)](/vendor/instance-notifications-config)

## Features Checklist

This section provides a checklist of key Replicated features to integrate with your application to fully onboard onto the Replicated platform. These features are provided in order of less challenging to more challenging, though you can configure and test the features in any order.

<table>
  <tr>
    <th width="20%">Feature</th>
    <th width="40%">Description</th>
    <th width="40%">How to</th>
  </tr>
  <tr>
    <td>Preflight checks</td>
    <td>
      <p>Define preflight checks to test for system compliance during the installation process and reduce the number of support escalations.</p>
      <p><strong>Estimated time:</strong> 1 hour to define and test one or more collectors and analyzers for your application</p>
    </td>
    <td>
      <ul>
      <li><a href="/vendor/preflight-helm-defining">Defining Preflight Checks for Helm Charts</a></li>
      <li><a href="/vendor/preflight-running">Running Preflight Checks for Helm Installations</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Support bundles</td>
    <td>
      <p>Add a support bundle spec to enable customers to quickly collect and analyze troubleshooting data from your their clusters to help you diagnose problems with application deployments.</p>
      <p><strong>Estimated time:</strong> 1 hour to define and test one or more collectors and analyzers for your application</p>
    </td>
    <td>
      <ul>
      <li><a href="/vendor/support-bundle-helm-customizing">Customize Support Bundles for Helm Installations</a></li>
      <li><a href="/vendor/support-bundle-generating">Generating Support Bundles</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Custom license entitlements</td>
    <td>
      <p>Configure custom license fields fields that are specific to a customer, such as limiting the number of active users permitted.</p>
      <p><strong>Estimated time:</strong> 30 minutes to 1 hour to create and test each entitlement</p>
    </td>
    <td>
      <ul>
      <li><a href="/vendor/licenses-adding-custom-fields">Managing Custom License Fields</a></li>
      <li><a href="/vendor/licenses-reference-helm">Checking Entitlements for Helm Installations</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Replicated SDK API</td>
    <td>
      <p>Embed Replicated functionality into Helm chart applications.</p><p>To get started, use integration mode to develop locally without needing to make real changes in the vendor portal or in your environment.</p>
      <p><strong>Estimated time:</strong> 1 hour to mock endpoints locally with integration mode, plus more time to optionally integrate features with your application</p>
    </td>
    <td>
      <ul>
      <li><a href="/reference/replicated-sdk-apis">Replicated SDK API</a></li>
      <li><a href="/vendor/replicated-sdk-development">Developing Against the SDK API</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Proxy service</td>
    <td>
      <p>Allow customer licenses to grant proxy access to your application's private images.</p>
      <p><strong>Estimated time:</strong> 1 to 2 hours to connect your external registry and update your Helm chart to deliver image pull secrets for the proxy service</p>
    </td>
    <td>
      <a href="/vendor/helm-image-registry">Proxying Images for Helm Installations</a>
    </td>
  </tr>
  <tr>
    <td>Custom domains</td>
    <td><p>Configure custom domains to alias the Replicated endpoints that are used for customer-facing URLs, such as `registry.replicated.com` and `proxy.replicated.com`</p>
    <p><strong>Estimated time:</strong> 30 minutes, plus up to 24 hours to create and verify the CNAME record in your DNS account.</p>
    </td>
    <td><a href="/vendor/custom-domains-using">Using Custom Domains</a>
    </td>
  </tr>
  <tr>
    <td>License field signature validation</td>
    <td><p>Verify the signatures of license fields when you check customer entitlements in your application.</p>
    <p><strong>Estimated time:</strong> 2 hours, including time to add entitlement checks in your application if you have not already</p></td>
    <td><a href="/vendor/licenses-verify-fields-sdk-api">Verifying License Field Signatures for Helm Installations</a>
    </td>
  </tr>
  <tr>
    <td>Compatibility matrix</td>
    <td><p>Quickly spin up ephemeral clusters for development, support, and testing.</p>
    <p><strong>Estimated time:</strong> Minutes to spin up a cluster with the replicated CLI, plus time for developing or testing on the cluster. Optionally, an additional 2 hours to configure GitHub Actions in your CI pipeline to automatically test releases with the compatibility matrix.</p>
    </td>
    <td>TBD
    </td>
  </tr>
  <tr>
    <td>Replicated KOTS</td>
    <td><p>For vendors with access to the KOTS installer, add custom resources to your release to support KOTS installations.</p>
    <p><strong>Estimated time:</strong> 1 to 2 hours to configure and test each custom resource.</p>
    </td>
    <td><a href="/vendor/distributing-workflow">Onboarding with KOTS</a>
    </td>
  </tr>
</table>

## Get Help from the Community

The [Replicated community site](https://community.replicated.com/) is a forum where Replicated team members and users can post questions and answers related to working with the Replicated platform. It is designed to help Replicated users troubleshoot and learn more about common tasks involved with distributing, installing, observing, and supporting their application. 

Before posting in the community site, use the search to find existing knowledge base articles related to your question. If you are not able to find an existing article that addresses your question, create a new topic or add a reply to an existing topic so that a member of the Replicated community or team can respond.

To search and participate in the Replicated community, see https://community.replicated.com/.