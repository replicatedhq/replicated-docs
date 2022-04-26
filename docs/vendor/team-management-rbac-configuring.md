# Configuring Custom RBAC Policies

You can configure custom role-based access control (RBAC) policies if you are on the Enterprise pricing plan. Creating custom RBAC policies lets you limit which areas of the Replicated vendor portal are accessible to team members and control read and read/write privileges to groups based on their role. For example, you can limit access for the sales team to one application and to specific channels.

:::note
By default, every team has two policies created automatically: **Admin** and **Read Only**, regardless of which pricing plan you are on. These default policies are not configurable.
:::

To configure RBAC policies:

1. From the vendor portal [Team page](https://vendor.replicated.com/team), select **RBAC** from the left menu.

1. Do _one_ of the following actions:

    - Click **Create Policy** from the RBAC page to create a new policy
    - Click **View policy** to edit an existing custom policy in the list

1. Edit the fields in the policy dialog:

    -  In the Definition pane, you must specify the `allow` and `denied` arrays in the resources key to create limits for the role because the default policy allows everything.

    - The Config help pane displays any errors.

  Resource names are hierarchical, and support wildcards and globs. Rule order and conflicting rules have specific behaviors. For more information about policy definitions, rules, and example, see [About RBAC Policies](team-management-rbac-about). For a list of resource names, see [RBAC Resource Names](team-management-rbac-resource-names).

  **Example**

  This example limits...


  1. Click **Create Policy** to create a new policy, or click **Update policy** to update an existing policy.

  :::note
  Click **Cancel** to exit without saving changes.
  ::
