# Step 6: Create a New Version

In this step, you edit the Replicated Config custom resource file to create a new field on the admin console Configure App Name page.

You then promote the new release to the Unstable channel with your changes.

To create and promote a new version of the application:

1. From the vendor portal, click **Releases** > **Create Release**.

  The YAML editor opens and shows the contents of the most recently created release. This gives you everything that you have done so far.

1. In the `kots-config.yaml` file, copy and paste the following YAML into the file under the `example_default_value` field to create a new text field on the admin console Configure App Name page:

  ```yaml
   - name: more_text
     title: Another Text Example
     type: text
     value: ""
     when: repl{{ ConfigOptionEquals "show_text_inputs" "1" }}
  ```

  The following shows the full YAML for the `kots-config.yaml` file after you add the new field:

  ```yaml
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
1. Check the linter messages in the Help pane to ensure there are no errors.

1. In the `example-configmap.yaml` file, copy and paste the following HTML to replace the `<body>` section:

   ```
   <body>
     This is an example KOTS application.
     <p>This is text from a user config value: '{{repl ConfigOption "example_default_value"}}' </p>
     <p>This is more text from a user config value: '{{repl ConfigOption "more_text"}}' </p>
     <p>This is a hidden value: '{{repl ConfigOption "hidden_text"}}'</p>
   </body>
   ```
    This creates a reference to the `more_text` field using a Replicated template function. The ConfigOption template function renders the user input from the configuration item that you specify. For more information, see [Config Context](/reference/template-functions-config-context) in _Reference_.

1. Check the linter messages in the Help pane to ensure there are no errors.

1. Click **Save Release**.

1. Promote the release to a channel:

    1. Click **Promote** at the top of the page.

    1. Choose the Unstable channel in the Promote Release dialog, and click **Promote**.

  Any license installed from the Unstable channel will start with this new release, and any installation already running is prompted to update to the new release when the admin console checks for updates.

## Next Step

Continue to [Step 7: Update the Application](tutorial-ui-update-app) to return to the admin console to update the application to the new version.
