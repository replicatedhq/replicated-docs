# Delete the Admin Console and Remove Applications

This topic describes how to remove installed applications and delete the Replicated KOTS Admin Console. The information in this topic applies to existing cluster installations with KOTS.

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

When you install an application, KOTS creates the Kubernetes resources for the Admin Console itself on the cluster. The Admin Console includes Deployments and Services, Secrets, and other resources such as StatefulSets and PersistentVolumeClaims.

By default, KOTS also creates Kubernetes ClusterRole and ClusterRoleBinding resources that grant permissions to the Admin Console on the cluster level. These `kotsadm-role` and `kotsadm-rolebinding` resources are managed outside of the namespace where the Admin Console is installed. Alternatively, when the Admin Console is installed with namespace-scoped access, KOTS creates Role and RoleBinding resources inside the namespace where the Admin Console is installed.

In existing cluster installations, if the Admin Console is not installed in the `default` namespace, then you delete the Admin Console by deleting the namespace where it is installed.

If you installed the Admin Console with namespace-scoped access, then the Admin Console Role and RoleBinding RBAC resources are also deleted when you delete the namespace. Alternatively, if you installed with the default cluster-scoped access, then you manually delete the Admin Console ClusterRole and ClusterRoleBindings resources from the cluster. For more information, see [supportMinimalRBACPrivileges](/reference/custom-resource-application#supportminimalrbacprivileges) and [requireMinimalRBACPrivileges](/reference/custom-resource-application#requireminimalrbacprivileges) in _Application_.

For more information about installing with cluster- or namespace-scoped access, see [RBAC Requirements](/enterprise/installing-general-requirements#rbac-requirements) in _Installation Requirements_.

To completely delete the Admin Console from an existing cluster:

1. Run the following command to delete the namespace where the Admin Console is installed:

   :::important
   This command deletes everything inside the specified namespace, including the Admin Console Role and RoleBinding resources if you installed with namespace-scoped access.
   :::

   ```
   kubectl delete ns NAMESPACE
   ```
   Replace `NAMESPACE` with the name of the namespace where the Admin Console is installed.

   :::note
   You cannot delete the `default` namespace.
   :::

1. (Cluster-scoped Access Only) If you installed the Admin Console with the default cluster-scoped access, run the following commands to delete the Admin Console ClusterRole and ClusterRoleBinding from the cluster:

   ```
   kubectl delete clusterrole kotsadm-role
   ```

   ```
   kubectl delete clusterrolebinding kotsadm-rolebinding
   ```

1. (Optional) To uninstall the KOTS CLI, see [Uninstall](https://docs.replicated.com/reference/kots-cli-getting-started#uninstall) in _Installing the KOTS CLI_.   
