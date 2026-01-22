# Connect to CMX VMs (SSH and File Transfer)

This topic describes how to connect to VMs created with Replicated Compatibility Matrix (CMX). It includes information about how to set up SSH access, SSH into VMs, and transfer files to VMs.

## Prerequisite: Set Up SSH

To access VMs that you create with Compatibility Matrix, you need to set up SSH access. You can do this using your GitHub account, a personal public/private key, or a service account or bot with shared access.

### Use Your GitHub Account

:::note
Your GitHub usernames and SSH keys are synced to a VM when it is first created. If you update your GitHub username or keys after creating a VM, you can manually sync by updating your [Account Settings](https://vendor.replicated.com/account-settings) in the Vendor Portal and clicking **Save**.
:::

To set up and verify SSH access for CMX VMs using your personal GitHub account:

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

1. Verify that SSH access was set up successfully:

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

### Use a Personal Public/Private Key

To set up and verify SSH access for Compatibility Matrix VMs using a personal public/private key pair:

1. If you do not already have a public and private key, generate a new public/private key pair.

1. Log in to the Vendor Portal and go to [**Compatibility Matrix Settings**](https://vendor.replicated.com/compatibility-matrix/settings).

1. On the **Compatibility Matrix Settings > SSH Public Keys** page, upload your public key.

1. Verify that SSH access was set up successfully:

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

### Use a Service Account {#github-service-account}

If you are setting up SSH access for VMs created in CI/CD workflows used by your team, you can use the SSH key of a service account or bot with shared access.

To automate the creation of VMs in your CI/CD workflows, use the flag `--ssh-public-key` to provide the SSH public key. For example:

```bash
replicated vm create --distribution ubuntu --version 24.04 --ssh-public-key ~/.ssh/id_rsa.pub
```

Or, to use multiple SSH public keys:

```bash
replicated vm create --distribution ubuntu --version 24.04 --ssh-public-key ~/.ssh/id_rsa.pub --ssh-public-key ~/.ssh/id_ed25519.pub
```

## SSH Into a VM

You can SSH into a VM using one of the following methods:

* [**CMX Forwarder**](#compatibility-matrix-forwarder): To use the CMX Forwarder, you only need to know the VM ID to connect to the machine with SSH. This is more approachable for users less familiar with SSH clients.

* [**Direct SSH**](#direct-ssh): When you connect to a VM using direct SSH, you can use your SSH tool of choice and pass any client supported flags, without any added connection lag of being routed through the CMX Forwarder. Example use cases for direct SSH include transferring large assets such as air gap bundles to the VM using SCP, or passing specific SHH flags during testing workflows.

### CMX Forwarder

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

## Copy Files to a VM

This topic describes how to transfer files to a VM created with Replicated Compatibility Matrix (CMX).

You can copy files to a VM either using direct SSH and an SCP endpoint, or by using SCP after connecting to the VM with the CMX Forwarder. Transferring files using direct SSH allows you to use your SSH tool of choice, and pass any client-supported flags. 

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
Transferring files using CMX Forwarder is slower than using direct SSH due to added latency. If you want to transfer large files such as air gap bundles onto the VM, use direct SSH in combination with SCP. See [Using the SCP Endpoint](#using-the-scp-endpoint) above.
:::

#### Limitations
Transferring files using the CMX Forwarder has the following limitations:
- `scp` with flag `-O` (legacy scp protocol) is not supported. 
- Relative paths is not supported. For example:
  - Unsupported: `scp somefile VMID@replicatedvm.com:~`
  - Supported: `scp somefile VMID@replicatedvm:/home/folder/somefile`
- File permissions are not inherited.

To copy files to the VM using SCP after connecting with the CMX Forwarder:

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
