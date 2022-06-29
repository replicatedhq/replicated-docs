# Deleting the Admin Console and Removing Applications

This topic describes how to delete the Replicated admin console and remove installed applications, including information about:

* Removing references for installed applications from the admin console.
* Deleting Kubernetes objects and resources for the admin console from a cluster.

## Remove an Application Reference

You can remove the reference to an installed application from the admin console using the `kots remove` kots CLI command.

When you use `kots remove`, the admin console no longer manages the application because the record of that application’s installation is removed. The `kots remove` command does not delete any of the installed Kubernetes resources for the application from the cluster.

It can be useful to remove the reference to an application from the admin console if you want to reinstall the application, but you do not want to recreate the namespace or other Kubernetes resources. For example, you could use `kots remove` if you installed an application using an incorrect license file and need to reinstall with the correct license.

To remove an application reference from the admin console:

1. Run the following command to list the installed applications for a namespace:
   ```
   kubectl kots get apps -n NAMESPACE
   ```
   Replace `NAMESPACE` with the name of the namespace where the admin console is installed.

   In the output of this command, note the application slug that you want to remove.

1. Run the following command to remove an application reference:
   ```
   kubectl kots remove APP_SLUG -n NAMESPACE
   ```
   Replace:
   * `NAMESPACE` with the name of the namespace where the admin console is installed.
   * `APP_SLUG` with the slug for the application that you want to remove.

## Delete the Admin Console

When you install an application with the admin console, Replicated also creates the Kubernetes objects for the admin console itself on the cluster. The admin console includes Deployment and Service objects, Secret objects, and other objects such as Services, StatefulSets, and PersistentVolumeClaims.

For installations where `requireMinimalRBACPriviledges` is _not_ set to `true` in the Application custom resource manifest file, Replicated also creates Kubernetes ClusterRole and ClusterRoleBinding resources that grant permissions to the admin console on the cluster level. These `kotsadm-role` and `kotsadm-rolebinding` resources are managed outside of the namespace where the admin console is installed.

For installations where `requireMinimalRBACPriviledges` is set to `true`, Replicated creates Role and RoleBinding resources inside the namespace where the admin console is installed.

If you need to completely delete the admin console and an application installation, such as during testing, follow one of these procedures depending on the type of cluster where you installed the admin console:

* **Existing cluster**: Manually delete the admin console Kubernetes objects and resources from the cluster. See [Delete from an Existing Cluster](#delete-from-an-existing-cluster) below.
* **Kubernetes installer cluster**: Remove Kubernetes from the VM where the cluster is installed. See [Delete from a Kubernetes Installer Cluster](#delete-from-a-kubernetes-installer-cluster) below.

:::note
These procedures do not uninstall the kots CLI. To uninstall the kots CLI, see [Uninstall](https://docs.replicated.com/reference/kots-cli-getting-started#uninstall) in _Installing the kots CLI_.
:::

### Delete from an Existing Cluster

If you installed on an existing cluster and the admin console is not installed in the `default` namespace, you delete the admin console by using the kubectl Kubernetes command line tool to delete the namespace where the admin console is installed.

After you delete the namespace, if `requireMinimalRBACPriviledges` is _not_ set to `true` in the Application custom resource manifest, delete the admin console ClusterRole and ClusterRoleBindings on the cluster.

To delete the admin console from an existing cluster:

1. Run the following command to delete the namespace where the admin console is installed:

   :::note
   * You cannot delete the `default` namespace.
   * This command deletes everything inside the specified namespace.
   :::

   ```
   kubectl delete ns NAMESPACE
   ```
   Replace `NAMESPACE` with the name of the namespace where the admin console is installed.

1. If `requireMinimalRBACPriviledges` is _not_ set to `true` in the Application custom resource manifest, run the following commands to delete the admin console ClusterRole and ClusterRoleBinding from the cluster:

   ```
   kubectl delete clusterrole kotsadm-role
   ```

   ```
   kubectl delete clusterrolebinding kotsadm-rolebinding
   ```
   :::note
   If `requireMinimalRBACPriviledges` is set to `true`, you deleted the Role and RoleBinding resources for the admin console when you deleted the namespace in the previous step.
   :::

### Delete from a Kubernetes Installer Cluster

If you installed on a cluster created by the Kubernetes installer, Replicated installs the admin console in the `default` namespace. Kubernetes does not allow the `default` namespace to be deleted.

To delete the admin console from a Kubernetes installer-created cluster, use the kURL `tasks.sh` `reset` command to remove Kubernetes from the system.

:::important
The `reset` command is intended to be used only on development servers. It has the potential to leave your machine in an unrecoverable state. It is not recommended unless you are able to discard this server and provision a new one.
:::

Instead of using the `reset` command, you can also discard your current VM, and recreate the VM with a new OS to reinstall the admin console and an application.

For more information about the `reset` command, see [Resetting a Node](https://kurl.sh/docs/install-with-kurl/adding-nodes#resetting-a-node) in the open source kURL documentation.

To delete the admin console from a Kubernetes installer-created cluster:

1. Run the following command to remove Kubernetes from the system:

   ```
   curl -sSL https://k8s.kurl.sh/latest/tasks.sh | sudo bash -s reset
   ```

1. Follow the instructions in the output of the command to manually remove any files that the `reset` command does not remove.

If the `reset` command is unsuccessful, discard your current VM, and recreate the VM with a new OS to reinstall the admin console and an application.  
