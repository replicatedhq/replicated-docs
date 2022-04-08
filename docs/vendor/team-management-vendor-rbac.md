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

For a complete list of resource names that can be defined in a policy document, see [Vendor RBAC Resource Names](team-management-rbac-resource-names).

## Rule Order

When defining policies, it's possible that a resource name might be specified in both the `allow` and the `deny` chains. When this happens, there are defined rules that determine which rule is applied.

If `denied` is left empty, it will be implied as a `**/*` rule (unless `**/*` rule is specified in the `allowed` resources. If a rule exactly conflicts with another rule, the `denied` rule will take precedence.

### Most specific rule takes precedence
The most specific rule definition will always be applied, when compared with less specific rules. Specificity of a rule is calculated by the number of `**` and `*` in the definition. A `**` in the rule definition is the least specific, followed by rules with `*` and then finally rules with no wildcards.

### Rule Order Examples

In this example, a policy grants access to promote releases to any channel except one (id `123456`):

```json
{
  "v1": {
    "name": "No Access To Channel ID 123456",
    "resources": {
      "allowed": [
        "**/*"
      ],
      "denied": [
        "kots/app/*/channel/123456/promote"
      ]
    }
  }
}
```

In this example, a policy grants access to view all customers, but not create releases, promote releases or create new customers:

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

## Role Examples

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

The sales policy grants read-write access to customers and license details, and read-only access to resources necessary to manage licenses (apps, channels, and license fields), but nothing else.

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
