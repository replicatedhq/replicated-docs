# Config

The Config custom resource can be provided by a vendor to specify a Config screen for collecting customer supplied values and template function rendering.

The Admin Console settings screen configuration is specified as an array configuration groups and items.

## Groups

Groups are comprised of a `name`, `title`, `description` and an array of items.

```yaml
spec:
  groups:
  - name: authentication
    title: Authentication
    description: Configure application authentication below.
```

**Note:** `description` is only supported in `groups`, see `help_text` property for `items`.
[Markdown](https://guides.github.com/features/mastering-markdown/) syntax is supported in this property.

A group can be hidden from customer view and made optional by setting the `when` property on the group to `false`.

## Items

Items map to input fields and belong to a single group.
All items should have `name`, `title` and `type` properties.
Specific item types can including new types.

### Available Item Types
- `bool`
- `file`
- `heading`
- `label`
- `password`
- `text`
- `textarea`
- `select_one`

## Examples

### `bool`
The `bool` input type should use a "0" or "1" to set the value
```yaml
    - name: toggles
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: bool
        default: "0"
```

### `label`
The `label` type allows you to display an input label.
```yaml
    - name: Email
      items:
      - name: email-address
        title: Email Address
        type: text
      - name: description
        type: label
        title: "Note: The system will send you an email every hour."
```

### `heading`
The `heading` type allows you to display a group heading as a subelement within a group.
This is useful when you would like to group items all in one config group but would like to separate the items visually, for instance when using a config group test proc. **Currently, the `heading` item type is not supported**
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

### `select_one`
Type `select_one` is a special case.
This type must have nested items that act as options.
This type will be displayed as radio buttons in the Admin Console.

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

## Properties

### `default` and `value`
A default value will be applied to the ConfigOption template function when no value is specified.
If default value is not a password field, it will appear as placeholder text in the settings section of the On-Prem Console.
Default values are treated as ephemeral, which is the same behavior as the `readonly` property.
Configuration changes will re-evaluate the template expressions.

A value is data that will be overwritten by user input on non-readonly fields.  
It will appear as the HTML input value in the settings section of the On-Prem Console.

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
The `when` value is used to denote conditional inputs that are only visible (or required) when the condition evaluates to true.
The `when` item can be used on groups, items and select_one options.

The settings UI will update right away when a field used in a when clause is updated (no need to save) and can be used to used to show optional config sections.
The equality check should match exactly without quotes.

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
This item will bear the tag "recommended" in the Admin Console.
**Presently only works for boolean and text field types**
```yaml
    - name: toggles
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

When used in conjunction with a function that generates a value, for example [RandomString](template-functions-static-context#randomstring)
- If set to `true`, the `value` is **persistent** between Config changes but it **cannot** be modified because its not visible in HTML.
- If not set or set to `false`, the `value` is **persistent** between Config changes. It **can** be modified because it is visible in HTML.

### `readonly`
Items can be readonly.
```yaml
        - name: unique_id
          title: Unique ID
          type: text
          value: "{{repl RandomString 20}}"
          readonly: true
```

When used in conjunction with a function that generates value, for example [RandomString](template-functions-static-context#randomstring)
- If set to `true`, the `value` is **ephemeral** between Config changes. It **cannot** be modified because it is greyed out in HTML.
- If not set or set to `false`, the `value` is **persistent** between Config changes. It **can** be modified because its not greyed out in HTML.

### `affix`
Items can be affixed left or right.
These items will appear in the Admin Console on the same line.
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


## Repeatable Items

A repeatable config item copies a YAML array entry or YAML document for as many values as are provided. Any number of values can be added to a repeatable item to generate additional copies.

**Repeatable Items presently only work for text, textarea, and file types**

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
    template:
    - apiVersion: v1
      kind: Service
      name: my-service
      namespace: my-app
      yamlPath: 'spec.ports[0]'
```

If the `yamlPath` field is blank, the entire YAML document matching the `template` will be replaced with a copy for each of the repeatable item entries.  The `metadata.name` field of the new doc will reflect the repeatable item `key`.

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
        template:
        - apiVersion: v1 #processed first
          kind: Service
          name: my-service
          namespace: my-app
          yamlPath: 'spec.ports[0]'
        - apiVersion: v1 #processed second
          kind: Service
          name: my-service
          namespace: my-app
          yamlPath:
        {other item properties ...}
      - name: other_ports
        title: Other Service Port
        type: text
        repeatable: true
        template:
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
        template:
        - apiVersion: apps/v1 #processed fourth
          kind: Deployment
          name: my-deployment
          namespace: my-app
          yamlPath:
        {other item properties ...}
```

## Repeatable Examples

In these examples, the default service port of "80" is included with the release. Port 443 is added as an additional port on the KOTS Admin Console `Config` page, which is stored in the ConfigValues file.
### Repeatable Item Example for a YamlPath
**Config spec**
```yaml
    - name: ports
      items:
      - name: service_port
        title: Service Port
        type: text
        repeatable: true
        template:
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

*Note: this phase is internal to KOTS configuration rendering. This example is only provided to further explain the templating process.*
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
        template:
        - apiVersion: v1
          kind: Service
          name: my-service
          namespace: my-app
          yamlPath: ""
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

*Note: this phase is internal to KOTS configuration rendering. This example is only provided to further explain the templating process.*
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
  - port: repl{{repl ConfigOption "service_port-8jdn2bgd" | ParseInt }}
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
