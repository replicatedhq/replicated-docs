# Prioritizing Your Production Configuration

Your application is packaged as a set of standard Kubernetes manifests.
These manifests include your application manifests, plus several optional [custom resources](../reference/custom-resource-about) used to invoke various Replicated app manager functions.

Package your application for production using an iterative approach for best results. We recommend configuring and testing one manifest file at a time until the entire application is running as expected.

Before you start, it can be helpful to understand the priority order in which to iterate. Some manifest files are required, some are highly recommended, and others are optional.


## Configuring the First Production Pass

These configuration tasks are either required or highly recommended in your first production pass.

For each task, do a full release, perform an update, test your changes, and then add the next task in the list. Repeat this cycle until your application is successfully running all of the tasks that you configured.

Perform these tasks in the following order:

1. (Recommended) Connect to a private registry. If your images are open-source or public, skip this step. To connect your private registry, either push the image to Replicated's registry or link your private registry. For more information about private registries, see [Using Private Registry Images](packaging-private-images).

1. (Required) Configure the `deployment.yaml` file.

1. (Required) Configure the `services.yaml` file.

1. (Optional) Packaging with Helm charts is optional. However, if your application is already templated and packaged as a Helm chart (or includes Helm charts), then you can package your Helm chart as an application. For more information, see [Packaging a Helm chart as an Application](helm-installing-native-helm).

1. (Required only for Kubernetes Operators) If you are using Kubernetes Operators, you must pass URLs to the Operator using template functions. This step is not required if you are using OSS or public images, unless you want to use an air gap environment. For more information, see [About Packaging a Kubernetes Operator Application](operator-packaging-about) and [Template Functions](packaging-template-functions).
