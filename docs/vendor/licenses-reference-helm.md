# Checking Entitlements for Helm Installations (Beta)

This topic describes how to check entitlement information from customer licenses in applications that are installed with Helm. For information about how to check entitlement information for applications installed with Replicated KOTS, see [Checking Entitlements for KOTS](licenses-referencing-fields).

## Check Entitlements at Runtime with the SDK API {#runtime}

The Replicated SDK retrieves up-to-date customer license information from the vendor portal during runtime. This means that any changes to customer licenses are reflected in real time in the customer environment. For example, you can revoke access to your application when a license expires, expose additional product functionality dynamically based on entitlements, and more. For more information about distributing the SDK with your application, see [About the Replicated SDK](replicated-sdk-overview).

After the Replicated SDK is initialized and running in a customer environment, you can use the following SDK API endpoints to get information about the license that was used to install:
* `/api/v1/license/info`: List license details, including the license ID, the channel the customer is assigned, and the license type.
* `/api/v1/license/fields`: List all the fields in the license.  
* `/api/v1/license/fields/{field_name}`: List details about a specific license field, including the field name, description, type, and the value.

For more information about these endpoints, see [license](/reference/replicated-sdk-apis#license) in _Replicated SDK API (Beta)_.

To use the SDK API to check entitlements at runtime:

1. Create or edit a customer to use for testing:

   1. In the vendor portal, click **Customers**. Select a customer and click the **Customer details** tab. Alternatively, click **+ Create customer** to create a new customer. For more information, see [Creating and Managing Customers](/vendor/releases-creating-customer).

   1. Edit the built-in license fields or add custom fields for the customer. For example, you can set a license expiration date in the **Expiration policy** field. Or, you can create a custom field that limits the number of nodes a user is permitted in their cluster. For more information, see [Managing Custom License Fields](/vendor/licenses-adding-custom-fields).

1. (Recommended) Develop against the SDK API `license` endpoints locally:

   1. Install the Replicated SDK as a standalone component in your cluster. This is called _integration mode_. Installing in integration mode allows you to develop locally against the SDK API without needing to create releases for your application in the vendor portal. See [Developing Against the SDK API](/vendor/replicated-sdk-development).

   1. In your application, add logic to control application behavior based on the customer license information returned by the SDK API service running in your cluster. See [license](/reference/replicated-sdk-apis#license) in _Replicated SDK API (Beta)_.

      **Example:**

      ```bash
      curl replicated:3000/api/v1/license/fields/expires_at
      ```

      ```json
      {
        "name": "expires_at",
        "title": "Expiration",
        "description": "License Expiration",
        "value": "2023-05-30T00:00:00Z",
        "valueType": "String",
        "signature": {
          "v1": "c6rsImpilJhW0eK+Kk37jeRQvBpvWgJeXK2M..."
        }
      }
      ```

1. When you are ready to test your changes outside of integration mode, do the following:

   1. Package your Helm chart and its dependencies (including the Replicated SDK) into a `.tgz` chart archive. See [Packaging a Helm Chart for a Release](helm-install-release).

   1. Add the `.tgz` archive to a release and promote to a development channel, such as Unstable. See [Managing Releases with the Vendor Portal](/vendor/releases-creating-releases).

   1. Install in a development environment using the license ID for the test customer that you created. See [Installing with Helm](install-with-helm).

   1. (Optional) As needed, verify the license information returned by the SDK API in your development environment using port forwarding to access the SDK service locally:

      1. Use port forwarding to access the `replicated` service from the local development environment on port 3000:

         ```bash
         kubectl port-forward service/replicated 3000
         ```

         The output looks similar to the following:

         ```bash
         Forwarding from 127.0.0.1:3000 -> 3000
         ```

         For more information about `kubectl port-forward`, see [port-forward](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#port-forward) in the kubectl reference documentation.

      1. With the port forward running, in another terminal, use the SDK API to return information about the license.

         **Example:**

         ```
         curl localhost:3000/api/v1/license/fields/expires_at
         ```

1. Repeat these steps to add and test new license fields.

1. (Recommended) Use signature verification in your application to ensure the integrity of the license field. See [Verifying License Field Signatures](/vendor/licenses-verify-fields-sdk-api).

## Check Entitlements Before Installation {#before-install}

The Replicated registry automatically injects customer entitlement information in the `global.replicated.licenseFields` field of your Helm chart values. For example:

```yaml
# Helm chart values.yaml
global:
  replicated:
    licenseFields:
      expires_at:
        description: License Expiration
        name: expires_at
        signature:
          v1: iZBpESXx7fpdtnbMKingYHiJH42rP8fPs0x8izy1mODckGBwVoA... 
        title: Expiration
        value: "2023-05-30T00:00:00Z"
        valueType: String  
```

You can access the values in the `global.replicated.licenseFields` field from your Helm templates to check customer entitlements before installation.

To check entitlements before installation:

1. Create or edit a customer to use for testing:

   1. In the vendor portal, click **Customers**. Select a customer and click the **Customer details** tab. Alternatively, click **+ Create customer** to create a new customer. For more information, see [Creating and Managing Customers](/vendor/releases-creating-customer).

   1. Edit the built-in license fields or add custom fields for the customer. For example, you can set a license expiration date in the **Expiration policy** field. Or, you can create a custom field that limits the number of nodes a user is permitted in their cluster. For more information, see [Managing Custom License Fields](/vendor/licenses-adding-custom-fields).

1. In your Helm chart, update the Helm templates with one or more directives to access the license field. For example, you can access the built-in `expires_at` field with `{{ .Values.global.replicated.licenseFields.expires_at }}`. Add the desired logic to control application behavior based on the values of license fields.

   For more information about accessing values files from Helm templates, see [Values Files](https://helm.sh/docs/chart_template_guide/values_files/) in the _Chart Template Guide_ section of the Helm documentation.

1. Test your changes by promoting a new release and installing in a development environment:
   
   1. Package your Helm chart and its dependencies into a `.tgz` chart archive. See [Packaging a Helm Chart for a Release](helm-install-release).
   
   1. Add the `.tgz` archive to a release and promote to a development channel, such as Unstable. See [Managing Releases with the Vendor Portal](/vendor/releases-creating-releases).
   
   1. Install in a development environment using the license ID for the test customer that you created. See [Installing with Helm](install-with-helm).

1. Repeat these steps to add and test new license fields.