import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"

# Downloading the ConfigValues File

This topic describes how to access and download the ConfigValues file for a release. The ConfigValues file is required to configure and install an application using the kots CLI.

## About the ConfigValues File

The Replicated app manager generates Kubernetes manifest files for an application during installation and stores these files in `upstream`, `base`, `overlays`, and `skippedFiles` directories.

The `upstream` directory includes the manifest files that you created and saved to the release, such as the Application, Preflight, Support Bundle, and Config custom resources. The `upstream` directory also includes a `userdata` subdirectory, which contains user-specific data such as the unique license file and application configuration data.

The application configuration data is saved in the `userdata` subdirectory in a `config.yaml` manifest file, which has `kind: ConfigValues` and `apiVersion: kots.io/v1beta1`.

The following is an example of a ConfigValues file:

<ConfigValuesExample/>

As shown in the example above, the ConfigValues file includes the following:
* Each of the custom configuration fields that you defined in the Config custom resource. See [Config](/reference/custom-resource-config) in _Reference_.
* The default values for each field, if applicable
* The user-supplied configuration value for each field

To install your application with the kots CLI, users must define their application configuration values in a ConfigValues file, then pass the ConfigValues file to the app manager with the `--config-values` flag. For more information about how users define a ConfigValues file to install with the kots CLI, see [Using Automation to Install on an Existing Cluster](/enterprise/installing-existing-cluster-automation) in the _Enterprise_ section.

## Download the ConfigValues File

The ConfigValues file is required to configure and install an application using the kots CLI. To allow your users to install your application with the kots CLI, Replicated recommends that you provide a template or example of the ConfigValues file for your users to edit as needed. You can generate a template to share with your users by downloading the ConfigValues file for an installed instance of the application.

The app manager reads the ConfigValues file to configure the application during installation.

To download the ConfigValues file for your application:

1. Install the desired release for the application in a development environment.

1. Run the following command to download the manifest files for the installed application:

    ```
    kubectl kots download --namespace APP_NAMESPACE --slug APP_SLUG
    ```
    Replace:
    * `APP_NAMESPACE` with the namespace on the cluster where you installed your application.
    * `APP_SLUG` with the slug of the application.

  The app manager downloads your application files from the cluster. The output of this command includes the location where the app manager downloaded the files in your local directory.

1. In your local directory, navigate to the folder where the app manager downloaded the files.

1. Open the `upstream/userdata/config.yaml` file in a text editor. Use the contents of the ConfigValues file to create a template for your users.
