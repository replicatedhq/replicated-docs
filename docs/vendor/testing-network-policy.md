# Network Policies (Beta)

This topic describes how to use network policies and Air Gap features for Replicated Compatibility Matrix Clusters and VMs.

## About Network Policies

Test and verify your application in an Air Gap environment. Particularly useful to test [Replicated Embedded Cluster](https://docs.replicated.com/enterprise/installing-embedded-air-gap) or [Helm CLI install](https://docs.replicated.com/vendor/helm-install-airgap) intended for install in an Air Gap environment.

## Prerequisites

* You must be using Replicated CLI 0.109.0 or higher
* You must have the Admin or Developer role. Read Only users cannot change network settings

## Limitations

* Currently only open and air gapped policies are supported. For feedback, contact Replicated support.
* Air Gap networks cannot yet be set within the Compatibility Matrix UI

## For Clusters

:::important

* Only for VM-base K8s clusters: K3s, RKE2, Embedded Cluster, kURL, Kind, OpenShift
* Not yet for Cloud-based K8s clusters: EKS, GKE, AKE, OKE

:::

### Create Cluster

```bash
replicated cluster create --distribution [K8s DISTRIBUTION]
```

**Example:** `replicated cluster create --distribution k3s`

### Option: Verify Initial Network Connectivity

1. Check the cluster is running (  `replicated cluster ls --watch` )

2. Access the cluster (  `replicated cluster shell [CLUSTER ID]  )`

3. Optional: Install a networking testing tool like a [netshoot](https://github.com/nicolaka/netshoot) pod:

```bash
kubectl run tmp-shell --rm -i --tty --image nicolaka/netshoot
```

4. Curl an endpoint (e.g.,  `curl www.google.com`  ), confirm success.

### Set Network Policy to Air Gap

Using a different shell, update the network to `airgap`:

| Open | Air Gap | Custom / Allowlist  |
| :---- | :---- | :---- |
| No restrictions on network traffic | Restrict all network traffic | Restrict all except Allowlist |
| `open` | `airgap` | Coming Soon |

```bash
replicated network update [NETWORK ID] --policy airgap
```

If successful, you’ll see network status transition from `updating` to `running`:

```bash
ID       NAME                STATUS       CREATED                 EXPIRES                POLICY   REPORTING
bdeb3515 gifted_antonelli    running      2025-01-28 18:45 PST    2025-01-28 19:45 PST   airgap   off 
```

### Option: Verify Air Gap

1. In the netshoot container, check outbound connectivity. (e.g.,  `curl www.google.com`  )

2. Request will eventually time out:

```bash
curl: (28) Failed to connect to www.google.com port 80 after 129976 ms: Couldn't connect to server
```

## For Virtual Machines (VMs)

### Create VM

```bash
replicated vm create --distribution ubuntu
```

If successful, you’ll see something like. When ready, STATUS will change queued → running

```bash
ID          NAME           DISTRIBUTION   VERSION   STATUS     NETWORK    CREATED               EXPIRES   COST
067ddbd3    eloquent_sal   ubuntu         24.04     queued     85eb50a8   2025-01-28 16:18 PST  -         $0.60
```

### Option: Verify Initial Network Connectivity

1. SSH into the VM (   `ssh [VMID]@replicatedvm.com`  )  
   More options: [Connect to a VM](https://docs.replicated.com/vendor/testing-vm-create#connect-to-a-vm)

2. Curl an endpoint (e.g.,  `curl www.google.com`  )

### Set Network Policy to Air Gap

Optional: Confirm the VM is running  (`replicated vm ls`)

Then, set the network policy to `airgap`

| Open | Air Gap | Custom / Allowlist  |
| :---- | :---- | :---- |
| No restrictions on network traffic | Restrict all network traffic | Restrict all except Allowlist |
| `open` | `airgap` | Coming Soon |

```bash
replicated network update [NETWORK ID] --policy airgap
```

**Example:** `replicated network update 85eb50a8 --policy airgap`

If successful, you’ll see the network STATUS change from `updating` → `running`  
Note: it may take a few seconds for the setting to apply.

```bash
ID       NAME                STATUS        CREATED                 EXPIRES                POLICY   REPORTING
85eb50a8 silly_rosalind      updating      2025-01-28 16:16 PST    2025-01-28 17:18 PST   airgap   off
```

### Option: Verify Air Gap

Confirm there is no outbound connectivity on your VM.

1. SSH into the VM (   `ssh [VMID]@replicatedvm.com`  )  
   More options: [Connect to a VM](https://docs.replicated.com/vendor/testing-vm-create#connect-to-a-vm)

2. Curl an endpoint (e.g.,  `curl www.google.com`  )

The connection will eventually time out:

```bash
curl: (28) Failed to connect to www.google.com port 80 after 129976 ms: Couldn't connect to server
```
