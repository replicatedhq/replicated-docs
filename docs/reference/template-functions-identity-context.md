# Identity Context

## IdentityServiceEnabled

```go
func IdentityServiceEnabled() bool
```

Returns true if the Replicated identity service has been enabled and configured by the end customer.

```yaml
apiVersion: apps/v1
kind: Deployment
...
          env:
            - name: IDENTITY_ENABLED
              value: repl{{ IdentityServiceEnabled }}
```


## IdentityServiceClientID

```go
func IdentityServiceClientID() string
```

Returns the client ID required for the application to connect to the identity service OIDC server.

```yaml
apiVersion: apps/v1
kind: Deployment
...
          env:
            - name: CLIENT_ID
              value: repl{{ IdentityServiceClientID }}
```


## IdentityServiceClientSecret

```go
func IdentityServiceClientSecret() (string, error)
```

Returns the client secret required for the application to connect to the identity service OIDC server.

```yaml
apiVersion: v1
kind: Secret
...
data:
  CLIENT_SECRET: repl{{ IdentityServiceClientSecret | b64enc }}
```


## IdentityServiceRoles

```go
func IdentityServiceRoles() map[string][]string
```

Returns a list of groups specified by the customer mapped to a list of roles as defined in the Identity custom resource manifest file.

For more information about roles in the Identity custom resource, see [Identity](custom-resource-identity#roles) in the _Custom resources_ section.

```yaml
apiVersion: apps/v1
kind: Deployment
...
          env:
            - name: RESTRICTED_GROUPS
              value: repl{{ IdentityServiceRoles | keys | toJson }}
```


## IdentityServiceName

```go
func IdentityServiceName() string
```

Returns the Service name for the identity service OIDC server.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
...
          - path: /dex
            backend:
              service:
                name: repl{{ IdentityServiceName }}
                port:
                  number: repl{{ IdentityServicePort }}
```


## IdentityServicePort

```go
func IdentityServicePort() string
```

Returns the Service port number for the identity service OIDC server.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
...
          - path: /dex
            backend:
              service:
                name: repl{{ IdentityServiceName }}
                port:
                  number: repl{{ IdentityServicePort }}
```
