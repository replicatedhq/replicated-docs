# About customers and licenses

Each customer you deploy to Replicated will need a separate license file for their installation.
This license file identifies the customer & application during the installation and update processes.
A customer license is created in the Customers section of the [vendor portal](https://vendor.replicated.com). You can manage the values and properties of that customer and license, including custom license fields, by selecting an individual customer.

If you are looking to create or manage custom license fields, you can do so in the License Fields section of the vendor portal, described in greater detail in the [Custom Entitlements](/vendor/entitlements/custom-entitlements) section.

## About customer license fields

This section describes the fields in the Customers page of the vendor portal
for creating a customer license.

### Name (Required)
The name of the customer to whom this license is assigned.

### Channel (Required)
When you create a license, you’ll need to assign it to at least one release channel.
The Stable channel is intended to be used for production installations.
Unstable and Beta channels are intended for internal testing.

When a license is assigned to multiple channels, the customer will be able to select the channel at install time, and later change the release channel in the management console.
For airgapped installs, the channel can be selected at download time only.

### Expiration Date
When you create a license, you can specify an expiration date. By default an application with an expired license will continue to run, but will be prevented from receiving updates.

However applications can be instrumented to implement custom behavior by reading the license values and employing custom application logic based on the values for the `expires_at` license field.

### Airgap Download Enabled
By default, licenses will be set to disable airgapped installations.
By enabling this feature, the actual .rli file will have license meta data embedded in it, and must be re-downloaded.

### License Type (Required)
It is important to identify the type of license that is being created: development, trial or paid.
Development licenses are designed to be used internally by the development team for testing and integration.
Trial licenses should be provided to customers who are on 2-4 week trials of your software.
Paid licenses identify the end customer as a paying customer (for which additional information can be provided.)

### Custom License Fields
Custom license fields can be set for all licenses.
This is useful if specific customer information might change from customer to customer.
These fields can be read from both the template functions, as well as from Admin Console API.
Examples of custom license fields are “seats” to limit the number of active users, or “hostname” in order to specify the domain that the application can be run on.
See the [Custom Entitlements](/vendor/entitlements/) section for more details.

## Archiving customer licenses
When a license is archived in the vendor portal, it will be hidden in the default license search and become read-only.
Archival does not affect the utility of license files downloaded before the change.
If you wish for them to expire, set an expiration date and policy before archiving.
This is a convenience feature for how licenses are displayed in the vendor portal.
