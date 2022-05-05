# Creating and Editing Configuration Fields

To include a configuration screen in the Replicated admin console for your application, you add a Config custom resource manifest file to a release that contains the field definitions.

After you add user input fields to the configuration screen, you use templating to map the user-supplied values of those fields to other manifest files in your release or to the Helm chart `values.yaml` file. For more information, see [Mapping User Inputs](config-screen-map-inputs).

## Add Fields to the Configuration Screen

To add fields to the admin console configuration screen:

1. Open or create a Config custom resource manifest file. The Config custom resource manifest is a YAML file in your release with `kind: Config`.
1. Add the desired fields. For information about the syntax to use, see [Config](../reference/custom-resource-config) in the _Custom Resources_ section.

   **Example**:

   ```yaml
   apiVersion: kots.io/v1beta1
   kind: Config
   metadata:
     name: my-application
   spec:
     groups:
       - name: smtp_settings
         title: Mail Server (SMTP)
         description: Configuration to use an external mail server
         items:
           - name: enable_smtp
             type: bool
             default: "0"
           - name: smtp_hostname
             title: SMTP Server Hostname
             type: text
             required: true
           - name: smtp_username
             title: SMTP Username
             type: text
             required: true
           - name: smtp_password
             title: SMTP Password
             type: password
             required: true
   ```
1. (Optional) Add default values for the fields. You can do this in one of two ways:
   * **With a `default` key**: If a value is only provided in the `default` key, this value will be used when rendering the manifest files for the application, but the value will show up as a placeholder on the Config screen in the admin console. The default value will only be used if the user doesn't provide a different value.
   * **With a `value` key**: If a value is provided in the `value` key, this is treated the same as a user-supplied value, and will not be overwritten on application update. The user will see this value on the Config screen in the admin console, and it's indistinguishable from other values they provided.
1. (Optional) Mark field as required with `required: true`. When there are required fields, the user will see the configuration screen during installation, and will not be permitted to save the configuration values and proceed with installation without providing a value for required fields.
1. Save and promote the release to see the fields in the Config tab of the admin console and test your changes.

## Mapping User Inputs

After you add fields to the configuration screen by editing the Config custom resource, you map the user-supplied values from those fields to other application manifest files. See [Mapping User Inputs](config-screen-map-inputs).
