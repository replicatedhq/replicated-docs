# Deleting the Admin Console and Removing Applications

This topic describes how to remove installed applications and delete the Replicated Admin Console from a cluster. See the following sections:
* [Remove an Application](#remove-an-application)
* [Delete the Admin Console](#delete-the-admin-console)

## Remove an Application

The Replicated KOTS CLI `kots remove` command removes the reference to an installed application from the Admin Console. When you use `kots remove`, the Admin Console no longer manages the application because the record of that application’s installation is removed. This means that you can no longer manage the application through the Admin Console or through the KOTS CLI.

By default, `kots remove` does not delete any of the installed Kubernetes resources for the application from the cluster. To remove both the reference to an application from the Admin Console and remove any resources for the application from the cluster, you can run `kots remove` with the `--undeploy` flag.

It can be useful to remove only the reference to an application from the Admin Console if you want to reinstall the application, but you do not want to recreate the namespace or other Kubernetes resources. For example, if you installed an application using an incorrect license file and need to reinstall with the correct license.
 
To remove an application:

1. Run the following command to list the installed applications for a namespace:
   ```
   kubectl kots get apps -n NAMESPACE
   ```
   Replace `NAMESPACE` with the name of the namespace where the Admin Console is installed.

   In the output of this command, note the slug for the application that you want to remove.

1. Run _one_ of the following commands:

   * Remove only the reference to the application from the Admin Console: 

     ```
     kubectl kots remove APP_SLUG -n NAMESPACE
     ```
     Replace:
     * `APP_SLUG` with the slug for the application that you want to remove.
     * `NAMESPACE` with the name of the namespace where the Admin Console is installed.

   * Remove the reference to the application from the Admin Console and remove its resources from the cluster:

      ```
      kubectl kots remove APP_SLUG -n NAMESPACE --undeploy
      ```
      
   :::note
   Optionally, use the `--force` flag to remove the application reference from the Admin Console when the application has already been deployed. The `--force` flag is implied when `--undeploy` is used. For more information, see [remove](/reference/kots-cli-remove) in _KOTS CLI_.
   :::


## Delete the Admin Console

When you install an application with the Admin Console, Replicated KOTS also creates the Kubernetes resources for the Admin Console itself on the cluster. The Admin Console includes Deployments and Services, Secrets, and other resources such as StatefulSets and PersistentVolumeClaims.

By default, KOTS also creates Kubernetes ClusterRole and ClusterRoleBinding resources that grant permissions to the Admin Console on the cluster level. These `kotsadm-role` and `kotsadm-rolebinding` resources are managed outside of the namespace where the Admin Console is installed. Alternatively, when the Admin Console is installed with namespace-scoped access, KOTS creates Role and RoleBinding resources inside the namespace where the Admin Console is installed.

If you need to completely delete the Admin Console and an application installation, such as during testing, follow one of these procedures depending on the type of cluster where you installed the Admin Console:

* **Existing cluster**: Manually delete the Admin Console Kubernetes objects and resources from the cluster. See [Delete from an Existing Cluster](#existing) below.
* **Embedded cluster**: Remove Kubernetes from the VM where the cluster is installed. See [Delete from an Embedded Cluster](#embedded) below.

:::note
These procedures do not uninstall the KOTS CLI. To uninstall the KOTS CLI, see [Uninstall](https://docs.replicated.com/reference/kots-cli-getting-started#uninstall) in _Installing the KOTS CLI_.
:::

### Delete from an Existing Cluster {#existing}

In existing cluster installations, if the Admin Console is not installed in the `default` namespace, then you delete the Admin Console by deleting the namespace where it is installed. 

If you installed the Admin Console with namespace-scoped access, then the Admin Console Role and RoleBinding RBAC resources are also deleted when you delete the namespace. Alternatively, if you installed with the default cluster-scoped access, then you manually delete the Admin Console ClusterRole and ClusterRoleBindings resources from the cluster.

The application vendor can require, support, or not support namespace-scoped installations. For more information, see [supportMinimalRBACPrivileges](/reference/custom-resource-application#supportminimalrbacprivileges) and [requireMinimalRBACPrivileges](/reference/custom-resource-application#requireminimalrbacprivileges) in _Application_.

For more information about installing with cluster- or namespace-scoped access, see [RBAC Requirements](/enterprise/installing-general-requirements#rbac-requirements) in _Installation Requirements_.

To delete the Admin Console from an existing cluster:

1. Run the following command to delete the namespace where the Admin Console is installed:

   :::note
   * You cannot delete the `default` namespace.
   * This command deletes everything inside the specified namespace, including the Admin Console Role and RoleBinding resources if you installed with namespace-scoped access.
   :::

   ```
   kubectl delete ns NAMESPACE
   ```
   Replace `NAMESPACE` with the name of the namespace where the Admin Console is installed.

1. (Cluster-scoped Access Only) If you installed the Admin Console with the default cluster-scoped access, run the following commands to delete the Admin Console ClusterRole and ClusterRoleBinding from the cluster:

   ```
   kubectl delete clusterrole kotsadm-role
   ```

   ```
   kubectl delete clusterrolebinding kotsadm-rolebinding
   ```

### Delete from an Embedded Cluster {#embedded}

If you installed on a cluster created by Replicated kURL, KOTS installs the Admin Console in the `default` namespace. Kubernetes does not allow the `default` namespace to be deleted.

To delete the Admin Console from an embedded cluster, use the kURL `tasks.sh` `reset` command to remove Kubernetes from the system.

:::important
The `reset` command is intended to be used only on development servers. It has the potential to leave your machine in an unrecoverable state. It is not recommended unless you are able to discard this server and provision a new one.
:::

Instead of using the `reset` command, you can also discard your current VM (if you are using one) and recreate the VM with a new OS to reinstall the Admin Console and an application.

For more information about the `reset` command, see [Resetting a Node](https://kurl.sh/docs/install-with-kurl/managing-nodes#reset-a-node) in the kURL documentation.

To delete the Admin Console from an embedded cluster:

1. Run the following command to remove Kubernetes from the system:

   ```
   curl -sSL https://k8s.kurl.sh/latest/tasks.sh | sudo bash -s reset
   ```

1. Follow the instructions in the output of the command to manually remove any files that the `reset` command does not remove.

If the `reset` command is unsuccessful, discard your current VM, and recreate the VM with a new OS to reinstall the Admin Console and an application.  
