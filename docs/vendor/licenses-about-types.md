# About Customer License Types

This topic describes the types of customer licenses, updating licenses, and the
differences between community licenses and the other types of licenses.

## Types of Customer Licenses

Each customer license includes a `license_type` field.

The type of customer defined by the `license_type` field is used solely for reporting
purposes. A customer's access to your application is not affected by the type that
you assign.

The customer types are:

* **Development**: The Development type can be used internally by the development
team for testing and integration.
* **Trial**: The Trial type can be used for customers who are on 2-4 week trials
of your software.
* **Paid**: The Paid type identifies the customer as a paying customer for which
additional information can be provided.
* **Community**: The Community type is designed for a free or low cost version of your
application. For more details about this type, see [Community Licenses](#community-licenses)
below.

## Updating a Customer License Type

You can update a customer license type in the Replicated vendor portal, for example, from a trial license to a paid license. An update impacts all instances that are deployed using that license.

![Customer Page in Vendor Portal](/images/customer-license-type.png)

[View a larger image](/images/customer-license-type.png)

It is unlikely that the license change will prompt any changes to the application deployment itself. However, if you also modify other license fields as part of the license conversion, this can trigger changes to the deployed application. For more information about license fields, see [License Fields](license-fields).

Your customer uses the Replicated admin console to synchronize the licenses on their instances. Unless a customer is upgrading from a community license, it is not possible to replace one license file with another license file without completely reinstalling the application. Using the vendor portal to change the license type prevents end customers from having to reinstall. 

Updating from a community license to another type cannot be reverted. For more information about community licenses, see [Community Licenses](#community-licenses).



## Community Licenses

Community licenses are intended for use with a free or low cost version
of your application. For example, you could use community licenses for an
open source version of your application.

:::note
Not all accounts support community licenses. To enable community licenses,
contact [support@replicated.com](mailto:support@replicated.com).
:::

Community licenses function in the same the other types of licenses, with the following
exceptions:

* **Support for changing to a different license**: After installing an application with
a community license, enterprise users can change their community license to a different
license. Because several of your community users might use the same community
license, this allows you to upgrade a single user to a new license without changing the
community license for all users. This also allows you to upgrade a user
from a shared community license without requiring them to reinstall the application. For more information,
see [Changing a Community License](../enterprise/updating-licenses#changing-a-community-license)
in _Updating Licenses_. 
* **No air gapped support**: Community licenses cannot support air gapped installations.
* **No expiration**: Community licenses cannot include an expiration date.
* **Marking in the admin console**: When a community license is installed, the
admin console indicates this to differentiate the experience.
The license tile on the Dashboard page is highlighted in yellow and with the words
"Community Edition".
   ![Community License Dashboard](/images/community-license-dashboard.png)
* **Support bundle**: Because community licenses are not designed to include the
same level of support as paid licenses, all support bundles and analysis in the
admin console will be clearly marked as Community Edition.
The same functionality is included in the support bundle and analysis, there is
just additional marking to help differentiate.
   ![Community License Support Bundle](/images/community-license-bundle.png)
