# Packaging Your Application

Your application is packaged as a set of standard Kubernetes manifests.
These manifests include your application manifests, plus several optional [custom resources](../reference/custom-resource-about) used to invoke various Replicated app manager functions.

Package your application for production using an iterative approach for best results. We recommend configuring and testing one manifest file at a time until the entire application is running as expected.

Before you start, it can be helpful to understand the priority order in which to iterate. Some manifest files are required, some are highly recommended, and others are optional.


## Connect to an Image Registry and Configure Required Manifests

These configuration tasks are either required or highly recommended in your first production pass.

**Prerequisites**

* Create an account in the Replicated vendor portal.
* Create a development environment using a quick start tutorial.

For more information about how to complete the prerequisites, see [How to Distribute a Production Application](distributing-workflow).

To configure your first production pass, perform the following tasks:

1. Connect to a private registry. If your images are open-source or public, skip this step. To connect your private registry, either push the image to Replicated's registry or link your private registry. For more information about private registries, see [Using Private Registry Images](packaging-private-images).

1. Configure the `deployment.yaml` file. For more information, see [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) in the Kubernetes documentation.

1. Configure the `services.yaml` file. For more information, see [Service](https://kubernetes.io/docs/concepts/services-networking/service/) in the Kubernetes documentation.

1. (Optional) Packaging with Helm charts is optional. However, if your application is already templated and packaged as a Helm chart (or includes Helm charts), then you can package your Helm chart as an application. For more information, see [Packaging a Helm chart as an Application](helm-installing-native-helm).

1. (Required only for Kubernetes Operators) If you are using Kubernetes Operators, you must pass URLs to the Operator using template functions. This step is not required if you are using OSS or public images, unless you want to use an air gap environment. For more information, see [About Packaging a Kubernetes Operator Application](operator-packaging-about) and [Template Functions](packaging-template-functions).

1. For each task, do a full release, perform an update, test your changes, and then add the next task in the list. Repeat this cycle until your application is successfully running all of the tasks that you configured.
