# Verifying License Field Signatures (Alpha)

This topic describes how to verify the signatures of license fields when you check customer entitlements in your Helm chart application.

## Overview

To prevent man-in-the-middle attacks or spoofing by your customers, license fields are cryptographically signed to ensure their integrity. The following shows an example of the signature in a license field returned by the Replicated SDK API `api/vq/license/fields/expires_at` endpoint:

```json
{
  "name": "expires_at",
  "title": "Expiration",
  "description": "License Expiration",
  "value": "2023-05-30T00:00:00Z",
  "valueType": "String",
  "signature": {
    "v1": "c6rsImpilJhW0eK+Kk37jeRQvBpvWgJeXK2MD0YBlIAZEs1zXpmvwLdfcoTsZMOj0lZbxkPN5dPhEPIVcQgrzfzwU5HIwQbwc2jwDrLBQS4hGOKdxOWXnBUNbztsHXMqlAYQsmAhspRLDhBiEoYpFV/8oaaAuNBrmRu/IVAW6ahB4KtP/ytruVdBup3gn1U/uPAl5lhzuBifaW+NDFfJxAX..."
  }
}
```

Replicated recommends that you use signature verification to ensure the integrity of each license field you use in your application. For more information about checking entitlements in your application when you are using the Replicated SDK, see [Checking Entitlements for Helm Installations (Alpha)](licenses-reference-helm).

## Requirements

Using signature verification has the following requirements:

* The **Foundation Plan Signature Verification** feature flag must be enabled for your team in the Replicated vendor portal.
* To check entitlements at runtime or before installation in your Helm chart application, you must include the Replicated SDK as a dependency of your application. For more information, see [Using the SDK with Your Application (Alpha)](replicated-sdk-using).

## Use Your Public Key to Verify License Field Signatures

To verify the signatures of license fields, you use a public key to decrypt the signature of a license field and compare it to the license field value returned by the SDK API `license` endpoint. For more information, see [license](/reference/replicated-sdk-apis#license) in _Replicated SDK API (Beta)_.

To use your public key to verify license field signatures:

1. In the [vendor portal](https://vendor.replicated.com), go to the **Settings** page.

1. Click the **Signature Verification** tab.

   ![signature verification page](/images/signature-verification.png)
   [View a larger version of this image](/images/signature-verification.png)

1. Under **Your public key**, copy the key and save it in a secure location.

1. Under **Verification**, select the tab for the necessary programming language, and copy the code sample provided.

1. In your application, use the code sample and the public key to verify the integrity of license field signatures.

   :::note
   Signatures are base64 encoded and must be decoded before being decrypted.
   :::