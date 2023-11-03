import PreflightsAddAnalyzers from "../partials/preflights/_preflights-add-analyzers.mdx"
import PreflightsSpecLocations from "../partials/preflights/_preflights-spec-locations.mdx"
import PreflightsAbout from "../partials/preflights/_preflights-about.mdx"
import PreflightsDefine from "../partials/preflights/_preflights-define.mdx"
import PreflightsDefineXref from "../partials/preflights/_preflights-define-xref.mdx"
import PreflightsCrNote from "../partials/preflights/_preflights-cr-note.mdx"
import AnalyzersNote from "../partials/preflights/_analyzers-note.mdx"
import RedactorsAbout from "../partials/redactors/_redactors-about.mdx"
import PreflightSbHelmTemplates from "../partials/preflights/_preflight-sb-helm-templates.mdx"
import ConfigmapNote from "../partials/support-bundles/_configmap-note.mdx"

# Define Preflight Checks for Helm Charts

This topic provides a basic understanding and some key considerations about preflight checks for Helm charts with KOTS and Helm installations, and to help guide you in defining them for your application.

:::note
A KOTS entitlement is required to create KOTS releases.
:::

## About Preflight Checks for Helm Charts

<PreflightsAbout/>

Preflight checks are not included by default, so you must enable them.

For KOTS installations, preflight checks run automatically during installation. For Helm CLI installations, preflight checks run when the user runs a `helm template` command before they install the application. For more information, see [Running Preflight Checks for Helm Installations](preflight-running).

## Choose an Input Kind

You run preflight checks with the open source preflight kubectl plugin. For information about the preflight plugin, see [Getting Started](https://troubleshoot.sh/docs/) in the open source Troubleshoot documentation.

The plugin requires a preflight check specification as input. For Helm installations, this specification is provided by running `helm template` to produce a stream of stdout and piping the result to `preflight -`. The preflight plugin automatically finds and runs preflight specifications by filtering the stream of stdout. For KOTS installations, KOTS v1.101.0 and later automatically looks for preflights specified in the Helm chart archive.

You can define preflight check specifications in the following input kinds:

-  Kubernetes Secret or ConfigMap
-  Troubleshoot Preflight custom resource (`apiVersion: troubleshoot.sh/v1beta2` and `kind: Preflight`)

All of these input options allow customization of preflight checks based on values unique to the customer using Helm templates and conditional statements.

### Create a Secret (Recommended)

Replicated recommends writing your preflight checks specification in one or more Secrets. Using Secrets protects secure information in a cluster.

<ConfigmapNote/>

To create a Secret for the preflight checks specification:

1. Create a Secret as a YAML file with `kind: Secret` and `apiVersion: v1`. The Secret must include the following:

    - The label `troubleshoot.sh/kind: preflight`
    - A `stringData` field with a key named `preflight.yaml` so that the preflight binary can use this Secret when it runs from the CLI

    **Template:**

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      labels:
        troubleshoot.sh/kind: preflight
      name: "{{ .Release.Name }}-preflight-config"
    stringData:
      preflight.yaml: |
        apiVersion: troubleshoot.sh/v1beta2
        kind: Preflight
        metadata:
          name: preflight-sample
        spec:
          collectors: []
          analyzers: []
    ```

1. Add the Secret to your Helm chart `templates/` directory.    

Next, define the preflight checks specification by adding collectors and analyzers. For more information, see [Define the Preflight Checks Specification](#preflights).

### Create a Preflight Custom Resource

The Preflight custom resource lets you provide preflight checks in a Helm template without using `stringData`. If you use this input kind, you must use conditional statements because the custom resource definition is not installed in the cluster.

<PreflightsCrNote/>

To define a Preflight custom resource as a template:

1. Create a Preflight custom resource YAML file using `kind: Preflight`. Wrap the custom resource template in an `{{ if` so that it is only rendered when specified in the `values.yaml` file or on the Helm CLI.

    **Example**:

    ```yaml
    {{ if .Values.renderpreflights }}
    apiVersion: troubleshoot.sh/v1beta2
    kind: Preflight
    metadata:
      name: example-name
    spec:
      collectors: []
      analyzers: []
    {{ end }}
    ```

1. Configure your `values.yaml` file to enable the Preflight custom resource.

    **Example:**

    ```yaml
    renderpreflights: true
    ```

Next, define the preflight checks specification by adding collectors and analyzers. Optionally, you can add to the default redactors. For more information, see [Define the Preflight Checks Specification](#preflights).

## Define the Preflight Checks Specification {#preflights}

<PreflightsDefine/>

<PreflightsDefineXref/>

<PreflightSbHelmTemplates/>


### Collectors

Add collectors to define information to be collected for analysis during the analyze phase. For example, you can collect information about the MySQL version that is running in a cluster:

```yaml
spec:
      {{ if eq .Values.global.mariadb.enabled false }}
      collectors:
        - mysql:
            collectorName: mysql
            uri: '{{ .Values.global.externalDatabase.user }}:{{ .Values.global.externalDatabase.password }}@tcp({{ .Values.global.externalDatabase.host }}:{{ .Values.global.externalDatabase.port }})/{{ .Values.global.externalDatabase.database }}?tls=false'
      {{ end }}
```

A Helm template is used for the URI field to avoid exposing sensitive information. The Helm template maps to the `values.yaml` file to populate the connection string for the MySQL database.

<PreflightsDefineXref/>

### Analyzers

<PreflightsAddAnalyzers/>

The following example shows an analyzer for the MySQL collector above. This analyzer specifies a `fail` outcome if the MySQL version is less than the minimum required. Then, specify a message to display that informs your customer of the reasons for the failure and steps they can take to fix the issue.

```yaml
spec:
  collectors:
  - mysql:
      collectorName: mysql
      uri: '{{ .Values.global.externalDatabase.user }}:{{ .Values.global.externalDatabase.password }}@tcp({{ .Values.global.externalDatabase.host }}:{{ .Values.global.externalDatabase.port }})/{{ .Values.global.externalDatabase.database }}?tls=false'
  analyzers:
  - mysql:
      checkName: Must be MySQL 8.x or later
      collectorName: mysql
      outcomes:
      - fail:
          when: connected == false
          message: Cannot connect to MySQL server
      - fail:
          when: version < 8.x
          message: The MySQL server must be at least version 8
      - pass:
          message: The MySQL server is ready
```
<PreflightsDefineXref/>

<AnalyzersNote/>

## Example

The following example shows a preflight specification in a Secret for a Helm installation. For more examples, see the [Troubleshoot example repository](https://github.com/replicatedhq/troubleshoot/tree/main/examples/preflight) in GitHub.

<PreflightsDefineXref/>

```yaml
apiVersion: v1
kind: Secret
metadata:
  labels:
    troubleshoot.sh/kind: preflight
  name: "{{ .Release.Name }}-preflight-config"
stringData:
  # This is the preflight spec that will be used to run the preflight checks
  # Note: here we demonstrate using Helm's templating to conditionally run a preflight check based on a value
  # plus getting some configuration from the local values.yaml file
  preflight.yaml: |
    apiVersion: troubleshoot.sh/v1beta2
    kind: Preflight
    metadata:
      name: preflight-sample
    spec:
      {{ if eq .Values.global.mariadb.enabled false }}
      collectors:
        - mysql:
            collectorName: mysql
            uri: '{{ .Values.global.externalDatabase.user }}:{{ .Values.global.externalDatabase.password }}@tcp({{ .Values.global.externalDatabase.host }}:{{ .Values.global.externalDatabase.port }})/{{ .Values.global.externalDatabase.database }}?tls=false'
      {{ end }}
      analyzers:
        - nodeResources:
            checkName: Node Count Check
            outcomes:
              - fail:
                  when: 'count() > {{ .Values.global.maxNodeCount }}'
                  message: "The cluster has more than {{ .Values.global.maxNodeCount }} nodes."
              - pass:
                  message: You have the correct number of nodes.
        - clusterVersion:
            outcomes:
              - fail:
                  when: "< 1.22.0"
                  message: The application requires at least Kubernetes 1.22.0, and recommends 1.23.0.
                  uri: https://kubernetes.io
              - warn:
                  when: "< 1.23.0"
                  message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.18.0 or later.
                  uri: https://kubernetes.io
              - pass:
                  message: Your cluster meets the recommended and required versions of Kubernetes.
        {{ if eq .Values.global.mariadb.enabled false }}
        - mysql:
            checkName: Must be MySQL 8.x or later
            collectorName: mysql
            outcomes:
              - fail:
                  when: connected == false
                  message: Cannot connect to MySQL server
              - fail:
                  when: version < 8.x
                  message: The MySQL server must be at least version 8
              - pass:
                  message: The MySQL server is ready
        {{ end }}
```

## Next Step

Test your preflight checks in a development environment. For more information, see [Running Helm Preflight Checks](preflight-running).


