# Updating TLS Certificates on a Kubernetes Installer Cluster

For Kubernetes installer provisioned clusters, the default app manager self-signed certificate automatically renews 30 days before the expiration date.

If you have uploaded a custom TLS certificate instead, then no renewal is attempted, even if the certificate is expired. In this case, you must manually upload a new custom certificate.

For information about TLS renewal for registry and Kubernetes control plane with the Kubernetes installer, see [TLS Certificates](https://kurl.sh/docs/install-with-kurl/setup-tls-certs) in the kURL documentation.

## Update Custom TLS Certificates

If you are using a custom TLS certificate in a Kubernetes installer cluster, you manually upload a new certificate when the previous one expires.                

:::warning
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


## Update Custom PKCS #12 Certificates

If you are using a custom PKCS certificate in Kubernetes installer cluster, you can manually upload a new certificate when the previous one expires.

To upload a new custom PKCS certificate:

1. Remove the `BEGIN/END` boundaries of PKCS private key section. Remove the content including the `BEGIN/END` boundaries which looks like

```bash
-----BEGIN ENCRYPTED PRIVATE KEY-----
<truncated base64 content>
-----END ENCRYPTED PRIVATE KEY-----
```

2. Run the following command to delete the old TLS parameters kubernetes secret.

```bash
kubectl delete secret kotsadm-tls
```

3. Allow the new kotsadm-tls to be overwritten and wait for some seconds for the secret to be created by the new kurl-proxy pod

```bash
kubectl annotate secret kotsadm-tls acceptAnonymousUploads=1 --overwrite
```

4. Visit `http://<KURL_CLUSTER_IP>:8800/tls` and upload the modified PKCS file.(with the private key removed from the file)

5. Delete KOTS admin console pod to have it recreated and using the new certificate.

```bash
kubectl delete pods -l app=kotsadm
```
