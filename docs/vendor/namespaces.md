# Managing Application Namespaces

It is *strongly* advised that applications be architected to deploy a single application into a single namespace when possible. This will give the most flexibility when deploying to end user environments.
If you are deploying with Replicated's App Manager (KOTS), this means leaving the namespace blank in your manifests, which will cause the `kotsadm` process to deploy to whatever namepsace it's already running in.
Most notably, it allows you to run with minimal Kubernetes permissions, which can reduce friction when an app runs as a tenant in a large cluster.
Don't specify a namespace in your YAML resources, or try to make this user-configurable using the `kots.io` `Config` object, just leave namespace blank.

Letting the end user manage namespaces is the easiest way to reduce friction.

```yaml
# good, namespace absent
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spline-reticulator
spec:
```

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
