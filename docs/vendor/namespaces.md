# Application Namespaces

Replicated strongly recommends that applications are architected to deploy a single application into a single namespace when possible. 

If you are distributing your application with Replicated KOTS, you can implement an architecture in which a single application is deployed into a single namespace.

To do this, omit any namespace in the application manifests `metadata.namespace`. Do not use the Config custom resource object to make the namespace user-configurable.

When you do not specify a namespace in application manifests, the app manager process deploys to whatever namespace it is already running in. This gives the most flexibility when deploying to end user environments, as users already select the namespace where KOTS runs. Scoping to a single namespace also allows the app to run with minimal Kubernetes permissions, which can reduce friction when an application runs as a tenant in a large cluster. Overall, letting the end user manage namespaces is the easiest way to reduce friction.

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
