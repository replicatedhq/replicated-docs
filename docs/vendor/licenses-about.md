# About customer licenses

This topic describes the different fields and types for customer licenses. It also
describes how Replicated uses the customer entitlement information provided in
license files.

## Overview of customer licenses

Each customer that you create in the Replicated vendor portal has a unique license
file. The customer uploads this license file to the Replicated admin console when
they install and update your application.

Each customer license includes several fields that uniquely identify the customer
and the application, specify the release channel, and define _entitlement information_
about the customer.

Entitlement information describes the details of the license, such as if the license
has an expiration date.

Replicated securely delivers these entitlements to the application and makes them
available in the Kubernetes manifest files or at runtime using the Replicated admin
console API.

## About license types

Each customer license includes a `license_type` field. The type of customer defined
by the `license_type` field is used solely for reporting purposes. A customer's
access to your application is not affected by the type that you assign.

The possible values for the `license_type` field are development, trial, paid, and
community. For more information about each type, see [About customer license types](licenses-about-types).

## About built-in and custom license fields

Each customer license file has several built-in fields. Built-in fields are reserved
field names. You can specify the values for these fields to define entitlements
for the customer.

For example, there are built-in license fields that define the license expiration
date, the customer name, the application slug value, and whether air gap installations
are supported.

For more information about built-in fields, see [About built-in license fields](licenses-using-builtin-fields).

You can also create custom license fields. Custom license fields are useful when
there are entitlements specific to the customer.

For example, you can create a custom license field to limit the number of active
users permitted. Or, you can create a field that specifies the domain on which
the customer can run the application.

For more information about creating custom license fields, see [Creating custom license fields](licenses-adding-custom).

## About referencing license fields

After you define built-in or custom license fields for a customer in the vendor
portal, you create references to these license fields that your application can
query.

This ensures that the customer's application instance can enforce the entitlements
that you defined in their license file.

You can query the license fields when your customer installs or updates your
application by writing the fields to a Kubernetes manifest file.

You can also query the license fields during application runtime by sending an HTTP
request to the admin console API.

For more information, see [Referencing license fields](licenses-referencing-fields).

## About archiving customer licenses

When you archive a license in the vendor portal, it is hidden in the default license
search and becomes read-only. Archival does not affect the utility of license files
downloaded before the change.

To expire a license, set an expiration date and policy before archiving.
This is a convenience feature for how licenses are displayed in the vendor portal.
