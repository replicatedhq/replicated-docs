import ConfigValuesExample from "../partials/configValues/_configValuesExample.mdx"
import BoolExample from "../partials/configValues/_boolExample.mdx"
import FileExample from "../partials/configValues/_fileExample.mdx"
import PasswordExample from "../partials/configValues/_passwordExample.mdx"
import SelectOneExample from "../partials/configValues/_selectOneExample.mdx"
import TextExample from "../partials/configValues/_textExample.mdx"
import TextAreaExample from "../partials/configValues/_textareaExample.mdx"

# Generating a ConfigValues File

This topic describes how to generate the Replicated KOTS ConfigValues file for an application release. It also includes recommendations for how to prepare a sample ConfigValues file to be shared with your users.

## Overview

The KOTS ConfigValues file includes the fields that are defined in the KOTS Config custom resource for an application release, along with the user-supplied and default values for each field. The following is an example of a ConfigValues file:

<ConfigValuesExample/>

The ConfigValues file allows you to pass the configuration values for an application from the command line with the install command, rather than through the Admin Console UI. This supports automated or _headless_ installations, such as when installing an application as part of CI/CD pipelines. 

For more information about installing from the command line, see [Installing from the Command Line](/enterprise/installing-existing-cluster-automation).

## Get the ConfigValues File

During installation, KOTS automatically generates a ConfigValues file and saves the file in a directory called `upstream`. After installation, you can view the generated ConfigValues file in the Admin Console **View files** tab or from the command line by running the `kubectl kots get config` command.

To get the ConfigValues file from an installed application instance:

1. Install the target release in a development environment. You can either install the release with Replicated Embedded Cluster or install in an existing cluster with KOTS. For more information, see [Online Installation with Embedded Cluster](/enterprise/installing-embedded) or [Online Installation in Existing Clusters](/enterprise/installing-existing-cluster).

1. Depending on the installer that you used, do one of the following to get the ConfigValues for the installed instance:

   * **For Embedded Cluster installations**: In the Admin Console, go to the **View files** tab. In the filetree, go to **upstream > userdata** and open **config.yaml**, as shown in the image below: 

       ![ConfigValues file in the Admin Console View Files tab](/images/admin-console-view-files-configvalues.png)

       [View a larger version of this image](/images/admin-console-view-files-configvalues.png)

   * **For KOTS installations in an existing cluster**: Run the `kubectl kots get config` command to view the generated ConfigValues file:

       ```
       kubectl kots get config --namespace APP_NAMESPACE --decrypt 
       ```
       Where:
       * `APP_NAMESPACE` is the cluster namespace where KOTS is running.
       * The `--decrypt` flag decrypts all configuration fields with `type: password`. In the downloaded ConfigValues file, the decrypted value is stored in a `valuePlaintext` field.

       The output of the `kots get config` command shows the contents of the ConfigValues file. For more information about the `kots get config` command, including additional flags, see [kots get config](/reference/kots-cli-get-config).

       **Example**:

       ```bash
       kubectl kots get config --namespace namespace --decrypt
       ```
       ```bash
       apiVersion: kots.io/v1beta1
       kind: ConfigValues
       metadata:
         creationTimestamp: null
       spec:
         values:
           example_item:
             value: hello world
       ```
    
## Share a Sample ConfigValues File    

If your users will perform automated or headless installations from the command line, you can share an example of an accurate ConfigValues file that they can edit.

Before sharing a sample ConfigValues with users, Replicated recommends that you edit the sample file in the following ways:

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
