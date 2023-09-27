# Installing Without Object Storage

This topic describes how to install Replicated KOTS and the Replicated admin console without object storage.

## Overview

By default, the Replicated admin console requires an S3-compatible object store to store application archives and support bundles.

You can choose to install the admin console without object storage. When you install without object storage, the admin console is deployed as a Statefulset with an attached PersistentVolume (PV) instead of a deployment. This allows the admin console to use PVs instead of object storage. 


### Install Without Object Storage in an Embedded Cluster

To install the admin console on a cluster created by the kURL installer without an object store, remove the object storage add-on from the installer and set the `disableS3` flag to `true` in the add-on.

This deploys the admin console without an object store, as well as allows the supporting add-ons to use persistent volumes (PVs) instead of object storage.

For more information about the behavior of the `disableS3` flag, see [KOTS Add-on](https://kurl.sh/docs/add-ons/kotsadm) in the open source kURL documentation.

See [Removing Object Storage](https://kurl.sh/docs/install-with-kurl/removing-object-storage) for documentation on migrating a cluster away from object storage.