# About Community Licenses

This topic describes community licenses. For more information about other types of licenses, see [Customer Types](licenses-about#customer-types) in _About Customers_.

## Overview

Community licenses are intended for use with a free or low cost version of your application. For example, you could use community licenses for an open source version of your application.

After installing an application with a community license, users can replace their community license with a new license of a different type without having to completely reinstall the application. This means that, if you have several community users who install with the same license, then you can upgrade a single community user without editing the license for all community users.

Community licenses are supported for applications that are installed with Replicated KOTS or with the Helm CLI.

For applications installed with KOTS, community license users can upload a new license file of a different type in the Replicated admin console. For more information, see [Upgrade from a Community License](/enterprise/updating-licenses#upgrade-from-a-community-license) in _Updating Licenses in the Admin Console_. 

## Limitations

Community licenses function in the same way as the other types of licenses, with the following
exceptions:

* Updating a community license to another type of license cannot be reverted.
* Community license users are not supported by the Replicated Support team.
* Community licenses cannot support air gapped installations.
* Community licenses cannot include an expiration date.

## Community License Admin Console Branding

For applications installed with KOTS, the branding in the admin console for community users differs in the following ways:

* The license tile on the admin console **Dashboard** page is highlighted in yellow and with the words **Community Edition**.

   ![Community License Dashboard](/images/community-license-dashboard.png)
   
   [View a larger version of this image](/images/community-license-dashboard.png)

* All support bundles and analysis in the admin console are clearly marked as **Community Edition**.

   ![Community License Support Bundle](/images/community-license-bundle.png)
   
   [View a larger version of this image](/images/community-license-bundle.png)