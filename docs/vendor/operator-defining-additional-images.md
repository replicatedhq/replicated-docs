import AdditionalImages from "../partials/airgap/_additional-images.mdx"
import AdditionalImagesExample from "../partials/airgap/_additional-images-example.mdx"

# Defining Additional Images

This topic describes how to define additional images to be included in `.airgap` bundles.

## Overview

KOTS finds all images defined in the application manifests and includes them in the `.airgap` bundle. During installation or upgrade, KOTS collects images from the `.airgap` bundle, then retags and pushes them to the registry supplied by the enterprise user.

## Define Additional Images for Air Gap Bundles

<AdditionalImages/>

<AdditionalImagesExample/>

## Authentication

When creating the `.airgap` bundle or performing an online install, KOTS will ensure that private images are available, without sharing registry credentials with the installation.
Air gap packages include the image layers in the bundle. Online installs will rewrite externally hosted private images to be pulled from `proxy.replicated.com`.
When the installation sends credentials to `proxy.replicated.com` or `registry.replicated.com`, the credentials are based on the customer license file, and the credentials stop working when the license expires.

For more information, see [About the Replicated Proxy Service](/vendor/private-images-about).