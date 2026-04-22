# Manage google authentication

This topic describes the Google authentication options that you can configure to control access to the Replicated Vendor Portal.

## Manage google authentication options

As a team administrator, you can enable, disable, or require Google authentication for all accounts in the team.

Google authentication provides centralized access control. When an administrator suspends or deletes a user's Google account, Replicated logs that user out of all Google-authenticated Vendor Portal sessions within 10 minutes. The user remains in the team list, but they cannot log into the Vendor Portal, unless the username and password is also allowed. Requiring Google authentication is an effective way of centrally removing access to the Vendor Portal.

To manage Google authentication settings:

1. Click **Team Settings > [Google Authentication](https://vendor.replicated.com/team/google-authentication)**.

   ![Google Auth Settings](/images/team-mgmt-google-auth.png)

1. Enable or disable the settings:

    | Field                  | Instructions           |
    |-----------------------|------------------------|
    | Allow Google authentication for team members | Enables team members to log in using a Google account. |
    | Restrict login to only allow to Google authentication | Requires new users to accept an invitation and sign up with a Google account that exactly matches the email address used in the invitation. The email address can be a gmail.com address or user from another domain, but it must match the email address from the invitation exactly. Disabling this setting requires users to accept the invitation by creating a username and password (or use the SAML workflow). |
  

## Migrating existing accounts
Existing end users can sign in to an account that matches their Google Workspace (formerly GSuite) email address. This applies to all teams except those that restrict end users to SAML or require two-factor authentication (2FA). However, Google authentication only matches existing user accounts. For users with task-based email addresses (such as name+news@domain.com), you can sign in with email/password or invite your regular email address to join the team. You can also contact support to change your email address. For more information about task-based email addresses, see [Create task-specific email addresses](https://support.google.com/a/users/answer/9308648?hl=en) in the Google Support site.

Migrated accounts maintain the same role-based access control (RBAC) permissions that were previously assigned. After signing in with Google, users can choose to disable username/password-based authentication on their account or maintain both authentication methods using the Vendor Portal [account settings page](https://vendor.replicated.com/account-settings).

## Limitations

Distribution lists are not supported for team invitations. Replicated sends the invitations, but they are invalid and recipients cannot join a team with Google authentication.

## Compatibility with two-factor authentication
Google authentication is not entirely compatible with Replicated two-factor authentication (2FA) implementation because Google authentication bypasses account-based 2FA, relying on your Google Authentication instead. However, the Vendor Portal continues to enforce 2FA on all email/password-based authentication, even for the same user, if you enable both options.

## Related topic

[Managing Team Members](team-management)
