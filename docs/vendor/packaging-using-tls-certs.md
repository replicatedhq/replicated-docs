# Using TLS Certificates

The Replicated app manager provides default self-signed certificates that renew automatically. For Kubernetes installer clusters, the self-signed certificate renews 30 days before expiration when you enable the EKCO add-on version 0.7.0 and later.

Custom TLS options are supported:

- **Existing clusters:** The expectation is for the end customer to bring their own Ingress Controller such as Contour or Istio and upload their own `kubernetes.io/tls` secret. For an example, see [Ingress with TLS](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) in the Kubernetes documentation.

- **Kubernetes installer clusters:** End customers can upload a custom TLS certificate. The Kubernetes installer creates a TLS secret that can reused by other Kubernetes resources, such as Deployment or Ingress, which can be easier than providing and maintaining multiple certificates. As a vendor, you can enable the use of custom TLS certificates with these additional resources.

For example, if your application does TLS termination, your deployment would need the TLS secret. Or if the application is connecting to another deployment that is also secured using the same SSL certificate (which may not be a trusted certificate), the custom TLS certificate can be used to do validation without relying on the trust chain.

### Get the TLS Secret

The Kubernetes installer sets up a Kubernetes secret called `kotsadm-tls`. The secret stores the TLS certificate, key, and hostname. Initially, the secret has an annotation set called `acceptAnonymousUploads`. This indicates that a new TLS certificate can be uploaded by the end customer during the deployment process. For more information about deployment, see [Completing Application Setup and Deploying](/enterprise/installing-app-setup).

Before you can reference the TLS certificate in other resources, you must get the `kotsadm-tls` secret output.

To get the `kots-adm-tls` secret, run:

```shell
kubectl get secret kotsadm-tls -o yaml
```

In the output, the `tls.crt` and `tls.key` hold the certificate and key that can be referenced in other Kubernetes resources.

**Example Output:**

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

### Use TLS in a Deployment Resource

This procedure shows how to reference the `kotsadm-tls` secret using an example nginx Deployment resource (`kind: Deployment`).

To use the `kotsadm-tls` secret in a Deployment resource:

1. In the Deployment YAML file, configure SSL for volumeMounts and volumes, and add the `kotsadm-tls` secret to volumes:

  **Example:**

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

1. Deploy the release, and then verify the pod deployment using the `kubectl exec` command:

  **Example:**

  ```shell
  $ export POD_NAME=nginx-<hash>
  $ kubectl exec -it ${POD_NAME} bash
  ```

1. Run the `ls` and `cat` commands to verify that the certificate and key were deployed to the specified volumeMount:

  **Example:**

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

### Use TLS in an Ingress Resource

You can add the `kotsadm-tls` secret to the Ingress resource to terminate TLS at the contour layer. The following example shows how to configure `secretName: kotsadm-tls` under the TLS `hosts` field in an Ingress resource (`kind: Ingress`):

**Example:**

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
:::note
`tls.foo.com` must resolve to a valid IP, and also must match the Common Name (CN) or Subjective Alternative Name (SAN) of the TLS certificate.
:::
