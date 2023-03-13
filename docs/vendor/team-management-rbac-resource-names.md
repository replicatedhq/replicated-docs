import CollabRbacResourcesImportant from "../partials/collab-repo/_collab-rbac-resources-important.mdx"

# RBAC Resource Names

This a list of all available resource names for the Replicated vendor role-based access control (RBAC) policy:

## Integration Catalog

### integration/catalog/list

Grants the holder permission to view the catalog events and triggers available for integrations.

## kots

### kots/app/create

When allowed, the holder will be allowed to create new kots applications.

### kots/app/[:appId]/read
Grants the holder permission to view the kots application. If the holder does not have permissions to view an application, it will not appear in lists.

### kots/externalregistry/list
Grants the holder the ability to list external docker registry for kots application(s).

### kots/externalregistry/create

Grants the holder the ability to link a new external docker registry to kots application(s).

### kots/externalregistry/[:registryName]/delete

Grants the holder the ability to delete the specified linked external docker registry in kots application(s).

### kots/app/[:appId]/channel/create

Grants the holder the ability to create a new channel in the specified application(s).

### kots/app/[:appId]/channel/[:channelId]/promote

Grants the holder the ability to promote a new release to the specified channel(s) of the specified application(s).

### kots/app/[:appId]/channel/[:channelId]/update

Grants the holder permission to update the specified channel of the specified application(s).

### kots/app/[:appId]/channel/[:channelId]/read

Grants the holder the permission to view information about the specified channel of the specified application(s).

### kots/app/[:appId]/enterprisechannel/[:channelId]/read

Grants the holder the permission to view information about the specified enterprise channel of the specified application(s).

### kots/app/[:appId]/channel/[:channelId]/releases/airgap

Grants the holder permission to trigger airgap builds for the specified channel.

### kots/app/[:appId]/channel/[:channelId]/releases/airgap/download-url

Grants the holder permission to get an airgap bundle download URL for any release on the specified channel.

### kots/app/[:appId]/installer/create

Grants the holder permission to create Kubernetes installers. For more information, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

### kots/app/[:appId]/installer/update

Grants the holder permission to update Kubernetes installers. For more information, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

### kots/app/[:appId]/installer/read

Grants the holder permission to view Kubernetes installers. For more information, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

### kots/app/[:appId]/installer/promote

Grants the holder permission to promote Kubernetes installers to a channel. For more information, see [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

:::note
The `kots/app/[:appId]/installer/promote` policy does not grant the holder permission to view and create installers. Users must be assigned both the `kots/app/[:appId]/installers` and `kots/app/[:appId]/installer/promote` policies to have permissions to view, create, and promote installers.
:::  

### kots/app/[:appId]/license/create

Grants the holder permission to create a new license in the specified application(s).

### kots/app/[:appId]/license/[:licenseId]/read

Grants the holder permission to view the license specified by ID. If this is denied, the licenses will not show up in search, CSV export or on the Vendor Portal.

### kots/app/[:appId]/license/[:licenseId]/update

Grants the holder permission to edit the license specified (by ID) for the specified application(s).

### kots/license/[:licenseId]/archive

Grants the holder permission to archive the specified license (by ID).

### kots/license/[:licenseId]/unarchive

Grants the holder permissions to unarchive the specified license (by ID).

### kots/app/[:appId]/licensefields/create

Grants the holder permission to create new license fields in the specified application(s).

### kots/app/[:appId]/licensefields/read

Grants the holder permission to view the license fields in the specified application(s).

### kots/app/[:appId]/licensefields/update

Grants the holder permission to edit the license fields for the specified application(s).

### kots/app/[:appId]/licensefields/delete

Grants the holder permission to delete the license fields for the specified application(s).

### kots/app/[:appId]/release/create

Grants the holder permission to create a new release in the specified application(s).

### kots/app/[:appId]/release/[:sequence]/update

Grants the holder permission to update the files saved in release sequence `[:sequence]` in the specified application(s). Once a release is promoted to a channel, it's not editable by anyone.

### kots/app/[:appId]/release/[:sequence]/read

Grants the holder permission to read the files at release sequence `[:sequence]` in the specified application(s).

### kots/customhostname/list

Grants the holder permission to view custom hostnames for the team.

### kots/customhostname/create

Grants the holder permission to create custom hostnames for the team.

### kots/customhostname/delete

Grants the holder permission to delete custom hostnames for the team.

### kots/customhostname/default

Grants the holder permission to set default custom hostnames, which is currently used for the download portal.

## Registry

### registry/namespace/:namespace/pull

Grants the holder permission to pull images from Replicated registry.

### registry/namespace/:namespace/push

Grants the holder permission to push images into Replicated registry.

## Team

### team/integration/list

Grants the holder permission to view team's integrations.

### team/integration/create

Grants the holder permission to create an integration.

### team/integration/[:integrationId]/delete

Grants the holder permission to delete specified integration(s).

### team/integration/[:integrationId]/update

Grants the holder permission to update specified integration(s).

### team/members/list

Grants the holder permission to list team members and invitations.

### team/member/invite

Grants the holder permission to invite additional people to the team.

### team/members/delete

Grants the holder permission to delete other team members.

### team/serviceaccount/list

Grants the holder permission to list service accounts.

### team/serviceaccount/create

Grants the holder permission to create new service accounts.

### team/serviceaccount/[:name]/delete

Grants the holder permission to delete the service account identified by the name specified.

### team/auditlog/read

Grants the holder permission to view the audit log for the team.

### team/policy/read

Grants the holder permission to view RBAC policies for the team.

### team/policy/update

Grants the holder permission to update RBAC policies for the team.

### team/policy/delete

Grants the holder permission to delete RBAC policies for the team.

### team/policy/create

Grants the holder permission to create RBAC policies for the team.

### team/authentication/update

Grants the holder permission to manage the following team authentication settings: Google authentication, Auto-join, and SAML authentication.

### team/authentication/read

Grants the holder permission to read the following authentication settings: Google authentication, Auto-join, and SAML authentication.

### team/security/update

Grants the holder permission to manage team password requirements including two-factor authentication and password complexity requirements.

### team/support-issues/read

Grants the holder Read permissions in the Replicated collab repository in GitHub for the vendor portal team. Applies after the user adds their GitHub username to the vendor portal [Account Settings](https://vendor.replicated.com/account-settings) page.

To prevent access to the collab repository for an RBAC policy, add `team/support-issues/read` to the `denied:` list in the policy. For example:

```
{
 "v1": {
   "name": "Policy Name",
   "resources": {
     "allowed": [],
     "denied": [
    	"team/support-issues/read"
      ]
    }
  }
}
```

For more information about the Read role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

### team/support-issues/write

Grants the holder Write permissions in the Replicated collab repository in GitHub for the vendor portal team. Applies after the user adds their GitHub username to the vendor portal [Account Settings](https://vendor.replicated.com/account-settings) page.

For more information about the Write role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

### team/support-issues/triage

Grants the holder Triage permissions in the Replicated collab repository in GitHub for the vendor portal team. Applies after the user adds their GitHub username to the vendor portal [Account Settings](https://vendor.replicated.com/account-settings) page.

For more information about the Triage role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

### team/support-issues/admin

Grants the holder Admin permissions in the Replicated collab repository in GitHub for the vendor portal team. Applies after the user adds their GitHub username to the vendor portal [Account Settings](https://vendor.replicated.com/account-settings) page.

For more information about the Admin role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

## User

### user/token/list

Grants the holder permission to list user tokens.

### user/token/create

Grants the holder permission to create new user tokens.

### user/token/delete

Grants the holder permission to delete user tokens.
