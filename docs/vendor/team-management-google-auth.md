# Google Authentication

This topic describes the Replicated supported functionality for Google authentication and how to configure it.

## Manage Google Authentication Options

As a team administrator, you can enable, disable, or require Google authentication for all accounts in the team.

A core benefit of using Google authentication is that when the user's Google account is suspended or deleted, Replicated logs that user out of all Google authenticated vendor portal sessions within 10 minutes. The user remains in the team list, but they cannot log into the vendor portal, unless the username and password is also allowed. Requiring Google authentication is an effective way of centrally removing access to the Replicated vendor portal.

To manage Google authentication settings:

1. Click **Team Settings > [Google Authentication](https://vendor.replicated.com/team/google-authentication)**.

  ![Google Auth Settings](/images/team-mgmt-google-auth.png)

1. Enable or disable the settings:

  | Field                  | Instructions           |
  |-----------------------|------------------------|
  | Allow Google login for team members | Enable this setting to allow team members to log in using a Google account. |
  | Restrict login to only allow to Google auth | Requires new users to accept an invitation and sign up with a Google account that exactly matches the email address that was invited to the team. The email address can be a gmail.com address or user from another domain, but it must match the email address from the invitation exactly. Disabling this setting requires users to accept the invitation by creating a username and password (or use the SAML workflow). |


## Migrating Existing Accounts
Excluding some teams that restrict users to use only SAML or require MFA, existing users can seamlessly sign into an account that exactly matches their Google Workspace (formerly GSuite) email address. However, Google authentication only matches existing user accounts, so for users who have signed up using “[task-based email addresses](https://support.google.com/a/users/answer/9308648?hl=en)” (such as name+news@domain.com), you can continue to use email/password to sign in, invite your normal email address to your team, or contact support to change your email address.

Migrated accounts maintain the same RBAC permissions that were previously assigned. Once signed in with Google, users can choose to disable username/password-based authentication on their account or maintain both authentication methods using [account settings](https://vendor.replicated.com/account-settings).

## Compatibility with MFA
Google authentication is not entirely compatible with the Replicated Multi-Factor Authentication (MFA) implementation because Google authentication bypasses account-based MFA, relying on your Google Authentication MFA instead. However, MFA will continue to be enforced on all email/password-based authentication, even for the same user, if both options are enabled.

## Additional Resources

* [Managing Team Members](team-management)
