# Google Authentication

This topic describes the Replicated supported functionality for Google authentication and how to configure it.

## Manage Google Authentication Options

As a team administrator, you can enable, disable, or require Google authentication for all accounts in the team. Additionally, you can allow all users from your Google Workspace to join your team automatically.

A core benefit of using Google authentication is that when the user's Google account is suspended or deleted, Replicated logs that user out of all Google authenticated vendor portal sessions within 10 minutes. The user remains in the team list, but they cannot log into the vendor portal, unless the username and password is also allowed. Requiring Google authentication is an effective way of centrally removing access to the Replicated vendor portal.

To manage Google authentication settings:

1. Click **Team Settings > [Google Authentication](https://vendor.replicated.com/team/google-authentication)**.

  ![Google Auth Settings](/images/team-mgmt-google-auth.png)

1. Enable or disable the settings:

  | Field                  | Instructions           |
  |-----------------------|------------------------|
  | Allow Google Authentication for team members | Enables team members to log in using a Google account. |
  | Restrict login to only allow to Google Authentication | Requires new users to accept an invitation and sign up with a Google account that exactly matches the email address that was invited to the team. The email address can be a gmail.com address or user from another domain, but it must match the email address from the invitation exactly. Disabling this setting requires users to accept the invitation by creating a username and password (or use the SAML workflow). |
  | Allow all users from my Google Workspace to be added to the team | Enables users in the same Google Workspace associated with the current team's domain to be added automatically to the team when they log in or sign up using Google Authentication. To enable this feature, an administrator must be logged in using Google Authentication. The Google Workspace account used when logging in with Google Authentication is listed as the team's domain. This field is not editable and a Google Workspace domain can be joined only to a single vendor portal team. Administrators can select a default RBAC policy to assign to users who join using this method. By default, this field is set to the built-in read-only policy. |


## Migrating Existing Accounts
Excluding some teams that restrict end users to use only Security Assertion Markup Language (SAML) or require multi-factor authentication (MFA), existing end users can seamlessly sign into an account that exactly matches their Google Workspace (formerly GSuite) email address. However, Google authentication only matches existing user accounts, so for users who have signed up using task-based email addresses (such as name+news@domain.com), you can continue to use email/password to sign in, invite your normal email address to your team, or contact support to change your email address. For more information about task-based email addresses, see [Create task-specific email addresses](https://support.google.com/a/users/answer/9308648?hl=en) in the Google Support site.

Migrated accounts maintain the same role-based access control (RBAC) permissions that were previously assigned. After signing in with Google, users can choose to disable username/password-based authentication on their account or maintain both authentication methods using the vendor portal [account settings page](https://vendor.replicated.com/account-settings).


## Compatibility with MFA
Google authentication is not entirely compatible with the Replicated MFA implementation because Google authentication bypasses account-based MFA, relying on your Google Authentication MFA instead. However, the vendor portal continues to enforce MFA on all email/password-based authentication, even for the same user, if both options are enabled.

## Related Topic

[Managing Team Members](team-management)
