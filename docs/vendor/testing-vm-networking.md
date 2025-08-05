# VM Networking (Beta)

This topic describes advanced networking features for Replicated Compatibility Matrix VMs, including port exposure, VM-to-cluster connections, and shared networks.

## Limitations

Creating wildcard DNS entries for VMs is not supported. For feedback, contact Replicated support.

## Compatibility Matrix Tunnels

You can expose ports on a VM and make them accessible on the public internet. For more information about a similar feature, see [Compatibility Matrix Tunnels for Clusters](testing-ingress#compatibility-matrix-tunnels-beta).

### Create a Tunnel

```bash
replicated vm port expose VMID_OR_VMNAME --port PORT --protocol PROTOCOL
```

For example, to expose port 3000 with HTTP protocol:
```bash
replicated vm port expose VM_ID --port 30000 --protocol http
```

### List Tunnels

```bash
replicated vm port ls VMID_OR_VMNAME
```

### Remove a Tunnel

```bash
replicated vm port rm VMID_OR_VMNAME
```

## Connect a Compatibility Matrix VM with a Compatibility Matrix Cluster

You can make a Compatibility Matrix cluster available on the same network as a Compatibility Matrix VM.

**Compatible clusters:** Openshift, K3s, RKE2, EC, kURL, kind
**Requirement:** Replicated CLI 0.90.0 or later

To connect a Compatibility Matrix VM with a Compatibility Matrix cluster on the same network:

1. Create a cluster:

    ```bash
    replicated cluster create --distribution K8S_DISTRIBUTION
    ```

    For example, `replicated cluster create --distribution k3s`.

    Example output:

    ```
    ID      	NAME			DISTRIBUTION	VERSION	STATUS		CREATED	
    EXPIRES	COST
    b09cf035	affect_mend     	k3s         	1.32.0    	queued      	2025-01-28 16:04 PST    -             $0.60
    ```

1. Check the network:

    ```bash
    replicated network ls
    ```

    Example output:

    ```
    ID		NAME			STATUS		CREATED			EXPIRES
    accbd6a7	affect_mend 	running     	2025-01-28 16:04 PST    	2025-01-28 17:05 PST
    ```

1. Create a VM on the same network:

    ```bash
    replicated vm create --distribution DISTRIBUTION --network NETWORK_ID
    ```

    For example, `replicated vm create --distribution ubuntu --network accbd6a7`.

    Example output:

    ```
    ID      	NAME            DISTRIBUTION	VERSION   	STATUS      	CREATED                 	EXPIRES       	COST
    760a30b1	laughing_tu	ubuntu      	24.04     	queued      	2025-01-28 16:07 PST        -                   $0.60
    ```

    In this example, both the cluster `b09cf035` and the VM `760a30b1` are now on the same network.

## Connect Compatibility Matrix VMs on a Shared Network

### Create VMs on the Same Network

Use the `--count` flag to create multiple VMs with the same name, all running on the same Network ID.

```bash
replicated vm create --distribution ubuntu --count 3
```

### Join VMs to an Existing VM Network

First, get the ID of an existing VM network:

```bash
replicated vm ls
```

Or

```bash
replicated network ls
```

Use the `--network` flag to create new VMs on the same network:

```bash
replicated vm create --distribution ubuntu --network NETWORK_ID
``` 