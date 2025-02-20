# Creating and Editing Configuration Fields

This topic describes how to use the KOTS Config custom resource manifest file to add and edit fields in the KOTS Admin Console configuration screen.

## About the Config Custom Resource

Applications distributed with Replicated KOTS can include a configuration screen in the Admin Console to collect required or optional values from your users that are used to run your application. For more information about the configuration screen, see [About the Configuration Screen](config-screen-about).

To include a configuration screen in the Admin Console for your application, you add a Config custom resource manifest file to a release for the application.

You define the fields that appear on the configuration screen as an array of `groups` and `items` in the Config custom resource:
   * `groups`: A set of `items`. Each group must have a `name`, `title`, `description`, and `items`. For example, you can create a group of several user input fields that are all related to configuring an SMTP mail server.
   * `items`: An array of user input fields. Each array under `items` must have a `name`, `title`, and `type`. You can also include several optional properties. For example, in a group for configuring a SMTP mail server, you can have user input fields under `items` for the SMTP hostname, port, username, and password.

   There are several types of `items` supported in the Config manifest that allow you to collect different types of user inputs. For example, you can use the `password` input type to create a text field on the configuration screen that hides user input.

For more information about the syntax of the Config custom resource manifest, see [Config](/reference/custom-resource-config).

## About Regular Expression Validation

You can use [RE2 regular expressions](https://github.com/google/re2/wiki/Syntax) (regex) to validate user input for config items, ensuring conformity to certain standards, such as valid email addresses, password complexity rules, IP addresses, and URLs. This prevents users from deploying an application with a verifiably invalid configuration.

You add the `validation`, `regex`, `pattern` and `message` fields to items in the Config custom resource. Validation is supported for `text`, `textarea`, `password` and `file` config item types. For more information about regex validation fields, see [Item Validation](/reference/custom-resource-config#item-validation) in _Config_.

The following example shows a common password complexity rule:

```
- name: smtp-settings
    title: SMTP Settings
    items:
    - name: smtp_password
      title: SMTP Password
      type: password
      help_text: Set SMTP password
      validation:
        regex: 
          pattern: ^(?:[\w@#$%^&+=!*()_\-{}[\]:;"'<>,.?\/|]){8,16}$
          message: The password must be between 8 and 16 characters long and can contain a combination of uppercase letter, lowercase letters, digits, and special characters.
```

## Add Fields to the Configuration Screen

To add fields to the Admin Console configuration screen:

1. In the [Vendor Portal](https://vendor.replicated.com/apps), click **Releases**. Then, either click **Create release** to create a new release, or click **Edit YAML** to edit an existing release.
1. Create or open the Config custom resource manifest file in the desired release. A Config custom resource manifest file has `kind: Config`.
1. In the Config custom resource manifest file, define custom user-input fields in an array of `groups` and `items`.

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
           - name: enable_smtp
             title: Enable SMTP
             help_text: Enable SMTP
             type: bool
             default: "0"
           - name: smtp_host
             title: SMTP Hostname
             help_text: Set SMTP Hostname
             type: text
           - name: smtp_port
             title: SMTP Port
             help_text: Set SMTP Port
             type: text
           - name: smtp_user
             title: SMTP User
             help_text: Set SMTP User
             type: text
           - name: smtp_password
             title: SMTP Password
             type: password
             default: 'password'
   ```

   The example above includes a single group with the name `smtp_settings`.

   The `items` array for the `smtp_settings` group includes the following user-input fields: `enable_smtp`, `smtp_host`, `smtp_port`, `smtp_user`, and `smtp_password`. Additional item properties are available, such as `affix` to make items appear horizontally on the same line. For more information about item properties, see [Item Properties](/reference/custom-resource-config#item-properties) in Config.

   The following screenshot shows how the SMTP Settings group from the example YAML above displays in the Admin Console configuration screen during application installation:

   ![User input fields on the configuration screen for the SMTP settings](/images/config-screen-smtp-example-large.png)

1. (Optional) Add default values for the fields. You can add default values using one of the following properties:
   * **With the `default` property**: When you include the `default` key, KOTS uses this value when rendering the manifest files for your application. The value then displays as a placeholder on the configuration screen in the Admin Console for your users. KOTS only uses the default value if the user does not provide a different value.

     :::note
     If you change the `default` value in a later release of your application, installed instances of your application receive the updated value only if your users did not change the default from what it was when they initially installed the application.

     If a user did change a field from its default, the Admin Console does not overwrite the value they provided.
     :::

   * **With the `value` property**: When you include the `value` key, KOTS does not overwrite this value during an application update. The value that you provide for the `value` key is visually indistinguishable from other values that your user provides on the Admin Console configuration screen. KOTS treats user-supplied values and the value that you provide for the `value` key as the same.

2. (Optional) Add regular expressions to validate user input for `text`, `textarea`, `password` and `file` config item types. For more information, see [About Regular Expression Validation](#about-regular-expression-validation).

    **Example**:

    ```yaml
    - name: smtp_host
      title: SMTP Hostname
      help_text: Set SMTP Hostname
      type: text
      validation:
        regex: ​
          pattern: ^[a-zA-Z]([a-zA-Z0-9\-]+[\.]?)*[a-zA-Z0-9]$
          message: Valid hostname starts with a letter (uppercase/lowercase), followed by zero or more groups of letters (uppercase/lowercase), digits, or hyphens, optionally followed by a period. Ends with a letter or digit.
    ```  
3. (Optional) Mark fields as required by including `required: true`. When there are required fields, the user is prevented from proceeding with the installation until they provide a valid value for required fields.

    **Example**:

    ```yaml
    - name: smtp_password
      title: SMTP Password
      type: password
      required: true
    ```      

4. Save and promote the release to a development environment to test your changes.

## Next Steps

After you add user input fields to the configuration screen, you use template functions to map the user-supplied values to manifest files in your release. If you use a Helm chart for your application, you map the values to the Helm chart `values.yaml` file using the HelmChart custom resource.

For more information, see [Mapping User-Supplied Values](config-screen-map-inputs).