# About customer license types

This topic describes the types of customer licenses. It also describes the
differences between community licenses and the other types of licenses.

## Types of customer licenses

Each customer license includes a `license_type` field.

The type of customer defined by the `license_type` field is used solely for reporting
purposes. A customer's access to your application is not affected by the type that
you assign.

The customer types are:

* **Development**: The Development type can be used internally by the development
team for testing and integration.
* **Trial**: The Trial type can be used for customers who are on 2-4 week trials
of your software.
* **Paid**: The Paid type identify the customer as a paying customer for which
additional information can be provided.
* **Community**: The Community type is designed for a community version of your
application. For more details about this type, see [About community licenses](#about-community-licenses)
below.

## About community licenses

This section describes what a community license is and what happens when your
customer uses a community license in the Replicated admin console.

**Note**: Not all accounts support community licenses. To enable community licenses,
contact [support@replicated.com](mailto:support@replicated.com).

Community licenses function in the same the other types of licenses, with the following
exceptions:

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
