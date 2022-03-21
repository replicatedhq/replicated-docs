# Updating the Admin Console on a Kubernetes Installer-Created Cluster

This document refers to upgrading the Replicated admin console on a Kubernetes installer-created cluster (embedded cluster).
For information about how to upgrade the admin console on an existing cluster, see [Updating the admin console on an existing cluster](updating-existing-cluster).

### Online Installations

To update the admin console when deployed to a Kubernetes installer-created cluster, re-run the installation script on the first primary node where the installation was initialized.
All flags passed to the script for the initial installation must be passed again.

```bash
curl -sSL https://kurl.sh/supergoodtool | sudo bash
```

### Air Gapped Installations

To update admin console in an air gapped environment, download the new Kubernetes installer air gap bundle, extract it, and run the install.sh script.

```bash
curl -SL -o supergoodtool.tar.gz https://kurl.sh/bundle/supergoodtool.tar.gz
tar xzvf supergoodtool.tar.gz
cat install.sh | sudo bash -s airgap
```

To update the application in an air gapped environment, download the new application air gap bundle and run the following command:

```bash
kubectl kots upstream upgrade <app slug> --airgap-bundle new-app-release.airgap -n default
```

### Updating Kubernetes

If the application vendor has updated the version of Kubernetes in the installer since the last time the script was run, it will begin an upgrade of Kubernetes.

The script will first print a prompt to continue with an upgrade of the local primary node.

```bash
    Drain local node and apply upgrade?
```

If confirmed, the local primary node will be drained and the upgrade to the control plane will be applied.

Then the script will upgrade any remote nodes one at a time, starting with all primaries and then continuing to all secondary nodes.
For each remote node detected, it will drain the node and wait for the drain to complete.
Then it will print a command that must be run on that node to upgrade the control plane.

```bash
    curl -sSL https://kurl.sh/supergoodtool/upgrade.sh | sudo bash -s hostname-check=master-node-2 kubernetes-version=v1.15.3
```

The script will poll the status of the remote node until it detects the upgrade has completed.
Then it will uncordon that node and proceed to drain the next node.
The script will ensure that at most one node is cordoned at a time.
The Kubernetes scheduler will automatically reschedule pods to other nodes during maintenance.
Any deployments or StatefulSets with a single replica will experience downtime while being rescheduled.

### Updating Add-ons

If the application vendor has updated any add-ons in the installer since the last time the script was run, the upgrade will proceed automatically after any required Kubernetes upgrade.
