import PreflightsAddAnalyzers from "../partials/preflights/_preflights-add-analyzers.mdx"
import PreflightsAddStrict from "../partials/preflights/_preflights-add-strict.mdx"


# Define Helm Preflight Checks

This topic describes the options for using preflight checks with Helm, how to define preflight hooks and weights for installing or upgrading an application, configuring preflight checks as Secrets or ConfigMaps, and example preflight specifications for different scenarios.

## About Helm Preflight Checks

You define preflight checks based on your application needs. Preflight checks are not included by default. This procedure provides a basic understanding and some key considerations to help guide you.

For Helm, preflight checks can be run in two different ways, at different times:

- Before the installation, to confirm the target cluster has the resources required for a successful install.
- During the installation, as a pre-install or pre-upgrade hook. The hook runs a Pod from the preflight image and supplies the specification to that as a Secret. The hook runs automatically immediately prior to installation.

When you supply the output of `helm template` to the preflight command as stdin, the command filters the stream and searches for the following specifications and runs them:

-  Secrets or ConfigMaps containing preflight specifications
-  Custom resources of `kind: preflight`

If you do not require the `pre-install` or `pre-upgrade` hook to run during the Helm installation, you can just specify the preflight specification as a Secret in your Helm templates to make the specification readable by the preflight binary.

For more information about specification types, see [Helm Specification Guidance](vendor/preflight-support-bundle-about#helm) in _About Preflight CHecks and Support Bundles_. 

## Using Hooks

To run a preflight check for your application during the installation, you have the option to run the checks as hooks. To add hooks to your chart, consider adding the following resources to your Helm templates:

- A Secret containing the preflight specification
- A Pod or Job definition using the preflight image, which executes the check itself
- If you want to use the output of the `clusterResources` collector, your Pod must run with some cluster privileges that might require a `serviceAccount`, `clusterRole`, and a `clusterRoleBinding`.

All the resources above must have the following annotations to mark them as a `pre-install` or `pre-upgrade` hook, and must also tell Helm whether to delete these resources after execution:

```yaml
annotations:
   "helm.sh/hook": pre-install, pre-upgrade
   "helm.sh/hook-delete-policy": before-hook-creation, hook-succeeded, hook-failed
```
You can optionally set weights to if you want the resources to be created in a specific order.

You can also wrap the pre-install hook in an `{{ if` , so that `helm install` does not run the hook unless the condition, such as a value in `values.yaml`, is `true`.

## Working Without Hooks

If you do not want to use `pre-install` or `pre-upgrade` hooks, you can create a resource that can be read from stdin and still take advantage of Helm templates.

Resource options include:

- Storing a Secret in the cluster.
- Providing a URL or a YAML file, without templating from `values.yaml`, such as a `preflight https://my-preflight.url.com`, or `preflight preflight.yaml`.
- Using a Helm template to create a Preflight custom resource, but the custom resource is not installed in the cluster. For more information about Preflight custom resource, see [Preflight and Support Bundle](/reference/custom-resource-preflight).

  The template can be wrapped in an `{{ if` so that it is only rendered when specified, such as: `helm template mychart --set renderpreflights=true --values values.yaml | preflight -`

    **Example**:

    ```yaml
    {{ if .Values.renderpreflights }}
    apiVersion: troubleshoot.sh/v1beta2
    kind: Preflight
    metadata:
    name: example
    spec:
    collectors:
    etc etc
    {{ end }}
    ```

## Define Preflight Checks as Secrets

The preflight checks you run are dependent on your application needs. This procedure gives some guidance about how to think about using collectors and analyzers, as you design your preflight checks. For more information about defining preflight checks, see [Collecting Data](https://troubleshoot.sh/docs/collect/)
and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation.

Additionally, this procedure uses a Secret with `pre-install` and `pre-upgrade` hook and weight annotations. You can omit these annotations if you want the checks to run during installation instead or if you want to run the preflight checks before using the `helm template` command to trigger the checks before installation.

To define preflight checks as a Secret:

1. Create a Secret specification (`kind: Secret`). Alternatively, you can use a ConfigMap (`kind: configMap`) if the specification will not collect private information from the cluster.

  You must include the following:

    - `Label` - Label the secret definition as `troubleshoot.sh/kind: preflight`
    - `stringData` - Specify a `stringData` field with a key named `preflight.yaml` so that the preflight binary can use this Secret when it runs from the CLI.

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
    name: preflight-secret
    labels:
        troubleshoot.sh/kind: preflight
    annotations:
        "helm.sh/hook": pre-install, pre-upgrade
        "helm.sh/hook-weight": "-6"
        "helm.sh/hook-delete-policy": before-hook-creation, hook-succeeded, hook-failed
    stringData:
    preflight.yaml: |-
        apiVersion: troubleshoot.sh/v1beta2
        kind: Preflight
        metadata:
        name: preflights
        spec: …
    ```
1. Add collectors to define information to be collected for analysis during the analyze phase. For example, you can collect information about the MySQL version that is running in a cluster:

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
    name: preflight-secret
    labels:
        troubleshoot.sh/kind: preflight
    annotations:
        "helm.sh/hook": pre-install, pre-upgrade
        "helm.sh/hook-weight": "-6"
        "helm.sh/hook-delete-policy": before-hook-creation, hook-succeeded, hook-failed
    stringData:
    preflight.yaml: |-
        apiVersion: troubleshoot.sh/v1beta2
        kind: Preflight
        metadata:
        name: preflights
        spec:
            collectors:
            - mysql:
                collectorName: mysql
                uri: 'repl{{ ConfigOption "db_user" }}:repl{{ConfigOption "db_password" }}@tcp(repl{{ ConfigOption "db_host" }}:repl{{ConfigOption "db_port" }})/repl{{ ConfigOption "db_name" }}'
    ```
    Replicated recommends replacing using a template function for the URI to avoid exposing sensitive information. For more information about template functions, see [About Template Functions](/reference/template-functions-about).

1. <PreflightsAddAnalyzers/>

1. <PreflightsAddStrict/>

    The following example shows a strict analyzer for MySQL versions:

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
    name: preflight-secret
    labels:
        troubleshoot.sh/kind: preflight
    annotations:
        "helm.sh/hook": pre-install, pre-upgrade
        "helm.sh/hook-weight": "-6"
        "helm.sh/hook-delete-policy": before-hook-creation, hook-succeeded, hook-failed
    stringData:
    preflight.yaml: |-
        apiVersion: troubleshoot.sh/v1beta2
        kind: Preflight
        metadata:
        name: preflights
        spec:
            collectors:
            - mysql:
                collectorName: mysql
                uri: 'repl{{ ConfigOption "db_user" }}:repl{{ConfigOption "db_password" }}@tcp(repl{{ ConfigOption "db_host" }}:repl{{ConfigOption "db_port" }})/repl{{ ConfigOption "db_name" }}'
            analyzers:
            - mysql:
                strict: true
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
1. Test your preflight checks in a development environment.

## Examples

### Pod Definition

The following Pod Definition example show the use of `pre-install` and `pre-upgrade` hooks.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: preflight-check
  annotations:
    "helm.sh/hook": pre-install, pre-upgrade
    "helm.sh/hook-delete-policy": before-hook-creation, hook-succeeded, hook-failed
spec:
  restartPolicy: Never
  volumes:
    - name: preflights
      secret:
        secretName: preflight-secret
  containers:
    - name: pre-install-job
      image:  replicated/preflight:latest
      command:
        - "preflight"
        - "--interactive=false"
        - "/preflights/preflight.yaml"
      volumeMounts:
        - name: preflights
          mountPath: /preflights
```

### ClusterRole

The following example shows RBAC settings for `ClusterRole` with preflight checks. It also shows `preflight-install` and `preflight-upgrade` hooks and weights.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: preflights-role
  annotations:
    "helm.sh/hook": pre-install, pre-upgrade
    "helm.sh/hook-weight": "-6"
    "helm.sh/hook-delete-policy": before-hook-creation, hook-succeeded, hook-failed
rules:
  - apiGroups:
      - ""
    resources:
      - "namespaces"
    verbs:
      - "get"
      - "watch"
      - "list"
  - apiGroups:
      - ""
    resources:
      - "nodes"
    verbs:
      - "get"
      - "watch"
      - "list"
  - apiGroups:
      - ""
    resources:
      - "pods"
    verbs:
      - "get"
      - "watch"
      - "list"
      - "create"
  - apiGroups:
      - "apiextensions.k8s.io"
    resources:
      - "customresourcedefinitions"
    verbs:
      - "get"
      - "watch"
      - "list"
  - apiGroups:
      - "storage.k8s.io"
    resources:
      - "storageclasses"
    verbs:
      - "get"
      - "watch"
      - "list"
  - apiGroups:
      - ""
    resources:
      - "pods/log"
    verbs:
      - "get"
      - "list"
```


### ClusterRoleBinding

The following example shows RBAC settings for `ClusterRoleBinding` with preflight checks. It also shows `preflight-install` and `preflight-upgrade` hooks and weights.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: preflights-binding
  annotations:
    "helm.sh/hook": pre-install, pre-upgrade
    "helm.sh/hook-weight": "-6"
    "helm.sh/hook-delete-policy": before-hook-creation, hook-succeeded, hook-failed
subjects:
- kind: ServiceAccount
  name: preflights-sa
  namespace: default
roleRef:
  kind: ClusterRole
  name: preflights-role
  apiGroup: rbac.authorization.k8s.io
```

### ServiceAccount Secrets

The following example shows settings for `ServiceAccount` with preflight checks as Secrets. It also shows `preflight-install` and `preflight-upgrade` hooks and weights.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: preflights-sa
  annotations:
    "helm.sh/hook": pre-install, pre-upgrade
    "helm.sh/hook-weight": "-6"
    "helm.sh/hook-delete-policy": before-hook-creation, hook-succeeded, hook-failed
secrets:
  - name: preflights-sa-secret