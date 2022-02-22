# Helm Chart Components

> This topic applies to both native Helm and Replicated Helm installations.

When delivering a modern on-prem installable version of an application, there are frequently IaaS components and services that are needed.
For example, an application running in the cloud could be using Amazon RDS for Postgres or a managed Elasticsearch cluster.
Many components have community-supported Helm charts that can be used as drop-in replacements for these managed services.

When adding an [optional Helm chart component](helm-optional-charts), it's recommended to also add a config option to allow the end customer to selectively enable or disable this component.
Some enterprises will want everything running in the cluster, while others will want to bring their own services for stateful components.
