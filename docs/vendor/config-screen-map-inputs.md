# Mapping User Inputs

After you add fields to the configuration screen by updating the Config custom resource manifest file, you map the fields from the configuration screen to your application manifest files. This allows you to apply the values that your users supply in the fields in the admin console configuration screen.

To map these fields, you use Replicated template functions. For more information about using template functions for mapping configuration values, see [Using Template Functions](packaging-template-functions) and [Config Context](../reference/template-functions-config-context) in the _Template Functions_ section.

Follow one of these procedures below to map user inputs from the configuration screen, depending on if you use a Helm chart for your application in Replicated:

* **Without Helm**: See [Map User Inputs to Manifest Files](#map-user-inputs-to-manifest-files).
* **With Helm**: See [Map User Inputs to a Helm Chart](#map-user-inputs-to-a-helm-chart).

## Map User Inputs to Manifest Files
Customer supplied values can be used when generating the YAML for the manifest file by using the `'{{repl ConfigOption ITEM_NAME}}'` syntax.

To map user inputs from the configuration screen to values in other manifest files for your application:

1. In the Config custom resource manifest file, locate the name of the field that you want to map.
1. Open the manifest file for your application where you want to use the user-supplied input from the configuration screen field that you selected. Locate the field where you want to supply the user-provided value.
1. In the manifest file where you want to use the user-supplied input, use sprig template formatting to map the field name from the Config manifest to the value of the desired field in the manifest file:
   ```yaml
   value: '{{repl ConfigOption "MY_FIELD_NAME"}}'
   ```

   Replace `MY_FIELD_NAME` with the name of the field.

   **Example**:

   For example, to set the `smtp_hostname` value in the above YAML as the value of an environment variable in a PodSpec manfiest file:

   ```yaml
   env:
    name: SMTP_USERNAME
    value: '{{repl ConfigOption "smtp_username"}}'
    ```

1. Save and promote the release to test your changes.

## Map User Inputs to a Helm Chart

The values.yaml file for a Helm chart is the file that contains values that are specific to the end-user’s environment.

With Replicated, your end users provide these values through the configuration screen in the admin console, which you customize based on the required and optional fields that you want to expose to your users.

To map the values that your users provide in the admin console configuration screen to your Helm chart, you update the HelmChart custom resource.

To follow a tutorial that maps values from the configuration screen to a Helm chart, see Example: Mapping the Configuration Screen to Helm Values.

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
