# KOTS Auto-GitOps Workflow

:::important
KOTS Auto-GitOps is a legacy feature and is **not recommended** for use. For modern enterprise customers that prefer software deployment processes that use CI/CD pipelines, Replicated recommends the [Helm CLI installation method](/vendor/install-with-helm), which is more commonly used in these types of enterprise environments.
:::

## Overview of the Auto-GitOps Workflow

The Replicated KOTS Admin Console default workflow is configured to receive updates, show the changes, and deploy the updates to the cluster. You can enable the KOTS Auto-GitOps workflow instead. When using the Auto-GitOps workflow, changes from the Admin Console are pushed to a private Git repository, where an existing CI/CD process can execute the delivery of manifests to the cluster. Changes can include local configuration changes and upstream updates from your vendor (such as application and license updates).

If you have more than one application installed, you can selectively enable Auto-GitOps for each application.

After enabling the Auto-GitOps workflow for an application, the Admin Console makes your first commit with the latest available version in the Admin Console. The latest available version is often the current version that is deployed. Subsequently, the Admin Console makes separate commits with any available updates.

If you configure automatic updates for the application, any updates from your vendor are automatically committed to your Git repository. For more information about configuring automatic updates, see [Configure Automatic Updates](/enterprise/updating-apps).

You can change your GitOps settings or disable Auto-GitOps at any time from the **GitOps** tab in the Admin Console.

## Limitations

- The KOTS Auto-GitOps workflow is not supported for installations with the HelmChart custom resource `apiVersion: kots.io/v1beta2` or the HelmChart custom resource `apiVersion: kots.io/v1beta1` with `useHelmInstall: true`.

- To enable pushing updates through the Auto-GitOps workflow, you must first follow the installation workflow for the application using the Admin Console or the Replicated KOTS CLI. If the preflight checks pass during installation, then the application is deployed.

- After you have completed the installation workflow, you can enable Auto-GitOps for all subsequent application updates. It is not required that the application deploy successfully to enable Auto-GitOps. For example, if the preflight checks fail during the installation workflow and the application is not deployed, you can still enable Auto-GitOps for subsequent application updates.

- When you enable Auto-GitOps, the Admin Console sends all application updates, including the version that you initially installed before Auto-GitOps was enabled, to the repository that you specify.

- If your organization has security requirements that prevent you from completing the installation workflow for the application first with the Admin Console or KOTS CLI, you cannot enable Auto-GitOps.

## Prerequisites

- A Git repository that you have read/write access to.
- If the repository does not have files or folders committed yet, you must make at least one commit with any content so that the connection attempt succeeds with the SSH key when you perform the following task.

## Enable Auto-GitOps

To enable pushing updates to the Auto-GitOps workflow:

1. Click the **GitOps** tab at the top of the Admin Console.

1. On the GitOps Configuration page:

    1. If you have more than one application, select the application where you want to enable Auto-GitOps.
    1. Select the Git provider.
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
          <td>Enter the folder name in the repository where the application deployment file will be committed. If you leave this field blank, the Replicated KOTS creates a folder for you. However, the best practice is to manually create a folder in the repository labeled with the application name and dedicated for the deployment file only.</td>
          </tr>
       </table>

    1. Click **Generate SSH Key**, and then **Copy key**.
    1. Go to your Git repository and open the settings page. On the settings page:
       1. Add the SSH public key that you copied in the previous step.
       1. Enable write access for the key. This allows the Admin Console to push commits to the repository.

1. On the **GitOps Configuration** page, click **Test connection to repository** to verify that the Admin Console can connect.

    When the Admin Console establishes a connection to the repository, a dialog displays that says GitOps is enabled.