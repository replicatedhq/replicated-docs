# replicated vm ssh

SSH into a VM

### Synopsis

Connect to a VM using SSH.

If a VM ID is provided, it will directly connect to that VM. Otherwise, if multiple VMs are available, you will be prompted to select the VM you want to connect to. The command will then establish an SSH connection to the selected VM using the appropriate credentials and configuration.

The SSH user can be specified in order of precedence:
1. By specifying the -u flag
2. REPLICATED_SSH_USER environment variable
3. GITHUB_ACTOR environment variable (from GitHub Actions)
4. GITHUB_USER environment variable

Note: Only running VMs can be connected to via SSH.

```
replicated vm ssh [VM_ID] [flags]
```

### Examples

```
# SSH into a specific VM by ID
replicated vm ssh <id>

# SSH into a VM with a specific user
replicated vm ssh <id> -u myuser

# SSH into a VM (interactive selection if multiple VMs exist)
replicated vm ssh
```

### Options

```
  -h, --help          help for ssh
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