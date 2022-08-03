# Configuring a Host Path

> Introduced in the Replicated app manager v1.33.0

You can configure a host path as your snapshots storage destination. For more information about snapshot storage destinations, see [Storage destinations](snapshots-storage-destinations).

## Requirements

The following are requirements for using a host path as the storage destination:

* The host path must be a dedicated directory. Do not use a partition used by a service like Docker or Kubernetes for ephemeral storage.
* The host path must exist and be writable by the user:group 1001:1001 on all nodes in the cluster.

   If you use a mounted directory for the storage destination, such as one that is created with the Common Internet File System (CIFS) or Server Message Block (SMB) protocols, ensure that you configure the user:group 1001:1001 permissions on all nodes in the cluster and from the server side as well.

   You cannot change the permissions of a mounted network shared filesystem from the client side. To reassign the user:group to 1001:1001 for a directory that is already mounted, you must remount the directory. For example, for a CIFS mounted directory, specify the `uid=1001,gid=1001` mount options in the CIFS mount command.


## Configure a Host Path on Kubernetes Installer-created Clusters

Clusters created by the Replicated Kubernetes installer that include the Velero add-on store snapshots internally in the cluster by default. For more information about the Velero add-on, see [Velero Add-On](https://kurl.sh/docs/add-ons/velero) in the open source kURL documentation.

There are two ways to change this snapshots storage destination to use a host path:

* Using the kots CLI `velero configure-hostpath` command. See [`velero configure-hostpath`](../reference/kots-cli-velero-configure-hostpath/) in the kots CLI documentation.
* Using the Replicated admin console. See the instructions below.

First, head to the "Snapshots" tab.
From there, head to the "Settings and Schedule" tab and choose the "Host Path" dropdown option.

![Snapshot Destination Dropdown Host Path](/images/snapshot-destination-dropdown-hostpath.png)

Enter the path to the directory on the node and click "Update storage settings".
This step might take a couple of minutes.

![Snapshot Destination Host Path Fields](/images/snapshot-destination-hostpath-field.png)

When configuring the admin console to store snapshots on a local host path, the following fields are available:

| Name      | Description                   |
|-----------|-------------------------------|
| Host Path | A local host path on the node |


## Configure a Host Path on Existing Clusters

If Velero is already installed in the cluster, follow the instructions in the [Configure a host path on Kubernetes installer-created clusters](#configure-a-host-path-on-kubernetes-installer-created-clusters) section above.

If Velero is not installed in the cluster, then the first step is to set up and deploy the necessary components that are going to be used to install and set up Velero with the provided host path.
This can be done in two ways:

### Using the kots CLI

You can use the `velero configure-hostpath` CLI command to configure a host path for either online or air gapped installations.
After this command has run and completed successfully, it will detect if Velero is not installed and print out specific instructions on how to install and set up Velero.

**Online Installations**

```bash
kubectl kots velero configure-hostpath --hostpath /path/to/directory --namespace <namespace>
```

**Air gapped Installations**

```bash
kubectl kots velero configure-hostpath \
  --hostpath /path/to/directory \
  --namespace <namespace> \
  --kotsadm-registry private.registry.host \
  --kotsadm-namespace application-name \
  --registry-username ro-username \
  --registry-password ro-password
```

### Using the Admin Console

First, head to the “Snapshots” tab.
From there, head to the “Settings and Schedule” tab.
Then, you'll be presented with a dialog which contains instructions for setting up Velero with different providers.
Click on the "Host Path" provider option (check screenshot below).

![Snapshot Provider Host Path](/images/snapshot-provider-hostpath.png)

Then, you'll be presented with another dialog for configuring the host path.
Enter the path to the directory on the node and click "Configure".

![Snapshot Provider Host Path Fields](/images/snapshot-provider-hostpath-field.png)

This step might take a few minutes.
Once the configuration is successful, you'll be presented with a different dialog which contains a CLI command that will print out instructions on how to set up Velero with the deployed host path configuration/components.

![Snapshot Provider File System Next Steps](/images/snapshot-provider-fs-next-steps.png)

After following the instructions from the above CLI command and successfully installing Velero, you can go back to the admin console and either click on the "Check for Velero" button to retry detecting Velero, or refresh the page.
