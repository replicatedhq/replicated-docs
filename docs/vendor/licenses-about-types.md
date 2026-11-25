# About community licenses

This topic describes community licenses. For more information about other types of licenses, see [Customer Types](licenses-about#customer-types) in _About Customers_.

## Overview

Community licenses are intended for use with a free or low cost version of your application. For example, you could use community licenses for an open source version of your application.

Community licenses are supported for applications that are installed with Embedded Cluster, Replicated KOTS, or the Helm CLI.

## Upgrade a community user to another license type {#upgrade}

To move a community user to a paid or trial license, change the license type of their customer in the Vendor Portal. Installations pick up the new type the next time they sync the license, without a reinstall.

A license type change applies to every installation that uses the license. If several users install with the same community license, changing its type upgrades all of them. To upgrade users one at a time, create a separate customer with its own community license for each user.

For applications installed with KOTS, community license users can also upload a license file for a different customer in the Replicated Admin Console. After the upload, the user can't change the license again in the Admin Console. For more information, see [Upgrade from a Community License](/enterprise/updating-licenses#upgrade-from-a-community-license) in _Updating Licenses in the Admin Console_. Embedded Cluster v3 installations can't change to a license for a different customer. For more information, see [Refresh the license](/embedded-cluster/v3/embedded-manage-nodes#refresh-license) in _Access and manage embedded clusters_.

## Limitations

Community licenses function in the same way as the other types of licenses, with the following
exceptions:

* Community license users are not supported by the Replicated Support team.
* Community licenses don't support air gap installations with Embedded Cluster, KOTS, or kURL. You can still enable the **Helm CLI Air Gap Instructions** install option for a community license. This option only shows customers instructions for relocating the application images to their own registry, instead of pulling them from the Replicated registry during the Helm installation. For more information, see [Manage install types for a license](licenses-install-types).
* Community licenses can't include an expiration date. To stop a community license from being used to install, update, or pull images, change its license type to Trial or Paid and set an expiration date.

## Community license Admin Console branding

For applications installed with KOTS, the branding in the admin console for community users differs in the following ways. The Embedded Cluster v3 Admin Console doesn't show this branding. Its **License** page lists the license type.

* The navigation bar shows a **Community Edition** label next to the application logo.

* The **License** page shows a **Community Edition** label and a **Change license** button for uploading a license for a different customer.

* The license tile on the admin console **Dashboard** page is highlighted in yellow and with the words **Community Edition**.

   ![Community License Dashboard](/images/community-license-dashboard.png)
   
   [View a larger version of this image](/images/community-license-dashboard.png)

* All support bundles and analysis in the admin console are clearly marked as **Community Edition**.

   ![Community License Support Bundle](/images/community-license-bundle.png)
   
   [View a larger version of this image](/images/community-license-bundle.png)