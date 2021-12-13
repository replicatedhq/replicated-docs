# Using built-in entitlements

All KOTS applications that are packaged and delivered through the Replicated [Vendor Portal](https://vendor.replicated.com) include built-in entitlement fields.
The application vendor can specify the values for these fields, but these are reserved field names and are available in every license.

## List of built-in entitlement fields

### License Expiration Date

**Field Name**: `expires_at`

**Description**: If a license has an expiration date, the expiration date will be included in the license here.
The date is encoded in ISO 8601 format (e.g., `2026-01-23T00:00:00Z`).
If a license does not expire, this field will be missing.

### Airgapped Support

**Field Name**: `isAirgapSupported`

**Description**: If a license supports airgapped installations, this field will be present and set to `true`.
If airgapped is not supported, this field will be missing.

### License Type

**Field Name**: `license_type`

**Description**: This field contains a string value that describes the type of the license.
This is currently one of `paid`, `trial`, `dev` or `community`.

### GitOps Support

**Field Name**: `isGitOpsSupported`

**Description**: If a license supports gitops-enablement in the Admin Console, this field will be present and set to `true`.
If GitOps is not supported, this field is either `false` or missing.

### Identity Service Support

**Field Name**: `isIdentityServiceSupported`

**Description**: If a license supports identity-service enablement, this field will be present and set to `true`.
If Identity Service is not supported, this field is either `false` or missing.

### License Sequence

**Field Name**: `licenseSequence`

**Description**: Every time a license is updated, its sequence number is incremented.  
This value represents the license sequence that client currently has.

### License Signature

**Field Name**: `signature`

**Description**: The base64 encoded license signature.  
This value will change when license is updated.

### App Slug

**Field Name**: `appSlug`

**Description**: Application slug value.  This value never changes.

### Channel Name

**Field Name**: `channelName`

**Description**: Current channel name from which releases will be downloaded.
When channel changes, the latest release of that will be downloaded on the next update check.

### Customer Name

**Field Name**: `customerName`

**Description**: The name of this customer/license.

### API Endpoint

**Field Name**: `endpoint`

**Description**: The endpoint that Admin Console will use to sync license and download updates.
This will usually be `https://replicated.app`.

case "licenseID", "licenseId":
### License ID

**Field Name**: `licenseID`, `licenseId`

**Description**: ID of the installed license.  This value never changes.

## Using Built-In Fields

Built-In entitlement fields are referenced the nearly the same as you would for [Custom Entitlement Fields](/vendor/entitlements/custom-entitlements).  

* **Within application manifests**: Use the [LicenseFieldValue](/reference/template-functions/license-context) function to return the value of the corresponding built-in field (e.g., `value: '{{repl LicenseFieldValue "expires_at" }}'`
* **Within the application**: Execute an http request to `http://kotsadm:3000/license/v1/license` to return the license API response, then parse the response to find the return the corresponding license field value.
