# Query Entitlements with the Replicated SDK API

This topic describes how to query license entitlements at runtime using the Replicated SDK in-cluster API. The information in this topic applies to applications installed with Replicated KOTS or Helm.

## Overview

The Replicated SDK retrieves up-to-date customer license information from the Vendor Portal during runtime. This means that any changes to customer licenses are reflected in real time in the customer environment. For example, you can revoke access to your application when a license expires, expose additional product functionality dynamically based on entitlements, and more. For more information about distributing the SDK with your application, see [About the Replicated SDK](replicated-sdk-overview).

After the Replicated SDK is initialized and running in a customer environment, you can use the following SDK API endpoints to get information about the license:
* `/api/v1/license/info`: List license details, including the license ID, the channel the customer is assigned, and the license type.
* `/api/v1/license/fields`: List all the fields in the license.  
* `/api/v1/license/fields/{field_name}`: List details about a specific license field, including the field name, description, type, and the value.

For more information about these endpoints, see [license](/reference/replicated-sdk-apis#license) in _Replicated SDK API_.

## Prerequisite

Add the Replicated SDK to your application:
* For Helm-based applications, see [Install the SDK as a Subchart](/vendor/replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Installing the Replicated SDK_
* For applications that use standard Kubernetes manifests, see [Install the SDK Alongside a Standard Manifest-Based Application](/vendor/replicated-sdk-installing#manifest-app) in _Installing the Replicated SDK_

## Query License Entitlements at Runtime {#runtime}

To use the SDK API to query entitlements at runtime:

1. Create or edit a customer to use for testing:

   1. In the Vendor Portal, click **Customers**. Select a customer and click the **Manage customer** tab. Alternatively, click **+ Create customer** to create a new customer. For more information, see [Create and Manage Customers](/vendor/releases-creating-customer).

   1. Edit the built-in fields and add custom fields for the customer. For example, you can set a license expiration date in the **Expiration policy** field. Or, you can create a custom field that limits the number of nodes a user is permitted in their cluster. For more information, see [Manage Customer License Fields](/vendor/licenses-adding-custom-fields).

1. (Recommended) Develop against the SDK API `license` endpoints locally:

   1. Install the Replicated SDK as a standalone component in your cluster. This is called _integration mode_. Installing in integration mode allows you to develop locally against the SDK API without needing to create releases for your application in the Vendor Portal. See [Develop Against the SDK API](/vendor/replicated-sdk-development).

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

   1. Package your Helm chart and its dependencies (including the Replicated SDK) into a `.tgz` chart archive. See [Package a Helm Chart for a Release](helm-install-release).

   1. Add the `.tgz` archive to a release and promote to a development channel, such as Unstable. See [Manage Releases with the Vendor Portal](/vendor/releases-creating-releases).

   1. Install in a development environment using the license ID for the test customer that you created. See [Install with Helm](install-with-helm).

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

1. (Recommended) Use signature verification in your application to ensure the integrity of the license field. See [Verify License Field Signatures with the Replicated SDK API](/vendor/licenses-verify-fields-sdk-api).