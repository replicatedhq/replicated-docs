# Update TLS Certificates in kURL Clusters

:::note
Replicated kURL is available only for existing customers. If you are not an existing kURL user, use Replicated Embedded Cluster instead. For more information, see [Use Embedded Cluster](/vendor/embedded-overview).

kURL is a Generally Available (GA) product for existing customers. For more information about the Replicated product lifecycle phases, see [Support Lifecycle Policy](/vendor/policies-support-lifecycle).
:::

This topic describes how to upload custom TLS certificates for Replicated kURL clusters.

## Overview

For kURL clusters, the default Replicated KOTS self-signed certificate automatically renews 30 days before the expiration date.

If you have uploaded a custom TLS certificate instead, then no renewal is attempted, even if the certificate is expired. In this case, you must manually upload a new custom certificate.

For information about TLS renewal for registry and Kubernetes control plane with Replicated kURL, see [TLS Certificates](https://kurl.sh/docs/install-with-kurl/setup-tls-certs) in the kURL documentation.

## Update Custom TLS Certificates

If you are using a custom TLS certificate in a kURL cluster, you manually upload a new certificate when the previous one expires.                

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