# Reset a kURL Cluster

:::note
Replicated kURL is available only for existing customers. If you are not an existing kURL user, use Replicated Embedded Cluster instead. For more information, see [Use Embedded Cluster](/vendor/embedded-overview).

kURL is a Generally Available (GA) product for existing customers. For more information about the Replicated product lifecycle phases, see [Support Lifecycle Policy](/vendor/policies-support-lifecycle).
:::

This topic describes how to use the kURL `reset` command to reset a kURL cluster.

## Overview

If you need to reset a kURL installation, such as when you are testing releases with kURL, You can use the kURL `tasks.sh` `reset` command to remove Kubernetes from the system.

Alterntaively, you can discard your current VM (if you are using one) and recreate the VM with a new OS to reinstall with kURL.

For more information about the `reset` command, see [Resetting a Node](https://kurl.sh/docs/install-with-kurl/managing-nodes#reset-a-node) in the kURL documentation.

To reset a kURL installation:

1. Access the machine where you installed with kURL.

1. Run the following command to remove Kubernetes from the system:

   ```
   curl -sSL https://k8s.kurl.sh/latest/tasks.sh | sudo bash -s reset
   ```

1. Follow the instructions in the output of the command to manually remove any files that the `reset` command does not remove.

If the `reset` command is unsuccessful, discard your current VM, and recreate the VM with a new OS to reinstall the Admin Console and an application.