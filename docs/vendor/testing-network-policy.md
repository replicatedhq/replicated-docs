# CMX Network Reports

This topic describes how to use Replicated Compatibility Matrix (CMX) network reporting to collect and analyze network events from VMs and clusters, helping you understand your application's network behavior in different environments including air-gapped scenarios.

For information about changing the network policy of a VM or cluster to simulate air-gapped environments, see [Test in Air Gap Environments](cmx-airgap).

## Overview

CMX network reporting helps you understand your application's network activity by capturing and analyzing network events from VMs and VM-based clusters. You can use network reporting to:

* Monitor network activity in real-time or review aggregated summaries
* Identify unexpected network calls before deploying to production
* Validate application behavior in air-gapped environments
* Troubleshoot connectivity issues

To provide flexibility in testing, you can enable network reporting to capture all network activity, whether the network policy is set to `open` or `airgap`. Even when the network policy is set to `airgap` and network egress is blocked, all connection attempts and DNS queries are still captured in the report.

## Collect and View Network Reports

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