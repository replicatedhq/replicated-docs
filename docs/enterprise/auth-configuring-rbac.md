# Configuring role based access control (Beta)

It is also possible to regulate access to the Admin Console resources based on the roles of individual users within your organization.

To begin, click the Access link at the top of the Admin Console. Then click on "Add a group" under the "Role Based Access Control" section.

Then, enter a group name that matches one of the group names already established with your identity provider.
Next, choose one of the pre-defined Admin Console roles to be assigned to that group, and click "Add group".

For a list of admin console roles, see [Admin console roles](#admin-console-roles) below.

![Role Based Access Control](/images/identity-service-kotsadm-rbac.png)

## Admin console roles

The KOTS Admin Console comes with pre-defined Identity Service roles that can be assigned to groups when configuring Role Based Access Control for the console.

## Cluster Admin Role

### Read Access
This role will have **read** permissions to **all** resources.

### Write Access
This role will have **write** permissions to **all** resources:

## Support Role

### Read Access
This role will have **read** permissions to **all** resources **except** the application's file tree.

### Write Access
This role will have **write** permissions to the following resources:

* Support Bundles
* Preflights
