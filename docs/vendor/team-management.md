import CollabRepoAbout from "../partials/_collab-repo-about.mdx"
import CollabRbacImportant from "../partials/_collab-rbac-important.mdx"

# Managing Team Members

This topic describes how to manage team members in the Replicated vendor portal, such as inviting and removing members, and editing permissions.

## Viewing Team Members
The [Team](https://vendor.replicated.com/team/members) page provides a list of all accounts currently associated with or invited to your team. Each row contains information about the user, including their multi-factor authentication (MFA) status and role-based access control (RBAC) role, and lets administrators take additional actions, such as remove, re-invite, and edit permissions.

All users, including read-only, can see the name of the RBAC role assigned to each team member. When SAML authentication is enabled, users with the built-in read-only policy cannot see the RBAC role assigned to team members.

## Invite Members
By default, team administrators can invite more team members to collaborate. Invited users receive an email to activate their account. The activation link in the email is unique to the invited user. Following the activation link in the email also ensures that the invited user joins the team from which the invitation originated.

:::note
Teams that have enforced SAML-only authentication do not use the email invitation flow described in this procedure. These teams and their users must log in through their SAML provider.
:::

To invite a new team member:

1. From the [Team Members](https://vendor.replicated.com/team/members) page, click **Invite member**.

  The Invite team member dialog opens.

1. Enter the email address of the member.

1. In the **Permissions** field, assign an RBAC policy from the dropdown list.

    :::important
    The RBAC policy that you specify also determines the level of access that the user has to the Replicated collab repository in GitHub. By default, the Read Only policy grants the user read access to the collab repository.

    For more information about managing user access to the collab repository from the vendor portal, see [About Managing Access to the Collab Repository](team-management-github-username).
    :::

1. Click **Invite Member**.

  People invited to join your team receive an email notification to accept the invitation. They must follow the link in the email to accept the invitation and join the team. If they do not have a Replicated account already, they can create one that complies with your password policies, MFA, and Google authentication requirements. If an invited user's email address is already associated with a Replicated account, by accepting your invitation, they automatically leave their current team and join the team that you have invited them to.

## Re-invite Members

Invitations expire after 7 days. If a prospective member has not accepted their invitation in this timeframe, you can re-invite them without having to re-enter their details. You must be an administrator to perform this action.

To re-invite a prospective member:

1. Click **Reinvite** below the user's email address on the Team Members page.

1. Click **Reinvite** in the confirmation dialog.

## Edit Permissions

You can edit the policy that is assigned to a member at any time. For example, you can assign a different policy that gives access to additional resources.

To edit permissions for individual team members:

1. From the the Team Members list, click **Edit permissions** next to a members name.
1. Select an RBAC policy from the dropdown list, and click **Save**.

    :::important
    The RBAC policy that you specify also determines the level of access that the user has to the Replicated collab repository in GitHub. By default, the Read Only policy grants the user read access to the collab repository.

    For more information about managing user access to the collab repository from the vendor portal, see [About Managing Access to the Collab Repository](team-management-github-username).
    :::

## Enable Users to Auto-join Your Team
By default, users must be invited to your team. Team administrators can use the auto-join feature to allow users from the same email domain to join their team automatically. This applies to users registering with an email, or with Google authentication if it is enabled for the team. The auto-join feature does not apply to SAML authentication because SAML users log in using their SAML provider's application portal instead of the vendor portal.

To add, edit, or delete custom RBAC policies, see [Configuring Custom RBAC Policies](team-management-rbac-configuring).

To enable users to auto-join your team:

1. From the Team Members page, click **Auto-join** from the left navigation.
1. Enable the **Allow all users from my domain to be added to my team** toggle.
1. For **Default RBAC policy level for new accounts**, you can use the default Read Only policy or select another policy from the list. This RBAC policy is applied to all users who join the team with the auto-join feature.
   :::important
   The RBAC policy that you specify also determines the level of access that the user has to the Replicated collab repository in GitHub. By default, the Read Only policy grants the user read access to the collab repository.

   For more information about managing user access to the collab repository from the vendor portal, see [About Managing Access to the Collab Repository](team-management-github-username).
   :::

## Manage Access to the Collab Repository {#collab}

<CollabRepoAbout/>

To get access to the collab repository, members of a vendor portal team can add their GitHub username to the vendor portal Account Settings page. The vendor portal then automatically provisions the team member as a user in the collab repository in GitHub. The RBAC policy that each member of the vendor portal team is assigned determines the permissions that they have in the collab repository.

Replicated recommends that vendor portal admins manage user access to the collab repository through the vendor portal, rather than manually managing users through GitHub. Managing access through the vendor portal ensures that users are automatically added to the collab repository when they add their GitHub username in the vendor portal. It also ensures that users are automatically removed from the collab repository when they are removed from the vendor portal team.

To manage user access to the collab repository through the vendor portal:

1. As a vendor portal admin, log in to your vendor portal account. In the [Account Settings](https://vendor.replicated.com/account-settings) page, add your GitHub username and click **Save Changes**.

   The vendor portal automatically adds you as an Admin user to the collab repository. You receive an email with details about the collab repository when you are added.

1. Follow the collab repository link from the email that you receive to log in to your GitHub account and access the repository.

1. If there are users in the collab repository that were previously manually added through GitHub, do one of the following:

   * (Recommended) Manually remove the users from the collab repository.

      Removing any users that were manually added through GitHub allows you to manage their access to the collab repository through the vendor portal instead.
   * If you do _not_ want to manage the users' access to the collab repository through the vendor portal, take no action.

    :::note
    If a user was added to the collab repository manually through GitHub, the vendor portal does not change their GitHub role based on their assigned vendor portal role.
    :::

1. (Optional) Create one or more custom RBAC policies to manage user permissions in the collab repository. You can grant and deny user permissions in the collab repository by creating policies with the following RBAC resources:

   * `team/support-issues/read`
   * `team/support-issues/write`
   * `team/support-issues/triage`
   * `team/support-issues/admin`

   For more information about each of these RBAC resources, see [Team](team-management-rbac-resource-names#team) in _RBAC Resource Names_.

1. In the vendor portal, edit each team members permissions.

1. Instruct each vendor portal team member to add their GitHub username to the [Account Settings](https://vendor.replicated.com/account-settings) page in the vendor portal. The vendor portal adds the username to the collab repo and assigns their GitHub role based on the vendor portal policy that you assigned to the user.

   Users receive an email when they are added to the collab repository.


## Remove Members and End Sessions
As a vendor portal team admin, you can remove team members, except for the account you are currently logged in with.

If the team member that you remove added their GitHub username to their Account Settings page in the vendor portal to access the Replicated collab repository, then the vendor portal also automatically removes their username from the collab repository. For more information, see [Manage Access to the Collab Repository](#collab) above.

SAML-created users must be removed using this method to expire their existing sessions because Replicated does not support System for Cross-domain Identity Management (SCIM).

To remove a member:

1. From the Team Members page, click **Remove** on the right side of a user's row.

1. Click **Remove** in the confirmation dialog.

  The member is removed. All of their current user sessions are deleted and their next attempt at communicating with the server logs them out of their browser's session.

  If the member added their GitHub username to the vendor portal to access the collab repository, then the vendor portal also removes their GitHub username from the collab repository.

  For Google-authenticated users, if the user's Google account is suspended or deleted, Replicated logs that user out of all Google authenticated vendor portal sessions within 10 minutes. The user remains in the team list, but they cannot log into the vendor portal unless the username and password are allowed.
