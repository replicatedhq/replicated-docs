# Querying Entitlements in Helm Charts Before Deployment

This topic describes how to check license entitlements before a Helm chart is installed or upgraded. The information in this topic applies to Helm charts installed with Replicated KOTS or Helm.

The Replicated SDK API can be used to check entitlements at runtime. For more information, see [Checking Entitlements with the Replicated SDK API](licenses-reference-sdk).

## Overview

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

## Prerequisite

Add the Replicated SDK to your application:
* For Helm-based applications, see [Install the SDK as a Subchart](/vendor/replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Installing the Replicated SDK_
* For applications that use standard Kubernetes manifests, see [Install the SDK Alongside a Standard Manifest-Based Application](/vendor/replicated-sdk-installing#install-the-sdk-alongside-a-standard-manifest-based-application) in _Installing the Replicated SDK_

## Check Entitlements Before Installation or Upgrade

To check entitlements before installation:

1. Create or edit a customer to use for testing:

   1. In the vendor portal, click **Customers**. Select a customer and click the **Manage customer** tab. Alternatively, click **+ Create customer** to create a new customer. For more information, see [Creating and Managing Customers](/vendor/releases-creating-customer).

   1. Edit the built-in license fields or add custom fields for the customer. For example, you can set a license expiration date in the **Expiration policy** field. Or, you can create a custom field that limits the number of nodes a user is permitted in their cluster. For more information, see [Managing Custom License Fields](/vendor/licenses-adding-custom-fields).

1. In your Helm chart, update the Helm templates with one or more directives to access the license field. For example, you can access the built-in `expires_at` field with `{{ .Values.global.replicated.licenseFields.expires_at }}`. Add the desired logic to control application behavior based on the values of license fields.

   For more information about accessing values files from Helm templates, see [Values Files](https://helm.sh/docs/chart_template_guide/values_files/) in the _Chart Template Guide_ section of the Helm documentation.

1. Test your changes by promoting a new release and installing in a development environment:
   
   1. Package your Helm chart and its dependencies into a `.tgz` chart archive. See [Packaging a Helm Chart for a Release](helm-install-release).
   
   1. Add the `.tgz` archive to a release and promote to a development channel, such as Unstable. See [Managing Releases with the Vendor Portal](/vendor/releases-creating-releases).
   
   1. Install in a development environment using the license ID for the test customer that you created. See [Installing with Helm](install-with-helm).

1. Repeat these steps to add and test new license fields.