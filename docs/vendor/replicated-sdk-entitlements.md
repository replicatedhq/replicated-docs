# Checking License Information and Entitlements

You can check a customer’s license information with the get license info API. License entitlements can be checked with the get license fields and get license field APIs.

License information, including license fields, is kept up to date by the SDK to reflect changes to the license in real time. In your application, you can revoke access when a license expires, expose additional product functionality dynamically based on entitlement values, and more.

For example, although customers must have a valid license to log in to the registry and pull your chart, you can check the license expiration at runtime if you want to revoke access to the application when a license expires.

You can check the license expiration with the get license field API by setting expires_at as the license field path parameter. For example, /api/v1/license/fields/expires_at.

License fields are cryptographically signed to ensure their integrity. For information on how to verify license fields in your application, see Verify License Fields.