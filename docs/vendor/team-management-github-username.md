# About User Permissions in the Collab Repository

This topic provides information about using RBAC policies in the Replicated vendor portal to manage user permissions in the Replicated collab repository in GitHub.

## Overview of Managing Collab Respository Users

The Replicated collab GitHub repository is used for tracking and collaborating on escalations, bug reports, and feature requests that are sent by members of a vendor portal team to the Replicated team. Members of a vendor portal team submit issues to the collab repository through the vendor portal [Support](vendor.replicated.com/support) page. Replicated creates a unique collab repository in GitHub for each vendor portal team.

To get access to the collab repository, members of a vendor portal team can add their GitHub username to the vendor portal **Account Settings** page. The vendor portal then automatically adds the team member to the collab repository.

The RBAC policy that each member of the vendor portal team is assigned determines the permissions that they have in the collab repository. You can create custom RBAC policies in the vendor portal to manage user permissions in the GitHub collab repository. This allows vendor portal Admins to manage user permissions for both the vendor portal team and the collab repository from the vendor portal.

## How Vendor Portal Roles Map to GitHub

The permissions for user roles in the vendor portal, including both default and custom RBAC policies, differ from the user roles in GitHub.

The following RBAC resources in the vendor portal control permissions in the collab repo:
* `team/support-issues/read`
* `team/support-issues/write`
* `team/support-issues/triage`
* `team/support-issues/admin`

The table below describes how the default Admin and Read Only RBAC policies in the vendor portal, as well as custom Support Engineer and Sales RBAC policies, correspond to roles in the collab repository in GitHub.

For more information about each of the GitHub roles described in this table, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<table>
  <tr>
    <th>Vendor Portal Role</th>
    <th>GitHub collab Role</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Admin</td>
    <td>Admin</td>
    <td><p>Users with the default Admin role in the vendor portal are assigned the GitHub Admin role in the collab repository.</p></td>
  </tr>
  <tr>
    <td>Support Engineer</td>
    <td>Triage</td>
    <td><p>Users assigned the custom Support Engineer role in the vendor portal are assigned the GitHub Triage role in the collab respository.</p><p>For more information about creating a custom Support Engineer policy in the vendor portal, see <a href="team-management-rbac-about#support-engineer">Support Engineer</a> in <em>About RBAC Policies</em>.</p></td>
  </tr>
  <tr>
    <td>Read Only</td>
    <td>Read</td>
    <td>Users with the default Read Only role in the vendor portal are assigned the GitHub Read role in the collab repository.</td>
  </tr>
  <tr>
    <td>Sales</td>
    <td>N/A</td>
    <td><p>Users assigned the custom Sales role in the vendor portal do not have access to the collab repository.</p><p>For more information about creating a custom Sales policy in the vendor portal, see <a href="team-management-rbac-about#sales">Sales</a> in <em>About RBAC Policies</em>.</p></td>
  </tr>
</table>
