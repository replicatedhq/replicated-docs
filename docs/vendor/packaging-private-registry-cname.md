# Using a Custom Registry Domain Name (Alpha)

You can use custom domain names as aliases for the replicated.registry.com and proxy.replicated.com endpoints, by creating Canonical Name (CNAME) records for your domains.

Whether you use the Replicated private registry or the proxy service for your own private registry, these Replicated domains are external to your domain and require additional security reviews by your customer. Using custom CNAMEs can bring the Replicated registry and proxy registry inside an existing security review and reduce your exposure.

You add custom CNAMEs for the Replicated private registry and proxy service in the Replicated vendor portal or with the vendor API.

## About Verification

Verification of the domain is required using a TXT record that undergoes separate verification checks for:

- Domain ownership - This verification is done when you initially add a record.
- TLS certificate creation - Each new domain must have a new TLS certificate to be verified.

## About Hostname Mapping

The same hostname can be used for multiple applications, but cannot be used for multiple endpoints. A single hostname can map to registry.replicated.com for any number of applications, but cannot map to both registry.replicated.com and  proxy.replicated.com, even if the applications are different.

If you configure a second application to use an existing, configured hostname, the configured hostname is automatically validated if the verified application belongs to the same team.

## Limitations

CNAME enablement currently has the following limitations:

- The kustomization in Replicated app manager always rewrites images to registry.replicated.com or proxy.replicated.com, and does not respect the CNAME. Only Helm installations that do not use the app manager respect the CNAME. This type of Helm installation is an alpha feature.
- The LicenseDockerCfg template function does not respect the CNAME.
- A single CNAME record cannot be used for both the registry and proxy endpoints.
- The endpoints do not support CNAMEs for replicated.app (release manifests), api.replicated.com (platform market API), the download portal, or other services. For information about the API endpoints, see [Supported API Methods for CNAME](#supported-api-methods-for-cname).

## Add a Custom CNAME in the Vendor Portal

You can add custom CNAMEs for the Replicated private registry and the proxy service in the vendor portal.

To add a custom CNAME:

1. Log in to the [vendor portal](https://vendor.replicated.com), and click **Images**.
1. In the Custom Registry Domain Name pane, on either the registry.replicated.com or proxy.replicated.com tab, select **Use a custom hostname instead of ENDPOINT_NAME**.
1. Enter the custom CNAME in the textbox, and click **Save**.
1. From Create a CNAME record, copy the text string and create the CNAME record in your DNS account. Click **Continue**.
1. From Domain name ownership verification, copy the text string and create a TXT record in your DNS account. Click **Verify and continue**.
1. From TLS cert creation verification, copy the text string and create a TXT record in your DNS account. Click **Verify and finish**.

  Your changes can take up to 24 hours to propagate.

## Supported API Methods for CNAME

CNAME supports the following GET and PUT methods and endpoints in the vendor API. For more information about the vendor API, see [Using the Vendor API v3](../reference/vendor-api-using).

### GET /v3/app/:appId/registry/cnames

This endpoint returns the configuration for all registry CNAMEs for the application.

**Example response when neither endpoint is set:**

```
{
  "registry.replicated.com": null,
  "proxy.replicated.com": null
}
```

**Example response when registry is configured using TXT but is not verified:**

```
{
  "registry.replicated.com": {
    "hostname": "registry.enterprise.vendor.com",
    "is_verified": false,
    "verification_type": "txt",
    "txt_record": {
      "name": "abcdef",
      "value": "txt_verification_abcdef"
    }
  },
  "proxy.replicated.com": null
}
```

**Example response when registry is configured using TXT and is verified:**

```
{
  "registry.replicated.com": {
    "hostname": "registry.enterprise.vendor.com",
    "is_verified": true,
    "verification_type": "txt",
    "txt_record": {
      "name": "abcdef",
      "value": "txt_verification_abcdef"
    }
  },
  "proxy.replicated.com": null
}
```

### PUT /v3/app/:appId/registry/cname

This endpoint changes the CNAMEs for the application. It is a PUT request because all applications have these set, but they may be null. If the key is not provided, it will not be overwritten. Supported keys are `registry.replicated.com` and `proxy.replicated.com`.

Clear the configuration for a key by passing `null`.

**Example payload to set registry to a custom hostname using a TXT verification format:**

```
{
  "registry.replicated.com": {
    "hostname": "registry.enterprise.vendor.com",
    "verification_type": "txt",
  },
}
```

**Response:**

```
{
  "registry.replicated.com": {
    "hostname": "registry.enterprise.vendor.com",
    "is_verified": false,
    "verification_type": "txt",
    "txt_record": {
      "name": "abcdef",
      "value": "txt_verification_abcdef"
    }
  },
  "proxy.replicated.com": null
  }
  ```


## Add a Custom CNAME with the Vendor API

This procedure shows an example of:

- Configuring a CNAME record to point registry.enterprise.myapp.com to registry.replicated.com
- Replacing registry.replicated.com in your application with registry.enterprise.myapp.com
- Using a TXT record to validate domain ownership


To add a custom CNAMEs using the vendor API:

1. Generate a user token. See [Generate a User API Token in Using the Vendor API v3](//reference/vendor-api-using#generate-a-user-api-token).

1. Retrieve your application ID:

  ```
  curl –-header "Authorization: USER_TOKEN" https://api.replicated.com/vendor/v3/apps
  ```

  Replace `USER_TOKEN` with your user API token.

  Your application ID is returned as a numeric string.

1. Review your current CNAME configuration:

  ```
  curl –-header "Authorization: USER_TOKEN" https://api.replicated.com/vendor/v3/app/APP_ID/registry/cnames
  ```

  Replace `APP_ID` with your application ID.

  If your CNAME configuration is not set up, the results show as `null`:

  ```
  {"registry":null,"proxy":null}
  ```

1. Customize the CNAME:

  ```
  curl --request PUT \
    --url https://registry.replicated.com/vendor/v3/app/APP_ID/registry/cname \
    --header 'Authorization: USER_TOKEN \
    --header 'Content-Type: application/json' \
    --data '{"registry.replicated.com": { "hostname": "registry.enterprise.myapp.com", "verification_type": "txt" } }'
  ```

  :::note
  If you get a 403 Forbidden error, the token could be read-only or the account does not have the feature toggle enabled.
  :::

  **Response:**

  ```
  {
      "registry": {
          "hostname": "registry.enterprise.myapp.com",
          "is_active": false,
          "verification_type": "txt",
          "domain_verification_status": "pending",
          "txt_record": {
              "name": "_cf-custom-hostname.registry.enterprise.myapp.com",
              "value": "00b3b205-3bce-41fa-abfb-7852b438be80"
          },
          "tls_verification_type": "txt",
          "tls_verification_status": "initializing",
          "tls_txt_record": {
              "name": "",
              "value": ""
          }
      },
      "proxy": null
  }
  ```

  There is a 2-step verification process. This response shows `is_active: false`, meaning that the CNAME is not set up yet and that the `domain_verification_status` is pending.

1. Create the domain TXT record for the application using your DNS provider's instructions, and set the value to the randomly generated value shown in the previous step:

  ```
  "name": "_cf-custom-hostname.registry.enterprise.myapp.com",
  "value": "00b3b205-3bce-41fa-abfb-7852b438be80"
  ```

1. To see the updated status, refresh the Replicated API by listing the values again:

  ```
  curl –-header "Authorization: USER_TOKEN" https://api.replicated.com/vendor/v3/app/APP_ID/registry/cnames
  ```

  **Response:**

  ```
  {
      "registry": {
          "hostname": "registry.enterprise.ttl.sh",
          "is_active": false,
          "verification_type": "",
          "domain_verification_status": "active",
          "txt_record": {
              "name": "",
              "value": ""
          },
          "tls_verification_type": "txt",
          "tls_verification_status": "pending_validation",
          "tls_txt_record": {
              "name": "registry.enterprise.myapp.com",
              "value": "ca3-0df423a5a51d42b994ed729c19df5002"
          }
      },
      "proxy": null
  }
  ```

  You can see that the domain verification status is active, but the TLS TXT record needs to be completed.

  :::note
  If your DNS is slow, the domain verification status can still show as pending. Wait a few minutes and then send the request again.
  :::

1. Create the TLS TXT record using your DNS provider's instructions, and run the GET request:

  ```
  curl –-header "Authorization: USER_TOKEN" https://api.replicated.com/vendor/v3/app/APP_ID/registry/cnames
  ```

  **Response:**

  ```
  {
      "registry": {
          "hostname": "registry.enterprise.myapp.com",
          "is_active": true,
          "verification_type": "",
          "domain_verification_status": "active",
          "txt_record": {
              "name": "",
              "value": ""
          },
          "tls_verification_type": "txt",
          "tls_verification_status": "active",
          "tls_txt_record": {
              "name": "",
              "value": ""
          }
      },
      "proxy": null
  }
  ```

  The TLS verification status is active and CNAME configuration is complete.

  :::note
  You may need to run the request a few times, and receiving the response can take approximately 90 seconds.
  :::
