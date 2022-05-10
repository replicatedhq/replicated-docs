# Mapping User-Supplied Values

This topic describes how to map the values that your users provide in the Replicated admin console configuration screen within your application.

This topic assumes that you have already added custom fields to the admin console configuration screen by editing the Config custom resource. For more information, see [Creating and Editing Configuration Fields](admin-console-customize-config-screen).

## Using Template Functions to Map Values

You can use the values that your users provide in the admin console configuration screen to render YAML within your application manifest files.

To map user-supplied values, you use Replicated template functions. For more information about the syntax of template functions for mapping configuration values, see [Config Context](../reference/template-functions-config-context) in the _Template Functions_ section. For additional template functions use cases and examples, see [Using Template Functions](packaging-template-functions).

For example, if you provide an embedded database with your application, you can add a field on the admin console configuration screens where users input a password for the embedded database. You can then use the user-supplied password in the Kubernetes Secret resource for the database service.

You could also use user-supplied values to conditionally include custom resources depending on the user input for a given field. For example, if a customer chooses to use their own database with your application rather than an embedded database option, it is not desirable to deploy the optional database resources such as a StatefulSet and a Service.

In this case, if the user selects the option on the admin console configuration screen to provide their own database, you can use this selection to prevent the app manager from deploying the optional additional database resources.

For more information about including optional resources conditionally based on user-supplied values, see [Including Optional and Conditional Resources](packaging-include-resources).

## Map User-Supplied Values

Follow one of these procedures to map user inputs from the configuration screen, depending on if you use a Helm chart for your application in Replicated:

* **Without Helm**: See [Map Values to Manifest Files](#map-values-to-manifest-files).
* **With Helm**: See [Map Values to a Helm Chart](#map-values-to-a-helm-chart).

### Map Values to Manifest Files

To map user-supplied values from the configuration screen to manifest files for your application:

1. In the vendor portal, open the Config custom resource manifest file in the desired release. In the Config manifest file, locate the name of the user-input field that you want to map.

   **Example**:
   ```yaml
   spec:
    groups:
      - name: example_group_name
        title: "Example Group Title"
        description: "An example group of configuration options.""
        items:
          - name: example_config_screen_field_name
            title: "Example Field Title"
            type: bool
            default: "0"
   ```

   In the example above, the field name to map is `example_config_screen_field_name`.

   For information about how to add fields to the configuration screen using Config custom resource, see [Creating and Editing Configuration Fields](admin-console-customize-config-screen).

1. In the same release in the vendor portal, open the manifest file where you want to apply the user-supplied value for the field that you selected.

   In the manifest file, create an environment variable that maps the fields using the ConfigOption template function:

   ```yaml
   env:
     name: ENVIRONMENT_VAR_NAME
     value: '{{repl ConfigOption "CONFIG_SCREEN_FIELD_NAME"}}'
   ```
   <table>
     <tr>
       <th>Replace</th>
       <th>With</th>
     </tr>
     <tr>
       <td>ENVIRONMENT_VAR_NAME</td>
       <td>A name for the new environment variable in the manifest file.</td>
     </tr>
     <tr>
       <td>CONFIG_SCREEN_FIELD_NAME</td>
       <td>The name of the field that you created in the Config custom resource.</td>
     </tr>
   </table>

   For more information about the ConfigOption template function, see [Config Context](../reference/template-functions-config-context#configoption) in the _Template Functions_ section.

1. Save and promote the release to a development environment to test your changes.

### Map Values to a Helm Chart

The `values.yaml` file for a Helm chart is the file that contains values that are specific to the end-user environment. With Replicated, your users provide these values through the configuration screen in the admin console. You customize the configuration screen based on the required and optional configuration fields that you want to expose to your users.

By allowing your users to provide configuration values in the admin console rather than in the Helm `values.yaml` file directly, you can control which options you expose to your users. It also makes it easier for your users to provide their inputs through a user interface, rather than having to edit YAML.

To map the values that your users provide in the admin console configuration screen to your Helm chart `values.yaml` file, you create a Replicated HelmChart custom resource.

To follow a tutorial that maps values from the configuration screen to a Helm chart, see [Example: Mapping the Configuration Screen to Helm Values](helm-mapping-example).

To map user inputs from the configuration screen to the `values.yaml` file:

1. In the vendor portal, create a HelmChart custom resource manifest file in the desired release. A HelmChart custom resource manifest file has `kind: HelmChart`.

1. In the HelmChart manifest file, copy and paste the name of the desired property from your `values.yaml` file under the `values:` key:

   ```yaml
   values:
     HELM_VALUE_NAME:
   ```
   Replace `HELM_VALUE_NAME` with the name of the property.

1. Set it equal to whatever value the user provides in the corresponding field on the configuration screen in the admin console by using template formatting:

   ```yaml
   values:
     HELM_VALUE_NAME: '{{repl ConfigOption "CONFIG_SCREEN_FIELD_NAME" }}'
   ```
   Replace `CONFIG_SCREEN_FIELD_NAME` with the name of the field that you created in the Config custom resource.

1. Save and promote the release to a development environment to test the changes.
