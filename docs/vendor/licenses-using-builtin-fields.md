# About built-in license fields

This topic describes how to define the built-in license fields for a customer. It also describes all the built-in license fields.

For information about creating custom license fields for a customer, see [Creating custom license fields](licenses-adding-custom-fields).

All applications that are packaged and delivered through the Replicated vendor
portal include built-in license fields. Built-in fields are reserved field names
and are available in every customer license.

You can specify the values for these
fields to define the entitlements for the customer.

The following table describes each built-in license field that you can define for a
customer.

| License field         | Description           |
|------------------------|------------------------|
| `appSlug` | Application slug value. This value never changes. |
| `channelName` | Current channel name from which releases will be downloaded. When channel changes, the latest release of that will be downloaded on the next update check. |
| `customerName` | The name of the customer. |
| `endpoint` | The endpoint that Admin Console will use to sync license and download updates. This will usually be `https://replicated.app`. |
| `expires_at` | Defines the expiration date for the license. The date is encoded in ISO 8601 format (e.g., `2026-01-23T00:00:00Z`). If a license does not expire, this field is missing. By default an application with an expired license will continue to run, but will be prevented from receiving updates. Applications can be instrumented to implement custom behavior by reading the license values and employing custom application logic based on the values for the `expires_at` license field. |
| `isAirgapSupported` | If a license supports air gapped installations, then this field is set to `true`. If air gapped is not supported, this field is missing. When you enable this feature, the `.rli` file will have license meta data embedded in it, and must be re-downloaded. |
| `isGitOpsSupported` | If a license supports gitops-enablement in the Replicated admin console, this field is set to `true`. If GitOps is not supported, this field is either `false` or missing. |
| `isIdentityServiceSupported` | If a license supports identity-service enablement, this field is set to `true`. If Identity Service is not supported, this field is either `false` or missing. |
| `licenseID`, `licenseId` | ID of the installed license.  This value never changes. |
| `licenseSequence` | Every time a license is updated, its sequence number is incremented. This value represents the license sequence that the client currently has. |
| `license_type` | This field contains a string value that describes the type of the license. This is currently one of `paid`, `trial`, `dev` or `community`. For more information about license types, see [About customer license types](licenses-about-types).|
| `signature` | The base64 encoded license signature. This value will change when license is updated. |
