# Troubleshooting an application

When using the Admin Console to manage an application, a Troubleshoot tab is available to generate, analyze, manage, and provide remediation suggestions when an application isn't running optimally.

To start, click on the Troubleshoot tab in the Admin Console.

![Troubleshoot](/images/troubleshoot.png)

The green button will start analyzing the application.
No data will leave the cluster -- the analysis works by the `Admin Console Operator` executing the support bundle plugin and sending the collected bundle directly to the admin console api.
It's never sent across the internet, or to anyone else.

![Troubleshooting](/images/troubleshooting.png)

The collected bundle is then run through various analyzers, and the results are shown.
If any known issues are detected, they will be highlighted, with possible remediation suggestions.

![Analysis](/images/analysis.png)

For additional help, the collected and redacted Support Bundle can be downloaded using the "Download bundle" button and sent to the application developer for assistance.
