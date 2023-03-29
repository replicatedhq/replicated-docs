# Installing on an Existing Cluster

This topic describes how to use Replicated to install an application on an existing Kubernetes cluster in an online environment.

## Prerequisites

Before installing on an existing cluster, complete the following prerequisites:

* Ensure that your cluster meets the minimum system requirements. See [Minimum System Requirements](/enterprise/installing-general-requirements#minimum-system-requirements) in _Installation Requirements_.
* Ensure that you have at least the minimum RBAC permissions in the cluster required to install the app manager. See [RBAC Requirements](/enterprise/installing-general-requirements#rbac-requirements) in _Installation Requirements_.

  :::note
  If you manually created RBAC resources for the app manager as described in [Namespace-scoped RBAC Requirements](/enterprise/installing-general-requirements#namespace-scoped), include both the `--ensure-rbac=false` and `--skip-rbac-check` flags when you run the `kots install` command.
  
  These flags prevent the app manager from checking for or attempting to create a Role with `* * *` permissions in the namespace. For more information about these flags, see [install](/reference/kots-cli-install) or [admin-console upgrade](/reference/kots-cli-admin-console-upgrade).
  :::
* Replicated recommends that you review the options available with the `kots install` command before installing. The `kots install` command includes several optional flags to support different installation use cases. For a list of options, see [install](/reference/kots-cli-install) in the _kots CLI_ documentation. 

## Install in an Online Environment {#online}

You can install an application to an existing Kubernetes cluster that contains nodes that can access the internet.
In an online installation, the Replicated app manager pulls container images from the upstream registries directly.

To install on an existing cluster in an online environment:

1. Run the command that was provided by the application vendor to install the kots CLI, the Replicated admin console, and the application on the cluster:

   * **Install the latest version of the application**:

      ```shell
      curl https://kots.io/install | bash
      kubectl kots install APP_SLUG
      ```
      Replace `APP_SLUG` with the unique slug for the application. The application slug is included in the installation command provided by the vendor.

   * **(App manager v1.67.0 and later) Install a specific version of the application**: With the app manager v1.67.0 and later, you can install a specific version of the application. Use the `app-version-label` flag and the version label for a particular version of your vendor's application.

      ```shell
      curl https://kots.io/install | bash
      kubectl kots install APP_SLUG --app-version-label=VERSION_LABEL
      ```
      Replace:
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

Log in to the admin console to complete the application setup, run preflight checks, and deploy. See [Completing Application Setup and Deploying](installing-app-setup).