# Create VMs (Alpha)

The Compatibility Matrix (CMX) platform allows you to create VMs with no Kubernetes pre-installed on them. This is particularly useful for testing VM-based installs such as the [Replicated Embedded Cluster](https://docs.replicated.com/intro-replicated#embedded-cluster).

| ⚠️ Current Limitations [GitHub Actions](https://docs.replicated.com/vendor/testing-how-to#replicated-github-actions) do not yet work with Compatibility Matrix VMs. [Cluster prepare](https://docs.replicated.com/reference/replicated-cli-cluster-prepare) is not yet supported with Compatibility Matrix VMs. → To try out VMs (Alpha), [email](mailto:han@replicated.com) Replicated for access & support. |
| :---- |

## Create VMs

To create [3] [Ubuntu] VMs:

```bash
replicated vm create --distribution ubuntu --count 3
```

List supported distributions and versions:

```bash
replicated vm versions
```

Supported VM types:

| Distribution | Versions | Instance Types |
| :---- | :---- | :---- |
| ubuntu | 24.04, 22.04 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge |
| almalinux | 8 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge |

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
ssh [VMID]@replicatedvm.com
```

If needed, copy files onto the machine:

```bash
scp somefile [VMID]@replicatedvm:/home/folder/somefile
```

| Alpha Limitations: scp with flag -O (legacy scp protocol) is not supported. Relative paths is not supported `❌ scp somefile [VMID]@replicatedvm.com:~ ✅ scp somefile [VMID]@replicatedvm:/home/folder/somefile` File permissions are not inherited. |
| :---- |

### Direct SSH

| Transferring files using Direct SSH allows you to use your SSH tool of choice, and pass any client-supported flags. Note: Requires Replicated CLI v0.104.0 or later. |
| :---- |

Get the SSH endpoint for the VM:

```bash
replicated vm ssh-endpoint [VMID or VMNAME]
```

If successful, you'll see:

```
ssh://[github-user-name]@[ssh-endpoint]:[port]
```

**Example** – `ssh://MyName@37.27.52.116:46795`

⚠️ The username for SSH should match the GitHub username in Vendor Portal. ([override info](#override-username))

SSH into the VM:

```bash
ssh $(replicated vm ssh-endpoint [VMID or VMNAME])
```

**Example** – `ssh $(replicated vm ssh-endpoint aba1acc2)`

### Copy Files to the VM (SCP)

Request the scp endpoint:

```bash
replicated vm scp-endpoint [VMID or VMNAME]
```

**Example** – `replicated vm scp-endpoint aba1acc2`

If successful, you'll see:

```
scp://[github-user-name]@[ssh-endpoint]:[port]
```

**Example** – `scp://MyName@37.27.52.116:46795`

⚠️ The username for SSH should match the GitHub username in Vendor Portal. ([override info](#override-username))

SCP files into the VM:

```bash
scp somefile $(replicated vm scp-endpoint [VMID or VMNAME])//[PATH]
```

**Example** – `scp somefile $(replicated vm scp-endpoint aba1acc2)//home/MyName/somefile`

#### Override Username

**Note:** You can override the username used for the endpoint with the `--username` flag.   
Useful if you want to:

* Use a different GitHub username than what is in Vendor Portal. (Or no username set.)  
* When creating a VM, you used the `--ssh-public-key` flag to associate the VM with a GitHub service account, and this doesn't match the GitHub username set in Vendor Portal. ([more info](#use-a-service-github-account))

```bash
replicated vm ssh-endpoint [VMID or VMNAME] --username [github-user-name]
```

**Example** – `replicated vm ssh-endpoint aba1acc2 --username MyName`

## Connect to a VM Manually

You may need an alternate method if the above options don't work with your preferred SSH client.

When a VM is created, a random port is assigned to each machine within each group of the VM.   
To connect with the machine over SSH:

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
ssh -p [direct_ssh_port] [github_username]@[direct_ssh_endpoint]
```

**Example** – `ssh -p 33655 myName@95.217.47.21`

## Compatibility Matrix Tunnels

| ⚠️Creating wildcard DNS entries for VMs is not currently supported. ([email](mailto:han@replicated.com) feedback) |
| :---- |

You can expose ports on a VM and make them accessible on the public internet.   
(Learn about a similar feature: [Compatibility Matrix Tunnels for Clusters](https://docs.replicated.com/vendor/testing-ingress#compatibility-matrix-tunnels-beta))

### Create a Tunnel

```bash
replicated vm port expose [VMID or VMNAME]
```

**Example** – Expose port 3000 with HTTP protocol  
`replicated vm port expose VM_ID --port 30000 --protocol http`

### List Tunnels

```bash
replicated vm port ls [VMID or VMNAME]
```

### Remove a Tunnel

```bash
replicated vm port rm [VMID or VMNAME]
```

## Connect a CMX VM with a CMX Cluster

You can make a CMX Cluster available on the same network as a CMX VM.

**Compatible Clusters:** Openshift, K3s, RKE2, EC, kURL  
**Requirement:** Replicated CLI 0.90.0 or higher.  
**NOTE:** Create the cluster first, then attach the new VM to that existing network.

### Create a Cluster

```bash
replicated cluster create --distribution [K8s Distribution]
```

**Example** – `replicated cluster create --distribution k3s`

If successful, you'll see:

```
ID      	NAME			DISTRIBUTION	VERSION	STATUS		CREATED	
EXPIRES	COST
b09cf035	affect_mend     	k3s         	1.32.0    	queued      	2025-01-28 16:04 PST    -             $0.60
```

### Check the Network

```bash
replicated network ls
```

If successful, you'll see:

```
ID		NAME			STATUS		CREATED			EXPIRES
accbd6a7	affect_mend 	running     	2025-01-28 16:04 PST    	2025-01-28 17:05 PST
```

### Create CMX VM on same Network

```bash
replicated vm create --distribution [Distribution] --network [Network ID]
```

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

First, get the ID of an existing VM network:

```bash
replicated vm ls
```

Or

```bash
replicated network ls
```

Use the `--network` flag to create new VMs on the same network

```bash
replicated vm create --distribution ubuntu --network [NETWORK_ID]
```

## Install Embedded Cluster on a CMX VM

* Only available for [EC **1.21.x**](https://github.com/replicatedhq/embedded-cluster/releases/tag/1.21.0%2Bk8s-1.30) or later.  
* You can now reboot a CMX VM. e.g., when running the [Embedded Cluster reset command](https://docs.replicated.com/vendor/embedded-using#reset-a-node).   
* For **multi-node** Embedded Cluster initial install: you **no longer** need the flag `--network-interface tailscale0` as part of your [Embedded Cluster install command](https://docs.replicated.com/reference/embedded-cluster-install), which was needed to make sure the nodes can reach the api-server. This was due to an [upstream issue](https://github.com/tailscale/tailscale/issues/14706) with the Calico CNI on a Tailscale network. As of Jul 2, 2025, we have a new overlay network that makes this flag obsolete. 