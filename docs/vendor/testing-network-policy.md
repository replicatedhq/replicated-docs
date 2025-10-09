# Test in Air Gap Environments (Beta)

This topic describes how to change the network policy of a virtual machine (VM) or a VM-based cluster with Replicated Compatibility Matrix, and how to collect and analyze network events to understand your application's behavior in an air gap environment.

## About Network Policies

VMs and VM-based clusters created with Compatibility Matrix can use one of the following network policies:

| Network Policy | Description |
| :---- | :---- |
| `open` | No restrictions on network traffic. |
| `airgap` | Restrict all network traffic. |

By default, all VMs and clusters are created with an `open` network policy. You can change the network policy to `airgap` to create an _air-gapped_ environment with no outbound internet access.

The `airgap` network policy is particularly useful for testing air gap installations for your application. For information about installing with Embedded Cluster in an air-gapped environment, see [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap). For information about installing with the Helm CLI in an air-gapped environment, see [Install and Update with Helm in Air Gap Environments](/vendor/helm-install-airgap).


## Requirements

- **VM-Based Only**: Network policies are supported only for VMs and VM-based clusters (K3s, RKE2, Embedded Cluster, kURL, Kind, OpenShift). Network policies are not supported for cloud-based clusters (EKS, GKE, AKE, OKE).
- **Replicated CLI 0.109.0 or later**
- **User Role**: The user must have the Admin or Developer role. Read Only users cannot change network settings.

## Limitations

- **Network Status**: Reporting can only be enabled on running networks
- **Policy Changes**: Changing policies creates a new report (historical data remains)
- **Real-time**: Events may have a 1-2 second delay before appearing in reports

## Network Policy Overview

### Basic Network Policies (for traffic control)

| Policy Name | Description | Use Case |
|-------------|-------------|----------|
| `open` | No restrictions on network traffic | Standard development and testing |
| `airgap` | Restrict all network traffic | Air gap installation testing |

## Set Network Policy to `airgap`

### For VM-Based Clusters

To set the network policy of a VM-based cluster:

1. Create a cluster:

    ```bash
    replicated cluster create --distribution VM_BASED_DISTRIBUTION
    ```
    Where `VM_BASED_DISTRIBUTION` is the target VM-based cluster distribution. For a list of supported distributions, see [VM Clusters](/vendor/testing-supported-clusters#vm-clusters).

1. Watch until the cluster status is `running`:

    ```bash
    replicated cluster ls --watch
    ```

1. (Optional) Verify the initial outbound network connectivity for the cluster:

    1. Access the cluster in a shell:

       ```
       replicated cluster shell CLUSTER_ID
       ```
       Where `CLUSTER_ID` is the ID of the cluster that you created from the output of the `cluster ls` command.

    1. In the cluster, install a networking testing tool. For example, [netshoot](https://github.com/nicolaka/netshoot).

       **Example:**

       ```bash
       kubectl run tmp-shell --rm -i --tty --image nicolaka/netshoot
       ```

    1. Curl an endpoint to confirm a successful response. For example, `curl www.google.com`.

1. Open a new shell to access the cluster:

    ```
    replicated cluster shell CLUSTER_ID
    ```
    Where `CLUSTER_ID` is the ID of the cluster that you created from the output of the `cluster ls` command.      

1. Change the network policy to `airgap`:

    ```bash
    replicated network update NETWORK_ID --policy airgap
    ```
    Where `NETWORK_ID` is the ID of the network from the output of the `cluster ls` command.

1. Verify that the cluster's policy is `airgap` and the status is `running`:

    ```bash
    replicated cluster ls
    ```

    ```bash
    ID       NAME                STATUS       CREATED                 EXPIRES                POLICY   REPORTING
    bdeb3515 gifted_antonelli    running      2025-01-28 18:45 PST    2025-01-28 19:45 PST   airgap   off 
    ```

    The air gap network is enabled when the status is `running`.

1. (Optional) Use a networking testing tool such as [netshoot](https://github.com/nicolaka/netshoot) to curl an endpoint and verify that there is no outbound connectivity from the cluster.

   If the air gap was successful, a request to curl an endpoint will time out. For example:

   ```bash
   curl: (28) Failed to connect to www.google.com port 80 after 129976 ms: Couldn't connect to server
   ```

1. (Optional) Test an air gap installation of your application in the cluster. See [Install and Update with Helm in Air Gap Environments](/vendor/helm-install-airgap).   

### For VMs

To set the network policy of a VM:

1. Create a VM:

    ```bash
    replicated vm create --distribution ubuntu
    ```

1. Wait until the VM status is running:

    ```bash
    replicated vm ls
    ```

1. SSH onto the VM:

   ```bash
   ssh VM_ID@replicatedvm.com
   ```  
   Where `VM_ID` is the ID of the VM from the output of the `vm ls` command.

   For more information and additional options, see [Connect to a VM](/vendor/testing-vm-create#connect-to-a-vm).

1. (Optional) Curl an endpoint to verify the network connectivity of the VM. For example, `curl www.google.com`.

1. Set the network policy to `airgap`:

    ```bash
    replicated network update NETWORK_ID --policy airgap
    ```
    Where `NETWORK_ID` is the ID of the network from the output of the `vm ls` command.

    **Example:**

    ```bash
    replicated network update 85eb50a8 --policy airgap
    ```

    :::note
    It can take a few seconds for the setting to apply.
    :::

    ```bash
    ID       NAME                STATUS        CREATED                 EXPIRES                POLICY   REPORTING
    85eb50a8 silly_rosalind      updating      2025-01-28 16:16 PST    2025-01-28 17:18 PST   airgap   off
    ```

1. (Optional) Curl an endpoint to verify that there is no outbound connectivity from the VM. For example, `curl www.google.com`.

    If the air gap was successful, a request to curl an endpoint will time out. For example:

    ```bash
    curl: (28) Failed to connect to www.google.com port 80 after 129976 ms: Couldn't connect to server
    ```


## Collect and View Network Reports

### Enable Network Reporting

#### Via Vendor Portal

1. Navigate to **Compatibility Matrix** > **Network Policy**
2. In the **Reporting** column, toggle switch from "off" to "on"

#### Via CLI

```bash
replicated network update NETWORK_ID --collect-report
```

### View Network Reports

#### Via Vendor Portal

1. Navigate to **Compatibility Matrix** > **Network Policy**
2. Click on a network name in the Active Resources table
3. The Network Policy Report will appear below the table
4. Use the table to browse and filter network events

#### Via CLI

**View detailed network report as JSON:**

```bash
replicated network report NETWORK_ID
```

**View network summary as JSON:**

```bash
replicated network report NETWORK_ID --summary
```


**List all networks and their reporting status:**

```bash
replicated network ls
```

**Example output:**

```
ID          NAME                           STATUS          CREATED                           EXPIRES                           POLICY                            REPORTING
a1b2c3d4    example_network_1              running         2025-01-28 16:04 PST              2025-01-28 18:06 PST              open                              off
e5f6g7h8    example_network_2              running         2025-01-28 12:10 PST              2025-01-28 20:11 PST              airgap                            on
```


### Policy Configuration

Policies are configured at the network level and apply to all VMs and clusters within that network. You can change the policy at any time, but note that:

- Policy changes terminate the current report and start a new one
- Historical data from the previous policy remains available
- The new policy takes effect immediately for new events
