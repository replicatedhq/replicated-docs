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
* Each of the custom configuration fields that you defined in the Config custom resource
* The default values for each field, if applicable
* The user-supplied configuration value for each field

For more information about the data in the `upstream`, `base`, `overlays`, and `skippedFiles` directories, see [About the Directory Structure](/enterprise/updating-patching-with-kustomize#about-the-directory-structure) in _Patching with Kustomize_.

For more information about defining application configuration fields in the Config custom resource, see [Config](/reference/custom-resource-config) in _Reference_.

## Download the ConfigValues File

When a user installs your application with the app manager, they can configure the application by providing values in the admin console Config page or by defining a ConfigValues file.

To allow your users to automate installation using the kots CLI, Replicated recommends that you provide a template or example of the ConfigValues file for your users to edit as needed. You can generate a template to share with your users by downloading the ConfigValues for an installed instance of the application.

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

  The app manager downloads your application files from the cluster. The output of this command includes the location where the kots CLI downloaded the files in your local directory.

1. In your local directory, navigate to the folder where the application manifest files are downloaded.

1. Open the `upstream/userdata/config.yaml` file in a text editor. Edit as necessary to create a template for your users.
