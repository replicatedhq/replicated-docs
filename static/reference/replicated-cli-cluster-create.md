# replicated cluster create

Create test clusters.

### Synopsis

The 'cluster create' command provisions a new test cluster with the specified Kubernetes distribution and configuration. You can customize the cluster's size, version, node groups, disk space, IP family, and other parameters.

This command supports creating clusters on multiple Kubernetes distributions, including setting up node groups with different instance types and counts. You can also specify a TTL (Time-To-Live) to automatically terminate the cluster after a set duration.

Use the '--dry-run' flag to simulate the creation process and get an estimated cost without actually provisioning the cluster.

```
replicated cluster create [flags]
```

### Examples

```
# Create a new cluster with basic configuration
replicated cluster create --distribution eks --version 1.21 --nodes 3 --instance-type t3.large --disk 100 --ttl 24h

# Create a cluster with a custom node group
replicated cluster create --distribution eks --version 1.21 --nodegroup name=workers,instance-type=t3.large,nodes=5 --ttl 24h

# Simulate cluster creation (dry-run)
replicated cluster create --distribution eks --version 1.21 --nodes 3 --disk 100 --ttl 24h --dry-run

# Create a cluster with autoscaling configuration
replicated cluster create --distribution eks --version 1.21 --min-nodes 2 --max-nodes 5 --instance-type t3.large --ttl 24h

# Create a cluster with multiple node groups
replicated cluster create --distribution eks --version 1.21 \
--nodegroup name=workers,instance-type=t3.large,nodes=3 \
--nodegroup name=cpu-intensive,instance-type=c5.2xlarge,nodes=2 \
--ttl 24h

# Create a cluster with custom tags
replicated cluster create --distribution eks --version 1.21 --nodes 3 --tag env=test --tag project=demo --ttl 24h

# Create a cluster with addons
replicated cluster create --distribution eks --version 1.21 --nodes 3 --addon object-store --ttl 24h
```

### Options

```
      --addon stringArray       Addons to install on the cluster (can be specified multiple times)
      --bucket-prefix string    A prefix for the bucket name to be created (required by '--addon object-store')
      --disk int                Disk Size (GiB) to request per node (default 50)
      --distribution string     Kubernetes distribution of the cluster to provision
      --dry-run                 Dry run
  -h, --help                    help for create
      --instance-type string    The type of instance to use (e.g. m6i.large)
      --ip-family string        IP Family to use for the cluster (ipv4|ipv6|dual).
      --license-id string       License ID to use for the installation (required for Embedded Cluster distribution)
      --max-nodes string        Maximum Node count (non-negative number) (only for EKS, AKS and GKE clusters).
      --min-nodes string        Minimum Node count (non-negative number) (only for EKS, AKS and GKE clusters).
      --name string             Cluster name (defaults to random name)
      --nodegroup stringArray   Node group to create (name=?,instance-type=?,nodes=?,min-nodes=?,max-nodes=?,disk=? format, can be specified multiple times). For each nodegroup, at least one flag must be specified. The flags min-nodes and max-nodes are mutually dependent.
      --nodes int               Node count (default 1)
  -o, --output string           The output format to use. One of: json|table|wide (default "table")
      --tag stringArray         Tag to apply to the cluster (key=value format, can be specified multiple times)
      --ttl string              Cluster TTL (duration, max 48h)
      --version string          Kubernetes version to provision (format is distribution dependent)
      --wait duration           Wait duration for cluster to be ready (leave empty to not wait)
```

### Options inherited from parent commands

```
      --app string     The app slug or app id to use in all calls
      --debug          Enable debug output
      --token string   The API token to use to access your app in the Vendor API
```

### SEE ALSO

* [replicated cluster](replicated-cli-cluster)	 - Manage test Kubernetes clusters.