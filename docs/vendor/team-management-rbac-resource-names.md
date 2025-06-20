import CollabRbacResourcesImportant from "../partials/collab-repo/_collab-rbac-resources-important.mdx"

# RBAC Resource Names

This a list of all available resource names for the Replicated vendor role-based access control (RBAC) policy:

## Integration Catalog

### integration/catalog/list

Grants the holder permission to view the catalog events and triggers available for integrations.

## kots

### kots/app/create

When allowed, the holder will be allowed to create new applications.

### kots/app/[:appId]/read
Grants the holder permission to view the application. If the holder does not have permissions to view an application, it will not appear in lists.

### kots/externalregistry/list
Grants the holder the ability to list external docker registry for application(s).

### kots/externalregistry/create

Grants the holder the ability to link a new external docker registry to application(s).

### kots/externalregistry/[:registryName]/delete

Grants the holder the ability to delete the specified linked external docker registry in application(s).

### kots/app/[:appId]/channel/create

Grants the holder the ability to create a new channel in the specified application(s).

### kots/app/[:appId]/channel/[:channelId]/archive

Grants the holder permission to archive the specified channel(s) of the specified application(s).

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

Grants the holder permission to create kURL installers. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

### kots/app/[:appId]/installer/update

Grants the holder permission to update kURL installers. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

### kots/app/[:appId]/installer/read

Grants the holder permission to view kURL installers. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

### kots/app/[:appId]/installer/promote

Grants the holder permission to promote kURL installers to a channel. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

:::note
The `kots/app/[:appId]/installer/promote` policy does not grant the holder permission to view and create installers. Users must be assigned both the `kots/app/[:appId]/installers` and `kots/app/[:appId]/installer/promote` policies to have permissions to view, create, and promote installers.
:::  

### kots/app/[:appId]/license/create

Grants the holder permission to create a new license in the specified application(s).

### kots/app/[:appId]/license/[:customerId]/read

Grants the holder permission to view the license specified by ID. If this is denied, the licenses will not show up in search, CSV export or on the Vendor Portal, and the holder will not be able to subscribe to this license's instance notifications.

### kots/app/[:appId]/license/[:customerId]/update

Grants the holder permission to edit the license specified by ID for the specified application(s).

### kots/app/[:appId]/license/[:customerId]/slack-notifications/read

Grants the holder permission to view the team's Slack notification subscriptions for instances associated with the specified license.

### kots/app/[:appId]/license/[:customerId]/slack-notifications/update

Grants the holder permission to edit the team's Slack notification subscriptions for instances associated with the specified license.

### kots/app/[:appId]/builtin-licensefields/update

Grants the holder permission to edit the builtin license field override values for the specified application(s).

### kots/app/[:appId]/builtin-licensefields/delete

Grants the holder permission to delete the builtin license field override values for the specified application(s).

### kots/license/[:customerId]/airgap/password

Grants the holder permission to generate a new download portal password for the license specified (by ID) for the specified application(s).

### kots/license/[:customerId]/archive

Grants the holder permission to archive the specified license (by ID).

### kots/license/[:customerId]/unarchive

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

### kots/app/[:appId]/customhostname/list

Grants the holder permission to view custom hostnames for the team.

### kots/app/[:appId]/customhostname/create

Grants the holder permission to create custom hostnames for the team.

### kots/app/[:appId]/customhostname/delete

Grants the holder permission to delete custom hostnames for the team.

### kots/app/[:appId]/customhostname/default/set

Grants the holder permission to set default custom hostnames.

### kots/app/[:appId]/customhostname/default/unset

Grants the holder permission to unset the default custom hostnames.

### kots/app/[:appId]/supportbundle/read

Grants the holder permission to view and download support bundles.

### kots/app/[:appId]/enterprise-portal/access/read

Grants the holder permission to view Enterprise Portal access settings for the specified application.

### kots/app/[:appId]/enterprise-portal/access/update

Grants the holder permission to update Enterprise Portal access settings for the specified application.

### kots/app/[:appId]/enterprise-portal/branding/read

Grants the holder permission to view Enterprise Portal branding settings for the specified application.

### kots/app/[:appId]/enterprise-portal/branding/update

Grants the holder permission to update Enterprise Portal branding settings for the specified application.

### kots/app/[:appId]/enterprise-portal/customer-users/read

Grants the holder permission to view Enterprise Portal customer users for the specified application.

### kots/app/[:appId]/enterprise-portal/customer-user/create

Grants the holder permission to create Enterprise Portal customer users for the specified application.

### kots/app/[:appId]/enterprise-portal/customer-user/[:customerId]/delete

Grants the holder permission to delete Enterprise Portal customer users for the specified application.

### kots/app/[:appId]/enterprise-portal/customer-allowed-domains/read

Grants the holder permission to view Enterprise Portal customer allowed domains for the specified application.

### kots/app/[:appId]/enterprise-portal/customer-allowed-domains/create

Grants the holder permission to create and manage Enterprise Portal customer allowed domains for the specified application.

### kots/app/[:appId]/enterprise-portal/customer-allowed-domains/delete

Grants the holder permission to delete Enterprise Portal customer allowed domains for the specified application.

### kots/app/[:appId]/enterprise-portal/documentation/read

Grants the holder permission to view Enterprise Portal documentation settings for the specified application.

### kots/app/[:appId]/enterprise-portal/documentation/update

Grants the holder permission to update Enterprise Portal documentation settings for the specified application.

### kots/app/[:appId]/enterprise-portal/email-domain/read

Grants the holder permission to view Enterprise Portal email domain settings for the specified application.

### kots/app/[:appId]/enterprise-portal/email-domain/update

Grants the holder permission to update Enterprise Portal email domain settings for the specified application.

### kots/app/[:appId]/enterprise-portal/email-domain/delete

Grants the holder permission to delete Enterprise Portal email domains for the specified application.

### kots/app/[:appId]/enterprise-portal/email-domain/verify

Grants the holder permission to verify Enterprise Portal email domains for the specified application.

### kots/app/[:appId]/enterprise-portal/email-templates/read

Grants the holder permission to view Enterprise Portal email templates for the specified application.

### kots/app/[:appId]/enterprise-portal/email-templates/update

Grants the holder permission to update Enterprise Portal email templates for the specified application.

### kots/app/[:appId]/enterprise-portal/email-templates/delete

Grants the holder permission to delete Enterprise Portal email templates for the specified application.

### kots/app/[:appId]/enterprise-portal/failed-login-attempts/read

Grants the holder permission to view Enterprise Portal failed login attempts for the specified application.

### kots/app/[:appId]/enterprise-portal/install-attempts/read

Grants the holder permission to view Enterprise Portal install attempts for the specified application.

### kots/app/[:appId]/enterprise-portal/install-options/read

Grants the holder permission to view Enterprise Portal install options for the specified application.

### kots/app/[:appId]/enterprise-portal/install-options/create

Grants the holder permission to create Enterprise Portal install options for the specified application.

### kots/app/[:appId]/enterprise-portal/install-options/[:installOptionId]/update

Grants the holder permission to update Enterprise Portal install options for the specified application.

### kots/app/[:appId]/enterprise-portal/install-options/[:installOptionId]/delete

Grants the holder permission to soft-delete Enterprise Portal install options for the specified application.

### kots/app/[:appId]/enterprise-portal/instances/read

Grants the holder permission to view Enterprise Portal instances for the specified application.

### kots/app/[:appId]/enterprise-portal/service-accounts/read

Grants the holder permission to view Enterprise Portal service accounts for the specified application.

### kots/app/[:appId]/enterprise-portal/service-accounts/[:serviceAccountId]/delete

Grants the holder permission to soft-delete Enterprise Portal service accounts for the specified application.

## Registry

### registry/namespace/:namespace/pull

Grants the holder permission to pull images from Replicated registry.

### registry/namespace/:namespace/push

Grants the holder permission to push images into Replicated registry.

## Compatibility Matrix

### kots/cluster/create

Grants the holder permission to create new clusters.

### kots/cluster/list

Grants the holder permission to list running and terminated clusters.

### kots/cluster/[:clusterId]

Grants the holder permission to get cluster details.

### kots/cluster/[:clusterId]/upgrade

Grants the holder permission to upgrade a cluster.

### kots/cluster/tag/update

Grants the holder permission to update cluster tags.

### kots/cluster/ttl/update

Grants the holder permission to update cluster ttl.

### kots/cluster/[:clusterId]/nodegroup

Grants the holder permission to update nodegroup details.

### kots/cluster[:clusterId]/kubeconfig

Grants the holder permision to get the kubeconfig for a cluster.

### kots/cluster/[:clusterId]/delete

Grants the holder permission to delete a cluster.

### kots/cluster/[:clusterId]/addon/list

Grants the holder permission to list addons for a cluster.

### kots/cluster/[:clusterId]/addon/[:addonId]/read

Grants the holder permission to read the addon for a cluster.

### kots/cluster/[:clusterId]/addon/[:addonId]/delete

Grants the holder permission to delete the addon for a cluster.

### kots/cluster/[:clusterId]/addon/create/objectStore

Grants the holder permission to create an object store for a cluster.

### kots/cluster/[:clusterId]/port/expose

Grants the holder permission to expose a port for a cluster.

### kots/cluster/[:clusterId]/port/delete

Grants the holder permission to delete a port for a cluster.

### kots/cluster/[:clusterId]/port/list

Grants the holder permission to list exposed ports for a cluster.

### kots/cluster/list-quotas

Grants the holder permission to list the quotas.

### kots/cluster/increase-quota

Grants the holder permission to request an increase in the quota.

### kots/vm/tag/update

Grants the holder permission to update vm tags.

### kots/vm/ttl/update

Grants the holder permission to update vm ttl.

### kots/vm/[:vmId]/port/expose

Grants the holder permission to expose a port for a vm.

### kots/vm/[:vmId]/port/list

Grants the holder permission to list exposed ports for a vm.

### kots/vm/[:vmId]/addon/[:addonId]/delete

Grants the holder permission to delete the addon for a vm.

## Team

### team/auditlog/read

Grants the holder permission to view the audit log for the team.

### team/authentication/update

Grants the holder permission to manage the following team authentication settings: Google authentication, Auto-join, and SAML authentication.

### team/authentication/read

Grants the holder permission to read the following authentication settings: Google authentication, Auto-join, and SAML authentication.

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

### team/notifications/slack-webhook/read

Grants the holder permission to view the team's Slack webhook for instance notifications.

### team/notifications/slack-webhook/update

Grants the holder permission to edit the team's Slack webhook for instance notifications.

### team/policy/read

Grants the holder permission to view RBAC policies for the team.

### team/policy/update

Grants the holder permission to update RBAC policies for the team.

### team/policy/delete

Grants the holder permission to delete RBAC policies for the team.

### team/policy/create

Grants the holder permission to create RBAC policies for the team.

### team/security/update

Grants the holder permission to manage team password requirements including two-factor authentication and password complexity requirements.

### team/serviceaccount/list

Grants the holder permission to list service accounts.

### team/serviceaccount/create

Grants the holder permission to create new service accounts.

### team/serviceaccount/[:name]/delete

Grants the holder permission to delete the service account identified by the name specified.

### team/support-issues/read

Grants the holder Read permissions in the Replicated collab repository in GitHub for the Vendor Portal team. Applies after the user adds their GitHub username to the Vendor Portal [Account Settings](https://vendor.replicated.com/account-settings) page.

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

Grants the holder Write permissions in the Replicated collab repository in GitHub for the Vendor Portal team. Applies after the user adds their GitHub username to the Vendor Portal [Account Settings](https://vendor.replicated.com/account-settings) page.

For more information about the Write role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

### team/support-issues/triage

Grants the holder Triage permissions in the Replicated collab repository in GitHub for the Vendor Portal team. Applies after the user adds their GitHub username to the Vendor Portal [Account Settings](https://vendor.replicated.com/account-settings) page.

For more information about the Triage role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

### team/support-issues/admin

Grants the holder Admin permissions in the Replicated collab repository in GitHub for the Vendor Portal team. Applies after the user adds their GitHub username to the Vendor Portal [Account Settings](https://vendor.replicated.com/account-settings) page.

For more information about the Admin role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

## User

### user/token/list

Grants the holder permission to list user tokens.

### user/token/create

Grants the holder permission to create new user tokens.

### user/token/delete

Grants the holder permission to delete user tokens.
