# Team Management

The primary [Team](https://vendor.replicated.com/team/members) page is the default location to view & manage team members (invite, remove, manage permissions). 

## Viewing Team Members
The [Team](https://vendor.replicated.com/team/members) page provides a list of all accounts currently associated with (or invited to) your team. Each row contains information about the user including their MFA-status, RBAC Role, and allows Admins to take some additional actions (remove, reinvite, edit permissions). The account you're currently logged in with will be annotated with "(You)".

## Inviting Members
By default Replicated Teams can invite more team members to collaborate from the [Team Members](https://vendor.replicated.com/team/members) page (SAML-only enforced accounts do not use the email invite flow).

To invite a new team member click the "Invite member" button on the right side of the screen and follow the instructions in the modal to provide the email address of the member and their assigned RBAC policy.

People invited to join your team will receive an email notification to accept the invite. They'll need to follow the link in the email to accept the invite & join the team. If they don't have a Replicated account already, they'll be able to create one that complies with your Password Policies, MFA and/or Google Auth requirements. If they already have a Replicated account, by accepting your invite they'll automatically leave their current team and join the team you've invited them to.

Invites expire after 7 days. There is an option to reinvite a member located immediately below the user's email address on this page. Clicking the "Reinvite" link will prompt you to confirm invitation.

## Removing Members & Ending Sessions
Team Admins can remove members (except for the account their currently logged in with) from their team by clicking the "Remove" link on the right side of a user's row. Clicking the "Remove" link will prompt you to confirm the action.

When a member is removed, all of their current user sessions will be deleted and they next attempt at communicating with the server will log them out of their browser's session.

SAML created users will need to removed in the same way in order to expire their existing sessions (as we don't listen for SAML events).

For Google Authenticated Users, if the user's Google Account is suspended or deleted, Replicated will log that user out of all Google authenticated vendor portal sessions within 10 minutes. The user will remain in the team list, but they will no longer be able to log into the vendor portal (unless Username/Password is also allowed).