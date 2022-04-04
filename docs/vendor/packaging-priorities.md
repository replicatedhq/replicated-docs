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



## Configuring the Second Production Pass

These configuration tasks are either required or highly recommended in your second production pass.

For each task, do a full release, perform an update, test your changes, and then add the next task in the list. Repeat this cycle until your application is successfully running all of the tasks that you configured.

Perform these tasks in the following order:

1. (Recommended) Configure stateful service and configuration options. You can offer an external database option and implement general database configuration options for end users. For more information about applying intermediate template formatting in the YAML manifest files, conditional configuration options, and optional resources to the config screen, see [Adding a Database Configuration](/tutorial-adding-db-config).

1. **Placeholder:** Best practices for storing data. Or is this already covered by the tutorial?

1. (Recommended for non-existing clusters) Review a default Kubernetes installer specification and decide which versions to pin. You can pin all of the versions. For more information, see [Creating a Kubernetes Installer Specification](packaging-embedded-kubernetes).

1. (Recommended) Customize the admin console:

    1. Configure the application links. For more information, see [Adding Links and Buttons](admin-console-adding-buttons-links).
    1. Configure status informers. For more information, see [Displaying Application Status](admin-console-display-app-status).
    1. Configure the application name and logo. For more information, see [Customizing the Application Icon](admin-console-customize-app-icon).

1. (Recommended) These configurations make future deliveries much easier when they are configured in this production pass:

    1. Enable `requireMinimalRBACPrivileges` flag - the Kubernetes RBAC for the admin console. For more information, see [Namespace-scoped Access](packaging-rbac#namespace-scoped-access).
    1. Consolidate the application to a single namespace. For more information, see [Managing Application Namespaces](namespaces).

1. (Recommended) Configure basic preflight checks, such as memory, CPU, and storage. For more information about creating preflight checks, see [Creating Preflight Checks](preflight-support-bundle-creating#creating-preflight-checks). For basic confirgation examples, see [Node Resources Analyzer](https://troubleshoot.sh/docs/analyze/node-resources/) in the Troubleshoot documentation.
1. (Recommended) Configure basic support collectors to get logs for all of your pods. For more information, see [Creating Support Bundles](preflight-support-bundle-creating#creating-support-bundles).
1. (Recommended) Configure ingress options to manage traffic to your application. Options to consider include:

    * Kubernetes Ingress? (need a link to something here- is it this? [Configuring Cluster Ingress](packaging-ingress)) – this might also include TLS certificates/using the kURL TLS certs. For more information about using ingress with TLS certificates, see [Packaging Using TLS Certificates](packaging-using-tls-certs#ingress).
      * Built-in kURL ingress?
      * App-supplied ingress?
    * (simplest, so we recommend it) NodePort Services
    * portForward built-in functionality + ClusterIP service
