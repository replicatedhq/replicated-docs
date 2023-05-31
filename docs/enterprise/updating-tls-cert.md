# Updating TLS Certificates on Embedded Clusters

For embedded clusters, the default Replicated KOTS self-signed certificate automatically renews 30 days before the expiration date.

If you have uploaded a custom TLS certificate instead, then no renewal is attempted, even if the certificate is expired. In this case, you must manually upload a new custom certificate.

For information about TLS renewal for registry and Kubernetes control plane with Replicated kURL, see [TLS Certificates](https://kurl.sh/docs/install-with-kurl/setup-tls-certs) in the kURL documentation.

## Update Custom TLS Certificates

If you are using a custom TLS certificate in an embedded cluster, you manually upload a new certificate when the previous one expires.                

:::important
Adding the `acceptAnonymousUploads` annotation temporarily creates a vulnerability for an attacker to maliciously upload TLS certificates. After TLS certificates have been uploaded, the vulnerability is closed again.

Replicated recommends that you complete this upload process quickly to minimize the vulnerability risk.
:::

To upload a new custom TLS certificate:

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
