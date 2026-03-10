import CollabRbacResourcesImportant from "../partials/collab-repo/_collab-rbac-resources-important.mdx"

# RBAC resource names

This a list of all available resource names for the Replicated vendor role-based access control (RBAC) policy:

## Integration catalog

### Integration/catalog/list

Grants the holder permission to view the catalog events and triggers available for integrations.

## KOTS

### KOTS/app/create

When allowed, the holder will be allowed to create new applications.

### KOTS/app/[:appid]/read
Grants the holder permission to view the application. If the holder does not have permissions to view an application, it will not appear in lists.

### KOTS/app/[:appid]/delete

Grants the holder permission to delete an application.

### KOTS/app/[:appid]/update

Grants the holder permission to modify application settings, such as renaming the application, toggling trial signup, configuring security center settings, and managing support bundle upload visibility.

### KOTS/externalregistry/list
Grants the holder the ability to list external docker registry for application(s).

### KOTS/externalregistry/create

Grants the holder the ability to link a new external docker registry to application(s).

### KOTS/externalregistry/[:registryname]/delete

Grants the holder the ability to delete the specified linked external docker registry in application(s).

### KOTS/externalregistry/update

Grants the holder the ability to update external registry settings.

### KOTS/externalregistry/test

Grants the holder the ability to test an external registry connection.

### KOTS/externalregistry/logs/read

Grants the holder the ability to view external registry sync logs.

### KOTS/app/[:appid]/channel/create

Grants the holder the ability to create a new channel in the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/archive

Grants the holder permission to archive the specified channel(s) of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/delete

Grants the holder permission to delete the specified channel of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/promote

Grants the holder the ability to promote a new release to the specified channel(s) of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/update

Grants the holder permission to update the specified channel of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/read

Grants the holder the permission to view information about the specified channel of the specified application(s).

### KOTS/app/[:appid]/enterprisechannel/[:channelid]/read

Grants the holder the permission to view information about the specified enterprise channel of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/releases/read

Grants the holder permission to list releases promoted to the specified channel of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/releases/update

Grants the holder permission to update a release on the specified channel of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/releases/airgap

Grants the holder permission to trigger airgap builds for the specified channel.

### KOTS/app/[:appid]/channel/[:channelid]/releases/airgap/download-URL

Grants the holder permission to get an airgap bundle download URL for any release on the specified channel.

### KOTS/app/[:appid]/channel/[:channelid]/installers/read

Grants the holder permission to list installers promoted to the specified channel of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/embeddedcluster/release

Grants the holder permission to manage embedded cluster releases on the specified channel of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/release/[:sequence]/demote

Grants the holder permission to demote a release from the specified channel of the specified application(s).

### KOTS/app/[:appid]/channel/[:channelid]/release/[:sequence]/undemote

Grants the holder permission to un-demote a previously demoted release on the specified channel of the specified application(s).

### KOTS/app/[:appid]/Installer/create

Grants the holder permission to create kURL installers. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

### KOTS/app/[:appid]/Installer/update

Grants the holder permission to update kURL installers. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

### KOTS/app/[:appid]/Installer/read

Grants the holder permission to view kURL installers. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

### KOTS/app/[:appid]/Installer/promote

Grants the holder permission to promote kURL installers to a channel. For more information, see [Creating a kURL installer](packaging-embedded-kubernetes).

:::note
The `kots/app/[:appId]/installer/promote` policy does not grant the holder permission to view and create installers. Users must be assigned both the `kots/app/[:appId]/installers` and `kots/app/[:appId]/installer/promote` policies to have permissions to view, create, and promote installers.
:::

### KOTS/app/[:appid]/license/create

Grants the holder permission to create a new license in the specified application(s).

### KOTS/app/[:appid]/license/[:customerid]/read

Grants the holder permission to view the license specified by ID. If this is denied, the licenses will not show up in search, CSV export or on the Vendor Portal, and the holder will not be able to subscribe to this license's instance notifications.

### KOTS/app/[:appid]/license/[:customerid]/update

Grants the holder permission to edit the license specified by ID for the specified application(s).

### KOTS/app/[:appid]/license/[:customerid]/delete

Grants the holder permission to delete the customer specified by ID for the specified application(s).

### KOTS/app/[:appid]/license/[:customerid]/unarchive

Grants the holder permission to unarchive (restore) the customer specified by ID for the specified application(s).

### KOTS/app/[:appid]/license/[:customerid]/slack-notifications/read

Grants the holder permission to view the team's Slack notification subscriptions for instances associated with the specified license.

### KOTS/app/[:appid]/license/[:customerid]/slack-notifications/update

Grants the holder permission to edit the team's Slack notification subscriptions for instances associated with the specified license.

### KOTS/app/[:appid]/builtin-licensefields/update

Grants the holder permission to edit the builtin license field override values for the specified application(s).

### KOTS/app/[:appid]/builtin-licensefields/delete

Grants the holder permission to delete the builtin license field override values for the specified application(s).

### KOTS/license/[:customerid]/airgap/password

Grants the holder permission to generate a new download portal password for the license specified (by ID) for the specified application(s).

### KOTS/license/[:customerid]/archive

Grants the holder permission to archive the specified license (by ID).

### KOTS/license/[:customerid]/delete

Grants the holder permission to delete the specified customer (by ID).

### KOTS/license/[:customerid]/unarchive

Grants the holder permissions to unarchive the specified license (by ID).

### KOTS/app/[:appid]/licensefields/create

Grants the holder permission to create new license fields in the specified application(s).

### KOTS/app/[:appid]/licensefields/read

Grants the holder permission to view the license fields in the specified application(s).

### KOTS/app/[:appid]/licensefields/update

Grants the holder permission to edit the license fields for the specified application(s).

### KOTS/app/[:appid]/licensefields/delete

Grants the holder permission to delete the license fields for the specified application(s).

### KOTS/app/[:appid]/release/create

Grants the holder permission to create a new release in the specified application(s).

### KOTS/app/[:appid]/release/[:sequence]/update

Grants the holder permission to update the files saved in release sequence `[:sequence]` in the specified application(s). Once a release is promoted to a channel, it's not editable by anyone.

### KOTS/app/[:appid]/release/[:sequence]/read

Grants the holder permission to read the files at release sequence `[:sequence]` in the specified application(s).

### KOTS/app/[:appid]/release/[:sequence]/archive

Grants the holder permission to archive the release at sequence `[:sequence]` in the specified application(s).

### KOTS/app/[:appid]/releases/test

Grants the holder permission to run release compatibility tests for the specified application(s).

### KOTS/app/[:appid]/customhostname/list

Grants the holder permission to view custom hostnames for the team.

### KOTS/app/[:appid]/customhostname/create

Grants the holder permission to create custom hostnames for the team.

### KOTS/app/[:appid]/customhostname/delete

Grants the holder permission to delete custom hostnames for the team.

### KOTS/app/[:appid]/customhostname/default/set

Grants the holder permission to set default custom hostnames.

### KOTS/app/[:appid]/customhostname/default/unset

Grants the holder permission to unset the default custom hostnames.

### KOTS/app/[:appid]/defaulthostname/list

Grants the holder permission to list default hostnames for the specified application(s).

### KOTS/app/[:appid]/SupportBundle/read

Grants the holder permission to view and download support bundles.

### KOTS/app/[:appid]/enterprise-portal/access/read

Grants the holder permission to view Enterprise Portal access settings for the specified application.

### KOTS/app/[:appid]/enterprise-portal/access/update

Grants the holder permission to update Enterprise Portal access settings for the specified application.

### KOTS/app/[:appid]/enterprise-portal/branding/read

Grants the holder permission to view Enterprise Portal branding settings for the specified application.

### KOTS/app/[:appid]/enterprise-portal/branding/update

Grants the holder permission to update Enterprise Portal branding settings for the specified application.

### KOTS/app/[:appid]/enterprise-portal/customer-users/read

Grants the holder permission to view Enterprise Portal customer users for the specified application.

### KOTS/app/[:appid]/enterprise-portal/customer-user/create

Grants the holder permission to create Enterprise Portal customer users for the specified application.

### KOTS/app/[:appid]/enterprise-portal/customer-user/login

Grants the holder permission to login to the Enterprise Portal for the specified application.

### KOTS/app/[:appid]/enterprise-portal/customer-user/[:customerid]/delete

Grants the holder permission to delete Enterprise Portal customer users for the specified application.

### KOTS/app/[:appid]/enterprise-portal/customer-allowed-domains/read

Grants the holder permission to view Enterprise Portal customer allowed domains for the specified application.

### KOTS/app/[:appid]/enterprise-portal/customer-allowed-domains/create

Grants the holder permission to create and manage Enterprise Portal customer allowed domains for the specified application.

### KOTS/app/[:appid]/enterprise-portal/customer-allowed-domains/delete

Grants the holder permission to delete Enterprise Portal customer allowed domains for the specified application.

### KOTS/app/[:appid]/enterprise-portal/documentation/read

Grants the holder permission to view Enterprise Portal documentation settings for the specified application.

### KOTS/app/[:appid]/enterprise-portal/documentation/update

Grants the holder permission to update Enterprise Portal documentation settings for the specified application.

### KOTS/app/[:appid]/enterprise-portal/email-domain/read

Grants the holder permission to view Enterprise Portal email domain settings for the specified application.

### KOTS/app/[:appid]/enterprise-portal/email-domain/update

Grants the holder permission to update Enterprise Portal email domain settings for the specified application.

### KOTS/app/[:appid]/enterprise-portal/email-domain/delete

Grants the holder permission to delete Enterprise Portal email domains for the specified application.

### KOTS/app/[:appid]/enterprise-portal/email-domain/verify

Grants the holder permission to verify Enterprise Portal email domains for the specified application.

### KOTS/app/[:appid]/enterprise-portal/email-templates/read

Grants the holder permission to view Enterprise Portal email templates for the specified application.

### KOTS/app/[:appid]/enterprise-portal/email-templates/update

Grants the holder permission to update Enterprise Portal email templates for the specified application.

### KOTS/app/[:appid]/enterprise-portal/email-templates/delete

Grants the holder permission to delete Enterprise Portal email templates for the specified application.

### KOTS/app/[:appid]/enterprise-portal/failed-login-attempts/read

Grants the holder permission to view Enterprise Portal failed login attempts for the specified application.

### KOTS/app/[:appid]/enterprise-portal/install-attempts/read

Grants the holder permission to view Enterprise Portal install attempts for the specified application.

### KOTS/app/[:appid]/enterprise-portal/install-options/read

Grants the holder permission to view Enterprise Portal install options for the specified application.

### KOTS/app/[:appid]/enterprise-portal/install-options/create

Grants the holder permission to create Enterprise Portal install options for the specified application.

### KOTS/app/[:appid]/enterprise-portal/install-options/[:installoptionid]/update

Grants the holder permission to update Enterprise Portal install options for the specified application.

### KOTS/app/[:appid]/enterprise-portal/install-options/[:installoptionid]/delete

Grants the holder permission to soft-delete Enterprise Portal install options for the specified application.

### KOTS/app/[:appid]/enterprise-portal/instances/read

Grants the holder permission to view Enterprise Portal instances for the specified application.

### KOTS/app/[:appid]/enterprise-portal/service-accounts/read

Grants the holder permission to view Enterprise Portal service accounts for the specified application.

### KOTS/app/[:appid]/enterprise-portal/service-accounts/[:serviceaccountid]/delete

Grants the holder permission to soft-delete Enterprise Portal service accounts for the specified application.

## Registry

### Registry/namespace/:namespace/pull

Grants the holder permission to pull images from Replicated registry.

### Registry/namespace/:namespace/push

Grants the holder permission to push images into Replicated registry.

## Compatibility matrix

### KOTS/cluster/create

Grants the holder permission to create new clusters.

### KOTS/cluster/list

Grants the holder permission to list running and terminated clusters.

### KOTS/cluster/[:clusterid]

Grants the holder permission to get cluster details.

### KOTS/cluster/[:clusterid]/upgrade

Grants the holder permission to upgrade a cluster.

### KOTS/cluster/tag/update

Grants the holder permission to update cluster tags.

### KOTS/cluster/ttl/update

Grants the holder permission to update cluster ttl.

### KOTS/cluster/[:clusterid]/nodegroup

Grants the holder permission to update nodegroup details.

### KOTS/cluster[:clusterid]/kubeconfig

Grants the holder permision to get the kubeconfig for a cluster.

### KOTS/cluster/[:clusterid]/delete

Grants the holder permission to delete a cluster.

### KOTS/cluster/[:clusterid]/addon/list

Grants the holder permission to list addons for a cluster.

### KOTS/cluster/[:clusterid]/addon/[:addonid]/read

Grants the holder permission to read the addon for a cluster.

### KOTS/cluster/[:clusterid]/addon/[:addonid]/delete

Grants the holder permission to delete the addon for a cluster.

### KOTS/cluster/[:clusterid]/addon/create/objectstore

Grants the holder permission to create an object store for a cluster.

### KOTS/cluster/[:clusterid]/port/expose

Grants the holder permission to expose a port for a cluster.

### KOTS/cluster/[:clusterid]/port/delete

Grants the holder permission to delete a port for a cluster.

### KOTS/cluster/[:clusterid]/port/list

Grants the holder permission to list exposed ports for a cluster.

### KOTS/cluster/list-quotas

Grants the holder permission to list the quotas.

### KOTS/cluster/credits/buy

Grants the holder permission to buy compatibility matrix credits.

### KOTS/cluster/increase-quota

Grants the holder permission to request an increase in the quota.

### KOTS/network/create

Grants the holder permission to create new networks.

### KOTS/network/list

Grants the holder permission to list networks.

### KOTS/network/[:networkid]

Grants the holder permission to get network details.

### KOTS/network/[:networkid]/delete

Grants the holder permission to delete a network.

### KOTS/network/[:networkid]/update

Grants the holder permission to update the network, including setting airgap policy and network reporting.

### KOTS/VM/create

Grants the holder permission to create new VMs.

### KOTS/VM/list

Grants the holder permission to list running and terminated VMs.

### KOTS/VM/[:vmid]

Grants the holder permission to get VM details.

### KOTS/VM/[:vmid]/delete

Grants the holder permission to delete a VM.

### KOTS/VM/tag/update

Grants the holder permission to update vm tags.

### KOTS/VM/ttl/update

Grants the holder permission to update vm ttl.

### KOTS/VM/[:vmid]/port/expose

Grants the holder permission to expose a port for a vm.

### KOTS/VM/[:vmid]/port/list

Grants the holder permission to list exposed ports for a vm.

### KOTS/VM/[:vmid]/addon/[:addonid]/delete

Grants the holder permission to delete the addon for a vm.

## Team

### Team/read

Grants the holder permission to view team details and settings.

### Team/auditlog/read

Grants the holder permission to view the audit log for the team.

### Team/authentication/update

Grants the holder permission to manage the following team authentication settings: Google authentication, Auto-join, and SAML authentication.

### Team/authentication/read

Grants the holder permission to read the following authentication settings: Google authentication, Auto-join, and SAML authentication.

### Team/integration/list

Grants the holder permission to view team's integrations.

### Team/integration/create

Grants the holder permission to create an integration.

### Team/integration/[:integrationid]/delete

Grants the holder permission to delete specified integration(s).

### Team/integration/[:integrationid]/update

Grants the holder permission to update specified integration(s).

### Team/members/list

Grants the holder permission to list team members and invitations.

### Team/member/invite

Grants the holder permission to invite additional people to the team.

### Team/members/create

Grants the holder permission to create team members.

### Team/members/delete

Grants the holder permission to delete other team members.

### Team/notifications/slack-webhook/read

Grants the holder permission to view the team's Slack webhook for classic instance notifications. For more information, see [Configure Instance Notifications (Classic)](instance-notifications-config).

### Team/notifications/slack-webhook/update

Grants the holder permission to edit the team's Slack webhook for classic instance notifications. For more information, see [Configure Instance Notifications (Classic)](instance-notifications-config).

### Team/notifications/\*\*

Grants the holder full access to all notification features, including managing other users' event notification subscriptions. For more information, see [About Event Notifications (Beta)](event-notifications).

### Team/policy/read

Grants the holder permission to view RBAC policies for the team.

### Team/policy/update

Grants the holder permission to update RBAC policies for the team.

### Team/policy/delete

Grants the holder permission to delete RBAC policies for the team.

### Team/policy/create

Grants the holder permission to create RBAC policies for the team.

### Team/security/update

Grants the holder permission to manage team password requirements including two-factor authentication and password complexity requirements.

### Team/serviceaccount/list

Grants the holder permission to list service accounts.

### Team/serviceaccount/create

Grants the holder permission to create new service accounts.

### Team/serviceaccount/[:name]/delete

Grants the holder permission to delete the service account identified by the name specified.

### Team/support-issues/read

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

### Team/support-issues/write

Grants the holder Write permissions in the Replicated collab repository in GitHub for the Vendor Portal team. Applies after the user adds their GitHub username to the Vendor Portal [Account Settings](https://vendor.replicated.com/account-settings) page.

For more information about the Write role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

### Team/support-issues/triage

Grants the holder Triage permissions in the Replicated collab repository in GitHub for the Vendor Portal team. Applies after the user adds their GitHub username to the Vendor Portal [Account Settings](https://vendor.replicated.com/account-settings) page.

For more information about the Triage role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

### Team/support-issues/admin

Grants the holder Admin permissions in the Replicated collab repository in GitHub for the Vendor Portal team. Applies after the user adds their GitHub username to the Vendor Portal [Account Settings](https://vendor.replicated.com/account-settings) page.

For more information about the Admin role in GitHub, see [Permissions for each role](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role) in the GitHub documentation.

<CollabRbacResourcesImportant/>

### Team/activity-stream/read

Grants the holder permission to view the team activity stream.

## Notifications

### Team/notifications/subscriptions/read

Grants the holder permission to view notification subscriptions.

### Team/notifications/subscriptions/create

Grants the holder permission to create a notification subscription.

### Team/notifications/subscriptions/update

Grants the holder permission to update a notification subscription created by the current user.

### Team/notifications/user/[:userid]/subscriptions/update

Grants the holder permission to update a notification subscription created by another user.

### Team/notifications/subscriptions/delete

Grants the holder permission to delete a notification subscription created by the current user.

### Team/notifications/user/[:userid]/subscriptions/delete

Grants the holder permission to delete a notification subscription created by another user.

### Team/notifications/types/list

Grants the holder permission to list available notification event types.

### Team/notifications/events/read

Grants the holder permission to view notification event delivery history.

## User

### User/token/list

Grants the holder permission to list user tokens.

### User/token/create

Grants the holder permission to create new user tokens.

### User/token/delete

Grants the holder permission to delete user tokens.
