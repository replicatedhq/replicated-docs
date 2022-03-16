# Updating the Admin Console on an Existing Cluster

This document refers to upgrading the Replicated admin console on an existing cluster.
For information about how to upgrade the admin console on a Kubernetes installer-created cluster (embedded cluster), see [Updating the admin console on a Kubernetes installer cluster](updating-embedded-cluster).

**Prerequisites**

As a prerequisite for any admin console upgrade, start by upgrading your kots CLI to the desired version.
* For online installations, follow the instructions after running `kubectl kots version` to download the latest binary.
* For air gapped installations or to use a previous Replicated app manager version, download the the latest app manager binary from [Github](https://github.com/replicatedhq/kots/releases) or the customer download page in the Replicated [vendor portal](https://vendor.replicated.com).

### Online Installations

A `kots` command has been provided to update the admin console on an existing cluster.

```bash
kubectl kots admin-console upgrade -n <namespace>
```

Additional usage information can be found by running the `kubectl kots admin-console upgrade -h` command.

### Air Gap Installations

Similar to the initial installation into an existing cluster, images must be pushed to a private registry first:

```shell
kubectl kots admin-console push-images ./kotsadm.tar.gz private.registry.host/application-name \
  --registry-username rw-username \
  --registry-password rw-password
```

After images have been pushed, the upgrade command can be executed with registry read-only credentials:

```bash
kubectl kots admin-console upgrade \
  --kotsadm-registry private.registry.host/application-name \
  --registry-username ro-username \
  --registry-password ro-password \
  -n <namespace>
```
