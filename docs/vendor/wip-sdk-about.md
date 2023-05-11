# About the Replicated SDK Helm Chart

Vendors who install their application with Helm can use the Replicated SDK to integrate their application with core Replicated functionality while continuing to use their own installation process. The SDK is simply installed by Helm alongside the application, providing vendors access to telemetry, licensing, entitlements, update checks, and more, with little to no configuration needed.

## Use Cases
The SDK provides a number of APIs (reference) that can be used to embed Replicated functionality and application information into your application.

For example, if your application includes an admin console, the SDK APIs can be used to extend that admin console to include messages when new updates are available, license and entitlement information, 

The following use cases are examples and not an exhaustive list of what the SDK can be used for.

### Check for Application Updates
You can check for updates to the application by using the /api/v1/app/updates API. This is useful to inform customers about updates to the application. For example, a banner can display in your application when updates are available, encouraging users to update and providing update instructions to them.

### Check License Information and Entitlements

You can check a customer’s license information with the /api/v1/license/info API. License entitlements can be checked with the `/api/v1/license/fields and /api/v1/license/field/<field-name>` APIs.

License information, including license fields, is kept up to date by the SDK to reflect changes to the license in real time. In your application, you can revoke access when a license expires, expose additional product functionality dynamically based on the presence of certain entitlements, and more.

License fields are cryptographically signed to ensure their integrity. For information on how to verify license fields in your application, see Verify License Fields.
