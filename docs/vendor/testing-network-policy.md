# Collect and View Network Reports

This topic describes how to enable and view network reports for environments created with Replicated Compatibility Matrix (CMX).

## About Network Reports

CMX network reporting helps you understand your application's network activity. To provide flexibility in testing, you can enable network reporting to capture all network activity, whether the network policy is set to `open` or `airgap`.

Even when the network policy is set to `airgap` and network egress is blocked, all connection attempts and DNS queries are still captured in the report. This helps you identify unexpected network calls before deploying to an air-gapped environment.

For more information about working with CMX networks, see [Create Air-Gapped Environments (Beta)](testing-how-to#air-gap) and [Create Environments on the Same Network](testing-how-to#shared-networks) in _Create and Manage Environments_

## Types of Network Reports

The following tables describes the CMX network report types:

| Report Type | Description | Report Contents |
|---|---|---|
| **Running Report** | See all network events captured in near real-time |<ul><li>Timestamp (with microseconds)</li><li>Source IP, Source Port, Source PID</li><li>Source Command, Source Pod</li><li>Destination IP, Destination Port</li><li>DNS Query Name</li><li>Protocol</li><li>Likely Service</li></ul> |
| **Report Summary** | Aggregated analysis of captured network events | <ul><li>Total Events Count</li><li>Time Range (start/end)</li><li>Report Creation Date</li><li>Domain Names Requested (Domain, Count)</li><li>Destination IP Addresses Connected To (IP, Port, Count)</li><li>Source Details (expandable): Source IP, Service, Command, Pod</li></ul> |

The following shows an example of a running report:

   ![Network Policy page with running report, showing all network events captured](/images/cmx-network-report.png)

   [View a larger version of this image](/images/cmx-network-report.png)

The following shows an example of a report summary:

   ![Network Policy page with report summary, showing domain names and destination IPs](/images/cmx-network-report-summary.png)

   [View a larger version of this image](/images/cmx-network-report-summary.png)

## Enable Network Reporting

Networking reporting is not enabled by default. To collect reports, you can enable reporting in the Vendor Portal or with the CLI.

### Vendor Portal

To set the network policy and collect and view reports in the Vendor Portal:

1. Go to **Compatibility Matrix** > **Network Policy**.

1. To collect a network report, toggle on the switch under **Reporting**.

1. (Optional) Toggle from `open` to `airgap` under **Policy Type** to block all network egress.

### CLI

To collect and view a network report from the CLI:

1. Turn on network reporting:

     ```bash
     replicated network update NETWORK_ID --collect-report
     ```
     Where `NETWORK_ID` is the ID of the network. You can get the network ID by running `replicated network ls`.

1. Confirm that **Has report** is **on** for the network:

     ```bash
     replicated network ls
     ```

     **Example output:**

     ```
     ID          NAME                   STATUS          CREATED                    EXPIRES                    POLICY        HAS REPORT
     a1b2c3d4    example_network_1      running         2025-01-28 16:04 PST       2025-01-28 18:06 PST       open          off
     e5f6g7h8    example_network_2      running         2025-01-28 12:10 PST       2025-01-28 20:11 PST       airgap        on
     ```

1. (Optional) Change the network policy to `airgap` to block all network egress.


## View Network Reports

After you [Enable Network Reporting](#enable-network-reporting) for a network, you can view network reports.

### Vendor Portal

To view network reports in the Vendor Portal:

1. Go to **Compatibility Matrix** > **Network Policy**.

1. Where available, click "View report" under **Report** to see the reporting table. You can also click "Export JSON" to download the raw report data.

   :::note
   When reporting is **on** for an active network, all network events display in a **Running Report**. When the network is terminated, the **Report Summary** is automatically generated.
   :::

### CLI

To view network reports from the CLI:

1. Get the network ID:

    ```bash
    replicated network ls
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