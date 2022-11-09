import CollabRbacResourcesImportant from "../partials/collab-repo/_collab-rbac-resources-important.mdx"

# Configuring Custom RBAC Policies

You can configure custom role-based access control (RBAC) policies if you are on the Enterprise pricing plan. Creating custom RBAC policies lets you limit which areas of the Replicated vendor portal are accessible to team members, and control read and read/write privileges to groups based on their role. For example, you can limit access for the sales team to one application and to specific channels.

You can also create custom RBAC policies in the vendor portal to manage user access and permissions in the Replicated collab repository in GitHub. For more information, see [Managing Access to the Collab Repository](team-management-github-username).

To apply RBAC policies to vendor portal team members, you can:

- Assign policies to existing team members.
- Specify a policy when inviting new team members.
- Set a default policy for auto-joining a team.

For more information about managing team members and assigning policies, see [Managing Team Members](team-management).

:::note
By default, every team has two policies created automatically: **Admin** and **Read Only**. These default policies are not configurable.
:::

To configure custom RBAC policies:

1. From the vendor portal [Team page](https://vendor.replicated.com/team), select **RBAC** from the left menu.

1. Do _one_ of the following:

    - Click **Create Policy** from the RBAC page to create a new policy.
    - Click **View policy** to edit an existing custom policy in the list.

1. Edit the fields in the policy dialog. In the Definition pane, specify the `allow` and `denied` arrays in the resources key to create limits for the role. The default policy allows everything. The Config help pane displays any errors.

  Resource names are hierarchical, and support wildcards and globs. Rule order and conflicting rules have specific behaviors. For more information about policy definitions, rules, and advanced examples, see [About RBAC Policies](team-management-rbac-about). For a list of resource names, see [RBAC Resource Names](team-management-rbac-resource-names).

  <CollabRbacResourcesImportant/>

  ![Create RBAC Policy](/images/policy-create.png)

  **Example**

  This example limits any user with this role to viewing a specific application and a specific channel for that application.

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

    - To get the application ID, use the [`replicated app ls`](/../reference/replicated-cli-app-ls) command or click **Settings > Show Application ID (Advanced)** in the vendor portal.

    - To get the channel ID, use the [`replicated channel ls`](/../reference/replicated-cli-channel-ls) command or click **Channels** in the vendor portal. Then click the Release History link for the channel that you want to limit access to. The channel ID displays in your browser URL.

1. Click **Create Policy** to create a new policy, or click **Update Policy** to update an existing policy.

  :::note
  Click **Cancel** to exit without saving changes.
  :::
