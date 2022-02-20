# Using the Vendor API v3

The Vendor API v3 is the API to manage KOTS applications, releases, customers, licenses, and everything related to a KOTS application.

The [replicated CLI](replicated-cli-installing) is an implementation of the Vendor API v3, however you can directly use the Replicated Vendor API when it's preferred over the CLI.

## Types of Available API Tokens
- **Service Accounts:** Independent RBAC Policies, useful for operations that aren't tied to a particular user (such as CI/CD or integrations.)
- **User API Tokens:** Tied to a user's account so they inherit RBAC Policy and only exist if the User exists in the Team.
- **Team API Tokens:** Deprecated and unable to be generated, please migrate to Service Accounts.

More details on these token types can be found in [Using Vendor API Tokens](replicated-cli-tokens).

## Generate an API token

To access the Vendor API, you need a User API Token or a Service Account (Team API tokens continue to work as well). 

### To generate a User API token

1. Log in to the vendor portal and go to the [Account Settings](https://vendor.replicated.com/account-settings) page.
2. Under **User API Tokens**, click **New User API Token**.
3. Name the token and select the required permissions, then click **Create token**.
4. Copy the user API token and save it in a secure location. The token will not be available to view again.

### To generate a Service Account

1. Log in to the vendor portal and go to the **Team** page.
2. Navigate to [Service Accounts](https://vendor.replicated.com/team/serviceaccounts), click **New Service Account**.
3. Name the token and select the RBAC Policy & permissions (selecting Read Only will limit to read-only version of the selected RBAC policy), then click **Create Service Account**.
4. Copy the user API token and save it in a secure location. The token will not be available to view again.

## Using API Tokens

You provide the token as the value of the `Authorization` header of Vendor API calls.

For example, to pass a token as the authorization header in a request:

```
curl --request GET \
     --url https://api.replicated.com/vendor/v3/customers \
     --header 'Accept: application/json' \
     --header 'Authorization: my-token'
```

## Vendor API v3 documentation

For Vendor API documentation and an interactive API console, see [Vendor API v3 Reference](https://replicated-vendor-api.readme.io/v3/reference/createapp).

For the Vendor API swagger specification, see [vendor-api-v3.json](https://api.replicated.com/vendor/v3/spec/vendor-api-v3.json).
