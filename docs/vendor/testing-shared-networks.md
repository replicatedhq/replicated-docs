# Use Shared Networks

This topic explains how to create VMs and clusters with Replicated Compatibility Matrix (CMX) on the same network.

## Connect a VM with a Cluster on the Same Network

You can make a CMX cluster available on the same network as a CMX VM.

#### Supported Cluster Distributions

Openshift, K3s, RKE2, EC, kURL, kind

#### Requirement

Replicated CLI 0.90.0 or later

To connect a VM with a cluster on the same network:

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

## Create VMs on the Same Network

Use the `--count` flag to create multiple VMs with the same name, all running on the same Network ID.

```bash
replicated vm create --distribution ubuntu --count 3
```

## Join VMs to an Existing Network

To join one or more new VMs to the network of an existing VM:

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