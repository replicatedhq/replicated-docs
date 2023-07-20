# Onboarding with Replicated

Welcome! This topic provides a basic onboarding workflow and a feature checklist to help you get started with Replicated. For more information about Replicated, see [Introduction to Replicated](../intro-replicated).

The goals of this topic are to introduce new vendors to the following common tasks so that they can successfully onboard their application to the Replicated platform:
* Working with applications, channels, releases, and customers in the Replicated vendor portal
* Testing and iterating on releases by installing in a development environment
* Integrating key Replicated features and functionality with an application

## Prerequisites

Before you begin, complete the following prerequisites:

* Create an account in the vendor portal. You can either create a new team or join an existing team. For more information, see [Creating a Vendor Account](vendor-portal-creating-account).
* The onboarding workflow in this topic assumes that you have a Helm chart. This can be your own application chart or a sample chart.

   If you want to use a sample chart, Replicated recommends that you use one of the following open source Helm charts:
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

* Ensure that you have kubectl access to a cluster where you can install and develop against the Helm chart.

## Best Practices and Recommendations

The following are Replicated's best practices and recommendations for successfully onboarding:

* If you are relatively new to Kubernetes or Helm, Replicated recommends that you follow a basic Kubernetes or Helm tutorial before you begin onboarding with Replicated. For example, [10 Helm Tutorials to Start your Kubernetes Journey](https://jfrog.com/blog/10-helm-tutorials-to-start-your-kubernetes-journey/).
* When integrating new Replicated features with an application, make changes in small iterations and test frequently by installing or upgrading the application in a development environment. This will help you to more easily identify issues and troubleshoot.
* After you are comfortable working in the vendor portal, try creating and managing releases with the replicated CLI. For more information, see [Installing the replicated CLI](reference/replicated-cli-installing).
* Ask for help from the Replicated community. For more information, see [Get Help from the Community](#get-help-from-the-community).

## Workflow

This workflow provides the steps for using the Replicated platform to create, install, and test releases for a Helm chart-based application. You will repeat these same basic steps throughout the onboarding process and after when integrating new Replicated features with an application.

To create and test 

1. Add the Replicated SDK to the Helm chart.
1. In the [vendor portal](https://vendor.replicated.com/), either select the target application or create a new application. Replicated recommends that you 
1. Create a release (Helm only), add Helm chart to a release and promote to Unstable.
1. Create a customer. Be sure to include an email address. Click Helm Install Instructions
1. Install in a cluster with Helm using the commands in the Helm Install dialog
1. Return to the vendor portal to confirm that you can see telemetry data for the instance. Since you included the SDK, this telemetry data is automatically collected and sent back to the vendor portal.
1. Create a new release:
  1. Make a minor change in your helm chart 
  1. Repackage and add it to the release again. Promote to unstable 
1. Use Helm to upgrade the app in your dev environment
1. Confirm that you can see the new version in the instance details in the vendor portal

## Features Checklist

This section provides a checklist of key Replicated features to integrate with your application. To get the most value from the Replicated platform, Replicated recommends that you follow the procedures provided to integrate each of these features. 

* Invite and manage team members. See [Invite Members](team-management#invite-members).
* Set up Slack or email notifications for telemetry
* Add custom license entitlements
* Add preflight checks spec in your Helm chart
* Add support bundles
* Configure the compatibility matrix. See LINK
* Add custom domains
* Provide registry credentials for the proxy service
* Validate license field signatures

## Get Help from the Community

The Replicated community site is a forum where Replicated team members and users can post questions and answers related to working with the Replicated platform. It is designed to help Replicated users troubleshoot and learn more about common tasks involved with distributing, installing, observing, and supporting their application. 

Before posting in the community site, use the search to find existing knowledge base articles related to your question. If you are not able to find an existing article that addresses your question, create a new topic or add a reply to an existing topic so that a member of the Replicated community or team can respond.

To search and participate in the Replicated community, see https://community.replicated.com/.