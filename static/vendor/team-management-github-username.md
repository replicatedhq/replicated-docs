# Manage Collab Repository Access

This topic describes how to add users to the Replicated collab GitHub repository automatically through the Replicated Vendor Portal. It also includes information about managing user roles in this repository using Vendor Portal role-based access control (RBAC) policies.

## Overview {#overview}

The replicated-collab organization in GitHub is used for tracking and collaborating on escalations, bug reports, and feature requests that are sent by members of a Vendor Portal team to the Replicated team. Replicated creates a unique repository in the replicated-collab organization for each Vendor Portal team. Members of a Vendor Portal team submit issues to their unique collab repository on the Support page in the [Vendor Portal](https://vendor.replicated.com/support).

For more information about the collab repositories and how they are used, see [Replicated Support Paths and Processes](https://community.replicated.com/t/replicated-vendor-support-paths-and-processes/850) in _Replicated Community_.

To get access to the collab repository, members of a Vendor Portal team can add their GitHub username to the [Account Settings](https://vendor.replicated.com/account-settings) page in the Vendor Portal. The Vendor Portal then automatically provisions the team member as a user in the collab repository in GitHub. The RBAC policy that the member is assigned in the Vendor Portal determines the GitHub role that they have in the collab repository.

Replicated recommends that Vendor Portal admins manage user access to the collab repository through the Vendor Portal, rather than manually managing users through GitHub. Managing access through the Vendor Portal has the following benefits:
* Users are automatically added to the collab repository when they add their GitHub username in the Vendor Portal.
* Users are automatically removed from the collab repository when they are removed from the Vendor Portal team.
* Vendor portal and collab repository RBAC policies are managed from a single location.

## Add Users to the Collab Repository {#add}

This procedure describes how to use the Vendor Portal to access the collab repository for the first time as an Admin, then automatically add new and existing users to the repository. This allows you to use the Vendor Portal to manage the GitHub roles for users in the collab repository, rather than manually adding, managing, and removing users from the repository through GitHub.

### Prerequisite

Your team must have a replicated-collab repository configured to add users to
the repository and to manage repository access through the Vendor Portal. To get 
a collab support repository configured in GitHub for your team, complete the onboarding 
instructions in the email you received from Replicated. You can also access the [Replicated community help forum](https://community.replicated.com/) for assistance.

### Procedure

To add new and existing users to the collab repository through the Vendor Portal:

1. As a Vendor Portal admin, log in to your Vendor Portal account. In the [Account Settings](https://vendor.replicated.com/account-settings) page, add your GitHub username and click **Save Changes**.

   <img src="/images/account-info.png" alt="Account info in the Vendor Portal" width="600"/>

   The Vendor Portal automatically adds your GitHub username to the collab repository and assigns it the Admin role. You receive an email with details about the collab repository when you are added.

1. Follow the collab repository link from the email that you receive to log in to your GitHub account and access the repository.

1. (Recommended) Manually remove any users in the collab repository that were previously added through GitHub.

   :::note
   If a team member adds a GitHub username to their Vendor Portal account that already exists in the collab repository, then the Vendor Portal does _not_ change the role that the existing user is assigned in the collab repository.

However, if the RBAC policy assigned to this member in the Vendor Portal later changes, or if the member is removed from the Vendor Portal team, then the Vendor Portal updates or removes the user in the collab repository accordingly.
   :::

1. (Optional) In the Vendor Portal, go to the [Team](https://vendor.replicated.com/team/members) page. For each team member, click **Edit permissions** as necessary to specify their GitHub role in the collab repository.

   For information about which policies to select, see [About GitHub Roles](#about-github-roles).

1. Instruct each Vendor Portal team member to add their GitHub username to the [Account Settings](https://vendor.replicated.com/account-settings) page in the Vendor Portal.

   The Vendor Portal adds the username to the collab repository and assigns a GitHub role to the user based on their Vendor Portal policy.

   Users receive an email when they are added to the collab repository.

## About GitHub Roles

When team members add a GitHub username to their Vendor Portal account, the Vendor Portal determines how to assign the user a default GitHub role in the collab repository based on the following criteria:
* If the GitHub username already exists in the collab repository
* The RBAC policy assigned to the member in the Vendor Portal

You can also update any custom RBAC policies in the Vendor Portal to change the default GitHub roles for those policies. 

### Default Roles for Existing Users {#existing-username}

If a team member adds a GitHub username to their Vendor Portal account that already exists in the collab repository, then the Vendor Portal does _not_ change the role that the existing user is assigned in the collab repository.

However, if the RBAC policy assigned to this member in the Vendor Portal later changes, or if the member is removed from the Vendor Portal team, then the Vendor Portal updates or removes the user in the collab repository accordingly.

### Default Role Mapping {#role-mapping}

When team members add a GitHub username to their Vendor Portal account, the Vendor Portal assigns them to a GitHub role in the collab repository that corresponds to their Vendor Portal policy. For example, users with the default Read Only policy in the Vendor Portal are assigned the Read GitHub role in the collab repository.

For team members assigned custom RBAC policies in the Vendor Portal, you can edit the custom policy to change their GitHub role in the collab repository. For more information, see [About Changing the Default GitHub Role](#custom) below.

The table below describes how each default and custom Vendor Portal policy corresponds to a role in the collab repository in GitHub. For more information about each of the GitHub roles described in this table, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<table>
  <tr>
    <th width="25%">Vendor Portal Role</th>
    <th width="25%">GitHub collab Role</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td>Admin</td>
    <td>Admin</td>
    <td><p>Members assigned the default Admin role in the Vendor Portal are assigned the GitHub Admin role in the collab repository.</p></td>
  </tr>
  <tr>
    <td>Support Engineer</td>
    <td>Triage</td>
    <td><p>Members assigned the custom Support Engineer role in the Vendor Portal are assigned the GitHub Triage role in the collab repository.</p><p>For information about creating a custom Support Engineer policy in the Vendor Portal, see <a href="team-management-rbac-configuring#support-engineer">Support Engineer</a> in <em>Configuring RBAC Policies</em>.</p><p>For information about editing custom RBAC policies to change this default GitHub role, see <a href="#custom">About Changing the Default GitHub Role</a> below.</p></td>
  </tr>
  <tr>
    <td>Read Only</td>
    <td>Read</td>
    <td>Members assigned the default Read Only role in the Vendor Portal are assigned the GitHub Read role in the collab repository.</td>
  </tr>
  <tr>
    <td>Sales</td>
    <td>N/A</td>
    <td><p>Users assigned the custom Sales role in the Vendor Portal do not have access to the collab repository.</p><p>For information about creating a custom Sales policy in the Vendor Portal, see <a href="team-management-rbac-configuring#sales">Sales</a> in <em>Configuring RBAC Policies</em>.</p><p>For information about editing custom RBAC policies to change this default GitHub role, see <a href="#custom">About Changing the Default GitHub Role</a> below.</p></td>
  </tr>
  <tr>
    <td>Custom policies with <code>**/admin</code> under <code>allowed:</code></td>
    <td>Admin</td>
    <td>
      <p>By default, members assigned to a custom RBAC policy that specifies <code>**/admin</code> under <code>allowed:</code> are assigned the GitHub Admin role in the collab repository.</p>
      <p>For information about editing custom RBAC policies to change this default GitHub role, see <a href="#custom">About Changing the Default GitHub Role</a> below.</p>
    </td>
  </tr>
  <tr>
    <td>Custom policies <em>without</em> <code>**/admin</code> under <code>allowed:</code></td>
    <td>Read Only</td>
    <td>
      <p>By default, members assigned to any custom RBAC policies that do not specify <code>**/admin</code> under <code>allowed:</code> are assigned the Read Only GitHub role in the collab repository.</p>
      <p>For information about editing custom RBAC policies to change this default GitHub role, see <a href="#custom">About Changing the Default GitHub Role</a> below.</p>
    </td>
  </tr>
</table>

### Change the Default Role {#custom}

You can update any custom RBAC policies that you create in the Vendor Portal to change the default GitHub roles for those policies. For example, by default, any team members assigned a custom policy with `**/admin` under `allowed:` are assigned the Admin role in the collab repository in GitHub. You can update the custom policy to specify a more restrictive GitHub role.

To edit a custom policy to change the default GitHub role assigned to users with that policy, add one of the following RBAC resources to the `allowed:` or `denied:` list in the custom policy:

* `team/support-issues/read`
* `team/support-issues/write`
* `team/support-issues/triage`
* `team/support-issues/admin`

For more information about each of these RBAC resources, see [Team](team-management-rbac-resource-names#team) in _RBAC Resource Names_.

For more information about how to edit the `allowed:` or `denied:` lists for custom policies in the Vendor Portal, see [Configuring Custom RBAC Policies](team-management-rbac-configuring).

:::important
When you update an existing RBAC policy to add one or more `team/support-issues` resource, the GitHub role in the Replicated collab repository of every team member that is assigned to that policy and has a GitHub username saved in their account is updated accordingly.
:::