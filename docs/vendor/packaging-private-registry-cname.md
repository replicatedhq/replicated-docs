# Using a Custom Registry Hostname (Alpha)

You can use custom hostnames as aliases for the replicated.registry.com and proxy.replicated.com endpoints, by creating Canonical Name (CNAME) records for your domains.

Whether you use the Replicated private registry or the proxy service for your own private registry, these Replicated domains are external to your domain and require additional security reviews by your customer. Using custom domains as aliases for Replicated domains can bring the Replicated registry and proxy service inside an existing security review and reduce your exposure.

You configure custom domains for the Replicated private registry and proxy service in the Replicated vendor portal or with the vendor API.

## About Verification

Verification of the domain is required using TXT records that undergo separate verification checks for:

- Domain ownership: This verification is done when you initially add a record.
- TLS certificate creation: Each new domain must have a new TLS certificate to be verified.

The TXT records can be removed once verification is complete.

If you configure a second application to use an existing, configured hostname, the configured hostname is automatically validated if both applications belongs to the same team.

## Limitations

Configuring a custom hostname has the following limitations:

- The kustomization in the Replicated app manager always rewrites images to registry.replicated.com or proxy.replicated.com, and does not respect the CNAME. Only Helm installations that do not use the app manager respect the CNAME. This type of Helm installation is an Alpha feature. For more information, see [Supporting helm CLI Installations (Alpha)](helm-install).
- The LicenseDockerCfg template function does not respect the CNAME.
- A single CNAME record cannot be used for both the registry and proxy endpoints. A single hostname can map to registry.replicated.com for any number of applications, but cannot map to both registry.replicated.com and  proxy.replicated.com, even if the applications are different.
- Custom hostnames cannot be used to alias replicated.app (release manifests), api.replicated.com (platform market API), the download portal, or other services.

## Configure a Custom Hostname in the Vendor Portal

You can configure custom hostnames for the Replicated private registry and the proxy service in the vendor portal.

To configure a custom hostname:

1. Log in to the [vendor portal](https://vendor.replicated.com), and click **Images**.
1. In the Custom Registry Hostname pane, on either the registry.replicated.com or proxy.replicated.com tab, select **Use a custom hostname instead of ENDPOINT_NAME**.
1. Enter the custom hostname in the text box, and click **Save**.
1. From Create CNAME record, copy the text string and create the CNAME record in your DNS account. Click **Continue**.
1. From Hostname ownership verification, copy the text string and create a TXT record in your DNS account. Click **Verify and continue**.
1. From TLS cert creation verification, copy the text string and create a TXT record in your DNS account. Click **Verify and finish**.

  Your changes can take up to 24 hours to propagate.

## Configure a Custom Hostname with the Vendor API

You can configure custom hostnames for the Replicated private registry and the proxy service using the vendor API.

To configure a custom hostname:

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

1. Customize the CNAME. For the "hostname" field, replace the hostname value in the following example with your host name:

  ```
  curl --request PUT \
    --url https://registry.replicated.com/vendor/v3/app/APP_ID/registry/cname \
    --header 'Authorization: USER_TOKEN \
    --header 'Content-Type: application/json' \
    --data '{"registry.replicated.com": { "hostname": "registry.enterprise.myapp.com", "verification_type": "txt" } }'
  ```

  :::note
  If you get a 403 Forbidden error, the token could be read-only or your team account in the Replicated vendor portal does not have the feature toggle enabled.
  :::

  **Example Response:**

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

1. Create the domain TXT record for the application using your DNS provider's instructions, and set the value to the randomly generated value shown in the previous step.

  **Example Input:**

  ```
  "name": "_cf-custom-hostname.registry.enterprise.myapp.com",
  "value": "00b3b205-3bce-41fa-abfb-7852b438be80"
  ```

1. To see the updated status, refresh the Replicated API by listing the values again:

  ```
  curl –-header "Authorization: USER_TOKEN" https://api.replicated.com/vendor/v3/app/APP_ID/registry/cnames
  ```

  **Example Response:**

  ```
  {
      "registry": {
          "hostname": "registry.enterprise.myapp.com",
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

  In this example, you can see that the domain verification status is active, but the TLS TXT record needs to be completed.

  :::note
  If your DNS is slow, the domain verification status can still show as pending. Wait a few minutes and then send the request again.
  :::

1. Create the TLS TXT record using your DNS provider's instructions, and run the GET request:

  ```
  curl –-header "Authorization: USER_TOKEN" https://api.replicated.com/vendor/v3/app/APP_ID/registry/cnames
  ```

  **Example Response:**

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
