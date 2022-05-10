# Pushing Updates to a GitOps Workflow

The Replicated admin console default workflow is configured to receive updates, show the changes, and deploy the updates to the cluster. You can enable a GitOps workflow instead. When using a GitOps workflow, changes from the admin console (configuration changes, upstream updates, license updates) are pushed to a private Git repository, where an existing CI/CD process can execute the delivery of manifests to the cluster.

If you have more than one application installed, you can selectively enable a GitOps workflow for each application.

:::note
You can change your GitOPs settings or disable a GitOps workflow at any time from the GitOps tab.
:::

**Prerequisites**

- A Git repository that you have read/write access permissions to.
- If the repository does not have files or folders committed yet, you must commit one file by any name with simple content (such as "hello, world") so that the connection attempt succeeds with the deployment key when you perform the following task.

To enable pushing updates to a GitOps workflow:

1. Click the GitOps tab at the top of the admin console, and click **Get started**.

1. If you have a single application installed, choose the Git provider and hostname (if applicable) on the GitOps Provider page, and click **Continue to deployment action**. Proceed to step 4.

1. If you have multiple applications installed:

    1. Choose the Git provider and hostname (if applicable) from the dropdown list, and click **Finish GitOps setup**.

      A list of your applications displays and shows the status of GitOps integration for each application.

    1. Click **Enable** next to the application that you want to enable GitOps for.

      ![GitOps Provider](/images/gitops-apps.png)

1. On the GitOps settings page:

    1. Enter the repository details:

      <table>
        <tr>
          <th width="30%">Field Name</th>
          <th width="70%">Description</th>
        </tr>
        <tr>
          <td>Owner & Repository</td>
          <td>Enter the owner and repository name where the commit will be made.</td>
        </tr>
        <tr>
          <td>Branch</td>
          <td>Enter the branch name or leave the field blank to use the default branch.</td>
        </tr>
        <tr>
          <td>Path</td>
          <td>Enter the folder name in the repository where the application deployment file will be stored. If you leave this field blank, the Replicated app manager creates a folder for you. However, the best practice is to manually create a folder in the repository labeled with the application name and dedicated for the deployment file only.</td>
          </tr>
      </table>

    1. For **When an update is available to the application, how should the updates YAML be delivered to repository?**, the admin console creates automatic commits to the branch. This default setting cannot be changed.

    1. For **What content will it contain?**, the supported type of asset to deliver to the Git repository is rendered YAML, which results in a single, rendered YAML file being committed to the repository. This default setting cannot be changed.

      ![GitOps Action](/images/gitops-action.png)

    1. Click **Finish setup** if this is a first time setup. For subsequent edits, click **Update settings**.

      The Gitops subtab opens and displays a public deployment key. The private key is stored securely in the admin console.

1. Click **Copy key** to copy the key. Click **repo settings page** and add the public deployment key in the repository settings page. Enable the write access permissions for this key, otherwise the commit fails when KOTS pushes the commit to the repository.

  ![GitOps Deployment Key](/images/gitops-deployment-key.png)

1. Click **Try again** to verify that the admin console can connect.

    When the admin console establishes a connection to the repository, the main GitOps tab shows that GitOps is enabled for the application.

    ![GitOps Connection](/images/gitops-connected.png)

## First Commits

After converting to GitOps, the admin console makes your first commit with the current version that is deployed.
Subsequently, the admin console makes separate commits with any available updates that have not been deployed from the admin console.
