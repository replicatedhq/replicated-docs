# Adding Cluster Ingress Options

When delivering a configurable application, ingress can be challenging as it is very cluster specific.
Below is an example of a flexible `ingress.yaml` file designed to work in most Kubernetes clusters including existing and Kubernetes installer-created clusters.

## Example

The following example includes an Ingress resource with a single host based routing rule.
The resource will work in both existing clusters and Kubernetes installer-created clusters.

### Config

A config option `enable_ingress` has been provided to allow the end-user to choose whether or not to enable the Ingress resource.
In some clusters a custom Ingress resource may be desired — when an ingress controller is not available, other means of exposing services may be preferred.

An `annotations` text area has been made available for the end-user to add additional annotations to the ingress.
Here, cluster specific annotations can be added to support a variety of ingress controllers.
For example, when using the [ALB ingress controller](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) in AWS, it is necessary to include the `kubernetes.io/ingress.class: alb` annotation on your Ingress resource.

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: example-application
spec:
  groups:
    - name: ingress
      title: Ingress
      items:
        - name: enable_ingress
          type: bool
          title: Enable Kubernetes Ingress
          help_text: |
            When checked, deploy the provided Kubernetes Ingress resource.
          default: "1"
        - name: hostname
          type: text
          title: Hostname
          help_text: |
            Use this field to provide a hostname for your Example Application installation.
          required: true
          when: repl{{ ConfigOptionEquals "enable_ingress" "1" }}
        - name: allow_http
          type: bool
          title: Allow Unsecured Access through HTTP
          help_text: |
            Uncheck this box to disable HTTP traffic between the client and the load balancer.
          default: "1"
          when: repl{{ ConfigOptionEquals "enable_ingress" "1" }}
        - name: annotations
          type: textarea
          title: Annotations
          help_text: |
            Use this textarea to provide annotations specific to your ingress controller.
            For example, `kubernetes.io/ingress.class: alb` when using the ALB ingress controller.
          when: repl{{ ConfigOptionEquals "enable_ingress" "1" }}
```

### Ingress

For ingress, you must create two separate resources.
The first of which will be deployed to existing cluster installations, while the second will only be deployed to a Kubernetes installer-created cluster.
Both of these resources are selectively excluded with the [`exclude` annotation](packaging-include-resources).

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-application-ingress
  annotations:
    kots.io/exclude: '{{repl or (ConfigOptionEquals "enable_ingress" "1" | not) IsKurl }}'
    kubernetes.io/ingress.allow-http: '{{repl ConfigOptionEquals "allow_http" "1" }}'
    nginx.ingress.kubernetes.io/force-ssl-redirect: '{{repl ConfigOptionEquals "allow_http" "1" | not }}'
    kots.io/placeholder: repl{{ printf "'true'" }}repl{{ ConfigOption "annotations" | nindent 4 }}
spec:
  rules:
    - host: repl{{ or (ConfigOption "hostname") "~" }}
      http:
        paths:
          - path: /
            pathType: ImplementationSpecific
            backend:
              service:
                name: nginx
                port:
                  number: 80
```

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-application-ingress-embedded
  annotations:
    kots.io/exclude: '{{repl or (ConfigOptionEquals "enable_ingress" "1" | not) (not IsKurl) }}'
    kubernetes.io/ingress.allow-http: '{{repl ConfigOptionEquals "allow_http" "1" }}'
    nginx.ingress.kubernetes.io/force-ssl-redirect: '{{repl ConfigOptionEquals "allow_http" "1" | not }}'
    kots.io/placeholder: repl{{ printf "'true'" }}repl{{ ConfigOption "annotations" | nindent 4 }}
spec:
  tls:
    - hosts:
        - repl{{ ConfigOption "hostname" }}
      secretName: kotsadm-tls
  rules:
    - host: repl{{ ConfigOption "hostname" }}
      http:
        paths:
          - path: /
            pathType: ImplementationSpecific
            backend:
              service:
                name: nginx
                port:
                  number: 80
```
