import Prerequisites from "../partials/cmx/_prerequisites.mdx"
import InstanceTypes from "../partials/cmx/_instance-types.mdx"

# Create VMs (Beta)

This topic describes how to use Replicated Compatibility Matrix to create and manage ephemeral VMs.

## About Compatibility Matrix VMs

Compatibility Matrix VMs provide isolated Linux environments for testing your applications. Unlike clusters, VMs give you full control over the operating system (OS) and allow you to test installation methods that require direct OS access.

You can use Compatibility Matrix VMs for testing and troubleshooting VM-based installations for your application with [Replicated Embedded Cluster](/intro-replicated#embedded-cluster).

For information about creating clusters with Compatibility Matrix to test Kubernetes-based deployments and Helm installations, see [Create Clusters](/vendor/testing-how-to).

## Supported VM Types

The following VM types are supported:

| Distribution | Versions | Instance Types |
| :---- | :---- | :---- |
| ubuntu | 24.04, 22.04 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge. See [Replicated Instance Types](#replicated-instance-types).|
| almalinux | 8, 9, 10 | r1.small, r1.medium, r1.large, r1.xlarge, r1.2xlarge. See [Replicated Instance Types](#replicated-instance-types). |

## Replicated Instance Types

The following describes the Replicated instance types for VMs:

<InstanceTypes/>

## Limitations

Creating VMs with Compatibility Matrix has the following limitations:

- Creating VMs with Compatibility Matrix is a Beta feature.
- Installing Embedded Cluster on a VM created with Compatibility Matrix is supported for Embedded Cluster versions 1.21.0 or later.
- [GitHub Actions](/vendor/testing-ci-cd#replicated-github-actions) are not supported for Compatibility Matrix VMs. 
- The [cluster prepare](/reference/replicated-cli-cluster-prepare) command is not supported for Compatibility Matrix VMs.

## Prerequisites

Before you can use Compatibility Matrix VMs, you must complete the following prerequisites:

<Prerequisites/>

* Existing accounts must accept the TOS for the trial on the [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix) page in the Replicated Vendor Portal.

## Set Up SSH Access

In order to access VMs that you create with Compatibility Matrix, you need to set up SSH access. You can do this using your personal GitHub account or a GitHub service account used by your team.

For setting up SSH access to VMs that you create on your local machine, Replicated recommends that you use your personal GitHub account. For setting up SSH access for VMs created in CI/CD workflows used by your team, use a GitHub service account. For more information, see the sections below.

:::note
Your GitHub usernames and SSH keys are synced to a VM when it is first created. If you update your GitHub username or keys after creating a VM, you can manually sync by updating your [Account Settings](https://vendor.replicated.com/account-settings) in the Vendor Portal and clicking **Save**.
:::

### Use Your GitHub Account

To set up and verify SSH access for Compatibility Matrix VMs using your personal GitHub account:

1. Log in to your GitHub account and add an SSH key if you do not have one already. For information about how to generate and add a new SSH key, see [Generate a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generati[…]w-ssh-key) and [Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) in the GitHub documentation.

1. Run the following command to verify that your public/private SSH key is properly set up with GitHub.

    ```bash
    ssh -T git@github.com
    ```

    If successful, you will see:

    ```
    Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
    ```

1. Log in to the Vendor Portal and go to [**Account Settings**](https://vendor.replicated.com/account-settings/info).

1. On the **Account Settings > Account Information** page, for **GitHub username**, add your GitHub username.

1. On the command line, authenticate with the Replicated CLI using your Vendor Portal account:

   ```bash
   replicated login
   ```
   :::note
   To log out of an existing session, first run `replicated logout`.
   :::

1. Run the following command to verify that your SSH setup is working:   

    ```bash
    ssh -T replicated@replicatedvm.com
    ```
    If successful, you will see a message similar to the following:

    ```
    Hi <username>! You have successfully authenticated, use [VM_ID]@replicatedvm.com to access your VM.
    ```

    :::note
    If you see the prompt `Are you sure you want to continue connecting (yes/no/[fingerprint])?`, type `yes` and press Enter to continue. You might see this prompt if it is the first time you are authenticating with the public/private SSH key in your GitHub account. 
    :::

### Use a Service Account

To automate the creation of VMs in your CI/CD workflows, you can use the flag `--ssh-public-key` to provide the SSH public key for a GitHub service account. For example:

```bash
replicated vm create --distribution ubuntu --version 24.04 --ssh-public-key ~/.ssh/id_rsa.pub
```

Using multiple SSH public keys:

```bash
replicated vm create --distribution ubuntu --version 24.04 --ssh-public-key ~/.ssh/id_rsa.pub --ssh-public-key ~/.ssh/id_ed25519.pub
```

## Create VMs

### With the Replicated CLI

To create VMs with Compatibility Matrix:

1. (Optional) View the available VM distributions, including the supported VM distribution versions and instance types:

   ```bash
   replicated vm versions
   ```
   For command usage, see [vm versions](/reference/replicated-cli-vm-versions).


1. Run the following command to create a VM:

   ```bash
   replicated vm create --distribution DISTRIBUTION
   ```

   To specify more options:


   ```bash
   replicated vm create  --name NAME --distribution DISTRIBUTION --version VERSION --instance-type INSTANCE_TYPE --count COUNT --ttl TTL
   ```

   Where:
   * `NAME` is any name for the VM. If `--name` is excluded, a name is automatically generated for the VM.
   * `DISTRIBUTION` is the operating system distribution for the VM (e.g., ubuntu, almalinux).
   * `VERSION` is the version of the distribution to provision (e.g., 22.04, 24.04 for Ubuntu).
   * `INSTANCE_TYPE` is the instance type to use for the VM (e.g., r1.medium, r1.large).
   * `COUNT` is the number of VMs to create. If `--count` is excluded, one VM is created by default.
   * `TTL` is the VM Time-To-Live duration (maximum 48h). If `--ttl` is excluded, the default TTL is 1 hour.

   For command usage and additional optional flags, see [vm create](/reference/replicated-cli-vm-create).

   **Example:**

   The following example creates an Ubuntu VM with version 22.04, a disk size of 50 GiB, and an instance type of `r1.medium`.

   ```bash
   replicated vm create --distribution ubuntu --version 22.04 --disk 50 --instance-type r1.medium
   ```

### With the Vendor Portal

To create a VM from the Vendor Portal:

1. In the Vendor Portal, go to [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix).

1. Click **Create > Create VM**.

   ![create vm page in the vendor portal](/images/compatibility-matrix-create-vm.png)
   
   [View a larger version of this image](/images/compatibility-matrix-create-vm.png)

1. On the **Create a Virtual Machine** page, complete the following fields:

   <table>
     <tr>
       <th>Field</th>
       <th>Description</th>
     </tr>
     <tr>
       <td>OS distribution</td>
       <td>Select the OS distribution for the VM.</td>
     </tr>
     <tr>
       <td>Version</td>
       <td>Select the OS version. The options available are specific to the distribution selected.</td>
     </tr>
     <tr>
       <td>Name (optional)</td>
       <td>Enter an optional name for the VM.</td>
     </tr>
     <tr>
       <td>Tags</td>
       <td>Add one or more tags to the VM as key-value pairs.</td>
     </tr>
     <tr>
       <td>Set TTL</td>
       <td>Select the Time to Live (TTL) for the VM. When the TTL expires, the VM is automatically deleted. TTL can be adjusted after VM creation with [vm update ttl](/reference/replicated-cli-vm-update-ttl).</td>
     </tr>
   </table>  

1. For **VM Config**, complete the following fields:

   <table>
   <tr>
       <td>Instance type</td>
       <td>Select the instance type to use for the nodes in the node group. The options available are specific to the distribution selected.</td>
     </tr>   
     <tr>
       <td>Disk size</td>
       <td>Select the disk size in GiB to use per node.</td>
     </tr>
     <tr>
       <td>Count</td>
       <td>Select the number of VMs to provision.</td>
     </tr>  
   </table>

1. Click **Create VM**.

## Connect to a VM

You can SSH into a VM using one of the following methods:

* [**Compatibility Matrix Forwarder**](#compatibility-matrix-forwarder): To use the Compatibility Matrix Forwarder, you only need to know the VM ID to connect to the machine with SSH. This is more approachable for users less familiar with SSH clients.

* [**Direct SSH**](#direct-ssh): When you connect to a VM using direct SSH, you can use your SSH tool of choice and pass any client supported flags, without any added connection lag of being routed through the Compatibility Matrix Forwarder. Example use cases for direct SSH include transferring large assets such as air gap bundles to the VM using SCP, or passing specific SHH flags during testing workflows.

For information about how to copy files to a VM after connecting, see [Copy Files to a VM](#copy-files-to-a-vm) below.

### Compatibility Matrix Forwarder

To connect to a VM using the Forwarder:

* SSH into the VM:

   ```bash
   ssh VMID@replicatedvm.com
   ```

   Where `VMID` is the ID of the VM.

For information about copying files to the VM after connecting, see [After Connecting to the VM with the Forwarder](#after-connecting-to-the-vm-with-the-forwarder) below.

### Direct SSH

Connecting to a VM with direct SSH requires Replicated CLI v0.104.0 or later.

To connect to a VM using direct SSH:

1. Get the SSH endpoint for the VM:

   ```bash
   replicated vm ssh-endpoint VMID_OR_VMNAME [--username GITHUB_USERNAME]
   ```

   Where:
   * `VMID_OR_VMNAME` is the ID or name of the VM. Run `replicated vm ls`.
   * (Optional) `GITHUB_USERNAME` is a GitHub username used to connect to the SSH endpoint. This is an optional flag that overrides the GitHub username listed in your Vendor Portal account. The `--username` flag is required if you want to:
      * Use a different GitHub username than what is in Vendor Portal (or if there is no username set in the Vendor Portal)
      * When creating a VM, you used the `--ssh-public-key` flag to associate the VM with a GitHub service account, and this doesn't match the GitHub username set in Vendor Portal

   **Example:**

   ```bash
   replicated vm ssh-endpoint aba1acc2
   ```

   The output of the command displays the SSH endpoint that you can use to connect to the VM:

   ```
   ssh://[github-user-name]@[ssh-endpoint]:[port]
   ```
   For example, `ssh://yourusername@37.27.52.116:46795`.

   :::note
   You can also get the SSH endpoint and port in JSON format by running `replicated vm ls --output json`.
   :::

1. Copy the SSH endpoint.

1. SSH into the VM using the SSH endpoint that you copied:

   ```bash
   ssh ssh://YOUR_GITHUB_USERNAME@SSH_ENDPOINT:PORT
   ```
   Where `GITHUB_USERNAME`, `SSH_ENDPOINT`, and `PORT` are all copied from the SSH endpoint that you retrieved.

   **Example:**

   ```bash
   ssh ssh://yourusername@37.27.52.116:46795
   ```

   Alternatively, run the following command to SSH into the VM without needing to copy the endpoint:
   
   ```bash
   ssh $(replicated vm ssh-endpoint VMID_OR_VMNAME)
   ```

   **Example**
   
   ```
   ssh $(replicated vm ssh-endpoint aba1acc2)
   ```

## Expose Ports on Running VMs

After creating a VM, you can create update the ingress and ports settings to add DNS records. This allows you to connect to ports on the VM.

To update the ingress and ports settings for a running VM:

1. In the Vendor Portal, go to [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix).

1. Open the dot menu for the target VM and click **Edit VM**.

   ![Edit VM in the dot menu](/images/compatibility-matrix-edit-vm.png)

   [View a larger version of this image](/images/compatibility-matrix-edit-vm.png)

1. Under **Ingress & Ports**, for **Add DNS record**, edit the fields as desired and click **Add** to create a DNS record.

   ![DNS record for a VM](/images/compatibility-matrix-ingress-ports.png)
   [View a larger version of this image](/images/compatibility-matrix-ingress-ports.png)

   A DNS record and valid TLS cert are created and connected to the specified port.

## Copy Files to a VM

You can copy files to a VM either using direct SSH and an SCP endpoint, or by using SCP after connecting to the VM with the Compatibility Matrix Forwarder. Transferring files using direct SSH allows you to use your SSH tool of choice, and pass any client-supported flags. 

### Using the SCP Endpoint

To copy files to a VM using the scp endpoint:

1. Run the following command to get the SCP endpoint:

   ```bash
   replicated vm scp-endpoint VMID_OR_VMNAME [--username GITHUB_USERNAME]
   ```

   Where
   * `VMID_OR_VMNAME` is the ID or name of the VM.
   * (Optional) `GITHUB_USERNAME` is a GitHub username used to connect to the SCP endpoint. This is an optional flag that overrides the GitHub username listed in your Vendor Portal account. The `--username` flag is required if you want to:
      * Use a different GitHub username than what is in Vendor Portal (or if there is no username set in the Vendor Portal)
      * When creating a VM, you used the `--ssh-public-key` flag to associate the VM with a GitHub service account, and this doesn't match the GitHub username set in Vendor Portal

   **Example**
   ```bash
   replicated vm scp-endpoint aba1acc2
   ```

   The output of the command lists the SCP endpoint for the VM:

   ```
   scp://GITHUB_USERNAME@SSH_ENDPOINT:PORT
   ```

   For example, `scp://yourusername@37.27.52.116:46795`.

1. Copy the SCP endpoint.

1. SCP files into the VM:

   ```bash
   scp somefile scp://GITHUB_USERNAME@SSH_ENDPOINT:PORT//PATH
   ```
   Where:
   * `GITHUB_USERNAME`, `SSH_ENDPOINT`, and `PORT` are all copied from the SCP endpoint that you retrieved.
   * `PATH` is the destination path on the VM.

   Alternatively, run the following command to SCP files into the VM without needing to copy the endpoint:

   ```bash
   scp somefile $(replicated vm scp-endpoint VMID_OR_VMNAME)//PATH
   ```

### After Connecting to the VM with the Forwarder

:::note
Transferring files using Compatibility Matrix Forwarder is slower than using direct SSH due to added latency. If you want to transfer large files such as air gap bundles onto the VM, use direct SSH in combination with SCP. See [Using the SCP Endpoint](#using-the-scp-endpoint) above.
:::

#### Limitations
Transferring files using the Compatibility Matrix Forwarder has the following limitations:
- `scp` with flag `-O` (legacy scp protocol) is not supported. 
- Relative paths is not supported. For example:
  - Unsupported: `scp somefile VMID@replicatedvm.com:~`
  - Supported: `scp somefile VMID@replicatedvm:/home/folder/somefile`
- File permissions are not inherited.

To copy files to the VM using SCP after connecting with the Compatibility Matrix Forwarder:

1. SSH into the VM using the Forwarder:

   ```bash
   ssh VMID@replicatedvm.com
   ```

   Where `VMID` is the ID of the VM.

1. Copy files onto the machine:
   ```bash
   scp FILENAME VMID@replicatedvm:PATH
   ```

   Where:
   * `FILENAME` is the name of the file.
   * `VMID` is the ID of the VM.
   * `PATH` is the path on the VM where you want to copy the file. For example, `/home/folder/somefile`. Relative paths are not supported.

   **Example:**

   ```bash
   scp somefile 123abc@replicatedvm:/home/folder/somefile
   ```
