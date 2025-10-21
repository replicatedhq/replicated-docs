# Copy Files to a VM

This topic describes how to transfer files to a VM created with Replicated Compatibility Matrix (CMX).

You can copy files to a VM either using direct SSH and an SCP endpoint, or by using SCP after connecting to the VM with the CMX Forwarder. Transferring files using direct SSH allows you to use your SSH tool of choice, and pass any client-supported flags. 

## Using the SCP Endpoint

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

## After Connecting to the VM with the Forwarder

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
