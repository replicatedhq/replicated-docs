# Managing SAML Authentication

This topic describes how to enable or disable SAML authentication for the Replicated Vendor Portal.

## About Using SAML with the Vendor Portal

After starting out with Replicated, most teams grow, adding more developers, support engineers, and sales engineers. Eventually, managing access to the Vendor Portal can become difficult. Replicated supports logging in using SAML, which lets you manage access (provisioning and unprovisioning accounts) through your SAML identity provider.

Using SAML, everyone on your team logs in with their existing usernames and passwords through your identity provider's dashboard. Users do not need to sign up through the Vendor Portal or log in with a separate Vendor Portal account, simplifying their experience.

### Enabling SAML in Your Vendor Account

To enable SAML in your Vendor Portal account, you must have an Enterprise plan. For access to SAML, you can contact Replicated through [Support](https://vendor.replicated.com/support). For information about the Enterprise plan, see [pricing](https://www.replicated.com/pricing/).

### SCIM

Replicated does not implement System for Cross-domain Identity Management (SCIM). Instead, we use SAML to authenticate and create just-in-time user identities in our system. We resolve the username (email address) as the actor and use this to ensure that audit log events follow these dynamically provisioned users. If a user's email address is already associated with a Replicated account, by using your SAML integration to access the Vendor Portal, they automatically leave their current team and join the team associated with the SAML login.

### Compatibility with Two-Factor Authentication

If SAML authentication is configured for your team, Replicated two-factor authentication (2FA) is bypassed. You can leave 2FA enabled, but you are not prompted to enter a code when logging in.

### Role Based Access Control

Replicated supports Role Based Access Control (RBAC) in the Vendor Portal. To use RBAC with SAML, you must configure policies and add users to the policies by their username. Usernames are the identity of the user in your identity provide (IDP). Typically, this username is the full email address. For more information about configuring RBAC, see [Configuring RBAC Policies](team-management-rbac-configuring).

## Downloading Certificates from Supported SAML providers

You must retrieve the metadata and x.509 public certificate files from your SAML provider before configuring SAML in the Vendor Portal. The certificate file must be in PEM format.

Replicated tests several SAML providers, but the service should be compatible with any SAML 2.0 compliant service provider. We provide full support for the following SAML providers:

* Okta. For more information about integrating Okta with Replicated, see [Configure Okta](#configure-okta).

* OneLogin


## Configure Okta

The first part of the Vendor Portal and Okta integration is configured in the Okta dashboard. This configuration lets you download the XML Metadata file and x.509 public certificate in PEM format required for the SAML authentication.

This procedure outlines the basic configuration steps, recommended settings, and the specific fields to configure in Okta. For more information about using Okta, see the [Okta](https://help.okta.com/en/prod/Content/index.htm) documentation.

To configure Okta and download the required files:

1. Log in to your Okta Admin dashboard, and click applications.

1. Select **Create new app integration**, and create a new application as a SAML 2.0 application.

1. Provide a name and icon for the application, such as Replicated Vendor Portal. You can download a high quality Replicated icon [here](https://help.replicated.com/images/guides/vendor-portal-saml/replicated-application-icon.png).

1. Click **Next**.

   The Configuring SAML page opens.

1. Click **Download Okta Certificate**. This downloads your x.509 certificate to provide to Replicated. Save this file to safe location.

1. On this same page, edit the following fields:

    | Field Name              | Description                                                                                     |
    | :---------------------- | ----------------------------------------------------------------------------------------------- |
    | Single Sign On URL      | Set this to `https://id.replicated.com/v1/saml`.                                                  |
    | Audience URI (SP Entity ID) | Displays on the Vendor Portal [SAML authentication](https://vendor.replicated.com/team/saml-authentication) tab, and is unique to your team. |
    | Name ID Format          | Change this to `EmailAddress`.                                                                  |

1. Click **Next**.

1. Select **I’m an Okta customer adding an internal app** on the final screen, and click **Finish**.

1. Click **Identity provider metadata** to download the Metadata.xml file. This likely opens an XML download that you can right-click and select **Save Link As…** to download this file.

### Next Step

Configure and enable SAML in the Vendor Portal. For more information, see [Configure SAML](#configure-saml).

## Configure SAML

When you initially configure SAML, we do not recommend that you disable username/password access at the same time. It is possible, and recommended during testing, to support both SAML and non-SAML authentication on your account simultaneously.

**Prerequisite**

- Download your XML Metadata file and x.509 public certificate PEM file from your SAML provider. For more information on supported SAML providers and how to find these files, see [Supported SAML providers](#downloading-certificates-from-supported-saml-providers).

To configure SAML:

1. Log in to the Vendor Portal [Team Members page](https://vendor.replicated.com/team/members) as a user with Admin access.
1. Click [SAML Authentication](https://vendor.replicated.com/team/saml-authentication) from the left menu. If you do not see these options, contact [Support](https://vendor.replicated.com/support).

   The SAML Authentication page opens.

   ![SAML Authentication](/images/team-mgmt-saml-authentication.png)

   [View a larger version of this image](/images/team-mgmt-saml-authentication.png)

1. Browse for, or drag and drop, your XML Metadata file and x.509 PEM file from your SAML provider.

1. Click **Upload Metadata & Cert**.

### Next Step

At this point, SAML is configured, but not enabled. The next step is to enable SAML enforcement options. For more information, see [Enable SAML Enforcement](#enable-saml-enforcement).

## Enable SAML Enforcement

After you have uploaded the metadata and x.509 public certificate PEM file, you must enable SAML enforcement options. Replicated provides options that can be enabled or disabled at any time. You can also change the IDP metadata if needed.

To enable SAML enforcement:

1. From the Vendor Portal, select **Team > [SAML Authentication](https://vendor.replicated.com/team/saml-authentication)**.

1. Select either or both login method options in the the Manage your SAML authentication pane. Allowing both login methods is a good way to test SAML without risking any interruption for the rest of your team.

   **Enable SAML for team logins** - Allows members of your team to log in to the Vendor Portal through your identity provider. This option does not remove, change, or restrict any other authentication that methods you have configured in the Vendor Portal. If you enable SAML and your team already is logging in with accounts provisioned in the Vendor Portal, they will be able to continue logging in with those accounts.

   **Only allow SAML logins** - Requires members of your team to log in to the Vendor Portal through your identity provider. Prevents any non-SAML accounts from logging in. Replicated does not delete the existing accounts. If you turn on this option and then later disable it, accounts that never logged in using SAML will be able to log in again. If an account exists outside of SAML and then is authenticated with SAML, the account is converted and cannot authenticate using a password again.

   ![SAML Authentication](/images/team-mgmt-saml-manage-auth.png)

   [View a larger version of this image](/images/team-mgmt-saml-manage-auth.png)

1. (Optional) Set a default policy for new accounts from the drop-down list.
1. (Optional) Click **Change IdP Metadata** and follow the prompts to upload any changes to your metadata.

SAML is now enabled on your account. For your team to use the SAML login option, you must enable access through your SAML identity provider’s dashboard. For example, if you use Okta, assign the application to users or groups. When a user clicks through to use the application, they are granted access as described in [SCIM](#scim).

## Disable SAML Enforcement

You can disable SAML authentication options at any time and re-enable them later if needed.

To disable SAML enforcement:

1. From the Vendor Portal, select **Team > SAML Authentication**.

1. Click **Deprovision SAML** in the Manage your SAML authentication pane.

   ![SAML Authentication](/images/team-mgmt-saml-manage-auth.png)

   [View a larger version of this image](/images/team-mgmt-saml-manage-auth.png)
