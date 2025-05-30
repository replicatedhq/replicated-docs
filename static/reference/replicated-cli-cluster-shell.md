# replicated cluster shell

Open a new shell with kubeconfig configured.

### Synopsis

The 'shell' command opens a new shell session with the kubeconfig configured for the specified test cluster. This allows you to have immediate kubectl access to the cluster within the shell environment.

You can either specify the cluster ID directly or provide the cluster name to resolve the corresponding cluster ID. The shell will inherit your existing environment and add the necessary kubeconfig context for interacting with the Kubernetes cluster.

Once inside the shell, you can use 'kubectl' to interact with the cluster. To exit the shell, press Ctrl-D or type 'exit'. When the shell closes, the kubeconfig will be reset back to your default configuration.

```
replicated cluster shell [ID] [flags]
```

### Examples

```
# Open a shell for a cluster by ID
replicated cluster shell CLUSTER_ID

# Open a shell for a cluster by name
replicated cluster shell --name "My Cluster"
```

### Options

```
  -h, --help          help for shell
      --id string     id of the cluster to have kubectl access to (when name is not provided)
      --name string   name of the cluster to have kubectl access to.
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.