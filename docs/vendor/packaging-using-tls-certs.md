# Using TLS Certificates

Embedded [kURL](https://kurl.sh) clusters create a `kotsadm-tls` secret which can reused by other Kubernetes resources.

### Verify TLS Secret

Output the `kotsadm-tls` secret

```shell
kubectl get secret kotsadm-tls -o yaml
```

In the output the `tls.crt` and `tls.key` hold the certificate and key, respectively, which can be referenced in either a ` Deployment` or `Ingress` resource.

```yaml
apiVersion: v1
kind: Secret
type: kubernetes.io/tls
metadata:
  name: kotsadm-tls
data:
  tls.crt: <base64_encoded>
  tls.key: <base64_encoded>
```

### Deployment

Below is an example of how to use `kotsadm-tls` in a `Deployment` resource.

```yaml
apiVersion:  apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  template:
    spec:
      containers:
        volumeMounts:
          - mountPath: "/etc/nginx/ssl"
            name: nginx-ssl
            readOnly: true
      volumes:
        - name: nginx-ssl
          secret:
            secretName: kotsadm-tls
```

Deploy the release and `exec` into the pod to verify

```shell
$ export POD_NAME=nginx-<hash>
$ kubectl exec -it ${POD_NAME} bash
```

Run `ls` and `cat` to verify

```shell
$ ls /etc/nginx/ssl
tls.crt tls.key

$ cat /etc/nginx/ssl/tls.crt
-----BEGIN CERTIFICATE-----
MIID8zCCAtugAwIBAgIUZF+NWHnpJCt2R1rDUhYjwgVv72UwDQYJKoZIhvcNAQEL

$ cat /etc/nginx/ssl/tls.key
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyiGNuHw2LY3Rv
```

### Ingress

Another way `kotsadm-tls` secret can be used is by passing it directly to the `Ingress` resource so TLS can be terminated at the contour layer.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginx
spec:
  rules:
  tls:
    - hosts:
      - 'tls.foo.com'
        secretName: kotsadm-tls
  - host: tls.foo.com
    http:
      paths:
        - path: /
          backend:
            serviceName: nginx
            servicePort: 80
```
**Note:** `tls.foo.com` must resolve to a valid IP and must also match the CN or Subjective Alternative Name (SAN) of the TLS cert.

### Updating Certs

When certs expire they can be reuploaded, here are the instructions on [Uploading new TLS Certs](https://kurl.sh/docs/install-with-kurl/setup-tls-certs#uploading-new-tls-certs).

### Existing Cluster

The expectation when using an existing cluster is for the end customer to bring their own Ingress Controller such as Contour or Istio and upload their own `kubernetes.io/tls` secret.
Here is an [Ingress with TLS](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) example.
