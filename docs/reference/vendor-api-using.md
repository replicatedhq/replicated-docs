import PrereqToken from "../partials/vendor-api/_prereq-token.mdx"
import ApiAbout from "../partials/vendor-api/_api-about.mdx"

# Using Vendor API Tokens

This topic describes how to use Replicated Vendor API authentication tokens to make API calls.

## About the Vendor API

<ApiAbout/>

## Prerequisites

<PrereqToken/>

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
