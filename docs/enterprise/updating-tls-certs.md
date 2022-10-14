## About Certificate Renewal

The app manager provides a default self-signed certificate that automatically renews.

For Kubernetes installers, the default app manager certificate automatically renews 30 days before the expiration date if the EKCO add-on is enabled with version 0.7.0 and higher. If a custom certificate has been uploaded, then no renewal is attempted, even if the certificate is expired.

For information about TLS renewal for registry and Kubernetes control plane with the Kubernetes installer, see [TLS Certificates](https://kurl.sh/docs/install-with-kurl/setup-tls-certs) in the kURL documentation.

## Updating New TLS Certificates

When certificates expire, they can be re-uploaded.

If you've already gone through the setup process once, and you want to upload new TLS certificates, you must run this command to restore the ability to upload new TLS certificates.               

:::warning
Adding the `acceptAnonymousUploads` annotation temporarily creates a vulnerability for an attacker to maliciously upload TLS certificates. After TLS certificates have been uploaded, the vulnerability is closed again.

Replicated recommends that you complete this upload process quickly to minimize the vulnerability risk.
:::

`kubectl -n default annotate secret kotsadm-tls acceptAnonymousUploads=1 --overwrite`


After adding the annotation, you must restart the kurl proxy server. The simplest way is to delete the kurl-proxy pod (the pod will automatically get restarted):

`kubectl delete pods PROXY_SERVER`

The following command should provide the name of the kurl-proxy server:

`kubectl get pods -A | grep kurl-proxy | awk '{print $2}'`

After the pod has been restarted direct your browser to `http://<ip>:8800/tls` and run through the upload process as described above.
