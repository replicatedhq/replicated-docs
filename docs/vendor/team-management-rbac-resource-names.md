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

Grants the holder permission to manage team authentication settings including SSO settings.

### team/security/update

Grants the holder permission to manage team password requirements including two-factor authentication and password complexity requirements.

## User

### user/token/list

Grants the holder permission to list user tokens.

### user/token/create

Grants the holder permission to create new user tokens.

### user/token/delete

Grants the holder permission to delete user tokens.
