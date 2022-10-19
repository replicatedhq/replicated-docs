# Mapping User-Supplied Values

This topic describes how to map the values that your users provide in the Replicated admin console configuration screen to your application.

This topic assumes that you have already added custom fields to the admin console configuration screen by editing the Config custom resource. For more information, see [Creating and Editing Configuration Fields](admin-console-customize-config-screen).

## Overview of Mapping Values

You use the values that your users provide in the admin console configuration screen to render YAML in the manifest files for your application.

For example, if you provide an embedded database with your application, you might add a field on the admin console configuration screen where users input a password for the embedded database. You can then map the password that your user supplies in this field to the Secret manifest file for the database in your application.

Similarly, you can include fields on the configuration screen where your users can enable a custom ingress controller for the cluster. You then map these user-supplied values to the Ingress custom resources in your application.

For a tutorial of mapping database configuration options in a sample application, see [Tutorial: Adding Database Configuration Options](tutorial-adding-db-config).

For an example of adding custom Ingress resources based on user-supplied configuration, see [Configuring Cluster Ingress](packaging-ingress).

You can also conditionally deploy custom resources depending on the user input for a given field. For example, if a customer chooses to use their own database with your application rather than an embedded database option, it is not desirable to deploy the optional database resources such as a StatefulSet and a Service.

For more information about including optional resources conditionally based on user-supplied values, see [Including Optional and Conditional Resources](packaging-include-resources).

## Using Template Functions to Map Values

To map user-supplied values, you use Replicated template functions. The template functions are based on the Go text/template libraries. To use template functions, you add them as strings in the custom resource manifest files in your application.

For more information about template functions, including use cases and examples, see [About Template Functions](/reference/template-functions-about).

For more information about the syntax of the template functions for mapping configuration values, see [Config Context](/reference/template-functions-config-context) in the _Template Functions_ section.

## Map User-Supplied Values

Follow one of these procedures to map user inputs from the configuration screen, depending on if you use a Helm chart for your application in Replicated:

* **Without Helm**: See [Map Values to Manifest Files](#map-values-to-manifest-files).
* **With Helm**: See [Map Values to a Helm Chart](#map-values-to-a-helm-chart).

### Map Values to Manifest Files

To map user-supplied values from the configuration screen to manifest files in your application:

1. In the [vendor portal](https://vendor.replicated.com/apps), click **Releases**. Then, click **View YAML** next to the desired release.

1. Open the Config custom resource manifest file that you created in the [Add Fields to the Configuration Screen](admin-console-customize-config-screen#add-fields-to-the-configuration-screen) procedure. The Config custom resource manifest file has `kind: Config`.

1. In the Config manifest file, locate the name of the user-input field that you want to map.

   **Example**:

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: Config
   metadata:
     name: my-application
   spec:
     groups:
       - name: smtp_settings
         title: SMTP Settings
         description: Configure SMTP Settings
         items:
           - name: smtp_host
             title: SMTP Hostname
             help_text: Set SMTP Hostname
             type: text
   ```

   In the example above, the field name to map is `smtp_host`.

1. In the same release in the vendor portal, open the manifest file where you want to map the value for the field that you selected.

1. In the manifest file, use the ConfigOption template function to map the user-supplied value in a key value pair. For example:

   ```yaml
   hostname: '{{repl ConfigOption "smtp_host"}}'
   ```

   For more information about the ConfigOption template function, see [Config Context](../reference/template-functions-config-context#configoption) in the _Template Functions_ section.

   **Example**:

   The following example shows mapping user-supplied TLS certificate and TLS private key files to the `tls.cert` and `tls.key` keys in a Secret custom resource manifest file.

   For more information about working with TLS secrets, including a strategy for re-using the certificates uploaded for the admin console itself, see the [Configuring Cluster Ingress](packaging-ingress) example.

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: tls-secret
   type: kubernetes.io/tls
   data:
     tls.crt: '{{repl ConfigOption "tls_certificate_file" }}'
     tls.key: '{{repl ConfigOption "tls_private_key_file" }}'
   ```

1. Save and promote the release to a development environment to test your changes.

### Map Values to a Helm Chart

The `values.yaml` file in a Helm chart defines parameters that are specific to each environment in which the chart will be deployed. With Replicated, your users provide these values through the configuration screen in the admin console. You customize the configuration screen based on the required and optional configuration fields that you want to expose to your users.

To map the values that your users provide in the admin console configuration screen to your Helm chart `values.yaml` file, you create a Replicated HelmChart custom resource.

To follow a tutorial that maps values from the configuration screen to a Helm chart, see [Example: Mapping the Configuration Screen to Helm Values](helm-mapping-example).

To map user inputs from the configuration screen to the `values.yaml` file:

1. In the [vendor portal](https://vendor.replicated.com/apps), click **Releases**. Then, click **View YAML** next to the desired release.

1. Open the Config custom resource manifest file that you created in the [Add Fields to the Configuration Screen](admin-console-customize-config-screen#add-fields-to-the-configuration-screen) procedure. The Config custom resource manifest file has `kind: Config`.

1. In the Config manifest file, locate the name of the user-input field that you want to map.

   **Example**:

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: Config
   metadata:
     name: my-application
   spec:
     groups:
       - name: smtp_settings
         title: SMTP Settings
         description: Configure SMTP Settings
         items:
           - name: smtp_host
             title: SMTP Hostname
             help_text: Set SMTP Hostname
             type: text
   ```

   In the example above, the field name to map is `smtp_host`.

1. In the same release, create a HelmChart custom resource manifest file. A HelmChart custom resource manifest file has `kind: HelmChart`.

   For more information about the HelmChart custom resource, see [HelmChart](../reference/custom-resource-helmchart) in the _Custom Resources_ section.

1. In the HelmChart manifest file, copy and paste the name of the property from your `values.yaml` file that corresponds to the field that you selected from the Config manifest file under `values`:

   ```yaml
   values:
     HELM_VALUE_KEY:
   ```
   Replace `HELM_VALUE_KEY` with the property name from the `values.yaml` file.

1. Use the ConfigOption template function to set the property from the `values.yaml` file equal to the corresponding configuration screen field:

   ```yaml
   values:
     HELM_VALUE_KEY: '{{repl ConfigOption "CONFIG_SCREEN_FIELD_NAME" }}'
   ```
   Replace `CONFIG_SCREEN_FIELD_NAME` with the name of the field that you created in the Config custom resource.

   For more information about the ConfigOption template function, see [Config Context](../reference/template-functions-config-context#configoption) in the _Template Functions_ section.

   **Example:**

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: HelmChart
   metadata:
     name: samplechart
   spec:
    chart:
      name: samplechart
      chartVersion: 3.1.7
   helmVersion: v3
   useHelmInstall: true  
   values:
     hostname: '{{repl ConfigOption "smtp_host" }}'
   ```

1. Save and promote the release to a development environment to test your changes.
