# Application settings page

Each application has its own settings, which include the application name and application slug.

To access application settings, log in to the [Vendor Portal](https://vendor.replicated.com/) and go to **_Application Name_ > Settings**. The **Settings** page has the following tabs:

- **Application settings:** The settings described on this page.
- **Replicated SDK signature verification:** Provides the public key for the application and code samples for verifying the signatures on license fields. For more information, see [Verify License Field Signatures with the Replicated SDK API](/vendor/licenses-verify-fields-sdk-api).

The following describes each of the application settings:

- **Application name:** The application name is initially set when you first create the application in the Vendor Portal. You can change the name at any time so that it displays as a user-friendly name that your team can easily identify.
- **Application slug:** The application slug is used with the Replicated CLI and with some of the KOTS CLI commands. You can click on the link below the slug to toggle between the application ID number and the slug name. The application ID and application slug are unique identifiers that cannot be edited.
- **Install methods:** Lists the installation methods that your team can use with the application. Helm is always listed. Embedded Cluster, KOTS, and kURL are listed when your team is entitled to them. This setting is read-only. To change the installation methods available to your team, contact Replicated support.
- **Service Account Tokens:** Provides a link to the the **Service Accounts** page, where you can create or remove a service account. Service accounts are paired with API tokens and are used with the Vendor API to automate tasks. For more information, see [Use Vendor API Tokens](/reference/vendor-api-using).
- **Danger Zone:** Lets you delete the application, and all of the licenses and data associated with the application. The delete action cannot be undone.
