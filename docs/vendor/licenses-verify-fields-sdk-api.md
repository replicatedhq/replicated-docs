# Verifying License Field Signatures with the Replicated SDK API (Beta)

This topic describes how to verify the signatures of license fields when checking customer license entitlements with the Replicated SDK.

## Overview

To prevent man-in-the-middle attacks or spoofing by your customers, license fields are cryptographically signed with a probabilistic signature scheme (PSS) signature to ensure their integrity. The PSS signature for a license field is included in the response from the Replicated SDK API `/license/fields` and `/license/fields/{field-name}` endpoints as a Base64 encoded string.

The following shows an example of a Base64 encoded PSS signature for an `expires_at` field returned by the SDK API:

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

Replicated recommends that you use signature verification to ensure the integrity of each license field you use in your application. For more information about how to check entitlements in your application for Helm CLI installations, see [Checking Entitlements in Helm Charts Before Deployment](licenses-reference-helm).

## Requirement

Include the Replicated SDK as a dependency of your application Helm chart. For more information, see [Install the SDK as a Subchart](replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Installing the Replicated SDK_.

## Use Your Public Key to Verify License Field Signatures

In your application, you can use your public key (available in the Vendor Portal) and the MD5 hash of a license field value to verify the PSS signature of the license field.

To use your public key to verify license field signatures:

1. In the [Vendor Portal](https://vendor.replicated.com), go to the **Settings** page.

1. Click the **Replicated SDK Signature Verification** tab.

   ![signature verification page](/images/signature-verification.png)
   [View a larger version of this image](/images/signature-verification.png)

1. Under **Your public key**, copy the key and save it in a secure location.

1. (Optional) Under **Verification**, select the tab for the necessary programming language, and copy the code sample provided.

1. In your application, add logic that uses the public key to verify the integrity of license field signatures. If you copied one of the code samples from the Vendor Portal in the previous step, paste it into your application and make any additional edits as required. 

  If you are not using one of the code samples provided, consider the following requirements for verifying license field values:  
    * License field signatures included in the response from the SDK API `/license/fields` and `/license/fields/{field-name}` endpoints are Base64 encoded and must be decoded before they are verified.
    * The MD5 hash of the license field value is required to verify the signature of the license field. The raw license field value is included in the response from the SDK API `/license/fields` and `/license/fields/{field-name}` endpoints. The MD5 hash of the value must be calculated and used for signature verification.