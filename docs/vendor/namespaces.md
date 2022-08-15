# Managing Application Namespaces

Replicated strongly recommends that applications are architected to deploy a single application into a single namespace when possible. 

To use an architecture in which a single application is deployed into a single namespace, if you are distributing your application with the Replicated app manager (KOTS), do not include the namespace in the application manifests. Also, do not use the Config custom resource object to make the namespace user-configurable.

When you do not specify a namespace in the application manifests, the kotsadm process deploys to whatever namepsace it is already running in. This gives the most flexibility when deploying to end user environments. This also allows you to run with minimal Kubernetes permissions, which can reduce friction when an application runs as a tenant in a large cluster. Letting the end user manage namespaces is the easiest way to reduce friction.

The following examples demonstrate the recommended approach of excluding the namespace from the application manifests, as well as the incorrect approaches of hardcoding the namespace or injecting the namespace as a user-supplied value:

**Recommended**

```yaml
# good, namespace absent
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spline-reticulator
spec:
```

**Not Recommended**

```yaml
# bad, hardcoded
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spline-reticulator
  namespace: graphviz-pro
spec:
```

```yaml
# bad, configurable
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spline-reticulator
  namespace: repl{{ ConfigOption "gv_namespace" }}
spec:
```
