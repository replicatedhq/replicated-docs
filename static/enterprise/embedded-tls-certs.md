# Update Custom TLS Certificates in Embedded Cluster Installations

This topic describes how to update custom TLS certificates in Replicated Embedded Cluster installations.

## Update Custom TLS Certificates

Users can provide custom TLS certificates with Embedded Cluster installations and can update TLS certificates through the Admin Console.

:::important
Adding the `acceptAnonymousUploads` annotation temporarily creates a vulnerability for an attacker to maliciously upload TLS certificates. After TLS certificates have been uploaded, the vulnerability is closed again.

Replicated recommends that you complete this upload process quickly to minimize the vulnerability risk.
:::

To upload a new custom TLS certificate in Embedded Cluster installations:

1. SSH onto a controller node where Embedded Cluster is installed. Then, run the following command to start a shell so that you can access the cluster with kubectl:

   ```bash
   sudo ./APP_SLUG shell
   ```
   Where `APP_SLUG` is the unique slug of the installed application.

1. In the shell, run the following command to restore the ability to upload new TLS certificates by adding the `acceptAnonymousUploads` annotation:

   ```bash
   kubectl -n kotsadm annotate secret kotsadm-tls acceptAnonymousUploads=1 --overwrite
   ```

1. Run the following command to get the name of the kurl-proxy server:

   ```bash
   kubectl get pods -A | grep kurl-proxy | awk '{print $2}'
   ```
   :::note
   This server is named `kurl-proxy`, but is used in both Embedded Cluster and kURL installations.
   :::

1. Run the following command to delete the kurl-proxy pod. The pod automatically restarts after the command runs.

   ```bash
   kubectl delete pods PROXY_SERVER
   ```

   Replace `PROXY_SERVER` with the name of the kurl-proxy server that you got in the previous step.

1. After the pod has restarted, go to `http://<ip>:30000/tls` in your browser and complete the process in the Admin Console to upload a new certificate.