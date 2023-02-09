# About RBAC Policies

Replicated offers customizable, role-based access control (RBAC) policies that can be used to grant or deny access to users when interacting with the Replicated services in the Replicated vendor portal.

RBAC policies can also be used to manage user access and permissions in the Replicated collab repository in GitHub for the vendor portal team. For more information, see [Managing Access to the Collab Repository](team-management-github-username).

Every team has two policies created automatically that are not configurable: **Admin** and **Read Only**. Teams on the Enterprise pricing plan can create custom policies and roles that can be used to control access to specific resources, such as the ability to promote to a specific channel or edit certain licenses.

## Policy Definition

A policy is defined in a single JSON document.

**Example**

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

Resource names are hierarchical, and support wildcards and globs. When a policy document has conflicting rules, the behavior is predictable. For more information about conflicting rules, see [Rule Order](#rule-order).

For a complete list of resource names that can be defined in a policy document, see [RBAC Resource Names](team-management-rbac-resource-names).

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

The support engineer policy grants read access to release, channels, and application data, but read-write access to customer and license details.

```json
{
  "v1": {
    "name": "Support Engineer",
    "resources": {
      "allowed": [
        "**/read",
        "**/list",
        "kots/app/*/license/**"
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

## Related Topic

[Configuring RBAC Policies](team-management-rbac-configuring)
