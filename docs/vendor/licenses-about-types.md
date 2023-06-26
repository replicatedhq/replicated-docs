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

It is unlikely that the license change will prompt any changes to the application deployment itself. However, if you also modify other license fields as part of the license conversion, this can trigger changes to the deployed application.

Your customer uses the Replicated admin console to synchronize the licenses on their instances. For online instances, license updates are pulled from the vendor portal when:

- An automatic or manual update check is performed by Replicated KOTS.
- A customer selects **Sync license** in the admin console.
- An app status changes. See [About Instance Reporting](instance-insights-details#about-reporting) in _Instance Details_.

Because air gap licenses are signed with the updated fields, a regenerated license file must be uploaded directly to the admin console every time you modify license fields. After you update the license fields in the vendor portal, you can notify customers by either sending them a new license file or instructing them to log into their download portal to retrieve the updated license. Customers can then click **Upload license** on the License tab in the admin console to upload the updated license to their air gap environment.

Unless a customer is upgrading from a community license, it is not possible to replace one license file with another license file without completely reinstalling the application. Using the vendor portal to change the license type prevents end customers from having to reinstall. 

After installing an application with a community license, enterprise users can change their community license to a different license. Because several of your community users might use the same community license, this allows you to upgrade a single user to a new license without changing the community license for all users. This also allows you to upgrade a user from a shared community license without requiring them to reinstall the application. For more information, see [Change Community Licenses](/enterprise/updating-licenses#change-community-licenses) in _Updating Licenses_. 

Updating from a community license to another type cannot be reverted. For more information about community licenses, see [Community Licenses](#community-licenses).

## Community Licenses

Community licenses are intended for use with a free or low cost version
of your application. For example, you could use community licenses for an
open source version of your application.

### Limitations

Community licenses function in the same the other types of licenses, with the following
exceptions:

* Community license users are not supported by the Replicated Support team.
* Community licenses cannot support air gapped installations.
* Community licenses cannot include an expiration date.
* When a community license is installed, the admin console indicates this to differentiate the experience. The license tile on the Dashboard page is highlighted in yellow and with the words "Community Edition".

   ![Community License Dashboard](/images/community-license-dashboard.png)
   [View a larger version of this image](/images/community-license-dashboard.png)

* Because community licenses are not designed to include the same level of support as paid licenses, all support bundles and analysis in the admin console are clearly marked as Community Edition. The same functionality is included in the support bundle and analysis, there is just additional marking to help differentiate.

   ![Community License Support Bundle](/images/community-license-bundle.png)
   [View a larger version of this image](/images/community-license-bundle.png)
