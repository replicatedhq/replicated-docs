import ItemTypes from "../partials/config/_item-types.mdx"
import PropertyWhen from "../partials/config/_property-when.mdx"

# Config

The Config custom resource can be provided by a vendor to specify a Config page in the Replicated admin console for collecting customer supplied values and template function rendering.

The settings that appear on the admin console Config page are specified as an array configuration _groups_ and _items_.

The following example shows three groups defined in the Config custom resource manifest file, and how these groups are displayed on the admin console Config page.

For more information about the properties of groups and items, see [Group Properties](#group-properties) and [Item Properties](#item-properties) below.

```yaml
spec:
  groups:
    - name: example_group
      title: First Group
      description: This is descriptive help text.
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: bool
        default: "0"
    - name: example_group_2
      title: Second Group
      description: This is descriptive help text.
      when: false
      items:
      - name: key
        title: Key
        type: textarea
        props:
          rows: 8
      - name: hostname
        title: Hostname
        type: text  
    - name: example_group_3
      title: Third Group
      description: This is descriptive help text.
      items:
      - name: email-address
        title: Email Address
        type: text  
      - name: password_text
        title: Password
        type: password
        value: "{{repl RandomString 10}}"     
```
![Three groups of items on the config page](/images/config-screen-groups.png)
[View a larger version of this image](/images/config-screen-groups.png)

## Group Properties

Groups have a `name`, `title`, `description` and an array of `items`.

### `name`

A unique identifier for the group.

```yaml
spec:
  groups:
    # The name must be unique
    - name: example_group
      title: First Group
      description: This is descriptive help text.
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: bool
        default: "0"
```

### `title`

The title of the group that displays on the admin console Config page.

```yaml
spec:
  groups:
    - name: example_group
    # First Group is the heading that appears on the Config page
      title: First Group
      description: This is descriptive help text.
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: bool
        default: "0"
```

### `description`

Descriptive help text for the group that displays on the admin console Config page. Supports markdown formatting.

To provide help text for individual items on the Config page, use the item `help-text` property. See [help_text](#help_text) below.

```yaml
spec:
  groups:
    - name: example_group
      title: First Group
      # Provide a description of the input fields in the group
      description: Select whether or not to enable HTTP.
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: bool
        default: "0"
```

### `when`

<PropertyWhen/>

```yaml
spec:
  groups:
    - name: example_group
      title: First Group
      description: This is descriptive help text.
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: bool
        default: "0"
    - name: example_group_2
      title: Second Group
      description: This is descriptive help text.
      # The group is not displayed if when is false
      when: repl{{ ConfigOptionEquals "http_enabled" "1" }}
      items:
      - name: key
        title: Key
        type: textarea
        props:
          rows: 8
      - name: hostname
        title: Hostname
        type: text  
    - name: example_group_3
      title: Third Group
      description: This is descriptive help text.
      items:
      - name: email-address
        title: Email Address
        type: text  
      - name: password_text
        title: Password
        type: password
        value: "{{repl RandomString 10}}"     
```

![Only the first and third groups appear on the config screen](/images/config-screen-group-when-false.png)
[View a larger version of this image](/images/config-screen-group-when-false.png)

### `items`

Each group contains an array of items that map to input fields on the admin console Config screen. All items have `name`, `title`, and `type` properties and belong to a single group.

For more information, see [Item Properties](#item-properties) and [Item Types](#item-types) below.

## Item Properties

Items have a `name`, `title`, `type`, and other optional properties.

### `name`

A unique identifier for the item. Each item in the Config custom resource much have a unique `name`, including items in different groups.

```yaml
items:
  # Item names must be unique both within the group and across all groups
- name: http_enabled
  title: HTTP Enabled
  type: bool
  default: "0"
```  

### `title`

The title of the item that displays on the admin console Config page.

```yaml
items:
- name: http_enabled
# HTTP Enabled is the title for the input field on the Config page
  title: HTTP Enabled
  type: bool
  default: "0"
```  

### `type`

Each item has a `type` property that defines the type of user input accepted by the field.

The following are the possible values for the `type` property:
<ItemTypes/>

For information about each type, see [Item Types](#item-types).

```yaml
items:
- name: http_enabled
  title: HTTP Enabled
  # type identifies the input type
  type: bool
  default: "0"
```  

### `default` and `value`
A default value will be applied to the ConfigOption template function when no value is specified.
If default value is not a password field, it will appear as placeholder text in the settings section of the admin console.
Default values are treated as ephemeral, which is the same behavior as the `readonly` property.
Configuration changes will re-evaluate the template expressions.

A value is data that will be overwritten by user input on non-readonly fields.  
It will appear as the HTML input value in the settings section of the admin console.

```yaml
    - name: custom_key
      title: Set your secret key for your app
      description: Paste in your Custom Key
      items:
      - name: key
        title: Key
        type: text
        value: ""
        default: change me
```

### `required`
A required field will prevent the application from starting until it has a value.
```yaml
        required: true
```

### `when`
<PropertyWhen/>

```yaml
    - name: database_settings_group
      items:
      - name: db_type
        type: select_one
        default: external
        items:
        - name: external
          title: External
        - name: embedded
          title: Embedded DB
      - name: database_host
        title: Database Hostname
        type: text
        when: '{{repl (ConfigOptionEquals "db_type" "external")}}'
      - name: database_password
        title: Database Password
        type: password
        when: '{{repl (ConfigOptionEquals "db_type" "external")}}'
```

### `recommended`
An item can be recommended.
This item will bear the tag "recommended" in the admin console.

**Note:** Only works for boolean and text field types.

```yaml
    - name: group_title
      title: Group Title
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: bool
        default: "0"
        recommended: true
```

### `hidden`
Items can be hidden. They will not be visible if hidden.
```yaml
        - name: secret_key
          title: Secret Key
          type: password
          hidden: true
          value: "{{repl RandomString 40}}"
```

When you assign a template function that generates a value to a `value` key in the Config custom resource, you can use the `readonly` and `hidden` properties to define whether or not the generated value is ephemeral or persistent between changes to the configuration settings for the application. For more information, see [RandomString](template-functions-static-context#randomstring) in _Static Context_.

### `readonly`
Items can be readonly.
```yaml
        - name: unique_id
          title: Unique ID
          type: text
          value: "{{repl RandomString 20}}"
          readonly: true
```

When you assign a template function that generates a value to a `value` key in the Config custom resource, you can use the `readonly` and `hidden` properties to define whether or not the generated value is ephemeral or persistent between changes to the configuration settings for the application. For more information, see [RandomString](template-functions-static-context#randomstring) in _Static Context_.

### `affix`
Items can be affixed left or right.
These items will appear in the admin console on the same line.
```yaml
    affix: left
```

### `help_text`
This is similar to `description` but for `items`.
This property can show a helpful message below `title`.
[Markdown](https://guides.github.com/features/mastering-markdown/) syntax is supported.
```yaml
    - name: toggles
      items:
      - name: http_enabled
        title: HTTP Enabled
        help_text: Check to enable the HTTP listener
        type: bool
```

## Item Types

The section describes each of the item types:
<ItemTypes/>

### `bool`
The `bool` input type should use a "0" or "1" to set the value
```yaml
    - name: group_title
      title: Group Title
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: bool
        default: "0"
```

![Boolean selector on the configuration screen](../../static/images/config-screen-bool.png)

### `file`
A `file` is a special type of form field that renders an [`<input type="file" />`](https://www.w3schools.com/tags/tag_input.asp) HTML element.
Only the contents of the file, not the name, are captured.
See the [`ConfigOptionData`](template-functions-config-context#configoptiondata) template function for examples on how to use the file contents in your application.

```yaml
    - name: certs
      title: TLS Configuration
      items:
      - name: tls_private_key_file
        title: Private Key
        type: file
      - name: tls_certificate_file
        title: Certificate
        type: file
```

![File input field on the configuration screen](../../static/images/config-screen-file.png)

### `heading`
The `heading` type allows you to display a group heading as a sub-element within a group.
This is useful when you would like to use a config group to group items together, but still separate the items visually.

**Note**: The `heading` item type is not supported.

```yaml
    - name: ldap_settings
      title: LDAP Server Settings
      items:
      ...
      - name: ldap_schema
        type: heading
        title: LDAP schema
      ...
```

![Heading on the configuration screen](../../static/images/config-screen-heading.png)

### `label`
The `label` type allows you to display an input label.
```yaml
    - name: email
      title: Email
      items:
      - name: email-address
        title: Email Address
        type: text
      - name: description
        type: label
        title: "Note: The system will send you an email every hour."
```
![Email address label on the configuration screen](../../static/images/config-screen-label.png)

### `password`
The `password` type is a text field that hides the character input.

```yaml
    - name: password_text
      title: Password Text
      type: password
      value: "{{repl RandomString 10}}"
```

![Password text field on the configuration screen](../../static/images/config-screen-password.png)

### `select_one`
The `select_one` type is a special case.
This type must have nested items that act as options.
This type is displayed as radio buttons in the admin console.

```yaml
    - name: authentication
      title: Authentication
      description: ""
      items:
      - name: authentication_type
        default: authentication_type_anonymous
        type: select_one
        items:
        - name: authentication_type_anonymous
          title: Anonymous
        - name: authentication_type_password
          title: Password
```

![Select one field on the configuration screen](../../static/images/config-screen-selectone.png)

### `text`
A `text` input field allows users to enter a string value.
Optionally, all additional properties are available for this input type.

```yaml
    - name: example_text_input
      title: Example Text Input
      type: text
```

![Text field on the configuration screen](../../static/images/config-screen-text.png)

### `textarea`
A `textarea` can specify a `props` that will map into the HTML element directly.
Examples of available properties are `rows`, `cols` and `wrap`.
For more information, see [HTML `<textarea/>` Tag](https://www.w3schools.com/tags/tag_textarea.asp).

```yaml
    - name: custom_key
      title: Set your secret key for your app
      description: Paste in your Custom Key
      items:
      - name: key
        title: Key
        type: textarea
        props:
          rows: 8
      - name: hostname
        title: Hostname
        type: text
```
![Text area field on the configuration screen](../../static/images/config-screen-textarea.png)



## Repeatable Items

A repeatable config item copies a YAML array entry or YAML document for as many values as are provided. Any number of values can be added to a repeatable item to generate additional copies.

**Note**: Repeatable Items only work for text, textarea, and file types.

To make an item repeatable, set `repeatable` to true
```yaml
    - name: ports
      items:
      - name: service_port
        title: Service Port
        type: text
        repeatable: true
```

Repeatable items do not use the `default` or `value` fields, but instead a `valuesByGroup` field.
`valuesByGroup` should have an entry for the parent Config Group name, with all default `key:value` pairs nested in the group.  At least one default entry is required for the repeatable item.
```yaml
    valuesByGroup:
      ports:
        port-default-1: "80"
```

### Template Targets

Repeatable items require at least 1 `template` to be provided.  The `template` defines a YAML target in the manifest to duplicate for each repeatable item.

Required fields for a template target are `apiVersion`, `kind`, and `name`.

`namespace` is an optional template target field to match a yaml document's `metadata.namespace` property, in case the same filename is used across multiple namespaces.

The entire YAML node at the target will be duplicated, including nested fields.

The `yamlPath` field of the `template` must denote index position for arrays using square brackets.  For example, `spec.ports[0]` to select the first port entry for duplication.  All duplicate YAML will be appended to the final array in the `yamlPath`.

`yamlPath` **must** end with an array.
```yaml
    templates:
    - apiVersion: v1
      kind: Service
      name: my-service
      namespace: my-app
      yamlPath: 'spec.ports[0]'
```

If the `yamlPath` field is not present, the entire YAML document matching the `template` will be replaced with a copy for each of the repeatable item entries.  The `metadata.name` field of the new doc will reflect the repeatable item `key`.

### Templating

The repeat items are called with the delimeters `repl[[ .itemName ]]` or `[[repl .itemName ]]`.  These delimiters can be placed anywhere inside of the `yamlPath` target node.
```yaml
    - port: repl{{ ConfigOption "[[repl .service_port ]]" | ParseInt }}
      name: '[[repl .service_port ]]'
```
This repeatable templating is not compatible with sprig templating functions.  It is designed for inserting repeatable `keys` into the manifest. Repeatable templating **can** be placed inside of Replicated config templating.

### Ordering

Repeatable templates are processed before config template rendering.

Repeatable items are processed in order of the template targets in the Config Spec file.  Effectively, this ordering is from the top of the Config Spec, by Config Group, by Config Item, and then by template target.

```yaml
    - name: ports
      items:
      - name: service_port
        title: Service Port
        type: text
        repeatable: true
        templates:
        - apiVersion: v1 #processed first
          kind: Service
          name: my-service
          namespace: my-app
          yamlPath: 'spec.ports[0]'
        - apiVersion: v1 #processed second
          kind: Service
          name: my-service
          namespace: my-app
        {other item properties ...}
      - name: other_ports
        title: Other Service Port
        type: text
        repeatable: true
        templates:
        - apiVersion: v1 #processed third
          kind: Service
          name: my-other-service
          namespace: my-app
        {other item properties ...}
    - name: deployments
      items:
      - name: deployment-name
        title: Deployment Names
        type: text
        repeatable: true
        templates:
        - apiVersion: apps/v1 #processed fourth
          kind: Deployment
          name: my-deployment
          namespace: my-app
        {other item properties ...}
```

## Repeatable Examples

In these examples, the default service port of "80" is included with the release. Port 443 is added as an additional port on the admin console configuration page, which is stored in the ConfigValues file.
### Repeatable Item Example for a YamlPath
**Config custom resource manifest file**
```yaml
    - name: ports
      items:
      - name: service_port
        title: Service Port
        type: text
        repeatable: true
        templates:
        - apiVersion: v1
          kind: Service
          name: my-service
          namespace: my-app
          yamlPath: spec.ports[0]
        valuesByGroup:
          ports:
            port-default-1: "80"
```

**Config values**
```yaml
apiVersion: kots.io/v1beta1
kind: ConfigValues
metadata:
  name: example_app
spec:
  values:
    port-default-1:
      repeatableItem: service_port
      value: "80"
    service_port-8jdn2bgd:
      repeatableItem: service_port
      value: "443"
```

**Template manifest**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: my-app
spec:
  type: NodePort
  ports:
  - port: repl{{ ConfigOption "[[repl .service_port ]]" | ParseInt }}
    name: '[[repl .service_port ]]'
  selector:
    app: repeat_example
    component: my-deployment
```

**After repeatable config processing**

**Note**: this phase is internal to configuration rendering for the app manager. This example is only provided to further explain the templating process.*
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: my-app
spec:
  type: NodePort
  ports:
  - port: repl{{ ConfigOption "port-default-1" | ParseInt }}
    name: 'port-default-1'
  - port: repl{{ ConfigOption "service_port-8jdn2bgd" | ParseInt }}
    name: 'service_port-8jdn2bgd'
  selector:
    app: repeat_example
    component: my-deployment
```

**Resulting manifest**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: my-app
spec:
  type: NodePort
  ports:
  - port: 80
    name: port-default-1
  - port: 443
    name: service_port-8jdn2bgd
  selector:
    app: repeat_example
    component: my-deployment
```

### Repeatable Item Example for an Entire Document
**Config spec**
```yaml
    - name: ports
      items:
      - name: service_port
        title: Service Port
        type: text
        repeatable: true
        templates:
        - apiVersion: v1
          kind: Service
          name: my-service
          namespace: my-app
        valuesByGroup:
          ports:
            port-default-1: "80"
```

**Config values**
```yaml
apiVersion: kots.io/v1beta1
kind: ConfigValues
metadata:
  name: example_app
spec:
  values:
    port-default-1:
      repeatableItem: service_port
      value: "80"
    service_port-8jdn2bgd:
      repeatableItem: service_port
      value: "443"
```

**Template manifest**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: my-app
spec:
  type: NodePort
  ports:
  - port: repl{{ ConfigOption "[[repl .service_port ]]" | ParseInt }}
  selector:
    app: repeat_example
    component: repl[[ .service_port ]]
```

**After repeatable config processing**

**Note**: this phase is internal to configuration rendering for the app manager. This example is only provided to further explain the templating process.*
```yaml
apiVersion: v1
kind: Service
metadata:
  name: port-default-1
  namespace: my-app
spec:
  type: NodePort
  ports:
  - port: repl{{ ConfigOption "port-default-1" | ParseInt }}
  selector:
    app: repeat_example
    component: port-default-1
---
apiVersion: v1
kind: Service
metadata:
  name: service_port-8jdn2bgd
  namespace: my-app
spec:
  type: NodePort
  ports:
  - port: repl{{ ConfigOption "service_port-8jdn2bgd" | ParseInt }}
  selector:
    app: repeat_example
    component: service_port-8jdn2bgd
```

**Resulting manifest**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: port-default-1
  namespace: my-app
spec:
  type: NodePort
  ports:
  - port: 80
  selector:
    app: repeat_example
    component: port-default-1
---
apiVersion: v1
kind: Service
metadata:
  name: service_port-8jdn2bgd
  namespace: my-app
spec:
  type: NodePort
  ports:
  - port: 443
  selector:
    app: repeat_example
    component: service_port-8jdn2bgd
```
