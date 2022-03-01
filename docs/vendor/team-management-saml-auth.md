# SAML Authentication

## Using Vendor Portal SAML

After starting out with Replicated, most teams grow, adding more developers, support engineers, and sales engineers. Eventually, managing access to the Replicated vendor portal can become difficult. Replicated supports logging in using SAML, which lets you manage access (provisioning and deprovisioning) outside of Replicated. Using SAML, everyone on your team can log in with their existing usernames and passwords, simplifying their experience.

### Enabling

To enable SAML on your account, you must have an Enterprise plan. For access to SAML, you can contact us in Slack or through [Support] (https://vendor.replicated.com/support). For information about the Enterprise plan, see [pricing](https://www.replicated.com/pricing/).

### SCIM

Replicated does not implement System for Cross-domain Identity Management (SCIM). Instead, we use SAML to authenticate and create one-time use identities in our system. We resolve the username (email address) as the actor and use this to ensure that audit log events follow these dynamically provisioned and deprovisioned users.

### Role Based Access Control

Replicated supports Role Based Access Control (RBAC) in the vendor portal. To use RBAC with SAML, you must configure policies and add users to the policies by their username. Usernames are the identity of the user in your identity provide (IDP). Typically, this username is the full email address. For more information about RBAC, see [Configuring Role Based Access Control](https://replicated-docs.netlify.app/vendor/packaging-rbac).

## Configure SAML

When first enabling SAML, we do not recommend that you disable username/password access at the same time. It is possible, and recommended during testing, to support both SAML and non-SAML authentication on your account simultaneously.

To configure SAML:

1. Log in to the [vendor portal Team Members page](https://vendor.replicated.com/team/members) as a user with Admin access.
1. Click SAML Authentication from the left menu. If you do not see these options, contact Replicated in Slack or through [Support](https://vendor.replicated.com/support).

 The SAML Authentication page opens.

 ![SAML Authentication](/images/team-mgmt-saml-authentication.png)

1. Browse for, or drag and drop, your XML Metadata file and x.509 public certificate from your SAML provider. For more information on supported SAML providers and how to find these files, see [supported SAML providers](#supported-saml-providers).

1. Click **Upload Metadata & Cert**.


## Tested SAML providers

Replicated tests several SAML providers, but the service should be compatible with any SAML 2.0 compliant service provider. We provide setup instructions and support for the following SAML providers.

### Okta

If your team is using Okta, it’s fully supported in Replicated. For more information, see [Configure Okta](#configure-okta).

### OneLogin

If your team is using OneLogin, it’s also fully supported.


## Configure Okta

The first part of the vendor portal and Okta integration is configured in the Okta dashboard. The final steps are to configure Okta SAML in the vendor portal. This procedure outlines the basic configuration steps, recommended settings, and the specific fields to configure in Okta. For more information about using Okta, see the [Okta](https://help.okta.com/en/prod/Content/index.htm) documentation.

To configure the integration of the vendor portal and Okta:

1. Log in to your Okta Admin dashboard, and click applications.

1. Select **Add a new application**, and create a new application as a SAML 2.0 application.

1. Provide a name and icon for the application, such as Replicated Vendor Portal. You can download a high quality Replicated icon here: https://help.replicated.com/images/guides/vendor-portal-saml/replicated-application.icon.png.

1. Click **Next**.

  The Configuring SAML page opens.

1. Click **Download Okta Certificate**. This downloads your x.509 certificate to provide to Replicated. Save this file to safe location.

1. On this same page, edit the following fields:

  | Field Name              | Description                                                                                     |
  | :---------------------- | ----------------------------------------------------------------------------------------------- |
  | Single Sign On URL      | Set this to https://id.replicated.com/v1/saml.                                                  |
  | Audience URI (SP Entity ID) | Displays on the vendor portal authentication tab, and is unique to your team in Replicated. |
  | Name ID Format          | Change this to `EmailAddress`.                                                                  |

1. Click **Next**.

1. Select **I’m an Okta customer adding an internal app** on the final screen, and click **Finish**.o

1. Click **Identity provider metadata** to download the Metadata.xml file. This likely opens an XML download that you can right-click and select **Save Link As…** to download this file.

1. In the Replicated vendor portal, follow the steps in [Configure SAML](#configure-saml) to upload the metadata.xml file and your Okta certification.

1. In the Replicated vendor portal, follow the steps in [Configure SAML](#configure-saml) to upload the metadata.xml file and your Okta certification.

At this point, SAML is configured, but not enabled. You have two options for enforcement, and can continue to the Enforcing section to understand these options.
