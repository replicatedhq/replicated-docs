# Using the Vendor API v3

The Vendor API v3 is the API to manage applications, releases, customers, licenses, and everything related to an application managed by the Replicated app manager.

The [replicated CLI](replicated-cli-installing) is an implementation of the Vendor API v3, however you can directly use the Replicated Vendor API when it's preferred over the CLI.

## Types of Available API Tokens
- **Service Accounts:** Independent RBAC Policies, useful for operations that are not tied to a particular user (such as CI/CD or integrations).
- **User API Tokens:** Tied to a user account so the user inherits the RBAC policy and only exists if the user exists in the team. Any changes to the user's RBAC are applied to all User API Tokens.
- **Team API Tokens:** Deprecated and unable to be generated. However, you can migrate to Service Accounts instead.

For more information about these token types, see [Using Vendor API Tokens](replicated-cli-tokens).

## Generate an API Token

To access the Vendor API, you need a User API Token or a Service Account (Team API tokens also continue to work).

### Generate a User API Token

To generate a user API token:

1. Log in to the vendor portal and go to the [Account Settings](https://vendor.replicated.com/account-settings) page.
1. Under **User API Tokens**, click **New User API Token**.
1. Name the token and select the required permissions, and click **Create token**.
1. Copy the user API token and save it in a secure location. The token will not be available to view again.

### Generate a Service Account

To generate a service account:

1. Log in to the vendor portal and go to the Team page.
1. Navigate to [Service Accounts](https://vendor.replicated.com/team/serviceaccounts), and click **New Service Account**.
1. Name the token and select the RBAC policy. Optionally, check the box to limit the token to a read-only version of the selected RBAC policy. Click **Create Service Account**.
1. Copy the user API token and save it in a secure location. The token will not be available to view again.

## Using API Tokens

You provide the token as the value of the `Authorization` header of Vendor API calls.

For example, to pass a token as the authorization header in a request:

```
curl --request GET \
     --url https://api.replicated.com/vendor/v3/customers \
     --header 'Accept: application/json' \
     --header 'Authorization: my-token'
```

## Vendor API v3 Documentation

For Vendor API documentation and an interactive API console, see [Vendor API v3 Reference](https://replicated-vendor-api.readme.io/v3/reference/createapp).

For the Vendor API swagger specification, see [vendor-api-v3.json](https://api.replicated.com/vendor/v3/spec/vendor-api-v3.json).
