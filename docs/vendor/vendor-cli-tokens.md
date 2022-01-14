# Using Vendor API Tokens

Using the [Vendor CLI](https://help.replicated.com/api/replicated-vendor-cli/) and [REST API](https://help.replicated.com/api/vendor-api/) requires a token for authorization.  Replicated supports three types of tokens: Team, Service Account and User Tokens.

Some operations can only be performed by a user logged into the vendor portal. The following administrative resources can only be executed by a logged-in user and cannot be managed with token-based authentication:
- Team members
- Tokens
- Notifications
- Integrations
- User Tokens
- Service Account Tokens

Tokens are primarily used with the [Vendor CLI](https://help.replicated.com/api/replicated-vendor-cli/) or [REST API](https://help.replicated.com/api/vendor-api/) commands for automated customer, channel, and release management.

## Service Accounts

Service accounts are assigned a token and associated with an RBAC policy. Any user with the proper permissions can create, retrieve or revoke them. Admin users can assign any RBAC policy to a service account. Non-admin users can only assign their own RBAC policy.

Users can also assign write or read only permissions. The associated token applies the least privilege between the RBAC policy and permissions.

Service account names must be unique within a given team.

Service account tokens are only displayed once when created. The token may never be retrieved again after initial creation. It is highly recommended to store the token in a safe place, such as a password vault.

Updates to a service account's RBAC policy are automatically applied to its associated token. When a service account is removed, it's token is also invalidated.

## User Tokens

User tokens are private to the user creating the token. User tokens assume the user's account when used, including RBAC permissions.

User token names must be unique per user.

User tokens are only displayed once when created. The token may never be retrieved again after initial creation. It is highly recommended to store the token in a safe place, such as a password vault.

Revoking a user token will immediately invalidate that token.

Updates to a user's RBAC role are applied to the user's tokens. A removed user's tokens are immediately invalidated.

## Team Tokens

Team tokens are available to all members of the vendor team. These tokens can be created, retrieved, and revoked by any user with the proper RBAC policy.

Team tokens can be set to Read Only or Read / Write privileges. This privilege applies to the entirety of the team where the team token is created.

It is recommended to first leverage user and service account tokens as they provide more robust privilege control and flexibility.
