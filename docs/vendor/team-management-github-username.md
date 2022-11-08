import CollabRepoAbout from "../partials/_collab-repo-about.mdx"
import CollabRbacResourcesImportant from "../partials/_collab-rbac-resources-important.mdx"

# Managing Collab Repository Access

This topic describes how to manage user access to the Replicated collab GitHub repository automatically through the vendor portal. It also includes information about granting and denying permissions in the collab repository using default vendor portal roles or custom RBAC policies.

## Overview of Managing Collab Access {#overview}

<CollabRepoAbout/>

To get access to the collab repository, members of a vendor portal team can add their GitHub username to the vendor portal. The vendor portal then automatically provisions the team member as a user in the collab repository in GitHub. For team members that are added to the collab repository through the vendor portal using this method, the RBAC policy that the member is assigned in the vendor portal determines the GitHub role that they have in the collab repository.

Replicated recommends that vendor portal admins manage user access to the collab repository through the vendor portal, rather than manually managing users through GitHub.

Managing access through the vendor portal has the following benefits:
* Users are automatically added to the collab repository when they add their GitHub username in the vendor portal.
* Users are automatically removed from the collab repository when they are removed from the vendor portal team.
* Vendor portal and collab repository RBAC policies are managed from a single location.

For more information about adding users to the collab repository through the vendor portal, see [Add Users to the Collab Repository](#add) below.

### Default GitHub Roles {#default}

When team members add a GitHub username to their vendor portal account, the vendor portal assigns them to a GitHub role in the collab repository that corresponds to their vendor portal policy. For example, users with the default Read Only policy in the vendor portal are assigned the Read GitHub role in the collab repository.

For team members assigned custom RBAC policies in the vendor portal, you can edit the custom policy to change their GitHub role in the collab repository. For more information, see [About Changing the Default GitHub Role](#custom) below.

The table below describes how each default and custom vendor portal policy corresponds to a role in the collab repository in GitHub. For more information about each of the GitHub roles described in this table, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<table>
  <tr>
    <th width="25%">Vendor Portal Role</th>
    <th width="25%">GitHub collab Role</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td>Admin</td>
    <td>Admin</td>
    <td><p>Members assigned the default Admin role in the vendor portal are assigned the GitHub Admin role in the collab repository.</p></td>
  </tr>
  <tr>
    <td>Support Engineer</td>
    <td>Triage</td>
    <td><p>Members assigned the custom Support Engineer role in the vendor portal are assigned the GitHub Triage role in the collab respository.</p><p>For information about creating a custom Support Engineer policy in the vendor portal, see <a href="team-management-rbac-about#support-engineer">Support Engineer</a> in <em>About RBAC Policies</em>.</p><p>For information about editing custom RBAC policies to change this default GitHub role, see <a href="#custom">About Changing the Default GitHub Role</a> below.</p></td>
  </tr>
  <tr>
    <td>Read Only</td>
    <td>Read</td>
    <td>Members assigned the default Read Only role in the vendor portal are assigned the GitHub Read role in the collab repository.</td>
  </tr>
  <tr>
    <td>Sales</td>
    <td>N/A</td>
    <td><p>Users assigned the custom Sales role in the vendor portal do not have access to the collab repository.</p><p>For information about creating a custom Sales policy in the vendor portal, see <a href="team-management-rbac-about#sales">Sales</a> in <em>About RBAC Policies</em>.</p><p>For information about editing custom RBAC policies to change this default GitHub role, see <a href="#custom">About Changing the Default GitHub Role</a> below.</p></td>
  </tr>
  <tr>
    <td>Custom roles with <code>**/admin</code> under <code>allow:</code></td>
    <td>Admin</td>
    <td>
      <p>By default, members assigned to a custom RBAC policy that specifies <code>**/admin</code> under <code>allowed:</code> are assigned the GitHub Admin role in the collab repository.</p>
      <p>For information about editing custom RBAC policies to change this default GitHub role, see <a href="#custom">About Changing the Default GitHub Role</a> below.</p>
    </td>
  </tr>
  <tr>
    <td>Custom roles <em>without</em> <code>**/admin</code> under <code>allow:</code></td>
    <td>Read Only</td>
    <td>
      <p>By default, members assigned to any custom RBAC policies that do not specify <code>**/admin</code> under <code>allowed:</code> are assigned the Read Only GitHub role in the collab repository.</p>
      <p>For information about editing custom RBAC policies to change this default GitHub role, see <a href="#custom">About Changing the Default GitHub Role</a> below.</p>
    </td>
  </tr>
</table>

### About Changing the Default GitHub Role {#custom}

You can update any custom RBAC policies that you create in the vendor portal to change the default GitHub roles for those policies. For example, by default, any team members assigned a custom policy with `**/admin` under `allowed:` are assigned the Admin role in the collab repository in GitHub. You can update the custom policy to specify a more restrictive GitHub role.

To edit a custom policy to change the default GitHub role assigned to users with that policy, add one of the following RBAC resources to the `allowed:` or `denied:` list in the custom policy:

* `team/support-issues/read`
* `team/support-issues/write`
* `team/support-issues/triage`
* `team/support-issues/admin`

For more information about each of these RBAC resources, see [Team](team-management-rbac-resource-names#team) in _RBAC Resource Names_.

For more information about how to edit the `allowed:` or `denied:` lists for custom policies in the vendor portal, see [Configuring Custom RBAC Policies](team-management-rbac-configuring).

<CollabRbacResourcesImportant/>


## Add Users to the Collab Repository {#add}

This procedure describes how to use the vendor portal to automatically add new and existing users to the collab repository with a corresponding GitHub role. This means that you use the vendor portal to manage the GitHub roles for users in the collab repository, rather than manually adding, managing, and removing users from the repository through GitHub. For more information, see [Overview of Managing Collab Access](#overview) above.

To add new and existing users to the collab repository through the vendor portal:

1. As a vendor portal admin, log in to your vendor portal account. In the [Account Settings](https://vendor.replicated.com/account-settings) page, add your GitHub username and click **Save Changes**.

   The vendor portal automatically adds your GitHub username to the collab repository and assigns it the Admin role. You receive an email with details about the collab repository when you are added.

1. Follow the collab repository link from the email that you receive to log in to your GitHub account and access the repository.

1. If there are users in the collab repository that were previously manually added through GitHub, do one of the following:

   * (Recommended) Manually remove the users from the collab repository in GitHub.

      Removing any existing users that were manually added through GitHub allows you to manage their access to the collab repository through the vendor portal instead.
   * If you do _not_ want to manage the users' access to the collab repository through the vendor portal, take no action.

    :::note
    For any manually-added users that you do not remove, if the user later adds their GitHub username to their vendor portal account, the vendor portal does _not_ change their GitHub role in the repository.
    :::

1. (Optional) In the vendor portal, go to the [Team](https://vendor.replicated.com/team/members) page. For each team member, click **Edit permissions** as necessary to specify their GitHub role in the collab repository.

   For information about which policies to select, see [Default GitHub Roles](#default) and [About Changing the Default GitHub Role](#custom) above.

1. Instruct each vendor portal team member to add their GitHub username to the [Account Settings](https://vendor.replicated.com/account-settings) page in the vendor portal.

   The vendor portal adds the username to the collab repo and assigns a GitHub role to the user based on their vendor portal policy.

   Users receive an email when they are added to the collab repository.
