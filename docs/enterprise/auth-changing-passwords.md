# Changing an Admin Console Password

When you install for the first time with the Kubernetes installer, the Replicated admin console is secured with a single shared password that is set automatically for all users. We recommend that you change this to a new, unique password for security purposes as this automated password is displayed to the user in plain text.

The admin console password is salted and one-way hashed using bcrypt. The irreversible hash is stored in a secret named `kotsadm-password`. The password is not retrievable if lost. If you lose your admin console password, reset your password to access the admin console.

For more information about bcrypt, see [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) on Wikipedia.

:::note
Users with Identity Provider (IDP) access cannot change their password using this procedure. If an attempt is made, IDP users receive a message in the user interface to contact the identity service provider to change their password. For more information about resetting an IDP user password, see [Resetting Authentication](auth-identity-provider#resetting-authentication) in _Using an Identity Provider for User Access (Beta)_.
:::

To change your admin console password:

1. Log in to the admin console using your current password.
1. In the drop-down in the top right of any page, click **Change password**.
1. In the Change Admin Console Password dialog, edit the fields.

    - The new password must be at least 6 characters and must not be the same as your current password.
    - The New Password and Confirm New Password fields must match each other.

1. Click **Change Password**.

  If there are any issues with changing the password, an error message displays the specific problem.

  When the password change succeeds, the current session closes and you are redirected to the Log In page.

1. Log in with the new password.
