# Generate Support Bundles for Embedded Cluster

This topic describes how to generate a support bundle that includes cluster- and host-level information for [Replicated Embedded Cluster](/vendor/embedded-overview) installations.

For information about generating host support bundles for Replicated kURL installations, see [Generate Host Bundles for kURL](/vendor/support-host-support-bundles).

## Overview

Embedded Cluster includes a default support bundle spec that collects both host- and cluster-level information:

* The host-level information is useful for troubleshooting failures related to host configuration like DNS, networking, or storage problems.
* Cluster-level information includes details about the components provided by Replicated, such as the Admin Console and Embedded Cluster Operator that manage install and upgrade operations. If the cluster has not installed successfully and cluster-level information is not available, then it is excluded from the bundle.

In addition to the host- and cluster-level details provided by the default Embedded Cluster spec, support bundles generated for Embedded Cluster installations also include app-level details provided by any custom support bundle specs that you included in the application release.

## Generate a Support Bundle

### Generate a Bundle For Versions 1.17.0 and Later

For Embedded Cluster 1.17.0 and later, you can run the Embedded Cluster `support-bundle` command to generate a support bundle.

The `support-bundle` command uses the default Embedded Cluster support bundle spec to collect both cluster- and host-level information. It also automatically includes any application-specific support bundle specs in the generated bundle. 

To generate a support bundle:

1. SSH onto a controller node.

   :::note
   You can SSH onto a worker node to generate a support bundle that contains information specific to that node. However, when run on a worker node, the `support-bundle` command does not capture cluster-wide information.
   :::

1. Run the following command:

   ```bash
   sudo ./APP_SLUG support-bundle
   ```

   Where `APP_SLUG` is the unique slug for the application. 

### Generate a Bundle For Versions Earlier Than 1.17.0

For Embedded Cluster versions earlier than 1.17.0, you can generate a support bundle from the shell using the kubectl support-bundle plugin.

To generate a bundle with the support-bundle plugin, you pass the default Embedded Cluster spec to collect both cluster- and host-level information. You also pass the `--load-cluster-specs` flag, which discovers all support bundle specs that are defined in Secrets or ConfigMaps in the cluster. This ensures that any application-specific specs are also included in the bundle. For more information, see [Discover Cluster Specs](https://troubleshoot.sh/docs/support-bundle/discover-cluster-specs/) in the Troubleshoot documentation.

To generate a bundle:

1. SSH onto a controller node.

1. Use the Embedded Cluster shell command to start a shell with access to the cluster:

     ```bash
     sudo ./APP_SLUG shell
     ```
     Where `APP_SLUG` is the unique slug for the application.

     The output looks similar to the following:

    ```bash
       __4___
    _  \ \ \ \   Welcome to APP_SLUG debug shell.
    <'\ /_/_/_/   This terminal is now configured to access your cluster.
    ((____!___/) Type 'exit' (or CTRL+d) to exit.
    \0\0\0\0\/  Happy hacking.
    ~~~~~~~~~~~
    root@alex-ec-2:/home/alex# export KUBECONFIG="/var/lib/embedded-cluster/k0s/pki/admin.conf"
    root@alex-ec-2:/home/alex# export PATH="$PATH:/var/lib/embedded-cluster/bin"
    root@alex-ec-2:/home/alex# source <(kubectl completion bash)
    root@alex-ec-2:/home/alex# source /etc/bash_completion
    ```

     The appropriate kubeconfig is exported, and the location of useful binaries like kubectl and the preflight and support-bundle plugins is added to PATH.

     :::note
     The shell command cannot be run on non-controller nodes.
     :::

2. Generate the support bundle using the default Embedded Cluster spec and the `--load-cluster-specs` flag:

   ```bash
   kubectl support-bundle  --load-cluster-specs /var/lib/embedded-cluster/support/host-support-bundle.yaml
   ```