# Create VMs (Beta)

This topic describes how to use Replicated Compatibility Matrix to create and manage ephemeral VMs, which allows greater flexibility in testing VM-based installs such as the [Replicated Embedded Cluster](https://docs.replicated.com/intro-replicated#embedded-cluster).

## About Compatibility Matrix VMs

Compatibility Matrix VMs provide isolated Linux environments for testing your applications. Unlike clusters, VMs give you full control over the operating system and allow you to test installation methods that require direct OS access.

**When to use VMs vs Clusters:**
* **Use VMs** for testing Embedded Cluster installers, air-gap installations, or when you need full OS control
* **Use Clusters** for testing Kubernetes-based deployments and Helm installations

## Prerequisites

Before you can use Compatibility Matrix VMs, you must complete the following prerequisites:

* [Configure your GitHub username in Replicated Vendor Portal](team-management-github-username#procedure)

* Make sure you have added your SSH key in your GitHub account. For instructions, see [Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) in the GitHub documentation.

:::note
GitHub usernames and SSH keys are synced every 24hrs. To immediately sync: → [Account Settings](https://vendor.replicated.com/account-settings) > click Save. Keys are synced to the VM at time of creation, so any updates after creation are ignored.
:::

## Set Up SSH Access

After completing the prerequisites, verify your SSH access is working:

```bash
ssh -T replicated@replicatedvm.com
```

If successful, you will see:

```
You have successfully authenticated, use [VM_ID]@replicatedvm.com to access your VM.
```

If you do not see this message, your public/private key likely was not available.

### Alternative: Use a Service GitHub Account

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

:::note
Transferring files using CMX Forwarder is slower than Direct SSH. CMX servers run on EKS, so depending on your location going through the forwarder will add latency. If you're transferring large files onto the VM, use [Direct SSH](#direct-ssh) in combination with SCP.
:::

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

:::note
**Beta Limitations:** scp with flag -O (legacy scp protocol) is not supported. Relative paths is not supported `❌ scp somefile VMID@replicatedvm.com:~ ✅ scp somefile VMID@replicatedvm:/home/folder/somefile` File permissions are not inherited.
:::

### Direct SSH

:::note
Transferring files using Direct SSH allows you to use your SSH tool of choice, and pass any client-supported flags. Note: Requires Replicated CLI v0.104.0 or later.
:::

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

### Override Username

You can override the username used for the endpoint with the `--username` flag. This is useful if you want to:

* Use a different GitHub username than what is in Vendor Portal (or no username set)
* When creating a VM, you used the `--ssh-public-key` flag to associate the VM with a GitHub service account, and this doesn't match the GitHub username set in Vendor Portal

```bash
replicated vm ssh-endpoint VMID_OR_VMNAME --username GITHUB_USER_NAME
```

**Example** – `replicated vm ssh-endpoint aba1acc2 --username MyName`

## Connect to a VM Manually

You may need an alternate method if the above options don't work with your preferred SSH client.

When a VM is created, a random port is assigned to each machine within each group of the VM. To connect with the machine over SSH:

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

**Example** – `ssh -p 33655 myName@95.217.47.21`

## Compatibility Matrix Tunnels

:::note
Creating wildcard DNS entries for VMs is not currently supported. For feedback, contact Replicated support.
:::

You can expose ports on a VM and make them accessible on the public internet. For more information about a similar feature, see [Compatibility Matrix Tunnels for Clusters](testing-ingress#compatibility-matrix-tunnels-beta).

### Create a Tunnel

```bash
replicated vm port expose VMID_OR_VMNAME --port PORT --protocol PROTOCOL
```

**Example** – Expose port 3000 with HTTP protocol  
`replicated vm port expose VM_ID --port 30000 --protocol http`

### List Tunnels

```bash
replicated vm port ls VMID_OR_VMNAME
```

### Remove a Tunnel

```bash
replicated vm port rm VMID_OR_VMNAME
```

## Connect a CMX VM with a CMX Cluster

You can make a CMX Cluster available on the same network as a CMX VM.

**Compatible Clusters:** Openshift, K3s, RKE2, EC, kURL  
**Requirement:** Replicated CLI 0.90.0 or higher  
**Note:** Create the cluster first, then attach the new VM to that existing network.

### Create a Cluster

```bash
replicated cluster create --distribution K8S_DISTRIBUTION
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

### Create CMX VM on Same Network

```bash
replicated vm create --distribution DISTRIBUTION --network NETWORK_ID
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

### Join VMs to an Existing VM Network

First, get the ID of an existing VM network:

```bash
replicated vm ls
```

Or

```bash
replicated network ls
```

Use the `--network` flag to create new VMs on the same network:

```bash
replicated vm create --distribution ubuntu --network NETWORK_ID
```

## Limitations

- Installing Embedded Cluster is for [EC **1.21.x**](https://github.com/replicatedhq/embedded-cluster/releases/tag/1.21.0%2Bk8s-1.30) or later
   - To reboot a CMX VM, run the [Embedded Cluster reset command](embedded-using#reset-a-node)
- [GitHub Actions](https://docs.replicated.com/vendor/testing-how-to#replicated-github-actions) do not yet work with Compatibility Matrix VMs. 
- [Cluster prepare](https://docs.replicated.com/reference/replicated-cli-cluster-prepare) is not yet supported with Compatibility Matrix VMs.