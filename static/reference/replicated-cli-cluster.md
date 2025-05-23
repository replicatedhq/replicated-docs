# replicated cluster

Manage test Kubernetes clusters.

### Synopsis

The 'cluster' command allows you to manage and interact with Kubernetes clusters used for testing purposes. With this command, you can create, list, remove, and manage node groups within clusters, as well as retrieve information about available clusters.

### Examples

```
# Create a single-node EKS cluster
replicated cluster create --distribution eks --version 1.31

# List all clusters
replicated cluster ls

# Remove a specific cluster by ID
replicated cluster rm <cluster-id>

# List all nodegroups in a specific cluster
replicated cluster nodegroup ls <cluster-id>
```

### Options

```
  -h, --help   help for cluster
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated](replicated)	 - Manage your Commercial Software Distribution Lifecycle using Replicated
* [replicated cluster addon](replicated-cli-cluster-addon)	 - Manage cluster add-ons.
* [replicated cluster create](replicated-cli-cluster-create)	 - Create test clusters.
* [replicated cluster kubeconfig](replicated-cli-cluster-kubeconfig)	 - Download credentials for a test cluster.
* [replicated cluster ls](replicated-cli-cluster-ls)	 - List test clusters.
* [replicated cluster nodegroup](replicated-cli-cluster-nodegroup)	 - Manage node groups for clusters.
* [replicated cluster port](replicated-cli-cluster-port)	 - Manage cluster ports.
* [replicated cluster prepare](replicated-cli-cluster-prepare)	 - Prepare cluster for testing.
* [replicated cluster rm](replicated-cli-cluster-rm)	 - Remove test clusters.
* [replicated cluster shell](replicated-cli-cluster-shell)	 - Open a new shell with kubeconfig configured.
* [replicated cluster update](replicated-cli-cluster-update)	 - Update cluster settings.
* [replicated cluster upgrade](replicated-cli-cluster-upgrade)	 - Upgrade a test cluster.
* [replicated cluster versions](replicated-cli-cluster-versions)	 - List cluster versions.