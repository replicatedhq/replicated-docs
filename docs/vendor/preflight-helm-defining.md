# Define Preflight Checks for Helm
import PreflightsAddCollectors from "../partials/preflights/_preflights-add-collectors.mdx"
import PreflightsAddAnalyzers from "../partials/preflights/_preflights-add-analyzers.mdx"
import PreflightsAddStrict from "../partials/preflights/_preflights-add-strict.mdx"

## About Helm Preflight Checks

You define preflight checks based on your application needs. Preflight checks are not included by default. This procedure provides a basic understanding and some key considerations to help guide you.

For Helm, preflight checks can be run in two different ways, at different times:

- Before the installation, to confirm the target cluster has the resources required for a successful install.
- During the installation, as a pre-install or pre-upgrade hook. The hook runs a Pod from the preflight image and supplies the specification to that as a Secret. The hook runs automatically immediately prior to installation.

When you supply the output of `helm template` to the preflight command as stdin, the command filters the stream and searches for:

-  Secrets or ConfigMaps containing preflight specifications
-  CRDs of `kind: preflight` and runs those

If you do not require the pre-install or pre-upgrade hook to run during the Helm installation, you can just specify the preflight specification as a Secret in your Helm templates to make the specification readable by the preflight binary.

## Using Hooks

To run a preflight check for your application during the installation, you have the option to run the checks as hooks. To add hooks to your chart, consider adding the following resources to your templates:

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

If you do not want to use `pre-install` or `pre-upgrade` hooks, you can create a Preflight resource that can be read from stdin and still take advantage of templating available with Helm.

Options include:

- Storing a Secret in the cluster.
- Providing a URL or a YAML file, without templating from `values.yaml`, such as a `preflight https://my-preflight.url.com`, or `preflight preflight.yaml`.
- Using a template to create the preflight specification. This is a custom resource definition (CRD), but it is not installed in the cluster. The template can be wrapped in an `{{ if` so that it is only rendered when specified. For example, to run preflights you can run `helm template mychart --set renderpreflights=true --values values.yaml | preflight -`

    For example:

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

[Placeholder] 


To define preflight checks as Secrets:

1. Create a Secret specification (`kind: Secret`). You must include the following:

    The secret definition should be labeled `troubleshoot.sh/kind: preflight`
    have data under a key named `preflight.yaml` so that the preflight binary can also use this secret when run from the CLI.

    The following example shows pre-install and pre-upgrade hooks and weights, which can be omitted if you want the checks to run during installation instead:

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
  


1. <PreflightsAddCollectors/>

1. <PreflightsAddAnalyzers/>

1. <PreflightsAddStrict/>


For more information about defining preflight checks, see [Collecting Data](https://troubleshoot.sh/docs/collect/) and [Analyzing Data](https://troubleshoot.sh/docs/analyze/) in the Troubleshoot documentation. 

For basic examples of checking CPU, memory, and disk capacity, see [Node Resources Analyzer](https://troubleshoot.sh/reference/analyzers/node-resources/) in the Troubleshoot documentation.

## Examples

### Pod Definition

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

### RBAC Settings

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
---
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


---
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
````