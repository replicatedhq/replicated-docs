# About Helm Templates

You can use Helm templates to configure collectors and analyzers for preflight checks and support bundles for Helm installations.

Helm templates can be useful when you need to:

- Run preflight checks based on certain conditions being true or false, such as the customer wants to use an external database.
- Pull in user-specific information from the values.yaml file, such as the version a customer is using for an external database.

You can also use Helm templating with the Troubleshoot template functions for the `clusterPodStatuses` analyzer. For more information, see [Helm and Troubleshoot Template Example](#troubleshoot).

## Helm Template Example

In the following example, the `mysql` collector is included in a preflight check if the customer does not want to use the default MariaDB. This is indicated by the template `{{- if eq .Values.global.mariadb.enabled false -}}`.

This specification also takes the MySQL connection string information from the `values.yaml` file, indicated by the template `'{{ .Values.global.externalDatabase.user }}:{{ .Values.global.externalDatabase.password }}@tcp({{ .Values.global.externalDatabase.host }}:{{ .Values.global.externalDatabase.port }})/{{ .Values.global.externalDatabase.database }}?tls=false'` in the `uri` field.

Additionally, the specification verifies the maximum number of nodes in the `values.yaml` file is not exceeded by including the template `'count() > {{ .Values.global.maxNodeCount }}'` for the `nodeResources` analyzer.

```yaml
{{- define "preflight.spec" }}
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
              message: Your cluster meets the minimum version of Kubernetes, but we recommend you update to 1.23.0 or later.
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
{{- end }}
---
apiVersion: v1
kind: Secret
metadata:
  labels:
    app.kubernetes.io/managed-by: {{ .Release.Service | quote }}
    app.kubernetes.io/instance: {{ .Release.Name | quote }}
    app.kubernetes.io/version: {{ .Chart.AppVersion }}
    helm.sh/chart: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    troubleshoot.io/kind: preflight
  name: "{{ .Release.Name }}-preflight-config"
stringData:
  preflight.yaml: |
{{- include "preflight.spec"  . | indent 4 }}
```

## Helm and Troubleshoot Template Example {#troubleshoot}

You can also use Helm templates with the Troubleshoot template functions to automatically add the Pod name and namespace to a message when a `clusterPodStatuses` analyzer fails. For more information about the Troubleshoot template function, see [Cluster Pod Statuses](https://troubleshoot.sh/docs/analyze/cluster-pod-statuses/) in the Troubleshoot documentation.

When you add the `clusterPodStatuses` analyzer template function values (such as `{{ .Name }}`) to your Helm template, you must encapsulate the Helm template using {{ ` ` }} so that Helm does not expand it.

The following example shows an analyzer that uses Troubleshoot templates and the override for Helm:

```yaml
analyzers:
    - clusterPodStatuses:
        name: unhealthy
        namespaces:
          - default
          - myapp-namespace
        outcomes:
          - fail:
              when: "== CrashLoopBackOff"
              message: {{ `Pod {{ .Namespace }}/{{ .Name }} is in a CrashLoopBackOff state.` }}
          - fail:
              when: "== ImagePullBackOff"
              message: {{ `Pod {{ .Namespace }}/{{ .Name }} is in a ImagePullBackOff state.` }}
          - fail:
              when: "== Pending"
              message: {{ `Pod {{ .Namespace }}/{{ .Name }} is in a Pending state.` }}
          - fail:
              when: "== Evicted"
              message: {{ `Pod {{ .Namespace }}/{{ .Name }} is in a Evicted state.` }}
          - fail:
              when: "== Terminating"
              message: {{ `Pod {{ .Namespace }}/{{ .Name }} is in a Terminating state.` }}
          - fail:
              when: "== Init:Error"
              message: {{ `Pod {{ .Namespace }}/{{ .Name }} is in an Init:Error state.` }}
          - fail:
              when: "== Init:CrashLoopBackOff"
              message: {{ `Pod {{ .Namespace }}/{{ .Name }} is in an Init:CrashLoopBackOff state.` }}
          - fail:
              when: "!= Healthy" # Catch all unhealthy pods. A pod is considered healthy if it has a status of Completed, or Running and all of its containers are ready.
              message: {{ `Pod {{ .Namespace }}/{{ .Name }} is unhealthy with a status of {{ .Status.Reason }}.` }}
```