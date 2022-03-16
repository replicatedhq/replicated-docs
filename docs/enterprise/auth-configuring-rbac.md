# Configuring Role-based Access Control (Beta)

You can regulate access to the Replicated admin console resources based on the roles of individual users within your organization.

To configure role based access control (RBAC) for the admin console:
1. Go to the **Access** page. Under **Role Based Access Control Group Policy**, click **Add a group**.
1. Enter a group name that matches one of the group names already established with your identity provider.
1. Choose one of the pre-defined admin console roles to be assigned to that group. For a list of admin console roles, see [Admin console roles](#admin-console-roles) below.
1. Click **Add group**.

![Role Based Access Control](/images/identity-service-kotsadm-rbac.png)

## Admin Console Roles

The admin console comes with pre-defined identity service roles that can be assigned to groups when you configure RBAC for the admin console.

## Cluster Admin Role

### Read Access
This role has read permissions to all resources.

### Write Access
This role has write permissions to all resources.

## Support Role

### Read Access
This role has read permissions to all resources except the application's file tree.

### Write Access
This role has write permissions to the following resources:

* Support bundles
* Preflight checks
