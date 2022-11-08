import CollabRepoAbout from "../partials/_collab-repo-about.mdx"

# Collab Repository RBAC

<CollabRepoAbout/>

To get access to the collab repository, members of a vendor portal team can add their GitHub username to the vendor portal Account Settings page. The vendor portal then automatically provisions the team member as a user in the collab repository in GitHub.

The RBAC policy that each member of the vendor portal team is assigned determines the permissions that they have in the collab repository.

## How Vendor Portal Roles Map to GitHub

The permissions for user roles in the vendor portal, including both default and custom RBAC policies, differ from the user roles in GitHub.

The following table describes how the default Admin and Read Only RBAC policies in the vendor portal, as well as custom Support Engineer and Sales RBAC policies, correspond to roles in the collab repository in GitHub.

<table>
  <tr>
    <th>Vendor Portal Role</th>
    <th>GitHub collab Role</th>
    <th width="60%">Description</th>
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

For more information about each of the GitHub roles described in the table above, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.
