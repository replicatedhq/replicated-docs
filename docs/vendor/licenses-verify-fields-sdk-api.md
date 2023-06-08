# Verifying Licenses Fields With the SDK

This topic describes how to verify custom license fields for your customers for use with the Replicated SDK license API.

## Overview

License fields include the license’s expiration and any custom entitlements you’ve configured. To prevent man-in-the-middle attacks or spoofing by your customers, license fields are cryptographically signed to ensure their integrity. In your application, you can verify the signature to ensure the integrity of each license field you use.

## Prerequisite

The **Foundation Plan Signature Verification** feature flag must be enabled for your team in the Replicated vendor portal.

## Getting the Public Key

A public key is required to verify the signatures of license fields. This public key is available in the vendor portal on an application’s Settings page.

To access the public key:

1. Go to the Settings page for your application.

1. Click the Signature Verification tab at the top.

1. Copy your public key.

## Using the Public Key to Verify License Field Signatures

The public key can be used to decrypt a license field’s signature and compare this to the license field value returned by the API.

Signatures are base64 encoded and must be decoded before being decrypted.

To verify the license field signature:

1. On the **Signature Verification** page, go to the **Verification** section.

1. Use the code samples for verifying a signature. Code samples are provided for Go, Node.js, TypeScript, and Python.
