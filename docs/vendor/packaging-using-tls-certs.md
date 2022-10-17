# Using TLS Certificates

This topic describes the Replicated app manager default self-signed certificate and how to use custom TLS certificates.

## About TLS Certificates

The Replicated app manager provides default self-signed certificate. The use of custom TLS certificates is supported.

For existing clusters, the expectation is for the end customer to bring their own Ingress Controller such as Contour or Istio and upload their own `kubernetes.io/tls` secret. For an example, see [Ingress with TLS](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls).

For Kubernetes installer clusters, vendors can provide custom TLS certificates that can be shared with other resources. For more information see [Using Kubernetes Installer TLS Certificates](#using-kubernetes-installer-tls-certificates).

## Using Kubernetes Installer TLS Certificates

If you are packaging your application with a Kubernetes installer, you can provide a custom TLS certificate. Kubernetes installer clusters create a `kotsadm-tls` secret that can reused by other Kubernetes resources, such as Deployment or Ingress, which can be easier than providing and maintaining multiple certificates.

For example, if your application does TLS termination, your deployment would need the TLS secret. Or if the application is connecting to another deployment that is also secured using the same SSL certificate (which may not be a trusted certificate), you can use the custom TLS certificate to do validation without relying on the trust chain.

### Get the TLS Secret

The Kubernetes installer sets up a Kubernetes secret called `kotsadm-tls`. The secret stores the TLS certificate, key, and hostname. Initially, the secret has an annotation set called `acceptAnonymousUploads`. This indicates that a new TLS certificate can be uploaded by the end customer during the installation process. For more information about the app manager installation, see [Completing Application Setup and Deploying](/enterprise/installing-app-setup).

Before you can reference the TLS certificate in other resources, you must get the `kotsadm-tls` secret output.

To get the `kots-adm-tls` secret, run:

```shell
kubectl get secret kotsadm-tls -o yaml
```

In the output, the `tls.crt` and `tls.key` hold the certificate and key that can be referenced in either Kubernetes resources.

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

The `kotsadm-tls` secret can be passed directly to the Ingress resource so that TLS can be terminated at the contour layer. This procedure shows how to configure `secretName: kotsadm-tls` under hosts in an Ingress resource (`kind: Ingress`):

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
**Note:** `tls.foo.com` must resolve to a valid IP, and also must match the Common Name (CN) or Subjective Alternative Name (SAN) of the TLS certificate.

## About Certificate Renewal

The app manager provides a default self-signed certificate that automatically renews.

For Kubernetes installers, the default app manager certificate automatically renews 30 days before the expiration date if the EKCO add-on is enabled with version 0.7.0 and higher. If a custom certificate has been uploaded, then no renewal is attempted, even if the certificate is expired.

For information about TLS renewal for registry and Kubernetes control plane with the Kubernetes installer, see [TLS Certificates](https://kurl.sh/docs/install-with-kurl/setup-tls-certs) in the kURL documentation.

## Updating TLS Certificates for Kubernetes Installer Clusters

After the initial certificate is uploaded with the app manager and you want to upload new TLS certificates for Kubernetes installer clusters, you must use the kubectl command-line tool.                

:::warning
Adding the `acceptAnonymousUploads` annotation temporarily creates a vulnerability for an attacker to maliciously upload TLS certificates. After TLS certificates have been uploaded, the vulnerability is closed again.

Replicated recommends that you complete this upload process quickly to minimize the vulnerability risk.
:::

Tp upload a new certificate:

1. Run the following annotation command to restore the ability to upload new TLS certificates:

  ```bash
  kubectl -n default annotate secret kotsadm-tls acceptAnonymousUploads=1 --overwrite
  ```
1. Run the following command to get the name of the kurl-proxy server:

  ```bash
  kubectl get pods -A | grep kurl-proxy | awk '{print $2}'
  ```

1. Run the following command to delete the kurl-proxy pod. The pod automatically restarts after the command runs.

  ```bash
  kubectl delete pods PROXY_SERVER
  ```

  Replace PROXY_SERVER with the name of the kurl-proxy server that you got in the previous step.

1. After the pod has restarted, direct your browser to `http://<ip>:8800/tls` and go through the upload process in the user interface.
