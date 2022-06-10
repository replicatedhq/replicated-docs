# Uninstalling the Admin Console and Applications

This topic describes how to uninstall both the Replicated admin console and applications, including information about:

* Removing references for installed applications from the admin console.
* Deleting Kubernetes objects and resources for the admin console and any installed applications from a cluster.

## Remove an Application Reference

You can remove the reference to an installed application from the admin console using the `kots remove` kots CLI command.

When you use `kots remove`, the admin console no longer manages the application because the record of that application’s installation is removed. The `kots remove` command does not delete any of the installed Kubernetes resources for the application from the cluster.

It can be useful to remove the reference to an application from the admin console if you want to reinstall the application, but you do not want to recreate the namespace or other Kubernetes resources. For example, you could use `kots remove` if you installed an application using an incorrect license file and need to reinstall with the correct license.

To remove an application reference from the admin console:

1. Run the following command to list the installed applications for a namespace:
   ```
   kubectl kots get apps -n NAMESPACE
   ```
   Replace `NAMESPACE` with the name of the namespace where the admin console and the application are installed.

   In the output of this command, note the application slug that you want to remove.

1. Run the following command to remove an application:
   ```
   kubectl kots remove APP_SLUG -n NAMESPACE
   ```
   Replace:
   * `NAMESPACE` with the name of the namespace where the admin console and the application are installed.
   * `APP_SLUG` with the slug for the application that you want to remove.

## Delete an Application and the Admin Console

When you install an application with the admin console, Replicated creates the Kubernetes objects for both the application and for the admin console itself in the same namespace on the cluster. The admin console includes `kotsadm` Deployment and Service objects, Secret objects such as `kotsadm-password`, and other objects such as Services, StatefulSets, and PersistentVolumeClaims.

Replicated also creates Kubernetes ClusterRole and ClusterRoleBinding resources that grant permissions to the admin console on the cluster. These `kotsadm-role` and `kotsadm-rolebinding` resources are managed outside of the namespace where the application and the admin console are installed.

If you need to completely delete an application installation, such as during testing, you can use the kubectl Kubernetes command line tool to delete these Kubernetes objects and resources for both the admin console and the application from the cluster.

:::note
This procedure does not uninstall the kots CLI. To uninstall the kots CLI, see [Uninstall](https://docs.replicated.com/reference/kots-cli-getting-started#uninstall) in _Installing the kots CLI_.
:::

To delete an application and the admin console from a cluster:

1. Run the following command to delete the namespace where the application and the admin console are installed:

   :::note
   This command deletes everything inside the specified namespace.
   :::

   ```
   kubectl delete ns NAMESPACE
   ```
   Replace `NAMESPACE` with the name of the namespace where the admin console and the application are installed.

1. Run the following command to delete the admin console ClusterRole from the cluster:

   ```
   kubectl delete clusterrole kotsadm-role
   ```

1. Run the following command to delete the admin console ClusterRoleBinding from the cluster:

   ```
   kubectl delete clusterrolebinding kotsadm-rolebinding
   ```
