# Creating Vendor RBAC Policies

Replicated offers customizable, role-based access control (RBAC) policies that can be used to grant or deny access to users when interacting with the Replicated services in the vendor portal.

Every team has 2 policies automatically created: “Admin” and “Read Only”. Teams on the “Enterprise” plan can create custom policies and roles that can be used to control access to specific resources, such as the ability to promote to a specific channel, or edit certain licenses.

## Policy Definition

A policy is defined in a single JSON document.

```
{
  "v1": {
    "name": "Read Only",
    "resources": {
      "allowed": [
        "**/read",
        "**/list"
      ],
      "denied": [
        "**/*"
      ]
    }
  }
}
```

There is some minimal metadata included, but the primary contents of a policy document is the resources key. The resources key should contain two arrays, identified as allowed and denied. As the names indicate, resources specified in the allowed list will be allowed for users assigned to the policy, and resources specified in the denied list will be denied.

Resource names are hierarchical, and support wildcards and globs. It’s possible to create a policy document that has conflicting rules, and the behavior here is predictable and documented.

For a complete list of resource names that can be defined in a policy document, continue to the Resource Names list.

## Resource names

The following table lists of all available resource names for the Replicated Vendor RBAC policy:


| Resource Name | Description |
|---------------|-------------|
| platform/app/[:appId]/delete | When allowed, the holder will be allowed to delete the application(s) specified. |
| platform/app/create | When allowed, the holder will be allowed to create new applications. |
| platform/app/[:appId]/read | Grants the holder permission to view the application. Specifically, applications with read permission will be returned in the API call to [list applications](https://replicated-vendor-api.readme.io/v1.0/reference#listapps). |
| platform/app/[:appId]/airgap/create | Grants the holder permission to create air gap builds. |
| platform/app/[:appId]/branding/update | Grants the holder permission to create or update custom branding for he specified application(s). This grants the permission across all channels in the application, regardless of the permission to the specific channel. |
| platform/app/[:appId]/branding/delete | Grants the holder permission to remove custom branding from any channel in the specified application(s). |

 platform/app/[:appId]/branding/read

Grants the holder the ability to view the custom CSS for the application(s) specified.

 platform/app/[:appId]/integration/list
Grants the holder the ability to list integrations for the specified application(s).

 platform/app/[:appId]/image/list
Grants the holder the ability to list images stored in Replicated registry for the specified application(s).

 platform/app/[:appId]/image/key/delete
Grants the holder the ability to Content Trust keys stored in Replicated registry for the specified application(s).

 platform/app/[:appId]/channel/[:channelId]/archive

Grants the holder the ability the archive the specified channel(s) of the specified application(s).

 platform/app/[:appId]/channel/[:channelId]/promote

Grants the holder the ability to promote a new release to the specified channel(s) of the specified application(s).

 platform/app/[:appId]/channel/[:channelId]/update

Grants the holder permission to update the specified channel of the specified application(s).

 platform/app/[:appId]/channel/[:channelId]/releases/read

Grants the holder permission to view the release history for the specified channel in the specified application(s).

 platform/app/[:appId]/channel/[:channelId]/releases/update

Grants the holder permission to update the channel release in the channel specified of the application specified. This policy allows the holder to update the "Required"/"Optional" status, the release notes and the version number.

 platform/app/[:appId]/channel/[:channelId]/read


 platform/app/[:appId]/license/create

Grants the holder permission to create a new license in the specified application(s).

 platform/app/[:appId]/license/[:licenseId]/archive

Grants the holder permission to archive the specified license (by ID) in the specified application(s).

 platform/app/[:appId]/license/[:licenseId]/unarchive

Grants the holder permissions to unarchive the specified license (by ID) in the specified application(s).

 platform/app/[:appId]/license/[:licenseId]/read

Grants the holder permission to view the license specified by ID. If this is denied, the licenses will not show up in search, CSV export or on the Vendor Portal.

 platform/app/[:appId]/license/[:licenseId]/update

Grants the holder permission to edit the license specified (by ID) for the specified application(s).

 platform/app/[:appId]/licensefields/create

Grants the holder permission to create new custom license fields in the specified application(s).

 platform/app/[:appId]/licensefields/read

Grants the holder permission to read the license field information for the specified application(s).

 platform/app/[:appId]/licensefields/update

Grants the holder poermission to update license fields in the specified application(s).

 platform/app/[:appId]/licensefields/delete

Grants the holder permission to delete license fields from the specified application(s).

 platform/app/[:appId]/release/create

Grants the holder permission to create a new release in the specified application(s).

 platform/app/[:appId]/release/[:sequence]/update

Grants the holder permission to update the YAML saved in release sequence `[:sequence]` in the specified application(s). Once a release is promoted to a channel, it's not editable by anyone.

 platform/app/[:appId]/release/[:sequence]/read

Grants the holder permission to read the YAML release sequence `[:sequence]` in the specified application(s).

 platform/app/[:appId]/release/[:sequence]/archive

Grants the holder permission to archive release sequence `[:sequence]` in the specified application(s).

 platform/team/member/[:memberId]/read

Grants the holder permission to view the team member(s) information, specified by ID.

 integration/catalog/list

Grants the holder permission to view the catalog events and triggers available for integrations.

 team/integration/list

Grants the holder permission to view team's integrations.

 team/integration/create

Grants the holder permission to create an integration.

 team/integration/[:integrationId]/delete

Grants the holder permission to delete specified integration(s).

 team/integration/[:integrationId]/update

Grants the holder permission to update specified integration(s).

 team/member/invite

Grants the holder permission to invite additional people to the team.

 team/members/delete

Grants the holder permission to delete other team members.

 platform/team/member/[:memberId]/update

Grants the holder permission to update the team member(s) specified by ID.

 platform/team/token/list

Grants the holder permission to list API tokens.

 platform/team/token/[:tokenName]/read

Grants the holder permission to view the API token(s) specified by name.

 platform/team/token/create

Grants the holder permission to create new API tokens for the team.

 platform/team/token/[:tokenName]/delete

Grants the holder permission to delete the token(s) identified by the names specified.

 user/token/list

Grants the holder permission to list user tokens.

 user/token/create

Grants the holder permission to create new user tokens.

 user/token/delete

Grants the holder permission to delete user tokens.

 team/serviceaccount/list

Grants the holder permission to list service accounts.

 team/serviceaccount/create

Grants the holder permission to create new service accounts.

 team/serviceaccount/[:name]/delete

Grants the holder permission to delete the service account identified by the name specified.

 team/auditlog/read

Grants the holder permission to view the audit log for the team.

 team/policy/read

Grants the holder permission to view RBAC policies for the team.

 team/policy/update

Grants the holder permission to update RBAC policies for the team.

 team/policy/delete

Grants the holder permission to delete RBAC policies for the team.

 team/policy/create

Grants the holder permission to create RBAC policies for the team.

 team/authentication/update

Grants the holder permission to manage team authentication settings including SSO settings.

 team/security/update

Grants the holder permission to manage team password requirements including two-factor authentication and password complexity requirements.

 registry/namespace/:namespace/pull

Grants the holder permission to pull images from Replicated registry.

 registry/namespace/:namespace/push

Grants the holder permission to push images into Replicated registry.

 kots/app/create

When allowed, the holder will be allowed to create new kots applications.

 kots/app/[:appId]/read
Grants the holder permission to view the kots application. If the holder does not have permissions to view an application, it will not appear in lists.

 kots/externalregistry/list
Grants the holder the ability to list external docker registry for kots application(s).

 kots/externalregistry/create

Grants the holder the ability to link a new external docker registry to kots application(s).

 kots/externalregistry/[:registryName]/delete

Grants the holder the ability to delete the specified linked external docker registry in kots application(s).

 kots/app/[:appId]/channel/create

Grants the holder the ability to create a new channel in the specified application(s).

 kots/app/[:appId]/channel/[:channelId]/promote

Grants the holder the ability to promote a new release to the specified channel(s) of the specified application(s).

 kots/app/[:appId]/channel/[:channelId]/update

Grants the holder permission to update the specified channel of the specified application(s).

 kots/app/[:appId]/channel/[:channelId]/read

Grants the holder the permission to view information about the specified channel of the specified application(s).

 kots/app/[:appId]/enterprisechannel/[:channelId]/read

Grants the holder the permission to view information about the specified enterprise channel of the specified application(s).

 kots/app/[:appId]/channel/[:channelId]/releases/airgap

Grants the holder permission to trigger airgap builds for the specified channel.

 kots/app/[:appId]/channel/[:channelId]/releases/airgap/download-url

Grants the holder permission to get an airgap bundle download URL for any release on the specified channel.

 kots/app/[:appId]/license/create

Grants the holder permission to create a new license in the specified application(s).

 kots/app/[:appId]/license/[:licenseId]/read

Grants the holder permission to view the license specified by ID. If this is denied, the licenses will not show up in search, CSV export or on the Vendor Portal.

 kots/app/[:appId]/license/[:licenseId]/update

Grants the holder permission to edit the license specified (by ID) for the specified application(s).

 kots/license/[:licenseId]/archive

Grants the holder permission to archive the specified license (by ID).

 kots/license/[:licenseId]/unarchive

Grants the holder permissions to unarchive the specified license (by ID).

 kots/app/[:appId]/release/create

Grants the holder permission to create a new release in the specified application(s).

 kots/app/[:appId]/release/[:sequence]/update

Grants the holder permission to update the files saved in release sequence `[:sequence]` in the specified application(s). Once a release is promoted to a channel, it's not editable by anyone.

 kots/app/[:appId]/release/[:sequence]/read

Grants the holder permission to read the files at release sequence `[:sequence]` in the specified application(s).
