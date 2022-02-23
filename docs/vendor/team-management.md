# Team Management

The primary [Team](https://vendor.replicated.com/team/members) page of the vendor portal is the default location to view and manage team members (such as invite, remove, and manage permissions). 

## Viewing Team Members
The [Team](https://vendor.replicated.com/team/members) page provides a list of all accounts currently associated with or invited to your team. Each row contains information about the user, including their MFA-status and RBAC Role, and lets Admins take some additional actions (such as remove, reinvite, and edit permissions). The account you are currently logged in with will be annotated with "(You)".

## Inviting Members
By default, Replicated Teams can invite more team members to collaborate from the [Team Members](https://vendor.replicated.com/team/members) page. (SAML-only enforced teams do not use the email invitation flow.)

To invite a new team member, click **Invite member** on the right side of the page and enter the email address of the member and their assigned RBAC policy in the dialog.

People invited to join your team will receive an email notification to accept the invitation. They must follow the link in the email to accept the invitation and join the team. If they do not have a Replicated account already, they can create one that complies with your Password Policies, MFA and/or Google Auth requirements. If they already have a Replicated account, by accepting your invitation, they will automatically leave their current team and join the team you have invited them to.

Invitations expire after 7 days. To reinvite a member, there is an option located immediately below the user's email address on this page. Clicking **Reinvite** prompts you to confirm invitation.

## Removing Members & Ending Sessions
Team Admins can remove members, except for the account they are currently logged in with, from their team by clicking **Remove** on the right side of a user's row. Clicking **Remove** prompts you to confirm the action.

When a member is removed, all of their current user sessions are deleted and their next attempt at communicating with the server logs them out of their browser's session.

SAML created users must be removed in the same way in order to expire their existing sessions, as Replicated does not support SCIM.

For Google Authenticated Users, if the user's Google Account is suspended or deleted, Replicated logs that user out of all Google authenticated vendor portal sessions within 10 minutes. The user remains in the team list, but they cannot log into the vendor portal unless Username/Password is also allowed.
