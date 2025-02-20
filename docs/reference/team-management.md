import CollabRepoAbout from "../partials/collab-repo/_collab-repo-about.mdx"
import CollabRbacImportant from "../partials/collab-repo/_collab-rbac-important.mdx"

# Managing Team Members

This topic describes how to manage team members in the Replicated Vendor Portal, such as inviting and removing members, and editing permissions. For information about managing user access to the Replicated collab repository in GitHub, see [Managing Collab Repository Access](team-management-github-username).

## Viewing Team Members
The [Team](https://vendor.replicated.com/team/members) page provides a list of all accounts currently associated with or invited to your team. Each row contains information about the user, including their two-factor authentication (2FA) status and role-based access control (RBAC) role, and lets administrators take additional actions, such as remove, re-invite, and edit permissions.

<img src="/images/teams-view.png" alt="View team members list in the Vendor Portal" width="700"/>

[View a larger image](/images/teams-view.png)

All users, including read-only, can see the name of the RBAC role assigned to each team member. When SAML authentication is enabled, users with the built-in read-only policy cannot see the RBAC role assigned to team members.

## Invite Members
By default, team administrators can invite more team members to collaborate. Invited users receive an email to activate their account. The activation link in the email is unique to the invited user. Following the activation link in the email also ensures that the invited user joins the team from which the invitation originated.

:::note
Teams that have enforced SAML-only authentication do not use the email invitation flow described in this procedure. These teams and their users must log in through their SAML provider.
:::

To invite a new team member:

1. From the [Team Members](https://vendor.replicated.com/team/members) page, click **Invite team member**.

   The Invite team member dialog opens.

   <img src="/images/teams-invite-member.png" alt="Invite team member dialog in the Vendor Portal" width="500"/>

   [Invite team member dialog](/images/teams-invite-member.png)

1. Enter the email address of the member.

1. In the **Permissions** field, assign an RBAC policy from the dropdown list.

     <CollabRbacImportant/>

1. Click **Invite member**.

   People invited to join your team receive an email notification to accept the invitation. They must follow the link in the email to accept the invitation and join the team. If they do not have a Replicated account already, they can create one that complies with your password policies, 2FA, and Google authentication requirements. If an invited user's email address is already associated with a Replicated account, by accepting your invitation, they automatically leave their current team and join the team that you have invited them to.

## Managing Invitations

Invitations expire after 7 days. If a prospective member has not accepted their invitation in this time frame, you can re-invite them without having to reenter their details. You can also remove the prospective member from the list.

You must be an administrator to perform this action.

To re-invite or remove a prospective member, do one of the following on the **Team Members** page:

* Click **Reinvite** from the row with the user's email address, and then click **Reinvite** in the confirmation dialog.

* Click **Remove** from the row with the user's email address, and then click **Delete Invitation** in the confirmation dialog.

## Edit Policy Permissions

You can edit the RBAC policy that is assigned to a member at any time.

<CollabRbacImportant/>

To edit policy permissions for individual team members:

1. From the the Team Members list, click **Edit permissions** next to a members name.

   :::note
   The two-factor authentication (2FA) status displays on the **Team members** page, but it is not configured on this page. For more information about configuring 2FA, see [Managing Two-Factor Authentication](team-management-two-factor-auth).
   :::

1. Select an RBAC policy from the **Permissions** dropdown list, and click **Save**. For information about configuring the RBAC policies that display in this list, see [Configuring RBAC Policies](team-management-rbac-configuring).

   <img src="/images/teams-edit-permissions.png" alt="Edit team member permissions in the Vendor Portal" width="400"/>

## Enable Users to Auto-join Your Team
By default, users must be invited to your team. Team administrators can use the auto-join feature to allow users from the same email domain to join their team automatically. This applies to users registering with an email, or with Google authentication if it is enabled for the team. The auto-join feature does not apply to SAML authentication because SAML users log in using their SAML provider's application portal instead of the Vendor Portal.

To add, edit, or delete custom RBAC policies, see [Configuring RBAC Policies](team-management-rbac-configuring).

To enable users to auto-join your team:

1. From the Team Members page, click **Auto-join** from the left navigation.
1. Enable the **Allow all users from my domain to be added to my team** toggle.

   <img src="/images/teams-auto-join.png" alt="Auto join dialog in the Vendor Portal" width="600"/>

   [View a larger image](/images/teams-auto-join.png)

1. For **Default RBAC policy level for new accounts**, you can use the default Read Only policy or select another policy from the list. This RBAC policy is applied to all users who join the team with the auto-join feature.

   <CollabRbacImportant/>


## Remove Members and End Sessions
As a Vendor Portal team admin, you can remove team members, except for the account you are currently logged in with.

If the team member that you remove added their GitHub username to their Account Settings page in the Vendor Portal to access the Replicated collab repository, then the Vendor Portal also automatically removes their username from the collab repository. For more information, see [Managing Collab Repository Access](team-management-github-username).

SAML-created users must be removed using this method to expire their existing sessions because Replicated does not support System for Cross-domain Identity Management (SCIM).

To remove a member:

1. From the Team Members page, click **Remove** on the right side of a user's row.

1. Click **Remove** in the confirmation dialog.

   The member is removed. All of their current user sessions are deleted and their next attempt at communicating with the server logs them out of their browser's session.

   If the member added their GitHub username to the Vendor Portal to access the collab repository, then the Vendor Portal also removes their GitHub username from the collab repository.

   For Google-authenticated users, if the user's Google account is suspended or deleted, Replicated logs that user out of all Google authenticated Vendor Portal sessions within 10 minutes. The user remains in the team list, but they cannot log into the Vendor Portal unless the username and password are allowed.

## Update Email Addresses

:::important
Changing team member email addresses has security implications. Replicated advises that you avoid changing team member email addresses if possible.
:::

Updating the email address for a team member requires creating a new account with the updated email address, and then deactivating the previous account.

To update the email address for a team member:

1. From the Team Members page, click **Invite team member**.

1. Assign the required RBAC policies to the new user.

1. Deactivate the previous team member account. 