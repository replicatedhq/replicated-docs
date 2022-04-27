# Changing an Admin Console Password

When you install an application for the first time, the Replicated admin console is secured with a single shared password for all users. We recommend that you change your password to a unique password for security.

:::note
Users with Identity Provider (IDP) access cannot change their password using this procedure. If an attempt is made, IDP users receive a message in the user interface to contact the identity service provider to change it. For more information about resetting an IDP user password, see [Resetting Authentication](auth-identity-provider#resetting-authentication) in _Using an Identity Provider for User Access (Beta)_.
:::

To change a password:

1. Log in to the admin console using the your current password.
1. Click **Change Password** in the lower right corner of the dashboard.
1. In the Change Admin Console Password dialog, edit the fields.

    - The new password must be at least 6 characters and must not be the same as your current password.
    - The New Password and Confirm New Password fields must match each other.
    - Click **Show** or **Hide** on each field to view or hide the password.

1. Click **Change Password**.

  If the current password is missing or incorrect, or if the new password fields do not meet the criteria in the previous step, an error message states the specific problem.

  When the password change succeeds, the current session closes and the Log In page opens.

  1. Log in with the new password.
