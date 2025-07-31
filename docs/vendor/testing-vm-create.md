import Prerequisites from "../partials/cmx/_prerequisites.mdx"

# Create VMs (Beta)

This topic describes how to use Replicated Compatibility Matrix to create and manage ephemeral VMs, which allows greater flexibility in testing VM-based installs such as the [Replicated Embedded Cluster](https://docs.replicated.com/intro-replicated#embedded-cluster).

## About Compatibility Matrix VMs

Compatibility Matrix VMs provide isolated Linux environments for testing your applications. Unlike clusters, VMs give you full control over the operating system and allow you to test installation methods that require direct OS access.

**When to use VMs vs Clusters:**
* **Use VMs** for testing Embedded Cluster installers, air-gap installations, or when you need full OS control.
* **Use Clusters** for testing Kubernetes-based deployments and Helm installations. See [Create Clusters](/vendor/testing-how-to).

## Prerequisites

Before you can use Compatibility Matrix VMs, you must complete the following prerequisites:

<Prerequisites/>

* Existing accounts must accept the TOS for the trial on the [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix) page in the Replicated Vendor Portal.


Prerequisites for SSH access to VMs:

* [Configure your GitHub username or GitHub service account in Replicated Vendor Portal](team-management-github-username#procedure)

* Make sure you have added your SSH key in your GitHub account. For instructions, see [Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) in the GitHub documentation.

:::note
Troubleshooting
Your GitHub usernames and SSH keys are synced to the VM when you first create it. If you update your GitHub username or keys after VM creation, you can manually sync by going to [Account Settings](https://vendor.replicated.com/account-settings) > click "Save." 
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

If you do not see this message, check if your public/private key has been properly set up with GitHub.

```bash
ssh -T git@github.com
```

If successful, you will see:

```
Hi! You've successfully authenticated, but GitHub does not provide shell access.
```



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


1. (Optional) View the available VM distributions, including the supported VM distribution versions and instance types:

   ```bash
   replicated vm versions
   ```
   For command usage, see [vm versions](/reference/replicated-cli-vm-versions).



2. Run the following command to create a VM:

   ```bash
   replicated vm create --distribution DISTRIBUTION
   ```

   To specify more options:


   ```bash
   replicated vm create  --name NAME --distribution DISTRIBUTION --version VERSION --instance-type INSTANCE_TYPE --count COUNT --ttl TTL
   ```

   Where:
   * `NAME` is any name for the VM. If `--name` is excluded, a name is automatically generated for the cluster.
   * `DISTRIBUTION` is the operating system distribution for the VM (e.g., ubuntu, almalinux).
   * `VERSION` is the version of the distribution to provision (e.g., 20.04, 22.04 for Ubuntu).
   * `INSTANCE_TYPE` is the instance type to use for the VM (e.g., r1.medium, r1.large).
   * `COUNT` is the number of VMs to create. If `--count` is excluded, one VM is created by default.
   * `TTL` is the VM Time-To-Live duration (maximum 48h). If `--ttl` is excluded, the default TTL is 1 hour.

   For command usage and additional optional flags, see [vm create](/reference/replicated-cli-vm-create).

   **Example:**

   The following example creates an Ubuntu VM with version 22.04, a disk size of 50 GiB, and an instance type of `r1.medium`.

   ```bash
   replicated vm create --distribution ubuntu --version 22.04 --disk 50 --instance-type r1.medium
   ```



### Supported VM Types

The following VM types are supported:

| Distribution | Versions | Instance Types |
| :---- | :---- | :---- |
| ubuntu | 24.04, 22.04 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge |
| almalinux | 8 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge |

## Connect to a VM

There are currently two supported methods to SSH into a VM:

1. [**Compatibility Matrix Forwarder**](#compatibility-matrix-forwarder)  
   * Easier – You only need to know the VM ID to connect to the machine via SSH. This is more approachable for users less familiar with SSH clients.   
   * Example Use Case – Run an online Embedded Cluster install command

2. [**Direct SSH**](#direct-ssh)  
   * More Flexible – Leverage your SSH tool of choice and pass any client supported flags, without any added connection lag of being routed through the Compatibility Matrix Forwarder.   
   * Example Use Case – SCP large assets to the VM, such as air gap bundles.   
     Pass specific SHH flags during testing workflows

### Compatibility Matrix Forwarder

:::note
Transferring files using Compatibility Matrix Forwarder is slower than Direct SSH. Compatibility Matrix servers run on EKS, so depending on your location going through the forwarder will add latency. If you're transferring large files onto the VM, use [Direct SSH](#direct-ssh) in combination with SCP.
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

## Limitations

- Installing Embedded Cluster is for [EC **1.21.x**](https://github.com/replicatedhq/embedded-cluster/releases/tag/1.21.0%2Bk8s-1.30) or later
   - To reboot a Compatibility Matrix VM, run the [Embedded Cluster reset command](embedded-using#reset-a-node)
- [GitHub Actions](https://docs.replicated.com/vendor/testing-how-to#replicated-github-actions) do not yet work with Compatibility Matrix VMs. 
- [Cluster prepare](https://docs.replicated.com/reference/replicated-cli-cluster-prepare) is not yet supported with Compatibility Matrix VMs.