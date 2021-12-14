# Native Helm charts installation order

When deploying applications with native Helm charts, your charts are deployed to the cluster in parallel with any other Kubernetes YAML within your application.
This includes Custom Resource Definitions (CRDs).
Any Custom Resources referenced within a native Helm chart must themselves be created by a native Helm chart, and used only within that native Helm chart.

Helm charts do not have a defined order in which they will be applied.
If one Helm chart depends on another, Helm [dependencies](https://helm.sh/docs/topics/charts/#chart-dependencies) or subcharts should be used to ensure that the ordering constraints are fulfilled during deployment.
