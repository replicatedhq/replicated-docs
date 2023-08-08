# Generating API Tokens

This topic describes the available types of API tokens and how to generate them for use with the replicated CLI and Replicated Vendor API v3.

## About API Tokens

The Vendor API v3 is the API that manages applications in the Replicated vendor portal. The replicated CLI is an implementation of the Vendor API v3.

Using the replicated CLI and Vendor API V3 requires an API token for authorization. Tokens are primarily used for automated customer, channel, and release management. You create tokens in the vendor portal.

The following types of tokens are available:

- [Service Accounts](#service-accounts)
- [User API Tokens](user-api-tokens)

:::note
Team API tokens are deprecated and cannot be generated. If you are already using team API tokens, Replicated recommends that you migrate to Service Accounts or User API tokens instead because these options provide better granular control over token access.
:::

### Service Accounts

Service accounts are assigned a token and associated with an RBAC policy. Users with the proper permissions can create, retrieve, or revoke service account tokens. Admin users can assign any RBAC policy to a service account. Non-admin users can only assign their own RBAC policy when they create a service account.

Service accounts are useful for operations that are not tied to a particular user, such as CI/CD or integrations.

Updates to a service account's RBAC policy are automatically applied to its associated token. When a service account is removed, its tokens are also invalidated.


### User API Tokens

User API tokens are private to the user creating the token. User tokens assume the user's account when used, including any RBAC permissions.

Updates to a user's RBAC role are applied to all of the tokens belonging to that user.

Revoking a user token immediately invalidates that token. When a user account is deleted, its user tokens are also deleted.

## Generate Tokens

To use the replicated CLI, you need a User API Token or a Service Account (Team API tokens also continue to work).

### Generate a Service Account

To generate a service account:

1. Log in to the vendor portal, and select [**Team > Service Accounts**](https://vendor.replicated.com/team/serviceaccounts).
1. Select **New Service Account**. If one or more service accounts already exist, you can add another by selecting **New Service Account**.

  <img alt="Service Accounts Page" src="/images/service-accounts.png" width="600px"/>

  [View a larger version of this image](/images/service-accounts.png)

1. In the **New Service Account** dialog:

    1. Enter a name the token in the **Nickname** field. Names for service accounts must be unique within a given team.

    1. Select the RBAC policy from the dropdown list. The token must have `Admin` access to create new releases.

    1. (Optional) Select the **Limit to read-only version of above policy** check box to if you want use an existing RBAC policy that has Read/Write permissions but limit this service account to read-only. This option lets you maintain one version of an RBAC policy instead of two versions (one read/write version and one read-only version).

      Users with a non-admin RBAC role cannot select any other RBAC role when creating a token. They are restricted to creating a token with their same level of access to avoid permission elevation.

      <img alt="New Service Accounts Dialog" src="/images/service-account-create.png" width="400px"/>

      [View a larger version of this image](/images/service-accounts.png)

1. Select **Create Service Account**.

1. Copy the service account token and save it in a secure location. The token will not be available to view again.

  :::note
  To remove a service account, select **Remove** for the service account that you want to delete.
  :::

### Generate a User API Token

To generate a user API token:

1. Log in to the vendor portal and go to the [Account Settings](https://vendor.replicated.com/account-settings) page.
1. Under **User API Tokens**, select **Create a user API token**. If one or more tokens already exist, you can add another by selecting **New user API token**.

  <img alt="User API Token Page" src="/images/user-token-list.png" width="600px"/>

  [View a larger version of this image](/images/user-token-list.png)

1. In the **New user API token** dialog, enter a name for the token in the **Nickname** field. Names for user API tokens must be unique per user. 

  <img alt="Create New User Token Dialog" src="/images/user-token-create.png" width="400px"/>

  [View a larger version of this image](/images/user-token-create.png)

1. Select the required permissions or use the default **Read and Write** permissions. Then select **Create token**.
  :::note
  The token must have `Read and Write` access to create new releases.
  :::

1. Copy the user API token that displays and save it in a secure location. The token will not be available to view again.

  :::note
  To revoke a token, select **Revoke token** for the token that you want to delete.
  :::
