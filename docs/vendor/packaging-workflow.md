# How to Package an Application for Production

Your application can be packaged as a set of standard Kubernetes manifests or Helm charts.
These manifests include your application manifests, plus several optional [custom resources](../reference/custom-resource-about) used to invoke various app manager functions.

Packaging your application for production can be done more easily in iterations. It can be helpful to understand the priority order in which to iterate. Some configurations are required or highly recommended. Other configurations are optional and can be done in any order after the required and recommended configurations.

We recommend configuring and testing one manifest file at a time until the entire application is running as expected.

## Prerequisites

1. You must have a Kubernetes-deployable application.
1. You have set up and activated an account in the [vendor portal](vendor.replicated.com).
1. You have set up a development server and installed the replicated CLI.
1. Review the end-to-end workflow for distributing an application. Understanding the overall workflow and doing at least one of the quickstart tutorials with a sample application help make the production release easier.

## Importing the Application Files to Replicated

Before you can configure the Replicated features, you must import your application files to Replicated. To import your files, do one of the following:

- If you are using standard manifest files, put the application manifests in a directory and then drag and drop them into the Replicated vendor portal or use the replicated CLI to get them into Replicated. See [Creating a Release](releases-creating-releases).

- If you are using Helm, access the application files from the Helm repository. Run the Helm package command to create a binary. Add the binary to either the vendor portal or the replicated CLI. See [Adding Helm Charts to a Release]**(Need to add the link after Paige merges the new content)**

## Configuring the Recommended Features

These configuration tasks are either required or highly recommended, depending on your environment. All of the steps are the same for standard manifest files and Helm charts except where indicated.

:::note
For information about the recommended features for packaging with Kubernetes Operators, see [Packaging a Kubernetes Operator Application](https://docs.replicated.com/vendor/operator-packaging-about) section.
:::

1. Connect to a private registry. If your images are open-source or public, skip this step. To connect your private registry, either push the image to Replicated's registry or link your private registry. See [Connecting to an Image Registry](packaging-private-images).

1. Create and test a first in a development environment, then iterate using the following steps.

1. Define custom fields in the Config custom resource manifest file (Config.yaml). This lets you define fields for the Configuration screen in the Replicated admin console to collect required or optional values from your users that are used to access the application. If you are using a Helm chart, your users will also provide configuration values through the Configuration screen in the admin console. See [About the Configuration Screen](config-screen-about) and [Creating and Editing Configuration Fields](admin-console-customize-config-screen).

1. Map the fields from the Config custom resource manifest:

  - If you are using standard manifest files, map the Config.yaml fields to the application manifest files (such as post-gres.yaml, and so on) using template functions. See [Mapping User-Supplied Values](config-screen-map-inputs).

  - If you are using Helm, map the Config.yaml fields to the values.yaml file using the Replicated mapping file and template functions. You create the mapping file (`APPLICATION.yaml`, where `APPLICATION` is the name of the application. In the header, use `kind: HelmChart`). When you drag and drop your manifest files into the vendor portal, the APPLICATION.yaml files is created automatically. If you are using the CLI, you create the file manually. In both cases, you must configure the mapping file. See [Mapping User-Supplied Values](config-screen-map-inputs).

  :::note
  If your application is already templated and packaged as a Helm chart (or includes Helm charts), then you can follow our documentation on [packaging a Helm chart as an application](helm-installing-native-helm). Note that packaging with Helm charts is optional.

  If you are using Kubernetes Operators, you must pass URLs to the Operator using template functions. See [About Packaging a Kubernetes Operator Application](operator-packaging-about) and [Template Functions](packaging-template-functions).
  :::

  :::note
  You can skip this step if you are using OSS or public images, unless you want to use an air gap environment.
  :::

## Configuring Optional Features

After you perform the required and recommended tasks in your first production pass, you can configure the optional features based on your needs. The optional features can be configured with standard manifests, Helm charts, and Kubernetes Operator applications.

The following list is a suggested order, but you can configure these features in any order:

1.
