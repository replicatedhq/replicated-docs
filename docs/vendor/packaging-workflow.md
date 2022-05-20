# How to Package an Application for Production

Your application can be packaged as a set of standard Kubernetes manifests, Helm charts or Kubernetes Operators.
These manifests include your application manifests, and can include optional [custom resources](../reference/custom-resource-about) used to invoke various app manager functions.

We recommend packaging your application for production in iterations. It can be helpful to understand the priority order in which to iterate. Some configurations are required or highly recommended. Other configurations are optional and can be done in any order after the required and recommended configurations.

You will create and test several iterations of a release before you are ready to share the application with customers.

## Prerequisites

1. You must have a Kubernetes-deployable application.
1. You have set up and activated an account in the [vendor portal](vendor.replicated.com).
1. You have set up a development server and installed the replicated CLI.
1. Review the end-to-end workflow for distributing an application. Understanding the overall workflow and doing at least one of the quickstart tutorials with a sample application help make the production release easier.

## Choose Your Path

- For standard manifests, start with [importing the application files to Replicated](#importing-the-application-files-to-replicated).
- For Helm, start with [importing the application files to Replicated](#importing-the-application-files-to-replicated).
- For Kubernetes Operators:
    1. [Package the Kubernetes Operator application](operator-packaging-about).
    :::note
    If you are using Kubernetes Operators, you must also pass URLs to the Operator using [template functions](packaging-template-functions).
    You can skip passing the URLs if you are using OSS or public images, unless you want to use an air gap environment.
    :::
    1. [Configure optional features](#configuring-optional-features).


## Importing the Application Files to Replicated

This section applies to standard manifests and Helm charts.

Before you can configure the Replicated features, you must import your application files to Replicated. To import your files, do one of the following:

- If you are using standard manifest files, put the application manifests in a directory and then drag and drop them into the Replicated vendor portal or use the replicated CLI to get them into Replicated. To use the vendor portal, see [Creating a Release](releases-creating-releases). To use the CLI, see the tutorial [Managing Releases with the CLI](tutorial-installing-with-cli). **Content gap: We don't seem to have a generic CLI topic to tell them how to do it. The CLI tutorial tells them how to use the sample app, but it's not a direct translation. I think they need to make a directory using this command: `mkdir ./manifests` and then move their manifest files to it. Then verify the YAML with `replicated release lint --yaml-dir=manifests`.**

- If you are using Helm, access the application files from the Helm repository. Run the Helm package command to create a binary. Add the binary to either the vendor portal or the replicated CLI. See [Adding Helm Charts to a Release]**(Need to add the link after Paige merges the new content)**

## Configuring the Recommended Features

This section applies to standard manifests and Helm charts.
These configuration tasks are either required or highly recommended, depending on your environment. All of the steps are the same for standard manifest files and Helm charts except where indicated.

To configure the recommended features:

1. Connect to a private registry. If your images are open-source or public, skip this step. To connect your private registry, either push the image to Replicated's registry or link your private registry. See [Connecting to an Image Registry](packaging-private-images).

1. Promote the release, and test the release in a development environment. Then iterate using the following steps.

1. Define custom fields in the Config custom resource manifest file (Config.yaml). This lets you define fields for the Configuration screen in the Replicated admin console to collect required or optional values from your users that are used to access the application. If you are using a Helm chart, your users will also provide configuration values through the Configuration screen in the admin console. See [About the Configuration Screen](config-screen-about) and [Creating and Editing Configuration Fields](admin-console-customize-config-screen).

1. Map the fields from the Config custom resource manifest:

  - If you are using standard manifest files, map the Config.yaml fields to the application manifest files (such as post-gres.yaml, and so on) using template functions. See [Mapping User-Supplied Values](config-screen-map-inputs).

  - If you are using Helm, map the Config.yaml fields to the values.yaml file using the Replicated mapping file and template functions. You create the mapping file (`APPLICATION.yaml`, where `APPLICATION` is the name of the application. In the header, use `kind: HelmChart`). When you drag and drop your manifest files into the vendor portal, the APPLICATION.yaml files is created automatically. If you are using the CLI, you create the file manually. In both cases, you must configure the mapping file. See [Mapping User-Supplied Values](config-screen-map-inputs).

1. Promote the release, and test the release in a development environment.


## Configuring Optional Features

After you perform the required and recommended tasks in your first production pass, you can configure the optional features based on your needs. The optional features can be configured with standard manifests, Helm charts, and Kubernetes Operator applications.

After you configure each new release, promote the release, and test it in a development environment.

The following list is a suggested order, but you can configure these features in any order:

**Note: This is a placeholder list. More info and content will be added.**

1. Preflights
1. Support bundles
1. Database
1. Port forwarding
1. Ingress
1. Blah, blah, blah
