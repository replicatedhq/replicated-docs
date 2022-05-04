# Pushing Updates to a GitOps Workflow in Multi-app Mode

The Replicated admin console default workflow is configured to receive updates, show the changes, and deploy them to the cluster. You can enable a GitOps workflow instead.
When using a GitOps workflow, changes from the admin console (config changes, upstream updates, license updates) are pushed to a private Git repository, where an existing CI/CD process can execute to deliver the manifests to the cluster.

To enable a GitOps deployment workflow:

1. Click the GitOps tab at the top of the admin console, and click **Get started**.

1. Choose the Git provider and hostname (if applicable), and click **Finish GitOps setup**.

    A list of your applications displays and shows the status of GitOps integration for each application.

1. Click **Enable** next to the application that you want to enable GitOps for.

    ![GitOps Provider](/images/gitops-apps.png)

1. On the GitOps settings page:

    1. Enter the repository details, and optionally the branch and path to commit to in the repository.

      The path must be a folder in your repository, not on your local machine. Note the following:

        - If it is a new repository and no files or folders are committed, you must commit one file by any name with simple content (such as "hello, world") so that the connection attempt succeeds with the deployment key in a later step.
        - If a folder for the application does not already exist in the repository, the Replicated app manager creates a folder for you. However, the best practice is to manually create a folder in the repository with the application name dedicated for the deployment file only.

    1. Select the action to take when there is an update. The admin console can create a new commit to the specified branch.

    1. For **What content will it contain**, select what type of asset to deliver to the Git repository. Using the **Rendered YAML** option results in a single, multi-doc YAML file being committed to the repository.

      ![GitOps Action Multi App](/images/gitops-action-new-multi.png)

      1. Click **Update Settings**.

1. When GitOps is set up, the GitOps subtab displays a public deploy key. The private key is stored securely in the admin console. Click **Copy key > repo settings page** to add the deployment key to the repository settings page. Click **Try again** to verify that the admin console can connect.

    When the admin console establishes a connection to the repository, the Admin Console Gitops page shows that GitOPs is enabled for the application.

    ![GitOps Connection](/images/gitops-connected-multi.png)

## First Commits

After converting to GitOps, the admin console makes your first commit/pull request with the current version that is deployed.
Subsequently, the admin console makes separate commits (or a single pull request) with any pending updates that have not been deployed from the admin console.
