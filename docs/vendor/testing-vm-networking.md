# VM Networking (Beta)

This topic describes advanced networking features for Replicated Compatibility Matrix VMs, including port exposure, VM-to-cluster connections, and shared networks.

## Limitations

Creating wildcard DNS entries for VMs is not supported. For feedback, contact Replicated support.

## Compatibility Matrix Tunnels

You can expose ports on a VM and make them accessible on the public internet. For more information about a similar feature, see [Compatibility Matrix Tunnels for Clusters](testing-ingress#compatibility-matrix-tunnels).

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

1. In the output of the `cluster create` command, under `NETWORK`, copy the network ID.

    Example:

    ```
    ID         NAME              DISTRIBUTION    VERSION    STATUS    NETWORK     CREATED                EXPIRES  COST
    6b14376c   ecstatic_raman    k3s             1.33.2     queued    accbd6a7    2025-08-04 13:20 PDT   -        $0.60
    ```
    In the example above, the network ID is `accbd6a7`.

1. Create a VM on the same network:

    ```bash
    replicated vm create --distribution DISTRIBUTION --network NETWORK_ID
    ```
    Where `NETWORK_ID` is the network ID that you copied in the previous step.

    For example, `replicated vm create --distribution ubuntu --network accbd6a7`.

    Example output:

    ```
    ID         NAME                 DISTRIBUTION   VERSION   STATUS     NETWORK    CREATED                EXPIRES  COST
    760a30b1   suspicious_poitras   ubuntu         24.04     assigned   accbd6a7   2025-08-04 13:24 PDT   -        $0.60
    ```

## Connect Compatibility Matrix VMs on a Shared Network

### Create VMs on the Same Network

Use the `--count` flag to create multiple VMs with the same name, all running on the same Network ID.

```bash
replicated vm create --distribution ubuntu --count 3
```

### Join VMs to an Existing VM Network

1. Run one of the following commands to get the ID of an existing VM network:

   * List VMs:
     ```bash
     replicated vm ls
     ```

   * List networks: 
     ```bash
     replicated network ls
     ```

1. In the output of the command, copy the network ID.

1. Use the `--network` flag to create a new VM on the same network:

    ```bash
    replicated vm create --distribution ubuntu --network NETWORK_ID
    ``` 
    Where `NETWORK_ID` is the network ID that you copied in the previous step.