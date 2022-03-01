# Using Vendor API Tokens

Using the [replicated CLI](replicated-cli-installing) and [Vendor REST API](vendor-api-using) requires a token for authorization.  Replicated supports two types of tokens: Service Accounts and User Tokens. Existing team tokens continue to work but are deprecated and new team tokens cannot be created.

Some operations can only be performed by a user logged into the vendor portal. The following administrative resources can only be executed by a logged-in user and cannot be managed with token-based authentication:

- Team members
- Tokens
- Notifications
- Integrations
- User Tokens
- Service Account Tokens

Tokens are primarily used with the [vendor api](vendor-api-using) and the [replicated CLI](replicated-cli-installing) for automated customer, channel, and release management.

## Service Accounts

Service accounts are assigned a token and associated with an RBAC policy. Any user with the proper permissions can create, retrieve or revoke them. Admin users can assign any RBAC policy to a service account. Non-admin users can only assign their own RBAC policy.

At creation time, users can also choose to limit the service account to a read-only version of the selected RBAC policy

Service account names must be unique within a given team.

Service account tokens are only displayed once when created. The token cannot be retrieved again after initial creation. 

Updates to a service account's RBAC policy are automatically applied to its associated token. When a service account is removed, its token is also invalidated.

## User Tokens

User tokens are private to the user creating the token. User tokens assume the user's account when used, including RBAC permissions.

User token names must be unique per user.

User tokens are only displayed once when created. The token cannot be retrieved again after initial creation. 

Revoking a user token will immediately invalidate that token. Additionally, deleting the user account also deletes all user tokens that belong to the user account.

Updates to a user's RBAC role are applied to the user's tokens. 

## Team Tokens

Team tokens are deprecated, but continue to function similar to Service Accounts. Team tokens are not connected to a user account lifecycle. Team tokens do not have an RBAC policy applied other than Admin or Read Only. All use cases for a team token can be replaced with a Service Account.

We recommended replacing Team Tokens with Service Accounts for automation and integrations.
