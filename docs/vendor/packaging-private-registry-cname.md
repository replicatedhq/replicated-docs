# Using Custom Domains (Beta)

This topic describes using custom registry domains and custom domains for the download portal, and how to configure them using the Replicated vendor portal or the vendor API.

For more information, see the following sections in this topic:

- [Custom Registry Domains](#registry)
- [Custom Domains for the Download Portal](#download)

## Custom Registry Domains {#registry}

You can use custom domains as aliases for the replicated.registry.com and proxy.replicated.com endpoints, by creating Canonical Name (CNAME) records for your domains, also known as custom domains.

Whether you use the Replicated private registry or the proxy service for your own private registry, these Replicated domains are external to your domain and require additional security reviews by your customer. Using custom domains as aliases for Replicated domains can bring the Replicated registry and proxy service inside an existing security review and reduce your exposure.

Using the Replicated vendor portal or the vendor API, you configure custom domains for the Replicated private registry and proxy service at the Team level. Then, you specify those domains within the release in the Application custom resource manifest file. This method lets you:

- Have different domains for your applications, if needed
- Roll out domain name changes in phases to prevent the application from breaking in production environments

### Verification

Verification of the domain is required using TXT records that undergo separate verification checks for:

- Domain ownership: This verification is done when you initially add a record.
- TLS certificate creation: Each new domain must have a new TLS certificate to be verified.

The TXT records can be removed once verification is complete.

If you configure a second application to use an existing, configured domain, the configured domain is automatically validated if both applications belongs to the same team.

### Limitations

Configuring a custom registry domain has the following limitations:

- A single custom domain cannot be used for both the registry and proxy endpoints. A single domain can map to registry.replicated.com for any number of applications, but cannot map to both registry.replicated.com and  proxy.replicated.com, even if the applications are different.
- Custom domains cannot be used to alias replicated.app (release manifests), api.replicated.com (platform market API), the download portal, or other services.

### Configure Registry Domains in the Vendor Portal

You can configure custom domains for the Replicated private registry or the proxy service in the vendor portal or the vendor API.

To configure a custom domain in the vendor portal:

1. Log in to the [vendor portal](https://vendor.replicated.com), and click **Team > Custom Domains**.

1. From the **Custom domains...** pane for either the Replicated registry or the proxy service, click **Add new domain**.

  The **Configure a custom domain** wizard opens.

1. For **Domain**, enter the custom domain used for images pushed to the Replicated registry or proxy service. Click **Save & continue**.

1. For **Verify ownership**, copy the text string and create the custom domain record in your DNS account. The text string can take a few seconds to appear. Click **Validate & continue**.

  Your changes can take up to 24 hours to propagate.

1. For **TLS cert creation verification**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

1. For **Use Domain**, copy the snippet to use as a template if needed. Click **Ok. got it!**.

1. Create a new release and add the code snippet to the Application custom resource manifest file to create the new field for either `proxyRegistryDomain` or `replicatedRegistryDomain`. For more information, see [proxyRegistryDomain](../reference/custom-resource-application#proxyRegistryDomain) and [replicatedRegistryDomain](../reference/custom-resource-application#replicatedRegistryDomain) in the _Application_ section.

### Configure Registry Domains with the Vendor API

To configure a custom domain in the vendor API:

1. Generate a user token. See [Generate a User API Token in Using the Vendor API v3](//reference/vendor-api-using#generate-a-user-api-token).

1. Retrieve your application ID:

  ```
  curl –-header "Authorization: USER_TOKEN" https://api.replicated.com/vendor/v3/apps
  ```

  Replace `USER_TOKEN` with your user API token.

  Your application ID is returned as a numeric string.

1. Review your current custom domain configuration:

  ```
  curl –-header "Authorization: USER_TOKEN" https://api.replicated.com/vendor/v3/app/APP_ID/registry/cnames
  ```

  Replace `APP_ID` with your application ID.

  If your custom domain configuration is not set up, the results show as `null`:

  ```
  {"registry":null,"proxy":null}
  ```

1. Customize the custom domain. For the "hostname" field, replace the hostname value in the following example with your domain:

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

  There is a 2-step verification process. This response shows `is_active: false`, meaning that the custom domain is not set up yet and that the `domain_verification_status` is pending.

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

  The TLS verification status is active and custom domain configuration is complete.

  :::note
  You may need to run the request a few times, and receiving the response can take approximately 90 seconds.
  :::

1. Create a new release and add either the `proxyRegistryDomain` or `replicatedRegistryDomain` field to the Application custom resource manifest file, depending on which registry you are using. For more information, see [proxyRegistryDomain](../reference/custom-resource-application#proxyRegistryDomain) and [replicatedRegistryDomain](../reference/custom-resource-application#replicatedRegistryDomain) in the _Application_ section.

### Assign a Custom Domain to an Application

You can change or add the assignment of an existing custom domain to an application at any time.

To assign a custom domain to an application:

1. From the vendor portal, click **Teams > Custom Domains**.
1. Click **Use custom domain in an application** next to the domain that you want to use.
1. Copy the snippet from the **Use custom domain in an application** dialog that opens, then click **Ok, got it!**.
1. Create a new release and add the code snippet to the Application custom resource manifest file to create the new field for either `proxyRegistryDomain` or `replicatedRegistryDomain`. For more information, see [proxyRegistryDomain](../reference/custom-resource-application#proxyRegistryDomain) and [replicatedRegistryDomain](../reference/custom-resource-application#replicatedRegistryDomain) in the _Application_ section.


## Custom Domains for the Download Portal {#download}

You can configure the download portal to use a custom domain instead of the default get.replicated.com. Only one custom domain per team can be active at any time.