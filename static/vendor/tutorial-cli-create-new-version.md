# Step 8: Create a New Version

In this step, you make an edit to the Config custom resource manifest file in the `replicated-cli-tutorial/manifests` directory for the `cli-tutorial` application to create a new field on the **Config** page in the Admin Console. You will then create and promote a new release to the Unstable channel with your changes.

To create and promote a new version of the application:

1. In your local directory, go to the the `replicated-cli-tutorial/manifests` folder and open the `kots-config.yaml` file in a text editor.

1. Copy and paste the following YAML into the file under the `example_default_value` field to create a new text field on the **Config** page:

   ```yaml
    - name: more_text
      title: Another Text Example
      type: text
      value: ""
      when: repl{{ ConfigOptionEquals "show_text_inputs" "1" }}
   ```
   The following shows the full YAML for the `kots-config.yaml` file after you add the new field:

   ```yaml
   ---
   apiVersion: kots.io/v1beta1
   kind: Config
   metadata:
     name: config-sample
   spec:
     groups:
     - name: example_settings
       title: My Example Config
       description: Configuration to serve as an example for creating your own. See [https://kots.io/reference/v1beta1/config/](https://kots.io/reference/v1beta1/config/) for configuration docs. In this case, we provide example fields for configuring an Nginx welcome page.
       items:
       - name: show_text_inputs
         title: Customize Text Inputs
         help_text: "Show custom user text inputs"
         type: bool
         default: "0"
         recommended: true
       - name: example_default_value
         title: Text Example (with default value)
         type: text
         value: ""
         default: please change this value
         when: repl{{ ConfigOptionEquals "show_text_inputs" "1" }}
         # Add the new more_text field here
       - name: more_text
         title: Another Text Example
         type: text
         value: ""
         when: repl{{ ConfigOptionEquals "show_text_inputs" "1" }}
       - name: api_token
         title: API token
         type: password
         props:
           rows: 5
         when: repl{{ ConfigOptionEquals "show_text_inputs" "1" }}
       - name: readonly_text_left
         title: Readonly Text
         type: text
         value: "{{repl RandomString 10}}"
         readonly: true
         when: repl{{ ConfigOptionEquals "show_text_inputs" "1" }}
       - name: hidden_text
         title: Secret Key
         type: password
         hidden: true
         value: "{{repl RandomString 40}}"

   ```

1. Open the `example-configmap.yaml` file.

1. In the `example-configmap.yaml` file, copy and paste the following HTML to replace the `<body>` section:

   ```
   <body>
     This is an example KOTS application.
     <p>This is text from a user config value: '{{repl ConfigOption "example_default_value"}}' </p>
     <p>This is more text from a user config value: '{{repl ConfigOption "more_text"}}' </p>
     <p>This is a hidden value: '{{repl ConfigOption "hidden_text"}}'</p>
   </body>
   ```
    This creates a reference to the `more_text` field using a Replicated KOTS template function. The ConfigOption template function renders the user input from the configuration item that you specify. For more information, see [Config Context](/reference/template-functions-config-context) in _Reference_.

1. Save the changes to both YAML files.

1. Change to the root `replicated-cli-tutorial` directory, then run the following command to verify that there are no errors in the YAML:

   ```
   replicated release lint --yaml-dir=manifests
   ```

1. Create a new release and promote it to the Unstable channel:

   ```
   replicated release create --auto
   ```

   **Example output**:

   ```
   • Reading manifests from ./manifests ✓
   • Creating Release ✓
     • SEQUENCE: 2
   • Promoting ✓
     • Channel 2GxpUm7lyB2g0ramqUXqjpLHzK0 successfully set to release 2
   ```

1. Type `y` and press **Enter** to continue with the defaults.

    **Example output**:

    ```
    RULE    TYPE    FILENAME    LINE    MESSAGE

    • Reading manifests from ./manifests ✓
    • Creating Release ✓
      • SEQUENCE: 2
    • Promoting ✓
      • Channel 2GmYFUFzj8JOSLYw0jAKKJKFua8 successfully set to release 2
    ```

    The release is created and promoted to the Unstable channel with `SEQUENCE: 2`.

1. Verify that the release was promoted to the Unstable channel:

    ```
    replicated release ls
    ```
    **Example output**:

    ```
    SEQUENCE    CREATED                 EDITED                  ACTIVE_CHANNELS
    2           2022-11-03T19:16:24Z    0001-01-01T00:00:00Z    Unstable
    1           2022-11-03T18:49:13Z    0001-01-01T00:00:00Z
    ```

## Next Step

Continue to [Step 9: Update the Application](tutorial-cli-update-app) to return to the Admin Console and update the application to the new version that you promoted.