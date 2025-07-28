# Create VMs (Beta)

The Compatibility Matrix (CMX) platform allows you to create VMs with no Kubernetes pre-installed on them. This is useful for testing VM-based installs such as the [Replicated Embedded Cluster](https://docs.replicated.com/intro-replicated#embedded-cluster).

| ⚠️ Current Limitations [GitHub Actions](https://docs.replicated.com/vendor/testing-how-to#replicated-github-actions) do not yet work with Compatibility Matrix VMs. [Cluster prepare](https://docs.replicated.com/reference/replicated-cli-cluster-prepare) is not yet supported with Compatibility Matrix VMs. → To try out VMs (Beta), [email](mailto:han@replicated.com) Replicated for access & support. |
| :---- |

## Prerequisites

Before you can use Compatibility Matrix VMs, you must complete the following prerequisites:

### Connect GitHub Account

Before you can SSH into a VM:

1. Configure your GitHub username in Replicated Vendor Portal ([Replicated Docs](https://docs.replicated.com/vendor/team-management-github-username#procedure))
2. Make sure you've added your SSH key in your GitHub account ([GitHub instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account))

| GitHub usernames and SSH keys are synced every 24hrs. To immediately sync: → [Account Settings](https://vendor.replicated.com/account-settings/info) > click Save Keys are synced to the VM at time of creation, so any updates after creation are ignored. |
| :---- |

To confirm your GitHub username and SSH key have been set up successfully:

```bash
ssh -T replicated@replicatedvm.com
```

If successful, you'll see:

```
You've successfully authenticated, use [VM_ID]@replicatedvm.com to access your VM.
```

If you do not see this message, your public/private key likely was not available.

### Use a Service GitHub Account

To automate VMs in your CI, or otherwise avoid using a personal GitHub account, use the flag `--ssh-public-key` when you first create a VM:

```bash
replicated vm create --distribution ubuntu --version 20.04 --ssh-public-key ~/.ssh/id_rsa.pub
```

Using multiple SSH public keys:

```bash
replicated vm create --distribution ubuntu --version 20.04 --ssh-public-key ~/.ssh/id_rsa.pub --ssh-public-key ~/.ssh/id_ed25519.pub
```

## Create VMs

To create VMs with Compatibility Matrix:

1. Run the following command to create VMs:

   ```bash
   replicated vm create --distribution DISTRIBUTION --count COUNT
   ```

   Where:
   * `DISTRIBUTION` is the Linux distribution for the VM (e.g., ubuntu, almalinux)
   * `COUNT` is the number of VMs to create

   **Example:**

   ```bash
   replicated vm create --distribution ubuntu --count 3
   ```

1. List supported distributions and versions:

   ```bash
   replicated vm versions
   ```

### Supported VM Types

The following VM types are supported:

| Distribution | Versions | Instance Types |
| :---- | :---- | :---- |
| ubuntu | 24.04, 22.04 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge |
| almalinux | 8 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge |

## Connect to a VM

There are currently two supported methods to SSH into a VM:

1. [**CMX Forwarder**](#cmx-forwarder)  
   * Easier – You only need to know the VM ID to connect to the machine via SSH. This is more approachable for users less familiar with SSH clients.   
   * Example Use Case – Run an online Embedded Cluster install command

2. [**Direct SSH**](#direct-ssh)  
   * More Flexible – Leverage your SSH tool of choice and pass any client supported flags, without any added connection lag of being routed through the CMX Forwarder.   
   * Example Use Case – SCP large assets to the VM, such as air gap bundles.   
     Pass specific SHH flags during testing workflows

### CMX Forwarder

| Transferring files using CMX Forwarder is slower than Direct SSH. CMX servers run on EKS, so depending on your location going through the forwarder will add latency. If you're transferring large files onto the VM, use [Direct SSH](#direct-ssh) in combination with SCP. |
| :---- |

SSH into the VM:

```bash
ssh VMID@replicatedvm.com
```

Where `VMID` is the ID of the VM.

If needed, copy files onto the machine:

```bash
scp somefile VMID@replicatedvm:/home/folder/somefile
```

Where `VMID` is the ID of the VM.

| Beta Limitations: scp with flag -O (legacy scp protocol) is not supported. Relative paths is not supported `❌ scp somefile VMID@replicatedvm.com:~ ✅ scp somefile VMID@replicatedvm:/home/folder/somefile` File permissions are not inherited. |
| :---- |

### Direct SSH

| Transferring files using Direct SSH allows you to use your SSH tool of choice, and pass any client-supported flags. Note: Requires Replicated CLI v0.104.0 or later. |
| :---- |

Get the SSH endpoint for the VM:

1. Run the following command to get the SSH endpoint:

   ```bash
   replicated vm ssh-endpoint VMID_OR_VMNAME
   ```

   Where `VMID_OR_VMNAME` is the ID or name of the VM.

   If successful, you'll see:

   ```
   ssh://[github-user-name]@[ssh-endpoint]:[port]
   ```

   **Example** – `ssh://MyName@37.27.52.116:46795`

   ⚠️ The username for SSH should match the GitHub username in Vendor Portal. For more information about overriding the username, see [Override Username](#override-username).

1. SSH into the VM:

   ```bash
   ssh $(replicated vm ssh-endpoint VMID_OR_VMNAME)
   ```

   **Example** – `ssh $(replicated vm ssh-endpoint aba1acc2)`

### Copy Files to the VM (SCP)

Request the scp endpoint:

1. Run the following command to get the SCP endpoint:

   ```bash
   replicated vm scp-endpoint VMID_OR_VMNAME
   ```

   Where `VMID_OR_VMNAME` is the ID or name of the VM.

   **Example** – `replicated vm scp-endpoint aba1acc2`

   If successful, you'll see:

   ```
   scp://[github-user-name]@[ssh-endpoint]:[port]
   ```

   **Example** – `scp://MyName@37.27.52.116:46795`

   ⚠️ The username for SSH should match the GitHub username in Vendor Portal. For more information about overriding the username, see [Override Username](#override-username).

1. SCP files into the VM:

   ```bash
   scp somefile $(replicated vm scp-endpoint VMID_OR_VMNAME)//PATH
   ```

   Where `PATH` is the destination path on the VM.

   **Example** – `scp somefile $(replicated vm scp-endpoint aba1acc2)//home/MyName/somefile`

#### Override Username

You can override the username used for the endpoint with the `--username` flag. This is useful if you want to:

* Use a different GitHub username than what is in Vendor Portal. (Or no username set.)  
* When creating a VM, you used the `--ssh-public-key` flag to associate the VM with a GitHub service account, and this doesn't match the GitHub username set in Vendor Portal. For more information, see [Use a Service GitHub Account](#use-a-service-github-account).

To override the username:

```bash
replicated vm ssh-endpoint VMID_OR_VMNAME --username GITHUB_USERNAME
```

Where:
* `VMID_OR_VMNAME` is the ID or name of the VM
* `GITHUB_USERNAME` is the GitHub username to use for the endpoint

**Example** – `replicated vm ssh-endpoint aba1acc2 --username MyName`

## Connect to a VM Manually

You may need an alternate method if the above options don't work with your preferred SSH client.

When a VM is created, a random port is assigned to each machine within each group of the VM.   
To connect with the machine over SSH:

1. Run the following command to list VMs:

   ```bash
   replicated vm ls --output json
   ```

   If successful, you'll see:

   ```json
   [
     {
   	"id": "e32aafa1",
   	"name": "sad_black",
   	"distribution": "ubuntu",
   	"version": "24.04",
   	"status": "running",
   	"created_at": "2024-10-24T15:00:37Z",
   	"expires_at": "2024-10-24T16:01:10Z",
   	"ttl": "1h",
   	"credits_per_hour_per_vm": 0,
   	"flat_fee": 50000,
   	"total_credits": 0,
   	"estimated_cost": 0,
   	"direct_ssh_port": 33655,
   	"direct_ssh_endpoint": "95.217.47.21",
   	"tags": []
     }
   ]
   ```

To connect with them, you can run:

```bash
ssh -p DIRECT_SSH_PORT GITHUB_USERNAME@DIRECT_SSH_ENDPOINT
```

Where:
* `DIRECT_SSH_PORT` is the port number from the JSON output
* `GITHUB_USERNAME` is your GitHub username
* `DIRECT_SSH_ENDPOINT` is the endpoint from the JSON output

**Example** – `ssh -p 33655 myName@95.217.47.21`

## Compatibility Matrix Tunnels

| ⚠️Creating wildcard DNS entries for VMs is not currently supported. ([email](mailto:han@replicated.com) feedback) |
| :---- |

You can expose ports on a VM and make them accessible on the public internet.   
(Learn about a similar feature: [Compatibility Matrix Tunnels for Clusters](https://docs.replicated.com/vendor/testing-ingress#compatibility-matrix-tunnels-beta))

### Create a Tunnel

To create a tunnel:

```bash
replicated vm port expose VMID_OR_VMNAME --port PORT --protocol PROTOCOL
```

Where:
* `VMID_OR_VMNAME` is the ID or name of the VM
* `PORT` is the port number to expose
* `PROTOCOL` is the protocol to use (e.g., http, tcp)

**Example** – Expose port 3000 with HTTP protocol:  
`replicated vm port expose VM_ID --port 30000 --protocol http`

### List Tunnels

To list tunnels for a VM:

```bash
replicated vm port ls VMID_OR_VMNAME
```

Where `VMID_OR_VMNAME` is the ID or name of the VM.

### Remove a Tunnel

To remove a tunnel:

```bash
replicated vm port rm VMID_OR_VMNAME
```

Where `VMID_OR_VMNAME` is the ID or name of the VM.

## Connect a CMX VM with a CMX Cluster

You can make a CMX Cluster available on the same network as a CMX VM.

**Compatible Clusters:** Openshift, K3s, RKE2, EC, kURL  
**Requirement:** Replicated CLI 0.90.0 or higher.  
**NOTE:** Create the cluster first, then attach the new VM to that existing network.

### Create a Cluster

To create a cluster:

```bash
replicated cluster create --distribution K8S_DISTRIBUTION
```

Where `K8S_DISTRIBUTION` is the Kubernetes distribution for the cluster.

**Example** – `replicated cluster create --distribution k3s`

If successful, you'll see:

```
ID      	NAME			DISTRIBUTION	VERSION	STATUS		CREATED	
EXPIRES	COST
b09cf035	affect_mend     	k3s         	1.32.0    	queued      	2025-01-28 16:04 PST    -             $0.60
```

### Check the Network

To check the network:

```bash
replicated network ls
```

If successful, you'll see:

```
ID		NAME			STATUS		CREATED			EXPIRES
accbd6a7	affect_mend 	running     	2025-01-28 16:04 PST    	2025-01-28 17:05 PST
```

### Create CMX VM on same Network

To create a VM on the same network:

```bash
replicated vm create --distribution DISTRIBUTION --network NETWORK_ID
```

Where:
* `DISTRIBUTION` is the Linux distribution for the VM
* `NETWORK_ID` is the ID of the network from the previous step

**Example** – `replicated vm create --distribution ubuntu --network accbd6a7`

If successful, you'll see:

```
ID      	NAME            DISTRIBUTION	VERSION   	STATUS      	CREATED                 	EXPIRES       	COST
760a30b1	laughing_tu	ubuntu      	24.04     	queued      	2025-01-28 16:07 PST        -                   $0.60
```

**Example** – Both the cluster `b09cf035` and the VM `760a30b1` are now on the same tailnet.

## Connect CMX VMs on a Shared Network

Use the `--count` flag to create multiple VMs with the same name, all running on the same Network ID.

```bash
replicated vm create --distribution ubuntu --count 3
```

### Join VMs to an Existing VM network

To join VMs to an existing network:

1. Get the ID of an existing VM network:

   ```bash
   replicated vm ls
   ```

   Or

   ```bash
   replicated network ls
   ```

1. Use the `--network` flag to create new VMs on the same network:

   ```bash
   replicated vm create --distribution ubuntu --network NETWORK_ID
   ```

   Where `NETWORK_ID` is the ID of the existing network.

## Install Embedded Cluster on a CMX VM

* Only available for [EC **1.21.x**](https://github.com/replicatedhq/embedded-cluster/releases/tag/1.21.0%2Bk8s-1.30) or later.  
* You can now reboot a CMX VM. e.g., when running the [Embedded Cluster reset command](https://docs.replicated.com/vendor/embedded-using#reset-a-node).   
* For **multi-node** Embedded Cluster initial install: you **no longer** need the flag `--network-interface tailscale0` as part of your Embedded Cluster install command, which was needed to make sure the nodes can reach the api-server. This was due to an [upstream issue](https://github.com/tailscale/tailscale/issues/14706) with the Calico CNI on a Tailscale network. A new overlay network is available that makes this flag obsolete. For more information about the Embedded Cluster install command, see [Embedded Cluster Install](https://docs.replicated.com/reference/embedded-cluster-install). 