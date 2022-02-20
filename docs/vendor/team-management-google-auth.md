# Google Authentication

One of the more popular authentication options for the Replicated vendor portal is Google Auth. This feature can be managed by Team admins at Team Settings -> [Google Authentication](https://vendor.replicated.com/team/google-authentication).

## Admin Functionality & Controls
Team administrators will find some additional functionality in the team settings including the ability to enable, disable or require Google Authentication for all accounts in the Team. Restricting to Google Auth will require new users to accept an invite & sign up with a Google account that exactly matches the email address that was invited to the team (this can be a gmail.com address or user from another domain, it simply needs to match the invited email address exactly).

Disabling Google Auth will require users to accept the invite by creating a Username/Password (or via the SAML workflow).

## Security & Sessions
One of the core features this enables is that if the user's Google Account is suspended or deleted, Replicated will log that user out of all Google authenticated vendor portal sessions within 10 minutes. The user will remain in the team list, but they will no longer be able to log into the vendor portal (unless Username/Password is also allowed). If Google Auth is required on the Team, this is an effective way of centrally removing access to the Replicated vendor portal.

## Migrating Existing Accounts
Excluding some Teams that restrict users to only use SAML or require MFA, existing users should be able to seamlessly sign into an account that exactly matches their Google Workspace (formerly GSuite) email address (see caveats below on "+" accounts). Migrated accounts will maintain the same RBAC permissions that were previously assigned. Once signed in with Google, users can choose to disable username/password-based auth on their account or maintain both authentication methods via [account settings](https://vendor.replicated.com/account-settings).

## Caveats and Notes
Google Auth is not entirely compatible with our Multi-Factor Authentication (MFA) implementation, as Google Auth will bypass account-based MFA (relying instead on your Google Auth MFA), but will continue to be enforced on all email/password-based authentication (even of the same user if both options are enabled).

Google Auth will only match direct existing user accounts, so for users who have signed up using “[task-based email addresses](https://support.google.com/a/users/answer/9308648?hl=en)” (i.e. name+replicated@domain.com), please continue to use email/password to sign in, invite your normal email address to your team, or contact support to change your email address.