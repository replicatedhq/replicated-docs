# Prioritizing Your Production Configuration

Your application is packaged as a set of standard Kubernetes manifests.
These manifests include your application manifests, plus several optional [custom resources](../reference/custom-resource-about) used to invoke various Replicated app manager functions.

Packaging your application for production can be is most easily done in iterations. It can be helpful to understand the priority order in which to iterate. Some manifest files are required, some are highly recommended, and others are optional.

We recommend configuring and testing one manifest file at a time until the entire application is running as expected.

## Configuring the First Production Pass

These configuration tasks are either required or highly recommended in your first production pass, in the following order.

For each task, do a full release, perform an update, test your changes, and then add the next task in the list. Repeat this cycle until your application is successfully running all of the tasks that you configured.

1. (Recommended) Connect to a private registry. If your images are open-source or public, skip this step. To connect your private registry, either push the image to Replicated's registry or link your private registry. For more information about private registries, see [Using Private Registry Images](packaging-private-images).

1. (Required) Configure the `deployment.yaml` file.
1. (Required) Configure the `services.yaml` file.

    :::note
    Eventually you will configure all of your YAML files.
    :::


1. (Optional) Packaging with Helm charts is optional. However, if your application is already templated and packaged as a Helm chart (or includes Helm charts), then you can package your Helm chart as an application. For more information, see [Packaging a Helm chart as an Application](helm-installing-native-helm).
1. (Required only for Kubernetes Operators) If you are using Kubernetes Operators, you must pass URLs to the Operator using template functions. This step is not required if you are using OSS or public images, unless you want to use an air gap environment. For more information, see [About Packaging a Kubernetes Operator Application](operator-packaging-about) and [Template Functions](packaging-template-functions).



## Configuring the Second Production Pass

These configuration tasks are either required or highly recommended in your second production pass, in the following order.

For each task, do a full release, perform an update, test your changes, and then add the next task in the list. Repeat this cycle until your application is successfully running all of the tasks that you configured.

1. (Recommended) Configure stateful service and configuration options. Many vendors want to offer an external database option and generally implement database configuration options for end users. For more information about practically applying intermediate template formatting in the YAML manifest files, conditional configuration options, and optional resources to the config screen, see [Adding a Database Configuration](/tutorial-adding-db-config).

    **Placeholder:** Best practices for storing data.

1. (Required) Review a default Kubernetes installer specification and decide which versions to pin. You can pin all of the versions.

1. (Recommended) Customize the admin console:

    1. Open App link
    1. Status informers
    1. Set name and logo

1. (Recommended) These configurations make future deliveries much easier when they are configured in this production pass:

    1. Enable `requireMinimalRBACPrivileges` flag - the Kubernetes RBAC for the admin console
    1. Consolidate app to a single namespace

1. Configure basic preflight checks, such as memory, CPU, and storage.
1. Configure basic support collectors to get logs for all of your pods.
1. Configure ingress options to manage traffic to your application. Options to consider include:

    * Kubernetes Ingress? – this might also include TLS certificates/using the kURL TLS certs? (we can link to the TLS certs for more info)
      * Built-in kURL ingress?
      * App-supplied ingress?
    * (simplest, so we recommend it) NodePort Services
    * portForward built-in functionality + ClusterIP service
