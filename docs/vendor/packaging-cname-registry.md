# Custom DNS for Private Registry

:::note
The functionality described on this page is currently in Alpha mode. Some functionality may change before becoming generally available.
:::

Many end customers will complete a security review for an applicatwion, which includes all hostnames for the application's domain. When the installation exposes and connects to URLs that are on external (to the application vendor) domains, this increases the surface area for the security review. Replicated domain names are external and require additional reviews for inclusion.

By enabling the application vendor to provide custom hostnames for these records, this brings the registry and proxy registry inside the existing security review.

## How

Replicated has built this functionality using an integration with a [Cloudflare service](https://developers.cloudflare.com/ssl/ssl-for-saas).

New functionality has been added to the Vendor Portal and the [Vendor API](/reference/vendor-api-using) to configure this feature. The methods will check that the feature is enabled. Access to this feature is currently gated behind a feature toggle. To access this feature, please contact your Replicated account rep. 

## Implementation
Verification of the domain is required, and we will support TXT records or Email verification.

The same hostname can be used for multiple applications, but not for multiple endpoints. A single hostname can map to registry.replicated.com for any number of applications, but cannot map to registry.replicated.com AND proxy.replicated.com, even if different applications.

If an already configured hostname is entered into a second application, it will be automatically validated if the verified application belongs to the same team.

### Vendor Portal Walkthrough

-- todo

### API Configuration

#### PUT `/v3/app/:appId/registry/cname`
This endpoint will change the cnames for the application. It's a PUT request because all applications have these set, but they may be null. If the key is not provided, it will not be overwritten.  To delete a key, pass is_deleted to as the body of the host.

Supported keys: registry, proxy.

Example payload to set registry to a custom hostname using a TXT verification format:

```
{
  "registry": {
    "hostname": "registry.enterprise.vendor.com",
    "verification_type": "txt",
  },
}
```

Response:

```
{
  "registry": {
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

Example payload to remove the configuration from registry:
{
  "registry": {
    "is_deleted": true
  },
}

#### GET `/v3/app/:appId/registry/cnames`

This endpoint will return the configuration for all registry cnames for the application.

Example response when neither are set:

```
{
  "registry": null,
  "proxy": null
}
```

Example response when registry is configured, but not verified:

```
{
  "registry": {
    "hostname": "registry.enterprise.vendor.com",
    "is_verified": false,
    "verification_type": "txt",
    "txt_record": {
      "name": "abcdef",
      "value": "txt_verification_abcdef"
    }
  },
  "proxy": null
}
```

Example response when registry is configured and verified:

```
{
  "registry": {
    "hostname": "registry.enterprise.vendor.com",
    "is_verified": true,
    "verification_type": "txt",
    "txt_record": {
      "name": "abcdef",
      "value": "txt_verification_abcdef"
    }
  },
  "proxy": null
}
```

Examples
In these examples, I'm using a User API token, with the value of `USER_API_TOKEN`. Your User API token or service account token will be different.

You will also need your app ID, which can be retrieved with this request:

```
curl –-header "Authorization: USER_API_TOKEN" https://api.replicated.com/vendor/v3/apps
```

I learned that my AppID is `APP_ID`

Now, I'm going to get my current CNAME configuration:

```
curl –-header "Authorization: USER_API_TOKEN" https://api.replicated.com/vendor/v3/app/APP_ID/registry/cnames

{"registry":null,"proxy":null}
```

It's not set up and the results are null and null. So let's set it up.
I want to configure a CNAME from registry.enterprise.myapp.com to use for registry.replicated.com. I want to replace registry.replicated.com in my application with registry.enterprise.myapp.com.

```
curl --request PUT \
  --url https://registry.replicated.com/vendor/v3/app/APP_ID/registry/cname \
  --header 'Authorization: USER_API_TOKEN \
  --header 'Content-Type: application/json' \
  --data '{"registry": { "hostname": "registry.enterprise.myapp.com", "verification_type": "txt" } }'
```

(Note, if you get a 403 Forbidden, it could be that the token is readonly, or it could be that the account does not have the feature toggle enabled).

Response
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

What does this response mean? Remember that we have a 2 step verification process, domain ownership and tls cert. In this example, the `is_active: false` indicates that this is NOT completely set up yet. The domain_verification_status is "pending", which is step 0. 

I'm going to go create the TXT record for `_cf-custom-hostname.registry.enterprise.myapp.com` and set the value to 
`0`0b3b205-3bce-41fa-abfb-7852b438be80`.

Once I do this, I can list the values again.

```
curl –-header "Authorization: USER_API_TOKEN" https://api.replicated.com/vendor/v3/app/APP_ID/registry/cnames
```

Response

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
		"tls_verification_status": "pending_validation",
		"tls_txt_record": {
			"name": "registry.enterprise.myapp.com",
			"value": "ca3-0df423a5a51d42b994ed729c19df5002"
		}
	},
	"proxy": null
}
```

### Important notes
DNS is slow. You can see here that it's still pending, but there's now a TLS TXT Record entry here. I waited a minute, and made the same request again, this time the response was:

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

Here you can see that the domain verification status is active, but the tls txt record needs to be completed.

Creating that TXT record, and then running the GET request a few times. After 90 seconds, I see this new result:

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

## Limitations
- The kustomization in KOTS will currently always rewrite image to registry/proxy.replicated.com, not respecting the CNAME. The custom cname will only be automatically used when delivering to a customer using the `helm install` option.
- The `LicenseDockerCfg` template function does not respect the CNAME.
- No support for a single CNAME record for both registry and proxy endpoints.
- This does not support CNAMEs for replicated.app (kots manifests), api.replicated.com (platform market api), download portal, or other services.

