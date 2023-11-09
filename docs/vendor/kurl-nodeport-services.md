# Expose Services Using NodePorts

This topic describes how to create a NodePort service for exposing additional services in embedded cluster installations with kURL.

## Overview

Unlike installations into existing clusters, KOTS does _not_ automatically open the port forward tunnel for installations in embedded clusters provisioned on VMs or bare metal servers by kURL. This is because it cannot be verified that the ports are secure and authenticated.

For more information about KOTS port forwarding for existing cluster installations, see [Port Forwarding Services with KOTS](admin-console-port-forwarding).

To make the admin console accessible in embedded cluster installations, the admin console is created as a NodePort service so it can be accessed at the node's IP address on port 8800. The UIs of Prometheus, Grafana, and Alertmanager are also exposed using NodePorts.

For each additional service that you want to expose for embedded cluster installations with kURL, Replicated recommends that you configure a NodePort type service to allow users to access the service from their local machine outside the cluster.

For more information about working with the NodePort service type, see [type: NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport) in the Kubernetes documentation.

## Create a NodePort Service

For example, a release contains the following `sentry` service with `type: ClusterIP`: 

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sentry
  labels:
    app: sentry
spec:
  type: ClusterIP
  ports:
  - port: 9000
    targetPort: 9000
    protocol: TCP
    name: sentry
  selector:
    app: sentry
    role: web
```

To add a NodePort service for embedded cluster installations given the ClusterIP specification above:

1. Add a separate specification for the `sentry` service with `type: NodePort` and `annotation.kots.io/when: "{{repl IsKurl}}"`:

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: sentry
    labels:
      app: sentry
  annotations:
  # This annotation prevents the NodePort service from being created in non-kURL clusters
    kots.io/when: "{{repl IsKurl}}"
  spec:
    type: NodePort
    ports:
    - port: 9000
      targetPort: 9000
      nodePort: 9000
      protocol: TCP
      name: sentry
    selector:
      app: sentry
      role: web
  ```

  This creates a NodePort service _only_ when installing in embedded clusters with kURL. For more information about using the `kots.io/when` annotation, see [Conditionally Including or Excluding Resources](/vendor/packaging-include-resources). For more information about the IsKurl template fuction, see [IsKurl](/reference/template-functions-static-context#iskurl) in _Static Context_.

1. To ensure that the ClusterIP type service is only created in existing cluster installations, add `annotations.kots.io/when: "{{repl not IsKurl}}"` to the ClusterIP specification:

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: sentry
    labels:
      app: sentry
    annotations:
    # This annotation prevents the ClusterIP service from being created in kURL clusters
      kots.io/when: "{{repl not IsKurl}}"
  spec:
    type: ClusterIP
    ports:
    - port: 9000
      targetPort: 9000
      protocol: TCP
      name: sentry
    selector:
      app: sentry
      role: web
  ```

1. Add port 9000 to the KOTS Application custom resource, as described in [Add Ports to the `ports` Key](#ports-key) above.