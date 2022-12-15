# Updating the Admin Console on a Kubernetes Installer Cluster

This topic describes how to update the admin console on a Kubernetes installer-created cluster (embedded cluster).
For information about how to update the admin console on an existing cluster, see [Updating the Admin Console on an Existing Cluster](updating-existing-cluster).

### Online Installations

To update the admin console when deployed to a Kubernetes installer cluster, re-run the installation script on the first primary node where the installation was initialized. All of the flags that were passed to the script for the initial installation must be passed again.

```bash
curl -sSL https://kurl.sh/APP_SLUG | sudo bash
```

Replace `APP_SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.

### Air Gapped Installations

To update the admin console in an air gapped environment, download the new Kubernetes installer air gap bundle, extract it, and run the install.sh script:

```bash
curl -SL -o FILENAME.tar.gz https://kurl.sh/bundle/FILENAME.tar.gz
tar xzvf FILENAME.tar.gz
cat install.sh | sudo bash -s airgap
```

Replace `FILENAME` with the name of the kURL air gap `.tar.gz` file.

To update the application in an air gapped environment, see [Updating Applications](updating-apps#air-gapped-installations-on-a-kubernetes-installer-created-cluster).

### Updating Kubernetes

If the application vendor has updated the version of Kubernetes in the installer since the last time the script was run, it begins an upgrade of Kubernetes. The script prints a prompt to continue with the upgrade of the local primary node.

```bash
    Drain local node and apply upgrade?
```

If confirmed, the local primary node is drained and the upgrade to the control plane is applied.

Then the script upgrades any remote nodes, one at a time, starting with all primaries and then continuing to all secondary nodes.
For each remote node detected, it drains the node and waits for the drain to complete.
Then it prints a command that you must run on that node to upgrade the control plane.

**Example:**

```bash
    curl -sSL https://kurl.sh/supergoodtool/upgrade.sh | sudo bash -s hostname-check=master-node-2 kubernetes-version=v1.15.3
```

The script polls the status of the remote node until it detects that the upgrade is complete. Then it uncordons that node and proceeds to drain the next node. The script ensures that only one node is cordoned at a time.

The Kubernetes scheduler automatically reschedules pods to other nodes during maintenance. Any deployments or StatefulSets with a single replica experiences downtime while being rescheduled.

### Updating Add-ons

If the application vendor has updated any add-ons in the Kubernetes installer since the last time the script was run, the upgrade proceeds automatically after any required Kubernetes upgrade.
