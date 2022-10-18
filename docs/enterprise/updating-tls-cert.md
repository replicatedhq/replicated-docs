# Updating a TLS Certificate

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
