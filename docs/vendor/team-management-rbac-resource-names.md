import CollabRbacResourcesImportant from "../partials/collab-repo/_collab-rbac-resources-important.mdx"

# RBAC resource names

This a list of all available resource names for the Replicated vendor role-based access control (RBAC) policy:

## Integration catalog

### integration/catalog/list

Grants the holder permission to view the catalog events and triggers available for integrations.

## KOTS

### kots/app/create

When allowed, the holder can create new applications.

### kots/app/[:appid]/read
Grants the holder permission to view the application. If the holder does not have permissions to view an application, it will not appear in lists.

### kots/app/[:appid]/delete

Grants the holder permission to delete an application.

### kots/app/[:appid]/update

Grants the holder permission to modify application settings, such as renaming the application, toggling trial signup, configuring security center settings, and managing support bundle upload visibility.

### kots/externalregistry/list
Grants the holder the ability to list external docker registry for applications.

### kots/externalregistry/create

Grants the holder the ability to link a new external docker registry to applications.

### kots/externalregistry/[:registryname]/delete

Grants the holder the ability to delete the specified linked external docker registry in applications.

### kots/externalregistry/update

Grants the holder the ability to update external registry settings.

### kots/externalregistry/test

Grants the holder the ability to test an external registry connection.

### kots/externalregistry/logs/read

Grants the holder the ability to view external registry sync logs.

### kots/app/[:appid]/channel/create

Grants the holder the ability to create a new channel in the specified applications.

### kots/app/[:appid]/channel/[:channelid]/archive

Grants the holder permission to archive the specified channels of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/delete

Grants the holder permission to delete the specified channel of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/promote

Grants the holder the ability to promote a new release to the specified channels of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/update

Grants the holder permission to update the specified channel of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/read

Grants the holder the permission to view information about the specified channel of the specified applications.

### kots/app/[:appid]/enterprisechannel/[:channelid]/read

Grants the holder the permission to view information about the specified enterprise channel of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/releases/read

Grants the holder permission to list releases promoted to the specified channel of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/releases/update

Grants the holder permission to update a release on the specified channel of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/releases/airgap

Grants the holder permission to trigger airgap builds for the specified channel.

### kots/app/[:appid]/channel/[:channelid]/releases/airgap/download-url

Grants the holder permission to get an airgap bundle download URL for any release on the specified channel.

### kots/app/[:appid]/channel/[:channelid]/installers/read

Grants the holder permission to list installers promoted to the specified channel of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/embeddedcluster/release

Grants the holder permission to manage embedded cluster releases on the specified channel of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/release/[:sequence]/demote

Grants the holder permission to demote a release from the specified channel of the specified applications.

### kots/app/[:appid]/channel/[:channelid]/release/[:sequence]/undemote

Grants the holder permission to un-demote a previously demoted release on the specified channel of the specified applications.

### kots/app/[:appid]/installer/create

Grants the holder permission to create kURL installers. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

### kots/app/[:appid]/installer/update

Grants the holder permission to update kURL installers. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

### kots/app/[:appid]/installer/read

Grants the holder permission to view kURL installers. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

### kots/app/[:appid]/installer/promote

Grants the holder permission to promote kURL installers to a channel. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

:::note
The `kots/app/[:appId]/installer/promote` policy does not grant the holder permission to view and create installers. Assign users both the `kots/app/[:appId]/installers` and `kots/app/[:appId]/installer/promote` policies to grant permissions to view, create, and promote installers.
:::

### kots/app/[:appid]/license/create

Grants the holder permission to create a new license in the specified applications.

### kots/app/[:appid]/license/[:customerid]/read

Grants the holder permission to view the license specified by ID. If you deny this permission, the licenses do not appear in search, CSV export, or the Vendor Portal.

### kots/app/[:appid]/license/[:customerid]/update

Grants the holder permission to edit the license specified by ID for the specified applications.

### kots/app/[:appid]/license/[:customerid]/delete

Grants the holder permission to delete the customer specified by ID for the specified applications.

### kots/app/[:appid]/license/[:customerid]/unarchive

Grants the holder permission to unarchive (restore) the customer specified by ID for the specified applications.

### kots/app/[:appid]/builtin-licensefields/update

Grants the holder permission to edit the builtin license field override values for the specified applications.

### kots/app/[:appid]/builtin-licensefields/delete

Grants the holder permission to delete the builtin license field override values for the specified applications.

### kots/license/[:customerid]/airgap/password

Grants the holder permission to generate a new download portal password for the license specified (by ID) for the specified applications.

### kots/license/[:customerid]/archive

Grants the holder permission to archive the specified license (by ID).

### kots/license/[:customerid]/delete

Grants the holder permission to delete the specified customer (by ID).

### kots/license/[:customerid]/unarchive

Grants the holder permissions to unarchive the specified license (by ID).

### kots/app/[:appid]/licensefields/create

Grants the holder permission to create new license fields in the specified applications.

### kots/app/[:appid]/licensefields/read

Grants the holder permission to view the license fields in the specified applications.

### kots/app/[:appid]/licensefields/update

Grants the holder permission to edit the license fields for the specified applications.

### kots/app/[:appid]/licensefields/delete

Grants the holder permission to delete the license fields for the specified applications.

### kots/app/[:appid]/release/create

Grants the holder permission to create a new release in the specified applications.

### kots/app/[:appid]/release/[:sequence]/update

Grants the holder permission to update the files saved in release sequence `[:sequence]` in the specified applications. Once you promote a release to a channel, no one can edit it.

### kots/app/[:appid]/release/[:sequence]/read

Grants the holder permission to read the files at release sequence `[:sequence]` in the specified applications.

### kots/app/[:appid]/release/[:sequence]/archive

Grants the holder permission to archive the release at sequence `[:sequence]` in the specified applications.

### kots/app/[:appid]/releases/test

Grants the holder permission to run release compatibility tests for the specified applications.

### kots/app/[:appid]/customhostname/list

Grants the holder permission to view custom hostnames for the team.

### kots/app/[:appid]/customhostname/create

Grants the holder permission to create custom hostnames for the team.

### kots/app/[:appid]/customhostname/delete

Grants the holder permission to delete custom hostnames for the team.

### kots/app/[:appid]/customhostname/default/set

Grants the holder permission to set default custom hostnames.

### kots/app/[:appid]/customhostname/default/unset

Grants the holder permission to unset the default custom hostnames.

### kots/app/[:appid]/defaulthostname/list

Grants the holder permission to list default hostnames for the specified applications.

### kots/app/[:appid]/supportbundle/read

Grants the holder permission to view and download support bundles.

### kots/app/[:appid]/enterprise-portal/access/read

Grants the holder permission to view Enterprise Portal access settings for the specified application.

### kots/app/[:appid]/enterprise-portal/access/update

Grants the holder permission to update Enterprise Portal access settings for the specified application.

### kots/app/[:appid]/enterprise-portal/branding/read

Grants the holder permission to view Enterprise Portal branding settings for the specified application.

### kots/app/[:appid]/enterprise-portal/branding/update

Grants the holder permission to update Enterprise Portal branding settings for the specified application.

### kots/app/[:appid]/enterprise-portal/customer-users/read

Grants the holder permission to view Enterprise Portal customer users for the specified application.

### kots/app/[:appid]/enterprise-portal/customer-user/create

Grants the holder permission to create Enterprise Portal customer users for the specified application.

### kots/app/[:appid]/enterprise-portal/customer-user/login

Grants the holder permission to login to the Enterprise Portal for the specified application.

### kots/app/[:appid]/enterprise-portal/customer-user/[:customerid]/delete

Grants the holder permission to delete Enterprise Portal customer users for the specified application.

### kots/app/[:appid]/enterprise-portal/customer-allowed-domains/read

Grants the holder permission to view Enterprise Portal customer allowed domains for the specified application.

### kots/app/[:appid]/enterprise-portal/customer-allowed-domains/create

Grants the holder permission to create and manage Enterprise Portal customer allowed domains for the specified application.

### kots/app/[:appid]/enterprise-portal/customer-allowed-domains/delete

Grants the holder permission to delete Enterprise Portal customer allowed domains for the specified application.

### kots/app/[:appid]/enterprise-portal/documentation/read

Grants the holder permission to view Enterprise Portal documentation settings for the specified application.

### kots/app/[:appid]/enterprise-portal/documentation/update

Grants the holder permission to update Enterprise Portal documentation settings for the specified application.

### kots/app/[:appid]/enterprise-portal/email-domain/read

Grants the holder permission to view Enterprise Portal email domain settings for the specified application.

### kots/app/[:appid]/enterprise-portal/email-domain/update

Grants the holder permission to update Enterprise Portal email domain settings for the specified application.

### kots/app/[:appid]/enterprise-portal/email-domain/delete

Grants the holder permission to delete Enterprise Portal email domains for the specified application.

### kots/app/[:appid]/enterprise-portal/email-domain/verify

Grants the holder permission to verify Enterprise Portal email domains for the specified application.

### kots/app/[:appid]/enterprise-portal/email-templates/read

Grants the holder permission to view Enterprise Portal email templates for the specified application.

### kots/app/[:appid]/enterprise-portal/email-templates/update

Grants the holder permission to update Enterprise Portal email templates for the specified application.

### kots/app/[:appid]/enterprise-portal/email-templates/delete

Grants the holder permission to delete Enterprise Portal email templates for the specified application.

### kots/app/[:appid]/enterprise-portal/failed-login-attempts/read

Grants the holder permission to view Enterprise Portal failed login attempts for the specified application.

### kots/app/[:appid]/enterprise-portal/install-attempts/read

Grants the holder permission to view Enterprise Portal install attempts for the specified application.

### kots/app/[:appid]/enterprise-portal/install-options/read

Grants the holder permission to view Enterprise Portal install options for the specified application.

### kots/app/[:appid]/enterprise-portal/install-options/create

Grants the holder permission to create Enterprise Portal install options for the specified application.

### kots/app/[:appid]/enterprise-portal/install-options/[:installoptionid]/update

Grants the holder permission to update Enterprise Portal install options for the specified application.

### kots/app/[:appid]/enterprise-portal/install-options/[:installoptionid]/delete

Grants the holder permission to soft-delete Enterprise Portal install options for the specified application.

### kots/app/[:appid]/enterprise-portal/instances/read

Grants the holder permission to view Enterprise Portal instances for the specified application.

### kots/app/[:appid]/enterprise-portal/service-accounts/read

Grants the holder permission to view Enterprise Portal service accounts for the specified application.

### kots/app/[:appid]/enterprise-portal/service-accounts/[:serviceaccountid]/delete

Grants the holder permission to soft-delete Enterprise Portal service accounts for the specified application.

## Registry

### registry/namespace/:namespace/pull

Grants the holder permission to pull images from Replicated registry.

### registry/namespace/:namespace/push

Grants the holder permission to push images into Replicated registry.

## Compatibility matrix

### kots/cluster/create

Grants the holder permission to create new clusters.

### kots/cluster/list

Grants the holder permission to list running and terminated clusters.

### kots/cluster/[:clusterid]

Grants the holder permission to get cluster details.

### kots/cluster/[:clusterid]/upgrade

Grants the holder permission to upgrade a cluster.

### kots/cluster/tag/update

Grants the holder permission to update cluster tags.

### kots/cluster/ttl/update

Grants the holder permission to update cluster ttl.

### kots/cluster/[:clusterid]/nodegroup

Grants the holder permission to update nodegroup details.

### kots/cluster[:clusterid]/kubeconfig

Grants the holder permission to get the kubeconfig for a cluster.

### kots/cluster/[:clusterid]/delete

Grants the holder permission to delete a cluster.

### kots/cluster/[:clusterid]/addon/list

Grants the holder permission to list addons for a cluster.

### kots/cluster/[:clusterid]/addon/[:addonid]/read

Grants the holder permission to read the addon for a cluster.

### kots/cluster/[:clusterid]/addon/[:addonid]/delete

Grants the holder permission to delete the addon for a cluster.

### kots/cluster/[:clusterid]/addon/create/objectstore

Grants the holder permission to create an object store for a cluster.

### kots/cluster/[:clusterid]/port/expose

Grants the holder permission to expose a port for a cluster.

### kots/cluster/[:clusterid]/port/delete

Grants the holder permission to delete a port for a cluster.

### kots/cluster/[:clusterid]/port/list

Grants the holder permission to list exposed ports for a cluster.

### kots/cluster/list-quotas

Grants the holder permission to list the quotas.

### kots/cluster/credits/buy

Grants the holder permission to buy compatibility matrix credits.

### kots/cluster/increase-quota

Grants the holder permission to request an increase in the quota.

### kots/network/create

Grants the holder permission to create new networks.

### kots/network/list

Grants the holder permission to list networks.

### kots/network/[:networkid]

Grants the holder permission to get network details.

### kots/network/[:networkid]/delete

Grants the holder permission to delete a network.

### kots/network/[:networkid]/update

Grants the holder permission to update the network, including setting airgap policy and network reporting.

### kots/vm/create

Grants the holder permission to create new VMs.

### kots/vm/list

Grants the holder permission to list running and terminated VMs.

### kots/vm/[:vmid]

Grants the holder permission to get VM details.

### kots/vm/[:vmid]/delete

Grants the holder permission to delete a VM.

### kots/vm/tag/update

Grants the holder permission to update vm tags.

### kots/vm/ttl/update

Grants the holder permission to update vm ttl.

### kots/vm/[:vmid]/port/expose

Grants the holder permission to expose a port for a vm.

### kots/vm/[:vmid]/port/list

Grants the holder permission to list exposed ports for a vm.

### kots/vm/[:vmid]/addon/[:addonid]/delete

Grants the holder permission to delete the addon for a vm.

## Team

### team/read

Grants the holder permission to view team details and settings.

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

### team/integration/[:integrationid]/delete

Grants the holder permission to delete specified integrations.

### team/integration/[:integrationid]/update

Grants the holder permission to update specified integrations.

### team/members/list

Grants the holder permission to list team members and invitations.

### team/member/invite

Grants the holder permission to invite additional people to the team.

### team/members/create

Grants the holder permission to create team members.

### team/members/delete

Grants the holder permission to delete other team members.

### team/notifications/\*\*

Grants the holder full access to all notification features, including managing other users' event notification subscriptions. For more information, see [About Event Notifications](event-notifications).

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

### team/activity-stream/read

Grants the holder permission to view the team activity stream.

## Notifications

### team/notifications/subscriptions/read

Grants the holder permission to view notification subscriptions.

### team/notifications/subscriptions/create

Grants the holder permission to create a notification subscription.

### team/notifications/subscriptions/update

Grants the holder permission to update a notification subscription created by the current user.

### team/notifications/user/[:userid]/subscriptions/update

Grants the holder permission to update a notification subscription created by another user.

### team/notifications/subscriptions/delete

Grants the holder permission to delete a notification subscription created by the current user.

### team/notifications/user/[:userid]/subscriptions/delete

Grants the holder permission to delete a notification subscription created by another user.

### team/notifications/types/list

Grants the holder permission to list available notification event types.

### team/notifications/events/read

Grants the holder permission to view notification event delivery history.

## User

### user/token/list

Grants the holder permission to list user tokens.

### user/token/create

Grants the holder permission to create new user tokens.

### user/token/delete

Grants the holder permission to delete user tokens.
