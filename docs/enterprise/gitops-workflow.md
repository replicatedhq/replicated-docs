# Pushing Updates to a GitOps Workflow

This topic describes how to enable a GitOps workflow for your application. In a GitOps workflow, the admin console pushes all updates to the application to a Git repository that you specify.

## Overview of the GitOps Workflow

The Replicated admin console default workflow is configured to receive updates, show the changes, and deploy the updates to the cluster. You can enable a GitOps workflow instead. When using a GitOps workflow, changes from the admin console are pushed to a private Git repository, where an existing CI/CD process can execute the delivery of manifests to the cluster. Changes can include local configuration changes and upstream updates from your vendor (such as application and license updates).

If you have more than one application installed, you can selectively enable a GitOps workflow for each application.

After enabling the GitOps workflow for an application, the admin console makes your first commit with the latest available version in the admin console. The latest available version is often the current version that is deployed. Subsequently, the admin console makes separate commits with any available updates.

If you configure automatic updates for the application, any updates from your vendor are automatically committed to your Git repository. For more information about configuring automatic updates, see [Configure Automatic Updates](updating-apps#configure-automatic-updates) in _Updating an Application_.

You can change your GitOps settings or disable a GitOps workflow at any time from the GitOps tab.

## Limitations

- The GitOps workflow is not supported for releases that use the native Helm chart installation method.

- To enable pushing updates through the GitOps workflow, you must first follow the installation workflow for the application using the admin console or the kots CLI. If the preflight checks pass during installation, then the application is deployed.

- After you have completed the installation workflow, you can enable GitOps for all subsequent application updates. It is not required that the application deploy successfully to enable GitOps. For example, if the preflight checks fail during the installation workflow and the application is not deployed, you can still enable GitOps for subsequent application updates.

- When you enable GitOps, the admin console sends all application updates, including the version that you initially installed before GitOps was enabled, to the repository that you specify.

- If your organization has security requirements that prevent you from completing the installation workflow for the application first with the admin console or kots CLI, you cannot enable GitOps.

## Prerequisites

- A Git repository that you have read/write access to.
- If the repository does not have files or folders committed yet, you must make at least one commit with any content so that the connection attempt succeeds with the SSH key when you perform the following task.

## Enable GitOps

To enable pushing updates to a GitOps workflow:

1. Click the GitOps tab at the top of the admin console.

1. On the GitOps Configuration page:

    1. If you have more than one application, select the application where you want to enable GitOps.
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
          <td>Enter the folder name in the repository where the application deployment file will be committed. If you leave this field blank, the Replicated app manager creates a folder for you. However, the best practice is to manually create a folder in the repository labeled with the application name and dedicated for the deployment file only.</td>
          </tr>
      </table>

    1. Click **Generate SSH Key**, and then **Copy key**.
    1. Go to your Git repository and open the settings page. On the settings page:
       1. Add the SSH public key that you copied in the previous step.
       1. Enable write access for the key. This allows the admin console to push commits to the repository.

1. On the GitOps Configuration page, click **Test connection to repository** to verify that the admin console can connect.

    When the admin console establishes a connection to the repository, a dialog displays that says GitOps is enabled.
