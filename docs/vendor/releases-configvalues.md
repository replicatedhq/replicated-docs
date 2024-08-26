import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"
import BoolExample from "../partials/configValues/_boolExample.mdx"
import FileExample from "../partials/configValues/_fileExample.mdx"
import PasswordExample from "../partials/configValues/_passwordExample.mdx"
import SelectOneExample from "../partials/configValues/_selectOneExample.mdx"
import TextExample from "../partials/configValues/_textExample.mdx"
import TextAreaExample from "../partials/configValues/_textareaExample.mdx"

# Sharing a ConfigValues File

This topic describes how to view the ConfigValues file for an application installed with Replicated KOTS and prepare the ConfigValues file to be shared with your users.

## About ConfigValues Files

A ConfigValues file defines the user-supplied configuration values for an application installed with KOTS. Enterprise users can provide a ConfigValues file to configure an application during automated installations with the KOTS CLI. During installation, KOTS reads the values in the ConfigValues file to configure the application. For more information about automated installations with the KOTS CLI, see [Installing with the CLI](/enterprise/installing-existing-cluster-automation).

ConfigValues files include the configuration fields defined in the Config custom resource for the release, along with the user-supplied and default values for each field. The following is an example of a ConfigValues file:

<ConfigValuesExample/>

## Get the ConfigValues File

When installing an application, KOTS automatically generates a ConfigValues file and saves the file in a directory called `upstream`. After installation, you can view the generated ConfigValues file.

To get the ConfigValues file for an application:

1. Install the target release for the application in a development environment. For more information, see [About Installing an Application](/enterprise/installing-overview).

1. View the generated ConfigValues file for the installed instance:

    ```
    kubectl kots get config --namespace APP_NAMESPACE --decrypt 
    ```
    Where `APP_NAMESPACE` is the cluster namespace where the application is installed.
    
    :::note
    The `--decrypt` flag decrypts all configuration fields with `type: password`. In the downloaded ConfigValues file, the decrypted value is stored in a `valuePlaintext` field.
    :::

    The output of the `kots get config` command is the contents of the ConfigValues file. For more information about the `kots get config` command, including additional flags, see [kots get config](/reference/kots-cli-get-config).
## Share a Sample ConfigValues File    

Replicated recommends that you share an example of an accurate ConfigValues file with your users that they can edit for use in automated installations with the KOTS CLI.

After you get the ConfigValues file for your application using the `kots get config` command, Replicated recommends that you do the following to edit the contents of the ConfigValues file before sharing it with users:

   * Remove any configuration fields that have `readonly` set to `true`. Users cannot edit read only fields. For more information, see [readonly](/reference/custom-resource-config#readonly) in _Config_.

   * Remove the `metadata` and `status` fields. These fields are automatically generated because the file is a Kubernetes custom resource. KOTS does not use the `metadata` or `status` fields.

   * (Optional) Remove any fields that have `hidden` set to `true`. Fields with `hidden` set to `true` can be edited by users, but are hidden from the Admin Console Config page. For more information, see [hidden](/reference/custom-resource-config#hidden) in _Config_.

   * Write comments in the file or provide supplementary documentation to describe the following:
      * The fields that are required and optional. For any required configuration fields that do not have a default value, users must provide a value in the ConfigValues file to install the application.
      * The supported values for each configuration field. For example, for `radio` or `dropdown` fields, document each of the possible values that users can provide.
      * The supported YAML format for each value. The following table describes the supported value format for each configuration field type:

        <table>
          <tr><th>Field Type</th><th>Supported Value Format</th></tr>
          <tr><td><code>bool</code></td><td><p><code>"1"</code> specifies true and <code>"0"</code> specifies false.</p><BoolExample/></td></tr>
          <tr><td><code>file</code></td><td><p>A <code>filename</code> field and a Base64 encoded string of the contents of the file in the <code>value</code> field.</p><FileExample/></td></tr>
          <tr><td><code>password</code></td><td><p>A <code>valuePlaintext</code> field that contains the password in plain text. KOTS encrypts any values in <code>valuePlaintext</code> fields during installation.</p><PasswordExample/></td></tr>
          <tr><td><code>radio</code> and <code>dropdown</code></td><td><p>The <code>value</code> must match the name of one of the nested items for the <code>select_one</code> field as defined in the Config custom resource manifest.</p><SelectOneExample/></td></tr>
          <tr><td><code>text</code></td><td><p>Plain text in the <code>value</code> field.</p><TextExample/></td></tr>
          <tr><td><code>textarea</code></td><td><p>Plain text in the <code>value</code> field.</p><TextAreaExample/></td></tr>
        </table>
  
    For more information about each configuration field type in the Config custom resource, see [Config](/reference/custom-resource-config).
