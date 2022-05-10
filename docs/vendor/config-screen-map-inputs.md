# Mapping User-Supplied Values

This topic describes how to map the values that your users provide in the Replicated admin console configuration screen within your application.

This topic assumes that you have already added custom fields to the admin console configuration screen by editing the Config custom resource. For more information, see [Creating and Editing Configuration Fields](admin-console-customize-config-screen).

## Overview of Mapping Values

You can use the values that your users provide in the admin console configuration screen to render YAML within your application manifest files.

Alternatively, if you use a Helm chart for your application in Replicated, you can map these user-supplied values to the Helm chart `values.yaml` file using the Replicated `HelmChart` custom resource.

For example,

You could also use user-supplied values to conditionally include custom resources depending on the user input for a given field. For example, if a customer chooses to use their own database with your application rather than an embedded database option, it is not desirable to deploy the optional database resources such as a StatefulSet and a Service.

In this case, if the user selects the option on the admin console configuration screen to provide their own database, you can use this selection to prevent the app manager from deploying the optional additional database resources.

For more information about including optional resources conditionally based on user-supplied values, see [Including Optional and Conditional Resources](packaging-include-resources).

## Map User-Supplied Values

To map these user-supplied values, you use Replicated template functions. For more information about the syntax of template functions for mapping configuration values, see [Using Template Functions](packaging-template-functions) and [Config Context](../reference/template-functions-config-context) in the _Template Functions_ section.

Follow one of these procedures to map user inputs from the configuration screen, depending on if you use a Helm chart for your application in Replicated:

* **Without Helm**: See [Map Values to Manifest Files](#map-values-to-manifest-files).
* **With Helm**: See [Map Values to a Helm Chart](#map-values-to-a-helm-chart).

### Map Values to Manifest Files

To map user-supplied values from the configuration screen to manifest files for your application:

1. In the Config custom resource manifest file, locate the name of the user-input field whose value you want to map.
1. Open the manifest file for your application where you want to use the user-supplied value for the field that you selected. Locate the field where you want to supply the user-provided value.
1. In the manifest file where you want to use the user-supplied input, use sprig template formatting to map the field name from the Config manifest to the value of the desired field in the manifest file:
   ```yaml
   value: '{{repl ConfigOption "MY_FIELD_NAME"}}'
   ```

   Replace `MY_FIELD_NAME` with the name of the field.

   **Example**:

   For example, to set the `smtp_hostname` value in the above YAML as the value of an environment variable in a PodSpec manifest file:

   ```yaml
   env:
    name: SMTP_USERNAME
    value: '{{repl ConfigOption "smtp_username"}}'
   ```

1. Save and promote the release to a development environment to test your changes.

### Map Values to a Helm Chart

The `values.yaml` file for a Helm chart is the file that contains values that are specific to the end-user environment.

With Replicated, your users provide these values through the configuration screen in the admin console. You customize the configuration screen based on the required and optional fields that you want to expose to your users.

By allowing your users to provide configuration values in the admin console rather than in the Helm `values.yaml` file directly, you can control which options you expose to your users. It also makes it easier for your users to provide their configuration inputs through a user interface, rather than having to edit YAML.

To map the values that your users provide in the admin console configuration screen to your Helm chart, you update the Replicated HelmChart custom resource.

To follow a tutorial that maps values from the configuration screen to a Helm chart, see [Example: Mapping the Configuration Screen to Helm Values](helm-mapping-example).

To map user inputs from the configuration screen to values in the Helm chart values.yaml file:

1. In the values.yaml file for your Helm chart, locate the name of the field that you want to map to a value that your user provides in the admin console configuration screen.

1. In the Config custom resource for your application, create a corresponding field.
   ```yaml
   spec:
     - name: MY_CONFIG_OPTION
       title: "Example Title"
       help-text: "Example help text."
       default: "A default value."\
    ```
    Replace `MY_CONFIG_OPTION` with the field name.

1. In the HelmChart custom resource, copy and paste the field name from your values.yaml file under `values:`.

   **Example**:
   ```yaml
   values:
     HelmValueName:
     ```

   Set it equal to whatever value the user provides in the corresponding field on the configuration screen in the admin console by using sprig template formatting:
   ```yaml
   values:
     HelmValueName: '{{repl ConfigOption "MY_CONFIG_OPTION" }}'
   ```

1. Save and promote the release to test the changes.
