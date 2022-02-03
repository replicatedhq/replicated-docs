# Using the Vendor API v3

You can use the Replicated Vendor API to create and manage applications, releases,
customers, licenses, and more.

## Generate an API token

To access the Vendor API, you need a user API token. You provide the token
in the `Authorization` header of Vendor API calls.

**Note**: If you have existing team API tokens on the vendor portal **Team > API Tokens**
page, you can use a team API token in the `Authorization` header instead of a user
API token.
However, creating new team API tokens is not supported. Replicated recommends that
you use user API tokens because they provide greater granularity in managing
user permissions compared to team API tokens.

To generate a user API token:

1. Log in to the vendor portal and go to the **Account Settings** page.
1. Under **User API Tokens**, click **New User API Token**.
1. Name the token and select the required permissions, then click **Create token**.
1. Copy the user API token and save it in a secure location.

## Vendor API v3 documentation

For Vendor API documentation and an interactive API console, see [Vendor API v3 Reference](https://replicated-vendor-api.readme.io/v3/reference/createapp).

For the Vendor API swagger specification, see [vendor-api-v3.json](https://api.replicated.com/vendor/v3/spec/vendor-api-v3.json).
