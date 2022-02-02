# Troubleshooting an application

The Replicated admin console includes a Troubleshoot page where you can generate, analyze, manage, and review remediation suggestions for troubleshooting an application.

To start, click on the Troubleshoot tab in the admin console.

![Troubleshoot](/images/troubleshoot.png)

The green button will start analyzing the application.

No data leaves the cluster. The analysis works by the admin console operator executing the support bundle plugin and sending the collected bundle directly to the admin console API.

Data is never sent across the internet, or to anyone else.

![Troubleshooting](/images/troubleshooting.png)

The collected bundle is then run through various analyzers, and the results are shown.
If any known issues are detected, they will be highlighted with possible remediation suggestions.

![Analysis](/images/analysis.png)

You can download the collected and redacted support bundle with the "Download bundle" button and send it to the application developer for assistance.
