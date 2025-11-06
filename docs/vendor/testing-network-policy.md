# Test in Air Gap Environments (Beta)

This topic describes how to change the network policy of a virtual machine (VM) or a VM-based cluster with Replicated Compatibility Matrix (CMX), and how to collect and analyze network events to understand your application's behavior in air-gapped environments.

## Set Network Policy to `airgap`

VMs and [VM-based clusters](/vendor/testing-supported-clusters#vm-clusters) created with CMX can use one of the following network policies:

| Network Policy | Description |
| :---- | :---- |
| `open` | No restrictions on network traffic. |
| `airgap` | Restrict all network traffic. |

By default, all VMs and clusters are created with an `open` network policy. You can change the network policy to `airgap` to simulate an air-gapped environment with no outbound internet access. This `airgap` network policy is particularly useful for previewing how your application will perform in air-gapped end customer environments.

Network policies are configured at the network level and apply to all VMs and VM-based clusters within the network. 

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

1. Access the cluster in a shell:

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
    ID       NAME                STATUS       CREATED                 EXPIRES                POLICY   HAS REPORT
    bdeb3515 gifted_antonelli    running      2025-01-28 18:45 PST    2025-01-28 19:45 PST   airgap   off 
    ```

    The air gap network is enabled when the status is `running`.

1. (Optional) To verify that there is no outbound connectivity from the cluster, enable network reporting and view network events. See [Collect and View Network Reports](#collect-and-view-network-reports).

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

1. Set the network policy to `airgap`:

    ```bash
    replicated network update NETWORK_ID --policy airgap
    ```
    Where `NETWORK_ID` is the ID of the network from the output of the `vm ls` command.

    **Example:**

    ```bash
    replicated network update 85eb50a8 --policy airgap
    ```

    ```bash
    ID       NAME                STATUS        CREATED                 EXPIRES                POLICY   HAS REPORT
    85eb50a8 silly_rosalind      updating      2025-01-28 16:16 PST    2025-01-28 17:18 PST   airgap   off
    ```

1. (Optional) To verify that there is no outbound connectivity from the VM, enable network reporting and view network events. See [Collect and View Network Reports](#collect-and-view-network-reports).

## Collect and View Network Reports

CMX network reporting helps you understand your application's network activity. To provide flexibility in testing, you can enable network reporting to capture all network activity, whether the network policy is set to `open` or `airgap`. Even when the network policy is set to `airgap` and network egress is blocked, all connection attempts and DNS queries are still captured in the report. This helps you identify unexpected network calls before deploying to an air-gapped environment.

Network reporting is not enabled by default. For information about how to collect and view reports through the Vendor Portal or the Replicated CLI, see the sections below.

There are two types of network reports:

| Report Type | Contents |
|---|---|
| **Running Report**<br />See all network events<br />captured in near real-time | <ul><li>Timestamp (with microseconds)</li><li>Source IP, Source Port, Source PID</li><li>Source Command, Source Pod</li><li>Destination IP, Destination Port</li><li>DNS Query Name</li><li>Protocol</li><li>Likely Service</li></ul> |
| **Report Summary**<br />Aggregated analysis of<br />captured network events| <ul><li>Total Events Count</li><li>Time Range (start/end)</li><li>Report Creation Date</li><li>Domain Names Requested (Domain, Count)</li><li>Destination IP Addresses Connected To (IP, Port, Count)</li><li>Source Details (expandable): Source IP, Service, Command, Pod</li></ul> |

### Vendor Portal

To set the network policy and collect and view reports in the Vendor Portal:

1. Go to **Compatibility Matrix** > **Network Policy**.

2. To collect a network report, toggle on the switch under **Reporting**.

3. (Optional) Toggle from `open` to `airgap` under **Policy Type** to block all network egress.

4. Where available, click "View report" under **Report** to see the reporting table. You can also click "Export JSON" to download the raw report data.

   :::note
   When reporting is **ON** for an active network, all network events display in a **Running Report**. Once the network is terminated, the **Report Summary** is automatically generated.
   :::

   **Running Report**

   ![Network Policy page with running report, showing all network events captured](/images/cmx-network-report.png)

   [View a larger version of this image](/images/cmx-network-report.png)

   **Report Summary**

   ![Network Policy page with report summary, showing domain names and destination IPs](/images/cmx-network-report-summary.png)

   [View a larger version of this image](/images/cmx-network-report-summary.png)

### CLI

To collect and view a network report from the CLI:

1. Turn on network reporting:

     ```bash
     replicated network update NETWORK_ID --collect-report
     ```
     Where `NETWORK_ID` is the ID of the network. You can get the network ID by running `replicated network ls`.

1. (Optional) Confirm that reporting is **ON** for the network:

     ```bash
     replicated network ls
     ```

     **Example output:**

     ```
     ID          NAME                   STATUS          CREATED                    EXPIRES                    POLICY        HAS REPORT
     a1b2c3d4    example_network_1      running         2025-01-28 16:04 PST       2025-01-28 18:06 PST       open          off
     e5f6g7h8    example_network_2      running         2025-01-28 12:10 PST       2025-01-28 20:11 PST       airgap        on
     ```
1. View the network report:
   
    See network event summary that aggregates all unique domains and destination IPs, with connection counts and other details (JSON format):

    ```bash
    replicated network report NETWORK_ID --summary
    ```

   See all network events (JSON format):

    ```bash
    replicated network report NETWORK_ID
    ```

   Watch as new network events occur (JSON format):

    ```bash
    replicated network report NETWORK_ID --watch
    ```
    
    :::note
    Network events are batched for display in the report, so appear with a short delay.
    :::


## Related Topics

* [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap)
* [Install and Update with Helm in Air Gap Environments](/vendor/helm-install-airgap).