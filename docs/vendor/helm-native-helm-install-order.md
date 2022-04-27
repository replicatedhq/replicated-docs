# Setting Installation Order for Native Helm Charts

When you deploy an application with native Helm charts, the Replicated app manager deploys your Helm charts to the cluster along with any other Kubernetes manifest files in your application.
This includes custom resources.

Any custom resources that you reference in a native Helm chart must themselves be created by a native Helm chart, and used only within that native Helm chart.

You can assign a `weight` to your HelmChart manifest files in Replicated to specify the order in which the app manager deploys each HelmChart.

The `weight` defines the order Helm charts are deployed in ascending order.

If you do not assign a weight to HelmChart manifest files, then the app manager does not deploy Helm charts in a defined order. By default, all HelmChart manifests have `weight` set to `0`. When `weight` is set to `0`, no deployment order is defined.

The app manager also deploys any subcharts and dependencies when deploying a Helm chart. For more information about Helm dependencies, see [dependencies](https://helm.sh/docs/topics/charts/#chart-dependencies) in the Helm documentation.
