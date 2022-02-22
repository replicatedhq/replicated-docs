# Production Configuration Priorities

Your application is packaged as a set of standard Kubernetes manifests.
These manifests include your application manifests, plus several optional [custom resources](../reference/custom-resource-about) used to invoke various app manager functions.

Packaging your application for production can be done more easily in iterations. It can be helpful to understand the priority order in which to iterate. Some manifest files are required, some are highly recommended, and others are optional.

We recommend configuring and testing one manifest file at a time until the entire application is running as expected.

## Configuring the First Production Pass

These configuration tasks are either required or highly recommended in your first production pass, in the following order:

1. Connect to a private registry. If your images are open-source or public, skip this step. To connect your private registry, either push the image to Replicated's registry or link your private registry. See [Using Private Registry Images](packagine-private-images).

1. Configure the `deployment.yaml` file.
1. Configure the `services.yaml` file.
1. If your application is already templated and packaged as a Helm chart (or includes Helm charts), then you can follow our documentation on [packaging a Helm chart as an application](helm-installing-native-helm). Note that packaging with Helm charts is optional.
1. If you are using Kubernetes Operators, you must pass URLs to the Operator using template functions. See [About Packaging a Kubernetes Operator Application](operator-packaging-about) and [Template Functions](packaging-template-functions).

  :::note
  You can skip this step if you are using OSS or public images, unless you want to use an air gap environment.
  :::

## Configuring the Second Production Pass

These configuration tasks are either required or highly recommended in your second production pass, in the following order:

1.
