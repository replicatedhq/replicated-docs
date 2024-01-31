import ChangeChannel from "../partials/customers/_change-channel.mdx"
import KotsHelmChannels from "../partials/releases/_kots-helm-release-promotion.mdx"
import KotsEntitlement from "../partials/customers/_kots-entitlement-overview.mdx"

# About Customers

This topic provides an overview of customer licenses, including information about license types, the **Customers** page in the Replicated vendor portal, and how Replicated uses the customer entitlement information that you provide in licenses.

## Overview

Each customer that you create in the Replicated vendor portal has a unique license ID. Your customers use their license when they install or update your application.

You assign customers to channels in the vendor portal to control their access to your application releases. Customers can install or upgrade to releases that are promoted to the channel they are assigned. For example, assigning a customer to your Beta channel allows that customer to install or upgrade to only releases promoted to the Beta channel.

Each customer license includes several fields that uniquely identify the customer and the application, specify the customer's assigned release channel, and define the customer's entitlements, such as if the license has an expiration date or what application functionality the customer can access. Replicated securely delivers these entitlements to the application and makes them available at installation or at runtime.

For more information about how to create and manage customers, see [Creating and Managing Customers](releases-creating-customer).

## About License Types and Fields

This section describes license properties, including license types, built-in fields, and custom fields.

### License Types

Each customer license includes a type. The license type is used solely for reporting purposes. A customer's access to your application is not affected by the type that you assign.

The customer license types are:

* **Development**: The Development type can be used internally by the development
team for testing and integration.
* **Trial**: The Trial type can be used for customers who are on 2-4 week trials
of your software.
* **Paid**: The Paid type identifies the customer as a paying customer for which
additional information can be provided.
* **Community**: The Community type is designed for a free or low cost version of your application. For more details about this type, see [Community Licenses](licenses-about-types).

You can change the type of a license at any time in the vendor portal. For example, if a customer upgraded from a trial to a paid account, then you could change their license type from Trial to Paid for reporting purposes. 

### Built-in and Custom License Fields

Customer licenses have built-in fields and also support custom fields.

Built-in fields are reserved field names. You can specify the values for these fields to define entitlements for the customer. For example, Replicated includes built-in license fields to define the license expiration date, customer name, and application slug. For more information about built-in fields, see [About Built-in License Fields](licenses-using-builtin-fields).

You can also create custom license fields to define entitlements specific to the customer. For example, you can create a custom license field to limit the number of active users permitted. For more information about creating custom license fields, see [Managing Custom License Fields](licenses-adding-custom-fields).

## About License Handling

This section describes the default behavior for handling license updates and expiration.

### Updating and Replacing Licenses

You can make changes to a customer in the vendor portal to edit their license details, including the license type or the customer name, at any time. The license ID, which is the unique identifier for the customer, never changes. For more information about how to edit customers, see [Edit a Customer](releases-creating-customer#edit-a-customer) in _Creating and Managing Customers_.

Unless the existing customer is using a community license, it is not possible to replace one license with another license without reinstalling the application. When you need to make changes to a customer's entitlements, Replicated recommends that you edit the customer's license details in the vendor portal, rather than issuing a new license. When you update the license in the vendor portal, the customer does not need to reinstall to get the updates.

Community licenses are the only license type that can be replaced with a new license without needing to reinstall the application. For more information, see [Community Licenses](licenses-about-types).

### License Expiration Handling {#expiration}

The built-in `expires_at` license field defines the expiration date for a customer license. When you set an expiration date in the vendor portal, the `expires_at` field is set to midnight UTC on the date selected.

The `expires_at` field includes the following default logic for license expiration handling:
* By default, instances with expired licenses continue to run. To change the behavior of your application when a license expires, you can can add custom logic using the `expires_at` field. For more information, see [Checking Entitlements for Helm Installations](/vendor/licenses-reference-helm) or [Checking Entitlements for KOTS](/vendor/licenses-referencing-fields).
* Expired licenses cannot log in to the Replicated registry to pull a Helm chart for installation
* Expired licenses cannot pull application images through the proxy service or from the Replicated registry
* (KOTS Only) KOTS prevents instances with expired licenses from receiving updates

### Synchronizing Licenses with KOTS

When you edit customer licenses for an application installed with KOTS, your customers can use the admin console to update their license.

For online instances, license updates are pulled from the vendor portal when:
* An automatic or manual update check is performed by KOTS.
* A customer selects **Sync license** in the admin console.
* An application status changes. See [Current State](instance-insights-details#current-state) in _Instance Details_.

For air gap instances, because air gap licenses are signed with the updated fields, customers must upload a regenerated license file to the admin console every time you modify license fields. After you update the license fields in the vendor portal, you can notify customers by either sending them a new license file or instructing them to log into their download portal to retrieve the updated license. Then, they can click **Upload license** on the **License** tab of the admin console to upload the new license file.

For more information about community licenses, including how KOTS users can update licenses in the admin console, see [Updating Licenses](/enterprise/updating-licenses).

## About Customer Channel Assignment {#channel-assignment}

This section provides information about managing the channel a customer is assigned, including changing the assigned channel and manaing channel assignments for customers with or without the KOTS entitlement. For information about how to assign a customer to a channel, see [Create a Customer](releases-creating-customer#create-a-customer) in _Creating and Managing Customers_.

### Changing Channel Assignment

<ChangeChannel/>

For example, if the latest release promoted to the Beta channel is version 1.25.0 and version 1.10.0 is marked as required, when you edit an existing customer to assign them to the Beta channel, then the Replicated admin console always fetches 1.25.0, even though 1.10.0 is marked as required. The required release 1.10.0 is ignored and is not available to the customer for upgrade.

For more information about how to mark a release as required, see [Properties](releases-about#properties) in _About Channels and Releases_. For more information about how to synchronize licenses in the admin console, see [Updating Licenses](/enterprise/updating-licenses).

### Assigning KOTS-Enabled and Helm-Only Customers

<KotsEntitlement/>

Customers can only be assigned to channels where they can install the head release. As shown in the diagram below, both KOTS-enabled and Helm CLI-only customers can be installed to a channel where the head release contains the required Kubernetes manifests for KOTS releases and contains one or more Helm charts:

<img width="400px" alt="KOTS and Helm customers successfully assigned to a channel" src="/images/channel-assignment-kots-and-helm.png"/>

  [View a larger version of this image](/images/channel-assignment-kots-and-helm.png) 

To prevent KOTS-enabled or Helm CLI-only customers from accessing a release that they cannot install, Replicated prevents the following channel assignments:
* A KOTS-enabled customer cannot be assigned to a channel where the head release does _not_ contain the Kubernetes manifests required by KOTS.

  <img width="400px" alt="KOTS customer blocked from channel assignment" src="/images/channel-assignment-helm-only.png"/>

  [View a larger version of this image](/images/channel-assignment-helm-only.png) 

* A Helm CLI-only customer cannot be assigned to a channel where the head release does _not_ contain any Helm charts.

  <img width="400px" alt="Helm customer blocked from channel assignment" src="/images/channel-assignment-kots-only.png"/>
  
  [View a larger version of this image](/images/channel-assignment-kots-only.png)     

Additionally, Replicated prevents releases from being promoted to a channel if the customers assigned to the channel cannot install the release:

<KotsHelmChannels/>

## About the Customers Page

The following shows an example of the **Customers** page:

![Customers page](/images/customers-page.png)

[View a larger version of this image](/images/customers-page.png)

From the **Customers** page, you can do the following:

* Create new customers.

* Download CSVs with customer and instance data.

* Search and filter customers based on whether they are active, by license type, and by channel name.

* Click the **Manage customer** button to edit details such as the customer name and email, the custom license fields assigned to the customer, and the license expiration policy. For more information, see [Creating and Managing Customers](releases-creating-customer).

* (KOTS Only) Download the license file for each customer.

* Click the **Customer reporting** button to view data about the active application instances associated with each customer. For more information, see [Customer Reporting](customer-reporting).

* View instance details for each customer, including the version of the application that this instance is running, the Kubernetes distribution of the cluster, the last check-in time, and more:

  <img width="800px" src="/images/customer-reporting-details.png" />
  
  [View a larger version of this image](/images/customer-reporting-details.png)

* Archive customers. For more information, see [Creating and Managing Customers](releases-creating-customer).

* Click on a customer on the **Customers** page to access the following customer-specific pages:
  * [Reporting](#reporting-page)
  * [Customer details](#customer-details-page)
  * [Support bundles](#support-bundles-page)

### Reporting Page

The **Reporting** page for a customer displays data about the active application instances associated with each customer. The following shows an example of the **Reporting** page for a customer that has two active application instances:

![Customer reporting page in the vendor portal](/images/customer-reporting-page.png)
[View a larger version of this image](/images/customer-reporting-page.png)

For more information about interpreting the data on the **Reporting** page, see [Customer Reporting](customer-reporting).

### Customer Details Page

The **Customer details** page for a customer displays details about the customer license, including the customer name and email, the license expiration policy, custom license fields, and more.

The following shows an example of the **Customer details** page:

![Customer details page in the vendor portal](/images/customer-details.png)
[View a larger version of this image](/images/customer-details.png)

From the **Customer details** page, you can view and edit the customer's license fields or archive the customer. For more information, see [Creating and Managing Customers](releases-creating-customer).

### Support Bundles Page

The **Support bundles** page for a customer displays details about the support bundles collected from the customer. Customers with the **Support Bundle Upload Enabled** entitlement can provide support bundles through the Replicated admin console, or you can upload support bundles manually in the vendor portal by going to **Troubleshoot > Upload a support bundle**. For more information about uploading and analyzing support bundles, see [Inspecting Support Bundles](support-inspecting-support-bundles).

The following shows an example of the **Support bundles** page:

![Support bundles page in the vendor portal](/images/customer-support-bundles.png)
[View a larger version of this image](/images/customer-support-bundles.png)

As shown in the screenshot above, the **Support bundles** page lists details about the collected support bundles, such as the date the support bundle was collected and the debugging insights found. You can click on a support bundle to view it in the **Support bundle analysis** page. You can also click **Delete** to delete the support bundle, or click **Customer Reporting** to view the **Reporting** page for the customer.
