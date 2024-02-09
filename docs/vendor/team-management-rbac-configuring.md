import CollabRbacResourcesImportant from "../partials/collab-repo/_collab-rbac-resources-important.mdx"

# Configuring RBAC Policies

This topic describes how to use role-based access policies (RBAC) to grant or deny team members permissions to use Replicated services in the Replicated vendor portal.

## About RBAC Policies

By default, every team has two policies created automatically: **Admin** and **Read Only**. These default policies are not configurable.

You can configure custom RBAC policies if you are on the Enterprise pricing plan. Creating custom RBAC policies lets you limit which areas of the vendor portal are accessible to team members, and control read and read/write privileges to groups based on their role. For example, you can limit access for the sales team to one application and to specific channels.

You can also create custom RBAC policies in the vendor portal to manage user access and permissions in the Replicated collab repository in GitHub. For more information, see [Managing Access to the Collab Repository](team-management-github-username).

## Configure a Custom RBAC Policy

To configure a custom RBAC policy:

1. From the vendor portal [Team page](https://vendor.replicated.com/team), select **RBAC** from the left menu.

1. Do _one_ of the following:

    - Click **Create Policy** from the RBAC page to create a new policy.
    - Click **View policy** to edit an existing custom policy in the list.

      <CollabRbacResourcesImportant/>

1. Edit the fields in the policy dialog. In the **Definition** pane, specify the `allow` and `denied` arrays in the resources key to create limits for the role.

   The default policy allows everything and the **Config help** pane displays any errors.

    ![Create RBAC Policy](/images/policy-create.png) 

    - For more information and examples of policy definition, see [Policy Definition](#policy-definition) and [Role-based Policy Examples](#role-based-policy-examples).
    - For more information and examples of rule order, see [Rule Order](#rule-order).
    - For a list of resource names, see [RBAC Resource Names](team-management-rbac-resource-names).

1. Click **Create Policy** to create a new policy, or click **Update Policy** to update an existing policy.

   :::note
   Click **Cancel** to exit without saving changes.
   :::

1. To apply RBAC policies to vendor portal team members, you can:

    - Assign policies to existing team members
    - Specify a policy when inviting new team members
    - Set a default policy for auto-joining a team

    See [Managing Team Members](team-management).

## Policy Definition

A policy is defined in a single JSON document:

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

The primary content of a policy document is the resources key. The resources key should contain two arrays, identified as `allowed` and `denied`. Resources specified in the allowed list are allowed for users assigned to the policy, and resources specified in the denied list are denied.

Resource names are hierarchical, and support wildcards and globs. For a complete list of resource names that can be defined in a policy document, see [RBAC Resource Names](team-management-rbac-resource-names).

When a policy document has conflicting rules, the behavior is predictable. For more information about conflicting rules, see [Rule Order](#rule-order).

### Policy Definition Example

  The following policy definition example limits any user with this role to viewing a specific application and a specific channel for that application:

    ```
    {
      "v1": {
        "name": "Policy Name",
        "resources": {
          "allowed": [
            "kots/app/appID/list",
            "kots/app/appID/read",
            "kots/app/appID/channel/channelID/list",
            "kots/app/appID/channel/channelID/read"
          ],
          "denied": []
        }
      }
    }
    ```
  The example above uses an application ID and a channel ID to scope the permissions of the RBAC policy. To find your application and channel IDs, do the following:

  - To get the application ID, click **Settings > Show Application ID (Advanced)** in the vendor portal.

  - To get the channel ID, click **Channels** in the vendor portal. Then click the Release History link for the channel that you want to limit access to. The channel ID displays in your browser URL.

## Rule Order

When a resource name is specified in both the `allow` and the `deny` chains of a policy, defined rules determine which rule is applied.

If `denied` is left empty, it is implied as a `**/*` rule, unless `**/*` rule is specified in the `allowed` resources. If a rule exactly conflicts with another rule, the `denied` rule takes precedence.

### Defining Precedence Using Rule Specificity
The most specific rule definition is always applied, when compared with less specific rules. Specificity of a rule is calculated by the number of asterisks (`**` and `*`) in the definition. A `**` in the rule definition is the least specific, followed by rules with `*`, and finally rules with no wildcards as the most specific.

### Rule Order Examples

In the following example, a policy grants access to promote releases to any channel except the Stable channel. It uses the rule pattern `kots/app/[:appId]/channel/[:channelId]/promote`. Note that you specify the channel ID, rather than the channel name. To find the channel ID, go to the vendor portal **Channels** page and click the **Settings** icon for the target channel.

```json
{
  "v1": {
    "name": "No Access To Stable Channel",
    "resources": {
      "allowed": [
        "**/*"
      ],
      "denied": [
        "kots/app/*/channel/1eg7CyEofYSmVAnK0pEKUlv36Y3/promote"
      ]
    }
  }
}
```

In the following example, a policy grants access to viewing all customers, but not to creating releases, promoting releases, or creating new customers.

```json
{
  "v1": {
    "name": "View Customers Only",
    "resources": {
      "allowed": [
        "kots/app/*/license/*/read",
        "kots/app/*/license/*/list",
        "kots/app/*/read",
        "kots/app/*/list"
      ],
      "denied": [
        "**/*"
      ]
    }
  }
}
```

## Role-based Policy Examples

### Support Engineer

The support engineer policy grants read access to release, channels, and application data, but read-write access to customer and license details. It also grants permission to open Replicated support issues and upload support bundles.

```json
{
  "v1": {
    "name": "Support Engineer",
    "resources": {
      "allowed": [
        "**/read",
        "**/list",
        "kots/app/*/license/**",
        "team/support-issues/read",
        "team/support-issues/write"
      ],
      "denied": [
        "**/*"
      ]
    }
  }
}
```

### Sales

The sales policy grants read-write access to customers and license details and read-only access to resources necessary to manage licenses (applications, channels, and license fields). No additional access is granted.

```json
{
  "v1": {
    "name": "Sales",
    "resources": {
      "allowed": [
        "kots/app/*/read",
        "kots/app/*/channel/*/read",
        "kots/app/*/licensefields/read",
        "kots/app/*/license/**"
      ],
      "denied": [
        "**/*"
      ]
    }
  }
}
```
