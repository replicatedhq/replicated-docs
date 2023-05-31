# Deleting the Admin Console and Removing Applications

This topic describes how to remove installed applications and delete the Replicated admin console from a cluster. See the following sections:
* [Remove an Application](#remove-an-application)
* [Delete the Admin Console](#delete-the-admin-console)

## Remove an Application

The Replicated kots CLI `kots remove` command removes the reference to an installed application from the admin console. When you use `kots remove`, the admin console no longer manages the application because the record of that application’s installation is removed. This means that you can no longer manage the application through the admin console or through the kots CLI.

By default, `kots remove` does not delete any of the installed Kubernetes resources for the application from the cluster. To remove both the reference to an application from the admin console and remove any resources for the application from the cluster, you can run `kots remove` with the `--undeploy` flag.

It can be useful to remove only the reference to an application from the admin console if you want to reinstall the application, but you do not want to recreate the namespace or other Kubernetes resources. For example, if you installed an application using an incorrect license file and need to reinstall with the correct license.
 
To remove an application:

1. Run the following command to list the installed applications for a namespace:
   ```
   kubectl kots get apps -n NAMESPACE
   ```
   Replace `NAMESPACE` with the name of the namespace where the admin console is installed.

   In the output of this command, note the slug for the application that you want to remove.

1. Run _one_ of the following commands:

   * Remove only the reference to the application from the admin console: 

     ```
     kubectl kots remove APP_SLUG -n NAMESPACE
     ```
     Replace:
     * `APP_SLUG` with the slug for the application that you want to remove.
     * `NAMESPACE` with the name of the namespace where the admin console is installed.

   * Remove the reference to the application from the admin console and remove its resources from the cluster:

      ```
      kubectl kots remove APP_SLUG -n NAMESPACE --undeploy
      ```
      
   :::note
   Optionally, use the `--force` flag to remove the application reference from the admin console when the application has already been deployed. The `--force` flag is implied when `--undeploy` is used. For more information, see [remove](/reference/kots-cli-remove) in _kots CLI_.
   :::


## Delete the Admin Console

When you install an application with the admin console, Replicated KOTS also creates the Kubernetes resources for the admin console itself on the cluster. The admin console includes Deployments and Services, Secrets, and other resources such as StatefulSets and PersistentVolumeClaims.

By default, KOTS also creates Kubernetes ClusterRole and ClusterRoleBinding resources that grant permissions to the admin console on the cluster level. These `kotsadm-role` and `kotsadm-rolebinding` resources are managed outside of the namespace where the admin console is installed. Alternatively, when the admin console is installed with namespace-scoped access, KOTS creates Role and RoleBinding resources inside the namespace where the admin console is installed.

If you need to completely delete the admin console and an application installation, such as during testing, follow one of these procedures depending on the type of cluster where you installed the admin console:

* **Existing cluster**: Manually delete the admin console Kubernetes objects and resources from the cluster. See [Delete from an Existing Cluster](#delete-from-an-existing-cluster) below.
* **Embedded cluster**: Remove Kubernetes from the VM where the cluster is installed. See [Delete from an Embedded Cluster](#delete-from-a-kubernetes-installer-cluster) below.

:::note
These procedures do not uninstall the kots CLI. To uninstall the kots CLI, see [Uninstall](https://docs.replicated.com/reference/kots-cli-getting-started#uninstall) in _Installing the kots CLI_.
:::

### Delete from an Existing Cluster

In existing cluster installations, if the admin console is not installed in the `default` namespace, then you delete the admin console by deleting the namespace where it is installed. 

If you installed the admin console with namespace-scoped access, then the admin console Role and RoleBinding RBAC resources are also deleted when you delete the namespace. Alternatively, if you installed with the default cluster-scoped access, then you manually delete the admin console ClusterRole and ClusterRoleBindings resources from the cluster.

The application vendor can require, support, or not support namespace-scoped installations. For more information, see [supportMinimalRBACPrivileges](/reference/custom-resource-application#supportminimalrbacprivileges) and [requireMinimalRBACPrivileges](/reference/custom-resource-application#requireminimalrbacprivileges) in _Application_.

For more information about installing with cluster- or namespace-scoped access, see [RBAC Requirements](/enterprise/installing-general-requirements#rbac-requirements) in _Installation Requirements_.

To delete the admin console from an existing cluster:

1. Run the following command to delete the namespace where the admin console is installed:

   :::note
   * You cannot delete the `default` namespace.
   * This command deletes everything inside the specified namespace, including the admin console Role and RoleBinding resources if you installed with namespace-scoped access.
   :::

   ```
   kubectl delete ns NAMESPACE
   ```
   Replace `NAMESPACE` with the name of the namespace where the admin console is installed.

1. (Cluster-scoped Access Only) If you installed the admin console with the default cluster-scoped access, run the following commands to delete the admin console ClusterRole and ClusterRoleBinding from the cluster:

   ```
   kubectl delete clusterrole kotsadm-role
   ```

   ```
   kubectl delete clusterrolebinding kotsadm-rolebinding
   ```

### Delete from an Embedded Cluster

If you installed on a cluster created by Replicated kURL, KOTS installs the admin console in the `default` namespace. Kubernetes does not allow the `default` namespace to be deleted.

To delete the admin console from an embedded cluster, use the kURL `tasks.sh` `reset` command to remove Kubernetes from the system.

:::important
The `reset` command is intended to be used only on development servers. It has the potential to leave your machine in an unrecoverable state. It is not recommended unless you are able to discard this server and provision a new one.
:::

Instead of using the `reset` command, you can also discard your current VM (if you are using one) and recreate the VM with a new OS to reinstall the admin console and an application.

For more information about the `reset` command, see [Resetting a Node](https://kurl.sh/docs/install-with-kurl/adding-nodes#resetting-a-node) in the kURL documentation.

To delete the admin console from an embedded cluster:

1. Run the following command to remove Kubernetes from the system:

   ```
   curl -sSL https://k8s.kurl.sh/latest/tasks.sh | sudo bash -s reset
   ```

1. Follow the instructions in the output of the command to manually remove any files that the `reset` command does not remove.

If the `reset` command is unsuccessful, discard your current VM, and recreate the VM with a new OS to reinstall the admin console and an application.  
