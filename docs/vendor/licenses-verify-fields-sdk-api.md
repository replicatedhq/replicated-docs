# Verifying Licenses Fields With the SDK

This topic describes how to verify the signature of custom license fields when you distribute the Replicated SDK with your application.

## Overview

License fields include the expiration date and any custom fields that you have added. To prevent man-in-the-middle attacks or spoofing by your customers, license fields are cryptographically signed to ensure their integrity. In your application, you can verify the signature to ensure the integrity of each license field you use.

For more information about referencing license fields in your application when you are using the Replicated SDK, see [Referencing License Fields With the SDK](licenses-reference-sdk).

## Prerequisite

The **Foundation Plan Signature Verification** feature flag must be enabled for your team in the Replicated vendor portal.

## Use Your Public Key to Verify License Field Signatures

A public key is required to verify the signatures of license fields. This public key is available in the vendor portal on the application's **Settings** page.

You can use the public key to decrypt a license field’s signature and compare this to the license field value returned by the API. Signatures are base64 encoded and must be decoded before being decrypted.

To use your public key to verify license field signatures:

1. In the [vendor portal](https://vendor.replicated.com), go to the **Settings** page.

1. Click the **Signature Verification** tab.

   ![signature verification page](/images/signature-verification.png)

1. Under **Your public key**, copy the key and save it in a secure location.

1. Under **Verification**, select the tab for the necessary programming language, and copy the code sample provided.

Use the code sample and the public key in your application to verify the integrity of license field signatures.