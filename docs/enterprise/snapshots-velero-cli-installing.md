# Installing the Velero CLI

You install the Velero CLI before installing Velero and configuring a storage destination for backups.

:::note
If your Kubernetes installer cluster was configured to install Velero for you, then you can skip this procedure and configure the storage destination in the admin console. For more information, see [Updating Storage Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

## Install the Velero CLI in an Online Cluster

Online environments include installations on existing clusters and Kubernetes installer provisioned clusters.

To install the Velero CLI in an online cluster:

1. Do one of the following:

    - (Kubernetes installer cluster) Run an SSH command to access and authenticate to your cluster node.
    - (Existing cluster) Open a terminal in the environment that you manage the cluster from, which can be a local machine that has kubectl installed.

1. Check for the latest supported release of the Velero CLI for **Linux AMD64** in the Velero GitHub repo at https://github.com/vmware-tanzu/velero/releases. Although earlier versions of Velero are supported, Replicated recommends using the latest [supported version](/vendor/snapshots-overview#velero-version-compatibility).

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

  **Example:**
  ```
  tar zxvf velero-v1.10.1-linux-amd64.tar.gz
  ```

1. Run the following command to install the Velero CLI:
  
  ```
  sudo mv velero-VERSION-linux-amd64/velero /usr/local/bin/velero
  ```
  
  **Example**:
  ```
  sudo mv velero-v1.10.1-linux-amd64/velero /usr/local/bin/velero
  ```

1. To test that the Velero CLI installation worked correctly, run a Velero command for version or help.

  **Example:**

  ```
  velero version
  ```

  Using the `version` command, you can get an error message stating that there are no matches for the server version. This is acceptable, as long as you get a confirmation for the client version. After the Velero installation, you should see the server version also.

## Next Step

Install Velero and configure a storage destination using one of the following procedures:

- [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
- [Configuring an NFS Storage Destination](snapshots-configuring-nfs)
- [Configuring Other Storage Destinations](snapshots-storage-destinations)


## Additional resources
- [How to Set Up Backup Storage](snapshots-config-workflow)
