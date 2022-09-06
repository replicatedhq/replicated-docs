# Installing the Velero CLI

Before you install Velero and configure a storage destination for Replicated backup and restore, you must install the Velero CLI.

## Prerequisites

- Review the limitations and considerations. See [Limitations and Considerations](snapshots-understanding#limitations-and-considerations).

## Install the Velero CLI in an Online Cluster

Online environments include admin console installation in existing clusters and Kubernetes installer provisioned clusters.

To install the Velero CLI in an online cluster:

1. From a terminal, run an SSH command to access and authenticate to your cluster:

    **Example: GKE Hosting**

    ```
    gcloud compute ssh -–project PROJECT_NAME -–zone CLUSTER_ZONE CLUSTER_NAME
    ```

1. Check for the latest release of the Velero CLI for **Linux AMD 64** in the Velero GitHub repo at https://github.com/vmware-tanzu/velero/releases. Although earlier versions of Velero are supported, Replicated recommends using the latest Velero version.

    Note the version number for the next step.

1. Run the following command to download the latest Velero CLI version for the **Linux AMD 64** operating system to the cluster:
curl -LO https://github.com/vmware-tanzu/velero/releases/download/VERSION/velero-VERSION-linux-amd64.tar.gz

  Replace VERSION with the version number using the format `vx.x.x`

  **Example:**

  ```
  curl -LO https://github.com/vmware-tanzu/velero/releases/download/v1.9.1/velero-v1.9.1-linux-amd64.tar.gz
  ```

1. Run the following command to uncompress the TAR file:

  ```
  tar zxvf velero-VERSION-linuxamd64.tar.gz
  ```

  **Example:**

  tar zxvf velero-v1.9.1-linux-amd64.tar.gz

1. Run the following command to install the Velero CLI:

  ```
  sudo mv velero-v1.9.1-linux-amd64/velero /usr/local/bin/velero
  ```

1. To test that the Velero CLI installation worked correctly, run a Velero command for version or help.

  **Example:**

  ```
  velero version
  ```

  When checking the version, you might get an error message stating that there are no matches for the server version. This is ok, as long as you get a confirmation for the client version. After the Velero installation, you should see the server version also.




## Additional resources
- [How to Set Up Snapshots](snapshots-understanding)
