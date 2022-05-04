# Pushing Updates to a GitOps Workflow in Single-app Mode

While the Replicated admin console is initially configured to receive updates, show the changes, and deploy the updates to the cluster, this process can be changed and converted to use a GitOps workflow instead.
When using a GitOps workflow, changes from the admin console (configuration changes, upstream updates, license updates) are pushed to a private Git repository, where an existing CI/CD process can execute to deliver the manifests to the cluster.

To begin migrating to a GitOps deployment workflow:

1. Click the GitOps link at the top of the admin console, click on **Get started**.

1. Choose the Git provider and hostname (if applicable) on the GitOps Provider page, and click on **Continue to deployment action**.

1. On the GitOps settings page:

    1. Enter the repository details, and optionally the branch and path to commit to in the repository.

      The path must be a folder in your repository, not on your local machine. Note the following:

        - If it is a new repository and there is not yet any file or folder committed, you must commit one file by any name with simple content (such as "hello, world") so that the connection attempt succeeds with the deployment key in a later step.
        - If a folder for the application does not already exist in the repository, the Replicated app manager creates a folder for you. However, the best practice is to manually create a folder in the repository with the application name dedicated for the deployment file only.

    1. Select the action to take when there is an update. The admin console can create a new commit to the specified branch.

    1. For **What content will it contain**, select what type of asset to deliver to the git repository. Using the **Rendered YAML** option results in a single, multi-doc YAML file being committed to the repository.

      ![GitOps Action](/images/gitops-action.png)

    1. Click **Update Settings**.

1. When GitOps is set up, a new **GitOps** subtab is available on the application. This tab displays a public deploy key. The private key is stored securely in the admin console. Click **Copy key > repo settings page** to add the deploy key to the repository. Click **Try again** to verify that the admin console can connect.

    When the admin console establishes a connection to the repository, the Admin Console Gitops page shows that GitOPs is enabled for the application.

    ![GitOps Connection](/images/gitops-connected.png)

## First Commits

After converting to GitOps, the admin console makes your first commit/pull request with the current version that is deployed.
Subsequently, the admin console makes separate commits (or a single pull request) with any pending updates that have not been deployed from the admin console.
