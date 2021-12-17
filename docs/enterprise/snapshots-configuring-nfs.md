# Configuring NFS

> Introduced in KOTS v1.33.0

The steps described on this page are only necessary if you wish to configure a Network File System (NFS) as your KOTS Snapshots [storage destination](/kotsadm/snapshots/storage-destinations/).

Important notes before you begin:

* Make sure that you have the NFS server already set up and configured to allow access from all the nodes in the cluster.
* Make sure all the nodes in the cluster have the necessary NFS client packages installed to be able to communicate with the NFS server.
For example, the `nfs-common` package is a very common package used on Ubuntu.
* Make sure that any firewalls (if any) are properly configured to allow traffic between the NFS server and clients (cluster nodes).

## Embedded Clusters

Embedded clusters set up using installers that include the [Velero](https://kurl.sh/docs/add-ons/velero) addon are configured by default to store snapshots internally in the cluster.
There are two ways to change this configuration to use NFS:

* Using the KOTS CLI [velero configure-nfs](/kots-cli/velero/configure-nfs/) command.
* Using the admin console (Check screenshots below):

First, head to the "Snapshots" tab.
From there, head to the "Settings and Schedule" tab and choose the "Network File System (NFS)" dropdown option.

![Snapshot Destination Dropdown NFS](/images/snapshot-destination-dropdown-nfs.png)

Enter the NFS server hostname or IP Address, and the path that is exported by the NFS server and click "Update storage settings".
This step might take a couple of minutes so please be patient.

![Snapshot Destination NFS Fields](/images/snapshot-destination-nfs-fields.png)

When configuring the admin console to store snapshots on an NFS server, the following fields are available:

| Name   | Description                                  |
|--------|----------------------------------------------|
| Server | The hostname or IP address of the NFS server |
| Path   | The path that is exported by the NFS server  |

## Existing Clusters

**Note:** If Velero is already installed in the cluster, you can follow the same instructions mentioned in the [Embedded Clusters](/kotsadm/snapshots/configuring-nfs/#embedded-clusters) section.

If Velero is not yet installed in the cluster, then the first step would be to set up and deploy the necessary components that are going to be used to install and set up Velero with NFS.
This can be done in two ways:

### Using the KOTS CLI

The [velero configure-nfs](/kots-cli/velero/configure-nfs/) CLI command can be used to configure NFS for either online or airgapped installations.
After this command has run and completed successfully, it will detect if Velero is not installed and print out specific instructions on how to install and set up Velero.

**Online Installations**

```bash
kubectl kots velero configure-nfs --nfs-server <hostname-or-ip> --nfs-path /path/to/directory --namespace <namespace>
```

**Airgapped Installations**

```bash
kubectl kots velero configure-nfs \
  --nfs-server <hostname-or-ip> \
  --nfs-path /path/to/directory \
  --namespace <namespace> \
  --kotsadm-registry private.registry.host \
  --kotsadm-namespace application-name \
  --registry-username ro-username \
  --registry-password ro-password
```

### Using the admin console

First, head to the “Snapshots” tab.
From there, head to the “Settings and Schedule” tab.
Then, you'll be presented with a dialog which contains instructions for setting up Velero with different providers.
Click on the "NFS" provider option (check screenshot below).

![Snapshot Provider NFS](/images/snapshot-provider-nfs.png)

Then, you'll be presented with another dialog for configuring NFS.
Enter the NFS server hostname or IP Address, and the path that is exported by the NFS server and click "Configure" (check screenshot below).

![Snapshot Provider NFS Fields](/images/snapshot-provider-nfs-fields.png)

This step might take a few minutes, so please be patient.
Once the configuration is successful, you'll be presented with a different dialog which contains a CLI command that will print out instructions on how to set up Velero with the deployed NFS configuration/components (check screenshot below).

![Snapshot Provider File System Next Steps](/images/snapshot-provider-fs-next-steps.png)

After following the instructions from the above CLI command, and Velero has been installed successfully, you can go back to the admin console and either click on the "Check for Velero" button to retry detecting Velero, or simply refresh the page.
