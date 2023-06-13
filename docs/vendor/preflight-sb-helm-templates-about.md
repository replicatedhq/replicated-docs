# About Helm Templates

You can use Helm templates to configure collectors and analyzers for preflight checks and support bundles for Helm installations.

Helm templates can be useful when you need to:

- Run preflight checks based on certain conditions being true or false, such as the customer wants to use an external database.
- Pull in user-specific information from the values.yaml file, such as the version a customer is using for an external database.

## Example

In the following example, the `mysql` collector is included in a preflight check if the customer does not want to use the default MariaDB. This is indicated by the template `{{- if eq .Values.global.mariadb.enabled false -}}`.

This specification also takes the MySQL connection string information from the `values.yaml` file, indicated by the template `'{{ .Values.global.externalDatabase.user }}:{{ .Values.global.externalDatabase.password }}@tcp({{ .Values.global.externalDatabase.host }}:{{ .Values.global.externalDatabase.port }})/{{ .Values.global.externalDatabase.database }}?tls=false'` in the `uri` field.

Additionally, the specification verifies the maximum number of nodes in the `values.yaml` file is not exceeded by including the template `'count() > {{ .Values.global.maxNodeCount }}'` for the `nodeResources` analyzer.

```yaml
{{- define "myApplication.preflights" -}}
troubleshoot:
  preflights:
    myPreflightSpec:  # arbitrary name for your custom spec
        enabled: true
{{- if eq .Values.global.mariadb.enabled false -}}
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
                   message: You have the correct number of nodes
         - clusterVersion:
             outcomes:
               - fail:
                   when: "< 1.16.0"
                   message: The application requires at least Kubernetes 1.16.0, and recommends 1.18.0.
                   uri: https://kubernetes.io
               - warn:
                   when: "< 1.18.0"
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

{{- $_ := mergeOverwrite .Values (include "myApplication.preflights" . | fromYaml) -}}
```