import PrereqsExistingCluster from "../partials/install/_prereqs-existing-cluster.mdx"
import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"

# Online Installation in Existing Clusters

This topic describes how to use Replicated to install an application in an existing Kubernetes cluster in an online environment.

## Prerequisites

Complete the following prerequisites:

<PrereqsExistingCluster/> 

* You supply application configuration values by defining the values in a local ConfigValues YAML file. Then, you provide the file to the app manager when you run the `kots install` command using the `--config-values` flag.

    The following is an example of a ConfigValues file:

    <ConfigValuesExample/>

    As shown in the example above, the ConfigValues file includes the names of the configuration fields for the application, along with a user-supplied value for each field.

    Your application vendor provides details about the required and optional configuration fields to include in the ConfigValues file. For more information, see [Downloading the ConfigValues File](/vendor/releases-configvalues).

## Install the Application {#online}

You can install an application to an existing Kubernetes cluster that contains nodes that can access the internet. In an online installation, the Replicated app manager pulls container images from the upstream registries directly.

To install the application:

1. Run one of the following commands to install the app manager:

    * For the latest version of the application:

      ```shell
      curl https://kots.io/install | bash
      kubectl kots install APP_SLUG
      ```

    * For a specific version of the application, use the `app-version-label` flag and the version label for a particular version of your vendor's application:

      ```shell
      curl https://kots.io/install | bash
      kubectl kots install APP_SLUG --app-version-label=VERSION_LABEL
      ```
    
    Replace, where applicable:
     * `APP_SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.
     * `VERSION_LABEL` with the label for the version of the application to install. For example, `--app-version-label=3.0.1`.

1. When prompted by the `kots install` command:
   1. Provide the namespace where you want to deploy the application and the admin console.
   1. Create a new password for logging in to the admin console.

     **Example**:

     ```shell
     $ kubectl kots install application-name
     Enter the namespace to deploy to: application-name
       • Deploying Admin Console
         • Creating namespace ✓
         • Waiting for datastore to be ready ✓
     Enter a new password to be used for the Admin Console: ••••••••
       • Waiting for Admin Console to be ready ✓

       • Press Ctrl+C to exit
       • Go to http://localhost:8800 to access the Admin Console

     ```

    After the `kots install` command installs the admin console and the application on the cluster, it creates a port forward to the admin console. The admin console is exposed internally on the cluster and can only be accessed using a port forward.

1. Log in to the admin console to provide the license file, define your configuration values, run preflight checks, and deploy. See [Deploying the Application using the Admin Console](installing-app-setup).