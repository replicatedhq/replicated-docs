# replicated vm scp

Copy files to/from a VM

### Synopsis

Securely copy files to or from a VM using SCP.

This command allows you to copy files between your local machine and a VM. You can specify the VM ID followed by a colon and the path on the VM, or just a local path.

To copy a file from your local machine to a VM, use:
replicated vm scp localfile.txt vm-id:/path/on/vm/

To copy a file from a VM to your local machine, use:
replicated vm scp vm-id:/path/on/vm/file.txt localfile.txt

If no VM ID is provided and multiple VMs are available, you will be prompted to select a VM.

The SSH user can be specified in order of precedence:
1. By specifying the -u flag
2. REPLICATED_SSH_USER environment variable
3. GITHUB_ACTOR environment variable (from GitHub Actions)
4. GITHUB_USER environment variable

Note: Only running VMs can be connected to via SCP.

```
replicated vm scp [VM_ID:]SOURCE [VM_ID:]DESTINATION [flags]
```

### Examples

```
# Copy a local file to a VM
replicated vm scp localfile.txt vm-id:/home/user/

# Copy a file from a VM to local machine
replicated vm scp vm-id:/home/user/file.txt localfile.txt

# Copy with a specific user
replicated vm scp -u myuser localfile.txt vm-id:/home/myuser/

# Interactive VM selection (if VM ID is not specified)
replicated vm scp localfile.txt :/home/user/
```

### Options

```
  -h, --help          help for scp
  -u, --user string   SSH user to connect with
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated vm](replicated-cli-vm)	 - Manage test virtual machines.