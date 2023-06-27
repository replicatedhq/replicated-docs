# Using Native Helm v2

## Overview

## Rewrite Images, Inject Pull-Secrets, and Add Labels

Vendors need to use template functions to re-write images, inject pull-secrets, and add labels for backups.

Public and private images are re-written, pull secrets are injected, and labels are added.  This example uses a private image for wordpress (which is pulled through proxy) and a public image for mariadb.  Images will be re-written to use the local registry if one is configured.

## Migrate from Native Helm v1 to v2

It will bypass existing Kustomize logic to re-write images, inject pull secrets, and add backup labels and annotations.  As a result, it will be on the vendor to do these things using a combination of Replicated and Helm templating.