# Installing the Velero CLI

You install the Velero CLI before installing Velero and configuring a storage destination for backups.

:::note
If your Replicated kURL installer included the Velero add-on, then Velero was automatically installed with default internal storage. Replicated recommends that you proceed to change the default internal storage because it is insufficient for disaster recovery. See [Updating Storage Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

## Install the Velero CLI in an Online Cluster

To install the Velero CLI in an online cluster:

1. Do one of the following:

    - (Embedded cluster) Run an SSH command to access and authenticate to your cluster node.
    - (Existing cluster) Open a terminal in the environment that you manage the cluster from, which can be a local machine that has kubectl installed.

1. Check for the latest supported release of the Velero CLI for **Linux AMD64** in the Velero GitHub repo at https://github.com/vmware-tanzu/velero/releases. Although earlier versions of Velero are supported, Replicated recommends using the latest supported version. For more information about supported versions, see [Velero Version Compatibility](snapshots-understanding#velero-version-compatibility) in _About Backup and Restore_.

    Note the version number for the next step.

1. Run the following command to download the latest supported Velero CLI version for the **Linux AMD64** operating system to the cluster:

   ```
   curl -LO https://github.com/vmware-tanzu/velero/releases/download/VERSION/velero-VERSION-linux-amd64.tar.gz
   ```

   Replace VERSION with the version number using the format `vx.x.x`

   **Example:**

   ```
   curl -LO https://github.com/vmware-tanzu/velero/releases/download/v1.10.1/velero-v1.10.1-linux-amd64.tar.gz
   ```

1. Run the following command to uncompress the TAR file:

   ```
   tar zxvf velero-VERSION-linuxamd64.tar.gz
   ```
   Replace VERSION with the version number using the format `vx.x.x`.

1. Run the following command to install the Velero CLI:
  
   ```
   sudo mv velero-VERSION-linux-amd64/velero /usr/local/bin/velero
   ```
   Replace VERSION with the version number using the format `vx.x.x`.

1. Run `velero version` to test that the Velero CLI installation worked correctly.

   You might get an error message stating that there are no matches for the server version. This is acceptable, as long as you get a confirmation for the client version. After the Velero installation, you also see the server version.

## Install the Velero CLI in an Air Gapped Cluster

To install the Velero CLI in an air gapped cluster:

1. From a computer with internet access, check for the latest supported release of the Velero CLI for **Linux AMD64** in the Velero GitHub repo at https://github.com/vmware-tanzu/velero/releases. Although earlier versions of Velero are supported, Replicated recommends using the latest [supported version](/vendor/snapshots-overview#velero-version-compatibility).

    Note the version number for the next step.

1. Run the following command to download the latest supported Velero CLI version for the **Linux AMD64** operating system to the cluster:

   ```
   curl -LO https://github.com/vmware-tanzu/velero/releases/download/VERSION/velero-VERSION-linux-amd64.tar.gz
   ```

   Replace VERSION with the version number using the format `vx.x.x`

   **Example:**

   ```
   curl -LO https://github.com/vmware-tanzu/velero/releases/download/v1.10.1/velero-v1.10.1-linux-amd64.tar.gz
   ```

1. Copy the TAR file to the air gapped node.

1. Run the following command to uncompress the TAR file:

   ```
   tar zxvf velero-VERSION-linuxamd64.tar.gz
   ```
   Replace VERSION with the version number using the format `vx.x.x`.

1. Run the following command to install the Velero CLI:
  
   ```
   sudo mv velero-VERSION-linux-amd64/velero /usr/local/bin/velero
   ```

   Replace VERSION with the version number using the format `vx.x.x`.

1. Run `velero version` to test that the Velero CLI installation worked correctly.

   You might get an error message stating that there are no matches for the server version. This is acceptable, as long as you get a confirmation for the client version. After the Velero installation, you should see the server version also.


## Next Step

Install Velero and configure a storage destination using one of the following procedures:

- [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
- [Configuring an NFS Storage Destination](snapshots-configuring-nfs)
- [Configuring Other Storage Destinations](snapshots-storage-destinations)