# Use Compatibility Matrix VMs (Beta)

This topic describes how to use Replicated Compatibility Matrix to create and manage ephemeral VMs.

## Set Up SSH Access

In order to access VMs that you create with Compatibility Matrix, you need to set up SSH access. You can do this using a GitHub account or a personal public/private key.

### Use Your GitHub Account

You can set up SSH access using your personal GitHub account or a GitHub service account used by your team. For setting up SSH access to VMs that you create on your local machine, Replicated recommends that you use your personal GitHub account.

For setting up SSH access for VMs created in CI/CD workflows used by your team, use a GitHub service account. For more information, see [Use a GitHub Service Account](#github-service-account) below.

:::note
Your GitHub usernames and SSH keys are synced to a VM when it is first created. If you update your GitHub username or keys after creating a VM, you can manually sync by updating your [Account Settings](https://vendor.replicated.com/account-settings) in the Vendor Portal and clicking **Save**.
:::

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

### Use a GitHub Service Account {#github-service-account}

Use a GitHub service account if you are setting up SSH access for VMs created in CI/CD workflows used by your team.

To automate the creation of VMs in your CI/CD workflows, you can use the flag `--ssh-public-key` to provide the SSH public key for a GitHub service account. For example:

```bash
replicated vm create --distribution ubuntu --version 24.04 --ssh-public-key ~/.ssh/id_rsa.pub
```

Using multiple SSH public keys:

```bash
replicated vm create --distribution ubuntu --version 24.04 --ssh-public-key ~/.ssh/id_rsa.pub --ssh-public-key ~/.ssh/id_ed25519.pub
```

### Use a Personal Public/Private Key

To set up and verify SSH access for Compatibility Matrix VMs using a personal public/private key pair:

1. If you do not already have a public and private key, generate a new public/private key pair.

1. Log in to the Vendor Portal and go to [**Compatibility Matrix Settings**](https://vendor.replicated.com/compatibility-matrix/settings).

1. On the **Compatibility Matrix Settings > SSH Public Keys** page, upload your public key.

### Test Your SSH Access

To test that you SSH access is working:

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

For information about how to copy files to a VM after connecting, see [Copy Files to a VM](testing-vm-transfer-files).

### Compatibility Matrix Forwarder

To connect to a VM using the Forwarder:

* SSH into the VM:

   ```bash
   ssh VMID@replicatedvm.com
   ```

   Where `VMID` is the ID of the VM.

For information about copying files to the VM after connecting, see [Copy Files to a VM](testing-vm-transfer-files).

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

## Create Air Gap VMs (Beta)

You can create a VM that uses an air-gapped network by setting the network policy to `airgap`.

For more information, see [Test in Use Air Gap Networks (Beta)](testing-network-policy).

To set the network policy of a VM to `airgap`:

1. Create a VM:

    ```bash
    replicated vm create --distribution VM_DISTRIBUTION
    ```

1. After the VM is running, SSH onto the VM:

   ```bash
   ssh VM_ID@replicatedvm.com
   ```  
   Where `VM_ID` is the ID of the VM from the output of the `vm ls` command.

   For more information and additional options, see [Connect to a VM](/vendor/testing-vm-create#connect-to-a-vm).

1. Set the network policy to `airgap`:

    ```bash
    replicated network update NETWORK_ID --policy airgap
    ```
    Where `NETWORK_ID` is the ID of the network from the output of the `vm ls` command.
